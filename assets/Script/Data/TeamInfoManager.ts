import EventManager from "../Base/EventManager";
import Singleton from "../Base/Singleton";
import { IPlayer, ITeam } from "../Net/Shared/models/Interfaces";
import { MsgTeamJoin } from "../Net/Shared/protocols/team/MsgTeamJoin";
import { MsgTeamLeave } from "../Net/Shared/protocols/team/MsgTeamLeave";
import { EVENT_ENUM } from "./Enum";
import UserDataManager from "./UserDataManager";


export default class TeamInfoManager extends Singleton {
    static get Instance() {
        return super.GetInstance<TeamInfoManager>();
    }

    private _teamInfo: ITeam = null;

    public get TeamInfo() {
        return this._teamInfo
    }

    public set TeamInfo(v: ITeam) {
        this._teamInfo = v
    }

    // 添加人员
    public addMember(d: MsgTeamJoin) {
        const player = d.player
        this._teamInfo.players.push(player)
        this._teamInfo.playersCount += 1
        EventManager.Instance.emit(EVENT_ENUM.AddTeamMember, player)
    }

    // 删除人员
    public delMember(d: MsgTeamLeave) {
        const uid = d.uid
        const players = this._teamInfo.players
        const index = this._teamInfo.players.findIndex(el => el.uid == uid)
        players.splice(index, 1)
        this._teamInfo.playersCount -= 1
        EventManager.Instance.emit(EVENT_ENUM.DelTeamMember, uid)
    }

    public closeTeam(isClose = false) {
        EventManager.Instance.emit(EVENT_ENUM.HideCreatTeam, isClose)
        this.resetData()
    }

    public resetData() {
        this._teamInfo = null;
    }

    // 在当前队伍中是否是队长
    public get IsCaptainInTeam(): boolean {
        return UserDataManager.Instance.UserInfo.uid == this._teamInfo.id;
    }
}