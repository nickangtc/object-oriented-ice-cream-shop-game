## Object Oriented Ice Cream Shop Game

~~Fun in progress~~ Work in active development. Stay tuned!

### Goal

This is first and foremost a game for fun, but why stop there? To make this project more meaningful to me, I'm going to add functionality that allows programmers newer to web development to understand how objects are represented and can be used in JavaScript on a web page. It will be an option you can toggle on and off mid-game.

### Concept

You are the owner of an ice cream shop - and you're a one-person show. You scoop and serve ice cream, collect money, place orders for stock resupplies, and more. Whatever is needed to run an ice cream shop, you'll do. To survive.

## Development

In building this game, I wanted to learn by doing more web development. I'm guiding myself through this mini project with the following principles:

- Do TDD (test driven development). I've never actually worked on a project in a TDD fashion. I'd like to test drive it (get it?) to form an opinion for myself.
- Document every "a-ha!" moment, so I can look back on how much (or little) I've learned and maybe translate some of those learning into blog posts on [nickang.com](http://nickang.com).

## Lessons learned

I'm learning as I go with this little experiment of a project. Here I list down the "a-ha!" moments and what they mean for future projects. I strive to be judicious in adding learning points because I know that obvious things mostly aren't so obvious when revisited a week later...

### 1. Configuration / Dev env set up

Like any project, I always prefer to start simple. I'd initially thought I might be able to get away with not using a bundler like Webpack (at most I'd use ES5 syntax without Babel!), but I quickly ran into a problem.

I wanted to do TDD, and that meant having to import modules to be tested in with my test runner (Jest), and _that_ meant I couldn't load that file (with a `module.exports` statement) directly to the front-end since `module.exports` is a Node construct. Finally, that was when I realised I had to use some kind of module importer/exporter (to enable testing in Node dev env) and a bundler (to package all .js files into a single bundled .js file for serving to the client).

