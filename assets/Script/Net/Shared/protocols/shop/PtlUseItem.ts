import { BaseRequest, BaseResponse, BaseConf } from "../base";

/**【08-28】使用道具 */
export interface ReqUseItem extends BaseRequest {
    /**道具在背包中的位置 */
    index: number;
}

export interface ResUseItem extends BaseResponse {
    /**背包数据 */
    bag_data: number[];
    /**是否淘汰 0否 1是 */
    isdie: number;
    /**提示信息 */
    msg: string;
}

export const conf: BaseConf = {
    needLogin: true,
}