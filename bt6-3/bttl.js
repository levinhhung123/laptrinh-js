class Pet {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`Tôi tên là ${this.name}.`);
    }

    talk(sound) {
        console.log(sound);
    }
}


class Dog extends Pet {
    constructor(name, animalType) {
        super(name);
        this.animalType = animalType;
    }

    animalTypeMessage() {
        console.log(`Tôi là động vật ${this.animalType}.`);
    }

    introduce() {
        super.introduce();
        this.animalTypeMessage();
        this.talk("Gâu gâu!");
    }
}


const myPet = new Pet("Coco");
myPet.introduce();
myPet.talk("Meow");

const myDog = new Dog("Buddy", "có lông");
myDog.introduce();