/**
 * Button wich performs the fiven action when clicked
 */
class Button extends UiElement{
    /**
     * Constructor of the button
     * 
     * @param x X position of the button 
     * @param y Y position of the button 
     * @param width Width of the button
     * @param height Height of the button
     * @param text Text of the button
     * @param action Action to perform when button is clicked
     */
    constructor(x=20, y=20, width=50, height=10, text="", action=null) {        
        super(x,y,width,height, false, true);

        this.text = text;
        this.action = action;
    }

    /**
     * Draws the button
     */
    draw() {
        // Draw the rectangle
        noStroke();
        fill(this.highlighted ? 200 : 230);
        rect(this.x, this.y, this.width, this.height, this.height/9);

        // Draw the text
        textAlign(CENTER);
        textSize(this.height*0.7);
        fill(20);
        text(this.text, this.x + this.width/2, this.y + this.height*0.75);
    }

    /**
     * Checks if mouse is inside the button
     * if so performs the action
     */
    clicked() {
        if(this.mouseIsOver()) {
            this.action();
        }
    }
    
}