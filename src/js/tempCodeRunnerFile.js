var vector = {
    _x: 0,
    _y: 0,
    _z: 0,
    create: function (x, y, z) { // Added z for 3D vector
        var obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        obj.setZ(z); // Set z value
        return obj;
    },
    setX: function (value) {
        this._x = value;
    },
    getX: function () {
        return this._x;
    },
    setY: function (value) {
        this._y = value;
    },
    getY: function () {
        return this._y;
    },
    setZ: function (value) { // Added setZ method
        this._z = value;
    },
    getZ: function () { // Added getZ method
        return this._z;
    },
    setAngleXY: function (angle) {
        var length = this.getLengthXY();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },
    getAngleXY: function () {
        return Math.atan2(this._y, this._x) || 0;
    },
    getLengthXY: function () {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    },
    getLength: function () { // Added method for 3D vector length
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    },
    add: function (v2) {
        return vector.create(
            this._x + v2.getX(),
            this._y + v2.getY(),
            this._z + v2.getZ()
        );
    },
    multiply: function (val) {
        return vector.create(this._x * val, this._y * val, this._z * val);
    },
    divide: function (val) {
        return vector.create(this._x / val, this._y / val, this._z / val);
    },
    addTo: function (v2, time) {
        this._x += v2.getX() * time;
        this._y += v2.getY() * time;
        this._z += v2.getZ() * time;
    },
    multiplyBy: function (val) {
        this._x *= val;
        this._y *= val;
        this._z *= val;
    },
    divideBy: function (val) {
        this._x /= val;
        this._y /= val;
        this._z /= val;
    },
    normalize: function () {
        var length = this.getLength();
        return vector.create(
            this._x / length || 0,
            this._y / length || 0,
            this._z / length || 0
        );
    },
};

class Entity {
    constructor(AllForce, p = 1000, volume, m) {
        this.g = vector.create(0, -9.81, 0);
        this.AllForce = AllForce; 
        this.m = m;
        this.volume = volume;
        this.p = p;
        this.speed = vector.create(0, 0, 0);
        this.drag = 0.5;
        this.begin = vector.create(0, 0, 0);
        this.direction = vector.create(0, 0, -1);
        this.Speedangular = 0;
    }
}

class Boat extends Entity {
    constructor(AllForce, p = 1000, volume, m) {
        super(AllForce, p, volume, m);
    }

    turn(direction) {
        this.Speedangular += 0.01 * direction;
        return this.Speedangular;
    }

    getDirection() {
        return this.direction;
    }

    waterResistance() {
        const DragForce = this.speed.multiply(this.drag);
        this.AllForce = this.AllForce.add(DragForce);
    }

    gravity() {
        const Gravity = this.g.multiply(this.m);
        this.AllForce = this.AllForce.add(Gravity);
    }

    floatApplication() {
        const Force = this.p * this.volume * 9.81;
        const BuoyantForce = vector.create(0, Force, 0);
        const S = this.speed.multiply(this.drag);

        this.AllForce = this.AllForce.add(BuoyantForce);
        this.AllForce = this.AllForce.add(S);

        const Acceleration = this.AllForce.divide(this.m);
        this.speed = this.speed.add(Acceleration);
    }

    update() {
        const acceleration = this.AllForce.divide(this.m);
        this.speed = this.speed.add(acceleration);
        this.begin = this.begin.add(this.speed);
        
        this.AllForce = vector.create(0, 0, 0);
    }

    display() {
        console.log(`Boat position: (${this.begin.getX().toFixed(2)}, ${this.begin.getY().toFixed(2)}, ${this.begin.getZ().toFixed(2)})`);
    }

    getSpeed() {
        return this.speed;
    }

    resetBoat() {
        this.begin = vector.create(0, 0, 0);
        this.speed = vector.create(0, 0, 0);
    }
}

class Water extends Entity {}

class Waves extends Entity {
    constructor(AllForce , m, volume, length = 10, height = 10, width = 10){
        super(AllForce, m / volume, volume, m); 
        this.length = length;
        this.height = height;
        this.width = width;
    }

    archimedesCalculation(){
        const liquidDensity = this.p;
        const volumeOfTheSubmergedBody = this.length * this.width * this.height;
        let arcCalc = liquidDensity * 9.81 * volumeOfTheSubmergedBody;
        return 'Archimedes = '+arcCalc;
    }

    newtonFirstLaw() {
        if (this.AllForce.getLength() === 0) {
            console.log('no force');
        } else {
            const acceleration = this.AllForce.divide(this.m);
            this.speed = this.speed.add(acceleration);
            console.log(`force`);
        }
    }

    newtonSecondLaw() {
        const acceleration = this.AllForce.divide(this.m);
        return 'Acceleration = '+acceleration;
    }

    newtonThirdLaw() {
        const reactionForce = this.AllForce.multiply(-1);
        return  'Reaction force = ' +reactionForce;
    }
}




// Example usage
let testBoat = new Boat(vector.create(0, 0, 0), 1000, 10, 100);
console.log(testBoat.getSpeed());

function simulateStep() {
    testBoat.gravity(); 
    testBoat.waterResistance(); 
    testBoat.floatApplication(); 

    testBoat.update();

    testBoat.display();

}
for (let i = 0; i < 10; i++) {
    simulateStep();
}


let wavesObj = new Waves(vector.create(10, 0, 0),15,1000,10,9,10);

// wavesObj.AllForce = vector.create(10, 0, 0);

console.log(wavesObj.archimedesCalculation());
console.log(wavesObj.newtonFirstLaw());
console.log(wavesObj.newtonSecondLaw());
console.log(wavesObj.newtonThirdLaw());

