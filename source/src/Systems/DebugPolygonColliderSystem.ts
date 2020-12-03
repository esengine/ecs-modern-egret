class DebugPolygonColliderSystem extends es.EntityProcessingSystem {
    constructor(){
        super(new es.Matcher().all(es.PolygonCollider));
    }

    public processEntity(entity: es.Entity) {
        let polygonCollider = entity.getComponent<es.PolygonCollider>(es.PolygonCollider);
        if (polygonCollider.enabled){
            let cameraEntity = es.Core.scene.findEntity("camera");
            let camera = cameraEntity.getComponent<es.Camera>(es.Camera) || 
                cameraEntity.getComponent<es.FollowCamera>(es.FollowCamera).camera;
            let shape = Graphics.Instance.batcher.drawDebugBox(entity.id, BatcherOrder.debug);
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0x00ffff, 1);
            let polygon = polygonCollider.shape as es.Polygon;
            for (let i = 0; i < polygon.points.length; i ++){
                let point = polygon.points[i];
                if (i == 0)
                    shape.graphics.moveTo(point.x, point.y);
                else
                    shape.graphics.lineTo(point.x, point.y);
            }
            shape.graphics.endFill();
            
            shape.x = entity.position.x - camera.bounds.x;
            shape.y = entity.position.y - camera.bounds.y;
        }
    }
}