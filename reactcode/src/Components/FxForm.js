import React, { Component } from "react";
import { connect } from "react-redux";
import { submitFxForm, fetchFxs, addFx, removeFx, editFx, compareFxForm} from "../actions";
import { TwitterPicker } from "react-color";
import { Form, Checkbox } from 'semantic-ui-react';

// import { Checkbox } from 'semantic-ui-react'
class FxForm extends Component {
   
   layout = {
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
   }

   calculation = {
      minX: 0,
      maxX: 0,
   }

   componentDidMount() {
      this.props.fetchFxs();
   }
   
   onAdd = (event) => {
      event.preventDefault();
      this.props.addFx();
   };

   onRemove(i, event) {
      event.preventDefault();
      this.props.removeFx(i);
   }

   onFxChangeGen(i, event){
      let fxCopy = {...this.props.fxs[i]};
      fxCopy[event.target.name] = event.target.value;
      this.props.editFx(i, fxCopy);
   }

   onFxColor_Click(i, event) {
      let fxCopy = {...this.props.fxs[i]};
      fxCopy.displayColorPicker = !fxCopy.displayColorPicker;
      this.props.editFx(i, fxCopy);
   }

   onFxColor_Selected(i, color) {
      let fxCopy = {...this.props.fxs[i]};
      fxCopy.displayColorPicker = !fxCopy.displayColorPicker;
      fxCopy.color = color.hex;
      this.props.editFx(i, fxCopy);
   }

   onCompare = (event) => {
      event.preventDefault();
      const ctx = {
         fxs: this.props.fxs,
         layout: this.layout,
         calculation: this.props.calculation
      }
      this.props.compareFxForm(ctx);
   };

   onFormSubmit = (event) => {
      event.preventDefault();
      const ctx = {
         fxs: this.props.fxs,
         layout: this.layout,
         calculation: this.props.calculation
      }
      this.props.submitFxForm(ctx);
   };

   handleCheckboxClick = (i, event) =>{
      // console.log(i, event.target.checked);
      let fxCopy = {...this.props.fxs[i]};
      fxCopy[event.target.name] = event.target.checked;
      this.props.editFx(i, fxCopy)
   } 


   fetchFxList() {
      // console.log(this.fxs);
      return (
         this.props.fxs.map((fx, i) => (
            <div key={fx.id} className="inline fields">
               <div className="one wide field">
                  <div className="ui checkbox" data-content={fx.disabled? "Deselect checkboxes" : ""}>
                     <input type="checkbox" name="compare" disabled={fx.checkBoxDisabled}
                        onClick={this.handleCheckboxClick.bind(this, i)}/>
                     <label></label>
                  </div>
               </div>
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
                  <input
                     name="fx"
                     type="text"
                     placeholder="ax+b..."
                     onChange={this.onFxChangeGen.bind(this, i)}
                  />
               </div>

               <div className="six wide field">
                  <div className="ui left labeled input">
                     <div className="ui basic label">Name</div>
                     <input
                        name="name"
                        type="text"
                        placeholder="Name of the equation"
                        onChange={this.onFxChangeGen.bind(this, i)}
                     />
                  </div>
               </div>

               <div className="one wide field">
                  <div
                     className="ui icon button"
                     onClick={this.onFxColor_Click.bind(this, i)}
                  >
                     {/* <i class="tint icon"></i> */}
                     <div
                        className="default-color"
                        style={{
                           background: this.fxs[i].color,
                        }}
                     />
                  </div>
                  {this.props.fxs[i].displayColorPicker ? (
                     <div className="popover">
                        <div
                           className="cover"
                           onClick={this.onFxColor_Click.bind(this, i)}
                        />
                        {/* <SketchPicker color={ this.state.fxs[i].color } onChange={ this.onFxColor_Selected.bind(this, i)} /> */}
                        <TwitterPicker
                           width="290px"
                           color={this.fxs[i].color}
                           onChange={this.onFxColor_Selected.bind(this, i )}
                        />
                     </div>
                  ) : null}
               </div>

               {i === 0 ? (
                  <div className="one wide field">
                     <button
                        className="ui icon button"
                        onClick={this.onAdd}
                     >
                        <i className="plus circle icon"></i>
                     </button>

                     <div className="ui divider"></div>
                  </div>
               ) : (
                  <div className="one wide field">
                     <button
                        className="ui icon button"
                        onClick={this.onRemove.bind(this, i)}
                     >
                        <i className="minus red circle icon"></i>
                     </button>
                  </div>
               )}
            </div>
         ))
      );
   }

