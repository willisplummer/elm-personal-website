(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.aa.M === region.ah.M)
	{
		return 'on line ' + region.aa.M;
	}
	return 'on lines ' + region.aa.M + ' through ' + region.ah.M;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return $elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return $elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? $elm$core$Result$Ok(value)
				: (value instanceof String)
					? $elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return $elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aU,
		impl.be,
		impl.bd,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		v: func(record.v),
		ab: record.ab,
		Z: record.Z
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || key !== 'checked' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.v;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.ab;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.Z) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aU,
		impl.be,
		impl.bd,
		function(sendToApp, initialModel) {
			var view = impl.bf;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aU,
		impl.be,
		impl.bd,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl._ && impl._(sendToApp)
			var view = impl.bf;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.aL);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.m) && (_VirtualDom_doc.title = title = doc.m);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.a0;
	var onUrlRequest = impl.a1;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		_: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.ax === next.ax
							&& curr.an === next.an
							&& curr.au.a === next.au.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		aU: function(flags)
		{
			return A3(impl.aU, flags, _Browser_getUrl(), key);
		},
		bf: impl.bf,
		be: impl.be,
		bd: impl.bd
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { aR: 'hidden', L: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { aR: 'mozHidden', L: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { aR: 'msHidden', L: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { aR: 'webkitHidden', L: 'webkitvisibilitychange' }
		: { aR: 'hidden', L: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		aC: _Browser_getScene(),
		aI: {
			V: _Browser_window.pageXOffset,
			W: _Browser_window.pageYOffset,
			J: _Browser_doc.documentElement.clientWidth,
			D: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		J: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		D: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			aC: {
				J: node.scrollWidth,
				D: node.scrollHeight
			},
			aI: {
				V: node.scrollLeft,
				W: node.scrollTop,
				J: node.clientWidth,
				D: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			aC: _Browser_getScene(),
			aI: {
				V: x,
				W: y,
				J: _Browser_doc.documentElement.clientWidth,
				D: _Browser_doc.documentElement.clientHeight
			},
			aP: {
				V: x + rect.left,
				W: y + rect.top,
				J: rect.width,
				D: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.aY) { flags += 'm'; }
	if (options.aM) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}var $author$project$Types$LinkClicked = function (a) {
	return {$: 5, a: a};
};
var $author$project$Types$UrlChange = function (a) {
	return {$: 4, a: a};
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.d) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.f),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.f);
		} else {
			var treeLen = builder.d * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.g) : builder.g;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.d);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.f) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.f);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{g: nodeList, d: (len / $elm$core$Array$branchFactor) | 0, f: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {al: fragment, an: host, a3: path, au: port_, ax: protocol, ay: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $author$project$Types$AboutRoute = 0;
var $author$project$Types$PortfolioRoute = 2;
var $author$project$Types$ReadingListRoute = 3;
var $author$project$Types$ShowAbout = {$: 0};
var $author$project$Types$ShowPortfolio = {$: 2};
var $author$project$Types$ShowReadingList = {$: 3};
var $author$project$Types$ShowWriting = {$: 1};
var $author$project$Types$WritingRoute = 1;
var $author$project$Data$BookEntry = F3(
	function (title, author, year) {
		return {ad: author, m: title, aJ: year};
	});
var $MaybeJustJames$yaml$Yaml$Decode$Decoder = $elm$core$Basics$identity;
var $MaybeJustJames$yaml$Yaml$Decode$Decoding = function (a) {
	return {$: 1, a: a};
};
var $MaybeJustJames$yaml$Yaml$Decode$fromValue = F2(
	function (_v0, v) {
		var decoder = _v0;
		return decoder(v);
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $MaybeJustJames$yaml$Yaml$Decode$find = F3(
	function (names, decoder, v0) {
		find:
		while (true) {
			if (names.b) {
				var name = names.a;
				var rest = names.b;
				if (v0.$ === 4) {
					var properties = v0.a;
					var _v2 = A2($elm$core$Dict$get, name, properties);
					if (!_v2.$) {
						var v1 = _v2.a;
						var $temp$names = rest,
							$temp$decoder = decoder,
							$temp$v0 = v1;
						names = $temp$names;
						decoder = $temp$decoder;
						v0 = $temp$v0;
						continue find;
					} else {
						return $elm$core$Result$Err(
							$MaybeJustJames$yaml$Yaml$Decode$Decoding('Expected property: ' + name));
					}
				} else {
					return $elm$core$Result$Err(
						$MaybeJustJames$yaml$Yaml$Decode$Decoding('Expected record'));
				}
			} else {
				return A2($MaybeJustJames$yaml$Yaml$Decode$fromValue, decoder, v0);
			}
		}
	});
var $MaybeJustJames$yaml$Yaml$Decode$field = F2(
	function (name, decoder) {
		return function (v) {
			return A3(
				$MaybeJustJames$yaml$Yaml$Decode$find,
				_List_fromArray(
					[name]),
				decoder,
				v);
		};
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $MaybeJustJames$yaml$Yaml$Parser$Ast$toString = function (value) {
	switch (value.$) {
		case 0:
			var string = value.a;
			return '\"' + (string + '\" (string)');
		case 1:
			var _float = value.a;
			return $elm$core$String$fromFloat(_float) + ' (float)';
		case 2:
			var _int = value.a;
			return $elm$core$String$fromInt(_int) + ' (int)';
		case 3:
			var list = value.a;
			return '[ ' + (A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $MaybeJustJames$yaml$Yaml$Parser$Ast$toString, list)) + ' ] (list)');
		case 4:
			var properties = value.a;
			return '{ ' + (A2(
				$elm$core$String$join,
				', ',
				A2(
					$elm$core$List$map,
					$MaybeJustJames$yaml$Yaml$Parser$Ast$toStringProperty,
					$elm$core$Dict$toList(properties))) + ' } (map)');
		case 5:
			if (value.a) {
				return 'True (bool)';
			} else {
				return 'False (bool)';
			}
		case 6:
			return 'Null';
		case 7:
			var name = value.a;
			var r_val = value.b;
			return '&' + (name + (' ' + $MaybeJustJames$yaml$Yaml$Parser$Ast$toString(r_val)));
		default:
			var name = value.a;
			return '*' + name;
	}
};
var $MaybeJustJames$yaml$Yaml$Parser$Ast$toStringProperty = function (_v0) {
	var name = _v0.a;
	var value = _v0.b;
	return name + (': ' + $MaybeJustJames$yaml$Yaml$Parser$Ast$toString(value));
};
var $MaybeJustJames$yaml$Yaml$Decode$decodeError = F2(
	function (expected, got) {
		return $elm$core$Result$Err(
			$MaybeJustJames$yaml$Yaml$Decode$Decoding(
				'Expected ' + (expected + (', got: ' + $MaybeJustJames$yaml$Yaml$Parser$Ast$toString(got)))));
	});
var $MaybeJustJames$yaml$Yaml$Decode$int = function (v) {
	if (v.$ === 2) {
		var int_ = v.a;
		return $elm$core$Result$Ok(int_);
	} else {
		return A2($MaybeJustJames$yaml$Yaml$Decode$decodeError, 'int', v);
	}
};
var $MaybeJustJames$yaml$Yaml$Decode$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var a = _v0;
		var b = _v1;
		var c = _v2;
		return function (v0) {
			var _v3 = a(v0);
			if (_v3.$ === 1) {
				var err1 = _v3.a;
				return $elm$core$Result$Err(err1);
			} else {
				var av = _v3.a;
				var _v4 = b(v0);
				if (_v4.$ === 1) {
					var err2 = _v4.a;
					return $elm$core$Result$Err(err2);
				} else {
					var bv = _v4.a;
					var _v5 = c(v0);
					if (_v5.$ === 1) {
						var err3 = _v5.a;
						return $elm$core$Result$Err(err3);
					} else {
						var cv = _v5.a;
						return $elm$core$Result$Ok(
							A3(func, av, bv, cv));
					}
				}
			}
		};
	});
var $MaybeJustJames$yaml$Yaml$Decode$string = function (v) {
	switch (v.$) {
		case 0:
			var string_ = v.a;
			return $elm$core$Result$Ok(string_);
		case 6:
			return $elm$core$Result$Ok('');
		default:
			return A2($MaybeJustJames$yaml$Yaml$Decode$decodeError, 'string', v);
	}
};
var $author$project$Data$decoder = A4(
	$MaybeJustJames$yaml$Yaml$Decode$map3,
	$author$project$Data$BookEntry,
	A2($MaybeJustJames$yaml$Yaml$Decode$field, 'title', $MaybeJustJames$yaml$Yaml$Decode$string),
	A2($MaybeJustJames$yaml$Yaml$Decode$field, 'author', $MaybeJustJames$yaml$Yaml$Decode$string),
	A2($MaybeJustJames$yaml$Yaml$Decode$field, 'year', $MaybeJustJames$yaml$Yaml$Decode$int));
var $MaybeJustJames$yaml$Yaml$Decode$Parsing = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $MaybeJustJames$yaml$Yaml$Parser$problemToString = function (p) {
	switch (p.$) {
		case 0:
			var msg = p.a;
			return 'Expected ' + msg;
		case 1:
			return 'Expected an integer';
		case 2:
			return 'Expected a hexadecimal value';
		case 3:
			return 'Expected an octal value';
		case 4:
			return 'Expected a binary value';
		case 5:
			return 'Expected a float';
		case 6:
			return 'Expected a number';
		case 7:
			return 'Expected a variable';
		case 8:
			var name = p.a;
			return 'Expected symbol \'' + (name + '\'');
		case 9:
			var name = p.a;
			return 'Expected keyword \'' + (name + '\'');
		case 10:
			return 'Expected end of input';
		case 11:
			return 'Encountered an unexpected character';
		case 12:
			var msg = p.a;
			return 'Problem: ' + msg;
		default:
			return 'Bad repeat';
	}
};
var $MaybeJustJames$yaml$Yaml$Parser$deadEndToString = function (deadend) {
	return 'Line ' + ($elm$core$String$fromInt(deadend.bb) + (', column ' + ($elm$core$String$fromInt(deadend.n) + (': ' + $MaybeJustJames$yaml$Yaml$Parser$problemToString(deadend.a5)))));
};
var $MaybeJustJames$yaml$Yaml$Parser$deadEndsToString = function (deadends) {
	return A2(
		$elm$core$String$join,
		'\n',
		A2($elm$core$List$map, $MaybeJustJames$yaml$Yaml$Parser$deadEndToString, deadends));
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $MaybeJustJames$yaml$Yaml$Parser$Ast$fold = F3(
	function (f, value, z) {
		switch (value.$) {
			case 0:
				return A2(f, value, z);
			case 1:
				return A2(f, value, z);
			case 2:
				return A2(f, value, z);
			case 5:
				return A2(f, value, z);
			case 6:
				return A2(f, value, z);
			case 8:
				return A2(f, value, z);
			case 3:
				var l = value.a;
				return A2(
					f,
					value,
					A3(
						$elm$core$List$foldl,
						$MaybeJustJames$yaml$Yaml$Parser$Ast$fold(f),
						z,
						l));
			case 4:
				var r = value.a;
				return A2(
					f,
					value,
					A3(
						$elm$core$List$foldl,
						$MaybeJustJames$yaml$Yaml$Parser$Ast$fold(f),
						z,
						$elm$core$Dict$values(r)));
			default:
				var nm = value.a;
				var a = value.b;
				return A2(
					f,
					value,
					A3($MaybeJustJames$yaml$Yaml$Parser$Ast$fold, f, a, z));
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $MaybeJustJames$yaml$Yaml$Parser$Ast$Anchor_ = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var $MaybeJustJames$yaml$Yaml$Parser$Ast$List_ = function (a) {
	return {$: 3, a: a};
};
var $MaybeJustJames$yaml$Yaml$Parser$Ast$Record_ = function (a) {
	return {$: 4, a: a};
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $MaybeJustJames$yaml$Yaml$Parser$Ast$map = F2(
	function (f, value) {
		switch (value.$) {
			case 0:
				return f(value);
			case 1:
				return f(value);
			case 2:
				return f(value);
			case 5:
				return f(value);
			case 6:
				return f(value);
			case 8:
				return f(value);
			case 3:
				var l = value.a;
				return f(
					$MaybeJustJames$yaml$Yaml$Parser$Ast$List_(
						A2(
							$elm$core$List$map,
							$MaybeJustJames$yaml$Yaml$Parser$Ast$map(f),
							l)));
			case 4:
				var r = value.a;
				return f(
					$MaybeJustJames$yaml$Yaml$Parser$Ast$Record_(
						$elm$core$Dict$fromList(
							A2(
								$elm$core$List$map,
								function (_v1) {
									var k = _v1.a;
									var v = _v1.b;
									return _Utils_Tuple2(
										k,
										A2($MaybeJustJames$yaml$Yaml$Parser$Ast$map, f, v));
								},
								$elm$core$Dict$toList(r)))));
			default:
				var name = value.a;
				var a = value.b;
				return f(
					A2(
						$MaybeJustJames$yaml$Yaml$Parser$Ast$Anchor_,
						name,
						A2($MaybeJustJames$yaml$Yaml$Parser$Ast$map, f, a)));
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $MaybeJustJames$yaml$Yaml$Parser$deref = function (ast) {
	var anchorMap = A3(
		$MaybeJustJames$yaml$Yaml$Parser$Ast$fold,
		F2(
			function (node, d) {
				if (node.$ === 7) {
					var name = node.a;
					var v = node.b;
					return A3($elm$core$Dict$insert, name, v, d);
				} else {
					return d;
				}
			}),
		ast,
		$elm$core$Dict$empty);
	var replaceAnchors = function (v) {
		switch (v.$) {
			case 8:
				var name = v.a;
				return A2(
					$elm$core$Maybe$withDefault,
					v,
					A2($elm$core$Dict$get, name, anchorMap));
			case 7:
				var node = v.b;
				return node;
			default:
				return v;
		}
	};
	return A2($MaybeJustJames$yaml$Yaml$Parser$Ast$map, replaceAnchors, ast);
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {n: col, aO: contextStack, a5: problem, bb: row};
	});
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.bb, s.n, x, s.c));
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.b, s.bb, s.n, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{n: newCol, c: s.c, o: s.o, b: newOffset, bb: newRow, a: s.a});
	};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $MaybeJustJames$yaml$Yaml$Parser$Util$threeDashes = $elm$parser$Parser$symbol('---');
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$chompUntilEndOr = function (str) {
	return function (s) {
		var _v0 = A5(_Parser_findSubString, str, s.b, s.bb, s.n, s.a);
		var newOffset = _v0.a;
		var newRow = _v0.b;
		var newCol = _v0.c;
		var adjustedOffset = (newOffset < 0) ? $elm$core$String$length(s.a) : newOffset;
		return A3(
			$elm$parser$Parser$Advanced$Good,
			_Utils_cmp(s.b, adjustedOffset) < 0,
			0,
			{n: newCol, c: s.c, o: s.o, b: adjustedOffset, bb: newRow, a: s.a});
	};
};
var $elm$parser$Parser$Advanced$lineComment = function (start) {
	return A2(
		$elm$parser$Parser$Advanced$ignorer,
		$elm$parser$Parser$Advanced$token(start),
		$elm$parser$Parser$Advanced$chompUntilEndOr('\n'));
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$lineComment = function (str) {
	return $elm$parser$Parser$Advanced$lineComment(
		$elm$parser$Parser$toToken(str));
};
var $MaybeJustJames$yaml$Yaml$Parser$Util$comment = $elm$parser$Parser$lineComment('#');
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $MaybeJustJames$yaml$Yaml$Parser$Util$whitespace = function () {
	var step = function (_v0) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						$elm$parser$Parser$Loop(0)),
					$MaybeJustJames$yaml$Yaml$Parser$Util$comment),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						$elm$parser$Parser$Loop(0)),
					$elm$parser$Parser$symbol(' ')),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						$elm$parser$Parser$Loop(0)),
					$elm$parser$Parser$symbol('\n')),
					$elm$parser$Parser$succeed(
					$elm$parser$Parser$Done(0))
				]));
	};
	return A2($elm$parser$Parser$loop, 0, step);
}();
var $MaybeJustJames$yaml$Yaml$Parser$Document$dashes = function (indent) {
	return (indent === 1) ? $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$MaybeJustJames$yaml$Yaml$Parser$Util$threeDashes),
				$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace)
			])) : A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace);
};
var $elm$parser$Parser$Advanced$getCol = function (s) {
	return A3($elm$parser$Parser$Advanced$Good, false, s.n, s);
};
var $elm$parser$Parser$getCol = $elm$parser$Parser$Advanced$getCol;
var $MaybeJustJames$yaml$Yaml$Parser$Document$begins = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
			A2($elm$parser$Parser$andThen, $MaybeJustJames$yaml$Yaml$Parser$Document$dashes, $elm$parser$Parser$getCol)),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace)
		]));
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.a),
			s.b) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $MaybeJustJames$yaml$Yaml$Parser$Util$threeDots = $elm$parser$Parser$symbol('...');
