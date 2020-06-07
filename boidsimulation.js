class BoidSimulation {
    /**
     * 
     * @param n number of initial boids
     * @param w width of the simulation
     * @param h height of the simulation
     * @param obst additional obstacles
     */
    constructor(n, w, h, obst) {
        this.boids = [];
        this.w = w;
        this.h = h;
        
        // Default parameters
        this.viewR = 25;
        this.separation = 0.14;
        this.cohesion = 0.12;
        this.alignment = 0.05;
        this.avoidance = 0.25;
        this.maxVel = 1.8;

        // Add obstables
        this.obstacles = [
            new WallObst(0, titleSize*3/1.2),
            new WallObst(1, w),
            new WallObst(2, h),
            new WallObst(3, 0),
            new MouseObst(),
        ];

        this.obstacles = this.obstacles.concat(obst);

        // Add boids
        for(let i = 0; i < n; i++) {
            this.newBoid();
        }
    }

    /**
     * Adds new boid to the system
     */
    newBoid() {
        this.boids.push(new Boid(this.randomNewPos(), this));
    }

    /**
     * Returns an available random new position
     */
    randomNewPos() {
        let p;
        do {
            p = new Vector([random(this.w), random(this.h)]);
        } while(this.obstacles.map(o => o.isIn(p)).reduce((x,y) => x || y));
        return p;
    }

    /**
     * First update the cell system
     * then update all the boids
     */
    update() {
        // Create cells
        this.cells = Array(ceil(this.h / this.viewR)).fill()
            .map(() => Array(ceil(this.w / this.viewR)).fill()
            .map(() => Array(0)));

        // Fill cells
        for(let b of this.boids) {
            this.getCell(b).push(b);
        }

        // Update boids
        for(let b of this.boids) {
            //b.update(this.boids, this.obstacles);
            b.update(this.getNeighbours(b), this.obstacles);
        }
    }

    /**
     * Get the cell corresponding to a boid
     */
    getCell(b) {
        return this.cells[floor(b.pos.getY() / this.viewR)][floor(b.pos.getX() / this.viewR)];
    }

    /**
     * Get the boids in the cell and the neighbour cells of the given boid
     */
    getNeighbours(b) {
        let i = floor(b.pos.getY() / this.viewR);
        let j = floor(b.pos.getX() / this.viewR);
        let n = this.cells[i][j];
        
        if(i > 0){ 
            n = n.concat(this.cells[i-1][j]);
            if(j > 0) n = n.concat(this.cells[i-1][j-1]);
        }
        if(j > 0) {
            n = n.concat(this.cells[i][j-1]);
            if(i < this.cells.length - 1) n = n.concat(this.cells[i+1][j-1])
        }
        if(i < this.cells.length - 1){ 
            n = n.concat(this.cells[i+1][j]);
            if(j < this.cells[0].length - 1) n = n.concat(this.cells[i+1][j+1]);
        }
        if(j < this.cells[0].length - 1) {
            n = n.concat(this.cells[i][j+1]);
            if(i > 0) n = n.concat(this.cells[i-1][j+1]);
        }

        return n;
    }

    /**
     * Draw all boids
     */
    draw() {
        for(let b of this.boids) {
            b.draw();
        }
    }
}