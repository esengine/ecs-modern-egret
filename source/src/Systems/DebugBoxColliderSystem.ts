class DebugBoxColliderSystem extends es.EntityProcessingSystem {
    constructor(){
        super(new es.Matcher().all(es.BoxCollider));
    }

    public processEntity(entity: es.Entity) {
        let boxCollider = entity.getComponent<es.BoxCollider>(es.BoxCollider);
        if (boxCollider.enabled){
            let cameraEntity = es.Core.scene.findEntity("camera");
            let camera = cameraEntity.getComponent<es.Camera>(es.Camera) || 
                cameraEntity.getComponent<es.FollowCamera>(es.FollowCamera).camera;
            let shape = Graphics.Instance.batcher.drawDebugBox(entity.id, BatcherOrder.debug);
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0x00ffff, 1);
            shape.graphics.drawRect(0, 0, boxCollider.bounds.width, boxCollider.bounds.height);
            shape.graphics.endFill();
            
            shape.x = entity.position.x - camera.bounds.x;
            shape.y = entity.position.y - camera.bounds.y;
        }
    }
}