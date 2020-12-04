var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var es;
(function (es) {
    /**
     * 执行顺序
     *  - onAddedToEntity
     *  - OnEnabled
     *
     *  删除执行顺序
     *      - onRemovedFromEntity
     */
    var Component = /** @class */ (function () {
        function Component() {
            /**
             * 更新该组件的时间间隔。这与实体的更新间隔无关。
             */
            this.updateInterval = 1;
            this._enabled = true;
            this._updateOrder = 0;
        }
        Object.defineProperty(Component.prototype, "transform", {
            /**
             * 快速访问 this.entity.transform
             */
            get: function () {
                return this.entity.transform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "enabled", {
            /**
             * 如果组件和实体都已启用，则为。当启用该组件时，将调用该组件的生命周期方法。状态的改变会导致调用onEnabled/onDisable。
             */
            get: function () {
                return this.entity ? this.entity.enabled && this._enabled : this._enabled;
            },
            /**
             * 如果组件和实体都已启用，则为。当启用该组件时，将调用该组件的生命周期方法。状态的改变会导致调用onEnabled/onDisable。
             * @param value
             */
            set: function (value) {
                this.setEnabled(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "updateOrder", {
            /** 更新此实体上组件的顺序 */
            get: function () {
                return this._updateOrder;
            },
            /** 更新此实体上组件的顺序 */
            set: function (value) {
                this.setUpdateOrder(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 当此组件已分配其实体，但尚未添加到实体的活动组件列表时调用。有用的东西，如物理组件，需要访问转换来修改碰撞体的属性。
         */
        Component.prototype.initialize = function () {
        };
        /**
         * 在提交所有挂起的组件更改后，将该组件添加到场景时调用。此时，设置了实体字段和实体。场景也设定好了。
         */
        Component.prototype.onAddedToEntity = function () {
        };
        /**
         * 当此组件从其实体中移除时调用。在这里做所有的清理工作。
         */
        Component.prototype.onRemovedFromEntity = function () {
        };
        /**
         * 当实体的位置改变时调用。这允许组件知道它们由于父实体的移动而移动了。
         * @param comp
         */
        Component.prototype.onEntityTransformChanged = function (comp) {
        };
        /**
         *当父实体或此组件启用时调用
         */
        Component.prototype.onEnabled = function () {
        };
        /**
         * 禁用父实体或此组件时调用
         */
        Component.prototype.onDisabled = function () {
        };
        Component.prototype.setEnabled = function (isEnabled) {
            if (this._enabled != isEnabled) {
                this._enabled = isEnabled;
                if (this._enabled) {
                    this.onEnabled();
                }
                else {
                    this.onDisabled();
                }
            }
            return this;
        };
        Component.prototype.setUpdateOrder = function (updateOrder) {
            if (this._updateOrder != updateOrder) {
                this._updateOrder = updateOrder;
            }
            return this;
        };
        return Component;
    }());
    es.Component = Component;
})(es || (es = {}));
var es;
(function (es) {
    /**
     *  全局核心类
     */
    var Core = /** @class */ (function () {
        function Core(width, height, enableEntitySystems) {
            if (enableEntitySystems === void 0) { enableEntitySystems = true; }
            /**
             * 全局访问系统
             */
            this._globalManagers = new es.FastList();
            this._timerManager = new es.TimerManager();
            this._frameCounterElapsedTime = 0;
            this._frameCounter = 0;
            this._totalMemory = 0;
            this.width = width;
            this.height = height;
            Core._instance = this;
            Core.emitter = new es.Emitter();
            Core.emitter.addObserver(es.CoreEvents.FrameUpdated, this.update, this);
            Core.registerGlobalManager(this._timerManager);
            Core.entitySystemsEnabled = enableEntitySystems;
            this.initialize();
        }
        Object.defineProperty(Core, "Instance", {
            /**
             * 提供对单例/游戏实例的访问
             * @constructor
             */
            get: function () {
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Core, "scene", {
            /**
             * 当前活动的场景。注意，如果设置了该设置，在更新结束之前场景实际上不会改变
             */
            get: function () {
                if (!this._instance)
                    return null;
                return this._instance._scene;
            },
            /**
             * 当前活动的场景。注意，如果设置了该设置，在更新结束之前场景实际上不会改变
             * @param value
             */
            set: function (value) {
                if (!value) {
                    console.error("场景不能为空");
                    return;
                }
                if (this._instance._scene == null) {
                    this._instance._scene = value;
                    this._instance._scene.begin();
                    Core.Instance.onSceneChanged();
                }
                else {
                    this._instance._nextScene = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加一个全局管理器对象，它的更新方法将调用场景前的每一帧。
         * @param manager
         */
        Core.registerGlobalManager = function (manager) {
            this._instance._globalManagers.add(manager);
            manager.enabled = true;
        };
        /**
         * 删除全局管理器对象
         * @param manager
         */
        Core.unregisterGlobalManager = function (manager) {
            this._instance._globalManagers.remove(manager);
            manager.enabled = false;
        };
        /**
         * 获取类型为T的全局管理器
         * @param type
         */
        Core.getGlobalManager = function (type) {
            for (var i = 0; i < this._instance._globalManagers.length; i++) {
                if (this._instance._globalManagers.buffer[i] instanceof type)
                    return this._instance._globalManagers.buffer[i];
            }
            return null;
        };
        /**
         * 调度一个一次性或重复的计时器，该计时器将调用已传递的动作
         * @param timeInSeconds
         * @param repeats
         * @param context
         * @param onTime
         */
        Core.schedule = function (timeInSeconds, repeats, context, onTime) {
            if (repeats === void 0) { repeats = false; }
            if (context === void 0) { context = null; }
            return this._instance._timerManager.schedule(timeInSeconds, repeats, context, onTime);
        };
        Core.prototype.onOrientationChanged = function () {
            Core.emitter.emit(es.CoreEvents.OrientationChanged);
        };
        Core.prototype.startDebugDraw = function () {
            this._frameCounter++;
            this._frameCounterElapsedTime += es.Time.deltaTime;
            if (this._frameCounterElapsedTime >= 1) {
                var memoryInfo = window.performance["memory"];
                if (memoryInfo != null) {
                    this._totalMemory = Number((memoryInfo.totalJSHeapSize / 1048576).toFixed(2));
                }
                if (this._titleMemory)
                    this._titleMemory(this._totalMemory, this._frameCounter);
                this._frameCounter = 0;
                this._frameCounterElapsedTime -= 1;
            }
        };
        /**
         * 在一个场景结束后，下一个场景开始之前调用
         */
        Core.prototype.onSceneChanged = function () {
            Core.emitter.emit(es.CoreEvents.SceneChanged);
            es.Time.sceneChanged();
        };
        /**
         * 当屏幕大小发生改变时调用
         */
        Core.prototype.onGraphicsDeviceReset = function () {
            // 我们用这些来避免垃圾事件的发生
            if (this._graphicsDeviceChangeTimer != null) {
                this._graphicsDeviceChangeTimer.reset();
            }
            else {
                this._graphicsDeviceChangeTimer = Core.schedule(0.05, false, this, function (t) {
                    t.context._graphicsDeviceChangeTimer = null;
                    Core.emitter.emit(es.CoreEvents.GraphicsDeviceReset);
                });
            }
        };
        Core.prototype.initialize = function () {
        };
        Core.prototype.update = function (currentTime) {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    if (currentTime != null)
                        es.Time.update(currentTime);
                    if (this._scene != null) {
                        for (i = this._globalManagers.length - 1; i >= 0; i--) {
                            if (this._globalManagers.buffer[i].enabled)
                                this._globalManagers.buffer[i].update();
                        }
                        this._scene.update();
                        if (this._nextScene != null) {
                            this._scene.end();
                            this._scene = this._nextScene;
                            this._nextScene = null;
                            this.onSceneChanged();
                            this._scene.begin();
                        }
                    }
                    this.startDebugDraw();
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 启用/禁用焦点丢失时的暂停。如果为真，则不调用更新或渲染方法
         */
        Core.pauseOnFocusLost = true;
        /**
         * 是否启用调试渲染
         */
        Core.debugRenderEndabled = false;
        return Core;
    }());
    es.Core = Core;
})(es || (es = {}));
var es;
(function (es) {
    var CoreEvents;
    (function (CoreEvents) {
        /**
         * 在图形设备重置时触发。当这种情况发生时，任何渲染目标或其他内容的VRAM将被擦除，需要重新生成
         */
        CoreEvents[CoreEvents["GraphicsDeviceReset"] = 0] = "GraphicsDeviceReset";
        /**
         * 当场景发生变化时触发
         */
        CoreEvents[CoreEvents["SceneChanged"] = 1] = "SceneChanged";
        /**
         * 当设备方向改变时触发
         */
        CoreEvents[CoreEvents["OrientationChanged"] = 2] = "OrientationChanged";
        /**
         * 当每帧事件触发时
         */
        CoreEvents[CoreEvents["FrameUpdated"] = 3] = "FrameUpdated";
    })(CoreEvents = es.CoreEvents || (es.CoreEvents = {}));
})(es || (es = {}));
var es;
(function (es) {
    var EntityComparer = /** @class */ (function () {
        function EntityComparer() {
        }
        EntityComparer.prototype.compare = function (self, other) {
            var compare = self.updateOrder - other.updateOrder;
            if (compare == 0)
                compare = self.id - other.id;
            return compare;
        };
        return EntityComparer;
    }());
    es.EntityComparer = EntityComparer;
    var Entity = /** @class */ (function () {
        function Entity(name) {
            /**
             * 指定应该调用这个entity update方法的频率。1表示每一帧，2表示每一帧，以此类推
             */
            this.updateInterval = 1;
            this._tag = 0;
            this._enabled = true;
            this._updateOrder = 0;
            this.components = new es.ComponentList(this);
            this.transform = new es.Transform(this);
            this.name = name;
            this.id = Entity._idGenerator++;
            if (es.Core.entitySystemsEnabled)
                this.componentBits = new es.BitSet();
        }
        Object.defineProperty(Entity.prototype, "isDestroyed", {
            /**
             * 如果调用了destroy，那么在下一次处理实体之前这将一直为true
             */
            get: function () {
                return this._isDestroyed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "tag", {
            /**
             * 你可以随意使用。稍后可以使用它来查询场景中具有特定标记的所有实体
             */
            get: function () {
                return this._tag;
            },
            /**
             * 你可以随意使用。稍后可以使用它来查询场景中具有特定标记的所有实体
             * @param value
             */
            set: function (value) {
                this.setTag(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "enabled", {
            /**
             * 启用/禁用实体。当禁用碰撞器从物理系统和组件中移除时，方法将不会被调用
             */
            get: function () {
                return this._enabled;
            },
            /**
             * 启用/禁用实体。当禁用碰撞器从物理系统和组件中移除时，方法将不会被调用
             * @param value
             */
            set: function (value) {
                this.setEnabled(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "updateOrder", {
            /**
             * 更新此实体的顺序。updateOrder还用于对scene.entities上的标签列表进行排序
             */
            get: function () {
                return this._updateOrder;
            },
            /**
             * 更新此实体的顺序。updateOrder还用于对scene.entities上的标签列表进行排序
             * @param value
             */
            set: function (value) {
                this.setUpdateOrder(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "parent", {
            get: function () {
                return this.transform.parent;
            },
            set: function (value) {
                this.transform.setParent(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "childCount", {
            get: function () {
                return this.transform.childCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "position", {
            get: function () {
                return this.transform.position;
            },
            set: function (value) {
                this.transform.setPosition(value.x, value.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "localPosition", {
            get: function () {
                return this.transform.localPosition;
            },
            set: function (value) {
                this.transform.setLocalPosition(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "rotation", {
            get: function () {
                return this.transform.rotation;
            },
            set: function (value) {
                this.transform.setRotation(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "rotationDegrees", {
            get: function () {
                return this.transform.rotationDegrees;
            },
            set: function (value) {
                this.transform.setRotationDegrees(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "localRotation", {
            get: function () {
                return this.transform.localRotation;
            },
            set: function (value) {
                this.transform.setLocalRotation(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "localRotationDegrees", {
            get: function () {
                return this.transform.localRotationDegrees;
            },
            set: function (value) {
                this.transform.setLocalRotationDegrees(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "scale", {
            get: function () {
                return this.transform.scale;
            },
            set: function (value) {
                this.transform.setScale(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "localScale", {
            get: function () {
                return this.transform.localScale;
            },
            set: function (value) {
                this.transform.setLocalScale(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "worldInverseTransform", {
            get: function () {
                return this.transform.worldInverseTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "localToWorldTransform", {
            get: function () {
                return this.transform.localToWorldTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "worldToLocalTransform", {
            get: function () {
                return this.transform.worldToLocalTransform;
            },
            enumerable: true,
            configurable: true
        });
        Entity.prototype.onTransformChanged = function (comp) {
            // 通知我们的子项改变了位置
            this.components.onEntityTransformChanged(comp);
        };
        /**
         * 设置实体的标记
         * @param tag
         */
        Entity.prototype.setTag = function (tag) {
            if (this._tag != tag) {
                // 我们只有在已经有场景的情况下才会调用entityTagList。如果我们还没有场景，我们会被添加到entityTagList
                if (this.scene)
                    this.scene.entities.removeFromTagList(this);
                this._tag = tag;
                if (this.scene)
                    this.scene.entities.addToTagList(this);
            }
            return this;
        };
        /**
         * 设置实体的启用状态。当禁用碰撞器从物理系统和组件中移除时，方法将不会被调用
         * @param isEnabled
         */
        Entity.prototype.setEnabled = function (isEnabled) {
            if (this._enabled != isEnabled) {
                this._enabled = isEnabled;
                if (this._enabled)
                    this.components.onEntityEnabled();
                else
                    this.components.onEntityDisabled();
            }
            return this;
        };
        /**
         * 设置此实体的更新顺序。updateOrder还用于对scene.entities上的标签列表进行排序
         * @param updateOrder
         */
        Entity.prototype.setUpdateOrder = function (updateOrder) {
            if (this._updateOrder != updateOrder) {
                this._updateOrder = updateOrder;
                if (this.scene) {
                    this.scene.entities.markEntityListUnsorted();
                    this.scene.entities.markTagUnsorted(this.tag);
                }
                return this;
            }
        };
        /**
         * 从场景中删除实体并销毁所有子元素
         */
        Entity.prototype.destroy = function () {
            this._isDestroyed = true;
            this.scene.entities.remove(this);
            this.transform.parent = null;
            // 销毁所有子项
            for (var i = this.transform.childCount - 1; i >= 0; i--) {
                var child = this.transform.getChild(i);
                child.entity.destroy();
            }
        };
        /**
         * 将实体从场景中分离。下面的生命周期方法将被调用在组件上:OnRemovedFromEntity
         */
        Entity.prototype.detachFromScene = function () {
            this.scene.entities.remove(this);
            this.components.deregisterAllComponents();
            for (var i = 0; i < this.transform.childCount; i++)
                this.transform.getChild(i).entity.detachFromScene();
        };
        /**
         * 将一个先前分离的实体附加到一个新的场景
         * @param newScene
         */
        Entity.prototype.attachToScene = function (newScene) {
            this.scene = newScene;
            newScene.entities.add(this);
            this.components.registerAllComponents();
            for (var i = 0; i < this.transform.childCount; i++) {
                this.transform.getChild(i).entity.attachToScene(newScene);
            }
        };
        /**
         * 在提交了所有挂起的实体更改后，将此实体添加到场景时调用
         */
        Entity.prototype.onAddedToScene = function () {
        };
        /**
         * 当此实体从场景中删除时调用
         */
        Entity.prototype.onRemovedFromScene = function () {
            // 如果已经被销毁了，移走我们的组件。如果我们只是分离，我们需要保持我们的组件在实体上。
            if (this._isDestroyed)
                this.components.removeAllComponents();
        };
        /**
         * 每帧进行调用进行更新组件
         */
        Entity.prototype.update = function () {
            this.components.update();
        };
        /**
         * 将组件添加到组件列表中。返回组件。
         * @param component
         */
        Entity.prototype.addComponent = function (component) {
            component.entity = this;
            this.components.add(component);
            component.initialize();
            return component;
        };
        /**
         * 获取类型T的第一个组件并返回它。如果没有找到组件，则返回null。
         * @param type
         */
        Entity.prototype.getComponent = function (type) {
            return this.components.getComponent(type, false);
        };
        /**
         * 检查实体是否具有该组件
         * @param type
         */
        Entity.prototype.hasComponent = function (type) {
            return this.components.getComponent(type, false) != null;
        };
        /**
         * 获取类型T的第一个组件并返回它。如果没有找到组件，将创建组件。
         * @param type
         */
        Entity.prototype.getOrCreateComponent = function (type) {
            var comp = this.components.getComponent(type, true);
            if (!comp) {
                comp = this.addComponent(new type());
            }
            return comp;
        };
        /**
         * 获取typeName类型的所有组件，但不使用列表分配
         * @param typeName
         * @param componentList
         */
        Entity.prototype.getComponents = function (typeName, componentList) {
            return this.components.getComponents(typeName, componentList);
        };
        /**
         * 从组件列表中删除组件
         * @param component
         */
        Entity.prototype.removeComponent = function (component) {
            this.components.remove(component);
        };
        /**
         * 从组件列表中删除类型为T的第一个组件
         * @param type
         */
        Entity.prototype.removeComponentForType = function (type) {
            var comp = this.getComponent(type);
            if (comp) {
                this.removeComponent(comp);
                return true;
            }
            return false;
        };
        /**
         * 从实体中删除所有组件
         */
        Entity.prototype.removeAllComponents = function () {
            for (var i = 0; i < this.components.count; i++) {
                this.removeComponent(this.components.buffer[i]);
            }
        };
        Entity.prototype.compareTo = function (other) {
            var compare = this._updateOrder - other._updateOrder;
            if (compare == 0)
                compare = this.id - other.id;
            return compare;
        };
        Entity.prototype.equals = function (other) {
            return this.compareTo(other) == 0;
        };
        Entity.prototype.getHashCode = function () {
            return this.id;
        };
        Entity.prototype.toString = function () {
            return "[Entity: name: " + this.name + ", tag: " + this.tag + ", enabled: " + this.enabled + ", depth: " + this.updateOrder + "]";
        };
        Entity._idGenerator = 0;
        Entity.entityComparer = new EntityComparer();
        return Entity;
    }());
    es.Entity = Entity;
})(es || (es = {}));
var es;
(function (es) {
    /** 场景 */
    var Scene = /** @class */ (function () {
        function Scene() {
            this._sceneComponents = new es.FastList();
            this.entities = new es.EntityList(this);
            if (es.Core.entitySystemsEnabled)
                this.entityProcessors = new es.EntityProcessorList();
            this.initialize();
        }
        /**
         * 在场景子类中重写这个，然后在这里进行加载。
         * 在场景设置好之后，但在调用begin之前，从contructor中调用这个函数
         */
        Scene.prototype.initialize = function () {
        };
        /**
         * 当Core将这个场景设置为活动场景时，这个将被调用
         */
        Scene.prototype.onStart = function () {
        };
        /**
         * 在场景子类中重写这个，并在这里做任何必要的卸载。
         * 当Core把这个场景从活动槽中移除时，这个被调用。
         */
        Scene.prototype.unload = function () {
        };
        Scene.prototype.begin = function () {
            es.Physics.reset();
            this.updateResolutionScaler();
            if (this.entityProcessors != null)
                this.entityProcessors.begin();
            es.Core.emitter.addObserver(es.CoreEvents.GraphicsDeviceReset, this.updateResolutionScaler, this);
            es.Core.emitter.addObserver(es.CoreEvents.OrientationChanged, this.updateResolutionScaler, this);
            this._didSceneBegin = true;
            this.onStart();
        };
        Scene.prototype.end = function () {
            this._didSceneBegin = false;
            es.Core.emitter.removeObserver(es.CoreEvents.GraphicsDeviceReset, this.updateResolutionScaler);
            es.Core.emitter.removeObserver(es.CoreEvents.OrientationChanged, this.updateResolutionScaler);
            this.entities.removeAllEntities();
            for (var i = 0; i < this._sceneComponents.length; i++) {
                this._sceneComponents.buffer[i].onRemovedFromScene();
            }
            this._sceneComponents.clear();
            es.Physics.clear();
            if (this.entityProcessors)
                this.entityProcessors.end();
            this.unload();
        };
        Scene.prototype.updateResolutionScaler = function () {
        };
        Scene.prototype.update = function () {
            // 更新我们的列表，以防它们有任何变化
            this.entities.updateLists();
            for (var i = this._sceneComponents.length - 1; i >= 0; i--) {
                if (this._sceneComponents.buffer[i].enabled)
                    this._sceneComponents.buffer[i].update();
            }
            // 更新我们的实体解析器
            if (this.entityProcessors != null)
                this.entityProcessors.update();
            // 更新我们的实体组
            this.entities.update();
            if (this.entityProcessors != null)
                this.entityProcessors.lateUpdate();
        };
        /**
         * 向组件列表添加并返回SceneComponent
         * @param component
         */
        Scene.prototype.addSceneComponent = function (component) {
            component.scene = this;
            component.onEnabled();
            this._sceneComponents.add(component);
            this._sceneComponents.sort(component);
            return component;
        };
        /**
         * 获取类型为T的第一个SceneComponent并返回它。如果没有找到组件，则返回null。
         * @param type
         */
        Scene.prototype.getSceneComponent = function (type) {
            for (var i = 0; i < this._sceneComponents.length; i++) {
                var component = this._sceneComponents.buffer[i];
                if (component instanceof type)
                    return component;
            }
            return null;
        };
        /**
         * 获取类型为T的第一个SceneComponent并返回它。如果没有找到SceneComponent，则将创建SceneComponent。
         * @param type
         */
        Scene.prototype.getOrCreateSceneComponent = function (type) {
            var comp = this.getSceneComponent(type);
            if (comp == null)
                comp = this.addSceneComponent(new type());
            return comp;
        };
        /**
         * 从SceneComponents列表中删除一个SceneComponent
         * @param component
         */
        Scene.prototype.removeSceneComponent = function (component) {
            if (!this._sceneComponents.contains(component)) {
                console.warn("SceneComponent" + component + "\u4E0D\u5728SceneComponents\u5217\u8868\u4E2D!");
                return;
            }
            this._sceneComponents.remove(component);
            component.onRemovedFromScene();
        };
        /**
         * 将实体添加到此场景，并返回它
         * @param name
         */
        Scene.prototype.createEntity = function (name) {
            var entity = new es.Entity(name);
            return this.addEntity(entity);
        };
        /**
         * 在场景的实体列表中添加一个实体
         * @param entity
         */
        Scene.prototype.addEntity = function (entity) {
            if (this.entities.buffer.contains(entity))
                console.warn("\u60A8\u8BD5\u56FE\u5C06\u540C\u4E00\u5B9E\u4F53\u6DFB\u52A0\u5230\u573A\u666F\u4E24\u6B21: " + entity);
            this.entities.add(entity);
            entity.scene = this;
            for (var i = 0; i < entity.transform.childCount; i++)
                this.addEntity(entity.transform.getChild(i).entity);
            return entity;
        };
        /**
         * 从场景中删除所有实体
         */
        Scene.prototype.destroyAllEntities = function () {
            for (var i = 0; i < this.entities.count; i++) {
                this.entities.buffer[i].destroy();
            }
        };
        /**
         * 搜索并返回第一个具有名称的实体
         * @param name
         */
        Scene.prototype.findEntity = function (name) {
            return this.entities.findEntity(name);
        };
        /**
         * 返回具有给定标记的所有实体
         * @param tag
         */
        Scene.prototype.findEntitiesWithTag = function (tag) {
            return this.entities.entitiesWithTag(tag);
        };
        /**
         * 返回类型为T的所有实体
         * @param type
         */
        Scene.prototype.entitiesOfType = function (type) {
            return this.entities.entitiesOfType(type);
        };
        /**
         * 返回第一个启用加载的类型为T的组件
         * @param type
         */
        Scene.prototype.findComponentOfType = function (type) {
            return this.entities.findComponentOfType(type);
        };
        /**
         * 返回类型为T的所有已启用已加载组件的列表
         * @param type
         */
        Scene.prototype.findComponentsOfType = function (type) {
            return this.entities.findComponentsOfType(type);
        };
        /**
         * 在场景中添加一个EntitySystem处理器
         * @param processor 处理器
         */
        Scene.prototype.addEntityProcessor = function (processor) {
            processor.scene = this;
            this.entityProcessors.add(processor);
            return processor;
        };
        /**
         * 从场景中删除EntitySystem处理器
         * @param processor
         */
        Scene.prototype.removeEntityProcessor = function (processor) {
            this.entityProcessors.remove(processor);
        };
        /**
         * 获取EntitySystem处理器
         */
        Scene.prototype.getEntityProcessor = function () {
            return this.entityProcessors.getProcessor();
        };
        return Scene;
    }());
    es.Scene = Scene;
})(es || (es = {}));
var transform;
(function (transform) {
    var Component;
    (function (Component) {
        Component[Component["position"] = 0] = "position";
        Component[Component["scale"] = 1] = "scale";
        Component[Component["rotation"] = 2] = "rotation";
    })(Component = transform.Component || (transform.Component = {}));
})(transform || (transform = {}));
var es;
(function (es) {
    var DirtyType;
    (function (DirtyType) {
        DirtyType[DirtyType["clean"] = 0] = "clean";
        DirtyType[DirtyType["positionDirty"] = 1] = "positionDirty";
        DirtyType[DirtyType["scaleDirty"] = 2] = "scaleDirty";
        DirtyType[DirtyType["rotationDirty"] = 3] = "rotationDirty";
    })(DirtyType = es.DirtyType || (es.DirtyType = {}));
    var Transform = /** @class */ (function () {
        function Transform(entity) {
            /**
             * 值将自动从本地和父矩阵重新计算。
             */
            this._worldTransform = es.Matrix2D.identity;
            this._rotationMatrix = es.Matrix2D.identity;
            this._translationMatrix = es.Matrix2D.identity;
            this._children = [];
            this._worldToLocalTransform = es.Matrix2D.identity;
            this._worldInverseTransform = es.Matrix2D.identity;
            this._position = es.Vector2.zero;
            this._scale = es.Vector2.one;
            this._rotation = 0;
            this._localPosition = es.Vector2.zero;
            this._localScale = es.Vector2.one;
            this._localRotation = 0;
            this.entity = entity;
            this.scale = this._localScale = es.Vector2.one;
        }
        Object.defineProperty(Transform.prototype, "childCount", {
            /**
             * 这个转换的所有子元素
             */
            get: function () {
                return this._children.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "rotationDegrees", {
            /**
             * 变换在世界空间的旋转度
             */
            get: function () {
                return es.MathHelper.toDegrees(this._rotation);
            },
            /**
             * 变换在世界空间的旋转度
             * @param value
             */
            set: function (value) {
                this.setRotation(es.MathHelper.toRadians(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localRotationDegrees", {
            /**
             * 旋转相对于父变换旋转的角度
             */
            get: function () {
                return es.MathHelper.toDegrees(this._localRotation);
            },
            /**
             * 旋转相对于父变换旋转的角度
             * @param value
             */
            set: function (value) {
                this.localRotation = es.MathHelper.toRadians(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localToWorldTransform", {
            get: function () {
                this.updateTransform();
                return this._worldTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "parent", {
            /**
             * 获取此转换的父转换
             */
            get: function () {
                return this._parent;
            },
            /**
             * 设置此转换的父转换
             * @param value
             */
            set: function (value) {
                this.setParent(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "worldToLocalTransform", {
            get: function () {
                if (this._worldToLocalDirty) {
                    if (!this.parent) {
                        this._worldToLocalTransform = es.Matrix2D.identity;
                    }
                    else {
                        this.parent.updateTransform();
                        this._worldToLocalTransform = es.Matrix2D.invert(this.parent._worldTransform);
                    }
                    this._worldToLocalDirty = false;
                }
                return this._worldToLocalTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "worldInverseTransform", {
            get: function () {
                this.updateTransform();
                if (this._worldInverseDirty) {
                    this._worldInverseTransform = es.Matrix2D.invert(this._worldTransform);
                    this._worldInverseDirty = false;
                }
                return this._worldInverseTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "position", {
            /**
             * 变换在世界空间中的位置
             */
            get: function () {
                this.updateTransform();
                if (this._positionDirty) {
                    if (this.parent == null) {
                        this._position = this._localPosition;
                    }
                    else {
                        this.parent.updateTransform();
                        es.Vector2Ext.transformR(this._localPosition, this.parent._worldTransform, this._position);
                    }
                    this._positionDirty = false;
                }
                return this._position;
            },
            /**
             * 变换在世界空间中的位置
             * @param value
             */
            set: function (value) {
                this.setPosition(value.x, value.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "scale", {
            /**
             * 变换在世界空间的缩放
             */
            get: function () {
                this.updateTransform();
                return this._scale;
            },
            /**
             * 变换在世界空间的缩放
             * @param value
             */
            set: function (value) {
                this.setScale(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "rotation", {
            /**
             * 在世界空间中以弧度旋转的变换
             */
            get: function () {
                this.updateTransform();
                return this._rotation;
            },
            /**
             * 变换在世界空间的旋转度
             * @param value
             */
            set: function (value) {
                this.setRotation(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localPosition", {
            /**
             * 转换相对于父转换的位置。如果转换没有父元素，则与transform.position相同
             */
            get: function () {
                this.updateTransform();
                return this._localPosition;
            },
            /**
             * 转换相对于父转换的位置。如果转换没有父元素，则与transform.position相同
             * @param value
             */
            set: function (value) {
                this.setLocalPosition(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localScale", {
            /**
             * 转换相对于父元素的比例。如果转换没有父元素，则与transform.scale相同
             */
            get: function () {
                this.updateTransform();
                return this._localScale;
            },
            /**
             * 转换相对于父元素的比例。如果转换没有父元素，则与transform.scale相同
             * @param value
             */
            set: function (value) {
                this.setLocalScale(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localRotation", {
            /**
             * 相对于父变换的旋转，变换的旋转。如果转换没有父元素，则与transform.rotation相同
             */
            get: function () {
                this.updateTransform();
                return this._localRotation;
            },
            /**
             * 相对于父变换的旋转，变换的旋转。如果转换没有父元素，则与transform.rotation相同
             * @param value
             */
            set: function (value) {
                this.setLocalRotation(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 返回在索引处的转换子元素
         * @param index
         */
        Transform.prototype.getChild = function (index) {
            return this._children[index];
        };
        /**
         * 设置此转换的父转换
         * @param parent
         */
        Transform.prototype.setParent = function (parent) {
            if (this._parent == parent)
                return this;
            if (!this._parent) {
                var children = new linq.List(this._parent._children);
                children.remove(this);
                children.add(this);
            }
            this._parent = parent;
            this.setDirty(DirtyType.positionDirty);
            return this;
        };
        /**
         * 设置转换在世界空间中的位置
         * @param x
         * @param y
         */
        Transform.prototype.setPosition = function (x, y) {
            var position = new es.Vector2(x, y);
            if (position.equals(this._position))
                return this;
            this._position = position;
            if (this.parent != null) {
                this.localPosition = es.Vector2.transform(this._position, this._worldToLocalTransform);
            }
            else {
                this.localPosition = position;
            }
            this._positionDirty = false;
            return this;
        };
        /**
         * 设置转换相对于父转换的位置。如果转换没有父元素，则与transform.position相同
         * @param localPosition
         */
        Transform.prototype.setLocalPosition = function (localPosition) {
            if (localPosition.equals(this._localPosition))
                return this;
            this._localPosition = localPosition;
            this._localDirty = this._positionDirty = this._localPositionDirty = this._localRotationDirty = this._localScaleDirty = true;
            this.setDirty(DirtyType.positionDirty);
            return this;
        };
        /**
         * 设置变换在世界空间的旋转度
         * @param radians
         */
        Transform.prototype.setRotation = function (radians) {
            this._rotation = radians;
            if (this.parent) {
                this.localRotation = this.parent.rotation + radians;
            }
            else {
                this.localRotation = radians;
            }
            return this;
        };
        /**
         * 设置变换在世界空间的旋转度
         * @param degrees
         */
        Transform.prototype.setRotationDegrees = function (degrees) {
            return this.setRotation(es.MathHelper.toRadians(degrees));
        };
        /**
         * 旋转精灵的顶部，使其朝向位置
         * @param pos
         */
        Transform.prototype.lookAt = function (pos) {
            var sign = this.position.x > pos.x ? -1 : 1;
            var vectorToAlignTo = es.Vector2.normalize(es.Vector2.subtract(this.position, pos));
            this.rotation = sign * Math.acos(es.Vector2.dot(vectorToAlignTo, es.Vector2.unitY));
        };
        /**
         * 相对于父变换的旋转设置变换的旋转。如果转换没有父元素，则与transform.rotation相同
         * @param radians
         */
        Transform.prototype.setLocalRotation = function (radians) {
            this._localRotation = radians;
            this._localDirty = this._positionDirty = this._localPositionDirty = this._localRotationDirty = this._localScaleDirty = true;
            this.setDirty(DirtyType.rotationDirty);
            return this;
        };
        /**
         * 相对于父变换的旋转设置变换的旋转。如果转换没有父元素，则与transform.rotation相同
         * @param degrees
         */
        Transform.prototype.setLocalRotationDegrees = function (degrees) {
            return this.setLocalRotation(es.MathHelper.toRadians(degrees));
        };
        /**
         * 设置变换在世界空间中的缩放
         * @param scale
         */
        Transform.prototype.setScale = function (scale) {
            this._scale = scale;
            if (this.parent) {
                this.localScale = es.Vector2.divide(scale, this.parent._scale);
            }
            else {
                this.localScale = scale;
            }
            return this;
        };
        /**
         * 设置转换相对于父对象的比例。如果转换没有父元素，则与transform.scale相同
         * @param scale
         */
        Transform.prototype.setLocalScale = function (scale) {
            this._localScale = scale;
            this._localDirty = this._positionDirty = this._localScaleDirty = true;
            this.setDirty(DirtyType.scaleDirty);
            return this;
        };
        /**
         * 对精灵坐标进行四舍五入
         */
        Transform.prototype.roundPosition = function () {
            this.position = this._position.round();
        };
        Transform.prototype.updateTransform = function () {
            if (this.hierarchyDirty != DirtyType.clean) {
                if (this.parent != null)
                    this.parent.updateTransform();
                if (this._localDirty) {
                    if (this._localPositionDirty) {
                        this._translationMatrix = es.Matrix2D.createTranslation(this._localPosition.x, this._localPosition.y);
                        this._localPositionDirty = false;
                    }
                    if (this._localRotationDirty) {
                        this._rotationMatrix = es.Matrix2D.createRotation(this._localRotation);
                        this._localRotationDirty = false;
                    }
                    if (this._localScaleDirty) {
                        this._scaleMatrix = es.Matrix2D.createScale(this._localScale.x, this._localScale.y);
                        this._localScaleDirty = false;
                    }
                    this._localTransform = this._scaleMatrix.multiply(this._rotationMatrix);
                    this._localTransform = this._localTransform.multiply(this._translationMatrix);
                    if (this.parent == null) {
                        this._worldTransform = this._localTransform;
                        this._rotation = this._localRotation;
                        this._scale = this._localScale;
                        this._worldInverseDirty = true;
                    }
                    this._localDirty = false;
                }
                if (this.parent != null) {
                    this._worldTransform = this._localTransform.multiply(this.parent._worldTransform);
                    this._rotation = this._localRotation + this.parent._rotation;
                    this._scale = es.Vector2.multiply(this.parent._scale, this._localScale);
                    this._worldInverseDirty = true;
                }
                this._worldToLocalDirty = true;
                this._positionDirty = true;
                this.hierarchyDirty = DirtyType.clean;
            }
        };
        Transform.prototype.setDirty = function (dirtyFlagType) {
            if ((this.hierarchyDirty & dirtyFlagType) == 0) {
                this.hierarchyDirty |= dirtyFlagType;
                switch (dirtyFlagType) {
                    case es.DirtyType.positionDirty:
                        this.entity.onTransformChanged(transform.Component.position);
                        break;
                    case es.DirtyType.rotationDirty:
                        this.entity.onTransformChanged(transform.Component.rotation);
                        break;
                    case es.DirtyType.scaleDirty:
                        this.entity.onTransformChanged(transform.Component.scale);
                        break;
                }
                // 告诉子项发生了变换
                for (var i = 0; i < this._children.length; i++)
                    this._children[i].setDirty(dirtyFlagType);
            }
        };
        /**
         * 从另一个transform属性进行拷贝
         * @param transform
         */
        Transform.prototype.copyFrom = function (transform) {
            this._position = transform.position;
            this._localPosition = transform._localPosition;
            this._rotation = transform._rotation;
            this._localRotation = transform._localRotation;
            this._scale = transform._scale;
            this._localScale = transform._localScale;
            this.setDirty(DirtyType.positionDirty);
            this.setDirty(DirtyType.rotationDirty);
            this.setDirty(DirtyType.scaleDirty);
        };
        Transform.prototype.toString = function () {
            return "[Transform: parent: " + this.parent + ", position: " + this.position + ", rotation: " + this.rotation + ",\n                scale: " + this.scale + ", localPosition: " + this._localPosition + ", localRotation: " + this._localRotation + ",\n                localScale: " + this._localScale + "]";
        };
        return Transform;
    }());
    es.Transform = Transform;
})(es || (es = {}));
var es;
(function (es) {
    var ComponentPool = /** @class */ (function () {
        function ComponentPool(typeClass) {
            this._type = typeClass;
            this._cache = [];
        }
        ComponentPool.prototype.obtain = function () {
            try {
                return this._cache.length > 0 ? this._cache.shift() : new this._type();
            }
            catch (err) {
                throw new Error(this._type + err);
            }
        };
        ComponentPool.prototype.free = function (component) {
            component.reset();
            this._cache.push(component);
        };
        return ComponentPool;
    }());
    es.ComponentPool = ComponentPool;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 用于比较组件更新排序
     */
    var IUpdatableComparer = /** @class */ (function () {
        function IUpdatableComparer() {
        }
        IUpdatableComparer.prototype.compare = function (a, b) {
            return a.updateOrder - b.updateOrder;
        };
        return IUpdatableComparer;
    }());
    es.IUpdatableComparer = IUpdatableComparer;
    es.isIUpdatable = function (props) { return typeof props['update'] !== 'undefined'; };
})(es || (es = {}));
var es;
(function (es) {
    /** 回收实例的组件类型。 */
    var PooledComponent = /** @class */ (function (_super) {
        __extends(PooledComponent, _super);
        function PooledComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PooledComponent;
    }(es.Component));
    es.PooledComponent = PooledComponent;
})(es || (es = {}));
var es;
(function (es) {
    var SceneComponent = /** @class */ (function () {
        function SceneComponent() {
            /**
             * 更新此场景中SceneComponents的顺序
             */
            this.updateOrder = 0;
            this._enabled = true;
        }
        Object.defineProperty(SceneComponent.prototype, "enabled", {
            /**
             * 如果启用了SceneComponent，则为true。状态的改变会导致调用onEnabled/onDisable。
             */
            get: function () {
                return this._enabled;
            },
            /**
             * 如果启用了SceneComponent，则为true。状态的改变会导致调用onEnabled/onDisable。
             * @param value
             */
            set: function (value) {
                this.setEnabled(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 在启用此SceneComponent时调用
         */
        SceneComponent.prototype.onEnabled = function () {
        };
        /**
         * 当禁用此SceneComponent时调用
         */
        SceneComponent.prototype.onDisabled = function () {
        };
        /**
         * 当该SceneComponent从场景中移除时调用
         */
        SceneComponent.prototype.onRemovedFromScene = function () {
        };
        /**
         * 在实体更新之前每一帧调用
         */
        SceneComponent.prototype.update = function () {
        };
        /**
         * 启用/禁用这个SceneComponent
         * @param isEnabled
         */
        SceneComponent.prototype.setEnabled = function (isEnabled) {
            if (this._enabled != isEnabled) {
                this._enabled = isEnabled;
                if (this._enabled) {
                    this.onEnabled();
                }
                else {
                    this.onDisabled();
                }
            }
            return this;
        };
        /**
         * 设置SceneComponent的updateOrder并触发某种SceneComponent
         * @param updateOrder
         */
        SceneComponent.prototype.setUpdateOrder = function (updateOrder) {
            if (this.updateOrder != updateOrder) {
                this.updateOrder = updateOrder;
                es.Core.scene._sceneComponents.sort(this);
            }
            return this;
        };
        SceneComponent.prototype.compare = function (other) {
            return this.updateOrder - other.updateOrder;
        };
        return SceneComponent;
    }());
    es.SceneComponent = SceneComponent;
})(es || (es = {}));
var es;
(function (es) {
    var TriggerListenerHelper = /** @class */ (function () {
        function TriggerListenerHelper() {
        }
        TriggerListenerHelper.getITriggerListener = function (entity, components) {
            for (var i = 0; i < entity.components._components.length; i++) {
                var component = entity.components._components.buffer[i];
                if (es.isITriggerListener(component)) {
                    components.push(component);
                }
            }
            for (var i = 0; i < entity.components._componentsToAdd.length; i++) {
                var component = entity.components._componentsToAdd[i];
                if (es.isITriggerListener(component)) {
                    components.push(component);
                }
            }
            return components;
        };
        return TriggerListenerHelper;
    }());
    es.TriggerListenerHelper = TriggerListenerHelper;
    es.isITriggerListener = function (props) { return typeof props['onTriggerEnter'] !== 'undefined'; };
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 辅助类说明了一种处理移动的方法，它考虑了包括触发器在内的所有冲突。
     * ITriggerListener接口用于管理对移动过程中违反的任何触发器的回调。
     * 一个物体只能通过移动器移动。要正确报告触发器的move方法。
     *
     * 请注意，多个移动者相互交互将多次调用ITriggerListener。
     */
    var Mover = /** @class */ (function (_super) {
        __extends(Mover, _super);
        function Mover() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Mover.prototype.onAddedToEntity = function () {
            this._triggerHelper = new es.ColliderTriggerHelper(this.entity);
        };
        /**
         * 计算修改运动矢量的运动，以考虑移动时可能发生的碰撞
         * @param motion
         * @param collisionResult
         */
        Mover.prototype.calculateMovement = function (motion, collisionResult) {
            if (this.entity.getComponent(es.Collider) == null || this._triggerHelper == null) {
                return false;
            }
            // 移动所有的非触发碰撞器并获得最近的碰撞
            var colliders = this.entity.getComponents(es.Collider);
            var _loop_1 = function (i) {
                var collider = colliders[i];
                // 不检测触发器 在我们移动后会重新访问它
                if (collider.isTrigger)
                    return "continue";
                // 获取我们在新位置可能发生碰撞的任何东西
                var bounds = collider.bounds.clone();
                bounds.x += motion.x;
                bounds.y += motion.y;
                var neighbors = es.Physics.boxcastBroadphaseExcludingSelf(collider, bounds, collider.collidesWithLayers.value);
                neighbors.forEach(function (value) {
                    var neighbor = value;
                    // 不检测触发器
                    if (neighbor.isTrigger)
                        return;
                    var _internalcollisionResult = new es.CollisionResult();
                    if (collider.collidesWith(neighbor, motion, _internalcollisionResult)) {
                        // 如果碰撞 则退回之前的移动量
                        motion.subtract(_internalcollisionResult.minimumTranslationVector);
                        // 如果我们碰到多个对象，为了简单起见，只取第一个。
                        if (_internalcollisionResult.collider != null) {
                            collisionResult = _internalcollisionResult;
                        }
                    }
                });
            };
            for (var i = 0; i < colliders.length; i++) {
                _loop_1(i);
            }
            es.ListPool.free(colliders);
            return collisionResult.collider != null;
        };
        /**
         *  将calculatemomovement应用到实体并更新triggerHelper
         * @param motion
         */
        Mover.prototype.applyMovement = function (motion) {
            // 移动实体到它的新位置，如果我们有一个碰撞，否则移动全部数量。当碰撞发生时，运动被更新
            this.entity.position = es.Vector2.add(this.entity.position, motion);
            // 对所有是触发器的碰撞器与所有宽相位碰撞器进行重叠检查。任何重叠都会导致触发事件。
            if (this._triggerHelper)
                this._triggerHelper.update();
        };
        /**
         * 通过调用calculateMovement和applyMovement来移动考虑碰撞的实体;
         * @param motion
         * @param collisionResult
         */
        Mover.prototype.move = function (motion, collisionResult) {
            this.calculateMovement(motion, collisionResult);
            this.applyMovement(motion);
            return collisionResult.collider != null;
        };
        return Mover;
    }(es.Component));
    es.Mover = Mover;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 只向itriggerlistener报告冲突的移动器
     * 该对象将始终移动完整的距离
     */
    var ProjectileMover = /** @class */ (function (_super) {
        __extends(ProjectileMover, _super);
        function ProjectileMover() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._tempTriggerList = [];
            return _this;
        }
        ProjectileMover.prototype.onAddedToEntity = function () {
            this._collider = this.entity.getComponent(es.Collider);
            if (!this._collider)
                console.warn("ProjectileMover has no Collider. ProjectilMover requires a Collider!");
        };
        /**
         * 移动考虑碰撞的实体
         * @param motion
         */
        ProjectileMover.prototype.move = function (motion) {
            if (!this._collider)
                return false;
            var didCollide = false;
            // 获取我们在新位置可能发生碰撞的任何东西
            this.entity.position = es.Vector2.add(this.entity.position, motion);
            // 获取任何可能在新位置发生碰撞的东西
            var neighbors = es.Physics.boxcastBroadphase(this._collider.bounds, this._collider.collidesWithLayers.value);
            for (var i = 0; i < neighbors.size; i++) {
                var neighbor = neighbors[i];
                if (this._collider.overlaps(neighbor) && neighbor.enabled) {
                    didCollide = true;
                    this.notifyTriggerListeners(this._collider, neighbor);
                }
            }
            return didCollide;
        };
        ProjectileMover.prototype.notifyTriggerListeners = function (self, other) {
            // 通知我们重叠的碰撞器实体上的任何侦听器
            es.TriggerListenerHelper.getITriggerListener(other.entity, this._tempTriggerList);
            for (var i = 0; i < this._tempTriggerList.length; i++) {
                this._tempTriggerList[i].onTriggerEnter(self, other);
            }
            this._tempTriggerList.length = 0;
            // 通知此实体上的任何侦听器
            es.TriggerListenerHelper.getITriggerListener(this.entity, this._tempTriggerList);
            for (var i = 0; i < this._tempTriggerList.length; i++) {
                this._tempTriggerList[i].onTriggerEnter(other, self);
            }
            this._tempTriggerList.length = 0;
        };
        return ProjectileMover;
    }(es.Component));
    es.ProjectileMover = ProjectileMover;
})(es || (es = {}));
var es;
(function (es) {
    var Collider = /** @class */ (function (_super) {
        __extends(Collider, _super);
        function Collider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 如果这个碰撞器是一个触发器，它将不会引起碰撞，但它仍然会触发事件
             */
            _this.isTrigger = false;
            /**
             * 在处理冲突时，physicsLayer可以用作过滤器。Flags类有帮助位掩码的方法
             */
            _this.physicsLayer = new es.Ref(1 << 0);
            /**
             * 碰撞器在使用移动器移动时应该碰撞的层
             * 默认为所有层
             */
            _this.collidesWithLayers = new es.Ref(es.Physics.allLayers);
            /**
             * 如果为true，碰撞器将根据附加的变换缩放和旋转
             */
            _this.shouldColliderScaleAndRotateWithTransform = true;
            /**
             * 这个对撞机在物理系统注册时的边界。
             * 存储这个允许我们始终能够安全地从物理系统中移除对撞机，即使它在试图移除它之前已经被移动了。
             */
            _this.registeredPhysicsBounds = new es.Rectangle();
            _this._isPositionDirty = true;
            _this._isRotationDirty = true;
            _this._localOffset = es.Vector2.zero;
            return _this;
        }
        Object.defineProperty(Collider.prototype, "absolutePosition", {
            /**
             * 镖师碰撞器的绝对位置
             */
            get: function () {
                return es.Vector2.add(this.entity.transform.position, this._localOffset);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collider.prototype, "rotation", {
            /**
             * 封装变换。如果碰撞器没和实体一起旋转 则返回transform.rotation
             */
            get: function () {
                if (this.shouldColliderScaleAndRotateWithTransform && this.entity)
                    return this.entity.transform.rotation;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collider.prototype, "bounds", {
            get: function () {
                if (this._isPositionDirty || this._isRotationDirty) {
                    this.shape.recalculateBounds(this);
                    this._isPositionDirty = this._isRotationDirty = false;
                }
                return this.shape.bounds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collider.prototype, "localOffset", {
            /**
             * 将localOffset添加到实体。获取碰撞器几何图形的最终位置。
             * 允许向一个实体添加多个碰撞器并分别定位，还允许你设置缩放/旋转
             */
            get: function () {
                return this._localOffset;
            },
            /**
             * 将localOffset添加到实体。获取碰撞器几何图形的最终位置。
             * 允许向一个实体添加多个碰撞器并分别定位，还允许你设置缩放/旋转
             * @param value
             */
            set: function (value) {
                this.setLocalOffset(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 将localOffset添加到实体。获取碰撞器的最终位置。
         * 这允许您向一个实体添加多个碰撞器并分别定位它们。
         * @param offset
         */
        Collider.prototype.setLocalOffset = function (offset) {
            if (this._localOffset != offset) {
                this.unregisterColliderWithPhysicsSystem();
                this._localOffset = offset;
                this._localOffsetLength = this._localOffset.length();
                this._isPositionDirty = true;
                this.registerColliderWithPhysicsSystem();
            }
            return this;
        };
        /**
         * 如果为true，碰撞器将根据附加的变换缩放和旋转
         * @param shouldColliderScaleAndRotationWithTransform
         */
        Collider.prototype.setShouldColliderScaleAndRotateWithTransform = function (shouldColliderScaleAndRotationWithTransform) {
            this.shouldColliderScaleAndRotateWithTransform = shouldColliderScaleAndRotationWithTransform;
            this._isPositionDirty = this._isRotationDirty = true;
            return this;
        };
        Collider.prototype.onAddedToEntity = function () {
            this._isParentEntityAddedToScene = true;
            this.registerColliderWithPhysicsSystem();
        };
        Collider.prototype.onRemovedFromEntity = function () {
            this.unregisterColliderWithPhysicsSystem();
            this._isParentEntityAddedToScene = false;
        };
        Collider.prototype.onEntityTransformChanged = function (comp) {
            switch (comp) {
                case transform.Component.position:
                    this._isPositionDirty = true;
                    break;
                case transform.Component.scale:
                    this._isPositionDirty = true;
                    break;
                case transform.Component.rotation:
                    this._isRotationDirty = true;
                    break;
            }
            if (this._isColliderRegistered)
                es.Physics.updateCollider(this);
        };
        Collider.prototype.onEnabled = function () {
            this.registerColliderWithPhysicsSystem();
            this._isPositionDirty = this._isRotationDirty = true;
        };
        Collider.prototype.onDisabled = function () {
            this.unregisterColliderWithPhysicsSystem();
        };
        /**
         * 父实体会在不同的时间调用它(当添加到场景，启用，等等)
         */
        Collider.prototype.registerColliderWithPhysicsSystem = function () {
            // 如果在将我们添加到实体之前更改了origin等属性，则实体可以为null
            if (this._isParentEntityAddedToScene && !this._isColliderRegistered) {
                es.Physics.addCollider(this);
                this._isColliderRegistered = true;
            }
        };
        /**
         * 父实体会在不同的时候调用它(从场景中移除，禁用，等等)
         */
        Collider.prototype.unregisterColliderWithPhysicsSystem = function () {
            if (this._isParentEntityAddedToScene && this._isColliderRegistered) {
                es.Physics.removeCollider(this);
            }
            this._isColliderRegistered = false;
        };
        /**
         * 检查这个形状是否与物理系统中的其他对撞机重叠
         * @param other
         */
        Collider.prototype.overlaps = function (other) {
            return this.shape.overlaps(other.shape);
        };
        /**
         * 检查这个与运动应用的碰撞器(移动向量)是否与碰撞器碰撞。如果是这样，将返回true，并且结果将填充碰撞数据。
         * @param collider
         * @param motion
         * @param result
         */
        Collider.prototype.collidesWith = function (collider, motion, result) {
            // 改变形状的位置，使它在移动后的位置，这样我们可以检查重叠
            var oldPosition = this.entity.position.clone();
            this.entity.position = es.Vector2.add(this.entity.position, motion);
            var didCollide = this.shape.collidesWithShape(collider.shape, result);
            if (didCollide)
                result.collider = collider;
            // 将图形位置返回到检查前的位置
            this.entity.position = oldPosition;
            return didCollide;
        };
        return Collider;
    }(es.Component));
    es.Collider = Collider;
})(es || (es = {}));
///<reference path="./Collider.ts" />
var es;
///<reference path="./Collider.ts" />
(function (es) {
    var BoxCollider = /** @class */ (function (_super) {
        __extends(BoxCollider, _super);
        function BoxCollider(x, y, width, height) {
            var _this = _super.call(this) || this;
            _this._localOffset = new es.Vector2(x + width / 2, y + height / 2);
            _this.shape = new es.Box(width, height);
            return _this;
        }
        Object.defineProperty(BoxCollider.prototype, "width", {
            get: function () {
                return this.shape.width;
            },
            set: function (value) {
                this.setWidth(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxCollider.prototype, "height", {
            get: function () {
                return this.shape.height;
            },
            set: function (value) {
                this.setHeight(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置BoxCollider的大小
         * @param width
         * @param height
         */
        BoxCollider.prototype.setSize = function (width, height) {
            var box = this.shape;
            if (width != box.width || height != box.height) {
                // 更新框，改变边界，如果我们需要更新物理系统中的边界
                box.updateBox(width, height);
                if (this.entity && this._isParentEntityAddedToScene)
                    es.Physics.updateCollider(this);
            }
            return this;
        };
        /**
         * 设置BoxCollider的宽度
         * @param width
         */
        BoxCollider.prototype.setWidth = function (width) {
            var box = this.shape;
            if (width != box.width) {
                // 更新框，改变边界，如果我们需要更新物理系统中的边界
                box.updateBox(width, box.height);
                if (this.entity && this._isParentEntityAddedToScene)
                    es.Physics.updateCollider(this);
            }
            return this;
        };
        /**
         * 设置BoxCollider的高度
         * @param height
         */
        BoxCollider.prototype.setHeight = function (height) {
            var box = this.shape;
            if (height != box.height) {
                // 更新框，改变边界，如果我们需要更新物理系统中的边界
                box.updateBox(box.width, height);
                if (this.entity && this._isParentEntityAddedToScene)
                    es.Physics.updateCollider(this);
            }
        };
        BoxCollider.prototype.toString = function () {
            return "[BoxCollider: bounds: " + this.bounds + "]";
        };
        return BoxCollider;
    }(es.Collider));
    es.BoxCollider = BoxCollider;
})(es || (es = {}));
var es;
(function (es) {
    var CircleCollider = /** @class */ (function (_super) {
        __extends(CircleCollider, _super);
        /**
         * 创建一个有半径的圆
         *
         * @param radius
         */
        function CircleCollider(radius) {
            var _this = _super.call(this) || this;
            _this.shape = new es.Circle(radius);
            return _this;
        }
        Object.defineProperty(CircleCollider.prototype, "radius", {
            get: function () {
                return this.shape.radius;
            },
            set: function (value) {
                this.setRadius(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置圆的半径
         * @param radius
         */
        CircleCollider.prototype.setRadius = function (radius) {
            var circle = this.shape;
            if (radius != circle.radius) {
                circle.radius = radius;
                circle._originalRadius = radius;
                if (this.entity && this._isParentEntityAddedToScene)
                    es.Physics.updateCollider(this);
            }
            return this;
        };
        CircleCollider.prototype.toString = function () {
            return "[CircleCollider: bounds: " + this.bounds + ", radius: " + this.shape.radius + "]";
        };
        return CircleCollider;
    }(es.Collider));
    es.CircleCollider = CircleCollider;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 多边形应该以顺时针方式定义
     */
    var PolygonCollider = /** @class */ (function (_super) {
        __extends(PolygonCollider, _super);
        /**
         * 如果这些点没有居中，它们将以localOffset的差异为居中。
         * @param points
         */
        function PolygonCollider(points) {
            var _this = _super.call(this) || this;
            // 第一点和最后一点决不能相同。我们想要一个开放的多边形
            var isPolygonClosed = points[0] == points[points.length - 1];
            // 最后一个移除
            if (isPolygonClosed)
                points.splice(points.length - 1, 1);
            var center = es.Polygon.findPolygonCenter(points);
            _this.setLocalOffset(center);
            es.Polygon.recenterPolygonVerts(points);
            _this.shape = new es.Polygon(points);
            return _this;
        }
        return PolygonCollider;
    }(es.Collider));
    es.PolygonCollider = PolygonCollider;
})(es || (es = {}));
var es;
(function (es) {
    var EntitySystem = /** @class */ (function () {
        function EntitySystem(matcher) {
            this._entities = [];
            this._matcher = matcher ? matcher : es.Matcher.empty();
        }
        Object.defineProperty(EntitySystem.prototype, "scene", {
            get: function () {
                return this._scene;
            },
            set: function (value) {
                this._scene = value;
                this._entities = [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntitySystem.prototype, "matcher", {
            get: function () {
                return this._matcher;
            },
            enumerable: true,
            configurable: true
        });
        EntitySystem.prototype.initialize = function () {
        };
        EntitySystem.prototype.onChanged = function (entity) {
            var contains = new linq.List(this._entities).contains(entity);
            var interest = this._matcher.isInterestedEntity(entity);
            if (interest && !contains)
                this.add(entity);
            else if (!interest && contains)
                this.remove(entity);
        };
        EntitySystem.prototype.add = function (entity) {
            this._entities.push(entity);
            this.onAdded(entity);
        };
        EntitySystem.prototype.onAdded = function (entity) {
        };
        EntitySystem.prototype.remove = function (entity) {
            new linq.List(this._entities).remove(entity);
            this.onRemoved(entity);
        };
        EntitySystem.prototype.onRemoved = function (entity) {
        };
        EntitySystem.prototype.update = function () {
            this.begin();
            this.process(this._entities);
        };
        EntitySystem.prototype.lateUpdate = function () {
            this.lateProcess(this._entities);
            this.end();
        };
        EntitySystem.prototype.begin = function () {
        };
        EntitySystem.prototype.process = function (entities) {
        };
        EntitySystem.prototype.lateProcess = function (entities) {
        };
        EntitySystem.prototype.end = function () {
        };
        return EntitySystem;
    }());
    es.EntitySystem = EntitySystem;
})(es || (es = {}));
///<reference path="./EntitySystem.ts" />
var es;
///<reference path="./EntitySystem.ts" />
(function (es) {
    /**
     * 基本实体处理系统。将其用作处理具有特定组件的许多实体的基础
     */
    var EntityProcessingSystem = /** @class */ (function (_super) {
        __extends(EntityProcessingSystem, _super);
        function EntityProcessingSystem(matcher) {
            return _super.call(this, matcher) || this;
        }
        EntityProcessingSystem.prototype.lateProcessEntity = function (entity) {
        };
        /**
         * 遍历这个系统的所有实体并逐个处理它们
         * @param entities
         */
        EntityProcessingSystem.prototype.process = function (entities) {
            var _this = this;
            entities.forEach(function (entity) { return _this.processEntity(entity); });
        };
        EntityProcessingSystem.prototype.lateProcess = function (entities) {
            var _this = this;
            entities.forEach(function (entity) { return _this.lateProcessEntity(entity); });
        };
        return EntityProcessingSystem;
    }(es.EntitySystem));
    es.EntityProcessingSystem = EntityProcessingSystem;
})(es || (es = {}));
var es;
(function (es) {
    var PassiveSystem = /** @class */ (function (_super) {
        __extends(PassiveSystem, _super);
        function PassiveSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PassiveSystem.prototype.onChanged = function (entity) {
        };
        PassiveSystem.prototype.process = function (entities) {
            // 我们用我们自己的不考虑实体的基本实体系统来代替
            this.begin();
            this.end();
        };
        return PassiveSystem;
    }(es.EntitySystem));
    es.PassiveSystem = PassiveSystem;
})(es || (es = {}));
/** 用于协调其他系统的通用系统基类 */
var es;
/** 用于协调其他系统的通用系统基类 */
(function (es) {
    var ProcessingSystem = /** @class */ (function (_super) {
        __extends(ProcessingSystem, _super);
        function ProcessingSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ProcessingSystem.prototype.onChanged = function (entity) {
        };
        ProcessingSystem.prototype.process = function (entities) {
            this.begin();
            this.processSystem();
            this.end();
        };
        return ProcessingSystem;
    }(es.EntitySystem));
    es.ProcessingSystem = ProcessingSystem;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 这个类可以从两方面来考虑。你可以把它看成一个位向量或者一组非负整数。这个名字有点误导人。
     *
     * 它是由一个位向量实现的，但同样可以把它看成是一个非负整数的集合;集合中的每个整数由对应索引处的集合位表示。该结构的大小由集合中的最大整数决定。
     */
    var BitSet = /** @class */ (function () {
        function BitSet(nbits) {
            if (nbits === void 0) { nbits = 64; }
            var length = nbits >> 6;
            if ((nbits & BitSet.LONG_MASK) != 0)
                length++;
            this._bits = new Array(length);
            this._bits.fill(0);
        }
        BitSet.prototype.and = function (bs) {
            var max = Math.min(this._bits.length, bs._bits.length);
            var i;
            for (var i_1 = 0; i_1 < max; ++i_1)
                this._bits[i_1] &= bs._bits[i_1];
            while (i < this._bits.length)
                this._bits[i++] = 0;
        };
        BitSet.prototype.andNot = function (bs) {
            var i = Math.min(this._bits.length, bs._bits.length);
            while (--i >= 0)
                this._bits[i] &= ~bs._bits[i];
        };
        BitSet.prototype.cardinality = function () {
            var card = 0;
            for (var i = this._bits.length - 1; i >= 0; i--) {
                var a = this._bits[i];
                if (a == 0)
                    continue;
                if (a == -1) {
                    card += 64;
                    continue;
                }
                a = ((a >> 1) & 0x5555555555555555) + (a & 0x5555555555555555);
                a = ((a >> 2) & 0x3333333333333333) + (a & 0x3333333333333333);
                var b = ((a >> 32) + a) >>> 0;
                b = ((b >> 4) & 0x0f0f0f0f) + (b & 0x0f0f0f0f);
                b = ((b >> 8) & 0x00ff00ff) + (b & 0x00ff00ff);
                card += ((b >> 16) & 0x0000ffff) + (b & 0x0000ffff);
            }
            return card;
        };
        BitSet.prototype.clear = function (pos) {
            if (pos != undefined) {
                var offset = pos >> 6;
                this.ensure(offset);
                this._bits[offset] &= ~(1 << pos);
            }
            else {
                for (var i = 0; i < this._bits.length; i++)
                    this._bits[i] = 0;
            }
        };
        BitSet.prototype.get = function (pos) {
            var offset = pos >> 6;
            if (offset >= this._bits.length)
                return false;
            return (this._bits[offset] & (1 << pos)) != 0;
        };
        BitSet.prototype.intersects = function (set) {
            var i = Math.min(this._bits.length, set._bits.length);
            while (--i >= 0) {
                if ((this._bits[i] & set._bits[i]) != 0)
                    return true;
            }
            return false;
        };
        BitSet.prototype.isEmpty = function () {
            for (var i = this._bits.length - 1; i >= 0; i--) {
                if (this._bits[i])
                    return false;
            }
            return true;
        };
        BitSet.prototype.nextSetBit = function (from) {
            var offset = from >> 6;
            var mask = 1 << from;
            while (offset < this._bits.length) {
                var h = this._bits[offset];
                do {
                    if ((h & mask) != 0)
                        return from;
                    mask <<= 1;
                    from++;
                } while (mask != 0);
                mask = 1;
                offset++;
            }
            return -1;
        };
        BitSet.prototype.set = function (pos, value) {
            if (value === void 0) { value = true; }
            if (value) {
                var offset = pos >> 6;
                this.ensure(offset);
                this._bits[offset] |= 1 << pos;
            }
            else {
                this.clear(pos);
            }
        };
        BitSet.prototype.ensure = function (lastElt) {
            if (lastElt >= this._bits.length) {
                var startIndex = this._bits.length;
                this._bits.length = lastElt + 1;
                this._bits.fill(0, startIndex, lastElt + 1);
            }
        };
        BitSet.LONG_MASK = 0x3f;
        return BitSet;
    }());
    es.BitSet = BitSet;
})(es || (es = {}));
///<reference path="../Components/IUpdatable.ts" />
var es;
///<reference path="../Components/IUpdatable.ts" />
(function (es) {
    var ComponentList = /** @class */ (function () {
        function ComponentList(entity) {
            /**
             * 添加到实体的组件列表
             */
            this._components = new es.FastList();
            /**
             * 所有需要更新的组件列表
             */
            this._updatableComponents = new es.FastList();
            /**
             * 添加到此框架的组件列表。用来对组件进行分组，这样我们就可以同时进行加工
             */
            this._componentsToAdd = [];
            /**
             * 标记要删除此框架的组件列表。用来对组件进行分组，这样我们就可以同时进行加工
             */
            this._componentsToRemove = [];
            this._tempBufferList = [];
            this._entity = entity;
        }
        Object.defineProperty(ComponentList.prototype, "count", {
            get: function () {
                return this._components.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentList.prototype, "buffer", {
            get: function () {
                return this._components.buffer;
            },
            enumerable: true,
            configurable: true
        });
        ComponentList.prototype.markEntityListUnsorted = function () {
            this._isComponentListUnsorted = true;
        };
        ComponentList.prototype.add = function (component) {
            this._componentsToAdd.push(component);
        };
        ComponentList.prototype.remove = function (component) {
            var componentToRemove = new linq.List(this._componentsToRemove);
            var componentToAdd = new linq.List(this._componentsToAdd);
            if (componentToRemove.contains(component))
                console.warn("\u60A8\u6B63\u5728\u5C1D\u8BD5\u5220\u9664\u4E00\u4E2A\u60A8\u5DF2\u7ECF\u5220\u9664\u7684\u7EC4\u4EF6(" + component + ")");
            // 这可能不是一个活动的组件，所以我们必须注意它是否还没有被处理，它可能正在同一帧中被删除
            if (componentToAdd.contains(component)) {
                componentToAdd.remove(component);
                return;
            }
            componentToRemove.add(component);
        };
        /**
         * 立即从组件列表中删除所有组件
         */
        ComponentList.prototype.removeAllComponents = function () {
            for (var i = 0; i < this._components.length; i++) {
                this.handleRemove(this._components[i]);
            }
            this._components.clear();
            this._updatableComponents.clear();
            this._componentsToAdd.length = 0;
            this._componentsToRemove.length = 0;
        };
        ComponentList.prototype.deregisterAllComponents = function () {
            for (var i = 0; i < this._components.length; i++) {
                var component = this._components.buffer[i];
                if (!component)
                    continue;
                // 处理IUpdatable
                if (es.isIUpdatable(component))
                    this._updatableComponents.remove(component);
                if (es.Core.entitySystemsEnabled) {
                    this._entity.componentBits.set(es.ComponentTypeManager.getIndexFor(es.TypeUtils.getType(component)), false);
                    this._entity.scene.entityProcessors.onComponentRemoved(this._entity);
                }
            }
        };
        ComponentList.prototype.registerAllComponents = function () {
            for (var i = 0; i < this._components.length; i++) {
                var component = this._components.buffer[i];
                if (es.isIUpdatable(component))
                    this._updatableComponents.add(component);
                if (es.Core.entitySystemsEnabled) {
                    this._entity.componentBits.set(es.ComponentTypeManager.getIndexFor(es.TypeUtils.getType(component)));
                    this._entity.scene.entityProcessors.onComponentAdded(this._entity);
                }
            }
        };
        /**
         * 处理任何需要删除或添加的组件
         */
        ComponentList.prototype.updateLists = function () {
            if (this._componentsToRemove.length > 0) {
                for (var i = 0; i < this._componentsToRemove.length; i++) {
                    this.handleRemove(this._componentsToRemove[i]);
                    this._components.remove(this._componentsToRemove[i]);
                }
                this._componentsToRemove.length = 0;
            }
            if (this._componentsToAdd.length > 0) {
                for (var i = 0, count = this._componentsToAdd.length; i < count; i++) {
                    var component = this._componentsToAdd[i];
                    if (es.isIUpdatable(component))
                        this._updatableComponents.add(component);
                    if (es.Core.entitySystemsEnabled) {
                        this._entity.componentBits.set(es.ComponentTypeManager.getIndexFor(es.TypeUtils.getType(component)));
                        this._entity.scene.entityProcessors.onComponentAdded(this._entity);
                    }
                    this._components.add(component);
                    this._tempBufferList.push(component);
                }
                // 在调用onAddedToEntity之前清除，以防添加更多组件
                this._componentsToAdd.length = 0;
                this._isComponentListUnsorted = true;
                // 现在所有的组件都添加到了场景中，我们再次循环并调用onAddedToEntity/onEnabled
                for (var i = 0; i < this._tempBufferList.length; i++) {
                    var component = this._tempBufferList[i];
                    component.onAddedToEntity();
                    // enabled检查实体和组件
                    if (component.enabled) {
                        component.onEnabled();
                    }
                }
                this._tempBufferList.length = 0;
            }
            if (this._isComponentListUnsorted) {
                this._updatableComponents.sort(ComponentList.compareUpdatableOrder);
                this._isComponentListUnsorted = false;
            }
        };
        ComponentList.prototype.handleRemove = function (component) {
            if (!component)
                return;
            if (es.isIUpdatable(component))
                this._updatableComponents.remove(component);
            if (es.Core.entitySystemsEnabled) {
                this._entity.componentBits.set(es.ComponentTypeManager.getIndexFor(es.TypeUtils.getType(component)), false);
                this._entity.scene.entityProcessors.onComponentRemoved(this._entity);
            }
            component.onRemovedFromEntity();
            component.entity = null;
        };
        /**
         * 获取类型T的第一个组件并返回它
         * 可以选择跳过检查未初始化的组件(尚未调用onAddedToEntity方法的组件)
         * 如果没有找到组件，则返回null。
         * @param type
         * @param onlyReturnInitializedComponents
         */
        ComponentList.prototype.getComponent = function (type, onlyReturnInitializedComponents) {
            for (var i = 0; i < this._components.length; i++) {
                var component = this._components.buffer[i];
                if (component instanceof type)
                    return component;
            }
            // 我们可以选择检查挂起的组件，以防addComponent和getComponent在同一个框架中被调用
            if (!onlyReturnInitializedComponents) {
                for (var i = 0; i < this._componentsToAdd.length; i++) {
                    var component = this._componentsToAdd[i];
                    if (component instanceof type)
                        return component;
                }
            }
            return null;
        };
        /**
         * 获取T类型的所有组件，但不使用列表分配
         * @param typeName
         * @param components
         */
        ComponentList.prototype.getComponents = function (typeName, components) {
            if (!components)
                components = [];
            for (var i = 0; i < this._components.length; i++) {
                var component = this._components.buffer[i];
                if (component instanceof typeName) {
                    components.push(component);
                }
            }
            // 我们还检查了待处理的组件，以防在同一帧中调用addComponent和getComponent
            for (var i = 0; i < this._componentsToAdd.length; i++) {
                var component = this._componentsToAdd[i];
                if (component instanceof typeName) {
                    components.push(component);
                }
            }
            return components;
        };
        ComponentList.prototype.update = function () {
            this.updateLists();
            for (var i = 0; i < this._updatableComponents.length; i++) {
                if (this._updatableComponents.buffer[i].enabled)
                    this._updatableComponents.buffer[i].update();
            }
        };
        ComponentList.prototype.onEntityTransformChanged = function (comp) {
            for (var i = 0; i < this._components.length; i++) {
                if (this._components.buffer[i].enabled)
                    this._components.buffer[i].onEntityTransformChanged(comp);
            }
            for (var i = 0; i < this._componentsToAdd.length; i++) {
                if (this._componentsToAdd[i].enabled)
                    this._componentsToAdd[i].onEntityTransformChanged(comp);
            }
        };
        ComponentList.prototype.onEntityEnabled = function () {
            for (var i = 0; i < this._components.length; i++)
                this._components.buffer[i].onEnabled();
        };
        ComponentList.prototype.onEntityDisabled = function () {
            for (var i = 0; i < this._components.length; i++)
                this._components.buffer[i].onDisabled();
        };
        /**
         * 组件列表的全局updateOrder排序
         */
        ComponentList.compareUpdatableOrder = new es.IUpdatableComparer();
        return ComponentList;
    }());
    es.ComponentList = ComponentList;
})(es || (es = {}));
var es;
(function (es) {
    var ComponentTypeManager = /** @class */ (function () {
        function ComponentTypeManager() {
        }
        ComponentTypeManager.add = function (type) {
            if (!this._componentTypesMask.has(type))
                this._componentTypesMask.set(type, this._componentTypesMask.size);
        };
        ComponentTypeManager.getIndexFor = function (type) {
            var v = -1;
            if (!this._componentTypesMask.has(type)) {
                this.add(type);
                v = this._componentTypesMask.get(type);
            }
            else {
                v = this._componentTypesMask.get(type);
            }
            return v;
        };
        ComponentTypeManager._componentTypesMask = new Map();
        return ComponentTypeManager;
    }());
    es.ComponentTypeManager = ComponentTypeManager;
})(es || (es = {}));
var es;
(function (es) {
    var EntityList = /** @class */ (function () {
        function EntityList(scene) {
            /**
             * 场景中添加的实体列表
             */
            this._entities = new es.FastList();
            /**
             * 本帧添加的实体列表。用于对实体进行分组，以便我们可以同时处理它们
             */
            this._entitiesToAdded = new es.HashSet();
            /**
             * 本帧被标记为删除的实体列表。用于对实体进行分组，以便我们可以同时处理它们
             */
            this._entitiesToRemove = new es.HashSet();
            /**
             * 通过标签跟踪实体，便于检索
             */
            this._entityDict = new Map();
            this._unsortedTags = new Set();
            this.scene = scene;
        }
        Object.defineProperty(EntityList.prototype, "count", {
            get: function () {
                return this._entities.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntityList.prototype, "buffer", {
            get: function () {
                return this._entities;
            },
            enumerable: true,
            configurable: true
        });
        EntityList.prototype.markEntityListUnsorted = function () {
            this._isEntityListUnsorted = true;
        };
        EntityList.prototype.markTagUnsorted = function (tag) {
            this._unsortedTags.add(tag);
        };
        /**
         * 将一个实体添加到列表中。所有的生命周期方法将在下一帧中被调用
         * @param entity
         */
        EntityList.prototype.add = function (entity) {
            this._entitiesToAdded.add(entity);
        };
        /**
         * 从列表中删除一个实体。所有的生命周期方法将在下一帧中被调用
         * @param entity
         */
        EntityList.prototype.remove = function (entity) {
            if (!this._entitiesToRemove.contains(entity)) {
                console.warn("\u60A8\u6B63\u5728\u5C1D\u8BD5\u5220\u9664\u5DF2\u7ECF\u5220\u9664\u7684\u5B9E\u4F53(" + entity.name + ")");
                return;
            }
            // 防止在同一帧中添加或删除实体
            if (this._entitiesToAdded.contains(entity)) {
                this._entitiesToAdded.remove(entity);
                return;
            }
            if (!this._entitiesToRemove.contains(entity))
                this._entitiesToRemove.add(entity);
        };
        /**
         * 从实体列表中删除所有实体
         */
        EntityList.prototype.removeAllEntities = function () {
            this._unsortedTags.clear();
            this._entitiesToAdded.clear();
            this._isEntityListUnsorted = false;
            // 为什么我们要在这里更新列表？主要是为了处理在场景切换前被分离的实体。
            // 它们仍然会在_entitiesToRemove列表中，这将由updateLists处理。
            this.updateLists();
            for (var i = 0; i < this._entities.length; i++) {
                this._entities.buffer[i]._isDestroyed = true;
                this._entities.buffer[i].onRemovedFromScene();
                this._entities.buffer[i].scene = null;
            }
            this._entities.clear();
            this._entityDict.clear();
        };
        /**
         * 检查实体目前是否由这个EntityList管理
         * @param entity
         */
        EntityList.prototype.contains = function (entity) {
            return this._entities.contains(entity) || this._entitiesToAdded.contains(entity);
        };
        EntityList.prototype.getTagList = function (tag) {
            var list = this._entityDict.get(tag);
            if (!list) {
                list = [];
                this._entityDict.set(tag, list);
            }
            return list;
        };
        EntityList.prototype.addToTagList = function (entity) {
            var list = this.getTagList(entity.tag);
            if (list.findIndex(function (e) { return e.id == entity.id; }) == -1) {
                list.push(entity);
                this._unsortedTags.add(entity.tag);
            }
        };
        EntityList.prototype.removeFromTagList = function (entity) {
            var list = this._entityDict.get(entity.tag);
            if (list) {
                new linq.List(list).remove(entity);
            }
        };
        EntityList.prototype.update = function () {
            for (var i = 0; i < this._entities.length; i++) {
                var entity = this._entities.buffer[i];
                if (entity.enabled && (entity.updateInterval == 1 || es.Time.frameCount % entity.updateInterval == 0))
                    entity.update();
            }
        };
        EntityList.prototype.updateLists = function () {
            var _this = this;
            if (this._entitiesToRemove.getCount() > 0) {
                this._entitiesToRemove.toArray().forEach(function (entity) {
                    // 处理标签列表
                    _this.removeFromTagList(entity);
                    // 处理常规实体列表
                    _this._entities.remove(entity);
                    entity.onRemovedFromScene();
                    entity.scene = null;
                    if (es.Core.entitySystemsEnabled)
                        _this.scene.entityProcessors.onEntityRemoved(entity);
                });
                this._entitiesToRemove.clear();
            }
            if (this._entitiesToAdded.getCount() > 0) {
                this._entitiesToAdded.toArray().forEach(function (entity) {
                    _this._entities.add(entity);
                    entity.scene = _this.scene;
                    _this.addToTagList(entity);
                    if (es.Core.entitySystemsEnabled)
                        _this.scene.entityProcessors.onEntityAdded(entity);
                });
                this._entitiesToAdded.toArray().forEach(function (entity) {
                    entity.onAddedToScene();
                });
                this._entitiesToAdded.clear();
                this._isEntityListUnsorted = true;
            }
            if (this._isEntityListUnsorted) {
                this._entities.sort(es.Entity.entityComparer);
                this._isEntityListUnsorted = false;
            }
            // 根据需要对标签列表进行排序
            if (this._unsortedTags.size > 0) {
                this._unsortedTags.forEach(function (value) { return _this._entityDict.get(value).sort(function (a, b) { return a.compareTo(b); }); });
                this._unsortedTags.clear();
            }
        };
        /**
         * 返回第一个找到的名字为name的实体。如果没有找到则返回null
         * @param name
         */
        EntityList.prototype.findEntity = function (name) {
            for (var i = 0; i < this._entities.length; i++) {
                if (this._entities.buffer[i].name == name)
                    return this._entities.buffer[i];
            }
            for (var i = 0; i < this._entitiesToAdded.getCount(); i++) {
                var entity = this._entitiesToAdded.toArray()[i];
                if (entity.name == name)
                    return entity;
            }
            return null;
        };
        /**
         * 返回带有标签的所有实体的列表。如果没有实体有标签，则返回一个空列表。
         * 返回的List可以通过ListPool.free放回池中
         * @param tag
         */
        EntityList.prototype.entitiesWithTag = function (tag) {
            var list = this.getTagList(tag);
            var returnList = es.ListPool.obtain();
            returnList.length = this._entities.length;
            for (var i = 0; i < list.length; i++)
                returnList.push(list[i]);
            return returnList;
        };
        /**
         * 返回一个T类型的所有实体的列表。
         * 返回的List可以通过ListPool.free放回池中。
         * @param type
         */
        EntityList.prototype.entitiesOfType = function (type) {
            var list = es.ListPool.obtain();
            for (var i = 0; i < this._entities.length; i++) {
                if (this._entities.buffer[i] instanceof type)
                    list.push(this._entities.buffer[i]);
            }
            for (var i = 0; i < this._entitiesToAdded.getCount(); i++) {
                var entity = this._entitiesToAdded.toArray()[i];
                if (es.TypeUtils.getType(entity) instanceof type) {
                    list.push(entity);
                }
            }
            return list;
        };
        /**
         * 返回在场景中找到的第一个T类型的组件。
         * @param type
         */
        EntityList.prototype.findComponentOfType = function (type) {
            for (var i = 0; i < this._entities.length; i++) {
                if (this._entities.buffer[i].enabled) {
                    var comp = this._entities.buffer[i].getComponent(type);
                    if (comp)
                        return comp;
                }
            }
            for (var i = 0; i < this._entitiesToAdded.getCount(); i++) {
                var entity = this._entitiesToAdded.toArray()[i];
                if (entity.enabled) {
                    var comp = entity.getComponent(type);
                    if (comp)
                        return comp;
                }
            }
            return null;
        };
        /**
         * 返回在场景中找到的所有T类型的组件。
         * 返回的List可以通过ListPool.free放回池中。
         * @param type
         */
        EntityList.prototype.findComponentsOfType = function (type) {
            var comps = es.ListPool.obtain();
            for (var i = 0; i < this._entities.length; i++) {
                if (this._entities.buffer[i].enabled)
                    this._entities.buffer[i].getComponents(type, comps);
            }
            for (var i = 0; i < this._entitiesToAdded.getCount(); i++) {
                var entity = this._entitiesToAdded.toArray()[i];
                if (entity.enabled)
                    entity.getComponents(type, comps);
            }
            return comps;
        };
        return EntityList;
    }());
    es.EntityList = EntityList;
})(es || (es = {}));
var es;
(function (es) {
    var EntityProcessorList = /** @class */ (function () {
        function EntityProcessorList() {
            this._processors = [];
        }
        EntityProcessorList.prototype.add = function (processor) {
            this._processors.push(processor);
        };
        EntityProcessorList.prototype.remove = function (processor) {
            new linq.List(this._processors).remove(processor);
        };
        EntityProcessorList.prototype.onComponentAdded = function (entity) {
            this.notifyEntityChanged(entity);
        };
        EntityProcessorList.prototype.onComponentRemoved = function (entity) {
            this.notifyEntityChanged(entity);
        };
        EntityProcessorList.prototype.onEntityAdded = function (entity) {
            this.notifyEntityChanged(entity);
        };
        EntityProcessorList.prototype.onEntityRemoved = function (entity) {
            this.removeFromProcessors(entity);
        };
        EntityProcessorList.prototype.begin = function () {
        };
        EntityProcessorList.prototype.update = function () {
            for (var i = 0; i < this._processors.length; i++) {
                this._processors[i].update();
            }
        };
        EntityProcessorList.prototype.lateUpdate = function () {
            for (var i = 0; i < this._processors.length; i++) {
                this._processors[i].lateUpdate();
            }
        };
        EntityProcessorList.prototype.end = function () {
        };
        EntityProcessorList.prototype.getProcessor = function () {
            for (var i = 0; i < this._processors.length; i++) {
                var processor = this._processors[i];
                if (processor instanceof es.EntitySystem)
                    return processor;
            }
            return null;
        };
        EntityProcessorList.prototype.notifyEntityChanged = function (entity) {
            for (var i = 0; i < this._processors.length; i++) {
                this._processors[i].onChanged(entity);
            }
        };
        EntityProcessorList.prototype.removeFromProcessors = function (entity) {
            for (var i = 0; i < this._processors.length; i++) {
                this._processors[i].remove(entity);
            }
        };
        return EntityProcessorList;
    }());
    es.EntityProcessorList = EntityProcessorList;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 创建这个字典的原因只有一个：
     * 我需要一个能让我直接以数组的形式对值进行迭代的字典，而不需要生成一个数组或使用迭代器。
     * 对于这个目标是比标准字典快N倍。
     * Faster dictionary在大部分操作上也比标准字典快，但差别可以忽略不计。
     * 唯一较慢的操作是在添加时调整内存大小，因为与标准数组相比，这个实现需要使用两个单独的数组。
     */
    var FasterDictionary = /** @class */ (function () {
        function FasterDictionary(size) {
            if (size === void 0) { size = 1; }
            this._freeValueCellIndex = 0;
            this._collisions = 0;
            this._valuesInfo = new Array(size);
            this._values = new Array(size);
            this._buckets = new Array(es.HashHelpers.getPrime(size));
        }
        FasterDictionary.prototype.getValuesArray = function (count) {
            count.value = this._freeValueCellIndex;
            return this._values;
        };
        Object.defineProperty(FasterDictionary.prototype, "valuesArray", {
            get: function () {
                return this._values;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FasterDictionary.prototype, "count", {
            get: function () {
                return this._freeValueCellIndex;
            },
            enumerable: true,
            configurable: true
        });
        FasterDictionary.prototype.add = function (key, value) {
            if (!this.addValue(key, value, { value: 0 }))
                throw new Error("key 已经存在");
        };
        FasterDictionary.prototype.addValue = function (key, value, indexSet) {
            var hash = es.HashHelpers.getHashCode(key);
            var bucketIndex = FasterDictionary.reduce(hash, this._buckets.length);
            if (this._freeValueCellIndex == this._values.length) {
                var expandPrime = es.HashHelpers.expandPrime(this._freeValueCellIndex);
                this._values.length = expandPrime;
                this._valuesInfo.length = expandPrime;
            }
            // buckets值-1表示它是空的
            var valueIndex = es.NumberExtension.toNumber(this._buckets[bucketIndex]) - 1;
            if (valueIndex == -1) {
                // 在最后一个位置创建信息节点，并填入相关信息
                this._valuesInfo[this._freeValueCellIndex] = new FastNode(key, hash);
            }
            else {
                {
                    var currentValueIndex = valueIndex;
                    do {
                        // 必须检查键是否已经存在于字典中
                        if (this._valuesInfo[currentValueIndex].hashcode == hash &&
                            this._valuesInfo[currentValueIndex].key == key) {
                            // 键已经存在，只需将其值替换掉即可
                            this._values[currentValueIndex] = value;
                            indexSet.value = currentValueIndex;
                            return false;
                        }
                        currentValueIndex = this._valuesInfo[currentValueIndex].previous;
                    } while (currentValueIndex != -1); // -1表示没有更多的值与相同的哈希值的键
                }
                this._collisions++;
                // 创建一个新的节点，该节点之前的索引指向当前指向桶的节点
                this._valuesInfo[this._freeValueCellIndex] = new FastNode(key, hash, valueIndex);
                // 更新现有单元格的下一个单元格指向新的单元格，旧的单元格 -> 新的单元格 -> 旧的单元格 <- 下一个单元格
                this._valuesInfo[valueIndex].next = this._freeValueCellIndex;
            }
            // 重要的是：新的节点总是被桶单元格指向的那个节点，所以我可以假设被桶指向的那个节点总是最后添加的值(next = -1)
            // item与这个bucketIndex将指向最后创建的值 
            // TODO: 如果相反，我假设原来的那个是bucket中的那个，我就不需要在这里更新bucket了
            this._buckets[bucketIndex] = (this._freeValueCellIndex + 1);
            this._values[this._freeValueCellIndex] = value;
            indexSet.value = this._freeValueCellIndex;
            this._freeValueCellIndex++;
            if (this._collisions > this._buckets.length) {
                // 我们需要更多的空间和更少的碰撞
                this._buckets = new Array(es.HashHelpers.expandPrime(this._collisions));
                this._collisions = 0;
                // 我们需要得到目前存储的所有值的哈希码，并将它们分布在新的桶长上
                for (var newValueIndex = 0; newValueIndex < this._freeValueCellIndex; newValueIndex++) {
                    // 获取原始哈希码，并根据新的长度找到新的bucketIndex
                    bucketIndex = FasterDictionary.reduce(this._valuesInfo[newValueIndex].hashcode, this._buckets.length);
                    // bucketsIndex可以是-1或下一个值。
                    // 如果是-1意味着没有碰撞。
                    // 如果有碰撞，我们创建一个新节点，它的上一个指向旧节点。
                    // 旧节点指向新节点，新节点指向旧节点，旧节点指向新节点，现在bucket指向新节点，这样我们就可以重建linkedlist.
                    // 获取当前值Index，如果没有碰撞，则为-1。
                    var existingValueIndex = es.NumberExtension.toNumber(this._buckets[bucketIndex]) - 1;
                    // 将bucket索引更新为共享bucketIndex的当前项目的索引（最后找到的总是bucket中的那个）
                    this._buckets[bucketIndex] = newValueIndex + 1;
                    if (existingValueIndex != -1) {
                        // 这个单元格已经指向了新的bucket list中的一个值，这意味着有一个碰撞，出了问题
                        this._collisions++;
                        // bucket将指向这个值，所以新的值将使用以前的索引
                        this._valuesInfo[newValueIndex].previous = existingValueIndex;
                        this._valuesInfo[newValueIndex].next = -1;
                        // 并将之前的下一个索引更新为新的索引
                        this._valuesInfo[existingValueIndex].next = newValueIndex;
                    }
                    else {
                        // 什么都没有被索引，桶是空的。我们需要更新之前的 next 和 previous 的值。
                        this._valuesInfo[newValueIndex].next = -1;
                        this._valuesInfo[newValueIndex].previous = -1;
                    }
                }
            }
            return true;
        };
        FasterDictionary.prototype.remove = function (key) {
            var hash = FasterDictionary.hash(key);
            var bucketIndex = FasterDictionary.reduce(hash, this._buckets.length);
            // 找桶
            var indexToValueToRemove = es.NumberExtension.toNumber(this._buckets[bucketIndex]) - 1;
            // 第一部分：在bucket list中寻找实际的键，如果找到了，我就更新bucket list，使它不再指向要删除的单元格。
            while (indexToValueToRemove != -1) {
                if (this._valuesInfo[indexToValueToRemove].hashcode == hash &&
                    this._valuesInfo[indexToValueToRemove].key == key) {
                    // 如果找到了密钥，并且桶直接指向了要删除的节点
                    if (this._buckets[bucketIndex] - 1 == indexToValueToRemove) {
                        if (this._valuesInfo[indexToValueToRemove].next != -1)
                            throw new Error("如果 bucket 指向单元格，那么 next 必须不存在。");
                        // 如果前一个单元格存在，它的下一个指针必须被更新!
                        //<---迭代顺序  
                        // B(ucket总是指向最后一个)
                        // ------- ------- -------
                        // 1 | | | | 2 | | | 3 | //bucket不能有下一个，只能有上一个。
                        // ------- ------- -------
                        //--> 插入
                        var value = this._valuesInfo[indexToValueToRemove].previous;
                        this._buckets[bucketIndex] = value + 1;
                    }
                    else {
                        if (this._valuesInfo[indexToValueToRemove].next == -1)
                            throw new Error("如果 bucket 指向另一个单元格，则 NEXT 必须存在");
                    }
                    FasterDictionary.updateLinkedList(indexToValueToRemove, this._valuesInfo);
                    break;
                }
                indexToValueToRemove = this._valuesInfo[indexToValueToRemove].previous;
            }
            if (indexToValueToRemove == -1)
                return false; // 未找到
            this._freeValueCellIndex--; // 少了一个需要反复计算的值
            // 第二部分
            // 这时节点指针和水桶会被更新，但_values数组会被更新仍然有要删除的值
            // 这个字典的目标是能够做到像数组一样对数值进行迭代，所以数值数组必须始终是最新的
            // 如果要删除的单元格是列表中的最后一个，我们可以执行较少的操作（不需要交换），否则我们要将最后一个值的单元格移到要删除的值上。
            if (indexToValueToRemove != this._freeValueCellIndex) {
                // 我们可以将两个数组的最后一个值移到要删除的数组中。
                // 为了做到这一点，我们需要确保 bucket 指针已经更新了
                // 首先我们在桶列表中找到指向要移动的单元格的指针的索引
                var movingBucketIndex = FasterDictionary.reduce(this._valuesInfo[this._freeValueCellIndex].hashcode, this._buckets.length);
                // 如果找到了键，并且桶直接指向要删除的节点，现在必须指向要移动的单元格。
                if (this._buckets[movingBucketIndex] - 1 == this._freeValueCellIndex)
                    this._buckets[movingBucketIndex] = (indexToValueToRemove + 1);
                // 否则意味着有多个键具有相同的哈希值（碰撞），所以我们需要更新链接列表和它的指针
                var next = this._valuesInfo[this._freeValueCellIndex].next;
                var previous = this._valuesInfo[this._freeValueCellIndex].previous;
                // 现在它们指向最后一个值被移入的单元格
                if (next != -1)
                    this._valuesInfo[next].previous = indexToValueToRemove;
                if (previous != -1)
                    this._valuesInfo[previous].next = indexToValueToRemove;
                // 最后，实际上是移动值
                this._valuesInfo[indexToValueToRemove] = this._valuesInfo[this._freeValueCellIndex];
                this._values[indexToValueToRemove] = this._values[this._freeValueCellIndex];
            }
            return true;
        };
        FasterDictionary.prototype.trim = function () {
            var expandPrime = es.HashHelpers.expandPrime(this._freeValueCellIndex);
            if (expandPrime < this._valuesInfo.length) {
                this._values.length = expandPrime;
                this._valuesInfo.length = expandPrime;
            }
        };
        FasterDictionary.prototype.clear = function () {
            if (this._freeValueCellIndex == 0)
                return;
            this._freeValueCellIndex = 0;
            this._buckets.length = 0;
            this._values.length = 0;
            this._valuesInfo.length = 0;
        };
        FasterDictionary.prototype.fastClear = function () {
            if (this._freeValueCellIndex == 0)
                return;
            this._freeValueCellIndex = 0;
            this._buckets.length = 0;
            this._valuesInfo.length = 0;
        };
        FasterDictionary.prototype.containsKey = function (key) {
            if (this.tryFindIndex(key, { value: 0 })) {
                return true;
            }
            return false;
        };
        FasterDictionary.prototype.tryGetValue = function (key) {
            var findIndex = { value: 0 };
            if (this.tryFindIndex(key, findIndex)) {
                return this._values[findIndex.value];
            }
            return null;
        };
        FasterDictionary.prototype.tryFindIndex = function (key, findIndex) {
            // 我把所有的索引都用偏移量+1来存储，这样在bucket list中0就意味着实际上不存在
            // 当读取时，偏移量必须再偏移-1才是真实的
            // 这样我就避免了将数组初始化为-1
            var hash = FasterDictionary.hash(key);
            var bucketIndex = FasterDictionary.reduce(hash, this._buckets.length);
            var valueIndex = es.NumberExtension.toNumber(this._buckets[bucketIndex]) - 1;
            // 即使我们找到了一个现有的值，我们也需要确定它是我们所要求的值
            while (valueIndex != -1) {
                if (this._valuesInfo[valueIndex].hashcode == hash && this._valuesInfo[valueIndex].key == key) {
                    findIndex.value = valueIndex;
                    return true;
                }
                valueIndex = this._valuesInfo[valueIndex].previous;
            }
            findIndex.value = 0;
            return false;
        };
        FasterDictionary.prototype.getDirectValue = function (index) {
            return this._values[index];
        };
        FasterDictionary.prototype.getIndex = function (key) {
            var findIndex = { value: 0 };
            if (this.tryFindIndex(key, findIndex))
                return findIndex.value;
            throw new Error("未找到key");
        };
        FasterDictionary.updateLinkedList = function (index, valuesInfo) {
            var next = valuesInfo[index].next;
            var previous = valuesInfo[index].previous;
            if (next != -1)
                valuesInfo[next].previous = previous;
            if (previous != -1)
                valuesInfo[previous].next = next;
        };
        FasterDictionary.hash = function (key) {
            return es.HashHelpers.getHashCode(key);
        };
        FasterDictionary.reduce = function (x, n) {
            if (x >= n)
                return x % n;
            return x;
        };
        return FasterDictionary;
    }());
    es.FasterDictionary = FasterDictionary;
    var FastNode = /** @class */ (function () {
        function FastNode(key, hash, previousNode) {
            if (previousNode === void 0) { previousNode = -1; }
            this.key = key;
            this.hashcode = hash;
            this.previous = previousNode;
            this.next = -1;
        }
        return FastNode;
    }());
    es.FastNode = FastNode;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 围绕一个数组的非常基本的包装，当它达到容量时自动扩展。
     * 注意，在迭代时应该这样直接访问缓冲区，但使用FastList.length字段。
     *
     * @tutorial
     * for( var i = 0; i <= list.length; i++ )
     *      var item = list.buffer[i];
     */
    var FastList = /** @class */ (function () {
        function FastList(size) {
            if (size === void 0) { size = 5; }
            /**
             * 直接访问缓冲区内填充项的长度。不要改变。
             */
            this.length = 0;
            this.buffer = new Array(size);
        }
        /**
         * 清空列表并清空缓冲区中的所有项目
         */
        FastList.prototype.clear = function () {
            this.buffer.length = 0;
            this.length = 0;
        };
        /**
         *  和clear的工作原理一样，只是它不会将缓冲区中的所有项目清空。
         */
        FastList.prototype.reset = function () {
            this.length = 0;
        };
        /**
         * 将该项目添加到列表中
         * @param item
         */
        FastList.prototype.add = function (item) {
            if (this.length == this.buffer.length)
                this.buffer.length = Math.max(this.buffer.length << 1, 10);
            this.buffer[this.length++] = item;
        };
        /**
         * 从列表中删除该项目
         * @param item
         */
        FastList.prototype.remove = function (item) {
            var comp = es.EqualityComparer.default();
            for (var i = 0; i < this.length; ++i) {
                if (comp.equals(this.buffer[i], item)) {
                    this.removeAt(i);
                    return;
                }
            }
        };
        /**
         * 从列表中删除给定索引的项目。
         * @param index
         */
        FastList.prototype.removeAt = function (index) {
            if (index >= this.length)
                throw new Error("index超出范围！");
            this.length--;
            new linq.List(this.buffer).removeAt(index);
        };
        /**
         * 检查项目是否在FastList中
         * @param item
         */
        FastList.prototype.contains = function (item) {
            var comp = es.EqualityComparer.default();
            for (var i = 0; i < this.length; ++i) {
                if (comp.equals(this.buffer[i], item))
                    return true;
            }
            return false;
        };
        /**
         * 如果缓冲区达到最大，将分配更多的空间来容纳额外的ItemCount。
         * @param additionalItemCount
         */
        FastList.prototype.ensureCapacity = function (additionalItemCount) {
            if (additionalItemCount === void 0) { additionalItemCount = 1; }
            if (this.length + additionalItemCount >= this.buffer.length)
                this.buffer.length = Math.max(this.buffer.length << 1, this.length + additionalItemCount);
        };
        /**
         * 添加数组中的所有项目
         * @param array
         */
        FastList.prototype.addRange = function (array) {
            var e_1, _a;
            try {
                for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
                    var item = array_1_1.value;
                    this.add(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * 对缓冲区中的所有项目进行排序，长度不限。
         */
        FastList.prototype.sort = function (comparer) {
            this.buffer.sort(comparer.compare);
        };
        return FastList;
    }());
    es.FastList = FastList;
})(es || (es = {}));
var es;
(function (es) {
    var HashHelpers = /** @class */ (function () {
        function HashHelpers() {
        }
        HashHelpers.isPrime = function (candidate) {
            if ((candidate & 1) != 0) {
                var limit = Math.sqrt(candidate);
                for (var divisor = 3; divisor <= limit; divisor += 2) {
                    if ((candidate & divisor) == 0)
                        return false;
                }
                return true;
            }
            return (candidate == 2);
        };
        HashHelpers.getPrime = function (min) {
            if (min < 0)
                throw new Error("参数错误 min不能小于0");
            for (var i = 0; i < this.primes.length; i++) {
                var prime = this.primes[i];
                if (prime >= min)
                    return prime;
            }
            // 在我们预定义的表之外，计算的方式稍复杂。
            for (var i = (min | 1); i < Number.MAX_VALUE; i += 2) {
                if (this.isPrime(i) && ((i - 1) % this.hashPrime != 0))
                    return i;
            }
            return min;
        };
        /**
         *
         * @param oldSize
         * @returns 返回要增长的哈希特表的大小
         */
        HashHelpers.expandPrime = function (oldSize) {
            var newSize = 2 * oldSize;
            // 在遇到容量溢出之前，允许哈希特表增长到最大可能的大小
            // 请注意，即使当_items.Length溢出时，这项检查也会起作用
            if (newSize > this.maxPrimeArrayLength && this.maxPrimeArrayLength > oldSize) {
                return this.maxPrimeArrayLength;
            }
            return this.getPrime(newSize);
        };
        HashHelpers.getHashCode = function (str) {
            var s;
            if (typeof str == 'object') {
                s = JSON.stringify(str);
            }
            else {
                s = str.toString();
            }
            var hash = 0;
            if (s.length == 0)
                return hash;
            for (var i = 0; i < s.length; i++) {
                var char = s.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return hash;
        };
        HashHelpers.hashCollisionThreshold = 100;
        HashHelpers.hashPrime = 101;
        /**
         * 用来作为哈希表大小的质数表。
         * 一个典型的调整大小的算法会在这个数组中选取比之前容量大两倍的最小质数。
         * 假设我们的Hashtable当前的容量为x，并且添加了足够多的元素，因此需要进行大小调整。
         * 调整大小首先计算2x，然后在表中找到第一个大于2x的质数，即如果质数的顺序是p_1，p_2，...，p_i，...，则找到p_n，使p_n-1 < 2x < p_n。
         * 双倍对于保持哈希特操作的渐近复杂度是很重要的，比如添加。
         * 拥有一个质数可以保证双倍哈希不会导致无限循环。 IE，你的哈希函数将是h1(key)+i*h2(key)，0 <= i < size.h2和size必须是相对质数。
         */
        HashHelpers.primes = [3, 7, 11, 17, 23, 29, 37, 47, 59, 71, 89, 107, 131, 163, 197, 239, 293, 353, 431, 521, 631, 761, 919,
            1103, 1327, 1597, 1931, 2333, 2801, 3371, 4049, 4861, 5839, 7013, 8419, 10103, 12143, 14591,
            17519, 21023, 25229, 30293, 36353, 43627, 52361, 62851, 75431, 90523, 108631, 130363, 156437,
            187751, 225307, 270371, 324449, 389357, 467237, 560689, 672827, 807403, 968897, 1162687, 1395263,
            1674319, 2009191, 2411033, 2893249, 3471899, 4166287, 4999559, 5999471, 7199369];
        /**
         * 这是比Array.MaxArrayLength小的最大质数
         */
        HashHelpers.maxPrimeArrayLength = 0x7FEFFFFD;
        return HashHelpers;
    }());
    es.HashHelpers = HashHelpers;
})(es || (es = {}));
var es;
(function (es) {
    var Matcher = /** @class */ (function () {
        function Matcher() {
            this.allSet = new es.BitSet();
            this.exclusionSet = new es.BitSet();
            this.oneSet = new es.BitSet();
        }
        Matcher.empty = function () {
            return new Matcher();
        };
        Matcher.prototype.getAllSet = function () {
            return this.allSet;
        };
        Matcher.prototype.getExclusionSet = function () {
            return this.exclusionSet;
        };
        Matcher.prototype.getOneSet = function () {
            return this.oneSet;
        };
        Matcher.prototype.isInterestedEntity = function (e) {
            return this.isInterested(e.componentBits);
        };
        Matcher.prototype.isInterested = function (componentBits) {
            // 检查实体是否拥有该方面中定义的所有组件
            if (!this.allSet.isEmpty()) {
                for (var i = this.allSet.nextSetBit(0); i >= 0; i = this.allSet.nextSetBit(i + 1)) {
                    if (!componentBits.get(i))
                        return false;
                }
            }
            // 如果我们仍然感兴趣，检查该实体是否拥有任何一个排除组件，如果有，那么系统就不感兴趣
            if (!this.exclusionSet.isEmpty() && this.exclusionSet.intersects(componentBits))
                return false;
            // 如果我们仍然感兴趣，检查该实体是否拥有oneSet中的任何一个组件。如果是，系统就会感兴趣
            if (!this.oneSet.isEmpty() && !this.oneSet.intersects(componentBits))
                return false;
            return true;
        };
        Matcher.prototype.all = function () {
            var _this = this;
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            types.forEach(function (type) {
                _this.allSet.set(es.ComponentTypeManager.getIndexFor(type));
            });
            return this;
        };
        Matcher.prototype.exclude = function () {
            var _this = this;
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            types.forEach(function (type) {
                _this.exclusionSet.set(es.ComponentTypeManager.getIndexFor(type));
            });
            return this;
        };
        Matcher.prototype.one = function () {
            var _this = this;
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            types.forEach(function (type) {
                _this.oneSet.set(es.ComponentTypeManager.getIndexFor(type));
            });
            return this;
        };
        return Matcher;
    }());
    es.Matcher = Matcher;
})(es || (es = {}));
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    /**
     * 匹配中文字符
     * @param    str    需要匹配的字符串
     * @return
     */
    StringUtils.matchChineseWord = function (str) {
        //中文字符的unicode值[\u4E00-\u9FA5]
        var patternA = /[\u4E00-\u9FA5]+/gim;
        return str.match(patternA);
    };
    /**
     * 去除字符串左端的空白字符
     * @param    target        目标字符串
     * @return
     */
    StringUtils.lTrim = function (target) {
        var startIndex = 0;
        while (this.isWhiteSpace(target.charAt(startIndex))) {
            startIndex++;
        }
        return target.slice(startIndex, target.length);
    };
    /**
     * 去除字符串右端的空白字符
     * @param    target        目标字符串
     * @return
     */
    StringUtils.rTrim = function (target) {
        var endIndex = target.length - 1;
        while (this.isWhiteSpace(target.charAt(endIndex))) {
            endIndex--;
        }
        return target.slice(0, endIndex + 1);
    };
    /**
     * 返回一个去除2段空白字符的字符串
     * @param    target
     * @return  返回一个去除2段空白字符的字符串
     */
    StringUtils.trim = function (target) {
        if (target == null) {
            return null;
        }
        return this.rTrim(this.lTrim(target));
    };
    /**
     * 返回该字符是否为空白字符
     * @param    str
     * @return  返回该字符是否为空白字符
     */
    StringUtils.isWhiteSpace = function (str) {
        if (str == " " || str == "\t" || str == "\r" || str == "\n")
            return true;
        return false;
    };
    /**
     * 返回执行替换后的字符串
     * @param    mainStr   待查找字符串
     * @param    targetStr 目标字符串
     * @param    replaceStr 替换字符串
     * @param    caseMark  是否忽略大小写
     * @return  返回执行替换后的字符串
     */
    StringUtils.replaceMatch = function (mainStr, targetStr, replaceStr, caseMark) {
        if (caseMark === void 0) { caseMark = false; }
        var len = mainStr.length;
        var tempStr = "";
        var isMatch = false;
        var tempTarget = caseMark == true ? targetStr.toLowerCase() : targetStr;
        for (var i = 0; i < len; i++) {
            isMatch = false;
            if (mainStr.charAt(i) == tempTarget.charAt(0)) {
                if (mainStr.substr(i, tempTarget.length) == tempTarget) {
                    isMatch = true;
                }
            }
            if (isMatch) {
                tempStr += replaceStr;
                i = i + tempTarget.length - 1;
            }
            else {
                tempStr += mainStr.charAt(i);
            }
        }
        return tempStr;
    };
    /**
     * 用html实体换掉字符窜中的特殊字符
     * @param    str                需要替换的字符串
     * @param    reversion        是否翻转替换：将转义符号替换为正常的符号
     * @return    换掉特殊字符后的字符串
     */
    StringUtils.htmlSpecialChars = function (str, reversion) {
        if (reversion === void 0) { reversion = false; }
        var len = this.specialSigns.length;
        for (var i = 0; i < len; i += 2) {
            var from = void 0;
            var to = void 0;
            from = this.specialSigns[i];
            to = this.specialSigns[i + 1];
            if (reversion) {
                var temp = from;
                from = to;
                to = temp;
            }
            str = this.replaceMatch(str, from, to);
        }
        return str;
    };
    /**
     * 给数字字符前面添 "0"
     *
     * <pre>
     *
     * trace( StringFormat.zfill('1') );
     * // 01
     *
     * trace( StringFormat.zfill('16', 5) );
     * // 00016
     *
     * trace( StringFormat.zfill('-3', 3) );
     * // -03
     *
     * </pre>
     *
     * @param str 要进行处理的字符串
     * @param width 处理后字符串的长度，
     *              如果str.length >= width，将不做任何处理直接返回原始的str。
     * @return
     *
     */
    StringUtils.zfill = function (str, width) {
        if (width === void 0) { width = 2; }
        if (!str) {
            return str;
        }
        width = Math.floor(width);
        var slen = str.length;
        if (slen >= width) {
            return str;
        }
        var negative = false;
        if (str.substr(0, 1) == '-') {
            negative = true;
            str = str.substr(1);
        }
        var len = width - slen;
        for (var i = 0; i < len; i++) {
            str = '0' + str;
        }
        if (negative) {
            str = '-' + str;
        }
        return str;
    };
    /**
     * 翻转字符串
     * @param    str 字符串
     * @return  翻转后的字符串
     */
    StringUtils.reverse = function (str) {
        if (str.length > 1)
            return this.reverse(str.substring(1)) + str.substring(0, 1);
        else
            return str;
    };
    /**
     * 截断某段字符串
     * @param    str        目标字符串
     * @param    start    需要截断的起始索引
     * @param    len        截断长度
     * @param    order    顺序，true从字符串头部开始计算，false从字符串尾巴开始结算。
     * @return    截断后的字符串
     */
    StringUtils.cutOff = function (str, start, len, order) {
        if (order === void 0) { order = true; }
        start = Math.floor(start);
        len = Math.floor(len);
        var length = str.length;
        if (start > length)
            start = length;
        var s = start;
        var e = start + len;
        var newStr;
        if (order) {
            newStr = str.substring(0, s) + str.substr(e, length);
        }
        else {
            s = length - 1 - start - len;
            e = s + len;
            newStr = str.substring(0, s + 1) + str.substr(e + 1, length);
        }
        return newStr;
    };
    /**{0} 字符替换   */
    StringUtils.strReplace = function (str, rStr) {
        var i = 0, len = rStr.length;
        for (; i < len; i++) {
            if (rStr[i] == null || rStr[i] == "") {
                rStr[i] = "无";
            }
            str = str.replace("{" + i + "}", rStr[i]);
        }
        return str;
    };
    /**
     * 特殊符号字符串
     */
    StringUtils.specialSigns = [
        '&', '&amp;',
        '<', '&lt;',
        '>', '&gt;',
        '"', '&quot;',
        "'", '&apos;',
        '®', '&reg;',
        '©', '&copy;',
        '™', '&trade;',
    ];
    return StringUtils;
}());
var es;
(function (es) {
    /** 提供帧定时信息 */
    var Time = /** @class */ (function () {
        function Time() {
        }
        Time.update = function (currentTime) {
            var dt = (currentTime - this._lastTime) / 1000;
            this.totalTime += dt;
            this.deltaTime = dt * this.timeScale;
            this.unscaledDeltaTime = dt;
            this.timeSinceSceneLoad += dt;
            this.frameCount++;
            this._lastTime = currentTime;
        };
        Time.sceneChanged = function () {
            this.timeSinceSceneLoad = 0;
        };
        /**
         * 允许在间隔检查。只应该使用高于delta的间隔值，否则它将始终返回true。
         * @param interval
         */
        Time.checkEvery = function (interval) {
            // 我们减去了delta，因为timeSinceSceneLoad已经包含了这个update ticks delta
            return this.timeSinceSceneLoad / interval > (this.timeSinceSceneLoad - this.deltaTime) / interval;
        };
        /** 前一帧到当前帧的时间增量，按时间刻度进行缩放 */
        Time.deltaTime = 0;
        /** 时间刻度缩放 */
        Time.timeScale = 1;
        /** 已传递的帧总数 */
        Time.frameCount = 0;
        Time._lastTime = 0;
        return Time;
    }());
    es.Time = Time;
})(es || (es = {}));
var TimeUtils = /** @class */ (function () {
    function TimeUtils() {
    }
    /**
     * 计算月份ID
     * @param d 指定计算日期
     * @returns 月ID
     */
    TimeUtils.monthId = function (d) {
        if (d === void 0) { d = null; }
        d = d ? d : new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var g = m < 10 ? "0" : "";
        return parseInt(y + g + m);
    };
    /**
     * 计算日期ID
     * @param d 指定计算日期
     * @returns 日期ID
     */
    TimeUtils.dateId = function (t) {
        if (t === void 0) { t = null; }
        t = t ? t : new Date();
        var m = t.getMonth() + 1;
        var a = m < 10 ? "0" : "";
        var d = t.getDate();
        var b = d < 10 ? "0" : "";
        return parseInt(t.getFullYear() + a + m + b + d);
    };
    /**
     * 计算周ID
     * @param d 指定计算日期
     * @returns 周ID
     */
    TimeUtils.weekId = function (d, first) {
        if (d === void 0) { d = null; }
        if (first === void 0) { first = true; }
        d = d ? d : new Date();
        var c = new Date();
        c.setTime(d.getTime());
        c.setDate(1);
        c.setMonth(0); //当年第一天
        var year = c.getFullYear();
        var firstDay = c.getDay();
        if (firstDay == 0) {
            firstDay = 7;
        }
        var max = false;
        if (firstDay <= 4) {
            max = firstDay > 1;
            c.setDate(c.getDate() - (firstDay - 1));
        }
        else {
            c.setDate(c.getDate() + 7 - firstDay + 1);
        }
        var num = this.diffDay(d, c, false);
        if (num < 0) {
            c.setDate(1);
            c.setMonth(0); //当年第一天
            c.setDate(c.getDate() - 1);
            return this.weekId(c, false);
        }
        var week = num / 7;
        var weekIdx = Math.floor(week) + 1;
        if (weekIdx == 53) {
            c.setTime(d.getTime());
            c.setDate(c.getDate() - 1);
            var endDay = c.getDay();
            if (endDay == 0) {
                endDay = 7;
            }
            if (first && (!max || endDay < 4)) {
                c.setFullYear(c.getFullYear() + 1);
                c.setDate(1);
                c.setMonth(0); //当年第一天
                return this.weekId(c, false);
            }
        }
        var g = weekIdx > 9 ? "" : "0";
        var s = year + "00" + g + weekIdx; //加上00防止和月份ID冲突
        return parseInt(s);
    };
    /**
     * 计算俩日期时间差，如果a比b小，返回负数
     */
    TimeUtils.diffDay = function (a, b, fixOne) {
        if (fixOne === void 0) { fixOne = false; }
        var x = (a.getTime() - b.getTime()) / 86400000;
        return fixOne ? Math.ceil(x) : Math.floor(x);
    };
    /**
     * 获取本周一 凌晨时间
     */
    TimeUtils.getFirstDayOfWeek = function (d) {
        d = d ? d : new Date();
        var day = d.getDay() || 7;
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1 - day, 0, 0, 0, 0);
    };
    /**
     * 获取当日凌晨时间
     */
    TimeUtils.getFirstOfDay = function (d) {
        d = d ? d : new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    };
    /**
     * 获取次日凌晨时间
     */
    TimeUtils.getNextFirstOfDay = function (d) {
        return new Date(this.getFirstOfDay(d).getTime() + 86400000);
    };
    /**
     * @returns 2018-12-12
     */
    TimeUtils.formatDate = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };
    /**
     * @returns 2018-12-12 12:12:12
     */
    TimeUtils.formatDateTime = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var i = date.getMinutes();
        i = i < 10 ? ('0' + i) : i;
        var s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + m + '-' + d + ' ' + h + ':' + i + ":" + s;
    };
    /**
     * @returns s 2018-12-12 或者 2018-12-12 12:12:12
     */
    TimeUtils.parseDate = function (s) {
        var t = Date.parse(s);
        if (!isNaN(t)) {
            return new Date(Date.parse(s.replace(/-/g, "/")));
        }
        else {
            return new Date();
        }
    };
    /**
     * 秒数转换为时间形式。
     * @param    time 秒数
     * @param    partition 分隔符
     * @param    showHour  是否显示小时
     * @return  返回一个以分隔符分割的时, 分, 秒
     *
     * 比如: time = 4351; secondToTime(time)返回字符串01:12:31;
     */
    TimeUtils.secondToTime = function (time, partition, showHour) {
        if (time === void 0) { time = 0; }
        if (partition === void 0) { partition = ":"; }
        if (showHour === void 0) { showHour = true; }
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor(time % 3600 / 60);
        var seconds = Math.floor(time % 3600 % 60);
        var h = hours.toString();
        var m = minutes.toString();
        var s = seconds.toString();
        if (hours < 10)
            h = "0" + h;
        if (minutes < 10)
            m = "0" + m;
        if (seconds < 10)
            s = "0" + s;
        var timeStr;
        if (showHour)
            timeStr = h + partition + m + partition + s;
        else
            timeStr = m + partition + s;
        return timeStr;
    };
    /**
     * 时间形式转换为毫秒数。
     * @param   time  以指定分隔符分割的时间字符串
     * @param   partition  分隔符
     * @return  毫秒数显示的字符串
     * @throws  Error Exception
     *
     * 用法1 trace(MillisecondTransform.timeToMillisecond("00:60:00"))
     * 输出   3600000
     *
     *
     * 用法2 trace(MillisecondTransform.timeToMillisecond("00.60.00","."))
     * 输出   3600000
     */
    TimeUtils.timeToMillisecond = function (time, partition) {
        if (partition === void 0) { partition = ":"; }
        var _ary = time.split(partition);
        var timeNum = 0;
        var len = _ary.length;
        for (var i = 0; i < len; i++) {
            var n = _ary[i];
            timeNum += n * Math.pow(60, (len - 1 - i));
        }
        timeNum *= 1000;
        return timeNum.toString();
    };
    return TimeUtils;
}());
var es;
(function (es) {
    /** 贝塞尔帮助类 */
    var Bezier = /** @class */ (function () {
        function Bezier() {
        }
        /**
         * 二次贝塞尔曲线
         * @param p0
         * @param p1
         * @param p2
         * @param t
         */
        Bezier.getPoint = function (p0, p1, p2, t) {
            t = es.MathHelper.clamp01(t);
            var oneMinusT = 1 - t;
            return es.Vector2.add(es.Vector2.add(es.Vector2.multiply(new es.Vector2(oneMinusT * oneMinusT), p0), es.Vector2.multiply(new es.Vector2(2 * oneMinusT * t), p1)), es.Vector2.multiply(new es.Vector2(t * t), p2));
        };
        /**
         * 得到二次贝塞尔函数的一阶导数
         * @param p0
         * @param p1
         * @param p2
         * @param t
         */
        Bezier.getFirstDerivative = function (p0, p1, p2, t) {
            return es.Vector2.add(es.Vector2.multiply(new es.Vector2(2 * (1 - t)), es.Vector2.subtract(p1, p0)), es.Vector2.multiply(new es.Vector2(2 * t), es.Vector2.subtract(p2, p1)));
        };
        /**
         * 得到一个三次贝塞尔函数的一阶导数
         * @param start
         * @param firstControlPoint
         * @param secondControlPoint
         * @param end
         * @param t
         */
        Bezier.getFirstDerivativeThree = function (start, firstControlPoint, secondControlPoint, end, t) {
            t = es.MathHelper.clamp01(t);
            var oneMunusT = 1 - t;
            return es.Vector2.add(es.Vector2.add(es.Vector2.multiply(new es.Vector2(3 * oneMunusT * oneMunusT), es.Vector2.subtract(firstControlPoint, start)), es.Vector2.multiply(new es.Vector2(6 * oneMunusT * t), es.Vector2.subtract(secondControlPoint, firstControlPoint))), es.Vector2.multiply(new es.Vector2(3 * t * t), es.Vector2.subtract(end, secondControlPoint)));
        };
        /**
         * 计算一个三次贝塞尔
         * @param start
         * @param firstControlPoint
         * @param secondControlPoint
         * @param end
         * @param t
         */
        Bezier.getPointThree = function (start, firstControlPoint, secondControlPoint, end, t) {
            t = es.MathHelper.clamp01(t);
            var oneMunusT = 1 - t;
            return es.Vector2.add(es.Vector2.add(es.Vector2.add(es.Vector2.multiply(new es.Vector2(oneMunusT * oneMunusT * oneMunusT), start), es.Vector2.multiply(new es.Vector2(3 * oneMunusT * oneMunusT * t), firstControlPoint)), es.Vector2.multiply(new es.Vector2(3 * oneMunusT * t * t), secondControlPoint)), es.Vector2.multiply(new es.Vector2(t * t * t), end));
        };
        /**
         * 递归地细分bezier曲线，直到满足距离校正
         * 在这种算法中，平面切片的点要比曲面切片少。返回完成后应返回到ListPool的合并列表。
         * @param start
         * @param firstCtrlPoint
         * @param secondCtrlPoint
         * @param end
         * @param distanceTolerance
         */
        Bezier.getOptimizedDrawingPoints = function (start, firstCtrlPoint, secondCtrlPoint, end, distanceTolerance) {
            if (distanceTolerance === void 0) { distanceTolerance = 1; }
            var points = es.ListPool.obtain();
            points.push(start);
            this.recursiveGetOptimizedDrawingPoints(start, firstCtrlPoint, secondCtrlPoint, end, points, distanceTolerance);
            points.push(end);
            return points;
        };
        /**
         * 递归地细分bezier曲线，直到满足距离校正。在这种算法中，平面切片的点要比曲面切片少。
         * @param start
         * @param firstCtrlPoint
         * @param secondCtrlPoint
         * @param end
         * @param points
         * @param distanceTolerance
         */
        Bezier.recursiveGetOptimizedDrawingPoints = function (start, firstCtrlPoint, secondCtrlPoint, end, points, distanceTolerance) {
            // 计算线段的所有中点
            var pt12 = es.Vector2.divide(es.Vector2.add(start, firstCtrlPoint), new es.Vector2(2));
            var pt23 = es.Vector2.divide(es.Vector2.add(firstCtrlPoint, secondCtrlPoint), new es.Vector2(2));
            var pt34 = es.Vector2.divide(es.Vector2.add(secondCtrlPoint, end), new es.Vector2(2));
            // 计算新半直线的中点
            var pt123 = es.Vector2.divide(es.Vector2.add(pt12, pt23), new es.Vector2(2));
            var pt234 = es.Vector2.divide(es.Vector2.add(pt23, pt34), new es.Vector2(2));
            // 最后再细分最后两个中点。如果我们满足我们的距离公差，这将是我们使用的最后一点。
            var pt1234 = es.Vector2.divide(es.Vector2.add(pt123, pt234), new es.Vector2(2));
            // 试着用一条直线来近似整个三次曲线
            var deltaLine = es.Vector2.subtract(end, start);
            var d2 = Math.abs(((firstCtrlPoint.x, end.x) * deltaLine.y - (firstCtrlPoint.y - end.y) * deltaLine.x));
            var d3 = Math.abs(((secondCtrlPoint.x - end.x) * deltaLine.y - (secondCtrlPoint.y - end.y) * deltaLine.x));
            if ((d2 + d3) * (d2 + d3) < distanceTolerance * (deltaLine.x * deltaLine.x + deltaLine.y * deltaLine.y)) {
                points.push(pt1234);
                return;
            }
            // 继续细分
            this.recursiveGetOptimizedDrawingPoints(start, pt12, pt123, pt1234, points, distanceTolerance);
            this.recursiveGetOptimizedDrawingPoints(pt1234, pt234, pt34, end, points, distanceTolerance);
        };
        return Bezier;
    }());
    es.Bezier = Bezier;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 帮助处理位掩码的实用程序类
     * 除了isFlagSet之外，所有方法都期望flag参数是一个非移位的标志
     * 允许您使用普通的(0、1、2、3等)来设置/取消您的标记
     */
    var Flags = /** @class */ (function () {
        function Flags() {
        }
        /**
         * 检查位标志是否已在数值中设置
         * 检查期望标志是否已经移位
         * @param self
         * @param flag
         */
        Flags.isFlagSet = function (self, flag) {
            return (self & flag) != 0;
        };
        /**
         * 检查位标志是否在数值中设置
         * @param self
         * @param flag
         */
        Flags.isUnshiftedFlagSet = function (self, flag) {
            flag = 1 << flag;
            return (self & flag) != 0;
        };
        /**
         *  设置数值标志位，移除所有已经设置的标志
         * @param self
         * @param flag
         */
        Flags.setFlagExclusive = function (self, flag) {
            self.value = 1 << flag;
        };
        /**
         * 设置标志位
         * @param self
         * @param flag
         */
        Flags.setFlag = function (self, flag) {
            self.value = (self.value | 1 << flag);
        };
        /**
         * 取消标志位
         * @param self
         * @param flag
         */
        Flags.unsetFlag = function (self, flag) {
            flag = 1 << flag;
            self.value = (self.value & (~flag));
        };
        /**
         * 反转数值集合位
         * @param self
         */
        Flags.invertFlags = function (self) {
            self.value = ~self.value;
        };
        return Flags;
    }());
    es.Flags = Flags;
})(es || (es = {}));
var es;
(function (es) {
    var MathHelper = /** @class */ (function () {
        function MathHelper() {
        }
        /**
         * 将弧度转换成角度。
         * @param radians 用弧度表示的角
         */
        MathHelper.toDegrees = function (radians) {
            return radians * 57.295779513082320876798154814105;
        };
        /**
         * 将角度转换为弧度
         * @param degrees
         */
        MathHelper.toRadians = function (degrees) {
            return degrees * 0.017453292519943295769236907684886;
        };
        /**
         * mapps值(在leftMin - leftMax范围内)到rightMin - rightMax范围内的值
         * @param value
         * @param leftMin
         * @param leftMax
         * @param rightMin
         * @param rightMax
         */
        MathHelper.map = function (value, leftMin, leftMax, rightMin, rightMax) {
            return rightMin + (value - leftMin) * (rightMax - rightMin) / (leftMax - leftMin);
        };
        MathHelper.lerp = function (value1, value2, amount) {
            return value1 + (value2 - value1) * amount;
        };
        MathHelper.clamp = function (value, min, max) {
            if (value < min)
                return min;
            if (value > max)
                return max;
            return value;
        };
        /**
         * 给定圆心、半径和角度，得到圆周上的一个点。0度是3点钟。
         * @param circleCenter
         * @param radius
         * @param angleInDegrees
         */
        MathHelper.pointOnCirlce = function (circleCenter, radius, angleInDegrees) {
            var radians = MathHelper.toRadians(angleInDegrees);
            return new es.Vector2(Math.cos(radians) * radians + circleCenter.x, Math.sin(radians) * radians + circleCenter.y);
        };
        /**
         * 如果值为偶数，返回true
         * @param value
         */
        MathHelper.isEven = function (value) {
            return value % 2 == 0;
        };
        /**
         * 数值限定在0-1之间
         * @param value
         */
        MathHelper.clamp01 = function (value) {
            if (value < 0)
                return 0;
            if (value > 1)
                return 1;
            return value;
        };
        MathHelper.angleBetweenVectors = function (from, to) {
            return Math.atan2(to.y - from.y, to.x - from.x);
        };
        /**
         * 增加t并确保它总是大于或等于0并且小于长度
         * @param t
         * @param length
         */
        MathHelper.incrementWithWrap = function (t, length) {
            t++;
            if (t == length)
                return 0;
            return t;
        };
        /**
         * 由上移量向上移。start可以小于或大于end。例如:开始是2，结束是10，移位是4，结果是6
         * @param start
         * @param end
         * @param shift
         */
        MathHelper.approach = function (start, end, shift) {
            if (start < end)
                return Math.min(start + shift, end);
            return Math.max(start - shift, end);
        };
        MathHelper.Epsilon = 0.00001;
        MathHelper.Rad2Deg = 57.29578;
        MathHelper.Deg2Rad = 0.0174532924;
        /**
         * 表示pi除以2的值(1.57079637)
         */
        MathHelper.PiOver2 = Math.PI / 2;
        return MathHelper;
    }());
    es.MathHelper = MathHelper;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 表示右手3 * 3的浮点矩阵，可以存储平移、缩放和旋转信息。
     */
    var Matrix2D = /** @class */ (function () {
        /**
         * 构建一个矩阵
         * @param m11
         * @param m12
         * @param m21
         * @param m22
         * @param m31
         * @param m32
         */
        function Matrix2D(m11, m12, m21, m22, m31, m32) {
            this.m11 = 0; // x 缩放
            this.m12 = 0;
            this.m21 = 0;
            this.m22 = 0;
            this.m31 = 0;
            this.m32 = 0;
            this.m11 = m11;
            this.m12 = m12;
            this.m21 = m21;
            this.m22 = m22;
            this.m31 = m31;
            this.m32 = m32;
        }
        Object.defineProperty(Matrix2D, "identity", {
            /**
             * 返回标识矩阵
             */
            get: function () {
                return new Matrix2D(1, 0, 0, 1, 0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix2D.prototype, "translation", {
            /**
             * 储存在该矩阵中的位置
             */
            get: function () {
                return new es.Vector2(this.m31, this.m32);
            },
            set: function (value) {
                this.m31 = value.x;
                this.m32 = value.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix2D.prototype, "rotation", {
            /**
             * 以弧度为单位的旋转，存储在这个矩阵中
             */
            get: function () {
                return Math.atan2(this.m21, this.m11);
            },
            set: function (value) {
                var val1 = Math.cos(value);
                var val2 = Math.sin(value);
                this.m11 = val1;
                this.m12 = val2;
                this.m21 = -val2;
                this.m22 = val1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix2D.prototype, "rotationDegrees", {
            /**
             * 矩阵中存储的旋转度数
             */
            get: function () {
                return es.MathHelper.toDegrees(this.rotation);
            },
            set: function (value) {
                this.rotation = es.MathHelper.toRadians(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix2D.prototype, "scale", {
            /**
             * 储存在这个矩阵中的缩放
             */
            get: function () {
                return new es.Vector2(this.m11, this.m22);
            },
            set: function (value) {
                this.m11 = value.x;
                this.m22 = value.y;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 创建一个新的围绕Z轴的旋转矩阵2D
         * @param radians
         */
        Matrix2D.createRotation = function (radians) {
            var result = this.identity;
            var val1 = Math.cos(radians);
            var val2 = Math.sin(radians);
            result.m11 = val1;
            result.m12 = val2;
            result.m21 = -val2;
            result.m22 = val1;
            return result;
        };
        /**
         * 创建一个新的缩放矩阵2D
         * @param xScale
         * @param yScale
         */
        Matrix2D.createScale = function (xScale, yScale) {
            var result = this.identity;
            result.m11 = xScale;
            result.m12 = 0;
            result.m21 = 0;
            result.m22 = yScale;
            result.m31 = 0;
            result.m32 = 0;
            return result;
        };
        /**
         * 创建一个新的平移矩阵2D
         * @param xPosition
         * @param yPosition
         */
        Matrix2D.createTranslation = function (xPosition, yPosition) {
            var result = this.identity;
            result.m11 = 1;
            result.m12 = 0;
            result.m21 = 0;
            result.m22 = 1;
            result.m31 = xPosition;
            result.m32 = yPosition;
            return result;
        };
        Matrix2D.invert = function (matrix) {
            var det = 1 / matrix.determinant();
            var result = this.identity;
            result.m11 = matrix.m22 * det;
            result.m12 = -matrix.m12 * det;
            result.m21 = -matrix.m21 * det;
            result.m22 = matrix.m11 * det;
            result.m31 = (matrix.m32 * matrix.m21 - matrix.m31 * matrix.m22) * det;
            result.m32 = -(matrix.m32 * matrix.m11 - matrix.m31 * matrix.m12) * det;
            return result;
        };
        /**
         * 创建一个新的matrix, 它包含两个矩阵的和。
         * @param matrix
         */
        Matrix2D.prototype.add = function (matrix) {
            this.m11 += matrix.m11;
            this.m12 += matrix.m12;
            this.m21 += matrix.m21;
            this.m22 += matrix.m22;
            this.m31 += matrix.m31;
            this.m32 += matrix.m32;
            return this;
        };
        Matrix2D.prototype.substract = function (matrix) {
            this.m11 -= matrix.m11;
            this.m12 -= matrix.m12;
            this.m21 -= matrix.m21;
            this.m22 -= matrix.m22;
            this.m31 -= matrix.m31;
            this.m32 -= matrix.m32;
            return this;
        };
        Matrix2D.prototype.divide = function (matrix) {
            this.m11 /= matrix.m11;
            this.m12 /= matrix.m12;
            this.m21 /= matrix.m21;
            this.m22 /= matrix.m22;
            this.m31 /= matrix.m31;
            this.m32 /= matrix.m32;
            return this;
        };
        Matrix2D.prototype.multiply = function (matrix) {
            var m11 = (this.m11 * matrix.m11) + (this.m12 * matrix.m21);
            var m12 = (this.m11 * matrix.m12) + (this.m12 * matrix.m22);
            var m21 = (this.m21 * matrix.m11) + (this.m22 * matrix.m21);
            var m22 = (this.m21 * matrix.m12) + (this.m22 * matrix.m22);
            var m31 = (this.m31 * matrix.m11) + (this.m32 * matrix.m21) + matrix.m31;
            var m32 = (this.m31 * matrix.m12) + (this.m32 * matrix.m22) + matrix.m32;
            this.m11 = m11;
            this.m12 = m12;
            this.m21 = m21;
            this.m22 = m22;
            this.m31 = m31;
            this.m32 = m32;
            return this;
        };
        Matrix2D.prototype.determinant = function () {
            return this.m11 * this.m22 - this.m12 * this.m21;
        };
        /**
         * 创建一个新的Matrix2D，包含指定矩阵中的线性插值。
         * @param matrix1
         * @param matrix2
         * @param amount
         */
        Matrix2D.lerp = function (matrix1, matrix2, amount) {
            matrix1.m11 = matrix1.m11 + ((matrix2.m11 - matrix1.m11) * amount);
            matrix1.m12 = matrix1.m12 + ((matrix2.m12 - matrix1.m12) * amount);
            matrix1.m21 = matrix1.m21 + ((matrix2.m21 - matrix1.m21) * amount);
            matrix1.m22 = matrix1.m22 + ((matrix2.m22 - matrix1.m22) * amount);
            matrix1.m31 = matrix1.m31 + ((matrix2.m31 - matrix1.m31) * amount);
            matrix1.m32 = matrix1.m32 + ((matrix2.m32 - matrix1.m32) * amount);
            return matrix1;
        };
        /**
         * 交换矩阵的行和列
         * @param matrix
         */
        Matrix2D.transpose = function (matrix) {
            var ret = this.identity;
            ret.m11 = matrix.m11;
            ret.m12 = matrix.m21;
            ret.m21 = matrix.m12;
            ret.m22 = matrix.m22;
            ret.m31 = 0;
            ret.m32 = 0;
            return ret;
        };
        Matrix2D.prototype.mutiplyTranslation = function (x, y) {
            var trans = Matrix2D.createTranslation(x, y);
            return es.MatrixHelper.mutiply(this, trans);
        };
        /**
         * 比较当前实例是否等于指定的Matrix2D
         * @param other
         */
        Matrix2D.prototype.equals = function (other) {
            return this == other;
        };
        Matrix2D.prototype.toString = function () {
            return "{m11:" + this.m11 + " m12:" + this.m12 + " m21:" + this.m21 + " m22:" + this.m22 + " m31:" + this.m31 + " m32:" + this.m32 + "}";
        };
        return Matrix2D;
    }());
    es.Matrix2D = Matrix2D;
})(es || (es = {}));
var es;
(function (es) {
    var MatrixHelper = /** @class */ (function () {
        function MatrixHelper() {
        }
        /**
         * 创建一个新的Matrix2D，其中包含两个矩阵的和
         * @param matrix1
         * @param matrix2
         */
        MatrixHelper.add = function (matrix1, matrix2) {
            var result = es.Matrix2D.identity;
            result.m11 = matrix1.m11 + matrix2.m11;
            result.m12 = matrix1.m12 + matrix2.m12;
            result.m21 = matrix1.m21 + matrix2.m21;
            result.m22 = matrix1.m22 + matrix2.m22;
            result.m31 = matrix1.m31 + matrix2.m31;
            result.m32 = matrix1.m32 + matrix2.m32;
            return result;
        };
        /**
         * 将一个Matrix2D的元素除以另一个矩阵的元素
         * @param matrix1
         * @param matrix2
         */
        MatrixHelper.divide = function (matrix1, matrix2) {
            var result = es.Matrix2D.identity;
            result.m11 = matrix1.m11 / matrix2.m11;
            result.m12 = matrix1.m12 / matrix2.m12;
            result.m21 = matrix1.m21 / matrix2.m21;
            result.m22 = matrix1.m22 / matrix2.m22;
            result.m31 = matrix1.m31 / matrix2.m31;
            result.m32 = matrix1.m32 / matrix2.m32;
            return result;
        };
        /**
         * 创建一个新的Matrix2D，包含两个矩阵的乘法
         * @param matrix1
         * @param matrix2
         */
        MatrixHelper.mutiply = function (matrix1, matrix2) {
            var result = es.Matrix2D.identity;
            if (matrix2 instanceof es.Matrix2D) {
                var m11 = (matrix1.m11 * matrix2.m11) + (matrix1.m12 * matrix2.m21);
                var m12 = (matrix2.m11 * matrix2.m12) + (matrix1.m12 * matrix2.m22);
                var m21 = (matrix1.m21 * matrix2.m11) + (matrix1.m22 * matrix2.m21);
                var m22 = (matrix1.m21 * matrix2.m12) + (matrix1.m22 * matrix2.m22);
                var m31 = (matrix1.m31 * matrix2.m11) + (matrix1.m32 * matrix2.m21) + matrix2.m31;
                var m32 = (matrix1.m31 * matrix2.m12) + (matrix1.m32 * matrix2.m22) + matrix2.m32;
                result.m11 = m11;
                result.m12 = m12;
                result.m21 = m21;
                result.m22 = m22;
                result.m31 = m31;
                result.m32 = m32;
            }
            else if (typeof matrix2 == "number") {
                result.m11 = matrix1.m11 * matrix2;
                result.m12 = matrix1.m12 * matrix2;
                result.m21 = matrix1.m21 * matrix2;
                result.m22 = matrix1.m22 * matrix2;
                result.m31 = matrix1.m31 * matrix2;
                result.m32 = matrix1.m32 * matrix2;
            }
            return result;
        };
        /**
         * 创建一个新的Matrix2D，包含一个矩阵与另一个矩阵的减法。
         * @param matrix1
         * @param matrix2
         */
        MatrixHelper.subtract = function (matrix1, matrix2) {
            var result = es.Matrix2D.identity;
            result.m11 = matrix1.m11 - matrix2.m11;
            result.m12 = matrix1.m12 - matrix2.m12;
            result.m21 = matrix1.m21 - matrix2.m21;
            result.m22 = matrix1.m22 - matrix2.m22;
            result.m31 = matrix1.m31 - matrix2.m31;
            result.m32 = matrix1.m32 - matrix2.m32;
            return result;
        };
        return MatrixHelper;
    }());
    es.MatrixHelper = MatrixHelper;
})(es || (es = {}));
var es;
(function (es) {
    var Rectangle = /** @class */ (function () {
        /**
         * 创建一个新的Rectanglestruct实例，指定位置、宽度和高度。
         * @param x 创建的矩形的左上角的X坐标
         * @param y 创建的矩形的左上角的y坐标
         * @param width 创建的矩形的宽度
         * @param height 创建的矩形的高度
         */
        function Rectangle(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            /**
             * 该矩形的左上角的x坐标
             */
            this.x = 0;
            /**
             * 该矩形的左上角的y坐标
             */
            this.y = 0;
            /**
             * 该矩形的宽度
             */
            this.width = 0;
            /**
             * 该矩形的高度
             */
            this.height = 0;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Object.defineProperty(Rectangle, "empty", {
            /**
             * 返回X=0, Y=0, Width=0, Height=0的矩形
             */
            get: function () {
                return new Rectangle();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle, "maxRect", {
            /**
             * 返回一个Number.Min/Max值的矩形
             */
            get: function () {
                return new Rectangle(Number.MIN_VALUE / 2, Number.MIN_VALUE / 2, Number.MAX_VALUE, Number.MAX_VALUE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "left", {
            /**
             * 返回此矩形左边缘的X坐标
             */
            get: function () {
                return this.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "right", {
            /**
             * 返回此矩形右边缘的X坐标
             */
            get: function () {
                return this.x + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "top", {
            /**
             * 返回此矩形顶边的y坐标
             */
            get: function () {
                return this.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "bottom", {
            /**
             * 返回此矩形底边的y坐标
             */
            get: function () {
                return this.y + this.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "max", {
            /**
             * 获取矩形的最大点，即右下角
             */
            get: function () {
                return new es.Vector2(this.right, this.bottom);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 这个矩形的宽和高是否为0，位置是否为（0，0）
         */
        Rectangle.prototype.isEmpty = function () {
            return ((((this.width == 0) && (this.height == 0)) && (this.x == 0)) && (this.y == 0));
        };
        Object.defineProperty(Rectangle.prototype, "location", {
            /** 这个矩形的左上角坐标 */
            get: function () {
                return new es.Vector2(this.x, this.y);
            },
            set: function (value) {
                this.x = value.x;
                this.y = value.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "size", {
            /**
             * 这个矩形的宽-高坐标
             */
            get: function () {
                return new es.Vector2(this.width, this.height);
            },
            set: function (value) {
                this.width = value.x;
                this.height = value.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "center", {
            /**
             * 位于这个矩形中心的一个点
             * 如果 "宽度 "或 "高度 "是奇数，则中心点将向下舍入
             */
            get: function () {
                return new es.Vector2(this.x + (this.width / 2), this.y + (this.height / 2));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 创建一个给定最小/最大点（左上角，右下角）的矩形
         * @param minX
         * @param minY
         * @param maxX
         * @param maxY
         */
        Rectangle.fromMinMax = function (minX, minY, maxX, maxY) {
            return new Rectangle(minX, minY, maxX - minX, maxY - minY);
        };
        /**
         * 给定多边形的点，计算边界
         * @param points
         * @returns 来自多边形的点
         */
        Rectangle.rectEncompassingPoints = function (points) {
            // 我们需要求出x/y的最小值/最大值
            var minX = Number.POSITIVE_INFINITY;
            var minY = Number.POSITIVE_INFINITY;
            var maxX = Number.NEGATIVE_INFINITY;
            var maxY = Number.NEGATIVE_INFINITY;
            for (var i = 0; i < points.length; i++) {
                var pt = points[i];
                if (pt.x < minX)
                    minX = pt.x;
                if (pt.x > maxX)
                    maxX = pt.x;
                if (pt.y < minY)
                    minY = pt.y;
                if (pt.y > maxY)
                    maxY = pt.y;
            }
            return this.fromMinMax(minX, minY, maxX, maxY);
        };
        /**
         * 获取指定边缘的位置
         * @param edge
         */
        Rectangle.prototype.getSide = function (edge) {
            switch (edge) {
                case es.Edge.top:
                    return this.top;
                case es.Edge.bottom:
                    return this.bottom;
                case es.Edge.left:
                    return this.left;
                case es.Edge.right:
                    return this.right;
                default:
                    throw new Error("Argument Out Of Range");
            }
        };
        /**
         * 获取所提供的坐标是否在这个矩形的范围内
         * @param x 检查封堵点的X坐标
         * @param y 检查封堵点的Y坐标
         */
        Rectangle.prototype.contains = function (x, y) {
            return ((((this.x <= x) && (x < (this.x + this.width))) &&
                (this.y <= y)) && (y < (this.y + this.height)));
        };
        /**
         * 按指定的水平和垂直方向调整此矩形的边缘
         * @param horizontalAmount 调整左、右边缘的值
         * @param verticalAmount 调整上、下边缘的值
         */
        Rectangle.prototype.inflate = function (horizontalAmount, verticalAmount) {
            this.x -= horizontalAmount;
            this.y -= verticalAmount;
            this.width += horizontalAmount * 2;
            this.height += verticalAmount * 2;
        };
        /**
         * 获取其他矩形是否与这个矩形相交
         * @param value 另一个用于测试的矩形
         */
        Rectangle.prototype.intersects = function (value) {
            return value.left < this.right &&
                this.left < value.right &&
                value.top < this.bottom &&
                this.top < value.bottom;
        };
        Rectangle.prototype.rayIntersects = function (ray, distance) {
            distance.value = 0;
            var maxValue = Number.MAX_VALUE;
            if (Math.abs(ray.direction.x) < 1E-06) {
                if ((ray.start.x < this.x) || (ray.start.x > this.x + this.width))
                    return false;
            }
            else {
                var num11 = 1 / ray.direction.x;
                var num8 = (this.x - ray.start.x) * num11;
                var num7 = (this.x + this.width - ray.start.x) * num11;
                if (num8 > num7) {
                    var num14 = num8;
                    num8 = num7;
                    num7 = num14;
                }
                distance.value = Math.max(num8, distance.value);
                maxValue = Math.min(num7, maxValue);
                if (distance.value > maxValue)
                    return false;
            }
            if (Math.abs(ray.direction.y) < 1E-06) {
                if ((ray.start.y < this.y) || (ray.start.y > this.y + this.height))
                    return false;
            }
            else {
                var num10 = 1 / ray.direction.y;
                var num6 = (this.y - ray.start.y) * num10;
                var num5 = (this.y + this.height - ray.start.y) * num10;
                if (num6 > num5) {
                    var num13 = num6;
                    num6 = num5;
                    num5 = num13;
                }
                distance.value = Math.max(num6, distance.value);
                maxValue = Math.max(num5, maxValue);
                if (distance.value > maxValue)
                    return false;
            }
            return true;
        };
        /**
         * 获取所提供的矩形是否在此矩形的边界内
         * @param value
         */
        Rectangle.prototype.containsRect = function (value) {
            return ((((this.x <= value.x) && (value.x < (this.x + this.width))) &&
                (this.y <= value.y)) &&
                (value.y < (this.y + this.height)));
        };
        Rectangle.prototype.getHalfSize = function () {
            return new es.Vector2(this.width * 0.5, this.height * 0.5);
        };
        Rectangle.prototype.getClosestPointOnBoundsToOrigin = function () {
            var max = this.max;
            var minDist = Math.abs(this.location.x);
            var boundsPoint = new es.Vector2(this.location.x, 0);
            if (Math.abs(max.x) < minDist) {
                minDist = Math.abs(max.x);
                boundsPoint.x = max.x;
                boundsPoint.y = 0;
            }
            if (Math.abs(max.y) < minDist) {
                minDist = Math.abs(max.y);
                boundsPoint.x = 0;
                boundsPoint.y = max.y;
            }
            if (Math.abs(this.location.y) < minDist) {
                minDist = Math.abs(this.location.y);
                boundsPoint.x = 0;
                boundsPoint.y = this.location.y;
            }
            return boundsPoint;
        };
        /**
         * 返回离给定点最近的点
         * @param point 矩形上离点最近的点
         */
        Rectangle.prototype.getClosestPointOnRectangleToPoint = function (point) {
            // 对于每条轴，如果点在框外，就把它限制在框内，否则就不要管它
            var res = new es.Vector2();
            res.x = es.MathHelper.clamp(point.x, this.left, this.right);
            res.y = es.MathHelper.clamp(point.y, this.top, this.bottom);
            return res;
        };
        /**
         * 获取矩形边界上与给定点最近的点
         * @param point
         * @param edgeNormal
         * @returns 矩形边框上离点最近的点
         */
        Rectangle.prototype.getClosestPointOnRectangleBorderToPoint = function (point, edgeNormal) {
            // 对于每条轴，如果点在框外，就把它限制在框内，否则就不要管它
            var res = new es.Vector2();
            res.x = es.MathHelper.clamp(point.x, this.left, this.right);
            res.y = es.MathHelper.clamp(point.y, this.top, this.bottom);
            // 如果点在矩形内，我们需要将res推到边界上，因为它将在矩形内
            if (this.contains(res.x, res.y)) {
                var dl = res.x - this.left;
                var dr = this.right - res.x;
                var dt = res.y - this.top;
                var db = this.bottom - res.y;
                var min = Math.min(dl, dr, dt, db);
                if (min == dt) {
                    res.y = this.top;
                    edgeNormal.y = -1;
                }
                else if (min == db) {
                    res.y = this.bottom;
                    edgeNormal.y = 1;
                }
                else if (min == dl) {
                    res.x = this.left;
                    edgeNormal.x = -1;
                }
                else {
                    res.x = this.right;
                    edgeNormal.x = 1;
                }
            }
            else {
                if (res.x == this.left)
                    edgeNormal.x = -1;
                if (res.x == this.right)
                    edgeNormal.x = 1;
                if (res.y == this.top)
                    edgeNormal.y = -1;
                if (res.y == this.bottom)
                    edgeNormal.y = 1;
            }
            return res;
        };
        /**
         * 创建一个新的RectangleF，该RectangleF包含两个其他矩形的重叠区域
         * @param value1
         * @param value2
         * @returns 将两个矩形的重叠区域作为输出参数
         */
        Rectangle.intersect = function (value1, value2) {
            if (value1.intersects(value2)) {
                var right_side = Math.min(value1.x + value1.width, value2.x + value2.width);
                var left_side = Math.max(value1.x, value2.x);
                var top_side = Math.max(value1.y, value2.y);
                var bottom_side = Math.min(value1.y + value1.height, value2.y + value2.height);
                return new Rectangle(left_side, top_side, right_side - left_side, bottom_side - top_side);
            }
            else {
                return new Rectangle(0, 0, 0, 0);
            }
        };
        /**
         * 改变这个矩形的位置
         * @param offsetX 要添加到这个矩形的X坐标
         * @param offsetY 要添加到这个矩形的y坐标
         */
        Rectangle.prototype.offset = function (offsetX, offsetY) {
            this.x += offsetX;
            this.y += offsetY;
        };
        /**
         * 创建一个完全包含两个其他矩形的新矩形
         * @param value1
         * @param value2
         */
        Rectangle.union = function (value1, value2) {
            var x = Math.min(value1.x, value2.x);
            var y = Math.min(value1.y, value2.y);
            return new Rectangle(x, y, Math.max(value1.right, value2.right) - x, Math.max(value1.bottom, value2.bottom) - y);
        };
        /**
         * 在矩形重叠的地方创建一个新的矩形
         * @param value1
         * @param value2
         */
        Rectangle.overlap = function (value1, value2) {
            var x = Math.max(value1.x, value2.x, 0);
            var y = Math.max(value1.y, value2.y, 0);
            return new Rectangle(x, y, Math.max(Math.min(value1.right, value2.right) - x, 0), Math.max(Math.min(value1.bottom, value2.bottom) - y, 0));
        };
        Rectangle.prototype.calculateBounds = function (parentPosition, position, origin, scale, rotation, width, height) {
            if (rotation == 0) {
                this.x = parentPosition.x + position.x - origin.x * scale.x;
                this.y = parentPosition.y + position.y - origin.y * scale.y;
                this.width = width * scale.x;
                this.height = height * scale.y;
            }
            else {
                // 我们需要找到我们的绝对最小/最大值，并据此创建边界
                var worldPosX = parentPosition.x + position.x;
                var worldPosY = parentPosition.y + position.y;
                // 考虑到原点，将参考点设置为世界参考
                this._transformMat = es.Matrix2D.createTranslation(-worldPosX - origin.x, -worldPosY - origin.y);
                this._tempMat = es.Matrix2D.createScale(scale.x, scale.y);
                this._transformMat = this._transformMat.multiply(this._tempMat);
                this._tempMat = es.Matrix2D.createRotation(rotation);
                this._transformMat = this._transformMat.multiply(this._tempMat);
                this._tempMat = es.Matrix2D.createTranslation(worldPosX, worldPosY);
                this._transformMat = this._transformMat.multiply(this._tempMat);
                // TODO: 我们可以把世界变换留在矩阵中，避免在世界空间中得到所有的四个角
                var topLeft = new es.Vector2(worldPosX, worldPosY);
                var topRight = new es.Vector2(worldPosX + width, worldPosY);
                var bottomLeft = new es.Vector2(worldPosX, worldPosY + height);
                var bottomRight = new es.Vector2(worldPosX + width, worldPosY + height);
                es.Vector2Ext.transformR(topLeft, this._transformMat, topLeft);
                es.Vector2Ext.transformR(topRight, this._transformMat, topRight);
                es.Vector2Ext.transformR(bottomLeft, this._transformMat, bottomLeft);
                es.Vector2Ext.transformR(bottomRight, this._transformMat, bottomRight);
                // 找出最小值和最大值，这样我们就可以计算出我们的边界框。
                var minX = Math.min(topLeft.x, bottomRight.x, topRight.x, bottomLeft.x);
                var maxX = Math.max(topLeft.x, bottomRight.x, topRight.x, bottomLeft.x);
                var minY = Math.min(topLeft.y, bottomRight.y, topRight.y, bottomLeft.y);
                var maxY = Math.max(topLeft.y, bottomRight.y, topRight.y, bottomLeft.y);
                this.location = new es.Vector2(minX, minY);
                this.width = maxX - minX;
                this.height = maxY - minY;
            }
        };
        /**
         * 返回一个横跨当前矩形和提供的三角形位置的矩形
         * @param deltaX
         * @param deltaY
         */
        Rectangle.prototype.getSweptBroadphaseBounds = function (deltaX, deltaY) {
            var broadphasebox = Rectangle.empty;
            broadphasebox.x = deltaX > 0 ? this.x : this.x + deltaX;
            broadphasebox.y = deltaY > 0 ? this.y : this.y + deltaY;
            broadphasebox.width = deltaX > 0 ? deltaX + this.width : this.width - deltaX;
            broadphasebox.height = deltaY > 0 ? deltaY + this.height : this.height - deltaY;
            return broadphasebox;
        };
        /**
         * 如果发生碰撞，返回true
         * moveX和moveY将返回b1为避免碰撞而必须移动的移动量
         * @param other
         * @param moveX
         * @param moveY
         */
        Rectangle.prototype.collisionCheck = function (other, moveX, moveY) {
            moveX.value = moveY.value = 0;
            var l = other.x - (this.x + this.width);
            var r = (other.x + other.width) - this.x;
            var t = (other.y - (this.y + this.height));
            var b = (other.y + other.height) - this.y;
            // 检验是否有碰撞
            if (l > 0 || r < 0 || t > 0 || b < 0)
                return false;
            // 求两边的偏移量
            moveX.value = Math.abs(l) < r ? l : r;
            moveY.value = Math.abs(t) < b ? t : b;
            // 只使用最小的偏移量
            if (Math.abs(moveX.value) < Math.abs(moveY.value))
                moveY.value = 0;
            else
                moveX.value = 0;
            return true;
        };
        /**
         * 计算两个矩形之间有符号的交点深度
         * @param rectA
         * @param rectB
         * @returns 两个相交的矩形之间的重叠量。
         * 这些深度值可以是负值，取决于矩形/相交的哪些边。
         * 这允许调用者确定正确的推送对象的方向，以解决碰撞问题。
         * 如果矩形不相交，则返回Vector2.Zero
         */
        Rectangle.getIntersectionDepth = function (rectA, rectB) {
            // 计算半尺寸
            var halfWidthA = rectA.width / 2;
            var halfHeightA = rectA.height / 2;
            var halfWidthB = rectB.width / 2;
            var halfHeightB = rectB.height / 2;
            // 计算中心
            var centerA = new es.Vector2(rectA.left + halfWidthA, rectA.top + halfHeightA);
            var centerB = new es.Vector2(rectB.left + halfWidthB, rectB.top + halfHeightB);
            // 计算当前中心间的距离和最小非相交距离
            var distanceX = centerA.x - centerB.x;
            var distanceY = centerA.y - centerB.y;
            var minDistanceX = halfWidthA + halfWidthB;
            var minDistanceY = halfHeightA + halfHeightB;
            // 如果我们根本不相交，则返回(0，0)
            if (Math.abs(distanceX) >= minDistanceX || Math.abs(distanceY) >= minDistanceY)
                return es.Vector2.zero;
            // 计算并返回交叉点深度
            var depthX = distanceX > 0 ? minDistanceX - distanceX : -minDistanceX - distanceX;
            var depthY = distanceY > 0 ? minDistanceY - distanceY : -minDistanceY - distanceY;
            return new es.Vector2(depthX, depthY);
        };
        /**
         * 比较当前实例是否等于指定的矩形
         * @param other
         */
        Rectangle.prototype.equals = function (other) {
            return this === other;
        };
        /**
         * 获取这个矩形的哈希码
         */
        Rectangle.prototype.getHashCode = function () {
            return (this.x ^ this.y ^ this.width ^ this.height);
        };
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
        return Rectangle;
    }());
    es.Rectangle = Rectangle;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 它存储值，直到累计的总数大于1。一旦超过1，该值将在调用update时添加到amount中
     * 一般用法如下:
     *
     *  let deltaMove = this.velocity * es.Time.deltaTime;
     *  deltaMove.x = this._x.update(deltaMove.x);
     *  deltaMove.y = this._y.update(deltaMove.y);
     */
    var SubpixelFloat = /** @class */ (function () {
        function SubpixelFloat() {
            this.remainder = 0;
        }
        /**
         * 以amount递增余数，将值截断，存储新的余数并将amount设置为当前值
         * @param amount
         */
        SubpixelFloat.prototype.update = function (amount) {
            this.remainder += amount;
            var motion = Math.floor(Math.trunc(this.remainder));
            this.remainder -= motion;
            amount = motion;
            return amount;
        };
        /**
         * 将余数重置为0
         */
        SubpixelFloat.prototype.reset = function () {
            this.remainder = 0;
        };
        return SubpixelFloat;
    }());
    es.SubpixelFloat = SubpixelFloat;
})(es || (es = {}));
var es;
(function (es) {
    var SubpixelVector2 = /** @class */ (function () {
        function SubpixelVector2() {
            this._x = new es.SubpixelFloat();
            this._y = new es.SubpixelFloat();
        }
        /**
         * 以数量递增s/y余数，将值截断为整数，存储新的余数并将amount设置为当前值
         * @param amount
         */
        SubpixelVector2.prototype.update = function (amount) {
            amount.x = this._x.update(amount.x);
            amount.y = this._y.update(amount.y);
        };
        /**
         * 将余数重置为0
         */
        SubpixelVector2.prototype.reset = function () {
            this._x.reset();
            this._y.reset();
        };
        return SubpixelVector2;
    }());
    es.SubpixelVector2 = SubpixelVector2;
})(es || (es = {}));
var es;
(function (es) {
    /** 2d 向量 */
    var Vector2 = /** @class */ (function () {
        /**
         * 从两个值构造一个带有X和Y的二维向量。
         * @param x 二维空间中的x坐标
         * @param y 二维空间的y坐标
         */
        function Vector2(x, y) {
            this.x = 0;
            this.y = 0;
            this.x = x ? x : 0;
            this.y = y != undefined ? y : this.x;
        }
        Object.defineProperty(Vector2, "zero", {
            get: function () {
                return new Vector2(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2, "one", {
            get: function () {
                return new Vector2(1, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2, "unitX", {
            get: function () {
                return new Vector2(1, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2, "unitY", {
            get: function () {
                return new Vector2(0, 1);
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         * @param value1
         * @param value2
         */
        Vector2.add = function (value1, value2) {
            var result = Vector2.zero;
            result.x = value1.x + value2.x;
            result.y = value1.y + value2.y;
            return result;
        };
        /**
         *
         * @param value1
         * @param value2
         */
        Vector2.divide = function (value1, value2) {
            var result = Vector2.zero;
            result.x = value1.x / value2.x;
            result.y = value1.y / value2.y;
            return result;
        };
        /**
         *
         * @param value1
         * @param value2
         */
        Vector2.multiply = function (value1, value2) {
            var result = new Vector2(0, 0);
            result.x = value1.x * value2.x;
            result.y = value1.y * value2.y;
            return result;
        };
        /**
         *
         * @param value1
         * @param value2
         */
        Vector2.subtract = function (value1, value2) {
            var result = new Vector2(0, 0);
            result.x = value1.x - value2.x;
            result.y = value1.y - value2.y;
            return result;
        };
        /**
         * 创建一个新的Vector2
         * 它包含来自另一个向量的标准化值。
         * @param value
         */
        Vector2.normalize = function (value) {
            var nValue = new Vector2(value.x, value.y);
            var val = 1 / Math.sqrt((nValue.x * nValue.x) + (nValue.y * nValue.y));
            nValue.x *= val;
            nValue.y *= val;
            return nValue;
        };
        /**
         * 返回两个向量的点积
         * @param value1
         * @param value2
         */
        Vector2.dot = function (value1, value2) {
            return (value1.x * value2.x) + (value1.y * value2.y);
        };
        /**
         * 返回两个向量之间距离的平方
         * @param value1
         * @param value2
         */
        Vector2.distanceSquared = function (value1, value2) {
            var v1 = value1.x - value2.x, v2 = value1.y - value2.y;
            return (v1 * v1) + (v2 * v2);
        };
        /**
         * 将指定的值限制在一个范围内
         * @param value1
         * @param min
         * @param max
         */
        Vector2.clamp = function (value1, min, max) {
            return new Vector2(es.MathHelper.clamp(value1.x, min.x, max.x), es.MathHelper.clamp(value1.y, min.y, max.y));
        };
        /**
         * 创建一个新的Vector2，其中包含指定向量的线性插值
         * @param value1 第一个向量
         * @param value2 第二个向量
         * @param amount 加权值(0.0-1.0之间)
         * @returns 指定向量的线性插值结果
         */
        Vector2.lerp = function (value1, value2, amount) {
            return new Vector2(es.MathHelper.lerp(value1.x, value2.x, amount), es.MathHelper.lerp(value1.y, value2.y, amount));
        };
        /**
         * 创建一个新的Vector2，该Vector2包含了通过指定的Matrix进行的二维向量变换。
         * @param position
         * @param matrix
         */
        Vector2.transform = function (position, matrix) {
            return new Vector2((position.x * matrix.m11) + (position.y * matrix.m21) + matrix.m31, (position.x * matrix.m12) + (position.y * matrix.m22) + matrix.m32);
        };
        /**
         * 返回两个向量之间的距离
         * @param value1
         * @param value2
         * @returns 两个向量之间的距离
         */
        Vector2.distance = function (value1, value2) {
            var v1 = value1.x - value2.x, v2 = value1.y - value2.y;
            return Math.sqrt((v1 * v1) + (v2 * v2));
        };
        /**
         * 返回两个向量之间的角度，单位是度数
         * @param from
         * @param to
         */
        Vector2.angle = function (from, to) {
            from = Vector2.normalize(from);
            to = Vector2.normalize(to);
            return Math.acos(es.MathHelper.clamp(Vector2.dot(from, to), -1, 1)) * es.MathHelper.Rad2Deg;
        };
        /**
         * 创建一个包含指定向量反转的新Vector2
         * @param value
         * @returns 矢量反演的结果
         */
        Vector2.negate = function (value) {
            value.x = -value.x;
            value.y = -value.y;
            return value;
        };
        /**
         *
         * @param value
         */
        Vector2.prototype.add = function (value) {
            this.x += value.x;
            this.y += value.y;
            return this;
        };
        /**
         *
         * @param value
         */
        Vector2.prototype.divide = function (value) {
            this.x /= value.x;
            this.y /= value.y;
            return this;
        };
        /**
         *
         * @param value
         */
        Vector2.prototype.multiply = function (value) {
            this.x *= value.x;
            this.y *= value.y;
            return this;
        };
        /**
         * 从当前Vector2减去一个Vector2
         * @param value 要减去的Vector2
         * @returns 当前Vector2
         */
        Vector2.prototype.subtract = function (value) {
            this.x -= value.x;
            this.y -= value.y;
            return this;
        };
        /**
         * 将这个Vector2变成一个方向相同的单位向量
         */
        Vector2.prototype.normalize = function () {
            var val = 1 / Math.sqrt((this.x * this.x) + (this.y * this.y));
            this.x *= val;
            this.y *= val;
        };
        /** 返回它的长度 */
        Vector2.prototype.length = function () {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        };
        /**
         * 返回该Vector2的平方长度
         * @returns 这个Vector2的平方长度
         */
        Vector2.prototype.lengthSquared = function () {
            return (this.x * this.x) + (this.y * this.y);
        };
        /**
         * 四舍五入X和Y值
         */
        Vector2.prototype.round = function () {
            return new Vector2(Math.round(this.x), Math.round(this.y));
        };
        /**
         * 比较当前实例是否等于指定的对象
         * @param other 要比较的对象
         * @returns 如果实例相同true 否则false
         */
        Vector2.prototype.equals = function (other) {
            if (other instanceof Vector2) {
                return other.x == this.x && other.y == this.y;
            }
            return false;
        };
        Vector2.prototype.clone = function () {
            return new Vector2(this.x, this.y);
        };
        return Vector2;
    }());
    es.Vector2 = Vector2;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 移动器使用的帮助器类，用于管理触发器碰撞器交互并调用itriggerlistener
     */
    var ColliderTriggerHelper = /** @class */ (function () {
        function ColliderTriggerHelper(entity) {
            /** 存储当前帧中发生的所有活动交点对 */
            this._activeTriggerIntersections = new es.HashSet();
            /** 存储前一帧的交点对，这样我们就可以在移动这一帧后检测到退出 */
            this._previousTriggerIntersections = new es.HashSet();
            this._tempTriggerList = [];
            this._entity = entity;
        }
        /**
         * update应该在实体被移动后被调用，它将处理任何与Colllider重叠的ITriggerListeners。
         * 它将处理任何与Collider重叠的ITriggerListeners。
         */
        ColliderTriggerHelper.prototype.update = function () {
            // 对所有实体.colliders进行重叠检查，这些实体.colliders是触发器，与所有宽相碰撞器，无论是否触发器。   
            // 任何重叠都会导致触发事件
            var colliders = this._entity.getComponents(es.Collider);
            for (var i = 0; i < colliders.length; i++) {
                var collider = colliders[i];
                var neighbors = es.Physics.boxcastBroadphase(collider.bounds, collider.collidesWithLayers);
                for (var j = 0; j < neighbors.size; j++) {
                    var neighbor = neighbors[j];
                    // 我们至少需要一个碰撞器作为触发器
                    if (!collider.isTrigger && !neighbor.isTrigger)
                        continue;
                    if (collider.overlaps(neighbor)) {
                        var pair = new es.Pair(collider, neighbor);
                        // 如果我们的某一个集合中已经有了这个对子（前一个或当前的触发交叉点），就不要调用输入事件了
                        var shouldReportTriggerEvent = !this._activeTriggerIntersections.contains(pair) &&
                            !this._previousTriggerIntersections.contains(pair);
                        if (shouldReportTriggerEvent)
                            this.notifyTriggerListeners(pair, true);
                        this._activeTriggerIntersections.add(pair);
                    }
                }
            }
            es.ListPool.free(colliders);
            this.checkForExitedColliders();
        };
        ColliderTriggerHelper.prototype.checkForExitedColliders = function () {
            // 删除所有与此帧交互的触发器，留下我们退出的触发器
            this._previousTriggerIntersections.exceptWith(this._activeTriggerIntersections.toArray());
            for (var i = 0; i < this._previousTriggerIntersections.getCount(); i++) {
                this.notifyTriggerListeners(this._previousTriggerIntersections[i], false);
            }
            this._previousTriggerIntersections.clear();
            // 添加所有当前激活的触发器
            this._previousTriggerIntersections.unionWith(this._activeTriggerIntersections.toArray());
            // 清空活动集，为下一帧做准备
            this._activeTriggerIntersections.clear();
        };
        ColliderTriggerHelper.prototype.notifyTriggerListeners = function (collisionPair, isEntering) {
            es.TriggerListenerHelper.getITriggerListener(collisionPair.first.entity, this._tempTriggerList);
            for (var i = 0; i < this._tempTriggerList.length; i++) {
                if (isEntering) {
                    this._tempTriggerList[i].onTriggerEnter(collisionPair.second, collisionPair.first);
                }
                else {
                    this._tempTriggerList[i].onTriggerExit(collisionPair.second, collisionPair.first);
                }
                this._tempTriggerList.length = 0;
                if (collisionPair.second.entity) {
                    es.TriggerListenerHelper.getITriggerListener(collisionPair.second.entity, this._tempTriggerList);
                    for (var i_2 = 0; i_2 < this._tempTriggerList.length; i_2++) {
                        if (isEntering) {
                            this._tempTriggerList[i_2].onTriggerEnter(collisionPair.first, collisionPair.second);
                        }
                        else {
                            this._tempTriggerList[i_2].onTriggerExit(collisionPair.first, collisionPair.second);
                        }
                    }
                    this._tempTriggerList.length = 0;
                }
            }
        };
        return ColliderTriggerHelper;
    }());
    es.ColliderTriggerHelper = ColliderTriggerHelper;
})(es || (es = {}));
var es;
(function (es) {
    var PointSectors;
    (function (PointSectors) {
        PointSectors[PointSectors["center"] = 0] = "center";
        PointSectors[PointSectors["top"] = 1] = "top";
        PointSectors[PointSectors["bottom"] = 2] = "bottom";
        PointSectors[PointSectors["topLeft"] = 9] = "topLeft";
        PointSectors[PointSectors["topRight"] = 5] = "topRight";
        PointSectors[PointSectors["left"] = 8] = "left";
        PointSectors[PointSectors["right"] = 4] = "right";
        PointSectors[PointSectors["bottomLeft"] = 10] = "bottomLeft";
        PointSectors[PointSectors["bottomRight"] = 6] = "bottomRight";
    })(PointSectors = es.PointSectors || (es.PointSectors = {}));
    var Collisions = /** @class */ (function () {
        function Collisions() {
        }
        Collisions.isLineToLine = function (a1, a2, b1, b2) {
            var b = es.Vector2.subtract(a2, a1);
            var d = es.Vector2.subtract(b2, b1);
            var bDotDPerp = b.x * d.y - b.y * d.x;
            // 如果b*d = 0，表示这两条直线平行，因此有无穷个交点
            if (bDotDPerp == 0)
                return false;
            var c = es.Vector2.subtract(b1, a1);
            var t = (c.x * d.y - c.y * d.x) / bDotDPerp;
            if (t < 0 || t > 1)
                return false;
            var u = (c.x * b.y - c.y * b.x) / bDotDPerp;
            if (u < 0 || u > 1)
                return false;
            return true;
        };
        Collisions.lineToLineIntersection = function (a1, a2, b1, b2) {
            var intersection = es.Vector2.zero;
            var b = es.Vector2.subtract(a2, a1);
            var d = es.Vector2.subtract(b2, b1);
            var bDotDPerp = b.x * d.y - b.y * d.x;
            // 如果b*d = 0，表示这两条直线平行，因此有无穷个交点
            if (bDotDPerp == 0)
                return intersection;
            var c = es.Vector2.subtract(b1, a1);
            var t = (c.x * d.y - c.y * d.x) / bDotDPerp;
            if (t < 0 || t > 1)
                return intersection;
            var u = (c.x * b.y - c.y * b.x) / bDotDPerp;
            if (u < 0 || u > 1)
                return intersection;
            intersection = es.Vector2.add(a1, new es.Vector2(t * b.x, t * b.y));
            return intersection;
        };
        Collisions.closestPointOnLine = function (lineA, lineB, closestTo) {
            var v = es.Vector2.subtract(lineB, lineA);
            var w = es.Vector2.subtract(closestTo, lineA);
            var t = es.Vector2.dot(w, v) / es.Vector2.dot(v, v);
            t = es.MathHelper.clamp(t, 0, 1);
            return es.Vector2.add(lineA, new es.Vector2(v.x * t, v.y * t));
        };
        Collisions.circleToCircle = function (circleCenter1, circleRadius1, circleCenter2, circleRadius2) {
            return es.Vector2.distanceSquared(circleCenter1, circleCenter2) < (circleRadius1 + circleRadius2) * (circleRadius1 + circleRadius2);
        };
        Collisions.circleToLine = function (circleCenter, radius, lineFrom, lineTo) {
            return es.Vector2.distanceSquared(circleCenter, this.closestPointOnLine(lineFrom, lineTo, circleCenter)) < radius * radius;
        };
        Collisions.circleToPoint = function (circleCenter, radius, point) {
            return es.Vector2.distanceSquared(circleCenter, point) < radius * radius;
        };
        Collisions.rectToCircle = function (rect, cPosition, cRadius) {
            if (this.rectToPoint(rect.x, rect.y, rect.width, rect.height, cPosition))
                return true;
            var edgeFrom;
            var edgeTo;
            var sector = this.getSector(rect.x, rect.y, rect.width, rect.height, cPosition);
            if ((sector & PointSectors.top) != 0) {
                edgeFrom = new es.Vector2(rect.x, rect.y);
                edgeTo = new es.Vector2(rect.x + rect.width, rect.y);
                if (this.circleToLine(cPosition, cRadius, edgeFrom, edgeTo))
                    return true;
            }
            if ((sector & PointSectors.bottom) != 0) {
                edgeFrom = new es.Vector2(rect.x, rect.y + rect.width);
                edgeTo = new es.Vector2(rect.x + rect.width, rect.y + rect.height);
                if (this.circleToLine(cPosition, cRadius, edgeFrom, edgeTo))
                    return true;
            }
            if ((sector & PointSectors.left) != 0) {
                edgeFrom = new es.Vector2(rect.x, rect.y);
                edgeTo = new es.Vector2(rect.x, rect.y + rect.height);
                if (this.circleToLine(cPosition, cRadius, edgeFrom, edgeTo))
                    return true;
            }
            if ((sector & PointSectors.right) != 0) {
                edgeFrom = new es.Vector2(rect.x + rect.width, rect.y);
                edgeTo = new es.Vector2(rect.x + rect.width, rect.y + rect.height);
                if (this.circleToLine(cPosition, cRadius, edgeFrom, edgeTo))
                    return true;
            }
            return false;
        };
        Collisions.rectToLine = function (rect, lineFrom, lineTo) {
            var fromSector = this.getSector(rect.x, rect.y, rect.width, rect.height, lineFrom);
            var toSector = this.getSector(rect.x, rect.y, rect.width, rect.height, lineTo);
            if (fromSector == PointSectors.center || toSector == PointSectors.center) {
                return true;
            }
            else if ((fromSector & toSector) != 0) {
                return false;
            }
            else {
                var both = fromSector | toSector;
                // 线对边进行检查
                var edgeFrom = void 0;
                var edgeTo = void 0;
                if ((both & PointSectors.top) != 0) {
                    edgeFrom = new es.Vector2(rect.x, rect.y);
                    edgeTo = new es.Vector2(rect.x + rect.width, rect.y);
                    if (this.isLineToLine(edgeFrom, edgeTo, lineFrom, lineTo))
                        return true;
                }
                if ((both & PointSectors.bottom) != 0) {
                    edgeFrom = new es.Vector2(rect.x, rect.y + rect.height);
                    edgeTo = new es.Vector2(rect.x + rect.width, rect.y + rect.height);
                    if (this.isLineToLine(edgeFrom, edgeTo, lineFrom, lineTo))
                        return true;
                }
                if ((both & PointSectors.left) != 0) {
                    edgeFrom = new es.Vector2(rect.x, rect.y);
                    edgeTo = new es.Vector2(rect.x, rect.y + rect.height);
                    if (this.isLineToLine(edgeFrom, edgeTo, lineFrom, lineTo))
                        return true;
                }
                if ((both & PointSectors.right) != 0) {
                    edgeFrom = new es.Vector2(rect.x + rect.width, rect.y);
                    edgeTo = new es.Vector2(rect.x + rect.width, rect.y + rect.height);
                    if (this.isLineToLine(edgeFrom, edgeTo, lineFrom, lineTo))
                        return true;
                }
            }
            return false;
        };
        Collisions.rectToPoint = function (rX, rY, rW, rH, point) {
            return point.x >= rX && point.y >= rY && point.x < rX + rW && point.y < rY + rH;
        };
        /**
         * 位标志和帮助使用Cohen–Sutherland算法
         *
         * 位标志:
         * 1001 1000 1010
         * 0001 0000 0010
         * 0101 0100 0110
         * @param rX
         * @param rY
         * @param rW
         * @param rH
         * @param point
         */
        Collisions.getSector = function (rX, rY, rW, rH, point) {
            var sector = PointSectors.center;
            if (point.x < rX)
                sector |= PointSectors.left;
            else if (point.x >= rX + rW)
                sector |= PointSectors.right;
            if (point.y < rY)
                sector |= PointSectors.top;
            else if (point.y >= rY + rH)
                sector |= PointSectors.bottom;
            return sector;
        };
        return Collisions;
    }());
    es.Collisions = Collisions;
})(es || (es = {}));
var es;
(function (es) {
    var RaycastHit = /** @class */ (function () {
        function RaycastHit(collider, fraction, distance, point, normal) {
            /**
             * 撞击发生时沿射线的距离。
             */
            this.fraction = 0;
            /**
             * 从射线原点到碰撞点的距离
             */
            this.distance = 0;
            /**
             * 世界空间中光线击中对撞机表面的点
             */
            this.point = es.Vector2.zero;
            /**
             * 被射线击中的表面的法向量
             */
            this.normal = es.Vector2.zero;
            this.collider = collider;
            this.fraction = fraction;
            this.distance = distance;
            this.point = point;
            this.centroid = es.Vector2.zero;
        }
        RaycastHit.prototype.setValues = function (collider, fraction, distance, point) {
            this.collider = collider;
            this.fraction = fraction;
            this.distance = distance;
            this.point = point;
        };
        RaycastHit.prototype.setValuesNonCollider = function (fraction, distance, point, normal) {
            this.fraction = fraction;
            this.distance = distance;
            this.point = point;
            this.normal = normal;
        };
        RaycastHit.prototype.reset = function () {
            this.collider = null;
            this.fraction = this.distance = 0;
        };
        RaycastHit.prototype.toString = function () {
            return "[RaycastHit] fraction: " + this.fraction + ", distance: " + this.distance + ", normal: " + this.normal + ", centroid: " + this.centroid + ", point: " + this.point;
        };
        return RaycastHit;
    }());
    es.RaycastHit = RaycastHit;
})(es || (es = {}));
///<reference path="./RaycastHit.ts" />
var es;
///<reference path="./RaycastHit.ts" />
(function (es) {
    var Physics = /** @class */ (function () {
        function Physics() {
        }
        Physics.reset = function () {
            this._spatialHash = new es.SpatialHash(this.spatialHashCellSize);
            this._hitArray[0].reset();
        };
        /**
         * 从SpatialHash中移除所有碰撞器
         */
        Physics.clear = function () {
            this._spatialHash.clear();
        };
        /**
         * 获取位于指定圆内的所有碰撞器
         * @param center
         * @param randius
         * @param results
         * @param layerMask
         */
        Physics.overlapCircleAll = function (center, randius, results, layerMask) {
            if (layerMask === void 0) { layerMask = -1; }
            if (results.length == 0) {
                console.error("传入了一个空的结果数组。不会返回任何结果");
                return;
            }
            return this._spatialHash.overlapCircle(center, randius, results, layerMask);
        };
        /**
         * 返回所有碰撞器与边界相交的碰撞器。bounds。请注意，这是一个broadphase检查，所以它只检查边界，不做单个碰撞到碰撞器的检查!
         * @param rect
         * @param layerMask
         */
        Physics.boxcastBroadphase = function (rect, layerMask) {
            if (layerMask === void 0) { layerMask = this.allLayers; }
            return this._spatialHash.aabbBroadphase(rect, null, layerMask);
        };
        /**
         * 返回所有与边界相交的碰撞器，不包括传入的碰撞器(self)。如果您希望为其他查询自行创建扫过的边界，则此方法非常有用
         * @param collider
         * @param rect
         * @param layerMask
         */
        Physics.boxcastBroadphaseExcludingSelf = function (collider, rect, layerMask) {
            if (layerMask === void 0) { layerMask = this.allLayers; }
            return this._spatialHash.aabbBroadphase(rect, collider, layerMask);
        };
        /**
         * 将对撞机添加到物理系统中
         * @param collider
         */
        Physics.addCollider = function (collider) {
            Physics._spatialHash.register(collider);
        };
        /**
         * 从物理系统中移除对撞机
         * @param collider
         */
        Physics.removeCollider = function (collider) {
            Physics._spatialHash.remove(collider);
        };
        /**
         * 更新物理系统中对撞机的位置。这实际上只是移除然后重新添加带有新边界的碰撞器
         * @param collider
         */
        Physics.updateCollider = function (collider) {
            this._spatialHash.remove(collider);
            this._spatialHash.register(collider);
        };
        /**
         * 返回与layerMask匹配的碰撞器的第一次命中
         * @param start
         * @param end
         * @param layerMask
         */
        Physics.linecast = function (start, end, layerMask) {
            if (layerMask === void 0) { layerMask = Physics.allLayers; }
            this._hitArray[0].reset();
            this.linecastAll(start, end, this._hitArray, layerMask);
            return this._hitArray[0];
        };
        /**
         * 通过空间散列强制执行一行，并用该行命中的任何碰撞器填充hits数组
         * @param start
         * @param end
         * @param hits
         * @param layerMask
         */
        Physics.linecastAll = function (start, end, hits, layerMask) {
            if (layerMask === void 0) { layerMask = Physics.allLayers; }
            if (hits.length == 0) {
                console.warn("传入了一个空的hits数组。没有点击会被返回");
                return 0;
            }
            return this._spatialHash.linecast(start, end, hits, layerMask);
        };
        /** 调用reset并创建一个新的SpatialHash时使用的单元格大小 */
        Physics.spatialHashCellSize = 100;
        /** 接受layerMask的所有方法的默认值 */
        Physics.allLayers = -1;
        /**
         * raycast是否检测配置为触发器的碰撞器
         */
        Physics.raycastsHitTriggers = false;
        /**
         * 在碰撞器中开始的射线/直线是否强制转换检测到那些碰撞器
         */
        Physics.raycastsStartInColliders = false;
        /**
         * 我们保留它以避免在每次raycast发生时分配它
         */
        Physics._hitArray = [
            new es.RaycastHit()
        ];
        return Physics;
    }());
    es.Physics = Physics;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 不是真正的射线(射线只有开始和方向)，作为一条线和射线。
     */
    var Ray2D = /** @class */ (function () {
        function Ray2D(position, end) {
            this.start = position;
            this.end = end;
            this.direction = es.Vector2.subtract(this.end, this.start);
        }
        return Ray2D;
    }());
    es.Ray2D = Ray2D;
})(es || (es = {}));
var es;
(function (es) {
    var SpatialHash = /** @class */ (function () {
        function SpatialHash(cellSize) {
            if (cellSize === void 0) { cellSize = 100; }
            this.gridBounds = new es.Rectangle();
            /**
             * 缓存的循环用于重叠检查
             */
            this._overlapTestCircle = new es.Circle(0);
            /**
             * 保存所有数据的字典
             */
            this._cellDict = new NumberDictionary();
            /**
             * 用于返回冲突信息的共享HashSet
             */
            this._tempHashSet = new Set();
            this._cellSize = cellSize;
            this._inverseCellSize = 1 / this._cellSize;
            this._raycastParser = new RaycastResultParser();
        }
        /**
         * 将对象添加到SpatialHash
         * @param collider
         */
        SpatialHash.prototype.register = function (collider) {
            var bounds = collider.bounds.clone();
            collider.registeredPhysicsBounds = bounds;
            var p1 = this.cellCoords(bounds.x, bounds.y);
            var p2 = this.cellCoords(bounds.right, bounds.bottom);
            // 更新边界以跟踪网格大小
            if (!this.gridBounds.contains(p1.x, p1.y)) {
                this.gridBounds = es.RectangleExt.union(this.gridBounds, p1);
            }
            if (!this.gridBounds.contains(p2.x, p2.y)) {
                this.gridBounds = es.RectangleExt.union(this.gridBounds, p2);
            }
            for (var x = p1.x; x <= p2.x; x++) {
                for (var y = p1.y; y <= p2.y; y++) {
                    // 如果没有单元格，我们需要创建它
                    var c = this.cellAtPosition(x, y, true);
                    c.push(collider);
                }
            }
        };
        /**
         * 从SpatialHash中删除对象
         * @param collider
         */
        SpatialHash.prototype.remove = function (collider) {
            var bounds = collider.registeredPhysicsBounds.clone();
            var p1 = this.cellCoords(bounds.x, bounds.y);
            var p2 = this.cellCoords(bounds.right, bounds.bottom);
            for (var x = p1.x; x <= p2.x; x++) {
                for (var y = p1.y; y <= p2.y; y++) {
                    // 单元格应该始终存在，因为这个碰撞器应该在所有查询的单元格中
                    var cell = this.cellAtPosition(x, y);
                    if (!cell)
                        console.log("\u4ECE\u4E0D\u5B58\u5728\u78B0\u649E\u5668\u7684\u5355\u5143\u683C\u4E2D\u79FB\u9664\u78B0\u649E\u5668: [" + collider + "]");
                    else
                        new linq.List(cell).remove(collider);
                }
            }
        };
        /**
         * 使用蛮力方法从SpatialHash中删除对象
         * @param obj
         */
        SpatialHash.prototype.removeWithBruteForce = function (obj) {
            this._cellDict.remove(obj);
        };
        SpatialHash.prototype.clear = function () {
            this._cellDict.clear();
        };
        /**
         * 返回边框与单元格相交的所有对象
         * @param bounds
         * @param excludeCollider
         * @param layerMask
         */
        SpatialHash.prototype.aabbBroadphase = function (bounds, excludeCollider, layerMask) {
            this._tempHashSet.clear();
            var p1 = this.cellCoords(bounds.x, bounds.y);
            var p2 = this.cellCoords(bounds.right, bounds.bottom);
            for (var x = p1.x; x <= p2.x; x++) {
                for (var y = p1.y; y <= p2.y; y++) {
                    var cell = this.cellAtPosition(x, y);
                    if (cell == null)
                        continue;
                    // 当cell不为空。循环并取回所有碰撞器
                    for (var i = 0; i < cell.length; i++) {
                        var collider = cell[i];
                        // 如果它是自身或者如果它不匹配我们的层掩码 跳过这个碰撞器
                        if (collider == excludeCollider || !es.Flags.isFlagSet(layerMask, collider.physicsLayer.value))
                            continue;
                        if (bounds.intersects(collider.bounds)) {
                            this._tempHashSet.add(collider);
                        }
                    }
                }
            }
            return this._tempHashSet;
        };
        /**
         * 通过空间散列强制执行一行，并用该行命中的任何碰撞器填充hits数组。
         * @param start
         * @param end
         * @param hits
         * @param layerMask
         */
        SpatialHash.prototype.linecast = function (start, end, hits, layerMask) {
            var ray = new es.Ray2D(start, end);
            this._raycastParser.start(ray, hits, layerMask);
            // 在与网格相同的空间中获取起始/结束位置
            var currentCell = this.cellCoords(start.x, start.y);
            var lastCell = this.cellCoords(end.x, end.y);
            var stepX = Math.sign(ray.direction.x);
            var stepY = Math.sign(ray.direction.y);
            // 我们要确保，如果我们在同一行或同一行，我们不会步进不必要的方向
            if (currentCell.x == lastCell.x)
                stepX = 0;
            if (currentCell.y == lastCell.y)
                stepY = 0;
            // 计算单元边界。当这一步是正的，下一个单元格在这一步之后意味着我们加1。
            // 如果为负，则单元格在此之前，这种情况下不添加边界
            var xStep = stepX < 0 ? 0 : stepX;
            var yStep = stepY < 0 ? 0 : stepY;
            var nextBoundaryX = (currentCell.x + xStep) * this._cellSize;
            var nextBoundaryY = (currentCell.y + yStep) * this._cellSize;
            // 确定射线穿过第一个垂直体素边界时的t值。y/horizontal。
            // 这两个值的最小值将表明我们可以沿着射线走多少，而仍然保持在当前体素中，对于接近vertical/horizontal的射线来说可能是无限的
            var tMaxX = ray.direction.x != 0 ? (nextBoundaryX - ray.start.x) / ray.direction.x : Number.MAX_VALUE;
            var tMaxY = ray.direction.y != 0 ? (nextBoundaryY - ray.start.y) / ray.direction.y : Number.MAX_VALUE;
            var tDeltaX = ray.direction.x != 0 ? this._cellSize / (ray.direction.x * stepX) : Number.MAX_VALUE;
            var tDeltaY = ray.direction.y != 0 ? this._cellSize / (ray.direction.y * stepY) : Number.MAX_VALUE;
            // 开始遍历并返回交叉单元格。
            var cell = this.cellAtPosition(currentCell.x, currentCell.y);
            if (cell && this._raycastParser.checkRayIntersection(currentCell.x, currentCell.y, cell)) {
                this._raycastParser.reset();
                return this._raycastParser.hitCounter;
            }
            while (currentCell.x != lastCell.x || currentCell.y != lastCell.y) {
                if (tMaxX < tMaxY) {
                    currentCell.x = Math.floor(es.MathHelper.approach(currentCell.x, lastCell.x, Math.abs(stepX)));
                    tMaxX += tDeltaX;
                }
                else {
                    currentCell.y = Math.floor(es.MathHelper.approach(currentCell.y, lastCell.y, Math.abs(stepY)));
                    tMaxY += tDeltaY;
                }
                cell = this.cellAtPosition(currentCell.x, currentCell.y);
                if (cell && this._raycastParser.checkRayIntersection(currentCell.x, currentCell.y, cell)) {
                    this._raycastParser.reset();
                    return this._raycastParser.hitCounter;
                }
            }
            this._raycastParser.reset();
            return this._raycastParser.hitCounter;
        };
        /**
         * 获取位于指定圆内的所有碰撞器
         * @param circleCenter
         * @param radius
         * @param results
         * @param layerMask
         */
        SpatialHash.prototype.overlapCircle = function (circleCenter, radius, results, layerMask) {
            var e_2, _a;
            var bounds = new es.Rectangle(circleCenter.x - radius, circleCenter.y - radius, radius * 2, radius * 2);
            this._overlapTestCircle.radius = radius;
            this._overlapTestCircle.position = circleCenter;
            var resultCounter = 0;
            var potentials = this.aabbBroadphase(bounds, null, layerMask);
            try {
                for (var potentials_1 = __values(potentials), potentials_1_1 = potentials_1.next(); !potentials_1_1.done; potentials_1_1 = potentials_1.next()) {
                    var collider = potentials_1_1.value;
                    if (collider instanceof es.BoxCollider) {
                        results[resultCounter] = collider;
                        resultCounter++;
                    }
                    else if (collider instanceof es.CircleCollider) {
                        if (collider.shape.overlaps(this._overlapTestCircle)) {
                            results[resultCounter] = collider;
                            resultCounter++;
                        }
                    }
                    else if (collider instanceof es.PolygonCollider) {
                        if (collider.shape.overlaps(this._overlapTestCircle)) {
                            results[resultCounter] = collider;
                            resultCounter++;
                        }
                    }
                    else {
                        throw new Error("对这个对撞机类型的overlapCircle没有实现!");
                    }
                    // 如果我们所有的结果数据有了则返回
                    if (resultCounter == results.length)
                        return resultCounter;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (potentials_1_1 && !potentials_1_1.done && (_a = potentials_1.return)) _a.call(potentials_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return resultCounter;
        };
        /**
         * 获取单元格的x,y值作为世界空间的x,y值
         * @param x
         * @param y
         */
        SpatialHash.prototype.cellCoords = function (x, y) {
            return new es.Vector2(Math.floor(x * this._inverseCellSize), Math.floor(y * this._inverseCellSize));
        };
        /**
         * 获取世界空间x,y值的单元格。
         * 如果单元格为空且createCellIfEmpty为true，则会创建一个新的单元格
         * @param x
         * @param y
         * @param createCellIfEmpty
         */
        SpatialHash.prototype.cellAtPosition = function (x, y, createCellIfEmpty) {
            if (createCellIfEmpty === void 0) { createCellIfEmpty = false; }
            var cell = this._cellDict.tryGetValue(x, y);
            if (!cell) {
                if (createCellIfEmpty) {
                    cell = [];
                    this._cellDict.add(x, y, cell);
                }
            }
            return cell;
        };
        return SpatialHash;
    }());
    es.SpatialHash = SpatialHash;
    /**
     * 包装一个Unit32，列表碰撞器字典
     * 它的主要目的是将int、int x、y坐标散列到单个Uint32键中，使用O(1)查找。
     */
    var NumberDictionary = /** @class */ (function () {
        function NumberDictionary() {
            this._store = new Map();
        }
        NumberDictionary.prototype.add = function (x, y, list) {
            this._store.set(this.getKey(x, y), list);
        };
        /**
         * 使用蛮力方法从字典存储列表中移除碰撞器
         * @param obj
         */
        NumberDictionary.prototype.remove = function (obj) {
            this._store.forEach(function (list) {
                var linqList = new linq.List(list);
                if (linqList.contains(obj))
                    linqList.remove(obj);
            });
        };
        NumberDictionary.prototype.tryGetValue = function (x, y) {
            return this._store.get(this.getKey(x, y));
        };
        NumberDictionary.prototype.getKey = function (x, y) {
            return x + "_" + y;
        };
        /**
         * 清除字典数据
         */
        NumberDictionary.prototype.clear = function () {
            this._store.clear();
        };
        return NumberDictionary;
    }());
    es.NumberDictionary = NumberDictionary;
    var RaycastResultParser = /** @class */ (function () {
        function RaycastResultParser() {
            this._tempHit = new es.RaycastHit();
            this._checkedColliders = [];
            this._cellHits = [];
        }
        RaycastResultParser.prototype.start = function (ray, hits, layerMask) {
            this._ray = ray;
            this._hits = hits;
            this._layerMask = layerMask;
            this.hitCounter = 0;
        };
        /**
         * 如果hits数组被填充，返回true。单元格不能为空!
         * @param cellX
         * @param cellY
         * @param cell
         */
        RaycastResultParser.prototype.checkRayIntersection = function (cellX, cellY, cell) {
            var fraction = new es.Ref(0);
            for (var i = 0; i < cell.length; i++) {
                var potential = cell[i];
                // 管理我们已经处理过的碰撞器
                if (new linq.List(this._checkedColliders).contains(potential))
                    continue;
                this._checkedColliders.push(potential);
                // 只有当我们被设置为这样做时才会点击触发器
                if (potential.isTrigger && !es.Physics.raycastsHitTriggers)
                    continue;
                // 确保碰撞器在图层蒙版上
                if (!es.Flags.isFlagSet(this._layerMask, potential.physicsLayer.value))
                    continue;
                // TODO: rayIntersects的性能够吗?需要测试它。Collisions.rectToLine可能更快
                // TODO: 如果边界检查返回更多数据，我们就不需要为BoxCollider检查做任何事情
                // 在做形状测试之前先做一个边界检查
                var colliderBounds = potential.bounds.clone();
                if (colliderBounds.rayIntersects(this._ray, fraction) && fraction.value <= 1) {
                    if (potential.shape.collidesWithLine(this._ray.start, this._ray.end, this._tempHit)) {
                        // 检查一下，我们应该排除这些射线，射线cast是否在碰撞器中开始
                        if (!es.Physics.raycastsStartInColliders && potential.shape.containsPoint(this._ray.start))
                            continue;
                        // TODO: 确保碰撞点在当前单元格中，如果它没有保存它以供以后计算
                        this._tempHit.collider = potential;
                        this._cellHits.push(this._tempHit);
                    }
                }
            }
            if (this._cellHits.length == 0)
                return false;
            // 所有处理单元完成。对结果进行排序并将命中结果打包到结果数组中
            this._cellHits.sort(RaycastResultParser.compareRaycastHits);
            for (var i = 0; i < this._cellHits.length; i++) {
                this._hits[this.hitCounter] = this._cellHits[i];
                // 增加命中计数器，如果它已经达到数组大小的限制，我们就完成了
                this.hitCounter++;
                if (this.hitCounter == this._hits.length)
                    return true;
            }
            return false;
        };
        RaycastResultParser.prototype.reset = function () {
            this._hits = null;
            this._checkedColliders.length = 0;
            this._cellHits.length = 0;
        };
        RaycastResultParser.compareRaycastHits = function (a, b) {
            return a.distance - b.distance;
        };
        return RaycastResultParser;
    }());
    es.RaycastResultParser = RaycastResultParser;
})(es || (es = {}));
var es;
(function (es) {
    var Shape = /** @class */ (function () {
        function Shape() {
        }
        return Shape;
    }());
    es.Shape = Shape;
})(es || (es = {}));
///<reference path="./Shape.ts" />
var es;
///<reference path="./Shape.ts" />
(function (es) {
    /**
     * 多边形
     */
    var Polygon = /** @class */ (function (_super) {
        __extends(Polygon, _super);
        /**
         * 从点构造一个多边形
         * 多边形应该以顺时针方式指定 不能重复第一个/最后一个点，它们以0 0为中心
         * @param points
         * @param isBox
         */
        function Polygon(points, isBox) {
            var _this = _super.call(this) || this;
            _this._areEdgeNormalsDirty = true;
            _this.isUnrotated = true;
            _this.setPoints(points);
            _this.isBox = isBox;
            return _this;
        }
        Object.defineProperty(Polygon.prototype, "edgeNormals", {
            /**
             * 边缘法线用于SAT碰撞检测。缓存它们用于避免squareRoots
             * box只有两个边缘 因为其他两边是平行的
             */
            get: function () {
                if (this._areEdgeNormalsDirty)
                    this.buildEdgeNormals();
                return this._edgeNormals;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 重置点并重新计算中心和边缘法线
         * @param points
         */
        Polygon.prototype.setPoints = function (points) {
            this.points = points;
            this.recalculateCenterAndEdgeNormals();
            this._originalPoints = [];
            for (var i = 0; i < this.points.length; i++) {
                this._originalPoints.push(this.points[i]);
            }
        };
        /**
         * 重新计算多边形中心
         * 如果点数改变必须调用该方法
         */
        Polygon.prototype.recalculateCenterAndEdgeNormals = function () {
            this._polygonCenter = Polygon.findPolygonCenter(this.points);
            this._areEdgeNormalsDirty = true;
        };
        /**
         * 建立多边形边缘法线
         * 它们仅由edgeNormals getter惰性创建和更新
         */
        Polygon.prototype.buildEdgeNormals = function () {
            // 对于box 我们只需要两条边，因为另外两条边是平行的
            var totalEdges = this.isBox ? 2 : this.points.length;
            if (this._edgeNormals == undefined || this._edgeNormals.length != totalEdges)
                this._edgeNormals = new Array(totalEdges);
            var p2;
            for (var i = 0; i < totalEdges; i++) {
                var p1 = this.points[i];
                if (i + 1 >= this.points.length)
                    p2 = this.points[0];
                else
                    p2 = this.points[i + 1];
                var perp = es.Vector2Ext.perpendicular(p1, p2);
                es.Vector2Ext.normalize(perp);
                this._edgeNormals[i] = perp;
            }
        };
        /**
         * 建立一个对称的多边形(六边形，八角形，n角形)并返回点
         * @param vertCount
         * @param radius
         */
        Polygon.buildSymmetricalPolygon = function (vertCount, radius) {
            var verts = new Array(vertCount);
            for (var i = 0; i < vertCount; i++) {
                var a = 2 * Math.PI * (i / vertCount);
                verts[i] = new es.Vector2(Math.cos(a) * radius, Math.sin(a) * radius);
            }
            return verts;
        };
        /**
         * 重定位多边形的点
         * @param points
         */
        Polygon.recenterPolygonVerts = function (points) {
            var center = this.findPolygonCenter(points);
            for (var i = 0; i < points.length; i++)
                points[i] = es.Vector2.subtract(points[i], center);
        };
        /**
         * 找到多边形的中心。注意，这对于正则多边形是准确的。不规则多边形没有中心。
         * @param points
         */
        Polygon.findPolygonCenter = function (points) {
            var x = 0, y = 0;
            for (var i = 0; i < points.length; i++) {
                x += points[i].x;
                y += points[i].y;
            }
            return new es.Vector2(x / points.length, y / points.length);
        };
        /**
         * 不知道辅助顶点，所以取每个顶点，如果你知道辅助顶点，执行climbing算法
         * @param points
         * @param direction
         */
        Polygon.getFarthestPointInDirection = function (points, direction) {
            var index = 0;
            var maxDot = es.Vector2.dot(points[index], direction);
            for (var i = 1; i < points.length; i++) {
                var dot = es.Vector2.dot(points[i], direction);
                if (dot > maxDot) {
                    maxDot = dot;
                    index = i;
                }
            }
            return points[index];
        };
        /**
         * 迭代多边形的所有边，并得到任意边上离点最近的点。
         * 通过最近点的平方距离和它所在的边的法线返回。
         * 点应该在多边形的空间中(点-多边形.位置)
         * @param points
         * @param point
         * @param distanceSquared
         * @param edgeNormal
         */
        Polygon.getClosestPointOnPolygonToPoint = function (points, point, distanceSquared, edgeNormal) {
            distanceSquared.value = Number.MAX_VALUE;
            edgeNormal.x = 0;
            edgeNormal.y = 0;
            var closestPoint = es.Vector2.zero;
            var tempDistanceSquared = 0;
            for (var i = 0; i < points.length; i++) {
                var j = i + 1;
                if (j == points.length)
                    j = 0;
                var closest = es.ShapeCollisions.closestPointOnLine(points[i], points[j], point);
                tempDistanceSquared = es.Vector2.distanceSquared(point, closest);
                if (tempDistanceSquared < distanceSquared.value) {
                    distanceSquared.value = tempDistanceSquared;
                    closestPoint = closest;
                    // 求直线的法线
                    var line = es.Vector2.subtract(points[j], points[i]);
                    edgeNormal.x = -line.y;
                    edgeNormal.y = line.x;
                }
            }
            es.Vector2Ext.normalize(edgeNormal);
            return closestPoint;
        };
        /**
         * 旋转原始点并复制旋转的值到旋转的点
         * @param radians
         * @param originalPoints
         * @param rotatedPoints
         */
        Polygon.rotatePolygonVerts = function (radians, originalPoints, rotatedPoints) {
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            for (var i = 0; i < originalPoints.length; i++) {
                var position = originalPoints[i];
                rotatedPoints[i] = new es.Vector2(position.x * cos + position.y * -sin, position.x * sin + position.y * cos);
            }
        };
        Polygon.prototype.recalculateBounds = function (collider) {
            // 如果我们没有旋转或不关心TRS我们使用localOffset作为中心，我们会从那开始
            this.center = collider.localOffset.clone();
            if (collider.shouldColliderScaleAndRotateWithTransform) {
                var hasUnitScale = true;
                var tempMat = void 0;
                var combinedMatrix = es.Matrix2D.createTranslation(-this._polygonCenter.x, -this._polygonCenter.y);
                if (!collider.entity.transform.scale.equals(es.Vector2.one)) {
                    tempMat = es.Matrix2D.createScale(collider.entity.transform.scale.x, collider.entity.transform.scale.y);
                    combinedMatrix = combinedMatrix.multiply(tempMat);
                    hasUnitScale = false;
                    // 缩放偏移量并将其设置为中心。如果我们有旋转，它会在下面重置
                    this.center = es.Vector2.multiply(collider.localOffset, collider.entity.transform.scale);
                }
                if (collider.entity.transform.rotation != 0) {
                    tempMat = es.Matrix2D.createRotation(collider.entity.transform.rotation);
                    combinedMatrix = combinedMatrix.multiply(tempMat);
                    // 为了处理偏移原点的旋转我们只需要将圆心在(0,0)附近移动
                    // 我们的偏移使角度为0我们还需要处理这里的比例所以我们先对偏移进行缩放以得到合适的长度。
                    var offsetAngle = Math.atan2(collider.localOffset.y * collider.entity.transform.scale.y, collider.localOffset.x * collider.entity.transform.scale.x) * es.MathHelper.Rad2Deg;
                    var offsetLength = hasUnitScale ? collider._localOffsetLength :
                        es.Vector2.multiply(collider.localOffset, collider.entity.transform.scale).length();
                    this.center = es.MathHelper.pointOnCirlce(es.Vector2.zero, offsetLength, collider.entity.transform.rotationDegrees + offsetAngle);
                }
                tempMat = es.Matrix2D.createTranslation(this._polygonCenter.x, this._polygonCenter.y);
                combinedMatrix = combinedMatrix.multiply(tempMat);
                // 最后变换原始点
                es.Vector2Ext.transform(this._originalPoints, combinedMatrix, this.points);
                this.isUnrotated = collider.entity.transform.rotation == 0;
                // 如果旋转的话，我们只需要重建边的法线
                if (collider._isRotationDirty)
                    this._areEdgeNormalsDirty = true;
            }
            this.position = es.Vector2.add(collider.entity.transform.position, this.center);
            this.bounds = es.Rectangle.rectEncompassingPoints(this.points);
            this.bounds.location = es.Vector2.add(this.bounds.location, this.position);
        };
        Polygon.prototype.overlaps = function (other) {
            var result = new es.CollisionResult();
            if (other instanceof Polygon)
                return es.ShapeCollisions.polygonToPolygon(this, other, result);
            if (other instanceof es.Circle) {
                if (es.ShapeCollisions.circleToPolygon(other, this, result)) {
                    result.invertResult();
                    return true;
                }
                return false;
            }
            throw new Error("overlaps of Pologon to " + other + " are not supported");
        };
        Polygon.prototype.collidesWithShape = function (other, result) {
            if (other instanceof Polygon) {
                return es.ShapeCollisions.polygonToPolygon(this, other, result);
            }
            if (other instanceof es.Circle) {
                if (es.ShapeCollisions.circleToPolygon(other, this, result)) {
                    result.invertResult();
                    return true;
                }
                return false;
            }
            throw new Error("overlaps of Polygon to " + other + " are not supported");
        };
        Polygon.prototype.collidesWithLine = function (start, end, hit) {
            return es.ShapeCollisions.lineToPoly(start, end, this, hit);
        };
        /**
         * 本质上，这个算法所做的就是从一个点发射一条射线。
         * 如果它与奇数条多边形边相交，我们就知道它在多边形内部。
         * @param point
         */
        Polygon.prototype.containsPoint = function (point) {
            // 将点归一化到多边形坐标空间中
            point.subtract(this.position);
            var isInside = false;
            for (var i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
                if (((this.points[i].y > point.y) != (this.points[j].y > point.y)) &&
                    (point.x < (this.points[j].x - this.points[i].x) * (point.y - this.points[i].y) / (this.points[j].y - this.points[i].y) +
                        this.points[i].x)) {
                    isInside = !isInside;
                }
            }
            return isInside;
        };
        Polygon.prototype.pointCollidesWithShape = function (point, result) {
            return es.ShapeCollisions.pointToPoly(point, this, result);
        };
        return Polygon;
    }(es.Shape));
    es.Polygon = Polygon;
})(es || (es = {}));
///<reference path="./Polygon.ts" />
var es;
///<reference path="./Polygon.ts" />
(function (es) {
    /**
     * 多边形的特殊情况。在进行SAT碰撞检查时，我们只需要检查2个轴而不是8个轴
     */
    var Box = /** @class */ (function (_super) {
        __extends(Box, _super);
        function Box(width, height) {
            var _this = _super.call(this, Box.buildBox(width, height), true) || this;
            _this.width = width;
            _this.height = height;
            return _this;
        }
        /**
         * 在一个盒子的形状中建立多边形需要的点的帮助方法
         * @param width
         * @param height
         */
        Box.buildBox = function (width, height) {
            // 我们在(0,0)的中心周围创建点
            var halfWidth = width / 2;
            var halfHeight = height / 2;
            var verts = new Array(4);
            verts[0] = new es.Vector2(-halfWidth, -halfHeight);
            verts[1] = new es.Vector2(halfWidth, -halfHeight);
            verts[2] = new es.Vector2(halfWidth, halfHeight);
            verts[3] = new es.Vector2(-halfWidth, halfHeight);
            return verts;
        };
        /**
         * 更新框点，重新计算中心，设置宽度/高度
         * @param width
         * @param height
         */
        Box.prototype.updateBox = function (width, height) {
            this.width = width;
            this.height = height;
            // 我们在(0,0)的中心周围创建点
            var halfWidth = width / 2;
            var halfHeight = height / 2;
            this.points[0] = new es.Vector2(-halfWidth, -halfHeight);
            this.points[1] = new es.Vector2(halfWidth, -halfHeight);
            this.points[2] = new es.Vector2(halfWidth, halfHeight);
            this.points[3] = new es.Vector2(-halfWidth, halfHeight);
            for (var i = 0; i < this.points.length; i++)
                this._originalPoints[i] = this.points[i];
        };
        Box.prototype.overlaps = function (other) {
            // 特殊情况，这一个高性能方式实现，其他情况则使用polygon方法检测
            if (this.isUnrotated) {
                if (other instanceof Box && other.isUnrotated)
                    return this.bounds.intersects(other.bounds);
                if (other instanceof es.Circle)
                    return es.Collisions.rectToCircle(this.bounds, other.position, other.radius);
            }
            return _super.prototype.overlaps.call(this, other);
        };
        Box.prototype.collidesWithShape = function (other, result) {
            // 特殊情况，这一个高性能方式实现，其他情况则使用polygon方法检测
            if (other instanceof Box && other.isUnrotated) {
                return es.ShapeCollisions.boxToBox(this, other, result);
            }
            // TODO: 让 minkowski 运行于 cricleToBox
            return _super.prototype.collidesWithShape.call(this, other, result);
        };
        Box.prototype.containsPoint = function (point) {
            if (this.isUnrotated)
                return this.bounds.contains(point.x, point.y);
            return _super.prototype.containsPoint.call(this, point);
        };
        Box.prototype.pointCollidesWithShape = function (point, result) {
            if (this.isUnrotated)
                return es.ShapeCollisions.pointToBox(point, this, result);
            return _super.prototype.pointCollidesWithShape.call(this, point, result);
        };
        return Box;
    }(es.Polygon));
    es.Box = Box;
})(es || (es = {}));
///<reference path="./Shape.ts" />
var es;
///<reference path="./Shape.ts" />
(function (es) {
    var Circle = /** @class */ (function (_super) {
        __extends(Circle, _super);
        function Circle(radius) {
            var _this = _super.call(this) || this;
            _this.radius = radius;
            _this._originalRadius = radius;
            return _this;
        }
        Circle.prototype.recalculateBounds = function (collider) {
            // 如果我们没有旋转或不关心TRS我们使用localOffset作为中心
            this.center = collider.localOffset;
            if (collider.shouldColliderScaleAndRotateWithTransform) {
                // 我们只将直线缩放为一个圆，所以我们将使用最大值
                var scale = collider.entity.transform.scale;
                var hasUnitScale = scale.x == 1 && scale.y == 1;
                var maxScale = Math.max(scale.x, scale.y);
                this.radius = this._originalRadius * maxScale;
                if (collider.entity.transform.rotation != 0) {
                    // 为了处理偏移原点的旋转，我们只需要将圆心围绕(0,0)在一个圆上移动，我们的偏移量就是0角
                    var offsetAngle = Math.atan2(collider.localOffset.y, collider.localOffset.x) * es.MathHelper.Rad2Deg;
                    var offsetLength = hasUnitScale ? collider._localOffsetLength : es.Vector2.multiply(collider.localOffset, collider.entity.transform.scale).length();
                    this.center = es.MathHelper.pointOnCirlce(es.Vector2.zero, offsetLength, collider.entity.transform.rotationDegrees + offsetAngle);
                }
            }
            this.position = es.Vector2.add(collider.entity.transform.position, this.center);
            this.bounds = new es.Rectangle(this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
        };
        Circle.prototype.overlaps = function (other) {
            var result = new es.CollisionResult();
            if (other instanceof es.Box && other.isUnrotated)
                return es.Collisions.rectToCircle(other.bounds, this.position, this.radius);
            if (other instanceof Circle)
                return es.Collisions.circleToCircle(this.position, this.radius, other.position, other.radius);
            if (other instanceof es.Polygon)
                return es.ShapeCollisions.circleToPolygon(this, other, result);
            throw new Error("overlaps of circle to " + other + " are not supported");
        };
        Circle.prototype.collidesWithShape = function (other, result) {
            if (other instanceof es.Box && other.isUnrotated) {
                return es.ShapeCollisions.circleToBox(this, other, result);
            }
            if (other instanceof Circle) {
                return es.ShapeCollisions.circleToCircle(this, other, result);
            }
            if (other instanceof es.Polygon) {
                return es.ShapeCollisions.circleToPolygon(this, other, result);
            }
            throw new Error("Collisions of Circle to " + other + " are not supported");
        };
        Circle.prototype.collidesWithLine = function (start, end, hit) {
            return es.ShapeCollisions.lineToCircle(start, end, this, hit);
        };
        /**
         * 获取所提供的点是否在此范围内
         * @param point
         */
        Circle.prototype.containsPoint = function (point) {
            return (es.Vector2.subtract(point, this.position)).lengthSquared() <= this.radius * this.radius;
        };
        Circle.prototype.pointCollidesWithShape = function (point, result) {
            return es.ShapeCollisions.pointToCircle(point, this, result);
        };
        return Circle;
    }(es.Shape));
    es.Circle = Circle;
})(es || (es = {}));
var es;
(function (es) {
    var CollisionResult = /** @class */ (function () {
        function CollisionResult() {
            /**
             * 被形状击中的表面的法向量
             */
            this.normal = es.Vector2.zero;
            /**
             * 应用于第一个形状以推入形状的转换
             */
            this.minimumTranslationVector = es.Vector2.zero;
            /**
             * 不是所有冲突类型都使用!在依赖这个字段之前，请检查ShapeCollisions切割类!
             */
            this.point = es.Vector2.zero;
        }
        /**
         * 改变最小平移向量，如果没有相同方向上的运动，它将移除平移的x分量。
         * @param deltaMovement
         */
        CollisionResult.prototype.removeHorizontal = function (deltaMovement) {
            // 检查是否需要横向移动，如果需要，移除并固定响应
            if (Math.sign(this.normal.x) != Math.sign(deltaMovement.x) || (deltaMovement.x == 0 && this.normal.x != 0)) {
                var responseDistance = this.minimumTranslationVector.length();
                var fix = responseDistance / this.normal.y;
                // 检查一些边界情况。因为我们除以法线 使得x == 1和一个非常小的y这将导致一个巨大的固定值
                if (Math.abs(this.normal.x) != 1 && Math.abs(fix) < Math.abs(deltaMovement.y * 3)) {
                    this.minimumTranslationVector = new es.Vector2(0, -fix);
                }
            }
        };
        CollisionResult.prototype.invertResult = function () {
            this.minimumTranslationVector = es.Vector2.negate(this.minimumTranslationVector);
            this.normal = es.Vector2.negate(this.normal);
            return this;
        };
        CollisionResult.prototype.toString = function () {
            return "[CollisionResult] normal: " + this.normal + ", minimumTranslationVector: " + this.minimumTranslationVector;
        };
        return CollisionResult;
    }());
    es.CollisionResult = CollisionResult;
})(es || (es = {}));
var es;
(function (es) {
    var RealtimeCollisions = /** @class */ (function () {
        function RealtimeCollisions() {
        }
        RealtimeCollisions.intersectMovingCircleBox = function (s, b, movement, time) {
            // 计算用球面半径r inflate b得到的AABB
            var e = b.bounds;
            e.inflate(s.radius, s.radius);
            // 射线与展开矩形e相交。如果射线错过了e，则退出不相交，否则得到相交点p和时间t
            var ray = new es.Ray2D(es.Vector2.subtract(s.position, movement), s.position);
            if (!e.rayIntersects(ray, time) && time.value > 1)
                return false;
            // 求交点
            var point = es.Vector2.add(ray.start, es.Vector2.add(ray.direction, new es.Vector2(time.value)));
            // 计算b的最小面和最大面p的交点在哪个面之外。注意，u和v不能有相同的位集，它们之间必须至少有一个位集。
            var u, v = 0;
            if (point.x < b.bounds.left)
                u |= 1;
            if (point.x > b.bounds.right)
                v |= 1;
            if (point.y < b.bounds.top)
                u |= 2;
            if (point.y > b.bounds.bottom)
                v |= 2;
            // 将所有位集合成位掩码(注意u + v == u | v)
            var m = u + v;
            // 如果所有的3位都被设置，那么点在一个顶点区域
            if (m == 3) {
                // 现在必须相交的部分，如果一个或多个击中对胶囊的两边会合在斜面和返回的最佳时间
                // TODO: 需要实现这个
                console.log("m == 3. corner " + es.Time.frameCount);
            }
            // 如果m中只设置了一个位，那么点在一个面区域
            if ((m & (m - 1)) == 0) {
                // 什么也不做。从扩展矩形交集的时间是正确的时间
                return true;
            }
            // 点在边缘区域上。与边缘相交。
            return true;
        };
        return RealtimeCollisions;
    }());
    es.RealtimeCollisions = RealtimeCollisions;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 各种形状的碰撞例程
     * 大多数人都希望第一个形状位于第二个形状的空间内(即shape1)
     * pos应该设置为shape1。pos - shape2.pos)。
     */
    var ShapeCollisions = /** @class */ (function () {
        function ShapeCollisions() {
        }
        /**
         * 检查两个多边形之间的碰撞
         * @param first
         * @param second
         * @param result
         */
        ShapeCollisions.polygonToPolygon = function (first, second, result) {
            var isIntersecting = true;
            var firstEdges = first.edgeNormals;
            var secondEdges = second.edgeNormals;
            var minIntervalDistance = Number.POSITIVE_INFINITY;
            var translationAxis = new es.Vector2();
            var polygonOffset = es.Vector2.subtract(first.position, second.position);
            var axis;
            // 循环穿过两个多边形的所有边
            for (var edgeIndex = 0; edgeIndex < firstEdges.length + secondEdges.length; edgeIndex++) {
                // 1. 找出当前多边形是否相交
                // 多边形的归一化轴垂直于缓存给我们的当前边
                if (edgeIndex < firstEdges.length) {
                    axis = firstEdges[edgeIndex];
                }
                else {
                    axis = secondEdges[edgeIndex - firstEdges.length];
                }
                // 求多边形在当前轴上的投影
                var minA = new es.Ref(0);
                var minB = new es.Ref(0);
                var maxA = new es.Ref(0);
                var maxB = new es.Ref(0);
                var intervalDist = 0;
                this.getInterval(axis, first, minA, maxA);
                this.getInterval(axis, second, minB, maxB);
                // 将区间设为第二个多边形的空间。由轴上投影的位置差偏移。
                var relativeIntervalOffset = es.Vector2.dot(polygonOffset, axis);
                minA.value += relativeIntervalOffset;
                maxA.value += relativeIntervalOffset;
                // 检查多边形投影是否正在相交
                intervalDist = this.intervalDistance(minA.value, maxA.value, minB.value, maxB.value);
                if (intervalDist > 0)
                    isIntersecting = false;
                // 对于多对多数据类型转换，添加一个Vector2?参数称为deltaMovement。为了提高速度，我们这里不使用它
                // TODO: 现在找出多边形是否会相交。只要检查速度就行了
                // 如果多边形不相交，也不会相交，退出循环
                if (!isIntersecting)
                    return false;
                // 检查当前间隔距离是否为最小值。如果是，则存储间隔距离和当前距离。这将用于计算最小平移向量
                intervalDist = Math.abs(intervalDist);
                if (intervalDist < minIntervalDistance) {
                    minIntervalDistance = intervalDist;
                    translationAxis = axis;
                    if (es.Vector2.dot(translationAxis, polygonOffset) < 0)
                        translationAxis = new es.Vector2(-translationAxis.x, -translationAxis.y);
                }
            }
            // 利用最小平移向量对多边形进行推入。
            result.normal = translationAxis;
            result.minimumTranslationVector = new es.Vector2(-translationAxis.x * minIntervalDistance, -translationAxis.y * minIntervalDistance);
            return true;
        };
        /**
         * 计算[minA, maxA]和[minB, maxB]之间的距离。如果间隔重叠，距离是负的
         * @param minA
         * @param maxA
         * @param minB
         * @param maxB
         */
        ShapeCollisions.intervalDistance = function (minA, maxA, minB, maxB) {
            if (minA < minB)
                return minB - maxA;
            return minA - minB;
        };
        /**
         * 计算一个多边形在一个轴上的投影，并返回一个[min，max]区间
         * @param axis
         * @param polygon
         * @param min
         * @param max
         */
        ShapeCollisions.getInterval = function (axis, polygon, min, max) {
            var dot = es.Vector2.dot(polygon.points[0], axis);
            min.value = max.value = dot;
            for (var i = 1; i < polygon.points.length; i++) {
                dot = es.Vector2.dot(polygon.points[i], axis);
                if (dot < min.value) {
                    min.value = dot;
                }
                else if (dot > max.value) {
                    max.value = dot;
                }
            }
        };
        /**
         *
         * @param circle
         * @param polygon
         * @param result
         */
        ShapeCollisions.circleToPolygon = function (circle, polygon, result) {
            // 圆圈在多边形中的位置坐标
            var poly2Circle = es.Vector2.subtract(circle.position, polygon.position);
            // 首先，我们需要找到从圆到多边形的最近距离
            var distanceSquared = new es.Ref(0);
            var closestPoint = es.Polygon.getClosestPointOnPolygonToPoint(polygon.points, poly2Circle, distanceSquared, result.normal);
            // 确保距离的平方小于半径的平方，否则我们不会相撞。
            // 请注意，如果圆完全包含在多边形中，距离可能大于半径。
            // 正因为如此，我们还要确保圆的位置不在多边形内。
            var circleCenterInsidePoly = polygon.containsPoint(circle.position);
            if (distanceSquared.value > circle.radius * circle.radius && !circleCenterInsidePoly)
                return false;
            // 算出MTV。我们要注意处理完全包含在多边形中的圆或包含其中心的圆
            var mtv;
            if (circleCenterInsidePoly) {
                mtv = es.Vector2.multiply(result.normal, new es.Vector2(Math.sqrt(distanceSquared.value) - circle.radius));
            }
            else {
                // 如果我们没有距离，这意味着圆心在多边形的边缘上。只需根据它的半径移动它
                if (distanceSquared.value == 0) {
                    mtv = new es.Vector2(result.normal.x * circle.radius, result.normal.y * circle.radius);
                }
                else {
                    var distance = Math.sqrt(distanceSquared.value);
                    mtv = new es.Vector2(-poly2Circle.x + closestPoint.x, -poly2Circle.y + closestPoint.y)
                        .multiply(new es.Vector2((circle.radius - distance) / distance));
                }
            }
            result.minimumTranslationVector = mtv;
            result.point = es.Vector2.add(closestPoint, polygon.position);
            return true;
        };
        /**
         * 适用于圆心在方框内以及只与方框外圆心重叠的圆。
         * @param circle
         * @param box
         * @param result
         */
        ShapeCollisions.circleToBox = function (circle, box, result) {
            var closestPointOnBounds = box.bounds.getClosestPointOnRectangleBorderToPoint(circle.position, result.normal);
            // 处理那些中心在盒子里的圆，因为比较好操作，
            if (box.containsPoint(circle.position)) {
                result.point = closestPointOnBounds;
                // 计算mtv。找到安全的，没有碰撞的位置，然后从那里得到mtv
                var safePlace = es.Vector2.add(closestPointOnBounds, es.Vector2.multiply(result.normal, new es.Vector2(circle.radius)));
                result.minimumTranslationVector = es.Vector2.subtract(circle.position, safePlace);
                return true;
            }
            var sqrDistance = es.Vector2.distanceSquared(closestPointOnBounds, circle.position);
            // 看盒子上的点与圆的距离是否小于半径
            if (sqrDistance == 0) {
                result.minimumTranslationVector = es.Vector2.multiply(result.normal, new es.Vector2(circle.radius));
            }
            else if (sqrDistance <= circle.radius * circle.radius) {
                result.normal = es.Vector2.subtract(circle.position, closestPointOnBounds);
                var depth = result.normal.length() - circle.radius;
                result.point = closestPointOnBounds;
                es.Vector2Ext.normalize(result.normal);
                result.minimumTranslationVector = es.Vector2.multiply(new es.Vector2(depth), result.normal);
                return true;
            }
            return false;
        };
        /**
         *
         * @param point
         * @param circle
         * @param result
         */
        ShapeCollisions.pointToCircle = function (point, circle, result) {
            var distanceSquared = es.Vector2.distanceSquared(point, circle.position);
            var sumOfRadii = 1 + circle.radius;
            var collided = distanceSquared < sumOfRadii * sumOfRadii;
            if (collided) {
                result.normal = es.Vector2.normalize(es.Vector2.subtract(point, circle.position));
                var depth = sumOfRadii - Math.sqrt(distanceSquared);
                result.minimumTranslationVector = es.Vector2.multiply(new es.Vector2(-depth, -depth), result.normal);
                result.point = es.Vector2.add(circle.position, es.Vector2.multiply(result.normal, new es.Vector2(circle.radius, circle.radius)));
                return true;
            }
            return false;
        };
        ShapeCollisions.pointToBox = function (point, box, result) {
            if (box.containsPoint(point)) {
                // 在方框的空间里找到点
                result.point = box.bounds.getClosestPointOnRectangleBorderToPoint(point, result.normal);
                result.minimumTranslationVector = es.Vector2.subtract(point, result.point);
                return true;
            }
            return false;
        };
        /**
         *
         * @param lineA
         * @param lineB
         * @param closestTo
         */
        ShapeCollisions.closestPointOnLine = function (lineA, lineB, closestTo) {
            var v = es.Vector2.subtract(lineB, lineA);
            var w = es.Vector2.subtract(closestTo, lineA);
            var t = es.Vector2.dot(w, v) / es.Vector2.dot(v, v);
            t = es.MathHelper.clamp(t, 0, 1);
            return es.Vector2.add(lineA, es.Vector2.multiply(v, new es.Vector2(t, t)));
        };
        /**
         *
         * @param point
         * @param poly
         * @param result
         */
        ShapeCollisions.pointToPoly = function (point, poly, result) {
            if (poly.containsPoint(point)) {
                var distanceSquared = new es.Ref(0);
                var closestPoint = es.Polygon.getClosestPointOnPolygonToPoint(poly.points, es.Vector2.subtract(point, poly.position), distanceSquared, result.normal);
                result.minimumTranslationVector = es.Vector2.multiply(result.normal, new es.Vector2(Math.sqrt(distanceSquared.value), Math.sqrt(distanceSquared.value)));
                result.point = es.Vector2.add(closestPoint, poly.position);
                return true;
            }
            return false;
        };
        /**
         *
         * @param first
         * @param second
         * @param result
         */
        ShapeCollisions.circleToCircle = function (first, second, result) {
            var distanceSquared = es.Vector2.distanceSquared(first.position, second.position);
            var sumOfRadii = first.radius + second.radius;
            var collided = distanceSquared < sumOfRadii * sumOfRadii;
            if (collided) {
                result.normal = es.Vector2.normalize(es.Vector2.subtract(first.position, second.position));
                var depth = sumOfRadii - Math.sqrt(distanceSquared);
                result.minimumTranslationVector = es.Vector2.multiply(new es.Vector2(-depth), result.normal);
                result.point = es.Vector2.add(second.position, es.Vector2.multiply(result.normal, new es.Vector2(second.radius)));
                return true;
            }
            return false;
        };
        /**
         *
         * @param first
         * @param second
         * @param result
         */
        ShapeCollisions.boxToBox = function (first, second, result) {
            var minkowskiDiff = this.minkowskiDifference(first, second);
            if (minkowskiDiff.contains(0, 0)) {
                // 计算MTV。如果它是零，我们就可以称它为非碰撞
                result.minimumTranslationVector = minkowskiDiff.getClosestPointOnBoundsToOrigin();
                if (result.minimumTranslationVector.equals(es.Vector2.zero))
                    return false;
                result.normal = new es.Vector2(-result.minimumTranslationVector.x, -result.minimumTranslationVector.y);
                result.normal.normalize();
                return true;
            }
            return false;
        };
        ShapeCollisions.minkowskiDifference = function (first, second) {
            // 我们需要第一个框的左上角
            // 碰撞器只会修改运动的位置所以我们需要用位置来计算出运动是什么。
            var positionOffset = es.Vector2.subtract(first.position, es.Vector2.add(first.bounds.location, es.Vector2.divide(first.bounds.size, new es.Vector2(2))));
            var topLeft = es.Vector2.subtract(es.Vector2.add(first.bounds.location, positionOffset), second.bounds.max);
            var fullSize = es.Vector2.add(first.bounds.size, second.bounds.size);
            return new es.Rectangle(topLeft.x, topLeft.y, fullSize.x, fullSize.y);
        };
        ShapeCollisions.lineToPoly = function (start, end, polygon, hit) {
            var normal = es.Vector2.zero;
            var intersectionPoint = es.Vector2.zero;
            var fraction = Number.MAX_VALUE;
            var hasIntersection = false;
            for (var j = polygon.points.length - 1, i = 0; i < polygon.points.length; j = i, i++) {
                var edge1 = es.Vector2.add(polygon.position, polygon.points[j]);
                var edge2 = es.Vector2.add(polygon.position, polygon.points[i]);
                var intersection = es.Vector2.zero;
                if (this.lineToLine(edge1, edge2, start, end, intersection)) {
                    hasIntersection = true;
                    // TODO: 这是得到分数的正确和最有效的方法吗?
                    // 先检查x分数。如果是NaN，就用y代替
                    var distanceFraction = (intersection.x - start.x) / (end.x - start.x);
                    if (Number.isNaN(distanceFraction) || Number.isFinite(distanceFraction))
                        distanceFraction = (intersection.y - start.y) / (end.y - start.y);
                    if (distanceFraction < fraction) {
                        var edge = es.Vector2.subtract(edge2, edge1);
                        normal = new es.Vector2(edge.y, -edge.x);
                        fraction = distanceFraction;
                        intersectionPoint = intersection;
                    }
                }
            }
            if (hasIntersection) {
                normal.normalize();
                var distance = es.Vector2.distance(start, intersectionPoint);
                hit.setValuesNonCollider(fraction, distance, intersectionPoint, normal);
                return true;
            }
            return false;
        };
        ShapeCollisions.lineToLine = function (a1, a2, b1, b2, intersection) {
            var b = es.Vector2.subtract(a2, a1);
            var d = es.Vector2.subtract(b2, b1);
            var bDotDPerp = b.x * d.y - b.y * d.x;
            // 如果b*d = 0，表示这两条直线平行，因此有无穷个交点
            if (bDotDPerp == 0)
                return false;
            var c = es.Vector2.subtract(b1, a1);
            var t = (c.x * d.y - c.y * d.x) / bDotDPerp;
            if (t < 0 || t > 1)
                return false;
            var u = (c.x * b.y - c.y * b.x) / bDotDPerp;
            if (u < 0 || u > 1)
                return false;
            intersection = es.Vector2.add(a1, es.Vector2.multiply(new es.Vector2(t), b));
            return true;
        };
        ShapeCollisions.lineToCircle = function (start, end, s, hit) {
            // 计算这里的长度并分别对d进行标准化，因为如果我们命中了我们需要它来得到分数
            var lineLength = es.Vector2.distance(start, end);
            var d = es.Vector2.divide(es.Vector2.subtract(end, start), new es.Vector2(lineLength));
            var m = es.Vector2.subtract(start, s.position);
            var b = es.Vector2.dot(m, d);
            var c = es.Vector2.dot(m, m) - s.radius * s.radius;
            // 如果r的原点在s之外，(c>0)和r指向s (b>0) 则返回
            if (c > 0 && b > 0)
                return false;
            var discr = b * b - c;
            // 线不在圆圈上
            if (discr < 0)
                return false;
            // 射线相交圆
            hit.fraction = -b - Math.sqrt(discr);
            // 如果分数为负数，射线从圈内开始，
            if (hit.fraction < 0)
                hit.fraction = 0;
            hit.point = es.Vector2.add(start, es.Vector2.multiply(new es.Vector2(hit.fraction), d));
            hit.distance = es.Vector2.distance(start, hit.point);
            hit.normal = es.Vector2.normalize(es.Vector2.subtract(hit.point, s.position));
            hit.fraction = hit.distance / lineLength;
            return true;
        };
        /**
         * 用second检查被deltaMovement移动的框的结果
         * @param first
         * @param second
         * @param movement
         * @param hit
         */
        ShapeCollisions.boxToBoxCast = function (first, second, movement, hit) {
            // 首先，我们检查是否有重叠。如果有重叠，我们就不做扫描测试
            var minkowskiDiff = this.minkowskiDifference(first, second);
            if (minkowskiDiff.contains(0, 0)) {
                // 计算MTV。如果它是零，我们就可以称它为非碰撞
                var mtv = minkowskiDiff.getClosestPointOnBoundsToOrigin();
                if (mtv.equals(es.Vector2.zero))
                    return false;
                hit.normal = new es.Vector2(-mtv.x);
                hit.normal.normalize();
                hit.distance = 0;
                hit.fraction = 0;
                return true;
            }
            else {
                // 射线投射移动矢量
                var ray = new es.Ray2D(es.Vector2.zero, new es.Vector2(-movement.x));
                var fraction = new es.Ref(0);
                if (minkowskiDiff.rayIntersects(ray, fraction) && fraction.value <= 1) {
                    hit.fraction = fraction.value;
                    hit.distance = movement.length() * fraction.value;
                    hit.normal = new es.Vector2(-movement.x, -movement.y);
                    hit.normal.normalize();
                    hit.centroid = es.Vector2.add(first.bounds.center, es.Vector2.multiply(movement, new es.Vector2(fraction.value)));
                    return true;
                }
            }
            return false;
        };
        return ShapeCollisions;
    }());
    es.ShapeCollisions = ShapeCollisions;
})(es || (es = {}));
var ArrayUtils = /** @class */ (function () {
    function ArrayUtils() {
    }
    /**
     * 执行冒泡排序
     * @param    ary
     * 算法参考 -- http://www.hiahia.org/datastructure/paixu/paixu8.3.1.1-1.htm
     */
    ArrayUtils.bubbleSort = function (ary) {
        var isExchange = false;
        for (var i = 0; i < ary.length; i++) {
            isExchange = false;
            for (var j = ary.length - 1; j > i; j--) {
                if (ary[j] < ary[j - 1]) {
                    var temp = ary[j];
                    ary[j] = ary[j - 1];
                    ary[j - 1] = temp;
                    isExchange = true;
                }
            }
            if (!isExchange)
                break;
        }
    };
    /**
     * 执行插入排序
     * @param ary
     */
    ArrayUtils.insertionSort = function (ary) {
        var len = ary.length;
        for (var i = 1; i < len; i++) {
            var val = ary[i];
            for (var j = i; j > 0 && ary[j - 1] > val; j--) {
                ary[j] = ary[j - 1];
            }
            ary[j] = val;
        }
    };
    /**
     * 执行二分搜索
     * @param ary 搜索的数组（必须排序过）
     * @param value 需要搜索的值
     * @returns 返回匹配结果的数组索引
     */
    ArrayUtils.binarySearch = function (ary, value) {
        var startIndex = 0;
        var endIndex = ary.length;
        var sub = (startIndex + endIndex) >> 1;
        while (startIndex < endIndex) {
            if (value <= ary[sub])
                endIndex = sub;
            else if (value >= ary[sub])
                startIndex = sub + 1;
            sub = (startIndex + endIndex) >> 1;
        }
        if (ary[startIndex] == value)
            return startIndex;
        return -1;
    };
    /**
     * 返回匹配项的索引
     * @param ary
     * @param num
     */
    ArrayUtils.findElementIndex = function (ary, num) {
        var len = ary.length;
        for (var i = 0; i < len; ++i) {
            if (ary[i] == num)
                return i;
        }
        return null;
    };
    /**
     * 返回数组中最大值的索引
     * @param ary
     */
    ArrayUtils.getMaxElementIndex = function (ary) {
        var matchIndex = 0;
        var len = ary.length;
        for (var j = 1; j < len; j++) {
            if (ary[j] > ary[matchIndex])
                matchIndex = j;
        }
        return matchIndex;
    };
    /**
     * 返回数组中最小值的索引
     * @param ary
     */
    ArrayUtils.getMinElementIndex = function (ary) {
        var matchIndex = 0;
        var len = ary.length;
        for (var j = 1; j < len; j++) {
            if (ary[j] < ary[matchIndex])
                matchIndex = j;
        }
        return matchIndex;
    };
    /**
     * 返回一个"唯一性"数组
     * @param ary 需要唯一性的数组
     * @returns 唯一性的数组
     *
     * @tutorial
     * 比如: [1, 2, 2, 3, 4]
     * 返回: [1, 2, 3, 4]
     */
    ArrayUtils.getUniqueAry = function (ary) {
        var uAry = [];
        var newAry = [];
        var count = ary.length;
        for (var i = 0; i < count; ++i) {
            var value = ary[i];
            if (uAry.indexOf(value) == -1)
                uAry.push(value);
        }
        count = uAry.length;
        for (var i = count - 1; i >= 0; --i) {
            newAry.unshift(uAry[i]);
        }
        return newAry;
    };
    /**
     * 返回2个数组中不同的部分
     * 比如数组A = [1, 2, 3, 4, 6]
     *    数组B = [0, 2, 1, 3, 4]
     * 返回[6, 0]
     * @param    aryA
     * @param    aryB
     * @return
     */
    ArrayUtils.getDifferAry = function (aryA, aryB) {
        aryA = this.getUniqueAry(aryA);
        aryB = this.getUniqueAry(aryB);
        var ary = aryA.concat(aryB);
        var uObj = {};
        var newAry = [];
        var count = ary.length;
        for (var j = 0; j < count; ++j) {
            if (!uObj[ary[j]]) {
                uObj[ary[j]] = {};
                uObj[ary[j]].count = 0;
                uObj[ary[j]].key = ary[j];
                uObj[ary[j]].count++;
            }
            else {
                if (uObj[ary[j]] instanceof Object) {
                    uObj[ary[j]].count++;
                }
            }
        }
        for (var i in uObj) {
            if (uObj[i].count != 2) {
                newAry.unshift(uObj[i].key);
            }
        }
        return newAry;
    };
    /**
     * 交换数组元素
     * @param    array    目标数组
     * @param    index1    交换后的索引
     * @param    index2    交换前的索引
     */
    ArrayUtils.swap = function (array, index1, index2) {
        var temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    };
    /**
     * 清除列表
     * @param ary
     */
    ArrayUtils.clearList = function (ary) {
        if (!ary)
            return;
        var length = ary.length;
        for (var i = length - 1; i >= 0; i -= 1) {
            ary.splice(i, 1);
        }
    };
    /**
     * 克隆一个数组
     * @param    ary 需要克隆的数组
     * @return  克隆的数组
     */
    ArrayUtils.cloneList = function (ary) {
        if (!ary)
            return null;
        return ary.slice(0, ary.length);
    };
    /**
     * 判断2个数组是否相同
     * @param ary1 数组1
     * @param ary2 数组2
     */
    ArrayUtils.equals = function (ary1, ary2) {
        if (ary1 == ary2)
            return true;
        var length = ary1.length;
        if (length != ary2.length)
            return false;
        while (length--) {
            if (ary1[length] != ary2[length])
                return false;
        }
        return true;
    };
    /**
     * 根据索引插入元素，索引和索引后的元素都向后移动一位
     * @param ary
     * @param index 插入索引
     * @param value 插入的元素
     * @returns 插入的元素 未插入则返回空
     */
    ArrayUtils.insert = function (ary, index, value) {
        if (!ary)
            return null;
        var length = ary.length;
        if (index > length)
            index = length;
        if (index < 0)
            index = 0;
        if (index == length)
            ary.push(value); //插入最后
        else if (index == 0)
            ary.unshift(value); //插入头
        else {
            for (var i = length - 1; i >= index; i -= 1) {
                ary[i + 1] = ary[i];
            }
            ary[index] = value;
        }
        return value;
    };
    /**
     * 打乱数组 Fisher–Yates shuffle
     * @param list
     */
    ArrayUtils.shuffle = function (list) {
        var n = list.length;
        while (n > 1) {
            n--;
            var k = RandomUtils.randint(0, n + 1);
            var value = list[k];
            list[k] = list[n];
            list[n] = value;
        }
    };
    /**
     * 如果项目已经在列表中，返回false，如果成功添加，返回true
     * @param list
     * @param item
     */
    ArrayUtils.addIfNotPresent = function (list, item) {
        if (new linq.List(list).contains(item))
            return false;
        list.push(item);
        return true;
    };
    /**
     * 返回列表中的最后一项。列表中至少应该有一个项目
     * @param list
     */
    ArrayUtils.lastItem = function (list) {
        return list[list.length - 1];
    };
    /**
     * 从列表中随机获取一个项目。不清空检查列表!
     * @param list
     */
    ArrayUtils.randomItem = function (list) {
        return list[RandomUtils.randint(0, list.length)];
    };
    /**
     * 从列表中随机获取物品。不清空检查列表，也不验证列表数是否大于项目数。返回的List可以通过ListPool.free放回池中
     * @param list
     * @param itemCount 从列表中返回的随机项目的数量
     */
    ArrayUtils.randomItems = function (list, itemCount) {
        var set = new Set();
        while (set.size != itemCount) {
            var item = this.randomItem(list);
            if (!set.has(item))
                set.add(item);
        }
        var items = es.ListPool.obtain();
        set.forEach(function (value) { return items.push(value); });
        return items;
    };
    return ArrayUtils;
}());
var es;
(function (es) {
    var Base64Utils = /** @class */ (function () {
        function Base64Utils() {
        }
        Object.defineProperty(Base64Utils, "nativeBase64", {
            /**
             * 判断是否原生支持Base64位解析
             */
            get: function () {
                return (typeof (window.atob) === "function");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 解码
         * @param input
         */
        Base64Utils.decode = function (input) {
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            if (this.nativeBase64) {
                return window.atob(input);
            }
            else {
                var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
                while (i < input.length) {
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output.push(String.fromCharCode(chr1));
                    if (enc3 !== 64) {
                        output.push(String.fromCharCode(chr2));
                    }
                    if (enc4 !== 64) {
                        output.push(String.fromCharCode(chr3));
                    }
                }
                output = output.join("");
                return output;
            }
        };
        /**
         * 编码
         * @param input
         */
        Base64Utils.encode = function (input) {
            input = input.replace(/\r\n/g, "\n");
            if (this.nativeBase64) {
                window.btoa(input);
            }
            else {
                var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    }
                    else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output.push(this._keyStr.charAt(enc1));
                    output.push(this._keyStr.charAt(enc2));
                    output.push(this._keyStr.charAt(enc3));
                    output.push(this._keyStr.charAt(enc4));
                }
                output = output.join("");
                return output;
            }
        };
        /**
         * 解析Base64格式数据
         * @param input
         * @param bytes
         */
        Base64Utils.decodeBase64AsArray = function (input, bytes) {
            bytes = bytes || 1;
            var dec = Base64Utils.decode(input), i, j, len;
            var ar = new Uint32Array(dec.length / bytes);
            for (i = 0, len = dec.length / bytes; i < len; i++) {
                ar[i] = 0;
                for (j = bytes - 1; j >= 0; --j) {
                    ar[i] += dec.charCodeAt((i * bytes) + j) << (j << 3);
                }
            }
            return ar;
        };
        /**
         * 暂时不支持
         * @param data
         * @param decoded
         * @param compression
         * @private
         */
        Base64Utils.decompress = function (data, decoded, compression) {
            throw new Error("GZIP/ZLIB compressed TMX Tile Map not supported!");
        };
        /**
         * 解析csv数据
         * @param input
         */
        Base64Utils.decodeCSV = function (input) {
            var entries = input.replace("\n", "").trim().split(",");
            var result = [];
            for (var i = 0; i < entries.length; i++) {
                result.push(+entries[i]);
            }
            return result;
        };
        Base64Utils._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        return Base64Utils;
    }());
    es.Base64Utils = Base64Utils;
})(es || (es = {}));
var es;
(function (es) {
    var Color = /** @class */ (function () {
        /**
         * 从代表红、绿、蓝和alpha值的标量构造RGBA颜色。
         */
        function Color(r, g, b, alpha) {
            if (((r | g | b | alpha) & 0xFFFFFF00) != 0) {
                var clampedR = es.MathHelper.clamp(r, 0, 255);
                var clampedG = es.MathHelper.clamp(g, 0, 255);
                var clampedB = es.MathHelper.clamp(b, 0, 255);
                var clampedA = es.MathHelper.clamp(alpha, 0, 255);
                this._packedValue = (clampedA << 24) | (clampedB << 16) | (clampedG << 8) | (clampedR);
            }
            else {
                this._packedValue = (alpha << 24) | (b << 16) | (g << 8) | r;
            }
        }
        Object.defineProperty(Color.prototype, "b", {
            get: function () {
                return this._packedValue >> 16;
            },
            set: function (value) {
                this._packedValue = (this._packedValue & 0xff00ffff) | (value << 16);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            get: function () {
                return this._packedValue >> 8;
            },
            set: function (value) {
                this._packedValue = (this._packedValue & 0xffff00ff) | (value << 8);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "r", {
            get: function () {
                return this._packedValue;
            },
            set: function (value) {
                this._packedValue = (this._packedValue & 0xffffff00) | value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "a", {
            get: function () {
                return this._packedValue >> 24;
            },
            set: function (value) {
                this._packedValue = (this._packedValue & 0x00ffffff) | (value << 24);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "packedValue", {
            get: function () {
                return this._packedValue;
            },
            set: function (value) {
                this._packedValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Color.prototype.equals = function (other) {
            return this._packedValue == other._packedValue;
        };
        return Color;
    }());
    es.Color = Color;
})(es || (es = {}));
var es;
(function (es) {
    var EdgeExt = /** @class */ (function () {
        function EdgeExt() {
        }
        EdgeExt.oppositeEdge = function (self) {
            switch (self) {
                case es.Edge.bottom:
                    return es.Edge.top;
                case es.Edge.top:
                    return es.Edge.bottom;
                case es.Edge.left:
                    return es.Edge.right;
                case es.Edge.right:
                    return es.Edge.left;
            }
        };
        /**
         * 如果边是右或左，则返回true
         * @param self
         */
        EdgeExt.isHorizontal = function (self) {
            return self == es.Edge.right || self == es.Edge.left;
        };
        /**
         * 如果边是顶部或底部，则返回true
         * @param self
         */
        EdgeExt.isVertical = function (self) {
            return self == es.Edge.top || self == es.Edge.bottom;
        };
        return EdgeExt;
    }());
    es.EdgeExt = EdgeExt;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 用于包装事件的一个小类
     */
    var FuncPack = /** @class */ (function () {
        function FuncPack(func, context) {
            this.func = func;
            this.context = context;
        }
        return FuncPack;
    }());
    es.FuncPack = FuncPack;
    /**
     * 用于事件管理
     */
    var Emitter = /** @class */ (function () {
        function Emitter() {
            this._messageTable = new Map();
        }
        /**
         * 开始监听项
         * @param eventType 监听类型
         * @param handler 监听函数
         * @param context 监听上下文
         */
        Emitter.prototype.addObserver = function (eventType, handler, context) {
            var list = this._messageTable.get(eventType);
            if (!list) {
                list = [];
                this._messageTable.set(eventType, list);
            }
            if (list.findIndex(function (funcPack) { return funcPack.func == handler; }) != -1)
                console.warn("您试图添加相同的观察者两次");
            list.push(new FuncPack(handler, context));
        };
        /**
         * 移除监听项
         * @param eventType 事件类型
         * @param handler 事件函数
         */
        Emitter.prototype.removeObserver = function (eventType, handler) {
            var messageData = this._messageTable.get(eventType);
            var index = messageData.findIndex(function (data) { return data.func == handler; });
            if (index != -1)
                new linq.List(messageData).removeAt(index);
        };
        /**
         * 触发该事件
         * @param eventType 事件类型
         * @param data 事件数据
         */
        Emitter.prototype.emit = function (eventType, data) {
            var list = this._messageTable.get(eventType);
            if (list) {
                for (var i = list.length - 1; i >= 0; i--)
                    list[i].func.call(list[i].context, data);
            }
        };
        return Emitter;
    }());
    es.Emitter = Emitter;
})(es || (es = {}));
var es;
(function (es) {
    var Edge;
    (function (Edge) {
        Edge[Edge["top"] = 0] = "top";
        Edge[Edge["bottom"] = 1] = "bottom";
        Edge[Edge["left"] = 2] = "left";
        Edge[Edge["right"] = 3] = "right";
    })(Edge = es.Edge || (es.Edge = {}));
})(es || (es = {}));
var es;
(function (es) {
    var Enumerable = /** @class */ (function () {
        function Enumerable() {
        }
        /**
         * 生成包含一个重复值的序列
         * @param element 要重复的值
         * @param count 在生成的序列中重复该值的次数
         */
        Enumerable.repeat = function (element, count) {
            var result = [];
            while (count--) {
                result.push(element);
            }
            return result;
        };
        return Enumerable;
    }());
    es.Enumerable = Enumerable;
})(es || (es = {}));
var es;
(function (es) {
    var EqualityComparer = /** @class */ (function () {
        function EqualityComparer() {
        }
        EqualityComparer.default = function () {
            return new EqualityComparer();
        };
        EqualityComparer.prototype.equals = function (x, y) {
            if (typeof x["equals"] == 'function') {
                return x["equals"](y);
            }
            else {
                return x === y;
            }
        };
        EqualityComparer.prototype.getHashCode = function (o) {
            var _this = this;
            if (typeof o == 'number') {
                return this._getHashCodeForNumber(o);
            }
            if (typeof o == 'string') {
                return this._getHashCodeForString(o);
            }
            var hashCode = 385229220;
            this.forOwn(o, function (value) {
                if (typeof value == 'number') {
                    hashCode += _this._getHashCodeForNumber(value);
                }
                else if (typeof value == 'string') {
                    hashCode += _this._getHashCodeForString(value);
                }
                else if (typeof value == 'object') {
                    _this.forOwn(value, function () {
                        hashCode += _this.getHashCode(value);
                    });
                }
            });
            return hashCode;
        };
        EqualityComparer.prototype._getHashCodeForNumber = function (n) {
            return n;
        };
        EqualityComparer.prototype._getHashCodeForString = function (s) {
            var hashCode = 385229220;
            for (var i = 0; i < s.length; i++) {
                hashCode = (hashCode * -1521134295) ^ s.charCodeAt(i);
            }
            return hashCode;
        };
        EqualityComparer.prototype.forOwn = function (object, iteratee) {
            object = Object(object);
            Object.keys(object).forEach(function (key) { return iteratee(object[key], key, object); });
        };
        return EqualityComparer;
    }());
    es.EqualityComparer = EqualityComparer;
})(es || (es = {}));
var es;
(function (es) {
    var GlobalManager = /** @class */ (function () {
        function GlobalManager() {
        }
        Object.defineProperty(GlobalManager.prototype, "enabled", {
            /**
             * 如果true则启用了GlobalManager。
             * 状态的改变会导致调用OnEnabled/OnDisable
             */
            get: function () {
                return this._enabled;
            },
            /**
             * 如果true则启用了GlobalManager。
             * 状态的改变会导致调用OnEnabled/OnDisable
             * @param value
             */
            set: function (value) {
                this.setEnabled(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 启用/禁用这个GlobalManager
         * @param isEnabled
         */
        GlobalManager.prototype.setEnabled = function (isEnabled) {
            if (this._enabled != isEnabled) {
                this._enabled = isEnabled;
                if (this._enabled) {
                    this.onEnabled();
                }
                else {
                    this.onDisabled();
                }
            }
        };
        /**
         * 此GlobalManager启用时调用
         */
        GlobalManager.prototype.onEnabled = function () {
        };
        /**
         * 此GlobalManager禁用时调用
         */
        GlobalManager.prototype.onDisabled = function () {
        };
        /**
         * 在frame .update之前调用每一帧
         */
        GlobalManager.prototype.update = function () {
        };
        return GlobalManager;
    }());
    es.GlobalManager = GlobalManager;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 可以用于列表池的简单类
     */
    var ListPool = /** @class */ (function () {
        function ListPool() {
        }
        /**
         * 预热缓存，使用最大的cacheCount对象填充缓存
         * @param cacheCount
         */
        ListPool.warmCache = function (cacheCount) {
            cacheCount -= this._objectQueue.length;
            if (cacheCount > 0) {
                for (var i = 0; i < cacheCount; i++) {
                    this._objectQueue.unshift([]);
                }
            }
        };
        /**
         * 将缓存修剪为cacheCount项目
         * @param cacheCount
         */
        ListPool.trimCache = function (cacheCount) {
            while (cacheCount > this._objectQueue.length)
                this._objectQueue.shift();
        };
        /**
         * 清除缓存
         */
        ListPool.clearCache = function () {
            this._objectQueue.length = 0;
        };
        /**
         * 如果可以的话，从堆栈中弹出一个项
         */
        ListPool.obtain = function () {
            if (this._objectQueue.length > 0)
                return this._objectQueue.shift();
            return [];
        };
        /**
         * 将项推回堆栈
         * @param obj
         */
        ListPool.free = function (obj) {
            this._objectQueue.unshift(obj);
            obj.length = 0;
        };
        ListPool._objectQueue = [];
        return ListPool;
    }());
    es.ListPool = ListPool;
})(es || (es = {}));
var es;
(function (es) {
    var NumberExtension = /** @class */ (function () {
        function NumberExtension() {
        }
        NumberExtension.toNumber = function (value) {
            if (value == undefined)
                return 0;
            return Number(value);
        };
        return NumberExtension;
    }());
    es.NumberExtension = NumberExtension;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 用于管理一对对象的简单DTO
     */
    var Pair = /** @class */ (function () {
        function Pair(first, second) {
            this.first = first;
            this.second = second;
        }
        Pair.prototype.clear = function () {
            this.first = this.second = null;
        };
        Pair.prototype.equals = function (other) {
            // 这两种方法在功能上应该是等价的
            return this.first == other.first && this.second == other.second;
        };
        Pair.prototype.getHashCode = function () {
            return es.EqualityComparer.default().getHashCode(this.first) * 37 +
                es.EqualityComparer.default().getHashCode(this.second);
        };
        return Pair;
    }());
    es.Pair = Pair;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 用于池任何对象
     */
    var Pool = /** @class */ (function () {
        function Pool() {
        }
        /**
         * 预热缓存，使用最大的cacheCount对象填充缓存
         * @param type
         * @param cacheCount
         */
        Pool.warmCache = function (type, cacheCount) {
            cacheCount -= this._objectQueue.length;
            if (cacheCount > 0) {
                for (var i = 0; i < cacheCount; i++) {
                    this._objectQueue.unshift(new type());
                }
            }
        };
        /**
         * 将缓存修剪为cacheCount项目
         * @param cacheCount
         */
        Pool.trimCache = function (cacheCount) {
            while (cacheCount > this._objectQueue.length)
                this._objectQueue.shift();
        };
        /**
         * 清除缓存
         */
        Pool.clearCache = function () {
            this._objectQueue.length = 0;
        };
        /**
         * 如果可以的话，从堆栈中弹出一个项
         */
        Pool.obtain = function (type) {
            if (this._objectQueue.length > 0)
                return this._objectQueue.shift();
            return new type();
        };
        /**
         * 将项推回堆栈
         * @param obj
         */
        Pool.free = function (obj) {
            this._objectQueue.unshift(obj);
            if (es.isIPoolable(obj)) {
                obj["reset"]();
            }
        };
        Pool._objectQueue = [];
        return Pool;
    }());
    es.Pool = Pool;
    es.isIPoolable = function (props) { return typeof props['reset'] !== 'undefined'; };
})(es || (es = {}));
var RandomUtils = /** @class */ (function () {
    function RandomUtils() {
    }
    /**
     * 在 start 与 stop之间取一个随机整数，可以用step指定间隔， 但不包括较大的端点（start与stop较大的一个）
     * 如
     * this.randrange(1, 10, 3)
     * 则返回的可能是   1 或  4 或  7  , 注意 这里面不会返回10，因为是10是大端点
     *
     * @param start
     * @param stop
     * @param step
     * @return 假设 start < stop,  [start, stop) 区间内的随机整数
     *
     */
    RandomUtils.randrange = function (start, stop, step) {
        if (step === void 0) { step = 1; }
        if (step == 0)
            throw new Error('step 不能为 0');
        var width = stop - start;
        if (width == 0)
            throw new Error('没有可用的范围(' + start + ',' + stop + ')');
        if (width < 0)
            width = start - stop;
        var n = Math.floor((width + step - 1) / step);
        return Math.floor(this.random() * n) * step + Math.min(start, stop);
    };
    /**
     * 返回a 到 b直间的随机整数，包括 a 和 b
     * @param a
     * @param b
     * @return [a, b] 直接的随机整数
     *
     */
    RandomUtils.randint = function (a, b) {
        a = Math.floor(a);
        b = Math.floor(b);
        if (a > b)
            a++;
        else
            b++;
        return this.randrange(a, b);
    };
    /**
     * 返回 a - b之间的随机数，不包括  Math.max(a, b)
     * @param a
     * @param b
     * @return 假设 a < b, [a, b)
     */
    RandomUtils.randnum = function (a, b) {
        return this.random() * (b - a) + a;
    };
    /**
     * 打乱数组
     * @param array
     * @return
     */
    RandomUtils.shuffle = function (array) {
        array.sort(this._randomCompare);
        return array;
    };
    /**
     * 从序列中随机取一个元素
     * @param sequence 可以是 数组、 vector，等只要是有length属性，并且可以用数字索引获取元素的对象，
     *                 另外，字符串也是允许的。
     * @return 序列中的某一个元素
     *
     */
    RandomUtils.choice = function (sequence) {
        if (!sequence.hasOwnProperty("length"))
            throw new Error('无法对此对象执行此操作');
        var index = Math.floor(this.random() * sequence.length);
        if (sequence instanceof String)
            return String(sequence).charAt(index);
        else
            return sequence[index];
    };
    /**
     * 对列表中的元素进行随机采æ ?
     * <pre>
     * this.sample([1, 2, 3, 4, 5],  3)  // Choose 3 elements
     * [4, 1, 5]
     * </pre>
     * @param sequence
     * @param num
     * @return
     *
     */
    RandomUtils.sample = function (sequence, num) {
        var len = sequence.length;
        if (num <= 0 || len < num)
            throw new Error("采样数量不够");
        var selected = [];
        var indices = [];
        for (var i = 0; i < num; i++) {
            var index = Math.floor(this.random() * len);
            while (indices.indexOf(index) >= 0)
                index = Math.floor(this.random() * len);
            selected.push(sequence[index]);
            indices.push(index);
        }
        return selected;
    };
    /**
     * 返回 0.0 - 1.0 之间的随机数，等同于 Math.random()
     * @return Math.random()
     *
     */
    RandomUtils.random = function () {
        return Math.random();
    };
    /**
     * 计算概率
     * @param    chance 概率
     * @return
     */
    RandomUtils.boolean = function (chance) {
        if (chance === void 0) { chance = .5; }
        return (this.random() < chance) ? true : false;
    };
    RandomUtils._randomCompare = function (a, b) {
        return (this.random() > .5) ? 1 : -1;
    };
    return RandomUtils;
}());
var es;
(function (es) {
    var RectangleExt = /** @class */ (function () {
        function RectangleExt() {
        }
        /**
         * 获取指定边的位置
         * @param rect
         * @param edge
         */
        RectangleExt.getSide = function (rect, edge) {
            switch (edge) {
                case es.Edge.top:
                    return rect.top;
                case es.Edge.bottom:
                    return rect.bottom;
                case es.Edge.left:
                    return rect.left;
                case es.Edge.right:
                    return rect.right;
            }
        };
        /**
         * 计算两个矩形的并集。结果将是一个包含其他两个的矩形。
         * @param first
         * @param point
         */
        RectangleExt.union = function (first, point) {
            var rect = new es.Rectangle(point.x, point.y, 0, 0);
            var result = new es.Rectangle();
            result.x = Math.min(first.x, rect.x);
            result.y = Math.min(first.y, rect.y);
            result.width = Math.max(first.right, rect.right) - result.x;
            result.height = Math.max(first.bottom, rect.bottom) - result.y;
            return result;
        };
        RectangleExt.getHalfRect = function (rect, edge) {
            switch (edge) {
                case es.Edge.top:
                    return new es.Rectangle(rect.x, rect.y, rect.width, rect.height / 2);
                case es.Edge.bottom:
                    return new es.Rectangle(rect.x, rect.y + rect.height / 2, rect.width, rect.height / 2);
                case es.Edge.left:
                    return new es.Rectangle(rect.x, rect.y, rect.width / 2, rect.height);
                case es.Edge.right:
                    return new es.Rectangle(rect.x + rect.width / 2, rect.y, rect.width / 2, rect.height);
            }
        };
        /**
         * 获取矩形的一部分，其宽度/高度的大小位于矩形的边缘，但仍然包含在其中。
         * @param rect
         * @param edge
         * @param size
         */
        RectangleExt.getRectEdgePortion = function (rect, edge, size) {
            if (size === void 0) { size = 1; }
            switch (edge) {
                case es.Edge.top:
                    return new es.Rectangle(rect.x, rect.y, rect.width, size);
                case es.Edge.bottom:
                    return new es.Rectangle(rect.x, rect.y + rect.height - size, rect.width, size);
                case es.Edge.left:
                    return new es.Rectangle(rect.x, rect.y, size, rect.height);
                case es.Edge.right:
                    return new es.Rectangle(rect.x + rect.width - size, rect.y, size, rect.height);
            }
        };
        RectangleExt.expandSide = function (rect, edge, amount) {
            amount = Math.abs(amount);
            switch (edge) {
                case es.Edge.top:
                    rect.y -= amount;
                    rect.height += amount;
                    break;
                case es.Edge.bottom:
                    rect.height += amount;
                    break;
                case es.Edge.left:
                    rect.x -= amount;
                    rect.width += amount;
                    break;
                case es.Edge.right:
                    rect.width += amount;
                    break;
            }
        };
        RectangleExt.contract = function (rect, horizontalAmount, verticalAmount) {
            rect.x += horizontalAmount;
            rect.y += verticalAmount;
            rect.width -= horizontalAmount * 2;
            rect.height -= verticalAmount * 2;
        };
        return RectangleExt;
    }());
    es.RectangleExt = RectangleExt;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 使得number/string/boolean类型作为对象引用来进行传递
     */
    var Ref = /** @class */ (function () {
        function Ref(value) {
            this.value = value;
        }
        return Ref;
    }());
    es.Ref = Ref;
})(es || (es = {}));
var es;
(function (es) {
    var Set = /** @class */ (function () {
        function Set(source) {
            var _this = this;
            this.clear();
            if (source)
                source.forEach(function (value) {
                    _this.add(value);
                });
        }
        Set.prototype.add = function (item) {
            var _this = this;
            var hashCode = this.getHashCode(item);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                var newBucket = new Array();
                newBucket.push(item);
                this.buckets[hashCode] = newBucket;
                this.count = this.count + 1;
                return true;
            }
            if (bucket.some(function (value) { return _this.areEqual(value, item); }))
                return false;
            bucket.push(item);
            this.count = this.count + 1;
            return true;
        };
        ;
        Set.prototype.remove = function (item) {
            var _this = this;
            var hashCode = this.getHashCode(item);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            var result = false;
            var newBucket = new Array();
            bucket.forEach(function (value) {
                if (!_this.areEqual(value, item))
                    newBucket.push(item);
                else
                    result = true;
            });
            this.buckets[hashCode] = newBucket;
            if (result)
                this.count = this.count - 1;
            return result;
        };
        Set.prototype.contains = function (item) {
            return this.bucketsContains(this.buckets, item);
        };
        ;
        Set.prototype.getCount = function () {
            return this.count;
        };
        Set.prototype.clear = function () {
            this.buckets = new Array();
            this.count = 0;
        };
        Set.prototype.toArray = function () {
            var result = new Array();
            this.buckets.forEach(function (value) {
                value.forEach(function (inner) {
                    result.push(inner);
                });
            });
            return result;
        };
        /**
         * 从当前集合中删除指定集合中的所有元素
         * @param other
         */
        Set.prototype.exceptWith = function (other) {
            var _this = this;
            if (other) {
                other.forEach(function (value) {
                    _this.remove(value);
                });
            }
        };
        /**
         * 修改当前Set对象，使其只包含该对象和指定数组中的元素
         * @param other
         */
        Set.prototype.intersectWith = function (other) {
            var _this = this;
            if (other) {
                var otherBuckets_1 = this.buildInternalBuckets(other);
                this.toArray().forEach(function (value) {
                    if (!_this.bucketsContains(otherBuckets_1.Buckets, value))
                        _this.remove(value);
                });
            }
            else {
                this.clear();
            }
        };
        Set.prototype.unionWith = function (other) {
            var _this = this;
            other.forEach(function (value) {
                _this.add(value);
            });
        };
        /**
         * 确定当前集合是否为指定集合或数组的子集
         * @param other
         */
        Set.prototype.isSubsetOf = function (other) {
            var _this = this;
            var otherBuckets = this.buildInternalBuckets(other);
            return this.toArray().every(function (value) { return _this.bucketsContains(otherBuckets.Buckets, value); });
        };
        /**
         * 确定当前不可变排序集是否为指定集合的超集
         * @param other
         */
        Set.prototype.isSupersetOf = function (other) {
            var _this = this;
            return other.every(function (value) { return _this.contains(value); });
        };
        Set.prototype.overlaps = function (other) {
            var _this = this;
            return other.some(function (value) { return _this.contains(value); });
        };
        Set.prototype.setEquals = function (other) {
            var _this = this;
            var otherBuckets = this.buildInternalBuckets(other);
            if (otherBuckets.Count !== this.count)
                return false;
            return other.every(function (value) { return _this.contains(value); });
        };
        Set.prototype.buildInternalBuckets = function (source) {
            var _this = this;
            var internalBuckets = new Array();
            var internalCount = 0;
            source.forEach(function (item) {
                var hashCode = _this.getHashCode(item);
                var bucket = internalBuckets[hashCode];
                if (bucket === undefined) {
                    var newBucket = new Array();
                    newBucket.push(item);
                    internalBuckets[hashCode] = newBucket;
                    internalCount = internalCount + 1;
                }
                else if (!bucket.some(function (value) { return _this.areEqual(value, item); })) {
                    bucket.push(item);
                    internalCount = internalCount + 1;
                }
            });
            return { Buckets: internalBuckets, Count: internalCount };
        };
        Set.prototype.bucketsContains = function (internalBuckets, item) {
            var _this = this;
            var hashCode = this.getHashCode(item);
            var bucket = internalBuckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            return bucket.some(function (value) { return _this.areEqual(value, item); });
        };
        return Set;
    }());
    var HashSet = /** @class */ (function (_super) {
        __extends(HashSet, _super);
        function HashSet(source) {
            return _super.call(this, source) || this;
        }
        HashSet.prototype.getHashCode = function (item) {
            return item.getHashCode();
        };
        HashSet.prototype.areEqual = function (value1, value2) {
            return value1.equals(value2);
        };
        return HashSet;
    }(Set));
    es.HashSet = HashSet;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 管理数值的简单助手类。它存储值，直到累计的总数大于1。一旦超过1，该值将在调用update时添加到amount中。
     */
    var SubpixelNumber = /** @class */ (function () {
        function SubpixelNumber() {
        }
        /**
         * 以amount递增余数，将值截断为int，存储新的余数并将amount设置为当前值。
         * @param amount
         */
        SubpixelNumber.prototype.update = function (amount) {
            this.remainder += amount;
            var motion = Math.trunc(this.remainder);
            this.remainder -= motion;
            return motion;
        };
        /**
         * 将余数重置为0。当一个物体与一个不可移动的物体碰撞时有用。
         * 在这种情况下，您将希望将亚像素余数归零，因为它是空的和无效的碰撞。
         */
        SubpixelNumber.prototype.reset = function () {
            this.remainder = 0;
        };
        return SubpixelNumber;
    }());
    es.SubpixelNumber = SubpixelNumber;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 三角剖分
     */
    var Triangulator = /** @class */ (function () {
        function Triangulator() {
            /**
             * 最后一次三角调用中使用的点列表的三角形列表项的索引
             */
            this.triangleIndices = [];
            this._triPrev = new Array(12);
            this._triNext = new Array(12);
        }
        Triangulator.testPointTriangle = function (point, a, b, c) {
            if (es.Vector2Ext.cross(es.Vector2.subtract(point, a), es.Vector2.subtract(b, a)) < 0)
                return false;
            if (es.Vector2Ext.cross(es.Vector2.subtract(point, b), es.Vector2.subtract(c, b)) < 0)
                return false;
            if (es.Vector2Ext.cross(es.Vector2.subtract(point, c), es.Vector2.subtract(a, c)) < 0)
                return false;
            return true;
        };
        /**
         * 计算一个三角形列表，该列表完全覆盖给定点集所包含的区域。如果点不是CCW，则将arePointsCCW参数传递为false
         * @param points 定义封闭路径的点列表
         * @param arePointsCCW
         */
        Triangulator.prototype.triangulate = function (points, arePointsCCW) {
            if (arePointsCCW === void 0) { arePointsCCW = true; }
            var count = points.length;
            // 设置前一个链接和下一个链接
            this.initialize(count);
            // 非三角的多边形断路器
            var iterations = 0;
            // 从0开始
            var index = 0;
            // 继续移除所有的三角形，直到只剩下一个三角形
            while (count > 3 && iterations < 500) {
                iterations++;
                var isEar = true;
                var a = points[this._triPrev[index]];
                var b = points[index];
                var c = points[this._triNext[index]];
                if (es.Vector2Ext.isTriangleCCW(a, b, c)) {
                    var k = this._triNext[this._triNext[index]];
                    do {
                        if (Triangulator.testPointTriangle(points[k], a, b, c)) {
                            isEar = false;
                            break;
                        }
                        k = this._triNext[k];
                    } while (k != this._triPrev[index]);
                }
                else {
                    isEar = false;
                }
                if (isEar) {
                    this.triangleIndices.push(this._triPrev[index]);
                    this.triangleIndices.push(index);
                    this.triangleIndices.push(this._triNext[index]);
                    // 删除vert通过重定向相邻vert的上一个和下一个链接，从而减少vertext计数
                    this._triNext[this._triPrev[index]] = this._triNext[index];
                    this._triPrev[this._triNext[index]] = this._triPrev[index];
                    count--;
                    // 接下来访问前一个vert
                    index = this._triPrev[index];
                }
                else {
                    index = this._triNext[index];
                }
            }
            this.triangleIndices.push(this._triPrev[index]);
            this.triangleIndices.push(index);
            this.triangleIndices.push(this._triNext[index]);
            if (!arePointsCCW)
                this.triangleIndices.reverse();
        };
        Triangulator.prototype.initialize = function (count) {
            this.triangleIndices.length = 0;
            if (this._triNext.length < count) {
                this._triNext.reverse();
                this._triNext = new Array(Math.max(this._triNext.length * 2, count));
            }
            if (this._triPrev.length < count) {
                this._triPrev.reverse();
                this._triPrev = new Array(Math.max(this._triPrev.length * 2, count));
            }
            for (var i = 0; i < count; i++) {
                this._triPrev[i] = i - 1;
                this._triNext[i] = i + 1;
            }
            this._triPrev[0] = count - 1;
            this._triNext[count - 1] = 0;
        };
        return Triangulator;
    }());
    es.Triangulator = Triangulator;
})(es || (es = {}));
var es;
(function (es) {
    var TypeUtils = /** @class */ (function () {
        function TypeUtils() {
        }
        TypeUtils.getType = function (obj) {
            return obj["__proto__"]["constructor"];
        };
        return TypeUtils;
    }());
    es.TypeUtils = TypeUtils;
})(es || (es = {}));
var es;
(function (es) {
    var Vector2Ext = /** @class */ (function () {
        function Vector2Ext() {
        }
        /**
         * 检查三角形是CCW还是CW
         * @param a
         * @param center
         * @param c
         */
        Vector2Ext.isTriangleCCW = function (a, center, c) {
            return this.cross(es.Vector2.subtract(center, a), es.Vector2.subtract(c, center)) < 0;
        };
        Vector2Ext.halfVector = function () {
            return new es.Vector2(0.5, 0.5);
        };
        /**
         * 计算二维伪叉乘点(Perp(u)， v)
         * @param u
         * @param v
         */
        Vector2Ext.cross = function (u, v) {
            return u.y * v.x - u.x * v.y;
        };
        /**
         * 返回与传入向量垂直的向量
         * @param first
         * @param second
         */
        Vector2Ext.perpendicular = function (first, second) {
            return new es.Vector2(-1 * (second.y - first.y), second.x - first.x);
        };
        /**
         * Vector2的临时解决方案
         * 标准化把向量弄乱了
         * @param vec
         */
        Vector2Ext.normalize = function (vec) {
            var magnitude = Math.sqrt((vec.x * vec.x) + (vec.y * vec.y));
            if (magnitude > es.MathHelper.Epsilon) {
                vec.divide(new es.Vector2(magnitude));
            }
            else {
                vec.x = vec.y = 0;
            }
        };
        /**
         * 通过指定的矩阵对Vector2的数组中的向量应用变换，并将结果放置在另一个数组中。
         * @param sourceArray
         * @param sourceIndex
         * @param matrix
         * @param destinationArray
         * @param destinationIndex
         * @param length
         */
        Vector2Ext.transformA = function (sourceArray, sourceIndex, matrix, destinationArray, destinationIndex, length) {
            for (var i = 0; i < length; i++) {
                var position = sourceArray[sourceIndex + i];
                var destination = destinationArray[destinationIndex + i];
                destination.x = (position.x * matrix.m11) + (position.y * matrix.m21) + matrix.m31;
                destination.y = (position.x * matrix.m12) + (position.y * matrix.m22) + matrix.m32;
                destinationArray[destinationIndex + i] = destination;
            }
        };
        Vector2Ext.transformR = function (position, matrix, result) {
            var x = (position.x * matrix.m11) + (position.y * matrix.m21) + matrix.m31;
            var y = (position.x * matrix.m12) + (position.y * matrix.m22) + matrix.m32;
            result.x = x;
            result.y = y;
        };
        /**
         * 通过指定的矩阵对Vector2的数组中的所有向量应用变换，并将结果放到另一个数组中。
         * @param sourceArray
         * @param matrix
         * @param destinationArray
         */
        Vector2Ext.transform = function (sourceArray, matrix, destinationArray) {
            this.transformA(sourceArray, 0, matrix, destinationArray, 0, sourceArray.length);
        };
        Vector2Ext.round = function (vec) {
            return new es.Vector2(Math.round(vec.x), Math.round(vec.y));
        };
        return Vector2Ext;
    }());
    es.Vector2Ext = Vector2Ext;
})(es || (es = {}));
var WebGLUtils = /** @class */ (function () {
    function WebGLUtils() {
    }
    /**
     * 获取webgl context
     */
    WebGLUtils.getContext = function () {
        var canvas = document.getElementsByTagName('canvas')[0];
        return canvas.getContext('2d');
    };
    return WebGLUtils;
}());
var stopwatch;
(function (stopwatch) {
    /**
     * 记录时间的持续时间，一些设计灵感来自物理秒表。
     */
    var Stopwatch = /** @class */ (function () {
        function Stopwatch(getSystemTime) {
            if (getSystemTime === void 0) { getSystemTime = _defaultSystemTimeGetter; }
            this.getSystemTime = getSystemTime;
            /** 自上次复位以来，秒表已停止的系统时间总数。 */
            this._stopDuration = 0;
            /**
             * 记录自上次复位以来所有已完成切片的结果。
             */
            this._completeSlices = [];
        }
        Stopwatch.prototype.getState = function () {
            if (this._startSystemTime === undefined) {
                return State.IDLE;
            }
            else if (this._stopSystemTime === undefined) {
                return State.RUNNING;
            }
            else {
                return State.STOPPED;
            }
        };
        Stopwatch.prototype.isIdle = function () {
            return this.getState() === State.IDLE;
        };
        Stopwatch.prototype.isRunning = function () {
            return this.getState() === State.RUNNING;
        };
        Stopwatch.prototype.isStopped = function () {
            return this.getState() === State.STOPPED;
        };
        /**
         *
         */
        Stopwatch.prototype.slice = function () {
            return this.recordPendingSlice();
        };
        /**
         * 获取自上次复位以来该秒表已完成/记录的所有片的列表。
         */
        Stopwatch.prototype.getCompletedSlices = function () {
            return Array.from(this._completeSlices);
        };
        /**
         * 获取自上次重置以来该秒表已完成/记录的所有片的列表，以及当前挂起的片。
         */
        Stopwatch.prototype.getCompletedAndPendingSlices = function () {
            return __spread(this._completeSlices, [this.getPendingSlice()]);
        };
        /**
         * 获取关于这个秒表当前挂起的切片的详细信息。
         */
        Stopwatch.prototype.getPendingSlice = function () {
            return this.calculatePendingSlice();
        };
        /**
         * 获取当前秒表时间。这是这个秒表自上次复位以来运行的系统时间总数。
         */
        Stopwatch.prototype.getTime = function () {
            return this.caculateStopwatchTime();
        };
        /**
         * 完全重置这个秒表到它的初始状态。清除所有记录的运行持续时间、切片等。
         */
        Stopwatch.prototype.reset = function () {
            this._startSystemTime = this._pendingSliceStartStopwatchTime = this._stopSystemTime = undefined;
            this._stopDuration = 0;
            this._completeSlices = [];
        };
        /**
         * 开始(或继续)运行秒表。
         * @param forceReset
         */
        Stopwatch.prototype.start = function (forceReset) {
            if (forceReset === void 0) { forceReset = false; }
            if (forceReset) {
                this.reset();
            }
            if (this._stopSystemTime !== undefined) {
                var systemNow = this.getSystemTime();
                var stopDuration = systemNow - this._stopSystemTime;
                this._stopDuration += stopDuration;
                this._stopSystemTime = undefined;
            }
            else if (this._startSystemTime === undefined) {
                var systemNow = this.getSystemTime();
                this._startSystemTime = systemNow;
                this._pendingSliceStartStopwatchTime = 0;
            }
        };
        /**
         *
         * @param recordPendingSlice
         */
        Stopwatch.prototype.stop = function (recordPendingSlice) {
            if (recordPendingSlice === void 0) { recordPendingSlice = false; }
            if (this._startSystemTime === undefined) {
                return 0;
            }
            var systemTimeOfStopwatchTime = this.getSystemTimeOfCurrentStopwatchTime();
            if (recordPendingSlice) {
                this.recordPendingSlice(this.caculateStopwatchTime(systemTimeOfStopwatchTime));
            }
            this._stopSystemTime = systemTimeOfStopwatchTime;
            return this.getTime();
        };
        /**
         * 计算指定秒表时间的当前挂起片。
         * @param endStopwatchTime
         */
        Stopwatch.prototype.calculatePendingSlice = function (endStopwatchTime) {
            if (this._pendingSliceStartStopwatchTime === undefined) {
                return Object.freeze({ startTime: 0, endTime: 0, duration: 0 });
            }
            if (endStopwatchTime === undefined) {
                endStopwatchTime = this.getTime();
            }
            return Object.freeze({
                startTime: this._pendingSliceStartStopwatchTime,
                endTime: endStopwatchTime,
                duration: endStopwatchTime - this._pendingSliceStartStopwatchTime
            });
        };
        /**
         * 计算指定系统时间的当前秒表时间。
         * @param endSystemTime
         */
        Stopwatch.prototype.caculateStopwatchTime = function (endSystemTime) {
            if (this._startSystemTime === undefined)
                return 0;
            if (endSystemTime === undefined)
                endSystemTime = this.getSystemTimeOfCurrentStopwatchTime();
            return endSystemTime - this._startSystemTime - this._stopDuration;
        };
        /**
         * 获取与当前秒表时间等效的系统时间。
         * 如果该秒表当前停止，则返回该秒表停止时的系统时间。
         */
        Stopwatch.prototype.getSystemTimeOfCurrentStopwatchTime = function () {
            return this._stopSystemTime === undefined ? this.getSystemTime() : this._stopSystemTime;
        };
        /**
         * 结束/记录当前挂起的片的私有实现。
         * @param endStopwatchTime
         */
        Stopwatch.prototype.recordPendingSlice = function (endStopwatchTime) {
            if (this._pendingSliceStartStopwatchTime !== undefined) {
                if (endStopwatchTime === undefined) {
                    endStopwatchTime = this.getTime();
                }
                var slice = this.calculatePendingSlice(endStopwatchTime);
                this._pendingSliceStartStopwatchTime = slice.endTime;
                this._completeSlices.push(slice);
                return slice;
            }
            else {
                return this.calculatePendingSlice();
            }
        };
        return Stopwatch;
    }());
    stopwatch.Stopwatch = Stopwatch;
    var State;
    (function (State) {
        /** 秒表尚未启动，或已复位。 */
        State["IDLE"] = "IDLE";
        /** 秒表正在运行。 */
        State["RUNNING"] = "RUNNING";
        /** 秒表以前还在跑，但现在已经停了。 */
        State["STOPPED"] = "STOPPED";
    })(State || (State = {}));
    function setDefaultSystemTimeGetter(systemTimeGetter) {
        if (systemTimeGetter === void 0) { systemTimeGetter = Date.now; }
        _defaultSystemTimeGetter = systemTimeGetter;
    }
    stopwatch.setDefaultSystemTimeGetter = setDefaultSystemTimeGetter;
    /** 所有新实例的默认“getSystemTime”实现 */
    var _defaultSystemTimeGetter = Date.now;
})(stopwatch || (stopwatch = {}));
var linq;
(function (linq) {
    var Enumerable = /** @class */ (function () {
        function Enumerable() {
        }
        /**
         * 在指定范围内生成一个整数序列。
         */
        Enumerable.range = function (start, count) {
            var result = new linq.List();
            while (count--) {
                result.add(start++);
            }
            return result;
        };
        /**
         * 生成包含一个重复值的序列。
         */
        Enumerable.repeat = function (element, count) {
            var result = new linq.List();
            while (count--) {
                result.add(element);
            }
            return result;
        };
        return Enumerable;
    }());
    linq.Enumerable = Enumerable;
})(linq || (linq = {}));
var linq;
(function (linq) {
    /**
     * 检查传递的参数是否为对象
     */
    linq.isObj = function (x) { return !!x && typeof x === 'object'; };
    /**
     * 创建一个否定谓词结果的函数
     */
    linq.negate = function (pred) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return !pred.apply(void 0, __spread(args));
    }; };
    /**
     * 比较器助手
     */
    linq.composeComparers = function (previousComparer, currentComparer) { return function (a, b) {
        return previousComparer(a, b) || currentComparer(a, b);
    }; };
    linq.keyComparer = function (_keySelector, descending) { return function (a, b) {
        var sortKeyA = _keySelector(a);
        var sortKeyB = _keySelector(b);
        if (sortKeyA > sortKeyB) {
            return !descending ? 1 : -1;
        }
        else if (sortKeyA < sortKeyB) {
            return !descending ? -1 : 1;
        }
        else {
            return 0;
        }
    }; };
})(linq || (linq = {}));
var linq;
(function (linq) {
    var List = /** @class */ (function () {
        /**
         * 默认为列表的元素
         */
        function List(elements) {
            if (elements === void 0) { elements = []; }
            this._elements = elements;
        }
        /**
         * 在列表的末尾添加一个对象。
         */
        List.prototype.add = function (element) {
            this._elements.push(element);
        };
        /**
         * 将一个对象追加到列表的末尾。
         */
        List.prototype.append = function (element) {
            this.add(element);
        };
        /**
         * 在列表的开头添加一个对象。
         */
        List.prototype.prepend = function (element) {
            this._elements.unshift(element);
        };
        /**
         * 将指定集合的元素添加到列表的末尾。
         */
        List.prototype.addRange = function (elements) {
            var _a;
            (_a = this._elements).push.apply(_a, __spread(elements));
        };
        /**
         * 对序列应用累加器函数。
         */
        List.prototype.aggregate = function (accumulator, initialValue) {
            return this._elements.reduce(accumulator, initialValue);
        };
        /**
         * 确定序列的所有元素是否满足一个条件。
         */
        List.prototype.all = function (predicate) {
            return this._elements.every(predicate);
        };
        List.prototype.any = function (predicate) {
            return predicate
                ? this._elements.some(predicate)
                : this._elements.length > 0;
        };
        List.prototype.average = function (transform) {
            return this.sum(transform) / this.count(transform);
        };
        /**
         * 将序列的元素转换为指定的类型。
         */
        List.prototype.cast = function () {
            return new List(this._elements);
        };
        /**
         * 从列表中删除所有元素。
         */
        List.prototype.clear = function () {
            this._elements.length = 0;
        };
        /**
         * 连接两个序列。
         */
        List.prototype.concat = function (list) {
            return new List(this._elements.concat(list.toArray()));
        };
        /**
         * 确定一个元素是否在列表中。
         */
        List.prototype.contains = function (element) {
            return this.any(function (x) { return x === element; });
        };
        List.prototype.count = function (predicate) {
            return predicate ? this.where(predicate).count() : this._elements.length;
        };
        /**
         * 返回指定序列的元素，或者如果序列为空，则返回单例集合中类型参数的默认值。
         */
        List.prototype.defaultIfEmpty = function (defaultValue) {
            return this.count() ? this : new List([defaultValue]);
        };
        /**
         * 根据指定的键选择器从序列中返回不同的元素。
         */
        List.prototype.distinctBy = function (keySelector) {
            var groups = this.groupBy(keySelector);
            return Object.keys(groups).reduce(function (res, key) {
                res.add(groups[key][0]);
                return res;
            }, new List());
        };
        /**
         * 返回序列中指定索引处的元素。
         */
        List.prototype.elementAt = function (index) {
            if (index < this.count() && index >= 0) {
                return this._elements[index];
            }
            else {
                throw new Error('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.');
            }
        };
        /**
         * 返回序列中指定索引处的元素，如果索引超出范围，则返回默认值。
         */
        List.prototype.elementAtOrDefault = function (index) {
            return index < this.count() && index >= 0
                ? this._elements[index]
                : undefined;
        };
        /**
         * 通过使用默认的相等比较器来比较值，生成两个序列的差值集。
         */
        List.prototype.except = function (source) {
            return this.where(function (x) { return !source.contains(x); });
        };
        List.prototype.first = function (predicate) {
            if (this.count()) {
                return predicate ? this.where(predicate).first() : this._elements[0];
            }
            else {
                throw new Error('InvalidOperationException: The source sequence is empty.');
            }
        };
        List.prototype.firstOrDefault = function (predicate) {
            return this.count(predicate) ? this.first(predicate) : undefined;
        };
        /**
         * 对列表中的每个元素执行指定的操作。
         */
        List.prototype.forEach = function (action) {
            return this._elements.forEach(action);
        };
        /**
         * 根据指定的键选择器函数对序列中的元素进行分组。
         */
        List.prototype.groupBy = function (grouper, mapper) {
            if (mapper === void 0) { mapper = function (val) { return val; }; }
            var initialValue = {};
            return this.aggregate(function (ac, v) {
                var key = grouper(v);
                var existingGroup = ac[key];
                var mappedValue = mapper(v);
                existingGroup
                    ? existingGroup.push(mappedValue)
                    : (ac[key] = [mappedValue]);
                return ac;
            }, initialValue);
        };
        /**
         * 根据键的相等将两个序列的元素关联起来，并将结果分组。默认的相等比较器用于比较键。
         */
        List.prototype.groupJoin = function (list, key1, key2, result) {
            return this.select(function (x) {
                return result(x, list.where(function (z) { return key1(x) === key2(z); }));
            });
        };
        /**
         * 返回列表中某个元素第一次出现的索引。
         */
        List.prototype.indexOf = function (element) {
            return this._elements.indexOf(element);
        };
        /**
         * 向列表中插入一个元素在指定索引处。
         */
        List.prototype.insert = function (index, element) {
            if (index < 0 || index > this._elements.length) {
                throw new Error('Index is out of range.');
            }
            this._elements.splice(index, 0, element);
        };
        /**
         * 通过使用默认的相等比较器来比较值，生成两个序列的交集集。
         */
        List.prototype.intersect = function (source) {
            return this.where(function (x) { return source.contains(x); });
        };
        /**
         * 基于匹配的键将两个序列的元素关联起来。默认的相等比较器用于比较键。
         */
        List.prototype.join = function (list, key1, key2, result) {
            return this.selectMany(function (x) {
                return list.where(function (y) { return key2(y) === key1(x); }).select(function (z) { return result(x, z); });
            });
        };
        List.prototype.last = function (predicate) {
            if (this.count()) {
                return predicate
                    ? this.where(predicate).last()
                    : this._elements[this.count() - 1];
            }
            else {
                throw Error('InvalidOperationException: The source sequence is empty.');
            }
        };
        List.prototype.lastOrDefault = function (predicate) {
            return this.count(predicate) ? this.last(predicate) : undefined;
        };
        List.prototype.max = function (selector) {
            var id = function (x) { return x; };
            return Math.max.apply(Math, __spread(this._elements.map(selector || id)));
        };
        List.prototype.min = function (selector) {
            var id = function (x) { return x; };
            return Math.min.apply(Math, __spread(this._elements.map(selector || id)));
        };
        /**
         * 根据指定的类型筛选序列中的元素。
         */
        List.prototype.ofType = function (type) {
            var typeName;
            switch (type) {
                case Number:
                    typeName = typeof 0;
                    break;
                case String:
                    typeName = typeof '';
                    break;
                case Boolean:
                    typeName = typeof true;
                    break;
                case Function:
                    typeName = typeof function () { }; // tslint:disable-line no-empty
                    break;
                default:
                    typeName = null;
                    break;
            }
            return typeName === null
                ? this.where(function (x) { return x instanceof type; }).cast()
                : this.where(function (x) { return typeof x === typeName; }).cast();
        };
        /**
         * 根据键按升序对序列中的元素进行排序。
         */
        List.prototype.orderBy = function (keySelector, comparer) {
            if (comparer === void 0) { comparer = linq.keyComparer(keySelector, false); }
            // tslint:disable-next-line: no-use-before-declare
            return new OrderedList(this._elements, comparer);
        };
        /**
         * 根据键值降序对序列中的元素进行排序。
         */
        List.prototype.orderByDescending = function (keySelector, comparer) {
            if (comparer === void 0) { comparer = linq.keyComparer(keySelector, true); }
            // tslint:disable-next-line: no-use-before-declare
            return new OrderedList(this._elements, comparer);
        };
        /**
         * 按键按升序对序列中的元素执行后续排序。
         */
        List.prototype.thenBy = function (keySelector) {
            return this.orderBy(keySelector);
        };
        /**
         * 根据键值按降序对序列中的元素执行后续排序。
         */
        List.prototype.thenByDescending = function (keySelector) {
            return this.orderByDescending(keySelector);
        };
        /**
         * 从列表中删除第一个出现的特定对象。
         */
        List.prototype.remove = function (element) {
            return this.indexOf(element) !== -1
                ? (this.removeAt(this.indexOf(element)), true)
                : false;
        };
        /**
         * 删除与指定谓词定义的条件匹配的所有元素。
         */
        List.prototype.removeAll = function (predicate) {
            return this.where(linq.negate(predicate));
        };
        /**
         * 删除列表指定索引处的元素。
         */
        List.prototype.removeAt = function (index) {
            this._elements.splice(index, 1);
        };
        /**
         * 颠倒整个列表中元素的顺序。
         */
        List.prototype.reverse = function () {
            return new List(this._elements.reverse());
        };
        /**
         * 将序列中的每个元素投射到一个新形式中。
         */
        List.prototype.select = function (selector) {
            return new List(this._elements.map(selector));
        };
        /**
         * 将序列的每个元素投影到一个列表中。并将得到的序列扁平化为一个序列。
         */
        List.prototype.selectMany = function (selector) {
            var _this = this;
            return this.aggregate(function (ac, _, i) { return (ac.addRange(_this.select(selector)
                .elementAt(i)
                .toArray()),
                ac); }, new List());
        };
        /**
         * 通过使用默认的相等比较器对元素的类型进行比较，确定两个序列是否相等。
         */
        List.prototype.sequenceEqual = function (list) {
            return this.all(function (e) { return list.contains(e); });
        };
        /**
         * 返回序列中唯一的元素，如果序列中没有恰好一个元素，则抛出异常。
         */
        List.prototype.single = function (predicate) {
            if (this.count(predicate) !== 1) {
                throw new Error('The collection does not contain exactly one element.');
            }
            else {
                return this.first(predicate);
            }
        };
        /**
         * 返回序列中唯一的元素，如果序列为空，则返回默认值;如果序列中有多个元素，此方法将抛出异常。
         */
        List.prototype.singleOrDefault = function (predicate) {
            return this.count(predicate) ? this.single(predicate) : undefined;
        };
        /**
         * 绕过序列中指定数量的元素，然后返回剩余的元素。
         */
        List.prototype.skip = function (amount) {
            return new List(this._elements.slice(Math.max(0, amount)));
        };
        /**
         * 省略序列中最后指定数量的元素，然后返回剩余的元素。
         */
        List.prototype.skipLast = function (amount) {
            return new List(this._elements.slice(0, -Math.max(0, amount)));
        };
        /**
         * 只要指定条件为真，就绕过序列中的元素，然后返回剩余的元素。
         */
        List.prototype.skipWhile = function (predicate) {
            var _this = this;
            return this.skip(this.aggregate(function (ac) { return (predicate(_this.elementAt(ac)) ? ++ac : ac); }, 0));
        };
        List.prototype.sum = function (transform) {
            return transform
                ? this.select(transform).sum()
                : this.aggregate(function (ac, v) { return (ac += +v); }, 0);
        };
        /**
         * 从序列的开始返回指定数量的连续元素。
         */
        List.prototype.take = function (amount) {
            return new List(this._elements.slice(0, Math.max(0, amount)));
        };
        /**
         * 从序列的末尾返回指定数目的连续元素。
         */
        List.prototype.takeLast = function (amount) {
            return new List(this._elements.slice(-Math.max(0, amount)));
        };
        /**
         * 返回序列中的元素，只要指定的条件为真。
         */
        List.prototype.takeWhile = function (predicate) {
            var _this = this;
            return this.take(this.aggregate(function (ac) { return (predicate(_this.elementAt(ac)) ? ++ac : ac); }, 0));
        };
        /**
         * 复制列表中的元素到一个新数组。
         */
        List.prototype.toArray = function () {
            return this._elements;
        };
        List.prototype.toDictionary = function (key, value) {
            var _this = this;
            return this.aggregate(function (dicc, v, i) {
                dicc[_this.select(key)
                    .elementAt(i)
                    .toString()] = value ? _this.select(value).elementAt(i) : v;
                dicc.add({
                    Key: _this.select(key).elementAt(i),
                    Value: value ? _this.select(value).elementAt(i) : v
                });
                return dicc;
            }, new List());
        };
        /**
         * 创建一个Set从一个Enumerable.List< T>。
         */
        List.prototype.toSet = function () {
            var e_3, _a;
            var result = new Set();
            try {
                for (var _b = __values(this._elements), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var x = _c.value;
                    result.add(x);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return result;
        };
        /**
         * 创建一个List< T>从一个Enumerable.List< T>。
         */
        List.prototype.toList = function () {
            return this;
        };
        /**
         * 创建一个查找，TElement>从一个IEnumerable< T>根据指定的键选择器和元素选择器函数。
         */
        List.prototype.toLookup = function (keySelector, elementSelector) {
            return this.groupBy(keySelector, elementSelector);
        };
        /**
         * 基于谓词过滤一系列值。
         */
        List.prototype.where = function (predicate) {
            return new List(this._elements.filter(predicate));
        };
        /**
         * 将指定的函数应用于两个序列的对应元素，生成结果序列。
         */
        List.prototype.zip = function (list, result) {
            var _this = this;
            return list.count() < this.count()
                ? list.select(function (x, y) { return result(_this.elementAt(y), x); })
                : this.select(function (x, y) { return result(x, list.elementAt(y)); });
        };
        return List;
    }());
    linq.List = List;
    /**
     * 表示已排序的序列。该类的方法是通过使用延迟执行来实现的。
     * 即时返回值是一个存储执行操作所需的所有信息的对象。
     * 在通过调用对象的ToDictionary、ToLookup、ToList或ToArray方法枚举对象之前，不会执行由该方法表示的查询
     */
    var OrderedList = /** @class */ (function (_super) {
        __extends(OrderedList, _super);
        function OrderedList(elements, _comparer) {
            var _this = _super.call(this, elements) || this;
            _this._comparer = _comparer;
            _this._elements.sort(_this._comparer);
            return _this;
        }
        /**
         * 按键按升序对序列中的元素执行后续排序。
         * @override
         */
        OrderedList.prototype.thenBy = function (keySelector) {
            return new OrderedList(this._elements, linq.composeComparers(this._comparer, linq.keyComparer(keySelector, false)));
        };
        /**
         * 根据键值按降序对序列中的元素执行后续排序。
         * @override
         */
        OrderedList.prototype.thenByDescending = function (keySelector) {
            return new OrderedList(this._elements, linq.composeComparers(this._comparer, linq.keyComparer(keySelector, true)));
        };
        return OrderedList;
    }(List));
    linq.OrderedList = OrderedList;
})(linq || (linq = {}));
var es;
(function (es) {
    var Timer = /** @class */ (function () {
        function Timer() {
            this._timeInSeconds = 0;
            this._repeats = false;
            this._isDone = false;
            this._elapsedTime = 0;
        }
        Timer.prototype.getContext = function () {
            return this.context;
        };
        Timer.prototype.reset = function () {
            this._elapsedTime = 0;
        };
        Timer.prototype.stop = function () {
            this._isDone = true;
        };
        Timer.prototype.tick = function () {
            // 如果stop在tick之前被调用，那么isDone将为true，我们不应该再做任何事情
            if (!this._isDone && this._elapsedTime > this._timeInSeconds) {
                this._elapsedTime -= this._timeInSeconds;
                this._onTime(this);
                if (!this._isDone && !this._repeats)
                    this._isDone = true;
            }
            this._elapsedTime += es.Time.deltaTime;
            return this._isDone;
        };
        Timer.prototype.initialize = function (timeInsSeconds, repeats, context, onTime) {
            this._timeInSeconds = timeInsSeconds;
            this._repeats = repeats;
            this.context = context;
            this._onTime = onTime;
        };
        /**
         * 空出对象引用，以便在js需要时GC可以清理它们的引用
         */
        Timer.prototype.unload = function () {
            this.context = null;
            this._onTime = null;
        };
        return Timer;
    }());
    es.Timer = Timer;
})(es || (es = {}));
var es;
(function (es) {
    /**
     * 允许动作的延迟和重复执行
     */
    var TimerManager = /** @class */ (function (_super) {
        __extends(TimerManager, _super);
        function TimerManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._timers = [];
            return _this;
        }
        TimerManager.prototype.update = function () {
            for (var i = this._timers.length - 1; i >= 0; i--) {
                if (this._timers[i].tick()) {
                    this._timers[i].unload();
                    new linq.List(this._timers).removeAt(i);
                }
            }
        };
        /**
         * 调度一个一次性或重复的计时器，该计时器将调用已传递的动作
         * @param timeInSeconds
         * @param repeats
         * @param context
         * @param onTime
         */
        TimerManager.prototype.schedule = function (timeInSeconds, repeats, context, onTime) {
            var timer = new es.Timer();
            timer.initialize(timeInSeconds, repeats, context, onTime);
            this._timers.push(timer);
            return timer;
        };
        return TimerManager;
    }(es.GlobalManager));
    es.TimerManager = TimerManager;
})(es || (es = {}));
