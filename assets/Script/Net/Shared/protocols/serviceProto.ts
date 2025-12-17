import { ServiceProto } from 'tsrpc-proto';
import { ReqGetConfig, ResGetConfig } from './PtlGetConfig';
import { MsgDie } from './room/MsgDie';
import { MsgGameEnd } from './room/MsgGameEnd';
import { MsgGameTime } from './room/MsgGameTime';
import { MsgTaskComplete } from './room/MsgTaskComplete';
import { MsgTaskCountdown } from './room/MsgTaskCountdown';
import { MsgTaskEnd } from './room/MsgTaskEnd';
import { MsgTaskProgress } from './room/MsgTaskProgress';
import { MsgTaskRecover } from './room/MsgTaskRecover';
import { MsgTaskStart } from './room/MsgTaskStart';
import { ReqAddPower, ResAddPower } from './room/PtlAddPower';
import { ReqGetRoomInfo, ResGetRoomInfo } from './room/PtlGetRoomInfo';
import { ReqBuyItem, ResBuyItem } from './shop/PtlBuyItem';
import { ReqExchangePoint, ResExchangePoint } from './shop/PtlExchangePoint';
import { ReqGetItemList, ResGetItemList } from './shop/PtlGetItemList';
import { ReqMergeItem, ResMergeItem } from './shop/PtlMergeItem';
import { ReqUseItem, ResUseItem } from './shop/PtlUseItem';
import { MsgMatchFail } from './team/MsgMatchFail';
import { MsgMatchSuccess } from './team/MsgMatchSuccess';
import { MsgTeamClose } from './team/MsgTeamClose';
import { MsgTeamJoin } from './team/MsgTeamJoin';
import { MsgTeamLeave } from './team/MsgTeamLeave';
import { MsgTeamListAdd } from './team/MsgTeamListAdd';
import { MsgTeamListRemove } from './team/MsgTeamListRemove';
import { MsgTeamListUpdate } from './team/MsgTeamListUpdate';
import { MsgTeamStatusChange } from './team/MsgTeamStatusChange';
import { ReqCancelMatching, ResCancelMatching } from './team/PtlCancelMatching';
import { ReqCreateTeam, ResCreateTeam } from './team/PtlCreateTeam';
import { ReqGetTeamInfo, ResGetTeamInfo } from './team/PtlGetTeamInfo';
import { ReqGetTeamList, ResGetTeamList } from './team/PtlGetTeamList';
import { ReqGetTeamPlayerInfo, ResGetTeamPlayerInfo } from './team/PtlGetTeamPlayerInfo';
import { ReqJoinTeam, ResJoinTeam } from './team/PtlJoinTeam';
import { ReqKick, ResKick } from './team/PtlKick';
import { ReqLeaveTeam, ResLeaveTeam } from './team/PtlLeaveTeam';
import { ReqMatching, ResMatching } from './team/PtlMatching';
import { ReqChecktoken, ResChecktoken } from './user/PtlChecktoken';
import { ReqGetGameRecord, ResGetGameRecord } from './user/PtlGetGameRecord';
import { ReqGetInfo, ResGetInfo } from './user/PtlGetInfo';
import { ReqGetStatus, ResGetStatus } from './user/PtlGetStatus';
import { ReqLogin, ResLogin } from './user/PtlLogin';

