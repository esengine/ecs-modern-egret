class PlayerControllerSystem extends es.EntityProcessingSystem {
    private virtualXInput: es.VirtualIntegerAxis;
    private virtualYInput: es.VirtualIntegerAxis;

    constructor(){
        super(new es.Matcher().all(PlayerController));

        this.virtualXInput = new es.VirtualIntegerAxis();
        this.virtualXInput.addKeyboardKeys(es.OverlapBehavior.cancelOut, Keys.left, Keys.right);

        this.virtualYInput = new es.VirtualIntegerAxis();
        this.virtualYInput.addKeyboardKeys(es.OverlapBehavior.cancelOut, Keys.up, Keys.down);
    }

    public processEntity(entity: es.Entity){
        let mover = entity.getOrCreateComponent<es.Mover>(es.Mover);
        let playerController = entity.getComponent<PlayerController>(PlayerController);
        let result = new es.CollisionResult();
        mover.move(new es.Vector2(this.virtualXInput.value * es.Time.deltaTime * playerController.speed, 
            es.Time.deltaTime * playerController.speed * this.virtualYInput.value), result);

        let spriteAnimator = entity.getComponent<es.SpriteAnimator>(es.SpriteAnimator);
        if (spriteAnimator) {
            if (this.virtualXInput.value > 0) {
                if (spriteAnimator.currentAnimationName != PlayerState.run + PlayerDirection.right)
                    spriteAnimator.play(PlayerState.run + PlayerDirection.right);
            } else if (this.virtualXInput.value < 0) {
                if (spriteAnimator.currentAnimationName != PlayerState.run + PlayerDirection.left)
                    spriteAnimator.play(PlayerState.run + PlayerDirection.left);
            } else if(this.virtualYInput.value > 0) {
                if (spriteAnimator.currentAnimationName != PlayerState.run + PlayerDirection.bottom)
                    spriteAnimator.play(PlayerState.run + PlayerDirection.bottom);
            } else if(this.virtualYInput.value < 0) {
                if (spriteAnimator.currentAnimationName != PlayerState.run + PlayerDirection.up)
                    spriteAnimator.play(PlayerState.run + PlayerDirection.up);
            }
        }
    }
}