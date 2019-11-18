import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="col-md-9" style={{backgroundColor:"#808080", padding :5}}>
          {[...Array(25)].map((data, index) => {
            return <div className="d-flex" key={index}>
              {[...Array(30)].map((sdata, sindex) => {
                return <div id={"box" + sindex} key={sindex} style={{ borderRadius: 5,border: "1px solid #000" ,height: 25, width: 10 ,backgroundColor : "transparent" }} className="spacingbox flex-fill">&nbsp;</div>
              })}
            </div>
          })}
        </div>
        <div className="col-md-3">&nbsp;</div>
      </div>
    </div>
  );
}

export default App;
