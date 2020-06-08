let proyects = ['js-snake', 'js-sierpinski_polygon', 'js-curves_foto_editing', 'js-flappy_dot', 'js-fountain_drawing', 'js-maze_drawer', 'js-recursive_tree_drawing', 'js-rolling_circles', 'js-symmetric_drawings', 'js-olympic_particles', 'js-boid_simulation', 'js-fireworks'];
let names = ['Snake', 'Sierpinski polygon', 'Curves photo editing', 'Flappy dot', 'Fountain drawing', 'Maze drawer', 'Recursive tree drawing', 'Rolling circles', 'Symmetric drawings', 'Olympic particles', 'Boid simulation', 'Fireworks'];
let imgs = [], logo;
let titleSize = 72, border=3, namesSize=30;
let scrolled = 0, wheelSensitivity = 1/5, maxScroll = Infinity, circleR=8;
let dragging = false;
let simulation = null, obstacles = [], nBoids = 150;

function preload() {
	// Load logo
	logo = loadImage('https://raw.githubusercontent.com/pabloqb2000/Click_math/gh-pages/imgs/logo_small.png',
			 (logo) => logo.resize(windowWidth/2,0),
			 () => logo = null);

	// Load imgs
	for(let p of proyects) {
		let name = 'https://raw.githubusercontent.com/pabloqb2000/' + p + '/'+ (p=="js-recursive_tree_drawing" ? 'master' : 'gh-pages') +'/imgs/screenshot01.png';
		let img = loadImage(name,
			 (img) => img.resize(windowWidth/3,0), 
			 () => console.log(name));
		imgs.push(img);
	}

}

function setup() {
	textFont('Orbitron');
	createCanvas(windowWidth, windowHeight);
	background(32);
}

function draw() {
	background(32);

	fill(dragging ? 230 : 200);
	ellipse(width - circleR, scrolled/maxScroll*(height - 3*circleR) + circleR, circleR, circleR);
	if(dragging) {
		scrolled = lerp(scrolled, (mouseY-circleR)/(height - 2*circleR)*maxScroll, 0.1);
		scrolled = min(maxScroll, max(0, scrolled))
	}

	translate(0, -scrolled);

	// Draw simulation
	if(simulation != null) {
		simulation.update();
		simulation.draw();
	}

	// Draw title
	if(logo == null) {
		noStroke();
		textStyle(BOLD);
		textSize(titleSize);
		textAlign(LEFT);
		let w = textWidth("Click math")/2 - width/2;
		fill(227, 103, 86);
		text("Click", -w, titleSize*1.5);
		fill(86, 210, 227);
		text("math", -w + textWidth("Click "), titleSize*1.5);
	} else {
		image(logo, width/2 - logo.width/2, 0);
		titleSize = 1.2*logo.height/3;
	}

	// Draw images
	noStroke();
	textStyle(NORMAL);
	textSize(namesSize);
	textAlign(CENTER);
	let h = titleSize*3;
	let maxH = 0;
	for(let i = 0; i < imgs.length; i++) {
		if(i%2==0) {
			if(i != imgs.length-1) {
				maxH = max(imgs[i].height, imgs[i+1].height);
			} else {
				maxH = imgs[i].height;
			}

			if(mouseX > width/9 && mouseX < width/9 + imgs[i].width && mouseY + scrolled > h && mouseY + scrolled < h + maxH){
				fill(230);
				b = border + 2;
				textSize(namesSize*1.2);
				if(mouseIsPressed && !dragging) {
					clicked(i);
				}
			} else {
				fill(200);
				b = border;
				textSize(namesSize);
			}

			rect(width/9 - b, h + (maxH - imgs[i].height)/2 - b, imgs[i].width + b*2, imgs[i].height + b*2, b);
			image(imgs[i], width/9, h + (maxH - imgs[i].height)/2);
			text(names[i], width/9 - b + imgs[i].width/2, h + maxH + namesSize*1.5);

			if(simulation == null)
				obstacles.push(new RectObst(width/9, h + (maxH - imgs[i].height)/2, imgs[i].width, imgs[i].height));

			if(i == imgs.length-1)
				h += maxH + namesSize*5;
		} else {
			if(mouseX > width*11/18 && mouseX < width*11/18 + imgs[i].width && mouseY + scrolled > h && mouseY + scrolled < h + maxH){
				fill(230);
				b = border + 2;
				textSize(namesSize*1.2);
				if(mouseIsPressed && !dragging) {
					clicked(i);
				}
			} else {
				fill(200);
				b = border;
				textSize(namesSize);
			}

			rect(width*11/18 - b, h + (maxH - imgs[i].height)/2 - b, imgs[i].width + b*2, imgs[i].height + b*2, b);
			image(imgs[i], width*11/18, h + (maxH - imgs[i].height)/2);
			text(names[i], width*11/18 - b + imgs[i].width/2, h + maxH + namesSize*1.2);
			
			if(simulation == null)
				obstacles.push(new RectObst(width*11/18, h + (maxH - imgs[i].height)/2, imgs[i].width, imgs[i].height));

			h += maxH + namesSize*5;
		}
	}
	
	textSize(namesSize/2);
	fill(227, 226, 86);
	text("All code is available on GitHub", width/2, h);
	fill(105, 227, 86);
	text("Search for user Pabloqb2000", width/2, h+namesSize/2+10);

	maxScroll = h - height + namesSize + 30;

	if(simulation == null) simulation = new BoidSimulation(nBoids, width, h + namesSize + 30, obstacles);
}

function clicked(i) {
	window.location.href = 'https://pabloqb2000.github.io/' + proyects[i] + '/';
}
