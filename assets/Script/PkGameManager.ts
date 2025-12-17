import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import EventManager from './Base/EventManager';
import { EVENT_ENUM, PREFAB_PATH_ENUM } from './Data/Enum';
import { resAssetLoad } from './Base/Utils';
const { ccclass, property } = _decorator;

@ccclass('PkGameManager')
export class PkGameManager extends Component {
    private _needLoadPrefabPath = [PREFAB_PATH_ENUM.PkGameAnim, PREFAB_PATH_ENUM.PkGameOperator, PREFAB_PATH_ENUM.PkGameUI, PREFAB_PATH_ENUM.PkGameUse]
    start() {
        EventManager.Instance.on(EVENT_ENUM.ShowPkGame, this.doRender, this)
        EventManager.Instance.on(EVENT_ENUM.HidePkGame, this.hide, this)
        EventManager.Instance.on(EVENT_ENUM.ShowPkResult, this.renderPkResult, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.ShowPkGame, this.doRender)
        EventManager.Instance.off(EVENT_ENUM.HidePkGame, this.hide)
        EventManager.Instance.off(EVENT_ENUM.ShowPkResult, this.renderPkResult)
    }

    doRender() {
        let arr = []
        for (let index = 0; index < this._needLoadPrefabPath.length; index++) {
            const path = this._needLoadPrefabPath[index];
            arr.push(resAssetLoad<Prefab>(path, Prefab))
        }
        Promise.all(arr).then((res) => {
            res.forEach(el => {
                this.node.addChild(instantiate(el))
            })
            // PKGame显示后销毁创建队伍页面和首页 只保留游戏画面
            EventManager.Instance.emit(EVENT_ENUM.HideCreatTeam)
            EventManager.Instance.emit(EVENT_ENUM.HideHome)
        })
    }

    renderPkResult() {
        resAssetLoad<Prefab>(PREFAB_PATH_ENUM.PkGameResult, Prefab).then(res => {
            this.node.addChild(instantiate(res))
        })
    }

    hide() {
        this.node.destroyAllChildren()
    }
}


