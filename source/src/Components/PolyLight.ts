module es {
    export class PolyLight extends Component implements IUpdatable {
        protected _visibility: VisibilityComputer;
        public static _colliderCache: Collider[] = new Array(10);
        
        public onAddedToEntity(){
            this._visibility = new VisibilityComputer();
        }

        public update(){
            let totalOverlaps = this.getOverlappedColliders();

            this._visibility.begin(this.entity.transform.position, 400);
            this._visibility.loadRectangleBoundaries();
            for (let i = 0; i < totalOverlaps; i ++) {
                if (!PolyLight._colliderCache[i].isTrigger)
                    this._visibility.addColliderOccluder(PolyLight._colliderCache[i]);
            }

            // PolyLight._colliderCache.length = 0;

            let encounters = this._visibility.end();
            this.generateVertsFromEncounters(encounters);
            ListPool.free<Vector2>(encounters);
        }

        public getOverlappedColliders(){
            return Physics.overlapCircleAll(this.entity.position, 400, PolyLight._colliderCache, Physics.allLayers);
        }

        public generateVertsFromEncounters(encounters: Vector2[]){
            console.log(encounters);
        }
    }
}