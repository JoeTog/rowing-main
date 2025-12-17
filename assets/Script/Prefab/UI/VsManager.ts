import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, tween, UITransform, v3, Vec3 } from 'cc';
import GameDataManager from '../../Data/GameDataManager';
import { IMG_URL_EXTRA_PARAM } from '../../Config';
import { loadAvatar, resAssetLoad } from '../../Base/Utils';
import EventManager from '../../Base/EventManager';
import { EVENT_ENUM, PREFAB_PATH_ENUM } from '../../Data/Enum';
const { ccclass, property } = _decorator;

@ccclass('VsManager')
export class VsManager extends Component {
    onLoad() {
        EventManager.Instance.on(EVENT_ENUM.ShowVs, this.doRender, this)
    }

protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.ShowVs, this.doRender, this)
}

    doRender() {
        resAssetLoad<Prefab>(PREFAB_PATH_ENUM.Vs, Prefab).then(res => {
            const vsNode = instantiate(res)
            const myNode = vsNode.getChildByName("pk_my")
            const teamInfo = GameDataManager.Instance.VsTeamInfo
            this.renderInfo(myNode, teamInfo[GameDataManager.Instance.MyTeamIndex])
            const enemyNode = vsNode.getChildByName("pk_enemy")
            this.renderInfo(enemyNode, teamInfo[GameDataManager.Instance.EnemyTeamIndex])
            // 隐藏匹配中页面
            EventManager.Instance.emit(EVENT_ENUM.HideMatching)
            this.node.addChild(vsNode)
            // 开始加载显示PkGame页面
            EventManager.Instance.emit(EVENT_ENUM.ShowPkGame)
            this.showAnim(myNode, enemyNode, vsNode.getChildByName("icon"))
        })
    }

    renderInfo(myNode: Node, myTeamInfo) {
        const _myAvatarImg = myNode.getChildByName("avatar").getChildByName("mask").getChildByName("img").getComponent(Sprite)
        const _myTeamNameLabel = myNode.getChildByName("teamname").getComponent(Label)
        const _myTeamCountLabel = myNode.getChildByName("count").getChildByName("value").getComponent(Label)
        _myTeamNameLabel.string = myTeamInfo.name
        _myTeamCountLabel.string = myTeamInfo.count + "/50"
        loadAvatar(myTeamInfo.avatar + IMG_URL_EXTRA_PARAM).then((res: SpriteFrame) => {
            _myAvatarImg.spriteFrame = res;
        })
    }

    showAnim(myNode: Node, enemyNode: Node, iconNode: Node) {
        let w = this.node.getComponent(UITransform).width / 2;
        let offset = w + 100;
        const myNodeWidth = myNode.getComponent(UITransform).width
        let startPosX = myNodeWidth + offset
        myNode.position = v3(-startPosX, myNode.position.y, myNode.position.z)
        this.moveAnim(myNode, -w + myNodeWidth / 2);
        enemyNode.position = v3(startPosX, enemyNode.position.y, enemyNode.position.z)
        this.moveAnim(enemyNode, w - myNodeWidth / 2);
        iconNode.setScale(v3(0, 0, 1))
        tween(iconNode)
            .to(1.2, { scale: v3(1, 1, 1) }, { easing: 'elasticOut' })
            .call(() => {
                this.moveAnim(myNode, -startPosX);
                this.moveAnim(enemyNode, startPosX);
                tween(iconNode)
                    .to(1, { scale: v3(0, 0, 0) }, { easing: 'elasticIn' })
                    .call(() => {
                        myNode.parent.destroy()
                    })
                    .start()
            })
            .start()
    }


    private moveAnim(node: Node, toPosX: number, time: number = 1): void {
        // 获取当前位置
        const currentPos = node.position.clone();
        // 创建目标位置
        const targetPos = new Vec3(toPosX, currentPos.y, currentPos.z);

        // 使用Tween系统
        tween(node)
            .to(time, { position: targetPos }, {
                easing: 'elasticInOut'
            })
            .start();
    }

}


