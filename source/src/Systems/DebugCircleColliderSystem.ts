class DebugCircleColliderSystem extends es.EntityProcessingSystem {
    constructor(){
        super(new es.Matcher().all(es.CircleCollider));
    }

    public processEntity(entity: es.Entity) {
        let circleCollider = entity.getComponent<es.CircleCollider>(es.CircleCollider);
        if (circleCollider.enabled){
            let cameraEntity = es.Core.scene.findEntity("camera");
            let camera = cameraEntity.getComponent<es.Camera>(es.Camera) || 
                cameraEntity.getComponent<es.FollowCamera>(es.FollowCamera).camera;
            let shape = Graphics.Instance.batcher.drawDebugBox(entity.id, BatcherOrder.debug);
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0x00ffff, 1);
            shape.graphics.drawCircle(0, 0, circleCollider.radius);
            shape.graphics.endFill();
            
            shape.x = entity.position.x - camera.bounds.x;
            shape.y = entity.position.y - camera.bounds.y;
        }
    }
}