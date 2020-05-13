import React from "react";
import "./App.css";
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

      graphName: "",
      yAxis: "",
      xAxis: "",

      fxs: [],

      // fx1: "",

      /*
		config
		*/
      data: [
         // called trace.
         {
            x: [-50, -60, 1, 2, 3, 4, 5],
            y: [1, 4, 9, 16, 25, 100],
            type: "scatter",
            marker: { color: "red" },
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
         },
         yaxis: {
            title: "Name of Y-Axis",
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

      console.log(xValues, yValues);

      return [xValues, yValues];
   }


   onFxChange(i, event) {
      let fxs = [...this.state.fxs];
      fxs[i] = event.target.value;
      this.setState({ fxs });
   }   

   onFormSubmit = (event) => {
      event.preventDefault();
      console.log(this.state);

      let traces = [];

      let layout = {
         xaxis: {
            title: this.state.xAxis,
         },
         yaxis: {
            title: this.state.yAxis,
         },
         title: this.state.graphName,
         showlegend: this.state.gridOption,
      };

      let functions = this.state.fxs.slice();
      functions.push(this.state.fx1);
      functions.map(fx => {
         if(fx){
            let [x_trace, y_trace] = this.calculation(fx);
            let trace = {
               x: x_trace,
               y: y_trace,
               type: "scatter",
               marker: { color: "red" },
            };
            traces.push(trace);
         }
      })
      

      this.setState({
         data: traces,
         layout: layout,
      });

      console.log("huh?");
   };
   
   onAdd = (event) => {
      event.preventDefault();
      this.setState({
         fxs: [...this.state.fxs, '']
      })
   };

   onRemove = (event) => {
      console.log('whatup');
   }
   
   onReset = (event) => {
      event.preventDefault();
   };

   render() {

      this.init_plotty();
      
      return (


         <div>
            <div className="app-main">
               <div className="ui stackable two column row centered grid">
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
                                    <label>Graph Name</label>
                                    <input
                                       type="text"
                                       placeholder="Graph Namee"
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

                           <div className="inline fields">
                              <div className="two wide field">
                                 <label>X-Axis :</label>
                              </div>
                              <div className="six wide field">
                                 <div className="ui input">
                                    <input
                                       type="text"
                                       placeholder="Name of X-Axis..."
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

                           {/* Y Axis Range  */}

                           <div className="inline fields">
                              <div className="two wide field">
                                 <label>Y-Axis :</label>
                              </div>
                              <div className="six wide field">
                                 <div className="ui input">
                                    <input
                                       type="text"
                                       placeholder="Name of Y-Axis..."
                                       onChange={(e) =>
                                          this.setState({
                                             yAxis: e.target.value,
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
                              </div>
                           </div>

                           {/* Y = AX + B Functions   */}
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
                              <div className="seven wide field">
                                 <input type="text" placeholder="ax+b..."
                                 onChange={e => {
                                    
                                    this.setState({ fx1: e.target.value });
                                 }}  />
                              </div>
                              
										<div className="six wide field">
                                 <div className="ui left labeled input">
                                    <div className="ui basic label">Name</div>
                                    <input
                                       type="text"
                                       // onChange={(e) =>
                                       //    this.setState({
                                       //       maxY: e.target.value,
                                       //    })
                                       // }
                                       // value={this.state.maxY}
												placeholder="Enter name of this line.. "
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
                           
                           {/* Dynamic Functions */}
                           {this.state.fxs.map((el, i) => 
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
                                 <div className="seven wide field">
                                    <input type="text" placeholder="ax+b..." 
                                    onChange={this.onFxChange.bind(this, i)} />
                                 </div>
                                 
                                 <div className="six wide field">
                                    <div className="ui left labeled input">
                                       <div className="ui basic label">Name</div>
                                       <input
                                          type="text"
                                          placeholder="Enter Max Y.. "
                                          // onChange={this.onFxChange.bind(this, i)}
                                       />
                                    </div>
                                 </div>
                     
                                 <div className="one wide field">
                                    <button
                                       className="ui icon button"
                                       onClick={this.onRemove} >
                                       <i className="minus red circle icon"></i>
                                    </button>
                                 </div>
                              </div>         
                           )} 

                            {/* Grid Options */}

                           <div className="inline fields">
									   <div className="ui toggle checkbox">
										<input type="checkbox" tabIndex="0" className="hidden" 
										onChange={e => {
											this.setState({gridOption : e.target.value});
										}}
										value={this.state.gridOption} />
										<label>Grid option</label>
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
