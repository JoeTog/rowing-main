export enum EVENT_ENUM {
    UpdateUserInfo = "UpdateUserInfo", // 更新UserCard玩家信息显示
    RenderHomePop = "RenderHomePop", // HomeManager添加弹窗
    UpdateCaptain = "UpdateCaptain", // 更新是否为队长
    UpdateIsDie = "UpdateIsDie", //更新淘汰信息

    ShowHome = "ShowHome",
    HideHome = "HideHome",
    ToCreatTeam = "ToCreatTeam", // 相同的创建按钮功能
    ShowCreatTeam = "ShowCreatTeam", // 展示创建队伍页面
    HideCreatTeam = "HideCreatTeam", // 隐藏创建队伍页面
    HideHall = "HideHall",
    ShowPkGame = "ShowPkGame",
    HidePkGame = "HidePkGame",
    ShowPkResult = "ShowPkResult",
    ShowMatching = "ShowMatching",
    HideMatching = "HideMatching",
    ShowVs = "ShowVs",

    AddTeamMember = "AddTeamMember", // 添加队员
    DelTeamMember = "DelTeamMember", // 删除队员

    StartGame = "StartGame",
    StopGame = "StopGame",
    RenderGameCountDown = "RenderGameCountDown",
    UpdateGameInfoByNetGameTime = "UpdateGameInfoByNetGameTime",
    RoomDie = "RoomDie",
    RenderTaskLabel = "RenderTaskLabel"
}

export enum MUSIC_PATH_ENUM {
    BtnClick = "Music/ui_click"
}

export enum PREFAB_PATH_ENUM {
    //pop
    BagPrefab = "Prefab/Bag/Bag",
    ShopPrefab = "Prefab/Shop/Shop",
    DjExchangePrefab = "Prefab/DjExchange",
    HallPrefab = "Prefab/Hall/Hall",

    //Home
    UserCard = "Prefab/UserCard",
    
    // creatTeam
    CreatTeamHead = "Prefab/CreatTeam/Head",
    CreateTeamMembers = "Prefab/CreatTeam/TeamMembers",
    CreateTeamMemberItem = "Prefab/CreatTeam/member",
    CreateTeamBottom = "Prefab/CreatTeam/Bottom",

    // PkGame
    PkGameAnim = "Prefab/PkGame/Anim",
    PkGameUI = "Prefab/PkGame/UI",
    PkGameOperator = "Prefab/PkGame/Operator",
    PkGameUse = "Prefab/PkGame/Use",
    PkGameResult = "Prefab/PkGame/PkResult",

    // UI
    UIMatching = "Prefab/UI/UIMatching",
    Vs = "Prefab/UI/Vs"
}

export enum TaskType {
    //休息中
    rest,
    /** 任务进行中 */
    active,
    /** 任务成功 */
    completed,
    /** 任务失败 */
    failed,
}