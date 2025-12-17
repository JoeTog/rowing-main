import { _decorator, Component, instantiate, Node, Prefab, Sprite, SpriteFrame } from 'cc';
import TeamInfoManager from '../../Data/TeamInfoManager';
import GameDataManager from '../../Data/GameDataManager';
import { BAG_CONFIG } from '../../Config';
import { resAssetLoad } from '../../Base/Utils';
const { ccclass, property } = _decorator;

@ccclass('UseRender')
export class UseRender extends Component {
    @property(Node)
    containNode: Node = null;
    @property(Prefab)
    useIcon: Prefab = null;

    onLoad() {
        // team/MatchSuccess 中的 gameItem
        const useProps = GameDataManager.Instance.GameItems
        for (const bagId of useProps) {
            this.renderOne(bagId);
        }
    }

    renderOne(bagId: number) {
        const node = instantiate(this.useIcon);
        const config = BAG_CONFIG[bagId]
        let icon_url = "Texture/bag/icon/" + config[1] + "/spriteFrame";
        resAssetLoad<SpriteFrame>(icon_url, SpriteFrame).then(res => {
            node.getComponent(Sprite).spriteFrame = res;
            this.containNode.addChild(node)
        }).catch((err) => {
            console.log("icon加载失败: " + err)
        })
    }

    update(deltaTime: number) {

    }
}


