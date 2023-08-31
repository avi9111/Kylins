import { _decorator, Component, Node, RenderTexture,director,Camera,MeshRenderer} from 'cc';
import { Utils } from '../resources/kylins_water_surface/scripts/Utils';
const { ccclass, property } = _decorator;

@ccclass('StudioPlane')
export class StudioPlane extends Component {
    
    @property({ type: Camera })
    mainCamera: Camera = null;
    _reflectionCamera:Camera = null;
    private _mesh: MeshRenderer = null;
    start() {
        this._mesh = this.node.getComponent(MeshRenderer);
        let reflectRT = this.initReflection()

        this._mesh.material.setProperty('reflectionMap', reflectRT);

    }

    update(deltaTime: number) {
        
    }

    initReflection():RenderTexture{
        let texture = Utils.createRenderTexture(1)
        let node = new Node()
        director.getScene().addChild(node)
        this._reflectionCamera = node.addComponent(Camera)
        this._reflectionCamera.clearFlags = this.mainCamera.clearFlags
        this._reflectionCamera.clearColor = this.mainCamera.clearColor
        this._reflectionCamera.priority = this.mainCamera.priority-1
        this._reflectionCamera.visibility = this.mainCamera.visibility
        this._reflectionCamera.targetTexture = texture
        this._reflectionCamera.name = 'Reflection Camera'

        return texture
    }
}


