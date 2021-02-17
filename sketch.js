let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 124124;
let paused = false;

let sceneWidth = rendering ? window.innerWidth / 2 : window.innerWidth;

document.getElementById("heading").innerText = rendering
	? "Move and Rotate using Arrow Keys"
	: "Press spacebar to toggle between User-Guided and Random Movement.";

function setup() {
	canv = createCanvas(window.innerWidth - 100, window.innerHeight - 150);
	canv.id("myCanvas");

	for (let i = 0; i < random(4, 7); i++) {
		let x1, x2, y1, y2, col;

		col = rendering
			? color(random(0, 255), random(0, 255), random(0, 255))
			: color(255, 255, 255);

		x1 = rendering ? random(width / 2 - 20) : random(width - 20);
		y1 = random(height);
		x2 = rendering ? random(width / 2 - 20) : random(width - 20);
		y2 = random(height);

		walls[i] = new Boundary(x1, y1, x2, y2, col);
	}

	// walls[0] = new Boundary(150, 150, 150, 300);
	// walls[1] = new Boundary(400, 400, 400, 300);

	walls.push(
		new Boundary(
			0,
			0,
			rendering ? width / 2 - 20 : width,
			0,
			color(255, 0, 0)
		)
	);
	walls.push(
		new Boundary(
			rendering ? width / 2 - 20 : width,
			0,
			rendering ? width / 2 - 20 : width,
			height,
			color(255, 0, 0)
		)
	);
	walls.push(
		new Boundary(
			rendering ? width / 2 - 20 : width,
			height,
			0,
			height,
			color(255, 0, 0)
		)
	);
	walls.push(new Boundary(0, height, 0, 0, color(255, 0, 0)));

	particle = new Particle();
	ray = new Ray(100, 200);
}

function draw() {
	background(0);

	for (let wall of walls) {
		wall.show();
	}

	if (usingMouse) {
		if (rendering) {
			if (keyIsDown(RIGHT_ARROW)) {
				particle.rotate(0.05);
			} else if (keyIsDown(LEFT_ARROW)) {
				particle.rotate(-0.05);
			} else if (keyIsDown(UP_ARROW)) {
				particle.move(2);
			} else if (keyIsDown(DOWN_ARROW)) {
				particle.move(-2);
			}
		} else {
			particle.update(mouseX, mouseY);
		}
	} else {
		if (rendering) {
			particle.update((noise(xoff) * width) / 2, noise(yoff) * height);
		} else {
			particle.update(noise(xoff) * width, noise(yoff) * height);
		}
		// particle.rotate(random(-0.05, 0.05));
	}

	if (!paused) {
		xoff += 0.005;
		yoff += 0.005;
	}
	particle.show();

	reqArr = particle.look(walls);
	const scene = reqArr[0];
	const wallcolors = reqArr[1];

	if (rendering) {
		push();
		translate(window.innerHeight, 0);
		const w = window.innerWidth / (scene.length * 2);
		for (let i = 0; i < scene.length; i++) {
			noStroke();

			const sq = scene[i] * scene[i];
			const wSq = sceneWidth * sceneWidth;
			const b = map(sq, 0, wSq, 255, 0);
			// const b = map(scene[i], 0, sceneWidth / 2, 255, 0);
			const h = map(scene[i], 0, sceneWidth, window.innerHeight, 0);
			const bright = b / 255;
			wallc = wallcolors[i];
			fill(
				`rgba(${wallc.levels[0]}, ${wallc.levels[1]}, ${
					wallc.levels[2]
				}, ${bright >= 0 ? bright : 0})`
			);
			// fill(
			// 	`rgba(${wallc.levels[0]}, ${wallc.levels[1]}, ${wallc.levels[2]}, ${b})`
			// );
			rectMode(CENTER);
			if (keyIsDown(32)) {
				console.log(b / 255 + 0.1);
			}
			rect(i * w + w / 2, window.innerHeight / 2, w + 1.1, h);
		}
		pop();
	}

	// ray.show();
	// ray.lookAt(mouseX, mouseY);
	// let pt = ray.cast(wall);
	// // console.log(pt);
	// if (pt) {
	// 	fill(255);
	// 	ellipse(pt.x - 100, pt.y - 200, 10);
	// }
}

document.onkeypress = function (e) {
	if (e.keyCode == 32 && !paused && !rendering) {
		usingMouse = !usingMouse;
	} else if ((e.key == "p" || e.key == "P") && !usingMouse) {
		paused = !paused;
	}
};

document.onclick = () => {
	c = document.getElementById("myCanvas").style.cursor;
	document.getElementById("myCanvas").style.cursor =
		c != "none" ? "none" : "";
};
