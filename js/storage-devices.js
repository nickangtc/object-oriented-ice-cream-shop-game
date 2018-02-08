const { GamePlayError } = require('./errors');

/**
 * Storage to hold in-game items.
 *
 * Use to create shelf and fridge by specifying types of objects
 * the instance is supposed to be able to store.
 *
 * Args
 * items: array of classes that the instance will accept for storage
 */
class Storage {
  constructor(items) {
    this.itemTypes = this._getNameStrings(items);
    this.store = this._initialiseStore();
  }
}

Storage.prototype.nameString = 'Storage Device';

Storage.prototype._getNameStrings = function _getNameStrings(items) {
  if (!Array.isArray(items)) throw new TypeError('Storage must be initialised with an array as first argument');
  if (items.length === 0) throw new Error('Storage must be initialised with a non-empty array as first argument');

  return items.map((item) => {
    if (Object.prototype.hasOwnProperty.call(item, 'getNameString')) {
      return item.getNameString();
    }
    throw new Error('classes to initialise Storage must have a `getNameString()` static method');
  });
};

Storage.prototype._initialiseStore = function _initialiseStore() {
  const store = {};
  this.itemTypes.forEach((item) => {
    store[item] = 0;
  });
  return store;
};

Storage.prototype.deposit = function deposit(itemClass, qty = 0) {
  if (typeof itemClass !== 'function') throw new TypeError('deposit() must be passed a class as first argument');
  if (qty < 0) return false;

  if (!this._isValidItemClass(itemClass)) throw new GamePlayError('This item does not belong here.');

  const quantity = Math.floor(qty);
  this.store[itemClass.getNameString()] += quantity;
  return true;
};

Storage.prototype.withdraw = function withdraw(itemClass, qty = 0) {
  if (typeof itemClass !== 'function') throw new TypeError('withdraw() must be passed a class as first argument');

  if (!this._isValidItemClass(itemClass)) return 0;

  const stock = this.checkStockFor(itemClass);
  const withdrawQty = qty <= stock ? qty : stock;

  this.store[itemClass.getNameString()] -= withdrawQty;
  return withdrawQty;
};

Storage.prototype.checkStockFor = function checkStockFor(itemClass) {
  if (!this._isValidItemClass(itemClass)) return 0;
  return this.store[itemClass.getNameString()];
};

Storage.prototype._isValidItemClass = function _isValidItemClass(itemClass) {
  if (!Object.prototype.hasOwnProperty.call(itemClass, 'getNameString')) return false;
  if (this.itemTypes.includes(itemClass.getNameString())) return true;
  return false;
};

module.exports = {
  Storage,
};