   render() {
      this.graphicachu = this.props.graphicachu;
      this.calculation  = this.props.calculation ;
      this.fxs  = this.props.fxs;
      this.counterId = this.props.counterId;
      return (
         <div className="column config-pad-box">
            <div className="ui segment">
               <form className="ui form" onSubmit={this.onFormSubmit}>
                  {/*  Names */}
                  {/* TODO: change the grid ? */}
                  <div className="ui equal width form">
                     <div className="fields">
                        <div className="eight wide field">
                           <label>Graph Name</label>
                           <input
                              type="text"
                              name="layout.title"
                              placeholder="Graph Title"
                              onChange={(e) => {
                                 this.layout.title = e.target.value;
                              }}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="ui divider"></div>

                  <div className="inline fields">
                     <div className="two wide field">
                        <label>X-Axis :</label>
                     </div>
                     <div className="six wide field">
                        <div className="ui input">
                           <input
                              name="layout.xaxis.title"
                              type="text"
                              placeholder="Define title of X-Axis"
                              onChange={(e) => {
                                 this.layout.xaxis.title =
                                    e.target.value;
                              }}
                           />
                        </div>
                     </div>
                     <div className="four wide field">
                        <div className="ui left labeled input">
                           <div className="ui basic label">Min</div>
                           <input
                              name="calculation.minX"
                              type="text"
                              onChange={(e) => {
                                 this.calculation.minX =
                                    parseInt(e.target.value);
                              }}
                              placeholder="Enter Min X.. "
                           />
                        </div>
                     </div>
                     <div className="four wide field">
                        <div className="ui left labeled input">
                           <div className="ui basic label">Max</div>
                           <input
                              type="text"
                              name="calculation.maxX"
                              onChange={(e) => {
                                 this.calculation.maxX =
                                 parseInt(e.target.value);
                              }}
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
                              name="layout.yaxis.title"
                              placeholder="Define title of Y-Axis"
                              onChange={(e) => {
                                 this.layout.yaxis.title =
                                    e.target.value;
                              }}
                           />
                        </div>
                     </div>
                  </div>

                  {/* Y = AX + B Functions   */}
                  <div className="ui divider"></div>

                  {/* Dynamic Functions */}
                  {this.fetchFxList()}
                              

                  <div className="inline fields">
                     <div className="field ">
                        <button className="ui right labeled blue icon button"
                           onClick={this.onReset}>
                           <i className="right undo icon"></i>
                           RESET?
                        </button>
                     </div>
                     <div className="field">
                        <button className="ui right labeled yellow icon button " disabled={this.props.compareDisabled}
                           onClick={this.onCompare}>
                           <i className="right clone icon"></i>
                           Compare
                        </button>
                     </div>
                     <div className="field">
                        <button type="submit" className="ui right labeled pink icon button ">
                           <i className="right chart line icon"></i>
                           PLOT!
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}

// get copy of a state and do something. usually 'mapstatetoprops'
// alllll of the state in the store
const mapStateToProps = (state) => {
   
   console.log("FxForm state:", state);
   return {
      calculation : state.fetchFxs.calculation,
      fxs : state.fetchFxs.fxs,
      counterId: state.fetchFxs.counterId,
      compareDisabled: state.fetchFxs.compareDisabled,
   };
};

export default connect(mapStateToProps, {
   submitFxForm,
   fetchFxs,
   addFx,
   removeFx,
   editFx,
   compareFxForm
})(FxForm);