var $MaybeJustJames$yaml$Yaml$Parser$Document$ends = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$MaybeJustJames$yaml$Yaml$Parser$Util$threeDots,
						$elm$parser$Parser$succeed(0)
					]))),
		$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
	$elm$parser$Parser$end);
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $MaybeJustJames$yaml$Yaml$Parser$Ast$Null_ = {$: 6};
var $MaybeJustJames$yaml$Yaml$Parser$Ast$String_ = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$parser$Parser$chompUntilEndOr = $elm$parser$Parser$Advanced$chompUntilEndOr;
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.b, s1.b, s0.a),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $MaybeJustJames$yaml$Yaml$Parser$Util$remaining = $elm$parser$Parser$getChompedString(
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(0),
		$elm$parser$Parser$chompUntilEndOr('\n...\n')));
var $MaybeJustJames$yaml$Yaml$Parser$String$exceptions = function () {
	var dashed = function (s) {
		return '---' + s;
	};
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Null_),
				$elm$parser$Parser$end),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($elm$core$Basics$composeL, $MaybeJustJames$yaml$Yaml$Parser$Ast$String_, dashed)),
					$MaybeJustJames$yaml$Yaml$Parser$Util$threeDashes),
				$MaybeJustJames$yaml$Yaml$Parser$Util$remaining),
				A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Null_),
					$MaybeJustJames$yaml$Yaml$Parser$Util$threeDots),
				$MaybeJustJames$yaml$Yaml$Parser$Util$remaining)
			]));
}();
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{n: col, c: s0.c, o: s0.o, b: offset, bb: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.bb, s.n, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $MaybeJustJames$yaml$Yaml$Parser$refName = A2(
	$elm$parser$Parser$keeper,
	$elm$parser$Parser$succeed($elm$core$Basics$identity),
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompWhile(
			function (c) {
				return !A2(
					$elm$core$List$member,
					c,
					_List_fromArray(
						['\u000D', '\n', ' ', '\t', ',', '[', ']', '{', '}']));
			})));
var $MaybeJustJames$yaml$Yaml$Parser$anchor = function (valParser) {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Anchor_),
				$elm$parser$Parser$symbol('&')),
			A2($elm$parser$Parser$ignorer, $MaybeJustJames$yaml$Yaml$Parser$refName, $MaybeJustJames$yaml$Yaml$Parser$Util$whitespace)),
		A2($elm$parser$Parser$andThen, valParser, $elm$parser$Parser$getCol));
};
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0;
	return function (s0) {
		var _v1 = parse(s0);
		if (_v1.$ === 1) {
			var x = _v1.b;
			return A2($elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _v1.b;
			var s1 = _v1.c;
			return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.b, s.a);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{n: 1, c: s.c, o: s.o, b: s.b + 1, bb: s.bb + 1, a: s.a}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{n: s.n + 1, c: s.c, o: s.o, b: newOffset, bb: s.bb, a: s.a}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $MaybeJustJames$yaml$Yaml$Parser$Util$characters_ = function (isOk) {
	return $elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(0),
			$elm$parser$Parser$chompWhile(isOk)));
};
var $MaybeJustJames$yaml$Yaml$Parser$Util$is = F2(
	function (searched, _char) {
		return _Utils_eq(_char, searched);
	});
