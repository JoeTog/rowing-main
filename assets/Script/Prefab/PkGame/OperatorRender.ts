import { _decorator, Component, EventTouch, Label, Node, tween, Tween, UIOpacity, Vec2, Vec3 } from 'cc';
import EventManager from '../../Base/EventManager';
import { EVENT_ENUM, TaskType } from '../../Data/Enum';
import GameDataManager from '../../Data/GameDataManager';
import { ToastManager } from '../UI/ToastManager';
import TsRpc from '../../Net/TsRpc';
import UserDataManager from '../../Data/UserDataManager';
const { ccclass, property } = _decorator;

enum Direction {
    /** 左 */
    LEFT,
    /** 右 */
    RIGHT,
    /** 上 */
    UP,
    /** 下 */
    DOWN,
}

type DirectionDataType = {
    name: string,
    al: number
}

const DirectionDataMap: Map<Direction, DirectionDataType> = new Map([
    [Direction.LEFT, { name: "请开始向左滑动", al: 90 }],
    [Direction.RIGHT, { name: "请开始向右滑动", al: -90 }],
    [Direction.UP, { name: "请开始向上滑动", al: 0 }],
    [Direction.DOWN, { name: "请开始向下滑动", al: 180 }]
])

@ccclass('OperatorRender')
export class OperatorRender extends Component {
    private _slidingAreaNode: Node = null;
    private _taskLabel: Label = null;
    private _directionTipLabel: Label = null;
    private _isShowTask: boolean = false;

    private _slideDirection: Direction = Direction.UP; // 当前滑动方向
    private _touchStartPos: Vec2 = null;
    private _touchEndPos: Vec2 = null;
    private _needChange: boolean = false;
    private _frequency: number = 10

    protected onLoad(): void {
        this._frequency = UserDataManager.Instance.UserInfo.difficulty.frequency;
        this._slidingAreaNode = this.node.getChildByName("slidingArea")
        this._taskLabel = this.node.getChildByName("task").getChildByName("label").getComponent(Label)
        this._directionTipLabel = this.node.getChildByName("direction_tip").getChildByName("label").getComponent(Label)
        this._slidingAreaNode.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this._slidingAreaNode.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        EventManager.Instance.on(EVENT_ENUM.RenderTaskLabel, this.renderTask, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.RenderTaskLabel, this.renderTask)
    }

    onTouchStart(e: EventTouch) {
        this._touchStartPos = e.getLocation()
    }

    onTouchEnd(e: EventTouch) {
        this._touchEndPos = e.getLocation()
        this.handleSwipe()
    }

