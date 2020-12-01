var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var es;
(function (es) {
    var Camera = /** @class */ (function (_super) {
        __extends(Camera, _super);
        function Camera() {
            var _this = _super.call(this) || this;
            _this._inset = { left: 0, right: 0, top: 0, bottom: 0 };
            _this._areMatrixedDirty = true;
            _this._areBoundsDirty = true;
            _this._isProjectionMatrixDirty = true;
            _this._zoom = 0;
            _this._minimumZoom = 0.3;
            _this._maximumZoom = 3;
            _this._bounds = new es.Rectangle();
            _this._transformMatrix = es.Matrix2D.identity;
            _this._inverseTransformMatrix = es.Matrix2D.identity;
            _this._origin = es.Vector2.zero;
            _this.setZoom(0);
            return _this;
        }
        Object.defineProperty(Camera.prototype, "position", {
            /**
             * 对entity.transform.position的快速访问
             */
            get: function () {
                return this.entity.transform.position;
            },
            /**
             * 对entity.transform.position的快速访问
             * @param value
             */
            set: function (value) {
                this.entity.transform.position = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "rotation", {
            /**
             * 对entity.transform.rotation的快速访问
             */
            get: function () {
                return this.entity.transform.rotation;
            },
            /**
             * 对entity.transform.rotation的快速访问
             * @param value
             */
            set: function (value) {
                this.entity.transform.rotation = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "rawZoom", {
            /**
             * 原始的缩放值。这就是用于比例矩阵的精确值。默认值为1。
             */
            get: function () {
                return this._zoom;
            },
            /**
             * 原始的缩放值。这就是用于比例矩阵的精确值。默认值为1。
             * @param value
             */
            set: function (value) {
                if (value != this._zoom) {
                    this._zoom = value;
                    this._areMatrixedDirty = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "zoom", {
            /**
             * 缩放值应该在-1和1之间、然后将该值从minimumZoom转换为maximumZoom。
             * 允许你设置适当的最小/最大值，然后使用更直观的-1到1的映射来更改缩放
             */
            get: function () {
                if (this._zoom == 0)
                    return 1;
                if (this._zoom < 1)
                    return es.MathHelper.map(this._zoom, this._minimumZoom, 1, -1, 0);
                return es.MathHelper.map(this._zoom, 1, this._maximumZoom, 0, 1);
            },
            /**
             * 缩放值应该在-1和1之间、然后将该值从minimumZoom转换为maximumZoom。
             * 允许你设置适当的最小/最大值，然后使用更直观的-1到1的映射来更改缩放
             * @param value
             */
            set: function (value) {
                this.setZoom(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "minimumZoom", {
            /**
             * 相机变焦可以达到的最小非缩放值（0-number.max）。默认为0.3
             */
            get: function () {
                return this._minimumZoom;
            },
            /**
             * 相机变焦可以达到的最小非缩放值（0-number.max）。默认为0.3
             * @param value
             */
            set: function (value) {
                this.setMinimumZoom(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "maximumZoom", {
            /**
             * 相机变焦可以达到的最大非缩放值（0-number.max）。默认为3
             */
            get: function () {
                return this._maximumZoom;
            },
            /**
             * 相机变焦可以达到的最大非缩放值（0-number.max）。默认为3
             * @param value
             */
            set: function (value) {
                this.setMaximumZoom(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "bounds", {
            /**
             * 相机的世界-空间边界
             */
            get: function () {
                if (this._areMatrixedDirty)
                    this.updateMatrixes();
                if (this._areBoundsDirty) {
                    // 旋转或非旋转的边界都需要左上角和右下角
                    var topLeft = this.screenToWorldPoint(new es.Vector2(this._inset.left, this._inset.top));
                    var bottomRight = this.screenToWorldPoint(new es.Vector2(es.Core.Instance.width - this._inset.right, es.Core.Instance.height - this._inset.bottom));
                    if (this.entity.transform.rotation != 0) {
                        // 特别注意旋转的边界。我们需要找到绝对的最小/最大值并从中创建边界
                        var topRight = this.screenToWorldPoint(new es.Vector2(es.Core.Instance.width - this._inset.right, this._inset.top));
                        var bottomLeft = this.screenToWorldPoint(new es.Vector2(this._inset.left, es.Core.Instance.height - this._inset.bottom));
                        var minX = Math.min(topLeft.x, bottomRight.x, topRight.x, bottomLeft.x);
                        var maxX = Math.max(topLeft.x, bottomRight.x, topRight.x, bottomLeft.x);
                        var minY = Math.min(topLeft.y, bottomRight.y, topRight.y, bottomLeft.y);
                        var maxY = Math.max(topLeft.y, bottomRight.y, topRight.y, bottomLeft.y);
                        this._bounds.location = new es.Vector2(minX, minY);
                        this._bounds.width = maxX - minX;
                        this._bounds.height = maxY - minY;
                    }
                    else {
                        this._bounds.location = topLeft;
                        this._bounds.width = bottomRight.x - topLeft.x;
                        this._bounds.height = bottomRight.y - topLeft.y;
                    }
                    this._areBoundsDirty = false;
                }
                return this._bounds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "transformMatrix", {
            /**
             * 用于从世界坐标转换到屏幕
             */
            get: function () {
                if (this._areMatrixedDirty)
                    this.updateMatrixes();
                return this._transformMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "inverseTransformMatrix", {
            /**
             * 用于从屏幕坐标到世界的转换
             */
            get: function () {
                if (this._areMatrixedDirty)
                    this.updateMatrixes();
                return this._inverseTransformMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "origin", {
            get: function () {
                return this._origin;
            },
            set: function (value) {
                if (this._origin != value) {
                    this._origin = value;
                    this._areMatrixedDirty = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置用于从视口边缘插入摄像机边界的量
         * @param left
         * @param right
         * @param top
         * @param bottom
         */
        Camera.prototype.setInset = function (left, right, top, bottom) {
            this._inset = { left: left, right: right, top: top, bottom: bottom };
            this._areBoundsDirty = true;
            return this;
        };
        /**
         * 对entity.transform.setPosition快速访问
         * @param position
         */
        Camera.prototype.setPosition = function (position) {
            this.entity.transform.setPosition(position.x, position.y);
            return this;
        };
        /**
         * 对entity.transform.setRotation的快速访问
         * @param rotation
         */
        Camera.prototype.setRotation = function (rotation) {
            this.entity.transform.setRotation(rotation);
            return this;
        };
        /**
         * 设置缩放值，缩放值应该在-1到1之间。然后将该值从minimumZoom转换为maximumZoom
         * 允许您设置适当的最小/最大值。使用更直观的-1到1的映射来更改缩放
         * @param zoom
         */
        Camera.prototype.setZoom = function (zoom) {
            var newZoom = es.MathHelper.clamp(zoom, -1, 1);
            if (newZoom == 0) {
                this._zoom = 1;
            }
            else if (newZoom < 0) {
                this._zoom = es.MathHelper.map(newZoom, -1, 0, this._minimumZoom, 1);
            }
            else {
                this._zoom = es.MathHelper.map(newZoom, 0, 1, 1, this._maximumZoom);
            }
            this._areMatrixedDirty = true;
            return this;
        };
        /**
         * 相机变焦可以达到的最小非缩放值（0-number.max） 默认为0.3
         * @param minZoom
         */
        Camera.prototype.setMinimumZoom = function (minZoom) {
            if (minZoom <= 0) {
                console.error("minimumZoom must be greater than zero");
                return;
            }
            if (this._zoom < minZoom)
                this._zoom = this.minimumZoom;
            this._minimumZoom = minZoom;
            return this;
        };
        /**
         * 相机变焦可以达到的最大非缩放值（0-number.max） 默认为3
         * @param maxZoom
         */
        Camera.prototype.setMaximumZoom = function (maxZoom) {
            if (maxZoom <= 0) {
                console.error("maximumZoom must be greater than zero");
                return;
            }
            if (this._zoom > maxZoom)
                this._zoom = maxZoom;
            this._maximumZoom = maxZoom;
            return this;
        };
        Camera.prototype.forceMatrixUpdate = function () {
            // 弄脏矩阵也会自动弄脏边界
            this._areMatrixedDirty = true;
        };
        Camera.prototype.onEntityTransformChanged = function (comp) {
            this._areMatrixedDirty = true;
        };
        Camera.prototype.zoomIn = function (deltaZoom) {
            this.zoom += deltaZoom;
        };
        Camera.prototype.zoomOut = function (deltaZoom) {
            this.zoom -= deltaZoom;
        };
        /**
         * 将一个点从世界坐标转换到屏幕
         * @param worldPosition
         */
        Camera.prototype.worldToScreenPoint = function (worldPosition) {
            this.updateMatrixes();
            es.Vector2Ext.transformR(worldPosition, this._transformMatrix, worldPosition);
            return worldPosition;
        };
        /**
         * 将点从屏幕坐标转换为世界坐标
         * @param screenPosition
         */
        Camera.prototype.screenToWorldPoint = function (screenPosition) {
            this.updateMatrixes();
            es.Vector2Ext.transformR(screenPosition, this._inverseTransformMatrix, screenPosition);
            return screenPosition;
        };
        /**
         * 当场景渲染目标的大小发生变化时，我们会更新相机的原点并调整它的位置以保持它原来的位置
         * @param newWidth
         * @param newHeight
         */
        Camera.prototype.onSceneRenderTargetSizeChanged = function (newWidth, newHeight) {
            this._isProjectionMatrixDirty = true;
            var oldOrigin = this._origin;
            this.origin = new es.Vector2(newWidth / 2, newHeight / 2);
            this.entity.transform.position.add(es.Vector2.subtract(this._origin, oldOrigin));
        };
        Camera.prototype.updateMatrixes = function () {
            if (!this._areMatrixedDirty)
                return;
            var tempMat;
            this._transformMatrix = es.Matrix2D.createTranslation(-this.entity.transform.position.x, -this.entity.transform.position.y);
            if (this._zoom != 1) {
                tempMat = es.Matrix2D.createScale(this._zoom, this._zoom);
                this._transformMatrix = this._transformMatrix.multiply(tempMat);
            }
            if (this.entity.transform.rotation != 0) {
                tempMat = es.Matrix2D.createRotation(this.entity.transform.rotation);
                this._transformMatrix = this._transformMatrix.multiply(tempMat);
            }
            tempMat = es.Matrix2D.createTranslation(Math.floor(this._origin.x), Math.floor(this._origin.y));
            this._transformMatrix = this._transformMatrix.multiply(tempMat);
            this._inverseTransformMatrix = es.Matrix2D.invert(this._transformMatrix);
            // 无论何时矩阵改变边界都是无效的
            this._areBoundsDirty = true;
            this._areMatrixedDirty = false;
        };
        return Camera;
    }(es.Component));
    es.Camera = Camera;
})(es || (es = {}));
var es;
(function (es) {
    var CameraShake = /** @class */ (function (_super) {
        __extends(CameraShake, _super);
        function CameraShake() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._shakeDirection = es.Vector2.zero;
            _this._shakeOffset = es.Vector2.zero;
            _this._shakeIntensity = 0;
            _this._shakeDegredation = 0.95;
            return _this;
        }
        /**
         * 如果震动已经在运行，只有震动强度>当前shakeIntensity, 将覆盖当前值
         * 如果shake当前不是活动的，它将被启动。
         * @param shakeIntensify 震动强度
         * @param shakeDegredation 较高的值会导致更快的停止震动
         * @param shakeDirection 0只会导致x/y轴上的振动。任何其他的值将导致通过在抖动方向*强度是相机移动偏移
         */
        CameraShake.prototype.shake = function (shakeIntensify, shakeDegredation, shakeDirection) {
            if (shakeIntensify === void 0) { shakeIntensify = 15; }
            if (shakeDegredation === void 0) { shakeDegredation = 0.9; }
            if (shakeDirection === void 0) { shakeDirection = es.Vector2.zero; }
            this.enabled = true;
            if (this._shakeIntensity < shakeIntensify) {
                this._shakeDirection = shakeDirection;
                this._shakeIntensity = shakeIntensify;
                if (shakeDegredation < 0 || shakeDegredation >= 1) {
                    shakeDegredation = 0.95;
                }
                this._shakeDegredation = shakeDegredation;
            }
        };
        CameraShake.prototype.update = function () {
            if (Math.abs(this._shakeIntensity) > 0) {
                this._shakeOffset = this._shakeDirection;
                if (this._shakeOffset.x != 0 || this._shakeOffset.y != 0) {
                    this._shakeOffset.normalize();
                }
                else {
                    this._shakeOffset.x = this._shakeOffset.x + Math.random() - 0.5;
                    this._shakeOffset.y = this._shakeOffset.y + Math.random() - 0.5;
                }
                // TODO: 这需要乘相机变焦
                this._shakeOffset.multiply(new es.Vector2(this._shakeIntensity));
                this._shakeIntensity *= -this._shakeDegredation;
                if (Math.abs(this._shakeIntensity) <= 0.01) {
                    this._shakeIntensity = 0;
                    this.enabled = false;
                }
            }
        };
        return CameraShake;
    }(es.Component));
    es.CameraShake = CameraShake;
})(es || (es = {}));
var es;
(function (es) {
    var CameraStyle;
    (function (CameraStyle) {
        CameraStyle[CameraStyle["lockOn"] = 0] = "lockOn";
        CameraStyle[CameraStyle["cameraWindow"] = 1] = "cameraWindow";
    })(CameraStyle = es.CameraStyle || (es.CameraStyle = {}));
    var FollowCamera = /** @class */ (function (_super) {
        __extends(FollowCamera, _super);
        function FollowCamera(targetEntity, camera, cameraStyle) {
            if (targetEntity === void 0) { targetEntity = null; }
            if (camera === void 0) { camera = null; }
            if (cameraStyle === void 0) { cameraStyle = CameraStyle.lockOn; }
            var _this = _super.call(this) || this;
            /**
             * 如果相机模式为cameraWindow 则会进行缓动移动
             * 该值为移动速度
             */
            _this.followLerp = 0.1;
            /**
             * 在cameraWindow模式下，宽度/高度被用做边界框，允许在不移动相机的情况下移动
             * 在lockOn模式下，只使用deadZone的x/y值 你可以通过直接setCenteredDeadzone重写它来自定义deadZone
             */
            _this.deadzone = new es.Rectangle();
            /**
             * 相机聚焦于屏幕中心的偏移
             */
            _this.focusOffset = es.Vector2.zero;
            /**
             * 如果为true 相机位置则不会超出地图矩形（0, 0, mapwidth, mapheight）
             */
            _this.mapLockEnabled = false;
            _this.mapSize = new es.Rectangle();
            _this._desiredPositionDelta = new es.Vector2();
            _this._worldSpaceDeadZone = new es.Rectangle();
            _this._targetEntity = targetEntity;
            _this._cameraStyle = cameraStyle;
            _this.camera = camera;
            return _this;
        }
        FollowCamera.prototype.onAddedToEntity = function () {
            if (this.camera == null)
                this.camera = this.entity.getOrCreateComponent(es.Camera);
            this.follow(this._targetEntity, this._cameraStyle);
            es.Core.emitter.addObserver(es.CoreEvents.GraphicsDeviceReset, this.onGraphicsDeviceReset, this);
        };
        FollowCamera.prototype.onGraphicsDeviceReset = function () {
            // 我们需要这个在下一帧触发 这样相机边界就会更新
            es.Core.schedule(0, false, this, function (t) {
                var self = t.context;
                self.follow(self._targetEntity, self._cameraStyle);
            });
        };
        FollowCamera.prototype.update = function () {
            var halfScreen = es.Vector2.multiply(this.camera.bounds.size, new es.Vector2(0.5));
            this._worldSpaceDeadZone.x = this.camera.position.x - halfScreen.x + this.deadzone.x + this.focusOffset.x;
            this._worldSpaceDeadZone.y = this.camera.position.y - halfScreen.y + this.deadzone.y + this.focusOffset.y;
            this._worldSpaceDeadZone.width = this.deadzone.width;
            this._worldSpaceDeadZone.height = this.deadzone.height;
            if (this._targetEntity)
                this.updateFollow();
            this.camera.position = es.Vector2.lerp(this.camera.position, es.Vector2.add(this.camera.position, this._desiredPositionDelta), this.followLerp);
            this.entity.transform.roundPosition();
            if (this.mapLockEnabled) {
                this.camera.position = this.clampToMapSize(this.camera.position);
                this.entity.transform.roundPosition();
            }
        };
        /**
         * 固定相机 永远不会离开地图的可见区域
         * @param position
         */
        FollowCamera.prototype.clampToMapSize = function (position) {
            var halfScreen = es.Vector2.multiply(this.camera.bounds.size, new es.Vector2(0.5)).add(new es.Vector2(this.mapSize.x, this.mapSize.y));
            var cameraMax = new es.Vector2(this.mapSize.width - halfScreen.x, this.mapSize.height - halfScreen.y);
            return es.Vector2.clamp(position, halfScreen, cameraMax);
        };
        FollowCamera.prototype.follow = function (targetEntity, cameraStyle) {
            if (cameraStyle === void 0) { cameraStyle = CameraStyle.cameraWindow; }
            this._targetEntity = targetEntity;
            this._cameraStyle = cameraStyle;
            var cameraBounds = this.camera.bounds;
            switch (this._cameraStyle) {
                case CameraStyle.cameraWindow:
                    var w = cameraBounds.width / 6;
                    var h = cameraBounds.height / 3;
                    this.deadzone = new es.Rectangle((cameraBounds.width - w) / 2, (cameraBounds.height - h) / 2, w, h);
                    break;
                case CameraStyle.lockOn:
                    this.deadzone = new es.Rectangle(cameraBounds.width / 2, cameraBounds.height / 2, 10, 10);
                    break;
            }
        };
        FollowCamera.prototype.updateFollow = function () {
            this._desiredPositionDelta.x = this._desiredPositionDelta.y = 0;
            if (this._cameraStyle == CameraStyle.lockOn) {
                var targetX = this._targetEntity.transform.position.x;
                var targetY = this._targetEntity.transform.position.y;
                if (this._worldSpaceDeadZone.x > targetX)
                    this._desiredPositionDelta.x = targetX - this._worldSpaceDeadZone.x;
                else if (this._worldSpaceDeadZone.x < targetX)
                    this._desiredPositionDelta.x = targetX - this._worldSpaceDeadZone.x;
                if (this._worldSpaceDeadZone.y < targetY)
                    this._desiredPositionDelta.y = targetY - this._worldSpaceDeadZone.y;
                else if (this._worldSpaceDeadZone.y > targetY)
                    this._desiredPositionDelta.y = targetY - this._worldSpaceDeadZone.y;
            }
            else {
                if (!this._targetCollider) {
                    this._targetCollider = this._targetEntity.getComponent(es.Collider);
                    if (!this._targetCollider)
                        return;
                }
                var targetBounds = this._targetEntity.getComponent(es.Collider).bounds;
                if (!this._worldSpaceDeadZone.containsRect(targetBounds)) {
                    if (this._worldSpaceDeadZone.left > targetBounds.left)
                        this._desiredPositionDelta.x = targetBounds.left - this._worldSpaceDeadZone.left;
                    else if (this._worldSpaceDeadZone.right < targetBounds.right)
                        this._desiredPositionDelta.x = targetBounds.right - this._worldSpaceDeadZone.right;
                    if (this._worldSpaceDeadZone.bottom < targetBounds.bottom)
                        this._desiredPositionDelta.y = targetBounds.bottom - this._worldSpaceDeadZone.bottom;
                    else if (this._worldSpaceDeadZone.top > targetBounds.top)
                        this._desiredPositionDelta.y = targetBounds.top - this._worldSpaceDeadZone.top;
                }
            }
        };
        /**
         * 以给定的尺寸设置当前相机边界中心的死区
         * @param width
         * @param height
         */
        FollowCamera.prototype.setCenteredDeadzone = function (width, height) {
            if (!this.camera) {
                console.error("相机是null。我们不能得到它的边界。请等到该组件添加到实体之后");
                return;
            }
            var cameraBounds = this.camera.bounds;
            this.deadzone = new es.Rectangle((cameraBounds.width - width) / 2, (cameraBounds.height - height) / 2, width, height);
        };
        return FollowCamera;
    }(es.Component));
    es.FollowCamera = FollowCamera;
})(es || (es = {}));
var es;
(function (es) {
    var Sprite = /** @class */ (function () {
        function Sprite(texture, sourceRect, origin) {
            if (sourceRect === void 0) { sourceRect = new es.Rectangle(0, 0, texture.textureWidth, texture.textureHeight); }
            if (origin === void 0) { origin = sourceRect.getHalfSize(); }
            this.uvs = new es.Rectangle();
            this.texture2D = texture;
            this.sourceRect = sourceRect;
            this.center = new es.Vector2(sourceRect.width * 0.5, sourceRect.height * 0.5);
            this.origin = origin;
            var inverseTexW = 1 / texture.textureWidth;
            var inverseTexH = 1 / texture.textureHeight;
            this.uvs.x = sourceRect.x * inverseTexW;
            this.uvs.y = sourceRect.y * inverseTexH;
            this.uvs.width = sourceRect.width * inverseTexW;
            this.uvs.height = sourceRect.height * inverseTexH;
        }
        /**
         * 提供一个精灵的列/行等间隔的图集的精灵列表
         * @param texture
         * @param cellWidth
         * @param cellHeight
         * @param cellOffset 处理时要包含的第一个单元格。基于0的索引
         * @param maxCellsToInclude 包含的最大单元
         */
        Sprite.spritesFromAtlas = function (texture, cellWidth, cellHeight, cellOffset, maxCellsToInclude) {
            if (cellOffset === void 0) { cellOffset = 0; }
            if (maxCellsToInclude === void 0) { maxCellsToInclude = Number.MAX_VALUE; }
            var sprites = [];
            var cols = texture.textureWidth / cellWidth;
            var rows = texture.textureHeight / cellHeight;
            var i = 0;
            var spriteSheet = new egret.SpriteSheet(texture);
            for (var y = 0; y < rows; y++) {
                for (var x = 0; x < cols; x++) {
                    if (i++ < cellOffset)
                        continue;
                    var texture_1 = spriteSheet.getTexture(y + "_" + x);
                    if (!texture_1)
                        texture_1 = spriteSheet.createTexture(y + "_" + x, x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                    sprites.push(new Sprite(texture_1));
                    if (sprites.length == maxCellsToInclude)
                        return sprites;
                }
            }
            return sprites;
        };
        return Sprite;
    }());
    es.Sprite = Sprite;
})(es || (es = {}));
var es;
(function (es) {
    var SpriteAnimation = /** @class */ (function () {
        function SpriteAnimation(sprites, frameRate) {
            if (frameRate === void 0) { frameRate = 10; }
            this.sprites = sprites;
            this.frameRate = frameRate;
        }
        return SpriteAnimation;
    }());
    es.SpriteAnimation = SpriteAnimation;
})(es || (es = {}));
var es;
(function (es) {
    var SpriteRenderer = /** @class */ (function (_super) {
        __extends(SpriteRenderer, _super);
        function SpriteRenderer(sprite) {
            if (sprite === void 0) { sprite = null; }
            var _this = _super.call(this) || this;
            if (sprite instanceof es.Sprite)
                _this.setSprite(sprite);
            else if (sprite instanceof egret.Texture)
                _this.setSprite(new es.Sprite(sprite));
            return _this;
        }
        Object.defineProperty(SpriteRenderer.prototype, "origin", {
            /**
             * 精灵的原点。这是在设置精灵时自动设置的
             */
            get: function () {
                return this._origin;
            },
            /**
             * 精灵的原点。这是在设置精灵时自动设置的
             * @param value
             */
            set: function (value) {
                this.setOrigin(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteRenderer.prototype, "sprite", {
            /**
             * 应该由这个精灵显示的精灵
             * 当设置时，精灵的原点也被设置为精灵的origin
             */
            get: function () {
                return this._sprite;
            },
            /**
             * 应该由这个精灵显示的精灵
             * 当设置时，精灵的原点也被设置为精灵的origin
             * @param value
             */
            set: function (value) {
                this.setSprite(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置精灵并更新精灵的原点以匹配sprite.origin
         * @param sprite
         */
        SpriteRenderer.prototype.setSprite = function (sprite) {
            this._sprite = sprite;
            if (this._sprite) {
                this._origin = this._sprite.origin;
            }
            return this;
        };
        /**
         * 设置可渲染的原点
         * @param origin
         */
        SpriteRenderer.prototype.setOrigin = function (origin) {
            if (!this._origin.equals(origin)) {
                this._origin = origin;
            }
            return this;
        };
        return SpriteRenderer;
    }(es.Component));
    es.SpriteRenderer = SpriteRenderer;
})(es || (es = {}));
///<reference path="./SpriteRenderer.ts" />
var es;
///<reference path="./SpriteRenderer.ts" />
(function (es) {
    var LoopMode;
    (function (LoopMode) {
        /** 在一个循环序列[A][B][C][A][B][C][A][B][C]... */
        LoopMode[LoopMode["loop"] = 0] = "loop";
        /** [A][B][C]然后暂停，设置时间为0 [A] */
        LoopMode[LoopMode["once"] = 1] = "once";
        /** [A][B][C]。当它到达终点时，它会继续播放最后一帧，并且不会停止播放 */
        LoopMode[LoopMode["clampForever"] = 2] = "clampForever";
        /** 在乒乓循环中永远播放序列[A][B][C][B][A][B][C][B]...... */
        LoopMode[LoopMode["pingPong"] = 3] = "pingPong";
        /** 向前播放一次序列，然后回到起点[A][B][C][B][A]，然后暂停并将时间设置为0 */
        LoopMode[LoopMode["pingPongOnce"] = 4] = "pingPongOnce";
    })(LoopMode = es.LoopMode || (es.LoopMode = {}));
    var State;
    (function (State) {
        State[State["none"] = 0] = "none";
        State[State["running"] = 1] = "running";
        State[State["paused"] = 2] = "paused";
        State[State["completed"] = 3] = "completed";
    })(State = es.State || (es.State = {}));
    /**
     * SpriteAnimator处理精灵的显示和动画
     */
    var SpriteAnimator = /** @class */ (function (_super) {
        __extends(SpriteAnimator, _super);
        function SpriteAnimator(sprite) {
            var _this = _super.call(this, sprite) || this;
            /**
             * 动画播放速度
             */
            _this.speed = 1;
            /**
             * 动画的当前状态
             */
            _this.animationState = State.none;
            _this._elapsedTime = 0;
            _this._animations = new Map();
            return _this;
        }
        Object.defineProperty(SpriteAnimator.prototype, "isRunning", {
            /**
             * 检查当前动画是否正在运行
             */
            get: function () {
                return this.animationState == State.running;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteAnimator.prototype, "animations", {
            /** 提供对可用动画列表的访问 */
            get: function () {
                return this._animations;
            },
            enumerable: true,
            configurable: true
        });
        SpriteAnimator.prototype.update = function () {
            if (this.animationState != State.running || this.currentAnimation == null)
                return;
            var animation = this.currentAnimation;
            var secondsPerFrame = 1 / (animation.frameRate * this.speed);
            var iterationDuration = secondsPerFrame * animation.sprites.length;
            var pingPongInterationDuration = animation.sprites.length < 3 ? iterationDuration : secondsPerFrame * (animation.sprites.length * 2 - 2);
            this._elapsedTime += es.Time.deltaTime;
            var time = Math.abs(this._elapsedTime);
            // Once和PingPongOnce一旦完成，就会重置回时间=0
            if (this._loopMode == LoopMode.once && time > iterationDuration ||
                this._loopMode == LoopMode.pingPongOnce && time > pingPongInterationDuration) {
                this.animationState = State.completed;
                this._elapsedTime = 0;
                this.currentFrame = 0;
                this.sprite = animation.sprites[0];
                this.onAnimationCompletedEvent(this.currentAnimationName);
                return;
            }
            if (this._loopMode == LoopMode.clampForever && time > iterationDuration) {
                this.animationState = State.completed;
                this.currentFrame = animation.sprites.length - 1;
                this.sprite = animation.sprites[this.currentFrame];
                this.onAnimationCompletedEvent(this.currentAnimationName);
                return;
            }
            // 弄清楚我们在哪个坐标系上
            var i = Math.floor(time / secondsPerFrame);
            var n = animation.sprites.length;
            if (n > 2 && (this._loopMode == LoopMode.pingPong || this._loopMode == LoopMode.pingPongOnce)) {
                // pingpong
                var maxIndex = n - 1;
                this.currentFrame = maxIndex - Math.abs(maxIndex - i % (maxIndex * 2));
            }
            else {
                this.currentFrame = i % n;
            }
            this.sprite = animation.sprites[this.currentFrame];
        };
        /**
         * 添加一个SpriteAnimation
         * @param name
         * @param animation
         */
        SpriteAnimator.prototype.addAnimation = function (name, animation) {
            // 如果我们没有精灵，使用我们找到的第一帧
            if (!this.sprite && animation.sprites.length > 0)
                this.setSprite(animation.sprites[0]);
            this._animations[name] = animation;
            return this;
        };
        /**
         * 以给定的名称放置动画。如果没有指定循环模式，则默认为循环
         * @param name
         * @param loopMode
         */
        SpriteAnimator.prototype.play = function (name, loopMode) {
            if (loopMode === void 0) { loopMode = null; }
            this.currentAnimation = this._animations[name];
            this.currentAnimationName = name;
            this.currentFrame = 0;
            this.animationState = State.running;
            this.sprite = this.currentAnimation.sprites[0];
            this._elapsedTime = 0;
            this._loopMode = loopMode || LoopMode.loop;
        };
        /**
         * 检查动画是否在播放（即动画是否处于活动状态，可能仍处于暂停状态）
         * @param name
         */
        SpriteAnimator.prototype.isAnimationActive = function (name) {
            return this.currentAnimation != null && this.currentAnimationName == name;
        };
        /**
         * 暂停动画
         */
        SpriteAnimator.prototype.pause = function () {
            this.animationState = State.paused;
        };
        /**
         * 继续动画
         */
        SpriteAnimator.prototype.unPause = function () {
            this.animationState = State.running;
        };
        /**
         * 停止当前动画并将其设为null
         */
        SpriteAnimator.prototype.stop = function () {
            this.currentAnimation = null;
            this.currentAnimationName = null;
            this.currentFrame = 0;
            this.animationState = State.none;
        };
        return SpriteAnimator;
    }(es.SpriteRenderer));
    es.SpriteAnimator = SpriteAnimator;
})(es || (es = {}));
