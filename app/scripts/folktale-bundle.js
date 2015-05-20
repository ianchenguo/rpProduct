(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    monads: require('control.monads')
}

},{"control.monads":6}],2:[function(require,module,exports){
module.exports = {
    arity: require('core.arity'),
    inspect: require('core.inspect'),
    lambda: require('core.lambda'),
    operators: require('core.operators')
}

},{"core.arity":9,"core.inspect":10,"core.lambda":11,"core.operators":12}],3:[function(require,module,exports){
module.exports = {
    Either: require('data.either'),
    Maybe: require('data.maybe'),
    Task: require('data.task'),
    Validation: require('data.validation')
}

},{"data.either":14,"data.maybe":15,"data.task":17,"data.validation":19}],4:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Basic monad operations.
 *
 * @module lib/basic
 */

// -- Dependencies -----------------------------------------------------
var Lambda = require('core.lambda')


// -- Aliases ----------------------------------------------------------
var curry    = Lambda.curry
var flip     = Lambda.flip
var identity = Lambda.identity


// -- Helpers ----------------------------------------------------------
function raise(e){ throw e }


// -- Implementation ---------------------------------------------------

/**
 * Evaluates each action in sequence, left to right, collecting the results.
 *
 * @method
 * @summary m:Monad[_] => m → Array[m[α]] → m[Array[α]]
 */
exports.sequence = curry(2, sequence)
function sequence(m, ms) {
  return ms.reduce(perform, m.of([]))

  function perform(mr, mx) {
    return mr.chain(function(xs) {
                      return mx.chain(function(x) {
                                        xs.push(x)
                                        return m.of(xs) })})}
}


/**
 * Evaluates each action in sequence, left to right, collecting the results
 * mapped by the given function.
 *
 * Equivalent to `compose(sequence, map(f))`.
 *
 * @method
 * @summary m:Monad[_] => m → (α → m[β]) → Array[α] → m[Array[β]]
 */
exports.mapM = curry(3, mapM)
function mapM(m, f, ms) {
  return sequence(m, ms.map(f))
}


/**
 * Left-to-right Kleisi composition of monads.
 *
 * @method
 * @summary m:Monad[_] => (α → m[β]) → (β → m[γ]) → α → m[γ]
 */
exports.compose = curry(3, compose)
function compose(f, g, a) {
  return f(a).chain(g)
}


/**
 * Right-to-left Kleisi composition of monads.
 *
 * @method
 * @summary m:Monad[_] => (β → m[γ]) → (α → m[β]) → α → m[γ]
 */
exports.rightCompose = flip(exports.compose)


/**
 * Removes one level of nesting for a nested monad.
 *
 * @method
 * @summary m:Monad[_] => m[m[α]] → m[α]
 */
exports.join = join
function join(m) {
  return m.chain(identity)
}


/**
 * Filters the contents of an array with a predicate returning a monad.
 * 
 * @method
 * @summary m:Monad[_] => m → (α → m[Boolean]) → [α] → m[α]
 */
exports.filterM = curry(3, filterM)
function filterM(m, p, xs) {
  return xs.length === 0?  m.of([])
  :      /* otherwise */   p(xs[0]).chain(function(flag) {
                             return filterM(m, p, xs.slice(1)).map(function(ys) {
                                      return flag?    [xs[0]].concat(ys)
                                      :      /* _ */  ys })})
}


/**
 * Promotes a regular binary function to a function over monads.
 *
 * @method
 * @summary m:Monad[_] => (α, β → γ) → m[α] → m[β] → m[γ]
 */
exports.liftM2 = curry(3, liftM2)
function liftM2(f, m1, m2) {
  return m1.chain(function(a) {
                    return m2.map(function(b) {
                                    return f(a, b) })})
}


/**
 * Promotes a regular function of arity N to a function over monads.
 *
 * @method
 * @summary m:Monad[_] => (α₁, α₂, ..., αₙ → β) → Array[m[α₁], m[α₂], ..., m[αₙ]] → m[β]
 */
exports.liftMN = curry(2, liftMN)
function liftMN(f, ms) {
  var len = ms.length

  return len < 0?         raise(new Error('Needs at least a singleton list to liftM.'))
  :      len === 1?       ms[0].map(f)
  :      len === 2?       liftM2(f, ms[0], ms[1])
  :      /* otherwise */  sequence(ms[len - 1], ms).map(function(xs) {
                                                          return f.apply(null, xs) })
}
},{"core.lambda":11}],5:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Curried versions of monadic methods
 *
 * @module lib/curried
 */

// -- Dependencies -----------------------------------------------------
var Lambda = require('core.lambda')


// -- Aliases ----------------------------------------------------------
var curry = Lambda.curry


// -- Implementation ---------------------------------------------------

/**
 * Concatenates two semigroups.
 *
 * @method
 * @summary s:Semigroup[_] => s[α] → s[α] → s[α]
 */
exports.concat = curry(2, concat)
function concat(a, b) {
  return a.concat(b)
}


/**
 * Constructs a new empty semigroup.
 *
 * @method
 * @summary s:Semigroup[_] => s → s[α]
 */
exports.empty = empty
function empty(a) {
  return a.empty?         a.empty()
  :      /* otherwise */  a.constructor.empty()
}


/**
 * Maps over a functor instance.
 *
 * @method
 * @summary f:Functor[_] => (α → β) → f[α] → f[β]
 */
exports.map = curry(2, map)
function map(f, a) {
  return a.map(f)
}


/**
 * Constructs a new applicative instance.
 *
 * @method
 * @summary f:Applicative[_] => α → f→ f[α]
 */
exports.of = curry(2, of)
function of(a, f) {
  return f.of?            f.of(a)
  :      /* otherwise */  f.constructor.of(a)
}


/**
 * Applies the function of an Applicative to the value of another Applicative.
 *
 * @method
 * @summary f:Applicative[_] => f[α → β] → f[α] → f[β]
 */
exports.ap = curry(2, ap)
function ap(a, b) {
  return a.ap(b)
}


/**
 * Transforms the value of a monad.
 *
 * @method
 * @summary c:Chain => (α → c[β]) → c[α] → c[β]
 */
exports.chain = curry(2, chain)
function chain(f, a) {
  return a.chain(f)
}
},{"core.lambda":11}],6:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var merge = require('xtend')

