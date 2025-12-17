import { _decorator, Component, dragonBones, Node } from 'cc';
import UserDataManager from '../Data/UserDataManager';
import EventManager from '../Base/EventManager';
import { EVENT_ENUM } from '../Data/Enum';
const { ccclass, property } = _decorator;

@ccclass('RoleRender')
export class RoleRender extends Component {
    private dzNode: Node = null;
    private dyNode: Node = null;
    protected onLoad(): void {
        this.dzNode = this.node.getChildByName("dz")
        this.dyNode = this.node.getChildByName("dy")
        EventManager.Instance.on(EVENT_ENUM.UpdateCaptain, this.doRender, this)
        this.doRender()
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.UpdateCaptain, this.doRender)
    }

    doRender() {
        const isCaptain = UserDataManager.Instance.IsCaptain
        if (isCaptain) {
            this.dzNode.active = true;
            this.dzNode.getComponent(dragonBones.ArmatureDisplay).playAnimation("newAnimation")
        } else {
            this.dyNode.active = true;
            this.dyNode.getComponent(dragonBones.ArmatureDisplay).playAnimation("newAnimation")
        }
    }

    update(deltaTime: number) {

    }
}


