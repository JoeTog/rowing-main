import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, tween, v3 } from 'cc';
import { UIButtonUtil } from '../Base/UIButtonUtil';
import TsRpc from '../Net/TsRpc';
import UserDataManager from '../Data/UserDataManager';
import { ToastManager } from './UI/ToastManager';
import { IShopItem } from '../Net/Shared/models/Interfaces';
import { BAG_CONFIG } from '../Config';
import { resAssetLoad } from '../Base/Utils';
const { ccclass, property } = _decorator;

@ccclass('ShopRender')
export class ShopRender extends Component {
    @property(Prefab)
    shopItem: Prefab = null;
    @property(Node)
    containNode: Node = null;

    private popNode: Node = null;
    private closeNode: Node = null;

    private inShopping: boolean = false; // 防止多次购买

    protected onLoad(): void {
        this.popNode = this.node.getChildByName("pop")
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

    async getShopData(): Promise<IShopItem[]> {
        try {
            const data = await TsRpc.Instance.Client.callApi("shop/GetItemList", { __ssoToken: UserDataManager.Instance.SsoToken });
            if (!data.isSucc || !data.res || !data.res.items) {
                console.error('获取商品列表失败:', data.err?.message || '未知错误');
                ToastManager.showToast("获取商品列表失败，请重试")
                return [];
            }
            return data.res.items;
        } catch (error) {
            ToastManager.showToast("获取商品列表失败，请重试")
            return [];
        }
    }

    async doRender() {
        const data = await this.getShopData()
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

    renderOne(data: IShopItem) {
        const config = BAG_CONFIG[data.id]
        let icon_url = "Texture/bag/icon/" + config[1] + "/spriteFrame";
        const bagItemNode = instantiate(this.shopItem);
        const nameLabel = bagItemNode.getChildByName("bg").getChildByName("label").getComponent(Label)
        const iconSprite = bagItemNode.getChildByName("bg").getChildByName("icon").getComponent(Sprite);
        const priceNode = bagItemNode.getChildByName("price")
        const priceLabel = priceNode.getChildByName("label").getComponent(Label)
        nameLabel.string = data.name;
        priceLabel.string = data.price + "";
        resAssetLoad<SpriteFrame>(icon_url, SpriteFrame).then(res => {
            iconSprite.spriteFrame = res;
        }).catch((err) => {
            console.log("icon加载失败: " + err)
        })
        UIButtonUtil.initBtn(priceNode, () => {
            this.buy(data.id, data.price)
        })
        this.containNode.addChild(bagItemNode)
    }

    async buy(id: number, price: number) {
        if (this.inShopping) return;
        this.inShopping = true;
        const data = await TsRpc.Instance.Client.callApi("shop/BuyItem", { __ssoToken: UserDataManager.Instance.SsoToken, id });
        this.inShopping = false;
        if (!data.isSucc) {
            ToastManager.showToast(data.err.message)
            return
        }

        /** TODO:
         * // 判断是否为购买的旗鼓手，如果是进行更新用户显示状态
            if(this.id == GameConfig.getFlagDrummer){
                // 表示购买的旗鼓手
                Scene.inst.node.emit(SceneEnevtType.ON_UPDATE_QGS);
            }
         */

        UserDataManager.Instance.addBag(id)
        let game_coin = UserDataManager.Instance.GameCoin;
        let point = UserDataManager.Instance.Point - price;
        let power = UserDataManager.Instance.UserInfo.power;
        ToastManager.showToast("购买成功")
        UserDataManager.Instance.updateUserInfo(game_coin, point, power);
    }

    update(deltaTime: number) {

    }
}


