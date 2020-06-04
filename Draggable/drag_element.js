class DragElement {
    /**
     * Constructor of a draggable element
     * 
     * @param pos Initial positon of the object
     * @param visible True if the object is visible
     * @param draggable True if the object is draggable
     * @param clickable True if the object is clickable
     * @param onDrag action to perform when the object is dragged
     * @param onClick action to perform when the object is clicked 
     */
    constructor(pos, visible, draggable, clickable, onDrag, onClick) {
        this.pos = pos;
        this.visible = visible;
        this.draggable = draggable;
        this.clickable = clickable;
        this.onDrag = onDrag;
        this.onClick = onClick;

        this.highlighted = false;

        Drag.addElement(this);
    }

    /**
     * Highlights the object if the mouse is over
     */
    update() {
        this.highlighted = this.mouseIsOver();
    }

    /**
     * If the mouse is over the element
     * dragg it to the mouse position
     * and perform the on drag action
     */
    dragged() {
        this.pos = createVector(mouseX, mouseY);
        if(this.onDrag != null) this.onDrag();
    }

    /**
     * If the mouse is over the element
     * perform the onClick action
     */
    clicked() {
        if(this.onClick != null && this.mouseIsOver()) this.onClick();
    }
}