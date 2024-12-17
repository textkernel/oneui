(self.webpackChunk_textkernel_oneui=self.webpackChunk_textkernel_oneui||[]).push([[6716,9527],{"./stories/molecules/LoadingSpinner.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_LoadingSpinner:function(){return _LoadingSpinner},__namedExportsOrder:function(){return __namedExportsOrder}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_textkernel_oneui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/LoadingSpinner/LoadingSpinner.tsx"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},meta={title:"Molecules/LoadingSpinner",component:_textkernel_oneui__WEBPACK_IMPORTED_MODULE_1__.k};__webpack_exports__.default=meta;var _LoadingSpinner={name:"LoadingSpinner",args:{children:"Loading..."},render:function render(args){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_1__.k,__assign({},args))}};_LoadingSpinner.parameters={..._LoadingSpinner.parameters,docs:{..._LoadingSpinner.parameters?.docs,source:{originalSource:"{\n  name: 'LoadingSpinner',\n  args: {\n    children: 'Loading...'\n  },\n  render: args => <LoadingSpinner {...args} />\n}",..._LoadingSpinner.parameters?.docs?.source}}};const __namedExportsOrder=["_LoadingSpinner"]},"./node_modules/@textkernel/bem/dist/bem.js":function(module){window,module.exports=function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}return a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s="./index.ts")}({"./BemMagicExplained/ActionExplanation.ts":function(e,t,a){"use strict";var n,i;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.applied=0]="applied",e[e.ignored=1]="ignored"}(n||(n={})),function(e){e.baseName="baseName",e.modifier="modifier",e.className="className"}(i||(i={}));var o=function(){function e(e,t){this.context=e,this.action=t,this.typeOfWhat=i.baseName}return e.prototype.modifier=function(e){return this.what=e,this.typeOfWhat=i.modifier,this},e.prototype.className=function(e){return this.what=e,this.typeOfWhat=i.className,this},e.prototype.with=function(e){return this.value=e,this},e.prototype.as=function(e){return this.resultingClassName=e,this},e.prototype.because=function(e){return this.reason=e,this},Object.defineProperty(e.prototype,"contextSummary",{get:function(){return this.context},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"actionSummary",{get:function(){return this.action===n.applied?this.getActionAppliedSummary():this.getActionIgnoredSummary()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"reasonSummary",{get:function(){return this.reason?this.reason:"reason was not specified."},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"resultSummary",{get:function(){return this.resultingClassName?this.resultingClassName:"resulting class name was not specified."},enumerable:!0,configurable:!0}),e.prototype.getActionAppliedSummary=function(){var e="";switch(this.typeOfWhat){case i.baseName:e='Base block/elem name "'+this.context+'" was applied.';break;case i.modifier:e=void 0!==this.value?'Modifier "'+this.what+'" was applied with value "'+this.value+'".':'Modifier "'+this.what+'" was applied with no value.';break;case i.className:e='Class "'+this.what+'" was applied.';break;default:throw new Error('ActionExplanation#typeOfWhat has unexpected value "'+this.typeOfWhat+'".')}return e},e.prototype.getActionIgnoredSummary=function(){var e="";switch(this.typeOfWhat){case i.baseName:e='Base block/elem name "'+this.what+'" was ignored.';break;case i.modifier:e=void 0!==this.value?'Modifier "'+this.what+'" with value "'+this.value+'" was ignored.':'Modifier "'+this.what+'" was ignored.';break;case i.className:e='Class "'+this.what+'" was ignored.';break;default:throw new Error('ActionExplanation#typeOfWhat has unexpected value "'+this.typeOfWhat+'".')}return e},e.action=n,e}();t.default=o},"./BemMagicExplained/BemMagicExplained.ts":function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(a("./BemMagicExplained/ActionExplanation.ts")),o=function(){function e(e){var t=e.block,a=e.elems,n=void 0===a?[]:a,i=e.classNames,o=e.isEnabled;this.explanationsApplied=[],this.explanationsIgnored=[],this.result="",this.block=t,this.elems=n,this.classNames=i,this.isEnabled=o}return e.prototype.applies=function(e){var t=new i.default(e,i.default.action.applied);return this.explanationsApplied.push(t),t},e.prototype.ignores=function(e){var t=new i.default(e,i.default.action.ignored);return this.explanationsIgnored.push(t),t},e.prototype.thatsWhatWeHave=function(e){this.result=e},e.prototype.explain=function(){if(!1!==this.isEnabled){var t="";if(this.elems.length>0){var a=e.stringifyArrayOfStrings(this.elems);t='BEM magic explained for block: "'+this.block+'", elem(s): '+a}else t='BEM magic explained for block: "'+this.block+'"';this.groupTogether(t,this.printClassNamesInfo,this.printAppliedExplanations,this.printIgnoredExplanations,this.printOutput)}},e.prototype.printClassNamesInfo=function(){console.groupCollapsed(),console.log("Class names lookup table:"),console.table(this.classNames),console.groupEnd()},e.prototype.groupTogether=function(e){for(var t=this,a=[],n=1;n<arguments.length;n++)a[n-1]=arguments[n];console.group(e),a.forEach((function(e){return e.call(t)})),console.groupEnd()},e.prototype.printAppliedExplanations=function(){if(this.explanationsApplied.length>0){console.log("Applied:");var e=this.explanationsApplied.map((function(e){return{"Block or element":e.contextSummary,"What happened":e.actionSummary,"Why?":e.reasonSummary,"Class name":e.resultSummary}}));console.table(e)}else console.log("Nothing was applied")},e.prototype.printIgnoredExplanations=function(){if(this.explanationsIgnored.length>0){console.log("Ignored:");var e=this.explanationsIgnored.map((function(e){return{"Block or element":e.contextSummary,"What happened":e.actionSummary,"Why?":e.reasonSummary}}));console.table(e)}else console.log("Nothing was ignored")},e.prototype.printOutput=function(){this.result&&(console.log("After all, the following class names were applied:"),console.table(this.result.split(" ")))},e.stringifyArrayOfStrings=function(e){return 0===e.length?"":e.map((function(e){return'"'+e+'"'})).join(", ")},e}();t.default=o},"./BemMagicExplained/index.ts":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./BemMagicExplained/BemMagicExplained.ts");t.default=n.default},"./bem/bem.ts":function(e,t,a){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var i in t=arguments[a])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=i(a("./BemMagicExplained/index.ts")),s="__",r="--",l="_";function u(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function p(e,t,a,n,i,o){var s=[],r=i.modPrefix,l=i.valuePrefix;return u(a,e)?(o.applies(e).as(a[e]).because("Base name class was found."),s.push(a[e])):o.ignores(e).because("Base name class was not found."),Object.keys(n).filter((function(t){if("className"===t)return!1;var a=typeof n[t],i="string"===a||"number"===a||"boolean"===a;return!1===i&&o.ignores(e).modifier(t).because("Modifier's value is not of a string, number or boolean type."),i})).forEach((function(t){var i=n[t],p=""+e+r+t,c=""+e+r+t+l+i;!1!==i&&""!==i&&0!==i?(!0===i&&u(a,p)?(s.push(a[p]),o.applies(e).modifier(t).with(i).as(a[p]).because('Modifier\'s value is boolean "true".')):(u(a,p)&&(s.push(a[p]),o.applies(e).modifier(t).as(a[p]).because("Wildcard class name for the modifier was found.")),u(a,c)&&(s.push(a[c]),o.applies(e).modifier(t).with(i).as(a[c]).because("Class was found for modifier + value pair."))),o.ignores(e).modifier(t).because("Class was not found for either wildcard modifier nor modifier + value pair.")):o.ignores(e).modifier(t).because("Modifier's value is either empty string, false or zero.")})),"block"===t&&"string"==typeof n.className&&""!==n.className?(s.push(n.className),o.applies(e).className(n.className).as(n.className).because("Raw className was passed as a property")):"elem"===t&&"string"==typeof n.elemClassName&&""!==n.elemClassName&&(s.push(n.elemClassName),o.applies(e).className(n.elemClassName).as(n.elemClassName).because("elemClassName was passed as a property")),s.join(" ")}function c(e,t,a){return function(n,i){void 0===n&&(n={}),void 0===i&&(i={});var s=new o.default({block:e,classNames:t,isEnabled:!0===i.debug}),r=p(e,"block",t,n,a,s);return s.thatsWhatWeHave(r),s.explain(),r?{className:r}:{}}}function f(e,t,a){return function(n,i,s){void 0===i&&(i={}),void 0===s&&(s={});var r="string"==typeof n?[n]:n,l=new o.default({block:e,elems:r,classNames:t,isEnabled:!0===s.debug}),u=r.reduce((function(n,o){return n.concat([p(""+e+a.elemPrefix+o,"elem",t,i,a,l)])}),[]).join(" ");return l.thatsWhatWeHave(u),l.explain(),u?{className:u}:{}}}t.default=function(e){return void 0===e&&(e={}),function(e){return function(t,a){return{block:c(t,a,e),elem:f(t,a,e)}}}(n({},e,{elemPrefix:s,modPrefix:r,valuePrefix:l}))}},"./bem/index.ts":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./bem/bem.ts");t.default=n.default},"./index.ts":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./bem/index.ts");t.default=n.default}})},"./src/utils/bem/bem.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{T:function(){return bem}});var _textkernel_bem__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@textkernel/bem/dist/bem.js"),bem=__webpack_require__.n(_textkernel_bem__WEBPACK_IMPORTED_MODULE_0__)()({elemPrefix:"__",modPrefix:"--",valuePrefix:"_"})},"./src/components/LoadingSpinner/LoadingSpinner.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{k:function(){return LoadingSpinner_LoadingSpinner}});var react=__webpack_require__("./node_modules/react/index.js"),bem=__webpack_require__("./src/utils/bem/bem.js"),Text=__webpack_require__("./src/components/Text/Text.tsx"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},_a=(0,bem.T)("LoadingSpinner",{LoadingSpinner:"LoadingSpinner--hQTC5fYgQN",LoadingSpinner__svg:"LoadingSpinner__svg--q61norawof",rotate:"rotate--TPwWOOzgMO",LoadingSpinner__path:"LoadingSpinner__path--I5LINeRUEX",dash:"dash--YqMrP2_3lL","LoadingSpinner__path--context_primary":"LoadingSpinner__path--context_primary--FEblssW1Tj","LoadingSpinner__path--context_secondary":"LoadingSpinner__path--context_secondary--g0R5HAg9jN","LoadingSpinner__path--context_critical":"LoadingSpinner__path--context_critical--dzz76mCviS","LoadingSpinner__path--context_inverted":"LoadingSpinner__path--context_inverted--YbfxL44cV3",LoadingSpinner__label:"LoadingSpinner__label--Q8ip9p9lnb","LoadingSpinner--centerIn_parent":"LoadingSpinner--centerIn_parent--ehxrilgTe3","LoadingSpinner--centerIn_viewport":"LoadingSpinner--centerIn_viewport--LteowmPGyJ","LoadingSpinner--hidden":"LoadingSpinner--hidden--d749MVvW0B"}),block=_a.block,elem=_a.elem,LoadingSpinner_LoadingSpinner=function LoadingSpinner(_a){var s,centerIn=_a.centerIn,children=_a.children,_b=_a.hidden,hidden=void 0!==_b&&_b,size=_a.size,context=_a.context,rest=__rest(_a,["centerIn","children","hidden","size","context"]);return react.createElement("div",__assign({},rest,block(__assign({hidden:hidden,centerIn:centerIn,context:context},rest)),{role:"status","aria-busy":!hidden,"aria-hidden":hidden}),react.createElement("svg",__assign({viewBox:[0,0,44,44],style:(s=size,s?{width:s,height:s}:null)},elem("svg",{hidden:hidden,centerIn:centerIn})),react.createElement("circle",__assign({cx:"22",cy:"22",r:"20",fill:"none",strokeWidth:"4"},elem("path",{context:context,hidden:hidden,centerIn:centerIn})))),!!children&&react.createElement(Text.E,__assign({inline:!0},elem("label")),children))};LoadingSpinner_LoadingSpinner.displayName="LoadingSpinner";try{LoadingSpinner_LoadingSpinner.displayName="LoadingSpinner",LoadingSpinner_LoadingSpinner.__docgenInfo={description:"",displayName:"LoadingSpinner",props:{centerIn:{defaultValue:null,description:"Center the spinner relative to parent element or viewport",name:"centerIn",required:!1,type:{name:"enum",value:[{value:'"parent"'},{value:'"viewport"'}]}},children:{defaultValue:null,description:"Loading text",name:"children",required:!1,type:{name:"ReactNode"}},hidden:{defaultValue:{value:"false"},description:"Hides the spinner when true",name:"hidden",required:!1,type:{name:"boolean"}},size:{defaultValue:null,description:"Custom spinner size (will affect both width and height)",name:"size",required:!1,type:{name:"number"}},context:{defaultValue:null,description:"Define the context, eg. primary, secondary, critical",name:"context",required:!1,type:{name:"enum",value:[{value:'"critical"'},{value:'"primary"'},{value:'"secondary"'},{value:'"inverted"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/LoadingSpinner/LoadingSpinner.tsx#LoadingSpinner"]={docgenInfo:LoadingSpinner_LoadingSpinner.__docgenInfo,name:"LoadingSpinner",path:"src/components/LoadingSpinner/LoadingSpinner.tsx#LoadingSpinner"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Text/Text.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{E:function(){return Text_Text}});var react=__webpack_require__("./node_modules/react/index.js"),bem=__webpack_require__("./src/utils/bem/bem.js"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},block=(0,bem.T)("Text",{"Text--size_small":"Text--size_small--JHIreS1Los OneUI-caption-text","Text--size_medium":"Text--size_medium--jW0YH6G5UN OneUI-label-text","Text--context_success":"Text--context_success--x0d2s1SOwT","Text--context_cautious":"Text--context_cautious--e9Mc9cc7h_","Text--context_critical":"Text--context_critical--BVh0fgdmxq","Text--context_brand":"Text--context_brand--nMk71eYhI7","Text--context_info":"Text--context_info--Ay5W13MTSV","Text--context_neutral":"Text--context_neutral--EH5mmevKfP","Text--isBold":"Text--isBold--XZdocb8ihg"}).block,Text_Text=react.forwardRef((function(_a,ref){var children=_a.children,_b=_a.context,context=void 0===_b?"default":_b,_c=_a.inline,inline=void 0!==_c&&_c,_d=_a.size,size=void 0===_d?"large":_d,_e=_a.isBold,isBold=void 0!==_e&&_e,rest=__rest(_a,["children","context","inline","size","isBold"]);if("number"!=typeof children&&!children)return null;var HtmlNodeType=inline?"span":"p";return react.createElement(HtmlNodeType,__assign({ref:ref},rest,block(__assign({context:context,size:size,isBold:isBold},rest))),children)}));Text_Text.displayName="Text";try{Text_Text.displayName="Text",Text_Text.__docgenInfo={description:"",displayName:"Text",props:{children:{defaultValue:null,description:"Text content",name:"children",required:!0,type:{name:"ReactNode"}},inline:{defaultValue:{value:"false"},description:"Text should be rendered inline",name:"inline",required:!1,type:{name:"boolean"}},context:{defaultValue:{value:"default"},description:"The context of the text, effecting its color (e.g. brand, info, critical, success etc. 'neutral' added as special context here)",name:"context",required:!1,type:{name:"enum",value:[{value:'"critical"'},{value:'"info"'},{value:'"success"'},{value:'"cautious"'},{value:'"neutral"'},{value:'"brand"'},{value:'"default"'}]}},size:{defaultValue:{value:"large"},description:"Custom text sizes",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},isBold:{defaultValue:{value:"false"},description:"for bold text",name:"isBold",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Text/Text.tsx#Text"]={docgenInfo:Text_Text.__docgenInfo,name:"Text",path:"src/components/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}}}]);