var $MaybeJustJames$yaml$Yaml$Parser$Util$isDoubleQuote = $MaybeJustJames$yaml$Yaml$Parser$Util$is('\"');
var $MaybeJustJames$yaml$Yaml$Parser$Util$isSpace = $MaybeJustJames$yaml$Yaml$Parser$Util$is(' ');
var $MaybeJustJames$yaml$Yaml$Parser$Util$spaces = $elm$parser$Parser$chompWhile($MaybeJustJames$yaml$Yaml$Parser$Util$isSpace);
var $MaybeJustJames$yaml$Yaml$Parser$Util$doubleQuotes = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$symbol('\"')),
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$MaybeJustJames$yaml$Yaml$Parser$Util$characters_(
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $MaybeJustJames$yaml$Yaml$Parser$Util$isDoubleQuote)),
			$elm$parser$Parser$symbol('\"')),
		$MaybeJustJames$yaml$Yaml$Parser$Util$spaces));
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $MaybeJustJames$yaml$Yaml$Parser$duplicatedPropertyKeys = function (properties) {
	var keys = A2($elm$core$List$map, $elm$core$Tuple$first, properties);
	var duplicated = A3(
		$elm$core$List$foldr,
		F2(
			function (x, _v0) {
				var obs = _v0.a;
				var dup = _v0.b;
				return A2($elm$core$Set$member, x, obs) ? _Utils_Tuple2(
					obs,
					A2($elm$core$Set$insert, x, dup)) : _Utils_Tuple2(
					A2($elm$core$Set$insert, x, obs),
					dup);
			}),
		_Utils_Tuple2($elm$core$Set$empty, $elm$core$Set$empty),
		keys);
	return $elm$core$Set$toList(duplicated.b);
};
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $MaybeJustJames$yaml$Yaml$Parser$duplicatedPropertyKeysCheck = function (properties) {
	var duplicates = $MaybeJustJames$yaml$Yaml$Parser$duplicatedPropertyKeys(properties);
	return (!$elm$core$List$length(duplicates)) ? $elm$parser$Parser$succeed(properties) : $elm$parser$Parser$problem(
		'Non-unique keys in record: ' + A2($elm$core$String$join, ', ', duplicates));
};
var $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_ = function (a) {
	return {$: 5, a: a};
};
var $MaybeJustJames$yaml$Yaml$Parser$Ast$Float_ = function (a) {
	return {$: 1, a: a};
};
var $MaybeJustJames$yaml$Yaml$Parser$Ast$Int_ = function (a) {
	return {$: 2, a: a};
};
var $elm$core$String$toFloat = _String_toFloat;
var $elm$core$String$trim = _String_trim;
var $MaybeJustJames$yaml$Yaml$Parser$Ast$fromString = function (string) {
	var trimmed = $elm$core$String$trim(string);
	var sign = function () {
		if ($elm$core$String$length(trimmed) > 1) {
			var _v3 = A2($elm$core$String$left, 1, trimmed);
			switch (_v3) {
				case '-':
					return _Utils_Tuple2(
						-1,
						A2($elm$core$String$dropLeft, 1, trimmed));
				case '+':
					return _Utils_Tuple2(
						1,
						A2($elm$core$String$dropLeft, 1, trimmed));
				default:
					return _Utils_Tuple2(1, trimmed);
			}
		} else {
			return _Utils_Tuple2(1, trimmed);
		}
	}();
	switch (sign.b) {
		case '':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Null_;
		case '~':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Null_;
		case 'null':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Null_;
		case 'Null':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Null_;
		case 'NULL':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Null_;
		case 'true':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'True':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'TRUE':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'on':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'On':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'ON':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'y':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'Y':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'yes':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'Yes':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'YES':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(true);
		case 'false':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'False':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'FALSE':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'off':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'Off':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'OFF':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'n':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'N':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'no':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'No':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case 'NO':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Bool_(false);
		case '.nan':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Float_(0 / 0);
		case '.NaN':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Float_(0 / 0);
		case '.NAN':
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Float_(0 / 0);
		case '.inf':
			var mult = sign.a;
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Float_((mult * 1) / 0);
		case '.Inf':
			var mult = sign.a;
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Float_((mult * 1) / 0);
		case '.INF':
			var mult = sign.a;
			return $MaybeJustJames$yaml$Yaml$Parser$Ast$Float_((mult * 1) / 0);
		default:
			var _v1 = $elm$core$String$toInt(trimmed);
			if (!_v1.$) {
				var _int = _v1.a;
				return $MaybeJustJames$yaml$Yaml$Parser$Ast$Int_(_int);
			} else {
				var _v2 = $elm$core$String$toFloat(trimmed);
				if (!_v2.$) {
					var _float = _v2.a;
					return $MaybeJustJames$yaml$Yaml$Parser$Ast$Float_(_float);
				} else {
					return $MaybeJustJames$yaml$Yaml$Parser$Ast$String_(
						$elm$core$String$trim(trimmed));
				}
			}
	}
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $MaybeJustJames$yaml$Yaml$Parser$Util$indented = F2(
	function (indent, next) {
		var check = function (actual) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$andThen,
						function (_v0) {
							return next.R;
						},
						$elm$parser$Parser$end),
						A2(
						$elm$parser$Parser$andThen,
						function (_v1) {
							return next.R;
						},
						$elm$parser$Parser$symbol('\n...\n')),
						_Utils_eq(actual, indent) ? next.S : ((_Utils_cmp(actual, indent) > 0) ? next.T(actual) : next.U)
					]));
		};
		return A2(
			$elm$parser$Parser$andThen,
			check,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
				$elm$parser$Parser$getCol));
	});
var $MaybeJustJames$yaml$Yaml$Parser$Util$isColon = $MaybeJustJames$yaml$Yaml$Parser$Util$is(':');
var $MaybeJustJames$yaml$Yaml$Parser$Util$isListEnd = $MaybeJustJames$yaml$Yaml$Parser$Util$is(']');
var $MaybeJustJames$yaml$Yaml$Parser$Util$isListStart = $MaybeJustJames$yaml$Yaml$Parser$Util$is('[');
var $MaybeJustJames$yaml$Yaml$Parser$Util$isNewLine = $MaybeJustJames$yaml$Yaml$Parser$Util$is('\n');
var $MaybeJustJames$yaml$Yaml$Parser$Util$isRecordEnd = $MaybeJustJames$yaml$Yaml$Parser$Util$is('}');
var $MaybeJustJames$yaml$Yaml$Parser$Util$isRecordStart = $MaybeJustJames$yaml$Yaml$Parser$Util$is('{');
var $MaybeJustJames$yaml$Yaml$Parser$listElementBegin = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			$elm$parser$Parser$symbol('- '),
			$elm$parser$Parser$symbol('-\n')
		]));
var $MaybeJustJames$yaml$Yaml$Parser$Util$isComma = $MaybeJustJames$yaml$Yaml$Parser$Util$is(',');
var $MaybeJustJames$yaml$Yaml$Parser$listInlineOnDone = F2(
	function (elements, element) {
		return $elm$parser$Parser$Done(
			$elm$core$List$reverse(
				A2($elm$core$List$cons, element, elements)));
	});
var $MaybeJustJames$yaml$Yaml$Parser$listInlineOnMore = F2(
	function (elements, element) {
		return $elm$parser$Parser$Loop(
			A2($elm$core$List$cons, element, elements));
	});
var $MaybeJustJames$yaml$Yaml$Parser$listInlineNext = F2(
	function (elements, element) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($MaybeJustJames$yaml$Yaml$Parser$listInlineOnMore, elements, element)),
					$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isComma)),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($MaybeJustJames$yaml$Yaml$Parser$listInlineOnDone, elements, element)),
					$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isListEnd))
				]));
	});
var $MaybeJustJames$yaml$Yaml$Parser$Util$neither = F3(
	function (f1, f2, _char) {
		return (!f1(_char)) && (!f2(_char));
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $MaybeJustJames$yaml$Yaml$Parser$listInlineString = A2(
	$elm$parser$Parser$map,
	A2(
		$elm$core$Basics$composeL,
		$MaybeJustJames$yaml$Yaml$Parser$Ast$fromString,
		A2($elm$core$String$replace, '\\', '\\\\')),
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(0),
			$elm$parser$Parser$chompWhile(
				A2($MaybeJustJames$yaml$Yaml$Parser$Util$neither, $MaybeJustJames$yaml$Yaml$Parser$Util$isComma, $MaybeJustJames$yaml$Yaml$Parser$Util$isListEnd)))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $MaybeJustJames$yaml$Yaml$Parser$Util$characters = function (isOk) {
	var more = F2(
		function (chars, _char) {
			return $elm$parser$Parser$Loop(
				A2($elm$core$List$cons, _char, chars));
		});
	var done = function (chars) {
		return $elm$parser$Parser$Done(
			$elm$core$String$concat(
				$elm$core$List$reverse(chars)));
	};
	var step = function (chars) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						done(chars)),
					$MaybeJustJames$yaml$Yaml$Parser$Util$comment),
					A2(
					$elm$parser$Parser$map,
					more(chars),
					$elm$parser$Parser$getChompedString(
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed(0),
							$elm$parser$Parser$chompIf(isOk)))),
					$elm$parser$Parser$succeed(
					done(chars))
				]));
	};
	return A2($elm$parser$Parser$loop, _List_Nil, step);
};
var $MaybeJustJames$yaml$Yaml$Parser$Util$multilineStep = F2(
	function (indent, lines) {
		var multilineString = function (lines_) {
			return A2(
				$elm$core$String$join,
				' ',
				$elm$core$List$reverse(lines_));
		};
		var conclusion = F2(
			function (line, indent_) {
				return (_Utils_cmp(indent_, indent) > 0) ? $elm$parser$Parser$Loop(
					A2($elm$core$List$cons, line, lines)) : $elm$parser$Parser$Done(
					multilineString(
						A2($elm$core$List$cons, line, lines)));
			});
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed(conclusion),
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$MaybeJustJames$yaml$Yaml$Parser$Util$characters(
									A2($elm$core$Basics$composeL, $elm$core$Basics$not, $MaybeJustJames$yaml$Yaml$Parser$Util$isNewLine)),
								$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isNewLine)),
							$MaybeJustJames$yaml$Yaml$Parser$Util$spaces)),
					$elm$parser$Parser$getCol),
					$elm$parser$Parser$succeed(
					$elm$parser$Parser$Done(
						multilineString(lines)))
				]));
	});
var $MaybeJustJames$yaml$Yaml$Parser$Util$multiline = function (indent) {
	return A2(
		$elm$parser$Parser$loop,
		_List_Nil,
		$MaybeJustJames$yaml$Yaml$Parser$Util$multilineStep(indent));
};
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {aT: index, aX: match, a$: number, bc: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{aM: false, aY: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $MaybeJustJames$yaml$Yaml$Parser$Util$postProcessString = function (str) {
	var regexFromString = A2(
		$elm$core$Basics$composeR,
		$elm$regex$Regex$fromString,
		$elm$core$Maybe$withDefault($elm$regex$Regex$never));
	return A3(
		$elm$regex$Regex$replace,
		regexFromString('\\s\\s+'),
		function (match) {
			return A2($elm$core$String$contains, '\n\n', match.aX) ? '\n' : ' ';
		},
		str);
};
var $MaybeJustJames$yaml$Yaml$Parser$recordInlineOnDone = F2(
	function (elements, element) {
		return $elm$parser$Parser$Done(
			$elm$core$List$reverse(
				A2($elm$core$List$cons, element, elements)));
	});
var $MaybeJustJames$yaml$Yaml$Parser$recordInlineOnMore = F2(
	function (elements, element) {
		return $elm$parser$Parser$Loop(
			A2($elm$core$List$cons, element, elements));
	});
var $MaybeJustJames$yaml$Yaml$Parser$recordInlineNext = F2(
	function (elements, element) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($MaybeJustJames$yaml$Yaml$Parser$recordInlineOnMore, elements, element)),
					$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isComma)),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($MaybeJustJames$yaml$Yaml$Parser$recordInlineOnDone, elements, element)),
					$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isRecordEnd))
				]));
	});
var $MaybeJustJames$yaml$Yaml$Parser$Util$neither3 = F4(
	function (f1, f2, f3, _char) {
		return (!f1(_char)) && ((!f2(_char)) && (!f3(_char)));
	});
var $MaybeJustJames$yaml$Yaml$Parser$recordInlinePropertyNameString = A2(
	$elm$parser$Parser$map,
	$elm$core$String$trim,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(0),
				$elm$parser$Parser$chompWhile(
					A3($MaybeJustJames$yaml$Yaml$Parser$Util$neither3, $MaybeJustJames$yaml$Yaml$Parser$Util$isColon, $MaybeJustJames$yaml$Yaml$Parser$Util$isComma, $MaybeJustJames$yaml$Yaml$Parser$Util$isRecordEnd))),
			$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace)));
