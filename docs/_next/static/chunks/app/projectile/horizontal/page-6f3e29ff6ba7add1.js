(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[143],{12:function(e,t,n){Promise.resolve().then(n.bind(n,8658))},8658:function(e,t,n){"use strict";n.r(t),n.d(t,{DataContext:function(){return m},default:function(){return v}});var r=n(7437),i=n(2265),a=n(7776),s=n(8318),o=n(5972),c=n(6277),l=n(8915);function u(){let e=(0,i.useContext)(m),t=e.active[0],[n,s]=e.ballInfo,u=e.cameraPos[0],[h,x]=e.graphData,[d,p]=e.init,y=e.showTrail[0],f=e.showGrid[0];return(0,r.jsxs)(c.Z,{showGrid:f,children:[(0,r.jsx)(c.N,{camera_pos:u,camera_lookAt:new a.Vector3(u.x,u.y,0)}),(0,r.jsx)(o.Z,{pos:n.position,velocity:n.velocity,radius:l.px,color:l.SQ,show_trail:y,trail_cooltime:l.Xd,onChange:s,renderGraph:!0,updateGraph:(e,t)=>{x([...h,{t:e,data:t}])},active:t,init:{init:d,setInit:p}})]})}var h=n(3830),x=n(2808),d=n(8960),p=n(5225),y=n(8684),f=n(3092);function j(){let e=(0,i.useRef)(),t=(0,i.useRef)(),n=(0,i.useRef)(),s=(0,i.useContext)(m),[o,c]=s.active,[l,u]=s.ballInfo,[j,v]=s.graphType,[w,g]=s.graphData,[Z,C]=s.cameraPos,b=s.init[1],k=s.showTrail[1],_=s.showGrid[1],{showGraph:S}=(0,i.useContext)(f.ShowUIContext);return(0,r.jsxs)("div",{children:[(0,r.jsx)(y.Z,{initialPos:{x:10,y:40},children:(0,r.jsxs)("div",{style:{width:"200px",background:"#fff",display:"inline-block"},className:"p-2",children:[(0,r.jsxs)(h.Z,{children:[(0,r.jsxs)(h.Z.Group,{children:[(0,r.jsx)(h.Z.Label,{children:"初期位置-Y"}),(0,r.jsx)(d.Z,{min:5,max:100,step:1,defaultValue:10,ref:e})]}),(0,r.jsxs)(h.Z.Group,{children:[(0,r.jsx)(h.Z.Label,{children:"初期速度-X"}),(0,r.jsx)(d.Z,{min:5,max:20,step:1,defaultValue:10,ref:t})]}),(0,r.jsxs)(h.Z.Group,{children:[(0,r.jsx)(h.Z.Label,{children:"グラフタイプ"}),(0,r.jsxs)(h.Z.Select,{onChange:e=>{v(+e.target.value)},children:[(0,r.jsx)("option",{value:0,children:"y-t"}),(0,r.jsx)("option",{value:1,children:"Vy-t"})]})]}),(0,r.jsx)(h.Z.Check,{ref:n,type:"switch",label:"軌跡を表示",defaultChecked:!0}),(0,r.jsx)(h.Z.Check,{type:"switch",label:"XYグリッドを表示",onChange:e=>{_(e.target.checked)}})]}),(0,r.jsx)(x.Z,{variant:"primary",onClick:()=>{let r=new a.Vector3(0,0,0),i=new a.Vector3(0,0,0);r.y=+e.current.value,i.x=+t.current.value,u({position:r,velocity:i}),k(n.current.checked),b(!0),g([]),C({x:0,y:+e.current.value/4,z:2*+e.current.value})},children:"適用"}),(0,r.jsx)(x.Z,{variant:"primary",onClick:e=>{c(!o),"再生"===e.target.innerHTML?e.target.innerHTML="一時停止":e.target.innerHTML="再生"},children:"再生"})]})}),S&&(0,r.jsx)(y.Z,{initialPos:{x:220,y:40},children:(e=>{switch(e){case 0:return(0,r.jsx)(p.Z,{position:{x:0,y:630},title:"y-tグラフ",size:{width:250,height:250},data:{x:w.map(e=>e.t),y:w.map(e=>e.data.position.y),x_range:{min:0,max:30},y_range:{min:0,max:4*Z.y}},drawLine:!0});case 1:return(0,r.jsx)(p.Z,{position:{x:0,y:630},title:"Vy-tグラフ",size:{width:250,height:250},data:{x:w.map(e=>e.t),y:w.map(e=>e.data.velocity.y),x_range:{min:0,max:30},y_range:{min:-10*Math.sqrt(10*Z.y*4)/7,max:10*Math.sqrt(10*Z.y*4)/7}},drawLine:!0});default:return null}})(j)})]})}let m=(0,i.createContext)(null);function v(){let[e,t]=(0,i.useState)(!1),[n,o]=(0,i.useState)({position:new a.Vector3(0,10,0),velocity:new a.Vector3(15,0,0)}),[c,l]=(0,i.useState)({x:10,y:10,z:20}),[h,x]=(0,i.useState)(0),[d,p]=(0,i.useState)(!1),[y,f]=(0,i.useState)(!0),[v,w]=(0,i.useState)(!1),[g,Z]=(0,i.useState)([]);return(0,r.jsx)(m.Provider,{value:{cameraPos:[c,l],graphType:[h,x],graphData:[g,Z],init:[d,p],showTrail:[y,f],showGrid:[v,w],active:[e,t],ballInfo:[n,o]},children:(0,r.jsx)(s.Z,{top:(0,r.jsx)(j,{}),bottom:(0,r.jsx)(u,{})})})}},5972:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(7437),i=n(8842),a=n(2265),s=n(7776),o=n(2238),c=n(4823);function l(e){let{pos:t,velocity:n,radius:l,color:u,onChange:h,show_trail:x=!1,trail_cooltime:d=.2,renderGraph:p=!1,updateGraph:y=()=>{},active:f=!0,init:j={init:!1,setInit:()=>{}}}=e,m=(0,a.useRef)(n.y),[v,w]=(0,a.useState)([]),g=(0,a.useRef)(),Z=(0,a.useRef)(0),C=(0,a.useRef)(0);return(0,a.useEffect)(()=>{m.current=n.y},[t,n]),(0,a.useEffect)(()=>{},[j.init]),(0,i.C)((e,t)=>{if(!(f&&t<.1))return;j.init&&(m.current=n.y,console.log(n.y),w([]),Z.current=0,j.setInit(!1)),m.current+=-9.8*t;let r=g.current;r.position.x+=n.x*t,r.position.y+=m.current*t,r.position.z+=n.z*t,r.position.y<l&&(m.current=-(1*m.current),r.position.y=l),C.current>=d&&(x&&w([...v,g.current.position.clone()]),p&&y(Z.current,{position:r.position.clone(),velocity:new s.Vector3(n.x,m.current,n.z)}),C.current-=d),Z.current+=t,C.current+=t,h({position:r.position,velocity:new s.Vector3(n.x,m.current,n.z)})}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.aL,{position:[t.x,t.y,t.z],castShadow:!0,ref:g,args:[l,32,32],children:(0,r.jsx)("meshPhysicalMaterial",{color:u,metalness:0,roughness:.2})}),(0,r.jsx)(o.Z,{radius:l,color:u,pos:v})]})}}},function(e){e.O(0,[355,114,689,881,420,602,817,971,23,744],function(){return e(e.s=12)}),_N_E=e.O()}]);