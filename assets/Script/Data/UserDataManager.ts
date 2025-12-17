import EventManager from "../Base/EventManager";
import Singleton from "../Base/Singleton";
import { IPlayer } from "../Net/Shared/models/Interfaces";
import { EVENT_ENUM } from "./Enum";


export default class UserDataManager extends Singleton {
    static get Instance() {
        return super.GetInstance<UserDataManager>();
    }
    private _ssoToken: string = null; // 用户凭证
    private _userInfo: IPlayer = null; // 用户信息

    public get SsoToken() {
        return this._ssoToken
    }

    public set SsoToken(token: string) {
        this._ssoToken = token
    }

    public get UserInfo() {
        return this._userInfo
    }

    public set UserInfo(value: IPlayer) {
        this._userInfo = value
    }

    public get IsCaptain(): boolean {
        return this._userInfo.captain
    }

    public set IsCaptain(v: boolean) {
        this._userInfo.captain = v
    }

    /**
     * 获取当前用户是否死亡,true表示死亡
     */
    public get IsDie(): boolean {
        // 1是死亡，  0是正常
        let n = this._userInfo.isdie;
        return n == 1;
    }

    public set IsDie(value: number) {
        this._userInfo.isdie = value
        EventManager.Instance.emit(EVENT_ENUM.UpdateIsDie)
    }

    public get BagData(): number[] {
        return this._userInfo.bag_data
    }

    public get GameCoin(): number {
        return this._userInfo.user.game_coin || 0
    }

    // 点卷
    public get Point(): number {
        return this._userInfo.point || 0
    }

    /** 更新用户的积分等信息并派发事件 */
    /**
     *  更新用户的积分 电卷信息
     * @param game_coin 积分
     * @param point     点卷
     * @param power     最新武力值
     */
    public updateUserInfo(game_coin: number, point: number, power: number) {
        console.log(`💾 [GameUserData] updateUserInfo 被调用:`, { game_coin, point, power });
        this._userInfo.user.game_coin = game_coin;
        this._userInfo.point = point;
        this._userInfo.power = power;
        console.log(`📡 [GameUserData] 触发UPDATE_USER_INFO事件`);
        EventManager.Instance.emit(EVENT_ENUM.UpdateUserInfo)
    }

    // 更新bag
    public updateBagData(d: number[]) {
        this._userInfo.bag_data = d;
    }
    // 添加新道具
    public addBag(d: number) {
        this._userInfo.bag_data.push(d)
    }

    /**
 * 今日次数是否用光
 */
    public get CanPlayToday(): boolean {
        // true 是可用
        let n = this._userInfo.times_max - this._userInfo.times;
        return n > 0;
    }

    /**
    * 获取当前用户是否可以创建队伍
    */
    public get CanCreartTeam(): boolean {
        let n = this._userInfo.bag_data.indexOf(4);
        return n >= 0;
    }
}