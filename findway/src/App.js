import React from 'react';
import './App.css';
import UPArrow from './images/up.png';
import DOWNArrow from './images/down.png';
import LEFTArrow from './images/left.png';
import RIGHTArrow from './images/right.png';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      console.log("up");
    } else if (e.keyCode === 40) {
      console.log("down");
    } else if (e.keyCode === 37) {
      console.log("left");
    } else if (e.keyCode === 39) {
      console.log("right");
    }
  }

  render() {
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
                  <div style={{ textAlign: "center", width: "100%" }}>
                    <img width="50" src={UPArrow} alt="UPArrow" style={{ marginTop: "10" }} /><br />
                    <img width="50" src={LEFTArrow} alt="LEFTArrow" />&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                  <img width="50" src={RIGHTArrow} alt="RIGHTArrow" /><br />
                    <img width="50" src={DOWNArrow} alt="DOWNArrow" style={{ marginTop: "10" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
