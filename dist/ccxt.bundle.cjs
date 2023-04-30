'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var WebSocket = require('ws');
var http = require('node:http');
var https = require('node:https');
var zlib = require('node:zlib');
var Stream$1 = require('node:stream');
var node_buffer = require('node:buffer');
var node_util = require('node:util');
var node_url = require('node:url');
var node_net = require('node:net');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n["default"] = e;
	return Object.freeze(n);
}

var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream$1);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRegister$5 (path, loader) {
	DYNAMIC_REQUIRE_LOADERS[path] = loader;
}

var DYNAMIC_REQUIRE_LOADERS = Object.create(null);
var DYNAMIC_REQUIRE_CACHE = Object.create(null);
var DYNAMIC_REQUIRE_SHORTS = Object.create(null);
var DEFAULT_PARENT_MODULE = {
	id: '<' + 'rollup>', exports: {}, parent: undefined, filename: null, loaded: false, children: [], paths: []
};
var CHECKED_EXTENSIONS = ['', '.js', '.json'];

function normalize$1 (path) {
	path = path.replace(/\\/g, '/');
	var parts = path.split('/');
	var slashed = parts[0] === '';
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] === '.' || parts[i] === '') {
			parts.splice(i--, 1);
		}
	}
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] !== '..') continue;
		if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
			parts.splice(--i, 2);
			i--;
		}
	}
	path = parts.join('/');
	if (slashed && path[0] !== '/')
	  path = '/' + path;
	else if (path.length === 0)
	  path = '.';
	return path;
}

function join$1 () {
	if (arguments.length === 0)
	  return '.';
	var joined;
	for (var i = 0; i < arguments.length; ++i) {
	  var arg = arguments[i];
	  if (arg.length > 0) {
		if (joined === undefined)
		  joined = arg;
		else
		  joined += '/' + arg;
	  }
	}
	if (joined === undefined)
	  return '.';

	return joined;
}

function isPossibleNodeModulesPath (modulePath) {
	var c0 = modulePath[0];
	if (c0 === '/' || c0 === '\\') return false;
	var c1 = modulePath[1], c2 = modulePath[2];
	if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\')) ||
		(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\'))) return false;
	if (c1 === ':' && (c2 === '/' || c2 === '\\'))
		return false;
	return true;
}

function dirname (path) {
  if (path.length === 0)
    return '.';

  var i = path.length - 1;
  while (i > 0) {
    var c = path.charCodeAt(i);
    if ((c === 47 || c === 92) && i !== path.length - 1)
      break;
    i--;
  }

  if (i > 0)
    return path.substr(0, i);

  if (path.chartCodeAt(0) === 47 || path.chartCodeAt(0) === 92)
    return path.charAt(0);

  return '.';
}

function commonjsResolveImpl (path, originalModuleDir, testCache) {
	var shouldTryNodeModules = isPossibleNodeModulesPath(path);
	path = normalize$1(path);
	var relPath;
	if (path[0] === '/') {
		originalModuleDir = '/';
	}
	while (true) {
		if (!shouldTryNodeModules) {
			relPath = originalModuleDir ? normalize$1(originalModuleDir + '/' + path) : path;
		} else if (originalModuleDir) {
			relPath = normalize$1(originalModuleDir + '/node_modules/' + path);
		} else {
			relPath = normalize$1(join$1('node_modules', path));
		}

		if (relPath.endsWith('/..')) {
			break; // Travelled too far up, avoid infinite loop
		}

		for (var extensionIndex = 0; extensionIndex < CHECKED_EXTENSIONS.length; extensionIndex++) {
			var resolvedPath = relPath + CHECKED_EXTENSIONS[extensionIndex];
			if (DYNAMIC_REQUIRE_CACHE[resolvedPath]) {
				return resolvedPath;
			}
			if (DYNAMIC_REQUIRE_SHORTS[resolvedPath]) {
			  return resolvedPath;
			}
			if (DYNAMIC_REQUIRE_LOADERS[resolvedPath]) {
				return resolvedPath;
			}
		}
		if (!shouldTryNodeModules) break;
		var nextDir = normalize$1(originalModuleDir + '/..');
		if (nextDir === originalModuleDir) break;
		originalModuleDir = nextDir;
	}
	return null;
}

function commonjsResolve (path, originalModuleDir) {
	var resolvedPath = commonjsResolveImpl(path, originalModuleDir);
	if (resolvedPath !== null) {
		return resolvedPath;
	}
	return require.resolve(path);
}

function commonjsRequire (path, originalModuleDir) {
	var resolvedPath = commonjsResolveImpl(path, originalModuleDir);
	if (resolvedPath !== null) {
    var cachedModule = DYNAMIC_REQUIRE_CACHE[resolvedPath];
    if (cachedModule) return cachedModule.exports;
    var shortTo = DYNAMIC_REQUIRE_SHORTS[resolvedPath];
    if (shortTo) {
      cachedModule = DYNAMIC_REQUIRE_CACHE[shortTo];
      if (cachedModule)
        return cachedModule.exports;
      resolvedPath = commonjsResolveImpl(shortTo, null);
    }
    var loader = DYNAMIC_REQUIRE_LOADERS[resolvedPath];
    if (loader) {
      DYNAMIC_REQUIRE_CACHE[resolvedPath] = cachedModule = {
        id: resolvedPath,
        filename: resolvedPath,
        path: dirname(resolvedPath),
        exports: {},
        parent: DEFAULT_PARENT_MODULE,
        loaded: false,
        children: [],
        paths: [],
        require: function (path, base) {
          return commonjsRequire(path, (base === undefined || base === null) ? cachedModule.path : base);
        }
      };
      try {
        loader.call(commonjsGlobal, cachedModule, cachedModule.exports);
      } catch (error) {
        delete DYNAMIC_REQUIRE_CACHE[resolvedPath];
        throw error;
      }
      cachedModule.loaded = true;
      return cachedModule.exports;
    }	}
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

commonjsRequire.cache = DYNAMIC_REQUIRE_CACHE;
commonjsRequire.resolve = commonjsResolve;

const commonjsRegister$4 = commonjsRegister$5;
commonjsRegister$4("/$$rollup_base$$/js/src/static_dependencies/qs/formats.cjs", function (module, exports) {
var replace = String.prototype.replace;
var percentTwenties = /%20/g;
module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

});

const commonjsRegister$3 = commonjsRegister$5;
commonjsRegister$3("/$$rollup_base$$/js/src/static_dependencies/qs/index.cjs", function (module, exports) {
var stringify = commonjsRequire("./stringify.cjs", "/$$rollup_base$$/js/src/static_dependencies/qs");
var parse = commonjsRequire("./parse.cjs", "/$$rollup_base$$/js/src/static_dependencies/qs");
var formats = commonjsRequire("./formats.cjs", "/$$rollup_base$$/js/src/static_dependencies/qs");
module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

});

const commonjsRegister$2 = commonjsRegister$5;
commonjsRegister$2("/$$rollup_base$$/js/src/static_dependencies/qs/parse.cjs", function (module, exports) {
var utils = commonjsRequire("./utils.cjs", "/$$rollup_base$$/js/src/static_dependencies/qs");
var has = Object.prototype.hasOwnProperty;
var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};
var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};
// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')
// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')
var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;
    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                }
                else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }
    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        }
        else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }
        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }
        if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }
        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        }
        else {
            obj[key] = val;
        }
    }
    return obj;
};
var parseObject = function (chain, val, options) {
    var leaf = val;
    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        }
        else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            }
            else if (!isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)) {
                obj = [];
                obj[index] = leaf;
            }
            else {
                obj[cleanRoot] = leaf;
            }
        }
        leaf = obj;
    }
    return leaf;
};
var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }
    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;
    // The regex chunks
    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;
    // Get the parent
    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;
    // Stash the parent if it exists
    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(parent);
    }
    // Loop through children appending to the array until we hit depth
    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }
    // If there's a remainder, just add whatever is left
    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }
    return parseObject(keys, val, options);
};
var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }
    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;
    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};
module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);
    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }
    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};
    // Iterate over the keys and setup the new object
    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }
    return utils.compact(obj);
};

});

const commonjsRegister$1 = commonjsRegister$5;
commonjsRegister$1("/$$rollup_base$$/js/src/static_dependencies/qs/stringify.cjs", function (module, exports) {
var utils = commonjsRequire("./utils.cjs", "/$$rollup_base$$/js/src/static_dependencies/qs");
var formats = commonjsRequire("./formats.cjs", "/$$rollup_base$$/js/src/static_dependencies/qs");
var has = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};
var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};
var toISO = Date.prototype.toISOString;
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};
var stringify = function stringify(// eslint-disable-line func-name-matching
object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    }
    else if (obj instanceof Date) {
        obj = serializeDate(obj);
    }
    else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }
    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }
        obj = '';
    }
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }
    var values = [];
    if (typeof obj === 'undefined') {
        return values;
    }
    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    }
    else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (skipNulls && obj[key] === null) {
            continue;
        }
        if (isArray(obj)) {
            pushToArray(values, stringify(obj[key], typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
        }
        else {
            pushToArray(values, stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
        }
    }
    return values;
};
var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }
    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }
    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];
    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }
    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};
module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);
    var objKeys;
    var filter;
    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    }
    else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }
    var keys = [];
    if (typeof obj !== 'object' || obj === null) {
        return '';
    }
    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    }
    else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    }
    else {
        arrayFormat = 'indices';
    }
    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
    if (!objKeys) {
        objKeys = Object.keys(obj);
    }
    if (options.sort) {
        objKeys.sort(options.sort);
    }
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.formatter, options.encodeValuesOnly, options.charset));
    }
    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';
    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        }
        else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }
    return joined.length > 0 ? prefix + joined : '';
};

});

const commonjsRegister = commonjsRegister$5;
commonjsRegister("/$$rollup_base$$/js/src/static_dependencies/qs/utils.cjs", function (module, exports) {
var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;
var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }
    return array;
}());
var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
            var compacted = [];
            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }
            item.obj[item.prop] = compacted;
        }
    }
};
var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }
    return obj;
};
var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }
    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        }
        else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        }
        else {
            return [target, source];
        }
        return target;
    }
    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }
    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }
    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                }
                else {
                    target.push(item);
                }
            }
            else {
                target[i] = item;
            }
        });
        return target;
    }
    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        }
        else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};
var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};
var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    }
    catch (e) {
        return strWithoutPlus;
    }
};
var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }
    var string = typeof str === 'string' ? str : String(str);
    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }
    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }
        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }
        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }
        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }
        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }
    return out;
};
var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];
    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }
    compactQueue(queue);
    return value;
};
var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};
var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};
var combine = function combine(a, b) {
    return [].concat(a, b);
};
module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};

});

// @ts-nocheck
// ----------------------------------------------------------------------------
// There's been a lot of messing with this code...
// The problem is to satisfy the following requirements:
// - properly detect isNode == true on server side and isNode == false in the browser (on client side)
// - make sure create-react-app, react-starter-kit and other react frameworks work
// - make sure it does not break the browserified version (when linked into a html from a cdn)
// - make sure it does not break the webpacking and babel-transpiled scripts
// - make sure it works in Electron
// - make sure it works with Angular.js
// - make sure it does not break other possible usage scenarios
const isBrowser = typeof window !== 'undefined';
const isElectron = typeof process !== 'undefined' &&
    typeof process.versions !== 'undefined' &&
    typeof process.versions.electron !== 'undefined';
const isWebWorker = typeof WorkerGlobalScope !== 'undefined' && (self instanceof WorkerGlobalScope);
const isWindows = typeof process !== 'undefined' && process.platform === "win32";
const isNode$1 = !(isBrowser || isWebWorker);

/*  ------------------------------------------------------------------------ */
const isNumber = Number.isFinite;
const isInteger = Number.isInteger;
const isArray$1 = Array.isArray;
const hasProps = (o) => ((o !== undefined) && (o !== null));
const isString = (s) => (typeof s === 'string');
const isObject = (o) => ((o !== null) && (typeof o === 'object'));
const isRegExp = (o) => (o instanceof RegExp);
const isDictionary = (o) => (isObject(o) && (Object.getPrototypeOf(o) === Object.prototype) && !isArray$1(o) && !isRegExp(o));
const isStringCoercible = (x) => ((hasProps(x) && x.toString) || isNumber(x));
/*  .............................................   */
const prop = (o, k) => (isObject(o) && o[k] !== '' && o[k] !== null ? o[k] : undefined);
const prop2 = (o, k1, k2) => (!isObject(o)
    ? undefined
    : (o[k1] !== undefined && o[k1] !== '' && o[k1] !== null
        ? o[k1]
        : (o[k2] !== '' && o[k2] !== null
            ? o[k2]
            : undefined)));
const getValueFromKeysInArray = (object, array) => object[array.find((k) => prop(object, k) !== undefined)];
/*  .............................................   */
const asFloat = (x) => ((isNumber(x) || (isString(x) && x.length !== 0)) ? parseFloat(x) : NaN);
const asInteger = (x) => ((isNumber(x) || (isString(x) && x.length !== 0)) ? Math.trunc(Number(x)) : NaN);
/*  .............................................   */
const safeFloat$1 = (o, k, $default) => {
    const n = asFloat(prop(o, k));
    return isNumber(n) ? n : $default;
};
const safeInteger$1 = (o, k, $default) => {
    const n = asInteger(prop(o, k));
    return isNumber(n) ? n : $default;
};
const safeIntegerProduct$1 = (o, k, $factor, $default) => {
    const n = asInteger(prop(o, k));
    return isNumber(n) ? parseInt(n * $factor) : $default;
};
const safeTimestamp$1 = (o, k, $default) => {
    const n = asFloat(prop(o, k));
    return isNumber(n) ? parseInt(n * 1000) : $default;
};
const safeValue$1 = (o, k, $default) => {
    const x = prop(o, k);
    return hasProps(x) ? x : $default;
};
const safeString$1 = (o, k, $default) => {
    const x = prop(o, k);
    return isStringCoercible(x) ? String(x) : $default;
};
const safeStringLower$1 = (o, k, $default) => {
    const x = prop(o, k);
    return isStringCoercible(x) ? String(x).toLowerCase() : $default;
};
const safeStringUpper$1 = (o, k, $default) => {
    const x = prop(o, k);
    return isStringCoercible(x) ? String(x).toUpperCase() : $default;
};
/*  .............................................   */
const safeFloat2$1 = (o, k1, k2, $default) => {
    const n = asFloat(prop2(o, k1, k2));
    return isNumber(n) ? n : $default;
};
const safeInteger2$1 = (o, k1, k2, $default) => {
    const n = asInteger(prop2(o, k1, k2));
    return isNumber(n) ? n : $default;
};
const safeIntegerProduct2$1 = (o, k1, k2, $factor, $default) => {
    const n = asInteger(prop2(o, k1, k2));
    return isNumber(n) ? parseInt(n * $factor) : $default;
};
const safeTimestamp2$1 = (o, k1, k2, $default) => {
    const n = asFloat(prop2(o, k1, k2));
    return isNumber(n) ? parseInt(n * 1000) : $default;
};
const safeValue2$1 = (o, k1, k2, $default) => {
    const x = prop2(o, k1, k2);
    return hasProps(x) ? x : $default;
};
const safeString2$1 = (o, k1, k2, $default) => {
    const x = prop2(o, k1, k2);
    return isStringCoercible(x) ? String(x) : $default;
};
const safeStringLower2$1 = (o, k1, k2, $default) => {
    const x = prop2(o, k1, k2);
    return isStringCoercible(x) ? String(x).toLowerCase() : $default;
};
const safeStringUpper2$1 = (o, k1, k2, $default) => {
    const x = prop2(o, k1, k2);
    return isStringCoercible(x) ? String(x).toUpperCase() : $default;
};
const safeFloatN$1 = (o, k, $default) => {
    const n = asFloat(getValueFromKeysInArray(o, k));
    return isNumber(n) ? n : $default;
};
const safeIntegerN$1 = (o, k, $default) => {
    const n = asInteger(getValueFromKeysInArray(o, k));
    return isNumber(n) ? n : $default;
};
const safeIntegerProductN$1 = (o, k, $factor, $default) => {
    const n = asInteger(getValueFromKeysInArray(o, k));
    return isNumber(n) ? parseInt(n * $factor) : $default;
};
const safeTimestampN$1 = (o, k, $default) => {
    const n = asFloat(getValueFromKeysInArray(o, k));
    return isNumber(n) ? parseInt(n * 1000) : $default;
};
const safeValueN$1 = (o, k, $default) => {
    const x = getValueFromKeysInArray(o, k);
    return hasProps(x) ? x : $default;
};
const safeStringN$1 = (o, k, $default) => {
    const x = getValueFromKeysInArray(o, k);
    return isStringCoercible(x) ? String(x) : $default;
};
const safeStringLowerN$1 = (o, k, $default) => {
    const x = getValueFromKeysInArray(o, k);
    return isStringCoercible(x) ? String(x).toLowerCase() : $default;
};
const safeStringUpperN$1 = (o, k, $default) => {
    const x = getValueFromKeysInArray(o, k);
    return isStringCoercible(x) ? String(x).toUpperCase() : $default;
};
/*  ------------------------------------------------------------------------ */

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
const keys$1 = Object.keys; // eslint-disable-line padding-line-between-statements
const values$1 = (x) => ((!isArray$1(x)) ? Object.values(x) : x); // don't copy arrays if they're already arrays
const index$1 = (x) => new Set(values$1(x));
const extend$1 = (...args) => Object.assign({}, ...args); // NB: side-effect free
const clone$2 = (x) => (isArray$1(x) ? Array.from(x) : extend$1(x)); // clone arrays or objects
// ----------------------------------------------------------------------------
const ordered$1 = (x) => x; // a stub to keep assoc keys in order (in JS it does nothing, it's mostly for Python)
const unique$1 = (x) => Array.from(index$1(x));
const arrayConcat$1 = (a, b) => a.concat(b);
// ------------------------------------------------------------------------
const inArray$1 = (needle, haystack) => haystack.includes(needle);
const toArray$1 = (object) => Object.values(object);
const isEmpty$1 = (object) => {
    if (!object) {
        return true;
    }
    return (Array.isArray(object) ? object : Object.keys(object)).length < 1;
};
const keysort$1 = (x, out = {}) => {
    for (const k of keys$1(x).sort()) {
        out[k] = x[k];
    }
    return out;
};
/*
    Accepts a map/array of objects and a key name to be used as an index:
    array = [
        { someKey: 'value1', anotherKey: 'anotherValue1' },
        { someKey: 'value2', anotherKey: 'anotherValue2' },
        { someKey: 'value3', anotherKey: 'anotherValue3' },
    ]
    key = 'someKey'
    Returns a map:
    {
        value1: { someKey: 'value1', anotherKey: 'anotherValue1' },
        value2: { someKey: 'value2', anotherKey: 'anotherValue2' },
        value3: { someKey: 'value3', anotherKey: 'anotherValue3' },
    }
*/
const groupBy$1 = (x, k, out = {}) => {
    for (const v of values$1(x)) {
        if (k in v) {
            const p = v[k];
            out[p] = out[p] || [];
            out[p].push(v);
        }
    }
    return out;
};
const indexBy$1 = (x, k, out = {}) => {
    for (const v of values$1(x)) {
        if (k in v) {
            out[v[k]] = v;
        }
    }
    return out;
};
const filterBy$1 = (x, k, value = undefined, out = []) => {
    for (const v of values$1(x)) {
        if (v[k] === value) {
            out.push(v);
        }
    }
    return out;
};
const sortBy$1 = (array, key, descending = false, direction = descending ? -1 : 1) => array.sort((a, b) => {
    if (a[key] < b[key]) {
        return -direction;
    }
    else if (a[key] > b[key]) {
        return direction;
    }
    else {
        return 0;
    }
});
const sortBy2$1 = (array, key1, key2, descending = false, direction = descending ? -1 : 1) => array.sort((a, b) => {
    if (a[key1] < b[key1]) {
        return -direction;
    }
    else if (a[key1] > b[key1]) {
        return direction;
    }
    else {
        if (a[key2] < b[key2]) {
            return -direction;
        }
        else if (a[key2] > b[key2]) {
            return direction;
        }
        else {
            return 0;
        }
    }
});
const flatten$1 = function flatten(x, out = []) {
    for (const v of x) {
        if (isArray$1(v)) {
            flatten(v, out);
        }
        else {
            out.push(v);
        }
    }
    return out;
};
const pluck = (x, k) => values$1(x).filter((v) => k in v).map((v) => v[k]);
const omit$1 = (x, ...args) => {
    if (!Array.isArray(x)) {
        const out = clone$2(x);
        for (const k of args) {
            if (isArray$1(k)) { // omit (x, ['a', 'b'])
                for (const kk of k) {
                    delete out[kk];
                }
            }
            else {
                delete out[k]; // omit (x, 'a', 'b')
            }
        }
        return out;
    }
    return x;
};
const sum$1 = (...xs) => {
    const ns = xs.filter(isNumber); // leave only numbers
    return (ns.length > 0) ? ns.reduce((a, b) => a + b, 0) : undefined;
};
const deepExtend$1 = function deepExtend(...xs) {
    let out = undefined;
    for (const x of xs) {
        if (isDictionary(x)) {
            if (!isDictionary(out)) {
                out = {};
            }
            for (const k in x) {
                out[k] = deepExtend(out[k], x[k]);
            }
        }
        else {
            out = x;
        }
    }
    return out;
};
const merge$1 = (target, ...args) => {
    // doesn't overwrite defined keys with undefined
    const overwrite = {};
    const merged = Object.assign({}, ...args);
    const keys = Object.keys(merged);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (target[key] === undefined) {
            overwrite[key] = merged[key];
        }
    }
    // eslint-disable-next-line
    return Object.assign({}, target, overwrite);
};

// ----------------------------------------------------------------------------
// unCamelCase has to work with the following edge cases
//
//     parseOHLCVs               > parse_ohlcvs
//     safeString2               > safe_string_2
//     safeStringN               > safe_string_n
//     convertOHLCVToTradingView > convert_ohlcv_to_trading_view
//     fetchL2OrderBook          > fetch_l2_order_book
//     stringToBase64            > string_to_base64
//     base64ToString            > base64_to_string
//     parseHTTPResponse         > parse_http_response
//     hasFetchOHLCV             > has_fetch_ohlcv
//
// @ts-nocheck
const unCamelCase$1 = (s) => {
    return s.match(/[A-Z]/) ? s.replace(/[a-z0-9][A-Z]/g, (x) => x[0] + '_' + x[1]).replace(/[A-Z0-9][A-Z0-9][a-z][^$]/g, (x) => x[0] + '_' + x[1] + x[2] + x[3]).replace(/[a-z][0-9]$/g, (x) => x[0] + '_' + x[1]).toLowerCase() : s;
};
const capitalize$1 = (s) => {
    return s.length ? (s.charAt(0).toUpperCase() + s.slice(1)) : s;
};
const strip$1 = (s) => s.replace(/^\s+|\s+$/g, '');
// ----------------------------------------------------------------------------
const uuid$1 = (a) => {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid$1);
};
const uuid16$1 = (a) => {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e5] + 1e2 + 4e2 + 8e3).replace(/[018]/g, uuid16$1);
};
const uuid22$1 = (a) => {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + 1e3 + 4e3 + 8e5).replace(/[018]/g, uuid22$1);
};

// ------------------------------------------------------------------------
//
//  NB: initially, I used objects for options passing:
//
//          decimalToPrecision ('123.456', { digits: 2, round: true, afterPoint: true })
//
//  ...but it turns out it's hard to port that across different languages and it is also
//     probably has a performance penalty -- while it's a performance critical code! So
//     I switched to using named constants instead, as it is actually more readable and
//     succinct, and surely doesn't come with any inherent performance downside:
//
//          decimalToPrecision ('123.456', ROUND, 2, DECIMAL_PLACES)
const ROUND$1 = 0; // rounding mode
const TRUNCATE$1 = 1;
const ROUND_UP = 2;
const ROUND_DOWN = 3;
const DECIMAL_PLACES$1 = 0; // digits counting mode
const SIGNIFICANT_DIGITS = 1;
const TICK_SIZE$1 = 2;
const NO_PADDING$1 = 0; // zero-padding mode
const PAD_WITH_ZERO = 1;
const precisionConstants = {
    ROUND: ROUND$1,
    TRUNCATE: TRUNCATE$1,
    ROUND_UP,
    ROUND_DOWN,
    DECIMAL_PLACES: DECIMAL_PLACES$1,
    SIGNIFICANT_DIGITS,
    TICK_SIZE: TICK_SIZE$1,
    NO_PADDING: NO_PADDING$1,
    PAD_WITH_ZERO,
};
/*  ------------------------------------------------------------------------ */
// See https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript for discussion
function numberToString$1(x) {
    if (x === undefined)
        return undefined;
    if (typeof x !== 'number')
        return x.toString();
    const s = x.toString();
    if (Math.abs(x) < 1.0) {
        const n_e = s.split('e-');
        const n = n_e[0].replace('.', '');
        const e = parseInt(n_e[1]);
        const neg = (s[0] === '-');
        if (e) {
            x = (neg ? '-' : '') + '0.' + (new Array(e)).join('0') + n.substring(neg);
            return x;
        }
    }
    else {
        const parts = s.split('e');
        if (parts[1]) {
            let e = parseInt(parts[1]);
            const m = parts[0].split('.');
            let part = '';
            if (m[1]) {
                e -= m[1].length;
                part = m[1];
            }
            return m[0] + part + (new Array(e + 1)).join('0');
        }
    }
    return s;
}
//-----------------------------------------------------------------------------
// expects non-scientific notation
const truncate_regExpCache = [];
const truncate_to_string = (num, precision = 0) => {
    num = numberToString$1(num);
    if (precision > 0) {
        const re = truncate_regExpCache[precision] || (truncate_regExpCache[precision] = new RegExp('([-]*\\d+\\.\\d{' + precision + '})(\\d)'));
        const [, result] = num.toString().match(re) || [null, num];
        return result.toString();
    }
    return parseInt(num).toString();
};
const truncate = (num, precision = 0) => parseFloat(truncate_to_string(num, precision));
function precisionFromString$1(str) {
    // support string formats like '1e-4'
    if (str.indexOf('e') > -1) {
        const numStr = str.replace(/\de/, '');
        return parseInt(numStr) * -1;
    }
    // support integer formats (without dot) like '1', '10' etc [Note: bug in decimalToPrecision, so this should not be used atm]
    // if (str.indexOf ('.') === -1) {
    //     return str.length * -1
    // }
    // default strings like '0.0001'
    const split = str.replace(/0+$/g, '').split('.');
    return (split.length > 1) ? (split[1].length) : 0;
}
/*  ------------------------------------------------------------------------ */
const decimalToPrecision$1 = (x, roundingMode, numPrecisionDigits, countingMode = DECIMAL_PLACES$1, paddingMode = NO_PADDING$1) => {
    if (countingMode === TICK_SIZE$1) {
        if (typeof numPrecisionDigits === 'string') {
            numPrecisionDigits = parseFloat(numPrecisionDigits);
        }
        if (numPrecisionDigits <= 0) {
            throw new Error('TICK_SIZE cant be used with negative or zero numPrecisionDigits');
        }
    }
    if (numPrecisionDigits < 0) {
        const toNearest = Math.pow(10, -numPrecisionDigits);
        if (roundingMode === ROUND$1) {
            return (toNearest * decimalToPrecision$1(x / toNearest, roundingMode, 0, countingMode, paddingMode)).toString();
        }
        if (roundingMode === TRUNCATE$1) {
            return (x - (x % toNearest)).toString();
        }
    }
    /*  handle tick size */
    if (countingMode === TICK_SIZE$1) {
        const precisionDigitsString = decimalToPrecision$1(numPrecisionDigits, ROUND$1, 22, DECIMAL_PLACES$1, NO_PADDING$1);
        const newNumPrecisionDigits = precisionFromString$1(precisionDigitsString);
        let missing = x % numPrecisionDigits;
        // See: https://github.com/ccxt/ccxt/pull/6486
        missing = Number(decimalToPrecision$1(missing, ROUND$1, 8, DECIMAL_PLACES$1, NO_PADDING$1));
        const fpError = decimalToPrecision$1(missing / numPrecisionDigits, ROUND$1, Math.max(newNumPrecisionDigits, 8), DECIMAL_PLACES$1, NO_PADDING$1);
        if (precisionFromString$1(fpError) !== 0) {
            if (roundingMode === ROUND$1) {
                if (x > 0) {
                    if (missing >= numPrecisionDigits / 2) {
                        x = x - missing + numPrecisionDigits;
                    }
                    else {
                        x = x - missing;
                    }
                }
                else {
                    if (missing >= numPrecisionDigits / 2) {
                        x = Number(x) - missing;
                    }
                    else {
                        x = Number(x) - missing - numPrecisionDigits;
                    }
                }
            }
            else if (roundingMode === TRUNCATE$1) {
                x = x - missing;
            }
        }
        return decimalToPrecision$1(x, ROUND$1, newNumPrecisionDigits, DECIMAL_PLACES$1, paddingMode);
    }
    /*  Convert to a string (if needed), skip leading minus sign (if any)   */
    const str = numberToString$1(x);
    const isNegative = str[0] === '-';
    const strStart = isNegative ? 1 : 0;
    const strEnd = str.length;
    /*  Find the dot position in the source buffer   */
    for (var strDot = 0; strDot < strEnd; strDot++) {
        if (str[strDot] === '.')
            break;
    }
    const hasDot = strDot < str.length;
    /*  Char code constants         */
    const MINUS = 45;
    const DOT = 46;
    const ZERO = 48;
    const ONE = (ZERO + 1);
    const FIVE = (ZERO + 5);
    const NINE = (ZERO + 9);
    /*  For -123.4567 the `chars` array will hold 01234567 (leading zero is reserved for rounding cases when 099 → 100)    */
    const chars = new Uint8Array((strEnd - strStart) + (hasDot ? 0 : 1));
    chars[0] = ZERO;
    /*  Validate & copy digits, determine certain locations in the resulting buffer  */
    let afterDot = chars.length;
    let digitsStart = -1; // significant digits
    let digitsEnd = -1;
    for (var i = 1, j = strStart; j < strEnd; j++, i++) {
        const c = str.charCodeAt(j);
        if (c === DOT) {
            afterDot = i--;
        }
        else if ((c < ZERO) || (c > NINE)) {
            throw new Error(`${str}: invalid number (contains an illegal character '${str[i - 1]}')`);
        }
        else {
            chars[i] = c;
            if ((c !== ZERO) && (digitsStart < 0))
                digitsStart = i;
        }
    }
    if (digitsStart < 0)
        digitsStart = 1;
    /*  Determine the range to cut  */
    let precisionStart = (countingMode === DECIMAL_PLACES$1) ? afterDot // 0.(0)001234567
        : digitsStart; // 0.00(1)234567
    let precisionEnd = precisionStart
        + numPrecisionDigits;
    /*  Reset the last significant digit index, as it will change during the rounding/truncation.   */
    digitsEnd = -1;
    // Perform rounding/truncation per digit, from digitsEnd to digitsStart, by using the following
    //  algorithm (rounding 999 → 1000, as an example):
    //
    //      step  =          i=3      i=2      i=1      i=0
    //
    //      chars =         0999     0999     0900     1000
    //      memo  =         ---0     --1-     -1--     0---
    let allZeros = true;
    let signNeeded = isNegative;
    for (let i = chars.length - 1, memo = 0; i >= 0; i--) {
        let c = chars[i];
        if (i !== 0) {
            c += memo;
            if (i >= (precisionStart + numPrecisionDigits)) {
                const ceil = (roundingMode === ROUND$1)
                    && (c >= FIVE)
                    && !((c === FIVE) && memo); // prevents rounding of 1.45 to 2
                c = ceil ? (NINE + 1) : ZERO;
            }
            if (c > NINE) {
                c = ZERO;
                memo = 1;
            }
            else
                memo = 0;
        }
        else if (memo)
            c = ONE; // leading extra digit (0900 → 1000)
        chars[i] = c;
        if (c !== ZERO) {
            allZeros = false;
            digitsStart = i;
            digitsEnd = (digitsEnd < 0) ? (i + 1) : digitsEnd;
        }
    }
    /*  Update the precision range, as `digitsStart` may have changed... & the need for a negative sign if it is only 0    */
    if (countingMode === SIGNIFICANT_DIGITS) {
        precisionStart = digitsStart;
        precisionEnd = precisionStart + numPrecisionDigits;
    }
    if (allZeros) {
        signNeeded = false;
    }
    /*  Determine the input character range     */
    const readStart = ((digitsStart >= afterDot) || allZeros) ? (afterDot - 1) : digitsStart; // 0.000(1)234  ----> (0).0001234
    const readEnd = (digitsEnd < afterDot) ? (afterDot) : digitsEnd; // 12(3)000     ----> 123000( )
    /*  Compute various sub-ranges       */
    const nSign = (signNeeded ? 1 : 0); // (-)123.456
    const nBeforeDot = (nSign + (afterDot - readStart)); // (-123).456
    const nAfterDot = Math.max(readEnd - afterDot, 0); // -123.(456)
    const actualLength = (readEnd - readStart); // -(123.456)
    const desiredLength = (paddingMode === NO_PADDING$1)
        ? (actualLength) // -(123.456)
        : (precisionEnd - readStart); // -(123.456    )
    const pad = Math.max(desiredLength - actualLength, 0); //  -123.456(    )
    const padStart = (nBeforeDot + 1 + nAfterDot); //  -123.456( )
    const padEnd = (padStart + pad); //  -123.456     ( )
    const isInteger = (nAfterDot + pad) === 0; //  -123
    /*  Fill the output buffer with characters    */
    const out = new Uint8Array(nBeforeDot + (isInteger ? 0 : 1) + nAfterDot + pad);
    // ------------------------------------------------------------------------------------------ // ---------------------
    if (signNeeded)
        out[0] = MINUS; // -     minus sign
    for (i = nSign, j = readStart; i < nBeforeDot; i++, j++)
        out[i] = chars[j]; // 123   before dot
    if (!isInteger)
        out[nBeforeDot] = DOT; // .     dot
    for (i = nBeforeDot + 1, j = afterDot; i < padStart; i++, j++)
        out[i] = chars[j]; // 456   after dot
    for (i = padStart; i < padEnd; i++)
        out[i] = ZERO; // 000   padding
    /*  Build a string from the output buffer     */
    return String.fromCharCode(...out);
};
function omitZero$1(stringNumber) {
    if (stringNumber === undefined || stringNumber === '') {
        return undefined;
    }
    if (parseFloat(stringNumber) === 0) {
        return undefined;
    }
    return stringNumber;
}
/*  ------------------------------------------------------------------------ */

/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// Utilities
function assertNumber(n) {
    if (!Number.isSafeInteger(n))
        throw new Error(`Wrong integer: ${n}`);
}
function chain(...args) {
    // Wrap call in closure so JIT can inline calls
    const wrap = (a, b) => (c) => a(b(c));
    // Construct chain of args[-1].encode(args[-2].encode([...]))
    const encode = Array.from(args)
        .reverse()
        .reduce((acc, i) => (acc ? wrap(acc, i.encode) : i.encode), undefined);
    // Construct chain of args[0].decode(args[1].decode(...))
    const decode = args.reduce((acc, i) => (acc ? wrap(acc, i.decode) : i.decode), undefined);
    return { encode, decode };
}
// Encodes integer radix representation to array of strings using alphabet and back
function alphabet(alphabet) {
    return {
        encode: (digits) => {
            if (!Array.isArray(digits) || (digits.length && typeof digits[0] !== 'number'))
                throw new Error('alphabet.encode input should be an array of numbers');
            return digits.map((i) => {
                assertNumber(i);
                if (i < 0 || i >= alphabet.length)
                    throw new Error(`Digit index outside alphabet: ${i} (alphabet: ${alphabet.length})`);
                return alphabet[i];
            });
        },
        decode: (input) => {
            if (!Array.isArray(input) || (input.length && typeof input[0] !== 'string'))
                throw new Error('alphabet.decode input should be array of strings');
            return input.map((letter) => {
                if (typeof letter !== 'string')
                    throw new Error(`alphabet.decode: not string element=${letter}`);
                const index = alphabet.indexOf(letter);
                if (index === -1)
                    throw new Error(`Unknown letter: "${letter}". Allowed: ${alphabet}`);
                return index;
            });
        },
    };
}
function join(separator = '') {
    if (typeof separator !== 'string')
        throw new Error('join separator should be string');
    return {
        encode: (from) => {
            if (!Array.isArray(from) || (from.length && typeof from[0] !== 'string'))
                throw new Error('join.encode input should be array of strings');
            for (let i of from)
                if (typeof i !== 'string')
                    throw new Error(`join.encode: non-string input=${i}`);
            return from.join(separator);
        },
        decode: (to) => {
            if (typeof to !== 'string')
                throw new Error('join.decode input should be string');
            return to.split(separator);
        },
    };
}
// Pad strings array so it has integer number of bits
function padding(bits, chr = '=') {
    assertNumber(bits);
    if (typeof chr !== 'string')
        throw new Error('padding chr should be string');
    return {
        encode(data) {
            if (!Array.isArray(data) || (data.length && typeof data[0] !== 'string'))
                throw new Error('padding.encode input should be array of strings');
            for (let i of data)
                if (typeof i !== 'string')
                    throw new Error(`padding.encode: non-string input=${i}`);
            while ((data.length * bits) % 8)
                data.push(chr);
            return data;
        },
        decode(input) {
            if (!Array.isArray(input) || (input.length && typeof input[0] !== 'string'))
                throw new Error('padding.encode input should be array of strings');
            for (let i of input)
                if (typeof i !== 'string')
                    throw new Error(`padding.decode: non-string input=${i}`);
            let end = input.length;
            if ((end * bits) % 8)
                throw new Error('Invalid padding: string should have whole number of bytes');
            for (; end > 0 && input[end - 1] === chr; end--) {
                if (!(((end - 1) * bits) % 8))
                    throw new Error('Invalid padding: string has too much padding');
            }
            return input.slice(0, end);
        },
    };
}
function normalize(fn) {
    if (typeof fn !== 'function')
        throw new Error('normalize fn should be function');
    return { encode: (from) => from, decode: (to) => fn(to) };
}
// NOTE: it has quadratic time complexity
function convertRadix(data, from, to) {
    // base 1 is impossible
    if (from < 2)
        throw new Error(`convertRadix: wrong from=${from}, base cannot be less than 2`);
    if (to < 2)
        throw new Error(`convertRadix: wrong to=${to}, base cannot be less than 2`);
    if (!Array.isArray(data))
        throw new Error('convertRadix: data should be array');
    if (!data.length)
        return [];
    let pos = 0;
    const res = [];
    const digits = Array.from(data);
    digits.forEach((d) => {
        assertNumber(d);
        if (d < 0 || d >= from)
            throw new Error(`Wrong integer: ${d}`);
    });
    while (true) {
        let carry = 0;
        let done = true;
        for (let i = pos; i < digits.length; i++) {
            const digit = digits[i];
            const digitBase = from * carry + digit;
            if (!Number.isSafeInteger(digitBase) ||
                (from * carry) / from !== carry ||
                digitBase - digit !== from * carry) {
                throw new Error('convertRadix: carry overflow');
            }
            carry = digitBase % to;
            digits[i] = Math.floor(digitBase / to);
            if (!Number.isSafeInteger(digits[i]) || digits[i] * to + carry !== digitBase)
                throw new Error('convertRadix: carry overflow');
            if (!done)
                continue;
            else if (!digits[i])
                pos = i;
            else
                done = false;
        }
        res.push(carry);
        if (done)
            break;
    }
    for (let i = 0; i < data.length - 1 && data[i] === 0; i++)
        res.push(0);
    return res.reverse();
}
const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const radix2carry = (from, to) => from + (to - gcd(from, to));
// BigInt is 5x slower
function convertRadix2(data, from, to, padding) {
    if (!Array.isArray(data))
        throw new Error('convertRadix2: data should be array');
    if (from <= 0 || from > 32)
        throw new Error(`convertRadix2: wrong from=${from}`);
    if (to <= 0 || to > 32)
        throw new Error(`convertRadix2: wrong to=${to}`);
    if (radix2carry(from, to) > 32) {
        throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
    }
    let carry = 0;
    let pos = 0; // bitwise position in current element
    const mask = 2 ** to - 1;
    const res = [];
    for (const n of data) {
        assertNumber(n);
        if (n >= 2 ** from)
            throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
        carry = (carry << from) | n;
        if (pos + from > 32)
            throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
        pos += from;
        for (; pos >= to; pos -= to)
            res.push(((carry >> (pos - to)) & mask) >>> 0);
        carry &= 2 ** pos - 1; // clean carry, otherwise it will cause overflow
    }
    carry = (carry << (to - pos)) & mask;
    if (!padding && pos >= from)
        throw new Error('Excess padding');
    if (!padding && carry)
        throw new Error(`Non-zero padding: ${carry}`);
    if (padding && pos > 0)
        res.push(carry >>> 0);
    return res;
}
function radix(num) {
    assertNumber(num);
    return {
        encode: (bytes) => {
            if (!(bytes instanceof Uint8Array))
                throw new Error('radix.encode input should be Uint8Array');
            return convertRadix(Array.from(bytes), 2 ** 8, num);
        },
        decode: (digits) => {
            if (!Array.isArray(digits) || (digits.length && typeof digits[0] !== 'number'))
                throw new Error('radix.decode input should be array of strings');
            return Uint8Array.from(convertRadix(digits, num, 2 ** 8));
        },
    };
}
// If both bases are power of same number (like `2**8 <-> 2**64`),
// there is a linear algorithm. For now we have implementation for power-of-two bases only
function radix2(bits, revPadding = false) {
    assertNumber(bits);
    if (bits <= 0 || bits > 32)
        throw new Error('radix2: bits should be in (0..32]');
    if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32)
        throw new Error('radix2: carry overflow');
    return {
        encode: (bytes) => {
            if (!(bytes instanceof Uint8Array))
                throw new Error('radix2.encode input should be Uint8Array');
            return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
        },
        decode: (digits) => {
            if (!Array.isArray(digits) || (digits.length && typeof digits[0] !== 'number'))
                throw new Error('radix2.decode input should be array of strings');
            return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
        },
    };
}
function unsafeWrapper(fn) {
    if (typeof fn !== 'function')
        throw new Error('unsafeWrapper fn should be function');
    return function (...args) {
        try {
            return fn.apply(null, args);
        }
        catch (e) { }
    };
}
// RFC 4648 aka RFC 3548
// ---------------------
const base16 = chain(radix2(4), alphabet('0123456789abcdef'), join(''));
const base32 = chain(radix2(5), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), padding(5), join(''));
chain(radix2(5), alphabet('0123456789ABCDEFGHIJKLMNOPQRSTUV'), padding(5), join(''));
chain(radix2(5), alphabet('0123456789ABCDEFGHJKMNPQRSTVWXYZ'), join(''), normalize((s) => s.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1')));
const base64 = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'), padding(6), join(''));
const base64url = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'), padding(6), join(''));
// base58 code
// -----------
const genBase58 = (abc) => chain(radix(58), alphabet(abc), join(''));
const base58 = genBase58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
genBase58('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');
genBase58('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz');
// xmr ver is done in 8-byte blocks (which equals 11 chars in decoding). Last (non-full) block padded with '1' to size in XMR_BLOCK_LEN.
// Block encoding significantly reduces quadratic complexity of base58.
// Data len (index) -> encoded block len
const XMR_BLOCK_LEN = [0, 2, 3, 5, 6, 7, 9, 10, 11];
const base58xmr = {
    encode(data) {
        let res = '';
        for (let i = 0; i < data.length; i += 8) {
            const block = data.subarray(i, i + 8);
            res += base58.encode(block).padStart(XMR_BLOCK_LEN[block.length], '1');
        }
        return res;
    },
    decode(str) {
        let res = [];
        for (let i = 0; i < str.length; i += 11) {
            const slice = str.slice(i, i + 11);
            const blockLen = XMR_BLOCK_LEN.indexOf(slice.length);
            const block = base58.decode(slice);
            for (let j = 0; j < block.length - blockLen; j++) {
                if (block[j] !== 0)
                    throw new Error('base58xmr: wrong padding');
            }
            res = res.concat(Array.from(block.slice(block.length - blockLen)));
        }
        return Uint8Array.from(res);
    },
};
const BECH_ALPHABET = chain(alphabet('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), join(''));
const POLYMOD_GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
function bech32Polymod(pre) {
    const b = pre >> 25;
    let chk = (pre & 0x1ffffff) << 5;
    for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
        if (((b >> i) & 1) === 1)
            chk ^= POLYMOD_GENERATORS[i];
    }
    return chk;
}
function bechChecksum(prefix, words, encodingConst = 1) {
    const len = prefix.length;
    let chk = 1;
    for (let i = 0; i < len; i++) {
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126)
            throw new Error(`Invalid prefix (${prefix})`);
        chk = bech32Polymod(chk) ^ (c >> 5);
    }
    chk = bech32Polymod(chk);
    for (let i = 0; i < len; i++)
        chk = bech32Polymod(chk) ^ (prefix.charCodeAt(i) & 0x1f);
    for (let v of words)
        chk = bech32Polymod(chk) ^ v;
    for (let i = 0; i < 6; i++)
        chk = bech32Polymod(chk);
    chk ^= encodingConst;
    return BECH_ALPHABET.encode(convertRadix2([chk % 2 ** 30], 30, 5, false));
}
function genBech32(encoding) {
    const ENCODING_CONST = encoding === 'bech32' ? 1 : 0x2bc830a3;
    const _words = radix2(5);
    const fromWords = _words.decode;
    const toWords = _words.encode;
    const fromWordsUnsafe = unsafeWrapper(fromWords);
    function encode(prefix, words, limit = 90) {
        if (typeof prefix !== 'string')
            throw new Error(`bech32.encode prefix should be string, not ${typeof prefix}`);
        if (!Array.isArray(words) || (words.length && typeof words[0] !== 'number'))
            throw new Error(`bech32.encode words should be array of numbers, not ${typeof words}`);
        const actualLength = prefix.length + 7 + words.length;
        if (limit !== false && actualLength > limit)
            throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
        prefix = prefix.toLowerCase();
        return `${prefix}1${BECH_ALPHABET.encode(words)}${bechChecksum(prefix, words, ENCODING_CONST)}`;
    }
    function decode(str, limit = 90) {
        if (typeof str !== 'string')
            throw new Error(`bech32.decode input should be string, not ${typeof str}`);
        if (str.length < 8 || (limit !== false && str.length > limit))
            throw new TypeError(`Wrong string length: ${str.length} (${str}). Expected (8..${limit})`);
        // don't allow mixed case
        const lowered = str.toLowerCase();
        if (str !== lowered && str !== str.toUpperCase())
            throw new Error(`String must be lowercase or uppercase`);
        str = lowered;
        const sepIndex = str.lastIndexOf('1');
        if (sepIndex === 0 || sepIndex === -1)
            throw new Error(`Letter "1" must be present between prefix and data only`);
        const prefix = str.slice(0, sepIndex);
        const _words = str.slice(sepIndex + 1);
        if (_words.length < 6)
            throw new Error('Data must be at least 6 characters long');
        const words = BECH_ALPHABET.decode(_words).slice(0, -6);
        const sum = bechChecksum(prefix, words, ENCODING_CONST);
        if (!_words.endsWith(sum))
            throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
        return { prefix, words };
    }
    const decodeUnsafe = unsafeWrapper(decode);
    function decodeToBytes(str) {
        const { prefix, words } = decode(str, false);
        return { prefix, words, bytes: fromWords(words) };
    }
    return { encode, decode, decodeToBytes, decodeUnsafe, fromWords, fromWordsUnsafe, toWords };
}
genBech32('bech32');
genBech32('bech32m');
const utf8 = {
    encode: (data) => new TextDecoder().decode(data),
    decode: (str) => new TextEncoder().encode(str),
};
const hex = chain(radix2(4), alphabet('0123456789abcdef'), join(''), normalize((s) => {
    if (typeof s !== 'string' || s.length % 2)
        throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
    return s.toLowerCase();
}));
// prettier-ignore
const CODERS = {
    utf8, hex, base16, base32, base64, base64url, base58, base58xmr
};
`Invalid encoding type. Available types: ${Object.keys(CODERS).join(', ')}`;

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$8 = BigInt(0);
const _1n$8 = BigInt(1);
const _2n$5 = BigInt(2);
const u8a = (a) => a instanceof Uint8Array;
const hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    if (!u8a(bytes))
        throw new Error('Uint8Array expected');
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
    }
    return hex;
}
function numberToHexUnpadded(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    // Big Endian
    return BigInt(hex === '' ? '0' : `0x${hex}`);
}
// Caching slows it down 2-3x
function hexToBytes(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    if (hex.length % 2)
        throw new Error('hex string is invalid: unpadded ' + hex.length);
    const array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0)
            throw new Error('invalid byte sequence');
        array[i] = byte;
    }
    return array;
}
// Big Endian
function bytesToNumberBE(bytes) {
    return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
    if (!u8a(bytes))
        throw new Error('Uint8Array expected');
    return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
const numberToBytesBE = (n, len) => hexToBytes(n.toString(16).padStart(len * 2, '0'));
const numberToBytesLE = (n, len) => numberToBytesBE(n, len).reverse();
// Returns variable number bytes (minimal bigint encoding?)
const numberToVarBytesBE = (n) => hexToBytes(numberToHexUnpadded(n));
function ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === 'string') {
        try {
            res = hexToBytes(hex);
        }
        catch (e) {
            throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
        }
    }
    else if (u8a(hex)) {
        // Uint8Array.from() instead of hash.slice() because node.js Buffer
        // is instance of Uint8Array, and its slice() creates **mutable** copy
        res = Uint8Array.from(hex);
    }
    else {
        throw new Error(`${title} must be hex string or Uint8Array`);
    }
    const len = res.length;
    if (typeof expectedLength === 'number' && len !== expectedLength)
        throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
    return res;
}
// Copies several Uint8Arrays into one.
function concatBytes$1(...arrs) {
    const r = new Uint8Array(arrs.reduce((sum, a) => sum + a.length, 0));
    let pad = 0; // walk through each item, ensure they have proper type
    arrs.forEach((a) => {
        if (!u8a(a))
            throw new Error('Uint8Array expected');
        r.set(a, pad);
        pad += a.length;
    });
    return r;
}
function equalBytes(b1, b2) {
    // We don't care about timing attacks here
    if (b1.length !== b2.length)
        return false;
    for (let i = 0; i < b1.length; i++)
        if (b1[i] !== b2[i])
            return false;
    return true;
}
function utf8ToBytes$1(str) {
    if (typeof str !== 'string') {
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    }
    return new TextEncoder().encode(str);
}
// Bit operations
// Amount of bits inside bigint (Same as n.toString(2).length)
function bitLen(n) {
    let len;
    for (len = 0; n > 0n; n >>= _1n$8, len += 1)
        ;
    return len;
}
// Gets single bit at position. NOTE: first bit position is 0 (same as arrays)
// Same as !!+Array.from(n.toString(2)).reverse()[pos]
const bitGet = (n, pos) => (n >> BigInt(pos)) & 1n;
// Sets single bit at position
const bitSet = (n, pos, value) => n | ((value ? _1n$8 : _0n$8) << BigInt(pos));
// Return mask for N bits (Same as BigInt(`0b${Array(i).fill('1').join('')}`))
// Not using ** operator with bigints for old engines.
const bitMask = (n) => (_2n$5 << BigInt(n - 1)) - _1n$8;
// DRBG
const u8n = (data) => new Uint8Array(data); // creates Uint8Array
const u8fr = (arr) => Uint8Array.from(arr); // another shortcut
/**
 * Minimal HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
 * @returns function that will call DRBG until 2nd arg returns something meaningful
 * @example
 *   const drbg = createHmacDRBG<Key>(32, 32, hmac);
 *   drbg(seed, bytesToKey); // bytesToKey must return Key or undefined
 */
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== 'number' || hashLen < 2)
        throw new Error('hashLen must be a number');
    if (typeof qByteLen !== 'number' || qByteLen < 2)
        throw new Error('qByteLen must be a number');
    if (typeof hmacFn !== 'function')
        throw new Error('hmacFn must be a function');
    // Step B, Step C: set hashLen to 8*ceil(hlen/8)
    let v = u8n(hashLen); // Minimal non-full-spec HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
    let k = u8n(hashLen); // Steps B and C of RFC6979 3.2: set hashLen, in our case always same
    let i = 0; // Iterations counter, will throw when over 1000
    const reset = () => {
        v.fill(1);
        k.fill(0);
        i = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b); // hmac(k)(v, ...values)
    const reseed = (seed = u8n()) => {
        // HMAC-DRBG reseed() function. Steps D-G
        k = h(u8fr([0x00]), seed); // k = hmac(k || v || 0x00 || seed)
        v = h(); // v = hmac(k || v)
        if (seed.length === 0)
            return;
        k = h(u8fr([0x01]), seed); // k = hmac(k || v || 0x01 || seed)
        v = h(); // v = hmac(k || v)
    };
    const gen = () => {
        // HMAC-DRBG generate() function
        if (i++ >= 1000)
            throw new Error('drbg: tried 1000 values');
        let len = 0;
        const out = [];
        while (len < qByteLen) {
            v = h();
            const sl = v.slice();
            out.push(sl);
            len += v.length;
        }
        return concatBytes$1(...out);
    };
    const genUntil = (seed, pred) => {
        reset();
        reseed(seed); // Steps D-G
        let res = undefined; // Step H: grind until k is in [1..n-1]
        while (!(res = pred(gen())))
            reseed();
        reset();
        return res;
    };
    return genUntil;
}
// Validating curves and fields
const validatorFns = {
    bigint: (val) => typeof val === 'bigint',
    function: (val) => typeof val === 'function',
    boolean: (val) => typeof val === 'boolean',
    string: (val) => typeof val === 'string',
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === 'function' && Number.isSafeInteger(val.outputLen),
};
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
        const checkVal = validatorFns[type];
        if (typeof checkVal !== 'function')
            throw new Error(`Invalid validator "${type}", expected function`);
        const val = object[fieldName];
        if (isOptional && val === undefined)
            return;
        if (!checkVal(val, object)) {
            throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
        }
    };
    for (const [fieldName, type] of Object.entries(validators))
        checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
        checkField(fieldName, type, true);
    return object;
}
// validate type tests
// const o: { a: number; b: number; c: number } = { a: 1, b: 5, c: 6 };
// const z0 = validateObject(o, { a: 'isSafeInteger' }, { c: 'bigint' }); // Ok!
// // Should fail type-check
// const z1 = validateObject(o, { a: 'tmp' }, { c: 'zz' });
// const z2 = validateObject(o, { a: 'isSafeInteger' }, { c: 'zz' });
// const z3 = validateObject(o, { test: 'boolean', z: 'bug' });
// const z4 = validateObject(o, { a: 'boolean', z: 'bug' });

var ut = /*#__PURE__*/Object.freeze({
	__proto__: null,
	bytesToHex: bytesToHex,
	numberToHexUnpadded: numberToHexUnpadded,
	hexToNumber: hexToNumber,
	hexToBytes: hexToBytes,
	bytesToNumberBE: bytesToNumberBE,
	bytesToNumberLE: bytesToNumberLE,
	numberToBytesBE: numberToBytesBE,
	numberToBytesLE: numberToBytesLE,
	numberToVarBytesBE: numberToVarBytesBE,
	ensureBytes: ensureBytes,
	concatBytes: concatBytes$1,
	equalBytes: equalBytes,
	utf8ToBytes: utf8ToBytes$1,
	bitLen: bitLen,
	bitGet: bitGet,
	bitSet: bitSet,
	bitMask: bitMask,
	createHmacDrbg: createHmacDrbg,
	validateObject: validateObject
});

var qs = commonjsRequire("/$$rollup_base$$/js/src/static_dependencies/qs/index.cjs", "/$$rollup_base$$/js/src/static_dependencies/qs");

/* eslint-disable */
/*  ------------------------------------------------------------------------ */
const json$1 = (data, params = undefined) => JSON.stringify(data), isJsonEncodedObject$1 = object => ((typeof object === 'string') &&
    (object.length >= 2) &&
    ((object[0] === '{') || (object[0] === '['))), binaryToString = utf8.encode, stringToBinary = utf8.decode, stringToBase64$1 = string => base64.encode(utf8.decode(string)), base64ToString$1 = string => utf8.encode(base64.decode(string)), base64ToBinary$1 = base64.decode, binaryToBase64$1 = base64.encode, base16ToBinary$1 = base16.decode, binaryToBase16$1 = base16.encode, base58ToBinary$1 = base58.decode, binaryToBase58 = base58.encode, binaryConcat$1 = concatBytes$1, binaryConcatArray$1 = (arr) => concatBytes$1(...arr), urlencode$1 = object => qs.stringify(object), urlencodeNested$1 = object => qs.stringify(object) // implemented only in python
, urlencodeWithArrayRepeat$1 = object => qs.stringify(object, { arrayFormat: 'repeat' }), rawencode$1 = object => qs.stringify(object, { encode: false }), encode$1 = utf8.decode // lol
, decode$1 = utf8.encode
// Url-safe-base64 without equals signs, with + replaced by - and slashes replaced by underscores
, urlencodeBase64 = base64string => base64string.replace(/[=]+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_'), numberToLE$1 = (n, padding) => numberToBytesLE(BigInt(n), padding), numberToBE$1 = (n, padding) => numberToBytesBE(BigInt(n), padding);
/*  ------------------------------------------------------------------------ */

function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`Wrong positive integer: ${n}`);
}
function bool(b) {
    if (typeof b !== 'boolean')
        throw new Error(`Expected boolean, not ${b}`);
}
function bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array))
        throw new TypeError('Expected Uint8Array');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new TypeError(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
function hash$2(hash) {
    if (typeof hash !== 'function' || typeof hash.create !== 'function')
        throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(hash.outputLen);
    number(hash.blockLen);
}
function exists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}
const assert = {
    number,
    bool,
    bytes,
    hash: hash$2,
    exists,
    output,
};

const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;

/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const u32$1 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
// Cast array to view
const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
// The rotate right (circular right shift) operation for uint32
const rotr = (word, shift) => (word << (32 - shift)) | (word >>> shift);
// big-endian hardware is rare. Just in case someone still decides to run hashes:
// early-throw an error because we don't support BE yet.
const isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
if (!isLE)
    throw new Error('Non little-endian hardware is not supported');
Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'));
function utf8ToBytes(str) {
    if (typeof str !== 'string') {
        throw new TypeError(`utf8ToBytes expected string, got ${typeof str}`);
    }
    return new TextEncoder().encode(str);
}
function toBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes(data);
    if (!(data instanceof Uint8Array))
        throw new TypeError(`Expected input type is Uint8Array (got ${typeof data})`);
    return data;
}
/**
 * Concats Uint8Array-s into one; like `Buffer.concat([buf1, buf2])`
 * @example concatBytes(buf1, buf2)
 */
function concatBytes(...arrays) {
    if (!arrays.every((a) => a instanceof Uint8Array))
        throw new Error('Uint8Array list expected');
    if (arrays.length === 1)
        return arrays[0];
    const length = arrays.reduce((a, arr) => a + arr.length, 0);
    const result = new Uint8Array(length);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const arr = arrays[i];
        result.set(arr, pad);
        pad += arr.length;
    }
    return result;
}
// For runtime check if class implements interface
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
function wrapConstructor(hashConstructor) {
    const hashC = (message) => hashConstructor().update(toBytes(message)).digest();
    const tmp = hashConstructor();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashConstructor();
    return hashC;
}
function wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
}
/**
 * Secure PRNG. Uses `globalThis.crypto` or node.js crypto module.
 */
function randomBytes(bytesLength = 32) {
    if (crypto && typeof crypto.getRandomValues === 'function') {
        return crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
}

// HMAC (RFC 2104)
class HMAC extends Hash {
    constructor(hash, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        assert.hash(hash);
        const key = toBytes(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== 'function')
            throw new TypeError('Expected instance of class which extends utils.Hash');
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        // blockLen can be bigger than outputLen
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for (let i = 0; i < pad.length; i++)
            pad[i] ^= 0x36;
        this.iHash.update(pad);
        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
        this.oHash = hash.create();
        // Undo internal XOR && apply outer XOR
        for (let i = 0; i < pad.length; i++)
            pad[i] ^= 0x36 ^ 0x5c;
        this.oHash.update(pad);
        pad.fill(0);
    }
    update(buf) {
        assert.exists(this);
        this.iHash.update(buf);
        return this;
    }
    digestInto(out) {
        assert.exists(this);
        assert.bytes(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
    }
    _cloneInto(to) {
        // Create new instance without calling constructor since key already in state and we don't know it.
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
    }
    destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
    }
}
/**
 * HMAC: RFC2104 message authentication code.
 * @param hash - function that would be used e.g. sha256
 * @param key - message key
 * @param message - message data
 */
const hmac$2 = (hash, key, message) => new HMAC(hash, key).update(message).digest();
hmac$2.create = (hash, key) => new HMAC(hash, key);

/*  ------------------------------------------------------------------------ */
/*  ------------------------------------------------------------------------ */
const encoders = {
    binary: x => x,
    hex: base16.encode,
    base64: base64.encode,
};
/*  .............................................   */
const hash$1 = (request, hash, digest = 'hex') => {
    const binary = hash(request);
    return encoders[digest](binary);
};
/*  .............................................   */
const hmac$1 = (request, secret, hash, digest = 'hex') => {
    const binary = hmac$2(hash, secret, request);
    return encoders[digest](binary);
};
/*  .............................................   */
function ecdsa$1(request, secret, curve, prehash = null) {
    if (prehash) {
        request = hash$1(request, prehash, 'hex');
    }
    const signature = curve.sign(request, secret);
    return {
        'r': signature.r.toString(16),
        's': signature.s.toString(16),
        'v': signature.recovery,
    };
}
function eddsa(request, secret, curve) {
    // used for waves.exchange (that's why the output is base58)
    const signature = curve.sign(request, secret);
    return base58.encode(signature);
}
/*  ------------------------------------------------------------------------ */
// source: https://stackoverflow.com/a/18639975/1067003
function crc32$1(str, signed = false) {
    const crcTable = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
    if (crc32$1.table === undefined) {
        crc32$1.table = crcTable.split(' ').map(s => parseInt(s, 16));
    }
    let crc = -1;
    for (let i = 0; i < str.length; i++) {
        // eslint-disable-next-line
        crc = (crc >>> 8) ^ crc32$1.table[(crc ^ str.charCodeAt(i)) & 0xFF];
    }
    // eslint-disable-next-line
    const unsigned = (crc ^ (-1)) >>> 0;
    if (signed && (unsigned >= 0x80000000)) {
        return unsigned - 0x100000000;
    }
    else {
        return unsigned;
    }
}
/*  ------------------------------------------------------------------------ */

// @ts-nocheck
const now$1 = Date.now; // TODO: figure out how to utilize performance.now () properly – it's not as easy as it does not return a unix timestamp...
const microseconds$1 = () => now$1() * 1000; // TODO: utilize performance.now for that purpose
const milliseconds$1 = now$1;
const seconds$1 = () => Math.floor(now$1() / 1000);
const uuidv1$1 = () => {
    const biasSeconds = 12219292800; // seconds from 15th Oct 1572 to Jan 1st 1970
    const bias = biasSeconds * 10000000; // in hundreds of nanoseconds
    const time = microseconds$1() * 10 + bias;
    const timeHex = time.toString(16);
    const arranged = timeHex.slice(7, 15) + timeHex.slice(3, 7) + '1' + timeHex.slice(0, 3);
    // these should be random, but we're not making more than 10 requests per microsecond so who cares
    const clockId = '9696'; // a 14 bit number
    const macAddress = 'ff'.repeat(6);
    return arranged + clockId + macAddress;
};
const setTimeout_original = setTimeout;
const setTimeout_safe = (done, ms, setTimeout = setTimeout_original /* overrideable for mocking purposes */, targetTime = now$1() + ms) => {
    // avoid MAX_INT issue https://github.com/ccxt/ccxt/issues/10761
    if (ms >= 2147483647) {
        throw new Error('setTimeout() function was called with unrealistic value of ' + ms.toString());
    }
    // The built-in setTimeout function can fire its callback earlier than specified, so we
    // need to ensure that it does not happen: sleep recursively until `targetTime` is reached...
    let clearInnerTimeout = () => { };
    let active = true;
    const id = setTimeout(() => {
        active = true;
        const rest = targetTime - now$1();
        if (rest > 0) {
            clearInnerTimeout = setTimeout_safe(done, rest, setTimeout, targetTime); // try sleep more
        }
        else {
            done();
        }
    }, ms);
    return function clear() {
        if (active) {
            active = false; // dunno if IDs are unique on various platforms, so it's better to rely on this flag to exclude the possible cancellation of the wrong timer (if called after completion)
            clearTimeout(id);
        }
        clearInnerTimeout();
    };
};
class TimedOut extends Error {
    constructor() {
        const message = 'timed out';
        super(message);
        this.constructor = TimedOut;
        // // @ts-expect-error
        this.__proto__ = TimedOut.prototype;
        this.message = message;
    }
}
const iso8601$1 = (timestamp) => {
    let _timestampNumber = undefined;
    if (typeof timestamp === 'number') {
        _timestampNumber = Math.floor(timestamp);
    }
    else {
        _timestampNumber = parseInt(timestamp, 10);
    }
    // undefined, null and lots of nasty non-numeric values yield NaN
    if (Number.isNaN(_timestampNumber) || _timestampNumber < 0) {
        return undefined;
    }
    // last line of defence
    try {
        return new Date(_timestampNumber).toISOString();
    }
    catch (e) {
        return undefined;
    }
};
const parse8601$1 = (x) => {
    if (typeof x !== 'string' || !x) {
        return undefined;
    }
    if (x.match(/^[0-9]+$/)) {
        // a valid number in a string, not a date.
        return undefined;
    }
    if (x.indexOf('-') < 0 || x.indexOf(':') < 0) { // no date can be without a dash and a colon
        return undefined;
    }
    // last line of defence
    try {
        const candidate = Date.parse(((x.indexOf('+') >= 0) || (x.slice(-1) === 'Z')) ? x : (x + 'Z').replace(/\s(\d\d):/, 'T$1:'));
        if (Number.isNaN(candidate)) {
            return undefined;
        }
        return candidate;
    }
    catch (e) {
        return undefined;
    }
};
const parseDate$1 = (x) => {
    if (typeof x !== 'string' || !x) {
        return undefined;
    }
    if (x.indexOf('GMT') >= 0) {
        try {
            return Date.parse(x);
        }
        catch (e) {
            return undefined;
        }
    }
    return parse8601$1(x);
};
const rfc2616 = (timestamp = undefined) => new Date(timestamp).toUTCString();
const mdy = (timestamp, infix = '-') => {
    infix = infix || '';
    const date = new Date(timestamp);
    const Y = date.getUTCFullYear().toString();
    let m = date.getUTCMonth() + 1;
    let d = date.getUTCDate();
    m = m < 10 ? ('0' + m) : m.toString();
    d = d < 10 ? ('0' + d) : d.toString();
    return m + infix + d + infix + Y;
};
const ymd$1 = (timestamp, infix, fullYear = true) => {
    infix = infix || '';
    const date = new Date(timestamp);
    const intYear = date.getUTCFullYear();
    const year = fullYear ? intYear : (intYear - 2000);
    const Y = year.toString();
    let m = date.getUTCMonth() + 1;
    let d = date.getUTCDate();
    m = m < 10 ? ('0' + m) : m.toString();
    d = d < 10 ? ('0' + d) : d.toString();
    return Y + infix + m + infix + d;
};
const yymmdd$1 = (timestamp, infix = '') => ymd$1(timestamp, infix, false);
const yyyymmdd$1 = (timestamp, infix = '-') => ymd$1(timestamp, infix, true);
const ymdhms$1 = (timestamp, infix = ' ') => {
    const date = new Date(timestamp);
    const Y = date.getUTCFullYear();
    let m = date.getUTCMonth() + 1;
    let d = date.getUTCDate();
    let H = date.getUTCHours();
    let M = date.getUTCMinutes();
    let S = date.getUTCSeconds();
    m = m < 10 ? ('0' + m) : m;
    d = d < 10 ? ('0' + d) : d;
    H = H < 10 ? ('0' + H) : H;
    M = M < 10 ? ('0' + M) : M;
    S = S < 10 ? ('0' + S) : S;
    return Y + '-' + m + '-' + d + infix + H + ':' + M + ':' + S;
};
const sleep = (ms) => new Promise((resolve) => setTimeout_safe(resolve, ms));
const timeout = async (ms, promise) => {
    let clear = () => { };
    const expires = new Promise((resolve) => (clear = setTimeout_safe(resolve, ms)));
    try {
        return await Promise.race([promise, expires.then(() => {
                throw new TimedOut();
            })]);
    }
    finally {
        clear(); // fixes https://github.com/ccxt/ccxt/issues/749
    }
};

//@ts-nocheck
/*  ------------------------------------------------------------------------ */
class Throttler$1 {
    constructor(config) {
        this.config = {
            'refillRate': 1.0,
            'delay': 0.001,
            'capacity': 1.0,
            'maxCapacity': 2000,
            'tokens': 0,
            'cost': 1.0,
        };
        Object.assign(this.config, config);
        this.queue = [];
        this.running = false;
    }
    async loop() {
        let lastTimestamp = now$1();
        while (this.running) {
            const { resolver, cost } = this.queue[0];
            if (this.config['tokens'] >= 0) {
                this.config['tokens'] -= cost;
                resolver();
                this.queue.shift();
                // contextswitch
                await Promise.resolve();
                if (this.queue.length === 0) {
                    this.running = false;
                }
            }
            else {
                await sleep(this.config['delay'] * 1000);
                const current = now$1();
                const elapsed = current - lastTimestamp;
                lastTimestamp = current;
                const tokens = this.config['tokens'] + (this.config['refillRate'] * elapsed);
                this.config['tokens'] = Math.min(tokens, this.config['capacity']);
            }
        }
    }
    throttle(cost = undefined) {
        let resolver;
        const promise = new Promise((resolve, reject) => {
            resolver = resolve;
        });
        if (this.queue.length > this.config['maxCapacity']) {
            throw new Error('throttle queue is over maxCapacity (' + this.config['maxCapacity'].toString() + '), see https://github.com/ccxt/ccxt/issues/11645#issuecomment-1195695526');
        }
        cost = (cost === undefined) ? this.config['cost'] : cost;
        this.queue.push({ resolver, cost });
        if (!this.running) {
            this.running = true;
            this.loop();
        }
        return promise;
    }
}
// ----------------------------------------

/* eslint-disable max-classes-per-file */
// import { errorHierarchy } from './errorHierarchy.js';
// Commented out since I'm not sure this is mandatory anymore
// and does not work out of the box with esm
// /*  ------------------------------------------------------------------------ */
// function subclass (BaseClass, classes, namespace = {}) {
//     for (const [className, subclasses] of Object.entries (classes)) {
//         const Class = Object.assign (namespace, {
//         /*  By creating a named property, we trick compiler to assign our class constructor function a name.
//             Otherwise, all our error constructors would be shown as [Function: Error] in the debugger! And
//             the super-useful `e.constructor.name` magic wouldn't work — we then would have no chance to
//             obtain a error type string from an error instance programmatically!                               */
//             [className]: class extends BaseClass {
//                 constructor (message) {
//                     super (message)
//                 /*  A workaround to make `instanceof` work on custom Error classes in transpiled ES5.
//                     See my blog post for the explanation of this hack:
//                     https://medium.com/@xpl/javascript-deriving-from-error-properly-8d2f8f315801        */
//                     this.constructor = Class
//                     this.__proto__   = Class.prototype
//                     this.name        = className
//                     this.message     = message
//                     // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
//                     Object.setPrototypeOf (this, Class.prototype)
//                 }
//             }
//         })[className]
//         subclass (Class, subclasses, namespace)
//     }
//     return namespace
// }
class BaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BaseError';
    }
}
// Exchange Error errors
class ExchangeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExchangeError';
    }
}
class AuthenticationError extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}
class PermissionDenied extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'PermissionDenied';
    }
}
class AccountNotEnabled extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'AccountNotEnabled';
    }
}
class AccountSuspended extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'AccountSuspended';
    }
}
class ArgumentsRequired extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'ArgumentsRequired';
    }
}
class BadRequest extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'BadRequest';
    }
}
class BadSymbol extends BadRequest {
    constructor(message) {
        super(message);
        this.name = 'BadSymbol';
    }
}
class MarginModeAlreadySet extends BadRequest {
    constructor(message) {
        super(message);
        this.name = 'MarginModeAlreadySet';
    }
}
class BadResponse extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'BadResponse';
    }
}
class NullResponse extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'NullResponse';
    }
}
class InsufficientFunds extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'InsufficientFunds';
    }
}
class InvalidAddress extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'InvalidAddress';
    }
}
class AddressPending extends InvalidAddress {
    constructor(message) {
        super(message);
        this.name = 'AddressPending';
    }
}
class InvalidOrder extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'InvalidOrder';
    }
}
class OrderNotFound extends InvalidOrder {
    constructor(message) {
        super(message);
        this.name = 'OrderNotFound';
    }
}
class OrderNotCached extends InvalidOrder {
    constructor(message) {
        super(message);
        this.name = 'OrderNotCached';
    }
}
class CancelPending extends InvalidOrder {
    constructor(message) {
        super(message);
        this.name = 'CancelPending';
    }
}
class OrderImmediatelyFillable extends InvalidOrder {
    constructor(message) {
        super(message);
        this.name = 'OrderImmediatelyFillable';
    }
}
class OrderNotFillable extends InvalidOrder {
    constructor(message) {
        super(message);
        this.name = 'OrderNotFillable';
    }
}
class DuplicateOrderId extends InvalidOrder {
    constructor(message) {
        super(message);
        this.name = 'DuplicateOrderId';
    }
}
class NotSupported extends ExchangeError {
    constructor(message) {
        super(message);
        this.name = 'NotSupported';
    }
}
// Network error
class NetworkError extends BaseError {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}
class DDoSProtection extends NetworkError {
    constructor(message) {
        super(message);
        this.name = 'DDoSProtection';
    }
}
class RateLimitExceeded extends DDoSProtection {
    constructor(message) {
        super(message);
        this.name = 'RateLimitExceeded';
    }
}
class ExchangeNotAvailable extends NetworkError {
    constructor(message) {
        super(message);
        this.name = 'ExchangeNotAvailable';
    }
}
class OnMaintenance extends ExchangeNotAvailable {
    constructor(message) {
        super(message);
        this.name = 'OnMaintenance';
    }
}
class InvalidNonce extends NetworkError {
    constructor(message) {
        super(message);
        this.name = 'InvalidNonce';
    }
}
class RequestTimeout extends NetworkError {
    constructor(message) {
        super(message);
        this.name = 'RequestTimeout';
    }
}
/*  ------------------------------------------------------------------------ */
// export default subclass (
//     // Root class
//     Error,
//     // Derived class hierarchy
//     errorHierarchy
// )
const errors = { BaseError, ExchangeError, PermissionDenied, AccountNotEnabled, AccountSuspended, ArgumentsRequired, BadRequest, BadSymbol, MarginModeAlreadySet, BadResponse, NullResponse, InsufficientFunds, InvalidAddress, InvalidOrder, OrderNotFound, OrderNotCached, CancelPending, OrderImmediatelyFillable, OrderNotFillable, DuplicateOrderId, NotSupported, NetworkError, DDoSProtection, RateLimitExceeded, ExchangeNotAvailable, OnMaintenance, InvalidNonce, RequestTimeout, AuthenticationError, AddressPending };

var errors$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	BaseError: BaseError,
	ExchangeError: ExchangeError,
	PermissionDenied: PermissionDenied,
	AccountNotEnabled: AccountNotEnabled,
	AccountSuspended: AccountSuspended,
	ArgumentsRequired: ArgumentsRequired,
	BadRequest: BadRequest,
	BadSymbol: BadSymbol,
	MarginModeAlreadySet: MarginModeAlreadySet,
	BadResponse: BadResponse,
	NullResponse: NullResponse,
	InsufficientFunds: InsufficientFunds,
	InvalidAddress: InvalidAddress,
	InvalidOrder: InvalidOrder,
	OrderNotFound: OrderNotFound,
	OrderNotCached: OrderNotCached,
	CancelPending: CancelPending,
	OrderImmediatelyFillable: OrderImmediatelyFillable,
	OrderNotFillable: OrderNotFillable,
	DuplicateOrderId: DuplicateOrderId,
	NotSupported: NotSupported,
	NetworkError: NetworkError,
	DDoSProtection: DDoSProtection,
	RateLimitExceeded: RateLimitExceeded,
	ExchangeNotAvailable: ExchangeNotAvailable,
	OnMaintenance: OnMaintenance,
	InvalidNonce: InvalidNonce,
	RequestTimeout: RequestTimeout,
	AuthenticationError: AuthenticationError,
	AddressPending: AddressPending,
	'default': errors
});

//-------------------------------------------------------------------------
// converts timeframe to seconds
const parseTimeframe$1 = (timeframe) => {
    const amount = asFloat(timeframe.slice(0, -1));
    const unit = timeframe.slice(-1);
    let scale = undefined;
    if (unit === 'y') {
        scale = 60 * 60 * 24 * 365;
    }
    else if (unit === 'M') {
        scale = 60 * 60 * 24 * 30;
    }
    else if (unit === 'w') {
        scale = 60 * 60 * 24 * 7;
    }
    else if (unit === 'd') {
        scale = 60 * 60 * 24;
    }
    else if (unit === 'h') {
        scale = 60 * 60;
    }
    else if (unit === 'm') {
        scale = 60;
    }
    else if (unit === 's') {
        scale = 1;
    }
    else {
        throw new NotSupported('timeframe unit ' + unit + ' is not supported');
    }
    return amount * scale;
};
const roundTimeframe = (timeframe, timestamp, direction = ROUND_DOWN) => {
    const ms = parseTimeframe$1(timeframe) * 1000;
    // Get offset based on timeframe in milliseconds
    const offset = timestamp % ms;
    return timestamp - offset + ((direction === ROUND_UP) ? ms : 0);
};
// given a sorted arrays of trades (recent last) and a timeframe builds an array of OHLCV candles
const buildOHLCVC$1 = (trades, timeframe = '1m', since = -Infinity, limit = Infinity) => {
    const ms = parseTimeframe$1(timeframe) * 1000;
    const ohlcvs = [];
    const [timestamp, /* open */ , high, low, close, volume, count] = [0, 1, 2, 3, 4, 5, 6];
    const oldest = Math.min(trades.length - 1, limit);
    for (let i = 0; i <= oldest; i++) {
        const trade = trades[i];
        if (trade.timestamp < since) {
            continue;
        }
        const openingTime = Math.floor(trade.timestamp / ms) * ms; // shift to the edge of m/h/d (but not M)
        const candle = ohlcvs.length - 1;
        if (candle === -1 || openingTime >= ohlcvs[candle][timestamp] + ms) {
            // moved to a new timeframe -> create a new candle from opening trade
            ohlcvs.push([
                openingTime,
                trade.price,
                trade.price,
                trade.price,
                trade.price,
                trade.amount,
                1, // count
            ]);
        }
        else {
            // still processing the same timeframe -> update opening trade
            ohlcvs[candle][high] = Math.max(ohlcvs[candle][high], trade.price);
            ohlcvs[candle][low] = Math.min(ohlcvs[candle][low], trade.price);
            ohlcvs[candle][close] = trade.price;
            ohlcvs[candle][volume] += trade.amount;
            ohlcvs[candle][count]++;
        } // if
    } // for
    return ohlcvs;
};
const extractParams$1 = (string) => {
    const re = /{([\w-]+)}/g;
    const matches = [];
    let match = re.exec(string);
    while (match) {
        matches.push(match[1]);
        match = re.exec(string);
    }
    return matches;
};
const implodeParams$1 = (string, params) => {
    if (!Array.isArray(params)) {
        const keys = Object.keys(params);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!Array.isArray(params[key])) {
                string = string.replace('{' + key + '}', params[key]);
            }
        }
    }
    return string;
};
function vwap$1(baseVolume, quoteVolume) {
    return ((baseVolume !== undefined) && (quoteVolume !== undefined) && (baseVolume > 0)) ? (quoteVolume / baseVolume) : undefined;
}
/*  ------------------------------------------------------------------------ */
function aggregate$1(bidasks) {
    const result = {};
    for (let i = 0; i < bidasks.length; i++) {
        const [price, volume] = bidasks[i];
        if (volume > 0) {
            result[price] = (result[price] || 0) + volume;
        }
    }
    return Object.keys(result).map((price) => [parseFloat(price), parseFloat(result[price])]);
}
/*  ------------------------------------------------------------------------ */

/*  ------------------------------------------------------------------------ */
/*  ------------------------------------------------------------------------ */

var functions = /*#__PURE__*/Object.freeze({
	__proto__: null,
	isBrowser: isBrowser,
	isElectron: isElectron,
	isWebWorker: isWebWorker,
	isNode: isNode$1,
	isWindows: isWindows,
	keys: keys$1,
	values: values$1,
	extend: extend$1,
	clone: clone$2,
	index: index$1,
	ordered: ordered$1,
	unique: unique$1,
	arrayConcat: arrayConcat$1,
	inArray: inArray$1,
	toArray: toArray$1,
	isEmpty: isEmpty$1,
	keysort: keysort$1,
	indexBy: indexBy$1,
	groupBy: groupBy$1,
	filterBy: filterBy$1,
	sortBy: sortBy$1,
	sortBy2: sortBy2$1,
	flatten: flatten$1,
	pluck: pluck,
	omit: omit$1,
	sum: sum$1,
	deepExtend: deepExtend$1,
	merge: merge$1,
	uuid: uuid$1,
	uuid16: uuid16$1,
	uuid22: uuid22$1,
	unCamelCase: unCamelCase$1,
	capitalize: capitalize$1,
	strip: strip$1,
	isNumber: isNumber,
	isInteger: isInteger,
	isArray: isArray$1,
	isObject: isObject,
	isString: isString,
	isStringCoercible: isStringCoercible,
	isDictionary: isDictionary,
	hasProps: hasProps,
	prop: prop,
	asFloat: asFloat,
	asInteger: asInteger,
	safeFloat: safeFloat$1,
	safeInteger: safeInteger$1,
	safeIntegerProduct: safeIntegerProduct$1,
	safeTimestamp: safeTimestamp$1,
	safeValue: safeValue$1,
	safeString: safeString$1,
	safeStringLower: safeStringLower$1,
	safeStringUpper: safeStringUpper$1,
	safeFloat2: safeFloat2$1,
	safeInteger2: safeInteger2$1,
	safeIntegerProduct2: safeIntegerProduct2$1,
	safeTimestamp2: safeTimestamp2$1,
	safeValue2: safeValue2$1,
	safeString2: safeString2$1,
	safeStringLower2: safeStringLower2$1,
	safeStringUpper2: safeStringUpper2$1,
	safeFloatN: safeFloatN$1,
	safeIntegerN: safeIntegerN$1,
	safeIntegerProductN: safeIntegerProductN$1,
	safeTimestampN: safeTimestampN$1,
	safeValueN: safeValueN$1,
	safeStringN: safeStringN$1,
	safeStringLowerN: safeStringLowerN$1,
	safeStringUpperN: safeStringUpperN$1,
	numberToString: numberToString$1,
	precisionFromString: precisionFromString$1,
	decimalToPrecision: decimalToPrecision$1,
	truncate_to_string: truncate_to_string,
	truncate: truncate,
	omitZero: omitZero$1,
	precisionConstants: precisionConstants,
	ROUND: ROUND$1,
	TRUNCATE: TRUNCATE$1,
	ROUND_UP: ROUND_UP,
	ROUND_DOWN: ROUND_DOWN,
	DECIMAL_PLACES: DECIMAL_PLACES$1,
	SIGNIFICANT_DIGITS: SIGNIFICANT_DIGITS,
	TICK_SIZE: TICK_SIZE$1,
	NO_PADDING: NO_PADDING$1,
	PAD_WITH_ZERO: PAD_WITH_ZERO,
	json: json$1,
	isJsonEncodedObject: isJsonEncodedObject$1,
	binaryToString: binaryToString,
	stringToBinary: stringToBinary,
	stringToBase64: stringToBase64$1,
	base64ToBinary: base64ToBinary$1,
	base64ToString: base64ToString$1,
	binaryToBase64: binaryToBase64$1,
	base16ToBinary: base16ToBinary$1,
	binaryToBase16: binaryToBase16$1,
	binaryConcat: binaryConcat$1,
	binaryConcatArray: binaryConcatArray$1,
	urlencode: urlencode$1,
	urlencodeWithArrayRepeat: urlencodeWithArrayRepeat$1,
	rawencode: rawencode$1,
	encode: encode$1,
	decode: decode$1,
	urlencodeBase64: urlencodeBase64,
	numberToLE: numberToLE$1,
	numberToBE: numberToBE$1,
	base58ToBinary: base58ToBinary$1,
	binaryToBase58: binaryToBase58,
	urlencodeNested: urlencodeNested$1,
	hash: hash$1,
	hmac: hmac$1,
	crc32: crc32$1,
	ecdsa: ecdsa$1,
	eddsa: eddsa,
	now: now$1,
	microseconds: microseconds$1,
	milliseconds: milliseconds$1,
	seconds: seconds$1,
	iso8601: iso8601$1,
	parse8601: parse8601$1,
	rfc2616: rfc2616,
	uuidv1: uuidv1$1,
	parseDate: parseDate$1,
	mdy: mdy,
	ymd: ymd$1,
	yymmdd: yymmdd$1,
	yyyymmdd: yyyymmdd$1,
	ymdhms: ymdhms$1,
	setTimeout_safe: setTimeout_safe,
	sleep: sleep,
	TimedOut: TimedOut,
	timeout: timeout,
	Throttler: Throttler$1,
	aggregate: aggregate$1,
	parseTimeframe: parseTimeframe$1,
	roundTimeframe: roundTimeframe,
	buildOHLCVC: buildOHLCVC$1,
	implodeParams: implodeParams$1,
	extractParams: extractParams$1,
	vwap: vwap$1
});

const zero = BigInt(0);
const minusOne = BigInt(-1);
const base = BigInt(10);
class Precise {
    constructor(number, decimals = undefined) {
        this.decimals = undefined;
        this.integer = undefined;
        this.base = undefined;
        if (decimals === undefined) {
            let modifier = 0;
            number = number.toLowerCase();
            if (number.indexOf('e') > -1) {
                [number, modifier] = number.split('e');
                modifier = parseInt(modifier.toString());
            }
            const decimalIndex = number.indexOf('.');
            this.decimals = (decimalIndex > -1) ? number.length - decimalIndex - 1 : 0;
            const integerString = number.replace('.', '');
            this.integer = BigInt(integerString);
            this.decimals = this.decimals - modifier;
        }
        else {
            this.integer = number;
            this.decimals = decimals;
        }
    }
    mul(other) {
        // other must be another instance of Precise
        const integerResult = this.integer * other.integer;
        return new Precise(integerResult, this.decimals + other.decimals);
    }
    div(other, precision = 18) {
        const distance = precision - this.decimals + other.decimals;
        let numerator = undefined;
        if (distance === 0) {
            numerator = this.integer;
        }
        else if (distance < 0) {
            const exponent = base ** BigInt(-distance);
            numerator = this.integer / exponent;
        }
        else {
            const exponent = base ** BigInt(distance);
            numerator = this.integer * exponent;
        }
        const result = numerator / other.integer;
        return new Precise(result, precision);
    }
    add(other) {
        if (this.decimals === other.decimals) {
            const integerResult = this.integer + other.integer;
            return new Precise(integerResult, this.decimals);
        }
        else {
            const [smaller, bigger] = (this.decimals > other.decimals) ? [other, this] : [this, other];
            const exponent = bigger.decimals - smaller.decimals;
            const normalised = smaller.integer * (base ** BigInt(exponent));
            const result = normalised + bigger.integer;
            return new Precise(result, bigger.decimals);
        }
    }
    mod(other) {
        const rationizerNumerator = Math.max(-this.decimals + other.decimals, 0);
        const numerator = this.integer * (base ** BigInt(rationizerNumerator));
        const rationizerDenominator = Math.max(-other.decimals + this.decimals, 0);
        const denominator = other.integer * (base ** BigInt(rationizerDenominator));
        const result = numerator % denominator;
        return new Precise(result, rationizerDenominator + other.decimals);
    }
    sub(other) {
        const negative = new Precise(-other.integer, other.decimals);
        return this.add(negative);
    }
    abs() {
        return new Precise(this.integer < 0 ? this.integer * minusOne : this.integer, this.decimals);
    }
    neg() {
        return new Precise(-this.integer, this.decimals);
    }
    min(other) {
        return this.lt(other) ? this : other;
    }
    max(other) {
        return this.gt(other) ? this : other;
    }
    gt(other) {
        const sum = this.sub(other);
        return sum.integer > 0;
    }
    ge(other) {
        const sum = this.sub(other);
        return sum.integer >= 0;
    }
    lt(other) {
        return other.gt(this);
    }
    le(other) {
        return other.ge(this);
    }
    reduce() {
        const string = this.integer.toString();
        const start = string.length - 1;
        if (start === 0) {
            if (string === '0') {
                this.decimals = 0;
            }
            return this;
        }
        let i;
        for (i = start; i >= 0; i--) {
            if (string.charAt(i) !== '0') {
                break;
            }
        }
        const difference = start - i;
        if (difference === 0) {
            return this;
        }
        this.decimals -= difference;
        this.integer = BigInt(string.slice(0, i + 1));
    }
    equals(other) {
        this.reduce();
        other.reduce();
        return (this.decimals === other.decimals) && (this.integer === other.integer);
    }
    toString() {
        this.reduce();
        let sign;
        let abs;
        if (this.integer < 0) {
            sign = '-';
            abs = -this.integer;
        }
        else {
            sign = '';
            abs = this.integer;
        }
        const integerArray = Array.from(abs.toString(Number(base)).padStart(this.decimals, '0'));
        const index = integerArray.length - this.decimals;
        let item;
        if (index === 0) {
            // if we are adding to the front
            item = '0.';
        }
        else if (this.decimals < 0) {
            item = '0'.repeat(-this.decimals);
        }
        else if (this.decimals === 0) {
            item = '';
        }
        else {
            item = '.';
        }
        integerArray.splice(index, 0, item);
        return sign + integerArray.join('');
    }
    static stringMul(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).mul(new Precise(string2)).toString();
    }
    static stringDiv(string1, string2, precision = 18) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        const string2Precise = new Precise(string2);
        if (string2Precise.integer === zero) {
            return undefined;
        }
        return (new Precise(string1)).div(string2Precise, precision).toString();
    }
    static stringAdd(string1, string2) {
        if ((string1 === undefined) && (string2 === undefined)) {
            return undefined;
        }
        if (string1 === undefined) {
            return string2;
        }
        else if (string2 === undefined) {
            return string1;
        }
        return (new Precise(string1)).add(new Precise(string2)).toString();
    }
    static stringSub(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).sub(new Precise(string2)).toString();
    }
    static stringAbs(string) {
        if (string === undefined) {
            return undefined;
        }
        return (new Precise(string)).abs().toString();
    }
    static stringNeg(string) {
        if (string === undefined) {
            return undefined;
        }
        return (new Precise(string)).neg().toString();
    }
    static stringMod(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).mod(new Precise(string2)).toString();
    }
    static stringEquals(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).equals(new Precise(string2));
    }
    static stringEq(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).equals(new Precise(string2));
    }
    static stringMin(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).min(new Precise(string2)).toString();
    }
    static stringMax(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).max(new Precise(string2)).toString();
    }
    static stringGt(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).gt(new Precise(string2));
    }
    static stringGe(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).ge(new Precise(string2));
    }
    static stringLt(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).lt(new Precise(string2));
    }
    static stringLe(string1, string2) {
        if ((string1 === undefined) || (string2 === undefined)) {
            return undefined;
        }
        return (new Precise(string1)).le(new Precise(string2));
    }
}

// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// aliases for shorter compressed code (most minifers don't do this)
var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
// fixed length extra bits
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
// fixed distance extra bits
// see fleb note
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
// code length index map
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
// get base, reverse index map from extra bits
var freb = function (eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
    }
    // numbers here are at max 18 bits
    var r = new u32(b[30]);
    for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
            r[j] = ((j - b[i]) << 5) | i;
        }
    }
    return [b, r];
};
var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b[0];
// map of value to reverse (assuming 16 bits)
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
    // reverse table algorithm from SO
    var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
    x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
    x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
    rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
var hMap = (function (cd, mb, r) {
    var s = cd.length;
    // index
    var i = 0;
    // u16 "map": index -> # of codes with bit length = index
    var l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for (; i < s; ++i) {
        if (cd[i])
            ++l[cd[i] - 1];
    }
    // u16 "map": index -> minimum code for bit length = index
    var le = new u16(mb);
    for (i = 0; i < mb; ++i) {
        le[i] = (le[i - 1] + l[i - 1]) << 1;
    }
    var co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                var sv = (i << 4) | cd[i];
                // free bits
                var r_1 = mb - cd[i];
                // start value
                var v = le[cd[i] - 1]++ << r_1;
                // m is end value
                for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >>> rvb] = sv;
                }
            }
        }
    }
    else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
            if (cd[i]) {
                co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
            }
        }
    }
    return co;
});
// fixed length tree
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
    flt[i] = 8;
for (var i = 144; i < 256; ++i)
    flt[i] = 9;
for (var i = 256; i < 280; ++i)
    flt[i] = 7;
for (var i = 280; i < 288; ++i)
    flt[i] = 8;
// fixed distance tree
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
// fixed length map
var flrm = /*#__PURE__*/ hMap(flt, 9, 1);
// fixed distance map
var fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
// find max of array
var max$1 = function (a) {
    var m = a[0];
    for (var i = 1; i < a.length; ++i) {
        if (a[i] > m)
            m = a[i];
    }
    return m;
};
// read d, starting at bit p and mask with m
var bits = function (d, p, m) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
};
// read d, starting at bit p continuing for at least 16 bits
var bits16 = function (d, p) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
};
// get end of byte
var shft = function (p) { return ((p + 7) / 8) | 0; };
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
var slc = function (v, s, e) {
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    // can't use .constructor in case user-supplied
    var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
    n.set(v.subarray(s, e));
    return n;
};
// error codes
var ec = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    ,
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data'
    // determined by unknown compression method
];
var err = function (ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
    if (!nt)
        throw e;
    return e;
};
// expands raw DEFLATE data
var inflt = function (dat, buf, st) {
    // source length
    var sl = dat.length;
    if (!sl || (st && st.f && !st.l))
        return buf || new u8(0);
    // have to estimate size
    var noBuf = !buf || st;
    // no state
    var noSt = !st || st.i;
    if (!st)
        st = {};
    // Assumes roughly 33% compression ratio average
    if (!buf)
        buf = new u8(sl * 3);
    // ensure buffer can fit at least l elements
    var cbuf = function (l) {
        var bl = buf.length;
        // need to increase size to fit
        if (l > bl) {
            // Double or set to necessary, whichever is greater
            var nbuf = new u8(Math.max(bl * 2, l));
            nbuf.set(buf);
            buf = nbuf;
        }
    };
    //  last chunk         bitpos           bytes
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    // total bits
    var tbts = sl * 8;
    do {
        if (!lm) {
            // BFINAL - this is only 1 when last chunk is next
            final = bits(dat, pos, 1);
            // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
                // go to end of byte boundary
                var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                if (t > sl) {
                    if (noSt)
                        err(0);
                    break;
                }
                // ensure size
                if (noBuf)
                    cbuf(bt + l);
                // Copy over uncompressed data
                buf.set(dat.subarray(s, t), bt);
                // Get new bitpos, update byte count
                st.b = bt += l, st.p = pos = t * 8, st.f = final;
                continue;
            }
            else if (type == 1)
                lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
                //  literal                            lengths
                var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                var tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                // length+distance tree
                var ldt = new u8(tl);
                // code length tree
                var clt = new u8(19);
                for (var i = 0; i < hcLen; ++i) {
                    // use index map to get real code
                    clt[clim[i]] = bits(dat, pos + i * 3, 7);
                }
                pos += hcLen * 3;
                // code lengths bits
                var clb = max$1(clt), clbmsk = (1 << clb) - 1;
                // code lengths map
                var clm = hMap(clt, clb, 1);
                for (var i = 0; i < tl;) {
                    var r = clm[bits(dat, pos, clbmsk)];
                    // bits read
                    pos += r & 15;
                    // symbol
                    var s = r >>> 4;
                    // code length to copy
                    if (s < 16) {
                        ldt[i++] = s;
                    }
                    else {
                        //  copy   count
                        var c = 0, n = 0;
                        if (s == 16)
                            n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                        else if (s == 17)
                            n = 3 + bits(dat, pos, 7), pos += 3;
                        else if (s == 18)
                            n = 11 + bits(dat, pos, 127), pos += 7;
                        while (n--)
                            ldt[i++] = c;
                    }
                }
                //    length tree                 distance tree
                var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                // max length bits
                lbt = max$1(lt);
                // max dist bits
                dbt = max$1(dt);
                lm = hMap(lt, lbt, 1);
                dm = hMap(dt, dbt, 1);
            }
            else
                err(1);
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
        }
        // Make sure the buffer can hold this + the largest possible addition
        // Maximum chunk size (practically, theoretically infinite) is 2^17;
        if (noBuf)
            cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for (;; lpos = pos) {
            // bits read, code
            var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
            pos += c & 15;
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
            if (!c)
                err(2);
            if (sym < 256)
                buf[bt++] = sym;
            else if (sym == 256) {
                lpos = pos, lm = null;
                break;
            }
            else {
                var add = sym - 254;
                // no extra bits needed if less
                if (sym > 264) {
                    // index
                    var i = sym - 257, b = fleb[i];
                    add = bits(dat, pos, (1 << b) - 1) + fl[i];
                    pos += b;
                }
                // dist
                var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                if (!d)
                    err(3);
                pos += d & 15;
                var dt = fd[dsym];
                if (dsym > 3) {
                    var b = fdeb[dsym];
                    dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                }
                if (pos > tbts) {
                    if (noSt)
                        err(0);
                    break;
                }
                if (noBuf)
                    cbuf(bt + 131072);
                var end = bt + add;
                for (; bt < end; bt += 4) {
                    buf[bt] = buf[bt - dt];
                    buf[bt + 1] = buf[bt + 1 - dt];
                    buf[bt + 2] = buf[bt + 2 - dt];
                    buf[bt + 3] = buf[bt + 3 - dt];
                }
                bt = end;
            }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm)
            final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
};
// empty
var et = /*#__PURE__*/ new u8(0);
// gzip footer: -8 to -4 = CRC, -4 to -0 is length
// gzip start
var gzs = function (d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
        err(6, 'invalid gzip data');
    var flg = d[3];
    var st = 10;
    if (flg & 4)
        st += d[10] | (d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
        ;
    return st + (flg & 2);
};
// gzip length
var gzl = function (d) {
    var l = d.length;
    return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
};
/**
 * Expands DEFLATE data with no wrapper
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function inflateSync(data, out = undefined) {
    return inflt(data, out);
}
/**
 * Expands GZIP data
 * @param data The data to decompress
 * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
 * @returns The decompressed version of the data
 */
function gunzipSync(data, out = undefined) {
    return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
}
// text decoder
var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
// text decoder stream
var tds = 0;
try {
    td.decode(et, { stream: true });
    tds = 1;
}
catch (e) { }

// @ts-nocheck
function Future() {
    let resolve = undefined, reject = undefined;
    const p = new Promise((resolve_, reject_) => {
        resolve = resolve_;
        reject = reject_;
    });
    p.resolve = function _resolve() {
        // eslint-disable-next-line prefer-rest-params
        resolve.apply(this, arguments);
    };
    p.reject = function _reject() {
        // eslint-disable-next-line prefer-rest-params
        reject.apply(this, arguments);
    };
    return p;
}

class Client {
    constructor(url, onMessageCallback, onErrorCallback, onCloseCallback, onConnectedCallback, config = {}) {
        const defaults = {
            url,
            onMessageCallback,
            onErrorCallback,
            onCloseCallback,
            onConnectedCallback,
            verbose: false,
            protocols: undefined,
            options: undefined,
            futures: {},
            subscriptions: {},
            rejections: {},
            connected: undefined,
            error: undefined,
            connectionStarted: undefined,
            connectionEstablished: undefined,
            isConnected: false,
            connectionTimer: undefined,
            connectionTimeout: 10000,
            pingInterval: undefined,
            ping: undefined,
            keepAlive: 30000,
            maxPingPongMisses: 2.0,
            // timeout is not used atm
            // timeout: 30000, // throw if a request is not satisfied in 30 seconds, false to disable
            connection: undefined,
            startedConnecting: false,
            gunzip: false,
            inflate: false,
        };
        Object.assign(this, deepExtend$1(defaults, config));
        // connection-related Future
        this.connected = Future();
    }
    future(messageHash) {
        if (!(messageHash in this.futures)) {
            this.futures[messageHash] = Future();
        }
        const future = this.futures[messageHash];
        if (messageHash in this.rejections) {
            future.reject(this.rejections[messageHash]);
            delete this.rejections[messageHash];
        }
        return future;
    }
    resolve(result, messageHash) {
        if (this.verbose && (messageHash === undefined)) {
            this.log(new Date(), 'resolve received undefined messageHash');
        }
        if (messageHash in this.futures) {
            const promise = this.futures[messageHash];
            promise.resolve(result);
            delete this.futures[messageHash];
        }
        return result;
    }
    reject(result, messageHash = undefined) {
        if (messageHash) {
            if (messageHash in this.futures) {
                const promise = this.futures[messageHash];
                promise.reject(result);
                delete this.futures[messageHash];
            }
            else {
                // in the case that a promise was already fulfilled
                // and the client has not yet called watchMethod to create a new future
                // calling client.reject will do nothing
                // this means the rejection will be ignored and the code will continue executing
                // instead we store the rejection for later
                this.rejections[messageHash] = result;
            }
        }
        else {
            const messageHashes = Object.keys(this.futures);
            for (let i = 0; i < messageHashes.length; i++) {
                this.reject(result, messageHashes[i]);
            }
        }
        return result;
    }
    log(...args) {
        console.log(...args);
        // console.dir (args, { depth: null })
    }
    connect(backoffDelay = 0) {
        throw new NotSupported('connect() not implemented yet');
    }
    isOpen() {
        throw new NotSupported('isOpen() not implemented yet');
    }
    reset(error) {
        this.clearConnectionTimeout();
        this.clearPingInterval();
        this.reject(error);
    }
    onConnectionTimeout() {
        if (!this.isOpen()) {
            const error = new RequestTimeout('Connection to ' + this.url + ' failed due to a connection timeout');
            this.onError(error);
            this.connection.close(1006);
        }
    }
    setConnectionTimeout() {
        if (this.connectionTimeout) {
            const onConnectionTimeout = this.onConnectionTimeout.bind(this);
            this.connectionTimer = setTimeout(onConnectionTimeout, this.connectionTimeout);
        }
    }
    clearConnectionTimeout() {
        if (this.connectionTimer) {
            this.connectionTimer = clearTimeout(this.connectionTimer);
        }
    }
    setPingInterval() {
        if (this.keepAlive) {
            const onPingInterval = this.onPingInterval.bind(this);
            this.pingInterval = setInterval(onPingInterval, this.keepAlive);
        }
    }
    clearPingInterval() {
        if (this.pingInterval) {
            this.pingInterval = clearInterval(this.pingInterval);
        }
    }
    onPingInterval() {
        if (this.keepAlive && this.isOpen()) {
            const now = milliseconds$1();
            this.lastPong = this.lastPong || now;
            if ((this.lastPong + this.keepAlive * this.maxPingPongMisses) < now) {
                this.onError(new RequestTimeout('Connection to ' + this.url + ' timed out due to a ping-pong keepalive missing on time'));
            }
            else {
                if (this.ping) {
                    this.send(this.ping(this));
                }
                else if (isNode$1) {
                    // can't do this inside browser
                    // https://stackoverflow.com/questions/10585355/sending-websocket-ping-pong-frame-from-browser
                    this.connection.ping();
                }
                else {
                    // browsers handle ping-pong automatically therefore
                    // in a browser we update lastPong on every call to
                    // this function as if pong just came in to prevent the
                    // client from thinking it's a stalled connection
                    this.lastPong = now;
                }
            }
        }
    }
    onOpen() {
        if (this.verbose) {
            this.log(new Date(), 'onOpen');
        }
        this.connectionEstablished = milliseconds$1();
        this.isConnected = true;
        this.connected.resolve(this.url);
        // this.connection.terminate () // debugging
        this.clearConnectionTimeout();
        this.setPingInterval();
        this.onConnectedCallback(this);
    }
    // this method is not used at this time, because in JS the ws client will
    // respond to pings coming from the server with pongs automatically
    // however, some devs may want to track connection states in their app
    onPing() {
        if (this.verbose) {
            this.log(new Date(), 'onPing');
        }
    }
    onPong() {
        this.lastPong = milliseconds$1();
        if (this.verbose) {
            this.log(new Date(), 'onPong');
        }
    }
    onError(error) {
        if (this.verbose) {
            this.log(new Date(), 'onError', error.message);
        }
        if (!(error instanceof BaseError)) {
            // in case of ErrorEvent from node_modules/ws/lib/event-target.js
            error = new NetworkError(error.message);
        }
        this.error = error;
        this.reset(this.error);
        this.onErrorCallback(this, this.error);
    }
    onClose(event) {
        if (this.verbose) {
            this.log(new Date(), 'onClose', event);
        }
        if (!this.error) {
            // todo: exception types for server-side disconnects
            this.reset(new NetworkError('connection closed by remote server, closing code ' + String(event.code)));
        }
        this.onCloseCallback(this, event);
    }
    // this method is not used at this time
    // but may be used to read protocol-level data like cookies, headers, etc
    onUpgrade(message) {
        if (this.verbose) {
            this.log(new Date(), 'onUpgrade');
        }
    }
    async send(message) {
        if (this.verbose) {
            this.log(new Date(), 'sending', message);
        }
        message = (typeof message === 'string') ? message : JSON.stringify(message);
        const future = Future();
        if (isNode$1) {
            function onSendComplete(error) {
                if (error) {
                    future.reject(error);
                }
                else {
                    future.resolve(null);
                }
            }
            this.connection.send(message, {}, onSendComplete);
        }
        else {
            this.connection.send(message);
            future.resolve(null);
        }
        return future;
    }
    close() {
        throw new NotSupported('close() not implemented yet');
    }
    onMessage(messageEvent) {
        // if we use onmessage we get MessageEvent objects
        // MessageEvent {isTrusted: true, data: "{"e":"depthUpdate","E":1581358737706,"s":"ETHBTC",…"0.06200000"]],"a":[["0.02261300","0.00000000"]]}", origin: "wss://stream.binance.com:9443", lastEventId: "", source: null, …}
        let message = messageEvent.data;
        let arrayBuffer;
        if (this.gunzip || this.inflate) {
            if (typeof message === 'string') {
                arrayBuffer = utf8.decode(message);
            }
            else {
                arrayBuffer = new Uint8Array(message.buffer.slice(message.byteOffset, message.byteOffset + message.byteLength));
            }
            if (this.gunzip) {
                arrayBuffer = gunzipSync(arrayBuffer);
            }
            else if (this.inflate) {
                arrayBuffer = inflateSync(arrayBuffer);
            }
            message = utf8.encode(arrayBuffer);
        }
        if (typeof message !== 'string') {
            message = message.toString();
        }
        try {
            if (isJsonEncodedObject$1(message)) {
                message = JSON.parse(message.replace(/:(\d{15,}),/g, ':"$1",'));
            }
            if (this.verbose) {
                this.log(new Date(), 'onMessage', message);
                // unlimited depth
                // this.log (new Date (), 'onMessage', util.inspect (message, false, null, true))
                // this.log (new Date (), 'onMessage', JSON.stringify (message, null, 4))
            }
        }
        catch (e) {
            this.log(new Date(), 'onMessage JSON.parse', e);
            // reset with a json encoding error ?
        }
        try {
            this.onMessageCallback(this, message);
        }
        catch (error) {
            this.reject(error);
        }
    }
}

const WebSocketPlatform = isNode$1 ? WebSocket__default["default"] : self.WebSocket;
class WsClient extends Client {
    createConnection() {
        if (this.verbose) {
            this.log(new Date(), 'connecting to', this.url);
        }
        this.connectionStarted = milliseconds$1();
        this.setConnectionTimeout();
        if (isNode$1) {
            this.connection = new WebSocketPlatform(this.url, this.protocols, this.options);
        }
        else {
            this.connection = new WebSocketPlatform(this.url, this.protocols);
        }
        this.connection.onopen = this.onOpen.bind(this);
        this.connection.onmessage = this.onMessage.bind(this);
        this.connection.onerror = this.onError.bind(this);
        this.connection.onclose = this.onClose.bind(this);
        if (isNode$1) {
            this.connection
                .on('ping', this.onPing.bind(this))
                .on('pong', this.onPong.bind(this))
                .on('upgrade', this.onUpgrade.bind(this));
        }
        // this.connection.terminate () // debugging
        // this.connection.close () // debugging
    }
    connect(backoffDelay = 0) {
        if (!this.startedConnecting) {
            this.startedConnecting = true;
            // exponential backoff for consequent ws connections if necessary
            if (backoffDelay) {
                sleep(backoffDelay).then(this.createConnection.bind(this));
            }
            else {
                this.createConnection();
            }
        }
        return this.connected;
    }
    isOpen() {
        return (this.connection.readyState === WebSocketPlatform.OPEN);
    }
    close() {
        if (this.connection instanceof WebSocketPlatform) {
            return this.connection.close();
        }
    }
}

/* eslint-disable max-classes-per-file */
// @ts-nocheck
// ----------------------------------------------------------------------------
//
// Upto 10x faster after initializing memory for the floating point array
// Author: github.com/frosty00
// Email: carlo.revelli@berkeley.edu
//
function bisectLeft(array, x) {
    let low = 0;
    let high = array.length - 1;
    while (low <= high) {
        const mid = (low + high) >>> 1;
        if (array[mid] - x < 0)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return low;
}
const SIZE = 1024;
const SEED = new Float64Array(new Array(SIZE).fill(Number.MAX_VALUE));
class OrderBookSide extends Array {
    constructor(deltas = [], depth = undefined) {
        super();
        // a string-keyed dictionary of price levels / ids / indices
        Object.defineProperty(this, 'index', {
            __proto__: null,
            value: new Float64Array(SEED),
            writable: true,
        });
        Object.defineProperty(this, 'depth', {
            __proto__: null,
            value: depth || Number.MAX_SAFE_INTEGER,
            writable: true,
        });
        // sort upon initiation
        this.length = 0;
        for (let i = 0; i < deltas.length; i++) {
            this.storeArray(deltas[i].slice()); // slice is muy importante
        }
    }
    storeArray(delta) {
        const price = delta[0];
        const size = delta[1];
        const index_price = this.side ? -price : price;
        const index = bisectLeft(this.index, index_price);
        if (size) {
            if (this.index[index] === index_price) {
                this[index][1] = size;
            }
            else {
                this.length++;
                this.index.copyWithin(index + 1, index, this.index.length);
                this.index[index] = index_price;
                this.copyWithin(index + 1, index, this.length);
                this[index] = delta;
                // in the rare case of very large orderbooks being sent
                if (this.length > this.index.length - 1) {
                    const existing = Array.from(this.index);
                    existing.length = this.length * 2;
                    existing.fill(Number.MAX_VALUE, this.index.length);
                    this.index = new Float64Array(existing);
                }
            }
        }
        else if (this.index[index] === index_price) {
            this.index.copyWithin(index, index + 1, this.index.length);
            this.index[this.length - 1] = Number.MAX_VALUE;
            this.copyWithin(index, index + 1, this.length);
            this.length--;
        }
    }
    // index an incoming delta in the string-price-keyed dictionary
    store(price, size) {
        this.storeArray([price, size]);
    }
    // replace stored orders with new values
    limit() {
        if (this.length > this.depth) {
            for (let i = this.depth; i < this.length; i++) {
                this.index[i] = Number.MAX_VALUE;
            }
            this.length = this.depth;
        }
    }
}
// ----------------------------------------------------------------------------
// overwrites absolute volumes at price levels
// or deletes price levels based on order counts (3rd value in a bidask delta)
// this class stores vector arrays of values indexed by price
class CountedOrderBookSide extends OrderBookSide {
    store(price, size, count) {
        this.storeArray([price, size, count]);
    }
    storeArray(delta) {
        const price = delta[0];
        const size = delta[1];
        const count = delta[2];
        const index_price = this.side ? -price : price;
        const index = bisectLeft(this.index, index_price);
        if (size && count) {
            if (this.index[index] === index_price) {
                const entry = this[index];
                entry[1] = size;
                entry[2] = count;
            }
            else {
                this.length++;
                this.index.copyWithin(index + 1, index, this.index.length);
                this.index[index] = index_price;
                this.copyWithin(index + 1, index, this.length);
                this[index] = delta;
                // in the rare case of very large orderbooks being sent
                if (this.length > this.index.length - 1) {
                    const existing = Array.from(this.index);
                    existing.length = this.length * 2;
                    existing.fill(Number.MAX_VALUE, this.index.length);
                    this.index = new Float64Array(existing);
                }
            }
        }
        else if (this.index[index] === index_price) {
            this.index.copyWithin(index, index + 1, this.index.length);
            this.index[this.length - 1] = Number.MAX_VALUE;
            this.copyWithin(index, index + 1, this.length);
            this.length--;
        }
    }
}
// ----------------------------------------------------------------------------
// stores vector arrays indexed by id (3rd value in a bidask delta array)
class IndexedOrderBookSide extends Array {
    constructor(deltas = [], depth = Number.MAX_SAFE_INTEGER) {
        super(deltas.length);
        // a string-keyed dictionary of price levels / ids / indices
        Object.defineProperty(this, 'hashmap', {
            __proto__: null,
            value: new Map(),
            writable: true,
        });
        Object.defineProperty(this, 'index', {
            __proto__: null,
            value: new Float64Array(SEED),
            writable: true,
        });
        Object.defineProperty(this, 'depth', {
            __proto__: null,
            value: depth || Number.MAX_SAFE_INTEGER,
            writable: true,
        });
        // sort upon initiation
        for (let i = 0; i < deltas.length; i++) {
            this.length = i;
            this.storeArray(deltas[i].slice()); // slice is muy importante
        }
    }
    store(price, size, id) {
        this.storeArray([price, size, id]);
    }
    storeArray(delta) {
        const price = delta[0];
        const size = delta[1];
        const id = delta[2];
        let index_price;
        if (price !== undefined) {
            index_price = this.side ? -price : price;
        }
        else {
            index_price = undefined;
        }
        if (size) {
            if (this.hashmap.has(id)) {
                const old_price = this.hashmap.get(id);
                index_price = index_price || old_price;
                // in case price is not sent
                delta[0] = Math.abs(index_price);
                if (index_price === old_price) {
                    const index = bisectLeft(this.index, index_price);
                    this.index[index] = index_price;
                    this[index] = delta;
                    return;
                }
                else {
                    // remove old price from index
                    const old_index = bisectLeft(this.index, old_price);
                    this.index.copyWithin(old_index, old_index + 1, this.index.length);
                    this.index[this.length - 1] = Number.MAX_VALUE;
                    this.copyWithin(old_index, old_index + 1, this.length);
                    this.length--;
                }
            }
            // insert new price level
            this.hashmap.set(id, index_price);
            const index = bisectLeft(this.index, index_price);
            // insert new price level into index
            this.length++;
            this.index.copyWithin(index + 1, index, this.index.length);
            this.index[index] = index_price;
            this.copyWithin(index + 1, index, this.length);
            this[index] = delta;
            // in the rare case of very large orderbooks being sent
            if (this.length > this.index.length - 1) {
                const existing = Array.from(this.index);
                existing.length = this.length * 2;
                existing.fill(Number.MAX_VALUE, this.index.length);
                this.index = new Float64Array(existing);
            }
        }
        else if (this.hashmap.has(id)) {
            const old_price = this.hashmap.get(id);
            const index = bisectLeft(this.index, old_price);
            this.index.copyWithin(index, index + 1, this.index.length);
            this.index[this.length - 1] = Number.MAX_VALUE;
            this.copyWithin(index, index + 1, this.length);
            this.length--;
            this.hashmap.delete(id);
        }
    }
    // replace stored orders with new values
    limit() {
        if (this.length > this.depth) {
            for (let i = this.depth; i < this.length; i++) {
                // diff
                this.hashmap.delete(this.index[i]);
                this.index[i] = Number.MAX_VALUE;
            }
            this.length = this.depth;
        }
    }
}
// ----------------------------------------------------------------------------
// a more elegant syntax is possible here, but native inheritance is portable
class Asks extends OrderBookSide {
    get side() { return false; }
}
class Bids extends OrderBookSide {
    get side() { return true; }
}
class CountedAsks extends CountedOrderBookSide {
    get side() { return false; }
}
class CountedBids extends CountedOrderBookSide {
    get side() { return true; }
}
class IndexedAsks extends IndexedOrderBookSide {
    get side() { return false; }
}
class IndexedBids extends IndexedOrderBookSide {
    get side() { return true; }
}

/* eslint-disable max-classes-per-file */
// ----------------------------------------------------------------------------
// overwrites absolute volumes at price levels
class OrderBook {
    constructor(snapshot = {}, depth = undefined) {
        Object.defineProperty(this, 'cache', {
            __proto__: null,
            value: [],
            writable: true,
        });
        depth = depth || Number.MAX_SAFE_INTEGER;
        const defaults = {
            'bids': [],
            'asks': [],
            'timestamp': undefined,
            'datetime': undefined,
            'nonce': undefined,
            'symbol': undefined,
        };
        // merge to this
        const entries = Object.entries(extend$1(defaults, snapshot));
        for (let i = 0; i < entries.length; i++) {
            const [property, value] = entries[i];
            this[property] = value;
        }
        // wrap plain arrays with Bids/Asks classes if necessary
        if (this.asks.constructor.name === 'Array') {
            this.asks = new Asks(this.asks, depth);
        }
        if (this.bids.constructor.name === 'Array') {
            this.bids = new Bids(this.bids, depth);
        }
        if (this.timestamp) {
            this.datetime = iso8601$1(this.timestamp);
        }
    }
    limit() {
        this.asks.limit();
        this.bids.limit();
        return this;
    }
    update(snapshot) {
        if ((snapshot.nonce !== undefined) &&
            (this.nonce !== undefined) &&
            (snapshot.nonce <= this.nonce)) {
            return this;
        }
        this.nonce = snapshot.nonce;
        this.timestamp = snapshot.timestamp;
        this.datetime = iso8601$1(this.timestamp);
        return this.reset(snapshot);
    }
    reset(snapshot = {}) {
        this.asks.index.fill(Number.MAX_VALUE);
        this.asks.length = 0;
        if (snapshot.asks) {
            for (let i = 0; i < snapshot.asks.length; i++) {
                this.asks.storeArray(snapshot.asks[i]);
            }
        }
        this.bids.index.fill(Number.MAX_VALUE);
        this.bids.length = 0;
        if (snapshot.bids) {
            for (let i = 0; i < snapshot.bids.length; i++) {
                this.bids.storeArray(snapshot.bids[i]);
            }
        }
        this.nonce = snapshot.nonce;
        this.timestamp = snapshot.timestamp;
        this.datetime = iso8601$1(this.timestamp);
        this.symbol = snapshot.symbol;
        return this;
    }
}
// ----------------------------------------------------------------------------
// overwrites absolute volumes at price levels
// or deletes price levels based on order counts (3rd value in a bidask delta)
class CountedOrderBook extends OrderBook {
    constructor(snapshot = {}, depth = undefined) {
        super(extend$1(snapshot, {
            'asks': new CountedAsks(snapshot.asks || [], depth),
            'bids': new CountedBids(snapshot.bids || [], depth),
        }));
    }
}
// ----------------------------------------------------------------------------
// indexed by order ids (3rd value in a bidask delta)
class IndexedOrderBook extends OrderBook {
    constructor(snapshot = {}, depth = undefined) {
        super(extend$1(snapshot, {
            'asks': new IndexedAsks(snapshot.asks || [], depth),
            'bids': new IndexedBids(snapshot.bids || [], depth),
        }));
    }
}

// Polyfill for Safari 14
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function')
        return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number((value >> _32n) & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
// Base SHA2 class (RFC 6234)
class SHA2 extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = createView(this.buffer);
    }
    update(data) {
        assert.exists(this);
        const { view, buffer, blockLen } = this;
        data = toBytes(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = createView(data);
                for (; blockLen <= len - pos; pos += blockLen)
                    this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        assert.exists(this);
        assert.output(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        this.buffer.subarray(pos).fill(0);
        // we have less than padOffset left in buffer, so we cannot put length in current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = createView(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4)
            throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
            throw new Error('_sha2: outputLen bigger than state');
        for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen)
            to.buffer.set(buffer);
        return to;
    }
}

// SHA1 was cryptographically broken.
// It is still widely used in legacy apps. Don't use it for a new protocol.
// RFC 3174
const rotl = (word, shift) => (word << shift) | ((word >>> (32 - shift)) >>> 0);
// Choice: a ? b : c
const Chi$1 = (a, b, c) => (a & b) ^ (~a & c);
// Majority function, true if any two inpust is true
const Maj$1 = (a, b, c) => (a & b) ^ (a & c) ^ (b & c);
// Initial state
const IV$2 = new Uint32Array([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
// Temporary buffer, not used to store anything between runs
// Named this way because it matches specification.
const SHA1_W = new Uint32Array(80);
class SHA1 extends SHA2 {
    constructor() {
        super(64, 20, 8, false);
        this.A = IV$2[0] | 0;
        this.B = IV$2[1] | 0;
        this.C = IV$2[2] | 0;
        this.D = IV$2[3] | 0;
        this.E = IV$2[4] | 0;
    }
    get() {
        const { A, B, C, D, E } = this;
        return [A, B, C, D, E];
    }
    set(A, B, C, D, E) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
    }
    process(view, offset) {
        for (let i = 0; i < 16; i++, offset += 4)
            SHA1_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 80; i++)
            SHA1_W[i] = rotl(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
        // Compression function main loop, 80 rounds
        let { A, B, C, D, E } = this;
        for (let i = 0; i < 80; i++) {
            let F, K;
            if (i < 20) {
                F = Chi$1(B, C, D);
                K = 0x5a827999;
            }
            else if (i < 40) {
                F = B ^ C ^ D;
                K = 0x6ed9eba1;
            }
            else if (i < 60) {
                F = Maj$1(B, C, D);
                K = 0x8f1bbcdc;
            }
            else {
                F = B ^ C ^ D;
                K = 0xca62c1d6;
            }
            const T = (rotl(A, 5) + F + E + K + SHA1_W[i]) | 0;
            E = D;
            D = C;
            C = rotl(B, 30);
            B = A;
            A = T;
        }
        // Add the compressed chunk to the current hash value
        A = (A + this.A) | 0;
        B = (B + this.B) | 0;
        C = (C + this.C) | 0;
        D = (D + this.D) | 0;
        E = (E + this.E) | 0;
        this.set(A, B, C, D, E);
    }
    roundClean() {
        SHA1_W.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
const sha1 = wrapConstructor(() => new SHA1());

function totp(secret) {
    const dec2hex = (s) => ((s < 15.5 ? '0' : '') + Math.round(s).toString(16));
    const hex2dec = (s) => parseInt(s, 16);
    const leftpad = (s, p) => (p + s).slice(-p.length); // both s and p are short strings
    secret = secret.replace(' ', ''); // support 2fa-secrets with spaces like "4TDV WOGO" → "4TDVWOGO"
    const epoch = Math.round(new Date().getTime() / 1000.0);
    const time = leftpad(dec2hex(Math.floor(epoch / 30)), '0000000000000000');
    const hmacRes = hmac$1(base16.decode(time), base32.decode(secret), sha1, 'hex');
    const offset = hex2dec(hmacRes.substring(hmacRes.length - 1));
    // eslint-disable-next-line
    let otp = (hex2dec(hmacRes.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
    return otp.substring(otp.length - 6, otp.length);
}

// ----------------------------------------------------------------------------
const { isNode, keys, values, deepExtend, extend, clone: clone$1, flatten, unique, indexBy, sortBy, sortBy2, safeFloat2, groupBy, aggregate, uuid, unCamelCase, precisionFromString, Throttler, capitalize, now, buildOHLCVC, decimalToPrecision, safeValue, safeValue2, safeString, safeString2, seconds, milliseconds, binaryToBase16, numberToBE, base16ToBinary, iso8601, omit, isJsonEncodedObject, safeInteger, sum, omitZero, implodeParams, extractParams, json, vwap, merge, binaryConcat, hash, ecdsa, arrayConcat, encode, urlencode, hmac, numberToString, parseTimeframe, safeInteger2, safeStringLower, parse8601, yyyymmdd, safeStringUpper, safeTimestamp, binaryConcatArray, uuidv1, numberToLE, ymdhms, stringToBase64, decode, uuid22, safeIntegerProduct2, safeIntegerProduct, safeStringLower2, yymmdd, base58ToBinary, safeTimestamp2, rawencode, keysort, inArray, isEmpty, ordered, filterBy, uuid16, safeFloat, base64ToBinary, safeStringUpper2, urlencodeWithArrayRepeat, microseconds, binaryToBase64, strip, toArray, safeFloatN, safeIntegerN, safeIntegerProductN, safeTimestampN, safeValueN, safeStringN, safeStringLowerN, safeStringUpperN, urlencodeNested, parseDate, ymd, isArray, base64ToString, crc32, TRUNCATE, ROUND, DECIMAL_PLACES, NO_PADDING, TICK_SIZE } = functions;
// ----------------------------------------------------------------------------
class Exchange$1y {
    constructor(userConfig = {}) {
        this.httpAgent = undefined;
        this.httpsAgent = undefined;
        this.agent = undefined;
        this.api = undefined;
        // prepended to URL, like https://proxy.com/https://exchange.com/api...
        this.proxy = '';
        this.origin = '*'; // CORS origin
        this.minFundingAddressLength = 1; // used in checkAddress
        this.substituteCommonCurrencyCodes = true; // reserved
        this.quoteJsonNumbers = true; // treat numbers in json as quoted precise strings
        this.number = Number; // or String (a pointer to a function)
        this.handleContentTypeApplicationZip = false;
        // whether fees should be summed by currency code
        this.reduceFees = true;
        this.validateServerSsl = true;
        this.validateClientSsl = false;
        this.timeout = 10000; // milliseconds
        this.verbose = false;
        this.debug = false;
        this.userAgent = undefined;
        this.twofa = undefined; // two-factor authentication (2FA)
        this.balance = {};
        this.orderbooks = {};
        this.tickers = {};
        this.orders = undefined;
        this.transactions = {};
        this.positions = {};
        this.requiresWeb3 = false;
        this.requiresEddsa = false;
        this.enableLastJsonResponse = true;
        this.enableLastHttpResponse = true;
        this.enableLastResponseHeaders = true;
        this.last_http_response = undefined;
        this.last_json_response = undefined;
        this.last_response_headers = undefined;
        this.id = undefined;
        this.markets = undefined;
        this.status = undefined;
        this.rateLimit = undefined; // milliseconds
        this.tokenBucket = undefined;
        this.throttler = undefined;
        this.enableRateLimit = undefined;
        this.httpExceptions = undefined;
        this.markets_by_id = undefined;
        this.symbols = undefined;
        this.ids = undefined;
        this.currencies = undefined;
        this.baseCurrencies = undefined;
        this.quoteCurrencies = undefined;
        this.currencies_by_id = undefined;
        this.codes = undefined;
        this.reloadingMarkets = undefined;
        this.marketsLoading = undefined;
        this.accounts = undefined;
        this.accountsById = undefined;
        this.commonCurrencies = undefined;
        this.hostname = undefined;
        this.precisionMode = undefined;
        this.paddingMode = undefined;
        this.exceptions = {};
        this.timeframes = {};
        this.version = undefined;
        this.marketsByAltname = undefined;
        this.name = undefined;
        this.targetAccount = undefined;
        this.stablePairs = {};
        // WS/PRO options
        this.clients = {};
        this.newUpdates = true;
        this.streaming = {};
        this.deepExtend = deepExtend;
        this.isNode = isNode;
        this.keys = keys;
        this.values = values;
        this.extend = extend;
        this.clone = clone$1;
        this.flatten = flatten;
        this.unique = unique;
        this.indexBy = indexBy;
        this.sortBy = sortBy;
        this.sortBy2 = sortBy2;
        this.groupBy = groupBy;
        this.aggregate = aggregate;
        this.uuid = uuid;
        this.unCamelCase = unCamelCase;
        this.precisionFromString = precisionFromString;
        this.capitalize = capitalize;
        this.now = now;
        this.buildOHLCVC = buildOHLCVC;
        this.decimalToPrecision = decimalToPrecision;
        this.safeValue = safeValue;
        this.safeValue2 = safeValue2;
        this.safeString = safeString;
        this.safeString2 = safeString2;
        this.safeFloat = safeFloat;
        this.safeFloat2 = safeFloat2;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
        this.binaryToBase16 = binaryToBase16;
        this.numberToBE = numberToBE;
        this.base16ToBinary = base16ToBinary;
        this.iso8601 = iso8601;
        this.omit = omit;
        this.isJsonEncodedObject = isJsonEncodedObject;
        this.safeInteger = safeInteger;
        this.sum = sum;
        this.omitZero = omitZero;
        this.implodeParams = implodeParams;
        this.extractParams = extractParams;
        this.json = json;
        this.vwap = vwap;
        this.merge = merge;
        this.binaryConcat = binaryConcat;
        this.hash = hash;
        this.arrayConcat = arrayConcat;
        this.encode = encode;
        this.urlencode = urlencode;
        this.hmac = hmac;
        this.numberToString = numberToString;
        this.parseTimeframe = parseTimeframe;
        this.safeInteger2 = safeInteger2;
        this.safeStringLower = safeStringLower;
        this.parse8601 = parse8601;
        this.yyyymmdd = yyyymmdd;
        this.safeStringUpper = safeStringUpper;
        this.safeTimestamp = safeTimestamp;
        this.binaryConcatArray = binaryConcatArray;
        this.uuidv1 = uuidv1;
        this.numberToLE = numberToLE;
        this.ymdhms = ymdhms;
        this.yymmdd = yymmdd;
        this.stringToBase64 = stringToBase64;
        this.decode = decode;
        this.uuid22 = uuid22;
        this.safeIntegerProduct2 = safeIntegerProduct2;
        this.safeIntegerProduct = safeIntegerProduct;
        this.base58ToBinary = base58ToBinary;
        this.base64ToBinary = base64ToBinary;
        this.safeTimestamp2 = safeTimestamp2;
        this.rawencode = rawencode;
        this.keysort = keysort;
        this.inArray = inArray;
        this.safeStringLower2 = safeStringLower2;
        this.safeStringUpper2 = safeStringUpper2;
        this.isEmpty = isEmpty;
        this.ordered = ordered;
        this.filterBy = filterBy;
        this.uuid16 = uuid16;
        this.urlencodeWithArrayRepeat = urlencodeWithArrayRepeat;
        this.microseconds = microseconds;
        this.binaryToBase64 = binaryToBase64;
        this.strip = strip;
        this.toArray = toArray;
        this.safeFloatN = safeFloatN;
        this.safeIntegerN = safeIntegerN;
        this.safeIntegerProductN = safeIntegerProductN;
        this.safeTimestampN = safeTimestampN;
        this.safeValueN = safeValueN;
        this.safeStringN = safeStringN;
        this.safeStringLowerN = safeStringLowerN;
        this.safeStringUpperN = safeStringUpperN;
        this.urlencodeNested = urlencodeNested;
        this.parseDate = parseDate;
        this.ymd = ymd;
        this.isArray = isArray;
        this.base64ToString = base64ToString;
        this.crc32 = crc32;
        Object.assign(this, functions);
        //
        //     if (isNode) {
        //         this.nodeVersion = process.version.match (/\d+\.\d+\.\d+/)[0]
        //         this.userAgent = {
        //             'User-Agent': 'ccxt/' + (Exchange as any).ccxtVersion +
        //                 ' (+https://github.com/ccxt/ccxt)' +
        //                 ' Node.js/' + this.nodeVersion + ' (JavaScript)'
        //         }
        //     }
        //
        this.options = this.getDefaultOptions(); // exchange-specific options, if any
        // fetch implementation options (JS only)
        // http properties
        this.userAgents = {
            'chrome': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
            'chrome39': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
            'chrome100': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        };
        this.headers = {};
        // prepended to URL, like https://proxy.com/https://exchange.com/api...
        this.proxy = '';
        this.origin = '*'; // CORS origin
        // underlying properties
        this.minFundingAddressLength = 1; // used in checkAddress
        this.substituteCommonCurrencyCodes = true; // reserved
        this.quoteJsonNumbers = true; // treat numbers in json as quoted precise strings
        this.number = Number; // or String (a pointer to a function)
        this.handleContentTypeApplicationZip = false;
        // whether fees should be summed by currency code
        this.reduceFees = true;
        // do not delete this line, it is needed for users to be able to define their own fetchImplementation
        this.fetchImplementation = undefined;
        this.validateServerSsl = true;
        this.validateClientSsl = false;
        // default property values
        this.timeout = 10000; // milliseconds
        this.verbose = false;
        this.debug = false;
        this.userAgent = undefined;
        this.twofa = undefined; // two-factor authentication (2FA)
        // default credentials
        this.apiKey = undefined;
        this.secret = undefined;
        this.uid = undefined;
        this.login = undefined;
        this.password = undefined;
        this.privateKey = undefined; // a "0x"-prefixed hexstring private key for a wallet
        this.walletAddress = undefined; // a wallet address "0x"-prefixed hexstring
        this.token = undefined; // reserved for HTTP auth in some cases
        // placeholders for cached data
        this.balance = {};
        this.orderbooks = {};
        this.tickers = {};
        this.orders = undefined;
        this.trades = {};
        this.transactions = {};
        this.ohlcvs = {};
        this.myTrades = undefined;
        this.positions = {};
        // web3 and cryptography flags
        this.requiresWeb3 = false;
        this.requiresEddsa = false;
        // response handling flags and properties
        this.lastRestRequestTimestamp = 0;
        this.enableLastJsonResponse = true;
        this.enableLastHttpResponse = true;
        this.enableLastResponseHeaders = true;
        this.last_http_response = undefined;
        this.last_json_response = undefined;
        this.last_response_headers = undefined;
        // camelCase and snake_notation support
        const unCamelCaseProperties = (obj = this) => {
            if (obj !== null) {
                const ownPropertyNames = Object.getOwnPropertyNames(obj);
                for (let i = 0; i < ownPropertyNames.length; i++) {
                    const k = ownPropertyNames[i];
                    this[unCamelCase(k)] = this[k];
                }
                unCamelCaseProperties(Object.getPrototypeOf(obj));
            }
        };
        unCamelCaseProperties();
        // merge constructor overrides to this instance
        const configEntries = Object.entries(this.describe()).concat(Object.entries(userConfig));
        for (let i = 0; i < configEntries.length; i++) {
            const [property, value] = configEntries[i];
            if (value && Object.getPrototypeOf(value) === Object.prototype) {
                this[property] = this.deepExtend(this[property], value);
            }
            else {
                this[property] = value;
            }
        }
        // ssl options
        if (!this.validateServerSsl) ;
        // generate old metainfo interface
        const hasKeys = Object.keys(this.has);
        for (let i = 0; i < hasKeys.length; i++) {
            const k = hasKeys[i];
            this['has' + this.capitalize(k)] = !!this.has[k]; // converts 'emulated' to true
        }
        // generate implicit api
        if (this.api) {
            this.defineRestApi(this.api, 'request');
        }
        // init the request rate limiter
        this.initRestRateLimiter();
        // init predefined markets if any
        if (this.markets) {
            this.setMarkets(this.markets);
        }
        this.newUpdates = (this.options.newUpdates !== undefined) ? this.options.newUpdates : true;
    }
    describe() {
        return {
            'id': undefined,
            'name': undefined,
            'countries': undefined,
            'enableRateLimit': true,
            'rateLimit': 2000,
            'certified': false,
            'pro': false,
            'alias': false,
            'has': {
                'publicAPI': true,
                'privateAPI': true,
                'CORS': undefined,
                'spot': undefined,
                'margin': undefined,
                'swap': undefined,
                'future': undefined,
                'option': undefined,
                'addMargin': undefined,
                'cancelAllOrders': undefined,
                'cancelOrder': true,
                'cancelOrders': undefined,
                'createDepositAddress': undefined,
                'createLimitOrder': true,
                'createMarketOrder': true,
                'createOrder': true,
                'createPostOnlyOrder': undefined,
                'createReduceOnlyOrder': undefined,
                'createStopOrder': undefined,
                'createStopLimitOrder': undefined,
                'createStopMarketOrder': undefined,
                'editOrder': 'emulated',
                'fetchAccounts': undefined,
                'fetchBalance': true,
                'fetchBidsAsks': undefined,
                'fetchBorrowInterest': undefined,
                'fetchBorrowRate': undefined,
                'fetchBorrowRateHistory': undefined,
                'fetchBorrowRatesPerSymbol': undefined,
                'fetchBorrowRates': undefined,
                'fetchCanceledOrders': undefined,
                'fetchClosedOrder': undefined,
                'fetchClosedOrders': undefined,
                'fetchCurrencies': 'emulated',
                'fetchDeposit': undefined,
                'fetchDepositAddress': undefined,
                'fetchDepositAddresses': undefined,
                'fetchDepositAddressesByNetwork': undefined,
                'fetchDeposits': undefined,
                'fetchTransactionFee': undefined,
                'fetchTransactionFees': undefined,
                'fetchFundingHistory': undefined,
                'fetchFundingRate': undefined,
                'fetchFundingRateHistory': undefined,
                'fetchFundingRates': undefined,
                'fetchIndexOHLCV': undefined,
                'fetchL2OrderBook': true,
                'fetchLastPrices': undefined,
                'fetchLedger': undefined,
                'fetchLedgerEntry': undefined,
                'fetchLeverageTiers': undefined,
                'fetchMarketLeverageTiers': undefined,
                'fetchMarkets': true,
                'fetchMarkOHLCV': undefined,
                'fetchMyTrades': undefined,
                'fetchOHLCV': 'emulated',
                'fetchOpenInterest': undefined,
                'fetchOpenInterestHistory': undefined,
                'fetchOpenOrder': undefined,
                'fetchOpenOrders': undefined,
                'fetchOrder': undefined,
                'fetchOrderBook': true,
                'fetchOrderBooks': undefined,
                'fetchOrders': undefined,
                'fetchOrderTrades': undefined,
                'fetchPermissions': undefined,
                'fetchPosition': undefined,
                'fetchPositions': undefined,
                'fetchPositionsRisk': undefined,
                'fetchPremiumIndexOHLCV': undefined,
                'fetchStatus': 'emulated',
                'fetchTicker': true,
                'fetchTickers': undefined,
                'fetchTime': undefined,
                'fetchTrades': true,
                'fetchTradingFee': undefined,
                'fetchTradingFees': undefined,
                'fetchTradingLimits': undefined,
                'fetchTransactions': undefined,
                'fetchTransfers': undefined,
                'fetchWithdrawAddresses': undefined,
                'fetchWithdrawal': undefined,
                'fetchWithdrawals': undefined,
                'reduceMargin': undefined,
                'setLeverage': undefined,
                'setMargin': undefined,
                'setMarginMode': undefined,
                'setPositionMode': undefined,
                'signIn': undefined,
                'transfer': undefined,
                'withdraw': undefined,
            },
            'urls': {
                'logo': undefined,
                'api': undefined,
                'www': undefined,
                'doc': undefined,
                'fees': undefined,
            },
            'api': undefined,
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'uid': false,
                'login': false,
                'password': false,
                'twofa': false,
                'privateKey': false,
                'walletAddress': false,
                'token': false, // reserved for HTTP auth in some cases
            },
            'markets': undefined,
            'currencies': {},
            'timeframes': undefined,
            'fees': {
                'trading': {
                    'tierBased': undefined,
                    'percentage': undefined,
                    'taker': undefined,
                    'maker': undefined,
                },
                'funding': {
                    'tierBased': undefined,
                    'percentage': undefined,
                    'withdraw': {},
                    'deposit': {},
                },
            },
            'status': {
                'status': 'ok',
                'updated': undefined,
                'eta': undefined,
                'url': undefined,
            },
            'exceptions': undefined,
            'httpExceptions': {
                '422': ExchangeError,
                '418': DDoSProtection,
                '429': RateLimitExceeded,
                '404': ExchangeNotAvailable,
                '409': ExchangeNotAvailable,
                '410': ExchangeNotAvailable,
                '451': ExchangeNotAvailable,
                '500': ExchangeNotAvailable,
                '501': ExchangeNotAvailable,
                '502': ExchangeNotAvailable,
                '520': ExchangeNotAvailable,
                '521': ExchangeNotAvailable,
                '522': ExchangeNotAvailable,
                '525': ExchangeNotAvailable,
                '526': ExchangeNotAvailable,
                '400': ExchangeNotAvailable,
                '403': ExchangeNotAvailable,
                '405': ExchangeNotAvailable,
                '503': ExchangeNotAvailable,
                '530': ExchangeNotAvailable,
                '408': RequestTimeout,
                '504': RequestTimeout,
                '401': AuthenticationError,
                '407': AuthenticationError,
                '511': AuthenticationError,
            },
            'commonCurrencies': {
                'XBT': 'BTC',
                'BCC': 'BCH',
                'BCHABC': 'BCH',
                'BCHSV': 'BSV',
            },
            'precisionMode': DECIMAL_PLACES,
            'paddingMode': NO_PADDING,
            'limits': {
                'leverage': { 'min': undefined, 'max': undefined },
                'amount': { 'min': undefined, 'max': undefined },
                'price': { 'min': undefined, 'max': undefined },
                'cost': { 'min': undefined, 'max': undefined },
            },
        }; // return
    } // describe ()
    encodeURIComponent(...args) {
        // @ts-expect-error
        return encodeURIComponent(...args);
    }
    checkRequiredVersion(requiredVersion, error = true) {
        let result = true;
        const [major1, minor1, patch1] = requiredVersion.split('.'), [major2, minor2, patch2] = Exchange$1y.ccxtVersion.split('.'), intMajor1 = this.parseToInt(major1), intMinor1 = this.parseToInt(minor1), intPatch1 = this.parseToInt(patch1), intMajor2 = this.parseToInt(major2), intMinor2 = this.parseToInt(minor2), intPatch2 = this.parseToInt(patch2);
        if (intMajor1 > intMajor2) {
            result = false;
        }
        if (intMajor1 === intMajor2) {
            if (intMinor1 > intMinor2) {
                result = false;
            }
            else if (intMinor1 === intMinor2 && intPatch1 > intPatch2) {
                result = false;
            }
        }
        if (!result) {
            if (error) {
                throw new NotSupported('Your current version of CCXT is ' + Exchange$1y.ccxtVersion + ', a newer version ' + requiredVersion + ' is required, please, upgrade your version of CCXT');
            }
            else {
                return error;
            }
        }
        return result;
    }
    checkAddress(address) {
        if (address === undefined) {
            throw new InvalidAddress(this.id + ' address is undefined');
        }
        // check the address is not the same letter like 'aaaaa' nor too short nor has a space
        if ((this.unique(address).length === 1) || address.length < this.minFundingAddressLength || address.includes(' ')) {
            throw new InvalidAddress(this.id + ' address is invalid or has less than ' + this.minFundingAddressLength.toString() + ' characters: "' + this.json(address) + '"');
        }
        return address;
    }
    initRestRateLimiter() {
        if (this.rateLimit === undefined) {
            throw new Error(this.id + '.rateLimit property is not configured');
        }
        this.tokenBucket = this.extend({
            delay: 0.001,
            capacity: 1,
            cost: 1,
            maxCapacity: 1000,
            refillRate: (this.rateLimit > 0) ? 1 / this.rateLimit : Number.MAX_VALUE,
        }, this.tokenBucket);
        this.throttler = new Throttler(this.tokenBucket);
    }
    throttle(cost = undefined) {
        return this.throttler.throttle(cost);
    }
    setSandboxMode(enabled) {
        if (!!enabled) { // eslint-disable-line no-extra-boolean-cast
            if ('test' in this.urls) {
                if (typeof this.urls['api'] === 'string') {
                    this.urls['apiBackup'] = this.urls['api'];
                    this.urls['api'] = this.urls['test'];
                }
                else {
                    this.urls['apiBackup'] = clone$1(this.urls['api']);
                    this.urls['api'] = clone$1(this.urls['test']);
                }
            }
            else {
                throw new NotSupported(this.id + ' does not have a sandbox URL');
            }
        }
        else if ('apiBackup' in this.urls) {
            if (typeof this.urls['api'] === 'string') {
                this.urls['api'] = this.urls['apiBackup'];
            }
            else {
                this.urls['api'] = clone$1(this.urls['apiBackup']);
            }
        }
    }
    defineRestApiEndpoint(methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths, config = {}) {
        const splitPath = path.split(/[^a-zA-Z0-9]/);
        const camelcaseSuffix = splitPath.map(this.capitalize).join('');
        const underscoreSuffix = splitPath.map((x) => x.trim().toLowerCase()).filter((x) => x.length > 0).join('_');
        const camelcasePrefix = [paths[0]].concat(paths.slice(1).map(this.capitalize)).join('');
        const underscorePrefix = [paths[0]].concat(paths.slice(1).map((x) => x.trim()).filter((x) => x.length > 0)).join('_');
        const camelcase = camelcasePrefix + camelcaseMethod + this.capitalize(camelcaseSuffix);
        const underscore = underscorePrefix + '_' + lowercaseMethod + '_' + underscoreSuffix;
        const typeArgument = (paths.length > 1) ? paths : paths[0];
        // handle call costs here
        const partial = async (params = {}, context = {}) => this[methodName](path, typeArgument, uppercaseMethod, params, undefined, undefined, config, context);
        // const partial = async (params) => this[methodName] (path, typeArgument, uppercaseMethod, params || {})
        this[camelcase] = partial;
        this[underscore] = partial;
    }
    defineRestApi(api, methodName, paths = []) {
        const keys = Object.keys(api);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = api[key];
            const uppercaseMethod = key.toUpperCase();
            const lowercaseMethod = key.toLowerCase();
            const camelcaseMethod = this.capitalize(lowercaseMethod);
            if (Array.isArray(value)) {
                for (let k = 0; k < value.length; k++) {
                    const path = value[k].trim();
                    this.defineRestApiEndpoint(methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths);
                }
                // the options HTTP method conflicts with the 'options' API url path
                // } else if (key.match (/^(?:get|post|put|delete|options|head|patch)$/i)) {
            }
            else if (key.match(/^(?:get|post|put|delete|head|patch)$/i)) {
                const endpoints = Object.keys(value);
                for (let j = 0; j < endpoints.length; j++) {
                    const endpoint = endpoints[j];
                    const path = endpoint.trim();
                    const config = value[endpoint];
                    if (typeof config === 'object') {
                        this.defineRestApiEndpoint(methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths, config);
                    }
                    else if (typeof config === 'number') {
                        this.defineRestApiEndpoint(methodName, uppercaseMethod, lowercaseMethod, camelcaseMethod, path, paths, { cost: config });
                    }
                    else {
                        throw new NotSupported(this.id + ' defineRestApi() API format is not supported, API leafs must strings, objects or numbers');
                    }
                }
            }
            else {
                this.defineRestApi(value, methodName, paths.concat([key]));
            }
        }
    }
    log(...args) {
        console.log(...args);
    }
    async fetch(url, method = 'GET', headers = undefined, body = undefined) {
        if (isNode && this.userAgent) {
            if (typeof this.userAgent === 'string') {
                headers = this.extend({ 'User-Agent': this.userAgent }, headers);
            }
            else if ((typeof this.userAgent === 'object') && ('User-Agent' in this.userAgent)) {
                headers = this.extend(this.userAgent, headers);
            }
        }
        if (typeof this.proxy === 'function') {
            url = this.proxy(url);
            if (isNode) {
                headers = this.extend({ 'Origin': this.origin }, headers);
            }
        }
        else if (typeof this.proxy === 'string') {
            if (this.proxy.length && isNode) {
                headers = this.extend({ 'Origin': this.origin }, headers);
            }
            url = this.proxy + url;
        }
        headers = this.extend(this.headers, headers);
        headers = this.setHeaders(headers);
        if (this.verbose) {
            this.log("fetch Request:\n", this.id, method, url, "\nRequestHeaders:\n", headers, "\nRequestBody:\n", body, "\n");
        }
        if (this.fetchImplementation === undefined) {
            if (isNode) {
                const module = await Promise.resolve().then(function () { return index; });
                if (this.agent === undefined) {
                    const { Agent } = await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(/* webpackIgnore: true */ 'node:https')); });
                    this.agent = new Agent({ keepAlive: true });
                }
                this.AbortError = module.AbortError;
                this.fetchImplementation = module.default;
                this.FetchError = module.FetchError;
            }
            else {
                this.fetchImplementation = self.fetch;
                this.AbortError = DOMException;
                this.FetchError = TypeError;
            }
        }
        // fetchImplementation cannot be called on this. in browsers:
        // TypeError Failed to execute 'fetch' on 'Window': Illegal invocation
        const fetchImplementation = this.fetchImplementation;
        const params = { method, headers, body, timeout: this.timeout };
        if (this.agent) {
            params['agent'] = this.agent;
        }
        const controller = new AbortController();
        params['signal'] = controller.signal;
        const timeout = setTimeout(() => {
            controller.abort();
        }, this.timeout);
        try {
            const response = await fetchImplementation(url, params);
            clearTimeout(timeout);
            return this.handleRestResponse(response, url, method, headers, body);
        }
        catch (e) {
            if (e instanceof this.AbortError) {
                throw new RequestTimeout(this.id + ' ' + method + ' ' + url + ' request timed out (' + this.timeout + ' ms)');
            }
            else if (e instanceof this.FetchError) {
                throw new NetworkError(this.id + ' ' + method + ' ' + url + ' fetch failed');
            }
            throw e;
        }
    }
    parseJson(jsonString) {
        try {
            if (this.isJsonEncodedObject(jsonString)) {
                return JSON.parse(this.onJsonResponse(jsonString));
            }
        }
        catch (e) {
            // SyntaxError
            return undefined;
        }
    }
    getResponseHeaders(response) {
        const result = {};
        response.headers.forEach((value, key) => {
            key = key.split('-').map((word) => this.capitalize(word)).join('-');
            result[key] = value;
        });
        return result;
    }
    handleRestResponse(response, url, method = 'GET', requestHeaders = undefined, requestBody = undefined) {
        const responseHeaders = this.getResponseHeaders(response);
        if (this.handleContentTypeApplicationZip && (responseHeaders['Content-Type'] === 'application/zip')) {
            const responseBuffer = response.buffer();
            if (this.enableLastResponseHeaders) {
                this.last_response_headers = responseHeaders;
            }
            if (this.enableLastHttpResponse) {
                this.last_http_response = responseBuffer;
            }
            if (this.verbose) {
                this.log("handleRestResponse:\n", this.id, method, url, response.status, response.statusText, "\nResponseHeaders:\n", responseHeaders, "ZIP redacted", "\n");
            }
            // no error handler needed, because it would not be a zip response in case of an error
            return responseBuffer;
        }
        return response.text().then((responseBody) => {
            const bodyText = this.onRestResponse(response.status, response.statusText, url, method, responseHeaders, responseBody, requestHeaders, requestBody);
            const json = this.parseJson(bodyText);
            if (this.enableLastResponseHeaders) {
                this.last_response_headers = responseHeaders;
            }
            if (this.enableLastHttpResponse) {
                this.last_http_response = responseBody;
            }
            if (this.enableLastJsonResponse) {
                this.last_json_response = json;
            }
            if (this.verbose) {
                this.log("handleRestResponse:\n", this.id, method, url, response.status, response.statusText, "\nResponseHeaders:\n", responseHeaders, "\nResponseBody:\n", responseBody, "\n");
            }
            const skipFurtherErrorHandling = this.handleErrors(response.status, response.statusText, url, method, responseHeaders, responseBody, json, requestHeaders, requestBody);
            if (!skipFurtherErrorHandling) {
                this.handleHttpStatusCode(response.status, response.statusText, url, method, responseBody);
            }
            return json || responseBody;
        });
    }
    onRestResponse(statusCode, statusText, url, method, responseHeaders, responseBody, requestHeaders, requestBody) {
        return responseBody.trim();
    }
    onJsonResponse(responseBody) {
        return this.quoteJsonNumbers ? responseBody.replace(/":([+.0-9eE-]+)([,}])/g, '":"$1"$2') : responseBody;
    }
    async loadMarketsHelper(reload = false, params = {}) {
        if (!reload && this.markets) {
            if (!this.markets_by_id) {
                return this.setMarkets(this.markets);
            }
            return this.markets;
        }
        let currencies = undefined;
        // only call if exchange API provides endpoint (true), thus avoid emulated versions ('emulated')
        if (this.has['fetchCurrencies'] === true) {
            currencies = await this.fetchCurrencies();
        }
        const markets = await this.fetchMarkets(params);
        return this.setMarkets(markets, currencies);
    }
    loadMarkets(reload = false, params = {}) {
        // this method is async, it returns a promise
        if ((reload && !this.reloadingMarkets) || !this.marketsLoading) {
            this.reloadingMarkets = true;
            this.marketsLoading = this.loadMarketsHelper(reload, params).then((resolved) => {
                this.reloadingMarkets = false;
                return resolved;
            }, (error) => {
                this.reloadingMarkets = false;
                throw error;
            });
        }
        return this.marketsLoading;
    }
    fetchCurrencies(params = {}) {
        // markets are returned as a list
        // currencies are returned as a dict
        // this is for historical reasons
        // and may be changed for consistency later
        return new Promise((resolve, reject) => resolve(this.currencies));
    }
    fetchMarkets(params = {}) {
        // markets are returned as a list
        // currencies are returned as a dict
        // this is for historical reasons
        // and may be changed for consistency later
        return new Promise((resolve, reject) => resolve(Object.values(this.markets)));
    }
    filterBySinceLimit(array, since = undefined, limit = undefined, key = 'timestamp', tail = false) {
        const sinceIsDefined = (since !== undefined && since !== null);
        if (sinceIsDefined) {
            array = array.filter((entry) => entry[key] >= since);
        }
        if (limit !== undefined && limit !== null) {
            array = tail ? array.slice(-limit) : array.slice(0, limit);
        }
        return array;
    }
    filterByValueSinceLimit(array, field, value = undefined, since = undefined, limit = undefined, key = 'timestamp', tail = false) {
        const valueIsDefined = value !== undefined && value !== null;
        const sinceIsDefined = since !== undefined && since !== null;
        // single-pass filter for both symbol and since
        if (valueIsDefined || sinceIsDefined) {
            array = array.filter((entry) => ((valueIsDefined ? (entry[field] === value) : true) &&
                (sinceIsDefined ? (entry[key] >= since) : true)));
        }
        if (limit !== undefined && limit !== null) {
            array = tail ? array.slice(-limit) : array.slice(0, limit);
        }
        return array;
    }
    checkRequiredDependencies() {
        return;
    }
    parseNumber(value, d = undefined) {
        if (value === undefined) {
            return d;
        }
        else {
            try {
                return this.number(value);
            }
            catch (e) {
                return d;
            }
        }
    }
    checkOrderArguments(market, type, side, amount, price, params) {
        if (price === undefined) {
            if (type === 'limit') {
                throw new ArgumentsRequired(this.id + ' createOrder() requires a price argument for a limit order');
            }
        }
        if (amount <= 0) {
            throw new ArgumentsRequired(this.id + ' createOrder() amount should be above 0');
        }
    }
    handleHttpStatusCode(code, reason, url, method, body) {
        const codeAsString = code.toString();
        if (codeAsString in this.httpExceptions) {
            const ErrorClass = this.httpExceptions[codeAsString];
            throw new ErrorClass(this.id + ' ' + method + ' ' + url + ' ' + codeAsString + ' ' + reason + ' ' + body);
        }
    }
    remove0xPrefix(hexData) {
        if (hexData.slice(0, 2) === '0x') {
            return hexData.slice(2);
        }
        else {
            return hexData;
        }
    }
    // method to override
    findTimeframe(timeframe, timeframes = undefined) {
        timeframes = timeframes || this.timeframes;
        const keys = Object.keys(timeframes);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (timeframes[key] === timeframe) {
                return key;
            }
        }
        return undefined;
    }
    spawn(method, ...args) {
        const future = Future();
        method.apply(this, args).then(future.resolve).catch(future.reject);
        return future;
    }
    delay(timeout, method, ...args) {
        setTimeout(() => {
            this.spawn(method, ...args);
        }, timeout);
    }
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // WS/PRO methods
    orderBook(snapshot = {}, depth = Number.MAX_SAFE_INTEGER) {
        return new OrderBook(snapshot, depth);
    }
    indexedOrderBook(snapshot = {}, depth = Number.MAX_SAFE_INTEGER) {
        return new IndexedOrderBook(snapshot, depth);
    }
    countedOrderBook(snapshot = {}, depth = Number.MAX_SAFE_INTEGER) {
        return new CountedOrderBook(snapshot, depth);
    }
    handleMessage(client, message) { } // stub to override
    // ping (client) {} // stub to override
    client(url) {
        this.clients = this.clients || {};
        if (!this.clients[url]) {
            const onMessage = this.handleMessage.bind(this);
            const onError = this.onError.bind(this);
            const onClose = this.onClose.bind(this);
            const onConnected = this.onConnected.bind(this);
            // decide client type here: ws / signalr / socketio
            const wsOptions = this.safeValue(this.options, 'ws', {});
            const options = this.deepExtend(this.streaming, {
                'log': this.log ? this.log.bind(this) : this.log,
                'ping': this.ping ? this.ping.bind(this) : this.ping,
                'verbose': this.verbose,
                'throttler': new Throttler(this.tokenBucket),
                // add support for proxies
                'options': {
                    'agent': this.agent,
                }
            }, wsOptions);
            this.clients[url] = new WsClient(url, onMessage, onError, onClose, onConnected, options);
        }
        return this.clients[url];
    }
    watch(url, messageHash, message = undefined, subscribeHash = undefined, subscription = undefined) {
        //
        // Without comments the code of this method is short and easy:
        //
        //     const client = this.client (url)
        //     const backoffDelay = 0
        //     const future = client.future (messageHash)
        //     const connected = client.connect (backoffDelay)
        //     connected.then (() => {
        //         if (message && !client.subscriptions[subscribeHash]) {
        //             client.subscriptions[subscribeHash] = true
        //             client.send (message)
        //         }
        //     }).catch ((error) => {})
        //     return future
        //
        // The following is a longer version of this method with comments
        //
        const client = this.client(url);
        // todo: calculate the backoff using the clients cache
        const backoffDelay = 0;
        //
        //  watchOrderBook ---- future ----+---------------+----→ user
        //                                 |               |
        //                                 ↓               ↑
        //                                 |               |
        //                              connect ......→ resolve
        //                                 |               |
        //                                 ↓               ↑
        //                                 |               |
        //                             subscribe -----→ receive
        //
        if ((subscribeHash === undefined) && (messageHash in client.futures)) {
            return client.futures[messageHash];
        }
        const future = client.future(messageHash);
        // we intentionally do not use await here to avoid unhandled exceptions
        // the policy is to make sure that 100% of promises are resolved or rejected
        // either with a call to client.resolve or client.reject with
        //  a proper exception class instance
        const connected = client.connect(backoffDelay);
        // the following is executed only if the catch-clause does not
        // catch any connection-level exceptions from the client
        // (connection established successfully)
        connected.then(() => {
            if (!client.subscriptions[subscribeHash]) {
                if (subscribeHash !== undefined) {
                    client.subscriptions[subscribeHash] = subscription || true;
                }
                const options = this.safeValue(this.options, 'ws');
                const cost = this.safeValue(options, 'cost', 1);
                if (message) {
                    if (this.enableRateLimit && client.throttle) {
                        // add cost here |
                        //               |
                        //               V
                        client.throttle(cost).then(() => {
                            client.send(message);
                        }).catch((e) => { throw e; });
                    }
                    else {
                        client.send(message)
                            .catch((e) => { throw e; });
                    }
                }
            }
        });
        return future;
    }
    onConnected(client, message = undefined) {
        // for user hooks
        // console.log ('Connected to', client.url)
    }
    onError(client, error) {
        if ((client.url in this.clients) && (this.clients[client.url].error)) {
            delete this.clients[client.url];
        }
    }
    onClose(client, error) {
        if (client.error) ;
        else {
            // server disconnected a working connection
            if (this.clients[client.url]) {
                delete this.clients[client.url];
            }
        }
    }
    async close() {
        const clients = Object.values(this.clients || {});
        for (let i = 0; i < clients.length; i++) {
            const client = clients[i];
            delete this.clients[client.url];
            await client.close();
        }
    }
    handleDelta(bookside, delta, nonce = undefined) {
        //stub
    }
    async loadOrderBook(client, messageHash, symbol, limit = undefined, params = {}) {
        if (!(symbol in this.orderbooks)) {
            client.reject(new ExchangeError(this.id + ' loadOrderBook() orderbook is not initiated'), messageHash);
            return;
        }
        const maxRetries = this.handleOption('watchOrderBook', 'maxRetries', 3);
        let tries = 0;
        try {
            const stored = this.orderbooks[symbol];
            while (tries < maxRetries) {
                const cache = stored.cache;
                const orderBook = await this.fetchOrderBook(symbol, limit, params);
                const index = this.getCacheIndex(orderBook, cache);
                if (index >= 0) {
                    stored.reset(orderBook);
                    this.handleDeltas(stored, cache.slice(index));
                    stored.cache.length = 0;
                    client.resolve(stored, messageHash);
                    return;
                }
                tries++;
            }
            client.reject(new ExchangeError(this.id + ' nonce is behind the cache after ' + maxRetries.toString() + ' tries.'), messageHash);
            delete this.clients[client.url];
        }
        catch (e) {
            client.reject(e, messageHash);
            await this.loadOrderBook(client, messageHash, symbol, limit, params);
        }
    }
    handleDeltas(orderbook, deltas, nonce = undefined) {
        for (let i = 0; i < deltas.length; i++) {
            this.handleDelta(orderbook, deltas[i]);
        }
    }
    // eslint-disable-next-line no-unused-vars
    getCacheIndex(orderbook, deltas) {
        // return the first index of the cache that can be applied to the orderbook or -1 if not possible
        return -1;
    }
    convertToBigInt(value) {
        return BigInt(value); // used on XT
    }
    /* eslint-enable */
    // ------------------------------------------------------------------------
    // ########################################################################
    // ########################################################################
    // ########################################################################
    // ########################################################################
    // ########                        ########                        ########
    // ########                        ########                        ########
    // ########                        ########                        ########
    // ########                        ########                        ########
    // ########        ########################        ########################
    // ########        ########################        ########################
    // ########        ########################        ########################
    // ########        ########################        ########################
    // ########                        ########                        ########
    // ########                        ########                        ########
    // ########                        ########                        ########
    // ########                        ########                        ########
    // ########################################################################
    // ########################################################################
    // ########################################################################
    // ########################################################################
    // ########        ########        ########                        ########
    // ########        ########        ########                        ########
    // ########        ########        ########                        ########
    // ########        ########        ########                        ########
    // ################        ########################        ################
    // ################        ########################        ################
    // ################        ########################        ################
    // ################        ########################        ################
    // ########        ########        ################        ################
    // ########        ########        ################        ################
    // ########        ########        ################        ################
    // ########        ########        ################        ################
    // ########################################################################
    // ########################################################################
    // ########################################################################
    // ########################################################################
    // ------------------------------------------------------------------------
    // METHODS BELOW THIS LINE ARE TRANSPILED FROM JAVASCRIPT TO PYTHON AND PHP
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        return {};
    }
    async fetchAccounts(params = {}) {
        throw new NotSupported(this.id + ' fetchAccounts() is not supported yet');
    }
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchTrades() is not supported yet');
    }
    async watchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' watchTrades() is not supported yet');
    }
    async fetchDepositAddresses(codes = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchDepositAddresses() is not supported yet');
    }
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchOrderBook() is not supported yet');
    }
    async watchOrderBook(symbol, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' watchOrderBook() is not supported yet');
    }
    async fetchTime(params = {}) {
        throw new NotSupported(this.id + ' fetchTime() is not supported yet');
    }
    async fetchTradingLimits(symbols = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchTradingLimits() is not supported yet');
    }
    parseTicker(ticker, market = undefined) {
        throw new NotSupported(this.id + ' parseTicker() is not supported yet');
    }
    parseDepositAddress(depositAddress, currency = undefined) {
        throw new NotSupported(this.id + ' parseDepositAddress() is not supported yet');
    }
    parseTrade(trade, market = undefined) {
        throw new NotSupported(this.id + ' parseTrade() is not supported yet');
    }
    parseTransaction(transaction, currency = undefined) {
        throw new NotSupported(this.id + ' parseTransaction() is not supported yet');
    }
    parseTransfer(transfer, currency = undefined) {
        throw new NotSupported(this.id + ' parseTransfer() is not supported yet');
    }
    parseAccount(account) {
        throw new NotSupported(this.id + ' parseAccount() is not supported yet');
    }
    parseLedgerEntry(item, currency = undefined) {
        throw new NotSupported(this.id + ' parseLedgerEntry() is not supported yet');
    }
    parseOrder(order, market = undefined) {
        throw new NotSupported(this.id + ' parseOrder() is not supported yet');
    }
    async fetchBorrowRates(params = {}) {
        throw new NotSupported(this.id + ' fetchBorrowRates() is not supported yet');
    }
    parseMarketLeverageTiers(info, market = undefined) {
        throw new NotSupported(this.id + ' parseMarketLeverageTiers() is not supported yet');
    }
    async fetchLeverageTiers(symbols = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchLeverageTiers() is not supported yet');
    }
    parsePosition(position, market = undefined) {
        throw new NotSupported(this.id + ' parsePosition() is not supported yet');
    }
    parseFundingRateHistory(info, market = undefined) {
        throw new NotSupported(this.id + ' parseFundingRateHistory() is not supported yet');
    }
    parseBorrowInterest(info, market = undefined) {
        throw new NotSupported(this.id + ' parseBorrowInterest() is not supported yet');
    }
    async fetchFundingRates(symbols = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchFundingRates() is not supported yet');
    }
    async transfer(code, amount, fromAccount, toAccount, params = {}) {
        throw new NotSupported(this.id + ' transfer() is not supported yet');
    }
    async withdraw(code, amount, address, tag = undefined, params = {}) {
        throw new NotSupported(this.id + ' withdraw() is not supported yet');
    }
    async createDepositAddress(code, params = {}) {
        throw new NotSupported(this.id + ' createDepositAddress() is not supported yet');
    }
    async setLeverage(leverage, symbol = undefined, params = {}) {
        throw new NotSupported(this.id + ' setLeverage() is not supported yet');
    }
    parseToInt(number) {
        // Solve Common parseInt misuse ex: parseInt ((since / 1000).toString ())
        // using a number as parameter which is not valid in ts
        const stringifiedNumber = number.toString();
        const convertedNumber = parseFloat(stringifiedNumber);
        return parseInt(convertedNumber);
    }
    getDefaultOptions() {
        return {
            'defaultNetworkCodeReplacements': {
                'ETH': { 'ERC20': 'ETH' },
                'TRX': { 'TRC20': 'TRX' },
                'CRO': { 'CRC20': 'CRONOS' },
            },
        };
    }
    safeLedgerEntry(entry, currency = undefined) {
        currency = this.safeCurrency(undefined, currency);
        let direction = this.safeString(entry, 'direction');
        let before = this.safeString(entry, 'before');
        let after = this.safeString(entry, 'after');
        const amount = this.safeString(entry, 'amount');
        if (amount !== undefined) {
            if (before === undefined && after !== undefined) {
                before = Precise.stringSub(after, amount);
            }
            else if (before !== undefined && after === undefined) {
                after = Precise.stringAdd(before, amount);
            }
        }
        if (before !== undefined && after !== undefined) {
            if (direction === undefined) {
                if (Precise.stringGt(before, after)) {
                    direction = 'out';
                }
                if (Precise.stringGt(after, before)) {
                    direction = 'in';
                }
            }
        }
        const fee = this.safeValue(entry, 'fee');
        if (fee !== undefined) {
            fee['cost'] = this.safeNumber(fee, 'cost');
        }
        const timestamp = this.safeInteger(entry, 'timestamp');
        return {
            'id': this.safeString(entry, 'id'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'direction': direction,
            'account': this.safeString(entry, 'account'),
            'referenceId': this.safeString(entry, 'referenceId'),
            'referenceAccount': this.safeString(entry, 'referenceAccount'),
            'type': this.safeString(entry, 'type'),
            'currency': currency['code'],
            'amount': this.parseNumber(amount),
            'before': this.parseNumber(before),
            'after': this.parseNumber(after),
            'status': this.safeString(entry, 'status'),
            'fee': fee,
            'info': entry,
        };
    }
    setMarkets(markets, currencies = undefined) {
        const values = [];
        this.markets_by_id = {};
        // handle marketId conflicts
        // we insert spot markets first
        const marketValues = this.sortBy(this.toArray(markets), 'spot', true);
        for (let i = 0; i < marketValues.length; i++) {
            const value = marketValues[i];
            if (value['id'] in this.markets_by_id) {
                this.markets_by_id[value['id']].push(value);
            }
            else {
                this.markets_by_id[value['id']] = [value];
            }
            const market = this.deepExtend(this.safeMarket(), {
                'precision': this.precision,
                'limits': this.limits,
            }, this.fees['trading'], value);
            values.push(market);
        }
        this.markets = this.indexBy(values, 'symbol');
        const marketsSortedBySymbol = this.keysort(this.markets);
        const marketsSortedById = this.keysort(this.markets_by_id);
        this.symbols = Object.keys(marketsSortedBySymbol);
        this.ids = Object.keys(marketsSortedById);
        if (currencies !== undefined) {
            this.currencies = this.deepExtend(this.currencies, currencies);
        }
        else {
            let baseCurrencies = [];
            let quoteCurrencies = [];
            for (let i = 0; i < values.length; i++) {
                const market = values[i];
                const defaultCurrencyPrecision = (this.precisionMode === DECIMAL_PLACES) ? 8 : this.parseNumber('1e-8');
                const marketPrecision = this.safeValue(market, 'precision', {});
                if ('base' in market) {
                    const currencyPrecision = this.safeValue2(marketPrecision, 'base', 'amount', defaultCurrencyPrecision);
                    const currency = {
                        'id': this.safeString2(market, 'baseId', 'base'),
                        'numericId': this.safeInteger(market, 'baseNumericId'),
                        'code': this.safeString(market, 'base'),
                        'precision': currencyPrecision,
                    };
                    baseCurrencies.push(currency);
                }
                if ('quote' in market) {
                    const currencyPrecision = this.safeValue2(marketPrecision, 'quote', 'price', defaultCurrencyPrecision);
                    const currency = {
                        'id': this.safeString2(market, 'quoteId', 'quote'),
                        'numericId': this.safeInteger(market, 'quoteNumericId'),
                        'code': this.safeString(market, 'quote'),
                        'precision': currencyPrecision,
                    };
                    quoteCurrencies.push(currency);
                }
            }
            baseCurrencies = this.sortBy(baseCurrencies, 'code');
            quoteCurrencies = this.sortBy(quoteCurrencies, 'code');
            this.baseCurrencies = this.indexBy(baseCurrencies, 'code');
            this.quoteCurrencies = this.indexBy(quoteCurrencies, 'code');
            const allCurrencies = this.arrayConcat(baseCurrencies, quoteCurrencies);
            const groupedCurrencies = this.groupBy(allCurrencies, 'code');
            const codes = Object.keys(groupedCurrencies);
            const resultingCurrencies = [];
            for (let i = 0; i < codes.length; i++) {
                const code = codes[i];
                const groupedCurrenciesCode = this.safeValue(groupedCurrencies, code, []);
                let highestPrecisionCurrency = this.safeValue(groupedCurrenciesCode, 0);
                for (let j = 1; j < groupedCurrenciesCode.length; j++) {
                    const currentCurrency = groupedCurrenciesCode[j];
                    if (this.precisionMode === TICK_SIZE) {
                        highestPrecisionCurrency = (currentCurrency['precision'] < highestPrecisionCurrency['precision']) ? currentCurrency : highestPrecisionCurrency;
                    }
                    else {
                        highestPrecisionCurrency = (currentCurrency['precision'] > highestPrecisionCurrency['precision']) ? currentCurrency : highestPrecisionCurrency;
                    }
                }
                resultingCurrencies.push(highestPrecisionCurrency);
            }
            const sortedCurrencies = this.sortBy(resultingCurrencies, 'code');
            this.currencies = this.deepExtend(this.currencies, this.indexBy(sortedCurrencies, 'code'));
        }
        this.currencies_by_id = this.indexBy(this.currencies, 'id');
        const currenciesSortedByCode = this.keysort(this.currencies);
        this.codes = Object.keys(currenciesSortedByCode);
        return this.markets;
    }
    safeBalance(balance) {
        const balances = this.omit(balance, ['info', 'timestamp', 'datetime', 'free', 'used', 'total']);
        const codes = Object.keys(balances);
        balance['free'] = {};
        balance['used'] = {};
        balance['total'] = {};
        const debtBalance = {};
        for (let i = 0; i < codes.length; i++) {
            const code = codes[i];
            let total = this.safeString(balance[code], 'total');
            let free = this.safeString(balance[code], 'free');
            let used = this.safeString(balance[code], 'used');
            const debt = this.safeString(balance[code], 'debt');
            if ((total === undefined) && (free !== undefined) && (used !== undefined)) {
                total = Precise.stringAdd(free, used);
            }
            if ((free === undefined) && (total !== undefined) && (used !== undefined)) {
                free = Precise.stringSub(total, used);
            }
            if ((used === undefined) && (total !== undefined) && (free !== undefined)) {
                used = Precise.stringSub(total, free);
            }
            balance[code]['free'] = this.parseNumber(free);
            balance[code]['used'] = this.parseNumber(used);
            balance[code]['total'] = this.parseNumber(total);
            balance['free'][code] = balance[code]['free'];
            balance['used'][code] = balance[code]['used'];
            balance['total'][code] = balance[code]['total'];
            if (debt !== undefined) {
                balance[code]['debt'] = this.parseNumber(debt);
                debtBalance[code] = balance[code]['debt'];
            }
        }
        const debtBalanceArray = Object.keys(debtBalance);
        const length = debtBalanceArray.length;
        if (length) {
            balance['debt'] = debtBalance;
        }
        return balance;
    }
    safeOrder(order, market = undefined) {
        // parses numbers as strings
        // * it is important pass the trades as unparsed rawTrades
        let amount = this.omitZero(this.safeString(order, 'amount'));
        let remaining = this.safeString(order, 'remaining');
        let filled = this.safeString(order, 'filled');
        let cost = this.safeString(order, 'cost');
        let average = this.omitZero(this.safeString(order, 'average'));
        let price = this.omitZero(this.safeString(order, 'price'));
        let lastTradeTimeTimestamp = this.safeInteger(order, 'lastTradeTimestamp');
        let symbol = this.safeString(order, 'symbol');
        let side = this.safeString(order, 'side');
        const parseFilled = (filled === undefined);
        const parseCost = (cost === undefined);
        const parseLastTradeTimeTimestamp = (lastTradeTimeTimestamp === undefined);
        const fee = this.safeValue(order, 'fee');
        const parseFee = (fee === undefined);
        const parseFees = this.safeValue(order, 'fees') === undefined;
        const parseSymbol = symbol === undefined;
        const parseSide = side === undefined;
        const shouldParseFees = parseFee || parseFees;
        const fees = this.safeValue(order, 'fees', []);
        let trades = [];
        if (parseFilled || parseCost || shouldParseFees) {
            const rawTrades = this.safeValue(order, 'trades', trades);
            const oldNumber = this.number;
            // we parse trades as strings here!
            this.number = String;
            trades = this.parseTrades(rawTrades, market);
            this.number = oldNumber;
            let tradesLength = 0;
            const isArray = Array.isArray(trades);
            if (isArray) {
                tradesLength = trades.length;
            }
            if (isArray && (tradesLength > 0)) {
                // move properties that are defined in trades up into the order
                if (order['symbol'] === undefined) {
                    order['symbol'] = trades[0]['symbol'];
                }
                if (order['side'] === undefined) {
                    order['side'] = trades[0]['side'];
                }
                if (order['type'] === undefined) {
                    order['type'] = trades[0]['type'];
                }
                if (order['id'] === undefined) {
                    order['id'] = trades[0]['order'];
                }
                if (parseFilled) {
                    filled = '0';
                }
                if (parseCost) {
                    cost = '0';
                }
                for (let i = 0; i < trades.length; i++) {
                    const trade = trades[i];
                    const tradeAmount = this.safeString(trade, 'amount');
                    if (parseFilled && (tradeAmount !== undefined)) {
                        filled = Precise.stringAdd(filled, tradeAmount);
                    }
                    const tradeCost = this.safeString(trade, 'cost');
                    if (parseCost && (tradeCost !== undefined)) {
                        cost = Precise.stringAdd(cost, tradeCost);
                    }
                    if (parseSymbol) {
                        symbol = this.safeString(trade, 'symbol');
                    }
                    if (parseSide) {
                        side = this.safeString(trade, 'side');
                    }
                    const tradeTimestamp = this.safeValue(trade, 'timestamp');
                    if (parseLastTradeTimeTimestamp && (tradeTimestamp !== undefined)) {
                        if (lastTradeTimeTimestamp === undefined) {
                            lastTradeTimeTimestamp = tradeTimestamp;
                        }
                        else {
                            lastTradeTimeTimestamp = Math.max(lastTradeTimeTimestamp, tradeTimestamp);
                        }
                    }
                    if (shouldParseFees) {
                        const tradeFees = this.safeValue(trade, 'fees');
                        if (tradeFees !== undefined) {
                            for (let j = 0; j < tradeFees.length; j++) {
                                const tradeFee = tradeFees[j];
                                fees.push(this.extend({}, tradeFee));
                            }
                        }
                        else {
                            const tradeFee = this.safeValue(trade, 'fee');
                            if (tradeFee !== undefined) {
                                fees.push(this.extend({}, tradeFee));
                            }
                        }
                    }
                }
            }
        }
        if (shouldParseFees) {
            const reducedFees = this.reduceFees ? this.reduceFeesByCurrency(fees) : fees;
            const reducedLength = reducedFees.length;
            for (let i = 0; i < reducedLength; i++) {
                reducedFees[i]['cost'] = this.safeNumber(reducedFees[i], 'cost');
                if ('rate' in reducedFees[i]) {
                    reducedFees[i]['rate'] = this.safeNumber(reducedFees[i], 'rate');
                }
            }
            if (!parseFee && (reducedLength === 0)) {
                fee['cost'] = this.safeNumber(fee, 'cost');
                if ('rate' in fee) {
                    fee['rate'] = this.safeNumber(fee, 'rate');
                }
                reducedFees.push(fee);
            }
            order['fees'] = reducedFees;
            if (parseFee && (reducedLength === 1)) {
                order['fee'] = reducedFees[0];
            }
        }
        if (amount === undefined) {
            // ensure amount = filled + remaining
            if (filled !== undefined && remaining !== undefined) {
                amount = Precise.stringAdd(filled, remaining);
            }
            else if (this.safeString(order, 'status') === 'closed') {
                amount = filled;
            }
        }
        if (filled === undefined) {
            if (amount !== undefined && remaining !== undefined) {
                filled = Precise.stringSub(amount, remaining);
            }
        }
        if (remaining === undefined) {
            if (amount !== undefined && filled !== undefined) {
                remaining = Precise.stringSub(amount, filled);
            }
        }
        // ensure that the average field is calculated correctly
        const inverse = this.safeValue(market, 'inverse', false);
        const contractSize = this.numberToString(this.safeValue(market, 'contractSize', 1));
        // inverse
        // price = filled * contract size / cost
        //
        // linear
        // price = cost / (filled * contract size)
        if (average === undefined) {
            if ((filled !== undefined) && (cost !== undefined) && Precise.stringGt(filled, '0')) {
                const filledTimesContractSize = Precise.stringMul(filled, contractSize);
                if (inverse) {
                    average = Precise.stringDiv(filledTimesContractSize, cost);
                }
                else {
                    average = Precise.stringDiv(cost, filledTimesContractSize);
                }
            }
        }
        // similarly
        // inverse
        // cost = filled * contract size / price
        //
        // linear
        // cost = filled * contract size * price
        const costPriceExists = (average !== undefined) || (price !== undefined);
        if (parseCost && (filled !== undefined) && costPriceExists) {
            let multiplyPrice = undefined;
            if (average === undefined) {
                multiplyPrice = price;
            }
            else {
                multiplyPrice = average;
            }
            // contract trading
            const filledTimesContractSize = Precise.stringMul(filled, contractSize);
            if (inverse) {
                cost = Precise.stringDiv(filledTimesContractSize, multiplyPrice);
            }
            else {
                cost = Precise.stringMul(filledTimesContractSize, multiplyPrice);
            }
        }
        // support for market orders
        const orderType = this.safeValue(order, 'type');
        const emptyPrice = (price === undefined) || Precise.stringEquals(price, '0');
        if (emptyPrice && (orderType === 'market')) {
            price = average;
        }
        // we have trades with string values at this point so we will mutate them
        for (let i = 0; i < trades.length; i++) {
            const entry = trades[i];
            entry['amount'] = this.safeNumber(entry, 'amount');
            entry['price'] = this.safeNumber(entry, 'price');
            entry['cost'] = this.safeNumber(entry, 'cost');
            const fee = this.safeValue(entry, 'fee', {});
            fee['cost'] = this.safeNumber(fee, 'cost');
            if ('rate' in fee) {
                fee['rate'] = this.safeNumber(fee, 'rate');
            }
            entry['fee'] = fee;
        }
        let timeInForce = this.safeString(order, 'timeInForce');
        let postOnly = this.safeValue(order, 'postOnly');
        // timeInForceHandling
        if (timeInForce === undefined) {
            if (this.safeString(order, 'type') === 'market') {
                timeInForce = 'IOC';
            }
            // allow postOnly override
            if (postOnly) {
                timeInForce = 'PO';
            }
        }
        else if (postOnly === undefined) {
            // timeInForce is not undefined here
            postOnly = timeInForce === 'PO';
        }
        const timestamp = this.safeInteger(order, 'timestamp');
        let datetime = this.safeString(order, 'datetime');
        if (datetime === undefined) {
            datetime = this.iso8601(timestamp);
        }
        const triggerPrice = this.parseNumber(this.safeString2(order, 'triggerPrice', 'stopPrice'));
        return this.extend(order, {
            'id': this.safeString(order, 'id'),
            'clientOrderId': this.safeString(order, 'clientOrderId'),
            'timestamp': timestamp,
            'datetime': datetime,
            'symbol': symbol,
            'type': this.safeString(order, 'type'),
            'side': side,
            'lastTradeTimestamp': lastTradeTimeTimestamp,
            'price': this.parseNumber(price),
            'amount': this.parseNumber(amount),
            'cost': this.parseNumber(cost),
            'average': this.parseNumber(average),
            'filled': this.parseNumber(filled),
            'remaining': this.parseNumber(remaining),
            'timeInForce': timeInForce,
            'postOnly': postOnly,
            'trades': trades,
            'reduceOnly': this.safeValue(order, 'reduceOnly'),
            'stopPrice': triggerPrice,
            'triggerPrice': triggerPrice,
            'status': this.safeString(order, 'status'),
            'fee': this.safeValue(order, 'fee'),
        });
    }
    parseOrders(orders, market = undefined, since = undefined, limit = undefined, params = {}) {
        //
        // the value of orders is either a dict or a list
        //
        // dict
        //
        //     {
        //         'id1': { ... },
        //         'id2': { ... },
        //         'id3': { ... },
        //         ...
        //     }
        //
        // list
        //
        //     [
        //         { 'id': 'id1', ... },
        //         { 'id': 'id2', ... },
        //         { 'id': 'id3', ... },
        //         ...
        //     ]
        //
        let results = [];
        if (Array.isArray(orders)) {
            for (let i = 0; i < orders.length; i++) {
                const order = this.extend(this.parseOrder(orders[i], market), params);
                results.push(order);
            }
        }
        else {
            const ids = Object.keys(orders);
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const order = this.extend(this.parseOrder(this.extend({ 'id': id }, orders[id]), market), params);
                results.push(order);
            }
        }
        results = this.sortBy(results, 'timestamp');
        const symbol = (market !== undefined) ? market['symbol'] : undefined;
        const tail = since === undefined;
        return this.filterBySymbolSinceLimit(results, symbol, since, limit, tail);
    }
    calculateFee(symbol, type, side, amount, price, takerOrMaker = 'taker', params = {}) {
        if (type === 'market' && takerOrMaker === 'maker') {
            throw new ArgumentsRequired(this.id + ' calculateFee() - you have provided incompatible arguments - "market" type order can not be "maker". Change either the "type" or the "takerOrMaker" argument to calculate the fee.');
        }
        const market = this.markets[symbol];
        const feeSide = this.safeString(market, 'feeSide', 'quote');
        let key = 'quote';
        let cost = undefined;
        const amountString = this.numberToString(amount);
        const priceString = this.numberToString(price);
        if (feeSide === 'quote') {
            // the fee is always in quote currency
            cost = Precise.stringMul(amountString, priceString);
        }
        else if (feeSide === 'base') {
            // the fee is always in base currency
            cost = amountString;
        }
        else if (feeSide === 'get') {
            // the fee is always in the currency you get
            cost = amountString;
            if (side === 'sell') {
                cost = Precise.stringMul(cost, priceString);
            }
            else {
                key = 'base';
            }
        }
        else if (feeSide === 'give') {
            // the fee is always in the currency you give
            cost = amountString;
            if (side === 'buy') {
                cost = Precise.stringMul(cost, priceString);
            }
            else {
                key = 'base';
            }
        }
        // for derivatives, the fee is in 'settle' currency
        if (!market['spot']) {
            key = 'settle';
        }
        // even if `takerOrMaker` argument was set to 'maker', for 'market' orders we should forcefully override it to 'taker'
        if (type === 'market') {
            takerOrMaker = 'taker';
        }
        const rate = this.safeString(market, takerOrMaker);
        if (cost !== undefined) {
            cost = Precise.stringMul(cost, rate);
        }
        return {
            'type': takerOrMaker,
            'currency': market[key],
            'rate': this.parseNumber(rate),
            'cost': this.parseNumber(cost),
        };
    }
    safeTrade(trade, market = undefined) {
        const amount = this.safeString(trade, 'amount');
        const price = this.safeString(trade, 'price');
        let cost = this.safeString(trade, 'cost');
        if (cost === undefined) {
            // contract trading
            const contractSize = this.safeString(market, 'contractSize');
            let multiplyPrice = price;
            if (contractSize !== undefined) {
                const inverse = this.safeValue(market, 'inverse', false);
                if (inverse) {
                    multiplyPrice = Precise.stringDiv('1', price);
                }
                multiplyPrice = Precise.stringMul(multiplyPrice, contractSize);
            }
            cost = Precise.stringMul(multiplyPrice, amount);
        }
        const parseFee = this.safeValue(trade, 'fee') === undefined;
        const parseFees = this.safeValue(trade, 'fees') === undefined;
        const shouldParseFees = parseFee || parseFees;
        const fees = [];
        const fee = this.safeValue(trade, 'fee');
        if (shouldParseFees) {
            const reducedFees = this.reduceFees ? this.reduceFeesByCurrency(fees) : fees;
            const reducedLength = reducedFees.length;
            for (let i = 0; i < reducedLength; i++) {
                reducedFees[i]['cost'] = this.safeNumber(reducedFees[i], 'cost');
                if ('rate' in reducedFees[i]) {
                    reducedFees[i]['rate'] = this.safeNumber(reducedFees[i], 'rate');
                }
            }
            if (!parseFee && (reducedLength === 0)) {
                fee['cost'] = this.safeNumber(fee, 'cost');
                if ('rate' in fee) {
                    fee['rate'] = this.safeNumber(fee, 'rate');
                }
                reducedFees.push(fee);
            }
            if (parseFees) {
                trade['fees'] = reducedFees;
            }
            if (parseFee && (reducedLength === 1)) {
                trade['fee'] = reducedFees[0];
            }
            const tradeFee = this.safeValue(trade, 'fee');
            if (tradeFee !== undefined) {
                tradeFee['cost'] = this.safeNumber(tradeFee, 'cost');
                if ('rate' in tradeFee) {
                    tradeFee['rate'] = this.safeNumber(tradeFee, 'rate');
                }
                trade['fee'] = tradeFee;
            }
        }
        trade['amount'] = this.parseNumber(amount);
        trade['price'] = this.parseNumber(price);
        trade['cost'] = this.parseNumber(cost);
        return trade;
    }
    reduceFeesByCurrency(fees) {
        //
        // this function takes a list of fee structures having the following format
        //
        //     string = true
        //
        //     [
        //         { 'currency': 'BTC', 'cost': '0.1' },
        //         { 'currency': 'BTC', 'cost': '0.2'  },
        //         { 'currency': 'BTC', 'cost': '0.2', 'rate': '0.00123' },
        //         { 'currency': 'BTC', 'cost': '0.4', 'rate': '0.00123' },
        //         { 'currency': 'BTC', 'cost': '0.5', 'rate': '0.00456' },
        //         { 'currency': 'USDT', 'cost': '12.3456' },
        //     ]
        //
        //     string = false
        //
        //     [
        //         { 'currency': 'BTC', 'cost': 0.1 },
        //         { 'currency': 'BTC', 'cost': 0.2 },
        //         { 'currency': 'BTC', 'cost': 0.2, 'rate': 0.00123 },
        //         { 'currency': 'BTC', 'cost': 0.4, 'rate': 0.00123 },
        //         { 'currency': 'BTC', 'cost': 0.5, 'rate': 0.00456 },
        //         { 'currency': 'USDT', 'cost': 12.3456 },
        //     ]
        //
        // and returns a reduced fee list, where fees are summed per currency and rate (if any)
        //
        //     string = true
        //
        //     [
        //         { 'currency': 'BTC', 'cost': '0.3'  },
        //         { 'currency': 'BTC', 'cost': '0.6', 'rate': '0.00123' },
        //         { 'currency': 'BTC', 'cost': '0.5', 'rate': '0.00456' },
        //         { 'currency': 'USDT', 'cost': '12.3456' },
        //     ]
        //
        //     string  = false
        //
        //     [
        //         { 'currency': 'BTC', 'cost': 0.3  },
        //         { 'currency': 'BTC', 'cost': 0.6, 'rate': 0.00123 },
        //         { 'currency': 'BTC', 'cost': 0.5, 'rate': 0.00456 },
        //         { 'currency': 'USDT', 'cost': 12.3456 },
        //     ]
        //
        const reduced = {};
        for (let i = 0; i < fees.length; i++) {
            const fee = fees[i];
            const feeCurrencyCode = this.safeString(fee, 'currency');
            if (feeCurrencyCode !== undefined) {
                const rate = this.safeString(fee, 'rate');
                const cost = this.safeValue(fee, 'cost');
                if (Precise.stringEq(cost, '0')) {
                    // omit zero cost fees
                    continue;
                }
                if (!(feeCurrencyCode in reduced)) {
                    reduced[feeCurrencyCode] = {};
                }
                const rateKey = (rate === undefined) ? '' : rate;
                if (rateKey in reduced[feeCurrencyCode]) {
                    reduced[feeCurrencyCode][rateKey]['cost'] = Precise.stringAdd(reduced[feeCurrencyCode][rateKey]['cost'], cost);
                }
                else {
                    reduced[feeCurrencyCode][rateKey] = {
                        'currency': feeCurrencyCode,
                        'cost': cost,
                    };
                    if (rate !== undefined) {
                        reduced[feeCurrencyCode][rateKey]['rate'] = rate;
                    }
                }
            }
        }
        let result = [];
        const feeValues = Object.values(reduced);
        for (let i = 0; i < feeValues.length; i++) {
            const reducedFeeValues = Object.values(feeValues[i]);
            result = this.arrayConcat(result, reducedFeeValues);
        }
        return result;
    }
    safeTicker(ticker, market = undefined) {
        let open = this.safeValue(ticker, 'open');
        let close = this.safeValue(ticker, 'close');
        let last = this.safeValue(ticker, 'last');
        let change = this.safeValue(ticker, 'change');
        let percentage = this.safeValue(ticker, 'percentage');
        let average = this.safeValue(ticker, 'average');
        let vwap = this.safeValue(ticker, 'vwap');
        const baseVolume = this.safeValue(ticker, 'baseVolume');
        const quoteVolume = this.safeValue(ticker, 'quoteVolume');
        if (vwap === undefined) {
            vwap = Precise.stringDiv(quoteVolume, baseVolume);
        }
        if ((last !== undefined) && (close === undefined)) {
            close = last;
        }
        else if ((last === undefined) && (close !== undefined)) {
            last = close;
        }
        if ((last !== undefined) && (open !== undefined)) {
            if (change === undefined) {
                change = Precise.stringSub(last, open);
            }
            if (average === undefined) {
                average = Precise.stringDiv(Precise.stringAdd(last, open), '2');
            }
        }
        if ((percentage === undefined) && (change !== undefined) && (open !== undefined) && Precise.stringGt(open, '0')) {
            percentage = Precise.stringMul(Precise.stringDiv(change, open), '100');
        }
        if ((change === undefined) && (percentage !== undefined) && (open !== undefined)) {
            change = Precise.stringDiv(Precise.stringMul(percentage, open), '100');
        }
        if ((open === undefined) && (last !== undefined) && (change !== undefined)) {
            open = Precise.stringSub(last, change);
        }
        // timestamp and symbol operations don't belong in safeTicker
        // they should be done in the derived classes
        return this.extend(ticker, {
            'bid': this.omitZero(this.safeNumber(ticker, 'bid')),
            'bidVolume': this.safeNumber(ticker, 'bidVolume'),
            'ask': this.omitZero(this.safeNumber(ticker, 'ask')),
            'askVolume': this.safeNumber(ticker, 'askVolume'),
            'high': this.omitZero(this.safeNumber(ticker, 'high')),
            'low': this.omitZero(this.safeNumber(ticker, 'low')),
            'open': this.omitZero(this.parseNumber(open)),
            'close': this.omitZero(this.parseNumber(close)),
            'last': this.omitZero(this.parseNumber(last)),
            'change': this.parseNumber(change),
            'percentage': this.parseNumber(percentage),
            'average': this.omitZero(this.parseNumber(average)),
            'vwap': this.omitZero(this.parseNumber(vwap)),
            'baseVolume': this.parseNumber(baseVolume),
            'quoteVolume': this.parseNumber(quoteVolume),
            'previousClose': this.safeNumber(ticker, 'previousClose'),
        });
    }
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        if (!this.has['fetchTrades']) {
            throw new NotSupported(this.id + ' fetchOHLCV() is not supported yet');
        }
        const trades = await this.fetchTrades(symbol, since, limit, params);
        const ohlcvc = this.buildOHLCVC(trades, timeframe, since, limit);
        const result = [];
        for (let i = 0; i < ohlcvc.length; i++) {
            result.push([
                this.safeInteger(ohlcvc[i], 0),
                this.safeNumber(ohlcvc[i], 1),
                this.safeNumber(ohlcvc[i], 2),
                this.safeNumber(ohlcvc[i], 3),
                this.safeNumber(ohlcvc[i], 4),
                this.safeNumber(ohlcvc[i], 5),
            ]);
        }
        return result;
    }
    async watchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' watchOHLCV() is not supported yet');
    }
    convertTradingViewToOHLCV(ohlcvs, timestamp = 't', open = 'o', high = 'h', low = 'l', close = 'c', volume = 'v', ms = false) {
        const result = [];
        const timestamps = this.safeValue(ohlcvs, timestamp, []);
        const opens = this.safeValue(ohlcvs, open, []);
        const highs = this.safeValue(ohlcvs, high, []);
        const lows = this.safeValue(ohlcvs, low, []);
        const closes = this.safeValue(ohlcvs, close, []);
        const volumes = this.safeValue(ohlcvs, volume, []);
        for (let i = 0; i < timestamps.length; i++) {
            result.push([
                ms ? this.safeInteger(timestamps, i) : this.safeTimestamp(timestamps, i),
                this.safeValue(opens, i),
                this.safeValue(highs, i),
                this.safeValue(lows, i),
                this.safeValue(closes, i),
                this.safeValue(volumes, i),
            ]);
        }
        return result;
    }
    convertOHLCVToTradingView(ohlcvs, timestamp = 't', open = 'o', high = 'h', low = 'l', close = 'c', volume = 'v', ms = false) {
        const result = {};
        result[timestamp] = [];
        result[open] = [];
        result[high] = [];
        result[low] = [];
        result[close] = [];
        result[volume] = [];
        for (let i = 0; i < ohlcvs.length; i++) {
            const ts = ms ? ohlcvs[i][0] : this.parseToInt(ohlcvs[i][0] / 1000);
            result[timestamp].push(ts);
            result[open].push(ohlcvs[i][1]);
            result[high].push(ohlcvs[i][2]);
            result[low].push(ohlcvs[i][3]);
            result[close].push(ohlcvs[i][4]);
            result[volume].push(ohlcvs[i][5]);
        }
        return result;
    }
    marketIds(symbols) {
        if (symbols === undefined) {
            return symbols;
        }
        const result = [];
        for (let i = 0; i < symbols.length; i++) {
            result.push(this.marketId(symbols[i]));
        }
        return result;
    }
    marketSymbols(symbols) {
        if (symbols === undefined) {
            return symbols;
        }
        const result = [];
        for (let i = 0; i < symbols.length; i++) {
            result.push(this.symbol(symbols[i]));
        }
        return result;
    }
    marketCodes(codes) {
        if (codes === undefined) {
            return codes;
        }
        const result = [];
        for (let i = 0; i < codes.length; i++) {
            result.push(this.commonCurrencyCode(codes[i]));
        }
        return result;
    }
    parseBidsAsks(bidasks, priceKey = 0, amountKey = 1) {
        bidasks = this.toArray(bidasks);
        const result = [];
        for (let i = 0; i < bidasks.length; i++) {
            result.push(this.parseBidAsk(bidasks[i], priceKey, amountKey));
        }
        return result;
    }
    async fetchL2OrderBook(symbol, limit = undefined, params = {}) {
        const orderbook = await this.fetchOrderBook(symbol, limit, params);
        return this.extend(orderbook, {
            'asks': this.sortBy(this.aggregate(orderbook['asks']), 0),
            'bids': this.sortBy(this.aggregate(orderbook['bids']), 0, true),
        });
    }
    filterBySymbol(objects, symbol = undefined) {
        if (symbol === undefined) {
            return objects;
        }
        const result = [];
        for (let i = 0; i < objects.length; i++) {
            const objectSymbol = this.safeString(objects[i], 'symbol');
            if (objectSymbol === symbol) {
                result.push(objects[i]);
            }
        }
        return result;
    }
    parseOHLCV(ohlcv, market = undefined) {
        if (Array.isArray(ohlcv)) {
            return [
                this.safeInteger(ohlcv, 0),
                this.safeNumber(ohlcv, 1),
                this.safeNumber(ohlcv, 2),
                this.safeNumber(ohlcv, 3),
                this.safeNumber(ohlcv, 4),
                this.safeNumber(ohlcv, 5), // volume
            ];
        }
        return ohlcv;
    }
    getNetwork(network, code) {
        network = network.toUpperCase();
        const aliases = {
            'ETHEREUM': 'ETH',
            'ETHER': 'ETH',
            'ERC20': 'ETH',
            'ETH': 'ETH',
            'TRC20': 'TRX',
            'TRON': 'TRX',
            'TRX': 'TRX',
            'BEP20': 'BSC',
            'BSC': 'BSC',
            'HRC20': 'HT',
            'HECO': 'HT',
            'SPL': 'SOL',
            'SOL': 'SOL',
            'TERRA': 'LUNA',
            'LUNA': 'LUNA',
            'POLYGON': 'MATIC',
            'MATIC': 'MATIC',
            'EOS': 'EOS',
            'WAVES': 'WAVES',
            'AVALANCHE': 'AVAX',
            'AVAX': 'AVAX',
            'QTUM': 'QTUM',
            'CHZ': 'CHZ',
            'NEO': 'NEO',
            'ONT': 'ONT',
            'RON': 'RON',
        };
        if (network === code) {
            return network;
        }
        else if (network in aliases) {
            return aliases[network];
        }
        else {
            throw new NotSupported(this.id + ' network ' + network + ' is not yet supported');
        }
    }
    networkCodeToId(networkCode, currencyCode = undefined) {
        /**
         * @ignore
         * @method
         * @name exchange#networkCodeToId
         * @description tries to convert the provided networkCode (which is expected to be an unified network code) to a network id. In order to achieve this, derived class needs to have 'options->networks' defined.
         * @param {string} networkCode unified network code
         * @param {string|undefined} currencyCode unified currency code, but this argument is not required by default, unless there is an exchange (like huobi) that needs an override of the method to be able to pass currencyCode argument additionally
         * @returns {[string|undefined]} exchange-specific network id
         */
        const networkIdsByCodes = this.safeValue(this.options, 'networks', {});
        let networkId = this.safeString(networkIdsByCodes, networkCode);
        // for example, if 'ETH' is passed for networkCode, but 'ETH' key not defined in `options->networks` object
        if (networkId === undefined) {
            if (currencyCode === undefined) {
                // if currencyCode was not provided, then we just set passed value to networkId
                networkId = networkCode;
            }
            else {
                // if currencyCode was provided, then we try to find if that currencyCode has a replacement (i.e. ERC20 for ETH)
                const defaultNetworkCodeReplacements = this.safeValue(this.options, 'defaultNetworkCodeReplacements', {});
                if (currencyCode in defaultNetworkCodeReplacements) {
                    // if there is a replacement for the passed networkCode, then we use it to find network-id in `options->networks` object
                    const replacementObject = defaultNetworkCodeReplacements[currencyCode]; // i.e. { 'ERC20': 'ETH' }
                    const keys = Object.keys(replacementObject);
                    for (let i = 0; i < keys.length; i++) {
                        const key = keys[i];
                        const value = replacementObject[key];
                        // if value matches to provided unified networkCode, then we use it's key to find network-id in `options->networks` object
                        if (value === networkCode) {
                            networkId = this.safeString(networkIdsByCodes, key);
                            break;
                        }
                    }
                }
                // if it wasn't found, we just set the provided value to network-id
                if (networkId === undefined) {
                    networkId = networkCode;
                }
            }
        }
        return networkId;
    }
    networkIdToCode(networkId, currencyCode = undefined) {
        /**
         * @ignore
         * @method
         * @name exchange#networkIdToCode
         * @description tries to convert the provided exchange-specific networkId to an unified network Code. In order to achieve this, derived class needs to have 'options->networksById' defined.
         * @param {string} networkId unified network code
         * @param {string|undefined} currencyCode unified currency code, but this argument is not required by default, unless there is an exchange (like huobi) that needs an override of the method to be able to pass currencyCode argument additionally
         * @returns {[string|undefined]} unified network code
         */
        const networkCodesByIds = this.safeValue(this.options, 'networksById', {});
        let networkCode = this.safeString(networkCodesByIds, networkId, networkId);
        // replace mainnet network-codes (i.e. ERC20->ETH)
        if (currencyCode !== undefined) {
            const defaultNetworkCodeReplacements = this.safeValue(this.options, 'defaultNetworkCodeReplacements', {});
            if (currencyCode in defaultNetworkCodeReplacements) {
                const replacementObject = this.safeValue(defaultNetworkCodeReplacements, currencyCode, {});
                networkCode = this.safeString(replacementObject, networkCode, networkCode);
            }
        }
        return networkCode;
    }
    networkCodesToIds(networkCodes = undefined) {
        /**
         * @ignore
         * @method
         * @name exchange#networkCodesToIds
         * @description tries to convert the provided networkCode (which is expected to be an unified network code) to a network id. In order to achieve this, derived class needs to have 'options->networks' defined.
         * @param {[string]|undefined} networkCodes unified network codes
         * @returns {[string|undefined]} exchange-specific network ids
         */
        if (networkCodes === undefined) {
            return undefined;
        }
        const ids = [];
        for (let i = 0; i < networkCodes.length; i++) {
            const networkCode = networkCodes[i];
            ids.push(this.networkCodeToId(networkCode));
        }
        return ids;
    }
    handleNetworkCodeAndParams(params) {
        const networkCodeInParams = this.safeString2(params, 'networkCode', 'network');
        if (networkCodeInParams !== undefined) {
            params = this.omit(params, ['networkCode', 'network']);
        }
        // if it was not defined by user, we should not set it from 'defaultNetworks', because handleNetworkCodeAndParams is for only request-side and thus we do not fill it with anything. We can only use 'defaultNetworks' after parsing response-side
        return [networkCodeInParams, params];
    }
    defaultNetworkCode(currencyCode) {
        let defaultNetworkCode = undefined;
        const defaultNetworks = this.safeValue(this.options, 'defaultNetworks', {});
        if (currencyCode in defaultNetworks) {
            // if currency had set its network in "defaultNetworks", use it
            defaultNetworkCode = defaultNetworks[currencyCode];
        }
        else {
            // otherwise, try to use the global-scope 'defaultNetwork' value (even if that network is not supported by currency, it doesn't make any problem, this will be just used "at first" if currency supports this network at all)
            const defaultNetwork = this.safeValue(this.options, 'defaultNetwork');
            if (defaultNetwork !== undefined) {
                defaultNetworkCode = defaultNetwork;
            }
        }
        return defaultNetworkCode;
    }
    selectNetworkCodeFromUnifiedNetworks(currencyCode, networkCode, indexedNetworkEntries) {
        return this.selectNetworkKeyFromNetworks(currencyCode, networkCode, indexedNetworkEntries, true);
    }
    selectNetworkIdFromRawNetworks(currencyCode, networkCode, indexedNetworkEntries) {
        return this.selectNetworkKeyFromNetworks(currencyCode, networkCode, indexedNetworkEntries, false);
    }
    selectNetworkKeyFromNetworks(currencyCode, networkCode, indexedNetworkEntries, isIndexedByUnifiedNetworkCode = false) {
        // this method is used against raw & unparse network entries, which are just indexed by network id
        let chosenNetworkId = undefined;
        const availableNetworkIds = Object.keys(indexedNetworkEntries);
        const responseNetworksLength = availableNetworkIds.length;
        if (networkCode !== undefined) {
            if (responseNetworksLength === 0) {
                throw new NotSupported(this.id + ' - ' + networkCode + ' network did not return any result for ' + currencyCode);
            }
            else {
                // if networkCode was provided by user, we should check it after response, as the referenced exchange doesn't support network-code during request
                const networkId = isIndexedByUnifiedNetworkCode ? networkCode : this.networkCodeToId(networkCode, currencyCode);
                if (networkId in indexedNetworkEntries) {
                    chosenNetworkId = networkId;
                }
                else {
                    throw new NotSupported(this.id + ' - ' + networkId + ' network was not found for ' + currencyCode + ', use one of ' + availableNetworkIds.join(', '));
                }
            }
        }
        else {
            if (responseNetworksLength === 0) {
                throw new NotSupported(this.id + ' - no networks were returned for ' + currencyCode);
            }
            else {
                // if networkCode was not provided by user, then we try to use the default network (if it was defined in "defaultNetworks"), otherwise, we just return the first network entry
                const defaultNetworkCode = this.defaultNetworkCode(currencyCode);
                const defaultNetworkId = isIndexedByUnifiedNetworkCode ? defaultNetworkCode : this.networkCodeToId(defaultNetworkCode, currencyCode);
                chosenNetworkId = (defaultNetworkId in indexedNetworkEntries) ? defaultNetworkId : availableNetworkIds[0];
            }
        }
        return chosenNetworkId;
    }
    safeNumber2(dictionary, key1, key2, d = undefined) {
        const value = this.safeString2(dictionary, key1, key2);
        return this.parseNumber(value, d);
    }
    parseOrderBook(orderbook, symbol, timestamp = undefined, bidsKey = 'bids', asksKey = 'asks', priceKey = 0, amountKey = 1) {
        const bids = this.parseBidsAsks(this.safeValue(orderbook, bidsKey, []), priceKey, amountKey);
        const asks = this.parseBidsAsks(this.safeValue(orderbook, asksKey, []), priceKey, amountKey);
        return {
            'symbol': symbol,
            'bids': this.sortBy(bids, 0, true),
            'asks': this.sortBy(asks, 0),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'nonce': undefined,
        };
    }
    parseOHLCVs(ohlcvs, market = undefined, timeframe = '1m', since = undefined, limit = undefined) {
        const results = [];
        for (let i = 0; i < ohlcvs.length; i++) {
            results.push(this.parseOHLCV(ohlcvs[i], market));
        }
        const sorted = this.sortBy(results, 0);
        const tail = (since === undefined);
        return this.filterBySinceLimit(sorted, since, limit, 0, tail);
    }
    parseLeverageTiers(response, symbols = undefined, marketIdKey = undefined) {
        // marketIdKey should only be undefined when response is a dictionary
        symbols = this.marketSymbols(symbols);
        const tiers = {};
        for (let i = 0; i < response.length; i++) {
            const item = response[i];
            const id = this.safeString(item, marketIdKey);
            const market = this.safeMarket(id, undefined, undefined, this.safeString(this.options, 'defaultType'));
            const symbol = market['symbol'];
            const contract = this.safeValue(market, 'contract', false);
            if (contract && ((symbols === undefined) || this.inArray(symbol, symbols))) {
                tiers[symbol] = this.parseMarketLeverageTiers(item, market);
            }
        }
        return tiers;
    }
    async loadTradingLimits(symbols = undefined, reload = false, params = {}) {
        if (this.has['fetchTradingLimits']) {
            if (reload || !('limitsLoaded' in this.options)) {
                const response = await this.fetchTradingLimits(symbols);
                for (let i = 0; i < symbols.length; i++) {
                    const symbol = symbols[i];
                    this.markets[symbol] = this.deepExtend(this.markets[symbol], response[symbol]);
                }
                this.options['limitsLoaded'] = this.milliseconds();
            }
        }
        return this.markets;
    }
    safePosition(position) {
        // simplified version of: /pull/12765/
        const unrealizedPnlString = this.safeString(position, 'unrealisedPnl');
        const initialMarginString = this.safeString(position, 'initialMargin');
        //
        // PERCENTAGE
        //
        const percentage = this.safeValue(position, 'percentage');
        if ((percentage === undefined) && (unrealizedPnlString !== undefined) && (initialMarginString !== undefined)) {
            // as it was done in all implementations ( aax, btcex, bybit, deribit, ftx, gate, kucoinfutures, phemex )
            const percentageString = Precise.stringMul(Precise.stringDiv(unrealizedPnlString, initialMarginString, 4), '100');
            position['percentage'] = this.parseNumber(percentageString);
        }
        return position;
    }
    parsePositions(positions, symbols = undefined, params = {}) {
        symbols = this.marketSymbols(symbols);
        positions = this.toArray(positions);
        const result = [];
        for (let i = 0; i < positions.length; i++) {
            const position = this.extend(this.parsePosition(positions[i], undefined), params);
            result.push(position);
        }
        return this.filterByArray(result, 'symbol', symbols, false);
    }
    parseAccounts(accounts, params = {}) {
        accounts = this.toArray(accounts);
        const result = [];
        for (let i = 0; i < accounts.length; i++) {
            const account = this.extend(this.parseAccount(accounts[i]), params);
            result.push(account);
        }
        return result;
    }
    parseTrades(trades, market = undefined, since = undefined, limit = undefined, params = {}) {
        trades = this.toArray(trades);
        let result = [];
        for (let i = 0; i < trades.length; i++) {
            const trade = this.extend(this.parseTrade(trades[i], market), params);
            result.push(trade);
        }
        result = this.sortBy2(result, 'timestamp', 'id');
        const symbol = (market !== undefined) ? market['symbol'] : undefined;
        const tail = (since === undefined);
        return this.filterBySymbolSinceLimit(result, symbol, since, limit, tail);
    }
    parseTransactions(transactions, currency = undefined, since = undefined, limit = undefined, params = {}) {
        transactions = this.toArray(transactions);
        let result = [];
        for (let i = 0; i < transactions.length; i++) {
            const transaction = this.extend(this.parseTransaction(transactions[i], currency), params);
            result.push(transaction);
        }
        result = this.sortBy(result, 'timestamp');
        const code = (currency !== undefined) ? currency['code'] : undefined;
        const tail = (since === undefined);
        return this.filterByCurrencySinceLimit(result, code, since, limit, tail);
    }
    parseTransfers(transfers, currency = undefined, since = undefined, limit = undefined, params = {}) {
        transfers = this.toArray(transfers);
        let result = [];
        for (let i = 0; i < transfers.length; i++) {
            const transfer = this.extend(this.parseTransfer(transfers[i], currency), params);
            result.push(transfer);
        }
        result = this.sortBy(result, 'timestamp');
        const code = (currency !== undefined) ? currency['code'] : undefined;
        const tail = (since === undefined);
        return this.filterByCurrencySinceLimit(result, code, since, limit, tail);
    }
    parseLedger(data, currency = undefined, since = undefined, limit = undefined, params = {}) {
        let result = [];
        const arrayData = this.toArray(data);
        for (let i = 0; i < arrayData.length; i++) {
            const itemOrItems = this.parseLedgerEntry(arrayData[i], currency);
            if (Array.isArray(itemOrItems)) {
                for (let j = 0; j < itemOrItems.length; j++) {
                    result.push(this.extend(itemOrItems[j], params));
                }
            }
            else {
                result.push(this.extend(itemOrItems, params));
            }
        }
        result = this.sortBy(result, 'timestamp');
        const code = (currency !== undefined) ? currency['code'] : undefined;
        const tail = (since === undefined);
        return this.filterByCurrencySinceLimit(result, code, since, limit, tail);
    }
    nonce() {
        return this.seconds();
    }
    setHeaders(headers) {
        return headers;
    }
    marketId(symbol) {
        const market = this.market(symbol);
        if (market !== undefined) {
            return market['id'];
        }
        return symbol;
    }
    symbol(symbol) {
        const market = this.market(symbol);
        return this.safeString(market, 'symbol', symbol);
    }
    resolvePath(path, params) {
        return [
            this.implodeParams(path, params),
            this.omit(params, this.extractParams(path)),
        ];
    }
    filterByArray(objects, key, values = undefined, indexed = true) {
        objects = this.toArray(objects);
        // return all of them if no values were passed
        if (values === undefined || !values) {
            return indexed ? this.indexBy(objects, key) : objects;
        }
        const results = [];
        for (let i = 0; i < objects.length; i++) {
            if (this.inArray(objects[i][key], values)) {
                results.push(objects[i]);
            }
        }
        return indexed ? this.indexBy(results, key) : results;
    }
    async fetch2(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined, config = {}, context = {}) {
        if (this.enableRateLimit) {
            const cost = this.calculateRateLimiterCost(api, method, path, params, config, context);
            await this.throttle(cost);
        }
        this.lastRestRequestTimestamp = this.milliseconds();
        const request = this.sign(path, api, method, params, headers, body);
        return await this.fetch(request['url'], request['method'], request['headers'], request['body']);
    }
    async request(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined, config = {}, context = {}) {
        return await this.fetch2(path, api, method, params, headers, body, config, context);
    }
    async loadAccounts(reload = false, params = {}) {
        if (reload) {
            this.accounts = await this.fetchAccounts(params);
        }
        else {
            if (this.accounts) {
                return this.accounts;
            }
            else {
                this.accounts = await this.fetchAccounts(params);
            }
        }
        this.accountsById = this.indexBy(this.accounts, 'id');
        return this.accounts;
    }
    async fetchOHLCVC(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        if (!this.has['fetchTrades']) {
            throw new NotSupported(this.id + ' fetchOHLCV() is not supported yet');
        }
        await this.loadMarkets();
        const trades = await this.fetchTrades(symbol, since, limit, params);
        return this.buildOHLCVC(trades, timeframe, since, limit);
    }
    parseTradingViewOHLCV(ohlcvs, market = undefined, timeframe = '1m', since = undefined, limit = undefined) {
        const result = this.convertTradingViewToOHLCV(ohlcvs);
        return this.parseOHLCVs(result, market, timeframe, since, limit);
    }
    async editLimitBuyOrder(id, symbol, amount, price = undefined, params = {}) {
        return await this.editLimitOrder(id, symbol, 'buy', amount, price, params);
    }
    async editLimitSellOrder(id, symbol, amount, price = undefined, params = {}) {
        return await this.editLimitOrder(id, symbol, 'sell', amount, price, params);
    }
    async editLimitOrder(id, symbol, side, amount, price = undefined, params = {}) {
        return await this.editOrder(id, symbol, 'limit', side, amount, price, params);
    }
    async editOrder(id, symbol, type, side, amount, price = undefined, params = {}) {
        await this.cancelOrder(id, symbol);
        return await this.createOrder(symbol, type, side, amount, price, params);
    }
    async fetchPermissions(params = {}) {
        throw new NotSupported(this.id + ' fetchPermissions() is not supported yet');
    }
    async fetchPosition(symbol, params = {}) {
        throw new NotSupported(this.id + ' fetchPosition() is not supported yet');
    }
    async fetchPositions(symbols = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchPositions() is not supported yet');
    }
    async fetchPositionsRisk(symbols = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchPositionsRisk() is not supported yet');
    }
    async fetchBidsAsks(symbols = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchBidsAsks() is not supported yet');
    }
    parseBidAsk(bidask, priceKey = 0, amountKey = 1) {
        const price = this.safeNumber(bidask, priceKey);
        const amount = this.safeNumber(bidask, amountKey);
        return [price, amount];
    }
    safeCurrency(currencyId, currency = undefined) {
        if ((currencyId === undefined) && (currency !== undefined)) {
            return currency;
        }
        if ((this.currencies_by_id !== undefined) && (currencyId in this.currencies_by_id) && (this.currencies_by_id[currencyId] !== undefined)) {
            return this.currencies_by_id[currencyId];
        }
        let code = currencyId;
        if (currencyId !== undefined) {
            code = this.commonCurrencyCode(currencyId.toUpperCase());
        }
        return {
            'id': currencyId,
            'code': code,
        };
    }
    safeMarket(marketId = undefined, market = undefined, delimiter = undefined, marketType = undefined) {
        const result = {
            'id': marketId,
            'symbol': marketId,
            'base': undefined,
            'quote': undefined,
            'baseId': undefined,
            'quoteId': undefined,
            'active': undefined,
            'type': undefined,
            'linear': undefined,
            'inverse': undefined,
            'spot': false,
            'swap': false,
            'future': false,
            'option': false,
            'margin': false,
            'contract': false,
            'contractSize': undefined,
            'expiry': undefined,
            'expiryDatetime': undefined,
            'optionType': undefined,
            'strike': undefined,
            'settle': undefined,
            'settleId': undefined,
            'precision': {
                'amount': undefined,
                'price': undefined,
            },
            'limits': {
                'amount': {
                    'min': undefined,
                    'max': undefined,
                },
                'price': {
                    'min': undefined,
                    'max': undefined,
                },
                'cost': {
                    'min': undefined,
                    'max': undefined,
                },
            },
            'info': undefined,
        };
        if (marketId !== undefined) {
            if ((this.markets_by_id !== undefined) && (marketId in this.markets_by_id)) {
                const markets = this.markets_by_id[marketId];
                const numMarkets = markets.length;
                if (numMarkets === 1) {
                    return markets[0];
                }
                else {
                    if ((marketType === undefined) && (market === undefined)) {
                        throw new ArgumentsRequired(this.id + ' safeMarket() requires a fourth argument for ' + marketId + ' to disambiguate between different markets with the same market id');
                    }
                    const inferredMarketType = (marketType === undefined) ? market['type'] : marketType;
                    for (let i = 0; i < markets.length; i++) {
                        const market = markets[i];
                        if (market[inferredMarketType]) {
                            return market;
                        }
                    }
                }
            }
            else if (delimiter !== undefined) {
                const parts = marketId.split(delimiter);
                const partsLength = parts.length;
                if (partsLength === 2) {
                    result['baseId'] = this.safeString(parts, 0);
                    result['quoteId'] = this.safeString(parts, 1);
                    result['base'] = this.safeCurrencyCode(result['baseId']);
                    result['quote'] = this.safeCurrencyCode(result['quoteId']);
                    result['symbol'] = result['base'] + '/' + result['quote'];
                    return result;
                }
                else {
                    return result;
                }
            }
        }
        if (market !== undefined) {
            return market;
        }
        return result;
    }
    checkRequiredCredentials(error = true) {
        const keys = Object.keys(this.requiredCredentials);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (this.requiredCredentials[key] && !this[key]) {
                if (error) {
                    throw new AuthenticationError(this.id + ' requires "' + key + '" credential');
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }
    oath() {
        if (this.twofa !== undefined) {
            return totp(this.twofa);
        }
        else {
            throw new ExchangeError(this.id + ' exchange.twofa has not been set for 2FA Two-Factor Authentication');
        }
    }
    async fetchBalance(params = {}) {
        throw new NotSupported(this.id + ' fetchBalance() is not supported yet');
    }
    async watchBalance(params = {}) {
        throw new NotSupported(this.id + ' watchBalance() is not supported yet');
    }
    async fetchPartialBalance(part, params = {}) {
        const balance = await this.fetchBalance(params);
        return balance[part];
    }
    async fetchFreeBalance(params = {}) {
        return await this.fetchPartialBalance('free', params);
    }
    async fetchUsedBalance(params = {}) {
        return await this.fetchPartialBalance('used', params);
    }
    async fetchTotalBalance(params = {}) {
        return await this.fetchPartialBalance('total', params);
    }
    async fetchStatus(params = {}) {
        if (this.has['fetchTime']) {
            const time = await this.fetchTime(params);
            this.status = this.extend(this.status, {
                'updated': time,
            });
        }
        if (!('info' in this.status)) {
            this.status['info'] = undefined;
        }
        return this.status;
    }
    async fetchFundingFee(code, params = {}) {
        const warnOnFetchFundingFee = this.safeValue(this.options, 'warnOnFetchFundingFee', true);
        if (warnOnFetchFundingFee) {
            throw new NotSupported(this.id + ' fetchFundingFee() method is deprecated, it will be removed in July 2022, please, use fetchTransactionFee() or set exchange.options["warnOnFetchFundingFee"] = false to suppress this warning');
        }
        return await this.fetchTransactionFee(code, params);
    }
    async fetchFundingFees(codes = undefined, params = {}) {
        const warnOnFetchFundingFees = this.safeValue(this.options, 'warnOnFetchFundingFees', true);
        if (warnOnFetchFundingFees) {
            throw new NotSupported(this.id + ' fetchFundingFees() method is deprecated, it will be removed in July 2022. Please, use fetchTransactionFees() or set exchange.options["warnOnFetchFundingFees"] = false to suppress this warning');
        }
        return await this.fetchTransactionFees(codes, params);
    }
    async fetchTransactionFee(code, params = {}) {
        if (!this.has['fetchTransactionFees']) {
            throw new NotSupported(this.id + ' fetchTransactionFee() is not supported yet');
        }
        return await this.fetchTransactionFees([code], params);
    }
    async fetchTransactionFees(codes = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchTransactionFees() is not supported yet');
    }
    async fetchDepositWithdrawFees(codes = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchDepositWithdrawFees() is not supported yet');
    }
    async fetchDepositWithdrawFee(code, params = {}) {
        if (!this.has['fetchDepositWithdrawFees']) {
            throw new NotSupported(this.id + ' fetchDepositWithdrawFee() is not supported yet');
        }
        const fees = await this.fetchDepositWithdrawFees([code], params);
        return this.safeValue(fees, code);
    }
    getSupportedMapping(key, mapping = {}) {
        if (key in mapping) {
            return mapping[key];
        }
        else {
            throw new NotSupported(this.id + ' ' + key + ' does not have a value in mapping');
        }
    }
    async fetchBorrowRate(code, params = {}) {
        await this.loadMarkets();
        if (!this.has['fetchBorrowRates']) {
            throw new NotSupported(this.id + ' fetchBorrowRate() is not supported yet');
        }
        const borrowRates = await this.fetchBorrowRates(params);
        const rate = this.safeValue(borrowRates, code);
        if (rate === undefined) {
            throw new ExchangeError(this.id + ' fetchBorrowRate() could not find the borrow rate for currency code ' + code);
        }
        return rate;
    }
    handleOptionAndParams(params, methodName, optionName, defaultValue = undefined) {
        // This method can be used to obtain method specific properties, i.e: this.handleOptionAndParams (params, 'fetchPosition', 'marginMode', 'isolated')
        const defaultOptionName = 'default' + this.capitalize(optionName); // we also need to check the 'defaultXyzWhatever'
        // check if params contain the key
        let value = this.safeValue2(params, optionName, defaultOptionName);
        if (value !== undefined) {
            params = this.omit(params, [optionName, defaultOptionName]);
        }
        else {
            // check if exchange has properties for this method
            const exchangeWideMethodOptions = this.safeValue(this.options, methodName);
            if (exchangeWideMethodOptions !== undefined) {
                // check if the option is defined in this method's props
                value = this.safeValue2(exchangeWideMethodOptions, optionName, defaultOptionName);
            }
            if (value === undefined) {
                // if it's still undefined, check if global exchange-wide option exists
                value = this.safeValue2(this.options, optionName, defaultOptionName);
            }
            // if it's still undefined, use the default value
            value = (value !== undefined) ? value : defaultValue;
        }
        return [value, params];
    }
    handleOption(methodName, optionName, defaultValue = undefined) {
        // eslint-disable-next-line no-unused-vars
        const [result, empty] = this.handleOptionAndParams({}, methodName, optionName, defaultValue);
        return result;
    }
    handleMarketTypeAndParams(methodName, market = undefined, params = {}) {
        const defaultType = this.safeString2(this.options, 'defaultType', 'type', 'spot');
        const methodOptions = this.safeValue(this.options, methodName);
        let methodType = defaultType;
        if (methodOptions !== undefined) {
            if (typeof methodOptions === 'string') {
                methodType = methodOptions;
            }
            else {
                methodType = this.safeString2(methodOptions, 'defaultType', 'type', methodType);
            }
        }
        const marketType = (market === undefined) ? methodType : market['type'];
        const type = this.safeString2(params, 'defaultType', 'type', marketType);
        params = this.omit(params, ['defaultType', 'type']);
        return [type, params];
    }
    handleSubTypeAndParams(methodName, market = undefined, params = {}, defaultValue = undefined) {
        let subType = undefined;
        // if set in params, it takes precedence
        const subTypeInParams = this.safeString2(params, 'subType', 'defaultSubType');
        // avoid omitting if it's not present
        if (subTypeInParams !== undefined) {
            subType = subTypeInParams;
            params = this.omit(params, ['subType', 'defaultSubType']);
        }
        else {
            // at first, check from market object
            if (market !== undefined) {
                if (market['linear']) {
                    subType = 'linear';
                }
                else if (market['inverse']) {
                    subType = 'inverse';
                }
            }
            // if it was not defined in market object
            if (subType === undefined) {
                const values = this.handleOptionAndParams(undefined, methodName, 'subType', defaultValue); // no need to re-test params here
                subType = values[0];
            }
        }
        return [subType, params];
    }
    handleMarginModeAndParams(methodName, params = {}, defaultValue = undefined) {
        /**
         * @ignore
         * @method
         * @param {object} params extra parameters specific to the exchange api endpoint
         * @returns {[string|undefined, object]} the marginMode in lowercase as specified by params["marginMode"], params["defaultMarginMode"] this.options["marginMode"] or this.options["defaultMarginMode"]
         */
        return this.handleOptionAndParams(params, methodName, 'marginMode', defaultValue);
    }
    throwExactlyMatchedException(exact, string, message) {
        if (string in exact) {
            throw new exact[string](message);
        }
    }
    throwBroadlyMatchedException(broad, string, message) {
        const broadKey = this.findBroadlyMatchedKey(broad, string);
        if (broadKey !== undefined) {
            throw new broad[broadKey](message);
        }
    }
    findBroadlyMatchedKey(broad, string) {
        // a helper for matching error strings exactly vs broadly
        const keys = Object.keys(broad);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (string !== undefined) { // #issues/12698
                if (string.indexOf(key) >= 0) {
                    return key;
                }
            }
        }
        return undefined;
    }
    handleErrors(statusCode, statusText, url, method, responseHeaders, responseBody, response, requestHeaders, requestBody) {
        // it is a stub method that must be overrided in the derived exchange classes
        // throw new NotSupported (this.id + ' handleErrors() not implemented yet');
        return undefined;
    }
    calculateRateLimiterCost(api, method, path, params, config = {}, context = {}) {
        return this.safeValue(config, 'cost', 1);
    }
    async fetchTicker(symbol, params = {}) {
        if (this.has['fetchTickers']) {
            await this.loadMarkets();
            const market = this.market(symbol);
            symbol = market['symbol'];
            const tickers = await this.fetchTickers([symbol], params);
            const ticker = this.safeValue(tickers, symbol);
            if (ticker === undefined) {
                throw new NullResponse(this.id + ' fetchTickers() could not find a ticker for ' + symbol);
            }
            else {
                return ticker;
            }
        }
        else {
            throw new NotSupported(this.id + ' fetchTicker() is not supported yet');
        }
    }
    async watchTicker(symbol, params = {}) {
        throw new NotSupported(this.id + ' watchTicker() is not supported yet');
    }
    async fetchTickers(symbols = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchTickers() is not supported yet');
    }
    async watchTickers(symbols = undefined, params = {}) {
        throw new NotSupported(this.id + ' watchTickers() is not supported yet');
    }
    async fetchOrder(id, symbol = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchOrder() is not supported yet');
    }
    async fetchOrderStatus(id, symbol = undefined, params = {}) {
        // TODO: TypeScript: change method signature by replacing
        // Promise<string> with Promise<Order['status']>.
        const order = await this.fetchOrder(id, symbol, params);
        return order['status'];
    }
    async fetchUnifiedOrder(order, params = {}) {
        return await this.fetchOrder(this.safeValue(order, 'id'), this.safeValue(order, 'symbol'), params);
    }
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        throw new NotSupported(this.id + ' createOrder() is not supported yet');
    }
    async cancelOrder(id, symbol = undefined, params = {}) {
        throw new NotSupported(this.id + ' cancelOrder() is not supported yet');
    }
    async cancelAllOrders(symbol = undefined, params = {}) {
        throw new NotSupported(this.id + ' cancelAllOrders() is not supported yet');
    }
    async cancelUnifiedOrder(order, params = {}) {
        return this.cancelOrder(this.safeValue(order, 'id'), this.safeValue(order, 'symbol'), params);
    }
    async fetchOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchOrders() is not supported yet');
    }
    async fetchOrderTrades(id, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchOrderTrades() is not supported yet');
    }
    async watchOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' watchOrders() is not supported yet');
    }
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchOpenOrders() is not supported yet');
    }
    async fetchClosedOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchClosedOrders() is not supported yet');
    }
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchMyTrades() is not supported yet');
    }
    async watchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' watchMyTrades() is not supported yet');
    }
    async fetchTransactions(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchTransactions() is not supported yet');
    }
    async fetchDeposits(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchDeposits() is not supported yet');
    }
    async fetchWithdrawals(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchWithdrawals() is not supported yet');
    }
    parseLastPrice(price, market = undefined) {
        throw new NotSupported(this.id + ' parseLastPrice() is not supported yet');
    }
    async fetchDepositAddress(code, params = {}) {
        if (this.has['fetchDepositAddresses']) {
            const depositAddresses = await this.fetchDepositAddresses([code], params);
            const depositAddress = this.safeValue(depositAddresses, code);
            if (depositAddress === undefined) {
                throw new InvalidAddress(this.id + ' fetchDepositAddress() could not find a deposit address for ' + code + ', make sure you have created a corresponding deposit address in your wallet on the exchange website');
            }
            else {
                return depositAddress;
            }
        }
        else {
            throw new NotSupported(this.id + ' fetchDepositAddress() is not supported yet');
        }
    }
    account() {
        return {
            'free': undefined,
            'used': undefined,
            'total': undefined,
        };
    }
    commonCurrencyCode(currency) {
        if (!this.substituteCommonCurrencyCodes) {
            return currency;
        }
        return this.safeString(this.commonCurrencies, currency, currency);
    }
    currency(code) {
        if (this.currencies === undefined) {
            throw new ExchangeError(this.id + ' currencies not loaded');
        }
        if (typeof code === 'string') {
            if (code in this.currencies) {
                return this.currencies[code];
            }
            else if (code in this.currencies_by_id) {
                return this.currencies_by_id[code];
            }
        }
        throw new ExchangeError(this.id + ' does not have currency code ' + code);
    }
    market(symbol) {
        if (this.markets === undefined) {
            throw new ExchangeError(this.id + ' markets not loaded');
        }
        if (typeof symbol === 'string') {
            if (symbol in this.markets) {
                return this.markets[symbol];
            }
            else if (symbol in this.markets_by_id) {
                const markets = this.markets_by_id[symbol];
                const defaultType = this.safeString2(this.options, 'defaultType', 'defaultSubType', 'spot');
                for (let i = 0; i < markets.length; i++) {
                    const market = markets[i];
                    if (market[defaultType]) {
                        return market;
                    }
                }
                return markets[0];
            }
        }
        throw new BadSymbol(this.id + ' does not have market symbol ' + symbol);
    }
    handleWithdrawTagAndParams(tag, params) {
        if (typeof tag === 'object') {
            params = this.extend(tag, params);
            tag = undefined;
        }
        if (tag === undefined) {
            tag = this.safeString(params, 'tag');
            if (tag !== undefined) {
                params = this.omit(params, 'tag');
            }
        }
        return [tag, params];
    }
    async createLimitOrder(symbol, side, amount, price, params = {}) {
        return await this.createOrder(symbol, 'limit', side, amount, price, params);
    }
    async createMarketOrder(symbol, side, amount, price = undefined, params = {}) {
        return await this.createOrder(symbol, 'market', side, amount, price, params);
    }
    async createLimitBuyOrder(symbol, amount, price, params = {}) {
        return await this.createOrder(symbol, 'limit', 'buy', amount, price, params);
    }
    async createLimitSellOrder(symbol, amount, price, params = {}) {
        return await this.createOrder(symbol, 'limit', 'sell', amount, price, params);
    }
    async createMarketBuyOrder(symbol, amount, params = {}) {
        return await this.createOrder(symbol, 'market', 'buy', amount, undefined, params);
    }
    async createMarketSellOrder(symbol, amount, params = {}) {
        return await this.createOrder(symbol, 'market', 'sell', amount, undefined, params);
    }
    costToPrecision(symbol, cost) {
        const market = this.market(symbol);
        return this.decimalToPrecision(cost, TRUNCATE, market['precision']['price'], this.precisionMode, this.paddingMode);
    }
    priceToPrecision(symbol, price) {
        const market = this.market(symbol);
        const result = this.decimalToPrecision(price, ROUND, market['precision']['price'], this.precisionMode, this.paddingMode);
        if (result === '0') {
            throw new ArgumentsRequired(this.id + ' price of ' + market['symbol'] + ' must be greater than minimum price precision of ' + this.numberToString(market['precision']['price']));
        }
        return result;
    }
    amountToPrecision(symbol, amount) {
        const market = this.market(symbol);
        const result = this.decimalToPrecision(amount, TRUNCATE, market['precision']['amount'], this.precisionMode, this.paddingMode);
        if (result === '0') {
            throw new ArgumentsRequired(this.id + ' amount of ' + market['symbol'] + ' must be greater than minimum amount precision of ' + this.numberToString(market['precision']['amount']));
        }
        return result;
    }
    feeToPrecision(symbol, fee) {
        const market = this.market(symbol);
        return this.decimalToPrecision(fee, ROUND, market['precision']['price'], this.precisionMode, this.paddingMode);
    }
    currencyToPrecision(code, fee, networkCode = undefined) {
        const currency = this.currencies[code];
        let precision = this.safeValue(currency, 'precision');
        if (networkCode !== undefined) {
            const networks = this.safeValue(currency, 'networks', {});
            const networkItem = this.safeValue(networks, networkCode, {});
            precision = this.safeValue(networkItem, 'precision', precision);
        }
        if (precision === undefined) {
            return fee;
        }
        else {
            return this.decimalToPrecision(fee, ROUND, precision, this.precisionMode, this.paddingMode);
        }
    }
    safeNumber(obj, key, defaultNumber = undefined) {
        const value = this.safeString(obj, key);
        return this.parseNumber(value, defaultNumber);
    }
    safeNumberN(obj, arr, defaultNumber = undefined) {
        const value = this.safeStringN(obj, arr);
        return this.parseNumber(value, defaultNumber);
    }
    parsePrecision(precision) {
        /**
         * @ignore
         * @method
         * @param {string} precision The number of digits to the right of the decimal
         * @returns {string} a string number equal to 1e-precision
         */
        if (precision === undefined) {
            return undefined;
        }
        const precisionNumber = parseInt(precision);
        if (precisionNumber === 0) {
            return '1';
        }
        let parsedPrecision = '0.';
        for (let i = 0; i < precisionNumber - 1; i++) {
            parsedPrecision = parsedPrecision + '0';
        }
        return parsedPrecision + '1';
    }
    async loadTimeDifference(params = {}) {
        const serverTime = await this.fetchTime(params);
        const after = this.milliseconds();
        this.options['timeDifference'] = after - serverTime;
        return this.options['timeDifference'];
    }
    implodeHostname(url) {
        return this.implodeParams(url, { 'hostname': this.hostname });
    }
    async fetchMarketLeverageTiers(symbol, params = {}) {
        if (this.has['fetchLeverageTiers']) {
            const market = await this.market(symbol);
            if (!market['contract']) {
                throw new BadSymbol(this.id + ' fetchMarketLeverageTiers() supports contract markets only');
            }
            const tiers = await this.fetchLeverageTiers([symbol]);
            return this.safeValue(tiers, symbol);
        }
        else {
            throw new NotSupported(this.id + ' fetchMarketLeverageTiers() is not supported yet');
        }
    }
    async createPostOnlyOrder(symbol, type, side, amount, price, params = {}) {
        if (!this.has['createPostOnlyOrder']) {
            throw new NotSupported(this.id + 'createPostOnlyOrder() is not supported yet');
        }
        const query = this.extend(params, { 'postOnly': true });
        return await this.createOrder(symbol, type, side, amount, price, query);
    }
    async createReduceOnlyOrder(symbol, type, side, amount, price, params = {}) {
        if (!this.has['createReduceOnlyOrder']) {
            throw new NotSupported(this.id + 'createReduceOnlyOrder() is not supported yet');
        }
        const query = this.extend(params, { 'reduceOnly': true });
        return await this.createOrder(symbol, type, side, amount, price, query);
    }
    async createStopOrder(symbol, type, side, amount, price = undefined, stopPrice = undefined, params = {}) {
        if (!this.has['createStopOrder']) {
            throw new NotSupported(this.id + ' createStopOrder() is not supported yet');
        }
        if (stopPrice === undefined) {
            throw new ArgumentsRequired(this.id + ' create_stop_order() requires a stopPrice argument');
        }
        const query = this.extend(params, { 'stopPrice': stopPrice });
        return await this.createOrder(symbol, type, side, amount, price, query);
    }
    async createStopLimitOrder(symbol, side, amount, price, stopPrice, params = {}) {
        if (!this.has['createStopLimitOrder']) {
            throw new NotSupported(this.id + ' createStopLimitOrder() is not supported yet');
        }
        const query = this.extend(params, { 'stopPrice': stopPrice });
        return await this.createOrder(symbol, 'limit', side, amount, price, query);
    }
    async createStopMarketOrder(symbol, side, amount, stopPrice, params = {}) {
        if (!this.has['createStopMarketOrder']) {
            throw new NotSupported(this.id + ' createStopMarketOrder() is not supported yet');
        }
        const query = this.extend(params, { 'stopPrice': stopPrice });
        return await this.createOrder(symbol, 'market', side, amount, undefined, query);
    }
    safeCurrencyCode(currencyId, currency = undefined) {
        currency = this.safeCurrency(currencyId, currency);
        return currency['code'];
    }
    filterBySymbolSinceLimit(array, symbol = undefined, since = undefined, limit = undefined, tail = false) {
        return this.filterByValueSinceLimit(array, 'symbol', symbol, since, limit, 'timestamp', tail);
    }
    filterByCurrencySinceLimit(array, code = undefined, since = undefined, limit = undefined, tail = false) {
        return this.filterByValueSinceLimit(array, 'currency', code, since, limit, 'timestamp', tail);
    }
    parseLastPrices(pricesData, symbols = undefined, params = {}) {
        //
        // the value of tickers is either a dict or a list
        //
        // dict
        //
        //     {
        //         'marketId1': { ... },
        //         'marketId2': { ... },
        //         ...
        //     }
        //
        // list
        //
        //     [
        //         { 'market': 'marketId1', ... },
        //         { 'market': 'marketId2', ... },
        //         ...
        //     ]
        //
        const results = [];
        if (Array.isArray(pricesData)) {
            for (let i = 0; i < pricesData.length; i++) {
                const priceData = this.extend(this.parseLastPrice(pricesData[i]), params);
                results.push(priceData);
            }
        }
        else {
            const marketIds = Object.keys(pricesData);
            for (let i = 0; i < marketIds.length; i++) {
                const marketId = marketIds[i];
                const market = this.safeMarket(marketId);
                const priceData = this.extend(this.parseLastPrice(pricesData[marketId], market), params);
                results.push(priceData);
            }
        }
        symbols = this.marketSymbols(symbols);
        return this.filterByArray(results, 'symbol', symbols);
    }
    parseTickers(tickers, symbols = undefined, params = {}) {
        //
        // the value of tickers is either a dict or a list
        //
        // dict
        //
        //     {
        //         'marketId1': { ... },
        //         'marketId2': { ... },
        //         'marketId3': { ... },
        //         ...
        //     }
        //
        // list
        //
        //     [
        //         { 'market': 'marketId1', ... },
        //         { 'market': 'marketId2', ... },
        //         { 'market': 'marketId3', ... },
        //         ...
        //     ]
        //
        const results = [];
        if (Array.isArray(tickers)) {
            for (let i = 0; i < tickers.length; i++) {
                const ticker = this.extend(this.parseTicker(tickers[i]), params);
                results.push(ticker);
            }
        }
        else {
            const marketIds = Object.keys(tickers);
            for (let i = 0; i < marketIds.length; i++) {
                const marketId = marketIds[i];
                const market = this.safeMarket(marketId);
                const ticker = this.extend(this.parseTicker(tickers[marketId], market), params);
                results.push(ticker);
            }
        }
        symbols = this.marketSymbols(symbols);
        return this.filterByArray(results, 'symbol', symbols);
    }
    parseDepositAddresses(addresses, codes = undefined, indexed = true, params = {}) {
        let result = [];
        for (let i = 0; i < addresses.length; i++) {
            const address = this.extend(this.parseDepositAddress(addresses[i]), params);
            result.push(address);
        }
        if (codes !== undefined) {
            result = this.filterByArray(result, 'currency', codes, false);
        }
        if (indexed) {
            return this.indexBy(result, 'currency');
        }
        return result;
    }
    parseBorrowInterests(response, market = undefined) {
        const interests = [];
        for (let i = 0; i < response.length; i++) {
            const row = response[i];
            interests.push(this.parseBorrowInterest(row, market));
        }
        return interests;
    }
    parseFundingRateHistories(response, market = undefined, since = undefined, limit = undefined) {
        const rates = [];
        for (let i = 0; i < response.length; i++) {
            const entry = response[i];
            rates.push(this.parseFundingRateHistory(entry, market));
        }
        const sorted = this.sortBy(rates, 'timestamp');
        const symbol = (market === undefined) ? undefined : market['symbol'];
        return this.filterBySymbolSinceLimit(sorted, symbol, since, limit);
    }
    safeSymbol(marketId, market = undefined, delimiter = undefined, marketType = undefined) {
        market = this.safeMarket(marketId, market, delimiter, marketType);
        return market['symbol'];
    }
    parseFundingRate(contract, market = undefined) {
        throw new NotSupported(this.id + ' parseFundingRate() is not supported yet');
    }
    parseFundingRates(response, market = undefined) {
        const result = {};
        for (let i = 0; i < response.length; i++) {
            const parsed = this.parseFundingRate(response[i], market);
            result[parsed['symbol']] = parsed;
        }
        return result;
    }
    isTriggerOrder(params) {
        const isTrigger = this.safeValue2(params, 'trigger', 'stop');
        if (isTrigger) {
            params = this.omit(params, ['trigger', 'stop']);
        }
        return [isTrigger, params];
    }
    isPostOnly(isMarketOrder, exchangeSpecificParam, params = {}) {
        /**
         * @ignore
         * @method
         * @param {string} type Order type
         * @param {boolean} exchangeSpecificParam exchange specific postOnly
         * @param {object} params exchange specific params
         * @returns {boolean} true if a post only order, false otherwise
         */
        const timeInForce = this.safeStringUpper(params, 'timeInForce');
        let postOnly = this.safeValue2(params, 'postOnly', 'post_only', false);
        // we assume timeInForce is uppercase from safeStringUpper (params, 'timeInForce')
        const ioc = timeInForce === 'IOC';
        const fok = timeInForce === 'FOK';
        const timeInForcePostOnly = timeInForce === 'PO';
        postOnly = postOnly || timeInForcePostOnly || exchangeSpecificParam;
        if (postOnly) {
            if (ioc || fok) {
                throw new InvalidOrder(this.id + ' postOnly orders cannot have timeInForce equal to ' + timeInForce);
            }
            else if (isMarketOrder) {
                throw new InvalidOrder(this.id + ' market orders cannot be postOnly');
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
    handlePostOnly(isMarketOrder, exchangeSpecificPostOnlyOption, params = {}) {
        /**
         * @ignore
         * @method
         * @param {string} type Order type
         * @param {boolean} exchangeSpecificBoolean exchange specific postOnly
         * @param {object} params exchange specific params
         * @returns {[boolean, params]}
         */
        const timeInForce = this.safeStringUpper(params, 'timeInForce');
        let postOnly = this.safeValue(params, 'postOnly', false);
        const ioc = timeInForce === 'IOC';
        const fok = timeInForce === 'FOK';
        const po = timeInForce === 'PO';
        postOnly = postOnly || po || exchangeSpecificPostOnlyOption;
        if (postOnly) {
            if (ioc || fok) {
                throw new InvalidOrder(this.id + ' postOnly orders cannot have timeInForce equal to ' + timeInForce);
            }
            else if (isMarketOrder) {
                throw new InvalidOrder(this.id + ' market orders cannot be postOnly');
            }
            else {
                if (po) {
                    params = this.omit(params, 'timeInForce');
                }
                params = this.omit(params, 'postOnly');
                return [true, params];
            }
        }
        return [false, params];
    }
    async fetchLastPrices(symbols = undefined, params = {}) {
        throw new NotSupported(this.id + ' fetchLastPrices() is not supported yet');
    }
    async fetchTradingFees(params = {}) {
        throw new NotSupported(this.id + ' fetchTradingFees() is not supported yet');
    }
    async fetchTradingFee(symbol, params = {}) {
        if (!this.has['fetchTradingFees']) {
            throw new NotSupported(this.id + ' fetchTradingFee() is not supported yet');
        }
        return await this.fetchTradingFees(params);
    }
    parseOpenInterest(interest, market = undefined) {
        throw new NotSupported(this.id + ' parseOpenInterest () is not supported yet');
    }
    parseOpenInterests(response, market = undefined, since = undefined, limit = undefined) {
        const interests = [];
        for (let i = 0; i < response.length; i++) {
            const entry = response[i];
            const interest = this.parseOpenInterest(entry, market);
            interests.push(interest);
        }
        const sorted = this.sortBy(interests, 'timestamp');
        const symbol = this.safeString(market, 'symbol');
        return this.filterBySymbolSinceLimit(sorted, symbol, since, limit);
    }
    async fetchFundingRate(symbol, params = {}) {
        if (this.has['fetchFundingRates']) {
            await this.loadMarkets();
            const market = this.market(symbol);
            if (!market['contract']) {
                throw new BadSymbol(this.id + ' fetchFundingRate() supports contract markets only');
            }
            const rates = await this.fetchFundingRates([symbol], params);
            const rate = this.safeValue(rates, symbol);
            if (rate === undefined) {
                throw new NullResponse(this.id + ' fetchFundingRate () returned no data for ' + symbol);
            }
            else {
                return rate;
            }
        }
        else {
            throw new NotSupported(this.id + ' fetchFundingRate () is not supported yet');
        }
    }
    async fetchMarkOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name exchange#fetchMarkOHLCV
         * @description fetches historical mark price candlestick data containing the open, high, low, and close price of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int|undefined} since timestamp in ms of the earliest candle to fetch
         * @param {int|undefined} limit the maximum amount of candles to fetch
         * @param {object} params extra parameters specific to the exchange api endpoint
         * @returns {[[int|float]]} A list of candles ordered as timestamp, open, high, low, close, undefined
         */
        if (this.has['fetchMarkOHLCV']) {
            const request = {
                'price': 'mark',
            };
            return await this.fetchOHLCV(symbol, timeframe, since, limit, this.extend(request, params));
        }
        else {
            throw new NotSupported(this.id + ' fetchMarkOHLCV () is not supported yet');
        }
    }
    async fetchIndexOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name exchange#fetchIndexOHLCV
         * @description fetches historical index price candlestick data containing the open, high, low, and close price of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int|undefined} since timestamp in ms of the earliest candle to fetch
         * @param {int|undefined} limit the maximum amount of candles to fetch
         * @param {object} params extra parameters specific to the exchange api endpoint
         * @returns {[[int|float]]} A list of candles ordered as timestamp, open, high, low, close, undefined
         */
        if (this.has['fetchIndexOHLCV']) {
            const request = {
                'price': 'index',
            };
            return await this.fetchOHLCV(symbol, timeframe, since, limit, this.extend(request, params));
        }
        else {
            throw new NotSupported(this.id + ' fetchIndexOHLCV () is not supported yet');
        }
    }
    async fetchPremiumIndexOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name exchange#fetchPremiumIndexOHLCV
         * @description fetches historical premium index price candlestick data containing the open, high, low, and close price of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int|undefined} since timestamp in ms of the earliest candle to fetch
         * @param {int|undefined} limit the maximum amount of candles to fetch
         * @param {object} params extra parameters specific to the exchange api endpoint
         * @returns {[[int|float]]} A list of candles ordered as timestamp, open, high, low, close, undefined
         */
        if (this.has['fetchPremiumIndexOHLCV']) {
            const request = {
                'price': 'premiumIndex',
            };
            return await this.fetchOHLCV(symbol, timeframe, since, limit, this.extend(request, params));
        }
        else {
            throw new NotSupported(this.id + ' fetchPremiumIndexOHLCV () is not supported yet');
        }
    }
    handleTimeInForce(params = {}) {
        /**
         * @ignore
         * @method
         * * Must add timeInForce to this.options to use this method
         * @return {string} returns the exchange specific value for timeInForce
         */
        const timeInForce = this.safeStringUpper(params, 'timeInForce'); // supported values GTC, IOC, PO
        if (timeInForce !== undefined) {
            const exchangeValue = this.safeString(this.options['timeInForce'], timeInForce);
            if (exchangeValue === undefined) {
                throw new ExchangeError(this.id + ' does not support timeInForce "' + timeInForce + '"');
            }
            return exchangeValue;
        }
        return undefined;
    }
    convertTypeToAccount(account) {
        /**
         * @ignore
         * @method
         * * Must add accountsByType to this.options to use this method
         * @param {string} account key for account name in this.options['accountsByType']
         * @returns the exchange specific account name or the isolated margin id for transfers
         */
        const accountsByType = this.safeValue(this.options, 'accountsByType', {});
        const lowercaseAccount = account.toLowerCase();
        if (lowercaseAccount in accountsByType) {
            return accountsByType[lowercaseAccount];
        }
        else if ((account in this.markets) || (account in this.markets_by_id)) {
            const market = this.market(account);
            return market['id'];
        }
        else {
            return account;
        }
    }
    checkRequiredArgument(methodName, argument, argumentName, options = []) {
        /**
         * @ignore
         * @method
         * @param {string} argument the argument to check
         * @param {string} argumentName the name of the argument to check
         * @param {string} methodName the name of the method that the argument is being checked for
         * @param {[string]} options a list of options that the argument can be
         * @returns {undefined}
         */
        const optionsLength = options.length;
        if ((argument === undefined) || ((optionsLength > 0) && (!(this.inArray(argument, options))))) {
            const messageOptions = options.join(', ');
            let message = this.id + ' ' + methodName + '() requires a ' + argumentName + ' argument';
            if (messageOptions !== '') {
                message += ', one of ' + '(' + messageOptions + ')';
            }
            throw new ArgumentsRequired(message);
        }
    }
    checkRequiredMarginArgument(methodName, symbol, marginMode) {
        /**
         * @ignore
         * @method
         * @param {string} symbol unified symbol of the market
         * @param {string} methodName name of the method that requires a symbol
         * @param {string} marginMode is either 'isolated' or 'cross'
         */
        if ((marginMode === 'isolated') && (symbol === undefined)) {
            throw new ArgumentsRequired(this.id + ' ' + methodName + '() requires a symbol argument for isolated margin');
        }
        else if ((marginMode === 'cross') && (symbol !== undefined)) {
            throw new ArgumentsRequired(this.id + ' ' + methodName + '() cannot have a symbol argument for cross margin');
        }
    }
    checkRequiredSymbol(methodName, symbol) {
        /**
         * @ignore
         * @method
         * @param {string} symbol unified symbol of the market
         * @param {string} methodName name of the method that requires a symbol
         */
        this.checkRequiredArgument(methodName, symbol, 'symbol');
    }
    parseDepositWithdrawFees(response, codes = undefined, currencyIdKey = undefined) {
        /**
         * @ignore
         * @method
         * @param {[object]|object} response unparsed response from the exchange
         * @param {[string]|undefined} codes the unified currency codes to fetch transactions fees for, returns all currencies when undefined
         * @param {str|undefined} currencyIdKey *should only be undefined when response is a dictionary* the object key that corresponds to the currency id
         * @returns {object} objects with withdraw and deposit fees, indexed by currency codes
         */
        const depositWithdrawFees = {};
        codes = this.marketCodes(codes);
        const isArray = Array.isArray(response);
        let responseKeys = response;
        if (!isArray) {
            responseKeys = Object.keys(response);
        }
        for (let i = 0; i < responseKeys.length; i++) {
            const entry = responseKeys[i];
            const dictionary = isArray ? entry : response[entry];
            const currencyId = isArray ? this.safeString(dictionary, currencyIdKey) : entry;
            const currency = this.safeValue(this.currencies_by_id, currencyId);
            const code = this.safeString(currency, 'code', currencyId);
            if ((codes === undefined) || (this.inArray(code, codes))) {
                depositWithdrawFees[code] = this.parseDepositWithdrawFee(dictionary, currency);
            }
        }
        return depositWithdrawFees;
    }
    parseDepositWithdrawFee(fee, currency = undefined) {
        throw new NotSupported(this.id + ' parseDepositWithdrawFee() is not supported yet');
    }
    depositWithdrawFee(info) {
        return {
            'info': info,
            'withdraw': {
                'fee': undefined,
                'percentage': undefined,
            },
            'deposit': {
                'fee': undefined,
                'percentage': undefined,
            },
            'networks': {},
        };
    }
    assignDefaultDepositWithdrawFees(fee, currency = undefined) {
        /**
         * @ignore
         * @method
         * @description Takes a depositWithdrawFee structure and assigns the default values for withdraw and deposit
         * @param {object} fee A deposit withdraw fee structure
         * @param {object} currency A currency structure, the response from this.currency ()
         * @returns {object} A deposit withdraw fee structure
         */
        const networkKeys = Object.keys(fee['networks']);
        const numNetworks = networkKeys.length;
        if (numNetworks === 1) {
            fee['withdraw'] = fee['networks'][networkKeys[0]]['withdraw'];
            fee['deposit'] = fee['networks'][networkKeys[0]]['deposit'];
            return fee;
        }
        const currencyCode = this.safeString(currency, 'code');
        for (let i = 0; i < numNetworks; i++) {
            const network = networkKeys[i];
            if (network === currencyCode) {
                fee['withdraw'] = fee['networks'][networkKeys[i]]['withdraw'];
                fee['deposit'] = fee['networks'][networkKeys[i]]['deposit'];
            }
        }
        return fee;
    }
    parseIncome(info, market = undefined) {
        throw new NotSupported(this.id + ' parseIncome () is not supported yet');
    }
    parseIncomes(incomes, market = undefined, since = undefined, limit = undefined) {
        /**
         * @ignore
         * @method
         * @description parses funding fee info from exchange response
         * @param {[object]} incomes each item describes once instance of currency being received or paid
         * @param {object|undefined} market ccxt market
         * @param {int|undefined} since when defined, the response items are filtered to only include items after this timestamp
         * @param {int|undefined} limit limits the number of items in the response
         * @returns {[object]} an array of [funding history structures]{@link https://docs.ccxt.com/#/?id=funding-history-structure}
         */
        const result = [];
        for (let i = 0; i < incomes.length; i++) {
            const entry = incomes[i];
            const parsed = this.parseIncome(entry, market);
            result.push(parsed);
        }
        const sorted = this.sortBy(result, 'timestamp');
        return this.filterBySinceLimit(sorted, since, limit);
    }
    getMarketFromSymbols(symbols = undefined) {
        if (symbols === undefined) {
            return undefined;
        }
        const firstMarket = this.safeString(symbols, 0);
        const market = this.market(firstMarket);
        return market;
    }
}

// -------------------------------------------------------------------------------
class Exchange$1x extends Exchange$1y {
}

// Choice: a ? b : c
const Chi = (a, b, c) => (a & b) ^ (~a & c);
// Majority function, true if any two inpust is true
const Maj = (a, b, c) => (a & b) ^ (a & c) ^ (b & c);
// Round constants:
// first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
// prettier-ignore
const SHA256_K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);
// Initial state (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
// prettier-ignore
const IV$1 = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
]);
// Temporary buffer, not used to store anything between runs
// Named this way because it matches specification.
const SHA256_W = new Uint32Array(64);
class SHA256 extends SHA2 {
    constructor() {
        super(64, 32, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = IV$1[0] | 0;
        this.B = IV$1[1] | 0;
        this.C = IV$1[2] | 0;
        this.D = IV$1[3] | 0;
        this.E = IV$1[4] | 0;
        this.F = IV$1[5] | 0;
        this.G = IV$1[6] | 0;
        this.H = IV$1[7] | 0;
    }
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ (W15 >>> 3);
            const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ (W2 >>> 10);
            SHA256_W[i] = (s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16]) | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
            const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
            const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
            const T2 = (sigma0 + Maj(A, B, C)) | 0;
            H = G;
            G = F;
            F = E;
            E = (D + T1) | 0;
            D = C;
            C = B;
            B = A;
            A = (T1 + T2) | 0;
        }
        // Add the compressed chunk to the current hash value
        A = (A + this.A) | 0;
        B = (B + this.B) | 0;
        C = (C + this.C) | 0;
        D = (D + this.D) | 0;
        E = (E + this.E) | 0;
        F = (F + this.F) | 0;
        G = (G + this.G) | 0;
        H = (H + this.H) | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        SHA256_W.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
// Constants from https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf
class SHA224 extends SHA256 {
    constructor() {
        super();
        this.A = 0xc1059ed8 | 0;
        this.B = 0x367cd507 | 0;
        this.C = 0x3070dd17 | 0;
        this.D = 0xf70e5939 | 0;
        this.E = 0xffc00b31 | 0;
        this.F = 0x68581511 | 0;
        this.G = 0x64f98fa7 | 0;
        this.H = 0xbefa4fa4 | 0;
        this.outputLen = 28;
    }
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */
const sha256 = wrapConstructor(() => new SHA256());
wrapConstructor(() => new SHA224());

//  ---------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
class ace extends Exchange$1x {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'ace',
            'name': 'ACE',
            'countries': ['TW'],
            'version': 'v2',
            'rateLimit': 100,
            'pro': false,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'cancelAllOrders': false,
                'cancelOrder': true,
                'cancelOrders': false,
                'createOrder': true,
                'editOrder': false,
                'fetchBalance': true,
                'fetchBorrowRate': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchBorrowRates': false,
                'fetchClosedOrders': false,
                'fetchCurrencies': false,
                'fetchDepositAddress': false,
                'fetchDeposits': false,
                'fetchFundingHistory': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchIndexOHLCV': false,
                'fetchMarginMode': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': false,
                'fetchOrderTrades': true,
                'fetchPositionMode': false,
                'fetchPositions': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': false,
                'fetchTrades': false,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchTransactionFees': false,
                'fetchTransactions': false,
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchWithdrawal': false,
                'fetchWithdrawals': false,
                'setLeverage': false,
                'setMarginMode': false,
                'transfer': false,
                'withdraw': false,
            },
            'timeframes': {
                '1m': 1,
                '5m': 5,
                '10m': 10,
                '30m': 10,
                '1h': 60,
                '2h': 120,
                '4h': 240,
                '8h': 480,
                '12h': 720,
                '1d': 24,
                '1w': 70,
                '1M': 31,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/216908003-fb314cf6-e66e-471c-b91d-1d86e4baaa90.jpg',
                'api': {
                    'public': 'https://ace.io/polarisex',
                    'private': 'https://ace.io/polarisex/open',
                },
                'www': 'https://ace.io/',
                'doc': [
                    'https://github.com/ace-exchange/ace-offical-api-docs',
                ],
                'fees': 'https://helpcenter.ace.io/hc/zh-tw/articles/360018609132-%E8%B2%BB%E7%8E%87%E8%AA%AA%E6%98%8E',
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
            },
            'api': {
                'public': {
                    'get': [
                        'oapi/v2/list/tradePrice',
                        'oapi/v2/list/marketPair',
                        'open/v2/public/getOrderBook',
                    ],
                },
                'private': {
                    'post': [
                        'v2/coin/customerAccount',
                        'v2/kline/getKline',
                        'v2/order/order',
                        'v2/order/cancel',
                        'v2/order/getOrderList',
                        'v2/order/showOrderStatus',
                        'v2/order/showOrderHistory',
                        'v2/order/getTradeList',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'percentage': true,
                    'maker': this.parseNumber('0.0005'),
                    'taker': this.parseNumber('0.001'),
                },
            },
            'options': {
                'brokerId': 'ccxt',
            },
            'precisionMode': TICK_SIZE$1,
            'exceptions': {
                'exact': {
                    '2003': InvalidOrder,
                    '2004': InvalidOrder,
                    '2005': InvalidOrder,
                    '2021': InsufficientFunds,
                    '2036': InvalidOrder,
                    '2039': InvalidOrder,
                    '2053': InvalidOrder,
                    '2061': BadRequest,
                    '2063': InvalidOrder,
                    '9996': BadRequest,
                    '10012': AuthenticationError,
                    '20182': AuthenticationError,
                    '20183': InvalidOrder,
                },
                'broad': {},
            },
            'commonCurrencies': {},
        });
    }
    async fetchMarkets(params = {}) {
        /**
         * @method
         * @name ace#fetchMarkets
         * @description retrieves data on all markets for ace
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#oapi-api---market-pair
         * @param {object} params extra parameters specific to the exchange api endpoint
         * @returns {[object]} an array of objects representing market data
         */
        const response = await this.publicGetOapiV2ListMarketPair();
        //
        //     [
        //         {
        //             "symbol":"BTC/USDT",
        //             "base":"btc",
        //             "baseCurrencyId": "122"
        //             "quote":"usdt",
        //             "basePrecision":"8",
        //             "quotePrecision":"5",
        //             "minLimitBaseAmount":"0.1",
        //             "maxLimitBaseAmount":"480286"
        //         }
        //     ]
        //
        const result = [];
        for (let i = 0; i < response.length; i++) {
            const market = response[i];
            const base = this.safeString(market, 'base');
            const baseCode = this.safeCurrencyCode(base);
            const quote = this.safeString(market, 'quote');
            const quoteCode = this.safeCurrencyCode(quote);
            const symbol = base + '/' + quote;
            result.push({
                'id': this.safeString(market, 'symbol'),
                'uppercaseId': undefined,
                'symbol': symbol,
                'base': baseCode,
                'baseId': this.safeInteger(market, 'baseCurrencyId'),
                'quote': quoteCode,
                'quoteId': this.safeInteger(market, 'quoteCurrencyId'),
                'settle': undefined,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'derivative': false,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'limits': {
                    'amount': {
                        'min': this.safeNumber(market, 'minLimitBaseAmount'),
                        'max': this.safeNumber(market, 'maxLimitBaseAmount'),
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'precision': {
                    'price': this.parseNumber(this.parsePrecision(this.safeString(market, 'quotePrecision'))),
                    'amount': this.parseNumber(this.parsePrecision(this.safeString(market, 'basePrecision'))),
                },
                'active': undefined,
                'info': market,
            });
        }
        return result;
    }
    parseTicker(ticker, market = undefined) {
        //
        //     {
        //         "base_volume":229196.34035399999,
        //         "last_price":11881.06,
        //         "quote_volume":19.2909
        //     }
        //
        const marketId = this.safeString(ticker, 'id');
        const symbol = this.safeSymbol(marketId, market);
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': undefined,
            'datetime': undefined,
            'high': undefined,
            'low': undefined,
            'bid': undefined,
            'bidVolume': undefined,
            'ask': undefined,
            'askVolume': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': this.safeString(ticker, 'last_price'),
            'last': this.safeString(ticker, 'last_price'),
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeString(ticker, 'base_volume'),
            'quoteVolume': this.safeString(ticker, 'quote_volume'),
            'info': ticker,
        }, market);
    }
    async fetchTicker(symbol, params = {}) {
        /**
         * @method
         * @name ace#fetchTicker
         * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#oapi-api---trade-data
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const response = await this.publicGetOapiV2ListTradePrice(params);
        const marketId = market['id'];
        const ticker = this.safeValue(response, marketId, {});
        //
        //     {
        //         "BTC/USDT":{
        //             "base_volume":229196.34035399999,
        //             "last_price":11881.06,
        //             "quote_volume":19.2909
        //         }
        //     }
        //
        return this.parseTicker(ticker, market);
    }
    async fetchTickers(symbols = undefined, params = {}) {
        /**
         * @method
         * @name ace#fetchTickers
         * @description fetches price tickers for multiple markets, statistical calculations with the information calculated over the past 24 hours each market
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#oapi-api---trade-data
         * @param {[string]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets();
        const response = await this.publicGetOapiV2ListTradePrice();
        //
        //     {
        //         "BTC/USDT":{
        //             "base_volume":229196.34035399999,
        //             "last_price":11881.06,
        //             "quote_volume":19.2909
        //         }
        //     }
        //
        const tickers = [];
        const pairs = Object.keys(response);
        for (let i = 0; i < pairs.length; i++) {
            const marketId = pairs[i];
            const market = this.safeMarket(marketId);
            const rawTicker = this.safeValue(response, marketId);
            const ticker = this.parseTicker(rawTicker, market);
            tickers.push(ticker);
        }
        return this.filterByArray(tickers, 'symbol', symbols);
    }
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        /**
         * @method
         * @name ace#fetchOrderBook
         * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---order-books
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int|undefined} limit the maximum amount of order book entries to return
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'quoteCurrencyId': market['quoteId'],
            'baseCurrencyId': market['baseId'],
        };
        if (limit !== undefined) {
            request['depth'] = limit;
        }
        const response = await this.publicGetOpenV2PublicGetOrderBook(this.extend(request, params));
        //
        //     {
        //         "attachment": {
        //             "baseCurrencyId": "2",
        //             "quoteCurrencyId": "14",
        //             "baseCurrencyName": "BTC",
        //             "quoteCurrencyName": "USDT",
        //             "bids": [
        //                 [
        //                     "0.0009",
        //                     "19993.53"
        //                 ],
        //                 [
        //                     "0.001",
        //                     "19675.33"
        //                 ],
        //                 [
        //                     "0.001",
        //                     "19357.13"
        //                 ]
        //             ],
        //             "asks": [
        //                 [
        //                     "0.001",
        //                     "20629.92"
        //                 ],
        //                 [
        //                     "0.001",
        //                     "20948.12"
        //                 ]
        //             ]
        //         },
        //         "message": null,
        //         "parameters": null,
        //         "status": 200
        //     }
        //
        const orderBook = this.safeValue(response, 'attachment');
        return this.parseOrderBook(orderBook, market['symbol'], undefined, 'bids', 'asks');
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        //     {
        //         "changeRate": 0,
        //         "volume": 0,
        //         "closePrice": 101000.0,
        //         "lowPrice": 101000.0,
        //         "highPrice": 101000.0,
        //         "highPrice": 1573195740000L,
        //         "openPrice": 101000.0,
        //         "current": 101000.0,
        //         "currentTime": "2019-11-08 14:49:00",
        //         "createTime": "2019-11-08 14:49:00"
        //     }
        //
        const dateTime = this.safeString(ohlcv, 'createTime');
        let timestamp = this.parse8601(dateTime);
        if (timestamp !== undefined) {
            timestamp = timestamp - 28800000; // 8 hours
        }
        return [
            timestamp,
            this.safeNumber(ohlcv, 'openPrice'),
            this.safeNumber(ohlcv, 'highPrice'),
            this.safeNumber(ohlcv, 'lowPrice'),
            this.safeNumber(ohlcv, 'closePrice'),
            this.safeNumber(ohlcv, 'volume'),
        ];
    }
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name ace#fetchOHLCV
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---klinecandlestick-data
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int|undefined} since timestamp in ms of the earliest candle to fetch
         * @param {int|undefined} limit the maximum amount of candles to fetch
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {[[int]]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'duration': this.timeframes[timeframe],
            'quoteCurrencyId': market['quoteId'],
            'baseCurrencyId': market['baseId'],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        if (since !== undefined) {
            request['startTime'] = since;
        }
        const response = await this.privatePostV2KlineGetKline(this.extend(request, params));
        const data = this.safeValue(response, 'attachment', []);
        //
        //     {
        //         "attachment":[
        //                 {
        //                     "changeRate": 0,
        //                     "closePrice": 101000.0,
        //                     "volume": 0,
        //                     "lowPrice": 101000.0,
        //                     "highPrice": 101000.0,
        //                     "highPrice": 1573195740000L,
        //                     "openPrice": 101000.0,
        //                     "current": 101000.0,
        //                     "currentTime": "2019-11-08 14:49:00",
        //                     "createTime": "2019-11-08 14:49:00"
        //                 }
        //         ]
        //     }
        //
        return this.parseOHLCVs(data, market, timeframe, since, limit);
    }
    parseOrderStatus(status) {
        const statuses = {
            '0': 'open',
            '1': 'open',
            '2': 'closed',
            '4': 'canceled',
            '5': 'canceled',
        };
        return this.safeString(statuses, status, undefined);
    }
    parseOrder(order, market = undefined) {
        //
        // createOrder
        //         "15697850529570392100421100482693"
        //
        // fetchOpenOrders
        //         {
        //             "uid": 0,
        //             "orderNo": "16113081376560890227301101413941",
        //             "orderTime": "2021-01-22 17:35:37",
        //             "orderTimeStamp": 1611308137656,
        //             "baseCurrencyId": 1,
        //             "baseCurrencyName": "TWD",
        //             "quoteCurrencyId": 14,
        //             "quoteCurrencyName": "USDT",
        //             "buyOrSell": "1",
        //             "num": "6.0000000000000000",
        //             "price": "32.5880000000000000",
        //             "remainNum": "2.0000000000000000",
        //             "tradeNum": "4.0000000000000000",
        //             "tradePrice": "31.19800000000000000000",
        //             "tradeAmount": "124.7920000000000000",
        //             "tradeRate": "0.66666666666666666667",
        //             "status": 1,
        //             "type": 1
        //         }
        //
        let id = undefined;
        let timestamp = undefined;
        let symbol = undefined;
        let price = undefined;
        let amount = undefined;
        let side = undefined;
        let type = undefined;
        let status = undefined;
        let filled = undefined;
        let remaining = undefined;
        let average = undefined;
        if (typeof order === 'string') {
            id = order;
        }
        else {
            id = this.safeString(order, 'orderNo');
            timestamp = this.safeInteger(order, 'orderTimeStamp');
            if (timestamp === undefined) {
                const dateTime = this.safeString(order, 'orderTime');
                if (dateTime !== undefined) {
                    timestamp = this.parse8601(dateTime);
                    timestamp = timestamp - 28800000; // 8 hours
                }
            }
            const orderSide = this.safeNumber(order, 'buyOrSell');
            if (orderSide !== undefined) {
                side = (orderSide === 1) ? 'buy' : 'sell';
            }
            amount = this.safeString(order, 'num');
            price = this.safeString(order, 'price');
            const quoteId = this.safeString(order, 'quoteCurrencyName');
            const baseId = this.safeString(order, 'baseCurrencyName');
            if (quoteId !== undefined && baseId !== undefined) {
                symbol = baseId + '/' + quoteId;
            }
            const orderType = this.safeNumber(order, 'type');
            if (orderType !== undefined) {
                type = (orderType === 1) ? 'limit' : 'market';
            }
            filled = this.safeString(order, 'tradeNum');
            remaining = this.safeString(order, 'remainNum');
            status = this.parseOrderStatus(this.safeString(order, 'status'));
            average = this.safeString(order, 'averagePrice');
        }
        return this.safeOrder({
            'id': id,
            'clientOrderId': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastTradeTimestamp': undefined,
            'symbol': symbol,
            'type': type,
            'timeInForce': undefined,
            'postOnly': undefined,
            'side': side,
            'price': price,
            'stopPrice': undefined,
            'amount': amount,
            'cost': undefined,
            'average': average,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': undefined,
            'trades': undefined,
            'info': order,
        }, market);
    }
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        /**
         * @method
         * @name ace#createOrder
         * @description create a trade order
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---new-order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float|undefined} price the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const orderType = type.toUpperCase();
        const orderSide = side.toUpperCase();
        const request = {
            'baseCurrencyId': market['baseId'],
            'quoteCurrencyId': market['quoteId'],
            'type': (orderType === 'LIMIT') ? 1 : 2,
            'buyOrSell': (orderSide === 'BUY') ? 1 : 2,
            'num': this.amountToPrecision(symbol, amount),
        };
        if (type === 'limit') {
            request['price'] = this.priceToPrecision(symbol, price);
        }
        const response = await this.privatePostV2OrderOrder(this.extend(request, params));
        //
        //     {
        //         "attachment": "15697850529570392100421100482693",
        //         "message": null,
        //         "parameters": null,
        //         "status": 200
        //     }
        //
        const data = this.safeValue(response, 'attachment');
        return this.parseOrder(data, market);
    }
    async cancelOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name ace#cancelOrder
         * @description cancels an open order
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---cancel-order
         * @param {string} id order id
         * @param {string} symbol unified symbol of the market the order was made in
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const request = {
            'orderNo': id,
        };
        const response = await this.privatePostV2OrderCancel(this.extend(request, params));
        //
        //     {
        //         "attachment": 200,
        //         "message": null,
        //         "parameters": null,
        //         "status": 200
        //     }
        //
        return response;
    }
    async fetchOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name ace#fetchOrder
         * @description fetches information on an order made by the user
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---order-status
         * @param {string} symbol unified symbol of the market the order was made in
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const request = {
            'orderNo': id,
        };
        const response = await this.privatePostV2OrderShowOrderStatus(this.extend(request, params));
        //
        //     {
        //         "attachment": {
        //             "buyOrSell": 1,
        //             "averagePrice": "490849.75000000",
        //             "num": "0.00000000",
        //             "orderTime": "2022-11-29 18:03:06.318",
        //             "price": "490849.75000000",
        //             "status": 4,
        //             "tradeNum": "0.02697000",
        //             "remainNum": "0.97303000",
        //             "baseCurrencyId": 2,
        //             "baseCurrencyName": "BTC",
        //             "quoteCurrencyId": 1,
        //             "quoteCurrencyName": "TWD",
        //             "orderNo": "16697161898600391472461100244406"
        //         },
        //         "message": null,
        //         "parameters": null,
        //         "status": 200
        //     }
        //
        const data = this.safeValue(response, 'attachment');
        return this.parseOrder(data, undefined);
    }
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name ace#fetchOpenOrders
         * @description fetch all unfilled currently open orders
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---order-list
         * @param {string} symbol unified market symbol of the market orders were made in
         * @param {int|undefined} since the earliest time in ms to fetch orders for
         * @param {int|undefined} limit the maximum number of  orde structures to retrieve
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {[object]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        if (symbol === undefined) {
            throw new ArgumentsRequired(this.id + ' fetchOpenOrders() requires the symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'quoteCurrencyId': market['quoteId'],
            'baseCurrencyId': market['baseId'],
            // 'start': 0,
        };
        if (limit !== undefined) {
            request['size'] = limit;
        }
        const response = await this.privatePostV2OrderGetOrderList(this.extend(request, params));
        const orders = this.safeValue(response, 'attachment');
        //
        //     {
        //         "attachment": [
        //             {
        //                 "uid": 0,
        //                 "orderNo": "16113081376560890227301101413941",
        //                 "orderTime": "2021-01-22 17:35:37",
        //                 "orderTimeStamp": 1611308137656,
        //                 "baseCurrencyId": 1,
        //                 "baseCurrencyName": "TWD",
        //                 "quoteCurrencyId": 14,
        //                 "quoteCurrencyName": "USDT",
        //                 "buyOrSell": "1",
        //                 "num": "6.0000000000000000",
        //                 "price": "32.5880000000000000",
        //                 "remainNum": "2.0000000000000000",
        //                 "tradeNum": "4.0000000000000000",
        //                 "tradePrice": "31.19800000000000000000",
        //                 "tradeAmount": "124.7920000000000000",
        //                 "tradeRate": "0.66666666666666666667",
        //                 "status": 1,
        //                 "type": 1
        //             }
        //         ],
        //         "message": null,
        //         "parameters": null,
        //         "status": 200
        //     }
        //
        return this.parseOrders(orders, market, since, limit);
    }
    parseTrade(trade, market = undefined) {
        //
        // fetchOrderTrades
        //         {
        //             "amount": 0.0030965,
        //             "tradeNo": "15681920522485652100751000417788",
        //             "price": "0.03096500",
        //             "num": "0.10000000",
        //             "bi": 1,
        //             "time": "2019-09-11 16:54:12.248"
        //         }
        //
        // fetchMyTrades
        //         {
        //             "buyOrSell": 1,
        //             "orderNo": "16708156853695560053601100247906",
        //             "num": "1",
        //             "price": "16895",
        //             "orderAmount": "16895",
        //             "tradeNum": "0.1",
        //             "tradePrice": "16895",
        //             "tradeAmount": "1689.5",
        //             "fee": "0",
        //             "feeSave": "0",
        //             "status": 1,
        //             "isSelf": false,
        //             "tradeNo": "16708186395087940051961000274150",
        //             "tradeTime": "2022-12-12 12:17:19",
        //             "tradeTimestamp": 1670818639508,
        //             "quoteCurrencyId": 14,
        //             "quoteCurrencyName": "USDT",
        //             "baseCurrencyId": 2,
        //             "baseCurrencyName": "BTC"
        //         }
        const id = this.safeString(trade, 'tradeNo');
        const price = this.safeString(trade, 'price');
        const amount = this.safeString(trade, 'num');
        let timestamp = this.safeInteger(trade, 'tradeTimestamp');
        if (timestamp === undefined) {
            const datetime = this.safeString2(trade, 'time', 'tradeTime');
            timestamp = this.parse8601(datetime);
            timestamp = timestamp - 28800000; // 8 hours normalize timestamp
        }
        let symbol = market['symbol'];
        const quoteId = this.safeString(trade, 'quoteCurrencyName');
        const baseId = this.safeString(trade, 'baseCurrencyName');
        if (quoteId !== undefined && baseId !== undefined) {
            symbol = baseId + '/' + quoteId;
        }
        let side = undefined;
        const tradeSide = this.safeNumber(trade, 'buyOrSell');
        if (tradeSide !== undefined) {
            side = (tradeSide === 1) ? 'buy' : 'sell';
        }
        const feeString = this.safeString(trade, 'fee');
        let fee = undefined;
        if (feeString !== undefined) {
            const feeSaveString = this.safeString(trade, 'feeSave');
            fee = {
                'cost': Precise.stringSub(feeString, feeSaveString),
                'currency': quoteId,
            };
        }
        return this.safeTrade({
            'info': trade,
            'id': id,
            'order': this.safeString(trade, 'orderNo'),
            'symbol': symbol,
            'side': side,
            'type': undefined,
            'takerOrMaker': undefined,
            'price': price,
            'amount': amount,
            'cost': undefined,
            'fee': fee,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
        }, market);
    }
    async fetchOrderTrades(id, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name ace#fetchOrderTrades
         * @description fetch all the trades made from a single order
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---order-history
         * @param {string} id order id
         * @param {string} symbol unified market symbol
         * @param {int|undefined} since the earliest time in ms to fetch trades for
         * @param {int|undefined} limit the maximum number of trades to retrieve
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {[object]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
         */
        await this.loadMarkets();
        const market = this.safeMarket(symbol);
        const request = {
            'orderNo': id,
        };
        const response = await this.privatePostV2OrderShowOrderHistory(this.extend(request, params));
        //
        //     {
        //         "attachment": {
        //             "order": {
        //                 "buyOrSell": 1,
        //                 "averagePrice": "491343.74000000",
        //                 "num": "1.00000000",
        //                 "orderTime": "2022-11-29 18:32:22.232",
        //                 "price": "491343.74000000",
        //                 "status": 1,
        //                 "tradeNum": "0.01622200",
        //                 "remainNum": "0.98377800",
        //                 "baseCurrencyId": 2,
        //                 "baseCurrencyName": "BTC",
        //                 "quoteCurrencyId": 1,
        //                 "quoteCurrencyName": "TWD",
        //                 "orderNo": "16697179457740441472471100214402"
        //             },
        //             "trades": [
        //                 {
        //                     "price": "491343.74000000",
        //                     "num": "0.01622200",
        //                     "time": "2022-11-29 18:32:25.789",
        //                     "tradeNo": "16697179457897791471461000223437",
        //                     "amount": "7970.57815028"
        //                 }
        //             ]
        //         },
        //         "message": null,
        //         "parameters": null,
        //         "status": 200
        //     }
        //
        const data = this.safeValue(response, 'attachment');
        const trades = this.safeValue(data, 'trades');
        if (trades === undefined) {
            return trades;
        }
        return await this.parseTrades(trades, market, since, limit);
    }
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name ace#fetchMyTrades
         * @description fetch all trades made by the user
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---trade-list
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int|undefined} since timestamp in ms of the earliest trade to fetch
         * @param {int|undefined} limit the maximum amount of trades to fetch
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {[object]} a list of [trade structures]{@link https://docs.ccxt.com/en/latest/manual.html?#public-trades}
         */
        await this.loadMarkets();
        const market = this.safeMarket(symbol);
        const request = {
        // 'buyOrSell': 1,
        // 'start': 0,
        };
        if (market['id'] !== undefined) {
            request['quoteCurrencyId'] = market['quoteId'];
            request['baseCurrencyId'] = market['baseId'];
        }
        if (limit !== undefined) {
            request['size'] = limit; // default 10, max 500
        }
        const response = await this.privatePostV2OrderGetTradeList(this.extend(request, params));
        //
        //     {
        //         "attachment": [
        //             {
        //                 "buyOrSell": 1,
        //                 "orderNo": "16708156853695560053601100247906",
        //                 "num": "1",
        //                 "price": "16895",
        //                 "orderAmount": "16895",
        //                 "tradeNum": "0.1",
        //                 "tradePrice": "16895",
        //                 "tradeAmount": "1689.5",
        //                 "fee": "0",
        //                 "feeSave": "0",
        //                 "status": 1,
        //                 "isSelf": false,
        //                 "tradeNo": "16708186395087940051961000274150",
        //                 "tradeTime": "2022-12-12 12:17:19",
        //                 "tradeTimestamp": 1670818639508,
        //                 "quoteCurrencyId": 14,
        //                 "quoteCurrencyName": "USDT",
        //                 "baseCurrencyId": 2,
        //                 "baseCurrencyName": "BTC"
        //             }
        //         ],
        //         "message": null,
        //         "parameters": null,
        //         "status": 200
        //     }
        //
        const trades = this.safeValue(response, 'attachment', []);
        return this.parseTrades(trades, market, since, limit);
    }
    parseBalance(response) {
        //
        //     [
        //         {
        //             "currencyId": 4,
        //             "amount": 6.896,
        //             "cashAmount": 6.3855,
        //             "uid": 123,
        //             "currencyName": "BTC"
        //         }
        //     ]
        //
        const result = {
            'info': response,
        };
        for (let i = 0; i < response.length; i++) {
            const balance = response[i];
            const currencyId = this.safeString(balance, 'currencyName');
            const code = this.safeCurrencyCode(currencyId);
            const amount = this.safeString(balance, 'amount');
            const available = this.safeString(balance, 'cashAmount');
            const account = {
                'free': available,
                'total': amount,
            };
            result[code] = account;
        }
        return this.safeBalance(result);
    }
    async fetchBalance(params = {}) {
        /**
         * @method
         * @name ace#fetchBalance
         * @description query for balance and get the amount of funds available for trading or funds locked in orders
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---account-balance
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {object} a [balance structure]{@link https://docs.ccxt.com/en/latest/manual.html?#balance-structure}
         */
        await this.loadMarkets();
        const response = await this.privatePostV2CoinCustomerAccount(params);
        const balances = this.safeValue(response, 'attachment', []);
        //
        //     {
        //         "attachment":[
        //             {
        //                 "currencyId": 4,
        //                 "amount": 6.896,
        //                 "cashAmount": 6.3855,
        //                 "uid": 123,
        //                 "currencyName": "BTC"
        //             }
        //         ],
        //         message: null,
        //         parameters: null,
        //         status: '200'
        //     }
        //
        return this.parseBalance(balances);
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = '/' + this.implodeParams(path, params);
        const query = this.omit(params, this.extractParams(path));
        if (headers === undefined) {
            headers = {};
        }
        if (api === 'private') {
            this.checkRequiredCredentials();
            const nonce = this.milliseconds();
            let auth = 'ACE_SIGN' + this.secret;
            const data = this.extend({
                'apiKey': this.apiKey,
                'timeStamp': nonce,
            }, params);
            const dataKeys = Object.keys(data);
            const sortedDataKeys = this.sortBy(dataKeys, 0);
            for (let i = 0; i < sortedDataKeys.length; i++) {
                const key = sortedDataKeys[i];
                auth += this.safeString(data, key);
            }
            const signature = this.hash(this.encode(auth), sha256, 'hex');
            data['signKey'] = signature;
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            if (method === 'POST') {
                const brokerId = this.safeString(this.options, 'brokerId');
                if (brokerId !== undefined) {
                    headers['Referer'] = brokerId;
                }
            }
            body = this.urlencode(data);
        }
        else if (api === 'public' && method === 'GET') {
            if (Object.keys(query).length) {
                url += '?' + this.urlencode(query);
            }
        }
        url = this.urls['api'][api] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
    handleErrors(code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return; // fallback to the default error handler
        }
        const feedback = this.id + ' ' + body;
        const status = this.safeNumber(response, 'status', 200);
        if (status > 200) {
            this.throwExactlyMatchedException(this.exceptions['exact'], status, feedback);
            this.throwBroadlyMatchedException(this.exceptions['broad'], status, feedback);
        }
    }
}

// -------------------------------------------------------------------------------
class Exchange$1w extends Exchange$1y {
}

//  ---------------------------------------------------------------------------
//  ---------------------------------------------------------------------------xs
class alpaca$1 extends Exchange$1w {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'alpaca',
            'name': 'Alpaca',
            'countries': ['US'],
            'rateLimit': 333,
            'hostname': 'alpaca.markets',
            'pro': true,
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/187234005-b864db3d-f1e3-447a-aaf9-a9fc7b955d07.jpg',
                'www': 'https://alpaca.markets',
                'api': {
                    'public': 'https://api.{hostname}/{version}',
                    'private': 'https://api.{hostname}/{version}',
                    'cryptoPublic': 'https://data.{hostname}/{version}',
                    'markets': 'https://api.{hostname}/{version}',
                },
                'test': {
                    'public': 'https://paper-api.{hostname}/{version}',
                    'private': 'https://paper-api.{hostname}/{version}',
                    'cryptoPublic': 'https://data.{hostname}/{version}',
                    'markets': 'https://api.{hostname}/{version}',
                },
                'doc': 'https://alpaca.markets/docs/',
                'fees': 'https://alpaca.markets/support/what-are-the-fees-associated-with-crypto-trading/',
            },
            'has': {
                'CORS': false,
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'cancelAllOrders': true,
                'cancelOrder': true,
                'createOrder': true,
                'fetchBalance': true,
                'fetchBidsAsks': false,
                'fetchClosedOrders': false,
                'fetchCurrencies': false,
                'fetchDepositAddress': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchDeposits': false,
                'fetchFundingHistory': false,
                'fetchFundingRate': false,
                'fetchFundingRates': false,
                'fetchL1OrderBook': true,
                'fetchL2OrderBook': false,
                'fetchMarkets': true,
                'fetchMyTrades': false,
                'fetchOHLCV': true,
                'fetchOpenOrder': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': false,
                'fetchPositions': false,
                'fetchStatus': false,
                'fetchTicker': false,
                'fetchTickers': false,
                'fetchTime': false,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchTransactionFees': false,
                'fetchTransactions': false,
                'fetchTransfers': false,
                'fetchWithdrawals': false,
                'setLeverage': false,
                'setMarginMode': false,
                'transfer': false,
                'withdraw': false,
            },
            'api': {
                'markets': {
                    'get': [
                        'assets/public/beta',
                    ],
                },
                'private': {
                    'get': [
                        'account',
                        'orders',
                        'orders/{order_id}',
                        'positions',
                        'positions/{symbol}',
                        'account/activities/{activity_type}',
                    ],
                    'post': [
                        'orders',
                    ],
                    'delete': [
                        'orders',
                        'orders/{order_id}',
                    ],
                },
                'cryptoPublic': {
                    'get': [
                        'crypto/latest/orderbooks',
                        'crypto/trades',
                        'crypto/quotes',
                        'crypto/latest/quotes',
                        'crypto/bars',
                        'crypto/snapshots',
                    ],
                },
            },
            'timeframes': {
                '1m': '1min',
                '3m': '3min',
                '5m': '5min',
                '15m': '15min',
                '30m': '30min',
                '1h': '1H',
                '2h': '2H',
                '4h': '4H',
                '6h': '6H',
                '8h': '8H',
                '12h': '12H',
                '1d': '1D',
                '3d': '3D',
                '1w': '1W',
                '1M': '1M',
            },
            'precisionMode': TICK_SIZE$1,
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'maker': this.parseNumber('0.003'),
                    'taker': this.parseNumber('0.003'),
                    'tiers': {
                        'taker': [
                            [this.parseNumber('0'), this.parseNumber('0.003')],
                            [this.parseNumber('500000'), this.parseNumber('0.0028')],
                            [this.parseNumber('1000000'), this.parseNumber('0.0025')],
                            [this.parseNumber('5000000'), this.parseNumber('0.002')],
                            [this.parseNumber('10000000'), this.parseNumber('0.0018')],
                            [this.parseNumber('25000000'), this.parseNumber('0.0015')],
                            [this.parseNumber('50000000'), this.parseNumber('0.00125')],
                            [this.parseNumber('100000000'), this.parseNumber('0.001')],
                        ],
                        'maker': [
                            [this.parseNumber('0'), this.parseNumber('0.003')],
                            [this.parseNumber('500000'), this.parseNumber('0.0028')],
                            [this.parseNumber('1000000'), this.parseNumber('0.0025')],
                            [this.parseNumber('5000000'), this.parseNumber('0.002')],
                            [this.parseNumber('10000000'), this.parseNumber('0.0018')],
                            [this.parseNumber('25000000'), this.parseNumber('0.0015')],
                            [this.parseNumber('50000000'), this.parseNumber('0.00125')],
                            [this.parseNumber('100000000'), this.parseNumber('0.001')],
                        ],
                    },
                },
            },
            'headers': {
                'APCA-PARTNER-ID': 'ccxt',
            },
            'options': {
                'fetchTradesMethod': 'cryptoPublicGetCryptoTrades',
                'fetchOHLCVMethod': 'cryptoPublicGetCryptoBars',
                'versions': {
                    'public': 'v2',
                    'private': 'v2',
                    'cryptoPublic': 'v1beta2',
                    'markets': 'v2', // crypto beta
                },
                'defaultExchange': 'CBSE',
                'exchanges': [
                    'CBSE',
                    'FTX',
                    'GNSS',
                    'ERSX', // ErisX
                ],
                'defaultTimeInForce': 'gtc',
                'clientOrderId': 'ccxt_{id}',
            },
            'exceptions': {
                'exact': {
                    'forbidden.': PermissionDenied,
                    '40410000': InvalidOrder,
                    '40010001': BadRequest,
                    '40110000': PermissionDenied,
                    '40310000': InsufficientFunds, // {"available":"0","balance":"0","code":40310000,"message":"insufficient balance for USDT (requested: 221.63, available: 0)","symbol":"USDT"}
                },
                'broad': {
                    'Invalid format for parameter': BadRequest,
                    'Invalid symbol': BadSymbol, // {"message":"Invalid symbol(s): BTC/USDdsda does not match ^[A-Z]+/[A-Z]+$"}
                },
            },
        });
    }
    async fetchMarkets(params = {}) {
        /**
         * @method
         * @name alpaca#fetchMarkets
         * @description retrieves data on all markets for alpaca
         * @param {object} params extra parameters specific to the exchange api endpoint
         * @returns {[object]} an array of objects representing market data
         */
        const request = {
            'asset_class': 'crypto',
            'tradeable': true,
        };
        const assets = await this.marketsGetAssetsPublicBeta(this.extend(request, params));
        //
        //    [
        //        {
        //           "id":"a3ba8ac0-166d-460b-b17a-1f035622dd47",
        //           "class":"crypto",
        //           "exchange":"FTXU",
        //           "symbol":"DOGEUSD",
        //           "name":"Dogecoin",
        //           "status":"active",
        //           "tradable":true,
        //           "marginable":false,
        //           "shortable":false,
        //           "easy_to_borrow":false,
        //           "fractionable":true,
        //           "min_order_size":"1",
        //           "min_trade_increment":"1",
        //           "price_increment":"0.0000005"
        //        }
        //    ]
        //
        const markets = [];
        for (let i = 0; i < assets.length; i++) {
            const asset = assets[i];
            const marketId = this.safeString(asset, 'symbol');
            const parts = marketId.split('/');
            const baseId = this.safeString(parts, 0);
            const quoteId = this.safeString(parts, 1);
            const base = this.safeCurrencyCode(baseId);
            const quote = this.safeCurrencyCode(quoteId);
            const symbol = base + '/' + quote;
            const status = this.safeString(asset, 'status');
            const active = (status === 'active');
            const minAmount = this.safeNumber(asset, 'min_order_size');
            const amount = this.safeNumber(asset, 'min_trade_increment');
            const price = this.safeNumber(asset, 'price_increment');
            markets.push({
                'id': marketId,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': undefined,
                'swap': false,
                'future': false,
                'option': false,
                'active': active,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': amount,
                    'price': price,
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': minAmount,
                        'max': undefined,
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'info': asset,
            });
        }
        return markets;
    }
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name alpaca#fetchTrades
         * @description get the list of most recent trades for a particular symbol
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int|undefined} since timestamp in ms of the earliest trade to fetch
         * @param {int|undefined} limit the maximum amount of trades to fetch
         * @param {object} params extra parameters specific to the alpaca api endpoint
         * @returns {[object]} a list of [trade structures]{@link https://docs.ccxt.com/en/latest/manual.html?#public-trades}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const id = market['id'];
        const request = {
            'symbols': id,
        };
        if (since !== undefined) {
            request['start'] = this.iso8601(since);
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const method = this.safeString(this.options, 'fetchTradesMethod', 'cryptoPublicGetCryptoTrades');
        const response = await this[method](this.extend(request, params));
        //
        // {
        //     "next_page_token":null,
        //     "trades":{
        //        "BTC/USD":[
        //           {
        //              "i":36440704,
        //              "p":22625,
        //              "s":0.0001,
        //              "t":"2022-07-21T11:47:31.073391Z",
        //              "tks":"B"
        //           }
        //        ]
        //     }
        // }
        //
        const trades = this.safeValue(response, 'trades', {});
        const symbolTrades = this.safeValue(trades, market['id'], {});
        return this.parseTrades(symbolTrades, market, since, limit);
    }
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        /**
         * @method
         * @name alpaca#fetchOrderBook
         * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int|undefined} limit the maximum amount of order book entries to return
         * @param {object} params extra parameters specific to the alpaca api endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const id = market['id'];
        const request = {
            'symbols': id,
        };
        const response = await this.cryptoPublicGetCryptoLatestOrderbooks(this.extend(request, params));
        //
        //   {
        //       "orderbooks":{
        //          "BTC/USD":{
        //             "a":[
        //                {
        //                   "p":22208,
        //                   "s":0.0051
        //                },
        //                {
        //                   "p":22209,
        //                   "s":0.1123
        //                },
        //                {
        //                   "p":22210,
        //                   "s":0.2465
        //                }
        //             ],
        //             "b":[
        //                {
        //                   "p":22203,
        //                   "s":0.395
        //                },
        //                {
        //                   "p":22202,
        //                   "s":0.2465
        //                },
        //                {
        //                   "p":22201,
        //                   "s":0.6455
        //                }
        //             ],
        //             "t":"2022-07-19T13:41:55.13210112Z"
        //          }
        //       }
        //   }
        //
        const orderbooks = this.safeValue(response, 'orderbooks', {});
        const rawOrderbook = this.safeValue(orderbooks, id, {});
        const timestamp = this.parse8601(this.safeString(rawOrderbook, 't'));
        return this.parseOrderBook(rawOrderbook, market['symbol'], timestamp, 'b', 'a', 'p', 's');
    }
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name alpaca#fetchOHLCV
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int|undefined} since timestamp in ms of the earliest candle to fetch
         * @param {int|undefined} limit the maximum amount of candles to fetch
         * @param {object} params extra parameters specific to the alpha api endpoint
         * @returns {[[int]]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbols': market['id'],
            'timeframe': this.safeString(this.timeframes, timeframe, timeframe),
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        if (since !== undefined) {
            request['start'] = this.yyyymmdd(since);
        }
        const method = this.safeString(this.options, 'fetchOHLCVMethod', 'cryptoPublicGetCryptoBars');
        const response = await this[method](this.extend(request, params));
        //
        //    {
        //        "bars":{
        //           "BTC/USD":[
        //              {
        //                 "c":22887,
        //                 "h":22888,
        //                 "l":22873,
        //                 "n":11,
        //                 "o":22883,
        //                 "t":"2022-07-21T05:00:00Z",
        //                 "v":1.1138,
        //                 "vw":22883.0155324116
        //              },
        //              {
        //                 "c":22895,
        //                 "h":22895,
        //                 "l":22884,
        //                 "n":6,
        //                 "o":22884,
        //                 "t":"2022-07-21T05:01:00Z",
        //                 "v":0.001,
        //                 "vw":22889.5
        //              }
        //           ]
        //        },
        //        "next_page_token":"QlRDL1VTRHxNfDIwMjItMDctMjFUMDU6MDE6MDAuMDAwMDAwMDAwWg=="
        //     }
        //
        const bars = this.safeValue(response, 'bars', {});
        const ohlcvs = this.safeValue(bars, market['id'], {});
        return this.parseOHLCVs(ohlcvs, market, timeframe, since, limit);
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        //     {
        //        "c":22895,
        //        "h":22895,
        //        "l":22884,
        //        "n":6,
        //        "o":22884,
        //        "t":"2022-07-21T05:01:00Z",
        //        "v":0.001,
        //        "vw":22889.5
        //     }
        //
        const datetime = this.safeString(ohlcv, 't');
        const timestamp = this.parse8601(datetime);
        return [
            timestamp,
            this.safeNumber(ohlcv, 'o'),
            this.safeNumber(ohlcv, 'h'),
            this.safeNumber(ohlcv, 'l'),
            this.safeNumber(ohlcv, 'c'),
            this.safeNumber(ohlcv, 'v'), // volume
        ];
    }
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        /**
         * @method
         * @name alpaca#createOrder
         * @description create a trade order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market', 'limit' or 'stop_limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float} price the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
         * @param {object} params extra parameters specific to the alpaca api endpoint
         * @param {float} params.triggerPrice The price at which a trigger order is triggered at
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const id = market['id'];
        const request = {
            'symbol': id,
            'qty': this.amountToPrecision(symbol, amount),
            'side': side,
            'type': type, // market, limit, stop_limit
        };
        const triggerPrice = this.safeStringN(params, ['triggerPrice', 'stop_price']);
        if (triggerPrice !== undefined) {
            let newType = undefined;
            if (type.indexOf('limit') >= 0) {
                newType = 'stop_limit';
            }
            else {
                throw new NotSupported(this.id + ' createOrder() does not support stop orders for ' + type + ' orders, only stop_limit orders are supported');
            }
            request['stop_price'] = this.priceToPrecision(symbol, triggerPrice);
            request['type'] = newType;
        }
        if (type.indexOf('limit') >= 0) {
            request['limit_price'] = this.priceToPrecision(symbol, price);
        }
        const defaultTIF = this.safeString(this.options, 'defaultTimeInForce');
        request['time_in_force'] = this.safeString(params, 'timeInForce', defaultTIF);
        params = this.omit(params, ['timeInForce', 'triggerPrice']);
        const clientOrderIdprefix = this.safeString(this.options, 'clientOrderId');
        const uuid = this.uuid();
        const parts = uuid.split('-');
        const random_id = parts.join('');
        const defaultClientId = this.implodeParams(clientOrderIdprefix, { 'id': random_id });
        const clientOrderId = this.safeString(params, 'clientOrderId', defaultClientId);
        request['client_order_id'] = clientOrderId;
        params = this.omit(params, ['clientOrderId']);
        const order = await this.privatePostOrders(this.extend(request, params));
        //
        //   {
        //      "id": "61e69015-8549-4bfd-b9c3-01e75843f47d",
        //      "client_order_id": "eb9e2aaa-f71a-4f51-b5b4-52a6c565dad4",
        //      "created_at": "2021-03-16T18:38:01.942282Z",
        //      "updated_at": "2021-03-16T18:38:01.942282Z",
        //      "submitted_at": "2021-03-16T18:38:01.937734Z",
        //      "filled_at": null,
        //      "expired_at": null,
        //      "canceled_at": null,
        //      "failed_at": null,
        //      "replaced_at": null,
        //      "replaced_by": null,
        //      "replaces": null,
        //      "asset_id": "b0b6dd9d-8b9b-48a9-ba46-b9d54906e415",
        //      "symbol": "AAPL",
        //      "asset_class": "us_equity",
        //      "notional": "500",
        //      "qty": null,
        //      "filled_qty": "0",
        //      "filled_avg_price": null,
        //      "order_class": "",
        //      "order_type": "market",
        //      "type": "market",
        //      "side": "buy",
        //      "time_in_force": "day",
        //      "limit_price": null,
        //      "stop_price": null,
        //      "status": "accepted",
        //      "extended_hours": false,
        //      "legs": null,
        //      "trail_percent": null,
        //      "trail_price": null,
        //      "hwm": null
        //   }
        //
        return this.parseOrder(order, market);
    }
    async cancelOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name alpaca#cancelOrder
         * @description cancels an open order
         * @param {string} id order id
         * @param {string|undefined} symbol unified symbol of the market the order was made in
         * @param {object} params extra parameters specific to the alpaca api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const request = {
            'order_id': id,
        };
        const response = await this.privateDeleteOrdersOrderId(this.extend(request, params));
        //
        //   {
        //       "code": 40410000,
        //       "message": "order is not found."
        //   }
        //
        return this.safeValue(response, 'message', {});
    }
    async fetchOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name alpaca#fetchOrder
         * @description fetches information on an order made by the user
         * @param {string|undefined} symbol unified symbol of the market the order was made in
         * @param {object} params extra parameters specific to the alpaca api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const request = {
            'order_id': id,
        };
        const order = await this.privateGetOrdersOrderId(this.extend(request, params));
        const marketId = this.safeString(order, 'symbol');
        const market = this.safeMarket(marketId);
        return this.parseOrder(order, market);
    }
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name alpaca#fetchOpenOrders
         * @description fetch all unfilled currently open orders
         * @param {string|undefined} symbol unified market symbol
         * @param {int|undefined} since the earliest time in ms to fetch open orders for
         * @param {int|undefined} limit the maximum number of  open orders structures to retrieve
         * @param {object} params extra parameters specific to the alpaca api endpoint
         * @returns {[object]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        const orders = await this.privateGetOrders(params);
        return this.parseOrders(orders, market, since, limit);
    }
    parseOrder(order, market = undefined) {
        //
        //    {
        //        "id":"6ecfcc34-4bed-4b53-83ba-c564aa832a81",
        //        "client_order_id":"ccxt_1c6ceab0b5e84727b2f1c0394ba17560",
        //        "created_at":"2022-06-14T13:59:30.224037068Z",
        //        "updated_at":"2022-06-14T13:59:30.224037068Z",
        //        "submitted_at":"2022-06-14T13:59:30.221856828Z",
        //        "filled_at":null,
        //        "expired_at":null,
        //        "canceled_at":null,
        //        "failed_at":null,
        //        "replaced_at":null,
        //        "replaced_by":null,
        //        "replaces":null,
        //        "asset_id":"64bbff51-59d6-4b3c-9351-13ad85e3c752",
        //        "symbol":"BTCUSD",
        //        "asset_class":"crypto",
        //        "notional":null,
        //        "qty":"0.01",
        //        "filled_qty":"0",
        //        "filled_avg_price":null,
        //        "order_class":"",
        //        "order_type":"limit",
        //        "type":"limit",
        //        "side":"buy",
        //        "time_in_force":"day",
        //        "limit_price":"14000",
        //        "stop_price":null,
        //        "status":"accepted",
        //        "extended_hours":false,
        //        "legs":null,
        //        "trail_percent":null,
        //        "trail_price":null,
        //        "hwm":null,
        //        "commission":"0.42",
        //        "source":null
        //    }
        //
        const marketId = this.safeString(order, 'symbol');
        market = this.safeMarket(marketId, market);
        const symbol = market['symbol'];
        const alpacaStatus = this.safeString(order, 'status');
        const status = this.parseOrderStatus(alpacaStatus);
        const feeValue = this.safeString(order, 'commission');
        let fee = undefined;
        if (feeValue !== undefined) {
            fee = {
                'cost': feeValue,
                'currency': 'USD',
            };
        }
        let orderType = this.safeString(order, 'order_type');
        if (orderType.indexOf('limit') >= 0) {
            // might be limit or stop-limit
            orderType = 'limit';
        }
        const datetime = this.safeString(order, 'submitted_at');
        const timestamp = this.parse8601(datetime);
        return this.safeOrder({
            'id': this.safeString(order, 'id'),
            'clientOrderId': this.safeString(order, 'client_order_id'),
            'timestamp': timestamp,
            'datetime': datetime,
            'lastTradeTimeStamp': undefined,
            'status': status,
            'symbol': symbol,
            'type': orderType,
            'timeInForce': this.parseTimeInForce(this.safeString(order, 'time_in_force')),
            'postOnly': undefined,
            'side': this.safeString(order, 'side'),
            'price': this.safeNumber(order, 'limit_price'),
            'stopPrice': this.safeNumber(order, 'stop_price'),
            'triggerPrice': this.safeNumber(order, 'stop_price'),
            'cost': undefined,
            'average': this.safeNumber(order, 'filled_avg_price'),
            'amount': this.safeNumber(order, 'qty'),
            'filled': this.safeNumber(order, 'filled_qty'),
            'remaining': undefined,
            'trades': undefined,
            'fee': fee,
            'info': order,
        }, market);
    }
    parseOrderStatus(status) {
        const statuses = {
            'pending_new': 'open',
            'accepted': 'open',
            'new': 'open',
            'partially_filled': 'open',
            'activated': 'open',
            'filled': 'closed',
        };
        return this.safeString(statuses, status, status);
    }
    parseTimeInForce(timeInForce) {
        const timeInForces = {
            'day': 'Day',
        };
        return this.safeString(timeInForces, timeInForce, timeInForce);
    }
    parseTrade(trade, market = undefined) {
        //
        //   {
        //       "t":"2022-06-14T05:00:00.027869Z",
        //       "x":"CBSE",
        //       "p":"21942.15",
        //       "s":"0.0001",
        //       "tks":"S",
        //       "i":"355681339"
        //   }
        //
        const marketId = this.safeString(trade, 'S');
        const symbol = this.safeSymbol(marketId, market);
        const datetime = this.safeString(trade, 't');
        const timestamp = this.parse8601(datetime);
        const alpacaSide = this.safeString(trade, 'tks');
        let side = undefined;
        if (alpacaSide === 'B') {
            side = 'buy';
        }
        else if (alpacaSide === 'S') {
            side = 'sell';
        }
        const priceString = this.safeString(trade, 'p');
        const amountString = this.safeString(trade, 's');
        return this.safeTrade({
            'info': trade,
            'id': this.safeString(trade, 'i'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'order': undefined,
            'type': undefined,
            'side': side,
            'takerOrMaker': 'taker',
            'price': priceString,
            'amount': amountString,
            'cost': undefined,
            'fee': undefined,
        }, market);
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const versions = this.safeValue(this.options, 'versions');
        const version = this.safeString(versions, api);
        let endpoint = '/' + this.implodeParams(path, params);
        let url = this.implodeParams(this.urls['api'][api], { 'version': version });
        url = this.implodeHostname(url);
        headers = (headers !== undefined) ? headers : {};
        if (api === 'private') {
            headers['APCA-API-KEY-ID'] = this.apiKey;
            headers['APCA-API-SECRET-KEY'] = this.secret;
        }
        const query = this.omit(params, this.extractParams(path));
        if (Object.keys(query).length) {
            if ((method === 'GET') || (method === 'DELETE')) {
                endpoint += '?' + this.urlencode(query);
            }
            else {
                body = this.json(query);
                headers['Content-Type'] = 'application/json';
            }
        }
        url = url + endpoint;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
    handleErrors(code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return; // default error handler
        }
        // {
        //     "code": 40110000,
        //     "message": "request is not authorized"
        // }
        const feedback = this.id + ' ' + body;
        const errorCode = this.safeString(response, 'code');
        if (code !== undefined) {
            this.throwExactlyMatchedException(this.exceptions['exact'], errorCode, feedback);
        }
        const message = this.safeValue(response, 'message', undefined);
        if (message !== undefined) {
            this.throwExactlyMatchedException(this.exceptions['exact'], message, feedback);
            this.throwBroadlyMatchedException(this.exceptions['broad'], message, feedback);
            throw new ExchangeError(feedback);
        }
    }
}

// -------------------------------------------------------------------------------
class Exchange$1v extends Exchange$1y {
}

//  ---------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
class ascendex$1 extends Exchange$1v {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'ascendex',
            'name': 'AscendEX',
            'countries': ['SG'],
            // 8 requests per minute = 0.13333 per second => rateLimit = 750
            // testing 400 works
            'rateLimit': 400,
            'certified': false,
            'pro': true,
            // new metainfo interface
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': true,
                'swap': true,
                'future': true,
                'option': false,
                'addMargin': true,
                'cancelAllOrders': true,
                'cancelOrder': true,
                'createOrder': true,
                'createPostOnlyOrder': true,
                'createReduceOnlyOrder': true,
                'createStopLimitOrder': true,
                'createStopMarketOrder': true,
                'createStopOrder': true,
                'fetchAccounts': true,
                'fetchBalance': true,
                'fetchClosedOrders': true,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchDeposits': true,
                'fetchFundingHistory': false,
                'fetchFundingRate': 'emulated',
                'fetchFundingRateHistory': false,
                'fetchFundingRates': true,
                'fetchIndexOHLCV': false,
                'fetchLeverage': false,
                'fetchLeverageTiers': true,
                'fetchMarginMode': false,
                'fetchMarketLeverageTiers': 'emulated',
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': false,
                'fetchPosition': false,
                'fetchPositionMode': false,
                'fetchPositions': true,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': true,
                'fetchTransactionFee': false,
                'fetchTransactionFees': false,
                'fetchTransactions': true,
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchWithdrawal': false,
                'fetchWithdrawals': true,
                'reduceMargin': true,
                'setLeverage': true,
                'setMarginMode': true,
                'setPositionMode': false,
                'transfer': true,
            },
            'timeframes': {
                '1m': '1',
                '5m': '5',
                '15m': '15',
                '30m': '30',
                '1h': '60',
                '2h': '120',
                '4h': '240',
                '6h': '360',
                '12h': '720',
                '1d': '1d',
                '1w': '1w',
                '1M': '1m',
            },
            'version': 'v2',
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/112027508-47984600-8b48-11eb-9e17-d26459cc36c6.jpg',
                'api': {
                    'rest': 'https://ascendex.com',
                },
                'test': {
                    'rest': 'https://api-test.ascendex-sandbox.com',
                },
                'www': 'https://ascendex.com',
                'doc': [
                    'https://ascendex.github.io/ascendex-pro-api/#ascendex-pro-api-documentation',
                ],
                'fees': 'https://ascendex.com/en/feerate/transactionfee-traderate',
                'referral': {
                    'url': 'https://ascendex.com/en-us/register?inviteCode=EL6BXBQM',
                    'discount': 0.25,
                },
            },
            'api': {
                'v1': {
                    'public': {
                        'get': {
                            'assets': 1,
                            'products': 1,
                            'ticker': 1,
                            'barhist/info': 1,
                            'barhist': 1,
                            'depth': 1,
                            'trades': 1,
                            'cash/assets': 1,
                            'cash/products': 1,
                            'margin/assets': 1,
                            'margin/products': 1,
                            'futures/collateral': 1,
                            'futures/contracts': 1,
                            'futures/ref-px': 1,
                            'futures/market-data': 1,
                            'futures/funding-rates': 1,
                            'risk-limit-info': 1,
                            'exchange-info': 1,
                        },
                    },
                    'private': {
                        'get': {
                            'info': 1,
                            'wallet/transactions': 1,
                            'wallet/deposit/address': 1,
                            'data/balance/snapshot': 1,
                            'data/balance/history': 1,
                        },
                        'accountCategory': {
                            'get': {
                                'balance': 1,
                                'order/open': 1,
                                'order/status': 1,
                                'order/hist/current': 1,
                                'risk': 1,
                            },
                            'post': {
                                'order': 1,
                                'order/batch': 1,
                            },
                            'delete': {
                                'order': 1,
                                'order/all': 1,
                                'order/batch': 1,
                            },
                        },
                        'accountGroup': {
                            'get': {
                                'cash/balance': 1,
                                'margin/balance': 1,
                                'margin/risk': 1,
                                'futures/collateral-balance': 1,
                                'futures/position': 1,
                                'futures/risk': 1,
                                'futures/funding-payments': 1,
                                'order/hist': 1,
                                'spot/fee': 1,
                            },
                            'post': {
                                'transfer': 1,
                                'futures/transfer/deposit': 1,
                                'futures/transfer/withdraw': 1,
                            },
                        },
                    },
                },
                'v2': {
                    'public': {
                        'get': {
                            'assets': 1,
                            'futures/contract': 1,
                            'futures/collateral': 1,
                            'futures/pricing-data': 1,
                            'futures/ticker': 1,
                        },
                    },
                    'private': {
                        'get': {
                            'account/info': 1,
                        },
                        'accountGroup': {
                            'get': {
                                'order/hist': 1,
                                'futures/position': 1,
                                'futures/free-margin': 1,
                                'futures/order/hist/current': 1,
                                'futures/order/open': 1,
                                'futures/order/status': 1,
                            },
                            'post': {
                                'futures/isolated-position-margin': 1,
                                'futures/margin-type': 1,
                                'futures/leverage': 1,
                                'futures/transfer/deposit': 1,
                                'futures/transfer/withdraw': 1,
                                'futures/order': 1,
                                'futures/order/batch': 1,
                                'futures/order/open': 1,
                                'subuser/subuser-transfer': 1,
                                'subuser/subuser-transfer-hist': 1,
                            },
                            'delete': {
                                'futures/order': 1,
                                'futures/order/batch': 1,
                                'futures/order/all': 1,
                            },
                        },
                    },
                },
            },
            'fees': {
                'trading': {
                    'feeSide': 'get',
                    'tierBased': true,
                    'percentage': true,
                    'taker': this.parseNumber('0.002'),
                    'maker': this.parseNumber('0.002'),
                },
            },
            'precisionMode': TICK_SIZE$1,
            'options': {
                'account-category': 'cash',
                'account-group': undefined,
                'fetchClosedOrders': {
                    'method': 'v1PrivateAccountGroupGetOrderHist', // 'v1PrivateAccountGroupGetAccountCategoryOrderHistCurrent'
                },
                'defaultType': 'spot',
                'accountsByType': {
                    'spot': 'cash',
                    'swap': 'futures',
                    'future': 'futures',
                    'margin': 'margin',
                },
                'transfer': {
                    'fillResponseFromRequest': true,
                },
            },
            'exceptions': {
                'exact': {
                    // not documented
                    '1900': BadRequest,
                    '2100': AuthenticationError,
                    '5002': BadSymbol,
                    '6001': BadSymbol,
                    '6010': InsufficientFunds,
                    '60060': InvalidOrder,
                    '600503': InvalidOrder,
                    // documented
                    '100001': BadRequest,
                    '100002': BadRequest,
                    '100003': BadRequest,
                    '100004': BadRequest,
                    '100005': BadRequest,
                    '100006': BadRequest,
                    '100007': BadRequest,
                    '100008': BadSymbol,
                    '100009': AuthenticationError,
                    '100010': BadRequest,
                    '100011': BadRequest,
                    '100012': BadRequest,
                    '100013': BadRequest,
                    '100101': ExchangeError,
                    '150001': BadRequest,
                    '200001': AuthenticationError,
                    '200002': ExchangeError,
                    '200003': ExchangeError,
                    '200004': ExchangeError,
                    '200005': ExchangeError,
                    '200006': ExchangeError,
                    '200007': ExchangeError,
                    '200008': ExchangeError,
                    '200009': ExchangeError,
                    '200010': AuthenticationError,
                    '200011': ExchangeError,
                    '200012': ExchangeError,
                    '200013': ExchangeError,
                    '200014': PermissionDenied,
                    '200015': PermissionDenied,
                    '300001': InvalidOrder,
                    '300002': InvalidOrder,
                    '300003': InvalidOrder,
                    '300004': InvalidOrder,
                    '300005': InvalidOrder,
                    '300006': InvalidOrder,
                    '300007': InvalidOrder,
                    '300008': InvalidOrder,
                    '300009': InvalidOrder,
                    '300011': InsufficientFunds,
                    '300012': BadSymbol,
                    '300013': InvalidOrder,
                    '300014': InvalidOrder,
                    '300020': InvalidOrder,
                    '300021': InvalidOrder,
                    '300031': InvalidOrder,
                    '310001': InsufficientFunds,
                    '310002': InvalidOrder,
                    '310003': InvalidOrder,
                    '310004': BadSymbol,
                    '310005': InvalidOrder,
                    '510001': ExchangeError,
                    '900001': ExchangeError, // HUMAN_CHALLENGE Human change do not pass
                },
                'broad': {},
            },
            'commonCurrencies': {
                'BOND': 'BONDED',
                'BTCBEAR': 'BEAR',
                'BTCBULL': 'BULL',
                'BYN': 'BeyondFi',
                'PLN': 'Pollen',
            },
        });
    }
    getAccount(params = {}) {
        // get current or provided bitmax sub-account
        const account = this.safeValue(params, 'account', this.options['account']);
        const lowercaseAccount = account.toLowerCase();
        return this.capitalize(lowercaseAccount);
    }
    async fetchCurrencies(params = {}) {
        /**
         * @method
         * @name ascendex#fetchCurrencies
         * @description fetches all available currencies on an exchange
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} an associative dictionary of currencies
         */
        const assets = await this.v1PublicGetAssets(params);
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {
        //                 "assetCode" : "LTCBULL",
        //                 "assetName" : "3X Long LTC Token",
        //                 "precisionScale" : 9,
        //                 "nativeScale" : 4,
        //                 "withdrawalFee" : "0.2",
        //                 "minWithdrawalAmt" : "1.0",
        //                 "status" : "Normal"
        //             },
        //         ]
        //     }
        //
        const margin = await this.v1PublicGetMarginAssets(params);
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {
        //                 "assetCode":"BTT",
        //                 "borrowAssetCode":"BTT-B",
        //                 "interestAssetCode":"BTT-I",
        //                 "nativeScale":0,
        //                 "numConfirmations":1,
        //                 "withdrawFee":"100.0",
        //                 "minWithdrawalAmt":"1000.0",
        //                 "statusCode":"Normal",
        //                 "statusMessage":"",
        //                 "interestRate":"0.001"
        //             }
        //         ]
        //     }
        //
        const cash = await this.v1PublicGetCashAssets(params);
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {
        //                 "assetCode":"LTCBULL",
        //                 "nativeScale":4,
        //                 "numConfirmations":20,
        //                 "withdrawFee":"0.2",
        //                 "minWithdrawalAmt":"1.0",
        //                 "statusCode":"Normal",
        //                 "statusMessage":""
        //             }
        //         ]
        //     }
        //
        const assetsData = this.safeValue(assets, 'data', []);
        const marginData = this.safeValue(margin, 'data', []);
        const cashData = this.safeValue(cash, 'data', []);
        const assetsById = this.indexBy(assetsData, 'assetCode');
        const marginById = this.indexBy(marginData, 'assetCode');
        const cashById = this.indexBy(cashData, 'assetCode');
        const dataById = this.deepExtend(assetsById, marginById, cashById);
        const ids = Object.keys(dataById);
        const result = {};
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const currency = dataById[id];
            const code = this.safeCurrencyCode(id);
            const scale = this.safeString2(currency, 'precisionScale', 'nativeScale');
            const precision = this.parseNumber(this.parsePrecision(scale));
            const fee = this.safeNumber2(currency, 'withdrawFee', 'withdrawalFee');
            const status = this.safeString2(currency, 'status', 'statusCode');
            const active = (status === 'Normal');
            const margin = ('borrowAssetCode' in currency);
            result[code] = {
                'id': id,
                'code': code,
                'info': currency,
                'type': undefined,
                'margin': margin,
                'name': this.safeString(currency, 'assetName'),
                'active': active,
                'deposit': undefined,
                'withdraw': undefined,
                'fee': fee,
                'precision': precision,
                'limits': {
                    'amount': {
                        'min': precision,
                        'max': undefined,
                    },
                    'withdraw': {
                        'min': this.safeNumber(currency, 'minWithdrawalAmt'),
                        'max': undefined,
                    },
                },
            };
        }
        return result;
    }
    async fetchMarkets(params = {}) {
        /**
         * @method
         * @name ascendex#fetchMarkets
         * @description retrieves data on all markets for ascendex
         * @param {object} params extra parameters specific to the exchange api endpoint
         * @returns {[object]} an array of objects representing market data
         */
        const products = await this.v1PublicGetProducts(params);
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "symbol": "LBA/BTC",
        //                 "baseAsset": "LBA",
        //                 "quoteAsset": "BTC",
        //                 "status": "Normal",
        //                 "minNotional": "0.000625",
        //                 "maxNotional": "6.25",
        //                 "marginTradable": false,
        //                 "commissionType": "Quote",
        //                 "commissionReserveRate": "0.001",
        //                 "tickSize": "0.000000001",
        //                 "lotSize": "1"
        //             },
        //         ]
        //     }
        //
        const cash = await this.v1PublicGetCashProducts(params);
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "symbol": "QTUM/BTC",
        //                 "displayName": "QTUM/BTC",
        //                 "domain": "BTC",
        //                 "tradingStartTime": 1569506400000,
        //                 "collapseDecimals": "0.0001,0.000001,0.00000001",
        //                 "minQty": "0.000000001",
        //                 "maxQty": "1000000000",
        //                 "minNotional": "0.000625",
        //                 "maxNotional": "12.5",
        //                 "statusCode": "Normal",
        //                 "statusMessage": "",
        //                 "tickSize": "0.00000001",
        //                 "useTick": false,
        //                 "lotSize": "0.1",
        //                 "useLot": false,
        //                 "commissionType": "Quote",
        //                 "commissionReserveRate": "0.001",
        //                 "qtyScale": 1,
        //                 "priceScale": 8,
        //                 "notionalScale": 4
        //             }
        //         ]
        //     }
        //
        const perpetuals = await this.v2PublicGetFuturesContract(params);
        //
        //    {
        //        "code": 0,
        //        "data": [
        //            {
        //                "symbol": "BTC-PERP",
        //                "status": "Normal",
        //                "displayName": "BTCUSDT",
        //                "settlementAsset": "USDT",
        //                "underlying": "BTC/USDT",
        //                "tradingStartTime": 1579701600000,
        //                "priceFilter": {
        //                    "minPrice": "1",
        //                    "maxPrice": "1000000",
        //                    "tickSize": "1"
        //                },
        //                "lotSizeFilter": {
        //                    "minQty": "0.0001",
        //                    "maxQty": "1000000000",
        //                    "lotSize": "0.0001"
        //                },
        //                "commissionType": "Quote",
        //                "commissionReserveRate": "0.001",
        //                "marketOrderPriceMarkup": "0.03",
        //                "marginRequirements": [
        //                    {
        //                        "positionNotionalLowerBound": "0",
        //                        "positionNotionalUpperBound": "50000",
        //                        "initialMarginRate": "0.01",
        //                        "maintenanceMarginRate": "0.006"
        //                    },
        //                    ...
        //                ]
        //            }
        //        ]
        //    }
        //
        const productsData = this.safeValue(products, 'data', []);
        const productsById = this.indexBy(productsData, 'symbol');
        const cashData = this.safeValue(cash, 'data', []);
        const perpetualsData = this.safeValue(perpetuals, 'data', []);
        const cashAndPerpetualsData = this.arrayConcat(cashData, perpetualsData);
        const cashAndPerpetualsById = this.indexBy(cashAndPerpetualsData, 'symbol');
        const dataById = this.deepExtend(productsById, cashAndPerpetualsById);
        const ids = Object.keys(dataById);
        const result = [];
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const market = dataById[id];
            const settleId = this.safeValue(market, 'settlementAsset');
            const settle = this.safeCurrencyCode(settleId);
            const status = this.safeString(market, 'status');
            const domain = this.safeString(market, 'domain');
            let active = false;
            if (((status === 'Normal') || (status === 'InternalTrading')) && (domain !== 'LeveragedETF')) {
                active = true;
            }
            const spot = settle === undefined;
            const swap = !spot;
            const linear = swap ? true : undefined;
            let minQty = this.safeNumber(market, 'minQty');
            let maxQty = this.safeNumber(market, 'maxQty');
            let minPrice = this.safeNumber(market, 'tickSize');
            let maxPrice = undefined;
            const underlying = this.safeString2(market, 'underlying', 'symbol');
            const parts = underlying.split('/');
            const baseId = this.safeString(parts, 0);
            const quoteId = this.safeString(parts, 1);
            const base = this.safeCurrencyCode(baseId);
            const quote = this.safeCurrencyCode(quoteId);
            let symbol = base + '/' + quote;
            if (swap) {
                const lotSizeFilter = this.safeValue(market, 'lotSizeFilter');
                minQty = this.safeNumber(lotSizeFilter, 'minQty');
                maxQty = this.safeNumber(lotSizeFilter, 'maxQty');
                const priceFilter = this.safeValue(market, 'priceFilter');
                minPrice = this.safeNumber(priceFilter, 'minPrice');
                maxPrice = this.safeNumber(priceFilter, 'maxPrice');
                symbol = base + '/' + quote + ':' + settle;
            }
            const fee = this.safeNumber(market, 'commissionReserveRate');
            const marginTradable = this.safeValue(market, 'marginTradable', false);
            result.push({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': settle,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': settleId,
                'type': swap ? 'swap' : 'spot',
                'spot': spot,
                'margin': spot ? marginTradable : undefined,
                'swap': swap,
                'future': false,
                'option': false,
                'active': active,
                'contract': swap,
                'linear': linear,
                'inverse': swap ? !linear : undefined,
                'taker': fee,
                'maker': fee,
                'contractSize': swap ? this.parseNumber('1') : undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.safeNumber(market, 'lotSize'),
                    'price': this.safeNumber(market, 'tickSize'),
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': minQty,
                        'max': maxQty,
                    },
                    'price': {
                        'min': minPrice,
                        'max': maxPrice,
                    },
                    'cost': {
                        'min': this.safeNumber(market, 'minNotional'),
                        'max': this.safeNumber(market, 'maxNotional'),
                    },
                },
                'info': market,
            });
        }
        return result;
    }
    async fetchTime(params = {}) {
        /**
         * @method
         * @name ascendex#fetchTime
         * @description fetches the current integer timestamp in milliseconds from the ascendex server
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {int} the current integer timestamp in milliseconds from the ascendex server
         */
        const request = {
            'requestTime': this.milliseconds(),
        };
        const response = await this.v1PublicGetExchangeInfo(this.extend(request, params));
        //
        //    {
        //        "code": 0,
        //        "data": {
        //            "requestTimeEcho": 1656560463601,
        //            "requestReceiveAt": 1656560464331,
        //            "latency": 730
        //        }
        //    }
        //
        const data = this.safeValue(response, 'data');
        return this.safeInteger(data, 'requestReceiveAt');
    }
    async fetchAccounts(params = {}) {
        /**
         * @method
         * @name ascendex#fetchAccounts
         * @description fetch all the accounts associated with a profile
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} a dictionary of [account structures]{@link https://docs.ccxt.com/#/?id=account-structure} indexed by the account type
         */
        let accountGroup = this.safeString(this.options, 'account-group');
        let response = undefined;
        if (accountGroup === undefined) {
            response = await this.v1PrivateGetInfo(params);
            //
            //     {
            //         "code":0,
            //         "data":{
            //             "email":"igor.kroitor@gmail.com",
            //             "accountGroup":8,
            //             "viewPermission":true,
            //             "tradePermission":true,
            //             "transferPermission":true,
            //             "cashAccount":["cshrHKLZCjlZ2ejqkmvIHHtPmLYqdnda"],
            //             "marginAccount":["martXoh1v1N3EMQC5FDtSj5VHso8aI2Z"],
            //             "futuresAccount":["futc9r7UmFJAyBY2rE3beA2JFxav2XFF"],
            //             "userUID":"U6491137460"
            //         }
            //     }
            //
            const data = this.safeValue(response, 'data', {});
            accountGroup = this.safeString(data, 'accountGroup');
            this.options['account-group'] = accountGroup;
        }
        return [
            {
                'id': accountGroup,
                'type': undefined,
                'currency': undefined,
                'info': response,
            },
        ];
    }
    parseBalance(response) {
        const timestamp = this.milliseconds();
        const result = {
            'info': response,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
        };
        const balances = this.safeValue(response, 'data', []);
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            const code = this.safeCurrencyCode(this.safeString(balance, 'asset'));
            const account = this.account();
            account['free'] = this.safeString(balance, 'availableBalance');
            account['total'] = this.safeString(balance, 'totalBalance');
            result[code] = account;
        }
        return this.safeBalance(result);
    }
    parseMarginBalance(response) {
        const timestamp = this.milliseconds();
        const result = {
            'info': response,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
        };
        const balances = this.safeValue(response, 'data', []);
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            const code = this.safeCurrencyCode(this.safeString(balance, 'asset'));
            const account = this.account();
            account['free'] = this.safeString(balance, 'availableBalance');
            account['total'] = this.safeString(balance, 'totalBalance');
            const debt = this.safeString(balance, 'borrowed');
            const interest = this.safeString(balance, 'interest');
            account['debt'] = Precise.stringAdd(debt, interest);
            result[code] = account;
        }
        return this.safeBalance(result);
    }
    parseSwapBalance(response) {
        const timestamp = this.milliseconds();
        const result = {
            'info': response,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
        };
        const data = this.safeValue(response, 'data', {});
        const collaterals = this.safeValue(data, 'collaterals', []);
        for (let i = 0; i < collaterals.length; i++) {
            const balance = collaterals[i];
            const code = this.safeCurrencyCode(this.safeString(balance, 'asset'));
            const account = this.account();
            account['total'] = this.safeString(balance, 'balance');
            result[code] = account;
        }
        return this.safeBalance(result);
    }
    async fetchBalance(params = {}) {
        /**
         * @method
         * @name ascendex#fetchBalance
         * @description query for balance and get the amount of funds available for trading or funds locked in orders
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} a [balance structure]{@link https://docs.ccxt.com/en/latest/manual.html?#balance-structure}
         */
        await this.loadMarkets();
        await this.loadAccounts();
        let query = undefined;
        let marketType = undefined;
        [marketType, query] = this.handleMarketTypeAndParams('fetchBalance', undefined, params);
        const isMargin = this.safeValue(params, 'margin', false);
        marketType = isMargin ? 'margin' : marketType;
        params = this.omit(params, 'margin');
        const options = this.safeValue(this.options, 'fetchBalance', {});
        const accountsByType = this.safeValue(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, marketType, 'cash');
        const account = this.safeValue(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
        };
        const defaultMethod = this.safeString(options, 'method', 'v1PrivateAccountCategoryGetBalance');
        const method = this.getSupportedMapping(marketType, {
            'spot': defaultMethod,
            'margin': defaultMethod,
            'swap': 'v2PrivateAccountGroupGetFuturesPosition',
        });
        if ((accountCategory === 'cash') || (accountCategory === 'margin')) {
            request['account-category'] = accountCategory;
        }
        const response = await this[method](this.extend(request, query));
        //
        // cash
        //
        //     {
        //         'code': 0,
        //         'data': [
        //             {
        //                 'asset': 'BCHSV',
        //                 'totalBalance': '64.298000048',
        //                 'availableBalance': '64.298000048',
        //             },
        //         ]
        //     }
        //
        // margin
        //
        //     {
        //         'code': 0,
        //         'data': [
        //             {
        //                 'asset': 'BCHSV',
        //                 'totalBalance': '64.298000048',
        //                 'availableBalance': '64.298000048',
        //                 'borrowed': '0',
        //                 'interest': '0',
        //             },
        //         ]
        //     }
        //
        // swap
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "ac": "FUTURES",
        //             "collaterals": [
        //                 {"asset":"ADA","balance":"0.355803","referencePrice":"1.05095","discountFactor":"0.9"},
        //                 {"asset":"USDT","balance":"0.000014519","referencePrice":"1","discountFactor":"1"}
        //             ],
        //         }j
        //     }
        //
        if (marketType === 'swap') {
            return this.parseSwapBalance(response);
        }
        else if (marketType === 'margin') {
            return this.parseMarginBalance(response);
        }
        else {
            return this.parseBalance(response);
        }
    }
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#fetchOrderBook
         * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int|undefined} limit the maximum amount of order book entries to return
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.v1PublicGetDepth(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":{
        //             "m":"depth-snapshot",
        //             "symbol":"BTC-PERP",
        //             "data":{
        //                 "ts":1590223998202,
        //                 "seqnum":115444921,
        //                 "asks":[
        //                     ["9207.5","18.2383"],
        //                     ["9207.75","18.8235"],
        //                     ["9208","10.7873"],
        //                 ],
        //                 "bids":[
        //                     ["9207.25","0.4009"],
        //                     ["9207","0.003"],
        //                     ["9206.5","0.003"],
        //                 ]
        //             }
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const orderbook = this.safeValue(data, 'data', {});
        const timestamp = this.safeInteger(orderbook, 'ts');
        const result = this.parseOrderBook(orderbook, symbol, timestamp);
        result['nonce'] = this.safeInteger(orderbook, 'seqnum');
        return result;
    }
    parseTicker(ticker, market = undefined) {
        //
        //     {
        //         "symbol":"QTUM/BTC",
        //         "open":"0.00016537",
        //         "close":"0.00019077",
        //         "high":"0.000192",
        //         "low":"0.00016537",
        //         "volume":"846.6",
        //         "ask":["0.00018698","26.2"],
        //         "bid":["0.00018408","503.7"],
        //         "type":"spot"
        //     }
        //
        const timestamp = undefined;
        const marketId = this.safeString(ticker, 'symbol');
        const type = this.safeString(ticker, 'type');
        const delimiter = (type === 'spot') ? '/' : undefined;
        const symbol = this.safeSymbol(marketId, market, delimiter);
        const close = this.safeString(ticker, 'close');
        const bid = this.safeValue(ticker, 'bid', []);
        const ask = this.safeValue(ticker, 'ask', []);
        const open = this.safeString(ticker, 'open');
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': undefined,
            'high': this.safeString(ticker, 'high'),
            'low': this.safeString(ticker, 'low'),
            'bid': this.safeString(bid, 0),
            'bidVolume': this.safeString(bid, 1),
            'ask': this.safeString(ask, 0),
            'askVolume': this.safeString(ask, 1),
            'vwap': undefined,
            'open': open,
            'close': close,
            'last': close,
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeString(ticker, 'volume'),
            'quoteVolume': undefined,
            'info': ticker,
        }, market);
    }
    async fetchTicker(symbol, params = {}) {
        /**
         * @method
         * @name ascendex#fetchTicker
         * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.v1PublicGetTicker(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":{
        //             "symbol":"BTC-PERP", // or "BTC/USDT"
        //             "open":"9073",
        //             "close":"9185.75",
        //             "high":"9185.75",
        //             "low":"9185.75",
        //             "volume":"576.8334",
        //             "ask":["9185.75","15.5863"],
        //             "bid":["9185.5","0.003"],
        //             "type":"derivatives", // or "spot"
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        return this.parseTicker(data, market);
    }
    async fetchTickers(symbols = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#fetchTickers
         * @description fetches price tickers for multiple markets, statistical calculations with the information calculated over the past 24 hours each market
         * @see https://ascendex.github.io/ascendex-pro-api/#ticker
         * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#ticker
         * @param {[string]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets();
        const request = {};
        let market = undefined;
        if (symbols !== undefined) {
            const symbol = this.safeValue(symbols, 0);
            market = this.market(symbol);
            const marketIds = this.marketIds(symbols);
            request['symbol'] = marketIds.join(',');
        }
        let type = undefined;
        [type, params] = this.handleMarketTypeAndParams('fetchTickers', market, params);
        let response = undefined;
        if (type === 'spot') {
            response = await this.v1PublicGetTicker(this.extend(request, params));
        }
        else {
            response = await this.v2PublicGetFuturesTicker(this.extend(request, params));
        }
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {
        //                 "symbol":"QTUM/BTC",
        //                 "open":"0.00016537",
        //                 "close":"0.00019077",
        //                 "high":"0.000192",
        //                 "low":"0.00016537",
        //                 "volume":"846.6",
        //                 "ask":["0.00018698","26.2"],
        //                 "bid":["0.00018408","503.7"],
        //                 "type":"spot"
        //             }
        //         ]
        //     }
        //
        const data = this.safeValue(response, 'data', []);
        if (!Array.isArray(data)) {
            return this.parseTickers([data], symbols);
        }
        return this.parseTickers(data, symbols);
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        //     {
        //         "m":"bar",
        //         "s":"BTC/USDT",
        //         "data":{
        //             "i":"1",
        //             "ts":1590228000000,
        //             "o":"9139.59",
        //             "c":"9131.94",
        //             "h":"9139.99",
        //             "l":"9121.71",
        //             "v":"25.20648"
        //         }
        //     }
        //
        const data = this.safeValue(ohlcv, 'data', {});
        return [
            this.safeInteger(data, 'ts'),
            this.safeNumber(data, 'o'),
            this.safeNumber(data, 'h'),
            this.safeNumber(data, 'l'),
            this.safeNumber(data, 'c'),
            this.safeNumber(data, 'v'),
        ];
    }
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#fetchOHLCV
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int|undefined} since timestamp in ms of the earliest candle to fetch
         * @param {int|undefined} limit the maximum amount of candles to fetch
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {[[int]]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
            'interval': this.safeString(this.timeframes, timeframe, timeframe),
        };
        // if since and limit are not specified
        // the exchange will return just 1 last candle by default
        const duration = this.parseTimeframe(timeframe);
        const options = this.safeValue(this.options, 'fetchOHLCV', {});
        const defaultLimit = this.safeInteger(options, 'limit', 500);
        if (since !== undefined) {
            request['from'] = since;
            if (limit === undefined) {
                limit = defaultLimit;
            }
            else {
                limit = Math.min(limit, defaultLimit);
            }
            request['to'] = this.sum(since, limit * duration * 1000, 1);
        }
        else if (limit !== undefined) {
            request['n'] = limit; // max 500
        }
        const response = await this.v1PublicGetBarhist(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {
        //                 "m":"bar",
        //                 "s":"BTC/USDT",
        //                 "data":{
        //                     "i":"1",
        //                     "ts":1590228000000,
        //                     "o":"9139.59",
        //                     "c":"9131.94",
        //                     "h":"9139.99",
        //                     "l":"9121.71",
        //                     "v":"25.20648"
        //                 }
        //             }
        //         ]
        //     }
        //
        const data = this.safeValue(response, 'data', []);
        return this.parseOHLCVs(data, market, timeframe, since, limit);
    }
    parseTrade(trade, market = undefined) {
        //
        // public fetchTrades
        //
        //     {
        //         "p":"9128.5", // price
        //         "q":"0.0030", // quantity
        //         "ts":1590229002385, // timestamp
        //         "bm":false, // if true, the buyer is the market maker, we only use this field to "define the side" of a public trade
        //         "seqnum":180143985289898554
        //     }
        //
        const timestamp = this.safeInteger(trade, 'ts');
        const priceString = this.safeString2(trade, 'price', 'p');
        const amountString = this.safeString(trade, 'q');
        const buyerIsMaker = this.safeValue(trade, 'bm', false);
        const side = buyerIsMaker ? 'sell' : 'buy';
        market = this.safeMarket(undefined, market);
        return this.safeTrade({
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'id': undefined,
            'order': undefined,
            'type': undefined,
            'takerOrMaker': undefined,
            'side': side,
            'price': priceString,
            'amount': amountString,
            'cost': undefined,
            'fee': undefined,
        }, market);
    }
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#fetchTrades
         * @description get the list of most recent trades for a particular symbol
         * @see https://ascendex.github.io/ascendex-pro-api/#market-trades
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int|undefined} since timestamp in ms of the earliest trade to fetch
         * @param {int|undefined} limit the maximum amount of trades to fetch
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {[object]} a list of [trade structures]{@link https://docs.ccxt.com/en/latest/manual.html?#public-trades}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        if (limit !== undefined) {
            request['n'] = limit; // max 100
        }
        const response = await this.v1PublicGetTrades(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":{
        //             "m":"trades",
        //             "symbol":"BTC-PERP",
        //             "data":[
        //                 {"p":"9128.5","q":"0.0030","ts":1590229002385,"bm":false,"seqnum":180143985289898554},
        //                 {"p":"9129","q":"0.0030","ts":1590229002642,"bm":false,"seqnum":180143985289898587},
        //                 {"p":"9129.5","q":"0.0030","ts":1590229021306,"bm":false,"seqnum":180143985289899043}
        //             ]
        //         }
        //     }
        //
        const records = this.safeValue(response, 'data', []);
        const trades = this.safeValue(records, 'data', []);
        return this.parseTrades(trades, market, since, limit);
    }
    parseOrderStatus(status) {
        const statuses = {
            'PendingNew': 'open',
            'New': 'open',
            'PartiallyFilled': 'open',
            'Filled': 'closed',
            'Canceled': 'canceled',
            'Rejected': 'rejected',
        };
        return this.safeString(statuses, status, status);
    }
    parseOrder(order, market = undefined) {
        //
        // createOrder
        //
        //     {
        //         "id": "16e607e2b83a8bXHbAwwoqDo55c166fa",
        //         "orderId": "16e85b4d9b9a8bXHbAwwoqDoc3d66830",
        //         "orderType": "Market",
        //         "symbol": "BTC/USDT",
        //         "timestamp": 1573576916201
        //     }
        //
        //     {
        //         "ac": "FUTURES",
        //         "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //         "time": 1640819389454,
        //         "orderId": "a17e0874ecbdU0711043490bbtcpDU5X",
        //         "seqNum": -1,
        //         "orderType": "Limit",
        //         "execInst": "NULL_VAL",
        //         "side": "Buy",
        //         "symbol": "BTC-PERP",
        //         "price": "30000",
        //         "orderQty": "0.002",
        //         "stopPrice": "0",
        //         "stopBy": "ref-px",
        //         "status": "Ack",
        //         "lastExecTime": 1640819389454,
        //         "lastQty": "0",
        //         "lastPx": "0",
        //         "avgFilledPx": "0",
        //         "cumFilledQty": "0",
        //         "fee": "0",
        //         "cumFee": "0",
        //         "feeAsset": "",
        //         "errorCode": "",
        //         "posStopLossPrice": "0",
        //         "posStopLossTrigger": "market",
        //         "posTakeProfitPrice": "0",
        //         "posTakeProfitTrigger": "market",
        //         "liquidityInd": "n"
        //      }
        //
        // fetchOrder, fetchOpenOrders, fetchClosedOrders
        //
        //     {
        //         "symbol":       "BTC/USDT",
        //         "price":        "8131.22",
        //         "orderQty":     "0.00082",
        //         "orderType":    "Market",
        //         "avgPx":        "7392.02",
        //         "cumFee":       "0.005152238",
        //         "cumFilledQty": "0.00082",
        //         "errorCode":    "",
        //         "feeAsset":     "USDT",
        //         "lastExecTime": 1575953151764,
        //         "orderId":      "a16eee20b6750866943712zWEDdAjt3",
        //         "seqNum":       2623469,
        //         "side":         "Buy",
        //         "status":       "Filled",
        //         "stopPrice":    "",
        //         "execInst":     "NULL_VAL" // "Post" (for postOnly orders), "reduceOnly" (for reduceOnly orders)
        //     }
        //
        //     {
        //         "ac": "FUTURES",
        //         "accountId": "testabcdefg",
        //         "avgPx": "0",
        //         "cumFee": "0",
        //         "cumQty": "0",
        //         "errorCode": "NULL_VAL",
        //         "execInst": "NULL_VAL",
        //         "feeAsset": "USDT",
        //         "lastExecTime": 1584072844085,
        //         "orderId": "r170d21956dd5450276356bbtcpKa74",
        //         "orderQty": "1.1499",
        //         "orderType": "Limit",
        //         "price": "4000",
        //         "sendingTime": 1584072841033,
        //         "seqNum": 24105338,
        //         "side": "Buy",
        //         "status": "Canceled",
        //         "stopPrice": "",
        //         "symbol": "BTC-PERP"
        //     },
        //
        const status = this.parseOrderStatus(this.safeString(order, 'status'));
        const marketId = this.safeString(order, 'symbol');
        const symbol = this.safeSymbol(marketId, market, '/');
        let timestamp = this.safeInteger2(order, 'timestamp', 'sendingTime');
        const lastTradeTimestamp = this.safeInteger(order, 'lastExecTime');
        if (timestamp === undefined) {
            timestamp = lastTradeTimestamp;
        }
        const price = this.safeString(order, 'price');
        const amount = this.safeString(order, 'orderQty');
        const average = this.safeString(order, 'avgPx');
        const filled = this.safeString2(order, 'cumFilledQty', 'cumQty');
        const id = this.safeString(order, 'orderId');
        let clientOrderId = this.safeString(order, 'id');
        if (clientOrderId !== undefined) {
            if (clientOrderId.length < 1) {
                clientOrderId = undefined;
            }
        }
        const rawTypeLower = this.safeStringLower(order, 'orderType');
        let type = rawTypeLower;
        if (rawTypeLower !== undefined) {
            if (rawTypeLower === 'stoplimit') {
                type = 'limit';
            }
            if (rawTypeLower === 'stopmarket') {
                type = 'market';
            }
        }
        const side = this.safeStringLower(order, 'side');
        const feeCost = this.safeNumber(order, 'cumFee');
        let fee = undefined;
        if (feeCost !== undefined) {
            const feeCurrencyId = this.safeString(order, 'feeAsset');
            const feeCurrencyCode = this.safeCurrencyCode(feeCurrencyId);
            fee = {
                'cost': feeCost,
                'currency': feeCurrencyCode,
            };
        }
        const stopPrice = this.safeNumber(order, 'stopPrice');
        let reduceOnly = undefined;
        const execInst = this.safeString(order, 'execInst');
        if (execInst === 'reduceOnly') {
            reduceOnly = true;
        }
        let postOnly = undefined;
        if (execInst === 'Post') {
            postOnly = true;
        }
        return this.safeOrder({
            'info': order,
            'id': id,
            'clientOrderId': clientOrderId,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastTradeTimestamp': lastTradeTimestamp,
            'symbol': symbol,
            'type': type,
            'timeInForce': undefined,
            'postOnly': postOnly,
            'reduceOnly': reduceOnly,
            'side': side,
            'price': price,
            'stopPrice': stopPrice,
            'triggerPrice': stopPrice,
            'amount': amount,
            'cost': undefined,
            'average': average,
            'filled': filled,
            'remaining': undefined,
            'status': status,
            'fee': fee,
            'trades': undefined,
        }, market);
    }
    async fetchTradingFees(params = {}) {
        /**
         * @method
         * @name ascendex#fetchTradingFees
         * @description fetch the trading fees for multiple markets
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} a dictionary of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure} indexed by market symbols
         */
        await this.loadMarkets();
        await this.loadAccounts();
        const account = this.safeValue(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
        };
        const response = await this.v1PrivateAccountGroupGetSpotFee(this.extend(request, params));
        //
        //      {
        //         code: '0',
        //         data: {
        //           domain: 'spot',
        //           userUID: 'U1479576458',
        //           vipLevel: '0',
        //           fees: [
        //             { symbol: 'HT/USDT', fee: { taker: '0.001', maker: '0.001' } },
        //             { symbol: 'LAMB/BTC', fee: { taker: '0.002', maker: '0.002' } },
        //             { symbol: 'STOS/USDT', fee: { taker: '0.002', maker: '0.002' } },
        //             ...
        //           ]
        //         }
        //      }
        //
        const data = this.safeValue(response, 'data', {});
        const fees = this.safeValue(data, 'fees', []);
        const result = {};
        for (let i = 0; i < fees.length; i++) {
            const fee = fees[i];
            const marketId = this.safeString(fee, 'symbol');
            const symbol = this.safeSymbol(marketId, undefined, '/');
            const takerMaker = this.safeValue(fee, 'fee', {});
            result[symbol] = {
                'info': fee,
                'symbol': symbol,
                'maker': this.safeNumber(takerMaker, 'maker'),
                'taker': this.safeNumber(takerMaker, 'taker'),
            };
        }
        return result;
    }
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#createOrder
         * @description Create an order on the exchange
         * @param {string} symbol Unified CCXT market symbol
         * @param {string} type "limit" or "market"
         * @param {string} side "buy" or "sell"
         * @param {float} amount the amount of currency to trade
         * @param {float} price *ignored in "market" orders* the price at which the order is to be fullfilled at in units of the quote currency
         * @param {object} params Extra parameters specific to the exchange API endpoint
         * @param {string} params.timeInForce "GTC", "IOC", "FOK", or "PO"
         * @param {bool} params.postOnly true or false
         * @param {float} params.stopPrice The price at which a trigger order is triggered at
         * @returns [An order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        await this.loadAccounts();
        const market = this.market(symbol);
        let marketType = undefined;
        [marketType, params] = this.handleMarketTypeAndParams('createOrder', market, params);
        const options = this.safeValue(this.options, 'createOrder', {});
        const accountsByType = this.safeValue(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, marketType, 'cash');
        const account = this.safeValue(this.accounts, 0, {});
        const accountGroup = this.safeValue(account, 'id');
        const clientOrderId = this.safeString2(params, 'clientOrderId', 'id');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
            'symbol': market['id'],
            'time': this.milliseconds(),
            'orderQty': this.amountToPrecision(symbol, amount),
            'orderType': type,
            'side': side, // buy or sell,
            // 'execInst': // Post for postOnly, ReduceOnly for reduceOnly
            // 'respInst': 'ACK', // ACK, 'ACCEPT, DONE
        };
        const isMarketOrder = ((type === 'market') || (type === 'stop_market'));
        const isLimitOrder = ((type === 'limit') || (type === 'stop_limit'));
        const timeInForce = this.safeString(params, 'timeInForce');
        const postOnly = this.isPostOnly(isMarketOrder, false, params);
        const reduceOnly = this.safeValue(params, 'reduceOnly', false);
        const stopPrice = this.safeValue2(params, 'triggerPrice', 'stopPrice');
        params = this.omit(params, ['timeInForce', 'postOnly', 'reduceOnly', 'stopPrice', 'triggerPrice']);
        if (reduceOnly) {
            if (marketType !== 'swap') {
                throw new InvalidOrder(this.id + ' createOrder() does not support reduceOnly for ' + marketType + ' orders, reduceOnly orders are supported for perpetuals only');
            }
            request['execInst'] = 'ReduceOnly';
        }
        if (isLimitOrder) {
            request['orderPrice'] = this.priceToPrecision(symbol, price);
        }
        if (timeInForce === 'IOC') {
            request['timeInForce'] = 'IOC';
        }
        if (timeInForce === 'FOK') {
            request['timeInForce'] = 'FOK';
        }
        if (postOnly) {
            request['postOnly'] = true;
        }
        if (stopPrice !== undefined) {
            request['stopPrice'] = this.priceToPrecision(symbol, stopPrice);
            if (isLimitOrder) {
                request['orderType'] = 'stop_limit';
            }
            else if (isMarketOrder) {
                request['orderType'] = 'stop_market';
            }
        }
        if (clientOrderId !== undefined) {
            request['id'] = clientOrderId;
        }
        const defaultMethod = this.safeString(options, 'method', 'v1PrivateAccountCategoryPostOrder');
        const method = this.getSupportedMapping(marketType, {
            'spot': defaultMethod,
            'margin': defaultMethod,
            'swap': 'v2PrivateAccountGroupPostFuturesOrder',
        });
        if (method === 'v1PrivateAccountCategoryPostOrder') {
            if (accountCategory !== undefined) {
                request['category'] = accountCategory;
            }
        }
        else {
            request['account-category'] = accountCategory;
        }
        const response = await this[method](this.extend(request, params));
        //
        // spot
        //
        //      {
        //          "code":0,
        //          "data": {
        //              "accountId":"cshwT8RKojkT1HoaA5UdeimR2SrmHG2I",
        //              "ac":"CASH",
        //              "action":"place-order",
        //              "status":"Ack",
        //              "info": {
        //                  "symbol":"TRX/USDT",
        //                  "orderType":"StopLimit",
        //                  "timestamp":1654290662172,
        //                  "id":"",
        //                  "orderId":"a1812b6840ddU8191168955av0k6Eyhj"
        //              }
        //          }
        //      }
        //
        //
        // swap
        //
        //      {
        //          "code":0,
        //          "data": {
        //              "meta": {
        //                  "id":"",
        //                  "action":"place-order",
        //                  "respInst":"ACK"
        //              },
        //              "order": {
        //                  "ac":"FUTURES",
        //                  "accountId":"futwT8RKojkT1HoaA5UdeimR2SrmHG2I",
        //                  "time":1654290969965,
        //                  "orderId":"a1812b6cf322U8191168955oJamfTh7b",
        //                  "seqNum":-1,
        //                  "orderType":"StopLimit",
        //                  "execInst":"NULL_VAL",
        //                  "side":"Buy",
        //                  "symbol":"TRX-PERP",
        //                  "price":"0.083",
        //                  "orderQty":"1",
        //                  "stopPrice":"0.082",
        //                  "stopBy":"ref-px",
        //                  "status":"Ack",
        //                  "lastExecTime":1654290969965,
        //                  "lastQty":"0",
        //                  "lastPx":"0",
        //                  "avgFilledPx":"0",
        //                  "cumFilledQty":"0",
        //                  "fee":"0",
        //                  "cumFee":"0",
        //                  "feeAsset":"",
        //                  "errorCode":"",
        //                  "posStopLossPrice":"0",
        //                  "posStopLossTrigger":"market",
        //                  "posTakeProfitPrice":"0",
        //                  "posTakeProfitTrigger":"market",
        //                  "liquidityInd":"n"
        //              }
        //          }
        //      }
        //
        const data = this.safeValue(response, 'data', {});
        const order = this.safeValue2(data, 'order', 'info', {});
        return this.parseOrder(order, market);
    }
    async fetchOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#fetchOrder
         * @description fetches information on an order made by the user
         * @param {string|undefined} symbol unified symbol of the market the order was made in
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        await this.loadAccounts();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        const [type, query] = this.handleMarketTypeAndParams('fetchOrder', market, params);
        const options = this.safeValue(this.options, 'fetchOrder', {});
        const accountsByType = this.safeValue(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash');
        const account = this.safeValue(this.accounts, 0, {});
        const accountGroup = this.safeValue(account, 'id');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
            'orderId': id,
        };
        const defaultMethod = this.safeString(options, 'method', 'v1PrivateAccountCategoryGetOrderStatus');
        const method = this.getSupportedMapping(type, {
            'spot': defaultMethod,
            'margin': defaultMethod,
            'swap': 'v2PrivateAccountGroupGetFuturesOrderStatus',
        });
        if (method === 'v1PrivateAccountCategoryGetOrderStatus') {
            if (accountCategory !== undefined) {
                request['category'] = accountCategory;
            }
        }
        else {
            request['account-category'] = accountCategory;
        }
        const response = await this[method](this.extend(request, query));
        //
        // AccountCategoryGetOrderStatus
        //
        //     {
        //         "code": 0,
        //         "accountCategory": "CASH",
        //         "accountId": "cshQtyfq8XLAA9kcf19h8bXHbAwwoqDo",
        //         "data": [
        //             {
        //                 "symbol":       "BTC/USDT",
        //                 "price":        "8131.22",
        //                 "orderQty":     "0.00082",
        //                 "orderType":    "Market",
        //                 "avgPx":        "7392.02",
        //                 "cumFee":       "0.005152238",
        //                 "cumFilledQty": "0.00082",
        //                 "errorCode":    "",
        //                 "feeAsset":     "USDT",
        //                 "lastExecTime": 1575953151764,
        //                 "orderId":      "a16eee20b6750866943712zWEDdAjt3",
        //                 "seqNum":       2623469,
        //                 "side":         "Buy",
        //                 "status":       "Filled",
        //                 "stopPrice":    "",
        //                 "execInst":     "NULL_VAL"
        //             }
        //         ]
        //     }
        //
        // AccountGroupGetFuturesOrderStatus
        //
        //     {
        //         "code": 0,
        //         "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //         "ac": "FUTURES",
        //         "data": {
        //             "ac": "FUTURES",
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "time": 1640247020217,
        //             "orderId": "r17de65747aeU0711043490bbtcp0cmt",
        //             "seqNum": 28796162908,
        //             "orderType": "Limit",
        //             "execInst": "NULL_VAL",
        //             "side": "Buy",
        //             "symbol": "BTC-PERP",
        //             "price": "30000",
        //             "orderQty": "0.0021",
        //             "stopPrice": "0",
        //             "stopBy": "market",
        //             "status": "New",
        //             "lastExecTime": 1640247020232,
        //             "lastQty": "0",
        //             "lastPx": "0",
        //             "avgFilledPx": "0",
        //             "cumFilledQty": "0",
        //             "fee": "0",
        //             "cumFee": "0",
        //             "feeAsset": "USDT",
        //             "errorCode": "",
        //             "posStopLossPrice": "0",
        //             "posStopLossTrigger": "market",
        //             "posTakeProfitPrice": "0",
        //             "posTakeProfitTrigger": "market",
        //             "liquidityInd": "n"
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        return this.parseOrder(data, market);
    }
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#fetchOpenOrders
         * @description fetch all unfilled currently open orders
         * @param {string|undefined} symbol unified market symbol
         * @param {int|undefined} since the earliest time in ms to fetch open orders for
         * @param {int|undefined} limit the maximum number of  open orders structures to retrieve
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {[object]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        await this.loadAccounts();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            symbol = market['symbol'];
        }
        const account = this.safeValue(this.accounts, 0, {});
        const accountGroup = this.safeValue(account, 'id');
        const [type, query] = this.handleMarketTypeAndParams('fetchOpenOrders', market, params);
        const accountsByType = this.safeValue(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
        };
        const options = this.safeValue(this.options, 'fetchOpenOrders', {});
        const defaultMethod = this.safeString(options, 'method', 'v1PrivateAccountCategoryGetOrderOpen');
        const method = this.getSupportedMapping(type, {
            'spot': defaultMethod,
            'margin': defaultMethod,
            'swap': 'v2PrivateAccountGroupGetFuturesOrderOpen',
        });
        if (method === 'v1PrivateAccountCategoryGetOrderOpen') {
            if (accountCategory !== undefined) {
                request['category'] = accountCategory;
            }
        }
        else {
            request['account-category'] = accountCategory;
        }
        const response = await this[method](this.extend(request, query));
        //
        // AccountCategoryGetOrderOpen
        //
        //     {
        //         "ac": "CASH",
        //         "accountId": "cshQtyfq8XLAA9kcf19h8bXHbAwwoqDo",
        //         "code": 0,
        //         "data": [
        //             {
        //                 "avgPx": "0",         // Average filled price of the order
        //                 "cumFee": "0",       // cumulative fee paid for this order
        //                 "cumFilledQty": "0", // cumulative filled quantity
        //                 "errorCode": "",     // error code; could be empty
        //                 "feeAsset": "USDT",  // fee asset
        //                 "lastExecTime": 1576019723550, //  The last execution time of the order
        //                 "orderId": "s16ef21882ea0866943712034f36d83", // server provided orderId
        //                 "orderQty": "0.0083",  // order quantity
        //                 "orderType": "Limit",  // order type
        //                 "price": "7105",       // order price
        //                 "seqNum": 8193258,     // sequence number
        //                 "side": "Buy",         // order side
        //                 "status": "New",       // order status on matching engine
        //                 "stopPrice": "",       // only available for stop market and stop limit orders; otherwise empty
        //                 "symbol": "BTC/USDT",
        //                 "execInst": "NULL_VAL" // execution instruction
        //             },
        //         ]
        //     }
        //
        // AccountGroupGetFuturesOrderOpen
        //
        // {
        //     "code": 0,
        //     "data": [
        //         {
        //             "ac": "FUTURES",
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "time": 1640247020217,
        //             "orderId": "r17de65747aeU0711043490bbtcp0cmt",
        //             "seqNum": 28796162908,
        //             "orderType": "Limit",
        //             "execInst": "NULL_VAL",
        //             "side": "Buy",
        //             "symbol": "BTC-PERP",
        //             "price": "30000",
        //             "orderQty": "0.0021",
        //             "stopPrice": "0",
        //             "stopBy": "market",
        //             "status": "New",
        //             "lastExecTime": 1640247020232,
        //             "lastQty": "0",
        //             "lastPx": "0",
        //             "avgFilledPx": "0",
        //             "cumFilledQty": "0",
        //             "fee": "0",
        //             "cumFee": "0",
        //             "feeAsset": "USDT",
        //             "errorCode": "",
        //             "posStopLossPrice": "0",
        //             "posStopLossTrigger": "market",
        //             "posTakeProfitPrice": "0",
        //             "posTakeProfitTrigger": "market",
        //             "liquidityInd": "n"
        //         }
        //     ]
        // }
        //
        const data = this.safeValue(response, 'data', []);
        if (accountCategory === 'futures') {
            return this.parseOrders(data, market, since, limit);
        }
        // a workaround for https://github.com/ccxt/ccxt/issues/7187
        const orders = [];
        for (let i = 0; i < data.length; i++) {
            const order = this.parseOrder(data[i], market);
            orders.push(order);
        }
        return this.filterBySymbolSinceLimit(orders, symbol, since, limit);
    }
    async fetchClosedOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#fetchClosedOrders
         * @description fetches information on multiple closed orders made by the user
         * @param {string|undefined} symbol unified market symbol of the market orders were made in
         * @param {int|undefined} since the earliest time in ms to fetch orders for
         * @param {int|undefined} limit the maximum number of  orde structures to retrieve
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {[object]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        await this.loadAccounts();
        const account = this.safeValue(this.accounts, 0, {});
        const accountGroup = this.safeValue(account, 'id');
        const request = {
            'account-group': accountGroup,
            // 'category': accountCategory,
            // 'symbol': market['id'],
            // 'orderType': 'market', // optional, string
            // 'side': 'buy', // or 'sell', optional, case insensitive.
            // 'status': 'Filled', // "Filled", "Canceled", or "Rejected"
            // 'startTime': exchange.milliseconds (),
            // 'endTime': exchange.milliseconds (),
            // 'page': 1,
            // 'pageSize': 100,
        };
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        const [type, query] = this.handleMarketTypeAndParams('fetchClosedOrders', market, params);
        const options = this.safeValue(this.options, 'fetchClosedOrders', {});
        const defaultMethod = this.safeString(options, 'method', 'v1PrivateAccountGroupGetOrderHist');
        const method = this.getSupportedMapping(type, {
            'spot': defaultMethod,
            'margin': defaultMethod,
            'swap': 'v2PrivateAccountGroupGetFuturesOrderHistCurrent',
        });
        const accountsByType = this.safeValue(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash');
        if (method === 'v1PrivateAccountGroupGetOrderHist') {
            if (accountCategory !== undefined) {
                request['category'] = accountCategory;
            }
        }
        else {
            request['account-category'] = accountCategory;
        }
        if (since !== undefined) {
            request['startTime'] = since;
        }
        if (limit !== undefined) {
            request['pageSize'] = limit;
        }
        const response = await this[method](this.extend(request, query));
        //
        // accountCategoryGetOrderHistCurrent
        //
        //     {
        //         "code":0,
        //         "accountId":"cshrHKLZCjlZ2ejqkmvIHHtPmLYqdnda",
        //         "ac":"CASH",
        //         "data":[
        //             {
        //                 "seqNum":15561826728,
        //                 "orderId":"a17294d305c0U6491137460bethu7kw9",
        //                 "symbol":"ETH/USDT",
        //                 "orderType":"Limit",
        //                 "lastExecTime":1591635618200,
        //                 "price":"200",
        //                 "orderQty":"0.1",
        //                 "side":"Buy",
        //                 "status":"Canceled",
        //                 "avgPx":"0",
        //                 "cumFilledQty":"0",
        //                 "stopPrice":"",
        //                 "errorCode":"",
        //                 "cumFee":"0",
        //                 "feeAsset":"USDT",
        //                 "execInst":"NULL_VAL"
        //             }
        //         ]
        //     }
        //
        // accountGroupGetOrderHist
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "data": [
        //                 {
        //                     "ac": "FUTURES",
        //                     "accountId": "testabcdefg",
        //                     "avgPx": "0",
        //                     "cumFee": "0",
        //                     "cumQty": "0",
        //                     "errorCode": "NULL_VAL",
        //                     "execInst": "NULL_VAL",
        //                     "feeAsset": "USDT",
        //                     "lastExecTime": 1584072844085,
        //                     "orderId": "r170d21956dd5450276356bbtcpKa74",
        //                     "orderQty": "1.1499",
        //                     "orderType": "Limit",
        //                     "price": "4000",
        //                     "sendingTime": 1584072841033,
        //                     "seqNum": 24105338,
        //                     "side": "Buy",
        //                     "status": "Canceled",
        //                     "stopPrice": "",
        //                     "symbol": "BTC-PERP"
        //                 },
        //             ],
        //             "hasNext": False,
        //             "limit": 500,
        //             "page": 1,
        //             "pageSize": 20
        //         }
        //     }
        //
        // accountGroupGetFuturesOrderHistCurrent
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "ac": "FUTURES",
        //                 "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //                 "time": 1640245777002,
        //                 "orderId": "r17de6444fa6U0711043490bbtcpJ2lI",
        //                 "seqNum": 28796124902,
        //                 "orderType": "Limit",
        //                 "execInst": "NULL_VAL",
        //                 "side": "Buy",
        //                 "symbol": "BTC-PERP",
        //                 "price": "30000",
        //                 "orderQty": "0.0021",
        //                 "stopPrice": "0",
        //                 "stopBy": "market",
        //                 "status": "Canceled",
        //                 "lastExecTime": 1640246574886,
        //                 "lastQty": "0",
        //                 "lastPx": "0",
        //                 "avgFilledPx": "0",
        //                 "cumFilledQty": "0",
        //                 "fee": "0",
        //                 "cumFee": "0",
        //                 "feeAsset": "USDT",
        //                 "errorCode": "",
        //                 "posStopLossPrice": "0",
        //                 "posStopLossTrigger": "market",
        //                 "posTakeProfitPrice": "0",
        //                 "posTakeProfitTrigger": "market",
        //                 "liquidityInd": "n"
        //             }
        //         ]
        //     }
        //
        let data = this.safeValue(response, 'data');
        const isArray = Array.isArray(data);
        if (!isArray) {
            data = this.safeValue(data, 'data', []);
        }
        return this.parseOrders(data, market, since, limit);
    }
    async cancelOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#cancelOrder
         * @description cancels an open order
         * @param {string} id order id
         * @param {string} symbol unified symbol of the market the order was made in
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        if (symbol === undefined) {
            throw new ArgumentsRequired(this.id + ' cancelOrder() requires a symbol argument');
        }
        await this.loadMarkets();
        await this.loadAccounts();
        const market = this.market(symbol);
        const [type, query] = this.handleMarketTypeAndParams('cancelOrder', market, params);
        const options = this.safeValue(this.options, 'cancelOrder', {});
        const accountsByType = this.safeValue(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash');
        const account = this.safeValue(this.accounts, 0, {});
        const accountGroup = this.safeValue(account, 'id');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
            'symbol': market['id'],
            'time': this.milliseconds(),
            'id': 'foobar',
        };
        const defaultMethod = this.safeString(options, 'method', 'v1PrivateAccountCategoryDeleteOrder');
        const method = this.getSupportedMapping(type, {
            'spot': defaultMethod,
            'margin': defaultMethod,
            'swap': 'v2PrivateAccountGroupDeleteFuturesOrder',
        });
        if (method === 'v1PrivateAccountCategoryDeleteOrder') {
            if (accountCategory !== undefined) {
                request['category'] = accountCategory;
            }
        }
        else {
            request['account-category'] = accountCategory;
        }
        const clientOrderId = this.safeString2(params, 'clientOrderId', 'id');
        if (clientOrderId === undefined) {
            request['orderId'] = id;
        }
        else {
            request['id'] = clientOrderId;
            params = this.omit(params, ['clientOrderId', 'id']);
        }
        const response = await this[method](this.extend(request, query));
        //
        // AccountCategoryDeleteOrder
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "accountId": "cshQtyfq8XLAA9kcf19h8bXHbAwwoqDo",
        //             "ac": "CASH",
        //             "action": "cancel-order",
        //             "status": "Ack",
        //             "info": {
        //                 "id":        "wv8QGquoeamhssvQBeHOHGQCGlcBjj23",
        //                 "orderId":   "16e6198afb4s8bXHbAwwoqDo2ebc19dc",
        //                 "orderType": "", // could be empty
        //                 "symbol":    "ETH/USDT",
        //                 "timestamp":  1573594877822
        //             }
        //         }
        //     }
        //
        // AccountGroupDeleteFuturesOrder
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "meta": {
        //                 "id": "foobar",
        //                 "action": "cancel-order",
        //                 "respInst": "ACK"
        //             },
        //             "order": {
        //                 "ac": "FUTURES",
        //                 "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //                 "time": 1640244480476,
        //                 "orderId": "r17de63086f4U0711043490bbtcpPUF4",
        //                 "seqNum": 28795959269,
        //                 "orderType": "Limit",
        //                 "execInst": "NULL_VAL",
        //                 "side": "Buy",
        //                 "symbol": "BTC-PERP",
        //                 "price": "30000",
        //                 "orderQty": "0.0021",
        //                 "stopPrice": "0",
        //                 "stopBy": "market",
        //                 "status": "New",
        //                 "lastExecTime": 1640244480491,
        //                 "lastQty": "0",
        //                 "lastPx": "0",
        //                 "avgFilledPx": "0",
        //                 "cumFilledQty": "0",
        //                 "fee": "0",
        //                 "cumFee": "0",
        //                 "feeAsset": "BTCPC",
        //                 "errorCode": "",
        //                 "posStopLossPrice": "0",
        //                 "posStopLossTrigger": "market",
        //                 "posTakeProfitPrice": "0",
        //                 "posTakeProfitTrigger": "market",
        //                 "liquidityInd": "n"
        //             }
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const order = this.safeValue2(data, 'order', 'info', {});
        return this.parseOrder(order, market);
    }
    async cancelAllOrders(symbol = undefined, params = {}) {
        /**
         * @method
         * @name ascendex#cancelAllOrders
         * @description cancel all open orders
         * @param {string|undefined} symbol unified market symbol, only orders in the market of this symbol are cancelled when symbol is not undefined
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {[object]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        await this.loadAccounts();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        const [type, query] = this.handleMarketTypeAndParams('cancelAllOrders', market, params);
        const options = this.safeValue(this.options, 'cancelAllOrders', {});
        const accountsByType = this.safeValue(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash');
        const account = this.safeValue(this.accounts, 0, {});
        const accountGroup = this.safeValue(account, 'id');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
            'time': this.milliseconds(),
        };
        if (symbol !== undefined) {
            request['symbol'] = market['id'];
        }
        const defaultMethod = this.safeString(options, 'method', 'v1PrivateAccountCategoryDeleteOrderAll');
        const method = this.getSupportedMapping(type, {
            'spot': defaultMethod,
            'margin': defaultMethod,
            'swap': 'v2PrivateAccountGroupDeleteFuturesOrderAll',
        });
        if (method === 'v1PrivateAccountCategoryDeleteOrderAll') {
            if (accountCategory !== undefined) {
                request['category'] = accountCategory;
            }
        }
        else {
            request['account-category'] = accountCategory;
        }
        const response = await this[method](this.extend(request, query));
        //
        // AccountCategoryDeleteOrderAll
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "ac": "CASH",
        //             "accountId": "cshQtyfq8XLAA9kcf19h8bXHbAwwoqDo",
        //             "action": "cancel-all",
        //             "info": {
        //                 "id":  "2bmYvi7lyTrneMzpcJcf2D7Pe9V1P9wy",
        //                 "orderId": "",
        //                 "orderType": "NULL_VAL",
        //                 "symbol": "",
        //                 "timestamp": 1574118495462
        //             },
        //             "status": "Ack"
        //         }
        //     }
        //
        // AccountGroupDeleteFuturesOrderAll
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "ac": "FUTURES",
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "action": "cancel-all",
        //             "info": {
        //                 "symbol":"BTC-PERP"
        //             }
        //         }
        //     }
        //
        return response;
    }
    parseDepositAddress(depositAddress, currency = undefined) {
        //
        //     {
        //         address: "0xe7c70b4e73b6b450ee46c3b5c0f5fb127ca55722",
        //         destTag: "",
        //         tagType: "",
        //         tagId: "",
        //         chainName: "ERC20",
        //         numConfirmations: 20,
        //         withdrawalFee: 1,
        //         nativeScale: 4,
        //         tips: []
        //     }
        //
        const address = this.safeString(depositAddress, 'address');
        const tagId = this.safeString(depositAddress, 'tagId');
        const tag = this.safeString(depositAddress, tagId);
        this.checkAddress(address);
        const code = (currency === undefined) ? undefined : currency['code'];
        const chainName = this.safeString(depositAddress, 'chainName');
        const network = this.safeNetwork(chainName);
        return {
            'currency': code,
            'address': address,
            'tag': tag,
            'network': network,
            'info': depositAddress,
        };
    }
    safeNetwork(networkId) {
        const networksById = {
            'TRC20': 'TRC20',
            'ERC20': 'ERC20',
            'GO20': 'GO20',
            'BEP2': 'BEP2',
            'BEP20 (BSC)': 'BEP20',
            'Bitcoin': 'BTC',
            'Bitcoin ABC': 'BCH',
            'Litecoin': 'LTC',
            'Matic Network': 'MATIC',
            'Solana': 'SOL',
            'xDai': 'STAKE',
            'Akash': 'AKT',
        };
        return this.safeString(networksById, networkId, networkId);
    }
    async fetchDepositAddress(code, params = {}) {
        /**
         * @method
         * @name ascendex#fetchDepositAddress
         * @description fetch the deposit address for a currency associated with this account
         * @param {string} code unified currency code
         * @param {object} params extra parameters specific to the ascendex api endpoint
         * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
         */
        await this.loadMarkets();
        const currency = this.currency(code);
        const chainName = this.safeString(params, 'chainName');
        params = this.omit(params, 'chainName');
        const request = {
            'asset': currency['id'],
        };
        const response = await this.v1PrivateGetWalletDepositAddress(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":{
        //             "asset":"USDT",
        //             "assetName":"Tether",
        //             "address":[
        //                 {
        //                     "address":"1N22odLHXnLPCjC8kwBJPTayarr9RtPod6",
        //                     "destTag":"",
        //                     "tagType":"",
        //                     "tagId":"",
        //                     "chainName":"Omni",
        //                     "numConfirmations":3,
        //                     "withdrawalFee":4.7,
        //                     "nativeScale":4,
        //                     "tips":[]
        //                 },
        //                 {
        //                     "address":"0xe7c70b4e73b6b450ee46c3b5c0f5fb127ca55722",
        //                     "destTag":"",
        //                     "tagType":"",
        //                     "tagId":"",
        //                     "chainName":"ERC20",
        //                     "numConfirmations":20,
        //                     "withdrawalFee":1.0,
        //                     "nativeScale":4,
        //                     "tips":[]
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeValue(response, 'data', {});
        const addresses = this.safeValue(data, 'address', []);
        const numAddresses = addresses.length;
        let address = undefined;
        if (numAddresses > 1) {
            const addressesByChainName = this.indexBy(addresses, 'chainName');
            if (chainName === undefined) {
                const chainNames = Object.keys(addressesByChainName);
                const chains = chainNames.j