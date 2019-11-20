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
      controlledPosition : { x: 0, y: 0 },
      leftCounter: 0,
      upCounter: 0,
      downCounter: 0,
      rightCounter: 0,
      moveSize: 35,
      leftRightMove : 3.4,
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
      this.positionChange("up");
    } else if (e.keyCode === 40) {
      this.positionChange("down");
    } else if (e.keyCode === 37) {
      this.positionChange("left");
    } else if (e.keyCode === 39) {
      this.positionChange("right");
    }
  }

  positionChange = async (type) => {
    let currentLeftCounter = this.state.leftCounter;
    if (currentLeftCounter === 0 && type.toLowerCase() === "left") {
      return;
    }

    let currentRightCounter = this.state.rightCounter;
    if (currentRightCounter === 21 && type.toLowerCase() === "right") {
      return;
    }

    let currentUpCounter = this.state.upCounter;
    if (currentUpCounter === 14 && type.toLowerCase() === "up") {
      return;
    }

    let currentDownCounter = this.state.downCounter;
    if (currentDownCounter === 0 && type.toLowerCase() === "down") {
      return;
    }

    let xUpdate = this.state.controlledPosition.x;
    let yUpdate = this.state.controlledPosition.y;
    if (type.toLowerCase() === "up") {
      currentUpCounter = currentUpCounter + 1;
      currentDownCounter = currentDownCounter + 1;
      yUpdate = yUpdate - this.state.moveSize;
    } else if (type.toLowerCase() === "right") {
      currentRightCounter = currentRightCounter + 1;
      currentLeftCounter = currentLeftCounter + 1;
      xUpdate = xUpdate + this.state.moveSize  + this.state.leftRightMove;

    } else if (type.toLowerCase() === "left") {
      currentLeftCounter = currentLeftCounter - 1;
      currentRightCounter = currentRightCounter - 1;
      xUpdate = xUpdate - this.state.moveSize - this.state.leftRightMove;
    } else if (type.toLowerCase() === "down") {
      currentUpCounter = currentUpCounter - 1;
      currentDownCounter = currentDownCounter - 1;
      yUpdate = yUpdate + this.state.moveSize;
    }

    this.setState({
      controlledPosition: { x: xUpdate, y: yUpdate },
      leftCounter: currentLeftCounter,
      rightCounter: currentRightCounter,
      upCounter: currentUpCounter,
      downCounter: currentDownCounter
    });
  }

  render() {
    let counter = 0;
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-9" style={{ backgroundColor: "#808080", padding: 5 }}>
              {[...Array(15)].map((data, index) => {
                return <div className="d-flex" key={index}>
                  {[...Array(22)].map((sdata, sindex) => {
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
                    return <div id={"box" + sindex} key={sindex} style={{ borderRadius: 5, border: "1px solid #000", height: 35, width: 20, backgroundSize: "40px 35px", backgroundImage: "url(" + currentImage + ")", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }} className="spacingbox flex-fill">&nbsp;</div>
                  })}
                </div>
              })}
              <Draggable disabled={true} position={this.state.controlledPosition} >
                <div className="itemBoxImage" style={{ borderRadius: 5, height: 32, width: 36 , border: "2px solid #FFF", backgroundSize: "25px 30px", backgroundImage: "url(" + jumpingman + ")", backgroundPosition: "center center", backgroundRepeat: "no-repeat", zIndex: "55", position: "absolute", bottom: 6, left: 6 }} ref="itemBoxImage" className="itemBox">
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
