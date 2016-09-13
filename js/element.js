class Element {
	constructor(name) {
		this.name = name;
		this.image = new Image();
		this.image.src = `./img/${name}.png`;
	}
}

module.exports = Element;
