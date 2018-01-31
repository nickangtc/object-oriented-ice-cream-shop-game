const { IceCreamContainer } = require('../constructors');

describe('IceCreamContainer', () => {
  it('instance `type` defaults to "cone" when no value is passed in', () => {
    const container = new IceCreamContainer();
    expect(container.type).toEqual('cone');
  });
  it('instance `type` is "cone" if passed-in value is invalid', () => {
    const container = new IceCreamContainer('water bottle');
    expect(container.type).toEqual('cone');
  });
  it('instance `type` is same as passed-in value if valid', () => {
    const container = new IceCreamContainer('tub');
    expect(container.type).toEqual('tub');
  });
});
