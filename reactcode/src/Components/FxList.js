import React from 'react';
import { connect } from 'react-redux';
// import {} from '';


class FxList extends React.Component{
    render () {
        return (
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
        );
    }
}

const matStateToProps = (state) => {
    return {};
}

export default connect(matStateToProps, {
})(FxList);