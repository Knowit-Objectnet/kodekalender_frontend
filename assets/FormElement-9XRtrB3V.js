import{ay as u,u as r,az as x,S as d,H as g}from"./index-Bl78-T4X.js";const h=({note:t,iconClassName:e})=>{const[o,s]=u();return r.jsxs(r.Fragment,{children:[r.jsx(x,{name:"info",className:d("hover:cursor-pointer",e),onClick:s}),o&&r.jsx("p",{className:"font-light",children:t})]})},f=({required:t=!1,label:e,note:o,noteDirection:s="right",disabled:l,className:a,children:n,inputWrapperClassName:p,...c})=>{const i=s==="right"?"grid-flow-row grid-cols-[auto_auto_1fr]":"grid-flow-row grid-cols-[auto_auto]",m=s==="right"?"col-span-3":"col-span-2";return r.jsxs("div",{className:`self-stretch grid ${i} gap-x-4 gap-y-3`,children:[r.jsxs("label",{className:d("font-bold",l&&"text-gray/30",a),...c,children:[t&&r.jsx("span",{className:"font-bold text-red-700",children:"* "}),e]}),o&&r.jsx(h,{note:o}),r.jsx("div",{className:d(m,p),children:n})]})},j=g.forwardRef(({id:t,disabled:e,className:o,children:s,type:l,...a},n)=>r.jsx("input",{id:t,ref:n,className:d(`
          form-input

          block
          w-full

          border-2
          border-purple-500
          rounded-xl

          bg-transparent

          placeholder:text-purple-400
          placeholder:font-light

          group-[.error]:border-red-700
          group-[.error]:text-red-700
        `,e&&"border-gray/30",o),disabled:e,type:l,...a,children:s})),w=g.forwardRef(({label:t,note:e,labelClassName:o,disabled:s,children:l,required:a,...n},p)=>{const c=g.useId();return r.jsx(f,{required:a,htmlFor:c,label:t,note:e,disabled:s,className:o,children:r.jsx(j,{id:c,ref:p,disabled:s,required:a,...n,children:l})})});export{f as F,h as N,w as a,j as b};
