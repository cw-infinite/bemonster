import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFxs } from '../actions';


import createPlotlyComponent from "react-plotly.js/factory";
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class Graphicachu extends Component {
    
    // componentDidMount() {
    //     this.props.fetchFxs();
    // }

    render() {
        // console.log(this.props.graphicachu);
        const graphicahu = {...this.props.graphicachu};
        return (
            <div className="column plot-box">
                
                <Plot
                    data={graphicahu.data}
                    layout={graphicahu.layout}
                    config={graphicahu.config}
                    frames={graphicahu.frames}
                />
            </div>
        );
    }
}

// get copy of a state and do something. usually 'mapstatetoprops'
// alllll of the state in the store
const mapStateToProps = (state) => {
    console.log("Gaphicachu state:", state);
    return {
        graphicachu: {...state.fetchFxs.graphicachu},
    };
}

export default connect(mapStateToProps, { fetchFxs
})(Graphicachu);