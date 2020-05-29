import React from "react";
import "./App.css";
import { SketchPicker, TwitterPicker } from 'react-color';
// import FxForm from './Components/FxForm'

// import {
//    evaluate
//    // atan2, chain, derivative, e, log, pi, pow, round, sqrt
//  } from 'mathjs';

import createPlotlyComponent from "react-plotly.js/factory";
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

const math = require('mathjs');


class App extends React.Component {
   state = {

      counter: 1,
      expressions : [],

      // configable parts
      x: [],
      y: [],
      minX: 0,
      maxX: 1000,
      minY: -1000,
		maxY: 1000,
      gridOption: false,
      
      displayColorPicker: false,
      
      graphName: "",
      yAxis: "",
      xAxis: "",

      initialSelect: 0,
      legendOptions: [],
      fxs: [],

      fx1: "",
      fx1Name: '',

      /*
		config
		*/
      data: [
         // called trace.
         {
            x: [-50, -60, 1, 2, 3, 4, 5, 6],
            y: [1, 4, 9, 16, 25, 100, 2000],
            type: "scatter",
            marker: { color: "#1f77b4" },
            name: "Red Trace",
         },
         {
            x: [0, 0],
            y: [0, 1000],
            type: "scatter",
            marker: { color: "green" },
            name: "Red Trace",
            visible: false,
         },

      ],
      layout: {
         title: "Title of Graph",
         showlegend: true,

         xaxis: {
            title: "Name of X-Axis",
            domain: [0, 1000]
            
         },
         yaxis: {
            title: "Name of Y-Axis",
            domain: [0, 3000]
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
      frames: [{ scrollZoom: true }],
   };

   baseState = this.state;

   init_plotty = () => {

   }

   onAdd = (event) => {
      event.preventDefault();

      this.setState({
         fxs: [...this.state.fxs, {
            id: this.state.counter,
            name: '',
            fx: '',
            width: '',
            
            displayColorPicker: false,
            color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            visible: true,
            

         }],
         counter : ++this.state.counter
      });


   };

   onRemove(i, event) {
      console.log(i);
      let fxs = [...this.state.fxs]
      fxs.splice(i, 1);
      this.setState({ fxs });
   }

   onFxChange(i, event) {
      let fxs = [...this.state.fxs];
      fxs[i].fx = event.target.value;
      this.setState({ fxs });
   }   

   onFxNameChange(i, event) {
      let fxs = [...this.state.fxs];
      fxs[i].name = event.target.value;
      this.setState({ fxs });
   }   

   handleColorPick_Click(i, event) {
      console.log(event.target.value)
      let fxs = [...this.state.fxs];
      fxs[i].displayColorPicker = !fxs[i].displayColorPicker;
      this.setState({ fxs });
    };
  
   handleColorPick_Close(i, event) {
      let fxs = [...this.state.fxs];
      fxs[i].displayColorPicker = !fxs[i].displayColorPicker;
      this.setState({ fxs });
   };
   
   handleColorPick_Selected(i, color) {
      let fxs = [...this.state.fxs];
      fxs[i].displayColorPicker = !fxs[i].displayColorPicker;
      fxs[i].color = color.hex;
      this.setState({ fxs });

   };

   onSelectChange = (event) => {
      console.log(event.target.value);
      const index = parseInt(event.target.value);
      let data = this.state.data.slice();
      if(index > 0){
         data.map((trace, i) => {
            // visible none.
            // console.log(i, index);
            if(i !== index-1){
               trace.visible = false;
            }
            else{
               trace.visible = trace.visible || true;
            }
         });

      } else {
         data.map((trace, i) => {
            trace.visible = true;
         });
      }
      this.setState({ 
         data: data,
         initialSelect: index 
      });
   }

   calculation = (string_fx) => {

      const node = math.parse(string_fx);
      const expr = node.compile();

     
      // evaluate the expression repeatedly for different values of x

      // const min = 0;
      // 백만 https://mathjs.org/docs/reference/functions/range.html
      const step  = Math.abs(this.state.maxX - this.state.minX)/100000;

      
      const xValues = math.range(this.state.minX, this.state.maxX, step).toArray();
      const yValues = xValues.map(function (x1) {
         // console.log(x);
        return expr.evaluate({x: x1})
      });

      // console.log(xValues, yValues);

      return [xValues, yValues];
   }

   onReset = (event) => {
      event.preventDefault();
   };

   onFormSubmit = (event) => {
      event.preventDefault();
      // console.log(this.state);

      let traces = [], selectOptions = []; 

      let layout = {
         xaxis: {
            title: this.state.xAxis,
         },
         yaxis: {
            title: this.state.yAxis,
         },
         title: this.state.graphName,
         // showlegend: this.state.gridOption,
         showlegend: true,
      };

      let fx_list = this.state.fxs.slice();

      //temporary
      fx_list = [{
         id: 1,
         name: this.state.fx1Name,
         fx: this.state.fx1,
         color: '',
         // style: '',
         width: '',
         visible: true
      }, ...fx_list];

      fx_list.map((fx_data, i) => {
         if(fx_data.fx){
            let [x_trace, y_trace] = this.calculation(fx_data.fx);
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
      
      console.log(selectOptions);

      this.setState({
         data: traces,
         layout: layout,
         legendOptions : selectOptions,
         initialSelect : 0,
      });

      
   };
   
   render() {

      const tooltip = `Basic operations\n

      y = 0.034x + 13 * (3/2) -4
      Exponential
      
      y = x^3
      y = exp(x)
      Radical expression
      
      y = sqrt(x)
      y = x^(1/2)
      Logarithms
      
      y = log(x)
      Trigonometric functions
      
      y = sin(x)
      y = cos(x)
      y = tan(x)
      Trigonometric functions with degrees
      
      y = sin(45 deg) + x
      Constants
      e, pi, tau`;

      this.init_plotty();

      return (


         <div>
            <div className="app-main">
               <div className="ui centered grid">
                  {/* Plot */}
                  <div className="column plot-box">
                     <Plot
                        data={this.state.data}
                        layout={this.state.layout}
                        config={this.state.config}
                        frames={this.state.frames}
                     />
                  </div>

                  {/* Config Pad */}

                  <div className="column config-pad-box">
                     <div className="ui segment">

                        <form 
                           onSubmit={this.onFormSubmit} 
                           onChange={this.onHandleChange} 
                           className="ui form" >

                           {/*  Names */}
                           <div className="ui equal width form">
                              <div className="fields">
                                 <div className="eight wide field">
                                    <label>Graph Title</label>
                                    <input
                                       type="text"
                                       placeholder="Define title of the chart"
                                       onChange={(e) =>
                                          this.setState({
                                             graphName: e.target.value,
                                          })
                                       }
                                    />
                                 </div>
                              </div>
                           </div>
                           
                           {/* X Range  */}
                           <div className="ui divider"></div>

                           <div className="inline fields">
                              <div className="two wide field">
                                 <label>X-Axis :</label>
                              </div>
                              <div className="six wide field">
                                 <div className="ui input">
                                    <input
                                       type="text"
                                       placeholder="Define title of X-Axis"
                                       onChange={(e) =>
                                          this.setState({
                                             xAxis: e.target.value,
                                          })
                                       }
                                    />
                                 </div>
                              </div>
                              <div className="four wide field">
                                 <div className="ui left labeled input">
                                    <div className="ui basic label">Min</div>
                                    <input
                                       type="text"
                                       onChange={(e) =>
                                          this.setState({
                                             minX: e.target.value,
                                          })
                                       }
                                       value={this.state.minX}
                                       placeholder="Enter Min X.. "
                                    />
                                 </div>
                              </div>
                              <div className="four wide field">
                                 <div className="ui left labeled input">
                                    <div className="ui basic label">Max</div>
                                    <input
                                       type="text"
                                       value={this.state.maxX}
                                       onChange={(e) =>
                                          this.setState({
                                             maxX: e.target.value,
                                          })
                                       }
                                       placeholder="Enter Max X.. "
                                    />
                                 </div>
                              </div>
                           </div>

                           {/* Y Range  */}

                           <div className="inline fields">
                              <div className="two wide field">
                                 <label>Y-Axis :</label>
                              </div>
                              <div className="six wide field">
                                 <div className="ui input">
                                    <input
                                       type="text"
                                       placeholder="Define title of Y-Axis"
                                       onChange={(e) =>
                                          this.setState({
                                             yAxis: e.target.value,
                                          })
                                       }
                                    />
                                 </div>
                              </div>
                              {/* <div className="four wide field">
                                 <div className="ui left labeled input">
                                    <div className="ui basic label">Min</div>
                                    <input
                                       type="text"
                                       onChange={(e) =>
                                          this.setState({
                                             minY: e.target.value,
                                          })
                                       }
                                       value={this.state.minY}
                                       placeholder="Enter Min Y.. "
                                    />
                                 </div>
                              </div>
                              <div className="four wide field">
                                 <div className="ui left labeled input">
                                    <div className="ui basic label">Max</div>
                                    <input
                                       type="text"
                                       onChange={(e) =>
                                          this.setState({
                                             maxY: e.target.value,
                                          })
                                       }
                                       value={this.state.maxY}
												placeholder="Enter Max Y.. "
                                    />
                                 </div>
                              </div> */}
                           </div>

                           {/* Y = AX + B Functions   */}
                           <div className="ui divider"></div>
                           
                           <div className="inline fields">
                              <div className="one wide field">
                                 <label> 
                                    <h4>Y</h4>
                                 </label>
                              </div>
                              <div className="one wide field">
                                 <label>
                                    <h3>=</h3>
                                 </label>
                              </div>
                              <div className="seven wide field" 
                              data-tooltip="Hello"
                              data-inverted=""
                              data-variation="wide"
                              data-position="top right"
                              data-title="Elliot Fu">
                                 <input type="text" placeholder="ax+b..."
                                 onChange={e => {
                                    this.setState({ fx1: e.target.value });
                                 }}  
                                  />
                              </div>
                              
										<div className="six wide field">
                                 <div className="ui left labeled input">
                                    <div className="ui basic label">Name</div>
                                    <input
                                       type="text"
                                       onChange={(e) =>
                                          this.setState({
                                             fx1Name: e.target.value,
                                          })
                                       }
                                       // value={this.state.maxY}
												placeholder="Name of the equation"
                                    />
                                 </div>
                              </div>

                              <div className="one wide field">
                                 <button
                                    className="ui icon button"
                                    onClick={this.onAdd} >
                                    <i className="plus circle icon"></i>
                                 </button>
                              </div>
                           </div>
                           
                           {/* Divider */}
                           <div className="ui divider"></div>
                           
                           {/* Dynamic Functions */}
                           {this.state.fxs.map((fx, i) => 
                              <div key={fx.id} className="inline fields">
                                 <div className="one wide field">
                                    <label>
                                       <h4>Y</h4>
                                    </label>
                                 </div>
                                 <div className="one wide field">
                                    <label>
                                       <h3>=</h3>
                                    </label>
                                 </div>
                                 <div className="six wide field">
                                    <input type="text" placeholder="ax+b..." 
                                    onChange={this.onFxChange.bind(this, i)} />
                                 </div>
                                 
                                 <div className="six wide field">
                                    <div className="ui left labeled input">
                                       <div className="ui basic label">Name</div>
                                       <input
                                          type="text"
                                          placeholder="Name of the equation"
                                          onChange={this.onFxNameChange.bind(this, i)}
                                       />
                                    </div>
                                 </div>

                                 <div className="one wide field">
                                    <div className="ui icon button" onClick={ this.handleColorPick_Click.bind(this, i) }>
                                       {/* <i class="tint icon"></i> */}
                                       <div className="default-color" style={{background : this.state.fxs[i].color}}  />
                                    </div>
                                    { this.state.fxs[i].displayColorPicker ? 
                                       <div className="popover">
                                          <div className="cover" onClick={ this.handleColorPick_Close.bind(this, i) }/>
                                          {/* <SketchPicker color={ this.state.fxs[i].color } onChange={ this.handleColorPick_Selected.bind(this, i)} /> */}
                                          <TwitterPicker width='290px' color={ this.state.fxs[i].color } onChange={ this.handleColorPick_Selected.bind(this, i)} />
                                       </div> : null }
                                    {/* <button
                                       className="ui icon button"
                                       onClick={this.onRemove.bind(this, i)} >
                                       <i className="minus red circle icon"></i>
                                    </button> */}
                                 </div>
                                 <div className="one wide field">
                                    <button
                                       className="ui icon button"
                                       onClick={this.onRemove.bind(this, i)} >
                                       <i className="minus red circle icon"></i>
                                    </button>
                                 </div>
                              </div>         
                           )} 

                            {/* Options */}

                           <div className="inline fields">

                                 <div className="field ">
                                    <label>Legend Option</label>
                                 <select className="ui fluid search dropdown" multiple="" onChange={this.onSelectChange} value={this.state.initialSelect}>
                                    <option key='0' value="0">Show All</option>
                                    {this.state.legendOptions.map( (fx, i) => <option key={fx.index+1} value={fx.index+1}>{fx.name}</option> )}
                                 </select>
                                 </div>
                              
                           </div>


                           {/* Resset and  */}
                           <div className="inline fields">
                              <div className="field ">
                                 <button
                                    className="ui right labeled yellow icon button"
                                    onClick={this.onReset}
                                 >
                                    <i className="right undo icon"></i>
                                    RESET?
                                 </button>
                              </div>
                              <div className="field">
                                 <button
                                    type="submit"
                                    className="ui right labeled pink icon button " >
                                    <i className="right arrow icon"></i>
                                    PLOT!
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default App;
