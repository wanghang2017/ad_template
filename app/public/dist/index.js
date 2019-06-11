!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=2)}([function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";var ERROR="input is invalid type",WINDOW="object"==typeof window,root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"==typeof self,NODE_JS=!root.JS_MD5_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&"object"==typeof module&&module.exports,AMD=__webpack_require__(4),ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}!root.JS_MD5_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t){return function(e){return new Md5(!0).update(e)[t]()}},createMethod=function(){var t=createOutputMethod("hex");NODE_JS&&(t=nodeWrap(t)),t.create=function(){return new Md5},t.update=function(e){return t.create().update(e)};for(var e=0;e<OUTPUT_TYPES.length;++e){var r=OUTPUT_TYPES[e];t[r]=createOutputMethod(r)}return t},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(t){if("string"==typeof t)return crypto.createHash("md5").update(t,"utf8").digest("hex");if(null==t)throw ERROR;return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash("md5").update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod};function Md5(t){if(t)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var e=new ArrayBuffer(68);this.buffer8=new Uint8Array(e),this.blocks=new Uint32Array(e)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Md5.prototype.update=function(t){if(!this.finalized){var e,r=typeof t;if("string"!==r){if("object"!==r)throw ERROR;if(null===t)throw ERROR;if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw ERROR;e=!0}for(var n,o,i=0,s=t.length,a=this.blocks,c=this.buffer8;i<s;){if(this.hashed&&(this.hashed=!1,a[0]=a[16],a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),e)if(ARRAY_BUFFER)for(o=this.start;i<s&&o<64;++i)c[o++]=t[i];else for(o=this.start;i<s&&o<64;++i)a[o>>2]|=t[i]<<SHIFT[3&o++];else if(ARRAY_BUFFER)for(o=this.start;i<s&&o<64;++i)(n=t.charCodeAt(i))<128?c[o++]=n:n<2048?(c[o++]=192|n>>6,c[o++]=128|63&n):n<55296||n>=57344?(c[o++]=224|n>>12,c[o++]=128|n>>6&63,c[o++]=128|63&n):(n=65536+((1023&n)<<10|1023&t.charCodeAt(++i)),c[o++]=240|n>>18,c[o++]=128|n>>12&63,c[o++]=128|n>>6&63,c[o++]=128|63&n);else for(o=this.start;i<s&&o<64;++i)(n=t.charCodeAt(i))<128?a[o>>2]|=n<<SHIFT[3&o++]:n<2048?(a[o>>2]|=(192|n>>6)<<SHIFT[3&o++],a[o>>2]|=(128|63&n)<<SHIFT[3&o++]):n<55296||n>=57344?(a[o>>2]|=(224|n>>12)<<SHIFT[3&o++],a[o>>2]|=(128|n>>6&63)<<SHIFT[3&o++],a[o>>2]|=(128|63&n)<<SHIFT[3&o++]):(n=65536+((1023&n)<<10|1023&t.charCodeAt(++i)),a[o>>2]|=(240|n>>18)<<SHIFT[3&o++],a[o>>2]|=(128|n>>12&63)<<SHIFT[3&o++],a[o>>2]|=(128|n>>6&63)<<SHIFT[3&o++],a[o>>2]|=(128|63&n)<<SHIFT[3&o++]);this.lastByteIndex=o,this.bytes+=o-this.start,o>=64?(this.start=o-64,this.hash(),this.hashed=!0):this.start=o}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[e>>2]|=EXTRA[3&e],e>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,t[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},Md5.prototype.hash=function(){var t,e,r,n,o,i,s=this.blocks;this.first?e=((e=((t=((t=s[0]-680876937)<<7|t>>>25)-271733879<<0)^(r=((r=(-271733879^(n=((n=(-1732584194^2004318071&t)+s[1]-117830708)<<12|n>>>20)+t<<0)&(-271733879^t))+s[2]-1126478375)<<17|r>>>15)+n<<0)&(n^t))+s[3]-1316259209)<<22|e>>>10)+r<<0:(t=this.h0,e=this.h1,r=this.h2,e=((e+=((t=((t+=((n=this.h3)^e&(r^n))+s[0]-680876936)<<7|t>>>25)+e<<0)^(r=((r+=(e^(n=((n+=(r^t&(e^r))+s[1]-389564586)<<12|n>>>20)+t<<0)&(t^e))+s[2]+606105819)<<17|r>>>15)+n<<0)&(n^t))+s[3]-1044525330)<<22|e>>>10)+r<<0),e=((e+=((t=((t+=(n^e&(r^n))+s[4]-176418897)<<7|t>>>25)+e<<0)^(r=((r+=(e^(n=((n+=(r^t&(e^r))+s[5]+1200080426)<<12|n>>>20)+t<<0)&(t^e))+s[6]-1473231341)<<17|r>>>15)+n<<0)&(n^t))+s[7]-45705983)<<22|e>>>10)+r<<0,e=((e+=((t=((t+=(n^e&(r^n))+s[8]+1770035416)<<7|t>>>25)+e<<0)^(r=((r+=(e^(n=((n+=(r^t&(e^r))+s[9]-1958414417)<<12|n>>>20)+t<<0)&(t^e))+s[10]-42063)<<17|r>>>15)+n<<0)&(n^t))+s[11]-1990404162)<<22|e>>>10)+r<<0,e=((e+=((t=((t+=(n^e&(r^n))+s[12]+1804603682)<<7|t>>>25)+e<<0)^(r=((r+=(e^(n=((n+=(r^t&(e^r))+s[13]-40341101)<<12|n>>>20)+t<<0)&(t^e))+s[14]-1502002290)<<17|r>>>15)+n<<0)&(n^t))+s[15]+1236535329)<<22|e>>>10)+r<<0,e=((e+=((n=((n+=(e^r&((t=((t+=(r^n&(e^r))+s[1]-165796510)<<5|t>>>27)+e<<0)^e))+s[6]-1069501632)<<9|n>>>23)+t<<0)^t&((r=((r+=(t^e&(n^t))+s[11]+643717713)<<14|r>>>18)+n<<0)^n))+s[0]-373897302)<<20|e>>>12)+r<<0,e=((e+=((n=((n+=(e^r&((t=((t+=(r^n&(e^r))+s[5]-701558691)<<5|t>>>27)+e<<0)^e))+s[10]+38016083)<<9|n>>>23)+t<<0)^t&((r=((r+=(t^e&(n^t))+s[15]-660478335)<<14|r>>>18)+n<<0)^n))+s[4]-405537848)<<20|e>>>12)+r<<0,e=((e+=((n=((n+=(e^r&((t=((t+=(r^n&(e^r))+s[9]+568446438)<<5|t>>>27)+e<<0)^e))+s[14]-1019803690)<<9|n>>>23)+t<<0)^t&((r=((r+=(t^e&(n^t))+s[3]-187363961)<<14|r>>>18)+n<<0)^n))+s[8]+1163531501)<<20|e>>>12)+r<<0,e=((e+=((n=((n+=(e^r&((t=((t+=(r^n&(e^r))+s[13]-1444681467)<<5|t>>>27)+e<<0)^e))+s[2]-51403784)<<9|n>>>23)+t<<0)^t&((r=((r+=(t^e&(n^t))+s[7]+1735328473)<<14|r>>>18)+n<<0)^n))+s[12]-1926607734)<<20|e>>>12)+r<<0,e=((e+=((i=(n=((n+=((o=e^r)^(t=((t+=(o^n)+s[5]-378558)<<4|t>>>28)+e<<0))+s[8]-2022574463)<<11|n>>>21)+t<<0)^t)^(r=((r+=(i^e)+s[11]+1839030562)<<16|r>>>16)+n<<0))+s[14]-35309556)<<23|e>>>9)+r<<0,e=((e+=((i=(n=((n+=((o=e^r)^(t=((t+=(o^n)+s[1]-1530992060)<<4|t>>>28)+e<<0))+s[4]+1272893353)<<11|n>>>21)+t<<0)^t)^(r=((r+=(i^e)+s[7]-155497632)<<16|r>>>16)+n<<0))+s[10]-1094730640)<<23|e>>>9)+r<<0,e=((e+=((i=(n=((n+=((o=e^r)^(t=((t+=(o^n)+s[13]+681279174)<<4|t>>>28)+e<<0))+s[0]-358537222)<<11|n>>>21)+t<<0)^t)^(r=((r+=(i^e)+s[3]-722521979)<<16|r>>>16)+n<<0))+s[6]+76029189)<<23|e>>>9)+r<<0,e=((e+=((i=(n=((n+=((o=e^r)^(t=((t+=(o^n)+s[9]-640364487)<<4|t>>>28)+e<<0))+s[12]-421815835)<<11|n>>>21)+t<<0)^t)^(r=((r+=(i^e)+s[15]+530742520)<<16|r>>>16)+n<<0))+s[2]-995338651)<<23|e>>>9)+r<<0,e=((e+=((n=((n+=(e^((t=((t+=(r^(e|~n))+s[0]-198630844)<<6|t>>>26)+e<<0)|~r))+s[7]+1126891415)<<10|n>>>22)+t<<0)^((r=((r+=(t^(n|~e))+s[14]-1416354905)<<15|r>>>17)+n<<0)|~t))+s[5]-57434055)<<21|e>>>11)+r<<0,e=((e+=((n=((n+=(e^((t=((t+=(r^(e|~n))+s[12]+1700485571)<<6|t>>>26)+e<<0)|~r))+s[3]-1894986606)<<10|n>>>22)+t<<0)^((r=((r+=(t^(n|~e))+s[10]-1051523)<<15|r>>>17)+n<<0)|~t))+s[1]-2054922799)<<21|e>>>11)+r<<0,e=((e+=((n=((n+=(e^((t=((t+=(r^(e|~n))+s[8]+1873313359)<<6|t>>>26)+e<<0)|~r))+s[15]-30611744)<<10|n>>>22)+t<<0)^((r=((r+=(t^(n|~e))+s[6]-1560198380)<<15|r>>>17)+n<<0)|~t))+s[13]+1309151649)<<21|e>>>11)+r<<0,e=((e+=((n=((n+=(e^((t=((t+=(r^(e|~n))+s[4]-145523070)<<6|t>>>26)+e<<0)|~r))+s[11]-1120210379)<<10|n>>>22)+t<<0)^((r=((r+=(t^(n|~e))+s[2]+718787259)<<15|r>>>17)+n<<0)|~t))+s[9]-343485551)<<21|e>>>11)+r<<0,this.first?(this.h0=t+1732584193<<0,this.h1=e-271733879<<0,this.h2=r-1732584194<<0,this.h3=n+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+e<<0,this.h2=this.h2+r<<0,this.h3=this.h3+n<<0)},Md5.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,n=this.h3;return HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[n>>4&15]+HEX_CHARS[15&n]+HEX_CHARS[n>>12&15]+HEX_CHARS[n>>8&15]+HEX_CHARS[n>>20&15]+HEX_CHARS[n>>16&15]+HEX_CHARS[n>>28&15]+HEX_CHARS[n>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,n=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&n,n>>8&255,n>>16&255,n>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),e=new Uint32Array(t);return e[0]=this.h0,e[1]=this.h1,e[2]=this.h2,e[3]=this.h3,t},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var t,e,r,n="",o=this.array(),i=0;i<15;)t=o[i++],e=o[i++],r=o[i++],n+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[63&(t<<4|e>>>4)]+BASE64_ENCODE_CHAR[63&(e<<2|r>>>6)]+BASE64_ENCODE_CHAR[63&r];return t=o[i],n+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[t<<4&63]+"=="};var exports=createMethod();COMMON_JS?module.exports=exports:(root.md5=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}()}).call(this,__webpack_require__(3),__webpack_require__(0))},function(t,e,r){"use strict";r.r(e);var n=r(1),o=r.n(n);!function(){var t=new Date,e=[{price:"3.000000",campaignId:109068,placementId:"1",feeType:"cpm",projectId:6949,channelId:"5802",creative:{creativeId:10000122,templateId:"1",picUrl:["http://img.emarbox.com/dsp/social_img/social_1558593828195.jpg"],text:{title:"有芯卷纸出口装4层只要53.9",description:"顺清柔 有芯卷纸 出口装4层1",advertiserName:"6949"}},url:"https://p.jiuxinban.com/4d8wjQ"}],r=e.length,n=0;r>0&&(n=Math.round(Math.random()*(r-1)));var i={templateId:e[n].creative.templateId,publishId:e[n].channelId,picHeight:"",picWidth:"",bidfloor:e[n].price,placementId:e[n].placementId};function s(){var t=this;function r(t){document.createElement("img").src=t}function s(t){var e=t.bid||null;if(e){var o=(e=e[n]||{}).clickMonitorUrl,i=e.impressMonitorUrl,s=e.url,a=document.getElementsByClassName("ad-container")[0];a.addEventListener("click",function(t){t.stopPropagation(),r(o);var e=document.createElement("a");e.href=s,e.click()});var c=document.documentElement||document.body,h=function t(e){return e.parentElement?t(e.parentElement)+e.offsetTop:e.offsetTop}(a);h<c.clientHeight?r(i):window.addEventListener("scroll",function t(e){c.scrollTop+c.clientHeight>h&&(r(i),window.removeEventListener("scroll",t))})}}function c(t){var e=t.bid||null;if(e){(e=e[n]||{}).clickMonitorUrl,e.impressMonitorUrl;var r=e.creative||{},o=r.picUrl||[],i=r.text||{},s=o.length||0,a=i.advertiserName||"",c=i.description||"",h=i.title||"",f=2,u='<div class="ad-container" style="position: relative"> ',d="",l="";h.trim().length>0&&(d="<h3>"+h+"</h3>"),a.trim().length>0&&(l="<h3>广告主|"+a+"</h3>");p(s);u=u+'<span style=" position: absolute;right: 2vw;bottom: 0;color: #ccc;font-size: 12px;border: 1px solid #ccc;padding: 0 3px;border-radius: 3px; ">广告</span>'+d+(1==s&&c.length>0?'<div style="width:100%; padding:2%; overflow: hidden;"><div style="float:left;width:30vw;margin-right:2vw;border: 1px solid #ccc"><img style="width:100%" src="'+o[0]+'" alt=""></div><div style=" width:64vw; float: left; overflow: hidden;"><p style="float:left">'+c+"</p></div></div>":function(t){for(var e=p(t),r='<ul class="ad-list" style="list-style: none;overflow: hidden;width: 100vw; padding:0 2vw;box-sizing:border-box">',n=(e.padding,e.width),i=e.count,s=1;s<=t;s++)r+='<li class="ad-item" style="list-style: none;box-sizing:border-box;float: left; width: '+n+"vw ; margin-right: "+(s%i==0?0:e.padding)+'vw; border: 1px solid #ccc"><img style="width:100%;" src="'+o[s-1]+'" alt=""></li>';return r+="</ul>"}(s))+l+"</div>",document.getElementsByClassName("ad-box")[0].innerHTML=u}function p(t){var e=t<=3?t:0;4==t?e=2:6==t&&(e=3);var r=100-2*f,n=0;return e>=2&&(n=(10-2*f)/(e-1),r=90/e),{padding:n,width:r,count:e}}}t.init=function(){t.Ajax.post("https://nonstandard.emarbox.com:5800",this.params,function(t){var e=JSON.parse(t);c(e),s(e)},function(){var r=t.createInfo();r=(r=a.encode(r))+"_"+o()(r+"_impr_click_key_23ser@df&").toLocaleUpperCase();for(var n=0;n<e.length;n++){var h=e[n];h.clickMonitorUrl="https://testmm.emarbox.com/nonstandard/click?info="+r+"&c="+i.bidfloor,h.impressMonitorUrl="https://testmm.emarbox.com/nonstandard/impression?info="+r+"&c="+i.bidfloor}var f={bid:e};c(f),s(f)})},t.params={requestId:Date.now()+""+t.randomn(10),publishId:parseInt(i.publishId),requestTs:Date.now(),impression:[{impressionId:"1",placementId:i.placementId,placementType:0,templateId:parseInt(i.templateId),bidfloor:parseInt(i.bidfloor)}],device:{ua:navigator.userAgent}}}s.prototype.Ajax={get:function(t,e,r){var n=new XMLHttpRequest;n.open("GET",t,!0),n.onreadystatechange=function(){4==n.readyState&&(200==n.status||304==n.status?e.call(this,n.responseText):r.call(this))},n.send()},post:function(t,e,r,n){var o=new XMLHttpRequest;o.open("POST",t,!0),o.setRequestHeader("Content-Type","application/json"),o.onreadystatechange=function(){4!=o.readyState||200!=o.status&&304!=o.status?n.call(this):r.call(this,o.responseText)},o.send(JSON.stringify(e))}},s.prototype.randomn=function(t){return t>21?null:parseInt((Math.random()+1)*Math.pow(10,t-1))},s.prototype.createInfo=function(r){var o=Date.now()+""+this.randomn(10),i=function(t){function e(t){return t<10?"0"+t:t+""}return t.getFullYear()+""+e(t.getMonth()+1)+e(t.getDate())+e(t.getHours())+e(t.getMinutes())+e(t.getMilliseconds())}(t),s=(new Date).getSeconds()+""+(new Date).getMilliseconds()+this.randomn(10),a=e[n],c=new proto.Emarbox.Interface.Info,h=new proto.Emarbox.Interface.CreativeInfo;return c.setChannelId(a.channelId),c.setRequestId(o),c.setBidTime(i),c.setClickId(s),h.setProjectId(a.projectId),h.setCampaignId(a.campaignId),h.setCreativeId(a.creative.creativeId),h.setDealId(a.dealId),h.setFeeType(a.feeType),h.setBidPrice(a.price),h.setAdPrice(a.price),c.setCreativeInfo(h),function(t){for(var e="",r=0;r<t.length;r++)e+=String.fromCharCode(t[r]);return e}(c.serializeBinary())};var a={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",encode:function(t){for(var e,r,n,o,i,s,a,c,h,f,u="",d=0,l=3*Math.floor(t.length/3)-2;d<l;)o=(e=t.charCodeAt(d++))>>2,i=63&(e<<4|(r=t.charCodeAt(d++))>>4),s=63&(r<<2|(n=t.charCodeAt(d++))>>6),a=63&n,u=u+this._keyStr.charAt(o)+this._keyStr.charAt(i)+this._keyStr.charAt(s)+this._keyStr.charAt(a);var p=t.length%3;return 1==p?(c=(252&(e=t.charCodeAt(d++)))>>2,h=(3&e)<<4,u+=this._keyStr.charAt(c)+this._keyStr.charAt(h)):2==p&&(c=(252&(e=t.charCodeAt(d++)))>>2,h=(3&e)<<4|(240&(r=t.charCodeAt(d++)))>>4,f=(15&r)<<2,u+=this._keyStr.charAt(c)+this._keyStr.charAt(h)+this._keyStr.charAt(f)),u},decode:function(t){var e,r,n,o,i,s,c="",h=0;for(t=t.replace(/[^A-Za-z0-9+\/=]/g,"");h<t.length;)e=this._keyStr.indexOf(t.charAt(h++))<<2|(o=this._keyStr.indexOf(t.charAt(h++)))>>4,r=(15&o)<<4|(i=this._keyStr.indexOf(t.charAt(h++)))>>2,n=(3&i)<<6|(s=this._keyStr.indexOf(t.charAt(h++))),c+=String.fromCharCode(e),64!=i&&(c+=String.fromCharCode(r)),64!=s&&(c+=String.fromCharCode(n));return c=a._utf8_decode(c)},_utf8_encode:function(t){t=t.replace(/rn/g,"n");for(var e="",r=0;r<t.length;r++){var n=t.charCodeAt(r);n<128?e+=String.fromCharCode(n):n>127&&n<2048?(e+=String.fromCharCode(n>>6|192),e+=String.fromCharCode(63&n|128)):(e+=String.fromCharCode(n>>12|224),e+=String.fromCharCode(n>>6&63|128),e+=String.fromCharCode(63&n|128))}return e},_utf8_decode:function(t){for(var e="",r=0,n=c1=c2=0;r<t.length;)(n=t.charCodeAt(r))<128?(e+=String.fromCharCode(n),r++):n>191&&n<224?(c2=t.charCodeAt(r+1),e+=String.fromCharCode((31&n)<<6|63&c2),r+=2):(c2=t.charCodeAt(r+1),c3=t.charCodeAt(r+2),e+=String.fromCharCode((15&n)<<12|(63&c2)<<6|63&c3),r+=3);return e}};(new s).init()}()},function(t,e){var r,n,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(r===setTimeout)return setTimeout(t,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(t){r=i}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(t){n=s}}();var c,h=[],f=!1,u=-1;function d(){f&&c&&(f=!1,c.length?h=c.concat(h):u=-1,h.length&&l())}function l(){if(!f){var t=a(d);f=!0;for(var e=h.length;e;){for(c=h,h=[];++u<e;)c&&c[u].run();u=-1,e=h.length}c=null,f=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function _(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];h.push(new p(t,e)),1!==h.length||f||a(l)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=_,o.addListener=_,o.once=_,o.off=_,o.removeListener=_,o.removeAllListeners=_,o.emit=_,o.prependListener=_,o.prependOnceListener=_,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e){(function(e){t.exports=e}).call(this,{})}]);