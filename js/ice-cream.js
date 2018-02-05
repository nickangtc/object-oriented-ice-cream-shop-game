/**
 * Scoop of ice cream.
 * Private class, used only by IceCreamBlock.
 */
class ScoopOfIceCream {
  constructor(flavour = 'vanilla') {
    this.flavour = flavour;
  }
}

/**
 * Ice cream block
 */
class IceCreamBlock {
  constructor(flavour) {
    this.flavour = this.validateFlavour(flavour) || 'vanilla';
  }

  static getNameString() {
    return 'Ice Cream Block';
  }
}

IceCreamBlock.prototype.nameString = IceCreamBlock.getNameString();
IceCreamBlock.prototype.scoopsLeft = 50;
IceCreamBlock.prototype.validateFlavour = function validateFlavour(flavour) {
  const validFlavours = [
    'vanilla',
    'cookies and cream',
    'double chocolate',
    'lemon sorbet',
    'strawberry',
    'rum and raisin',
  ];
  const cleaned = flavour ? flavour.toLowerCase() : null;
  if (validFlavours.includes(cleaned)) return cleaned;
  return false;
};
IceCreamBlock.prototype.scoop = function scoop() {
  if (this.scoopsLeft === 0) return null;
  this.scoopsLeft = this.scoopsLeft - 1;
  return new ScoopOfIceCream(this.flavour);
};
IceCreamBlock.prototype.unscoop = function unscoop() {
  this.scoopsLeft = this.scoopsLeft + 1;
  return true;
};

module.exports = {
  IceCreamBlock,
  ScoopOfIceCream,
};
