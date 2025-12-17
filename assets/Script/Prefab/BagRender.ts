import { _decorator, Component, EventTouch, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, tween, v3 } from 'cc';
import { BAG_CONFIG } from '../Config';
import { resAssetLoad } from '../Base/Utils';
import { UIButtonUtil } from '../Base/UIButtonUtil';
import UserDataManager from '../Data/UserDataManager';
import TsRpc from '../Net/TsRpc';
import { ToastManager } from './UI/ToastManager';
const { ccclass, property } = _decorator;

@ccclass('BagRender')
export class BagRender extends Component {
    @property(Prefab)
    bagItem: Prefab = null;
    @property(Node)
    containNode: Node = null;

    private popNode: Node = null;
    private closeNode: Node = null;
    private tipNode: Node = null;

    protected onLoad(): void {
        this.popNode = this.node.getChildByName("pop")
        this.tipNode = this.popNode.getChildByName("tip")
        this.popNode.setScale(v3(0, 0, 0));
        // 动画效果
        tween(this.popNode)
            .to(0.2, { scale: v3(1, 1, 1) }, { easing: 'backInOut' })
            .start();

        this.closeNode = this.popNode.getChildByName("close")
        UIButtonUtil.initBtn(this.closeNode, () => {
            this.node.destroy();
        })
        this.doRender()
    }

    protected onDestroy(): void {
        this.unscheduleAllCallbacks()
    }

    doRender() {
        // 清空内容 防止重复添加
        this.containNode.destroyAllChildren();
        const data = UserDataManager.Instance.BagData;
        if (data.length === 0) {
            this.tipNode.active = true;
            this.containNode.active = false
            return
        }
        this.tipNode.active = false;
        this.containNode.active = true
        let i = 0;
        const render = () => {
            if (i < data.length) {
                this.renderOne(data[i], i);
                i++;
            } else {
                this.unschedule(render);
            }
        };
        this.schedule(render, 0.01);
    }

    // 渲染一个
    renderOne(bagId: number, index: number) {
        const config = BAG_CONFIG[bagId]
        let name = config[0], icon_url = "Texture/bag/icon/" + config[1] + "/spriteFrame";
        const bagItemNode = instantiate(this.bagItem);
        const nameLabel = bagItemNode.getChildByName("name").getComponent(Label);
        const iconSprite = bagItemNode.getChildByName("icon").getComponent(Sprite);
        const btnNode = bagItemNode.getChildByName("btn")
        nameLabel.string = name;
        resAssetLoad<SpriteFrame>(icon_url, SpriteFrame).then(res => {
            iconSprite.spriteFrame = res;
        }).catch((err) => {
            console.log("icon加载失败: " + err)
        })
        UIButtonUtil.initBtn(btnNode, () => {
            this.useProps(index)
        })
        this.containNode.addChild(bagItemNode)
    }

    /**
     * 使用道具
     * @param index 背包数组索引
     */
    async useProps(index: number) {
        let data = await TsRpc.Instance.Client.callApi("shop/UseItem", { __ssoToken: UserDataManager.Instance.SsoToken, index });
        console.log(data);
        // 如果请求成功更新列表数据
        if (data.isSucc) {
            UserDataManager.Instance.updateBagData(data.res.bag_data);
            UserDataManager.Instance.IsDie = data.res.isdie
            ToastManager.showToast(data.res.msg)
            this.delItem(index)
        } else {
            ToastManager.showToast(data?.err?.message || "使用道具失败")
        }
    }

    delItem(index: number) {
        this.containNode.children[index].destroy()
    }

    update(deltaTime: number) {

    }
}


