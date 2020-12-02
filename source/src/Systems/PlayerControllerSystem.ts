class PlayerControllerSystem extends es.EntityProcessingSystem {
    constructor(){
        super(new es.Matcher().all(PlayerController));
    }

    public processEntity(entity: es.Entity){
        let mover = entity.getOrCreateComponent<es.Mover>(es.Mover);
        let playerController = entity.getComponent<PlayerController>(PlayerController);
        let result = new es.CollisionResult();
        mover.move(new es.Vector2(0, es.Time.deltaTime * playerController.speed), result);
    }
}