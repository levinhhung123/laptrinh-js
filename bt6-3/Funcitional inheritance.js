class Square {
    constructor(width) {
        this.width = width;
    }

    getArea() {
        console.log(`Square of this ${this.width * this.width}`);
        return this.width * this.width;
    }
}

class Cube extends Square {
    constructor(width) {
        super(width);
    }

    squareArea = this.getArea();

    getVolume() {
        console.log(`Volume of this ${this.squareArea * this.width}`);
        return this.squareArea * this.width;
    }
}

var myCube = new Cube(5);
myCube.getVolume();
