import { BaseRequest, BaseResponse, BaseConf } from "../base";

/**
 * 创建队伍请求
 */
export interface ReqCreateTeam extends BaseRequest {
    /**
     * 队伍名称（必填）
     */
    teamName: string;
    /**
     * 队伍密码（可选）
     */
    password?: string;
}

/**
 * 创建队伍响应
 */
export interface ResCreateTeam extends BaseResponse {
    /**
     * 队伍ID
     * 即队长id
     */
    id: number
}

export const conf: BaseConf = {
    needLogin: true,
}
