import{b as v,d as b,e as y,f as m}from"./chunk-2N2KBSVT.js";var g=v((l,h)=>{var j=b(y());(function(a,o){typeof l=="object"&&typeof h=="object"?h.exports=o(m()):typeof define=="function"&&define.amd?define(["react"],o):typeof l=="object"?l.Switch=o(m()):a.Switch=o(a.react)})(l,function(a){return function(o){var u={};function n(e){if(u[e])return u[e].exports;var t=u[e]={i:e,l:!1,exports:{}};return o[e].call(t.exports,t,t.exports,n),t.l=!0,t.exports}return n.m=o,n.c=u,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t||4&t&&typeof e=="object"&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&typeof e!="string")for(var p in e)n.d(i,p,function(d){return e[d]}.bind(null,p));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=1)}([function(o,u){o.exports=a},function(o,u,n){"use strict";n.r(u),n.d(u,"Case",function(){return p}),n.d(u,"Default",function(){return d});var e=n(0);function t(c,r,s){return r in c?Object.defineProperty(c,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):c[r]=s,c}class i extends e.Component{getChildren(){let r=[],s=[];return e.Children.forEach(this.props.children,f=>{switch(f.type.componentName){case"case":typeof this.props.condition=="function"?this.props.condition(f.props.value)&&r.push(f):this.props.condition===f.props.value&&r.push(f);break;case"default":s.push(f)}}),r.length>0?r:s}render(){let r=this.getChildren();return r.length===0?null:r}}class p extends e.Component{render(){return this.props.children}}t(p,"componentName","case");class d extends e.Component{render(){return this.props.children}}t(d,"componentName","default"),u.default=i}])})});export{g as a};
/*! Bundled license information:

react-switch-case/dist/index.js:
  (*! For license information please see index.js.LICENSE.txt *)
  (*!
   * banner:
   * react-switch-case: 1.5.1
   * Aleksandrov Sergey <gooddev.sergey@gmail.com> (https://github.com/AlexSergey/react-switch-case)
   * Little switch-case React component to render nested components.
   * MIT
   *)
*/
