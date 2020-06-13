import React from "react";
import Graphicachu from './components/Graphicachu';
import FxForm from './components/FxForm';
import "./App.css";

class App extends React.Component {
  
   render() {

        return (
        <div>
            <div className="app-main">
                <div className="ui centered grid">
                    {/* Plot */}
                    <Graphicachu />

                    {/* Config Pad */}
                    <FxForm />
                </div>
            </div>
         </div>
      );
   }
}

export default App;
