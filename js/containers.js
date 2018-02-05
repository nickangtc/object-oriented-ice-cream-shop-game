const { ScoopOfIceCream } = require('./ice-cream');

/**
 * Ice cream container
 */
class IceCreamContainer {
  constructor() {
    this.scoops = [];
  }

  static getNameString() {
    return 'Ice Cream Container';
  }
}

IceCreamContainer.prototype.nameString = IceCreamContainer.getNameString();
IceCreamContainer.prototype.capacityInScoops = 1;
IceCreamContainer.prototype.add = function add(scoop) {
  if (!(scoop instanceof ScoopOfIceCream)) {
    throw new TypeError('you must pass `ScoopOfIceCream` instance into add()');
  }
  if (this.isFull()) throw new Error('container is already full');
  this.scoops.push(scoop);
};
IceCreamContainer.prototype.isFull = function isFull() {
  return this.scoops.length === this.capacityInScoops;
};

/**
 * Cone container that extends from IceCreamContainer.
 */
class Cone extends IceCreamContainer {
  static getNameString() {
    return 'Cone';
  }
}
Cone.prototype.nameString = Cone.getNameString();
Cone.prototype.capacityInScoops = 3;

/**
 * Cup container that extends from IceCreamContainer.
 */
class Cup extends IceCreamContainer {
  static getNameString() {
    return 'Cup';
  }
}
Cup.prototype.nameString = Cup.getNameString();
Cup.prototype.capacityInScoops = 2;

/**
 * Tub container that extends from IceCreamContainer.
 */
class Tub extends IceCreamContainer {
  static getNameString() {
    return 'Tub';
  }
}
Tub.prototype.nameString = Tub.getNameString();
Tub.prototype.capacityInScoops = 10;

module.exports = {
  IceCreamContainer,
  Cone,
  Cup,
  Tub,
};
