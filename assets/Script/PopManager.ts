import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import EventManager from './Base/EventManager';
import { EVENT_ENUM, PREFAB_PATH_ENUM } from './Data/Enum';
import { resAssetLoad } from './Base/Utils';
const { ccclass, property } = _decorator;

@ccclass('PopManager')
export class PopManager extends Component {
    start() {
        EventManager.Instance.on(EVENT_ENUM.RenderHomePop, this.popRender, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.RenderHomePop, this.popRender)
    }

    popRender(prefab_url: PREFAB_PATH_ENUM) {
        resAssetLoad<Prefab>(prefab_url, Prefab).then(prefab => {
            const node = instantiate(prefab)
            this.node.addChild(node)
        })
    }

    update(deltaTime: number) {

    }
}


