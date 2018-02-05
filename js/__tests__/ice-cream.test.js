const { IceCreamBlock, ScoopOfIceCream } = require('../ice-cream');

describe('IceCreamBlock', () => {
  it('instance `flavour` defaults to "vanilla" when no value is passed in', () => {
    const ic = new IceCreamBlock();
    expect(ic.flavour).toEqual('vanilla');
  });
  it('instance `flavour` defaults to "vanilla" if passed-in value is invalid', () => {
    const ic = new IceCreamBlock('rocky road');
    expect(ic.flavour).toEqual('vanilla');
  });
  it('instance `flavour` is same as passed-in value if valid', () => {
    const ic = new IceCreamBlock('rum and raisin');
    expect(ic.flavour).toEqual('rum and raisin');
  });
  it('instance `nameString` is "Ice Cream Block"', () => {
    const ic = new IceCreamBlock();
    expect(ic.nameString).toEqual('Ice Cream Block');
  });

  describe('when scooped using `scoop()`', () => {
    it('should return `null` if `scoopsLeft` is 0', () => {
      const ic = new IceCreamBlock();
      ic.scoopsLeft = 0;
      expect(ic.scoop()).toBeNull();
    });
    it('should return instance of `ScoopOfIceCream` if scooping was successful', () => {
      const ic = new IceCreamBlock();
      expect(ic.scoop() instanceof ScoopOfIceCream).toBe(true);
    });
    it('should decrement `scoopsLeft` by 1', () => {
      const ic = new IceCreamBlock();
      const originalScoops = ic.scoopsLeft;
      ic.scoop();
      expect(ic.scoopsLeft).toEqual(originalScoops - 1);
    });
  });

  describe('when unscooped using `unscoop()`', () => {
    it('should increment `scoopsLeft` by 1', () => {
      const ic = new IceCreamBlock();
      const originalScoops = ic.scoopsLeft;
      ic.unscoop();
      expect(ic.scoopsLeft).toEqual(originalScoops + 1);
    });
    it('should return `true` if operation was successful', () => {
      const ic = new IceCreamBlock();
      expect(ic.unscoop()).toBe(true);
    });
  });
});
