/**
 * Slider to choose a value between start and end
 * in step intervals
 * If step is set to null then the slider is continous
 */
class Slider extends UiElement{

    /**
     * Constructor of the slider
     * 
     * @param start Minimum value of the slider
     * @param end Maximum value of the slider
     * @param value Default value of the slider
     * @param x X position of the slider
     * @param y Y position of the slider
     * @param width Width of the slider
     * @param height Height of the slider
     * @param step Size of the discrete steps of the slider if is set to null slider is continuous
     * @param text Text to show after the slider
     * @param showVal Whether to show the value under the bar
     * @param decimals Decimals to show under the bar
     * @param action Action to perform when value is changed
     */
    constructor(start=0, end=1, value=0.5, x=20, y=20, width=100, height=10, step=null, text="",
                showVal=true, decimals=1, action=null){
        super(x,y,width,height, true, true, true);

        this.start = start;
        this.end = end;
        this.value = value;
        
        this.step = step;
        this.text = text; 
        this.showVal = showVal;
        this.decimals = decimals;
        this.action = action;

        this.wheelSensitivity = 1/3000;
    }

    /**
     * Draws the slider
     */
    draw() {
        // Draw the horizontal line
        strokeWeight(2);
        stroke(128);
        line(this.x, this.y+this.height/2-1, this.x + this.width, this.y+this.height/2-1);

        // Draw the middle rectangle
        noStroke();
        fill(this.highlighted ? 200 : 230);
        rect(this.x + this.width*this.percent() - this.width/40, this.y, this.width/20, this.height, this.width/120);
        
        // Draw the text
        textAlign(LEFT);
        textSize(this.height*1.4);
        text(this.text, this.x + this.width + 10, this.y + this.height*0.75);

        // Draw the value
        if(this.showVal){
            textAlign(CENTER);
            textSize(this.height*1.4);
            text(this.value.toFixed(this.decimals).toString(), this.x + this.width*this.percent(), this.y + this.height*2);
        }    
    }

    /**
     * Overrides the way width is calculated
     * @return The width considering the text
     */
    getWidth() {
        textSize(this.height*1.4);
        return this.width + textWidth(this.text) + 10;
    }

    /**
     * Overrides the way height is calculated
     * @return The height considering the text
     */
    getHeight() {
        return this.showVal ? this.height*2 : this.height;
    }

    /**
     * Action performed when the slider is clicked
     */
    clicked() {
        if(this.mouseIsOver())
            this.dragged();
    }

    /**
     * @return the percentage representing where is the value along the range
     */
    percent() {
        return (this.value - this.start) / (this.end - this.start);
    }

    /**
     * Changes the value to the given one
     * Croping it to the start and end
     * and rounding it if step != null 
     * 
     * @param v New value
     */
    changeValue(v) {
        let oldValue = this.value;
        this.value = max(this.start, min(v, this.end));
        if(this.step != null) {
            this.value = round(this.value / this.step)*this.step;
        }
        if(this.value != oldValue && this.action != null)
            this.action();
    }

    /**
     * Updates the slider
     */
    dragged(){
        this.changeValue((mouseX - this.x)/this.width * (this.end - this.start) + this.start);
    }

    /**
     * Response to the mouseWheel event
     */
    wheel(event) {
        if(this.mouseIsOver()) {
            this.changeValue(this.value + 
                event.delta*this.wheelSensitivity*(this.end - this.start));
        }
    }
}
