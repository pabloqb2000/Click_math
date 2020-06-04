//function mouseDragged() {
//	UI.mouseDragged();
//	Drag.mouseDragged();
//}

//function mousePressed() {
//	UI.mousePressed();
//	Drag.mousePressed();
//}

//function mouseClicked() {
//    UI.mouseClicked();
//	Drag.mouseClicked();
//}

//function mouseReleased() {
//    UI.mouseReleased();
//	Drag.mouseReleased();
//}

function mouseWheel(event) {
	//UI.mouseWheel(event);
	scrolled = min(maxScroll, max(0, scrolled + event.delta*wheelSensitivity));
}

// function keyPressed() {
//   if(keyCode === 83){
//
//   }
// }

