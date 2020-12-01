declare module es {
    interface CameraInset {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }
    class Camera extends Component {
        _inset: CameraInset;
        _areMatrixedDirty: boolean;
        _areBoundsDirty: boolean;
        _isProjectionMatrixDirty: boolean;
        constructor();
        /**
         * 对entity.transform.position的快速访问
         */
        /**
        * 对entity.transform.position的快速访问
        * @param value
        */
        position: Vector2;
        /**
         * 对entity.transform.rotation的快速访问
         */
        /**
        * 对entity.transform.rotation的快速访问
        * @param value
        */
        rotation: number;
        /**
         * 原始的缩放值。这就是用于比例矩阵的精确值。默认值为1。
         */
        /**
        * 原始的缩放值。这就是用于比例矩阵的精确值。默认值为1。
        * @param value
        */
        rawZoom: number;
        _zoom: number;
        /**
         * 缩放值应该在-1和1之间、然后将该值从minimumZoom转换为maximumZoom。
         * 允许你设置适当的最小/最大值，然后使用更直观的-1到1的映射来更改缩放
         */
        /**
        * 缩放值应该在-1和1之间、然后将该值从minimumZoom转换为maximumZoom。
        * 允许你设置适当的最小/最大值，然后使用更直观的-1到1的映射来更改缩放
        * @param value
        */
        zoom: number;
        _minimumZoom: number;
        /**
         * 相机变焦可以达到的最小非缩放值（0-number.max）。默认为0.3
         */
        /**
        * 相机变焦可以达到的最小非缩放值（0-number.max）。默认为0.3
        * @param value
        */
        minimumZoom: number;
        _maximumZoom: number;
        /**
         * 相机变焦可以达到的最大非缩放值（0-number.max）。默认为3
         */
        /**
        * 相机变焦可以达到的最大非缩放值（0-number.max）。默认为3
        * @param value
        */
        maximumZoom: number;
        _bounds: Rectangle;
        /**
         * 相机的世界-空间边界
         */
        readonly bounds: Rectangle;
        _transformMatrix: Matrix2D;
        /**
         * 用于从世界坐标转换到屏幕
         */
        readonly transformMatrix: Matrix2D;
        _inverseTransformMatrix: Matrix2D;
        /**
         * 用于从屏幕坐标到世界的转换
         */
        readonly inverseTransformMatrix: Matrix2D;
        _origin: Vector2;
        origin: Vector2;
        /**
         * 设置用于从视口边缘插入摄像机边界的量
         * @param left
         * @param right
         * @param top
         * @param bottom
         */
        setInset(left: number, right: number, top: number, bottom: number): Camera;
        /**
         * 对entity.transform.setPosition快速访问
         * @param position
         */
        setPosition(position: Vector2): this;
        /**
         * 对entity.transform.setRotation的快速访问
         * @param rotation
         */
        setRotation(rotation: number): Camera;
        /**
         * 设置缩放值，缩放值应该在-1到1之间。然后将该值从minimumZoom转换为maximumZoom
         * 允许您设置适当的最小/最大值。使用更直观的-1到1的映射来更改缩放
         * @param zoom
         */
        setZoom(zoom: number): Camera;
        /**
         * 相机变焦可以达到的最小非缩放值（0-number.max） 默认为0.3
         * @param minZoom
         */
        setMinimumZoom(minZoom: number): Camera;
        /**
         * 相机变焦可以达到的最大非缩放值（0-number.max） 默认为3
         * @param maxZoom
         */
        setMaximumZoom(maxZoom: number): Camera;
        forceMatrixUpdate(): void;
        onEntityTransformChanged(comp: transform.Component): void;
        zoomIn(deltaZoom: number): void;
        zoomOut(deltaZoom: number): void;
        /**
         * 将一个点从世界坐标转换到屏幕
         * @param worldPosition
         */
        worldToScreenPoint(worldPosition: Vector2): Vector2;
        /**
         * 将点从屏幕坐标转换为世界坐标
         * @param screenPosition
         */
        screenToWorldPoint(screenPosition: Vector2): Vector2;
        /**
         * 当场景渲染目标的大小发生变化时，我们会更新相机的原点并调整它的位置以保持它原来的位置
         * @param newWidth
         * @param newHeight
         */
        onSceneRenderTargetSizeChanged(newWidth: number, newHeight: number): void;
        protected updateMatrixes(): void;
    }
}
declare module es {
    class CameraShake extends Component implements IUpdatable {
        _shakeDirection: Vector2;
        _shakeOffset: Vector2;
        _shakeIntensity: number;
        _shakeDegredation: number;
        /**
         * 如果震动已经在运行，只有震动强度>当前shakeIntensity, 将覆盖当前值
         * 如果shake当前不是活动的，它将被启动。
         * @param shakeIntensify 震动强度
         * @param shakeDegredation 较高的值会导致更快的停止震动
         * @param shakeDirection 0只会导致x/y轴上的振动。任何其他的值将导致通过在抖动方向*强度是相机移动偏移
         */
        shake(shakeIntensify?: number, shakeDegredation?: number, shakeDirection?: Vector2): void;
        update(): void;
    }
}
declare module es {
    enum CameraStyle {
        lockOn = 0,
        cameraWindow = 1
    }
    class FollowCamera extends Component implements IUpdatable {
        camera: Camera;
        /**
         * 如果相机模式为cameraWindow 则会进行缓动移动
         * 该值为移动速度
         */
        followLerp: number;
        /**
         * 在cameraWindow模式下，宽度/高度被用做边界框，允许在不移动相机的情况下移动
         * 在lockOn模式下，只使用deadZone的x/y值 你可以通过直接setCenteredDeadzone重写它来自定义deadZone
         */
        deadzone: Rectangle;
        /**
         * 相机聚焦于屏幕中心的偏移
         */
        focusOffset: Vector2;
        /**
         * 如果为true 相机位置则不会超出地图矩形（0, 0, mapwidth, mapheight）
         */
        mapLockEnabled: boolean;
        mapSize: Rectangle;
        _targetEntity: Entity;
        _targetCollider: Collider;
        _desiredPositionDelta: Vector2;
        _cameraStyle: CameraStyle;
        _worldSpaceDeadZone: Rectangle;
        constructor(targetEntity?: Entity, camera?: Camera, cameraStyle?: CameraStyle);
        onAddedToEntity(): void;
        onGraphicsDeviceReset(): void;
        update(): void;
        /**
         * 固定相机 永远不会离开地图的可见区域
         * @param position
         */
        clampToMapSize(position: Vector2): Vector2;
        follow(targetEntity: Entity, cameraStyle?: CameraStyle): void;
        updateFollow(): void;
        /**
         * 以给定的尺寸设置当前相机边界中心的死区
         * @param width
         * @param height
         */
        setCenteredDeadzone(width: number, height: number): void;
    }
}
declare module es {
    class Sprite {
        texture2D: egret.Texture;
        readonly sourceRect: Rectangle;
        readonly center: Vector2;
        origin: Vector2;
        readonly uvs: Rectangle;
        constructor(texture: egret.Texture, sourceRect?: Rectangle, origin?: Vector2);
        /**
         * 提供一个精灵的列/行等间隔的图集的精灵列表
         * @param texture
         * @param cellWidth
         * @param cellHeight
         * @param cellOffset 处理时要包含的第一个单元格。基于0的索引
         * @param maxCellsToInclude 包含的最大单元
         */
        static spritesFromAtlas(texture: egret.Texture, cellWidth: number, cellHeight: number, cellOffset?: number, maxCellsToInclude?: number): Sprite[];
    }
}
declare module es {
    class SpriteAnimation {
        readonly sprites: Sprite[];
        readonly frameRate: number;
        constructor(sprites: Sprite[], frameRate?: number);
    }
}
declare module es {
    class SpriteRenderer extends Component {
        constructor(sprite?: Sprite | egret.Texture);
        protected _origin: Vector2;
        /**
         * 精灵的原点。这是在设置精灵时自动设置的
         */
        /**
        * 精灵的原点。这是在设置精灵时自动设置的
        * @param value
        */
        origin: Vector2;
        protected _sprite: Sprite;
        /**
         * 应该由这个精灵显示的精灵
         * 当设置时，精灵的原点也被设置为精灵的origin
         */
        /**
        * 应该由这个精灵显示的精灵
        * 当设置时，精灵的原点也被设置为精灵的origin
        * @param value
        */
        sprite: Sprite;
        /**
         * 设置精灵并更新精灵的原点以匹配sprite.origin
         * @param sprite
         */
        setSprite(sprite: Sprite): SpriteRenderer;
        /**
         * 设置可渲染的原点
         * @param origin
         */
        setOrigin(origin: Vector2): SpriteRenderer;
    }
}
declare module es {
    enum LoopMode {
        /** 在一个循环序列[A][B][C][A][B][C][A][B][C]... */
        loop = 0,
        /** [A][B][C]然后暂停，设置时间为0 [A] */
        once = 1,
        /** [A][B][C]。当它到达终点时，它会继续播放最后一帧，并且不会停止播放 */
        clampForever = 2,
        /** 在乒乓循环中永远播放序列[A][B][C][B][A][B][C][B]...... */
        pingPong = 3,
        /** 向前播放一次序列，然后回到起点[A][B][C][B][A]，然后暂停并将时间设置为0 */
        pingPongOnce = 4
    }
    enum State {
        none = 0,
        running = 1,
        paused = 2,
        completed = 3
    }
    /**
     * SpriteAnimator处理精灵的显示和动画
     */
    class SpriteAnimator extends SpriteRenderer implements IUpdatable {
        /**
         * 在动画完成时触发，包括动画名称
         */
        onAnimationCompletedEvent: (string: any) => void;
        /**
         * 动画播放速度
         */
        speed: number;
        /**
         * 动画的当前状态
         */
        animationState: State;
        /**
         * 当前动画
         */
        currentAnimation: SpriteAnimation;
        /**
         * 当前动画的名称
         */
        currentAnimationName: string;
        /**
         * 当前动画的精灵数组中当前帧的索引
         */
        currentFrame: number;
        _elapsedTime: number;
        _loopMode: LoopMode;
        constructor(sprite?: Sprite);
        /**
         * 检查当前动画是否正在运行
         */
        readonly isRunning: boolean;
        private _animations;
        /** 提供对可用动画列表的访问 */
        readonly animations: Map<string, SpriteAnimation>;
        update(): void;
        /**
         * 添加一个SpriteAnimation
         * @param name
         * @param animation
         */
        addAnimation(name: string, animation: SpriteAnimation): SpriteAnimator;
        /**
         * 以给定的名称放置动画。如果没有指定循环模式，则默认为循环
         * @param name
         * @param loopMode
         */
        play(name: string, loopMode?: LoopMode): void;
        /**
         * 检查动画是否在播放（即动画是否处于活动状态，可能仍处于暂停状态）
         * @param name
         */
        isAnimationActive(name: string): boolean;
        /**
         * 暂停动画
         */
        pause(): void;
        /**
         * 继续动画
         */
        unPause(): void;
        /**
         * 停止当前动画并将其设为null
         */
        stop(): void;
    }
}
