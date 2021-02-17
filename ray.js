let alpha = 50;
function mouseWheel(event) {
	alpha -= event.delta > 1 ? 10 : -10;
	// alpha -= event.delta;
}

class Ray {
	constructor(pos, angle) {
		this.pos = pos;
		this.dir = p5.Vector.fromAngle(angle);
	}

	lookAt(x, y) {
		this.dir.x = x - this.pos.x;
		this.dir.y = y - this.pos.y;
		this.dir.normalize();
	}

	setAngle(a) {
		this.dir = p5.Vector.fromAngle(a);
	}

	show() {
		strokeWeight(1);

		if (alpha < 20) {
			alpha = 20;
		}
		if (alpha > 250) {
			alpha = 250;
		}

		stroke(255, alpha);
		push();
		translate(this.pos.x, this.pos.y);
		line(0, 0, this.dir.x * 10, this.dir.y * 10);
		pop();
	}

	cast(wall) {
		const x1 = wall.a.x;
		const y1 = wall.a.y;
		const x2 = wall.b.x;
		const y2 = wall.b.y;

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + this.dir.x;
		const y4 = this.pos.y + this.dir.y;

		const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

		if (denominator == 0) return;

		const tNumerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);

		const t = tNumerator / denominator;

		const uNumerator = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

		const u = uNumerator / denominator;

		if (t > 0 && t < 1 && u > 0) {
			const pt = createVector();
			pt.x = x1 + t * (x2 - x1);
			pt.y = y1 + t * (y2 - y1);
			return pt;
		} else {
			return;
		}
	}
}