module.exports = [ require('./curried')
                 , require('./basic')
                 ].reduce(merge, {})
},{"./basic":4,"./curried":5,"xtend":8}],7:[function(require,module,exports){
module.exports = hasKeys

function hasKeys(source) {
    return source !== null &&
        (typeof source === "object" ||
        typeof source === "function")
}

},{}],8:[function(require,module,exports){
var hasKeys = require("./has-keys")

module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        if (!hasKeys(source)) {
            continue
        }

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{"./has-keys":7}],9:[function(require,module,exports){
// Copyright (c) 2014 Quildreen Motta
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Restricts the arity of variadic functions.
 *
 * @module lib/index
 */

// -- Aliases ----------------------------------------------------------
var toArray = Function.call.bind([].slice)


// -- Helpers ----------------------------------------------------------
function curry(n, f) {
  return curried([])

  function curried(args) {
    return function() {
      var newArgs  = toArray(arguments)
      var allArgs  = args.concat(newArgs)
      var argCount = allArgs.length

      return argCount < n?    curried(allArgs)
      :      /* otherwise */  f.apply(null, allArgs.slice(0, n)) }}
}



// -- Implementation ---------------------------------------------------

/**
 * Restricts a variadic function to a nullary one.
 *
 * @method
 * @summary (α₁, α₂, ..., αₙ → β) → Void → β
 */
exports.nullary = curry(2, nullary)
function nullary(f, _) {
  return f()
}


/**
 * Restricts a variadic function to an unary one.
 *
 * @method
 * @summary (α₁, α₂, ..., αₙ → β) → α₁ → β
 */
exports.unary = curry(2, unary)
function unary(f, a) {
  return f(a)
}


/**
 * Restricts a variadic function to a binary one.
 *
 * @method
 * @summary (α₁, α₂, ..., αₙ → β) → α₁ → α₂ → β
 */
exports.binary = curry(3, binary)
function binary(f, a, b) {
  return f(a, b)
}


/**
 * Restricts a variadic function to a ternary one.
 *
 * @method
 * @summary (α₁, α₂, α₃, ..., αₙ → β) → α₁ → α₂ → α₃ → β
 */
exports.ternary = curry(4, ternary)
function ternary(f, a, b, c) {
  return f(a, b, c)
}
},{}],10:[function(require,module,exports){
// Copyright (c) 2014 Quildreen Motta
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Displays a human-readable representation of built-in and custom objects
 *
 * @module core.inspect
 */

// -- Helpers ----------------------------------------------------------

/**
 * True if the value has a .toString method that returns a custom repr.
 *
 * @method
 * @private
 * @summary Any → Boolean
 */
function isCustom(a) {
  return a.toString
  &&     !Array.isArray(a)
  &&     a.toString() !== '[object Object]'
}

/**
 * Returns the [[Class]] of an object.
 *
 * @method
 * @private
 * @summary Any → String
 */
function classOf(a) {
  return Object.prototype.toString.call(a).slice(8, -1)
}

/**
 * True if an object is a String
 * 
 * @method
 * @private
 * @summary Any → Boolean
 */
function isString(a) {
  return classOf(a) === 'String'
}

/**
 * Returns a list of key/value pairs.
 *
 * @method
 * @private
 * @summary { String → * } → [(String, *)]
 */
function pairs(object) {
  return Object.keys(object).map(function(key){
    return { key: key, value: object[key] }
  })
}

/**
 * Displays the representation of a number.
 *
 * @method
 * @private
 * @summary Number → String
 */
function showNumber(a) {
  return Number(a).toString();
}

/**
 * Displays the representation of a boolean.
 *
 * @method
 * @private
 * @summary Boolean → String
 */
function showBoolean(a) {
  return Boolean(a).toString();
}

/**
 * Displays the representation of a string.
 *
 * @method
 * @private
 * @summary String → String
 */
function showString(a) {
  return JSON.stringify(String(a));
}

/**
 * Displays the representation of an array.
 *
 * @method
 * @private
 * @summary Number → [α] → String
 */
function showArray(maxDepth, array) {
  return '['
        + array.map(function(a) {
            return show(maxDepth - 1, a)
          }).join(', ')
        + ']';
}

/**
 * Displays the representation of an object.
 *
 * @method
 * @private
 * @summary Number → { String → * } → String
 */
function showObject(maxDepth, object) {
  return '{'
       + pairs(object).map(function(pair){
           return showString(pair.key) + ': ' + show(maxDepth - 1, pair.value)
         }).join(', ')
       + '}'
}

// -- Public interface -------------------------------------------------

/**
 * Displays the representation of anything.
 *
 * @method
 * @static
 * @summary Number → Any → String
 */
function show(maxDepth, value) {
  return value === undefined?   'undefined'
  :      value === null?        'null'
  :      isString(value)?       showString(value)
  :      isCustom(value)?       value.toString()
  :      maxDepth <= 0?         '(...)'
  :      Array.isArray(value)?  showArray(maxDepth, value)
  :      /* otherwise */        showObject(maxDepth, value)
}


module.exports = exports = function(a){ return show(5, a) };
exports.show = show;

},{}],11:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Provides pure functional combinators.
 *
 * @module Core/Lambda
 */

// -- Aliases ----------------------------------------------------------
var toArray = Function.call.bind([].slice)


// -- Implementation ---------------------------------------------------

/**
 * The identity combinator. Always returns the argument it's given.
 *
 * @example
 *   identity(3)        // => 3
 *   identity([1])      // => [1]
 *
 * @summary a → a
 */
exports.identity = identity
function identity(a) {
  return a
}


/**
 * The constant combinator. Always returns the first argument it's given.
 *
 * @example
 *   constant(3)(2)             // => 3
 *   constant('foo')([1])       // => 'foo'
 *
 * @summary a → b → a
 */
exports.constant = curry(2, constant)
function constant(a, b) {
  return a
}


/**
 * Applies a function to an argument.
 *
 * @example
 *   var inc = (a) => a + 1
 *   apply(inc)(3)      // => 4
 *
 * @summary (a → b) → a → b
 */
exports.apply = curry(2, apply)
function apply(f, a) {
  return f(a)
}


/**
 * Inverts the order of the parameters of a binary function.
 *
 * @example
 *   var subtract = (a) => (b) => a - b
 *   subtract(3)(2)             // => 1
 *   flip(subtract)(3)(2)       // => -1
 *
 * @summary (a → b → c) → (b → a → c)
 */
exports.flip = curry(3, flip)
function flip(f, a, b) {
  return f(b)(a)
}


/**
 * Composes two functions together.
 *
 * @example
 *   var inc    = (a) => a + 1
 *   var square = (a) => a * a
 *   compose(inc)(square)(2)    // => 5,        inc(square(2))
 *
 * @summary (b → c) → (a → b) → (a → c)
 */
exports.compose = curry(3, compose)
function compose(f, g, a) {
  return f(g(a))
}


/**
 * Transforms any function on tuples into a curried function.
 *
 * @example
 *   var sub3 = (a, b, c) => a - b - c
 *   curry(3, sub3)(5)(2)(1)   // => 2
 *
 * @summary Number → ((a1, a2, ..., aN) → b) → (a1 → a2 → ... → aN → b)
 */
exports.curry = curry(2, curry)
function curry(n, f) {
  return curried([])

  function curried(args) {
    return function() {
      var newArgs  = toArray(arguments)
      var allArgs  = args.concat(newArgs)
      var argCount = allArgs.length

      return argCount < n?    curried(allArgs)
      :      argCount === n?  f.apply(null, allArgs)
      :      /* > n */        f.apply(null, allArgs.slice(0, n))
                               .apply(null, allArgs.slice(n)) }}
}


/**
 * Transforms a curried function into one accepting a list of arguments.
 *
 * @example
 *   var add = (a) => (b) => a + b
 *   spread(add)([3, 2])        // => 5
 *
 * @summary (a1 → a2 → ... → aN → b) → (#[a1, a2, ..., aN) → b)
 */
exports.spread = curry(2, spread)
function spread(f, as) {
  return as.reduce(function(g, a) { return g(a) }, f)
}


/**
 * Transforms a curried function into a function on tuples.
 *
 * @example
 *   var add = (a) => (b) => a + b
 *   uncurry(add)(3, 2)         // => 5
 *
 * @summary (a1 → a2 → ... → aN → b) → ((a1, a2, ..., aN) → b)
 */
exports.uncurry = uncurry
function uncurry(f) {
  return function() { return spread(f, toArray(arguments)) }
}


/**
 * Applies an unary function to both arguments of a binary function.
 *
 * @example
 *   var xss = [[1, 2], [3, 1], [-2, 4]]
 *   sortBy(upon(compare, first))
 *
 * @summary (b → b → c) → (a → b) → (a → a → c)
 */
exports.upon = curry(4, upon)
function upon(f, g, a, b) {
  return f(g(a))(g(b))
}

},{}],12:[function(require,module,exports){
// Copyright (c) 2014 Quildreen Motta
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Provides JS operators as curried functions.
 *
 * @module lib/index
 */

// -- Dependencies -----------------------------------------------------
var curry = require('core.lambda').curry
var flip  = require('core.lambda').flip


// -- Aliases ----------------------------------------------------------
var internalToString = Function.call.bind(Object.prototype.toString)

// -- Helpers ----------------------------------------------------------

/*
 * Tests if something is an object
 *
 * @summary α → Boolean
 */
function isObject(a) {
  return Object(a) === a
}


// -- Arithmetic -------------------------------------------------------

/**
 * Addition.
 *
 * @example
 *   add(2)(3)          // => 2 + 3 => 5
 *
 * @method
 * @summary Number → Number → Number
 */
exports.add = curry(2, add)
function add(a, b) {
  return a + b
}

/**
 * Subtraction.
 *
 * @example
 *   subtract(2)(3)     // => 2 - 3 => -1
 *
 * @method
 * @summary Number → Number → Number
 */
exports.subtract = curry(2, subtract)
function subtract(a, b) {
  return a - b
}

/**
 * Division.
 *
 * @example
 *   divide(4)(2)       // => 4 / 2 => 2
 *
 * @method
 * @summary Number → Number → Number
 */
exports.divide = curry(2, divide)
function divide(a, b) {
  return a / b
}

/**
 * Multiplication.
 *
 * @example
 *   multiply(2)(3)     // => 2 * 3 => 6
 *
 * @method
 * @summary Number → Number → Number
 */
exports.multiply = curry(2, multiply)
function multiply(a, b) {
  return a * b
}

/**
 * Modulus.
 *
 * @example
 *   modulus(3)(2)      // => 3 % 2 => 1
 *
 * @method
 * @summary Number → Number → Number
 */
exports.modulus = curry(2, modulus)
function modulus(a, b) {
  return a % b
}

/**
 * Negation.
 *
 * @example
 *   negate(1)          // => -1
 *
 * @method
 * @summary Number → Number
 */
exports.negate = negate
function negate(a) {
  return -a
}

/**
 * Increment.
 *
 * @example
 *   increment(1)       // => 2
 *
 * @method
 * @summary Number → Number
 */
exports.increment = exports.add(1)

/**
 * Decrement.
 *
 * @example
 *   decrement(2)       // => 1
 *
 * @method
 * @summary Number → Number
 */
exports.decrement = flip(exports.subtract)(1)




// -- Logical ----------------------------------------------------------

/**
 * Logical negation.
 *
 * @example
 *   not(false)         // => !false => true
 *
 * @method
 * @summary Boolean → Boolean
 */
exports.not = not
function not(a) {
  return !a
}

/**
 * Logical conjunction.
 *
 * @example
 *   and(true, false)           // => true && false => false
 *   and(true, true)            // => true && true => true
 *
 * @method
 * @summary Boolean → Boolean → Boolean
 */
exports.and = curry(2, and)
function and(a, b) {
  return a && b
}

/**
 * Logical disjunction.
 *
 * @example
 *   or(true, false)            // => true || false => true
 *   or(false, false)           // => false || false => false
 *
 * @method
 * @summary Boolean → Boolean → Boolean
 */
exports.or = curry(2, or)
function or(a, b) {
  return a || b
}


// -- Bitwise ----------------------------------------------------------

/**
 * Bitwise negation.
 *
 * @example
 *   bitNot(0b110)      // => ~0b110 => -0b111
 *
 * @method
 * @summary Int → Int
 */
exports.bitNot = bitNot
function bitNot(a) {
  return ~a
}

/**
 * Bitwise conjunction.
 *
 * @example
 *   bitAnd(0b110, 0b101)       // => 0b110 & 0b101 => 0b100
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitAnd = curry(2, bitAnd)
function bitAnd(a, b) {
  return a & b
}

/**
 * Bitwise disjunction.
 *
 * @example
 *   bitOr(0b110, 0b101)        // => 0b110 | 0b101 => 0b111
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitOr = curry(2, bitOr)
function bitOr(a, b) {
  return a | b
}

/**
 * Bitwise exclusive disjunction.
 *
 * @example
 *   bitXor(0b1000, 0b0110)     // => 0b1000 ^ 0b0110 => 0b1110
 *   bitXor(0b110, 0b101)       // => 0b110 ^ 0b101 => 0b011
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitXor = curry(2, bitXor)
function bitXor(a, b) {
  return a ^ b
}

/**
 * Bitwise left shift.
 *
 * @example
 *   bitShiftLeft(0b10, 2)    // => 0b10 << 2   => 0b1000
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitShiftLeft = curry(2, bitShiftLeft)
function bitShiftLeft(a, b) {
  return a << b
}

/**
 * Sign-propagating bitwise right shift.
 *
 * @example
 *   bitShiftRight(0b1000, 2)   // => 0b1000 >> 2    => 0b10
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitShiftRight = curry(2, bitShiftRight)
function bitShiftRight(a, b) {
  return a >> b
}

/**
 * Zero-fill bitwise right shift.
 *
 * @example
 *   bitUnsignedShiftRight(-0b1001, 2)  // => -0b1001 >>> 2     => 0b111111111111111111111111111101
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitUnsignedShiftRight = curry(2, bitUnsignedShiftRight)
function bitUnsignedShiftRight(a, b) {
  return a >>> b
}


// -- Relational -------------------------------------------------------

/**
 * Strict equality.
 *
 * @example
 *   equal(1, '1')     // => 1 === '1' => false
 *   equal(1, 1)       // => 1 === 1   => true
 *
 * @method
 * @summary α → α → Boolean
 */
exports.equal = curry(2, equal)
function equal(a, b) {
  return a === b
}

/**
 * Strict inequality.
 *
 * @example
 *   notEqual(1, '1')  // => 1 !== '1' => true
 *   notEqual(1, 1)    // => 1 !== 1   => false
 *
 * @method
 * @summary α → α → Boolean
 */
exports.notEqual = curry(2, notEqual)
function notEqual(a, b) {
  return a !== b
}

/**
 * Greater than.
 *
 * @example
 *   greaterThan(2, 3)  // => 2 > 3 => false
 *
 * @method
 * @summary Number → Number → Boolean
 */
exports.greaterThan = curry(2, greaterThan)
function greaterThan(a, b) {
  return a > b
}

/**
 * Greater or equal to.
 *
 * @example
 *   greaterOrEqualTo(2, 2)     // => 2 >= 2 => true
 *
 * @method
 * @summary Number → Number → Boolean
 */
exports.greaterOrEqualTo = curry(2, greaterOrEqualTo)
function greaterOrEqualTo(a, b) {
  return a >= b
}

/**
 * Less than.
 *
 * @example
 *   lessThan(2, 3)             // => 2 < 3 => true
 *
 * @method
 * @summary Number → Number → Boolean
 */
exports.lessThan = curry(2, lessThan)
function lessThan(a, b) {
  return a < b
}

/**
 * Less or equal to.
 *
 * @example
 *   lessOrEqualTo(2, 3)        // => 2 <= 3 => true
 *
 * @method
 * @summary Number → Number → Boolean
 */
exports.lessOrEqualTo = curry(2, lessOrEqualTo)
function lessOrEqualTo(a, b) {
  return a <= b
}


// -- Special ----------------------------------------------------------

/**
 * Property accessor.
 *
 * @example
 *   get('foo', { foo: 1 })     // => ({ foo: 1 })['foo'] => 1
 *
 * @method
 * @summary String → Object → α | Void
 */
exports.get = curry(2, get)
function get(key, object) {
  return object[key]
}

/**
 * Tests the existence of a property in an object.
 *
 * @example
 *   has('foo', { foo: 1 })  // => 'foo' in { foo: 1 } => true
 *
 * @method
 * @summary String → Object → Boolean
 */
exports.has = curry(2, has)
function has(key, object) {
  return key in object
}

/**
 * Instance check.
 *
 * @example
 *   isInstance(Array, [1])     // => [1] instanceof Array => true
 *
 * @method
 * @summary Function → Object → Boolean
 */
exports.isInstance = curry(2, isInstance)
function isInstance(constructor, a) {
  return a instanceof constructor
}

/**
 * Constructs new objects.
 *
 * @example
 *   create(Array, 'foo')       // => new Array('foo')  => ['foo']
 *
 * @method
 * @summary (new(α₁, α₂, ..., αₙ) → β) → (α₁, α₂, ..., αₙ) → β
 */
exports.create = create
function create(constructor) {
  return function() {
           var a = Object.create(constructor.prototype)
           var b = constructor.apply(a, arguments)
           return isObject(b)?     b
           :      /* otherwise */  a }
}

/**
 * Returns the internal type of the object.
 *
 * @example
 *   typeOf('foo')        // => typeof 'foo' => 'string'
 *
 * @method
 * @summary α → String
 */
exports.typeOf = typeOf
function typeOf(a) {
  return typeof a
}

/**
 * Returns the internal `[[Class]]` of the object.
 *
 * @example
 *   classOf('foo')     // => {}.toString.call('foo') => 'String'
 *
 * @method
 * @summary α → String
 */
exports.classOf = classOf
function classOf(a) {
  return a === undefined?  'Undefined'
  :      a === null?       'Null'
  :      /* otherwise */   internalToString(a).slice(8, -1)
}

},{"core.lambda":11}],13:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @module lib/either
 */
