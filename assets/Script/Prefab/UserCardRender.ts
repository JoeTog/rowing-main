import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame } from 'cc';
import UserDataManager from '../Data/UserDataManager';
import { BigNumUtils, loadAvatar, resAssetLoad, truncateString } from '../Base/Utils';
import { IMG_URL_EXTRA_PARAM } from '../Config';
import { EVENT_ENUM, PREFAB_PATH_ENUM } from '../Data/Enum';
import { UIButtonUtil } from '../Base/UIButtonUtil';
import EventManager from '../Base/EventManager';
const { ccclass, property } = _decorator;

@ccclass('UserCardRender')
export class UserCardRender extends Component {
    @property(Sprite)
    avatar_img: Sprite = null;
    @property(Label)
    vip_level: Label = null;
    @property(Label)
    nickname: Label = null;
    @property(Label)
    power_value: Label = null;
    @property(Label)
    win_value: Label = null;
    @property(Label)
    dj_value: Label = null;
    @property(Label)
    remain_value: Label = null;

    private bagNode: Node = null;
    private shopNode: Node = null;
    private djNode: Node = null;

    onLoad() {
        this.doRender();
        EventManager.Instance.on(EVENT_ENUM.UpdateUserInfo, this.doRender, this)
        this.bagNode = this.node.getChildByName("bag").getChildByName("icon")
        this.shopNode = this.node.getChildByName("shop").getChildByName("icon")
        this.djNode = this.node.getChildByName("dj")
        UIButtonUtil.initBtn(this.bagNode, () => {
           EventManager.Instance.emit(EVENT_ENUM.RenderHomePop, PREFAB_PATH_ENUM.BagPrefab)
        })
        UIButtonUtil.initBtn(this.shopNode, () => {
            EventManager.Instance.emit(EVENT_ENUM.RenderHomePop, PREFAB_PATH_ENUM.ShopPrefab)
        })
        UIButtonUtil.initBtn(this.djNode, () => {
             EventManager.Instance.emit(EVENT_ENUM.RenderHomePop, PREFAB_PATH_ENUM.DjExchangePrefab)
        })
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.UpdateUserInfo, this.doRender, this)
    }

    doRender() {
        let {
            user, power, win_games, total_games, point, times, times_max
        } = UserDataManager.Instance.UserInfo;
        let { level, nickname, avatar } = user;
        this.vip_level.string = level + "";
        this.nickname.string = truncateString(nickname);
        this.power_value.string = BigNumUtils.getNumberString(power);
        this.dj_value.string = BigNumUtils.getNumberString(point);

        const remainingTimes = times_max - times;
        this.remain_value.string = "剩余次数: " + remainingTimes;

        let winnum = win_games == 0 && total_games == 0 ? 0 : (win_games / total_games) * 100;
        this.win_value.string = winnum.toFixed(2) + "%";

        loadAvatar(avatar + IMG_URL_EXTRA_PARAM).then((res: SpriteFrame) => {
            this.avatar_img.spriteFrame = res;
        })
    }

    update(deltaTime: number) {

    }
}


