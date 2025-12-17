import { _decorator, Component, Label, Node } from 'cc';
import TeamInfoManager from '../../Data/TeamInfoManager';
import GameDataManager from '../../Data/GameDataManager';
import { UIButtonUtil } from '../../Base/UIButtonUtil';
import EventManager from '../../Base/EventManager';
import { EVENT_ENUM } from '../../Data/Enum';
const { ccclass, property } = _decorator;

@ccclass('PkResultRender')
export class PkResultRender extends Component {
    private _teamNameLabel: Label = null
    private _myPowerLabel: Label = null
    private _enemyPowerLabel: Label = null
    private _msgLabel: Label = null;
    private btnNode: Node = null;
    private iconNode: Node = null
    onLoad() {
        const popNode = this.node.getChildByName("pop")
        this._teamNameLabel = popNode.getChildByName("team_name").getChildByName("value").getComponent(Label)
        this._myPowerLabel = popNode.getChildByName("my_power").getChildByName("value").getComponent(Label)
        this._enemyPowerLabel = popNode.getChildByName("enemy_power").getChildByName("value").getComponent(Label)
        this._msgLabel = popNode.getChildByName("msg").getChildByName("value").getComponent(Label)
        this.btnNode = popNode.getChildByName("btn")
        this.iconNode = popNode.getChildByName("icon")
        this._teamNameLabel.string = TeamInfoManager.Instance.TeamInfo.name
        this.doRender()
        // 重新渲染队伍信息和首页 主要是为了更新队伍信息
        EventManager.Instance.emit(EVENT_ENUM.ToCreatTeam, false)
        EventManager.Instance.emit(EVENT_ENUM.ShowHome, false)
        UIButtonUtil.initBtn(this.btnNode, () => {
            EventManager.Instance.emit(EVENT_ENUM.HidePkGame)
        })
    }

    doRender() {
        const data = GameDataManager.Instance.GameResult
        const myTeamIndex = GameDataManager.Instance.MyTeamIndex
        const enemyTeamIndex = GameDataManager.Instance.EnemyTeamIndex
        this._myPowerLabel.string = data.powerInfo[myTeamIndex] + "";
        this._enemyPowerLabel.string = data.powerInfo[enemyTeamIndex] + "";
        this._msgLabel.string = data.msg;
        if (data.winIndex == myTeamIndex) {
            this.iconNode.children[0].active = true
            this.iconNode.children[1].active = false
        } else if (data.winIndex == enemyTeamIndex) {
            this.iconNode.children[0].active = false
            this.iconNode.children[1].active = true
        }
    }



    update(deltaTime: number) {

    }
}


