const { ScoopOfIceCream } = require('./ice-cream');

/**
 * Vessel to hold ScoopOfIceCream.
 */
class Vessel {
  constructor() {
    this.scoops = [];
  }

  static getNameString() {
    return 'Ice Cream Container';
  }
}

Vessel.prototype.nameString = Vessel.getNameString();
Vessel.prototype.capacityInScoops = 1;
Vessel.prototype.add = function add(scoop) {
  if (!(scoop instanceof ScoopOfIceCream)) {
    throw new TypeError('you must pass `ScoopOfIceCream` instance into add()');
  }
  if (this.isFull()) throw new Error('container is already full');
  this.scoops.push(scoop);
};
Vessel.prototype.isFull = function isFull() {
  return this.scoops.length === this.capacityInScoops;
};

/**
 * Cone container that extends from Vessel.
 */
class Cone extends Vessel {
  static getNameString() {
    return 'Cone';
  }
}
Cone.prototype.nameString = Cone.getNameString();
Cone.prototype.capacityInScoops = 3;

/**
 * Cup container that extends from Vessel.
 */
class Cup extends Vessel {
  static getNameString() {
    return 'Cup';
  }
}
Cup.prototype.nameString = Cup.getNameString();
Cup.prototype.capacityInScoops = 2;

/**
 * Tub container that extends from Vessel.
 */
class Tub extends Vessel {
  static getNameString() {
    return 'Tub';
  }
}
Tub.prototype.nameString = Tub.getNameString();
Tub.prototype.capacityInScoops = 10;

module.exports = {
  Vessel,
  Cone,
  Cup,
  Tub,
};
