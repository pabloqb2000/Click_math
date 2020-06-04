/**
 * Button wich can be disabled or enabled
 */
class ToggleButton extends Button{
    /**
     * Constructor of the toggle button
     * 
     * @param x X position of the button
     * @param y Y position of the button
     * @param width Width of the button 
     * @param height Height of the button
     * @param text Text of the button
     * @param action Action to perform when the button is toggled
     * @param active Default active value
     */
    constructor(x=20, y=20, width=50, height=10, text="", action=null, active=false){
        super(x, y, width, height, text, null);

        this.toggleAction = action;
        this.active = active;
    }


    /**
     * Overrides the way the button is drawn
     */
    draw() {
        // Draw the rectangle
        noStroke();
        fill((this.active ? 200 : 100) + (this.highlighted ? 0 : 30));
        rect(this.x, this.y, this.width, this.height, this.height/9);

        // Draw the text
        textAlign(CENTER);
        textSize(this.height*0.7);
        fill(20);
        text(this.text, this.x + this.width/2, this.y + this.height*0.75);
    }

    /**
     * Overrides the action performed when the button is clicked
     */
    clicked(){
        if(this.mouseIsOver()){
            this.active = !this.active;
            if(this.toggleAction != null)
                this.toggleAction();
        }
    }
}