    handleSwipe() {
        if (!GameDataManager.Instance.InPlaying) {
            console.log(`❌ [滑动处理] 游戏未开始，忽略滑动`);
            return;
        }
        const taskType = GameDataManager.Instance.TaskType
        // 判断任务是否失败，失败后就不能在滑动
        if (taskType == TaskType.failed) {
            console.log(`❌ [滑动处理] 任务失败，禁止滑动`);
            ToastManager.showToast("您已被淘汰");
            return;
        }
        if (taskType == TaskType.rest) {
            console.log(`❌ [滑动处理] 中场休息中，禁止滑动`);
            ToastManager.showToast("中场休息中");
            return;
        }

        const deltaX = this._touchEndPos.x - this._touchStartPos.x;
        const deltaY = this._touchEndPos.y - this._touchStartPos.y;
        console.log(`📏 [滑动计算] 偏移量: X=${deltaX.toFixed(1)}, Y=${deltaY.toFixed(1)}`);

        // 判断滑动阈值
        const threshold = 50;
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                console.log(`⬆️ [滑动方向] 向右滑动，调用addPower`);
                // 向右滑动的处理
                this.addPower(Direction.RIGHT)
            } else {
                console.log(`⬆️ [滑动方向] 向左滑动，调用addPower`);
                // 向左滑动的处理
                this.addPower(Direction.LEFT)
            }
        } else if (Math.abs(deltaY) > threshold) {
            if (deltaY > 0) {
                // 向上滑动的处理
                console.log(`⬆️ [滑动方向] 向上滑动，调用addPower`);
                this.addPower(Direction.UP)
            } else {
                // 向下滑动的处理
                console.log(`⬇️ [滑动方向] 向下滑动，调用addPower`);
                this.addPower(Direction.DOWN)
            }
        } else {
            console.log(`❌ [滑动处理] 滑动距离不足，忽略 (${Math.abs(deltaX)}, ${Math.abs(deltaY)}) < ${threshold}`);
        }
    }

    addPower(dir: Direction) {
        let isSuccess = this._slideDirection === dir ? 1 : -1
        this.setArrowNode(isSuccess == -1 ? 2 : 1, this._slideDirection);

        TsRpc.Instance.Client.callApi("room/AddPower", { __ssoToken: UserDataManager.Instance.SsoToken, value: isSuccess }).then((data) => {
            if (!data.isSucc) {
                // 提示玩家已经死亡
                GameDataManager.Instance.dealRoomDie();
                return;
            }
        }).catch(err => {
            console.error(`🔥 [武力值] API调用异常:`, err);
        });
    }

    renderTask(show: boolean, msg?: string, doRandom?: boolean) {
        if (show && doRandom) {
            // 立刻变更一次
            this._needChange = true
            this.schedule(() => {
                this._needChange = true
            }, this._frequency)
        }
        if (!show) {
            this.unscheduleAllCallbacks()
        }
        if (show !== this._isShowTask) {
            this._taskLabel.node.parent.active = show;
            this._isShowTask = show;
        }
        this._taskLabel.string = msg
    }

    // 生成随机方向
    randomDirection() {
        this._needChange = false
        if (!GameDataManager.Instance.InPlaying || GameDataManager.Instance.TaskType !== TaskType.active) {
            return
        }
        const directionArr = [Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.UP]
        let randomDir: Direction = directionArr[Math.floor(Math.random() * 4)]
        this._slideDirection = randomDir; // 设置当前方向 用于判断滑动
        let directionData: DirectionDataType = DirectionDataMap.get(randomDir)
        console.log("随机方向: " + directionData.name)
        this.setArrowNode(0, randomDir)
        this._directionTipLabel.string = directionData.name;
    }

    /**
     * @param nodeIndex 先选中要操作的节点 0 表示初始 1 表示正确 2表示错误
     * @param angle     箭头朝向
     */
    private setArrowNode(nodeIndex: number, direction: Direction): void {
        const angle = DirectionDataMap.get(direction).al
        // 先选中要操作的节点 0 表示初始 1 表示正确 2表示错误
        const firstChild = this._slidingAreaNode.children[0];
        if (nodeIndex == 0 && firstChild.active && firstChild.angle == angle) {
            return;
        }
        this._slidingAreaNode.children.forEach((node, i) => {
            if (i != 0) {
                Tween.stopAllByTarget(node);
            }
            if (nodeIndex == i) {
                // Cocos Creator 3.x 使用 UIOpacity 组件设置透明度
                let uiOpacity = node.getComponent(UIOpacity);
                if (!uiOpacity) {
                    uiOpacity = node.addComponent(UIOpacity);
                }
                node.angle = angle
                uiOpacity.opacity = 255;

                node.active = true;

                if (nodeIndex != 0) {
                    let dir = this._slideDirection;
                    let opacity = uiOpacity;
                    tween(opacity)
                        .to(0.05, { opacity: 0 })
                        .to(0.05, { opacity: 255 })
                        .call(() => {
                            if (this._needChange) {
                                this.randomDirection()
                            } else {
                                this.setArrowNode(0, dir);
                            }

                        })
                        .start();
                }
            } else {
                node.active = false;
            }
        });
    }

    update(deltaTime: number) {

    }
}


