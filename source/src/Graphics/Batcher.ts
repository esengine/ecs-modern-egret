class Batcher {
    public stage: egret.Stage;
    public isDisposed: boolean;

    /** batcher列表 */
    public batcherRelation: Map<number, egret.DisplayObject>;
    public debugBatcherRelation: Map<number, egret.DisplayObject>;
    public containerRelation: Map<BatcherOrder, egret.DisplayObjectContainer>;

    constructor(stage: egret.Stage){
        this.stage = stage;
        this.batcherRelation = new Map<number, egret.DisplayObject>();
        this.debugBatcherRelation = new Map<number, egret.DisplayObject>();
        this.containerRelation = new Map<BatcherOrder, egret.DisplayObjectContainer>();
        this.initContainerRelation();

    }

    private initContainerRelation(){
        let tempBatch: any = Object.assign({}, BatcherOrder);
        tempBatch["length"] = Object.keys(BatcherOrder).length / 2;
        for (let order of tempBatch) {
            let container = new egret.DisplayObjectContainer();
            container.cacheAsBitmap = true;
            this.containerRelation.set(Number(tempBatch[order]), container);
            this.stage.addChild(container);
        }
    }

    public drawBitmap(id: number, batchOrder: BatcherOrder): egret.Bitmap {
        let bitmap: egret.Bitmap;
        if (!this.batcherRelation.has(id)) {
            bitmap = new egret.Bitmap();
            this.batcherRelation.set(id, bitmap);
            this.containerRelation.get(batchOrder).addChild(bitmap);
        } else {
            bitmap = this.batcherRelation.get(id) as egret.Bitmap;
        }

        return bitmap;
    }

    public drawDebugBox(id: number, batchOrder: BatcherOrder): egret.Shape {
        let shape: egret.Shape;
        if (!this.debugBatcherRelation.has(id)) {
            shape = new egret.Shape();
            this.debugBatcherRelation.set(id, shape);
            this.containerRelation.get(batchOrder).addChild(shape);
        } else {
            shape = this.debugBatcherRelation.get(id) as egret.Shape;
        }

        return shape;
    }

    public drawDebugGrid(id: number, batchOrder: BatcherOrder, camera: es.Camera) {
        let gridContainer: egret.DisplayObjectContainer;
        let alpha = 0.5;
        if (!this.debugBatcherRelation.has(id)) {
            gridContainer = new egret.DisplayObjectContainer();
            gridContainer.cacheAsBitmap = true;

            // 视口在世界空间的四个点
            let leftUp = camera.screenToWorldPoint(new es.Vector2(0, 0));
            let rightUp = camera.screenToWorldPoint(new es.Vector2(camera.bounds.width, 0));
            let leftDown = camera.screenToWorldPoint(new es.Vector2(0, camera.bounds.height));
            let rightDown = camera.screenToWorldPoint(new es.Vector2(camera.bounds.width, camera.bounds.height));

            let x = Math.ceil((rightUp.x - leftUp.x) / Config.pattern);
            let y = Math.ceil((leftDown.y - leftUp.y) / Config.pattern);
            for (let i = 0; i <= x; i ++) {
                let shape = new egret.Shape();
                shape.graphics.lineStyle(2, 0xffffff, alpha);
                shape.graphics.moveTo(i * Config.pattern, leftUp.y);
                shape.graphics.lineTo(i * Config.pattern, leftDown.y);
                shape.graphics.endFill();
                gridContainer.addChild(shape);

                es.Core.schedule(0, true, this, ()=>{
                    let cameraEntity = es.Core.scene.findEntity("camera");
                    let camera = cameraEntity.getComponent<es.Camera>(es.Camera) || 
                        cameraEntity.getComponent<es.FollowCamera>(es.FollowCamera).camera;

                    let leftUp = camera.screenToWorldPoint(new es.Vector2(0, 0));
                    let rightUp = camera.screenToWorldPoint(new es.Vector2(camera.bounds.width, 0));
                    let leftDown = camera.screenToWorldPoint(new es.Vector2(0, camera.bounds.height));
                    let rightDown = camera.screenToWorldPoint(new es.Vector2(camera.bounds.width, camera.bounds.height));

                    shape.graphics.clear();
                    shape.graphics.lineStyle(2, 0xffffff, alpha);
                    shape.graphics.moveTo(i * Config.pattern + (leftUp.x - leftUp.x % Config.pattern), leftUp.y);
                    shape.graphics.lineTo(i * Config.pattern + (leftUp.x - leftUp.x % Config.pattern), leftDown.y);
                    shape.graphics.endFill();
                });
            }

            for (let i = 0; i <= y; i ++) {
                let shape = new egret.Shape();
                shape.graphics.lineStyle(2, 0xffffff, alpha);
                shape.graphics.moveTo(leftUp.x, i * Config.pattern);
                shape.graphics.lineTo(rightUp.x, i * Config.pattern);
                shape.graphics.endFill();
                gridContainer.addChild(shape);

                es.Core.schedule(0, true, this, ()=>{
                    let cameraEntity = es.Core.scene.findEntity("camera");
                    let camera = cameraEntity.getComponent<es.Camera>(es.Camera) || 
                        cameraEntity.getComponent<es.FollowCamera>(es.FollowCamera).camera;

                    let leftUp = camera.screenToWorldPoint(new es.Vector2(0, 0));
                    let rightUp = camera.screenToWorldPoint(new es.Vector2(camera.bounds.width, 0));
                    let leftDown = camera.screenToWorldPoint(new es.Vector2(0, camera.bounds.height));
                    let rightDown = camera.screenToWorldPoint(new es.Vector2(camera.bounds.width, camera.bounds.height));
                    
                    shape.graphics.clear();
                    shape.graphics.lineStyle(2, 0xffffff, alpha);
                    shape.graphics.moveTo(leftUp.x, i * Config.pattern + (leftUp.y - leftUp.y % Config.pattern));
                    shape.graphics.lineTo(rightUp.x, i * Config.pattern + (leftUp.y - leftUp.y % Config.pattern));
                    shape.graphics.endFill();
                });
            }

            this.debugBatcherRelation.set(id, gridContainer);
            this.containerRelation.get(batchOrder).addChild(gridContainer);
        } else {
            gridContainer = this.debugBatcherRelation.get(id) as egret.DisplayObjectContainer;
        }

        return gridContainer;
    }

    public drawTriangles(id: number, batchOrder: BatcherOrder, verts: es.Vector2[], indices: number[]) {
        let shape: egret.Shape;
        if (!this.debugBatcherRelation.has(id)) {
            shape = new egret.Shape();
            shape.graphics.lineStyle(2, 0x00ff00);
            for (let indice of indices){
                if (indice == undefined) break;
                shape.graphics.lineTo(verts[indice].x, verts[indice].y);
                
            }
            shape.graphics.endFill();
            this.debugBatcherRelation.set(id, shape);
            this.containerRelation.get(batchOrder).addChild(shape);
        } else {
            shape = this.debugBatcherRelation.get(id) as egret.Shape;
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0x00ff00);
            for (let indice of indices){
                if (indice == undefined) break;
                shape.graphics.lineTo(verts[indice].x, verts[indice].y);
            }
            shape.graphics.endFill();
        }

        return shape;
    }
}