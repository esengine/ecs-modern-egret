class DebugBoxColliderSystem extends es.EntityProcessingSystem {
    constructor(){
        super(new es.Matcher().all(es.BoxCollider));
    }

    public processEntity(entity: es.Entity) {
        let boxCollider = entity.getComponent<es.BoxCollider>(es.BoxCollider);
        if (boxCollider.enabled){
            let cameraEntity = es.Core.scene.findEntity("camera");
            let camera = cameraEntity.getComponent<es.FollowCamera>(es.FollowCamera).camera;
            let shape = Graphics.Instance.batcher.drawDebugBox(entity.id, BatcherOrder.debug);
            
            let isVisibleForCamera = camera._bounds.intersects(boxCollider.bounds);
            shape.visible = isVisibleForCamera;

            if (isVisibleForCamera) {
                shape.graphics.clear();
                shape.graphics.lineStyle(2, 0x00ffff, 1);
                shape.graphics.drawRect(0, 0, boxCollider.bounds.width, boxCollider.bounds.height);
                shape.graphics.endFill();

                shape.x = boxCollider.bounds.x - camera.bounds.x;
                shape.y = boxCollider.bounds.y - camera.bounds.y;
            }
        }
    }
}