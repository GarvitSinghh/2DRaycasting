let rotationAngle = 0;

class Particle {
	constructor() {
		this.pos = createVector(width / 4, height / 2);
		this.rays = [];
		this.heading = 0;
		this.r = 15;

		if (rendering) {
			for (let a = -30; a < 30; a += 1) {
				this.rays.push(new Ray(this.pos, radians(a)));
			}
		} else {
			for (let a = 0; a < 360; a += 1) {
				this.rays.push(new Ray(this.pos, radians(a)));
			}
		}
	}

	rotate(angle) {
		this.heading += angle;
		// for (let i = 0; i < this.rays.length; i++) {
		// 	this.rays[i].setAngle(radians(i) + this.heading);
		// }

		let index = 0;
		for (let a = -30; a < 30; a += 1) {
			this.rays[index].setAngle(radians(a) + this.heading);
			index += 1;
		}
	}

	move(amt) {
		const vel = p5.Vector.fromAngle(this.heading);
		vel.setMag(amt);
		this.pos.add(vel);
	}

	update(x, y) {
		this.pos.set(x, y);
	}

	look(walls) {
		const scene = [];
		let wall_colors = [];
		for (let i = 0; i < this.rays.length; i++) {
			ray = this.rays[i];
			let closest = null;
			let record = Infinity;
			let lc = color(255, 255, 255);
			for (let wall of walls) {
				const pt = ray.cast(wall);
				if (pt) {
					const d = p5.Vector.dist(this.pos, pt);
					if (d < record) {
						record = d;
						closest = pt;
						lc = wall.c;
					}
				}
			}

			if (closest) {
				line(this.pos.x, this.pos.y, closest.x, closest.y);
			}
			scene[i] = record;
			wall_colors[i] = lc;
		}
		return [scene, wall_colors];
	}

	show() {
		fill(100);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.r * 2);
		for (let ray of this.rays) {
			ray.show();
		}
	}
}

document.addEventListener("keydown", function (e) {
	if (e.key === "w") {
		rotationAngle += 1;
		console.log("W PRESSED");
	} else if (e.key == "s") {
		rotationAngle -= 1;
		console.log("S PRESSED");
	}
	console.log(rotationAngle);
});
