import React, { Component } from "react";
import { connect } from "react-redux";
import { submitFxForm, fetchFxs, addFx, removeFx, editFx} from "../actions";
import { TwitterPicker } from "react-color";
import { Form, Checkbox } from 'semantic-ui-react';

// import { Checkbox } from 'semantic-ui-react'
class FxList extends Component {
   
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

   handleCheckboxClick = (i, event) =>{
      // console.log(i, event.target.checked);
      let fxCopy = {...this.props.fxs[i]};
      fxCopy[event.target.name] = event.target.checked;
      this.props.editFx(i, fxCopy)
   } 

   render() {
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
}

const mapStateToProps = (state) => {
   return {
      calculation : state.fetchFxs.calculation,
      fxs : state.fetchFxs.fxs,
      counterId: state.fetchFxs.counterId
   };
};

export default connect(mapStateToProps, {
   fetchFxs,
   addFx,
   removeFx,
   editFx
})(FxList);