module.exports = Either

// -- Aliases ----------------------------------------------------------
var clone         = Object.create
var unimplemented = function(){ throw new Error('Not implemented.') }
var noop          = function(){ return this                         }


// -- Implementation ---------------------------------------------------

/**
 * The `Either(a, b)` structure represents the logical disjunction between `a`
 * and `b`. In other words, `Either` may contain either a value of type `a` or
 * a value of type `b`, at any given time. This particular implementation is
 * biased on the right value (`b`), thus projections will take the right value
 * over the left one.
 *
 * This class models two different cases: `Left a` and `Right b`, and can hold
 * one of the cases at any given time. The projections are, none the less,
 * biased for the `Right` case, thus a common use case for this structure is to
 * hold the results of computations that may fail, when you want to store
 * additional information on the failure (instead of throwing an exception).
 *
 * Furthermore, the values of `Either(a, b)` can be combined and manipulated by
 * using the expressive monadic operations. This allows safely sequencing
 * operations that may fail, and safely composing values that you don't know
 * whether they're present or not, failing early (returning a `Left a`) if any
 * of the operations fail.
 *
 * While this class can certainly model input validations, the [Validation][]
 * structure lends itself better to that use case, since it can naturally
 * aggregate failures — monads shortcut on the first failure.
 *
 * [Validation]: https://github.com/folktale/data.validation
 *
 *
 * @class
 * @summary
 * Either[α, β] <: Applicative[β]
 *               , Functor[β]
 *               , Chain[β]
 *               , Show
 *               , Eq
 */
