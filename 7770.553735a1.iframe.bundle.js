"use strict";(self.webpackChunk_textkernel_oneui=self.webpackChunk_textkernel_oneui||[]).push([[7770],{"./stories/molecules/DatePicker.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_DatePicker:function(){return _DatePicker},_DateRangePicker:function(){return _DateRangePicker},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return DatePicker_stories}});var react=__webpack_require__("./node_modules/react/index.js"),react_datepicker_min=__webpack_require__("./node_modules/react-datepicker/dist/react-datepicker.min.js"),react_datepicker_min_default=__webpack_require__.n(react_datepicker_min),index_esm=__webpack_require__("./node_modules/react-icons/im/index.esm.js"),bem=__webpack_require__("./src/utils/bem/bem.js"),Button=__webpack_require__("./src/components/Buttons/Button/Button.tsx"),Text=__webpack_require__("./src/components/Text/Text.tsx"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__spreadArray=function(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))},_a=(0,bem.T)("CalendarHeader",{CalendarHeader:"CalendarHeader--IshAAfi6cw",CalendarHeader__navButton:"CalendarHeader__navButton--yw0V1lAw_f",CalendarHeader__select:"CalendarHeader__select--OM5yAh1nD5"}),block=_a.block,elem=_a.elem,CalendarHeader_CalendarHeader=function CalendarHeader(_a){var _b=_a.locale,locale=void 0===_b?"en":_b,yearsRange=_a.yearsRange,date=_a.date,decreaseMonth=_a.decreaseMonth,prevMonthButtonDisabled=_a.prevMonthButtonDisabled,increaseMonth=_a.increaseMonth,nextMonthButtonDisabled=_a.nextMonthButtonDisabled,changeYear=_a.changeYear,monthName=new Intl.DateTimeFormat(locale,{month:"long"}).format(date),minYear=yearsRange[0],maxYear=yearsRange[1];if(maxYear<minYear)return console.error("CalendarHeader component has received invalid props.\n            Minimum selectable year (".concat(minYear,") is larger then maximum selectable year (").concat(maxYear,")")),null;var years=__spreadArray([],new Array(maxYear-minYear+1),!0).map((function(val,idx){return minYear+idx}));return react.createElement("div",__assign({},block()),react.createElement(Button.$,__assign({onClick:decreaseMonth,disabled:prevMonthButtonDisabled},elem("navButton")),react.createElement(index_esm.Ri5,null)),react.createElement("div",{role:"presentation"},react.createElement(Text.E,{inline:!0},monthName),react.createElement("select",__assign({},elem("select"),{value:date.getFullYear(),onChange:function onChange(_a){var value=_a.target.value;return changeYear(parseInt(value,10))}}),years.map((function(option){return react.createElement("option",{key:option,value:option},option)})))),react.createElement(Button.$,__assign({onClick:increaseMonth,disabled:nextMonthButtonDisabled},elem("navButton")),react.createElement(index_esm.EZ2,null)))};CalendarHeader_CalendarHeader.displayName="CalendarHeader";try{CalendarHeader_CalendarHeader.displayName="CalendarHeader",CalendarHeader_CalendarHeader.__docgenInfo={description:"",displayName:"CalendarHeader",props:{locale:{defaultValue:{value:"en"},description:"the locale in which the names of the month should be displayed. Format should match Intl definitions",name:"locale",required:!1,type:{name:"string"}},yearsRange:{defaultValue:null,description:"the min and max year selectable by the user",name:"yearsRange",required:!0,type:{name:"[number, number]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/DatePicker/CalendarHeader/CalendarHeader.tsx#CalendarHeader"]={docgenInfo:CalendarHeader_CalendarHeader.__docgenInfo,name:"CalendarHeader",path:"src/components/DatePicker/CalendarHeader/CalendarHeader.tsx#CalendarHeader"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/react-datepicker/dist/react-datepicker.css?external");var DatePicker_assign=function(){return DatePicker_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},DatePicker_assign.apply(this,arguments)},__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},DatePicker_DatePicker=function DatePicker(props){var children=props.children,minDate=props.minDate,maxDate=props.maxDate,locale=props.locale,rest=__rest(props,["children","minDate","maxDate","locale"]),currentYear=(new Date).getFullYear(),defaultMinDate=new Date;defaultMinDate.setFullYear(currentYear-100);var defaultMaxDate=new Date;defaultMaxDate.setFullYear(currentYear+100);var localeStr,minYear=(minDate||defaultMinDate).getFullYear(),maxYear=(maxDate||defaultMaxDate).getFullYear();return locale&&(localeStr="string"==typeof locale?locale:locale.code),react.createElement(react_datepicker_min_default(),DatePicker_assign({},rest,{showPopperArrow:!1,locale:locale,minDate:minDate||defaultMinDate,maxDate:maxDate||defaultMaxDate,renderCustomHeader:function renderCustomHeader(propsFromLib){return react.createElement(CalendarHeader_CalendarHeader,DatePicker_assign({},propsFromLib,{locale:localeStr,yearsRange:[minYear,maxYear]}))},autoComplete:"off"}),children)};DatePicker_DatePicker.displayName="DatePicker";try{DatePicker_DatePicker.displayName="DatePicker",DatePicker_DatePicker.__docgenInfo={description:"## Usage information\nThis component is a thin wrapper around [react-datepicker](https://github.com/Hacker0x01/react-datepicker/),\nonly setting the header element and add css.\n\nYou can pass [props](https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md) according to their definition.\nSee also [examples](https://reactdatepicker.com/) on their website.",displayName:"DatePicker",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/DatePicker/DatePicker.tsx#DatePicker"]={docgenInfo:DatePicker_DatePicker.__docgenInfo,name:"DatePicker",path:"src/components/DatePicker/DatePicker.tsx#DatePicker"})}catch(__react_docgen_typescript_loader_error){}var es=__webpack_require__("./node_modules/date-fns/esm/locale/es/index.js"),hu=__webpack_require__("./node_modules/date-fns/esm/locale/hu/index.js"),fr_CA=__webpack_require__("./node_modules/date-fns/esm/locale/fr-CA/index.js"),DATE_REGEX=/\d\d\d\d-\d\d-\d\d/,DatePicker_stories={title:"Molecules/DatePicker",component:DatePicker_DatePicker,argTypes:{minDateStr:{control:"text",description:"Min date in  yyyy-MM-dd"},maxDateStr:{control:"text",description:"Max date in  yyyy-MM-dd"},locale:{options:["en","es","hu","fr-CA"],control:{type:"select"},description:"Locale (see code example or lib docs for implementation details)"}}},_DatePicker={name:"DatePicker",args:{locale:"en",minDateStr:"",maxDateStr:""},render:function render(args){var minDate,maxDate,_a=react.useState(new Date),selected=_a[0],setSelected=_a[1];return args.minDateStr.match(DATE_REGEX)&&(minDate=new Date(args.minDateStr)),args.maxDateStr.match(DATE_REGEX)&&(maxDate=new Date(args.maxDateStr)),react.createElement(DatePicker_DatePicker,{onChange:function handleChange(date){setSelected(date),console.log("new date selected: ",date)},selected:selected,minDate:minDate,maxDate:maxDate,todayButton:react.createElement(Button.$,{variant:"ghost"},"Today"),locale:args.locale})}};(0,react_datepicker_min.registerLocale)("es",es.A),(0,react_datepicker_min.registerLocale)("hu",hu.A),(0,react_datepicker_min.registerLocale)("fr-CA",fr_CA.A);var _DateRangePicker={name:"DateRangePicker",args:{minDateStr:"",maxDateStr:""},render:function render(args){var minDate,maxDate,_a=react.useState(new Date),startDate=_a[0],setStartDate=_a[1],_b=react.useState(null),endDate=_b[0],setEndDate=_b[1];args.minDateStr.match(DATE_REGEX)&&(minDate=new Date(args.minDateStr)),args.maxDateStr.match(DATE_REGEX)&&(maxDate=new Date(args.maxDateStr));return react.createElement(react.Fragment,null,react.createElement(Text.E,null,"Start date:"),react.createElement(DatePicker_DatePicker,{id:"range-start",selected:startDate,onChange:function handleStartChange(date){var _a;setStartDate(date),endDate&&date>endDate&&setEndDate(null),null===(_a=document.getElementById("range-end"))||void 0===_a||_a.focus()},selectsStart:!0,startDate:startDate,endDate:endDate,minDate:minDate,maxDate:maxDate}),react.createElement(Text.E,null,"End date:"),react.createElement(DatePicker_DatePicker,{id:"range-end",selected:endDate,onChange:function handleEndChange(date){setEndDate(date)},selectsEnd:!0,startDate:startDate,endDate:endDate,minDate:startDate,maxDate:maxDate}))}};_DatePicker.parameters={..._DatePicker.parameters,docs:{..._DatePicker.parameters?.docs,source:{originalSource:"{\n  name: 'DatePicker',\n  args: {\n    locale: 'en',\n    minDateStr: '',\n    maxDateStr: ''\n  },\n  render: args => {\n    const [selected, setSelected] = React.useState(new Date());\n    const handleChange = (date: Date) => {\n      setSelected(date);\n      console.log('new date selected: ', date);\n    };\n    let minDate;\n    if (args.minDateStr.match(DATE_REGEX)) {\n      minDate = new Date(args.minDateStr);\n    }\n    let maxDate;\n    if (args.maxDateStr.match(DATE_REGEX)) {\n      maxDate = new Date(args.maxDateStr);\n    }\n\n    // @ts-ignore\n    return <DatePicker onChange={handleChange} selected={selected} minDate={minDate} maxDate={maxDate} todayButton={<Button variant=\"ghost\">Today</Button>} locale={args.locale} />;\n  }\n}",..._DatePicker.parameters?.docs?.source}}},_DateRangePicker.parameters={..._DateRangePicker.parameters,docs:{..._DateRangePicker.parameters?.docs,source:{originalSource:"{\n  name: 'DateRangePicker',\n  args: {\n    minDateStr: '',\n    maxDateStr: ''\n  },\n  render: args => {\n    const [startDate, setStartDate] = React.useState(new Date());\n    const [endDate, setEndDate] = React.useState<Date | null>(null);\n    let minDate;\n    if (args.minDateStr.match(DATE_REGEX)) {\n      minDate = new Date(args.minDateStr);\n    }\n    let maxDate;\n    if (args.maxDateStr.match(DATE_REGEX)) {\n      maxDate = new Date(args.maxDateStr);\n    }\n    const handleStartChange = (date: Date) => {\n      setStartDate(date);\n      if (endDate && date > endDate) {\n        setEndDate(null);\n      }\n      document.getElementById('range-end')?.focus();\n    };\n    const handleEndChange = (date: Date) => {\n      setEndDate(date);\n    };\n    return <>\n                <Text>Start date:</Text>\n                <DatePicker id=\"range-start\" selected={startDate} onChange={handleStartChange} selectsStart startDate={startDate} endDate={endDate} minDate={minDate} maxDate={maxDate} />\n                <Text>End date:</Text>\n                <DatePicker id=\"range-end\" selected={endDate} onChange={handleEndChange} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} maxDate={maxDate} />\n            </>;\n  }\n}",..._DateRangePicker.parameters?.docs?.source}}};const __namedExportsOrder=["_DatePicker","_DateRangePicker"]},"./src/utils/bem/bem.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{T:function(){return bem}});var _textkernel_bem__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@textkernel/bem/dist/bem.js"),bem=__webpack_require__.n(_textkernel_bem__WEBPACK_IMPORTED_MODULE_0__)()({elemPrefix:"__",modPrefix:"--",valuePrefix:"_"})},"./src/components/Buttons/Button/Button.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$:function(){return Button_Button}});var react=__webpack_require__("./node_modules/react/index.js"),bem=__webpack_require__("./src/utils/bem/bem.js"),mergeRefs=__webpack_require__("./src/utils/mergeRefs/mergeRefs.ts"),LoadingSpinner=__webpack_require__("./src/components/LoadingSpinner/LoadingSpinner.tsx"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},block=(0,bem.T)("Button",{Button:"Button--KJ3RnMQxyh OneUI-label-text-bold","Button--isLoading":"Button--isLoading--gT3TRxgCe1","Button--isBlock":"Button--isBlock--eEhaI2xWD4","Button--size_small":"Button--size_small--MpMHTzKh1s","Button--size_large":"Button--size_large--iZiS41fYRp","Button--context_primary":"Button--context_primary--B41Ltd6FsZ","Button--variant_filled":"Button--variant_filled--a2NjUz746y","Button--variant_outlined":"Button--variant_outlined--QxA0vP8faw","Button--variant_ghost":"Button--variant_ghost--YXnGULk9oJ","Button--context_secondary":"Button--context_secondary--_VfMhQzw2l","Button--context_critical":"Button--context_critical--rwg2JJJtgE",buttonLoading:"buttonLoading--lWnu_GCY3W"}).block,Button_Button=(0,react.forwardRef)((function(_a,ref){var children=_a.children,_b=_a.disabled,disabled=void 0!==_b&&_b,_c=_a.isBlock,isBlock=void 0!==_c&&_c,_d=_a.isLoading,isLoading=void 0!==_d&&_d,_e=_a.type,type=void 0===_e?"button":_e,href=_a.href,_f=_a.size,size=void 0===_f?"medium":_f,_g=_a.variant,variant=void 0===_g?"filled":_g,_h=_a.context,context=void 0===_h?"secondary":_h,rest=__rest(_a,["children","disabled","isBlock","isLoading","type","href","size","variant","context"]),buttonRef=react.useRef(),_j=react.useState(),buttonWidth=_j[0],setButtonWidth=_j[1];return buttonRef.current&&isLoading&&!buttonWidth&&setButtonWidth(buttonRef.current.offsetWidth),!isLoading&&buttonWidth&&setButtonWidth(void 0),"number"==typeof children||children?href?react.createElement("a",__assign({},rest,block(__assign({isBlock:isBlock,isLoading:isLoading,size:size,variant:variant,context:context},rest)),{ref:(0,mergeRefs.P)([ref,buttonRef]),href:href,style:{width:buttonWidth?"".concat(buttonWidth,"px"):void 0}}),isLoading?react.createElement(LoadingSpinner.k,{size:16,context:"filled"===variant?"inverted":context}):children):react.createElement("button",__assign({},rest,block(__assign({isBlock:isBlock,isLoading:isLoading,size:size,variant:variant,context:context},rest)),{ref:(0,mergeRefs.P)([ref,buttonRef]),type:type,style:{width:buttonWidth?"".concat(buttonWidth,"px"):void 0},disabled:disabled||isLoading}),isLoading?react.createElement(LoadingSpinner.k,{size:16,context:"filled"===variant?"inverted":context}):children):null}));Button_Button.displayName="Button";try{Button_Button.displayName="Button",Button_Button.__docgenInfo={description:"",displayName:"Button",props:{children:{defaultValue:null,description:"The label of the button",name:"children",required:!0,type:{name:"ReactNode"}},context:{defaultValue:{value:"secondary"},description:"Define the button context, eg. primary, secondary, critical",name:"context",required:!1,type:{name:"enum",value:[{value:'"critical"'},{value:'"primary"'},{value:'"secondary"'}]}},size:{defaultValue:{value:"medium"},description:"The size of the button",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},isBlock:{defaultValue:{value:"false"},description:"Whether or not to show block-level button (full width)",name:"isBlock",required:!1,type:{name:"boolean"}},isLoading:{defaultValue:{value:"false"},description:"Whether or not to show the button in loading state",name:"isLoading",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"Should button be disabled or not",name:"disabled",required:!1,type:{name:"boolean"}},type:{defaultValue:{value:"button"},description:"Type of the button",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},href:{defaultValue:null,description:"Providing a href will render an <a> element, styled as a button.",name:"href",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"filled"},description:"Define the button variant, eg. filled, outlined",name:"variant",required:!1,type:{name:"enum",value:[{value:'"filled"'},{value:'"outlined"'},{value:'"ghost"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Buttons/Button/Button.tsx#Button"]={docgenInfo:Button_Button.__docgenInfo,name:"Button",path:"src/components/Buttons/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/LoadingSpinner/LoadingSpinner.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{k:function(){return LoadingSpinner_LoadingSpinner}});var react=__webpack_require__("./node_modules/react/index.js"),bem=__webpack_require__("./src/utils/bem/bem.js"),Text=__webpack_require__("./src/components/Text/Text.tsx"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},_a=(0,bem.T)("LoadingSpinner",{LoadingSpinner:"LoadingSpinner--hQTC5fYgQN",LoadingSpinner__svg:"LoadingSpinner__svg--q61norawof",rotate:"rotate--TPwWOOzgMO",LoadingSpinner__path:"LoadingSpinner__path--I5LINeRUEX",dash:"dash--YqMrP2_3lL","LoadingSpinner__path--context_primary":"LoadingSpinner__path--context_primary--FEblssW1Tj","LoadingSpinner__path--context_secondary":"LoadingSpinner__path--context_secondary--g0R5HAg9jN","LoadingSpinner__path--context_critical":"LoadingSpinner__path--context_critical--dzz76mCviS","LoadingSpinner__path--context_inverted":"LoadingSpinner__path--context_inverted--YbfxL44cV3",LoadingSpinner__label:"LoadingSpinner__label--Q8ip9p9lnb","LoadingSpinner--centerIn_parent":"LoadingSpinner--centerIn_parent--ehxrilgTe3","LoadingSpinner--centerIn_viewport":"LoadingSpinner--centerIn_viewport--LteowmPGyJ","LoadingSpinner--hidden":"LoadingSpinner--hidden--d749MVvW0B"}),block=_a.block,elem=_a.elem,LoadingSpinner_LoadingSpinner=function LoadingSpinner(_a){var s,centerIn=_a.centerIn,children=_a.children,_b=_a.hidden,hidden=void 0!==_b&&_b,size=_a.size,context=_a.context,rest=__rest(_a,["centerIn","children","hidden","size","context"]);return react.createElement("div",__assign({},rest,block(__assign({hidden:hidden,centerIn:centerIn,context:context},rest)),{role:"status","aria-busy":!hidden,"aria-hidden":hidden}),react.createElement("svg",__assign({viewBox:[0,0,44,44],style:(s=size,s?{width:s,height:s}:null)},elem("svg",{hidden:hidden,centerIn:centerIn})),react.createElement("circle",__assign({cx:"22",cy:"22",r:"20",fill:"none",strokeWidth:"4"},elem("path",{context:context,hidden:hidden,centerIn:centerIn})))),!!children&&react.createElement(Text.E,__assign({inline:!0},elem("label")),children))};LoadingSpinner_LoadingSpinner.displayName="LoadingSpinner";try{LoadingSpinner_LoadingSpinner.displayName="LoadingSpinner",LoadingSpinner_LoadingSpinner.__docgenInfo={description:"",displayName:"LoadingSpinner",props:{centerIn:{defaultValue:null,description:"Center the spinner relative to parent element or viewport",name:"centerIn",required:!1,type:{name:"enum",value:[{value:'"parent"'},{value:'"viewport"'}]}},children:{defaultValue:null,description:"Loading text",name:"children",required:!1,type:{name:"ReactNode"}},hidden:{defaultValue:{value:"false"},description:"Hides the spinner when true",name:"hidden",required:!1,type:{name:"boolean"}},size:{defaultValue:null,description:"Custom spinner size (will affect both width and height)",name:"size",required:!1,type:{name:"number"}},context:{defaultValue:null,description:"Define the context, eg. primary, secondary, critical",name:"context",required:!1,type:{name:"enum",value:[{value:'"critical"'},{value:'"primary"'},{value:'"secondary"'},{value:'"inverted"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/LoadingSpinner/LoadingSpinner.tsx#LoadingSpinner"]={docgenInfo:LoadingSpinner_LoadingSpinner.__docgenInfo,name:"LoadingSpinner",path:"src/components/LoadingSpinner/LoadingSpinner.tsx#LoadingSpinner"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Text/Text.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{E:function(){return Text_Text}});var react=__webpack_require__("./node_modules/react/index.js"),bem=__webpack_require__("./src/utils/bem/bem.js"),__assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},block=(0,bem.T)("Text",{"Text--size_small":"Text--size_small--JHIreS1Los OneUI-caption-text","Text--size_medium":"Text--size_medium--jW0YH6G5UN OneUI-label-text","Text--context_success":"Text--context_success--x0d2s1SOwT","Text--context_cautious":"Text--context_cautious--e9Mc9cc7h_","Text--context_critical":"Text--context_critical--BVh0fgdmxq","Text--context_brand":"Text--context_brand--nMk71eYhI7","Text--context_info":"Text--context_info--Ay5W13MTSV","Text--context_neutral":"Text--context_neutral--EH5mmevKfP","Text--isBold":"Text--isBold--XZdocb8ihg"}).block,Text_Text=react.forwardRef((function(_a,ref){var children=_a.children,_b=_a.context,context=void 0===_b?"default":_b,_c=_a.inline,inline=void 0!==_c&&_c,_d=_a.size,size=void 0===_d?"large":_d,_e=_a.isBold,isBold=void 0!==_e&&_e,rest=__rest(_a,["children","context","inline","size","isBold"]);if("number"!=typeof children&&!children)return null;var HtmlNodeType=inline?"span":"p";return react.createElement(HtmlNodeType,__assign({ref:ref},rest,block(__assign({context:context,size:size,isBold:isBold},rest))),children)}));Text_Text.displayName="Text";try{Text_Text.displayName="Text",Text_Text.__docgenInfo={description:"",displayName:"Text",props:{children:{defaultValue:null,description:"Text content",name:"children",required:!0,type:{name:"ReactNode"}},inline:{defaultValue:{value:"false"},description:"Text should be rendered inline",name:"inline",required:!1,type:{name:"boolean"}},context:{defaultValue:{value:"default"},description:"The context of the text, effecting its color (e.g. brand, info, critical, success etc. 'neutral' added as special context here)",name:"context",required:!1,type:{name:"enum",value:[{value:'"critical"'},{value:'"info"'},{value:'"success"'},{value:'"cautious"'},{value:'"neutral"'},{value:'"brand"'},{value:'"default"'}]}},size:{defaultValue:{value:"large"},description:"Custom text sizes",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},isBold:{defaultValue:{value:"false"},description:"for bold text",name:"isBold",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Text/Text.tsx#Text"]={docgenInfo:Text_Text.__docgenInfo,name:"Text",path:"src/components/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/mergeRefs/mergeRefs.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function mergeRefs(refs){return function(node){refs.forEach((function(ref){ref&&("function"==typeof ref&&ref(node),"object"===_typeof(ref)&&(ref.current=node))}))}}__webpack_require__.d(__webpack_exports__,{P:function(){return mergeRefs}})}}]);