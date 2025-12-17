import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { LoadingManager } from './Prefab/UI/LoadingManager';
import EventManager from './Base/EventManager';
import { EVENT_ENUM } from './Data/Enum';
import TsRpc from './Net/TsRpc';
import UserDataManager from './Data/UserDataManager';
const { ccclass, property } = _decorator;

@ccclass('HomeManager')
export class HomeManager extends Component {
    @property(Prefab)
    usercard: Prefab = null;    
    
    @property(Prefab)
    homedown: Prefab = null;

    @property(Prefab)
    role: Prefab = null;

    protected onLoad(): void {
        EventManager.Instance.on(EVENT_ENUM.ShowHome, this.showHome, this)
        EventManager.Instance.on(EVENT_ENUM.HideHome, this.hideHome, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.ShowHome, this.showHome)
        EventManager.Instance.off(EVENT_ENUM.HideHome, this.hideHome)
    }

    async showHome(needLogin: boolean = true) {
        if (this.node.children.length > 0) return
        try {
            if (needLogin) {
                const userData = await TsRpc.Instance.Client.callApi("user/GetInfo", { __ssoToken: UserDataManager.Instance.SsoToken });
                const userInfo = userData.res.info;
                UserDataManager.Instance.UserInfo = userInfo;
            }
        } catch (e) { } finally {
            this.doRender()
        }
    }

    hideHome() {
        this.node.destroyAllChildren()
    }

    // 渲染首页
    doRender() {
        const usercardNode = instantiate(this.usercard)
        this.node.addChild(usercardNode);
        const homedownNode = instantiate(this.homedown);
        this.node.addChild(homedownNode)
        const roleNode = instantiate(this.role)
        this.node.addChild(roleNode)
        LoadingManager.hideLoading()
    }
}


