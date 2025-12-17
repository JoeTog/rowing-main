import { RoomStatus } from "./Enmu";

export interface IUser {
    /**用户id 数据库id */
    uid: number;
    /**账号 */
    account:string;
    /**昵称 */
    nickname:string;
    /**头像 */
    avatar:string;
    /**等级 */
    level:number;
    /**积分 */
    game_coin?:number;
    /**推广会员数 */
    // useful_member:number;
    /**宝石 */
    draw_gem:number;

}



export interface IPlayer {
    /** 【08-21】用户信息 */
    user: IUser;
    /**玩家id = 用户id 数据库id */
    uid: number;
    /**战斗力 */
    power: number;
    /**当前战斗力 */
    powerCur?: number;
    /**点券 */
    point?: number;
    /**总场次 */
    total_games: number;
    /**胜场次 */
    win_games: number;
    /**额外比例 */
    extra_ratio?: number;
    /**背包数据 */
    bag_data?: number[];
    /**是否可以为队长 背包里是否包含id为4的道具 */
    captain?:boolean;
    /**今日游戏次数 */
    times?:number;
    /**今日游戏次数上限 */
    times_max?:number;

    /**【08-18】难度 */
    difficulty:{
        /**变化频率 */
        frequency:number;
        /**增加量 */
        add:number;
        /**减少量 */
        reduce:number;
    }

    /**【08-18】是否淘汰 */
    isdie:number;
    /**【持久化】队伍ID，0表示不在队伍中 */
    teamId?: number;
    /**【10-11】是否为虚拟玩家（机器人） */
    virtual?: boolean;
    /**冻结的武力值数量 */
    freezePower?: number;
}

export interface ITeamBase {
    /**队伍id */
    id: number;
    /**队伍名称 */
    name: string;
    /**队伍人数 */
    playersCount?: number;

    /**【08-21】队伍头像 */
    avatar:string;

    /**队伍状态 */
    status: number;
}

export interface ITeam extends ITeamBase {
    /**队伍密码（可选） */
    password?: string;
    /**在线人数 */
    onlineCount?: number;
    /**总人数 */
    totalCount?: number;
    /**队长UID */
    captainUid?: number;

    /**队伍成员 */
    players?:IPlayer[];
    /**队伍总战斗力 */
    allPowerCur?:number;
    roomId?:number //房间id
    roomIndex?:number //房间中的位置
}


export interface IRoom {
    /**房间id */
    id:number;
    /**队伍 */
    teams:ITeam[];
    /**房间状态 */
    status:RoomStatus;
    /**房间时间 */
    time:number;
}

export interface IShopItem {
    /**道具ID */
    id: number;
    /**道具名称 */
    name: string;
    /**价格 */
    price: number;
    /**数量 */
    // num: number;
    /**描述 */
    desc: string;
    /**【08-28】是否可以使用 0否 1是 */
    use: number;

    /**状态，最大数量，0不限制 */
    status: number;
}


export interface IGameRecord {
    match_id:number;
    captain_id:number;
    team_flag:number;
    team_res:number;
    create_time:Date;
}

// 任务系统相关接口

/**
 * 难度档位接口
 */
export interface DifficultyTier {
  id: number;
  name: string;
  minGames: number;
  maxGames: number | null;
  duration: number;
  targetSwipes: number;
  sortOrder: number;
}

/**
 * 任务配置接口
 */
export interface TaskConfig {
  duration: number;
  targetSwipes: number;
  isCustom: boolean;
}

/**
 * 任务状态接口
 */
export interface TaskState {
  startTime: number;
  duration: number;
  targetSwipes: number;
  currentSwipes: number;
  lastSwipeTime: number;
  status: 'active' | 'rest' | 'completed' | 'failed';
  restEndTime?: number;
  taskIndex?: number;
}
