/**【08-18】游戏结束消息 */
export interface MsgGameEnd {
    /**胜利队伍 -1平局，0队伍1，1队伍2 */
    winIndex:number;
    powerInfo:number[];
    /**奖励 */
    reward?:{
        /**获得宝石 */
        gem:number;
        /**冻结 */
        freeze:number;
    };
    msg?:string;
    /**【10-12】玩家最新状态 */
    playerStatus?:{
        /**当前武力值 */
        power: number;
        /**是否淘汰 0否 1是 */
        isdie: number;
    };
    /**冻结的武力值（淘汰玩家需要兑换同等数量武力值才能继续参与游戏） */
    freezePower?:number;
}