function Either() { }

Left.prototype = clone(Either.prototype)
function Left(a) {
  this.value = a
}

Right.prototype = clone(Either.prototype)
function Right(a) {
  this.value = a
}

// -- Constructors -----------------------------------------------------

/**
 * Constructs a new `Either[α, β]` structure holding a `Left` value. This
 * usually represents a failure due to the right-bias of this structure.
 *
 * @summary a → Either[α, β]
 */
Either.Left = function(a) {
  return new Left(a)
}
Either.prototype.Left = Either.Left

/**
 * Constructs a new `Etiher[α, β]` structure holding a `Right` value. This
 * usually represents a successful value due to the right bias of this
 * structure.
 *
 * @summary β → Either[α, β]
 */
Either.Right = function(a) {
  return new Right(a)
}
Either.prototype.Right = Either.Right


// -- Conversions ------------------------------------------------------

/**
 * Constructs a new `Either[α, β]` structure from a nullable type.
 *
 * Takes the `Left` case if the value is `null` or `undefined`. Takes the
 * `Right` case otherwise.
 *
 * @summary α → Either[α, α]
 */
Either.fromNullable = function(a) {
  return a != null?       this.Right(a)
  :      /* otherwise */  this.Left(a)
}
Either.prototype.fromNullable = Either.fromNullable

/**
 * Constructs a new `Either[α, β]` structure from a `Validation[α, β]` type.
 *
 * @summary Validation[α, β] → Either[α, β]
 */
Either.fromValidation = function(a) {
  return a.fold(this.Left.bind(this), this.Right.bind(this))
}


// -- Predicates -------------------------------------------------------

/**
 * True if the `Either[α, β]` contains a `Left` value.
 *
 * @summary Boolean
 */
Either.prototype.isLeft = false
Left.prototype.isLeft   = true

/**
 * True if the `Either[α, β]` contains a `Right` value.
 *
 * @summary Boolean
 */
Either.prototype.isRight = false
Right.prototype.isRight  = true


// -- Applicative ------------------------------------------------------

/**
 * Creates a new `Either[α, β]` instance holding the `Right` value `b`.
 *
 * `b` can be any value, including `null`, `undefined` or another
 * `Either[α, β]` structure.
 *
 * @summary β → Either[α, β]
 */
Either.of = function(a) {
  return this.Right(a)
}
Either.prototype.of = Either.of


/**
 * Applies the function inside the `Right` case of the `Either[α, β]` structure
 * to another applicative type.
 *
 * The `Either[α, β]` should contain a function value, otherwise a `TypeError`
 * is thrown.
 *
 * @method
 * @summary (@Either[α, β → γ], f:Applicative[_]) => f[β] → f[γ]
 */
Either.prototype.ap = unimplemented

Left.prototype.ap = function(b) {
  return b
}

Right.prototype.ap = function(b) {
  return b.map(this.value)
}


// -- Functor ----------------------------------------------------------

/**
 * Transforms the `Right` value of the `Either[α, β]` structure using a regular
 * unary function.
 *
 * @method
 * @summary (@Either[α, β]) => (β → γ) → Either[α, γ]
 */
Either.prototype.map = unimplemented
Left.prototype.map   = noop

Right.prototype.map = function(f) {
  return this.of(f(this.value))
}


// -- Chain ------------------------------------------------------------

/**
 * Transforms the `Right` value of the `Either[α, β]` structure using an unary
 * function to monads.
 *
 * @method
 * @summary (@Either[α, β], m:Monad[_]) => (β → m[γ]) → m[γ]
 */
Either.prototype.chain = unimplemented
Left.prototype.chain   = noop

Right.prototype.chain = function(f) {
  return f(this.value)
}


// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Either[α, β]` structure.
 *
 * @method
 * @summary (@Either[α, β]) => Void → String
 */
Either.prototype.toString = unimplemented

Left.prototype.toString = function() {
  return 'Either.Left(' + this.value + ')'
}

