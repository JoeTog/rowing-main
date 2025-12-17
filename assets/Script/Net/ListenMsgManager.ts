import { WsClient } from "tsrpc-browser";
import Singleton from "../Base/Singleton";
import { ServiceType } from "./Shared/protocols/serviceProto";
import EventManager from "../Base/EventManager";
import TeamInfoManager from "../Data/TeamInfoManager";
import GameDataManager from "../Data/GameDataManager";

type MessageHandler = (data: any) => void;
export default class ListenMsgManager extends Singleton {
    static get Instance() {
        return super.GetInstance<ListenMsgManager>();
    }
    private _isInitialized = false;

    private lowFreqMessage: Map<keyof ServiceType['msg'], MessageHandler> = new Map([
        ['team/TeamJoin', (d) => { TeamInfoManager.Instance.addMember(d) }],
        ['team/TeamLeave', (d) => { TeamInfoManager.Instance.delMember(d) }],
        ['team/TeamClose', () => { TeamInfoManager.Instance.closeTeam(true) }],

        ['team/MatchSuccess', (d) => { GameDataManager.Instance.dealMatchSuccess(d) }],
        ['team/MatchFail', (d) => { GameDataManager.Instance.dealMatchFail(d) }],
        ['room/GameTime', (d) => { GameDataManager.Instance.dealGameTime(d) }],
        ['room/Die', () => { GameDataManager.Instance.dealRoomDie() }],

        ['room/TaskStart', (d) => { GameDataManager.Instance.dealTaskStart(d) }],
        ['room/TaskComplete', () => { GameDataManager.Instance.dealTaskComplete() }],
        ['room/TaskCountdown', (d) => { GameDataManager.Instance.dealTaskCountDown(d) }],
        ['room/TaskEnd', () => { GameDataManager.Instance.dealTaskEnd() }],
        ["room/GameEnd", (d) => { GameDataManager.Instance.dealGameEnd(d) }]
    ]);

    /**
    * 初始化网络消息总线
    * @param wsClient tsrpc 客户端实例
    */
    public init(wsClient: WsClient<ServiceType>): void {
        if (this._isInitialized) {
            console.warn('NetworkEventCenter 已初始化，跳过重复初始化');
            return;
        }

        console.log('NetworkEventCenter 开始初始化...');
        // 注册所有消息监听
        this.registerAllMessages(wsClient);
        // 启动高频消息节流处理
        this.startThrottleLoop();
        this._isInitialized = true;
        console.log('NetworkEventCenter 初始化完成');
    }

    registerAllMessages(wsClient: WsClient<ServiceType>) {
        this.registerLowFreqMessages(wsClient)
    }

    registerLowFreqMessages(wsClient: WsClient<ServiceType>) {
        for (let [msgName, func] of this.lowFreqMessage) {
            wsClient.listenMsg(msgName, (msg: any) => {
                func(msg)
            })
        }
    }

    //TODO
    startThrottleLoop() {

    }
}