# plateboiler

![CI](https://github.com/roamiiing/plateboiler/actions/workflows/ci.yml/badge.svg)

## What even is this?

This is a dead simple configurable boilerplate generator.

## How to use it?

Install the cli globally

```
npm i -g plateboiler
```

Run the cli at the root of your project

```
pb init
```

This will generate a folder called `.plateboiler` with some file and a folder in it:

```
.plateboiler
| config.json
| example
| | __name__.js
```

Take a look at those files:

* `config.json`
```json
{
  "example": {
    "vars": ["name"],
    "dir": "src"
  }
}
```

* `example/__main__.js`
```js
console.log('Hello, __name.capitalize__!');
```

Now generate a file from this template:

```
pb example --name=world
```

This will generate a file called `world.js` in a folder `src` with the following content:

* `src/world.js`

```js
console.log('Hello, World!');
```

## API reference

### Configuration

All the configuration is described in `.plateboiler/config.json`. This file consists of an object, where the keys are names of your templates:

```json
{
  "example": {
    "vars": ["name"],
    "dir": "src"
  }
}
```

#### Configuration parameters

* `vars`: This is an *array* of the variable names you are going to expose.

* `dir`: This is a *string* that represents the folder in which you want to generate your files. **Note** that this path is used relative to the folder in which `.plateboiler` is located.

### Variables and modifiers

After declaring your variable names in `config.json`, feel free to use them in your files, file names and folder names as following:

```
__variableName__
```

There are some modifiers that you may want to use:
* `capitalize`
* `decapitalize`
* `lower`
* `upper`
* `camel`
* `kebab`
* `snake`
* `swap`
* `title`

These functions are all taken from the [voca](https://github.com/panzerdp/voca) library. Use its documentation for more information.

Use them as following:

```
__variable_name.kebab__
```

Then, if you specify `variable_name` as `pb example --variable_name=some_name`, it will be transformed into `someName`.

You can also stack modifiers like:

```
__variable_name.kebab.capitalize__
```

So your variable will be transformed into `SomeName`.

#### Variables casing

**Note**! Even though such modifiers as `snake` and `decapitalize` exist, you should **always use snake case for both declaring and defining your variables** for consistency: `--item=pizza_with_pineapples`.

### File structure

The `.plateboiler` folder consists of `config.json` and folders with your templates. 

**Note** that folder names must be the same as the template names you specify in your `config.json`:

* `config.json`

```json
{
  "my_template": {
    "vars": ["some_var"],
    "dir": "src"
  },
  "another_template": {
    "vars": ["another_var"],
    "dir": "src/example"
  }
}
```

* File structure:

```
.plateboiler
| config.json
| my_template
| | __some_var__-example.js
| another_template
| | __another_var__-another-example.js
```

You are allowed to use not only files, but also directories as following:

* `config.json`

```json
{
  "service": {
    "vars": ["name"],
    "dir": "src/services"
  }
}
```

* File structure:

```
.plateboiler
| config.json
| service
| | __name__
| | | __name__.service.js
| | | __name__.hooks.js
| | | __name__.class.js
```

### CLI

#### Initialization

```
pb init
```

#### Generation

```
pb <template> [vars]
```
