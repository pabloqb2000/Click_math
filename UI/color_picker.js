/**
 * Class that creates 3 sliders for:
 *  -hue
 *  -saturation
 *  -value
 * to define a color wich is shown next to the sliders
 */
class ColorPicker extends UiElement {
    /**
     * 
     * @param x X position of the first slider
     * @param y Y position of the secon slider
     * @param width Width of the sliders
     * @param height Height of the sliders
     * @param color Default color
     * @param action Action perfomed when color changes
     */
    constructor(x=20, y=20, width=100, height=10, color=null, text="", action=null) {
        super(x,y,width,height, false, true);
        this.text = text;
        this.action = action;

        this.configInput(color);
    }

    /**
     * Create a color input element
     * and hide it
     * 
     * @param color default color of the input (in hex)
     */
    configInput(color) {
        // Create and configure input
        this.input = document.createElement("input");
        this.input.setAttribute("type", "color");
        this.input.setAttribute("tabindex", "-1");

        this.input.value = color==null ? "#B7E2F0" : color;        
        this.input.style.visibility = "hidden";
        this.input.style.position = "absolute";
        this.input.style.left = this.x.toString() + "px";
        this.input.style.top = this.y.toString() + "px";
        this.input.style.height = (this.height-4).toString() + "px";

        document.body.appendChild(this.input);
    }

    /**
     * Sets the new position of the element 
     * and also sets the new position of the input
     * 
     * @param x 
     * @param y
     */
    setPos(x, y) { 
        this.x = x;
        this.y = y;
        this.input.style.left = this.x.toString() + "px";
        this.input.style.top = this.y.toString() + "px";
    }

    /**
     * Draws the rectangle representing the color
     */
    draw() {
        fill(this.highlighted ? 200 : 230);
        rect(this.x, this.y, this.width, this.height, this.height/9);
        // Draw the text
        textAlign(CENTER);
        textSize(this.height/2);
        text(this.text, this.x + this.width/2, this.y - this.height/6);

        fill(this.getColor());
        rect(this.x + 3, this.y + 3, this.width - 6, this.height - 6, this.height/9);
    }

    /**
     * @return the color choosen in this color picker
     */
    getColor() {
        return color(this.input.value);
    }

    /**
     * @return The height of the element
     */
    getHeight() {
        return this.text=="" ? this.height : this.height*1.5;
    }

    /**
     * Checks if mouse is inside the button
     * if so performs the action
     */
    clicked() {
        if(this.mouseIsOver()) {
            this.input.focus();
            this.input.click();
            if(this.action != null) this.action();
        }
    }
}