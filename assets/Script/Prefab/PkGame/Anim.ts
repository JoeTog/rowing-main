import { _decorator, Component, dragonBones, Node, UITransform } from 'cc';
import { randomFloor } from '../../Base/Utils';
import EventManager from '../../Base/EventManager';
import { EVENT_ENUM } from '../../Data/Enum';
import GameDataManager from '../../Data/GameDataManager';
const { ccclass, property } = _decorator;

enum BoatMoveSke {
    /** 停止移动 */
    STOP = "",
    /** 慢速移动 */
    SLOW = "newAnimation",
    /** 快速移动 */
    FAST = "newAnimation_复制1",
}

@ccclass('Anim')
export class Anim extends Component {
    private moveSpeed: number = 100;
    private sideNode: Node = null;
    private boatBones: dragonBones.ArmatureDisplay = null;
    /** 当前龙舟播放动画 */
    private loongBoatMoveSke: BoatMoveSke = BoatMoveSke.STOP;

    onLoad() {
        // 两部分: 两边图片的无限循环 和 龙舟骨骼动画的变动
        this.sideNode = this.node.getChildByName("side")
        this.boatBones = this.node.getChildByName("boat").getComponent(dragonBones.ArmatureDisplay)
        // this.boatSetAnim(BoatMoveSke.STOP)

        EventManager.Instance.on(EVENT_ENUM.StartGame, this.startGame, this)
        EventManager.Instance.on(EVENT_ENUM.StopGame, this.stopGame, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.StartGame, this.startGame)
        EventManager.Instance.off(EVENT_ENUM.StopGame, this.stopGame)
    }

    startGame() {
        this.boatSetAnim(BoatMoveSke.SLOW)
    }

    stopGame() {
        this.boatSetAnim(BoatMoveSke.STOP)
    }


    boatSetAnim(anim: BoatMoveSke) {
        if (this.loongBoatMoveSke === anim) {
            return;
        }
        if (anim === BoatMoveSke.STOP) {
            this.boatBones.playAnimation('newAnimation', 0.1);
            this.loongBoatMoveSke = anim;
            return;
        }
        this.boatBones.playAnimation(anim);
        this.loongBoatMoveSke = anim;
    }

    InfiniteMove(moveNode: Node, speed: number) {
        let maxY = 0; // 放置的最高点
        let resetNode: Node = null; // 重新放置的node
        // 移动所有节点
        moveNode.children.forEach((child: Node) => {
            // 每个节点向下移动
            const currentPos = child.position;
            child.setPosition(currentPos.x, currentPos.y - speed, currentPos.z);

            if (maxY < currentPos.y) maxY = currentPos.y;
            // 检测当前节点是否在屏幕外 在屏幕外放到最上面
            const nodeH = child.getComponent(UITransform)?.contentSize.height;
            if (!nodeH) return;

            if (currentPos.y + nodeH < 0) {
                resetNode = child
            }
        });

        if (resetNode) {
            const position = resetNode.position
            const nodeH = resetNode.getComponent(UITransform)?.contentSize.height;
            resetNode.setPosition(position.x, maxY + nodeH, position.z)
        }
    }


    update(deltaTime: number) {
        if (!GameDataManager.Instance.InPlaying) return;
        const sp = this.moveSpeed * deltaTime
        if (this.moveSpeed > 300) {
            this.boatSetAnim(BoatMoveSke.FAST)
        }
        if (this.moveSpeed < 400) {
            this.moveSpeed += sp * randomFloor(2, 10);
        }
        this.InfiniteMove(this.sideNode, sp)
    }
}


