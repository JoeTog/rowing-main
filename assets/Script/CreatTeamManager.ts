import { _decorator, Component, instantiate, Node, Prefab, Widget } from 'cc';
import { EVENT_ENUM, PREFAB_PATH_ENUM } from './Data/Enum';
import { resAssetLoad } from './Base/Utils';
import EventManager from './Base/EventManager';
import { ToastManager } from './Prefab/UI/ToastManager';
import { LoadingManager } from './Prefab/UI/LoadingManager';
const { ccclass, property } = _decorator;

@ccclass('CreatTeamManager')
export class CreatTeamManager extends Component {
    @property(Prefab)
    UserCard: Prefab = null;

    private _needLoadPrefabPath = [PREFAB_PATH_ENUM.CreatTeamHead, PREFAB_PATH_ENUM.UserCard, PREFAB_PATH_ENUM.CreateTeamMembers, PREFAB_PATH_ENUM.CreateTeamBottom]
    protected async onLoad() {
        // 监听解散队伍 关闭页面
        EventManager.Instance.on(EVENT_ENUM.HideCreatTeam, this.hide, this)
        EventManager.Instance.on(EVENT_ENUM.ShowCreatTeam, this.doRender, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.HideCreatTeam, this.hide)
        EventManager.Instance.off(EVENT_ENUM.ShowCreatTeam, this.doRender)
    }

    async doRender() {
        let arr = []
        for (let index = 0; index < this._needLoadPrefabPath.length; index++) {
            const path = this._needLoadPrefabPath[index];
            arr.push(resAssetLoad<Prefab>(path, Prefab))
        }
        Promise.all(arr).then((res) => {
            LoadingManager.hideLoading()
            res.forEach(el => {
                const node = instantiate(el);
                if (node.name === "UserCard") {
                    node.getComponent(Widget).top = 80
                }
                this.node.addChild(node)
                
            })
        })
    }

    addUserCard() {
        const usercardNode = instantiate(this.UserCard)
        usercardNode.getComponent(Widget).top = 80;
        this.node.addChild(usercardNode)
    }

    hide(isClose: boolean = false) {
        this.node.destroyAllChildren()
        if (isClose) {
            ToastManager.showToast("队伍解散")
        }
        EventManager.Instance.emit(EVENT_ENUM.ShowHome)
    }

    update(deltaTime: number) {

    }
}


