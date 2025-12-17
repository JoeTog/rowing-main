import { _decorator, Component, Label, Node, ProgressBar } from 'cc';
import TeamInfoManager from '../../Data/TeamInfoManager';
import { BigNumUtils, formatTimeInterval } from '../../Base/Utils';
import EventManager from '../../Base/EventManager';
import { EVENT_ENUM } from '../../Data/Enum';
import UserDataManager from '../../Data/UserDataManager';
const { ccclass, property } = _decorator;

@ccclass('InfoRender')
export class InfoRender extends Component {
    private countDownNode: Node = null
    private teamPowerLabel: Label = null;
    private teamPowerProgress: ProgressBar = null;
    private enemyTeamPowerLabel: Label = null;
    private myPowerProgress: ProgressBar = null
    private timeLabel: Label = null;
    private dieNode: Node = null
    onLoad() {
        this.countDownNode = this.node.getChildByName("countdown")
        this.dieNode = this.node.getChildByName("die")
        const infoNode = this.node.getChildByName("info")
        this.teamPowerLabel = infoNode.getChildByName("team_power").getComponent(Label)
        this.teamPowerProgress = infoNode.getChildByName("progress").getComponent(ProgressBar)
        this.enemyTeamPowerLabel = infoNode.getChildByName("hint").getChildByName("enemy_power").getComponent(Label)
        this.myPowerProgress = infoNode.getChildByName("mypower").getChildByName("ProgressBar").getComponent(ProgressBar)
        this.timeLabel = infoNode.getChildByName("time").getChildByName("label").getComponent(Label)

        const teamNameLabel = infoNode.getChildByName("team_name").getComponent(Label)
        teamNameLabel.string = TeamInfoManager.Instance.TeamInfo.name;
        EventManager.Instance.on(EVENT_ENUM.UpdateGameInfoByNetGameTime, this.doRender, this)
        EventManager.Instance.on(EVENT_ENUM.RenderGameCountDown, this.renderGameCountDown, this)
        EventManager.Instance.on(EVENT_ENUM.RoomDie, this.dieRender, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.UpdateGameInfoByNetGameTime, this.doRender)
        EventManager.Instance.off(EVENT_ENUM.RenderGameCountDown, this.renderGameCountDown)
    EventManager.Instance.off(EVENT_ENUM.RoomDie, this.dieRender)




    }

    dieRender() {
        this.dieNode.active = true
    }

    renderGameCountDown(time: number) {
        if (time === 0) {
            this.countDownNode.active = false
        } else {
            this.countDownNode.active = true
            this.countDownNode.getChildByName("label").getComponent(Label).string = time + ""
        }
    }

    // 更新队伍战力(己方队伍,敌方队伍,自己战力, 时间)
    doRender(powerMax: number, powerCur: number, enemyPower: number, myPowerCur: number, time: number) {
        let str_cur = BigNumUtils.getNumberString(powerCur);
        let str_max = BigNumUtils.getNumberString(powerMax);
        // 设置文字
        this.teamPowerLabel.string = str_cur + " / " + str_max;
        // 更新进度条
        let progress = powerCur / powerMax;
        this.teamPowerProgress.progress = isNaN(progress) ? 0 : progress;
        // 更新对方战力
        this.enemyTeamPowerLabel.string = BigNumUtils.getNumberString(enemyPower)
        // 更新自己的战力进度条
        let myProgress = myPowerCur / UserDataManager.Instance.UserInfo.power;
        this.myPowerProgress.progress = isNaN(myProgress) ? 0 : myProgress;
        // 更新时间
        let match_time = formatTimeInterval(time, true, false);
        this.timeLabel.string = match_time;
    }

}


