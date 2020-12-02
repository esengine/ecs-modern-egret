class DebugGridSystem extends es.EntityProcessingSystem {
    constructor(){
        super(new es.Matcher().all(DebugGridComponent));
    }

    public processEntity(entity: es.Entity) {
        let debugGrid = entity.getComponent<DebugGridComponent>(DebugGridComponent);
        if (debugGrid.enabled){
            // 开始渲染
            let cameraEntity = es.Core.scene.findEntity("camera");
            let camera = cameraEntity.getComponent<es.Camera>(es.Camera) || 
                cameraEntity.getComponent<es.FollowCamera>(es.FollowCamera).camera;
            let grid = Graphics.Instance.batcher.drawDebugGrid(entity.id, BatcherOrder.debug, camera);
            grid.x = entity.position.x - camera.position.x;
            grid.y = entity.position.y - camera.position.y;
        }
    }
}