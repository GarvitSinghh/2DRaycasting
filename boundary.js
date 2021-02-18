class Boundary {
	constructor(x1, y1, x2, y2, c = color(255, 255, 255), w = 5) {
		this.a = createVector(x1, y1);
		this.b = createVector(x2, y2);
		this.c = c;
		this.w = w;
	}

	show() {
		stroke(this.c);

		strokeWeight(rendering ? 3 : this.w);
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}
}
