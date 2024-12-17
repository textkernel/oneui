(self.webpackChunk_textkernel_oneui=self.webpackChunk_textkernel_oneui||[]).push([[2379],{"./node_modules/@material-design-icons/svg/round/close.svg":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}__webpack_exports__.A=function SvgClose(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:24,height:24},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"})))}},"./node_modules/@material-design-icons/svg/round/open_in_new.svg":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}__webpack_exports__.A=function SvgOpenInNew(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:24,height:24},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1M14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 1 0 1.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1"})))}},"./node_modules/@textkernel/bem/dist/bem.js":function(module){window,module.exports=function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}return a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s="./index.ts")}({"./BemMagicExplained/ActionExplanation.ts":function(e,t,a){"use strict";var n,i;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.applied=0]="applied",e[e.ignored=1]="ignored"}(n||(n={})),function(e){e.baseName="baseName",e.modifier="modifier",e.className="className"}(i||(i={}));var o=function(){function e(e,t){this.context=e,this.action=t,this.typeOfWhat=i.baseName}return e.prototype.modifier=function(e){return this.what=e,this.typeOfWhat=i.modifier,this},e.prototype.className=function(e){return this.what=e,this.typeOfWhat=i.className,this},e.prototype.with=function(e){return this.value=e,this},e.prototype.as=function(e){return this.resultingClassName=e,this},e.prototype.because=function(e){return this.reason=e,this},Object.defineProperty(e.prototype,"contextSummary",{get:function(){return this.context},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"actionSummary",{get:function(){return this.action===n.applied?this.getActionAppliedSummary():this.getActionIgnoredSummary()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"reasonSummary",{get:function(){return this.reason?this.reason:"reason was not specified."},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"resultSummary",{get:function(){return this.resultingClassName?this.resultingClassName:"resulting class name was not specified."},enumerable:!0,configurable:!0}),e.prototype.getActionAppliedSummary=function(){var e="";switch(this.typeOfWhat){case i.baseName:e='Base block/elem name "'+this.context+'" was applied.';break;case i.modifier:e=void 0!==this.value?'Modifier "'+this.what+'" was applied with value "'+this.value+'".':'Modifier "'+this.what+'" was applied with no value.';break;case i.className:e='Class "'+this.what+'" was applied.';break;default:throw new Error('ActionExplanation#typeOfWhat has unexpected value "'+this.typeOfWhat+'".')}return e},e.prototype.getActionIgnoredSummary=function(){var e="";switch(this.typeOfWhat){case i.baseName:e='Base block/elem name "'+this.what+'" was ignored.';break;case i.modifier:e=void 0!==this.value?'Modifier "'+this.what+'" with value "'+this.value+'" was ignored.':'Modifier "'+this.what+'" was ignored.';break;case i.className:e='Class "'+this.what+'" was ignored.';break;default:throw new Error('ActionExplanation#typeOfWhat has unexpected value "'+this.typeOfWhat+'".')}return e},e.action=n,e}();t.default=o},"./BemMagicExplained/BemMagicExplained.ts":function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(a("./BemMagicExplained/ActionExplanation.ts")),o=function(){function e(e){var t=e.block,a=e.elems,n=void 0===a?[]:a,i=e.classNames,o=e.isEnabled;this.explanationsApplied=[],this.explanationsIgnored=[],this.result="",this.block=t,this.elems=n,this.classNames=i,this.isEnabled=o}return e.prototype.applies=function(e){var t=new i.default(e,i.default.action.applied);return this.explanationsApplied.push(t),t},e.prototype.ignores=function(e){var t=new i.default(e,i.default.action.ignored);return this.explanationsIgnored.push(t),t},e.prototype.thatsWhatWeHave=function(e){this.result=e},e.prototype.explain=function(){if(!1!==this.isEnabled){var t="";if(this.elems.length>0){var a=e.stringifyArrayOfStrings(this.elems);t='BEM magic explained for block: "'+this.block+'", elem(s): '+a}else t='BEM magic explained for block: "'+this.block+'"';this.groupTogether(t,this.printClassNamesInfo,this.printAppliedExplanations,this.printIgnoredExplanations,this.printOutput)}},e.prototype.printClassNamesInfo=function(){console.groupCollapsed(),console.log("Class names lookup table:"),console.table(this.classNames),console.groupEnd()},e.prototype.groupTogether=function(e){for(var t=this,a=[],n=1;n<arguments.length;n++)a[n-1]=arguments[n];console.group(e),a.forEach((function(e){return e.call(t)})),console.groupEnd()},e.prototype.printAppliedExplanations=function(){if(this.explanationsApplied.length>0){console.log("Applied:");var e=this.explanationsApplied.map((function(e){return{"Block or element":e.contextSummary,"What happened":e.actionSummary,"Why?":e.reasonSummary,"Class name":e.resultSummary}}));console.table(e)}else console.log("Nothing was applied")},e.prototype.printIgnoredExplanations=function(){if(this.explanationsIgnored.length>0){console.log("Ignored:");var e=this.explanationsIgnored.map((function(e){return{"Block or element":e.contextSummary,"What happened":e.actionSummary,"Why?":e.reasonSummary}}));console.table(e)}else console.log("Nothing was ignored")},e.prototype.printOutput=function(){this.result&&(console.log("After all, the following class names were applied:"),console.table(this.result.split(" ")))},e.stringifyArrayOfStrings=function(e){return 0===e.length?"":e.map((function(e){return'"'+e+'"'})).join(", ")},e}();t.default=o},"./BemMagicExplained/index.ts":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./BemMagicExplained/BemMagicExplained.ts");t.default=n.default},"./bem/bem.ts":function(e,t,a){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var i in t=arguments[a])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=i(a("./BemMagicExplained/index.ts")),s="__",r="--",l="_";function u(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function p(e,t,a,n,i,o){var s=[],r=i.modPrefix,l=i.valuePrefix;return u(a,e)?(o.applies(e).as(a[e]).because("Base name class was found."),s.push(a[e])):o.ignores(e).because("Base name class was not found."),Object.keys(n).filter((function(t){if("className"===t)return!1;var a=typeof n[t],i="string"===a||"number"===a||"boolean"===a;return!1===i&&o.ignores(e).modifier(t).because("Modifier's value is not of a string, number or boolean type."),i})).forEach((function(t){var i=n[t],p=""+e+r+t,c=""+e+r+t+l+i;!1!==i&&""!==i&&0!==i?(!0===i&&u(a,p)?(s.push(a[p]),o.applies(e).modifier(t).with(i).as(a[p]).because('Modifier\'s value is boolean "true".')):(u(a,p)&&(s.push(a[p]),o.applies(e).modifier(t).as(a[p]).because("Wildcard class name for the modifier was found.")),u(a,c)&&(s.push(a[c]),o.applies(e).modifier(t).with(i).as(a[c]).because("Class was found for modifier + value pair."))),o.ignores(e).modifier(t).because("Class was not found for either wildcard modifier nor modifier + value pair.")):o.ignores(e).modifier(t).because("Modifier's value is either empty string, false or zero.")})),"block"===t&&"string"==typeof n.className&&""!==n.className?(s.push(n.className),o.applies(e).className(n.className).as(n.className).because("Raw className was passed as a property")):"elem"===t&&"string"==typeof n.elemClassName&&""!==n.elemClassName&&(s.push(n.elemClassName),o.applies(e).className(n.elemClassName).as(n.elemClassName).because("elemClassName was passed as a property")),s.join(" ")}function c(e,t,a){return function(n,i){void 0===n&&(n={}),void 0===i&&(i={});var s=new o.default({block:e,classNames:t,isEnabled:!0===i.debug}),r=p(e,"block",t,n,a,s);return s.thatsWhatWeHave(r),s.explain(),r?{className:r}:{}}}function f(e,t,a){return function(n,i,s){void 0===i&&(i={}),void 0===s&&(s={});var r="string"==typeof n?[n]:n,l=new o.default({block:e,elems:r,classNames:t,isEnabled:!0===s.debug}),u=r.reduce((function(n,o){return n.concat([p(""+e+a.elemPrefix+o,"elem",t,i,a,l)])}),[]).join(" ");return l.thatsWhatWeHave(u),l.explain(),u?{className:u}:{}}}t.default=function(e){return void 0===e&&(e={}),function(e){return function(t,a){return{block:c(t,a,e),elem:f(t,a,e)}}}(n({},e,{elemPrefix:s,modPrefix:r,valuePrefix:l}))}},"./bem/index.ts":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./bem/bem.ts");t.default=n.default},"./index.ts":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./bem/index.ts");t.default=n.default}})},"./node_modules/react-icons/lib/esm/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{k5:function(){return GenIcon}});var react=__webpack_require__("./node_modules/react/index.js"),DefaultContext={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},IconContext=react.createContext&&react.createContext(DefaultContext),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t};function Tree2Element(tree){return tree&&tree.map((function(node,i){return react.createElement(node.tag,__assign({key:i},node.attr),Tree2Element(node.child))}))}function GenIcon(data){return function(props){return react.createElement(IconBase,__assign({attr:__assign({},data.attr)},props),Tree2Element(data.child))}}function IconBase(props){var elem=function(conf){var className,attr=props.attr,size=props.size,title=props.title,svgProps=__rest(props,["attr","size","title"]),computedSize=size||conf.size||"1em";return conf.className&&(className=conf.className),props.className&&(className=(className?className+" ":"")+props.className),react.createElement("svg",__assign({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},conf.attr,attr,svgProps,{className:className,style:__assign(__assign({color:props.color||conf.color},conf.style),props.style),height:computedSize,width:computedSize,xmlns:"http://www.w3.org/2000/svg"}),title&&react.createElement("title",null,title),props.children)};return void 0!==IconContext?react.createElement(IconContext.Consumer,null,(function(conf){return elem(conf)})):elem(DefaultContext)}}}]);