import{i as ge,b as pe,a as H,c as k,d as z,e as K,f as ve,g as ye,h as be,j as xe,r as je,t as G,k as we,l as _e,m as Se,n as X,o as Ne,p as Ae,q as Ce,s as L,u as l,L as P,v as Q,w as Be,x as T,y as D,z as N,A as Z,B as Fe,C as Me,D as I,E as C,F as Le,G as ee,H as b,I as V,J as te,K as De,M as se,N as E,P as $e,O as Ee,Q as Ue,R as Pe,S as ne,T as Te,U as Ve,V as re,W as Ie,X as Re,Y as R,Z as qe,_ as ae,$ as ie,a0 as Qe,a1 as oe,a2 as Oe,a3 as ze,a4 as He,a5 as U,a6 as ke,a7 as Ge,a8 as Ze,a9 as $,aa as We}from"./index-BRj34hO2.js";import{F as q,a as F}from"./FormElement-DE-kBaIs.js";var Xe="[object Number]";function Ye(r){return typeof r=="number"||ge(r)&&pe(r)==Xe}function Je(r,i){return r<i}function Ke(r,i,u){for(var d=-1,c=r.length;++d<c;){var f=r[d],h=i(f);if(h!=null&&(m===void 0?h===h&&!H(h):u(h,m)))var m=h,p=f}return p}function et(r,i){return r&&r.length?Ke(r,k(i),Je):void 0}var tt="Expected a function";function st(r){if(typeof r!="function")throw new TypeError(tt);return function(){var i=arguments;switch(i.length){case 0:return!r.call(this);case 1:return!r.call(this,i[0]);case 2:return!r.call(this,i[0],i[1]);case 3:return!r.call(this,i[0],i[1],i[2])}return!r.apply(this,i)}}function nt(r,i){var u=r.length;for(r.sort(i);u--;)r[u]=r[u].value;return r}function rt(r,i){if(r!==i){var u=r!==void 0,d=r===null,c=r===r,f=H(r),h=i!==void 0,m=i===null,p=i===i,v=H(i);if(!m&&!v&&!f&&r>i||f&&h&&p&&!m&&!v||d&&h&&p||!u&&p||!c)return 1;if(!d&&!f&&!v&&r<i||v&&u&&c&&!d&&!f||m&&u&&c||!h&&c||!p)return-1}return 0}function at(r,i,u){for(var d=-1,c=r.criteria,f=i.criteria,h=c.length,m=u.length;++d<h;){var p=rt(c[d],f[d]);if(p){if(d>=m)return p;var v=u[d];return p*(v=="desc"?-1:1)}}return r.index-i.index}function it(r,i,u){i.length?i=z(i,function(f){return K(f)?function(h){return ve(h,f.length===1?f[0]:f)}:f}):i=[ye];var d=-1;i=z(i,be(k));var c=xe(r,function(f,h,m){var p=z(i,function(v){return v(f)});return{criteria:p,index:++d,value:f}});return nt(c,function(f,h){return at(f,h,u)})}var ot=/^\s+/,lt=je.parseInt;function Y(r,i,u){return u||i==null?i=0:i&&(i=+i),lt(G(r).replace(ot,""),i||0)}function le(r,i){var u=K(r)?we:_e;return u(r,st(k(i)))}var ct=Se(function(r,i){if(r==null)return[];var u=i.length;return u>1&&X(r,i[0],i[1])?i=[]:u>2&&X(i[0],i[1],i[2])&&(i=[i[0]]),it(r,Ne(i),[])});function ut(r,i){var u,d;Ae(1,arguments);var c=Ce(r);if(isNaN(c.getTime()))throw new RangeError("Invalid time value");var f=String((u=void 0)!==null&&u!==void 0?u:"extended"),h=String((d=void 0)!==null&&d!==void 0?d:"complete");if(f!=="extended"&&f!=="basic")throw new RangeError("format must be 'extended' or 'basic'");if(h!=="date"&&h!=="time"&&h!=="complete")throw new RangeError("representation must be 'date', 'time', or 'complete'");var m="",p="",v=f==="extended"?"-":"",y=f==="extended"?":":"";if(h!=="time"){var S=L(c.getDate(),2),A=L(c.getMonth()+1,2),x=L(c.getFullYear(),4);m="".concat(x).concat(v).concat(A).concat(v).concat(S)}if(h!=="date"){var j=c.getTimezoneOffset();if(j!==0){var w=Math.abs(j),g=L(Math.floor(w/60),2),o=L(w%60,2),a=j<0?"+":"-";p="".concat(a).concat(g,":").concat(o)}else p="Z";var t=L(c.getHours(),2),e=L(c.getMinutes(),2),n=L(c.getSeconds(),2),s=m===""?"":"T",_=[t,e,n].join(y);m="".concat(m).concat(s).concat(_).concat(p)}return m}const dt=()=>l.jsx("header",{className:"my-16 w-11/12 place-self-center",children:l.jsxs("div",{className:"flex flex-wrap justify-between gap-8 rounded-md bg-purple-300 p-2",children:[l.jsx(P,{to:"/admin/doors",content:"Luker",className:"rounded-md"}),l.jsx(P,{to:"/admin/doors/new",content:"Ny luke",className:"rounded-md"}),l.jsx(P,{to:"/admin/service_messages",content:"Driftsmeldinger",className:"rounded-md"}),l.jsx(P,{to:"/admin/service_messages/new",content:"Ny driftsmelding",className:"rounded-md"})]})}),ce=async()=>await N.get("/admin/challenges").then(({data:r})=>Fe(r,"door")),O=r=>Q(["admin","challenges"],ce,{...r,staleTime:6e5}),ue=r=>Q(["admin","challenges"],ce,{staleTime:6e5,select:r?Be(r):void 0}),ft=r=>N.get(`/admin/challenges/${Z(r)}/posts`).then(({data:i})=>i),ht=r=>Q(["admin","posts",r],()=>ft(r),{staleTime:3e5}),mt=async r=>{if(r=Me(r,["markdown_content","files"]),!I(r))return await N.post("/admin/challenge_markdown",{challenge:r}).then(({data:i})=>i)},gt=(r,i)=>Q(["admin","challenges","preview",r],()=>mt(r),{staleTime:1/0,cacheTime:0,...i}),pt=()=>{const r=T();return D(["admin","challenges","create"],({challenge:i})=>N.post("/admin/challenges",{challenge:i}),{onSuccess:()=>{r.invalidateQueries("challenges"),r.invalidateQueries(["admin","challenges"])}})},vt=()=>{const r=T();return D(["admin","challenges","update"],({challenge:i})=>N.patch(`/admin/challenges/${Z(i.door)}`,{challenge:i}),{onSuccess:()=>{r.invalidateQueries("challenges"),r.invalidateQueries(["admin","challenges"])}})},yt=()=>{const r=T();return D(["admin","challenges","destroy"],async({door:i})=>Ye(i)&&N.delete(`/admin/challenges/${Z(i)}`),{onSuccess:()=>{r.invalidateQueries("challenges"),r.invalidateQueries(["admin","challenges"])}})},bt=()=>{const r=T();return D(["admin","serviceMessages","create"],i=>N.post("/admin/service_messages",i),{onSuccess:()=>{r.invalidateQueries("serviceMessages")}})},xt=()=>{const r=T();return D(["admin","serviceMessages","update"],({uuid:i,...u})=>N.patch(`/admin/service_messages/${i}`,u),{onSuccess:()=>{r.invalidateQueries("serviceMessages")}})},jt=()=>{const r=T();return D(["admin","serviceMessages","delete"],({uuid:i})=>N.delete(`/admin/service_messages/${i}`),{onSuccess:()=>{r.invalidateQueries("serviceMessages")}})},wt=()=>D(["admin","activeStorage","createBlob"],({blob:r,config:i})=>N.post("/rails/active_storage/direct_uploads",{blob:r},i).then(({data:u})=>u)),_t=()=>D(["admin","activeStorage","uploadFile"],({upload:{file:r,directUpload:i},config:u})=>N.put(i.url,r,{...u,headers:i.headers})),St=({door:r,setDoor:i})=>{const{data:u}=O();return u?l.jsx("label",{className:"block space-x-8",children:l.jsx("select",{className:"form-select text-black",defaultValue:r,onChange:d=>i(parseInt(d.target.value)),children:C(ct(Le(ee(u)),"door"),({door:d,title:c},f)=>l.jsx("option",{value:d,label:`Luke ${d}: ${c}`,children:`Luke ${d}: ${c}`},f))})}):null},Nt=()=>{var S;const r=V(),{search:i}=te(),u=(S=i.match(/door=(?<door>\d+)/))==null?void 0:S.groups,{data:d}=O(),c=b.useMemo(()=>et(ee(d),"door"),[d]),{mutate:f,isLoading:h}=yt(),m=()=>{window.confirm(`Er du sikker på at du vil slette luke ${p} "${y==null?void 0:y.title}"?`)&&f({door:p},{onSuccess:()=>{v(void 0),r("/admin/doors")}})},[p,v]=b.useState(u&&parseInt(u.door));b.useLayoutEffect(()=>{v(A=>A??(c==null?void 0:c.door))},[v,c]);const{data:y}=ue(p??(c==null?void 0:c.door));return De(p)?null:l.jsxs("div",{className:"w-11/12",children:[l.jsx(se,{challenge:y,withoutInput:!0,preamble:l.jsxs("div",{className:"mb-16 flex w-full flex-wrap justify-between gap-y-6",children:[l.jsx(St,{door:p,setDoor:v}),l.jsxs("div",{className:"flex gap-6",children:[l.jsx(P,{to:`/admin/doors/${p}/edit`,content:"Rediger luke"})," ",l.jsx(E,{disabled:h,onClick:m,children:"Slett luke"})]})]})}),l.jsx($e,{door:p,usePosts:ht,withoutInput:!0})]})},At=b.memo(Nt),de=()=>{const{data:r}=O();return le(Ee(1,25),i=>Ue(r,i))};var fe={exports:{}};(function(r,i){(function(u){r.exports=u()})(function(u){var d=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function c(o,a){var t=o[0],e=o[1],n=o[2],s=o[3];t+=(e&n|~e&s)+a[0]-680876936|0,t=(t<<7|t>>>25)+e|0,s+=(t&e|~t&n)+a[1]-389564586|0,s=(s<<12|s>>>20)+t|0,n+=(s&t|~s&e)+a[2]+606105819|0,n=(n<<17|n>>>15)+s|0,e+=(n&s|~n&t)+a[3]-1044525330|0,e=(e<<22|e>>>10)+n|0,t+=(e&n|~e&s)+a[4]-176418897|0,t=(t<<7|t>>>25)+e|0,s+=(t&e|~t&n)+a[5]+1200080426|0,s=(s<<12|s>>>20)+t|0,n+=(s&t|~s&e)+a[6]-1473231341|0,n=(n<<17|n>>>15)+s|0,e+=(n&s|~n&t)+a[7]-45705983|0,e=(e<<22|e>>>10)+n|0,t+=(e&n|~e&s)+a[8]+1770035416|0,t=(t<<7|t>>>25)+e|0,s+=(t&e|~t&n)+a[9]-1958414417|0,s=(s<<12|s>>>20)+t|0,n+=(s&t|~s&e)+a[10]-42063|0,n=(n<<17|n>>>15)+s|0,e+=(n&s|~n&t)+a[11]-1990404162|0,e=(e<<22|e>>>10)+n|0,t+=(e&n|~e&s)+a[12]+1804603682|0,t=(t<<7|t>>>25)+e|0,s+=(t&e|~t&n)+a[13]-40341101|0,s=(s<<12|s>>>20)+t|0,n+=(s&t|~s&e)+a[14]-1502002290|0,n=(n<<17|n>>>15)+s|0,e+=(n&s|~n&t)+a[15]+1236535329|0,e=(e<<22|e>>>10)+n|0,t+=(e&s|n&~s)+a[1]-165796510|0,t=(t<<5|t>>>27)+e|0,s+=(t&n|e&~n)+a[6]-1069501632|0,s=(s<<9|s>>>23)+t|0,n+=(s&e|t&~e)+a[11]+643717713|0,n=(n<<14|n>>>18)+s|0,e+=(n&t|s&~t)+a[0]-373897302|0,e=(e<<20|e>>>12)+n|0,t+=(e&s|n&~s)+a[5]-701558691|0,t=(t<<5|t>>>27)+e|0,s+=(t&n|e&~n)+a[10]+38016083|0,s=(s<<9|s>>>23)+t|0,n+=(s&e|t&~e)+a[15]-660478335|0,n=(n<<14|n>>>18)+s|0,e+=(n&t|s&~t)+a[4]-405537848|0,e=(e<<20|e>>>12)+n|0,t+=(e&s|n&~s)+a[9]+568446438|0,t=(t<<5|t>>>27)+e|0,s+=(t&n|e&~n)+a[14]-1019803690|0,s=(s<<9|s>>>23)+t|0,n+=(s&e|t&~e)+a[3]-187363961|0,n=(n<<14|n>>>18)+s|0,e+=(n&t|s&~t)+a[8]+1163531501|0,e=(e<<20|e>>>12)+n|0,t+=(e&s|n&~s)+a[13]-1444681467|0,t=(t<<5|t>>>27)+e|0,s+=(t&n|e&~n)+a[2]-51403784|0,s=(s<<9|s>>>23)+t|0,n+=(s&e|t&~e)+a[7]+1735328473|0,n=(n<<14|n>>>18)+s|0,e+=(n&t|s&~t)+a[12]-1926607734|0,e=(e<<20|e>>>12)+n|0,t+=(e^n^s)+a[5]-378558|0,t=(t<<4|t>>>28)+e|0,s+=(t^e^n)+a[8]-2022574463|0,s=(s<<11|s>>>21)+t|0,n+=(s^t^e)+a[11]+1839030562|0,n=(n<<16|n>>>16)+s|0,e+=(n^s^t)+a[14]-35309556|0,e=(e<<23|e>>>9)+n|0,t+=(e^n^s)+a[1]-1530992060|0,t=(t<<4|t>>>28)+e|0,s+=(t^e^n)+a[4]+1272893353|0,s=(s<<11|s>>>21)+t|0,n+=(s^t^e)+a[7]-155497632|0,n=(n<<16|n>>>16)+s|0,e+=(n^s^t)+a[10]-1094730640|0,e=(e<<23|e>>>9)+n|0,t+=(e^n^s)+a[13]+681279174|0,t=(t<<4|t>>>28)+e|0,s+=(t^e^n)+a[0]-358537222|0,s=(s<<11|s>>>21)+t|0,n+=(s^t^e)+a[3]-722521979|0,n=(n<<16|n>>>16)+s|0,e+=(n^s^t)+a[6]+76029189|0,e=(e<<23|e>>>9)+n|0,t+=(e^n^s)+a[9]-640364487|0,t=(t<<4|t>>>28)+e|0,s+=(t^e^n)+a[12]-421815835|0,s=(s<<11|s>>>21)+t|0,n+=(s^t^e)+a[15]+530742520|0,n=(n<<16|n>>>16)+s|0,e+=(n^s^t)+a[2]-995338651|0,e=(e<<23|e>>>9)+n|0,t+=(n^(e|~s))+a[0]-198630844|0,t=(t<<6|t>>>26)+e|0,s+=(e^(t|~n))+a[7]+1126891415|0,s=(s<<10|s>>>22)+t|0,n+=(t^(s|~e))+a[14]-1416354905|0,n=(n<<15|n>>>17)+s|0,e+=(s^(n|~t))+a[5]-57434055|0,e=(e<<21|e>>>11)+n|0,t+=(n^(e|~s))+a[12]+1700485571|0,t=(t<<6|t>>>26)+e|0,s+=(e^(t|~n))+a[3]-1894986606|0,s=(s<<10|s>>>22)+t|0,n+=(t^(s|~e))+a[10]-1051523|0,n=(n<<15|n>>>17)+s|0,e+=(s^(n|~t))+a[1]-2054922799|0,e=(e<<21|e>>>11)+n|0,t+=(n^(e|~s))+a[8]+1873313359|0,t=(t<<6|t>>>26)+e|0,s+=(e^(t|~n))+a[15]-30611744|0,s=(s<<10|s>>>22)+t|0,n+=(t^(s|~e))+a[6]-1560198380|0,n=(n<<15|n>>>17)+s|0,e+=(s^(n|~t))+a[13]+1309151649|0,e=(e<<21|e>>>11)+n|0,t+=(n^(e|~s))+a[4]-145523070|0,t=(t<<6|t>>>26)+e|0,s+=(e^(t|~n))+a[11]-1120210379|0,s=(s<<10|s>>>22)+t|0,n+=(t^(s|~e))+a[2]+718787259|0,n=(n<<15|n>>>17)+s|0,e+=(s^(n|~t))+a[9]-343485551|0,e=(e<<21|e>>>11)+n|0,o[0]=t+o[0]|0,o[1]=e+o[1]|0,o[2]=n+o[2]|0,o[3]=s+o[3]|0}function f(o){var a=[],t;for(t=0;t<64;t+=4)a[t>>2]=o.charCodeAt(t)+(o.charCodeAt(t+1)<<8)+(o.charCodeAt(t+2)<<16)+(o.charCodeAt(t+3)<<24);return a}function h(o){var a=[],t;for(t=0;t<64;t+=4)a[t>>2]=o[t]+(o[t+1]<<8)+(o[t+2]<<16)+(o[t+3]<<24);return a}function m(o){var a=o.length,t=[1732584193,-271733879,-1732584194,271733878],e,n,s,_,B,M;for(e=64;e<=a;e+=64)c(t,f(o.substring(e-64,e)));for(o=o.substring(e-64),n=o.length,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],e=0;e<n;e+=1)s[e>>2]|=o.charCodeAt(e)<<(e%4<<3);if(s[e>>2]|=128<<(e%4<<3),e>55)for(c(t,s),e=0;e<16;e+=1)s[e]=0;return _=a*8,_=_.toString(16).match(/(.*?)(.{0,8})$/),B=parseInt(_[2],16),M=parseInt(_[1],16)||0,s[14]=B,s[15]=M,c(t,s),t}function p(o){var a=o.length,t=[1732584193,-271733879,-1732584194,271733878],e,n,s,_,B,M;for(e=64;e<=a;e+=64)c(t,h(o.subarray(e-64,e)));for(o=e-64<a?o.subarray(e-64):new Uint8Array(0),n=o.length,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],e=0;e<n;e+=1)s[e>>2]|=o[e]<<(e%4<<3);if(s[e>>2]|=128<<(e%4<<3),e>55)for(c(t,s),e=0;e<16;e+=1)s[e]=0;return _=a*8,_=_.toString(16).match(/(.*?)(.{0,8})$/),B=parseInt(_[2],16),M=parseInt(_[1],16)||0,s[14]=B,s[15]=M,c(t,s),t}function v(o){var a="",t;for(t=0;t<4;t+=1)a+=d[o>>t*8+4&15]+d[o>>t*8&15];return a}function y(o){var a;for(a=0;a<o.length;a+=1)o[a]=v(o[a]);return o.join("")}y(m("hello")),typeof ArrayBuffer<"u"&&!ArrayBuffer.prototype.slice&&function(){function o(a,t){return a=a|0||0,a<0?Math.max(a+t,0):Math.min(a,t)}ArrayBuffer.prototype.slice=function(a,t){var e=this.byteLength,n=o(a,e),s=e,_,B,M,W;return t!==u&&(s=o(t,e)),n>s?new ArrayBuffer(0):(_=s-n,B=new ArrayBuffer(_),M=new Uint8Array(B),W=new Uint8Array(this,n,_),M.set(W),B)}}();function S(o){return/[\u0080-\uFFFF]/.test(o)&&(o=unescape(encodeURIComponent(o))),o}function A(o,a){var t=o.length,e=new ArrayBuffer(t),n=new Uint8Array(e),s;for(s=0;s<t;s+=1)n[s]=o.charCodeAt(s);return a?n:e}function x(o){return String.fromCharCode.apply(null,new Uint8Array(o))}function j(o,a,t){var e=new Uint8Array(o.byteLength+a.byteLength);return e.set(new Uint8Array(o)),e.set(new Uint8Array(a),o.byteLength),e}function w(o){var a=[],t=o.length,e;for(e=0;e<t-1;e+=2)a.push(parseInt(o.substr(e,2),16));return String.fromCharCode.apply(String,a)}function g(){this.reset()}return g.prototype.append=function(o){return this.appendBinary(S(o)),this},g.prototype.appendBinary=function(o){this._buff+=o,this._length+=o.length;var a=this._buff.length,t;for(t=64;t<=a;t+=64)c(this._hash,f(this._buff.substring(t-64,t)));return this._buff=this._buff.substring(t-64),this},g.prototype.end=function(o){var a=this._buff,t=a.length,e,n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],s;for(e=0;e<t;e+=1)n[e>>2]|=a.charCodeAt(e)<<(e%4<<3);return this._finish(n,t),s=y(this._hash),o&&(s=w(s)),this.reset(),s},g.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},g.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash.slice()}},g.prototype.setState=function(o){return this._buff=o.buff,this._length=o.length,this._hash=o.hash,this},g.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},g.prototype._finish=function(o,a){var t=a,e,n,s;if(o[t>>2]|=128<<(t%4<<3),t>55)for(c(this._hash,o),t=0;t<16;t+=1)o[t]=0;e=this._length*8,e=e.toString(16).match(/(.*?)(.{0,8})$/),n=parseInt(e[2],16),s=parseInt(e[1],16)||0,o[14]=n,o[15]=s,c(this._hash,o)},g.hash=function(o,a){return g.hashBinary(S(o),a)},g.hashBinary=function(o,a){var t=m(o),e=y(t);return a?w(e):e},g.ArrayBuffer=function(){this.reset()},g.ArrayBuffer.prototype.append=function(o){var a=j(this._buff.buffer,o),t=a.length,e;for(this._length+=o.byteLength,e=64;e<=t;e+=64)c(this._hash,h(a.subarray(e-64,e)));return this._buff=e-64<t?new Uint8Array(a.buffer.slice(e-64)):new Uint8Array(0),this},g.ArrayBuffer.prototype.end=function(o){var a=this._buff,t=a.length,e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n,s;for(n=0;n<t;n+=1)e[n>>2]|=a[n]<<(n%4<<3);return this._finish(e,t),s=y(this._hash),o&&(s=w(s)),this.reset(),s},g.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},g.ArrayBuffer.prototype.getState=function(){var o=g.prototype.getState.call(this);return o.buff=x(o.buff),o},g.ArrayBuffer.prototype.setState=function(o){return o.buff=A(o.buff,!0),g.prototype.setState.call(this,o)},g.ArrayBuffer.prototype.destroy=g.prototype.destroy,g.ArrayBuffer.prototype._finish=g.prototype._finish,g.ArrayBuffer.hash=function(o,a){var t=p(new Uint8Array(o)),e=y(t);return a?w(e):e},g})})(fe);var Ct=fe.exports;const Bt=Pe(Ct),Ft=()=>{const r=b.useRef(!0),i=b.useCallback(()=>r.current,[]);return b.useEffect(()=>()=>void(r.current=!1),[]),i};let J=0;const Mt=({challenge:r,register:i,setValue:u,className:d})=>{i("files");const{mutateAsync:c}=wt(),{mutateAsync:f}=_t(),[h,m]=b.useState(C(r.files,x=>({...x,fileId:J++})));b.useEffect(()=>{u("files",C(h,"signed_id"))},[u,h]);const[p,v]=b.useState({}),y=Ft(),S=async x=>{await Promise.all(C(x,async j=>{const w=J++;v(e=>({...e,[w]:{progress:0}}));const g={filename:j.name,content_type:j.type,byte_size:j.size,checksum:btoa(Bt.ArrayBuffer.hash(await j.arrayBuffer(),!0))},{signed_id:o,direct_upload:a}=await c({blob:g});!y()||(m(e=>[...e,{signed_id:o,filename:j.name,fileId:w}]),await f({upload:{file:j,directUpload:a},config:{onUploadProgress:({loaded:e,total:n})=>{y()&&Ve(n)&&v(s=>({...s,[w]:{progress:e/n}}))}}}),!y())||v(e=>({...e,[w]:{progress:1}}))}))},A=b.useRef(null);return l.jsxs("div",{className:ne("space-y-4",d),children:[l.jsxs(q,{label:"Filer",note:"husk å dobbeltsjekke riktig filnavn i markdown",children:[l.jsx("input",{ref:A,className:"hidden",type:"file",multiple:!0,onChange:({target:{files:x}})=>x&&S(x)}),l.jsx(E,{className:"form-input block",type:"button",content:"Velg filer...",onClick:()=>{var x;return(x=A.current)==null?void 0:x.click()}})]}),l.jsx("div",{className:"grid grid-cols-4 gap-4",children:C(h,({filename:x,signed_id:j,fileId:w})=>{var o;const g=((o=p[w])==null?void 0:o.progress)??1;return l.jsxs("span",{className:"relative overflow-hidden rounded-md border-2 border-yellow-400 p-2 text-center",children:[g<1&&l.jsx("div",{style:{width:`calc(${g*100}% + ${g*.5}rem)`},className:"absolute -left-2 -top-2 h-[calc(100%+.5rem)] bg-purple-400/20"}),l.jsx("span",{className:"line-clamp-1 inline-block w-[calc(100%-1.5rem)]",children:x}),l.jsx(Te,{className:"absolute right-4 top-0 h-full w-6 cursor-pointer",onClick:()=>m(a=>le(a,{signed_id:j}))})]},j)})})]})},Lt=({challenge:r,newForm:i=!1,submit:u})=>{const[d,c]=b.useState(!1),{register:f,handleSubmit:h,setValue:m,getValues:p,watch:v,formState:{dirtyFields:{door:y}}}=re({defaultValues:{...r,files:C(r.files,"signed_id")}}),[S,A]=b.useState(),{data:x}=gt(S,{enabled:d}),j=()=>{c(t=>(A(t?void 0:p()),!t))},w=de(),g=v("door"),o=r.active_from??Ie(y?g:r.door),a=r.active_to??Re();return l.jsxs("div",{className:"space-y-16",children:[l.jsxs("form",{className:"space-y-8",onSubmit:h(t=>u({...t,door:y?g:r.door})),children:[l.jsxs("div",{className:"flex w-full justify-end gap-8",children:[l.jsx(E,{type:"submit",children:"Lagre"}),l.jsx(E,{type:"button",className:"uppercase",onClick:j,children:d?"Rediger":"Forhåndsvisning"})]}),l.jsxs("div",{className:ne("grid grid-cols-3 gap-8",d&&"hidden"),children:[i&&l.jsx(q,{label:"Luke",className:"col-span-3",children:l.jsx("select",{className:"form-select block w-full text-black",defaultValue:w[0],...f("door",{required:!0}),children:C(w,t=>l.jsx("option",{value:t,label:G(t)},t))})}),l.jsx(F,{label:"Tittel",type:"text",defaultValue:r.title,...f("title",{required:!0})}),l.jsx(F,{label:"Forfatter",type:"text",defaultValue:r.author,...f("author",{required:!0})}),l.jsx(F,{label:"Svar",note:"omringende whitespace blir ignorert",type:"text",defaultValue:r.answer,...f("answer",{required:!0})}),l.jsx(F,{label:"Aktiv fra",disabled:!0,type:"datetime-local",value:R(o)}),l.jsx(F,{label:"Aktiv til",disabled:!0,type:"datetime-local",value:R(a)}),l.jsx(Mt,{challenge:r,register:f,setValue:m,className:"col-span-3"}),l.jsx("div",{className:"col-span-3",children:l.jsx(q,{label:"Innhold",note:"tittel-elementet blir erstattet med tittel fra over",className:"col-span-3",children:l.jsx(qe,{className:"form-textarea block w-full text-black",rows:5,defaultValue:r.markdown_content,...f("markdown_content",{required:!0})})})})]})]}),d&&S&&x&&l.jsx(se,{withoutInput:!0,challenge:{...S,content:x.html}})]})},he=b.memo(Lt),Dt=()=>{const{door:r}=ae(),i=ie(r,parseInt),u=V(),{data:d,isLoading:c}=ue(i),{mutate:f}=vt(),h=m=>{f({challenge:m},{onSuccess:()=>u(`/admin/doors?door=${m.door}`)})};return b.useLayoutEffect(()=>{(!i||!c&&!d)&&u("/admin/doors/new")},[i,c,d,u]),!i||c||!d?null:l.jsxs("div",{className:"space-y-16",children:[l.jsx("div",{className:"text-center",children:l.jsxs("span",{className:"text-4xl font-semibold",children:["Luke ",i]})}),l.jsx(he,{challenge:d,submit:h})]})},$t=({serviceMessage:r,newForm:i=!1,submit:u})=>{const{register:d,handleSubmit:c,setValue:f}=re({defaultValues:{...r,...!i&&{resolved_at:R(r.resolved_at??ut(new Date))}}}),{data:h}=O({select:m=>C(Qe(m),Y)});return l.jsx("div",{className:"space-y-16",children:l.jsxs("form",{className:"space-y-8",onSubmit:c(u),children:[l.jsx("div",{className:"space-x-8",children:l.jsx(E,{type:"submit",children:"Lagre"})}),l.jsxs("div",{className:"grid grid-cols-3 gap-8",children:[l.jsx(F,{label:"Innhold",type:"text",labelClassName:"col-span-3",className:"w-full",defaultValue:r.content,...d("content",{required:!0})}),!i&&l.jsx(F,{label:"Løsning",type:"text",labelClassName:"col-span-3",className:"w-full",defaultValue:r.resolution_content??"",...d("resolution_content",{setValueAs:m=>I(m)?null:m})}),l.jsx(q,{label:"Luke",className:"col-span-3",defaultValue:r.resolution_content??"",children:l.jsxs("select",{className:"form-select block text-black",defaultValue:r.door??void 0,...d("door",{setValueAs:m=>I(m)?void 0:Y(m)}),children:[l.jsx("option",{label:"-",value:""}),C(h,m=>l.jsx("option",{label:G(m),value:m},m))]})}),!i&&l.jsxs(l.Fragment,{children:[l.jsx(F,{label:"Opprettet",type:"datetime-local",value:R(r.created_at??""),disabled:!0}),l.jsxs("div",{children:[l.jsx(F,{label:"Løsningstidspunkt",type:"datetime-local",...d("resolved_at")}),l.jsx(E,{type:"button",className:"!text-xs",onClick:()=>f("resolved_at",null),content:"Nullstill"})]})]})]})]})})},me=b.memo($t),Et=()=>{const{uuid:r}=ae(),i=V(),{data:u,isLoading:d}=oe({select:h=>Oe(h,{uuid:r})}),{mutate:c}=xt(),f=h=>{ie(r,m=>c({uuid:m,service_message:h},{onSuccess:()=>i("/admin/service_messages")}))};return b.useEffect(()=>{!d&&!u&&i("/admin/service_messages/new")},[d,u,i]),d||!u?null:l.jsx(me,{serviceMessage:u,submit:f})},Ut=()=>{const r=V(),{mutate:i}=pt(),u=c=>{i({challenge:c},{onSuccess:()=>r(`/admin/doors?door=${c.door}`)})},d=de();return I(d)?l.jsx("div",{className:"text-center",children:l.jsx("span",{className:"text-4xl font-semibold",children:"Ingen ledige luker!"})}):l.jsx("div",{children:l.jsx(he,{newForm:!0,challenge:{door:d[0],title:"",author:"",answer:"",markdown_content:"",files:[]},submit:u})})},Pt=()=>{const r=V(),{mutate:i}=bt(),u=d=>{i({service_message:d},{onSuccess:()=>r("/admin/service_messages")})};return l.jsx(me,{newForm:!0,serviceMessage:{content:"",resolution_content:null,resolved_at:null,door:null},submit:u})},Tt=()=>{const{data:r,isLoading:i}=oe(),{mutate:u}=jt(),d=c=>{window.confirm("Sikker på at du vil slette driftsmelding?")&&u({uuid:c})};return i?null:l.jsxs("div",{children:[l.jsx(ze,{className:"place-self-center",children:"Driftsmeldinger"}),l.jsx("div",{className:"grid grid-cols-1 justify-items-center gap-12",children:I(r)?l.jsx("div",{children:"🎄 Ingen driftsmeldinger. Livet er herlig! 🎄"}):C(r,c=>l.jsxs("div",{className:"flex w-full flex-col gap-4",children:[l.jsxs("div",{className:"flex justify-end gap-8",children:[l.jsx(P,{to:`/admin/service_messages/${c.uuid}/edit`,content:"Rediger"}),l.jsx(E,{content:"Slett",onClick:()=>d(c.uuid)})]}),l.jsx(He,{serviceMessage:c})]},c.uuid))})]})},Rt=()=>{const r=V(),{pathname:i}=te(),u=b.useMemo(()=>U(i,"door")?U(i,"new")?"Ny luke":U(i,"edit")?"Rediger luke":"Luker":U(i,"service_message")?U(i,"new")?"Ny driftsmelding":U(i,"edit")?"Rediger driftsmelding":"Driftsmeldinger":"Admin",[i]),{data:d,isLoading:c}=ke();return b.useLayoutEffect(()=>{!c&&(!d||!d.is_admin)&&r("/")},[c,d,r]),!c&&(!d||!d.is_admin)?null:l.jsxs(Ge,{title:u,containerClassName:"place-self-center child:w-11/12 child:place-self-center relative",children:[l.jsx(dt,{}),l.jsxs(Ze,{children:[l.jsx($,{path:"doors",element:l.jsx(At,{})}),l.jsx($,{path:"doors/new",element:l.jsx(Ut,{})}),l.jsx($,{path:"doors/:door/edit",element:l.jsx(Dt,{})}),l.jsx($,{path:"service_messages",element:l.jsx(Tt,{})}),l.jsx($,{path:"service_messages/new",element:l.jsx(Pt,{})}),l.jsx($,{path:"service_messages/:uuid/edit",element:l.jsx(Et,{})}),l.jsx($,{element:l.jsx(We,{to:"doors"})})]})]})};export{Rt as default};