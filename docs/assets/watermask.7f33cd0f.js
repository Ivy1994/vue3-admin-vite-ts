import{x as e,n as t}from"./element-plus.941a2055.js";import{u as i}from"./index.9f60b726.js";import"./pinia.00414f13.js";import"./vue-i18n.2031fc42.js";import"./xe-utils.b1404dac.js";import"./vxe-table.65aa6709.js";import"./echarts.b8143055.js";console.log();let n=window.MutationObserver||window.WebKitMutationObserver,o=null;const l=(e,i,s)=>{let a="waterMask";document.getElementById(a)&&s.removeChild(document.getElementById(a));let r=document.createElement("canvas");r.width=300,r.height=150;let d=r.getContext("2d");d.rotate(-20*Math.PI/180),d.font="15px Vedana",d.fillStyle="#666666",d.textAlign="center",d.textBaseline="Middle",d.fillText(e,r.width/2,r.height),d.fillText(i,r.width/2,r.height+22);let u=document.createElement("div");u.id=a,u.style.pointerEvents="none",u.style.top="0px",u.style.right="0px",u.style.opacity="0.3",u.style.position="absolute",u.style.zIndex="99999",t(),u.style.width=s.offsetWidth+"px",u.style.height="100%",u.style.background="url("+r.toDataURL("image/png")+") left top repeat",s.appendChild(u),n=window.MutationObserver||window.WebKitMutationObserver,n&&(o=new n((function(){document.querySelector("#waterMask")||(o.disconnect(),o=null,l(e,i,s))})),o.observe(s,{attributes:!0,subtree:!0,childList:!0}))},s=t=>{t.directive("watermask",{mounted(t){const n=i(),o=e().format("YYYY-MM-DD");l(n.username,o,t)},unmounted(e){o&&o.disconnect(),o=null}})};export{s as setWaterMask};