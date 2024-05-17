import { normalize } from "three/src/math/MathUtils.js";
var vector = {
    _x: 0,
    _y: 0,
    _z: 0,
    create: function (x, y) {
        var obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
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
      setAngleXY: function (angle) {
        var length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
      },
      setAngle: function (angleXY,) {
        var length = this.getLength();
        this._x = Math.cos(angleXY) * length;
      },
      getAngleXY: function () {
        return Math.atan(this._y / this._x) || 0;
      },
      getLength: function () {
        return Math.sqrt(this._x * this._x + this._y * this._y);
      },
      add: function (v2) {
        return vector.create(
          this._x + v2.getX(),
          this._y + v2.getY()
        );
      },
      multiply: function (val) {
        return vector.create(this._x * val, this._y * val);
      },
      divide: function (vec) {
        return vector.create(
          this._x / vec.getX(),
          this._y / vec.getY()
        );
      },
      addTo: function (v2, time) {
        this._y += v2.getY() * time;
        this._x += v2.getX() * time;
      },
      multiplyBy : function (val) {
        this._x *= val;
        this._y *= val;
      },
      divideBy: function (val) {
        this._x /= val;
        this._y /= val;
      },
      normalize: function () {
        return vector.create(
          this._x / this.getLength() || 0,
          this._y / this.getLength() || 0
        );
      },
              
}  

export default vector;