const { IceCreamBlock } = require('./ice-cream');
const { GamePlayError } = require('./errors');

/**
 * items: array of classes
 */
class StorageDevice {
  constructor(items) {
    this.itemTypes = this._getNameStrings(items);
    this.store = this._initialiseStore();
  }
}

StorageDevice.prototype.nameString = 'Storage Device';

StorageDevice.prototype._getNameStrings = function _getNameStrings(items) {
  if (!Array.isArray(items)) throw new TypeError('StorageDevice must be initialised with an array as first argument');
  if (items.length === 0) throw new Error('StorageDevice must be initialised with a non-empty array as first argument');

  return items.map((item) => {
    if (Object.prototype.hasOwnProperty.call(item, 'getNameString')) {
      return item.getNameString();
    }
    throw new Error('classes to initialise StorageDevice must have a `getNameString()` static method');
  });
};

StorageDevice.prototype._initialiseStore = function _initialiseStore() {
  const store = {};
  this.itemTypes.forEach((item) => {
    store[item] = 0;
  });
  return store;
};

StorageDevice.prototype.deposit = function deposit(itemClass, qty = 0) {
  if (typeof itemClass !== 'function') throw new TypeError('deposit() must be passed a class as first argument');
  if (qty < 0) return false;

  const quantity = Math.floor(qty);
  let itemType = '';

  if (Object.prototype.hasOwnProperty.call(itemClass, 'getNameString')) {
    itemType = itemClass.getNameString();
  } else {
    throw new Error('deposit() first argument class does not have a `getNameString()` static method');
  }

  if (!this._isValidType(itemType)) throw new GamePlayError('This item does not belong here.');

  this.store[itemType] += quantity;
  return true;
};

StorageDevice.prototype._isValidType = function _isValidType(type) {
  if (this.itemTypes.includes(type)) return true;
  return false;
};

module.exports = {
  StorageDevice,
};