var $MaybeJustJames$yaml$Yaml$Parser$Util$isSingleQuote = $MaybeJustJames$yaml$Yaml$Parser$Util$is('\'');
var $MaybeJustJames$yaml$Yaml$Parser$Util$singleQuotes = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(
			A2($elm$core$String$replace, '\\', '\\\\')),
		$elm$parser$Parser$symbol('\'')),
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$MaybeJustJames$yaml$Yaml$Parser$Util$characters_(
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $MaybeJustJames$yaml$Yaml$Parser$Util$isSingleQuote)),
			$elm$parser$Parser$symbol('\'')),
		$MaybeJustJames$yaml$Yaml$Parser$Util$spaces));
var $MaybeJustJames$yaml$Yaml$Parser$recordInlinePropertyName = A2(
	$elm$parser$Parser$keeper,
	$elm$parser$Parser$succeed($elm$core$Basics$identity),
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[$MaybeJustJames$yaml$Yaml$Parser$Util$singleQuotes, $MaybeJustJames$yaml$Yaml$Parser$Util$doubleQuotes, $MaybeJustJames$yaml$Yaml$Parser$recordInlinePropertyNameString])),
				$elm$parser$Parser$chompWhile($MaybeJustJames$yaml$Yaml$Parser$Util$isSpace)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isColon),
						$elm$parser$Parser$problem('I was parsing an inline record, when I ran into an invalid property. It is missing the \":\"!')
					]))),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isNewLine),
					$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isSpace),
					$elm$parser$Parser$problem('I was parsing an inline record, but missing a space or a new line between the \":\" and the value!')
				]))));
var $MaybeJustJames$yaml$Yaml$Parser$recordInlineString = A2(
	$elm$parser$Parser$map,
	$MaybeJustJames$yaml$Yaml$Parser$Ast$fromString,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(0),
			$elm$parser$Parser$chompWhile(
				A2($MaybeJustJames$yaml$Yaml$Parser$Util$neither, $MaybeJustJames$yaml$Yaml$Parser$Util$isComma, $MaybeJustJames$yaml$Yaml$Parser$Util$isRecordEnd)))));
var $MaybeJustJames$yaml$Yaml$Parser$Ast$Alias_ = function (a) {
	return {$: 8, a: a};
};
var $MaybeJustJames$yaml$Yaml$Parser$reference = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Alias_),
		$elm$parser$Parser$symbol('*')),
	$MaybeJustJames$yaml$Yaml$Parser$refName);
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $MaybeJustJames$yaml$Yaml$Parser$list = function (indent) {
	var confirmed = function (value_) {
		return A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$List_),
			A2(
				$elm$parser$Parser$loop,
				_List_fromArray(
					[value_]),
				$MaybeJustJames$yaml$Yaml$Parser$listStep(indent)));
	};
	return A2(
		$elm$parser$Parser$andThen,
		confirmed,
		$MaybeJustJames$yaml$Yaml$Parser$listElement(indent));
};
var $MaybeJustJames$yaml$Yaml$Parser$listElement = function (indent) {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$MaybeJustJames$yaml$Yaml$Parser$listElementBegin),
		$MaybeJustJames$yaml$Yaml$Parser$listElementValue(indent));
};
var $MaybeJustJames$yaml$Yaml$Parser$listElementValue = function (indent) {
	var elVal = function (indent_) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$MaybeJustJames$yaml$Yaml$Parser$cyclic$listInline(),
					$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInline(),
					$MaybeJustJames$yaml$Yaml$Parser$list(indent_),
					A2($MaybeJustJames$yaml$Yaml$Parser$recordOrString, indent, indent_)
				]));
	};
	return A2(
		$MaybeJustJames$yaml$Yaml$Parser$Util$indented,
		indent,
		{
			R: $elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Null_),
			S: $elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Null_),
			T: function (indent_) {
				return $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$MaybeJustJames$yaml$Yaml$Parser$anchor(elVal),
							$MaybeJustJames$yaml$Yaml$Parser$reference,
							elVal(indent_)
						]));
			},
			U: $elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Null_)
		});
};
var $MaybeJustJames$yaml$Yaml$Parser$listInlineStep = function (elements) {
	return A2(
		$elm$parser$Parser$andThen,
		$MaybeJustJames$yaml$Yaml$Parser$listInlineNext(elements),
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
			A2(
				$elm$parser$Parser$ignorer,
				$MaybeJustJames$yaml$Yaml$Parser$cyclic$listInlineValue(),
				$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace)));
};
var $MaybeJustJames$yaml$Yaml$Parser$listStep = F2(
	function (indent, values) {
		var next = function (value_) {
			return $elm$parser$Parser$Loop(
				A2($elm$core$List$cons, value_, values));
		};
		var finish = $elm$parser$Parser$Done(
			$elm$core$List$reverse(values));
		return A2(
			$MaybeJustJames$yaml$Yaml$Parser$Util$indented,
			indent,
			{
				R: $elm$parser$Parser$succeed(finish),
				S: $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(next),
							$MaybeJustJames$yaml$Yaml$Parser$listElement(indent)),
							$elm$parser$Parser$succeed(finish)
						])),
				T: function (_v1) {
					return $elm$parser$Parser$problem('I was looking for the next element but didn\'t find one.');
				},
				U: $elm$parser$Parser$succeed(finish)
			});
	});
var $MaybeJustJames$yaml$Yaml$Parser$quotedString = function (indent) {
	var withQuote = function (quote) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2($MaybeJustJames$yaml$Yaml$Parser$recordProperty, indent, quote),
					$elm$parser$Parser$succeed(
					$MaybeJustJames$yaml$Yaml$Parser$Ast$String_(
						$MaybeJustJames$yaml$Yaml$Parser$Util$postProcessString(quote)))
				]));
	};
	return A2(
		$elm$parser$Parser$andThen,
		withQuote,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[$MaybeJustJames$yaml$Yaml$Parser$Util$singleQuotes, $MaybeJustJames$yaml$Yaml$Parser$Util$doubleQuotes])),
				$MaybeJustJames$yaml$Yaml$Parser$Util$spaces)));
};
var $MaybeJustJames$yaml$Yaml$Parser$record = F2(
	function (indent, property) {
		var confirmed = function (value_) {
			return A2(
				$elm$parser$Parser$map,
				A2($elm$core$Basics$composeL, $MaybeJustJames$yaml$Yaml$Parser$Ast$Record_, $elm$core$Dict$fromList),
				A2(
					$elm$parser$Parser$andThen,
					$MaybeJustJames$yaml$Yaml$Parser$duplicatedPropertyKeysCheck,
					A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						A2(
							$elm$parser$Parser$loop,
							_List_fromArray(
								[
									_Utils_Tuple2(property, value_)
								]),
							$MaybeJustJames$yaml$Yaml$Parser$recordStep(indent)))));
		};
		return A2(
			$elm$parser$Parser$andThen,
			confirmed,
			$MaybeJustJames$yaml$Yaml$Parser$recordElementValue(indent));
	});
var $MaybeJustJames$yaml$Yaml$Parser$recordElement = function (indent) {
	var property = $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$MaybeJustJames$yaml$Yaml$Parser$Util$singleQuotes,
				$MaybeJustJames$yaml$Yaml$Parser$Util$doubleQuotes,
				$elm$parser$Parser$getChompedString(
				$elm$parser$Parser$chompWhile(
					A2($MaybeJustJames$yaml$Yaml$Parser$Util$neither, $MaybeJustJames$yaml$Yaml$Parser$Util$isColon, $MaybeJustJames$yaml$Yaml$Parser$Util$isNewLine)))
			]));
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm$core$Tuple$pair),
			A2(
				$elm$parser$Parser$ignorer,
				A2($elm$parser$Parser$ignorer, property, $MaybeJustJames$yaml$Yaml$Parser$Util$spaces),
				$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isColon))),
		$MaybeJustJames$yaml$Yaml$Parser$recordElementValue(indent));
};
var $MaybeJustJames$yaml$Yaml$Parser$recordElementValue = function (indent) {
	var elVal = function (indent_) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$MaybeJustJames$yaml$Yaml$Parser$cyclic$listInline(),
					$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInline(),
					$MaybeJustJames$yaml$Yaml$Parser$list(indent_),
					A2($MaybeJustJames$yaml$Yaml$Parser$recordOrString, indent, indent_)
				]));
	};
	return A2(
		$MaybeJustJames$yaml$Yaml$Parser$Util$indented,
		indent,
		{
			R: $elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Null_),
			S: $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$MaybeJustJames$yaml$Yaml$Parser$list(indent),
						$elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Null_)
					])),
			T: function (indent_) {
				return $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$MaybeJustJames$yaml$Yaml$Parser$anchor(elVal),
							$MaybeJustJames$yaml$Yaml$Parser$reference,
							elVal(indent_)
						]));
			},
			U: $elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$Null_)
		});
};
var $MaybeJustJames$yaml$Yaml$Parser$recordInlineStep = function (elements) {
	return A2(
		$elm$parser$Parser$andThen,
		$MaybeJustJames$yaml$Yaml$Parser$recordInlineNext(elements),
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
			A2(
				$elm$parser$Parser$ignorer,
				$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlineValue(),
				$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace)));
};
var $MaybeJustJames$yaml$Yaml$Parser$recordOrString = F2(
	function (indent, indent_) {
		var removeComment = function (string) {
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$elm$core$List$head(
					A2($elm$core$String$split, '#', string)));
		};
		var addRemaining = F2(
			function (string, remaining) {
				return $MaybeJustJames$yaml$Yaml$Parser$Ast$fromString(
					$MaybeJustJames$yaml$Yaml$Parser$Util$postProcessString(
						_Utils_ap(
							removeComment(string),
							remaining)));
			});
		var withString = function (string) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(
							$MaybeJustJames$yaml$Yaml$Parser$Ast$fromString(string)),
						$elm$parser$Parser$end),
						A2($MaybeJustJames$yaml$Yaml$Parser$recordProperty, indent_, string),
						A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed(
							addRemaining(string)),
						(!indent) ? $MaybeJustJames$yaml$Yaml$Parser$Util$remaining : $MaybeJustJames$yaml$Yaml$Parser$Util$multiline(indent))
					]));
		};
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$MaybeJustJames$yaml$Yaml$Parser$quotedString(indent_),
					A2(
					$elm$parser$Parser$andThen,
					withString,
					$elm$parser$Parser$getChompedString(
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($elm$core$Basics$identity),
								$elm$parser$Parser$chompIf(
									A2($MaybeJustJames$yaml$Yaml$Parser$Util$neither, $MaybeJustJames$yaml$Yaml$Parser$Util$isColon, $MaybeJustJames$yaml$Yaml$Parser$Util$isNewLine))),
							$elm$parser$Parser$chompWhile(
								A2($MaybeJustJames$yaml$Yaml$Parser$Util$neither, $MaybeJustJames$yaml$Yaml$Parser$Util$isColon, $MaybeJustJames$yaml$Yaml$Parser$Util$isNewLine))))),
					A2(
					$elm$parser$Parser$andThen,
					withString,
					$elm$parser$Parser$getChompedString(
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$core$Basics$identity),
							$elm$parser$Parser$chompWhile($MaybeJustJames$yaml$Yaml$Parser$Util$isColon))))
				]));
	});
