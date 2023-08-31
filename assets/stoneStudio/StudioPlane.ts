import { _decorator, Component, Node, RenderTexture,director,Camera,MeshRenderer
    ,Vec3,v3,quat,Quat} from 'cc';
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
    private _tmpV3_0: Vec3 = v3();
    private _tmpV3_1: Vec3 = v3();
    private _tmpV3_N: Vec3 = v3();
    private _tmpQuat: Quat = quat();
    getMirrorPoint(out: Vec3, p: Vec3, n: Vec3, d: number): Vec3 {
        if (out == null) {
            out = new Vec3();
        }
        let dist = Vec3.dot(p, n) - d;
        //tmp = N
        let tmp = v3(n);
        //tmp = 2.0 * dist * N
        tmp.multiplyScalar(2.0 * dist);
        // out = p - 2.0 * dist * N
        Vec3.subtract(out, p, tmp);
        return out;
    }
    protected lateUpdate(dt: number): void {
        if(!this.mainCamera)
            return;

        if(this._reflectionCamera && this._reflectionCamera.node.active)
        {
            let target = this.mainCamera.node;
            // let source = this._reflectionCamera.node;

            // let planeWorldPos = this._mesh.node.worldPosition;
            // Vec3.transformQuat(this._tmpV3_N, Vec3.FORWARD, this._mesh.node.worldRotation);
            // let n = this._tmpV3_N;
            // n.negative();
            // n.normalize();

            // let d = Vec3.dot(planeWorldPos, n);

            // //position.
            // this.getMirrorPoint(this._tmpV3_0, target.worldPosition, n, d);
            // source.worldPosition = this._tmpV3_0;

            // //forward
            // Vec3.transformQuat(this._tmpV3_0, Vec3.FORWARD, target.worldRotation);
            // this._tmpV3_0.set(target.forward);
            // this._tmpV3_0.normalize();
            // this.getMirrorPoint(this._tmpV3_0, this._tmpV3_0, n, 0);
            // this._tmpV3_0.normalize();
            // this._tmpV3_0.negative();

            // //up
            // Vec3.transformQuat(this._tmpV3_1, Vec3.UP, target.worldRotation);
            // this._tmpV3_1.normalize();
            // this.getMirrorPoint(this._tmpV3_1, this._tmpV3_1, n, 0);
            // this._tmpV3_1.normalize();

            // //calculate rotation with view(forward) and up directions
            // Quat.fromViewUp(this._tmpQuat, this._tmpV3_0, this._tmpV3_1);
            // source.worldRotation = this._tmpQuat;

            //sync worldScale
            this._reflectionCamera.node.setWorldScale(target.worldScale);
            Utils.syncCameraParameters(this._reflectionCamera, this.mainCamera);
        }
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
        node.name = 'Reflection Camera'

        return texture
    }
}


