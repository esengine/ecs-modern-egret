module es {
    export class PolyLight extends Component implements IUpdatable {
        protected _visibility: VisibilityComputer;
        public static _colliderCache: Collider[] = new Array(10);
        public _vertices: FastList<Vector2> = new FastList(20);
        public _indices: FastList<number> = new FastList(50);
        
        public onAddedToEntity(){
            this._visibility = new VisibilityComputer();
        }

        public update(){
            let totalOverlaps = this.getOverlappedColliders();

            this._visibility.begin(this.entity.transform.position, 568);
            this._visibility.loadRectangleBoundaries();
            for (let i = 0; i < totalOverlaps; i ++) {
                if (!PolyLight._colliderCache[i].isTrigger)
                    this._visibility.addColliderOccluder(PolyLight._colliderCache[i]);
            }

            // PolyLight._colliderCache.length = 0;

            let encounters = this._visibility.end();
            this.generateVertsFromEncounters(encounters);
            ListPool.free<Vector2>(encounters);

            let primitiveCount = this._vertices.length / 2;
            if (primitiveCount == 0)
                return;

            Graphics.Instance.batcher.drawTriangles(this.entity.id, BatcherOrder.debug, this._vertices.buffer, this._indices.buffer);
        }

        public getOverlappedColliders(){
            return Physics.overlapCircleAll(this.entity.position, 400, PolyLight._colliderCache, Physics.allLayers);
        }

        public addVert(position: Vector2) {
            let index = this._vertices.length;
            this._vertices.ensureCapacity();
            this._vertices.buffer[index] = position;
            this._vertices.length ++;
        }

        public computeTriangleIndices(totalTris: number = 20){
            this._indices.reset();

            for (let i = 0; i < totalTris; i += 2) {
                this._indices.add(0);
                this._indices.add(i + 2);
                this._indices.add(i + 1);
            }
        }

        public generateVertsFromEncounters(encounters: Vector2[]){
            this._vertices.reset();

            this.addVert(this.entity.transform.position);

            for (let i = 0; i < encounters.length; i ++)
                this.addVert(encounters[i]);

            let triIndices = this._indices.length / 3;
            if (encounters.length > triIndices)
                this.computeTriangleIndices(encounters.length);
        }
    }
}