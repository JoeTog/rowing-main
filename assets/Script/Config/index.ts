// TsRpc链接配置
export let WsConfig = {
    // server: "ws://127.0.0.1:3005",
    server: "wss://game.jiangsuxingtu.com:3005",
    json: true,
    heartbeat: {
        // 两次心跳检测的间隔时间（毫秒）
        interval: 5000,
        // 发出心跳检测包后，多长时间未收到回复视为超时（毫秒），超时将使连接断开
        timeout: 3000
    },
    logger: console
}

export const IMG_URL_EXTRA_PARAM = '?imageMogr2/thumbnail/100x100/size-limit/100k!'

export const BAG_CONFIG = {
    10: ["助力器", "icon_1"],
    11: ["黄金助力器", "icon_1"],
    12: ["钻石助力器", "icon_1"],
    20: ["双桨", "icon_4"],
    21: ["半碳桨", "icon_4"],
    22: ["全碳桨", "icon_4"],
    3: ["合成器", "icon_2"],
    4: ["旗鼓手", "icon_6"],
    5: ["复活币", "icon_5"],
    6: ["船", "icon_7"],
    7: ["百宝箱", "icon_3"],
}