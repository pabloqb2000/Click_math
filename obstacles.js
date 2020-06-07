/**
 * All obstacles should have and isIn method and a nearestPt method
 */

class WallObst {
    constructor(side, pos) {
        this.side = side;
        this.pos = pos;
    }

    nearestPt(pt) {
        if(this.side % 2 == 0)
            return new Vector([pt.getX(), this.pos]);
        else
            return new Vector([this.pos, pt.getY()]);
    }

    isIn(pt) {
        return (this.side == 0 && pt.getY() < this.pos) ||
               (this.side == 1 && pt.getX() > this.pos) ||
               (this.side == 2 && pt.getY() > this.pos) ||
               (this.side == 3 && pt.getX() < this.pos);
    }
}

class MouseObst {
    nearestPt(pt) {
        return new Vector([mouseX, mouseY + scrolled]);
    }
    isIn(pt) {
        return false;
    }
}

class RectObst {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
    }

    nearestPt(pt) {
        if(this.isIn(pt)) {
            return new Vector([0, 0]);
        } else {
            return new Vector([
                min(this.pos.x + this.w, max(pt.getX(), this.pos.x)),
                min(this.pos.y + this.h, max(pt.getY(), this.pos.y)),
            ]);
        }
    }

    isIn(pt) {
        return pt.getX() < this.pos.x + this.w &&
               pt.getY() < this.pos.y + this.h &&
               pt.getX() > this.pos.x &&
               pt.getY() > this.pos.y;
    }
}