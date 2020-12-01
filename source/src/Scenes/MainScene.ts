class MainScene extends es.Scene {
    public onStart(){
        // 给场景安装相机
        let camera = this.createEntity("camera");

        let player = this.createEntity("player");
        player.addComponent(this.loadPlayerAnimator()).play(PlayerState.run + PlayerDirection.bottom);

        camera.addComponent(new es.FollowCamera(player));

        this.addEntityProcessor(new AnimatorSystem());
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