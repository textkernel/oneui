"use strict";(self.webpackChunk_textkernel_oneui=self.webpackChunk_textkernel_oneui||[]).push([[2048,9527],{"./stories/atoms/PopupBase.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_PopupBase:function(){return _PopupBase},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return PopupBase_stories}});var react=__webpack_require__("./node_modules/react/index.js"),PopupBase=__webpack_require__("./src/components/PopupBase/PopupBase.tsx"),Button=__webpack_require__("./src/components/Buttons/Button/Button.tsx"),PopoverDummy=react.forwardRef((function(_a,ref){var setPopupVisibility=_a.setPopupVisibility;return react.createElement("div",{style:{backgroundColor:"#FFEEDD",padding:"10px",borderRadius:"5px",border:"1px solid #CCC",boxShadow:"0 3px 6px 6px rgba(0, 0, 0, 0.05)",fontSize:"14px"},ref:ref,role:"group"},react.createElement("p",null,"I am the content of pop up."),react.createElement("p",null,"Can be a form or anything."),react.createElement(Button.$,{onClick:function onClick(){return setPopupVisibility(!1)}},"Close me!"))}));PopoverDummy.displayName="Popover";try{PopoverDummy.displayName="Popover",PopoverDummy.__docgenInfo={description:"",displayName:"Popover",props:{setPopupVisibility:{defaultValue:null,description:"",name:"setPopupVisibility",required:!0,type:{name:"(isVisible: any) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PopupBase/__mocks__/PopoverDummy.tsx#Popover"]={docgenInfo:Popover.__docgenInfo,name:"Popover",path:"src/components/PopupBase/__mocks__/PopoverDummy.tsx#Popover"})}catch(__react_docgen_typescript_loader_error){}var __assign=function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},PopupBase_stories={title:"Atoms/PopupBase",component:PopupBase.u,argTypes:{anchorRef:{control:!1},popupRef:{control:!1},popperOptions:{control:!1}}},_PopupBase={name:"PopupBase",args:{anchorRenderer:function anchorRenderer(_a){var setPopupVisibility=_a.setPopupVisibility,isOpen=_a.isOpen;return react.createElement(Button.$,{onClick:function onClick(){return setPopupVisibility(!isOpen)}},"Toggle popup")},popupRenderer:function popupRenderer(_a){var setPopupVisibility=_a.setPopupVisibility;return react.createElement(PopoverDummy,{setPopupVisibility:setPopupVisibility})},placement:"bottom-start"},render:function render(args){return react.createElement("div",{style:{textAlign:"center"}},react.createElement(PopupBase.u,__assign({},args)))}};_PopupBase.parameters={..._PopupBase.parameters,docs:{..._PopupBase.parameters?.docs,source:{originalSource:"{\n  name: 'PopupBase',\n  args: {\n    anchorRenderer: ({\n      setPopupVisibility,\n      isOpen\n    }) => <Button onClick={() => setPopupVisibility(!isOpen)}>Toggle popup</Button>,\n    popupRenderer: ({\n      setPopupVisibility\n    }) => <PopoverDummy setPopupVisibility={setPopupVisibility} />,\n    placement: 'bottom-start'\n  },\n  render: args => <div style={{\n    textAlign: 'center'\n  }}>\n            <PopupBase {...args} />\n        </div>\n}",..._PopupBase.parameters?.docs?.source}}};const __namedExportsOrder=["_PopupBase"]}}]);