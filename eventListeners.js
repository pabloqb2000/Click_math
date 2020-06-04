//function mouseDragged() {
//	UI.mouseDragged();
//	Drag.mouseDragged();
//}

function mousePressed() {
	//UI.mousePressed();
	//Drag.mousePressed();
	dragging = mouseX > width - circleR*2 && mouseY > circleR && mouseY < height - 2*circleR;
}

//function mouseClicked() {
//    UI.mouseClicked();
//	Drag.mouseClicked();
//}

function mouseReleased() {
    //UI.mouseReleased();
	//Drag.mouseReleased();
	dragging = false;
}

function mouseWheel(event) {
	//UI.mouseWheel(event);
	scrolled = min(maxScroll, max(0, scrolled + event.delta*wheelSensitivity));
}

// function keyPressed() {
//   if(keyCode === 83){
//
//   }
// }

