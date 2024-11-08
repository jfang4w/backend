# Naming
## Files
All file name should be in `lowerCamelCase`.
```
src
├── article.js
├── const.js
├── data.js
├── index.js
├── room.js
├── server.js
├── user.js
├── utils
│   ├── statusCode.js
│   └── validation.js
└── tests
    ├── auth.test.js
    ├── test.html
    ├── test.js
    └── testUtils.js
```

## Identifiers
Identifiers use only ASCII letters, digits and underscore. All file/function/variable name should be in `lowerCamelCase`. All constant should be in `CONSTANT_CASE`.
```js
let aVariable = 1;
const A_CONSTANT = 1;
```

# Formatting
## Braces
Braces are required for all control structures (i.e. if, else, for, do, while, as well as any others), even if the body contains only a single statement. The first statement of a non-empty block must begin on its own line.
```js
if (true) {
    something();
}

while (true) {
    somthing();
    otherthing();
}
```

## Whitespace
Please use 4 tab spaces.

## Semicolon
Always include semicolon at the end of a statement.

# Language features
## Use `const` and `let`
Declare all local variables with either `const` or `let`. Use `const` by default, unless a variable needs to be reassigned. The `var` keyword must not be used.

## Function definition
We recommand using `function` keyword to define a function instead of `const`.
```js
funciton newFunction(someParams) {
    return;
}
```

# JsDoc
Please refer to the [JsDoc](https://jsdoc.app/) offical website.
```js
/** Check if the given email is valid
 *
 * @param {string} email - The email that is being tested
 * @return {boolean} Returns true if the email is valid, otherwise false
 */
```

# Reference
[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
