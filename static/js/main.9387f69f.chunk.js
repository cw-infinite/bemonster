(this.webpackJsonpreactcode=this.webpackJsonpreactcode||[]).push([[0],{103:function(e,a,t){e.exports=t(276)},108:function(e,a,t){},109:function(e,a,t){},276:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),i=t(92),s=t.n(i),c=(t(108),t(101)),r=t(12),o=t(93),m=t(94),d=t(102),u=t(100),f=(t(109),t(95)),v=t(96),h=t.n(v),p=window.Plotly,E=h()(p),x=t(275),N=function(e){Object(d.a)(t,e);var a=Object(u.a)(t);function t(){var e;Object(o.a)(this,t);for(var l=arguments.length,n=new Array(l),i=0;i<l;i++)n[i]=arguments[i];return(e=a.call.apply(a,[this].concat(n))).state={counter:1,expressions:[],x:[],y:[],minX:0,maxX:1e3,minY:-1e3,maxY:1e3,gridOption:!1,displayColorPicker:!1,graphName:"",yAxis:"",xAxis:"",initialSelect:0,legendOptions:[],fxs:[],fx1:"",fx1Name:"",data:[{x:[-50,-60,1,2,3,4,5],y:[1,4,9,16,25,100],type:"scatter",marker:{color:"#1f77b4"},name:"Red Trace"},{x:[0,0],y:[0,1e3],type:"scatter",marker:{color:"green"},name:"Red Trace",visible:!1}],layout:{title:"Title of Graph",showlegend:!0,xaxis:{title:"Name of X-Axis"},yaxis:{title:"Name of Y-Axis"}},config:{responsive:!0,modeBarButtonsToRemove:["pan2d","select2d","lasso2d","resetScale2d","zoomOut2d","zoom2d","zoomIn2d","zoomOut2d","autoScale2d"],displaylogo:!1},frames:[{scrollZoom:!0}]},e.baseState=e.state,e.init_plotty=function(){},e.onAdd=function(a){a.preventDefault(),e.setState({fxs:[].concat(Object(r.a)(e.state.fxs),[{id:e.state.counter,name:"",fx:"",width:"",displayColorPicker:!1,color:"#"+(16777215*Math.random()<<0).toString(16),visible:!0}]),counter:++e.state.counter})},e.onSelectChange=function(a){console.log(a.target.value);var t=parseInt(a.target.value),l=e.state.data.slice();t>0?l.map((function(e,a){e.visible=a===t-1&&(e.visible||!0)})):l.map((function(e,a){e.visible=!0})),e.setState({data:l,initialSelect:t})},e.calculation=function(a){var t=x.parse(a).compile(),l=Math.abs(e.state.maxX-e.state.minX)/1e5,n=x.range(e.state.minX,e.state.maxX,l).toArray(),i=n.map((function(e){return t.evaluate({x:e})}));return[n,i]},e.onReset=function(e){e.preventDefault()},e.onFormSubmit=function(a){a.preventDefault();var t=[],l=[],n={xaxis:{title:e.state.xAxis},yaxis:{title:e.state.yAxis},title:e.state.graphName,showlegend:!0},i=e.state.fxs.slice();(i=[{id:1,name:e.state.fx1Name,fx:e.state.fx1,color:"",width:"",visible:!0}].concat(Object(r.a)(i))).map((function(a,n){if(a.fx){var i=e.calculation(a.fx),s=Object(c.a)(i,2),r=s[0],o=s[1],m={name:a.name,x:r,y:o,type:"scatter",marker:{color:a.color},visible:a.visible};t.push(m)}l.push({index:n,name:a.name?a.name:"Expression ".concat(n+1)})})),console.log(l),e.setState({data:t,layout:n,legendOptions:l,initialSelect:0})},e}return Object(m.a)(t,[{key:"onRemove",value:function(e,a){console.log(e);var t=Object(r.a)(this.state.fxs);t.splice(e,1),this.setState({fxs:t})}},{key:"onFxChange",value:function(e,a){var t=Object(r.a)(this.state.fxs);t[e].fx=a.target.value,this.setState({fxs:t})}},{key:"onFxNameChange",value:function(e,a){var t=Object(r.a)(this.state.fxs);t[e].name=a.target.value,this.setState({fxs:t})}},{key:"handleColorPick_Click",value:function(e,a){console.log(a.target.value);var t=Object(r.a)(this.state.fxs);t[e].displayColorPicker=!t[e].displayColorPicker,this.setState({fxs:t})}},{key:"handleColorPick_Close",value:function(e,a){var t=Object(r.a)(this.state.fxs);t[e].displayColorPicker=!t[e].displayColorPicker,this.setState({fxs:t})}},{key:"handleColorPick_Selected",value:function(e,a){var t=Object(r.a)(this.state.fxs);t[e].displayColorPicker=!t[e].displayColorPicker,t[e].color=a.hex,this.setState({fxs:t})}},{key:"render",value:function(){var e=this;return this.init_plotty(),n.a.createElement("div",null,n.a.createElement("div",{className:"app-main"},n.a.createElement("div",{className:"ui centered grid"},n.a.createElement("div",{className:"column plot-box"},n.a.createElement(E,{data:this.state.data,layout:this.state.layout,config:this.state.config,frames:this.state.frames})),n.a.createElement("div",{className:"column config-pad-box"},n.a.createElement("div",{className:"ui segment"},n.a.createElement("form",{onSubmit:this.onFormSubmit,onChange:this.onHandleChange,className:"ui form"},n.a.createElement("div",{className:"ui equal width form"},n.a.createElement("div",{className:"fields"},n.a.createElement("div",{className:"eight wide field"},n.a.createElement("label",null,"Graph Name"),n.a.createElement("input",{type:"text",placeholder:"Graph Namee",onChange:function(a){return e.setState({graphName:a.target.value})}})))),n.a.createElement("div",{className:"ui divider"}),n.a.createElement("div",{className:"inline fields"},n.a.createElement("div",{className:"two wide field"},n.a.createElement("label",null,"X-Axis :")),n.a.createElement("div",{className:"six wide field"},n.a.createElement("div",{className:"ui input"},n.a.createElement("input",{type:"text",placeholder:"Name of X-Axis...",onChange:function(a){return e.setState({xAxis:a.target.value})}}))),n.a.createElement("div",{className:"four wide field"},n.a.createElement("div",{className:"ui left labeled input"},n.a.createElement("div",{className:"ui basic label"},"Min"),n.a.createElement("input",{type:"text",onChange:function(a){return e.setState({minX:a.target.value})},value:this.state.minX,placeholder:"Enter Min X.. "}))),n.a.createElement("div",{className:"four wide field"},n.a.createElement("div",{className:"ui left labeled input"},n.a.createElement("div",{className:"ui basic label"},"Max"),n.a.createElement("input",{type:"text",value:this.state.maxX,onChange:function(a){return e.setState({maxX:a.target.value})},placeholder:"Enter Max X.. "})))),n.a.createElement("div",{className:"inline fields"},n.a.createElement("div",{className:"two wide field"},n.a.createElement("label",null,"Y-Axis :")),n.a.createElement("div",{className:"six wide field"},n.a.createElement("div",{className:"ui input"},n.a.createElement("input",{type:"text",placeholder:"Name of Y-Axis...",onChange:function(a){return e.setState({yAxis:a.target.value})}}))),n.a.createElement("div",{className:"four wide field"},n.a.createElement("div",{className:"ui left labeled input"},n.a.createElement("div",{className:"ui basic label"},"Min"),n.a.createElement("input",{type:"text",onChange:function(a){return e.setState({minY:a.target.value})},value:this.state.minY,placeholder:"Enter Min Y.. "}))),n.a.createElement("div",{className:"four wide field"},n.a.createElement("div",{className:"ui left labeled input"},n.a.createElement("div",{className:"ui basic label"},"Max"),n.a.createElement("input",{type:"text",onChange:function(a){return e.setState({maxY:a.target.value})},value:this.state.maxY,placeholder:"Enter Max Y.. "})))),n.a.createElement("div",{className:"ui divider"}),n.a.createElement("div",{className:"inline fields"},n.a.createElement("div",{className:"one wide field"},n.a.createElement("label",null,n.a.createElement("h4",null,"Y"))),n.a.createElement("div",{className:"one wide field"},n.a.createElement("label",null,n.a.createElement("h3",null,"="))),n.a.createElement("div",{className:"seven wide field","data-tooltip":"Hello","data-inverted":"","data-variation":"wide","data-position":"top right","data-title":"Elliot Fu"},n.a.createElement("input",{type:"text",placeholder:"ax+b...",onChange:function(a){e.setState({fx1:a.target.value})}})),n.a.createElement("div",{className:"six wide field"},n.a.createElement("div",{className:"ui left labeled input"},n.a.createElement("div",{className:"ui basic label"},"Name"),n.a.createElement("input",{type:"text",onChange:function(a){return e.setState({fx1Name:a.target.value})},placeholder:"Enter name of this line.. "}))),n.a.createElement("div",{className:"one wide field"},n.a.createElement("button",{className:"ui icon button",onClick:this.onAdd},n.a.createElement("i",{className:"plus circle icon"})))),n.a.createElement("div",{className:"ui divider"}),this.state.fxs.map((function(a,t){return n.a.createElement("div",{key:a.id,className:"inline fields"},n.a.createElement("div",{className:"one wide field"},n.a.createElement("label",null,n.a.createElement("h4",null,"Y"))),n.a.createElement("div",{className:"one wide field"},n.a.createElement("label",null,n.a.createElement("h3",null,"="))),n.a.createElement("div",{className:"six wide field"},n.a.createElement("input",{type:"text",placeholder:"ax+b...",onChange:e.onFxChange.bind(e,t)})),n.a.createElement("div",{className:"six wide field"},n.a.createElement("div",{className:"ui left labeled input"},n.a.createElement("div",{className:"ui basic label"},"Name"),n.a.createElement("input",{type:"text",placeholder:"Enter Max Y.. ",onChange:e.onFxNameChange.bind(e,t)}))),n.a.createElement("div",{className:"one wide field"},n.a.createElement("div",{className:"ui icon button",onClick:e.handleColorPick_Click.bind(e,t)},n.a.createElement("div",{className:"default-color",style:{background:e.state.fxs[t].color}})),e.state.fxs[t].displayColorPicker?n.a.createElement("div",{className:"popover"},n.a.createElement("div",{className:"cover",onClick:e.handleColorPick_Close.bind(e,t)}),n.a.createElement(f.TwitterPicker,{width:"290px",color:e.state.fxs[t].color,onChange:e.handleColorPick_Selected.bind(e,t)})):null),n.a.createElement("div",{className:"one wide field"},n.a.createElement("button",{className:"ui icon button",onClick:e.onRemove.bind(e,t)},n.a.createElement("i",{className:"minus red circle icon"}))))})),n.a.createElement("div",{className:"inline fields"},n.a.createElement("div",{className:"field "},n.a.createElement("label",null,"Show Legend"),n.a.createElement("select",{className:"ui fluid search dropdown",multiple:"",onChange:this.onSelectChange,value:this.state.initialSelect},n.a.createElement("option",{key:"0",value:"0"},"Show All"),this.state.legendOptions.map((function(e,a){return n.a.createElement("option",{key:e.index+1,value:e.index+1},e.name)}))))),n.a.createElement("div",{className:"inline fields"},n.a.createElement("div",{className:"field "},n.a.createElement("button",{className:"ui right labeled yellow icon button",onClick:this.onReset},n.a.createElement("i",{className:"right undo icon"}),"RESET?")),n.a.createElement("div",{className:"field"},n.a.createElement("button",{type:"submit",className:"ui right labeled pink icon button "},n.a.createElement("i",{className:"right arrow icon"}),"PLOT!")))))))))}}]),t}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[103,1,2]]]);
//# sourceMappingURL=main.9387f69f.chunk.js.map