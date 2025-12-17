import { BaseRequest, BaseResponse, BaseConf } from "../base";

/**【08-18】增加战斗力  game改room*/
export interface ReqAddPower extends BaseRequest {
    /**战斗力变化量 可正可负 正数增加 负数减少*/
    value:number;
}

export interface ResAddPower extends BaseResponse {
    /**变化后的战斗力*/
    value:number;
}

export const conf: BaseConf = {
    needLogin: true,
}