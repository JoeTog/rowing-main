import { _decorator, Component, Node } from 'cc';
import TsRpc from './Net/TsRpc';
import UserDataManager from './Data/UserDataManager';
import { HomeManager } from './HomeManager';
import TeamInfoManager from './Data/TeamInfoManager';
import EventManager from './Base/EventManager';
import { EVENT_ENUM } from './Data/Enum';
import { ToastManager } from './Prefab/UI/ToastManager';
import { LoadingManager } from './Prefab/UI/LoadingManager';
import { getUrlParam } from './Base/Utils';
import { WsConfig } from './Config';
import GameDataManager from './Data/GameDataManager';
const { ccclass, property } = _decorator;

@ccclass('Start')
export class Start extends Component {
    async start() {
        LoadingManager.showLoading()
        // 链接ws 获取用户信息
        await this.doLogin()
        // 加载资源
    }

    private hotFix(){
        console.log('hotFix333');
    }

    private async doLogin() {
        let getUrl = getUrlParam();
        let { u, p, i } = getUrl as { u: string, p: string, i: string };
        if (i != null) WsConfig.server = 'wss://' + i;
        const client = await TsRpc.Instance.init();
        if (!client.isSucc) {
            return
        }
        const data = await TsRpc.Instance.Client.callApi("user/Login", {
            account: u,
            password: "123"
        })

        // 登录失败
        if (!data?.isSucc) {
            ToastManager.showToast("登录失败，页面将自动刷新重新登录");
            return;
        }

        UserDataManager.Instance.SsoToken = data.res.__ssoToken;
        //获取用户信息
        const userData = await TsRpc.Instance.Client.callApi("user/GetInfo", { __ssoToken: data.res.__ssoToken });
        const teamData = await TsRpc.Instance.Client.callApi("user/GetStatus", { __ssoToken: data.res.__ssoToken });
        if (!teamData.isSucc) {
            ToastManager.showToast("获取用户状态失败，页面将自动刷新重新登录")
            /**TODO
             *             setTimeout(() => {
                window.location.reload();
            }, 2000);
             */
            return;
        }
        const userInfo = userData.res.info;
        UserDataManager.Instance.UserInfo = userInfo;
        // this.node.getComponent(HomeManager).doRender()
        // this.node.getChildByName("Role").active = true

        // TODO: 优化首次页面加载
        const SsoToken = UserDataManager.Instance.SsoToken
        if (teamData.res.teamId > 0 && teamData.res.roomId > 0) {
            // 表示在游戏中,请求获取队伍信息，直接进入
            const teamInfo = await TsRpc.Instance.Client.callApi("team/GetTeamInfo", { __ssoToken: SsoToken });
            TeamInfoManager.Instance.TeamInfo = teamInfo.res.info
            const pk_info = await TsRpc.Instance.Client.callApi("room/GetRoomInfo", { __ssoToken: SsoToken });
            GameDataManager.Instance.restoreGame(pk_info.res.roomIndex, pk_info.res.info, userData.res.gameItems, pk_info.res.currentTask?.status)
        } else if (teamData.res.teamId > 0) {
            const teamInfo = await TsRpc.Instance.Client.callApi("team/GetTeamInfo", { __ssoToken: SsoToken });
            TeamInfoManager.Instance.TeamInfo = teamInfo.res.info
            EventManager.Instance.emit(EVENT_ENUM.ShowCreatTeam);
        } else {
            EventManager.Instance.emit(EVENT_ENUM.ShowHome, false)
        }
    }
}


