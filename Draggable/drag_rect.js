class DragRect extends DragElement{
    /**
     * 
     * @param pos Initial position
     * @param w Width of the rectangle
     * @param h Height of the rectangle
     * @param r Radius of the corner of the rectangle
     * @param onDrag Action to perform when the object is dragged
     * @param onClick Action to perform when the object is clicked
     */
    constructor(pos, w=40, h=20, r=5, onDrag=null, onClick=null) {
        super(pos, true, true, false, onDrag, onClick);
        this.w = w;
        this.h = h;
        this.r = r;
    }

    /**
     * Draw the object
     */
    draw() {
        fill(this.highlighted ? 200 : 230);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.w, this.h, this.r);
        rectMode(CORNER);
    }

    /**
     * Check if mouse is over the object
     */
    mouseIsOver() {
        return mouseX >= this.pos.x -this.w/2 && mouseX <= this.pos.x + this.w/2
         && mouseY >= this.pos.y -this.h/2 && mouseY <= this.pos.y + this.h/2;
    }
}