var $MaybeJustJames$yaml$Yaml$Parser$recordProperty = F2(
	function (indent, name) {
		return A2(
			$elm$parser$Parser$andThen,
			$elm$core$Basics$identity,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(
					A2($MaybeJustJames$yaml$Yaml$Parser$record, indent, name)),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$elm$parser$Parser$token(': '),
							$elm$parser$Parser$token(':\n'),
							A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$backtrackable(
								$elm$parser$Parser$token(':')),
							$elm$parser$Parser$end)
						]))));
	});
var $MaybeJustJames$yaml$Yaml$Parser$recordStep = F2(
	function (indent, values) {
		var next = function (value_) {
			return $elm$parser$Parser$Loop(
				A2($elm$core$List$cons, value_, values));
		};
		var finish = $elm$parser$Parser$Done(
			$elm$core$List$reverse(values));
		return A2(
			$MaybeJustJames$yaml$Yaml$Parser$Util$indented,
			indent,
			{
				R: $elm$parser$Parser$succeed(finish),
				S: A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(next),
					$MaybeJustJames$yaml$Yaml$Parser$recordElement(indent)),
				T: function (_v0) {
					return $elm$parser$Parser$problem('I was looking for the next property but didn\'t find one.');
				},
				U: $elm$parser$Parser$succeed(finish)
			});
	});
function $MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlineValue() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm$core$Tuple$pair),
			A2($elm$parser$Parser$ignorer, $MaybeJustJames$yaml$Yaml$Parser$recordInlinePropertyName, $MaybeJustJames$yaml$Yaml$Parser$Util$whitespace)),
		$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlinePropertyValue());
}
function $MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlinePropertyValue() {
	var propVal = $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$MaybeJustJames$yaml$Yaml$Parser$cyclic$listInline(),
				$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInline(),
				$MaybeJustJames$yaml$Yaml$Parser$recordInlineString
			]));
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$MaybeJustJames$yaml$Yaml$Parser$anchor(
				$elm$core$Basics$always(propVal)),
				$MaybeJustJames$yaml$Yaml$Parser$reference,
				propVal
			]));
}
function $MaybeJustJames$yaml$Yaml$Parser$cyclic$listInlineValue() {
	var inlineVal = $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$MaybeJustJames$yaml$Yaml$Parser$cyclic$listInline(),
				$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInline(),
				$MaybeJustJames$yaml$Yaml$Parser$quotedString(0),
				$MaybeJustJames$yaml$Yaml$Parser$listInlineString
			]));
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$MaybeJustJames$yaml$Yaml$Parser$anchor(
				$elm$core$Basics$always(inlineVal)),
				$MaybeJustJames$yaml$Yaml$Parser$reference,
				inlineVal
			]));
}
function $MaybeJustJames$yaml$Yaml$Parser$cyclic$listInline() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($MaybeJustJames$yaml$Yaml$Parser$Ast$List_),
				$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isListStart)),
			$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
		$MaybeJustJames$yaml$Yaml$Parser$cyclic$listInlineStepOne());
}
function $MaybeJustJames$yaml$Yaml$Parser$cyclic$listInlineStepOne() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(_List_Nil),
				$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isListEnd)),
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				A2($elm$parser$Parser$loop, _List_Nil, $MaybeJustJames$yaml$Yaml$Parser$listInlineStep))
			]));
}
function $MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInline() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(
					A2($elm$core$Basics$composeL, $MaybeJustJames$yaml$Yaml$Parser$Ast$Record_, $elm$core$Dict$fromList)),
				$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isRecordStart)),
			$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
		$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlineStepOne());
}
function $MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlineStepOne() {
	return A2(
		$elm$parser$Parser$andThen,
		$MaybeJustJames$yaml$Yaml$Parser$duplicatedPropertyKeysCheck,
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(_List_Nil),
					$elm$parser$Parser$chompIf($MaybeJustJames$yaml$Yaml$Parser$Util$isRecordEnd)),
					A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					A2($elm$parser$Parser$loop, _List_Nil, $MaybeJustJames$yaml$Yaml$Parser$recordInlineStep))
				])));
}
var $MaybeJustJames$yaml$Yaml$Parser$recordInlineValue = $MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlineValue();
$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlineValue = function () {
	return $MaybeJustJames$yaml$Yaml$Parser$recordInlineValue;
};
var $MaybeJustJames$yaml$Yaml$Parser$recordInlinePropertyValue = $MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlinePropertyValue();
$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlinePropertyValue = function () {
	return $MaybeJustJames$yaml$Yaml$Parser$recordInlinePropertyValue;
};
var $MaybeJustJames$yaml$Yaml$Parser$listInlineValue = $MaybeJustJames$yaml$Yaml$Parser$cyclic$listInlineValue();
$MaybeJustJames$yaml$Yaml$Parser$cyclic$listInlineValue = function () {
	return $MaybeJustJames$yaml$Yaml$Parser$listInlineValue;
};
var $MaybeJustJames$yaml$Yaml$Parser$listInline = $MaybeJustJames$yaml$Yaml$Parser$cyclic$listInline();
$MaybeJustJames$yaml$Yaml$Parser$cyclic$listInline = function () {
	return $MaybeJustJames$yaml$Yaml$Parser$listInline;
};
var $MaybeJustJames$yaml$Yaml$Parser$listInlineStepOne = $MaybeJustJames$yaml$Yaml$Parser$cyclic$listInlineStepOne();
$MaybeJustJames$yaml$Yaml$Parser$cyclic$listInlineStepOne = function () {
	return $MaybeJustJames$yaml$Yaml$Parser$listInlineStepOne;
};
var $MaybeJustJames$yaml$Yaml$Parser$recordInline = $MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInline();
$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInline = function () {
	return $MaybeJustJames$yaml$Yaml$Parser$recordInline;
};
var $MaybeJustJames$yaml$Yaml$Parser$recordInlineStepOne = $MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlineStepOne();
$MaybeJustJames$yaml$Yaml$Parser$cyclic$recordInlineStepOne = function () {
	return $MaybeJustJames$yaml$Yaml$Parser$recordInlineStepOne;
};
var $MaybeJustJames$yaml$Yaml$Parser$value = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			$MaybeJustJames$yaml$Yaml$Parser$String$exceptions,
			$MaybeJustJames$yaml$Yaml$Parser$recordInline,
			$MaybeJustJames$yaml$Yaml$Parser$listInline,
			A2($elm$parser$Parser$andThen, $MaybeJustJames$yaml$Yaml$Parser$list, $elm$parser$Parser$getCol),
			A2(
			$elm$parser$Parser$andThen,
			$MaybeJustJames$yaml$Yaml$Parser$recordOrString(0),
			$elm$parser$Parser$getCol)
		]));
var $MaybeJustJames$yaml$Yaml$Parser$parser = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$MaybeJustJames$yaml$Yaml$Parser$Document$begins),
		$MaybeJustJames$yaml$Yaml$Parser$Util$whitespace),
	A2($elm$parser$Parser$ignorer, $MaybeJustJames$yaml$Yaml$Parser$value, $MaybeJustJames$yaml$Yaml$Parser$Document$ends));
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {n: col, a5: problem, bb: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.bb, p.n, p.a5);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{n: 1, c: _List_Nil, o: 1, b: 0, bb: 1, a: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $MaybeJustJames$yaml$Yaml$Parser$fromString = A2(
	$elm$core$Basics$composeR,
	$elm$parser$Parser$run($MaybeJustJames$yaml$Yaml$Parser$parser),
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Result$mapError($MaybeJustJames$yaml$Yaml$Parser$deadEndsToString),
		$elm$core$Result$map($MaybeJustJames$yaml$Yaml$Parser$deref)));
var $MaybeJustJames$yaml$Yaml$Decode$fromString = F2(
	function (decoder, raw) {
		var _v0 = $MaybeJustJames$yaml$Yaml$Parser$fromString(raw);
		if (!_v0.$) {
			var v = _v0.a;
			return A2($MaybeJustJames$yaml$Yaml$Decode$fromValue, decoder, v);
		} else {
			var error = _v0.a;
			return $elm$core$Result$Err(
				$MaybeJustJames$yaml$Yaml$Decode$Parsing(error));
		}
	});
var $MaybeJustJames$yaml$Yaml$Decode$singleResult = function () {
	var each = F2(
		function (v, r) {
			if (r.$ === 1) {
				return r;
			} else {
				var vs = r.a;
				if (!v.$) {
					var vok = v.a;
					return $elm$core$Result$Ok(
						A2($elm$core$List$cons, vok, vs));
				} else {
					var err = v.a;
					return $elm$core$Result$Err(err);
				}
			}
		});
	return A2(
		$elm$core$Basics$composeR,
		A2(
			$elm$core$List$foldl,
			each,
			$elm$core$Result$Ok(_List_Nil)),
		$elm$core$Result$map($elm$core$List$reverse));
}();
var $MaybeJustJames$yaml$Yaml$Decode$list = function (decoder) {
	return function (v) {
		switch (v.$) {
			case 3:
				var list_ = v.a;
				return $MaybeJustJames$yaml$Yaml$Decode$singleResult(
					A2(
						$elm$core$List$map,
						$MaybeJustJames$yaml$Yaml$Decode$fromValue(decoder),
						list_));
			case 6:
				return $elm$core$Result$Ok(_List_Nil);
			default:
				return A2($MaybeJustJames$yaml$Yaml$Decode$decodeError, 'list', v);
		}
	};
};
var $author$project$Data$decodeReadingList = $MaybeJustJames$yaml$Yaml$Decode$fromString(
	$MaybeJustJames$yaml$Yaml$Decode$list($author$project$Data$decoder));
