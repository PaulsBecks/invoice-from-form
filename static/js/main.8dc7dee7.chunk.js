(this["webpackJsonpreact-4798tj"]=this["webpackJsonpreact-4798tj"]||[]).push([[0],{303:function(e,a,t){e.exports=t(560)},375:function(e,a,t){},377:function(e,a,t){},552:function(e,a,t){},560:function(e,a,t){"use strict";t.r(a);var n=t(20),l=t(0),r=t.n(l),c=t(41);function o(e,a){var t=Object(l.useState)((function(){try{var t=window.localStorage.getItem(e);return t?JSON.parse(t):a}catch(n){return console.log(n),a}})),r=Object(n.a)(t,2),c=r[0],o=r[1];return[c,function(a){try{var t=a instanceof Function?a(c):a;o(t),window.localStorage.setItem(e,JSON.stringify(t))}catch(n){console.log(n)}}]}var i=t(578),m=function(){var e=o("customers",[]),a=Object(n.a)(e,2),t=a[0];a[1];return r.a.createElement(i.a,{celled:!0},r.a.createElement(i.a.Header,null,r.a.createElement(i.a.Row,null,r.a.createElement(i.a.HeaderCell,null,"Name"),r.a.createElement(i.a.HeaderCell,null,"Adresse"),r.a.createElement(i.a.HeaderCell,null,"PLZ"),r.a.createElement(i.a.HeaderCell,null,"Stadt"),r.a.createElement(i.a.HeaderCell,null,"Rabatt"),r.a.createElement(i.a.HeaderCell,null,"MwST"))),r.a.createElement(i.a.Body,null,t.map((function(e){return r.a.createElement(i.a.Row,null,r.a.createElement(i.a.Cell,null,e.name),r.a.createElement(i.a.Cell,null,e.address),r.a.createElement(i.a.Cell,null,e.postCode),r.a.createElement(i.a.Cell,null,e.city),r.a.createElement(i.a.Cell,null,e.discount),r.a.createElement(i.a.Cell,null,e.ust))}))))},u=(t(375),t(572)),s=t(577),d=function(){var e=o("articles",[]),a=Object(n.a)(e,2),t=a[0];a[1];return r.a.createElement(i.a,{celled:!0},r.a.createElement(i.a.Header,null,r.a.createElement(i.a.Row,null,r.a.createElement(i.a.HeaderCell,null,"Name"),r.a.createElement(i.a.HeaderCell,null,"ISBN"),r.a.createElement(i.a.HeaderCell,null,"Menge"),r.a.createElement(i.a.HeaderCell,null,"Preis"))),r.a.createElement(i.a.Body,null,t.map((function(e){return r.a.createElement(i.a.Row,null,r.a.createElement(i.a.Cell,null,e.name),r.a.createElement(i.a.Cell,null,e.isbn),r.a.createElement(i.a.Cell,null,e.amount),r.a.createElement(i.a.Cell,null,e.price))}))))},E=t(22),b=t(564),v=t(62),p=t(25),f=t(92),g=t(579),h=t(580),C=t(91),N=t(573),y=t(575),j=t(574),O=t(138),F=t.n(O),A={name:"",empty:!0,price:"",isbn:"",amount:1},w={name:"",address:"",postCode:"",city:"",discount:0,ust:7},k={invoiceDate:(new Date).toString(),shippingDate:(new Date).toString(),orderDate:(new Date).toString(),invoiceNumber:"",articles:[]},D={name:"",executive:"",firstAddress:{name:"",address:"",postCode:"",city:"",phone:""},secondAddress:{name:"",address:"",postCode:"",city:"",phone:""},firstEmail:"",secondEmail:"",taxNumber:"",taxOffice:"",bank:"",iban:"",bic:"",logo:""};t(376),t(377);function S(e){var a=new Date(e),t=a.getDate(),n=a.getMonth()+1;return"".concat(t<10?"0"+t:t,".").concat(n<10?"0"+n:n,".").concat(a.getFullYear())}var x=function(e){var a=e.invoice,t=e.setInvoice,c=o("customers",[]),i=Object(n.a)(c,2),m=i[0],s=i[1],d=Object(l.useState)(w),O=Object(n.a)(d,2),k=O[0],D=O[1],S=Object(l.useState)(void 0),x=Object(n.a)(S,2),R=x[0],H=x[1],M=Object(l.useState)(""),I=Object(n.a)(M,2),P=I[0],B=I[1],G=o("articles",[]),L=Object(n.a)(G,2),T=L[0],z=(L[1],Object(l.useState)(A)),Z=Object(n.a)(z,2),V=Z[0],K=Z[1],q=Object(l.useState)(1),J=Object(n.a)(q,2),U=J[0],W=J[1],_=Object(l.useState)(""),Y=Object(n.a)(_,2),Q=Y[0],X=Y[1],$=Object(l.useState)(void 0),ee=Object(n.a)($,2),ae=ee[0],te=ee[1],ne=o("invoices",[]),le=Object(n.a)(ne,2),re=le[0],ce=le[1],oe=function(){return te(!ae)},ie=Object(l.useMemo)((function(){return m.filter((function(e){return e.name.toLowerCase().includes(P.toLowerCase())}))}),[m,P]),me=Object(l.useMemo)((function(){return T.filter((function(e){return e.name.toLowerCase().includes(Q.toLowerCase())}))}),[T,Q]),ue=function(){s([].concat(Object(f.a)(m),[k])),t(Object(E.a)({},a,{customer:k})),be()},se=function(e,a){var t=a.name,n=a.value;("ust"!==t&&"discount"!==t||(n=parseFloat(n),!isNaN(n)))&&D(Object(E.a)({},k,Object(p.a)({},t,n)))},de=function(e,a){var t=a.name,n=a.value;if("price"===t){if(n=parseFloat(n),isNaN(n))return;n=n.toFixed(2)}K(Object(E.a)({},V,Object(p.a)({},t,n)))},Ee=function(e){t(Object(E.a)({},a,{articles:[].concat(Object(f.a)(a.articles),[Object(E.a)({},e,{articleAmount:U})])}))},be=function(){H(!R)},ve=function(e,n){t(Object(E.a)({},a,Object(p.a)({},n,e.toString())))};return r.a.createElement("div",{className:"invoice-form"},r.a.createElement(u.a,null,r.a.createElement(g.a,{fluid:!0},r.a.createElement(g.a.Content,null,r.a.createElement(g.a.Header,null,"Rechnungsdaten")),r.a.createElement(g.a.Content,null,r.a.createElement(h.a,null,r.a.createElement(h.a.Title,{index:0},r.a.createElement(v.a,{name:"dropdown"}),"Kunde"),r.a.createElement(h.a.Content,{active:!0},a.customer?r.a.createElement("div",{class:"invoice-form-label-container"},r.a.createElement(C.a,null,a.customer.name,r.a.createElement(v.a,{name:"delete",onClick:function(){t(Object(E.a)({},a,{customer:void 0}))}}))):r.a.createElement("div",null,r.a.createElement(N.a,{placeholder:"Suche...",onChange:function(e,a){var t=a.value;return B(t)},value:P}),""==P?r.a.createElement(b.a,{onClick:be},"Neuer Kunde"):r.a.createElement("div",{className:"invoice-form-label-container"},ie.map((function(e){return r.a.createElement(C.a,{onClick:function(){return t(Object(E.a)({},a,{customer:e}))}},e.name)})),0==ie.length&&r.a.createElement("p",null,"No Customers found.")),r.a.createElement(y.a,{open:R,onClose:be},r.a.createElement(y.a.Header,null,"Neuer Kunde"),r.a.createElement(y.a.Content,null,r.a.createElement(j.a,null,r.a.createElement(j.a.Group,{width:"equal"},r.a.createElement(j.a.Field,{id:"form-input-control-name",control:N.a,label:"Name",placeholder:"Name",name:"name",onChange:se,value:k.name}),r.a.createElement(j.a.Field,{id:"form-input-control-name",control:N.a,label:"Gesch\xe4ftsform",placeholder:"Gesch\xe4ftsform"})),r.a.createElement(j.a.Group,null,r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Anschrift",placeholder:"Musterschstra\xdfe 3",name:"address",onChange:se,value:k.address}),r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"PLZ",placeholder:"PLZ",name:"postCode",onChange:se,value:k.postCode})),r.a.createElement(j.a.Group,null,r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Stadt",placeholder:"Stadt",name:"city",onChange:se,value:k.city})),r.a.createElement(j.a.Group,null,r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"MwST",placeholder:"7",name:"ust",icon:"percent",onChange:se,value:k.ust}),r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Rabat",placeholder:"0",icon:"percent",name:"discount",onChange:se,value:k.discount})))),r.a.createElement(y.a.Actions,null,r.a.createElement(b.a,{onClick:be,content:"Abbrechen",negative:!0,icon:"close",labelPosition:"right"}),r.a.createElement(b.a,{onClick:ue,content:"Anlegen",primary:!0,icon:"check",labelPosition:"right"}))))),r.a.createElement(h.a.Title,{index:1},r.a.createElement(v.a,{name:"dropdown"}),"Artikel"),r.a.createElement(h.a.Content,{active:!0},r.a.createElement("div",{className:"invoice-form-label-container"},a.articles.map((function(e,n){return r.a.createElement(C.a,null,e.name,r.a.createElement(C.a.Detail,null,e.articleAmount),r.a.createElement(v.a,{name:"delete",onClick:function(){return e=n,void t(Object(E.a)({},a,{articles:a.articles.filter((function(a,t){return t!==e}))}));var e}}))}))),r.a.createElement("div",null,r.a.createElement(N.a,{name:"amount",type:"number",label:"Menge",value:U,onChange:function(e,a){var t=a.value;return W(t)}}),r.a.createElement(N.a,{name:"article",placeholder:"Suche...",value:Q,onChange:function(e,a){var t=a.value;return X(t)}}),""==Q?r.a.createElement(b.a,{onClick:oe},"Neuer Artikel"):r.a.createElement("div",{className:"invoice-form-label-container"},me.map((function(e){return r.a.createElement(C.a,{onClick:function(){return Ee(e)}},e.name)})))),r.a.createElement(y.a,{open:ae,onClose:oe},r.a.createElement(y.a.Header,null,"Neuer Artikel"),r.a.createElement(y.a.Content,null,r.a.createElement(j.a,null,r.a.createElement(j.a.Group,{width:"equal"},r.a.createElement(j.a.Field,{id:"form-input-control-name",control:N.a,label:"Name",placeholder:"Name",name:"name",onChange:de,value:V.name}),r.a.createElement(j.a.Field,{id:"form-input-control-name",control:N.a,label:"Menge",placeholder:"Menge",type:"number",onChange:de,name:"amount",value:V.amount})),r.a.createElement(j.a.Group,null,r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"ISBN",placeholder:"ISBN",name:"isbn",onChange:de,value:V.isbn}),r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Preis",placeholder:"Preis",name:"price",icon:"euro sign",onChange:de,value:V.price})))),r.a.createElement(y.a.Actions,null,r.a.createElement(b.a,{onClick:be,content:"Abbrechen",negative:!0,icon:"close",labelPosition:"right"}),r.a.createElement(b.a,{onClick:ue,content:"Anlegen",primary:!0,icon:"check",labelPosition:"right"})))),r.a.createElement(h.a.Title,null,r.a.createElement(v.a,{name:"dropdown"}),"Allgemein"),r.a.createElement(h.a.Content,{active:!0},r.a.createElement(j.a,null,r.a.createElement(j.a.Field,{label:"Rechnungsdatum",name:"invoiceDate",selected:new Date(a.invoiceDate),onChange:function(e){return ve(e,"invoiceDate")},control:F.a,dateFormat:"dd/MM/yyyy"}),r.a.createElement(j.a.Field,{label:"Bestelldatum",name:"orderDate",selected:new Date(a.orderDate),onChange:function(e){return ve(e,"orderDate")},control:F.a,dateFormat:"dd/MM/yyyy"}),r.a.createElement(j.a.Field,{label:"Versanddatum",name:"shippingDate",selected:new Date(a.shippingDate),onChange:function(e){return ve(e,"shippingDate")},control:F.a,dateFormat:"dd/MM/yyyy"}),r.a.createElement(j.a.Field,{label:"Rechnungsnummer",name:"invoiceNumber",value:a.invoiceNumber,onChange:function(e,n){var l=n.name,r=n.value;return t(Object(E.a)({},a,Object(p.a)({},l,r)))},control:N.a})))))),r.a.createElement(b.a,{onClick:function(){return t()},content:"Abbrechen",negative:!0,icon:"close",labelPosition:"right"}),a.customer&&r.a.createElement(b.a,{onClick:function(){a.totalPrice=function(e){return e.articles.map((function(a){var t=a.price*a.amount;return t-t*(e.customer.discount/100)})).reduce((function(e,a){return a+e}),0)}(a);var e=Object(f.a)(re);e[a.id]=a,ce(e),t()},content:"Speichern",primary:!0,icon:"check",labelPosition:"right"})))},R=t(288),H=t.n(R),M=t(188),I=t.n(M),P=function(e){var a=e.id,t=e.label;return r.a.createElement("div",{className:"tc mb4 mt2"},r.a.createElement("div",{id:"myMm",style:{height:"1mm"}}),r.a.createElement("div",{className:"pa2 ba bw1 b--black bg-yellow black-90 br2 dib pointer dim shadow-1",onClick:function(){var e,t,n,l,r=document.getElementById(a),c=(e=r.offsetHeight,Math.floor(e/document.getElementById("myMm").offsetHeight)),o=(t=297,document.getElementById("myMm").offsetHeight*t),i=c<=297?1:Math.floor(c/297)+1;console.log({input:r,inputHeightMm:c,a4HeightMm:297,a4HeightPx:o,numPages:i,range:(n=0,l=i,Array(l-n).join(0).split(0).map((function(e,a){return a+n}))),comp:c<=297,inputHeightPx:r.offsetHeight}),H()(r,{scale:1}).then((function(e){var t,n=e.toDataURL("image/png",1);(t=c>297?new I.a("p","mm",[c+16,210]):new I.a).addImage(n,"PNG",0,0),t.save("".concat(a,".pdf"))}))}},t))},B=function(e){var a=e.children,t=e.singleMode,n=e.id;return r.a.createElement("div",{id:n,className:"bg-white shadow-1 center pa4",style:{width:"210mm",height:t?"297mm":""}},a)},G=(t(552),function(e){var a=e.id,t=e.invoice,l=t.orderDate,c=t.invoiceDate,i=t.shippingDate,m=t.invoiceNumber,u=t.customer,s=u.name,d=u.ust,E=u.discount,b=u.address,v=u.city,p=u.postCode,f=t.articles,g=void 0===f?[]:f,h=t.send_default_price,C=void 0===h?5:h,N=o("company",D),y=Object(n.a)(N,1)[0],j=g.map((function(e){var a=e.price*e.amount;return(a-a*(E/100))/(1+d/100)})).reduce((function(e,a){return parseFloat(a)+e}),0);return r.a.createElement(B,{singleMode:!0,id:a},r.a.createElement("div",{className:"invoice-page-pdf"},r.a.createElement("div",{className:"invoice-page-top"},r.a.createElement("img",{className:"invoice-header-company-logo",src:y.logo}),r.a.createElement("div",{className:"invoice-header"},r.a.createElement("div",{className:"invoice-header-customer-address"},r.a.createElement("div",{className:"invoice-header-customer-company"},y.name," \u2022 ",y.firstAddress.address," \u2022"," ",y.firstAddress.postCode," ",y.firstAddress.city),r.a.createElement("div",{className:"invoice-header-customer-info"},r.a.createElement("p",{className:"invoice-header-customer-info-name"},r.a.createElement("b",null,s)),r.a.createElement("p",null,r.a.createElement("b",null,b)),r.a.createElement("p",null,r.a.createElement("b",null,p," ",v)))),r.a.createElement("div",{className:"invoice-header-company-info"},r.a.createElement("p",null,y.name),r.a.createElement("p",null,y.executive),r.a.createElement("br",null),r.a.createElement("p",null,y.firstAddress.name),r.a.createElement("p",null,y.firstAddress.address),r.a.createElement("p",null,y.firstAddress.postCode," ",y.firstAddress.city),r.a.createElement("p",null,"Telefon ",y.firstAddress.phone),r.a.createElement("br",null),r.a.createElement("p",null,y.firstEmail),r.a.createElement("p",null,y.secondEmail),r.a.createElement("br",null),r.a.createElement("p",null,"Steuernummer ",y.taxNumber),r.a.createElement("p",null,y.taxOffice)))),r.a.createElement("div",{className:"invoice-body"},r.a.createElement("div",{className:"invoice-body-top"},r.a.createElement("div",{className:"invoice-subject"},r.a.createElement("h4",null,"Rechnung"),r.a.createElement("p",null,"Wir erlauben uns in Rechnung zu stellen:"),r.a.createElement("div",{className:"invoice-body-subject-key-values"},r.a.createElement("div",{className:"invoice-body-subject-keys"},r.a.createElement("div",{className:"invoice-body-order-date"},r.a.createElement("p",null,r.a.createElement("b",null,"Bestelldatum:"))),r.a.createElement("div",{className:"invoice-body-send-date"},r.a.createElement("p",null,r.a.createElement("b",null,"Versand am:"))),r.a.createElement("div",{className:"invoice-body-send-to"},r.a.createElement("p",null,r.a.createElement("b",null,"Versand an:")))),r.a.createElement("div",{className:"invoice-body-subject-values"},r.a.createElement("div",{className:"invoice-body-order-date"},r.a.createElement("p",null,r.a.createElement("b",null,S(l)))),r.a.createElement("div",{className:"invoice-body-send-date"},r.a.createElement("p",null,r.a.createElement("b",null,S(i)))),r.a.createElement("div",{className:"invoice-body-send-to"},r.a.createElement("p",null,r.a.createElement("b",null,s," \u2022 ")),r.a.createElement("p",null,r.a.createElement("b",null,b," \u2022 ",p," ",v)))))),r.a.createElement("div",null,r.a.createElement("div",{className:"invoice-body-invoice-date"},r.a.createElement("p",null,"Rechnungsdatum: ",r.a.createElement("b",null,S(c)))),r.a.createElement("div",{className:"invoice-body-invoice-nr"},r.a.createElement("p",null,"Rechnungsnummer: ",r.a.createElement("b",null,m))),r.a.createElement("div",{className:"invoice-body-invoice-hint"},r.a.createElement("p",null,"(Bitte bei Zahlungen angeben)")))),r.a.createElement("div",{className:"invoice-body-article-wrapper"},g.map((function(e){var a=e.amount,t=e.price,n=e.name,l=e.isbn,c=parseInt(a)>1,o=t*a,i=o-o*(E/100),m=i/(1+d/100);return r.a.createElement("div",{className:"invoice-body-article"},r.a.createElement("div",{className:"invoice-body-article-left"},r.a.createElement("div",{className:"invoice-body-article-description"},r.a.createElement("div",null,r.a.createElement("b",null,a," Exemplar",c&&"e")),r.a.createElement("div",{className:"invoice-body-article-title"},r.a.createElement("b",null,"\u201e",n,"\u201c")),r.a.createElement("div",{className:"invoice-body-article-title"},l)),r.a.createElement("div",{className:"invoice-body-artivle-price-calc"},"Preis ".concat(c?"je":""," ").concat(t," \u20ac").concat(c?" = ".concat(o.toFixed(2),"\u20ac"):"").concat(E>0?", abz\xfcglich ".concat(E," % Rabatt = ").concat(i.toFixed(2)," \u20ac"):""," (beinhaltet ").concat(d," % MwST = ").concat((i-m).toFixed(2),")"))),r.a.createElement("div",{className:"invoice-body-article-price"},r.a.createElement("b",null,m.toFixed(2),"\u20ac")))}))),r.a.createElement("div",{className:"invoice-body-price-calculation"},r.a.createElement("div",null,r.a.createElement("p",null,"Netto"),r.a.createElement("p",null,r.a.createElement("b",null,j.toFixed(2),"\u20ac"))),r.a.createElement("div",null,r.a.createElement("p",null,"Versandpauschale"),r.a.createElement("p",null,r.a.createElement("b",null,C.toFixed(2),"\u20ac"))),r.a.createElement("div",null,r.a.createElement("p",null,"+".concat(d,"% Mehrwertsteuer")),r.a.createElement("p",null,r.a.createElement("b",null,((j+C)*parseFloat(d)/100).toFixed(2),"\u20ac")))),r.a.createElement("div",{className:"invoice-body-price"},r.a.createElement("p",null,"Rechnungsbetrag"),r.a.createElement("p",null,r.a.createElement("b",null,((j+C)*(1+parseFloat(d)/100)).toFixed(2),"\u20ac"))),r.a.createElement("div",null,r.a.createElement("p",null,"Zahlen Sie bitte den Rechnungsbetrag bis zum 16. M\xe4rz 2020 unter Angabe der Rechnungsnummer auf unten stehendes Konto. ",r.a.createElement("br",null),r.a.createElement("br",null)," Die gelieferte Ware bleibt bis zur vollst\xe4ndigen Bezahlung Eigentum des Test Verlages. ",r.a.createElement("br",null),"Vielen Dank f\xfcr Ihre Bestellung.",r.a.createElement("br",null),r.a.createElement("br",null)," Mit herzlichen Gr\xfc\xdfen, Test Verlag.",r.a.createElement("br",null)," Werneuchen, den 24. Februar 2020"))),r.a.createElement("div",{className:"invoice-footer"},r.a.createElement("div",{className:"invoice-footer-executive"},r.a.createElement("b",null,"Gesch\xe4ftsf\xfchrung")," ",y.executive),r.a.createElement("div",{className:"invoice-footer-bank-account"},r.a.createElement("b",null,"Bankverbindung")," ",y.bank," \u2022 IBAN ",y.iban," \u2022 BIC"," ",y.bic),r.a.createElement("div",{className:"invoice-footer-tax"},r.a.createElement("b",null,"Steuernummer")," ",y.taxNumber," | ",r.a.createElement("b",null,"USt-IdNr.")," ",y.ustNr))))}),L=function(e){var a=e.invoice,t=e.setInvoice;return r.a.createElement("div",{className:"invoice-page"},r.a.createElement("div",{className:"invoice-form-wrapper"},r.a.createElement(x,{invoice:a,setInvoice:t})),a.customer&&r.a.createElement("div",{className:"invoice-page-wrapper"},r.a.createElement(P,{id:"singlePage",label:"Rechnung Drucken"}),r.a.createElement(G,{id:"singlePage",invoice:a})))},T=function(){var e=o("invoices",[]),a=Object(n.a)(e,2),t=a[0],c=(a[1],Object(l.useState)()),m=Object(n.a)(c,2),u=m[0],s=m[1];return u?r.a.createElement(L,{invoice:u,setInvoice:s}):r.a.createElement("div",{className:"invoice-tab-container"},r.a.createElement(b.a,{onClick:function(){return s(Object(E.a)({},k,{id:t.length}))},primary:!0},"Neue Rechnung"),r.a.createElement(i.a,{celled:!0},r.a.createElement(i.a.Header,null,r.a.createElement(i.a.Row,null,r.a.createElement(i.a.HeaderCell,null,"Rechnungsnummer"),r.a.createElement(i.a.HeaderCell,null,"Rechnungsdatum"),r.a.createElement(i.a.HeaderCell,null,"Kunde"),r.a.createElement(i.a.HeaderCell,null,"Artikel"),r.a.createElement(i.a.HeaderCell,null,"Gesamtpreis"),r.a.createElement(i.a.HeaderCell,null))),r.a.createElement(i.a.Body,null,t.map((function(e){return r.a.createElement(i.a.Row,null,r.a.createElement(i.a.Cell,null,e.invoiceNumber),r.a.createElement(i.a.Cell,null,S(e.invoiceDate)),r.a.createElement(i.a.Cell,null,e.customer.name),r.a.createElement(i.a.Cell,null,e.articles.map((function(e){return r.a.createElement("p",null,e.name)}))),r.a.createElement(i.a.Cell,null,e.totalPrice,"\u20ac"),r.a.createElement(i.a.Cell,null,r.a.createElement(b.a,{icon:!0,onClick:function(){return s(e)}},r.a.createElement(v.a,{name:"eye"}))))})))))},z=t(190),Z=t(189),V={flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",borderWidth:2,borderRadius:2,borderColor:"#eeeeee",borderStyle:"dashed",backgroundColor:"#fafafa",color:"#bdbdbd",outline:"none",transition:"border .24s ease-in-out"},K={borderColor:"#2196f3"},q={borderColor:"#00e676"},J={borderColor:"#ff1744"};function U(e){var a=e.onDrop,t=Object(Z.b)({accept:"image/*"}),n=(t.getRootProps,t.getInputProps,t.isDragActive),c=t.isDragAccept,o=t.isDragReject,i=Object(l.useMemo)((function(){return Object(E.a)({},V,{},n?K:{},{},c?q:{},{},o?J:{})}),[n,o]);return r.a.createElement(Z.a,{onDrop:a},(function(e){var a=e.getRootProps,t=e.getInputProps;return r.a.createElement("div",{className:"container"},r.a.createElement("div",a({style:i,onDrop:function(e){return e.stopPropagation()}}),r.a.createElement("input",t()),r.a.createElement("p",null,"Drag 'n' drop some files here, or click to select files")))}))}function W(){var e=o("company",D),a=Object(n.a)(e,2),t=a[0],l=a[1],c=function(e,a){var n=a.name,r=a.value;l(Object(E.a)({},t,Object(p.a)({},n,r)))},i=function(e,a){var n=a.name,r=a.value;l(Object(E.a)({},t,{firstAddress:Object(E.a)({},t.firstAddress,Object(p.a)({},n,r))}))},m=function(e,a){var n=a.name,r=a.value;l(Object(E.a)({},t,{secondAddress:Object(E.a)({},t.secondAddress,Object(p.a)({},n,r))}))};return r.a.createElement("div",null,r.a.createElement(j.a,null,r.a.createElement(j.a.Field,{label:"Firmename",control:N.a,name:"name",onChange:c,value:t.name}),r.a.createElement(j.a.Field,{label:"Firmenf\xfchrung",control:N.a,name:"executive",onChange:c,value:t.executive}),r.a.createElement(z.a,null,r.a.createElement("h4",null,"Erste Adresse"),r.a.createElement(j.a.Group,{width:"equal"},r.a.createElement(j.a.Field,{id:"form-input-control-name",control:N.a,label:"Name",name:"name",onChange:i,value:t.firstAddress.name}),r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Anschrift",name:"address",onChange:i,value:t.firstAddress.address})),r.a.createElement(j.a.Group,null,r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"PLZ",name:"postCode",onChange:i,value:t.firstAddress.postcode}),r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Stadt",name:"city",onChange:i,value:t.firstAddress.city})),r.a.createElement(j.a.Group,null,r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Telefon",name:"phone",onChange:i,value:t.firstAddress.phone}))),r.a.createElement(z.a,null,r.a.createElement("h4",null,"Zweite Adresse"),r.a.createElement(j.a.Group,{width:"equal"},r.a.createElement(j.a.Field,{id:"form-input-control-name",control:N.a,label:"Name",name:"name",onChange:m,value:t.secondAddress.name}),r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Anschrift",name:"address",onChange:m,value:t.secondAddress.address})),r.a.createElement(j.a.Group,null,r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"PLZ",name:"postCode",onChange:m,value:t.secondAddress.postcode}),r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Stadt",name:"city",onChange:m,value:t.secondAddress.city})),r.a.createElement(j.a.Group,null,r.a.createElement(j.a.Field,{id:"form-input-control-last-name",control:N.a,label:"Telefon",name:"phone",onChange:m,value:t.secondAddress.phone}))),r.a.createElement(j.a.Field,{label:"1. Email",control:N.a,name:"firstEmail",onChange:c,value:t.firstEmail}),r.a.createElement(j.a.Field,{label:"2. Email",control:N.a,name:"secondEmail",onChange:c,value:t.secondEmail}),r.a.createElement(j.a.Field,{label:"Steuernummer",control:N.a,name:"taxNumber",onChange:c,value:t.taxNumber}),r.a.createElement(j.a.Field,{label:"Finanzamt",control:N.a,name:"taxOffice",onChange:c,value:t.taxOffice}),r.a.createElement(j.a.Field,{label:"Ust-Nr.",control:N.a,name:"ustNr",onChange:c,value:t.ustNr}),r.a.createElement(z.a,null,r.a.createElement("h4",null,"Bankinformationen"),r.a.createElement(j.a.Field,{label:"Bank",control:N.a,name:"bank",onChange:c,value:t.bank}),r.a.createElement(j.a.Field,{label:"IBAN",control:N.a,name:"iban",onChange:c,value:t.iban}),r.a.createElement(j.a.Field,{label:"BIC",control:N.a,name:"bic",onChange:c,value:t.bic}))),r.a.createElement(z.a,null,r.a.createElement("h4",null,"Logo"),""!=t.logo?r.a.createElement("div",null,r.a.createElement("img",{src:t.logo}),r.a.createElement(b.a,{negative:!0,onClick:function(){return l(Object(E.a)({},t,{logo:""}))}},"L\xf6schen")):r.a.createElement(U,{onDrop:function(e){var a=e[0],n=new FileReader;n.onload=function(e){l(Object(E.a)({},t,{logo:e.target.result}))},n.readAsDataURL(a)}})))}var _={articles:[]};Object(c.render)(r.a.createElement((function(){var e=Object(l.useState)(_),a=Object(n.a)(e,2),t=a[0];a[1];return console.log(t),r.a.createElement("div",{className:"invoice-app-container"},r.a.createElement(u.a,null,r.a.createElement(s.a,{panes:[{menuItem:"Rechnungen",render:function(){return r.a.createElement("div",{className:""},r.a.createElement(T,null))}},{menuItem:"Kunden",render:function(){return r.a.createElement("div",{className:""},r.a.createElement(m,null))}},{menuItem:"Artikel",render:function(){return r.a.createElement("div",{className:""},r.a.createElement(d,null))}},{menuItem:"Firma",render:function(){return r.a.createElement("div",{className:""},r.a.createElement(W,null))}}]})))}),null),document.getElementById("root"))}},[[303,1,2]]]);
//# sourceMappingURL=main.8dc7dee7.chunk.js.map