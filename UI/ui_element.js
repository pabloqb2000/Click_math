/**
 * Generic element to be inside the UI
 */
class UiElement{
    /**
     * Constructor of the generic UI Element
     * 
     * @param x X position of the element 
     * @param y Y position of the element
     * @param width Width of the element
     * @param height Height of the element
     * @param draggable True if the element should be updated on mouseDragged
     * @param clickable True if the element should be updated on mouseClicked
     * @param wheelable True if the element should be updated on mouseWheel
     * @param visible Default visibility
     */
    constructor(x, y, width, height, draggable, clickable, wheelable=false, popUpDraw=false, visible=true){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.draggable = draggable;
        this.clickable = clickable;
        this.wheelable = wheelable;

        this.highlighted = false;
        this.visible = visible;
        this.popUpDraw = popUpDraw;

        UI.addElement(this);
    }

    /**
     * @return The width of the element
     */
    getWidth() {
        return this.width;
    }

    /**
     * @return The height of the element
     */
    getHeight() {
        return this.height;
    }

    /**
     * Draws empty element
     */
    draw() {

    }

    /**
     * Checks if mouse is inside the slider
     * if so highlights the slider
     */
    update() {
        this.highlighted = this.mouseIsOver();    
    }

    /**
     * @return true if the mouse is over the element
     */
    mouseIsOver(){
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    /**
     * Sets the new position of the element 
     * 
     * @param x 
     * @param y
     */
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
}