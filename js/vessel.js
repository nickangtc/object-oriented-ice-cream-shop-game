const { ScoopOfIceCream } = require('./ice-cream');

/**
 * IceCreamHolder to hold ScoopOfIceCream.
 */
class IceCreamHolder {
  constructor() {
    this.scoops = [];
  }

  static getNameString() {
    return 'Ice Cream Container';
  }
}

IceCreamHolder.prototype.nameString = IceCreamHolder.getNameString();
IceCreamHolder.prototype.capacityInScoops = 1;
IceCreamHolder.prototype.add = function add(scoop) {
  if (!(scoop instanceof ScoopOfIceCream)) {
    throw new TypeError('you must pass `ScoopOfIceCream` instance into add()');
  }
  if (this.isFull()) throw new Error('container is already full');
  this.scoops.push(scoop);
};
IceCreamHolder.prototype.isFull = function isFull() {
  return this.scoops.length === this.capacityInScoops;
};

/**
 * Cone container that extends from IceCreamHolder.
 */
class Cone extends IceCreamHolder {
  static getNameString() {
    return 'Cone';
  }
}
Cone.prototype.nameString = Cone.getNameString();
Cone.prototype.capacityInScoops = 3;

/**
 * Cup container that extends from IceCreamHolder.
 */
class Cup extends IceCreamHolder {
  static getNameString() {
    return 'Cup';
  }
}
Cup.prototype.nameString = Cup.getNameString();
Cup.prototype.capacityInScoops = 2;

/**
 * Tub container that extends from IceCreamHolder.
 */
class Tub extends IceCreamHolder {
  static getNameString() {
    return 'Tub';
  }
}
Tub.prototype.nameString = Tub.getNameString();
Tub.prototype.capacityInScoops = 10;

module.exports = {
  IceCreamHolder,
  Cone,
  Cup,
  Tub,
};