var $author$project$Data$reading = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			2023,
			_List_fromArray(
				[
					_Utils_Tuple2('the fall of babel', 'josiah bancroft'),
					_Utils_Tuple2('the hod king', 'josiah bancroft'),
					_Utils_Tuple2('the ministry for the future', 'kim stanley robinson'),
					_Utils_Tuple2('rainwater harvesting for drylands and beyond vol. 1', 'brad lancaster'),
					_Utils_Tuple2('mating', 'norman rush'),
					_Utils_Tuple2('whites', 'norman rush'),
					_Utils_Tuple2('the pillowman', 'martin mcdonagh'),
					_Utils_Tuple2('the twilight world', 'werner herzog')
				])),
			_Utils_Tuple2(
			2022,
			_List_fromArray(
				[
					_Utils_Tuple2('pure colour', 'sheila heti'),
					_Utils_Tuple2('blood meridian', 'cormac mccarthy'),
					_Utils_Tuple2('moon witch, spider king', 'marlon james'),
					_Utils_Tuple2('convenience store woman', 'sayaka murata'),
					_Utils_Tuple2('black leopard, red wolf', 'marlon james'),
					_Utils_Tuple2('on earth we\'re briefly gorgeous', 'ocean vuong'),
					_Utils_Tuple2('waking up in the sea', 'derek dunfee'),
					_Utils_Tuple2('vintage sadness', 'hanif willis abduraqib'),
					_Utils_Tuple2('cold spring harbor', 'richard yates')
				])),
			_Utils_Tuple2(
			2021,
			_List_fromArray(
				[
					_Utils_Tuple2('we die in italy', 'sarah jean alexander'),
					_Utils_Tuple2('even two hands pressed together are split', 'sarah o\'neal'),
					_Utils_Tuple2('rock wagram', 'william saroyan'),
					_Utils_Tuple2('the dead do not improve', 'jay caspian kang'),
					_Utils_Tuple2('cats cradle', 'kurt vonnegut'),
					_Utils_Tuple2('masters of atlantis', 'charles portis'),
					_Utils_Tuple2('true grit', 'charles portis'),
					_Utils_Tuple2('norwood', 'charles portis'),
					_Utils_Tuple2('the art of raising a puppy', 'the monks of new skete'),
					_Utils_Tuple2('gringos', 'charles portis'),
					_Utils_Tuple2('returning the sword to the stone', 'mark leidner'),
					_Utils_Tuple2('barbarian days: a surfing life', 'william finnegan'),
					_Utils_Tuple2('kook', 'peter heller')
				])),
			_Utils_Tuple2(
			2020,
			_List_fromArray(
				[
					_Utils_Tuple2('the lying lives of adults', 'elena ferrante'),
					_Utils_Tuple2('the martian', 'andy weir'),
					_Utils_Tuple2('meyer', 'stephen dixon'),
					_Utils_Tuple2('call me by your name', 'andré aciman'),
					_Utils_Tuple2('gould', 'stephen dixon'),
					_Utils_Tuple2('fake accounts (galley)', 'lauren oyler'),
					_Utils_Tuple2('arkansas', 'john brandon'),
					_Utils_Tuple2('beauty was the case that they gave me (reread)', 'mark leidner'),
					_Utils_Tuple2('100 poems from the chinese', 'kenneth rexroth'),
					_Utils_Tuple2('leave society (second draft)', 'tao lin'),
					_Utils_Tuple2('king of a hundred horsemen', 'marie etienne'),
					_Utils_Tuple2('like life', 'lorrie moore'),
					_Utils_Tuple2('microaggressions', 'erik stinson'),
					_Utils_Tuple2('alien abduction', 'lewis warsh'),
					_Utils_Tuple2('$50,000', 'andrew weatherhead'),
					_Utils_Tuple2('poker', 'tomaž šalamun'),
					_Utils_Tuple2('actual air (reread)', 'david berman'),
					_Utils_Tuple2('franny and zooey', 'jd salinger'),
					_Utils_Tuple2('some trick', 'helen dewitt'),
					_Utils_Tuple2('dog of the south', 'charles portis'),
					_Utils_Tuple2('my struggle: book 1', 'karl ove knausgård'),
					_Utils_Tuple2('trout fishing in america', 'richard brautigan'),
					_Utils_Tuple2('the lunatic', 'charles simic'),
					_Utils_Tuple2('remainder', 'tom mccarthy'),
					_Utils_Tuple2('days', 'mary robison'),
					_Utils_Tuple2('77 dream songs', 'john berryman'),
					_Utils_Tuple2('preliminary materials for a theory of the young-girl', 'tiqqun'),
					_Utils_Tuple2('hamburger in the archive', 'jen calleja'),
					_Utils_Tuple2('footballers who rhyme', 'audun mortensen'),
					_Utils_Tuple2('i love my job', 'sam weselowski'),
					_Utils_Tuple2('into longing vast rose', 'mai ivfjäll'),
					_Utils_Tuple2('time and materials', 'robert hass'),
					_Utils_Tuple2('poet in new york', 'federico garcía lorca'),
					_Utils_Tuple2('the woodlands', 'cate peebles'),
					_Utils_Tuple2('who is rich', 'matthew klam'),
					_Utils_Tuple2('sam the cat and other stories', 'matthew klam'),
					_Utils_Tuple2('the lichtenberg figures', 'ben lerner'),
					_Utils_Tuple2('normal people', 'sally rooney'),
					_Utils_Tuple2('the topeka school', 'ben lerner')
				])),
			_Utils_Tuple2(
			2019,
			_List_fromArray(
				[
					_Utils_Tuple2('there must be some mistake', 'frederick barthelme'),
					_Utils_Tuple2('waveland', 'frederick barthelme'),
					_Utils_Tuple2('elroy nights', 'frederick barthelme'),
					_Utils_Tuple2('catching the big fish', 'david lynch'),
					_Utils_Tuple2('why did i ever', 'mary robison'),
					_Utils_Tuple2('revolutionary road', 'richard yates'),
					_Utils_Tuple2('lightning rods', 'helen dewitt'),
					_Utils_Tuple2('painted desert', 'frederick barthelme'),
					_Utils_Tuple2('fathers day', 'matthew zapruder'),
					_Utils_Tuple2('rabbit redux', 'john updike'),
					_Utils_Tuple2('was this man a genius? talks with andy kaufman', 'julie hecht'),
					_Utils_Tuple2('the brothers', 'frederick barthelme'),
					_Utils_Tuple2('the poems of alfred starr hamilton', 'alfred starr hamilton'),
					_Utils_Tuple2('the last samurai', 'helen dewitt'),
					_Utils_Tuple2('natural selection', 'frederick barthelme'),
					_Utils_Tuple2('conversations with friends', 'sally rooney'),
					_Utils_Tuple2('temple of the golden pavilion', 'yukio mishima'),
					_Utils_Tuple2('tom sawyer', 'joey grantham'),
					_Utils_Tuple2('magical negro', 'morgan parker'),
					_Utils_Tuple2('there are more beautiful things than beyoncé', 'morgan parker'),
					_Utils_Tuple2('woods and clouds interchangeable', 'michael earl craig'),
					_Utils_Tuple2('chroma', 'frederick barthelme'),
					_Utils_Tuple2('the secret history', 'donna tartt'),
					_Utils_Tuple2('an amateur\'s guide to the night', 'mary robison'),
					_Utils_Tuple2('tracer', 'frederick barthelme'),
					_Utils_Tuple2('second marriage', 'frederick barthelme'),
					_Utils_Tuple2('the ghost soldiers', 'james tate'),
					_Utils_Tuple2('wittgenstein\'s mistress', 'david markson'),
					_Utils_Tuple2('death\'s end', 'liu cixin'),
					_Utils_Tuple2('arm of the sphinx', 'josiah bancroft'),
					_Utils_Tuple2('senlin ascends', 'josiah bancroft'),
					_Utils_Tuple2('the new old paint', 'susie timmons'),
					_Utils_Tuple2('the lost pilot', 'james tate'),
					_Utils_Tuple2('locked from the outside', 'susie timmons'),
					_Utils_Tuple2('starship troopers', 'robert a heinlein'),
					_Utils_Tuple2('joy of missing out', 'ana bozicevic'),
					_Utils_Tuple2('24 pages and other poems', 'lisa fishman'),
					_Utils_Tuple2('hog wild', 'susie timmons'),
					_Utils_Tuple2('dungeon world', 'sage latorra and adam koebel'),
					_Utils_Tuple2('autobiography of death', 'kim hyesoon'),
					_Utils_Tuple2('touché', 'rod smith'),
					_Utils_Tuple2('a roll of the dice will never abolish chance', 'stéphane mallarmé'),
					_Utils_Tuple2('spring and all', 'william carlos williams'),
					_Utils_Tuple2('childhood\'s end', 'arthur c clarke'),
					_Utils_Tuple2('happy trails to you', 'julie hecht'),
					_Utils_Tuple2('the unprofessionals', 'julie hecht'),
					_Utils_Tuple2('moon deluxe', 'frederick barthelme'),
					_Utils_Tuple2('& the real stormy daniels band', 'rebecca r. peel'),
					_Utils_Tuple2('the days of abandonment', 'elena ferrante'),
					_Utils_Tuple2('do the windows open', 'julie hecht')
				])),
			_Utils_Tuple2(
			2018,
			_List_fromArray(
				[
					_Utils_Tuple2('rabbit, run', 'john updike'),
					_Utils_Tuple2('liveblog (didnt finish)', 'megan boyle'),
					_Utils_Tuple2('reveries of a solitary walker', 'jean-jacques rousseau'),
					_Utils_Tuple2('sometimes a great notion', 'ken kesey'),
					_Utils_Tuple2('reasons to live', 'amy hempel'),
					_Utils_Tuple2('the contemporary short story packet', 'ed. tao lin for course at sarah lawrence'),
					_Utils_Tuple2('i love dick', 'chris kraus'),
					_Utils_Tuple2('harry potter and the sorcerer\'s stone', 'jk rowling'),
					_Utils_Tuple2('the dark forest', 'liu cixin'),
					_Utils_Tuple2('the three-body problem', 'liu cixin'),
					_Utils_Tuple2('at the gates of the animal kingdom', 'amy hempel'),
					_Utils_Tuple2('wapshot scandal', 'donald cheever'),
					_Utils_Tuple2('the passion according to g.h.', 'clarice lispector'),
					_Utils_Tuple2('reasons to live', 'amy hempel'),
					_Utils_Tuple2('bob the gambler', 'frederick barthelme'),
					_Utils_Tuple2('in the belly of the beast', 'jack abbot'),
					_Utils_Tuple2('journals', 'paul blackburn'),
					_Utils_Tuple2('jesus\' son', 'dennis johnson'),
					_Utils_Tuple2('(american short story anthology i don\'t remember the name of, read about a third, anne beattie bio inaccurately described falling in place as a short story collection)', 'unsure'),
					_Utils_Tuple2('subtraction', 'mary robison'),
					_Utils_Tuple2('the quick and the dead', 'joy williams'),
					_Utils_Tuple2('oh!', 'mary robison'),
					_Utils_Tuple2('the cows', 'lydia davis'),
					_Utils_Tuple2('life is with people (drawings)', 'atticus lish'),
					_Utils_Tuple2('dubliners', 'james joyce'),
					_Utils_Tuple2('i await the devil\'s coming', 'mary maclane'),
					_Utils_Tuple2('two against one', 'frederick barthelme'),
					_Utils_Tuple2('a streetcar named desire', 'tennessee williams'),
					_Utils_Tuple2('breaking open the head', 'daniel pinchbeck'),
					_Utils_Tuple2('three talks', 'joshua beckman'),
					_Utils_Tuple2('the lives of the poems', 'joshua beckman'),
					_Utils_Tuple2('ii cybernetic frontiers', 'stewart brand'),
					_Utils_Tuple2('the others', 'matthew rohrer'),
					_Utils_Tuple2('motherhood', 'sheila heti'),
					_Utils_Tuple2('the homesick diner', 'anne tyler'),
					_Utils_Tuple2('ties', 'domenico starnone'),
					_Utils_Tuple2('fuck seth price', 'seth price'),
					_Utils_Tuple2('the bell jar', 'sylvia plath'),
					_Utils_Tuple2('tell me a riddle', 'tillie olsen'),
					_Utils_Tuple2('chilly scenes of winter', 'ann beattie'),
					_Utils_Tuple2('trip (galley)', 'tao lin'),
					_Utils_Tuple2('god box', 'mallory whitten'),
					_Utils_Tuple2('milk and henny', 'peter bd'),
					_Utils_Tuple2('the wapshot chronicle', 'john cheever'),
					_Utils_Tuple2('todd', 'andrew james weatherhead'),
					_Utils_Tuple2('thin kimono', 'michael earl craig'),
					_Utils_Tuple2('talkativeness', 'michael earl craig'),
					_Utils_Tuple2('the girls', 'emma cline'),
					_Utils_Tuple2('i would do anything for love', 'al bedell'),
					_Utils_Tuple2('true hallucinations', 'terence mckenna')
				])),
			_Utils_Tuple2(
			2017,
			_List_fromArray(
				[
					_Utils_Tuple2('the invisible landscape (didn\'t finish)', 'terence mckenna'),
					_Utils_Tuple2('the old man and the sea', 'ernest hemingway'),
					_Utils_Tuple2('northern california haiku', 'mallory whitten'),
					_Utils_Tuple2('the psychedelic explorer\'s guide', 'james fadiman'),
					_Utils_Tuple2('play it as it lays', 'joan didion'),
					_Utils_Tuple2('a sleep and a forgetting', 'william dean howell'),
					_Utils_Tuple2('falling in place', 'ann beattie'),
					_Utils_Tuple2('do androids dream of electric sheep', 'philip k dick'),
					_Utils_Tuple2('taipei  (re-read)', 'tao lin'),
					_Utils_Tuple2('junky', 'william burroughs'),
					_Utils_Tuple2('eileen', 'otessa moshfegh'),
					_Utils_Tuple2('thanks', 'zachary german'),
					_Utils_Tuple2('you got to burn to shine', 'john giorno'),
					_Utils_Tuple2('new yorker stories (didnt finish)', 'ann beattie'),
					_Utils_Tuple2('honored guest (didnt finish)', 'joy williams'),
					_Utils_Tuple2('jesus\' son (didnt finish)', 'denis johnson'),
					_Utils_Tuple2('the contemporary short story packet (didnt finish)', 'ed. tao lin'),
					_Utils_Tuple2('homesick for another planet', 'otessa moshfegh'),
					_Utils_Tuple2('elbowing the seducer', 't. gertler'),
					_Utils_Tuple2('literally show me a healthy person', 'darcie wilder'),
					_Utils_Tuple2('falconer', 'john cheever'),
					_Utils_Tuple2('ajebota', 'precious okoyomon'),
					_Utils_Tuple2('a little life (didnt finish)', 'hanya yanagihara'),
					_Utils_Tuple2('[assorted zines]', 'rebecca warlick'),
					_Utils_Tuple2('junky II', 'peter bd'),
					_Utils_Tuple2('the story of the lost child', 'elena ferrante'),
					_Utils_Tuple2('those who leave and those who stay', 'elena ferrante'),
					_Utils_Tuple2('cool girls hate their bodies', 'david fishkind'),
					_Utils_Tuple2('the story of a new name', 'elena ferrante'),
					_Utils_Tuple2('o.k. (didnt finish)', 'kool a.d.'),
					_Utils_Tuple2('memory foam', 'adam soldofsky'),
					_Utils_Tuple2('loving the ocean wont keep it from killing you', 'rachel bell'),
					_Utils_Tuple2('my brilliant friend', 'elena ferrante'),
					_Utils_Tuple2('the big u', 'neal stephenson')
				]))
		]));
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Data$mkReadingList = function (ymlString) {
	var list = A2(
		$elm$core$Result$withDefault,
		_List_Nil,
		$author$project$Data$decodeReadingList(ymlString));
	var addEntryToList = F2(
		function (book, acc) {
			return A3(
				$elm$core$Dict$update,
				book.aJ,
				function (entries) {
					return $elm$core$Maybe$Just(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(book.m, book.ad),
							A2($elm$core$Maybe$withDefault, _List_Nil, entries)));
				},
				acc);
		});
	var readingList = A3($elm$core$List$foldr, addEntryToList, $author$project$Data$reading, list);
	return readingList;
};
var $author$project$Data$poetry = _List_fromArray(
	[
		_Utils_Tuple2('http://muumuuhouse.com/wp.07jun2021.html', 'Three Poems From L-Theanine (muumuu house)'),
		_Utils_Tuple2('http://thenervousbreakdown.com/willisplummer/2020/10/three-poems-from-mons-pubis/', 'Three Poems From MONS PUBIS (The Nervous Breakdown)'),
		_Utils_Tuple2('http://quick-books.biz/', 'The Book of Judith (quickbooks, pamphlet, ltd run of 100)'),
		_Utils_Tuple2('https://ghostcitypress.com/2017-summer-microchap-series/wild-horse-rappers', 'wild horse rappers (with precious okoyomon)'),
		_Utils_Tuple2('http://muumuuhouse.com/wp.22may2017.html', '10,000 year clock (muumuu house)'),
		_Utils_Tuple2('http://www.bodegamag.com/articles/172-bros', 'bros (bodega mag)'),
		_Utils_Tuple2('http://darkfuckingwizard.com/three-poems/', '3 poems (dark fucking wizard)'),
		_Utils_Tuple2('http://muumuuhouse.com/wp.13nov2014.html', '14 haiku (muumuu house)'),
		_Utils_Tuple2('https://preludemag.com/contributors/willis-plummer/', '3 poems (prelude magazine)'),
		_Utils_Tuple2('https://genius.com/Willis-plummer-good-and-beautiful-annotated', 'good and beautiful (2014 judith lobel arkin prize honorable mention)'),
		_Utils_Tuple2('http://www.hobartpulp.com/web_features/5-poems--8', '5 poems (hobartpulp)')
	]);
