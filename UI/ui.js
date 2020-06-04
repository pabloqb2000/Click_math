/**
 * Class to control all the ui elements
 */
class UI{
    static elements = [];
    static distributed = 0;
    static tableWidth = 0;
    static tableHeight = 0;
    static widthMargin = 20;
    static heightMargin = 20;
    static selected = null;

    /**
     * Adds the element to the UI 
     * 
     * @param element New element to be added
     */
    static addElement(element){
        this.elements.push(element);
    }

    /**
     * Distributes the elemets of the UI
     * changing their coordinates
     */
    static distrubute() {
        this.distributed = 0;
        let colWidth = this.getColWidth();
        let rowHeight = this.getRowHeight();
        for(let e of this.elements){
            if(e.visible) {
                let col = this.distributed % this.tableWidth;
                let row = floor(this.distributed / this.tableWidth);
                e.setPos(colWidth*col + this.widthMargin, rowHeight*row + this.heightMargin);
                this.distributed += 1;
            }
        }    
    }

    /**
     * @return The width of the widest element + the width margin
     */
    static getColWidth() {
        let maxWidth = 0;
        for (let e of this.elements)
            if(e.getWidth() > maxWidth)
                maxWidth = e.getWidth();
        return maxWidth + this.widthMargin;
    }

    /**
     * @return The height of the highest element + the height margin
     */
    static getRowHeight() {
        let maxHeight = 0;
        for(let e of this.elements)
            if(e.getHeight() > maxHeight)
                maxHeight = e.getHeight();
        return maxHeight + this.heightMargin;
    }

    /**
     * Update all the elemets in the ui
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
        // After everything draw the popUps
        for (let e of this.elements){
            if(e.popUpDraw)
                e.popUp();
        }
    }

    /**
     * Update the selected
     */
    static mouseDragged() {
        if(UI.selected != null) {
            UI.selected.dragged();
        }
    }

    /**
     * Update the wheelable elements
     * 
     * @param event Wheel event
     */
    static mouseWheel(event) {
        for(let e of this.elements) {
            if(e.wheelable)
                e.wheel(event);
        }
    }

    /**
     * When mouse is down select an element
     */
    static mousePressed() {
        for(let e of this.elements) {
            if(e.draggable && e.mouseIsOver()){
                UI.selected = e;
                return;
            }
        }
    }

    /**
     * Update all the clickable elements
     */
    static mouseClicked() {
        UI.selected = null;
        // First click the popUps
        for(let e of this.elements) {
            if(e.popUpDraw) {
                if(e.popUpClicked()){
                    return;
                }                
            }
        } 
        
        // Then click the elements
        for(let e of this.elements) {
            if(e.clickable)
                e.clicked();
        }        
    }

    /**
     * When mouse is released deselect the element
     */
    static mouseReleased() {
        UI.selected = null;
    }
}