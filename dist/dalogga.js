!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.dalogga=t():e.dalogga=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e){var t=(0,c["default"])(e||{});return a["default"].reduce(function(e,r,n){return i({},e,o({},r,(0,g.colourify)(d["default"].bind(void 0,t,n))))},{getLevel:function(){return a["default"][t.currentLevel]},setLevel:function(e){t.currentLevel=(0,l.getLevelNumber)(e)},disable:function(){t.isEnabled=!1},enable:function(){t.isEnabled=!0}})}Object.defineProperty(t,"__esModule",{value:!0}),t.prefixes=void 0;var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.createLogger=u;var l=r(1),a=n(l),f=r(2),c=n(f),s=r(6),d=n(s),v=r(5),p=n(v),b=r(3),y=n(b),g=r(4);t.prefixes={levelPrefix:p["default"],timestampPrefix:y["default"]}},function(e,t){"use strict";function r(e){var t=parseInt(e,10),r=isNaN(t)?n.indexOf(e):e;if(n[r])return r;throw new Error("Invalid level: "+e)}Object.defineProperty(t,"__esModule",{value:!0}),t.getLevelNumber=r;var n=["trace","debug","log","info","warn","error","fatal"];t["default"]=n},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){if("function"==typeof e.logFunction)return l["default"].map(function(){return e.logFunction});var t=console||{},r=["log"].concat(l["default"]).reduce(function(e,r,n){var o=t[r];return e.concat(o?o.bind(t):e[n-1])},[]).slice(1),n=e.logFunction||{};return l["default"].map(function(e,t){return n[t]||n[e]||r[t]})}function u(e){var t=o(e),r="boolean"==typeof e.useColours?e.useColours:!e.logFunction&&"undefined"!=typeof process&&(process.stdout||{}).isTTY,n=e.isEnabled!==!1,u=(0,i.getLevelNumber)(e.level||0),l=[].concat(e.prefixes||[f["default"],s["default"],"-"]);return{logFunction:t,prefixes:l,isEnabled:n,currentLevel:u,useColours:r}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=u;var i=r(1),l=n(i),a=r(3),f=n(a),c=r(5),s=n(c)},function(e,t,r){"use strict";function n(e){return{text:(new Date).toISOString(),colour:e||"cyan"}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(4);t["default"]=(0,o.colourify)(n)},function(e,t){"use strict";function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=i[e];return r&&t?""+r+t+l:t}function o(e){return Object.assign(e.bind(void 0,void 0),a.reduce(function(t,n){return u({},t,r({},n,e.bind(void 0,n)))},{}))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.getColouredMessage=n,t.colourify=o;var i={black:"[30m",red:"[31m",green:"[32m",yellow:"[33m",blue:"[34m",magenta:"[35m",cyan:"[36m",white:"[37m"},l="[0m",a=Object.keys(i)},function(e,t,r){"use strict";function n(e,t){return{text:"["+t.toUpperCase()+"]",colour:e||u[t]}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(4),u={trace:"cyan",debug:"cyan",log:"green",info:"blue",warn:"yellow",error:"magenta",fatal:"red"};t["default"]=(0,o.colourify)(n)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function u(e,t,r,n){var o="function"==typeof e?e(f["default"][r],n):e;return o&&o.text?o.colour&&t.useColours?(0,c.getColouredMessage)(o.colour,o.text):o.text:o}function i(e,t,r){for(var n=arguments.length,i=Array(n>3?n-3:0),a=3;a<n;a++)i[a-3]=arguments[a];var f=i.map(function(t){if(t&&"object"===("undefined"==typeof t?"undefined":l(t))&&Object.keys(t).length>0){var n=JSON.stringify(t,null,2);return e.useColours?(0,c.getColouredMessage)(r,n):n}return e.useColours?(0,c.getColouredMessage)(r,t):t});if(e.isEnabled&&e.currentLevel<=t){var s,d=e.prefixes.map(function(r){return u(r,e,t,i)});(s=e.logFunction)[t].apply(s,o(d.concat(f)))}return f.join(" ")}Object.defineProperty(t,"__esModule",{value:!0});var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t["default"]=i;var a=r(1),f=n(a),c=r(4)}])});