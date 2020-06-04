let sld, btn, tggl, cPicker, optBox;
let circle, rectangle;

function setup() {
	createCanvas(windowWidth, windowHeight+5);
	background(32);

	// Create UI elements
	sld = new Slider(start=0, end=255, value=32, 0, 0, width/12, height/60, null, "Background");
	btn = new Button(x=0, y=0, width/12, height/30, "Reset", resetValue);
	
	tggl = new ToggleButton(0,0,width/12,height/30,"Discrete", discretice);
	cPicker = new ColorPicker(0,0, width/12, height/30, null, "Color 1");

	optBox = new OptionsBox(["Option1", "Option2", "Option3"], 20, () => console.log("Option changed"));

	// Add two draggable elements
	circle = new DragCircle(createVector(width/2 + 40, height/2 + 40), 20);
	rectangle = new DragRect(createVector(width/2 - 40, height/2 - 40), 40, 40);

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	// Draw UI and draggable elements
	background(sld.value);
	UI.update();
	UI.draw();
	Drag.update();
	Drag.draw();

	
	translate(13/24*width, height/2);
	scale(1,-1);
}

function resetValue() {
	sld.value = 32;
}

function discretice() {
	sld.step = (sld.step == null ? 20 : null);
}