Right.prototype.toString = function() {
  return 'Either.Right(' + this.value + ')'
}


// -- Eq ---------------------------------------------------------------

/**
 * Tests if an `Either[α, β]` structure is equal to another `Either[α, β]`
 * structure.
 *
 * @method
 * @summary (@Either[α, β]) => Either[α, β] → Boolean
 */
Either.prototype.isEqual = unimplemented

Left.prototype.isEqual = function(a) {
  return a.isLeft && (a.value === this.value)
}

Right.prototype.isEqual = function(a) {
  return a.isRight && (a.value === this.value)
}


// -- Extracting and recovering ----------------------------------------

/**
 * Extracts the `Right` value out of the `Either[α, β]` structure, if it
 * exists. Otherwise throws a `TypeError`.
 *
 * @method
 * @summary (@Either[α, β]) => Void → β         :: partial, throws
 * @see {@link module:lib/either~Either#getOrElse} — A getter that can handle failures.
 * @see {@link module:lib/either~Either#merge} — The convergence of both values.
 * @throws {TypeError} if the structure has no `Right` value.
 */
Either.prototype.get = unimplemented

Left.prototype.get = function() {
  throw new TypeError("Can't extract the value of a Left(a).")
}

Right.prototype.get = function() {
  return this.value
}


/**
 * Extracts the `Right` value out of the `Either[α, β]` structure. If the
 * structure doesn't have a `Right` value, returns the given default.
 *
 * @method
 * @summary (@Either[α, β]) => β → β
 */
Either.prototype.getOrElse = unimplemented

Left.prototype.getOrElse = function(a) {
  return a
}

Right.prototype.getOrElse = function(_) {
  return this.value
}


/**
 * Transforms a `Left` value into a new `Either[α, β]` structure. Does nothing
 * if the structure contain a `Right` value.
 *
 * @method
 * @summary (@Either[α, β]) => (α → Either[γ, β]) → Either[γ, β]
 */
Either.prototype.orElse = unimplemented
Right.prototype.orElse  = noop

Left.prototype.orElse = function(f) {
  return f(this.value)
}


/**
 * Returns the value of whichever side of the disjunction that is present.
 *
 * @summary (@Either[α, α]) => Void → α
 */
Either.prototype.merge = function() {
  return this.value
}


// -- Folds and Extended Transformations -------------------------------

/**
 * Applies a function to each case in this data structure.
 *
 * @method
 * @summary (@Either[α, β]) => (α → γ), (β → γ) → γ
 */
Either.prototype.fold = unimplemented

Left.prototype.fold = function(f, _) {
  return f(this.value)
}

Right.prototype.fold = function(_, g) {
  return g(this.value)
}

/**
 * Catamorphism.
 * 
 * @method
 * @summary (@Either[α, β]) => { Left: α → γ, Right: β → γ } → γ
 */
Either.prototype.cata = unimplemented

Left.prototype.cata = function(pattern) {
  return pattern.Left(this.value)
}

Right.prototype.cata = function(pattern) {
  return pattern.Right(this.value)
}


/**
 * Swaps the disjunction values.
 *
 * @method
 * @summary (@Either[α, β]) => Void → Either[β, α]
 */
Either.prototype.swap = unimplemented

Left.prototype.swap = function() {
  return this.Right(this.value)
}

Right.prototype.swap = function() {
  return this.Left(this.value)
}


/**
 * Maps both sides of the disjunction.
 *
 * @method
 * @summary (@Either[α, β]) => (α → γ), (β → δ) → Either[γ, δ]
 */
Either.prototype.bimap = unimplemented

Left.prototype.bimap = function(f, _) {
  return this.Left(f(this.value))
}

Right.prototype.bimap = function(_, g) {
  return this.Right(g(this.value))
}


/**
 * Maps the left side of the disjunction.
 *
 * @method
 * @summary (@Either[α, β]) => (α → γ) → Either[γ, β]
 */
Either.prototype.leftMap = unimplemented
Right.prototype.leftMap  = noop

Left.prototype.leftMap = function(f) {
  return this.Left(f(this.value))
}
},{}],14:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = require('./either')
},{"./either":13}],15:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = require('./maybe')
},{"./maybe":16}],16:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @module lib/maybe
 */
module.exports = Maybe

// -- Aliases ----------------------------------------------------------
var clone         = Object.create
var unimplemented = function(){ throw new Error('Not implemented.') }
var noop          = function(){ return this                         }

// -- Implementation ---------------------------------------------------

/**
 * A structure for values that may not be present, or computations that may
 * fail. `Maybe(a)` explicitly models the effects that are implicit in
 * `Nullable` types, thus has none of the problems associated with
 * `null` or `undefined` — like `NullPointerExceptions`.
 *
 * The class models two different cases:
 *
 *  + `Just a` — represents a `Maybe(a)` that contains a value. `a` may
 *     be any value, including `null` or `undefined`.
 *
 *  + `Nothing` — represents a `Maybe(a)` that has no values. Or a
 *     failure that needs no additional information.
 *
 * Common uses of this structure includes modelling values that may or may
 * not be present in a collection, thus instead of needing a
 * `collection.has(a)`, the `collection.get(a)` operation gives you all
 * the information you need — `collection.get(a).is-nothing` being
 * equivalent to `collection.has(a)`; Similarly the same reasoning may
 * be applied to computations that may fail to provide a value, e.g.:
 * `collection.find(predicate)` can safely return a `Maybe(a)` instance,
 * even if the collection contains nullable values.
 *
 * Furthermore, the values of `Maybe(a)` can be combined and manipulated
 * by using the expressive monadic operations. This allows safely
 * sequencing operations that may fail, and safely composing values that
 * you don't know whether they're present or not, failing early
 * (returning a `Nothing`) if any of the operations fail.
 *
 * If one wants to store additional information about failures, the
 * [Either][] and [Validation][] structures provide such a capability, and
 * should be used instead of the `Maybe(a)` structure.
 *
 * [Either]: https://github.com/folktale/data.either
 * [Validation]: https://github.com/folktale/data.validation
 *
 *
 * @class
 */
function Maybe() {}

// The case for successful values
Just.prototype = clone(Maybe.prototype)
function Just(a){
  this.value = a
}

// The case for failure values
Nothing.prototype = clone(Maybe.prototype)
function Nothing(){}


// -- Constructors -----------------------------------------------------

/**
 * Constructs a new `Maybe[α]` structure with an absent value. Commonly used
 * to represent a failure.
 *
 * @summary Void → Maybe[α]
 */
Maybe.Nothing = function() {
  return new Nothing
}
Maybe.prototype.Nothing = Maybe.Nothing

/**
 * Constructs a new `Maybe[α]` structure that holds the single value
 * `α`. Commonly used to represent a success.
 *
 * `α` can be any value, including `null`, `undefined` or another
 * `Maybe[α]` structure.
 *
 * @summary α → Maybe[α]
 */
Maybe.Just = function(a) {
  return new Just(a)
}
Maybe.prototype.Just = Maybe.Just


// -- Conversions ------------------------------------------------------

/**
 * Constructs a new `Maybe[α]` structure from a nullable type.
 *
 * If the value is either `null` or `undefined`, this function returns a
 * `Nothing`, otherwise the value is wrapped in a `Just(α)`.
 *
 * @summary α → Maybe[α]
 */
Maybe.fromNullable = function(a) {
  return a != null?       new Just(a)
  :      /* otherwise */  new Nothing
}
Maybe.prototype.fromNullable = Maybe.fromNullable

