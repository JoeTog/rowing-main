import { WsClient } from 'tsrpc-browser';
import { serviceProto, ServiceType } from './Shared/protocols/serviceProto';
import Singleton from '../Base/Singleton';
import { WsConfig } from '../Config';
import ListenMsgManager from './ListenMsgManager';

export default class TsRpc extends Singleton {
    static get Instance() {
        return super.GetInstance<TsRpc>();
    }

    private clientService: WsClient<ServiceType> = null;

    public async init(): Promise<{
        isSucc: boolean;
        errMsg?: string;
    }> {
        if (this.clientService?.isConnected) return { isSucc: true };
        this.clientService = new WsClient(serviceProto, WsConfig);

        this.clientService.flows.preApiReturnFlow.push(v => {
            // 检查登录
            // 检查是否需要登录
            if (!v.return.isSucc && v.return.err && v.return.err.needLogin) {
                console.warn('登录失效，需要重新登录');
                // 显示提示并刷新页面
            }
            return v;
        })

        const result = await this.clientService.connect()
        if (result.isSucc) {
            ListenMsgManager.Instance.init(this.clientService)
        }
        return result
    }

    public get Client(): WsClient<ServiceType> {
        return this.clientService;
    }
} 