var $author$project$Data$projects = _List_fromArray(
	[
		{
		q: '\n        My latest gamedev project has been implementing Tetris in my Swift-Metal \'framework\'.\n        So far, I\'m around 80% fidelity. It\'s been a lot of fun learning how Tetris really works.\n        Did you know that on initial release, every country\'s version had slightly different rules\n        and functionality?\n    ',
		r: _List_fromArray(
			[
				_Utils_Tuple2('https://github.com/willisplummer/metal-tetris', 'github')
			]),
		m: 'Tetris on Metal'
	},
		{
		q: '\n                        In an effort to learn video game development I reimplemented Snake\n                        in Godot. Then I wrote it again in Swift using Metal to interface\n                        directly with the GPU.\n                      ',
		r: _List_fromArray(
			[
				_Utils_Tuple2('https://github.com/willisplummer/godot-snake', 'godot implementation'),
				_Utils_Tuple2('https://github.com/willisplummer/metal-snake', 'swift + metal')
			]),
		m: 'Two Implementations of Snake'
	},
		{
		q: '\n                       A small nodejs application to enable public interviews performed via SMS.\n                       Participants generate a proxy number via Twilio and then send message there.\n                       The messages are forwarded back and forth like a normal text conversation and appear on the site as well.\n                        ',
		r: _List_fromArray(
			[
				_Utils_Tuple2('https://github.com/willisplummer/public-texting', 'github')
			]),
		m: 'Public Texting'
	},
		{
		q: '\n                        A Tic Tac Toe API that recurses through every possible move and chooses the option with the most winning outcomes.\n                        Written as an opportunity to experiment with ReasonML.\n                      ',
		r: _List_fromArray(
			[
				_Utils_Tuple2('https://github.com/willisplummer/reason-react-tictac', 'github')
			]),
		m: 'Tic Tac Toe AI'
	},
		{
		q: '\n                        A lightweight landing page for any type of project.\n                        Mouseover the squares to change their color and shape.\n                        I used RXJS for handling navigation and cursor events.\n                        ',
		r: _List_fromArray(
			[
				_Utils_Tuple2('https://willisplummer.github.io/demo-squares/', 'site'),
				_Utils_Tuple2('https://github.com/willisplummer/demo-squares', 'github')
			]),
		m: 'A Colorful Landing Page'
	},
		{
		q: '\n                        A standalone page for Kickstarter\'s Experts program.\n                        Implemented in React with atomic classes generated via SCSS.\n                        The list of Experts is sourced from a Rails controller.\n                      ',
		r: _List_fromArray(
			[
				_Utils_Tuple2('https://www.kickstarter.com/experts', 'site')
			]),
		m: 'Kickstarter Experts'
	},
		{
		q: '\n                        This single-page portfolio site was built using Elm.\n                        It implements the Navigation and URLparser packages to handle routing.\n                        ',
		r: _List_fromArray(
			[
				_Utils_Tuple2('https://github.com/willisplummer/elm-personal-website', 'github')
			]),
		m: 'This Portfolio Site'
	},
		{
		q: '\n                        This ruby app runs on Sinatra and enables the Amazon Echo to\n                        let you know when the next bus will arrive via the MTA\'s Bus Time API.\n                        ',
		r: _List_fromArray(
			[
				_Utils_Tuple2('https://github.com/willisplummer/mta_alexa_app', 'github')
			]),
		m: 'MTA Bus Times App for Amazon Echo'
	},
		{
		q: '\n                        This is a poetry and prose website that I edited in 2014 and 2015.\n                        I built a Rails CMS to simplify the process of adding new content.\n                        ',
		r: _List_fromArray(
			[
				_Utils_Tuple2('http://westernbeefs.com/', 'site'),
				_Utils_Tuple2('https://github.com/willisplummer/westernbeefs', 'github')
			]),
		m: 'Western Beefs of North America'
	}
	]);
var $author$project$Data$prose = _List_fromArray(
	[
		_Utils_Tuple2('https://thecreativeindependent.com/people/visual-artists-andrew-zebulon-and-kristen-wintercheck-on-letting-your-materials-guide-you/', 'kristen wintercheck and andrew zebulon on letting your materials guide you'),
		_Utils_Tuple2('https://thecreativeindependent.com/people/poet-matthew-rohrer-on-challenging-your-own-process/', 'matthew rohrer on challenging your own process'),
		_Utils_Tuple2('http://thenervousbreakdown.com/willisplummer/2018/11/two-stories/', 'two stories (the nervous breakdown)'),
		_Utils_Tuple2('https://thecreativeindependent.com/people/writer-megan-boyle-on-documenting-your-entire-life-in-your-creative-work/', 'megan boyle on documenting your entire life in your creative work'),
		_Utils_Tuple2('https://thecreativeindependent.com/people/poet-andrew-weatherhead-on-hijacking-language/', 'andrew weatherhead on hijacking language'),
		_Utils_Tuple2('https://thecreativeindependent.com/people/tao-lin-on-why-he-writes/', 'tao lin on why he writes'),
		_Utils_Tuple2('https://thecreativeindependent.com/people/precious-okoyomon-on-finding-poetry-in-everything/', 'precious okoyomon on finding poetry in everything'),
		_Utils_Tuple2('https://medium.com/kickstarter/total-party-kill-3898fb82b5fb#.31wxy6hzl', 'total party kill: the architects of dungeons and dragons'),
		_Utils_Tuple2('http://thoughtcatalog.com/2013/not-even-doom-music-an-interview-with-mat-riviere/', 'not even doom music: an interview with mat riviere'),
		_Utils_Tuple2('http://thoughtcatalog.com/2013/an-interview-with-nytyrant-in-four-parts/', 'an interview with ny tyrant in four parts')
	]);
