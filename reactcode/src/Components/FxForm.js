// import React from "react";


// class FxForm extends React.Component{

//    state = {
//       fx : '',
//       name : ''
//    };

//    handleOnClick = e => {
//       e.preventDefault();
//    }

//    getState(){
//       return this.state.fx
//    }

//    render() {
//       return (
//          <div className="inline fields">
//             <div className="one wide field">
//                <label>
//                   <h4>{props}</h4>
//                </label>
//             </div>
//             <div className="one wide field">
//                <label>
//                   <h3>=</h3>
//                </label>
//             </div>
//             <div className="seven wide field">
//                <input type="text" placeholder="ax+b..." 
//                onChange={(e) =>
//                   this.setState({
//                      fx: e.target.value,
//                   })
//                }
//                value={this.state.fx1} />
//             </div>
            
//             <div className="six wide field">
//                <div className="ui left labeled input">
//                   <div className="ui basic label">Name</div>
//                   <input
//                      type="text"
//                      placeholder="Enter Max Y.. "
//                      onChange={(e) =>
//                         this.setState({
//                            name: e.target.value,
//                      })}
//                   />
//                </div>
//             </div>

//             <div className="one wide field">
//                <button
//                   className="ui icon button"
//                   onClick={this.onRemove} >
//                   <i className="minus red circle icon"></i>
//                </button>
//             </div>
//          </div>
            
//       );
//    }
// }


// export default FxForm;