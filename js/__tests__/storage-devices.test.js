const { StorageDevice } = require('../storage-devices');
const { IceCreamBlock } = require('../ice-cream');
const { Cone, Cup, Tub } = require('../vessel');
const { GamePlayError } = require('../errors');

// TODO: Refactor this into a standalone game manifest file ("manifest.js" ?)
const inGameItemsMasterList = [Cone, Cup, Tub, IceCreamBlock];

function createShelf() {
  return new StorageDevice([Cone, Cup, Tub]);
}

function createUniversalStorage() {
  // universal storage can accept all in-game items
  return new StorageDevice(inGameItemsMasterList);
}

describe('StorageDevice', () => {
  let storage = {};
  beforeEach(() => { storage = createUniversalStorage(); });

  it('instance must be initialised with an array of classes', () => {
    expect(() => new StorageDevice([])).toThrow(Error);
  });
  it('instance `nameString` is "Storage Device"', () => {
    expect(storage.nameString).toBe('Storage Device');
  });
  it('instance `store` is initialised with keys of every acceptable item types and values are 0', () => {
    const storeMock = {};
    inGameItemsMasterList.forEach((itemClass) => {
      const nameString = itemClass.getNameString();
      storeMock[nameString] = 0;
    });
    expect(storage.store).toEqual(storeMock);
  });

  describe('when deposited to using `deposit(item, qty)`', () => {
    it('should throw `TypeError` if `item` is not a class', () => {
      expect(() => storage.deposit('', 1)).toThrow(TypeError);
      expect(() => storage.deposit({}, 1)).toThrow(TypeError);
      expect(() => storage.deposit(new Cone(), 1)).toThrow(TypeError);
    });
    it('should return `false` if `qty` is a negative integer', () => {
      expect(storage.deposit(Tub, -1)).toBe(false);
    });
    it('should throw `TypeError` if invalid type of `item` is being deposited', () => {
      const shelf = createShelf();
      expect(() => shelf.deposit(IceCreamBlock)).toThrow(GamePlayError);
    });
    it('should return `true` if item was successfully deposited', () => {
      expect(storage.deposit(Tub, 1)).toBe(true);
    });
    it('should increase `store` item quantity by `qty` value', () => {
      storage.deposit(Tub, 99);
      storage.deposit(Tub, 1);
      expect(storage.store[Tub.getNameString()]).toBe(100);
    });
    it('should round down value of `qty` if it is a floating number', () => {
      storage.deposit(Tub, 99.999);
      expect(storage.store[Tub.getNameString()]).toBe(99);
      storage.deposit(Cup, 10.000000001);
      expect(storage.store[Cup.getNameString()]).toBe(10);
    });
  });

  describe('when checking stock of an item with `checkStockFor(itemClass)`', () => {
    it('should return 0 if item does not exist in store', () => {
      const shelf = createShelf();
      expect(shelf.checkStockFor(IceCreamBlock)).toBe(0);
    });
    it('should return quantity of item in store', () => {
      storage.deposit(Tub, 101);
      storage.deposit(Cup, 102);
      storage.deposit(Cone, 103);
      storage.deposit(IceCreamBlock, 104);
      expect(storage.checkStockFor(Tub)).toBe(101);
      expect(storage.checkStockFor(Cup)).toBe(102);
      expect(storage.checkStockFor(Cone)).toBe(103);
      expect(storage.checkStockFor(IceCreamBlock)).toBe(104);
    });
  });

  describe('when withdrawn from using `withdraw(itemClass, qty)`', () => {
    it('should return integer indicating `qty` actually withdrawn', () => {
      storage.deposit(Cone, 3);
      expect(storage.withdraw(Cone, 2)).toBe(2);
    });
    it('should decrease `store` item quantity accordingly', () => {
      storage.deposit(Cone, 1);
      storage.withdraw(Cone, 1);
      expect(storage.checkStockFor(Cone)).toBe(0);
    });
    it('should withdraw max if `qty` exceeds stored amount and return integer', () => {
      storage.deposit(Cone, 3);
      expect(storage.withdraw(Cone, 4)).toBe(3);
      expect(storage.checkStockFor(Cone)).toBe(0);
    });
    it('should throw Error if invalid class is requested', () => {
      expect(() => storage.withdraw('', 1)).toThrow(TypeError);
      expect(() => storage.withdraw({}, 1)).toThrow(TypeError);
      expect(() => storage.withdraw(new Cone(), 1)).toThrow(TypeError);
    });
  });
});