var $author$project$Model$initialModel = F3(
	function (ymlReadingList, route, key) {
		return {
			aW: key,
			a_: _List_fromArray(
				[
					_Utils_Tuple3('About', $author$project$Types$ShowAbout, 0),
					_Utils_Tuple3('Writing', $author$project$Types$ShowWriting, 1),
					_Utils_Tuple3('Reading', $author$project$Types$ShowReadingList, 3),
					_Utils_Tuple3('Projects', $author$project$Types$ShowPortfolio, 2)
				]),
			a6: $author$project$Data$projects,
			a8: $author$project$Data$mkReadingList(ymlReadingList),
			ba: route,
			bh: {a4: $author$project$Data$poetry, a7: $author$project$Data$prose}
		};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Types$NotFoundRoute = 4;
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {y: frag, A: params, x: unvisited, t: value, B: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.x;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.t);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.t);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.a3),
					$elm$url$Url$Parser$prepareQuery(url.ay),
					url.al,
					$elm$core$Basics$identity)));
	});
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.B;
		var unvisited = _v0.x;
		var params = _v0.A;
		var frag = _v0.y;
		var value = _v0.t;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0;
		return function (_v1) {
			var visited = _v1.B;
			var unvisited = _v1.x;
			var params = _v1.A;
			var frag = _v1.y;
			var value = _v1.t;
			return A2(
				$elm$core$List$map,
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var parser = _v0;
				return parser(state);
			},
			parsers);
	};
};
var $elm$url$Url$Parser$s = function (str) {
	return function (_v0) {
		var visited = _v0.B;
		var unvisited = _v0.x;
		var params = _v0.A;
		var frag = _v0.y;
		var value = _v0.t;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					A2($elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var $elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
var $author$project$Routing$route = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2($elm$url$Url$Parser$map, 0, $elm$url$Url$Parser$top),
			A2(
			$elm$url$Url$Parser$map,
			0,
			$elm$url$Url$Parser$s('about')),
			A2(
			$elm$url$Url$Parser$map,
			1,
			$elm$url$Url$Parser$s('writing')),
			A2(
			$elm$url$Url$Parser$map,
			2,
			$elm$url$Url$Parser$s('projects')),
			A2(
			$elm$url$Url$Parser$map,
			2,
			$elm$url$Url$Parser$s('portfolio')),
			A2(
			$elm$url$Url$Parser$map,
			3,
			$elm$url$Url$Parser$s('reading-list'))
		]));
var $author$project$Routing$parseUrl = function (url) {
	return A2(
		$elm$core$Maybe$withDefault,
		4,
		A2(
			$elm$url$Url$Parser$parse,
			$author$project$Routing$route,
			_Utils_update(
				url,
				{
					al: $elm$core$Maybe$Nothing,
					a3: A2($elm$core$Maybe$withDefault, '', url.al)
				})));
};
var $author$project$Model$init = F3(
	function (ymlReadingList, url, key) {
		return _Utils_Tuple2(
			A3(
				$author$project$Model$initialModel,
				ymlReadingList,
				$author$project$Routing$parseUrl(url),
				key),
			$elm$core$Platform$Cmd$none);
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.ax;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.al,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.ay,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.au,
					_Utils_ap(http, url.an)),
				url.a3)));
};
var $author$project$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					model,
					A2($elm$browser$Browser$Navigation$pushUrl, model.aW, '#about'));
			case 1:
				return _Utils_Tuple2(
					model,
					A2($elm$browser$Browser$Navigation$pushUrl, model.aW, '#writing'));
			case 2:
				return _Utils_Tuple2(
					model,
					A2($elm$browser$Browser$Navigation$pushUrl, model.aW, '#portfolio'));
			case 3:
				return _Utils_Tuple2(
					model,
					A2($elm$browser$Browser$Navigation$pushUrl, model.aW, '#reading-list'));
			case 6:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 5:
				var urlRequest = msg.a;
				if (!urlRequest.$) {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.aW,
							$elm$url$Url$toString(url)));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			default:
				var location = msg.a;
				var currentRoute = $author$project$Routing$parseUrl(location);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ba: currentRoute}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$em = _VirtualDom_node('em');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$View$showBook = function (_v0) {
	var title = _v0.a;
	var author = _v0.b;
	return A2(
		$elm$html$Html$ul,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$li,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$em,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(title)
							])),
						$elm$html$Html$text(', ' + author)
					]))
			]));
};
var $author$project$View$showBooksByYear = F3(
	function (year, books, acc) {
		return A2(
			$elm$core$List$append,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromInt(year))
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							A2($elm$core$List$map, $author$project$View$showBook, books))
						]))
				]),
			acc);
	});
var $author$project$View$showProject = function (project) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('project')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('project-content')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(project.m)
								])),
							A2(
							$elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(project.q)
								])),
							A2(
							$elm$html$Html$p,
							_List_Nil,
							A2(
								$elm$core$List$concatMap,
								function (_v0) {
									var url = _v0.a;
									var description = _v0.b;
									return _List_fromArray(
										[
											$elm$html$Html$text('('),
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href(url)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(description)
												])),
											$elm$html$Html$text(')')
										]);
								},
								project.r))
						]))
				]))
		]);
};
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$View$content = function (model) {
	var _v0 = model.ba;
	switch (_v0) {
		case 0:
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('content')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Hi, I\'m Willis. I live in Brookyln. I write code, poetry, and fiction.')
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Since 2020, I\'ve been doing project based consulting for a bunch of companies including:'),
								A2(
								$elm$html$Html$ul,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://www.meredithmonk.org/'),
														$elm$html$Html$Attributes$target('_blank')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('The House Foundation')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://photoassist.com/')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('PhotoAssist')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://vidvox.com/')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('VidVox')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://app.awkwardquestiongame.com/')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('AwkwardQuestionGame')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://accesskit.media/')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('AccessKit')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('http://www.wavepaths.com')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Wavepaths')
													]))
											]))
									]))
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Previously, I worked full-time as:'),
								A2(
								$elm$html$Html$ul,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('A senior engineer at '),
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://odeko.com')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Odeko')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('The lead engineer at '),
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://www.hiclark.com')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Clark')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('A consultant at '),
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://computerlab.io/')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Computer Lab')
													]))
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('A front-end engineer at '),
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('https://www.hiclark.com')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Kickstarter')
													]))
											]))
									]))
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('For a while, I contributed interviews to '),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('https://thecreativeindependent.com/')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('The Creative Independent')
									])),
								$elm$html$Html$text('.')
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('My chapbooks MONS PUBIS and L-THEANINE are available from '),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('http://stupendous.cc/')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('STUPENDOUS')
									])),
								$elm$html$Html$text(' and MONS PUBIS was published as a limited run by '),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('http://www.afvpress.com/utgivelser/ny-serie/')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('AFV')
									])),
								$elm$html$Html$text(' in Norway.')
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('You can find me on '),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('https://github.com/willisplummer')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('GitHub')
									])),
								$elm$html$Html$text(' and '),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('https://www.linkedin.com/in/willisplummer')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('LinkedIn')
									])),
								$elm$html$Html$text(', but '),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('mailto:willisplummer@gmail.com')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('email')
									])),
								$elm$html$Html$text(' is the best way to get in touch.')
							]))
					]));
		case 1:
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('content')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Poetry:')
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('writing-list')
							]),
						A2(
							$elm$core$List$concatMap,
							function (_v1) {
								var url = _v1.a;
								var description = _v1.b;
								return _List_fromArray(
									[
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href(url)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(description)
													]))
											]))
									]);
							},
							model.bh.a4)),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Prose:')
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('writing-list')
							]),
						A2(
							$elm$core$List$concatMap,
							function (_v2) {
								var url = _v2.a;
								var description = _v2.b;
								return _List_fromArray(
									[
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href(url)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(description)
													]))
											]))
									]);
							},
							model.bh.a7))
					]));
		case 2:
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('content')
					]),
				A2($elm$core$List$concatMap, $author$project$View$showProject, model.a6));
		case 3:
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('content')
					]),
				A3($elm$core$Dict$foldl, $author$project$View$showBooksByYear, _List_Nil, model.a8));
		default:
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('content')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('NOT FOUND')
					]));
	}
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$header = _VirtualDom_node('header');
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $tesk9$accessible_html$Accessibility$Utils$aria = A2(
	$elm$core$Basics$composeL,
	$elm$html$Html$Attributes$attribute,
	$elm$core$Basics$append('aria-'));
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $tesk9$accessible_html$Accessibility$Utils$toBoolString = function (bool) {
	return bool ? 'true' : 'false';
};
var $tesk9$accessible_html$Accessibility$Utils$toTriStateString = A2(
	$elm$core$Basics$composeL,
	$elm$core$Maybe$withDefault('mixed'),
	$elm$core$Maybe$map($tesk9$accessible_html$Accessibility$Utils$toBoolString));
var $tesk9$accessible_html$Accessibility$Aria$pressed = A2(
	$elm$core$Basics$composeL,
	$tesk9$accessible_html$Accessibility$Utils$aria('pressed'),
	$tesk9$accessible_html$Accessibility$Utils$toTriStateString);
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$View$headerNav = function (model) {
	var navItemClass = function (bool) {
		return bool ? 'active' : '';
	};
	return A2(
		$elm$html$Html$header,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Willis Plummer')
					])),
				A2(
				$elm$html$Html$nav,
				_List_Nil,
				A2(
					$elm$core$List$intersperse,
					$elm$html$Html$text(' | '),
					A2(
						$elm$core$List$concatMap,
						function (_v0) {
							var description = _v0.a;
							var msg = _v0.b;
							var route = _v0.c;
							return _List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('button'),
											$elm$html$Html$Events$onClick(msg),
											$tesk9$accessible_html$Accessibility$Aria$pressed(
											$elm$core$Maybe$Just(
												_Utils_eq(model.ba, route))),
											$elm$html$Html$Attributes$class(
											navItemClass(
												_Utils_eq(model.ba, route)))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(description)
										]))
								]);
						},
						model.a_)))
			]));
};
var $author$project$View$view = function (model) {
	return {
		aL: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$View$headerNav(model),
						$author$project$View$content(model)
					]))
			]),
		m: 'Willis Plummer Personal Website'
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{
		aU: $author$project$Model$init,
		a0: $author$project$Types$UrlChange,
		a1: $author$project$Types$LinkClicked,
		bd: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		be: $author$project$Update$update,
		bf: $author$project$View$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$string)(0)}});}(this));