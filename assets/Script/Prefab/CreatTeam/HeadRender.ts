import { _decorator, Component, Label, Node } from 'cc';
import TeamInfoManager from '../../Data/TeamInfoManager';
import { UIButtonUtil } from '../../Base/UIButtonUtil';
import TsRpc from '../../Net/TsRpc';
import UserDataManager from '../../Data/UserDataManager';
import { ToastManager } from '../UI/ToastManager';
import EventManager from '../../Base/EventManager';
import { EVENT_ENUM } from '../../Data/Enum';
const { ccclass, property } = _decorator;

@ccclass('HeadRender')
export class HeadRender extends Component {
    private nameLabel: Label = null
    private numLabel: Label = null
    private btnNode: Node = null;
    private btnNameLabel: Label = null;

    private exitInClick: boolean = false
    onLoad() {
        const headNode = this.node.getChildByName("headnode")
        const teamNode = headNode.getChildByName("team")
        this.nameLabel = teamNode.getChildByName("name").getComponent(Label)
        this.numLabel = teamNode.getChildByName("num").getComponent(Label)
        this.btnNode = headNode.getChildByName("btn")
        this.btnNameLabel = this.btnNode.getChildByName("name").getComponent(Label)
        this.doRender()

        UIButtonUtil.initBtn(this.btnNode, () => {
            this.exitTeam()
        })

        EventManager.Instance.on(EVENT_ENUM.AddTeamMember, this.renderCount, this)
        EventManager.Instance.on(EVENT_ENUM.DelTeamMember, this.renderCount, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.AddTeamMember, this.renderCount)
        EventManager.Instance.off(EVENT_ENUM.DelTeamMember, this.renderCount)
    }

    doRender() {
        this.nameLabel.string = TeamInfoManager.Instance.TeamInfo.name
        this.btnNameLabel.string = TeamInfoManager.Instance.IsCaptainInTeam ? "解散队伍" : "退出队伍"
    }

    renderCount() {
        this.numLabel.string = TeamInfoManager.Instance.TeamInfo.playersCount + "/50"
    }

    async exitTeam() {
        if (this.exitInClick) return;
        this.exitInClick = true;
        const data = await TsRpc.Instance.Client.callApi("team/LeaveTeam", { __ssoToken: UserDataManager.Instance.SsoToken });
        this.exitInClick = false;
        if (!data.isSucc) {
            // 表示退出队伍失败
            ToastManager.showToast("退出队伍失败")
            return;
        }
    }

}


