(this["webpackJsonptier-cost-calculator"]=this["webpackJsonptier-cost-calculator"]||[]).push([[0],{11:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),i=n(5),o=n.n(i),r=(n(11),n(4)),s=n.n(r),l=n(6),u=n(2),j=(n(13),n(0));var d=function(){var e,t,n={maxBetTiers:{name:"Snake Oil",action:""},teamWinCoinTiers:{name:"Popcorn",action:"wins"},teamLossCoinTiers:{name:"Stale Popcorn",action:"losses"},idolHitsTiers:{name:"Sunflower Seeds",action:"hits"},idolHomersTiers:{name:"Hot Dog",action:"homers"},idolStrikeoutsTiers:{name:"Chips",action:"strikeouts"},idolShutoutsTiers:{name:"Burger",action:"shutouts"},floodClearTiers:{name:"Slushie",action:"cleared baserunners"},blackHoleTiers:{name:"Wet Pretzel",action:"swallowed wins"},idolStealTiers:{name:"Pickles",action:"steals"}},a=Object(c.useState)(null),i=Object(u.a)(a,2),o=i[0],r=i[1],d=Object(c.useState)("maxBetTiers"),v=Object(u.a)(d,2),h=v[0],b=v[1],m=Object(c.useState)(0),O=Object(u.a)(m,2),f=O[0],x=O[1],p=Object(c.useState)(1e3),g=Object(u.a)(p,2),S=g[0],T=g[1],k=function(){var e=Object(l.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("/tier-cost-calculator","/config.json"));case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,r(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){k()}),[]),Object(c.useEffect)((function(){var e=null===o||void 0===o?void 0:o[h];x(0),T(null===e||void 0===e?void 0:e[(null===e||void 0===e?void 0:e.length)-1].amount)}),[h,o]);var w=function(){var e=0;return null===o||void 0===o||o[h].forEach((function(t){t.amount>f&&t.amount<=S&&(e+=t.price)})),e},B=function(e){var t=e?S-f:parseInt(S);return 0!==t?Math.ceil(w()/t):0};return Object(j.jsxs)("div",{className:"container",children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{children:"Snack"}),Object(j.jsx)("select",{value:h,onChange:function(e){return b(e.target.value)},children:o&&Object.keys(o).map((function(e){var t;return Object(j.jsx)("option",{value:e,children:(null===(t=n[e])||void 0===t?void 0:t.name)||e},e)}))})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{children:"Current Earning"}),Object(j.jsxs)("select",{value:f,onChange:function(e){return x(e.target.value)},children:[Object(j.jsx)("option",{value:0,children:0},0),o&&o[h].map((function(e){return Object(j.jsx)("option",{value:e.amount,children:e.amount},e.amount)}))]})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{children:"Goal Earning"}),Object(j.jsxs)("select",{value:S,onChange:function(e){return T(e.target.value)},children:[Object(j.jsx)("option",{value:0,children:0},0),o&&o[h].map((function(e){return Object(j.jsx)("option",{value:e.amount,children:e.amount},e.amount)}))]})]}),Object(j.jsxs)("h4",{children:["Total Price: ",w()]}),"maxBetTiers"!==h&&Object(j.jsxs)("h4",{children:["Breakeven: ","".concat(B(!1)," ").concat((null===(e=n[h])||void 0===e?void 0:e.action)||h)]}),"maxBetTiers"!==h&&Object(j.jsxs)("h4",{children:["Marginal Breakeven: ","".concat(B(!0)," ").concat((null===(t=n[h])||void 0===t?void 0:t.action)||h)]})]})};o.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(d,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.390e2383.chunk.js.map