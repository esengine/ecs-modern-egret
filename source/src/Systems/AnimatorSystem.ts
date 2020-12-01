class AnimatorSystem extends es.EntityProcessingSystem {
    constructor (){
        super(new es.Matcher().all(es.SpriteAnimator));
    }

    public processEntity(entity: es.Entity) {
        let spriteAnimator = entity.getComponent<es.SpriteAnimator>(es.SpriteAnimator);
        if (spriteAnimator.enabled){
            // 开始渲染
            let bitmap = Graphics.Instance.batcher.drawAnimator(spriteAnimator, BatcherOrder.player);
            bitmap.texture = spriteAnimator.sprite.texture2D;
        }
    }
}