class PlayerControllerSystem extends es.EntityProcessingSystem {
    public speed: number = 100;
    constructor(){
        super(new es.Matcher().all(PlayerController));
    }

    public processEntity(entity: es.Entity){
        let mover = entity.getOrCreateComponent<es.Mover>(es.Mover);
        let result = new es.CollisionResult();
        mover.move(new es.Vector2(0, es.Time.deltaTime * this.speed), result);
    }
}