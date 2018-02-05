const { StorageDevice } = require('../storage-devices');
const { IceCreamBlock } = require('../ice-cream');
const { Cone, Cup, Tub } = require('../containers');
const { GamePlayError } = require('../errors');

function createShelf() {
  return new StorageDevice([Cone, Cup, Tub]);
}

// function createFridge() {
//   return new StorageDevice([IceCreamBlock]);
// }

describe('StorageDevice', () => {
  let storage = {};
  beforeEach(() => { storage = new StorageDevice([Cone, Cup, Tub, IceCreamBlock]); });

  it('instance must be initialised with an array of classes', () => {
    expect(() => new StorageDevice([])).toThrow(Error);
  });
  it('instance `nameString` is "Storage Device"', () => {
    expect(storage.nameString).toBe('Storage Device');
  });
  it('instance `store` is initially an empty object', () => {
    expect(storage.store).toEqual({});
  });

  describe('when deposited to using `deposit(item, qty)`', () => {
    it('should throw `TypeError` if `item` is not a class', () => {
      expect(() => storage.deposit('', 1)).toThrow(TypeError);
      expect(() => storage.deposit({}, 1)).toThrow(TypeError);
      expect(() => storage.deposit(new Cone(), 1)).toThrow(TypeError);
    });
    it('should throw `Error` if `item` does not have a `getNameString()` static method', () => {
      class MockItem extends Cone {}
      delete MockItem.getNameString;
      expect(() => storage.deposit(MockItem)).toThrow(Error);
    });
    it('should return `false` if `qty` is a negative integer', () => {
      expect(storage.deposit(Tub, -1)).toBe(false);
    });
    it('should throw `TypeError` if invalid type of `item` is being deposited', () => {
      const shelf = createShelf();
      expect(() => shelf.deposit(IceCreamBlock)).toThrow(GamePlayError);
    });
    it('should return `true` if item was successfully deposited', () => {});

    it('should increase `store` item quantity accordingly', () => {});
    it('should throw Error if `item` is not valid', () => {});
  });

  describe('when retrieved from using `retrieve(itemClass, qty)`', () => {
    it('should decrease `store` item quantity accordingly', () => {});
    it('should throw Error if invalid class is requested', () => {});
    it('should return `null` if `qty` requested for exceeds stored quantity', () => {});
  });

  describe('when checking stock of an item with `checkStockFor(itemClass)`', () => {
    it('should return 0 if item does not exist in store', () => {});
    it('should return quantity of item in store', () => {});
  });
});
