import{aw as u,u as r,ax as x,Q as p}from"./index-mcMzom7c.js";import{r as m}from"./framer-motion-TJDGT-Cc.js";const f=({note:t,iconClassName:o})=>{const[e,s]=u();return r.jsxs(r.Fragment,{children:[r.jsx(x,{name:"info",className:p("hover:cursor-pointer",o),onClick:s}),e&&r.jsx("p",{className:"font-light",children:t})]})},h=({required:t=!1,label:o,note:e,noteDirection:s="right",disabled:l,className:a,children:n,inputWrapperClassName:d,...c})=>{const i=s==="right"?"grid-flow-row grid-cols-[auto_auto_1fr]":"grid-flow-row grid-cols-[auto_auto]",g=s==="right"?"col-span-3":"col-span-2";return r.jsxs("div",{className:`self-stretch grid ${i} gap-x-4 gap-y-3`,children:[r.jsxs("label",{className:p("font-bold",l&&"text-gray/30",a),...c,children:[t&&r.jsx("span",{className:"font-bold text-red-700",children:"* "}),o]}),e&&r.jsx(f,{note:e}),r.jsx("div",{className:p(g,d),children:n})]})},j=m.forwardRef(({id:t,disabled:o,className:e,children:s,type:l,...a},n)=>r.jsx("input",{id:t,ref:n,className:p(`
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
        `,o&&"border-gray/30",e),disabled:o,type:l,...a,children:s})),b=m.forwardRef(({label:t,note:o,labelClassName:e,disabled:s,children:l,required:a,...n},d)=>{const c=m.useId();return r.jsx(h,{required:a,htmlFor:c,label:t,note:o,disabled:s,className:e,children:r.jsx(j,{id:c,ref:d,disabled:s,required:a,...n,children:l})})});export{h as F,f as N,b as a,j as b};
