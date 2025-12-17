import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame } from 'cc';
import { IPlayer } from '../../Net/Shared/models/Interfaces';
import { BigNumUtils, loadAvatar, truncateString } from '../../Base/Utils';
import TeamInfoManager from '../../Data/TeamInfoManager';
import { IMG_URL_EXTRA_PARAM } from '../../Config';
import EventManager from '../../Base/EventManager';
import { EVENT_ENUM } from '../../Data/Enum';
import { UIButtonUtil } from '../../Base/UIButtonUtil';
import TsRpc from '../../Net/TsRpc';
import UserDataManager from '../../Data/UserDataManager';
import { ToastManager } from '../UI/ToastManager';
const { ccclass, property } = _decorator;

@ccclass('TeamMembersRender')
export class TeamMembersRender extends Component {
    @property(Prefab)
    memberItem: Prefab = null;
    @property(Node)
    containNode: Node = null;

    onLoad() {
        EventManager.Instance.on(EVENT_ENUM.AddTeamMember, this.addMember, this)
        EventManager.Instance.on(EVENT_ENUM.DelTeamMember, this.delMember, this)
        EventManager.Instance.on(EVENT_ENUM.UpdateIsDie, this.updateMyDie, this)
        this.doRender();
    }



    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.AddTeamMember, this.addMember)
        EventManager.Instance.off(EVENT_ENUM.DelTeamMember, this.delMember)
        EventManager.Instance.off(EVENT_ENUM.UpdateIsDie, this.updateMyDie)
        this.unscheduleAllCallbacks()
    }

    // 更新我的淘汰状态
    updateMyDie() {
        const userInfo = UserDataManager.Instance.UserInfo
        let needUpdateName = "member" + userInfo.uid
        for (let i = 0; i < this.containNode.children.length; i++) {
            const element = this.containNode.children[i];
            if (element.name == needUpdateName) {
                element.getChildByName("die").active = userInfo.isdie === 1;
                break
            }
        }
    }

    doRender() {
        const data = TeamInfoManager.Instance.TeamInfo.players
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
    }

    renderOne(player: IPlayer) {
        let { uid, power, total_games, win_games, user, isdie, times, times_max } = player;
        const memberNode = instantiate(this.memberItem);
        memberNode.name = "member" + player.uid; // 添加标志 便于删除
        const dieNode = memberNode.getChildByName("die")
        dieNode.active = isdie == 1;
        const nicknameLabel = memberNode.getChildByName("nickname").getComponent(Label)
        nicknameLabel.string = truncateString(user.nickname);
        const remainLabel = memberNode.getChildByName("remain").getChildByName("value").getComponent(Label)
        remainLabel.string = times_max - times + "";
        const winLabel = memberNode.getChildByName("win").getChildByName("value").getComponent(Label)
        const winnum = win_games == 0 && total_games == 0 ? 0 : (win_games / total_games) * 100;
        winLabel.string = winnum.toFixed(2) + "%";
        const powerLabel = memberNode.getChildByName("power").getChildByName("value").getComponent(Label)
        powerLabel.string = BigNumUtils.getNumberString(power);


        const roleNode = memberNode.getChildByName("role")
        const thisIsCaptain = uid == TeamInfoManager.Instance.TeamInfo.id
        const removeNode = memberNode.getChildByName("remove")
        if (TeamInfoManager.Instance.IsCaptainInTeam && !thisIsCaptain) {
            removeNode.active = true
            UIButtonUtil.initBtn(removeNode, () => {
                this.kick(uid)
            })
        } else {
            removeNode.active = false
        }
        roleNode.children[0].active = !thisIsCaptain;
        roleNode.children[1].active = thisIsCaptain;

        const avatarImg = memberNode.getChildByName("avatar").getChildByName("mask").getChildByName("img").getComponent(Sprite);
        loadAvatar(user.avatar + IMG_URL_EXTRA_PARAM).then((res: SpriteFrame) => {
            avatarImg.spriteFrame = res;
        })
        this.containNode.addChild(memberNode)
    }

    // 主动删除
    async kick(uid: number) {
        const data = await TsRpc.Instance.Client.callApi("team/Kick", { __ssoToken: UserDataManager.Instance.SsoToken, uid });
        if (!data.isSucc) {
            ToastManager.showToast("踢出队员失败")
            return
        }
    }

    // 被动渲染
    delMember(uid: number) {
        if (uid === UserDataManager.Instance.UserInfo.user.uid) {
            TeamInfoManager.Instance.closeTeam()
            return
        }
        let needDelName = "member" + uid
        for (let i = 0; i < this.containNode.children.length; i++) {
            const element = this.containNode.children[i];
            if (element.name == needDelName) {
                element.destroy()
                break
            }
        }
    }

    addMember(player: IPlayer) {
        this.renderOne(player)
    }

    update(deltaTime: number) {

    }
}