/**
 * Constructs a new `Maybe[β]` structure from an `Either[α, β]` type.
 *
 * The left side of the `Either` becomes `Nothing`, and the right side
 * is wrapped in a `Just(β)`.
 *
 * @summary Either[α, β] → Maybe[β]
 */
Maybe.fromEither = function(a) {
  return a.fold(Maybe.Nothing, Maybe.Just)
}
Maybe.prototype.fromEither = Maybe.fromEither

/**
 * Constructs a new `Maybe[β]` structure from a `Validation[α, β]` type.
 *
 * The failure side of the `Validation` becomes `Nothing`, and the right
 * side is wrapped in a `Just(β)`.
 *
 * @method
 * @summary Validation[α, β] → Maybe[β]
 */
Maybe.fromValidation           = Maybe.fromEither
Maybe.prototype.fromValidation = Maybe.fromEither


// -- Predicates -------------------------------------------------------

/**
 * True if the `Maybe[α]` structure contains a failure (i.e.: `Nothing`).
 *
 * @summary Boolean
 */
Maybe.prototype.isNothing   = false
Nothing.prototype.isNothing = true


/**
 * True if the `Maybe[α]` structure contains a single value (i.e.: `Just(α)`).
 *
 * @summary Boolean
 */
Maybe.prototype.isJust = false
Just.prototype.isJust  = true


// -- Applicative ------------------------------------------------------

/**
 * Creates a new `Maybe[α]` structure holding the single value `α`.
 *
 * `α` can be any value, including `null`, `undefined`, or another
 * `Maybe[α]` structure.
 *
 * @summary α → Maybe[α]
 */
Maybe.of = function(a) {
  return Maybe.prototype.Just(a)
}
Maybe.prototype.of = Maybe.of


/**
 * Applies the function inside the `Maybe[α]` structure to another
 * applicative type.
 *
 * The `Maybe[α]` structure should contain a function value, otherwise a
 * `TypeError` is thrown.
 *
 * @method
 * @summary (@Maybe[α → β], f:Applicative[_]) => f[α] → f[β]
 */
Maybe.prototype.ap = unimplemented

Nothing.prototype.ap = function(b) {
  return b
}

Just.prototype.ap = function(b) {
  return b.map(this.value)
}




// -- Functor ----------------------------------------------------------

/**
 * Transforms the value of the `Maybe[α]` structure using a regular unary
 * function.
 *
 * @method
 * @summary @Maybe[α] => (α → β) → Maybe[β]
 */
Maybe.prototype.map   = unimplemented
Nothing.prototype.map = noop

Just.prototype.map = function(f) {
  return this.of(f(this.value))
}


// -- Chain ------------------------------------------------------------

/**
 * Transforms the value of the `Maybe[α]` structure using an unary function
 * to monads.
 *
 * @method
 * @summary (@Maybe[α], m:Monad[_]) => (α → m[β]) → m[β]
 */
Maybe.prototype.chain   = unimplemented
Nothing.prototype.chain = noop

Just.prototype.chain = function(f) {
  return f(this.value)
}


// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Maybe[α]` structure.
 *
 * @method
 * @summary @Maybe[α] => Void → String
 */
Maybe.prototype.toString = unimplemented

Nothing.prototype.toString = function() {
  return 'Maybe.Nothing'
}

Just.prototype.toString = function() {
  return 'Maybe.Just(' + this.value + ')'
}


// -- Eq ---------------------------------------------------------------

/**
 * Tests if a `Maybe[α]` structure is equal to another `Maybe[α]` structure.
 *
 * @method
 * @summary @Maybe[α] => Maybe[α] → Boolean
 */
Maybe.prototype.isEqual = unimplemented

Nothing.prototype.isEqual = function(b) {
  return b.isNothing
}

Just.prototype.isEqual = function(b) {
  return b.isJust
  &&     b.value === this.value
}


// -- Extracting and recovering ----------------------------------------

/**
 * Extracts the value out of the `Maybe[α]` structure, if it
 * exists. Otherwise throws a `TypeError`.
 *
 * @method
 * @summary @Maybe[α] => Void → a,      :: partial, throws
 * @see {@link module:lib/maybe~Maybe#getOrElse} — A getter that can handle failures
 * @throws {TypeError} if the structure has no value (`Nothing`).
 */
Maybe.prototype.get = unimplemented

Nothing.prototype.get = function() {
  throw new TypeError("Can't extract the value of a Nothing.")
}

Just.prototype.get = function() {
  return this.value
}


/**
 * Extracts the value out of the `Maybe[α]` structure. If there is no value,
 * returns the given default.
 *
 * @method
 * @summary @Maybe[α] => α → α
 */
Maybe.prototype.getOrElse = unimplemented

Nothing.prototype.getOrElse = function(a) {
  return a
}

Just.prototype.getOrElse = function(_) {
  return this.value
}


/**
 * Transforms a failure into a new `Maybe[α]` structure. Does nothing if the
 * structure already contains a value.
 *
 * @method
 * @summary @Maybe[α] => (Void → Maybe[α]) → Maybe[α]
 */
Maybe.prototype.orElse = unimplemented

Nothing.prototype.orElse = function(f) {
  return f()
}

Just.prototype.orElse = function(_) {
  return this
}


/**
 * Catamorphism.
 * 
 * @method
 * @summary @Maybe[α] => { Nothing: Void → β, Just: α → β } → β
 */
Maybe.prototype.cata = unimplemented

Nothing.prototype.cata = function(pattern) {
  return pattern.Nothing()
}

Just.prototype.cata = function(pattern) {
  return pattern.Just(this.value);
}


/**
 * JSON serialisation
 *
 * @method
 * @summary @Maybe[α] => Void → Object
 */
Maybe.prototype.toJSON = unimplemented

Nothing.prototype.toJSON = function() {
  return { '#type': 'folktale:Maybe.Nothing' }
}