- Webpack. Setting up Webpack (with Babel for transpiling ES6+ to ES5) is not as difficult as I imagined! This [tutorial](http://ccoenraets.github.io/es6-tutorial-data/babel-webpack/) helped a lot.
- Webpack. To auto-rebundle your JS files on every change is effortless with Webpack. Just use `webpack --watch`, or if you want to add it to npm "scripts" in package.json:

```json
"scripts": {
  "webpack": "webpack",
  "webpack:watch": "webpack --watch"
}
```

- Jest. Setting up Jest is also mostly a breeze, but there are some time-sucking gotchas. Most of them are covered in my blog post on [Jest + Enzyme testing](http://www.nickang.com/conceptual-overview-of-jest-enzyme-testing/)
- Jest linting. To prevent Linter from complaining about test globals not being defined (eg. "test is not defined"), npm install ESLint (`npm install --save-dev eslint eslint-plugin-jest`) and configure .eslintrc file with the "eslint-plugin-jest" package:

```js
var config = {
  extends: ['eslint:recommended', 'plugin:jest/recommended'],
  plugins: ['jest']
}

module.exports = config;
```

- Using ES6 `import` in Jest files. While it's possible (and probably better, for consistency) to use ES6 `impor` statements in Jest test files, I remember taking about an hour to figure it out the last time I had to use it. So for now, I'm just going to use Node's `require` to import modules into Jest files... :construction:

- Linter. Install and use ESLint (`npm install --save-dev eslint`) for project, and to enable on-the-fly linting for your code editor, install the "linter-eslint" package ([Atom package](https://atom.io/packages/linter-eslint)).

### 2. Code quality, linting and JavaScript style guide

My ESLint extends "airbnb-base" ([package](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)), which means I'm adopting the [Airbnb style guide](https://github.com/airbnb/javascript) as the main set of linting rules for this project.

- Trailing commas. I never knew this would be a good thing because it seemed so error prone, but I'm sold on Airbnb's [justification](https://github.com/airbnb/javascript#commas--dangling) for it: "This leads to _cleaner git diffs_. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don’t have to worry about the trailing comma problem in legacy browsers."
    - Note: Not that cleaner git diffs is an important thing on this small project, but I like adopting best practices so that it feels natural when the time where it's required comes along!
- Named function expressions. `Foo.prototype.bar = function bar() {}` - the second "bar" name seems redundant, but apparently it [aids in debugging](https://eslint.org/docs/rules/func-names) when viewing the stack trace, without which we're likely to see "anonymous function" instead of "bar".
- I like using dangling underscores to indicate "private" methods. Unlike the ESLint default of "[no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle)", I find that naming methods with underscore (eg. `_isValidType()`) is useful to indicate that it should never be called from outside a class.
    - To clarify, as far as I know, there are no supported ways of creating true private methods. I'm for the use of underscore dangles as a visual communication tool to convey "hands off from outside the class".

### 3. Testing (with Jest)

- Testing exception with `toThrow()`. In order to test the expectation that a function throws an error, you need to wrap it with another function ([reference](https://github.com/facebook/jest/issues/781)):

```js
// This won't work because the error is not caught and will stop runtime
it('should throw Error if value passed in is not instance of `ScoopOfIceCream`', () => {
  const container = new IceCreamHolder();
  expect(container.add('fake scoop of ice cream'))
    .toThrow('you must pass `ScoopOfIceCream` instance into add()');
});

// This works - wrapping with another function will catch the error and let .toThrow() test pass
it('should throw Error if value passed in is not instance of `ScoopOfIceCream`', () => {
  const container = new IceCreamHolder();
  expect(() => {
    container.add('fake scoop of ice cream');
  }).toThrow('you must pass `ScoopOfIceCream` instance into add()');
});
```

- Write test descriptions first. After writing over 30 unit tests in a TDD fashion, I realised it's helpful to write the shell of tests first before writing test code. Perhaps this might agitate TDD purists, but I find this helpful in giving me a clear bird's eye view of what a class is supposed to do before implementing it:

```javascript
// descriptions only at first
describe('Storage', () => {
  it('instance `nameString` is "Storage Device"', () => {});
  it('instance `store` is initially an empty object', () => {});

  describe('when deposited to using `deposit(itemInstance, qty)`', () => {
    it('should increase `store` item quantity accordingly', () => {});
    it('should throw Error if `itemInstance` is not valid', () => {});
  });

  describe('when retrieved from using `retrieve(itemClass, qty)`', () => {
    it('should decrease `store` item quantity accordingly', () => {});
    it('should throw Error if `itemClass` is not valid', () => {});
    it('should throw Error if `qty` asked for exceeds stored quantity', () => {});
  });
});

// then add test code
describe('Storage', () => {
  it('instance `nameString` is "Storage Device"', () => {
    const storage = new Storage();
    expect(storage.nameString).toBe('Storage Device');
  });
  it('instance `store` is initially an empty object', () => {
    // ...
  });
// ...
});
```

- `beforeEach()` applies to all nested `it()` or `test()` regardless of level. The top-level `beforeEach()` will still run for nested `it()`s inside nested `describe()`s, unless overridden by a closer scoped `beforeEach()`:

```javascript
describe('Storage', () => {
  let storage = {};
  // Top-level beforeEach() will run for ALL subsequent it() blocks
  beforeEach(() => { storage = new Storage(); });

  it('instance `nameString` is "Storage Device"', () => {
    expect(storage.nameString).toBe('Storage Device');
  });

  describe('when deposited to using `deposit(itemInstance, qty)`', () => {
    it('fake test to mutate current `storage` instance', () => {
      storage.store = { foo: 'bar' };
      expect(storage.store).toEqual({ foo: 'bar' });
    });

    // beforeEach() is run before this it() block too
    it('fake test to create new `it()` block', () => {
      console.log(storage.store);  // logs "store: {}", which confirms beforeEach() ran
    });
  });
});
```

### 4. Object oriented programming

- No need for redundant `super()`. If a class extends another base class and doesn't have any additional instance variables or methods, there's no need to define a `constructor` and call `super()`. Just declaring `class Cone extends IceCreamHolder {}` will do.
- Pass classes around, not specific values. Instead of `deposit('Ice Cream Block', 100)`, it's much clearer to do `deposit(IceCreamBlock, 100)` and handle the deposition logic in the method itself.
    - This was a decision recurred so many times that I had to write this down as a rule for myself - pass around instances (objects) instead of literal values that might represent the same thing, because it's easier to reason about.
- Not a good idea to call `someObj.hasOwnProperty()` directly due to 2 reasons:
    - If an object was created with `Object.create(null)`, which apparently is a common use case for creating a Map data structure in JavaScript, that object would not have the `hasOwnProperty` property in its prototype chain! And if it is called, things break. See [this linter rule](https://eslint.org/docs/rules/no-prototype-builtins).
    - It's perfectly legal (though dangerous) to override the built-in `hasOwnProperty()` method, which if done, can cause hard-to-identify bugs.
    - Solution is to use `Object.prototype.hasOwnProperty.call(someObj, 'someProperty')`

### LAST. Miscellaneous

- Singular vs plural naming in filenames is hard. "containers", "storage-devices", and... "ice-cream"? I'm tempted to rename it to "ice-creams" but that wouldn't make sense since we can't count cream... arrrgh.

## Todo

- Add JSDoc docstrings to all classes and methods
- Make all in-game items inherit from a GameItem class with default properties and methods:
    - properties: getNameString
