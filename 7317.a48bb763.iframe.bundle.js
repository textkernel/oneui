(self.webpackChunk_textkernel_oneui=self.webpackChunk_textkernel_oneui||[]).push([[7317],{"./stories/atoms/Tabs.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FullImplement:function(){return FullImplement},_TabBar:function(){return _TabBar},_TabItem:function(){return _TabItem},__namedExportsOrder:function(){return __namedExportsOrder}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_textkernel_oneui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Tabs/TabsBar/TabsBar.tsx"),_textkernel_oneui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Tabs/TabItem/TabItem.tsx"),_textkernel_oneui__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/Tooltip/Tooltip.tsx"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},meta={title:"Atoms/Tabs",component:_textkernel_oneui__WEBPACK_IMPORTED_MODULE_1__.U,subcomponents:{TabItem:_textkernel_oneui__WEBPACK_IMPORTED_MODULE_2__.V}};__webpack_exports__.default=meta;var _TabBar={name:"Props in TabsBar",args:{activeTabId:1,isBlock:!1},argTypes:{activeTabId:{options:[1,2,3]}},render:function render(args){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,'In this story you can see how different props effect the state of the whole tab bar. However no additional logic is implemented and so the tabs will not "work" as expected in a real scenario.'),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_1__.U,__assign({},args),[1,2,3].map((function(tab){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_2__.V,{tabId:tab,key:tab},"".concat(tab,". tab"))}))))}},_TabItem={name:"Props in items",args:{tabId:"my-tab",isActive:!1,children:"My tab",disabled:!1},render:function render(args){var initActive=[!0,!1,!1];return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,'In this story you can see how different props effect the state of the first tab, how keyboard and mouse interactions effect the look and feel of the tabs. However no additional logic is implemented and so the tabs will not "work" as expected in a real scenario.'),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_1__.U,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_2__.V,__assign({key:"my-tab"},args)),[1,2,3].map((function(tab,i){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_2__.V,{tabId:tab,key:tab,isActive:initActive[i]},"".concat(tab,". tab"))})))))}},FullImplement={name:"Example implementation",args:{isBlock:!1,tabId:"t1",children:"Simple tab"},render:function render(args){var _a=react__WEBPACK_IMPORTED_MODULE_0__.useState("t1"),activeId=_a[0],setActiveId=_a[1];return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_1__.U,{activeTabId:activeId,onSelect:function handleSelect(tabId){console.log("TabItem with tabId: '".concat(tabId,"' was clicked")),setActiveId(tabId)},isBlock:args.isBlock},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_2__.V,__assign({key:1},args)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_2__.V,{tabId:"t2",key:2},"Tab with styled count",react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{style:{color:"grey",fontWeight:400}}," (2)")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_2__.V,{tabId:"t3",key:3},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_3__.m,{content:"some additional information",placement:"top"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",null,"Tab with Tooltip"))),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_textkernel_oneui__WEBPACK_IMPORTED_MODULE_2__.V,{tabId:"t4",key:4,disabled:!0},"Disabled tab"))}};_TabBar.parameters={..._TabBar.parameters,docs:{..._TabBar.parameters?.docs,source:{originalSource:"{\n  name: 'Props in TabsBar',\n  args: {\n    activeTabId: 1,\n    isBlock: false\n  },\n  argTypes: {\n    activeTabId: {\n      options: [1, 2, 3]\n    }\n  },\n  render: args => {\n    const tabs = [1, 2, 3];\n    return <>\n                <p>\n                    In this story you can see how different props effect the state of the whole tab\n                    bar. However no additional logic is implemented and so the tabs will not\n                    &quot;work&quot; as expected in a real scenario.\n                </p>\n                <TabsBar {...args}>\n                    {tabs.map(tab => <TabItem tabId={tab} key={tab}>\n                            {`${tab}. tab`}\n                        </TabItem>)}\n                </TabsBar>\n            </>;\n  }\n}",..._TabBar.parameters?.docs?.source}}},_TabItem.parameters={..._TabItem.parameters,docs:{..._TabItem.parameters?.docs,source:{originalSource:"{\n  name: 'Props in items',\n  args: {\n    tabId: 'my-tab',\n    isActive: false,\n    children: 'My tab',\n    disabled: false\n  },\n  render: args => {\n    const tabs = [1, 2, 3];\n    const initActive = [true, false, false];\n    return <>\n                <p>\n                    In this story you can see how different props effect the state of the first tab,\n                    how keyboard and mouse interactions effect the look and feel of the tabs.\n                    However no additional logic is implemented and so the tabs will not\n                    &quot;work&quot; as expected in a real scenario.\n                </p>\n                <TabsBar>\n                    <>\n                        <TabItem key=\"my-tab\" {...args} />\n                        {tabs.map((tab, i) => <TabItem tabId={tab} key={tab} isActive={initActive[i]}>\n                                {`${tab}. tab`}\n                            </TabItem>)}\n                    </>\n                </TabsBar>\n            </>;\n  }\n}",..._TabItem.parameters?.docs?.source}}},FullImplement.parameters={...FullImplement.parameters,docs:{...FullImplement.parameters?.docs,source:{originalSource:"{\n  name: 'Example implementation',\n  args: {\n    isBlock: false,\n    tabId: 't1',\n    children: 'Simple tab'\n  },\n  render: args => {\n    type Tabs = 't1' | 't2' | 't3';\n    // eslint-disable-next-line react-hooks/rules-of-hooks\n    const [activeId, setActiveId] = React.useState<Tabs>('t1');\n    const handleSelect = (tabId: Tabs) => {\n      console.log(`TabItem with tabId: '${tabId}' was clicked`);\n      setActiveId(tabId);\n    };\n    return <TabsBar<Tabs> activeTabId={activeId} onSelect={handleSelect} isBlock={args.isBlock}>\n                <TabItem key={1} {...args} />\n                <TabItem tabId=\"t2\" key={2}>\n                    Tab with styled count\n                    <span style={{\n          color: 'grey',\n          fontWeight: 400\n        }}> (2)</span>\n                </TabItem>\n                <TabItem tabId=\"t3\" key={3}>\n                    <Tooltip content=\"some additional information\" placement=\"top\">\n                        <div>Tab with Tooltip</div>\n                    </Tooltip>\n                </TabItem>\n                <TabItem tabId=\"t4\" key={4} disabled>\n                    Disabled tab\n                </TabItem>\n            </TabsBar>;\n  }\n}",...FullImplement.parameters?.docs?.source}}};const __namedExportsOrder=["_TabBar","_TabItem","FullImplement"]},"./node_modules/@textkernel/bem/dist/bem.js":function(module){window,module.exports=function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}return a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s="./index.ts")}({"./BemMagicExplained/ActionExplanation.ts":function(e,t,a){"use strict";var n,i;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.applied=0]="applied",e[e.ignored=1]="ignored"}(n||(n={})),function(e){e.baseName="baseName",e.modifier="modifier",e.className="className"}(i||(i={}));var o=function(){function e(e,t){this.context=e,this.action=t,this.typeOfWhat=i.baseName}return e.prototype.modifier=function(e){return this.what=e,this.typeOfWhat=i.modifier,this},e.prototype.className=function(e){return this.what=e,this.typeOfWhat=i.className,this},e.prototype.with=function(e){return this.value=e,this},e.prototype.as=function(e){return this.resultingClassName=e,this},e.prototype.because=function(e){return this.reason=e,this},Object.defineProperty(e.prototype,"contextSummary",{get:function(){return this.context},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"actionSummary",{get:function(){return this.action===n.applied?this.getActionAppliedSummary():this.getActionIgnoredSummary()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"reasonSummary",{get:function(){return this.reason?this.reason:"reason was not specified."},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"resultSummary",{get:function(){return this.resultingClassName?this.resultingClassName:"resulting class name was not specified."},enumerable:!0,configurable:!0}),e.prototype.getActionAppliedSummary=function(){var e="";switch(this.typeOfWhat){case i.baseName:e='Base block/elem name "'+this.context+'" was applied.';break;case i.modifier:e=void 0!==this.value?'Modifier "'+this.what+'" was applied with value "'+this.value+'".':'Modifier "'+this.what+'" was applied with no value.';break;case i.className:e='Class "'+this.what+'" was applied.';break;default:throw new Error('ActionExplanation#typeOfWhat has unexpected value "'+this.typeOfWhat+'".')}return e},e.prototype.getActionIgnoredSummary=function(){var e="";switch(this.typeOfWhat){case i.baseName:e='Base block/elem name "'+this.what+'" was ignored.';break;case i.modifier:e=void 0!==this.value?'Modifier "'+this.what+'" with value "'+this.value+'" was ignored.':'Modifier "'+this.what+'" was ignored.';break;case i.className:e='Class "'+this.what+'" was ignored.';break;default:throw new Error('ActionExplanation#typeOfWhat has unexpected value "'+this.typeOfWhat+'".')}return e},e.action=n,e}();t.default=o},"./BemMagicExplained/BemMagicExplained.ts":function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(a("./BemMagicExplained/ActionExplanation.ts")),o=function(){function e(e){var t=e.block,a=e.elems,n=void 0===a?[]:a,i=e.classNames,o=e.isEnabled;this.explanationsApplied=[],this.explanationsIgnored=[],this.result="",this.block=t,this.elems=n,this.classNames=i,this.isEnabled=o}return e.prototype.applies=function(e){var t=new i.default(e,i.default.action.applied);return this.explanationsApplied.push(t),t},e.prototype.ignores=function(e){var t=new i.default(e,i.default.action.ignored);return this.explanationsIgnored.push(t),t},e.prototype.thatsWhatWeHave=function(e){this.result=e},e.prototype.explain=function(){if(!1!==this.isEnabled){var t="";if(this.elems.length>0){var a=e.stringifyArrayOfStrings(this.elems);t='BEM magic explained for block: "'+this.block+'", elem(s): '+a}else t='BEM magic explained for block: "'+this.block+'"';this.groupTogether(t,this.printClassNamesInfo,this.printAppliedExplanations,this.printIgnoredExplanations,this.printOutput)}},e.prototype.printClassNamesInfo=function(){console.groupCollapsed(),console.log("Class names lookup table:"),console.table(this.classNames),console.groupEnd()},e.prototype.groupTogether=function(e){for(var t=this,a=[],n=1;n<arguments.length;n++)a[n-1]=arguments[n];console.group(e),a.forEach((function(e){return e.call(t)})),console.groupEnd()},e.prototype.printAppliedExplanations=function(){if(this.explanationsApplied.length>0){console.log("Applied:");var e=this.explanationsApplied.map((function(e){return{"Block or element":e.contextSummary,"What happened":e.actionSummary,"Why?":e.reasonSummary,"Class name":e.resultSummary}}));console.table(e)}else console.log("Nothing was applied")},e.prototype.printIgnoredExplanations=function(){if(this.explanationsIgnored.length>0){console.log("Ignored:");var e=this.explanationsIgnored.map((function(e){return{"Block or element":e.contextSummary,"What happened":e.actionSummary,"Why?":e.reasonSummary}}));console.table(e)}else console.log("Nothing was ignored")},e.prototype.printOutput=function(){this.result&&(console.log("After all, the following class names were applied:"),console.table(this.result.split(" ")))},e.stringifyArrayOfStrings=function(e){return 0===e.length?"":e.map((function(e){return'"'+e+'"'})).join(", ")},e}();t.default=o},"./BemMagicExplained/index.ts":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./BemMagicExplained/BemMagicExplained.ts");t.default=n.default},"./bem/bem.ts":function(e,t,a){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var i in t=arguments[a])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=i(a("./BemMagicExplained/index.ts")),s="__",r="--",l="_";function u(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function p(e,t,a,n,i,o){var s=[],r=i.modPrefix,l=i.valuePrefix;return u(a,e)?(o.applies(e).as(a[e]).because("Base name class was found."),s.push(a[e])):o.ignores(e).because("Base name class was not found."),Object.keys(n).filter((function(t){if("className"===t)return!1;var a=typeof n[t],i="string"===a||"number"===a||"boolean"===a;return!1===i&&o.ignores(e).modifier(t).because("Modifier's value is not of a string, number or boolean type."),i})).forEach((function(t){var i=n[t],p=""+e+r+t,c=""+e+r+t+l+i;!1!==i&&""!==i&&0!==i?(!0===i&&u(a,p)?(s.push(a[p]),o.applies(e).modifier(t).with(i).as(a[p]).because('Modifier\'s value is boolean "true".')):(u(a,p)&&(s.push(a[p]),o.applies(e).modifier(t).as(a[p]).because("Wildcard class name for the modifier was found.")),u(a,c)&&(s.push(a[c]),o.applies(e).modifier(t).with(i).as(a[c]).because("Class was found for modifier + value pair."))),o.ignores(e).modifier(t).because("Class was not found for either wildcard modifier nor modifier + value pair.")):o.ignores(e).modifier(t).because("Modifier's value is either empty string, false or zero.")})),"block"===t&&"string"==typeof n.className&&""!==n.className?(s.push(n.className),o.applies(e).className(n.className).as(n.className).because("Raw className was passed as a property")):"elem"===t&&"string"==typeof n.elemClassName&&""!==n.elemClassName&&(s.push(n.elemClassName),o.applies(e).className(n.elemClassName).as(n.elemClassName).because("elemClassName was passed as a property")),s.join(" ")}function c(e,t,a){return function(n,i){void 0===n&&(n={}),void 0===i&&(i={});var s=new o.default({block:e,classNames:t,isEnabled:!0===i.debug}),r=p(e,"block",t,n,a,s);return s.thatsWhatWeHave(r),s.explain(),r?{className:r}:{}}}function f(e,t,a){return function(n,i,s){void 0===i&&(i={}),void 0===s&&(s={});var r="string"==typeof n?[n]:n,l=new o.default({block:e,elems:r,classNames:t,isEnabled:!0===s.debug}),u=r.reduce((function(n,o){return n.concat([p(""+e+a.elemPrefix+o,"elem",t,i,a,l)])}),[]).join(" ");return l.thatsWhatWeHave(u),l.explain(),u?{className:u}:{}}}t.default=function(e){return void 0===e&&(e={}),function(e){return function(t,a){return{block:c(t,a,e),elem:f(t,a,e)}}}(n({},e,{elemPrefix:s,modPrefix:r,valuePrefix:l}))}},"./bem/index.ts":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./bem/bem.ts");t.default=n.default},"./index.ts":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("./bem/index.ts");t.default=n.default}})},"./src/utils/bem/bem.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{T:function(){return bem}});var _textkernel_bem__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@textkernel/bem/dist/bem.js"),bem=__webpack_require__.n(_textkernel_bem__WEBPACK_IMPORTED_MODULE_0__)()({elemPrefix:"__",modPrefix:"--",valuePrefix:"_"})},"./src/components/Tabs/TabItem/TabItem.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{V:function(){return TabItem_TabItem}});var react=__webpack_require__("./node_modules/react/index.js"),bem=__webpack_require__("./src/utils/bem/bem.js"),keyboard=__webpack_require__("./src/constants/keyboard.ts"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},block=(0,bem.T)("TabItem",{TabItem:"TabItem--QRJG2jg3BN","TabItem--isActive":"TabItem--isActive--MxH0ElWoru","TabItem--disabled":"TabItem--disabled--pvqBMhMuDO","TabItem--isBlock":"TabItem--isBlock--rG3BZuBD2S"}).block;function TabItem_TabItem(_a){var tabId=_a.tabId,_b=_a.isActive,isActive=void 0!==_b&&_b,onSelect=_a.onSelect,_c=_a.disabled,disabled=void 0!==_c&&_c,_d=_a.isBlock,isBlock=void 0!==_d&&_d,children=_a.children,rest=__rest(_a,["tabId","isActive","onSelect","disabled","isBlock","children"]),handleClick=function handleClick(){isActive||disabled||!onSelect||onSelect(tabId)};return react.createElement("div",__assign({tabIndex:0},rest,block(__assign({isActive:isActive,isBlock:isBlock,disabled:disabled},rest)),{role:"tab","aria-selected":isActive,"aria-disabled":disabled,onClick:handleClick,onKeyDown:function handleKeyDown(e){e.key===keyboard.jD&&handleClick()}}),children)}TabItem_TabItem.displayName="TabItem";try{TabItem_TabItem.displayName="TabItem",TabItem_TabItem.__docgenInfo={description:"",displayName:"TabItem",props:{tabId:{defaultValue:null,description:"Id of this tab",name:"tabId",required:!0,type:{name:"T"}},isActive:{defaultValue:{value:"false"},description:"Renders an active tab. This prop will be set by TabsBar if activeTabId is defined there",name:"isActive",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"Disabled tab item",name:"disabled",required:!1,type:{name:"boolean"}},onSelect:{defaultValue:null,description:"A callback  when the tab is clicked. It will not be called for active or disabled tabs. This prop will be set by TabsBar if onSelect is defined there",name:"onSelect",required:!1,type:{name:"((tabId: T) => void)"}},children:{defaultValue:null,description:"Label of the tab. Expected to be a string like node. E.g. `label` or `label <span>(3)</span>`",name:"children",required:!0,type:{name:"ReactNode"}},isBlock:{defaultValue:{value:"false"},description:"used for styling when TabsBar is full width. Will be set by TabsBar, no need to set manually",name:"isBlock",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Tabs/TabItem/TabItem.tsx#TabItem"]={docgenInfo:TabItem_TabItem.__docgenInfo,name:"TabItem",path:"src/components/Tabs/TabItem/TabItem.tsx#TabItem"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Tabs/TabsBar/TabsBar.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{U:function(){return TabsBar_TabsBar}});var react=__webpack_require__("./node_modules/react/index.js"),bem=__webpack_require__("./src/utils/bem/bem.js"),TabItem=__webpack_require__("./src/components/Tabs/TabItem/TabItem.tsx"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},block=(0,bem.T)("TabsBar",{TabsBar:"TabsBar--obrukUL76S","TabsBar--isBlock":"TabsBar--isBlock--jSsErQTaxH"}).block;function TabsBar_TabsBar(_a){var _b=_a.activeTabId,activeTabId=void 0===_b?void 0:_b,children=_a.children,_c=_a.onSelect,onSelect=void 0===_c?void 0:_c,_d=_a.isBlock,isBlock=void 0!==_d&&_d,rest=__rest(_a,["activeTabId","children","onSelect","isBlock"]);return react.createElement("div",__assign({},rest,block(__assign({isBlock:isBlock},rest)),{role:"tablist"}),activeTabId||onSelect||isBlock?react.Children.map(children,(function(tab){return function extendWithProps(tab){if(react.isValidElement(tab)&&tab.type===TabItem.V){var tabId=tab.props.tabId,extendProps={isBlock:isBlock};return activeTabId&&(extendProps.isActive=tabId===activeTabId),onSelect&&(extendProps.onSelect=onSelect),react.cloneElement(tab,extendProps)}return tab}(tab)})):children)}TabsBar_TabsBar.displayName="TabsBar";try{TabsBar_TabsBar.displayName="TabsBar",TabsBar_TabsBar.__docgenInfo={description:"Tabs organize related content, enabling users to switch between different groups of\ninformation within the same context.\n\n## Usage\n\nTabs group different yet related content, allowing users to navigate views without\nleaving the page. They can be used in full-page layouts or within components such as modals,\ncards, or side panels.\n\nTo minimize cognitive load, use tabs to categorize related information. Tabs can organize content\nlike forms, settings, and dashboards, ensuring users don't have to leave their workflow\nto complete tasks.\n\n## Anatomy\n\nThe tab component has two distinct zones: selected and unselected. One tab is always selected by default.\n\n`image to be inserted`\n\n## Auto-width\n\nEach tab varies in size based on the label's character count but maintains consistent padding\non each side of the label. The first label, selected by default, should align with the grid.\nThe endpoint of the tabs may vary and might not align with the grid. Use a line to help balance\nthe tabs with other components on the page if necessary.\n\n`image to be inserted`\n\n## Main elements\n\n### Labels\n\nUse short, clear, and specific tab labels. Labels should be one to two words for easier scanning.\nText labels should clearly communicate the view users will see and the content contained in the view.\n\n### States\n\nTabs have two main states: active and inactive. Other interactive states include hover, focus,\nand disabled. By default, one tab is preselected, typically the first tab. Only one tab can be\nselected at a time. When a new tab is chosen, the previous tab is automatically deselected. If a\nuser navigates away from a tab, it remains selected until the user changes it.\n\n| State | #### When to use |\n| ---------- | ---------------- |\n| Inactive | The previously active tab becomes inactive when the user navigates to another tab. |\n| Focus | When a user clicks on the tab or navigates using the keyboard with the left and right arrows, it becomes focused, indicating successful navigation to the component. |\n| Hover | When a user hovers over a tab with the mouse cursor to interact with it. |\n| Active | The tab is active when a user clicks or uses the arrow keys. |\n| Disabled | When a user cannot interact with the tab due to permissions, dependencies, or prerequisites, it enters a disabled state. This state removes all interactivity from the component. The styling of disabled tabs is not subject to WCAG contrast compliance. |",displayName:"TabsBar",props:{activeTabId:{defaultValue:{value:"undefined"},description:"Id of currently active tab. This will overwrite isActive on the children",name:"activeTabId",required:!1,type:{name:"T"}},children:{defaultValue:null,description:"The tabs",name:"children",required:!0,type:{name:"ReactElement<Props<T>, string | JSXElementConstructor<any>> | (EmptyElement | ReactElement<Props<T>, string | JSXElementConstructor<...>>)[]"}},onSelect:{defaultValue:{value:"undefined"},description:"Callback function, fired when switching tabs by clicking. This will overwrite onSelect on children, if defined",name:"onSelect",required:!1,type:{name:"((selectedTabId: T) => void)"}},isBlock:{defaultValue:{value:"false"},description:"to render the tabs so they cover the full width of the available space",name:"isBlock",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Tabs/TabsBar/TabsBar.tsx#TabsBar"]={docgenInfo:TabsBar_TabsBar.__docgenInfo,name:"TabsBar",path:"src/components/Tabs/TabsBar/TabsBar.tsx#TabsBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Tooltip/Tooltip.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{m:function(){return Tooltip}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_tippyjs_react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@tippyjs/react/dist/tippy-react.esm.js"),__assign=(__webpack_require__("./node_modules/tippy.js/animations/shift-toward.css?external"),__webpack_require__("./node_modules/tippy.js/dist/tippy.css?external"),function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)}),__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},Tooltip=function Tooltip(_a){var content=_a.content,children=_a.children,disabled=_a.disabled,rest=__rest(_a,["content","children","disabled"]),isDisabled=disabled;return void 0!==disabled||content||(isDisabled=!0),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_tippyjs_react__WEBPACK_IMPORTED_MODULE_3__.Ay,__assign({content:content,disabled:isDisabled,maxWidth:320,arrow:!1},rest),children)};Tooltip.displayName="Tooltip";try{Tooltip.displayName="Tooltip",Tooltip.__docgenInfo={description:"## Usage information\nThis component is a wrapper around [tippy.js/react](https://github.com/atomiks/tippy.js-react#-usage).\n\n* You can pass other props according to their definition, apart from the one listed below.\n* Full list of props available can be found [here](https://atomiks.github.io/tippyjs/all-props/).\n* When using a [React component as children](https://github.com/atomiks/tippyjs-react#component-children), make sure it supports forward ref",displayName:"Tooltip",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Tooltip/Tooltip.tsx#Tooltip"]={docgenInfo:Tooltip.__docgenInfo,name:"Tooltip",path:"src/components/Tooltip/Tooltip.tsx#Tooltip"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/keyboard.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{aH:function(){return ESCAPE_KEY},jD:function(){return ENTER_KEY},oJ:function(){return BACKSPACE_KEY}});var ENTER_KEY="Enter",BACKSPACE_KEY="Backspace",ESCAPE_KEY="Escape"}}]);