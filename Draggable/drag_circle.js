class DragCircle extends DragElement{
    /**
     * 
     * @param pos Initial position
     * @param r Radius of the element
     * @param onDrag Action to perform when the object is dragged
     * @param onClick Action to perform when the object is clicked
     */
    constructor(pos, r=15, onDrag=null, onClick=null) {
        super(pos, true, true, onClick == null, onDrag, onClick);
        this.r = r;
    }

    /**
     * Draw the object
     */
    draw() {
        fill(this.highlighted ? 200 : 230);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

    /**
     * Check if mouse is over the object
     */
    mouseIsOver() {
        return createVector(mouseX, mouseY).dist(this.pos) <= this.r;
    }
}