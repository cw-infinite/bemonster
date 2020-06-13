import React, { Component } from "react";
import { connect } from "react-redux";
import { submitFxForm, fetchFxs, addFx, removeFx} from "../actions";
import { SketchPicker, TwitterPicker } from "react-color";
// import { Checkbox } from 'semantic-ui-react'
class FxForm extends Component {
   
   componentDidMount() {
      console.log('fukme');
      this.props.fetchFxs();
   }
   
   setRedux = () => {
      this.props.submitFxForm();
      
   }

   onAdd = (event) => {
      event.preventDefault();
      this.props.addFx();
   };

   onRemove(i, event) {
      event.preventDefault();
      this.props.removeFx(i);
   }
// I think we can combine fx change nameChange and FXcolorclick.
   onFxChange(i, event) {
      this.fxs[i].fx = event.target.value;
      this.setRedux();
   }

   onFxNameChange(i, event) {
      this.fxs[i].name = event.target.value;
      this.setRedux();
   }

   onFxColor_Click(i, event) {
      this.fxs[i].displayColorPicker = !this.fxs[i].displayColorPicker;
      this.setRedux();
   }

   onFxColor_Selected(i, color) {
      console.log('selected!');
      this.fxs[i].displayColorPicker = !this.fxs[i].displayColorPicker;
      this.fxs[i].color = color.hex;
      this.setRedux("update");
   }

   onFormSubmit = (event) => {
      event.preventDefault();
      this.setRedux("submit");
   };

   fetchFxList() {
      // console.log(this.fxs);
      return (
         this.fxs.map((fx, i) => (
            <div key={fx.id} className="inline fields">
               <div className="one wide field">
                  <div className="ui checkbox">
                     <input type="checkbox" name="example" />
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
                     type="text"
                     placeholder="ax+b..."
                     onChange={this.onFxChange.bind(this, i)}
                  />
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
                  {this.fxs[i].displayColorPicker ? (
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
                                 this.graphicachu.layout.title = e.target.value;
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
                                 this.graphicachu.layout.xaxis.title =
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
                                 this.graphicachu.layout.yaxis.title =
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
                        className="ui right labeled pink icon button "
                     >
                        <i className="right arrow icon"></i>
                        PLOT!
                     </button>
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
      counterId: state.fetchFxs.counterId
   };
};

export default connect(mapStateToProps, {
   submitFxForm,
   fetchFxs,
   addFx,
   removeFx
})(FxForm);
