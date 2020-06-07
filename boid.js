class Boid {
    /**
     * 
     * @param pos Initial position 
     */
    constructor(pos, simulation, size=10) {
        this.pos = pos;
        this.size = size;
        this.sim = simulation;
        this.vel = Vector.random2D();
        this.acc = Vector.random2D();

        this.angle = PI/6;
        this.showInfo = false;
    }

    /**
     * Update this boid based on it's neighbour boids and the obstacles
     */
    update(neighbours, obstacles) {
        neighbours = neighbours.filter(n => n.pos != this.pos && n.pos.dist(this.pos) < this.sim.viewR);
        obstacles = obstacles.filter(o => o.nearestPt(this.pos).dist(this.pos) < this.sim.viewR);

        if(neighbours.length > 0) {
            let sep = this.separation(neighbours).mult(this.sim.separation);
            let coh = this.cohesion(neighbours).mult(this.sim.cohesion);
            let alg = this.align(neighbours).mult(this.sim.alignment);
            let avd = this.avoid(obstacles).mult(this.sim.avoidance);
            this.acc = sep.add(coh).add(alg).add(avd);
        } else {
            this.acc = this.avoid(obstacles).mult(this.sim.avoidance);
        }

        this.vel.add(this.acc).limit(this.sim.maxVel);
        this.pos.add(this.vel);

        // If position is out of boundries loop it back on the other side
        this.pos.set(0, this.pos.getX() + (this.pos.getX() > this.sim.w ? -this.sim.w : 0));
        this.pos.set(0, this.pos.getX() + (this.pos.getX() < 0 ? this.sim.w : 0));
        this.pos.set(1, this.pos.getY() + (this.pos.getY() > this.sim.h ? -this.sim.h : 0));
        this.pos.set(1, this.pos.getY() + (this.pos.getY() < 0 ? this.sim.h : 0));
    }

    /**
     * Separate from the neighbour boids
     */
    separation(neighbours) {
        let sep = neighbours.map(n => n.pos.copy().sub(this.pos))
        sep = sep.map(n => n.setNorm(-1/n.norm())).reduce((x,y) => x.add(y));
        return sep.setNorm(this.sim.maxVel);
    }

    /**
     * Move towards the average position of neighbour boids
     */
    cohesion(neighbours) {
        return neighbours.map(n => n.pos.copy()).reduce((x,y) => x.add(y)).div(neighbours.length)
            .sub(this.pos).setNorm(this.sim.maxVel);
    }

    /**
     * Align with the neighbour boids
     */
    align(neighbours) {
        return neighbours.map(n => n.vel.copy()).reduce((x,y) => x.add(y)).setNorm(this.sim.maxVel);
    }

    /**
     * Avoid the obstacles
     */
    avoid(obstacles) {
        return obstacles.length > 0 ?
            obstacles.map(o => Vector.sub(this.pos, o.nearestPt(this.pos)))
            .map(p => p.setNorm(1/p.norm())).reduce((x,y) => x.add(y)).setNorm(this.sim.maxVel) :
            new Vector([0,0]);
    }

    /**
     * Draw this boid
     */
    draw() {
        noFill();
        strokeWeight(1);
        stroke(128);

        // Draw shape
        beginShape();
        
        let pt = this.vel.copy().setNorm(this.size*cos(this.angle)).add(this.pos);
        vertex(pt.getX(), pt.getY());
        
        let h = this.size*sin(this.angle);
        let l = h/(1-h/pt.norm());
        pt.sub(this.pos).rotate(3*PI/4).setNorm(l).add(this.pos);
        vertex(pt.getX(), pt.getY());

        //vertex(this.pos.getX(), this.pos.getY());

        pt.sub(this.pos).rotate(PI/2).add(this.pos);
        vertex(pt.getX(), pt.getY());

        endShape(CLOSE);
    }
}