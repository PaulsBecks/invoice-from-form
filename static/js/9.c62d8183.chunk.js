(this["webpackJsonpreact-4798tj"]=this["webpackJsonpreact-4798tj"]||[]).push([[9],{815:function(e,t,a){"use strict";var n=a(15),c=a(0),r=a.n(c),l=a(809),i=a(261),o=a(5),u=a.n(o),s=(a(38),a(4)),m=a.n(s),d=(a(1),a(24)),b=a(131),p=a(132),h=a(8),E=a(94),f=a(408),j=a(133);function v(e){var t=e.children,a=e.className,n=e.content,c=m()("sub header",a),l=Object(b.a)(v,e),i=Object(p.a)(v,e);return r.a.createElement(i,u()({},l,{className:c}),h.a.isNil(t)?n:t)}v.handledProps=["as","children","className","content"],v.propTypes={},v.create=Object(j.e)(v,(function(e){return{content:e}}));var O=v;function g(e){var t=e.children,a=e.className,n=e.content,c=m()("content",a),l=Object(b.a)(g,e),i=Object(p.a)(g,e);return r.a.createElement(i,u()({},l,{className:c}),h.a.isNil(t)?n:t)}g.handledProps=["as","children","className","content"],g.propTypes={};var y=g;function C(e){var t=e.attached,a=e.block,n=e.children,c=e.className,l=e.color,i=e.content,o=e.disabled,s=e.dividing,j=e.floated,v=e.icon,g=e.image,k=e.inverted,N=e.size,w=e.sub,x=e.subheader,S=e.textAlign,D=m()("ui",l,N,Object(d.a)(a,"block"),Object(d.a)(o,"disabled"),Object(d.a)(s,"dividing"),Object(d.d)(j,"floated"),Object(d.a)(!0===v,"icon"),Object(d.a)(!0===g,"image"),Object(d.a)(k,"inverted"),Object(d.a)(w,"sub"),Object(d.b)(t,"attached"),Object(d.c)(S),"header",c),P=Object(b.a)(C,e),R=Object(p.a)(C,e);if(!h.a.isNil(n))return r.a.createElement(R,u()({},P,{className:D}),n);var A=E.a.create(v,{autoGenerateKey:!1}),H=f.a.create(g,{autoGenerateKey:!1}),I=O.create(x,{autoGenerateKey:!1});return A||H?r.a.createElement(R,u()({},P,{className:D}),A||H,(i||I)&&r.a.createElement(y,null,i,I)):r.a.createElement(R,u()({},P,{className:D}),i,I)}C.handledProps=["as","attached","block","children","className","color","content","disabled","dividing","floated","icon","image","inverted","size","sub","subheader","textAlign"],C.propTypes={},C.Content=y,C.Subheader=O;var k=C;function N(e){var t=e.onDelete,a=e.type,o=Object(c.useState)(!1),u=Object(n.a)(o,2),s=u[0],m=u[1];return r.a.createElement(l.a,Object.assign({},e,{basic:!0,size:"small",trigger:r.a.createElement(i.a,{negative:!0,icon:"trash",onClick:function(){return m(!0)}}),open:s,onClose:function(){return m(!1)}}),r.a.createElement(k,{icon:"trash",content:"".concat(a," l\xf6schen")}),r.a.createElement(l.a.Content,null,r.a.createElement("p",null,"Bist du dir sicher, dass du dieses Element l\xf6schen willst?")),r.a.createElement(l.a.Actions,null,r.a.createElement(i.a,{basic:!0,color:"red",inverted:!0,onClick:function(){return m(!1)}},r.a.createElement(E.a,{name:"remove"})," Nein"),r.a.createElement(i.a,{color:"green",inverted:!0,onClick:function(){t(),m(!1)}},r.a.createElement(E.a,{name:"checkmark"})," Ja")))}a.d(t,"a",(function(){return N}))},823:function(e,t,a){"use strict";a.r(t);var n=a(28),c=a(23),r=a(7),l=a.n(r),i=a(13),o=a(15),u=a(0),s=a.n(u),m=a(30),d=a(261),b=a(810),p=a(42),h=a(807),E=a(27),f=a(376),j=a(37),v=a(264),O=a(266),g=a(134),y=a.n(g),C=a(285),k=a(25),N=a(32),w=a.n(N),x=Object(k.a)().backendURL+"/email/invoice";function S(e){return D.apply(this,arguments)}function D(){return(D=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.post(x,t);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(e,t){return R.apply(this,arguments)}function R(){return(R=Object(i.a)(l.a.mark((function e(t,a){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.a)(t);case 2:n=e.sent,r=n.output("datauristring"),S(Object(c.a)({data:r},a));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var A=a(809),H=a(71),I=a(44),G=a.n(I);function F(e){var t=e.invoice,a=e.setInvoice,r=e.onSend,l=Object(u.useState)({to:"",fileName:t.invoiceNumber}),i=Object(o.a)(l,2),m=i[0],b=i[1],h=Object(u.useState)(!1),E=Object(o.a)(h,2),f=E[0],j=E[1],v=Object(u.useState)(G.a.createValueFromString("<b>Versandadresse des Kunden</b><br/>"+t.customer.shippingAddress,"html")),O=Object(o.a)(v,2),g=O[0],y=O[1];return s.a.createElement(A.a,{open:!0,onClose:function(){return a()}},s.a.createElement(A.a.Header,null,"Rechnungs-PDF per Email Verschicken"),s.a.createElement(A.a.Content,null,s.a.createElement(p.a,null,s.a.createElement(p.a.Input,{label:"An",name:"to",value:m.to,placeholder:"max-mustermann@email.de",onChange:function(e,t){var a=t.name,r=t.value;return b(Object(c.a)({},m,Object(n.a)({},a,r)))}}),s.a.createElement(p.a.Input,{label:"Rechnungsdateiname",name:"fileName",value:m.fileName,onChange:function(e,t){var a=t.name,r=t.value;return b(Object(c.a)({},m,Object(n.a)({},a,r)))}}),s.a.createElement(p.a.Field,{label:"Emailtext",name:"text",value:g,control:H.a,onChange:y}))),s.a.createElement(A.a.Actions,null,s.a.createElement(d.a,{negative:!0,icon:"close",labelPosition:"right",content:"Abbrechen",onClick:function(){return a()}}),s.a.createElement(d.a,{primary:!0,icon:"send",labelPosition:"right",content:"Senden",onClick:function(){j(!0),r(Object(c.a)({text:g.toString("html")},m))},loading:f})))}var K=a(815),z=function(){var e=Object(m.i)(),t=Object(o.a)(e,4),a=t[0],r=t[2],g=t[3],C=Object(u.useState)(),k=Object(o.a)(C,2),N=k[0],w=k[1],x=Object(u.useState)(),S=Object(o.a)(x,2),D=S[0],R=S[1];Object(m.g)();var A=Object(j.f)(),H=Object(j.h)().path;function I(){return(I=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P("singlePage",t);case 2:R();case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(u.useEffect)((function(){N&&function(){var e=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.e)("singlePage",N.invoiceNumber);case 2:w();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[N]),s.a.createElement(j.c,null,s.a.createElement(j.a,{exact:!0,path:H},s.a.createElement("div",{className:"invoice-tab-container"},s.a.createElement(d.a,{onClick:function(){return A.push("".concat(H,"/new"))},primary:!0},"Neue Rechnung"),s.a.createElement(b.a,{celled:!0},s.a.createElement(b.a.Header,null,s.a.createElement(b.a.Row,null,s.a.createElement(b.a.HeaderCell,null,"Rechnungsnummer"),s.a.createElement(b.a.HeaderCell,null,"Rechnungsdatum"),s.a.createElement(b.a.HeaderCell,null,"Kunde"),s.a.createElement(b.a.HeaderCell,null,"Gesamtpreis"),s.a.createElement(b.a.HeaderCell,null,"Zahlungseingang"),s.a.createElement(b.a.HeaderCell,null))),s.a.createElement(b.a.Body,null,a.map((function(e,t,a){var l=a[a.length-1-t];return s.a.createElement(b.a.Row,{key:l._id},s.a.createElement(b.a.Cell,null,l.invoiceNumber),s.a.createElement(b.a.Cell,null,Object(E.b)(l.invoiceDate)),s.a.createElement(b.a.Cell,null,l.customer.name),s.a.createElement(b.a.Cell,null,Object(E.c)(l.totalPrice)," \u20ac"),s.a.createElement(b.a.Cell,null,s.a.createElement(p.a,{style:{marginBottom:0}},s.a.createElement(p.a.Group,{style:{display:"flex",alignItems:"center",margin:"0"}},s.a.createElement(h.a,{onChange:function(e,t){var a,r,i=t.name,o=t.checked;o?g(Object(c.a)({},l,(a={},Object(n.a)(a,i,o),Object(n.a)(a,"paymentDate",new Date),a))):g(Object(c.a)({},l,(r={},Object(n.a)(r,i,o),Object(n.a)(r,"paymentDate",void 0),r)))},name:"payed",checked:l.payed,toggle:!0}),l.payed&&l.paymentDate?s.a.createElement(p.a.Field,{selected:new Date(l.paymentDate),onChange:function(e){return g(Object(c.a)({},l,{paymentDate:e}))},control:y.a,dateFormat:"dd/MM/yyyy",transparent:!0}):s.a.createElement("span",{style:{marginLeft:"0.5em"}},"Ausstehend")))),s.a.createElement(b.a.Cell,{style:{}},s.a.createElement(d.a,{primary:!0,icon:"edit",onClick:function(){return A.push("".concat(H,"/").concat(l._id))}}),s.a.createElement(d.a.Group,null,s.a.createElement(d.a,{secondary:!0,icon:"download",onClick:function(){return w(l)}}),s.a.createElement(d.a,{style:{borderLeft:"1px solid white",marginRight:"2px"},secondary:!0,icon:"mail",onClick:function(){return R(l)}}))," ",s.a.createElement(K.a,{onDelete:function(){return r(l._id)},type:"Rechnung"})))})))),s.a.createElement("div",{style:{position:"absolute",opacity:"0.0"}},(N||D)&&s.a.createElement(f.a,{id:"singlePage",invoice:N||D})),D&&s.a.createElement(F,{invoice:D,setInvoice:R,onSend:function(e){return I.apply(this,arguments)}}))),s.a.createElement(j.a,{exact:!0,path:"".concat(H,"/new")},s.a.createElement(v.a,{updateInvoice:g})),s.a.createElement(j.a,{path:"".concat(H,"/:invoiceId")},s.a.createElement(O.a,{updateInvoice:g})))};a.d(t,"default",(function(){return z}))}}]);
//# sourceMappingURL=9.c62d8183.chunk.js.map