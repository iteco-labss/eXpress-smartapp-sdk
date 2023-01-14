(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SmartAppBridge = {}));
})(this, (function (exports) { 'use strict';

  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var PLATFORM = /* @__PURE__ */ ((PLATFORM2) => {
    PLATFORM2["WEB"] = "web";
    PLATFORM2["IOS"] = "ios";
    PLATFORM2["ANDROID"] = "android";
    PLATFORM2["UNKNOWN"] = "unknown";
    return PLATFORM2;
  })(PLATFORM || {});
  var EVENT_TYPE = /* @__PURE__ */ ((EVENT_TYPE2) => {
    EVENT_TYPE2["RECEIVE"] = "recv";
    EVENT_TYPE2["SEND"] = "send";
    return EVENT_TYPE2;
  })(EVENT_TYPE || {});
  var HANDLER = /* @__PURE__ */ ((HANDLER2) => {
    HANDLER2["BOTX"] = "botx";
    HANDLER2["EXPRESS"] = "express";
    return HANDLER2;
  })(HANDLER || {});
  const RESPONSE_TIMEOUT = 3e4;
  const WEB_COMMAND_TYPE = "smartapp";
  const WEB_COMMAND_TYPE_RPC = "smartapp_rpc";
  const WEB_COMMAND_TYPE_RPC_LOGS = "smartAppLogs";
  const getPlatformByGetParam = () => {
    const platform = new URLSearchParams(location.search).get("platform");
    const isValidPlatform = Object.values(PLATFORM).includes(platform);
    if (isValidPlatform) {
      return platform;
    }
    return PLATFORM.UNKNOWN;
  };
  const detectPlatformByUserAgent = () => {
    if (/android/i.test(navigator.userAgent)) {
      return PLATFORM.ANDROID;
    }
    if ((/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.userAgent.includes("Mac") && "ontouchend" in document) && !window.MSStream) {
      return PLATFORM.IOS;
    }
    return PLATFORM.WEB;
  };
  const getPlatform = () => {
    return getPlatformByGetParam() || detectPlatformByUserAgent();
  };
  let getRandomValues;
  const rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  function validate(uuid) {
    return typeof uuid === "string" && REGEX.test(uuid);
  }
  const byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }
  const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  const native = {
    randomUUID
  };
  function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  const freeGlobal$1 = freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal$1 || freeSelf || Function("return this")();
  const root$1 = root;
  var Symbol$1 = root$1.Symbol;
  const Symbol$2 = Symbol$1;
  function arrayMap(array, iteratee) {
    var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index2 < length) {
      result[index2] = iteratee(array[index2], index2, array);
    }
    return result;
  }
  var isArray = Array.isArray;
  const isArray$1 = isArray;
  var objectProto$1 = Object.prototype;
  var hasOwnProperty = objectProto$1.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$1.toString;
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var objectProto = Object.prototype;
  var nativeObjectToString = objectProto.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  var INFINITY = 1 / 0;
  var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray$1(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function baseSlice(array, start, end) {
    var index2 = -1, length = array.length;
    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while (++index2 < length) {
      result[index2] = array[index2 + start];
    }
    return result;
  }
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === void 0 ? length : end;
    return !start && end >= length ? array : baseSlice(array, start, end);
  }
  var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3, rsVarRange$2 = "\\ufe0e\\ufe0f";
  var rsZWJ$2 = "\\u200d";
  var reHasUnicode = RegExp("[" + rsZWJ$2 + rsAstralRange$2 + rsComboRange$3 + rsVarRange$2 + "]");
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  function asciiToArray(string) {
    return string.split("");
  }
  var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsVarRange$1 = "\\ufe0e\\ufe0f";
  var rsAstral = "[" + rsAstralRange$1 + "]", rsCombo$2 = "[" + rsComboRange$2 + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$2 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$1 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ$1 = "\\u200d";
  var reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$1 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsSymbol = "(?:" + [rsNonAstral$1 + rsCombo$2 + "?", rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join("|") + ")";
  var reUnicode = RegExp(rsFitz$1 + "(?=" + rsFitz$1 + ")|" + rsSymbol + rsSeq$1, "g");
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  function createCaseFirst(methodName) {
    return function(string) {
      string = toString(string);
      var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
      var chr = strSymbols ? strSymbols[0] : string.charAt(0);
      var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
      return chr[methodName]() + trailing;
    };
  }
  var upperFirst = createCaseFirst("toUpperCase");
  const upperFirst$1 = upperFirst;
  function capitalize(string) {
    return upperFirst$1(toString(string).toLowerCase());
  }
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index2 = -1, length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[++index2];
    }
    while (++index2 < length) {
      accumulator = iteratee(accumulator, array[index2], index2, array);
    }
    return accumulator;
  }
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? void 0 : object[key];
    };
  }
  var deburredLetters = {
    // Latin-1 Supplement block.
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "Ç": "C",
    "ç": "c",
    "Ð": "D",
    "ð": "d",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "Ñ": "N",
    "ñ": "n",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "Ý": "Y",
    "ý": "y",
    "ÿ": "y",
    "Æ": "Ae",
    "æ": "ae",
    "Þ": "Th",
    "þ": "th",
    "ß": "ss",
    // Latin Extended-A block.
    "Ā": "A",
    "Ă": "A",
    "Ą": "A",
    "ā": "a",
    "ă": "a",
    "ą": "a",
    "Ć": "C",
    "Ĉ": "C",
    "Ċ": "C",
    "Č": "C",
    "ć": "c",
    "ĉ": "c",
    "ċ": "c",
    "č": "c",
    "Ď": "D",
    "Đ": "D",
    "ď": "d",
    "đ": "d",
    "Ē": "E",
    "Ĕ": "E",
    "Ė": "E",
    "Ę": "E",
    "Ě": "E",
    "ē": "e",
    "ĕ": "e",
    "ė": "e",
    "ę": "e",
    "ě": "e",
    "Ĝ": "G",
    "Ğ": "G",
    "Ġ": "G",
    "Ģ": "G",
    "ĝ": "g",
    "ğ": "g",
    "ġ": "g",
    "ģ": "g",
    "Ĥ": "H",
    "Ħ": "H",
    "ĥ": "h",
    "ħ": "h",
    "Ĩ": "I",
    "Ī": "I",
    "Ĭ": "I",
    "Į": "I",
    "İ": "I",
    "ĩ": "i",
    "ī": "i",
    "ĭ": "i",
    "į": "i",
    "ı": "i",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "ĸ": "k",
    "Ĺ": "L",
    "Ļ": "L",
    "Ľ": "L",
    "Ŀ": "L",
    "Ł": "L",
    "ĺ": "l",
    "ļ": "l",
    "ľ": "l",
    "ŀ": "l",
    "ł": "l",
    "Ń": "N",
    "Ņ": "N",
    "Ň": "N",
    "Ŋ": "N",
    "ń": "n",
    "ņ": "n",
    "ň": "n",
    "ŋ": "n",
    "Ō": "O",
    "Ŏ": "O",
    "Ő": "O",
    "ō": "o",
    "ŏ": "o",
    "ő": "o",
    "Ŕ": "R",
    "Ŗ": "R",
    "Ř": "R",
    "ŕ": "r",
    "ŗ": "r",
    "ř": "r",
    "Ś": "S",
    "Ŝ": "S",
    "Ş": "S",
    "Š": "S",
    "ś": "s",
    "ŝ": "s",
    "ş": "s",
    "š": "s",
    "Ţ": "T",
    "Ť": "T",
    "Ŧ": "T",
    "ţ": "t",
    "ť": "t",
    "ŧ": "t",
    "Ũ": "U",
    "Ū": "U",
    "Ŭ": "U",
    "Ů": "U",
    "Ű": "U",
    "Ų": "U",
    "ũ": "u",
    "ū": "u",
    "ŭ": "u",
    "ů": "u",
    "ű": "u",
    "ų": "u",
    "Ŵ": "W",
    "ŵ": "w",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Ź": "Z",
    "Ż": "Z",
    "Ž": "Z",
    "ź": "z",
    "ż": "z",
    "ž": "z",
    "Ĳ": "IJ",
    "ĳ": "ij",
    "Œ": "Oe",
    "œ": "oe",
    "ŉ": "'n",
    "ſ": "s"
  };
  var deburrLetter = basePropertyOf(deburredLetters);
  const deburrLetter$1 = deburrLetter;
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
  var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
  var rsCombo$1 = "[" + rsComboRange$1 + "]";
  var reComboMark = RegExp(rsCombo$1, "g");
  function deburr(string) {
    string = toString(string);
    return string && string.replace(reLatin, deburrLetter$1).replace(reComboMark, "");
  }
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }
  var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
  var rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
  var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
  var reUnicodeWord = RegExp([
    rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
    rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
    rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
    rsUpper + "+" + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join("|"), "g");
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }
  function words(string, pattern, guard) {
    string = toString(string);
    pattern = guard ? void 0 : pattern;
    if (pattern === void 0) {
      return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    }
    return string.match(pattern) || [];
  }
  var rsApos = "['’]";
  var reApos = RegExp(rsApos, "g");
  function createCompounder(callback) {
    return function(string) {
      return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
    };
  }
  var camelCase = createCompounder(function(result, word, index2) {
    word = word.toLowerCase();
    return result + (index2 ? capitalize(word) : word);
  });
  const camelCase$1 = camelCase;
  var snakeCase = createCompounder(function(result, word, index2) {
    return result + (index2 ? "_" : "") + word.toLowerCase();
  });
  const snakeCase$1 = snakeCase;
  const snakeCaseToCamelCase = (data) => {
    var _a;
    if (Array.isArray(data)) {
      return data.map(snakeCaseToCamelCase);
    }
    if (!data || ((_a = data.constructor) == null ? void 0 : _a.name) !== "Object") {
      return data;
    }
    return Object.keys(data).reduce((result, key) => {
      const value = snakeCaseToCamelCase(data[key]);
      const keyValue = validate(key) ? key : camelCase$1(key);
      return __spreadProps(__spreadValues({}, result), { [keyValue]: value });
    }, {});
  };
  const camelCaseToSnakeCase = (data) => {
    var _a;
    if (Array.isArray(data)) {
      return data.map(camelCaseToSnakeCase);
    }
    if (!data || ((_a = data.constructor) == null ? void 0 : _a.name) !== "Object") {
      return data;
    }
    return Object.keys(data).reduce((result, key) => {
      const value = camelCaseToSnakeCase(data[key]);
      return __spreadProps(__spreadValues({}, result), { [snakeCase$1(key)]: value });
    }, {});
  };
  var eventemitter3Exports = {};
  var eventemitter3 = {
    get exports() {
      return eventemitter3Exports;
    },
    set exports(v) {
      eventemitter3Exports = v;
    }
  };
  (function(module) {
    var has = Object.prototype.hasOwnProperty, prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    {
      module.exports = EventEmitter2;
    }
  })(eventemitter3);
  class ExtendedEventEmitter extends eventemitter3Exports {
    constructor() {
      super();
    }
    /**
     * Wait when event with `type` will be emitted for `timeout` ms.
     *
     * ```js
     * emitter.onceWithTimeout('d6910a9d-ea24-5fc6-a654-28781ef21f8f', 20000)
     * // => Promise
     * ```
     * @param type - Event type, uuid or EVENT_TYPE.RECV for standalone events from client
     * @param timeout - Timeout in ms
     * @returns Promise.
     */
    onceWithTimeout(type, timeout) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          console.error("Bridge ~ Timeout event", timer);
          reject(new Error("Bridge ~ Timeout event"));
        }, timeout);
        this.once(type, (event) => {
          clearTimeout(timer);
          resolve(event);
        });
      });
    }
  }
  const log = (...args) => {
    const text = args.map((arg) => typeof arg === "string" ? arg : JSON.stringify(arg)).join(" ");
    alert(text);
  };
  class AndroidBridge {
    constructor() {
      __publicField(this, "eventEmitter");
      __publicField(this, "hasCommunicationObject");
      __publicField(this, "logsEnabled");
      __publicField(this, "isRenameParamsEnabled");
      this.hasCommunicationObject = typeof window.express !== "undefined" && !!window.express.handleSmartAppEvent;
      this.eventEmitter = new ExtendedEventEmitter();
      this.logsEnabled = false;
      this.isRenameParamsEnabled = true;
      if (!this.hasCommunicationObject) {
        log('Method "express.handleSmartAppEvent" not available, cannot send message to Android');
        return;
      }
      window.handleAndroidEvent = ({
        ref,
        data,
        files
      }) => {
        if (this.logsEnabled) {
          console.log("Bridge ~ Incoming event", JSON.stringify({ ref, data, files }, null, 2));
        }
        const _a = data, { type } = _a, payload = __objRest(_a, ["type"]);
        const emitterType = ref || EVENT_TYPE.RECEIVE;
        const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => snakeCaseToCamelCase(file)) : files;
        const event = {
          ref,
          type,
          payload: this.isRenameParamsEnabled ? snakeCaseToCamelCase(payload) : payload,
          files: eventFiles
        };
        this.eventEmitter.emit(emitterType, event);
      };
    }
    /**
     * Set callback function to handle events without **ref**
     * (notifications for example).
     *
     * ```js
     * bridge.onReceive(({ type, handler, payload }) => {
     *   // Handle event data
     *   console.log('event', type, handler, payload)
     * })
     * ```
     * @param callback - Callback function.
     */
    onReceive(callback) {
      this.eventEmitter.on(EVENT_TYPE.RECEIVE, callback);
    }
    sendEvent({
      handler,
      method,
      params,
      files,
      timeout = RESPONSE_TIMEOUT,
      guaranteed_delivery_required = false
    }) {
      if (!this.hasCommunicationObject) {
        return Promise.reject(new Error('Method "express.handleSmartAppEvent" not available, cannot send message to Android'));
      }
      const ref = v4();
      const eventParams = {
        ref,
        type: WEB_COMMAND_TYPE_RPC,
        method,
        handler,
        payload: this.isRenameParamsEnabled ? camelCaseToSnakeCase(params) : params,
        guaranteed_delivery_required
      };
      const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => camelCaseToSnakeCase(file)) : files;
      const event = JSON.stringify(files ? __spreadProps(__spreadValues({}, eventParams), { files: eventFiles }) : eventParams);
      if (this.logsEnabled) {
        console.log("Bridge ~ Outgoing event", JSON.stringify(event, null, "  "));
      }
      window.express.handleSmartAppEvent(event);
      return this.eventEmitter.onceWithTimeout(ref, timeout);
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendBotEvent(
     *     {
     *       method: 'get_weather',
     *       params: {
     *         city: 'Moscow',
     *       },
     *       files: []
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param files
     * @param timeout - Timeout in ms.
     * @param guaranteed_delivery_required - boolean.
     * @returns Promise.
     */
    sendBotEvent({ method, params, files, timeout, guaranteed_delivery_required }) {
      return this.sendEvent({ handler: HANDLER.BOTX, method, params, files, timeout, guaranteed_delivery_required });
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendClientEvent(
     *     {
     *       type: 'get_weather',
     *       handler: 'express',
     *       payload: {
     *         city: 'Moscow',
     *       },
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param timeout - Timeout in ms.
     * @returns Promise.
     */
    sendClientEvent({ method, params, timeout }) {
      return this.sendEvent({ handler: HANDLER.EXPRESS, method, params, timeout });
    }
    /**
     * Enabling logs.
     *
     * ```js
     * bridge
     *   .enableLogs()
     * ```
     */
    enableLogs() {
      this.logsEnabled = true;
    }
    /**
     * Disabling logs.
     *
     * ```js
     * bridge
     *   .disableLogs()
     * ```
     */
    disableLogs() {
      this.logsEnabled = false;
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .enableRenameParams()
     * ```
     */
    enableRenameParams() {
      this.isRenameParamsEnabled = true;
      console.log("Bridge ~ Enabled renaming event params from camelCase to snake_case and vice versa");
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .disableRenameParams()
     * ```
     */
    disableRenameParams() {
      this.isRenameParamsEnabled = false;
      console.log("Bridge ~ Disabled renaming event params from camelCase to snake_case and vice versa");
    }
  }
  class IosBridge {
    constructor() {
      __publicField(this, "eventEmitter");
      __publicField(this, "hasCommunicationObject");
      __publicField(this, "logsEnabled");
      __publicField(this, "isRenameParamsEnabled");
      this.hasCommunicationObject = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.express && !!window.webkit.messageHandlers.express.postMessage;
      this.eventEmitter = new ExtendedEventEmitter();
      this.logsEnabled = false;
      this.isRenameParamsEnabled = true;
      if (!this.hasCommunicationObject) {
        log('Method "express.postMessage" not available, cannot send message to iOS');
        return;
      }
      window.handleIosEvent = ({
        ref,
        data,
        files
      }) => {
        if (this.logsEnabled) {
          console.log(
            "Bridge ~ Incoming event",
            JSON.stringify(
              {
                ref,
                data,
                files
              },
              null,
              2
            )
          );
        }
        const _a = data, { type } = _a, payload = __objRest(_a, ["type"]);
        const emitterType = ref || EVENT_TYPE.RECEIVE;
        const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => snakeCaseToCamelCase(file)) : files;
        const event = {
          ref,
          type,
          payload: this.isRenameParamsEnabled ? snakeCaseToCamelCase(payload) : payload,
          files: eventFiles
        };
        this.eventEmitter.emit(emitterType, event);
      };
    }
    /**
     * Set callback function to handle events without **ref**
     * (notifications for example).
     *
     * ```js
     * bridge.onRecieve(({ type, handler, payload }) => {
     *   // Handle event data
     *   console.log('event', type, handler, payload)
     * })
     * ```
     * @param callback - Callback function.
     */
    onReceive(callback) {
      this.eventEmitter.on(EVENT_TYPE.RECEIVE, callback);
    }
    sendEvent({
      handler,
      method,
      params,
      files,
      timeout = RESPONSE_TIMEOUT,
      guaranteed_delivery_required = false
    }) {
      if (!this.hasCommunicationObject) {
        return Promise.reject(new Error('Method "express.postMessage" not available, cannot send message to iOS'));
      }
      const ref = v4();
      const eventProps = {
        ref,
        type: WEB_COMMAND_TYPE_RPC,
        method,
        handler,
        payload: this.isRenameParamsEnabled ? camelCaseToSnakeCase(params) : params,
        guaranteed_delivery_required
      };
      const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => camelCaseToSnakeCase(file)) : files;
      const event = files ? __spreadProps(__spreadValues({}, eventProps), { files: eventFiles }) : eventProps;
      if (this.logsEnabled) {
        console.log("Bridge ~ Outgoing event", JSON.stringify(event, null, "  "));
      }
      window.webkit.messageHandlers.express.postMessage(event);
      return this.eventEmitter.onceWithTimeout(ref, timeout);
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendBotEvent(
     *     {
     *       method: 'get_weather',
     *       params: {
     *         city: 'Moscow',
     *       },
     *       files: []
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param files
     * @param timeout - Timeout in ms.
     * @param guaranteed_delivery_required - boolean.
     */
    sendBotEvent({
      method,
      params,
      files,
      timeout = RESPONSE_TIMEOUT,
      guaranteed_delivery_required
    }) {
      return this.sendEvent({ handler: HANDLER.BOTX, method, params, files, timeout, guaranteed_delivery_required });
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendClientEvent(
     *     {
     *       type: 'get_weather',
     *       handler: 'express',
     *       payload: {
     *         city: 'Moscow',
     *       },
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param timeout - Timeout in ms.
     */
    sendClientEvent({ method, params, timeout = RESPONSE_TIMEOUT }) {
      return this.sendEvent({ handler: HANDLER.EXPRESS, method, params, timeout });
    }
    /**
     * Enabling logs.
     *
     * ```js
     * bridge
     *   .enableLogs()
     * ```
     */
    enableLogs() {
      this.logsEnabled = true;
    }
    /**
     * Disabling logs.
     *
     * ```js
     * bridge
     *   .disableLogs()
     * ```
     */
    disableLogs() {
      this.logsEnabled = false;
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .enableRenameParams()
     * ```
     */
    enableRenameParams() {
      this.isRenameParamsEnabled = true;
      console.log("Bridge ~ Enabled renaming event params from camelCase to snake_case and vice versa");
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .disableRenameParams()
     * ```
     */
    disableRenameParams() {
      this.isRenameParamsEnabled = false;
      console.log("Bridge ~ Disabled renaming event params from camelCase to snake_case and vice versa");
    }
  }
  class WebBridge {
    constructor() {
      __publicField(this, "eventEmitter");
      __publicField(this, "logsEnabled");
      __publicField(this, "isRenameParamsEnabled");
      this.eventEmitter = new ExtendedEventEmitter();
      this.addGlobalListener();
      this.logsEnabled = false;
      this.isRenameParamsEnabled = true;
    }
    addGlobalListener() {
      window.addEventListener("message", (event) => {
        const isRenameParamsWasEnabled = this.isRenameParamsEnabled;
        if (getPlatform() === PLATFORM.WEB && event.data.handler === HANDLER.EXPRESS && this.isRenameParamsEnabled) {
          this.isRenameParamsEnabled = false;
        }
        if (typeof event.data !== "object" || typeof event.data.data !== "object" || typeof event.data.data.type !== "string") {
          return;
        }
        if (this.logsEnabled) {
          console.log("Bridge ~ Incoming event", event.data);
        }
        const _a = event.data, {
          ref,
          data: _b
        } = _a, _c = _b, { type } = _c, payload = __objRest(_c, ["type"]), {
          files
        } = _a;
        const emitterType = ref || EVENT_TYPE.RECEIVE;
        const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => snakeCaseToCamelCase(file)) : files;
        this.eventEmitter.emit(emitterType, {
          ref,
          type,
          payload: this.isRenameParamsEnabled ? snakeCaseToCamelCase(payload) : payload,
          files: eventFiles
        });
        if (isRenameParamsWasEnabled) {
          this.isRenameParamsEnabled = true;
        }
      });
    }
    /**
     * Set callback function to handle events without **ref**
     * (notifications for example).
     *
     * ```js
     * bridge.onReceive(({ type, handler, payload }) => {
     *   // Handle event data
     *   console.log('event', type, handler, payload)
     * })
     * ```
     * @param callback - Callback function.
     */
    onReceive(callback) {
      this.eventEmitter.on(EVENT_TYPE.RECEIVE, callback);
    }
    sendEvent({
      handler,
      method,
      params,
      files,
      timeout = RESPONSE_TIMEOUT,
      guaranteed_delivery_required = false
    }) {
      const isRenameParamsWasEnabled = this.isRenameParamsEnabled;
      if (getPlatform() === PLATFORM.WEB && handler === HANDLER.EXPRESS && this.isRenameParamsEnabled) {
        this.disableRenameParams();
      }
      const ref = v4();
      const payload = {
        ref,
        type: WEB_COMMAND_TYPE_RPC,
        method,
        handler,
        payload: this.isRenameParamsEnabled ? camelCaseToSnakeCase(params) : params,
        guaranteed_delivery_required
      };
      const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => camelCaseToSnakeCase(file)) : files;
      const event = files ? __spreadProps(__spreadValues({}, payload), { files: eventFiles }) : payload;
      if (this.logsEnabled) {
        console.log("Bridge ~ Outgoing event", event);
      }
      window.parent.postMessage(
        {
          type: WEB_COMMAND_TYPE,
          payload: event
        },
        "*"
      );
      if (isRenameParamsWasEnabled) {
        this.enableRenameParams();
      }
      return this.eventEmitter.onceWithTimeout(ref, timeout);
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendClientEvent(
     *     {
     *       method: 'get_weather',
     *       params: {
     *         city: 'Moscow',
     *       },
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param files
     * @param is_rename_params_fields - boolean.
     * @param timeout - Timeout in ms.
     * @param guaranteed_delivery_required - boolean.
     */
    sendBotEvent({
      method,
      params,
      files,
      timeout,
      guaranteed_delivery_required
    }) {
      return this.sendEvent({
        handler: HANDLER.BOTX,
        method,
        params,
        files,
        timeout,
        guaranteed_delivery_required
      });
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendClientEvent(
     *     {
     *       method: 'get_weather',
     *       params: {
     *         city: 'Moscow',
     *       },
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param timeout - Timeout in ms.
     */
    sendClientEvent({ method, params, timeout }) {
      return this.sendEvent({ handler: HANDLER.EXPRESS, method, params, timeout });
    }
    /**
     * Enabling logs.
     *
     * ```js
     * bridge
     *   .enableLogs()
     * ```
     */
    enableLogs() {
      this.logsEnabled = true;
      const _log = console.log;
      console.log = function(...rest) {
        window.parent.postMessage(
          {
            type: WEB_COMMAND_TYPE_RPC_LOGS,
            payload: rest
          },
          "*"
        );
        _log.apply(console, rest);
      };
    }
    /**
     * Disabling logs.
     *
     * ```js
     * bridge
     *   .disableLogs()
     * ```
     */
    disableLogs() {
      this.logsEnabled = false;
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .enableRenameParams()
     * ```
     */
    enableRenameParams() {
      this.isRenameParamsEnabled = true;
      console.log("Bridge ~ Enabled renaming event params from camelCase to snake_case and vice versa");
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .disableRenameParams()
     * ```
     */
    disableRenameParams() {
      this.isRenameParamsEnabled = false;
      console.log("Bridge ~ Disabled renaming event params from camelCase to snake_case and vice versa");
    }
  }
  const LIB_VERSION = "1.2.5";
  const getBridge = () => {
    const platform = getPlatform();
    console.log("Bridge ~ version", LIB_VERSION);
    switch (platform) {
      case PLATFORM.ANDROID:
        return new AndroidBridge();
      case PLATFORM.IOS:
        return new IosBridge();
      case PLATFORM.WEB:
        return new WebBridge();
      default:
        console.error("Bridge ~ Wrong platform");
        break;
    }
    return null;
  };
  const index = getBridge();

  var METHODS;
  (function (METHODS) {
      METHODS["READY"] = "ready";
      METHODS["ROUTING_CHANGED"] = "routing_changed";
      METHODS["BACK_PRESSED"] = "back_pressed";
      METHODS["ADD_CONTACT"] = "add_contact";
      METHODS["GET_CONTACT"] = "get_contact";
      METHODS["CREATE_PERSONAL_CHAT"] = "create_personal_chat";
      METHODS["SEND_MESSAGE"] = "send_message";
      METHODS["NOTIFICATION"] = "notification";
      METHODS["OPEN_SMART_APP"] = "open_smart_app";
      METHODS["OPEN_CLIENT_SETTINGS"] = "open_client_settings";
      METHODS["GET_CHATS"] = "get_chats";
      METHODS["SEARCH_CORPORATE_PHONEBOOK"] = "search_corporate_phonebook";
  })(METHODS || (METHODS = {}));

  var LOCATION;
  (function (LOCATION) {
      LOCATION["ROOT"] = "root";
      LOCATION["NESTED"] = "nested";
  })(LOCATION || (LOCATION = {}));

  const openClientSettings = () => {
      return index?.sendClientEvent({
          method: METHODS.OPEN_CLIENT_SETTINGS,
          params: {},
      });
  };
  /**
   * @param filter
   */
  const getChats = ({ filter = null }) => {
      return index?.sendClientEvent({
          method: METHODS.GET_CHATS,
          params: { filter },
      });
  };
  const searchCorporatePhonebook = ({ filter = null }) => {
      return index?.sendClientEvent({
          method: METHODS.SEARCH_CORPORATE_PHONEBOOK,
          params: { filter },
      });
  };

  /**
   * @param phone
   * @param name
   */
  const addContact = ({ phone, name }) => {
      return index?.sendClientEvent({
          method: METHODS.ADD_CONTACT,
          params: {
              phone,
              name,
          },
      });
  };
  /**
   * @param phone
   */
  const getContact = async ({ phone }) => {
      return index?.sendClientEvent({
          method: METHODS.GET_CONTACT,
          params: { phone },
      });
  };
  /**
   * @param huid
   */
  const createPersonalChat = ({ huid }) => {
      return index?.sendClientEvent({
          method: METHODS.CREATE_PERSONAL_CHAT,
          params: { huid },
      });
  };
  /**
   * @param userHuid
   * @param groupChatId
   * @param messageBody
   * @param messageMeta
   */
  const sendMessage = ({ userHuid = null, groupChatId = null, messageBody = "", messageMeta = {}, }) => {
      return index?.sendClientEvent({
          method: METHODS.SEND_MESSAGE,
          params: {
              userHuid,
              groupChatId,
              message: {
                  body: messageBody,
                  meta: messageMeta,
              },
          },
      });
  };

  const useQuery = () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      return Object.fromEntries(urlSearchParams.entries());
  };

  /**
   * @param timeout
   */
  const bridgeSendReady = (timeout) => {
      const event = {
          method: METHODS.READY,
          params: {},
      };
      return index?.sendClientEvent(timeout ? { ...event, timeout } : event);
  };

  /**
   * @param timeout
   */
  const ready = async (timeout) => {
      const response = await bridgeSendReady(timeout);
      const Bridge = index;
      const isLogsEnabled = response?.payload?.logsEnabled;
      if (isLogsEnabled)
          Bridge?.enableLogs?.();
      return response;
  };

  /**
   * @param handleNotification
   */
  const onNotification = async (handleNotification) => {
      const response = await index?.sendClientEvent({
          method: METHODS.NOTIFICATION,
          params: {},
      });
      return index?.onReceive((event) => {
          if (event?.type === METHODS.NOTIFICATION) {
              handleNotification(response);
          }
      });
  };

  /**
   * @param isRoot
   */
  const routingChanged = (isRoot) => {
      return index?.sendClientEvent({
          method: METHODS.ROUTING_CHANGED,
          params: {
              location: isRoot ? LOCATION.ROOT : LOCATION.NESTED,
          },
      });
  };
  /**
   * @param handleBackPressed
   */
  const onBackPressed = (handleBackPressed) => {
      return index?.onReceive((event) => {
          if (event.type === METHODS.BACK_PRESSED)
              handleBackPressed();
      });
  };
  /**
   * @param appId
   * @param meta
   */
  const openSmartApp = (appId, meta) => {
      return index?.sendClientEvent({
          method: METHODS.OPEN_SMART_APP,
          params: {
              appId,
              meta,
          },
      });
  };
  const exitSmartAppToCatalog = () => {
      return index?.sendClientEvent({
          method: METHODS.OPEN_SMART_APP,
          params: {
              appId: "",
          },
      });
  };

  exports.Bridge = index;
  exports.addContact = addContact;
  exports.createPersonalChat = createPersonalChat;
  exports.exitSmartAppToCatalog = exitSmartAppToCatalog;
  exports.getChats = getChats;
  exports.getContact = getContact;
  exports.onBackPressed = onBackPressed;
  exports.onNotification = onNotification;
  exports.openClientSettings = openClientSettings;
  exports.openSmartApp = openSmartApp;
  exports.ready = ready;
  exports.routingChanged = routingChanged;
  exports.searchCorporatePhonebook = searchCorporatePhonebook;
  exports.sendMessage = sendMessage;
  exports.useQuery = useQuery;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
