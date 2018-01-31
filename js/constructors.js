/**
 * Ice cream container
 */
class IceCreamContainer {
  constructor (type) {
    this.type = this.validateType(type) || 'cone';
  }
}

IceCreamContainer.prototype.name = 'container';

IceCreamContainer.prototype.validateType = function (type) {
  const validTypes = ['cone', 'cup', 'tub'];
  if (type) type = type.toLowerCase();
  if (validTypes.includes(type)) return type;
  return false;
};

/**
 * Ice cream block
 */
class IceCreamBlock {
  constructor (flavour) {
    this.flavour = this.validateFlavour(flavour) || 'vanilla';
  }
}

IceCreamBlock.prototype.scoopsLeft = 50;

IceCreamBlock.prototype.validateFlavour = function (f) {
  const validFlavours = [
    'vanilla',
    'cookies and cream',
    'double chocolate',
    'lemon sorbet',
    'strawberry',
    'rum and raisin'
  ];
  f = f.toLowerCase();
  if (validFlavours.includes(f)) return f;
  return false;
};

module.exports = {
  IceCreamContainer,
  IceCreamBlock
};
