class OptionsBox extends UiElement{
    /**
     * 
     * @param options Options to show in the box
     * @param height Height of the box
     * @param onChange Action to perform when value changes
     * @param x X position of the box
     * @param y Y position of the box
     */
    constructor(options, height=20, onChange=null, x=0,y=0) {
        textSize(height*0.6);
        let width = max(options.map(o => textWidth(o)));
        super(x, y, width + height, height, false, true, true, true);

        this.options = options;
        this.selected = options[0];
        this.onChange = onChange;

        this.opened;
    }

    /**
     * Draw the element
     */
    draw() {
        // Draw rectangle
        noFill();
        strokeWeight(1);
        stroke(this.highlighted ? 100 : 130);
        rect(this.x, this.y, this.width, this.height);

        // Draw triangle
        noStroke();
        fill(this.highlighted ? 100 : 130);
        let p1 = createVector(this.x + this.width -this.height + 7, this.y + 7);
        if(this.opened){
            let p1 = createVector(this.x + this.width -this.height + 7, this.y  + this.height - 7);
            triangle(p1.x, p1.y, p1.x + this.height - 12, p1.y, p1.x + (this.height - 12)/2, p1.y - this.height + 14);
        } else {
            let p1 = createVector(this.x + this.width -this.height + 7, this.y + 7);
            triangle(p1.x, p1.y, p1.x + this.height - 12, p1.y, p1.x + (this.height - 12)/2, p1.y + this.height - 14);
        }

        // Write text
        fill(this.highlighted ? 200 : 230);
        textSize(this.height*0.4);
        textAlign(CENTER, CENTER);
        text(this.selected, this.x + (this.width - this.height)/2 + 2, this.y + this.height/2);
        textAlign(LEFT, BASELINE);
    }

    /**
     * Draw pop up
     */
    popUp() {
        if(this.opened) {
            // Draw each option
            noFill();
            strokeWeight(1);

            // Draw rectangle
            for(let i = 1; i < this.options.length + 1; i++) {
                if(mouseX >= this.x && mouseX <= this.x + this.width &&
                        mouseY >= this.y + this.height*i && mouseY <= this.y + this.height*(i+1)) {
                    stroke(200);
                } else {
                    stroke(this.highlighted ? 100 : 130);
                }
                rect(this.x, this.y + this.height*i + i, this.width, this.height);
            }

            // Write text
            noStroke();
            textSize(this.height*0.4);
            textAlign(CENTER, CENTER);
            for(let i = 1; i < this.options.length + 1; i++) {
                if(mouseX >= this.x && mouseX <= this.x + this.width &&
                        mouseY >= this.y + this.height*i && mouseY <= this.y + this.height*(i+1)) {
                    fill(255);
                } else {
                    fill(this.highlighted ? 200 : 230);
                }
                text(this.options[i-1], this.x + (this.width - this.height)/2 + 2, this.y + (i+0.5)*this.height + i);
            }
            textAlign(LEFT, BASELINE);
        }
    }

    /**
     * Check if one option is clicked
     */
    popUpClicked() {
        if(this.opened){
            let lastOpt = this.selected;
            for(let i = 1; i < this.options.length + 1; i++) {
                if(mouseX >= this.x && mouseX <= this.x + this.width &&
                     mouseY >= this.y + this.height*i && mouseY <= this.y + this.height*(i+1)) {
                    this.selected = this.options[i-1];
                    this.opened = false;
                    if(this.selected != lastOpt && this.onChange != null) this.onChange();
                    return true;
                }
            }
        }
    }

    /**
     * Action performed when pop up is clicked
     */
    clicked() {
        if(this.mouseIsOver())this.opened = !this.opened;
    }

    /**
     * Response to the mouseWheel event
     */
    wheel(event) {
        if(this.mouseIsOver()) {
            let i = this.selectedIndex();
            let last_i = i;
            i += event.delta > 0 ? 1 : -1;
            i = max(0, min(i, this.options.length - 1));
            this.selected = this.options[i];
            if(this.onChange != null && i != last_i) this.onChange();
        }
    }

    /**
     * @return the selected item
     */
    selectedItem() {
        return this.selected;
    }

    /**
     * @return the index of the selected item
     */
    selectedIndex() {
        return this.options.indexOf(this.selected);
    }
}