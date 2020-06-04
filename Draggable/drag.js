class Drag {
    static elements = [];
    static selected = null;

    /**
     * Adds the new draggable element
     * 
     * @param element New element to be added
     */
    static addElement(element){
        this.elements.push(element);
    }

    /**
     * Update all the draggable elemets
     */
    static update() {
        for (let e of this.elements){
            if(e.visible)
                e.update();
        }
    }

    /**
     * Draw all the elements
     */
    static draw() {
        for (let e of this.elements){
            if(e.visible)
                e.draw();
        }
    }

   /**
     * Update the selected
     */
    static mouseDragged() {
        if(Drag.selected != null) {
            Drag.selected.dragged();
        }
    }

    /**
     * Update all the clickable elements
     */
    static mouseClicked() {
        for(let e of this.elements) {
            if(e.clickable)
                e.clicked();
        }
    }

    /**
     * When mouse is down select an element
     */
    static mousePressed() {
        for(let e of this.elements) {
            if(e.draggable && e.mouseIsOver()){
                Drag.selected = e;
                return;
            }
        }
    }
    
    /**
     * When mouse is released deselect the element
     */
    static mouseReleased() {
        Drag.selected = null;
    }
}