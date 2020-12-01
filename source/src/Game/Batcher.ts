class Batcher {
    public stage: egret.Stage;
    public isDisposed: boolean;

    /** batcher列表 */
    public batcherRelation: Map<number, egret.Bitmap>;
    public containerRelation: Map<BatcherOrder, egret.DisplayObjectContainer>;

    constructor(stage: egret.Stage){
        this.stage = stage;
        this.batcherRelation = new Map<number, egret.Bitmap>();
        this.containerRelation = new Map<BatcherOrder, egret.DisplayObjectContainer>();
        this.initContainerRelation();
    }

    private initContainerRelation(){
        let mapContainer = new egret.DisplayObjectContainer();
        mapContainer.sortableChildren = true;
        this.containerRelation.set(BatcherOrder.map, mapContainer);
        this.stage.addChild(mapContainer);

        let playerContainer = new egret.DisplayObjectContainer();
        this.containerRelation.set(BatcherOrder.player, playerContainer);
        this.stage.addChild(playerContainer);
    }

    /** 
     * 绘制动画
     * 动画为动态组 不可合批
     */
    public drawAnimator(animator: es.SpriteAnimator, batchOrder: BatcherOrder): egret.Bitmap {
        let bitmap: egret.Bitmap;
        if (!this.batcherRelation.has(animator.entity.id)) {
            bitmap = new egret.Bitmap();
            this.batcherRelation.set(animator.entity.id, bitmap);
            this.containerRelation.get(batchOrder).addChild(bitmap);
        } else {
            bitmap = this.batcherRelation.get(animator.entity.id);
        }

        return bitmap;
    }
}