Just.prototype.toJSON = function() {
  return { '#type': 'folktale:Maybe.Just'
         , value: this.value }
}
},{}],17:[function(require,module,exports){
module.exports = require('./task');

},{"./task":18}],18:[function(require,module,exports){
(function (process){
'use strict';


/**
 * A helper for delaying the execution of a function.
 * @private
 * @summary (Any... -> Any) -> Void
 */
var delayed = typeof setImmediate !== 'undefined'?  setImmediate
            : typeof process !== 'undefined'?       process.nextTick
            : /* otherwise */                       setTimeout

/**
 * @module lib/task
 */
module.exports = Task;

// -- Implementation ---------------------------------------------------

/**
 * The `Task[α, β]` structure represents values that depend on time. This
 * allows one to model time-based effects explicitly, such that one can have
 * full knowledge of when they're dealing with delayed computations, latency,
 * or anything that can not be computed immediately.
 *
 * A common use for this structure is to replace the usual Continuation-Passing
 * Style form of programming, in order to be able to compose and sequence
 * time-dependent effects using the generic and powerful monadic operations.
 *
 * @class
 * @summary
 * ((α → Void), (β → Void) → Void), (Void → Void) → Task[α, β]
 *
 * Task[α, β] <: Chain[β]
 *               , Monad[β]
 *               , Functor[β]
 *               , Applicative[β]
 *               , Semigroup[β]
 *               , Monoid[β]
 *               , Show
 */
function Task(computation, cleanup) {
  this.fork = computation;

  this.cleanup = cleanup || function() {};
}

/**
 * Constructs a new `Task[α, β]` containing the single value `β`.
 *
 * `β` can be any value, including `null`, `undefined`, or another
 * `Task[α, β]` structure.
 *
 * @summary β → Task[α, β]
 */
Task.prototype.of = function _of(b) {
  return new Task(function(_, resolve) {
    return resolve(b);
  });
};

Task.of = Task.prototype.of;

/**
 * Constructs a new `Task[α, β]` containing the single value `α`.
 *
 * `α` can be any value, including `null`, `undefined`, or another
 * `Task[α, β]` structure.
 *
 * @summary α → Task[α, β]
 */
Task.prototype.rejected = function _rejected(a) {
  return new Task(function(reject) {
    return reject(a);
  });
};

Task.rejected = Task.prototype.rejected;

// -- Functor ----------------------------------------------------------

/**
 * Transforms the successful value of the `Task[α, β]` using a regular unary
 * function.
 *
 * @summary @Task[α, β] => (β → γ) → Task[α, γ]
 */
Task.prototype.map = function _map(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function(reject, resolve) {
    return fork(function(a) {
      return reject(a);
    }, function(b) {
      return resolve(f(b));
    });
  }, cleanup);
};

// -- Chain ------------------------------------------------------------

/**
 * Transforms the succesful value of the `Task[α, β]` using a function to a
 * monad.
 *
 * @summary @Task[α, β] => (β → Task[α, γ]) → Task[α, γ]
 */
Task.prototype.chain = function _chain(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function(reject, resolve) {
    return fork(function(a) {
      return reject(a);
    }, function(b) {
      return f(b).fork(reject, resolve);
    });
  }, cleanup);
};

// -- Apply ------------------------------------------------------------

/**
 * Applys the successful value of the `Task[α, (β → γ)]` to the successful
 * value of the `Task[α, β]`
 *
 * @summary @Task[α, (β → γ)] => Task[α, β] → Task[α, γ]
 */

Task.prototype.ap = function _ap(f2) {
  return this.chain(function(f) {
    return f2.map(f);
  });
};

// -- Semigroup ------------------------------------------------------------

/**
 * Selects the earlier of the two tasks `Task[α, β]`
 *
 * @summary @Task[α, β] => Task[α, β] → Task[α, β]
 */

Task.prototype.concat = function _concat(that) {
  var forkThis = this.fork;
  var forkThat = that.fork;
  var cleanupThis = this.cleanup;
  var cleanupThat = that.cleanup;

  function cleanupBoth(state) {
    cleanupThis(state[0]);
    cleanupThat(state[1]);
  }

  return new Task(function(reject, resolve) {
    var done = false;
    var allState;
    var thisState = forkThis(guard(reject), guard(resolve));
    var thatState = forkThat(guard(reject), guard(resolve));

    return allState = [thisState, thatState];

    function guard(f) {
      return function(x) {
        if (!done) {
          done = true;
          delayed(function(){ cleanupBoth(allState) })
          return f(x);
        }
      };
    }
  }, cleanupBoth);

};

// -- Monoid ------------------------------------------------------------

/**
 * Returns a Task that will never resolve
 *
 * @summary Void → Task[α, _]
 */
Task.empty = function _empty() {
  return new Task(function() {});
};

Task.prototype.empty = Task.empty;

// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Task[α, β]`
 *
 * @summary @Task[α, β] => Void → String
 */
Task.prototype.toString = function _toString() {
  return 'Task';
};

// -- Extracting and recovering ----------------------------------------

/**
 * Transforms a failure value into a new `Task[α, β]`. Does nothing if the
 * structure already contains a successful value.
 *
 * @summary @Task[α, β] => (α → Task[γ, β]) → Task[γ, β]
 */
Task.prototype.orElse = function _orElse(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function(reject, resolve) {
    return fork(function(a) {
      return f(a).fork(reject, resolve);
    }, function(b) {
      return resolve(b);
    });
  }, cleanup);
};

// -- Folds and extended transformations -------------------------------

/**
 * Catamorphism. Takes two functions, applies the leftmost one to the failure
 * value, and the rightmost one to the successful value, depending on which one
 * is present.
 *
 * @summary @Task[α, β] => (α → γ), (β → γ) → Task[δ, γ]
 */
Task.prototype.fold = function _fold(f, g) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function(reject, resolve) {
    return fork(function(a) {
      return resolve(f(a));
    }, function(b) {
      return resolve(g(b));
    });
  }, cleanup);
};

/**
 * Catamorphism.
 *
 * @summary @Task[α, β] => { Rejected: α → γ, Resolved: β → γ } → Task[δ, γ]
 */
Task.prototype.cata = function _cata(pattern) {
  return this.fold(pattern.Rejected, pattern.Resolved);
};

/**
 * Swaps the disjunction values.
 *
 * @summary @Task[α, β] => Void → Task[β, α]
 */
Task.prototype.swap = function _swap() {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function(reject, resolve) {
    return fork(function(a) {
      return resolve(a);
    }, function(b) {
      return reject(b);
    });
  }, cleanup);
};

/**
 * Maps both sides of the disjunction.
 *
 * @summary @Task[α, β] => (α → γ), (β → δ) → Task[γ, δ]
 */
Task.prototype.bimap = function _bimap(f, g) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function(reject, resolve) {
    return fork(function(a) {
      return reject(f(a));
    }, function(b) {
      return resolve(g(b));
    });
  }, cleanup);
};

/**
 * Maps the left side of the disjunction (failure).
 *
 * @summary @Task[α, β] => (α → γ) → Task[γ, β]
 */
