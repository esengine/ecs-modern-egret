class AnimatorSystem extends es.EntityProcessingSystem {
    constructor (){
        super(new es.Matcher().all(es.SpriteAnimator));
    }

    public processEntity(entity: es.Entity) {
        let spriteAnimator = entity.getComponent<es.SpriteAnimator>(es.SpriteAnimator);
        if (spriteAnimator.enabled){
            // 开始渲染
            let cameraEntity = es.Core.scene.findEntity("camera");
            let camera = cameraEntity.getComponent<es.Camera>(es.Camera) || 
                cameraEntity.getComponent<es.FollowCamera>(es.FollowCamera).camera;
            let bitmap = Graphics.Instance.batcher.drawBitmap(entity.id, BatcherOrder.player);
            bitmap.texture = spriteAnimator.sprite.texture2D;
            bitmap.x = entity.position.x - camera.position.x;
            bitmap.y = entity.position.y - camera.position.y;
        }
    }
}