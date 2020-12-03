/**
 * 封装类，它拥有Batcher的实例和助手，所以它可以被传递，并绘制任何东西
 * 
 * 这个类的存在只是为了让我们可以偷偷地把Batcher带过去
 */
class Graphics {
    public static Instance: Graphics;

    /**
     * 所有的2D渲染都是通过这个Batcher实例完成的
     */
    public batcher: Batcher;

    constructor(stage: egret.Stage){
        this.batcher = new Batcher(stage);
    }
}