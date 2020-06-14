import { combineReducers} from 'redux';
import { e } from 'mathjs';
const math = require('mathjs');

const initial = {
   graphicachu : {
      data: [],
      layout: {
         title: "Title of Graph",
         showlegend: true,
   
         xaxis: {
            title: "Name of X-Axis",
            domain: [0, 1000],
         },
         yaxis: {
            title: "Name of Y-Axis",
            domain: [0, 3000],
         },
      },
      config: {
         responsive: true,
         modeBarButtonsToRemove: [
            "pan2d",
            "select2d",
            "lasso2d",
            "resetScale2d",
            "zoomOut2d",
            "zoom2d",
            "zoomIn2d",
            "zoomOut2d",
            "autoScale2d",
         ],
         displaylogo: false,
      },
      frames: [{ scrollZoom: true }]
   },
   calculation: {
      minX: 0,
      maxX: 0,
   },
   fxs: [
      {
         id: 0,
         name: "",
         fx: "",
         width: "",
         displayColorPicker: false,
         color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
         visible: true,
         compare: false,
         checkBoxDisabled: false,
      },
   ],
   counterId: 0,
   compareDisabled: true,

}

const calculateTrace = (calculation, string_fx) => {

   const node = math.parse(string_fx);
   const expr = node.compile();

  
   // evaluate the expression repeatedly for different values of x
   // console.log(calculation);
   // const min = 0;
   // 백만 https://mathjs.org/docs/reference/functions/range.html
   const step  = Math.abs(calculation.maxX - calculation.minX)/100000;
   // console.log(calculation.minX, calculation.maxX, step);
   // console.log(math.range(calculation.minX, calculation.maxX, step));
   const xValues = math.range(calculation.minX, calculation.maxX, step).toArray();
   const yValues = xValues.map(function (x1) {
      // console.log(x);
     return expr.evaluate({x: x1})
   });

   // console.log(xValues, yValues);

   return [xValues, yValues];
}

const graphicachuReducer = (state = initial , action) => {
   const stateCopy = {...state};
   let traces = [], selectOptions = [], trace; 
   switch(action.type){
      case "SUBMIT_FX_CONFIG" :
         
         action.payload.fxs.forEach((fx_data, i) => {
            if(fx_data.fx){
               
               let [x_trace, y_trace] = calculateTrace(action.payload.calculation, fx_data.fx);
               trace = {
                  name: fx_data.name,
                  x: x_trace,
                  y: y_trace,
                  type: "scatter",
                  marker: { color: fx_data.color },
                  visible: fx_data.visible,
                  // showlegend: true,
                  // mode: "lines", "markers", "lines+markers", "lines+markers+text", "none"
                  
               };
               traces.push(trace);
   
            }
   
            //Add select option
            selectOptions.push({
               index: i,
               name: fx_data.name? fx_data.name : `Expression ${i+1}`
            });
         })

         // Calcuation.

         return Object.assign({}, state, {
            graphicachu: {
               ...(stateCopy.graphicachu),
               data: traces,
               legendOptions : selectOptions,
               initialSelect : 0,
               layout: action.payload.layout
            }
         });
      
      case "COMPARE_FX_CONFIG" :

      
         const layoutCopy = {...(action.payload.layout)};
         
         const compareFxs = action.payload.fxs.filter(fx => {
            return fx.compare;
         });
         compareFxs.forEach((fx_data, i) => {
            if(fx_data.fx && fx_data.compare === true){
               
               let [x_trace, y_trace] = calculateTrace(action.payload.calculation, fx_data.fx);
               let trace = {
                  name: fx_data.name,
                  x: x_trace,
                  y: y_trace,
                  type: "scatter",
                  marker: { color: fx_data.color },
                  visible: fx_data.visible,                  
               };
               console.log(layoutCopy['yaxis' + (i?i+1:'')] );
               if(!i){
                  layoutCopy['yaxis' + (i?i+1:'')] = {
                     title: fx_data.name,
                  }
               }
               else{
                  trace.yaxis = `y${i+1}`;
                  layoutCopy['yaxis' + (i?i+1:'')] = {
                     title: fx_data.name,
                     // titlefont: {color: fx_data.color},
                     // tickfont: {color: fx_data.color},
                     overlaying: 'y',
                     side: 'right',
                     // anchor: 'free',
                  };
               }
               traces.push(trace);

            }
   
            //Add select option
            selectOptions.push({
               index: i,
               name: fx_data.name ? fx_data.name : `Expression ${i+1}`
            });
         });

         return Object.assign({}, state, {
            graphicachu: {
               ...(stateCopy.graphicachu),
               data: traces,
               legendOptions : selectOptions,
               initialSelect : 0,
               layout: layoutCopy
            }
         });
      default: 
         return state;
   
   }
}
   

const fxFormReducer = (state = initial , action) => {
   let fxsCopy = [...state.fxs];
   switch(action.type){
      case "ADD_FX" :
         
         let cId = state.counterId + 1;
         fxsCopy.push({
            id: cId,
            name: "",
            fx: "",
            width: "",
            displayColorPicker: false,
            color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
            visible: true,
            compare: false,
            checkBoxDisabled: false,
         });
         
         return Object.assign({}, state, {
            fxs: fxsCopy,
            counterId: cId
         });
      case "REMOVE_FX" :
         fxsCopy.splice(action.payload.index, 1)
         
         return Object.assign({}, state, {
            fxs: fxsCopy
         });
            
      case "Edit_FX" :
         fxsCopy[action.payload.index] = action.payload.fx;

         const numOfChecked = fxsCopy.reduce((numOfCompare, fx) => {
            return numOfCompare + (fx.compare ? 1 : 0);
         }, 0);

         fxsCopy.forEach(fx => {
            if( numOfChecked > 1){
               if(!fx.compare)
                  fx.checkBoxDisabled = true;
            } else {
               fx.checkBoxDisabled = false;
            }
         });

         return Object.assign({}, state, {
            fxs: fxsCopy,
            compareDisabled: (numOfChecked < 2),
         });
      case "FETCH_FXS" :
         return state;
      default: 
         return state;
   
   }
   
}

export default combineReducers({
   submitFxForm: graphicachuReducer,
   compareFxForm: graphicachuReducer,
   fetchFxs: fxFormReducer,
   addFx: fxFormReducer,
   removeFx: fxFormReducer,
   editFx: fxFormReducer
});
