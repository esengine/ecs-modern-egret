module es {
    export class KeyboardUtils {
        /**
         * 当前帧按键状态
         */
        public static currentKeys: Keys[] = [];
        /**
         * 上一帧按键状态
         */
        public static previousKeys: Keys[] = [];
        private static keyStatusKeys: Keys[] = [];
    
        public static init(): void {
            document.addEventListener("keydown", KeyboardUtils.onKeyDownHandler);
            document.addEventListener("keyup", KeyboardUtils.onKeyUpHandler);
        }
    
        public static update(){
            KeyboardUtils.previousKeys.length = 0;
            for (let key of KeyboardUtils.currentKeys){
                KeyboardUtils.previousKeys.push(key);
                new linq.List(KeyboardUtils.currentKeys).remove(key);
            }
            KeyboardUtils.currentKeys.length = 0;
            for (let key of KeyboardUtils.keyStatusKeys){
                KeyboardUtils.currentKeys.push(key);
            }
        }
    
        public static destroy(): void {
            KeyboardUtils.currentKeys.length = 0;
    
            document.removeEventListener("keyup", KeyboardUtils.onKeyUpHandler);
            document.removeEventListener("keypress", KeyboardUtils.onKeyDownHandler);
        }
    
        private static onKeyDownHandler(event: KeyboardEvent): void {
            if (!new linq.List(KeyboardUtils.keyStatusKeys).contains(event.keyCode))
                KeyboardUtils.keyStatusKeys.push(event.keyCode);
        }
    
        private static onKeyUpHandler(event: KeyboardEvent): void {
            let linqList = new linq.List(KeyboardUtils.keyStatusKeys);
            if (linqList.contains(event.keyCode))
                linqList.remove(event.keyCode);
        }
    }
}
