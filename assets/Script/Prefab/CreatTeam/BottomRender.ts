import { _decorator, Component, Node } from 'cc';
import TeamInfoManager from '../../Data/TeamInfoManager';
import { UIButtonUtil } from '../../Base/UIButtonUtil';
import TsRpc from '../../Net/TsRpc';
import UserDataManager from '../../Data/UserDataManager';
import { ToastManager } from '../UI/ToastManager';
import EventManager from '../../Base/EventManager';
import { EVENT_ENUM } from '../../Data/Enum';
const { ccclass, property } = _decorator;

@ccclass('BottomRender')
export class BottomRender extends Component {
    private mactchNode: Node = null;

    start() {
        const isCaptain = TeamInfoManager.Instance.IsCaptainInTeam;
        this.mactchNode = this.node.getChildByName("match")
        const children = this.mactchNode.children
        children[0].active = isCaptain
        children[1].active = !isCaptain
        if (isCaptain) {
            UIButtonUtil.initBtn(children[0], () => {
                this.startMatching()
            })
        }
    }

    async startMatching() {
        const data = await TsRpc.Instance.Client.callApi("team/Matching", { __ssoToken: UserDataManager.Instance.SsoToken });
        if (!data.isSucc) {
            ToastManager.showToast(data.err.message);
            return;
        }
        EventManager.Instance.emit(EVENT_ENUM.ShowMatching)
    }

    update(deltaTime: number) {

    }
}


