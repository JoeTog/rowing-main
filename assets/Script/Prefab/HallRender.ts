import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, UI } from 'cc';
import { UIButtonUtil } from '../Base/UIButtonUtil';
import EventManager from '../Base/EventManager';
import { EVENT_ENUM } from '../Data/Enum';
import TsRpc from '../Net/TsRpc';
import UserDataManager from '../Data/UserDataManager';
import { ITeamBase } from '../Net/Shared/models/Interfaces';
import { loadAvatar, truncateString } from '../Base/Utils';
import { IMG_URL_EXTRA_PARAM } from '../Config';
import { ToastManager } from './UI/ToastManager';
import TeamInfoManager from '../Data/TeamInfoManager';
const { ccclass, property } = _decorator;

@ccclass('HallRender')
export class HallRender extends Component {
    @property(Prefab)
    teamItem: Prefab = null;
    @property(Node)
    containNode: Node = null;

    private closeNode: Node = null;
    private creatBtnNode: Node = null;

    protected onLoad(): void {
        const popNode = this.node.getChildByName("pop")
        this.closeNode = popNode.getChildByName("close")
        this.creatBtnNode = popNode.getChildByName("creat_btn")
        UIButtonUtil.initBtn(this.closeNode, () => {
            this.hide()
        })
        UIButtonUtil.initBtn(this.creatBtnNode, () => {
            EventManager.Instance.emit(EVENT_ENUM.ToCreatTeam)
        })
        EventManager.Instance.on(EVENT_ENUM.HideHall, this.hide, this)
        this.doRender()
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.HideHall, this.hide)
        this.unscheduleAllCallbacks()
    }

    async doRender() {
        const teamData = await TsRpc.Instance.Client.callApi("team/GetTeamList", { __ssoToken: UserDataManager.Instance.SsoToken });
        if (teamData.isSucc) {
            // 需要判断是否请求成功
            console.log('获取队伍列表', teamData);
            const data = teamData.res.teams;
            let i = 0;
            const render = () => {
                if (i < data.length) {
                    this.renderOne(data[i]);
                    i++;
                } else {
                    this.unschedule(render);
                }
            };
            this.schedule(render, 0.01);
        } else {
            ToastManager.showToast("获取队伍列表失败")
        }
    }

    hide() {
        this.node.destroy()
    }

    renderOne(team: ITeamBase) {
        const node = instantiate(this.teamItem)
        const avatarImg = node.getChildByName("avatar").getChildByName("mask").getChildByName("img").getComponent(Sprite);
        loadAvatar(team.avatar + IMG_URL_EXTRA_PARAM).then((res: SpriteFrame) => {
            avatarImg.spriteFrame = res;
        })
        const nameLabel = node.getChildByName("name").getComponent(Label);
        nameLabel.string = truncateString(team.name, 12);
        const countLabel = node.getChildByName("count").getChildByName("value").getComponent(Label);
        countLabel.string = team.playersCount + "/50";
        const joinBtnNode = node.getChildByName("join_btn")
        UIButtonUtil.initBtn(joinBtnNode, () => {
            this.joinTeam(team.id, team.status)
        })
        this.containNode.addChild(node)
    }

    async joinTeam(id, status) {
        if (UserDataManager.Instance.IsDie) {
            ToastManager.showToast("您已淘汰，请先复活")
            return;
        }
        if (!UserDataManager.Instance.CanPlayToday) {
            ToastManager.showToast("游戏次数用完，明天再来吧")
            return
        }
        // 判断队伍状态
        if (status !== 0) {
            ToastManager.showToast("队伍不允许加入")
            return;
        }
        const SsoToken = UserDataManager.Instance.SsoToken
        let info = await TsRpc.Instance.Client.callApi("team/JoinTeam", { __ssoToken: SsoToken, id });
        if (!info.isSucc) {
            // 提示加入失败
            ToastManager.showToast(info.err.message)
            return;
        }
        // 进入新场景
        const create_info = await TsRpc.Instance.Client.callApi("team/GetTeamInfo", { __ssoToken: SsoToken });
        TeamInfoManager.Instance.TeamInfo = create_info.res.info;
        EventManager.Instance.emit(EVENT_ENUM.ShowCreatTeam);
        EventManager.Instance.emit(EVENT_ENUM.HideHall)
    }
}


