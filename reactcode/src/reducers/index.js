import { combineReducers} from 'redux';
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
      },
   ],
   counterId: 0,

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
   
   switch(action.type){
      case "SUBMIT_FX_CONFIG" :
         console.log('whatthefuk')
         const stateCopy = {...state}
         let traces = [], selectOptions = []; 
         stateCopy.fxs.forEach((fx_data, i) => {
            if(fx_data.fx){
               
               let [x_trace, y_trace] = calculateTrace(stateCopy.calculation, fx_data.fx);
               let trace = {
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
            }
         });
      default: 
         return state;
   
   }
}
   

const fxFormReducer = (state = initial , action) => {
   
   switch(action.type){
      case "ADD_FX" :
         let fxsCopy = [...state.fxs]
         let cId = state.counterId + 1;
         fxsCopy.push({
            id: cId,
            name: "",
            fx: "",
            width: "",
            displayColorPicker: false,
            color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
            visible: true,
            compare: false
         });
         
         return Object.assign({}, state, {
            fxs: fxsCopy,
            counterId: cId
         });
         case "REMOVE_FX" :
            let fxs = [...state.fxs]
            const index  = action.payload.index;
            fxs.splice(action.payload.index, 1)
            
            return Object.assign({}, state, {
               fxs
            });
            
      case "FETCH_FXS" :
         return state;
      default: 
         return state;
   
   }
   
}

export default combineReducers({
   submitFxForm: graphicachuReducer,
   fetchFxs: fxFormReducer,
   addFx: fxFormReducer,
   removeFx: fxFormReducer 
});
