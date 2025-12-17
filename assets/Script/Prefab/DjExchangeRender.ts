import { _decorator, Component, EditBox, Label, Node, tween, v3 } from 'cc';
import { UIButtonUtil } from '../Base/UIButtonUtil';
import UserDataManager from '../Data/UserDataManager';
import { isValidPositiveInteger } from '../Base/Utils';
import { ToastManager } from './UI/ToastManager';
import TsRpc from '../Net/TsRpc';
const { ccclass, property } = _decorator;

@ccclass('DjExchangeRender')
export class DjExchangeRender extends Component {
    @property(EditBox)
    inputValue: EditBox = null;

    private popNode: Node = null;
    private closeNode: Node = null;
    private jifenLabel: Label = null;
    private djLabel: Label = null;
    private tipLabel: Label = null;
    private btnNode: Node = null;

    protected onLoad(): void {
        this.popNode = this.node.getChildByName("pop")
        this.popNode.setScale(v3(0, 0, 0));
        this.jifenLabel = this.popNode.getChildByName("jifen").getChildByName("value").getChildByName("label").getComponent(Label);
        this.djLabel = this.popNode.getChildByName("dj").getChildByName("value").getChildByName("label").getComponent(Label);
        this.tipLabel = this.popNode.getChildByName("tip").getComponent(Label)
        this.btnNode = this.popNode.getChildByName("input").getChildByName("btn")

        // 动画效果
        tween(this.popNode)
            .to(0.2, { scale: v3(1, 1, 1) }, { easing: 'backInOut' })
            .start();

        this.closeNode = this.popNode.getChildByName("close")
        UIButtonUtil.initBtn(this.closeNode, () => {
            this.node.destroy();
        })
        UIButtonUtil.initBtn(this.btnNode, () => {
            this.doExchange()
        })
        this.doRender()
    }

    doRender() {
        this.inputValue.string = ""
        const gameCoin = UserDataManager.Instance.GameCoin
        this.jifenLabel.string = gameCoin + '';
        const point = UserDataManager.Instance.Point;
        this.djLabel.string = Math.round(point * 100) / 100 + '';
        this.tipLabel.string = '积分 ：点卷 =  1 ：10  可兑换 ' + (Math.round(gameCoin * 100) * 10 / 100 || 0);
    }

    doExchange() {
        let numStr = this.inputValue.string.trim();
        if (!isValidPositiveInteger(numStr)) {
            ToastManager.showToast("请输入合理数字!");
            this.inputValue.string = ""
            return;
        }
        let count = parseInt(numStr);
        TsRpc.Instance.Client.callApi("shop/ExchangePoint", { __ssoToken: UserDataManager.Instance.SsoToken, count: count }).then(r => {
            if (r.isSucc) {
                let game_coin = r.res.game_coin || 0;
                let point = r.res.point;
                let power = r.res.power;
                this.jifenLabel.string = game_coin + '';
                this.djLabel.string = Math.round(point * 100) / 100 + '';
                UserDataManager.Instance.updateUserInfo(game_coin, point, power)
                this.tipLabel.string = '积分 ：点卷 =  1 ：10  可兑换 ' + Math.round(game_coin * 100) * 10 / 100;
                this.inputValue.string = "";
                ToastManager.showToast("兑换成功")
            } else {
                ToastManager.showToast("兑换失败")
            }
        })
    }

    update(deltaTime: number) {

    }
}


