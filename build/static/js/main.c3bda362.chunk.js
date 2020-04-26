(this["webpackJsonpreact-4798tj"]=this["webpackJsonpreact-4798tj"]||[]).push([[0],{305:function(e,a,t){e.exports=t(563)},462:function(e,a,t){},463:function(e,a,t){},465:function(e,a,t){},562:function(e,a,t){},563:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(39),c=t(19),o=t(27),i=t(11);function u(e,a){var t=Object(n.useState)((function(){try{var t=window.localStorage.getItem(e);return t?JSON.parse(t):a}catch(n){return console.log(n),a}})),l=Object(i.a)(t,2),r=l[0],c=l[1];return[r,function(a){try{var t=a instanceof Function?a(r):a;c(t),window.localStorage.setItem(e,JSON.stringify(t))}catch(n){console.log(n)}}]}var m={name:"",empty:!0,price:"",isbn:"",amount:1,authors:[]},s={name:"Max Mustermann",invoiceAddress:"<p>musterdomain.de<br/>  Muster Firma GbR<br/>  Musterstra\xdfe 2<br/>  15366 Musterstadt</p>",shippingAddress:"<p>musterdomain.de \u2022 Muster Firma GbR<br/>  Musterstra\xdfe 2 \u2022 15366 Musterstadt</p>",discount:0,ust:7},d={invoiceDate:(new Date).toString(),shippingDate:(new Date).toString(),orderDate:(new Date).toString(),invoiceNumber:"",porto:"5.00",finalText:"",articles:[]},E=t(26),b=t.n(E),v={name:"",executive:"",logo:"",aboveClientInvoiceAddress:"<p>Verlag GbR \u2022 Musterstra\xdfe 12 \u2022 10405 Musterstadt</p>",footerText:"<p><b>Gesch\xe4ftsf\xfchrung</b> Max Mustermann<br/>  <b>Bankverbindung</b> Postbank \u2022 IBAN DE 00 0000 0000 0000 00 \u2022 BIC ABCDEFGHIJKL<br/>  <b>Steuernummer</b> 000/000/00000 | <b>USt-IdNr.</b> DE000000000</p>",invoiceText:"<p>Zahlen Sie bitte den Rechnungsbetrag bis zum <Datum> unter Angabe der Rechnungsnummerauf unten stehendes Konto.<br/>Die gelieferte Ware bleibt bis zur vollst\xe4ndigen Bezahlung Eigentum des Verlages.<br/>Vielen Dank f\xfcr Ihre Bestellung.</p><p>Mit herzlichen Gr\xfc\xdfen.<br/>Musterstadt, den <Datum></p>",subjectAndBelow:"<h3>Rechnung</h3>  <p><br></p>  <p>wir erlauben uns, in Rechnung zu stellen:</p>",contactInformation:"<p>Buch- und Zeitschriftenverlag GbR<br>  Max Mustermann</p>  <p>Hauptsitz<br>  Musterstra\xdfe 12<br>  10405 Musterstadt<br>  Telefon 000 / 00 00 00</p>  <p>B\xfcro Musterstadt<br>  Musterstra\xdfe 19<br>  10409 Musterstadt<br>  Telefon 030 / 00 00 00 00</p>  <p>info@muster-email.de<br>  www.musterdomain.de</p>  <p>Steuernummer 000/000/00000<br>  Finanzamt Musterstadt</p>"},p={name:"",contact:"",books:[]};function f(){return u("company",v)}function g(){return u("invoices",[])}function h(){return u("articles",[])}function C(){return u("authors",[])}function y(){return u("customers",[])}var j=t(567),O=t(578),N=t(582),F=t(21),S=t(579),I=t(576);function k(e){var a=e.customer,t=e.setCustomer,r=Object(n.useState)(b.a.createValueFromString(a.invoiceAddress,"html")),o=Object(i.a)(r,2),u=o[0],m=o[1],s=Object(n.useState)(b.a.createValueFromString(a.shippingAddress,"html")),d=Object(i.a)(s,2),E=d[0],v=d[1];Object(n.useEffect)((function(){m(b.a.createValueFromString(a.invoiceAddress,"html")),v(b.a.createValueFromString(a.shippingAddress,"html"))}),[a]);var p=function(e,n){var l=n.name,r=n.value;("ust"!==l&&"discount"!==l||(r=parseFloat(r),!isNaN(r)))&&t(Object(c.a)({},a,Object(F.a)({},l,r)))},f=function(e,n){t(Object(c.a)({},a,Object(F.a)({},e,n.toString("html"))))};return l.a.createElement(S.a,null,l.a.createElement(S.a.Group,null,l.a.createElement(S.a.Field,{control:I.a,label:"Name",value:a.name,name:"name",onChange:p})),l.a.createElement(S.a.Field,{control:b.a,label:"Rechnungsadresse",onChange:m,value:u,onBlur:function(){f("invoiceAddress",u)}}),l.a.createElement(S.a.Field,{control:b.a,label:"Lieferadress",onChange:v,value:E,onBlur:function(){f("shippingAddress",E)}}),l.a.createElement(S.a.Group,null,l.a.createElement(S.a.Field,{id:"form-input-control-last-name",control:I.a,label:"MwST",placeholder:"7",name:"ust",icon:"percent",onChange:p,value:a.ust}),l.a.createElement(S.a.Field,{id:"form-input-control-last-name",control:I.a,label:"Rabat",placeholder:"0",icon:"percent",name:"discount",onChange:p,value:a.discount})))}var A=function(){var e=u("customers",[]),a=Object(i.a)(e,2),t=a[0],r=a[1],m=Object(n.useState)(),d=Object(i.a)(m,2),E=d[0],b=d[1];return l.a.createElement("div",null,l.a.createElement(j.a,{onClick:function(){return b(Object(c.a)({},s,{id:t.length}))},primary:!0},"Neuer Kunde"),E&&l.a.createElement(O.a,{onClose:function(){return b()},open:!0},l.a.createElement(O.a.Header,null,"Kunde"),l.a.createElement(O.a.Content,null,l.a.createElement(k,{customer:E,setCustomer:b})),l.a.createElement(O.a.Actions,null,l.a.createElement(j.a,{onClick:function(){return b()},content:"Abbrechen",negative:!0,icon:"close",labelPosition:"right"}),l.a.createElement(j.a,{onClick:function(){r([].concat(Object(o.a)(t),[E])),b()},content:"Speichern",primary:!0,icon:"check",labelPosition:"right"}))),l.a.createElement(N.a,{celled:!0},l.a.createElement(N.a.Header,null,l.a.createElement(N.a.Row,null,l.a.createElement(N.a.HeaderCell,null,"Name"),l.a.createElement(N.a.HeaderCell,null,"Rechnungsadresse"),l.a.createElement(N.a.HeaderCell,null,"Lieferadress"),l.a.createElement(N.a.HeaderCell,null,"Rabatt"),l.a.createElement(N.a.HeaderCell,null,"MwST"))),l.a.createElement(N.a.Body,null,t.map((function(e){return l.a.createElement(N.a.Row,null,l.a.createElement(N.a.Cell,null,e.name),l.a.createElement(N.a.Cell,null,l.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.invoiceAddress}})),l.a.createElement(N.a.Cell,null,l.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.shippingAddress}})),l.a.createElement(N.a.Cell,null,e.discount),l.a.createElement(N.a.Cell,null,e.ust))})))))},M=(t(462),t(580)),H=t(95);function B(e){var a=e.article,t=e.setArticle,r=Object(n.useState)(a.price),u=Object(i.a)(r,2),m=u[0],s=u[1],d=Object(n.useState)(""),E=Object(i.a)(d,2),b=E[0],v=E[1],p=C(),f=Object(i.a)(p,1)[0],g=Object(n.useMemo)((function(){return f.filter((function(e){return e&&e.name.includes(b)}))}),[f,b]);var h=function(e,n){var l=n.name,r=n.value;if("price"===l){if(r=parseFloat(r),isNaN(r))return void s("");r=r.toFixed(2),s(r)}t(Object(c.a)({},a,Object(F.a)({},l,r)))};return l.a.createElement(S.a,null,l.a.createElement(S.a.Group,{width:"equal"},l.a.createElement(S.a.Field,{id:"form-input-control-name",control:I.a,label:"Name",placeholder:"Name",name:"name",onChange:h,value:a.name}),l.a.createElement(S.a.Field,{id:"form-input-control-name",control:I.a,label:"Lagerbestand",placeholder:"Menge",type:"number",onChange:h,name:"amount",value:a.amount})),l.a.createElement(S.a.Group,null,l.a.createElement(S.a.Field,{id:"form-input-control-last-name",control:I.a,label:"ISBN",placeholder:"ISBN",name:"isbn",onChange:h,value:a.isbn}),l.a.createElement(S.a.Field,{id:"form-input-control-last-name",control:I.a,label:"Preis",placeholder:"Preis",name:"price",icon:"euro sign",onChange:function(e,a){var t=a.value;return s(t)},onBlur:function(e){h(0,{name:e.target.name,value:e.target.value})},value:m})),l.a.createElement("div",null,l.a.createElement("label",null,l.a.createElement("b",null,"Autoren")),l.a.createElement("div",null,a.authors.map((function(e){return l.a.createElement(H.a,null,e.name)}))),l.a.createElement(I.a,{name:"author",placeholder:"Suche...",value:b,onChange:function(e,a){var t=a.value;return v(t)}}),""!==b&&l.a.createElement("div",null,g.map((function(e){return l.a.createElement(H.a,{onClick:function(){return n=e,void t(Object(c.a)({},a,{authors:[].concat(Object(o.a)(a.authors),[n])}));var n}},e.name)})))))}t(463);function D(e){var a=new Date(e),t=a.getDate(),n=a.getMonth()+1;return l.a.createElement("span",{dangerouslySetInnerHTML:{__html:"".concat(t<10?"0"+t:t,".&#8202;").concat(n<10?"0"+n:n,".&#8202;").concat(a.getFullYear())}})}var w=function(){var e=h(),a=Object(i.a)(e,2),t=a[0],r=a[1],u=Object(n.useState)(),s=Object(i.a)(u,2),d=s[0],E=s[1],b=Object(n.useState)(),v=Object(i.a)(b,2),p=v[0],f=v[1],C=g(),y=Object(i.a)(C,1)[0],F=Object(n.useMemo)((function(){return p?y.reduce((function(e,a){for(var t in a.articles){var n=a.articles[t];if(n.id===p.id)return[].concat(Object(o.a)(e),[Object(c.a)({},a,{article:n})])}return e}),[]):null}),[y,p]);return l.a.createElement("div",{className:"articles-tab-container"},l.a.createElement(j.a,{onClick:function(){return E(Object(c.a)({},m,{id:t.length}))},primary:!0},"Neuer Artikel"),d&&l.a.createElement(O.a,{onClose:function(){return E()},open:!0},l.a.createElement(O.a.Header,null,"Artikel"),l.a.createElement(O.a.Content,null,l.a.createElement(B,{article:d,setArticle:E})),l.a.createElement(O.a.Actions,null,l.a.createElement(j.a,{onClick:function(){return E()},content:"Abbrechen",negative:!0,icon:"close",labelPosition:"right"}),l.a.createElement(j.a,{onClick:function(){var e=Object(o.a)(t);e[d.id]=d,r(e),E()},content:"Speichern",primary:!0,icon:"check",labelPosition:"right"}))),p&&l.a.createElement(O.a,{onClose:function(){return f()},open:!0},l.a.createElement(O.a.Header,null,"Rechnungen"),l.a.createElement(O.a.Content,null,l.a.createElement(N.a,null,l.a.createElement(N.a.Header,null,l.a.createElement(N.a.Row,null,l.a.createElement(N.a.HeaderCell,null,"Rechnungsnummer"),l.a.createElement(N.a.HeaderCell,null,"Kunde"),l.a.createElement(N.a.HeaderCell,null,"Verkaufte Exemplare"),l.a.createElement(N.a.HeaderCell,null,"Umsatz"),l.a.createElement(N.a.HeaderCell,null,"Zahlungsdatum"))),l.a.createElement(N.a.Body,null,F.map((function(e){return l.a.createElement(N.a.Row,null,l.a.createElement(N.a.Cell,null,e.invoiceNumber),l.a.createElement(N.a.Cell,null,e.customer.name),l.a.createElement(N.a.Cell,null,e.article.amount),l.a.createElement(N.a.Cell,null,e.article.price),l.a.createElement(N.a.Cell,null,D(e.paymentDate)))})))))),l.a.createElement(N.a,{celled:!0},l.a.createElement(N.a.Header,null,l.a.createElement(N.a.Row,null,l.a.createElement(N.a.HeaderCell,null,"Id"),l.a.createElement(N.a.HeaderCell,null,"Name"),l.a.createElement(N.a.HeaderCell,null,"ISBN"),l.a.createElement(N.a.HeaderCell,null,"Menge"),l.a.createElement(N.a.HeaderCell,null,"Preis"),l.a.createElement(N.a.HeaderCell,null,"Autoren"),l.a.createElement(N.a.HeaderCell,null))),l.a.createElement(N.a.Body,null,t.map((function(e,a){return e&&l.a.createElement(N.a.Row,null,l.a.createElement(N.a.Cell,null,e.id),l.a.createElement(N.a.Cell,null,e.name),l.a.createElement(N.a.Cell,null,e.isbn),l.a.createElement(N.a.Cell,null,e.amount),l.a.createElement(N.a.Cell,null,e.price),l.a.createElement(N.a.Cell,null,e.authors.map((function(e){return l.a.createElement("p",null,e.name)}))),l.a.createElement(N.a.Cell,null,l.a.createElement(j.a,{onClick:function(){return E(e)},icon:"edit"}),l.a.createElement(j.a,{onClick:function(){return f(e)},icon:"list"}),l.a.createElement(j.a,{onClick:function(){return function(e){var a=Object(o.a)(t);a[e]=void 0,r(a)}(a)},icon:"delete"})))})))))},R=t(64),x=t(577),P=t(583),T=t(581),_=t(575),z=t(96),L=t.n(z),G=(t(464),t(465),t(192)),V=t(191),K={flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",borderWidth:2,borderRadius:2,borderColor:"#eeeeee",borderStyle:"dashed",backgroundColor:"#fafafa",color:"#bdbdbd",outline:"none",transition:"border .24s ease-in-out"},Z={borderColor:"#2196f3"},J={borderColor:"#00e676"},q={borderColor:"#ff1744"};function U(e){var a=e.onDrop,t=Object(V.b)({accept:"image/*"}),r=t.isDragActive,o=t.isDragAccept,i=t.isDragReject,u=Object(n.useMemo)((function(){return Object(c.a)({},K,{},r?Z:{},{},o?J:{},{},i?q:{})}),[r,i,o]);return l.a.createElement(V.a,{onDrop:a},(function(e){var a=e.getRootProps,t=e.getInputProps;return l.a.createElement("div",{className:"container"},l.a.createElement("div",a({style:u,onDrop:function(e){return e.stopPropagation()}}),l.a.createElement("input",t()),l.a.createElement("p",null,"Drag 'n' drop some files here, or click to select files")))}))}function W(e){var a=e.company,t=e.setCompany,r=Object(n.useState)(b.a.createValueFromString(a.footerText,"html")),o=Object(i.a)(r,2),u=o[0],m=o[1],s=Object(n.useState)(b.a.createValueFromString(a.subjectAndBelow,"html")),d=Object(i.a)(s,2),E=d[0],v=d[1],p=Object(n.useState)(b.a.createValueFromString(a.invoiceText,"html")),f=Object(i.a)(p,2),g=f[0],h=f[1],C=Object(n.useState)(b.a.createValueFromString(a.contactInformation,"html")),y=Object(i.a)(C,2),O=y[0],N=y[1],k=Object(n.useState)(b.a.createValueFromString(a.aboveClientInvoiceAddress,"html")),A=Object(i.a)(k,2),M=A[0],H=A[1],B=function(e,n){t(Object(c.a)({},a,Object(F.a)({},e,n.toString("html"))))},D=function(e,n){var l=n.name,r=n.value;t(Object(c.a)({},a,Object(F.a)({},l,r)))};return l.a.createElement(S.a,null,l.a.createElement(S.a.Field,{label:"Firmename",control:I.a,name:"name",onChange:D,value:a.name}),l.a.createElement(G.a,null,l.a.createElement("h4",null,"Logo"),""!==a.logo?l.a.createElement("div",null,l.a.createElement("img",{src:a.logo,alt:"company logo"}),l.a.createElement(j.a,{negative:!0,onClick:function(){return t(Object(c.a)({},a,{logo:""}))}},"L\xf6schen")):l.a.createElement(U,{onDrop:function(e){var n=e[0],l=new FileReader;l.onload=function(e){t(Object(c.a)({},a,{logo:e.target.result}))},l.readAsDataURL(n)}})),l.a.createElement(S.a.Field,{label:"Firmenf\xfchrung",control:I.a,name:"executive",onChange:D,value:a.executive}),l.a.createElement(S.a.Field,{control:b.a,value:M,onChange:H,onBlur:function(){B("aboveClientInvoiceAddress",M)},label:"Absender",name:"aboveClientInvoiceAddress"}),l.a.createElement(S.a.Field,{control:b.a,value:O,onChange:N,onBlur:function(){B("contactInformation",O)},label:"Kontakt Informationen",name:"contactInformation"}),l.a.createElement(S.a.Field,{control:b.a,value:E,onChange:v,onBlur:function(){B("subjectAndBelow",E)},label:"Betreff und Begr\xfc\xdfung",name:"subjectAndBelow"}),l.a.createElement(S.a.Field,{control:b.a,value:g,onChange:h,onBlur:function(){B("invoiceText",g)},label:"Rechnungstext",name:"invoiceText"}),l.a.createElement(S.a.Field,{control:b.a,value:u,onChange:function(e){m(e)},onBlur:function(){B("footerText",u)},label:"Fu\xdfzeile",name:"footerText"}),l.a.createElement(S.a.Field,{label:"Farbe",control:I.a,placeholder:"z.B. #ffffff oder rgb(120,0,0)",name:"companyColor",onChange:D,value:a.color}))}var Y=function(e){var a=e.invoice,t=e.setInvoice,r=e.setInvoices,d=y(),E=Object(i.a)(d,2),b=E[0],v=E[1],p=f(),h=Object(i.a)(p,2),C=h[0],N=h[1],A=Object(n.useState)(b[a.customer.id]||a.customer),H=Object(i.a)(A,2),D=H[0],w=H[1],R=u("articles",[]),z=Object(i.a)(R,2),G=z[0],V=z[1],K=Object(n.useState)(a.articles),Z=Object(i.a)(K,2),J=Z[0],q=Z[1],U=Object(n.useState)(Object(c.a)({},m,{id:G.length})),Y=Object(i.a)(U,2),Q=Y[0],X=Y[1],$=Object(n.useState)(1),ee=Object(i.a)($,2),ae=ee[0],te=ee[1],ne=Object(n.useState)(1),le=Object(i.a)(ne,2),re=le[0],ce=le[1],oe=Object(n.useState)(void 0),ie=Object(i.a)(oe,2),ue=ie[0],me=ie[1],se=g(),de=Object(i.a)(se,1)[0],Ee=Object(n.useState)(a.porto),be=Object(i.a)(Ee,2),ve=be[0],pe=be[1];Object(n.useEffect)((function(){t(Object(c.a)({},a,{customer:D,articles:J.map((function(e){return Object(c.a)({},G[e.articleId],{},e)})),company:C}))}),[D,J,C]);var fe=function(e,n){var l=n.name,r=n.value,o=n.checked;if("porto"===l){if(r=parseFloat(r),isNaN(r))return void pe("");r=r.toFixed(2),pe(r)}"payed"===l&&(r=o),t(Object(c.a)({},a,Object(F.a)({},l,r)))},ge=function(){return me(!ue)},he=function(e,a){var t=Object(o.a)(G),n=t[e];t[e]=Object(c.a)({},n,{amount:parseFloat(n.amount)+a}),V(t)},Ce=function(){V([].concat(Object(o.a)(G),[Q])),ge()},ye=function(e,n){t(Object(c.a)({},a,Object(F.a)({},n,e.toString())))},je=Object(n.useMemo)((function(){return[{key:b.length,value:b.length,text:"Neuer Kunde"}].concat(b.map((function(e){return{key:e.id,text:e.name,value:e.id}})))}),[b,D]),Oe=Object(n.useMemo)((function(){return[{key:G.length,value:G.length,text:""}].concat(G.map((function(e){return{key:e.id,value:e.id,text:e.name}})))}),[G]),Ne=function(e,a){var t=a.value;t<b.length?w(b[t]):w(Object(c.a)({},s,{id:b.length}))},Fe=function(e,a,t){if(e>=J.length){if(t>=G.length)return;q([].concat(Object(o.a)(J),[{toBeSend:re,toBePayed:ae,articleId:t}])),ce(1),te(1)}else{if("articleId"===a&&t>=G.length)return void q(J.filter((function(a,t){return t!==e})));var n=Object(o.a)(J);n[e][a]=t,q(n)}};return l.a.createElement("div",{className:"invoice-form"},l.a.createElement(x.a,null,l.a.createElement(P.a,{fluid:!0},l.a.createElement(P.a.Content,null,l.a.createElement(P.a.Header,null,"Rechnungsdaten")),l.a.createElement(P.a.Content,null,l.a.createElement(M.a,{panes:[{menuItem:"Kunde",render:function(){return l.a.createElement("div",{className:""},l.a.createElement(S.a,null,l.a.createElement(S.a.Field,{label:"Kunden",control:T.a,search:!0,selection:!0,options:je,value:D.id,onChange:Ne})),l.a.createElement(k,{customer:D,setCustomer:w}))}},{menuItem:"Artikel",render:function(){return l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement(S.a,null,J.map((function(e,a){return l.a.createElement("div",null,l.a.createElement(S.a.Group,{widths:"equal"},l.a.createElement(S.a.Input,{fluid:!0,name:"toBeSend",type:"number",label:"Zu Senden",value:e.toBeSend,onChange:function(e,t){var n=t.value,l=t.name;return Fe(a,l,n)}}),l.a.createElement(S.a.Input,{fluid:!0,name:"toBePayed",type:"number",label:"Zu Bezahlen",value:e.toBePayed,onChange:function(e,t){var n=t.value,l=t.name;return Fe(a,l,n)}}),l.a.createElement(S.a.Field,{control:T.a,fluid:!0,label:"Artikel",name:"articleId",search:!0,selection:!0,options:Oe,value:e.articleId,onChange:function(e,t){var n=t.value,l=t.name;return Fe(a,l,n)}})))})),l.a.createElement(S.a.Group,{widths:"equal"},l.a.createElement(S.a.Input,{fluid:!0,name:"amount",type:"number",label:"Erhalten",value:re,onChange:function(e,a){var t=a.value;return ce(t)}}),l.a.createElement(S.a.Input,{fluid:!0,name:"amountPayed",type:"number",label:"Zu Bezahlen",value:ae,onChange:function(e,a){var t=a.value;return te(t)}}),l.a.createElement(S.a.Field,{control:T.a,fluid:!0,label:"Artikel",name:"articleId",search:!0,selection:!0,options:Oe,value:Q.id,onChange:function(e,a){var t=a.value;return Fe(J.length,"articleId",t)}}))),l.a.createElement(j.a,{onClick:ge},"Neuen Artikel Anlegen")),l.a.createElement(O.a,{open:ue,onClose:ge},l.a.createElement(O.a.Header,null,"Neuer Artikel"),l.a.createElement(O.a.Content,null,l.a.createElement(B,{article:Q,setArticle:X})),l.a.createElement(O.a.Actions,null,l.a.createElement(j.a,{onClick:ge,content:"Abbrechen",negative:!0,icon:"close",labelPosition:"right"}),l.a.createElement(j.a,{onClick:Ce,content:"Anlegen",primary:!0,icon:"check",labelPosition:"right"}))))}},{menuItem:"Allgemein",render:function(){return l.a.createElement("div",null,l.a.createElement(S.a,null,l.a.createElement(S.a.Field,{label:"Rechnungsdatum",name:"invoiceDate",selected:new Date(a.invoiceDate),onChange:function(e){return ye(e,"invoiceDate")},control:L.a,dateFormat:"dd/MM/yyyy"}),l.a.createElement(S.a.Field,{label:"Bestelldatum",name:"orderDate",selected:new Date(a.orderDate),onChange:function(e){return ye(e,"orderDate")},control:L.a,dateFormat:"dd/MM/yyyy"}),l.a.createElement(S.a.Field,{label:"Versanddatum",name:"shippingDate",selected:new Date(a.shippingDate),onChange:function(e){return ye(e,"shippingDate")},control:L.a,dateFormat:"dd/MM/yyyy"}),l.a.createElement(S.a.Field,{label:"Porto",value:ve,name:"porto",onChange:function(e,a){var t=a.value;return pe(t)},control:I.a,onBlur:function(e){return fe(0,{name:e.target.name,value:e.target.value})},icon:"euro"}),l.a.createElement(S.a.Field,{label:"Rechnungsnummer",name:"invoiceNumber",value:a.invoiceNumber,onChange:fe,control:I.a}),l.a.createElement(S.a.Field,null,l.a.createElement("label",null,"Bezahlt"),l.a.createElement(_.a,{onChange:function(e,n){var l,r,o=n.name,i=n.checked;i?t(Object(c.a)({},a,(l={},Object(F.a)(l,o,i),Object(F.a)(l,"paymentDate",new Date),l))):t(Object(c.a)({},a,(r={},Object(F.a)(r,o,i),Object(F.a)(r,"paymentDate",void 0),r)))},name:"payed",checked:a.payed,toggle:!0})),a.payed&&l.a.createElement(S.a.Field,{label:"Zahlungseingangsdatum",name:"paymentDate",selected:new Date(a.paymentDate),onChange:function(e){return ye(e,"paymentDate")},control:L.a,dateFormat:"dd/MM/yyyy"})))}},{menuItem:"Firma",render:function(){return l.a.createElement(W,{company:C,setCompany:N})}}]}))),l.a.createElement(j.a,{onClick:function(){return t()},content:"Abbrechen",negative:!0,icon:"close",labelPosition:"right"}),a.customer&&l.a.createElement(j.a,{onClick:function(){var e=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(e)for(var t in e.articles)he(e.articles[t].id,a*e.articles[t].amount)};a.totalPrice=function(e){return e.articles.map((function(a){var t=a.price*a.toBePayed;return t-t*(e.customer.discount/100)})).reduce((function(e,a){return a+e}),0)}(a);var n=Object(o.a)(de);e(de[a.id]),n[a.id]=a,e(n[a.id],-1),r(n),t();var l=Object(o.a)(b);l[D.id]=D,v(l)},content:"Speichern",primary:!0,icon:"check",labelPosition:"right"})))},Q=t(292),X=t.n(Q),$=t(190),ee=t.n($),ae=function(e){var a=e.id,t=(e.label,e.fileName);return l.a.createElement("div",{className:"tc mb4 mt2"},l.a.createElement("div",{id:"myMm",style:{height:"1mm"}}),l.a.createElement(j.a,{primary:!0,onClick:function(){var e,n,l,r,c=document.getElementById(a),o=(e=c.offsetHeight,Math.floor(e/document.getElementById("myMm").offsetHeight)),i=(n=297,document.getElementById("myMm").offsetHeight*n),u=o<=297?1:Math.floor(o/297)+1;console.log({input:c,inputHeightMm:o,a4HeightMm:297,a4HeightPx:i,numPages:u,range:(l=0,r=u,Array(r-l).join(0).split(0).map((function(e,a){return a+l}))),comp:o<=297,inputHeightPx:c.offsetHeight}),X()(c,{scale:2}).then((function(e){var a,n=e.toDataURL("image/png",1);console.log(n),(a=o>297?new ee.a("p","mm",[o+16,210]):new ee.a).addImage(n,"PNG",0,0,210,297),a.save("".concat(t,".pdf"))}))}},"Rechnung Drucken"))},te=function(e){var a=e.children,t=e.singleMode,n=e.id;return l.a.createElement("div",{id:n,className:"bg-white shadow-1 center",style:{width:"210mm",height:t?"297mm":""}},a)},ne=(t(562),function(e){var a=e.id,t=e.invoice,n=t.orderDate,r=t.invoiceDate,c=t.shippingDate,o=t.invoiceNumber,i=t.porto,u=t.customer,m=t.articles,s=void 0===m?[]:m,d=t.company,E=(e.invoice,e.setInvoice,s.map((function(e){var a=e.price*e.toBePayed;return(a-a*(u.discount/100))/(1+u.ust/100)})).reduce((function(e,a){return parseFloat(a)+e}),0));return u?l.a.createElement(te,{singleMode:!0,id:a},l.a.createElement("div",{className:"invoice-folding-line",style:d.companyColor?{borderColor:d.companyColor}:{}}),l.a.createElement("div",{className:"invoice-page-pdf"},l.a.createElement("div",{className:"invoice-page-top"},l.a.createElement("img",{className:"invoice-header-company-logo",src:d.logo,alt:"company logo"}),l.a.createElement("div",{className:"invoice-header"},l.a.createElement("div",{className:"invoice-header-customer-address"},l.a.createElement("div",{className:"invoice-header-customer-company",dangerouslySetInnerHTML:{__html:d.aboveClientInvoiceAddress}}),u?l.a.createElement("div",{className:"invoice-header-customer-info",dangerouslySetInnerHTML:{__html:u.invoiceAddress}}):l.a.createElement(j.a,null,"Kunde hinzuf\xfcgen")),l.a.createElement("div",{className:"invoice-header-company-info",dangerouslySetInnerHTML:{__html:d.contactInformation}}))),l.a.createElement("div",{className:"invoice-body"},l.a.createElement("div",{className:"invoice-body-top"},l.a.createElement("div",{className:"invoice-subject"},l.a.createElement("div",{className:"invoice-subject-and-below",dangerouslySetInnerHTML:{__html:d.subjectAndBelow}}),l.a.createElement("div",{className:"invoice-body-subject-key-values"},l.a.createElement("div",{className:"invoice-body-subject-keys"},l.a.createElement("div",{className:"invoice-body-order-date"},l.a.createElement("p",null,l.a.createElement("b",null,"Bestelldatum:"))),l.a.createElement("div",{className:"invoice-body-send-date"},l.a.createElement("p",null,l.a.createElement("b",null,"Versanddatum:"))),l.a.createElement("div",{className:"invoice-body-send-to"},l.a.createElement("p",null,l.a.createElement("b",null,"Versand an:")))),l.a.createElement("div",{className:"invoice-body-subject-values"},l.a.createElement("div",{className:"invoice-body-order-date"},l.a.createElement("p",null,l.a.createElement("b",null,D(n)))),l.a.createElement("div",{className:"invoice-body-send-date"},l.a.createElement("p",null,l.a.createElement("b",null,D(c)))),u&&l.a.createElement("div",{className:"invoice-body-send-to",dangerouslySetInnerHTML:{__html:u.shippingAddress}})))),l.a.createElement("div",{className:"invoice-body-top-right"},l.a.createElement("div",{className:"invoice-body-invoice-date"},l.a.createElement("p",null,"Rechnungsdatum: ",l.a.createElement("b",null,D(r)))),l.a.createElement("div",{className:"invoice-body-invoice-nr"},l.a.createElement("p",null,"Rechnungsnummer: ",l.a.createElement("b",null,o))),l.a.createElement("div",{className:"invoice-body-invoice-hint"},l.a.createElement("p",null,"(Bitte bei Zahlung angeben)")))),l.a.createElement("div",{className:"invoice-body-bottom"},l.a.createElement("div",{className:"invoice-body-article-wrapper"},s.map((function(e){var a=e.toBePayed,t=e.toBeSend,n=e.price,r=e.name,c=e.isbn,o=parseInt(a)>1,i=n*a,m=i-i*(u.discount/100),d=m/(1+u.ust/100);return l.a.createElement("div",{className:"invoice-body-article"},l.a.createElement("div",{className:"invoice-body-article-left"},l.a.createElement("div",{className:"invoice-body-article-description"},l.a.createElement("div",null,l.a.createElement("b",null,a!==t&&t+"/",a," Exemplar",o&&"e")),l.a.createElement("div",{className:"invoice-body-article-title"},l.a.createElement("b",null,"\u201e",r,"\u201c")),l.a.createElement("div",{className:"invoice-body-article-title"},c)),l.a.createElement("div",{className:"invoice-body-artivle-price-calc"},"Preis ".concat(o?"je":""," ").concat(n," \u20ac").concat(o?" = ".concat(i.toFixed(2),"\u20ac"):"").concat(u.discount>0?", abz\xfcglich ".concat(u.discount," % Rabatt = ").concat(m.toFixed(2)," \u20ac"):""," (beinhaltet ").concat(u.ust," % MwST = ").concat((m-d).toFixed(2),")"))),l.a.createElement("div",{className:"invoice-body-article-price"},l.a.createElement("b",null,s.length>1&&"".concat(d.toFixed(2)," \u20ac"))))}))),l.a.createElement("div",{className:"invoice-body-price-calculation"},l.a.createElement("div",null,l.a.createElement("p",null,"Netto"),l.a.createElement("p",null,l.a.createElement("b",null,E.toFixed(2)," \u20ac"))),l.a.createElement("div",null,l.a.createElement("p",null,"Versandkosten"),l.a.createElement("p",null,l.a.createElement("b",null,i," \u20ac"))),l.a.createElement("div",null,l.a.createElement("p",null,"+".concat(u.ust,"% Mehrwertsteuer")),l.a.createElement("p",null,l.a.createElement("b",null,((E+parseFloat(i))*parseFloat(u.ust)/100).toFixed(2)," ","\u20ac")))),l.a.createElement("div",{className:"invoice-body-price"},l.a.createElement("p",null,"Rechnungsbetrag"),l.a.createElement("p",null,l.a.createElement("b",null,((E+parseFloat(i))*(1+parseFloat(u.ust)/100)).toFixed(2)," ","\u20ac"))),l.a.createElement("div",null,l.a.createElement("p",{className:"invoice-body-final-text",dangerouslySetInnerHTML:{__html:d.invoiceText}})))),l.a.createElement("div",{className:"invoice-footer",style:d.companyColor?{borderColor:d.companyColor}:{},dangerouslySetInnerHTML:{__html:d.footerText}}))):null}),le=function(e){var a=e.invoice,t=e.setInvoice,n=e.setInvoices;return l.a.createElement("div",{className:"invoice-page"},l.a.createElement("div",{className:"invoice-form-wrapper"},l.a.createElement(Y,{invoice:a,setInvoice:t,setInvoices:n})),l.a.createElement("div",{className:"invoice-page-wrapper"},l.a.createElement(ae,{id:"singlePage",label:"Rechnung Drucken",fileName:a.invoiceNumber}),l.a.createElement(ne,{id:"singlePage",invoice:a,setInvoice:t})))},re=function(){var e=g(),a=Object(i.a)(e,2),t=a[0],r=a[1],o=Object(n.useState)(),u=Object(i.a)(o,2),m=u[0],E=u[1],b=f(),v=Object(i.a)(b,1)[0],p=y(),h=Object(i.a)(p,1)[0];return m?l.a.createElement(le,{invoice:m,setInvoice:E,setInvoices:r}):l.a.createElement("div",{className:"invoice-tab-container"},l.a.createElement(j.a,{onClick:function(){return E(Object(c.a)({},d,{id:t.length,customer:Object(c.a)({},s,{id:h.length}),company:v}))},primary:!0},"Neue Rechnung"),l.a.createElement(N.a,{celled:!0},l.a.createElement(N.a.Header,null,l.a.createElement(N.a.Row,null,l.a.createElement(N.a.HeaderCell,null,"Rechnungsnummer"),l.a.createElement(N.a.HeaderCell,null,"Rechnungsdatum"),l.a.createElement(N.a.HeaderCell,null,"Kunde"),l.a.createElement(N.a.HeaderCell,null,"Artikel"),l.a.createElement(N.a.HeaderCell,null,"Gesamtpreis"),l.a.createElement(N.a.HeaderCell,null,"Zahlungseingang"),l.a.createElement(N.a.HeaderCell,null))),l.a.createElement(N.a.Body,null,t.map((function(e){return l.a.createElement(N.a.Row,null,l.a.createElement(N.a.Cell,null,e.invoiceNumber),l.a.createElement(N.a.Cell,null,D(e.invoiceDate)),l.a.createElement(N.a.Cell,null,e.customer.name),l.a.createElement(N.a.Cell,null,e.articles.map((function(e){return l.a.createElement("p",null,e.name)}))),l.a.createElement(N.a.Cell,null,e.totalPrice.toFixed(2),"\u20ac"),l.a.createElement(N.a.Cell,null,e.paymentDate?D(e.paymentDate):"Ausstehend"),l.a.createElement(N.a.Cell,null,l.a.createElement(j.a,{icon:!0,onClick:function(){return E(e)}},l.a.createElement(R.a,{name:"eye"}))))})))))};function ce(){var e=f(),a=Object(i.a)(e,2),t=a[0],n=a[1];return l.a.createElement("div",null,l.a.createElement(W,{company:t,setCompany:n}))}function oe(e){var a=e.author,t=e.setAuthor,r=Object(n.useState)(a.percent),o=Object(i.a)(r,2),u=o[0],m=o[1],s=function(e,n){var l=n.name,r=n.value;if("percent"===l){if(r=parseFloat(r),isNaN(r))return void m("");r=r.toFixed(2),m(r)}t(Object(c.a)({},a,Object(F.a)({},l,r)))};return l.a.createElement(S.a,null,l.a.createElement(S.a.Group,{width:"equal"},l.a.createElement(S.a.Field,{id:"form-input-control-name",control:I.a,label:"Name",placeholder:"Name",name:"name",onChange:s,value:a.name}),l.a.createElement(S.a.Field,{id:"form-input-control-name",control:I.a,label:"Kontakt",placeholder:"Tel, Email, ...",onChange:s,name:"contact",value:a.contact})),l.a.createElement(S.a.Group,null,l.a.createElement(S.a.Field,{id:"form-input-control-last-name",control:I.a,label:"Prozent",placeholder:"Prozent",name:"percent",icon:"percent",onChange:function(e,a){var t=a.value;return m(t)},onBlur:function(e){s(0,{name:e.target.name,value:e.target.value})},value:u})))}function ie(){var e=C(),a=Object(i.a)(e,2),t=a[0],r=a[1],c=Object(n.useState)(),u=Object(i.a)(c,2),m=u[0],s=u[1];return l.a.createElement("div",null,l.a.createElement(j.a,{onClick:function(){return s({authorSceleton:p,id:t.length})},primary:!0},"Neuer Autor"),m&&l.a.createElement(O.a,{onClose:function(){return s()},open:!0},l.a.createElement(O.a.Header,null,"Author"),l.a.createElement(O.a.Content,null,l.a.createElement(oe,{author:m,setAuthor:s})),l.a.createElement(O.a.Actions,null,l.a.createElement(j.a,{onClick:function(){return s()},content:"Abbrechen",negative:!0,icon:"close",labelPosition:"right"}),l.a.createElement(j.a,{onClick:function(e){var a=Object(o.a)(t);a[m.id]=m,r(a),s()},content:"Speichern",primary:!0,icon:"check",labelPosition:"right"}))),l.a.createElement(N.a,{celled:!0},l.a.createElement(N.a.Header,null,l.a.createElement(N.a.Row,null,l.a.createElement(N.a.HeaderCell,null,"Id"),l.a.createElement(N.a.HeaderCell,null,"Name"),l.a.createElement(N.a.HeaderCell,null,"Kontakt"),l.a.createElement(N.a.HeaderCell,null,"Prozent"),l.a.createElement(N.a.HeaderCell,null))),l.a.createElement(N.a.Body,null,t.map((function(e,a){return e&&l.a.createElement(N.a.Row,null,l.a.createElement(N.a.Cell,null,e.id),l.a.createElement(N.a.Cell,null,e.name),l.a.createElement(N.a.Cell,null,e.contact),l.a.createElement(N.a.Cell,null,e.percent," %"),l.a.createElement(N.a.Cell,null,l.a.createElement(j.a,{onClick:function(){return s(e)},icon:"eye"}),l.a.createElement(j.a,{onClick:function(){return function(e){var a=Object(o.a)(t);a[e]=void 0,r(a)}(a)},icon:"delete"})))})))))}function ue(){var e=h(),a=Object(i.a)(e,2),t=a[0];(0,a[1])(t.map((function(e){return Object(c.a)({},e,{authors:[]})})))}var me=function(){return function(e,a){var t=u("version","1"),n=Object(i.a)(t,2),l=n[0],r=n[1];parseInt(l)<a&&e(),r(a)}(ue,2)};function se(){me()}Object(r.render)(l.a.createElement((function(){return se(),l.a.createElement("div",{className:"invoice-app-container"},l.a.createElement(M.a,{panes:[{menuItem:"Rechnungen",render:function(){return l.a.createElement("div",{className:""},l.a.createElement(re,null))}},{menuItem:"Kunden",render:function(){return l.a.createElement("div",{className:""},l.a.createElement(A,null))}},{menuItem:"Artikel",render:function(){return l.a.createElement("div",{className:""},l.a.createElement(w,null))}},{menuItem:"Autoren",render:function(){return l.a.createElement("div",{className:""},l.a.createElement(ie,null))}},{menuItem:"Firma",render:function(){return l.a.createElement("div",{className:""},l.a.createElement(ce,null))}}]}))}),null),document.getElementById("root"))}},[[305,1,2]]]);
//# sourceMappingURL=main.c3bda362.chunk.js.map