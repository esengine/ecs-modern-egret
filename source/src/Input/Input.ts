module es {
    export class TouchState {
        public x = 0;
        public y = 0;
        public touchPoint: number = -1;
        public touchDown: boolean = false;
    
        public get position() {
            return new es.Vector2(this.x, this.y);
        }
    
        public reset() {
            this.x = 0;
            this.y = 0;
            this.touchDown = false;
            this.touchPoint = -1;
        }
    }
    
    export class Input {
        private static _init: boolean = false;
        private static _previousTouchState: TouchState = new TouchState();
        private static _resolutionOffset: es.Vector2 = new es.Vector2();
        private static _touchIndex: number = 0;
        private static _stage: egret.Stage;
    
        private static _gameTouchs: TouchState[] = [];
    
        /**
         * 触摸列表 存放最大个数量触摸点信息
         * 可通过判断touchPoint是否为-1 来确定是否为有触摸
         * 通过判断touchDown 判断触摸点是否有按下
         */
        public static get gameTouchs() {
            return this._gameTouchs;
        }
    
        private static _resolutionScale: Vector2 = Vector2.one;
    
        /** 获取缩放值 默认为1 */
        public static get resolutionScale() {
            return this._resolutionScale;
        }
    
        private static _totalTouchCount: number = 0;
    
        /** 当前触摸点数量 */
        public static get totalTouchCount() {
            return this._totalTouchCount;
        }
    
        /** 返回第一个触摸点的坐标 */
        public static get touchPosition() {
            if (!this._gameTouchs[0])
                return Vector2.zero;
            return this._gameTouchs[0].position;
        }
    
        public static _virtualInputs: VirtualInput[] = [];
    
        /** 获取最大触摸数 */
        public static get maxSupportedTouch() {
            return this._stage.maxTouches;
        }
    
        /** 获取第一个触摸点距离上次距离的增量 */
        public static get touchPositionDelta() {
            let delta = Vector2.subtract(this.touchPosition, this._previousTouchState.position);
            if (delta.length() > 0) {
                this.setpreviousTouchState(this._gameTouchs[0]);
            }
            return delta;
        }
    
        public static initialize(stage: egret.Stage) {
            if (this._init)
                return;
    
            this._init = true;
            this._stage = stage;
            stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
    
            this.initTouchCache();
        }
    
        public static update(){
            KeyboardUtils.update();
            for (let i = 0; i < this._virtualInputs.length; i ++)
                this._virtualInputs[i].update();
        }
    
        public static scaledPosition(position: Vector2) {
            let scaledPos = new Vector2(position.x - this._resolutionOffset.x, position.y - this._resolutionOffset.y);
            return Vector2.multiply(scaledPos, this.resolutionScale);
        }
    
        /**
         * 只有在当前帧按下并且在上一帧没有按下时才算press
         * @param key
         */
        public static isKeyPressed(key: Keys): boolean{
            return new linq.List(KeyboardUtils.currentKeys).contains(key) && !new linq.List(KeyboardUtils.previousKeys).contains(key);
        }
    
        public static isKeyPressedBoth(keyA: Keys, keyB: Keys){
            return this.isKeyPressed(keyA) || this.isKeyPressed(keyB);
        }
    
        public static isKeyDown(key: Keys): boolean {
            return new linq.List(KeyboardUtils.currentKeys).contains(key);
        }
    
        public static isKeyDownBoth(keyA: Keys, keyB: Keys){
            return this.isKeyDown(keyA) || this.isKeyDown(keyB);
        }
    
        public static isKeyReleased(key: Keys){
            return !new linq.List(KeyboardUtils.currentKeys).contains(key) && new linq.List(KeyboardUtils.previousKeys).contains(key);
        }
    
        public static isKeyReleasedBoth(keyA: Keys, keyB: Keys){
            return this.isKeyReleased(keyA) || this.isKeyReleased(keyB);
        }
    
        private static initTouchCache() {
            this._totalTouchCount = 0;
            this._touchIndex = 0;
            this._gameTouchs.length = 0;
            for (let i = 0; i < this.maxSupportedTouch; i++) {
                this._gameTouchs.push(new TouchState());
            }
        }
    
        private static touchBegin(evt: egret.TouchEvent) {
            if (this._touchIndex < this.maxSupportedTouch) {
                this._gameTouchs[this._touchIndex].touchPoint = evt.touchPointID;
                this._gameTouchs[this._touchIndex].touchDown = evt.touchDown;
                this._gameTouchs[this._touchIndex].x = evt.stageX;
                this._gameTouchs[this._touchIndex].y = evt.stageY;
                if (this._touchIndex == 0) {
                    this.setpreviousTouchState(this._gameTouchs[0]);
                }
                this._touchIndex++;
                this._totalTouchCount++;
            }
        }
    
        private static touchMove(evt: egret.TouchEvent) {
            if (evt.touchPointID == this._gameTouchs[0].touchPoint) {
                this.setpreviousTouchState(this._gameTouchs[0]);
            }
    
            let touchIndex = this._gameTouchs.findIndex(touch => touch.touchPoint == evt.touchPointID);
            if (touchIndex != -1) {
                let touchData = this._gameTouchs[touchIndex];
                touchData.x = evt.stageX;
                touchData.y = evt.stageY;
            }
        }
    
        private static touchEnd(evt: egret.TouchEvent) {
            let touchIndex = this._gameTouchs.findIndex(touch => touch.touchPoint == evt.touchPointID);
            if (touchIndex != -1) {
                let touchData = this._gameTouchs[touchIndex];
                touchData.reset();
                if (touchIndex == 0)
                    this._previousTouchState.reset();
                this._totalTouchCount--;
                if (this.totalTouchCount == 0) {
                    this._touchIndex = 0;
                }
            }
        }
    
        private static setpreviousTouchState(touchState: TouchState) {
            this._previousTouchState = new TouchState();
            this._previousTouchState.x = touchState.position.x;
            this._previousTouchState.y = touchState.position.y;
            this._previousTouchState.touchPoint = touchState.touchPoint;
            this._previousTouchState.touchDown = touchState.touchDown;
        }
    }
}
