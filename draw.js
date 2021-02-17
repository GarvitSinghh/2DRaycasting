document.getElementById("heading").innerText =
	"Use clicks to draw walls. C - Cast/Uncast. Spacebar - Movement Method";
let drawing = false;
let currX, currY;
let casting = false;
let particle;
let xoff = 0;
let yoff = 124141;
let usingMouse = false;

let walls = [];

function setup() {
	canv = createCanvas(window.innerWidth - 100, window.innerHeight - 150);
	canv.id("myCanvas");
	background(0);

	walls.push(new Boundary(0, 0, 0, width));
	walls.push(new Boundary(0, 0, width, 0));
	walls.push(new Boundary(width, 0, width, height));
	walls.push(new Boundary(width, height, 0, height));

	particle = new Particle();
	ray = new Ray(100, 200);
}

function mouseClicked() {
	if (!usingMouse) {
		if (drawing) {
			walls.push(
				new Boundary(
					mouseX,
					mouseY,
					currX,
					currY,
					color(255, 255, 255),
					10
				)
			);
			drawing = false;
		} else {
			drawing = true;
			currX = mouseX;
			currY = mouseY;
		}
	}
}

function keyPressed() {
	if (keyCode == 67) {
		casting = !casting;
	}
	if (casting) {
		if (keyCode == 32) {
			usingMouse = !usingMouse;
		}
	}
}

function draw() {
	background(0);

	for (wall of walls) {
		wall.show();
	}

	if (casting) {
		if (usingMouse) {
			particle.update(mouseX, mouseY);
		} else {
			particle.update(noise(xoff) * width, noise(yoff) * height);
			xoff += 0.005;
			yoff += 0.005;
		}
		particle.show();

		reqArr = particle.look(walls);
	}
	if (drawing) {
		stroke(0, 0, 255, 100);
		strokeWeight(10);
		line(currX, currY, mouseX, mouseY);
	}

	usingMouse ? noCursor() : cursor(CROSS);

	if (!casting) {
		stroke(255, 255, 255, 25);
		strokeWeight(1);
		line(mouseX, 0, mouseX, height);
		line(0, mouseY, width, mouseY);
	}

	// for (let i = 0; i < ends.length; i++) {
	// 	stroke(255, 255, 255);
	// 	strokeWeight(10);
	// 	line(starts[i][0], starts[i][1], ends[i][0], ends[i][1]);
	// }
}
