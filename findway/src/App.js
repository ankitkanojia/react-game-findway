import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-9" style={{ backgroundColor: "#808080", padding: 5 }}>
            {[...Array(20)].map((data, index) => {
              return <div className="d-flex" key={index}>
                {[...Array(30)].map((sdata, sindex) => {
                  return <div id={"box" + sindex} key={sindex} style={{ borderRadius: 5, border: "1px solid #000", height: 25, width: 10, backgroundColor: "transparent" }} className="spacingbox flex-fill">&nbsp;</div>
                })}
              </div>
            })}
          </div>
          <div className="col-md-3">
            <div className="h-100">
              <div className="arrowbox">
                <div style={{ textAlign: "center", width: "100%"}}>
                  <button onclick="moveup()">UP</button><br /><br />
                  <button onclick="moveleft()">LEFT</button> &nbsp; &nbsp; &nbsp;
                  <button onclick="moveright()">RIGHT</button><br /><br />
                  <button onclick="movedown()">DOWN</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
