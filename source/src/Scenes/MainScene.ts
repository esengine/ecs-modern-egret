class MainScene extends es.Scene {
    private randomPolygon = [
        [new es.Vector2(0, 0), new es.Vector2(100, 0), new es.Vector2(50, 100)],
        [new es.Vector2(0, 0), new es.Vector2(100, 0), new es.Vector2(120, 100), new es.Vector2(50, 100)],
        [new es.Vector2(0, 0), new es.Vector2(100, 0), new es.Vector2(120, 140), new es.Vector2(50, 140), new es.Vector2(20, 100)],
    ];

    public onStart(){
        // 给场景安装相机
        let camera = this.createEntity("camera");

        let player = this.createEntity("player")
        player.addComponent(this.loadPlayerAnimator()).play(PlayerState.run + PlayerDirection.bottom);
        player.addComponent(new PlayerController());
        // player.addComponent(new es.BoxCollider(0, Config.pattern, Config.pattern, Config.pattern));
        player.addComponent(new es.PolyLight());
        player.position = new es.Vector2(500, 500);

        // for (let i = 0; i < 150; i ++) {
        //     let wall = this.createEntity("wall" + i);
        //     wall.addComponent(new es.BoxCollider(0, 0, Config.pattern, Config.pattern));
        //     wall.position = new es.Vector2(RandomUtils.randint(100, 3200), RandomUtils.randint(100, 3200));
        // }

        for (let i = 0; i < 150; i ++) {
            let wall = this.createEntity("wall" + i);
            wall.addComponent(new es.CircleCollider(Config.pattern));
            // wall.addComponent(new es.ArcadeRigidbody()).setGlue(0);
            wall.position = new es.Vector2(RandomUtils.randint(0, 3200), RandomUtils.randint(0, 3200));
        }

        // for (let i = 0; i < 20; i ++) {
        //     let wall = this.createEntity("wall" + i);
        //     wall.addComponent(new es.PolygonCollider(ArrayUtils.randomItem(this.randomPolygon)));
        //     wall.position = new es.Vector2(RandomUtils.randint(100, 1280), RandomUtils.randint(100, 2200));
        // }

        camera.addComponent(new es.Camera());
        // camera.addComponent(new es.FollowCamera(player)).focusOffset = new es.Vector2(es.Core.Instance.width / 2, es.Core.Instance.height / 2);

        let debugGrid = this.createEntity("debugGrid");
        debugGrid.addComponent(new DebugGridComponent());

        this.addEntityProcessor(new AnimatorSystem());
        // this.addEntityProcessor(new DebugGridSystem());
        this.addEntityProcessor(new PlayerControllerSystem());
        this.addEntityProcessor(new DebugBoxColliderSystem());
        this.addEntityProcessor(new DebugCircleColliderSystem());
        this.addEntityProcessor(new DebugPolygonColliderSystem());
    }

    private loadPlayerAnimator(): es.SpriteAnimator {
        let spriteAnimator = new es.SpriteAnimator();
        spriteAnimator.addAnimation(PlayerState.run + PlayerDirection.left, this.loadPlayerRun(PlayerDirection.left));
        spriteAnimator.addAnimation(PlayerState.run + PlayerDirection.right, this.loadPlayerRun(PlayerDirection.right));
        spriteAnimator.addAnimation(PlayerState.run + PlayerDirection.up, this.loadPlayerRun(PlayerDirection.up));
        spriteAnimator.addAnimation(PlayerState.run + PlayerDirection.bottom, this.loadPlayerRun(PlayerDirection.bottom));

        spriteAnimator.addAnimation(PlayerState.idle + PlayerDirection.bottom, this.loadPlayerIdle(PlayerDirection.bottom));
        spriteAnimator.addAnimation(PlayerState.idle + PlayerDirection.left, this.loadPlayerIdle(PlayerDirection.left));
        spriteAnimator.addAnimation(PlayerState.idle + PlayerDirection.up, this.loadPlayerIdle(PlayerDirection.up));
        spriteAnimator.addAnimation(PlayerState.idle + PlayerDirection.right, this.loadPlayerIdle(PlayerDirection.right));
        return spriteAnimator;
    }

    private loadPlayerRun(direction: PlayerDirection): es.SpriteAnimation {
        let runTexture: egret.Texture = RES.getRes(`run_horizontal_${Config.pattern}x${Config.pattern}_2_png`);
        let sprites = es.Sprite.spritesFromAtlas(runTexture, runTexture.textureWidth / 24, runTexture.textureHeight);
        if (direction == PlayerDirection.right) {
            sprites = sprites.slice(0, 6);
        } else if(direction == PlayerDirection.up) {
            sprites = sprites.slice(6, 12);
        } else if(direction == PlayerDirection.left) {
            sprites = sprites.slice(12, 18);
        } else if(direction == PlayerDirection.bottom) {
            sprites = sprites.slice(18, 24);
        }
        let spriteAnimation = new es.SpriteAnimation(sprites);
        return spriteAnimation;
    }

    private loadPlayerIdle(direction: PlayerDirection): es.SpriteAnimation {
        let idleTexture: egret.Texture = RES.getRes(`idle_${Config.pattern}x${Config.pattern}_2_png`);
        let sprites = es.Sprite.spritesFromAtlas(idleTexture, idleTexture.textureWidth / 4, idleTexture.textureHeight);
        if (direction == PlayerDirection.right) {
            sprites = sprites.slice(0, 1);
        } else if(direction == PlayerDirection.up) {
            sprites = sprites.slice(1, 2);
        } else if(direction == PlayerDirection.left) {
            sprites = sprites.slice(2, 3);
        } else if(direction == PlayerDirection.bottom) {
            sprites = sprites.slice(3, 4);
        }
        let spriteAnimation = new es.SpriteAnimation(sprites);
        return spriteAnimation;
    }
}