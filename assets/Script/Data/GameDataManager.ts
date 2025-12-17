import EventManager from "../Base/EventManager";
import Singleton from "../Base/Singleton";
import { MsgGameEnd } from "../Net/Shared/protocols/room/MsgGameEnd";
import { MsgGameTime } from "../Net/Shared/protocols/room/MsgGameTime";
import { MsgTaskComplete } from "../Net/Shared/protocols/room/MsgTaskComplete";
import { MsgTaskCountdown } from "../Net/Shared/protocols/room/MsgTaskCountdown";
import { MsgTaskEnd } from "../Net/Shared/protocols/room/MsgTaskEnd";
import { MsgTaskStart } from "../Net/Shared/protocols/room/MsgTaskStart";
import { MsgMatchFail } from "../Net/Shared/protocols/team/MsgMatchFail";
import { MsgMatchSuccess } from "../Net/Shared/protocols/team/MsgMatchSuccess";
import { ToastManager } from "../Prefab/UI/ToastManager";
import { EVENT_ENUM, TaskType } from "./Enum";
/**
 * 
        {
            name: "ceshi1",
            avatar: "https://mpjx-1258409963.cos.ap-shanghai.myqcloud.com/dc7c820251107141653948.jpg",
            count: 10
        },
        {
            name: "ceshi2",
            avatar: "https://mpjx-1258409963.cos.ap-shanghai.myqcloud.com/dc7c820251107141653948.jpg",
            count: 1
        }
    
 */
export default class GameDataManager extends Singleton {
    private _gameItems: number[] = []
    private _myteamIndex: number = 0;
    private _vsTeamInfo: {
        name: string,
        avatar: string,
        count: number
    }[] = []
    private _inPlaying: boolean = false
    private _taskType: TaskType = null;
    private _gameResult: MsgGameEnd = null;

    static get Instance() {
        return super.GetInstance<GameDataManager>();
    }

    public get GameItems() {
        return this._gameItems
    }

    public get MyTeamIndex() {
        return this._myteamIndex
    }

    public get EnemyTeamIndex() {
        return this._myteamIndex == 0 ? 1 : 0
    }

    public get TaskType() {
        return this._taskType
    }

    public get GameResult() {
        return this._gameResult
    }

    public get VsTeamInfo() {
        return this._vsTeamInfo
    }

    private _reset() {
        this._gameItems = []
        this._myteamIndex = 0;
        this._vsTeamInfo = []
        this._inPlaying = false
        this._taskType = null;
        this._gameResult = null;
    }

    public dealMatchSuccess(data: MsgMatchSuccess) {
        this._gameItems = data.gameItems
        this._myteamIndex = data.roomIndex
        this._vsTeamInfo = data.info
        EventManager.Instance.emit(EVENT_ENUM.ShowVs)
    }

    public restoreGame(teamIndex, vsTeamInfo, gameItems, taskType?) {
        this._gameItems = gameItems
        this._myteamIndex = teamIndex
        this._vsTeamInfo = vsTeamInfo
        if (taskType === "active") {
            this._taskType = TaskType.active
            this._inPlaying = true
        } else if (taskType === "rest" || taskType === "completed") {
            this._taskType = TaskType.rest
            this._inPlaying = true
        } else {
            this._inPlaying = false
        }
        EventManager.Instance.emit(EVENT_ENUM.ShowPkGame)
    }

    public dealMatchFail(d: MsgMatchFail) {
        EventManager.Instance.emit(EVENT_ENUM.HideMatching)
        ToastManager.showToast(d.reason)
    }

    public get InPlaying() {
        return this._inPlaying
    }

    private _startGame() {
        this._inPlaying = true
        EventManager.Instance.emit(EVENT_ENUM.StartGame)
        EventManager.Instance.emit(EVENT_ENUM.RenderGameCountDown, 0)
    }

    private _stopGame() {
        this._inPlaying = false
        EventManager.Instance.emit(EVENT_ENUM.StopGame)
    }

    public dealGameTime(data: MsgGameTime) {
        // 倒计时阶段
        if (data.status === 0) {
            EventManager.Instance.emit(EVENT_ENUM.RenderGameCountDown, data.time)
            return
        }
        // 游戏中
        if (data.status === 1) {
            // 游戏当开始
            if (!this._inPlaying) this._startGame()
            if (data.info) {
                let myTeamInfo = data.info[this.MyTeamIndex]
                let enemyTeamInfo = data.info[this.EnemyTeamIndex]
                EventManager.Instance.emit(EVENT_ENUM.UpdateGameInfoByNetGameTime, myTeamInfo.powerMax, myTeamInfo.powerCur, enemyTeamInfo.powerCur, data.playerPowerCur, data.time)
            }
        }
    }

    public dealRoomDie() {
        EventManager.Instance.emit(EVENT_ENUM.RoomDie)
        this._stopGame()
    }

    public dealTaskStart(msg: MsgTaskStart) {
        let str = `任务${msg.taskIndex}：0/${msg.targetSwipes}  剩余时间：${msg.duration}`
        this._taskType = TaskType.active
        EventManager.Instance.emit(EVENT_ENUM.RenderTaskLabel, true, str, true)
    }

    public dealTaskComplete(msg?: MsgTaskComplete) {
        let str = "中场休息中..."
        this._taskType = TaskType.rest
        EventManager.Instance.emit(EVENT_ENUM.RenderTaskLabel, true, str)
    }

    public dealTaskCountDown(msg: MsgTaskCountdown) {
        if (msg.status === "rest") {
            let str = "中场休息中..."
            this._taskType = TaskType.rest
            EventManager.Instance.emit(EVENT_ENUM.RenderTaskLabel, true, str)
            return
        }
        if (msg.status === "active") {
            this._taskType = TaskType.active
            let str = `任务${msg.taskIndex}：${msg.currentSwipes}/${msg.targetSwipes}  剩余时间：${msg.remainingTime}`
            EventManager.Instance.emit(EVENT_ENUM.RenderTaskLabel, true, str)
        }
    }

    public dealTaskEnd(msg?: MsgTaskEnd) {
        this._taskType = TaskType.failed
        EventManager.Instance.emit(EVENT_ENUM.RenderTaskLabel, false)
    }

    public dealGameEnd(msg: MsgGameEnd) {
        this._gameResult = msg;
        EventManager.Instance.emit(EVENT_ENUM.ShowPkResult)
    }
}