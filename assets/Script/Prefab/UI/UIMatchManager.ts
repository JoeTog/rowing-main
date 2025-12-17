import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import EventManager from '../../Base/EventManager';
import { EVENT_ENUM, PREFAB_PATH_ENUM } from '../../Data/Enum';
import { resAssetLoad } from '../../Base/Utils';
import { ToastManager } from './ToastManager';
const { ccclass, property } = _decorator;

@ccclass('UIMatchManager')
export class UIMatchManager extends Component {
    private _countdownNum = 30;
    private _timeLabel: Label = null

    private _thisNode: Node = null
    start() {
        EventManager.Instance.on(EVENT_ENUM.ShowMatching, this.show, this)
        EventManager.Instance.on(EVENT_ENUM.HideMatching, this.hide, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.ShowMatching, this.show)
        EventManager.Instance.off(EVENT_ENUM.HideMatching, this.hide)
    }

    show() {
        resAssetLoad<Prefab>(PREFAB_PATH_ENUM.UIMatching, Prefab)
            .then(res => {
                const node = instantiate(res);
                this._timeLabel = node.getChildByName("time").getComponent(Label)
                this._timeLabel.string = this._countdownNum + "s"
                this.node.addChild(node)
                this._thisNode = node
                this.CountDownTime()
            })
    }

    hide() {
        this.unscheduleAllCallbacks()
        this._countdownNum = 30;
        this._thisNode.destroy()
    }

    CountDownTime() {
        const countDown = () => {
            if (this._countdownNum <= 0) {
                this.hide();
                return;
            }
            this._countdownNum--;
            this._timeLabel.string = `${this._countdownNum}s`;

        };
        this.schedule(countDown, 1);
    }

    update(deltaTime: number) {

    }
}


