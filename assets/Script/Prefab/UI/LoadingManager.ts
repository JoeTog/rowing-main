import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadingManager')
export class LoadingManager extends Component {
    @property({ type: Prefab })
    public LoadingPrefab: Prefab = null!;

    private static instance: LoadingManager = null!;
    private _loadingNode: Node = null
    onLoad() {
        LoadingManager.instance = this;
    }

    // 静态方法方便调用
    public static showLoading() {
        if (LoadingManager.instance) {
            LoadingManager.instance.show();
        }
    }

    public static hideLoading() {
        if (LoadingManager.instance) {
            LoadingManager.instance.hide();
        }
    }

    private show() {
        if (!this.LoadingPrefab) {
            console.error('Toast预制体未设置！');
            return;
        }

        // 保证全局就一个
        if (this._loadingNode) {
            return
        }

        // 实例化Toast节点
        this._loadingNode = instantiate(this.LoadingPrefab);
        this.node.addChild(this._loadingNode);
    }

    private hide() {
        if (this._loadingNode) {
            this._loadingNode.destroy()
            this._loadingNode = null
        }
    }
}


