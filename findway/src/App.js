import React from 'react';
import './App.css';
import UPArrow from './images/up.png';
import DOWNArrow from './images/down.png';
import LEFTArrow from './images/left.png';
import RIGHTArrow from './images/right.png';
import blockImage from "./images/block.jpg";
import crackrusImage from "./images/crackrus.jpg";
import Draggable from "react-draggable";
import jumpingman from "./images/farmer.jpg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockPostition: [1, 11, 10, 14, 15, 16, 17, 20, 30, 40, 35, 39, 45, 55, 36, 46, 56, 65, 75, 84, 85, 94, 95],
      cracktusostition: [23, 24, 25, 33, 34, 43, 44, 57, 58, 78, 79, 80, 82, 90, 92, 96]
    };
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

  positionChange = (positionCType) =>{

  }

  render() {
    let counter = 0;
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-9" style={{ backgroundColor: "#808080", padding: 5 }}>
              {[...Array(20)].map((data, index) => {
                return <div className="d-flex" key={index}>
                  {[...Array(30)].map((sdata, sindex) => {
                     counter = counter + 1;
                     let currentImage = "";
                     if(this.state.blockPostition.indexOf(counter) > -1)
                     {
                        currentImage = blockImage;
                     }
                     if(this.state.cracktusostition.indexOf(counter) > -1)
                     {
                        currentImage = crackrusImage;
                     }
                    return <div id={"box" + sindex} key={sindex} style={{ borderRadius: 5, border: "1px solid #000", height: 25, width: 10, backgroundSize: "25px 25px", backgroundImage: "url(" + currentImage + ")", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }} className="spacingbox flex-fill">&nbsp;</div>
                  })}
                </div>
              })}
              <Draggable>
                <div className="itemBoxImage" style={{ borderRadius: 5, height: 24, width: 26 , border: "1px solid #FFF", backgroundSize: "25px 25px", backgroundImage: "url(" + jumpingman + ")", backgroundPosition: "center center", backgroundRepeat: "no-repeat", zIndex: "55", position: "absolute", bottom: 6, left: 6 }} ref="itemBoxImage" className="itemBox">
                  &nbsp;
                 </div>
              </Draggable>
            </div>
            <div className="col-md-3">
              <div className="h-100">
                <div className="arrowbox">
                  <div style={{ textAlign: "center", width: "100%" }}>
                    <img onClick={() => this.positionChange("up")} width="50" src={UPArrow} alt="UPArrow" style={{ marginTop: "10" }} /><br />
                    <img onClick={() => this.positionChange("left")} width="50" src={LEFTArrow} alt="LEFTArrow" />&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                    <img onClick={() => this.positionChange("right")} width="50" src={RIGHTArrow} alt="RIGHTArrow" /><br />
                    <img onClick={() => this.positionChange("down")} width="50" src={DOWNArrow} alt="DOWNArrow" style={{ marginTop: "10" }} />
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
