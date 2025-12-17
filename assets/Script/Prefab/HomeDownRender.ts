import { _decorator, Component, Node } from 'cc';
import UserDataManager from '../Data/UserDataManager';
import { UIButtonUtil } from '../Base/UIButtonUtil';
import EventManager from '../Base/EventManager';
import { EVENT_ENUM, PREFAB_PATH_ENUM } from '../Data/Enum';
import TsRpc from '../Net/TsRpc';
import TeamInfoManager from '../Data/TeamInfoManager';
import { ToastManager } from './UI/ToastManager';
import { LoadingManager } from './UI/LoadingManager';
const { ccclass, property } = _decorator;

@ccclass('HomeDownRender')
export class HomeDownRender extends Component {
    private roleNode: Node = null;
    private dzNode: Node = null;
    private dyNode: Node = null;
    private dieNode: Node = null;

    private creatTeamNode: Node = null
    private hallNode: Node = null
    onLoad() {
        this.roleNode = this.node.getChildByName("role")
        this.dzNode = this.roleNode.getChildByName("dz")
        this.dyNode = this.roleNode.getChildByName("dy")
        this.dieNode = this.roleNode.getChildByName("die")
        this.creatTeamNode = this.node.getChildByName("creat_team")
        this.hallNode = this.node.getChildByName("hall")

        UIButtonUtil.initBtn(this.creatTeamNode, () => {
            this.toCreatTeam()
        })

        UIButtonUtil.initBtn(this.hallNode, () => {
            this.toHall()
        })

        EventManager.Instance.on(EVENT_ENUM.UpdateCaptain, this.doRender, this)
        EventManager.Instance.on(EVENT_ENUM.UpdateIsDie, this.doRender, this)
        EventManager.Instance.on(EVENT_ENUM.ToCreatTeam, this.toCreatTeam, this)
        this.doRender()
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.UpdateCaptain, this.doRender, this)
        EventManager.Instance.off(EVENT_ENUM.UpdateIsDie, this.doRender, this)
        EventManager.Instance.off(EVENT_ENUM.ToCreatTeam, this.toCreatTeam, this)
    }

    doRender() {
        const isCaptain = UserDataManager.Instance.IsCaptain;
        const isDie = UserDataManager.Instance.IsDie;
        this.dzNode.active = isCaptain
        this.dyNode.active = !isCaptain

        this.dieNode.active = isDie
    }

    // 显示创建队伍页面
    async toCreatTeam(creat = true) {
        let SsoToken = UserDataManager.Instance.SsoToken
        if (creat) {
            console.log("自身创建")
            if (UserDataManager.Instance.IsDie) {
                ToastManager.showToast("您已淘汰，请先复活")
                return
            }
            if (!UserDataManager.Instance.CanPlayToday) {
                ToastManager.showToast("游戏次数用完，明天再来吧")
                return
            }
            if (!UserDataManager.Instance.CanCreartTeam) {
                ToastManager.showToast("请先购买旗鼓手")
                return
            }

            LoadingManager.showLoading()
            const createTeamRes = await TsRpc.Instance.Client.callApi("team/CreateTeam", {teamName:UserDataManager.Instance.UserInfo.user.nickname, __ssoToken: SsoToken });
            if (!createTeamRes.isSucc) {
                ToastManager.showToast(createTeamRes.err.message)
                return;
            }
            // 设置用户为队长
            UserDataManager.Instance.IsCaptain = true
        }
        // 获取队伍信息接口
        const create_info = await TsRpc.Instance.Client.callApi("team/GetTeamInfo", { __ssoToken: SsoToken });
        TeamInfoManager.Instance.TeamInfo = create_info.res.info;

        EventManager.Instance.emit(EVENT_ENUM.ShowCreatTeam);
        EventManager.Instance.emit(EVENT_ENUM.HideHall)
    }

    // 显示队伍大厅
    toHall() {
        EventManager.Instance.emit(EVENT_ENUM.RenderHomePop, PREFAB_PATH_ENUM.HallPrefab)
    }

    update(deltaTime: number) {

    }
}