export interface ServiceType {
    api: {
        "GetConfig": {
            req: ReqGetConfig,
            res: ResGetConfig
        },
        "room/AddPower": {
            req: ReqAddPower,
            res: ResAddPower
        },
        "room/GetRoomInfo": {
            req: ReqGetRoomInfo,
            res: ResGetRoomInfo
        },
        "shop/BuyItem": {
            req: ReqBuyItem,
            res: ResBuyItem
        },
        "shop/ExchangePoint": {
            req: ReqExchangePoint,
            res: ResExchangePoint
        },
        "shop/GetItemList": {
            req: ReqGetItemList,
            res: ResGetItemList
        },
        "shop/MergeItem": {
            req: ReqMergeItem,
            res: ResMergeItem
        },
        "shop/UseItem": {
            req: ReqUseItem,
            res: ResUseItem
        },
        "team/CancelMatching": {
            req: ReqCancelMatching,
            res: ResCancelMatching
        },
        "team/CreateTeam": {
            req: ReqCreateTeam,
            res: ResCreateTeam
        },
        "team/GetTeamInfo": {
            req: ReqGetTeamInfo,
            res: ResGetTeamInfo
        },
        "team/GetTeamList": {
            req: ReqGetTeamList,
            res: ResGetTeamList
        },
        "team/GetTeamPlayerInfo": {
            req: ReqGetTeamPlayerInfo,
            res: ResGetTeamPlayerInfo
        },
        "team/JoinTeam": {
            req: ReqJoinTeam,
            res: ResJoinTeam
        },
        "team/Kick": {
            req: ReqKick,
            res: ResKick
        },
        "team/LeaveTeam": {
            req: ReqLeaveTeam,
            res: ResLeaveTeam
        },
        "team/Matching": {
            req: ReqMatching,
            res: ResMatching
        },
        "user/Checktoken": {
            req: ReqChecktoken,
            res: ResChecktoken
        },
        "user/GetGameRecord": {
            req: ReqGetGameRecord,
            res: ResGetGameRecord
        },
        "user/GetInfo": {
            req: ReqGetInfo,
            res: ResGetInfo
        },
        "user/GetStatus": {
            req: ReqGetStatus,
            res: ResGetStatus
        },
        "user/Login": {
            req: ReqLogin,
            res: ResLogin
        }
    },
    msg: {
        "room/Die": MsgDie,
        "room/GameEnd": MsgGameEnd,
        "room/GameTime": MsgGameTime,
        "room/TaskComplete": MsgTaskComplete,
        "room/TaskCountdown": MsgTaskCountdown,
        "room/TaskEnd": MsgTaskEnd,
        "room/TaskProgress": MsgTaskProgress,
        "room/TaskRecover": MsgTaskRecover,
        "room/TaskStart": MsgTaskStart,
        "team/MatchFail": MsgMatchFail,
        "team/MatchSuccess": MsgMatchSuccess,
        "team/TeamClose": MsgTeamClose,
        "team/TeamJoin": MsgTeamJoin,
        "team/TeamLeave": MsgTeamLeave,
        "team/TeamListAdd": MsgTeamListAdd,
        "team/TeamListRemove": MsgTeamListRemove,
        "team/TeamListUpdate": MsgTeamListUpdate,
        "team/TeamStatusChange": MsgTeamStatusChange
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 75,
    "services": [
        {
            "id": 41,
            "name": "GetConfig",
            "type": "api",
            "conf": {}
        },
        {
            "id": 46,
            "name": "room/Die",
            "type": "msg"
        },
        {
            "id": 39,
            "name": "room/GameEnd",
            "type": "msg"
        },
        {
            "id": 35,
            "name": "room/GameTime",
            "type": "msg"
        },
        {
            "id": 47,
            "name": "room/TaskComplete",
            "type": "msg"
        },
        {
            "id": 52,
            "name": "room/TaskCountdown",
            "type": "msg"
        },
        {
            "id": 51,
            "name": "room/TaskEnd",
            "type": "msg"
        },
        {
            "id": 48,
            "name": "room/TaskProgress",
            "type": "msg"
        },
        {
            "id": 49,
            "name": "room/TaskRecover",
            "type": "msg"
        },
        {
            "id": 50,
            "name": "room/TaskStart",
            "type": "msg"
        },
        {
            "id": 36,
            "name": "room/AddPower",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 38,
            "name": "room/GetRoomInfo",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 24,
            "name": "shop/BuyItem",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 25,
            "name": "shop/ExchangePoint",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 23,
            "name": "shop/GetItemList",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 44,
            "name": "shop/MergeItem",
            "type": "api",
            "conf": {}
        },
        {
            "id": 45,
            "name": "shop/UseItem",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 31,
            "name": "team/MatchFail",
            "type": "msg"
        },
        {
            "id": 32,
            "name": "team/MatchSuccess",
            "type": "msg"
        },
        {
            "id": 12,
            "name": "team/TeamClose",
            "type": "msg"
        },
        {
            "id": 13,
            "name": "team/TeamJoin",
            "type": "msg"
        },
        {
            "id": 14,
            "name": "team/TeamLeave",
            "type": "msg"
        },
        {
            "id": 20,
            "name": "team/TeamListAdd",
            "type": "msg"
        },
        {
            "id": 21,
            "name": "team/TeamListRemove",
            "type": "msg"
        },
        {
            "id": 22,
            "name": "team/TeamListUpdate",
            "type": "msg"
        },
        {
            "id": 43,
            "name": "team/TeamStatusChange",
            "type": "msg"
        },
        {
            "id": 26,
            "name": "team/CancelMatching",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 15,
            "name": "team/CreateTeam",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 16,
            "name": "team/GetTeamInfo",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 17,
            "name": "team/GetTeamList",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 27,
            "name": "team/GetTeamPlayerInfo",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 18,
            "name": "team/JoinTeam",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 42,
            "name": "team/Kick",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 19,
            "name": "team/LeaveTeam",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 28,
            "name": "team/Matching",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 9,
            "name": "user/Checktoken",
            "type": "api",
            "conf": {}
        },
        {
            "id": 40,
            "name": "user/GetGameRecord",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 10,
            "name": "user/GetInfo",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 34,
            "name": "user/GetStatus",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 11,
            "name": "user/Login",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "PtlGetConfig/ReqGetConfig": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "__ssoToken",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "PtlGetConfig/ResGetConfig": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "game_desc",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "__ssoToken",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "room/MsgDie/MsgDie": {
            "type": "Interface"
        },
        "room/MsgGameEnd/MsgGameEnd": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "winIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "powerInfo",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Number"
                        }
                    }
                },
                {
                    "id": 2,
                    "name": "reward",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "gem",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "freeze",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "playerStatus",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "power",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "isdie",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "freezePower",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "room/MsgGameTime/MsgGameTime": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "status",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Enmu/RoomStatus"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "playerPowerCur",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "info",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "powerMax",
                                    "type": {
                                        "type": "Number"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "powerCur",
                                    "type": {
                                        "type": "Number"
                                    }
                                }
                            ]
                        }
                    },
                    "optional": true
                }
            ]
        },
        "../models/Enmu/RoomStatus": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": 0
                },
                {
                    "id": 1,
                    "value": 1
                },
                {
                    "id": 2,
                    "value": 2
                },
                {
                    "id": 3,
                    "value": 3
                }
            ]
        },
        "room/MsgTaskComplete/MsgTaskComplete": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "success",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 1,
                    "name": "earnedPower",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "restDuration",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "room/MsgTaskCountdown/MsgTaskCountdown": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "taskIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "remainingTime",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "status",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "active"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "rest"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "completed"
                                }
                            },
                            {
                                "id": 3,
                                "type": {
                                    "type": "Literal",
                                    "literal": "failed"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 3,
                    "name": "currentSwipes",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "targetSwipes",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "room/MsgTaskEnd/MsgTaskEnd": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "taskIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "success",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 2,
                    "name": "reason",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "completed"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "timeout"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "failed"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 3,
                    "name": "finalSwipes",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "targetSwipes",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "earnedPower",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "room/MsgTaskProgress/MsgTaskProgress": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "currentSwipes",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "targetSwipes",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "remainingTime",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "room/MsgTaskRecover/MsgTaskRecover": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "taskIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "duration",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "targetSwipes",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "currentSwipes",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "remainingTime",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "status",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "active"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "rest"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "failed"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "room/MsgTaskStart/MsgTaskStart": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "taskIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "duration",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "targetSwipes",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "room/PtlAddPower/ReqAddPower": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "value",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "room/PtlAddPower/ResAddPower": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "value",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "room/PtlGetRoomInfo/ReqGetRoomInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "room/PtlGetRoomInfo/ResGetRoomInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "room",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Interfaces/IRoom"
                    }
                },
                {
                    "id": 1,
                    "name": "roomIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "info",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "name",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "avatar",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "count",
                                    "type": {
                                        "type": "Number"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "id": 3,
                    "name": "serverTimestamp",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "gameStartTimestamp",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "currentPhaseStartTimestamp",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "currentTask",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Interface",
                                    "properties": [
                                        {
                                            "id": 0,
                                            "name": "taskIndex",
                                            "type": {
                                                "type": "Number"
                                            }
                                        },
                                        {
                                            "id": 1,
                                            "name": "status",
                                            "type": {
                                                "type": "String"
                                            }
                                        },
                                        {
                                            "id": 2,
                                            "name": "duration",
                                            "type": {
                                                "type": "Number"
                                            }
                                        },
                                        {
                                            "id": 3,
                                            "name": "targetSwipes",
                                            "type": {
                                                "type": "Number"
                                            }
                                        },
                                        {
                                            "id": 4,
                                            "name": "currentSwipes",
                                            "type": {
                                                "type": "Number"
                                            }
                                        },
                                        {
                                            "id": 5,
                                            "name": "remainingTime",
                                            "type": {
                                                "type": "Number"
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": null
                                }
                            }
                        ]
                    },
                    "optional": true
                }
            ]
        },
        "../models/Interfaces/IRoom": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "teams",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../models/Interfaces/ITeam"
                        }
                    }
                },
                {
                    "id": 2,
                    "name": "status",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Enmu/RoomStatus"
                    }
                },
                {
                    "id": 3,
                    "name": "time",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "../models/Interfaces/ITeam": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../models/Interfaces/ITeamBase"
                    }
                }
            ],
            "properties": [
                {
                    "id": 8,
                    "name": "password",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 9,
                    "name": "onlineCount",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 10,
                    "name": "totalCount",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 11,
                    "name": "captainUid",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "players",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../models/Interfaces/IPlayer"
                        }
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "allPowerCur",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "roomId",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "roomIndex",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "../models/Interfaces/ITeamBase": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "playersCount",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "avatar",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "status",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "../models/Interfaces/IPlayer": {
            "type": "Interface",
            "properties": [
                {
                    "id": 14,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Interfaces/IUser"
                    }
                },
                {
                    "id": 8,
                    "name": "uid",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "power",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 11,
                    "name": "powerCur",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "point",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "total_games",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "win_games",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "extra_ratio",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "bag_data",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Number"
                        }
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "captain",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                },
                {
                    "id": 9,
                    "name": "times",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 10,
                    "name": "times_max",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 12,
                    "name": "difficulty",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "frequency",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "add",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 2,
                                "name": "reduce",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 15,
                    "name": "isdie",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 16,
                    "name": "teamId",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 17,
                    "name": "virtual",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                },
                {
                    "id": 18,
                    "name": "freezePower",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "../models/Interfaces/IUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "account",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "nickname",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "avatar",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "level",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "game_coin",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "draw_gem",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "shop/PtlBuyItem/ReqBuyItem": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "shop/PtlBuyItem/ResBuyItem": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "shop/PtlExchangePoint/ReqExchangePoint": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "count",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "shop/PtlExchangePoint/ResExchangePoint": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "game_coin",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "point",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "power",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "shop/PtlGetItemList/ReqGetItemList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "shop/PtlGetItemList/ResGetItemList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "items",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../models/Interfaces/IShopItem"
                        }
                    }
                }
            ]
        },
        "../models/Interfaces/IShopItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "price",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "use",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "status",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "shop/PtlMergeItem/ReqMergeItem": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "index0",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "index1",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "index2",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "shop/PtlMergeItem/ResMergeItem": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "bag_data",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Number"
                        }
                    }
                }
            ]
        },
        "shop/PtlUseItem/ReqUseItem": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "index",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "shop/PtlUseItem/ResUseItem": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "bag_data",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Number"
                        }
                    }
                },
                {
                    "id": 3,
                    "name": "isdie",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "team/MsgMatchFail/MsgMatchFail": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "reason",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "waitTime",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "timestamp",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "team/MsgMatchSuccess/MsgMatchSuccess": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "roomId",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "roomIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "info",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "name",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "avatar",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 2,
                                    "name": "count",
                                    "type": {
                                        "type": "Number"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "id": 6,
                    "name": "gameItems",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Number"
                        }
                    }
                }
            ]
        },
        "team/MsgTeamClose/MsgTeamClose": {
            "type": "Interface"
        },
        "team/MsgTeamJoin/MsgTeamJoin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "player",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Interfaces/IPlayer"
                    }
                }
            ]
        },
        "team/MsgTeamLeave/MsgTeamLeave": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "team/MsgTeamListAdd/MsgTeamListAdd": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "team",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Interfaces/ITeamBase"
                    }
                }
            ]
        },
        "team/MsgTeamListRemove/MsgTeamListRemove": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "team/MsgTeamListUpdate/MsgTeamListUpdate": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "team",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Interfaces/ITeamBase"
                    }
                }
            ]
        },
        "team/MsgTeamStatusChange/MsgTeamStatusChange": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "teamId",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "status",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Enmu/TeamStatus"
                    }
                }
            ]
        },
        "../models/Enmu/TeamStatus": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": 0
                },
                {
                    "id": 1,
                    "value": 1
                },
                {
                    "id": 2,
                    "value": 2
                }
            ]
        },
        "team/PtlCancelMatching/ReqCancelMatching": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "team/PtlCancelMatching/ResCancelMatching": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "team/PtlCreateTeam/ReqCreateTeam": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "teamName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "team/PtlCreateTeam/ResCreateTeam": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "team/PtlGetTeamInfo/ReqGetTeamInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "team/PtlGetTeamInfo/ResGetTeamInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 2,
                    "name": "hasTeam",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 1,
                    "name": "info",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Interfaces/ITeam"
                    }
                }
            ]
        },
        "team/PtlGetTeamList/ReqGetTeamList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "team/PtlGetTeamList/ResGetTeamList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "teams",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../models/Interfaces/ITeamBase"
                        }
                    }
                }
            ]
        },
        "team/PtlGetTeamPlayerInfo/ReqGetTeamPlayerInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "team/PtlGetTeamPlayerInfo/ResGetTeamPlayerInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "info",
                    "type": {
                        "type": "Intersection",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Reference",
                                    "target": "../models/Interfaces/IUser"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Reference",
                                    "target": "../models/Interfaces/IPlayer"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "team/PtlJoinTeam/ReqJoinTeam": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "team/PtlJoinTeam/ResJoinTeam": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "team/PtlKick/ReqKick": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "team/PtlKick/ResKick": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "team/PtlLeaveTeam/ReqLeaveTeam": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "team/PtlLeaveTeam/ResLeaveTeam": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "team/PtlMatching/ReqMatching": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "team/PtlMatching/ResMatching": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "user/PtlChecktoken/ReqChecktoken": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlChecktoken/ResChecktoken": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "result",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "user/PtlGetGameRecord/ReqGetGameRecord": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "user/PtlGetGameRecord/ResGetGameRecord": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../models/Interfaces/IGameRecord"
                        }
                    }
                }
            ]
        },
        "../models/Interfaces/IGameRecord": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "match_id",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "captain_id",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "team_flag",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "team_res",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "create_time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "user/PtlGetInfo/ReqGetInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlGetInfo/ResGetInfo": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 14,
                    "name": "info",
                    "type": {
                        "type": "Intersection",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Reference",
                                    "target": "../models/Interfaces/IUser"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Reference",
                                    "target": "../models/Interfaces/IPlayer"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 15,
                    "name": "gameItems",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Number"
                        }
                    }
                }
            ]
        },
        "user/PtlGetStatus/ReqGetStatus": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlGetStatus/ResGetStatus": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "teamId",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "roomId",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "taskState",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "taskIndex",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "duration",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 2,
                                "name": "targetSwipes",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 3,
                                "name": "currentSwipes",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 4,
                                "name": "remainingTime",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 5,
                                "name": "status",
                                "type": {
                                    "type": "Union",
                                    "members": [
                                        {
                                            "id": 0,
                                            "type": {
                                                "type": "Literal",
                                                "literal": "active"
                                            }
                                        },
                                        {
                                            "id": 1,
                                            "type": {
                                                "type": "Literal",
                                                "literal": "rest"
                                            }
                                        },
                                        {
                                            "id": 2,
                                            "type": {
                                                "type": "Literal",
                                                "literal": "completed"
                                            }
                                        },
                                        {
                                            "id": 3,
                                            "type": {
                                                "type": "Literal",
                                                "literal": "failed"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "optional": true
                }
            ]
        },
        "user/PtlLogin/ReqLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "account",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "user/PtlLogin/ResLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "__ssoToken",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        }
    }
};