Task.prototype.rejectedMap = function _rejectedMap(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task(function(reject, resolve) {
    return fork(function(a) {
      return reject(f(a));
    }, function(b) {
      return resolve(b);
    });
  }, cleanup);
};

}).call(this,require('_process'))
},{"_process":21}],19:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = require('./validation')
},{"./validation":20}],20:[function(require,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @module lib/validation
 */
module.exports = Validation

// -- Aliases ----------------------------------------------------------
var clone         = Object.create
var unimplemented = function(){ throw new Error('Not implemented.') }
var noop          = function(){ return this                         }


// -- Implementation ---------------------------------------------------

/**
 * The `Validation[α, β]` is a disjunction that's more appropriate for
 * validating inputs, or any use case where you want to aggregate failures. Not
 * only does the `Validation` provide a better terminology for working with
 * such cases (`Failure` and `Success` versus `Failure` and `Success`), it also
 * allows one to easily aggregate failures and successes as an Applicative
 * Functor.
 *
 * @class
 * @summary
 * Validation[α, β] <: Applicative[β]
 *                   , Functor[β]
 *                   , Show
 *                   , Eq
 */
function Validation() { }

Failure.prototype = clone(Validation.prototype)
function Failure(a) {
  this.value = a
}

Success.prototype = clone(Validation.prototype)
function Success(a) {
  this.value = a
}

// -- Constructors -----------------------------------------------------

/**
 * Constructs a new `Validation[α, β]` structure holding a `Failure` value.
 *
 * @summary a → Validation[α, β]
 */
Validation.Failure = function(a) {
  return new Failure(a)
}
Validation.prototype.Failure = Validation.Failure

/**
 * Constructs a new `Etiher[α, β]` structure holding a `Success` value.
 *
 * @summary β → Validation[α, β]
 */
Validation.Success = function(a) {
  return new Success(a)
}
Validation.prototype.Success = Validation.Success


// -- Conversions ------------------------------------------------------

/**
 * Constructs a new `Validation[α, β]` structure from a nullable type.
 *
 * Takes the `Failure` case if the value is `null` or `undefined`. Takes the
 * `Success` case otherwise.
 *
 * @summary α → Validation[α, α]
 */
Validation.fromNullable = function(a) {
  return a != null?       this.Success(a)
  :      /* otherwise */  this.Failure(a)
}
Validation.prototype.fromNullable = Validation.fromNullable

/**
 * Constructs a new `Either[α, β]` structure from a `Validation[α, β]` type.
 *
 * @summary Either[α, β] → Validation[α, β]
 */
Validation.fromEither = function(a) {
  return a.fold(this.Failure.bind(this), this.Success.bind(this))
}


// -- Predicates -------------------------------------------------------

/**
 * True if the `Validation[α, β]` contains a `Failure` value.
 *
 * @summary Boolean
 */
Validation.prototype.isFailure = false
Failure.prototype.isFailure    = true

/**
 * True if the `Validation[α, β]` contains a `Success` value.
 *
 * @summary Boolean
 */
Validation.prototype.isSuccess = false
Success.prototype.isSuccess    = true


// -- Applicative ------------------------------------------------------

/**
 * Creates a new `Validation[α, β]` instance holding the `Success` value `b`.
 *
 * `b` can be any value, including `null`, `undefined` or another
 * `Validation[α, β]` structure.
 *
 * @summary β → Validation[α, β]
 */
Validation.of = function(a) {
  return this.Success(a)
}
Validation.prototype.of = Validation.of


/**
 * Applies the function inside the `Success` case of the `Validation[α, β]` structure
 * to another applicative type.
 *
 * The `Validation[α, β]` should contain a function value, otherwise a `TypeError`
 * is thrown.
 *
 * @method
 * @summary (@Validation[α, β → γ], f:Applicative[_]) => f[β] → f[γ]
 */
Validation.prototype.ap = unimplemented

Failure.prototype.ap = function(b) {
  return b.isFailure?     this.Failure(this.value.concat(b.value))
  :      /* otherwise */  this
}

Success.prototype.ap = function(b) {
  return b.isFailure?     b
  :      /* otherwise */  b.map(this.value)
}


// -- Functor ----------------------------------------------------------

/**
 * Transforms the `Success` value of the `Validation[α, β]` structure using a regular
 * unary function.
 *
 * @method
 * @summary (@Validation[α, β]) => (β → γ) → Validation[α, γ]
 */
Validation.prototype.map = unimplemented
Failure.prototype.map    = noop

Success.prototype.map = function(f) {
  return this.of(f(this.value))
}


// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Validation[α, β]` structure.
 *
 * @method
 * @summary (@Validation[α, β]) => Void → String
 */
Validation.prototype.toString = unimplemented

Failure.prototype.toString = function() {
  return 'Validation.Failure(' + this.value + ')'
}

Success.prototype.toString = function() {
  return 'Validation.Success(' + this.value + ')'
}


// -- Eq ---------------------------------------------------------------

/**
 * Tests if an `Validation[α, β]` structure is equal to another `Validation[α, β]`
 * structure.
 *
 * @method
 * @summary (@Validation[α, β]) => Validation[α, β] → Boolean
 */
Validation.prototype.isEqual = unimplemented

Failure.prototype.isEqual = function(a) {
  return a.isFailure && (a.value === this.value)
}

Success.prototype.isEqual = function(a) {
  return a.isSuccess && (a.value === this.value)
}


// -- Extracting and recovering ----------------------------------------

/**
 * Extracts the `Success` value out of the `Validation[α, β]` structure, if it
 * exists. Otherwise throws a `TypeError`.
 *
 * @method
 * @summary (@Validation[α, β]) => Void → β         :: partial, throws
 * @see {@link module:lib/validation~Validation#getOrElse} — A getter that can handle failures.
 * @see {@link module:lib/validation~Validation#merge} — The convergence of both values.
 * @throws {TypeError} if the structure has no `Success` value.
 */
Validation.prototype.get = unimplemented

Failure.prototype.get = function() {
  throw new TypeError("Can't extract the value of a Failure(a).")
}

Success.prototype.get = function() {
  return this.value
}


/**
 * Extracts the `Success` value out of the `Validation[α, β]` structure. If the
 * structure doesn't have a `Success` value, returns the given default.
 *
 * @method
 * @summary (@Validation[α, β]) => β → β
 */
Validation.prototype.getOrElse = unimplemented

Failure.prototype.getOrElse = function(a) {
  return a
}

Success.prototype.getOrElse = function(_) {
  return this.value
}


/**
 * Transforms a `Failure` value into a new `Validation[α, β]` structure. Does nothing
 * if the structure contain a `Success` value.
 *
 * @method
 * @summary (@Validation[α, β]) => (α → Validation[γ, β]) → Validation[γ, β]
 */
Validation.prototype.orElse = unimplemented
Success.prototype.orElse    = noop

Failure.prototype.orElse = function(f) {
  return f(this.value)
}


/**
 * Returns the value of whichever side of the disjunction that is present.
 *
 * @summary (@Validation[α, α]) => Void → α
 */
Validation.prototype.merge = function() {
  return this.value
}


// -- Folds and Extended Transformations -------------------------------

/**
 * Applies a function to each case in this data structure.
 *
 * @method
 * @summary (@Validation[α, β]) => (α → γ), (β → γ) → γ
 */
Validation.prototype.fold = unimplemented

Failure.prototype.fold = function(f, _) {
  return f(this.value)
}

Success.prototype.fold = function(_, g) {
  return g(this.value)
}

/**
 * Catamorphism.
 * 
 * @method
 * @summary (@Validation[α, β]) => { Success: α → γ, Failure: α → γ } → γ
 */
Validation.prototype.cata = unimplemented

Failure.prototype.cata = function(pattern) {
  return pattern.Failure(this.value)
}

Success.prototype.cata = function(pattern) {
  return pattern.Success(this.value)
}


/**
 * Swaps the disjunction values.
 *
 * @method
 * @summary (@Validation[α, β]) => Void → Validation[β, α]
 */
Validation.prototype.swap = unimplemented

Failure.prototype.swap = function() {
  return this.Success(this.value)
}

Success.prototype.swap = function() {
  return this.Failure(this.value)
}


/**
 * Maps both sides of the disjunction.
 *
 * @method
 * @summary (@Validation[α, β]) => (α → γ), (β → δ) → Validation[γ, δ]
 */
Validation.prototype.bimap = unimplemented

Failure.prototype.bimap = function(f, _) {
  return this.Failure(f(this.value))
}

Success.prototype.bimap = function(_, g) {
  return this.Success(g(this.value))
}


/**
 * Maps the failure side of the disjunction.
 *
 * @method
 * @summary (@Validation[α, β]) => (α → γ) → Validation[γ, β]
 */
Validation.prototype.failureMap = unimplemented
Success.prototype.failureMap    = noop

Failure.prototype.failureMap = function(f) {
  return this.Failure(f(this.value))
}

/**
 * Maps the failure side of the disjunction.
 *
 * @method
 * @deprecated in favour of {@link module:lib/validation~Validation#failureMap}
 * @summary (@Validation[α, β]) => (α → γ) → Validation[γ, β]
 */
Validation.prototype.leftMap = Validation.prototype.failureMap
Success.prototype.leftMap    = Success.prototype.failureMap
Failure.prototype.leftMap    = Failure.prototype.failureMap
},{}],21:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],22:[function(require,module,exports){
module.exports = {
    data: require('./data'),
    core: require('./core'),
    control: require('./control')
}

},{"./control":1,"./core":2,"./data":3}]},{},[22]);
