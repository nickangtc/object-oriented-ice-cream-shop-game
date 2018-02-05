const {
  IceCreamContainer,
  Cone,
  Cup,
  Tub,
} = require('../containers');
const { ScoopOfIceCream } = require('../ice-cream');

// Helper functions
function fillContainer(container) {
  const { capacityInScoops } = container;
  for (let i = 0; i < capacityInScoops; i++) {
    container.add(new ScoopOfIceCream());
  }
}

// Tests
describe('IceCreamContainer', () => {
  it('instance `nameString` is "Ice Cream Container"', () => {
    const container = new IceCreamContainer();
    expect(container.nameString).toEqual('Ice Cream Container');
  });
  it('instance `capacityInScoops` defaults to 1', () => {
    const container = new IceCreamContainer();
    expect(container.capacityInScoops).toBe(1);
  });
  it('instance `scoops` defaults to an empty array', () => {
    const container = new IceCreamContainer();
    expect(container.scoops).toEqual([]);
  });

  describe('when added to, using `add(iceCream)`', () => {
    it('should hold an instance of `ScoopOfIceCream` if an instance is passed in', () => {
      const container = new IceCreamContainer();
      const scoop = new ScoopOfIceCream();
      container.add(scoop);
      expect(container.scoops[0]).toEqual(scoop);
    });
    it('should throw Error if value passed in is not instance of `ScoopOfIceCream`', () => {
      const container = new IceCreamContainer();
      expect(() => {
        container.add('fake scoop of ice cream');
      }).toThrow(TypeError);
    });
    it('should throw Error if container is already full', () => {
      const container = new IceCreamContainer();
      const scoop = new ScoopOfIceCream();
      fillContainer(container);

      expect(() => {
        container.add(scoop);
      }).toThrow(Error);
    });
  });

  describe('when checked for capacity using `isFull()`', () => {
    it('should return the correct boolean value', () => {
      const container = new IceCreamContainer();
      expect(container.isFull()).toBe(false);

      fillContainer(container);
      expect(container.isFull()).toBe(true);
    });
  });
});

describe('Cone', () => {
  let cone = {};
  beforeEach(() => {
    cone = new Cone();
  });

  it('instance `nameString` is "Cone"', () => {
    expect(cone.nameString).toBe('Cone');
  });
  it('instance `scoops` defaults to an empty array', () => {
    expect(cone.scoops).toEqual([]);
  });
  it('should be able to take 3 scoops max', () => {
    fillContainer(cone);
    expect(cone.scoops).toHaveLength(3);
    expect(cone.isFull()).toBe(true);
  });
});

describe('Cup', () => {
  let cup = {};
  beforeEach(() => {
    cup = new Cup();
  });

  it('instance `nameString` is "Cup"', () => {
    expect(cup.nameString).toBe('Cup');
  });
  it('instance `scoops` defaults to an empty array', () => {
    expect(cup.scoops).toEqual([]);
  });
  it('should be able to take 2 scoops max', () => {
    fillContainer(cup);
    expect(cup.scoops).toHaveLength(2);
    expect(cup.isFull()).toBe(true);
  });
});

describe('Tub', () => {
  let tub = {};
  beforeEach(() => {
    tub = new Tub();
  });

  it('instance `nameString` is "Tub"', () => {
    expect(tub.nameString).toBe('Tub');
  });
  it('instance `scoops` defaults to an empty array', () => {
    expect(tub.scoops).toEqual([]);
  });
  it('should be able to take 10 scoops max', () => {
    fillContainer(tub);
    expect(tub.scoops).toHaveLength(10);
    expect(tub.isFull()).toBe(true);
  });
});
