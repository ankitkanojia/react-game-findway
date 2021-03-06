import React from 'react';
import './App.css';
import UPArrow from './images/up.png';
import DOWNArrow from './images/down.png';
import LEFTArrow from './images/left.png';
import RIGHTArrow from './images/right.png';
import lockImage from "./images/lock.png";
import skullImage from "./images/skull.jpg";
import Draggable from "react-draggable";
import finishIcon from "./images/finish.png";
import Congratulations from "./images/Congratulations.gif";
import GameOver from "./images/gameover.jpg";
import Directional from "./images/direction.png";
import Notes from "./images/notes.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mins: "2",
      seconds: "59",
      isGameStart: false,
      isGameFinish: false,
      isGameOver: false,
      controlledPosition: { x: 0, y: 0 },
      leftCounter: 0,
      upCounter: 0,
      downCounter: 0,
      rightCounter: 0,
      topDownMove: 0,
      leftRightMove: 0,
      skullPositions: [2, 18, 24, 26, 36, 42, 43 , 46,
        58, 60, 68, 65, 70, 72, 76, 78, 80, 84, 86, 90, 94,
        102, 104, 106, 108, 110, 112, 120, 122, 126, 130, 134, 136, 138, 140,
        148, 150, 156, 160, 164, 166, 170, 172, 178, 182,
        184, 186, 190, 196, 204, 210, 214, 216, 218, 222, 224, 226,
        228, 230, 232, 234, 236, 238, 240, 254, 256, 278,
        280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302, 304, 306, 308, 318],
      blockPostitions: [1, 7, 8, 9, 10, 17, 23, 27, 35, 41, 45
        , 51, 57, 59, 61, 67, 69, 71, 73, 75, 77, 79, 85, 89, 91, 95,
        107, 111, 119, 121, 123, 137, 139,
        145, 147, 149, 153, 155, 159, 163, 165, 167, 171, 173, 177, 179, 181, 185,
        197, 203, 215, 217, 219, 223, 225, 227, 229, 233, 235, 237, 239,
        249, 255, 297, 299,
        301, 303, 305, 307, 317, 319],
      currentBlock: 309,
      finishBlock: 22,
      paddingSize: 0,
      rotate: 0
    };
  }

  resetAll = () => {
    this.setState({
      mins: "2",
      seconds: "59",
      isGameFinish: false,
      isGameOver: false,
      currentBlock: 309,
      finishBlock: 22,
      leftCounter: 0,
      upCounter: 0,
      downCounter: 0,
      rightCounter: 0,
      controlledPosition: { x: 0, y: 0 },
      rotate: 0
    })
  }

  componentDidMount() {
    this.setState({
      leftRightMove: this.refs["moveboxes1"].getBoundingClientRect().width,
      topDownMove: this.refs["moveboxes1"].getBoundingClientRect().height,
      paddingSize: (this.refs["gamerow"].getBoundingClientRect().height - this.refs["board"].getBoundingClientRect().height) / 2
    });
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  startGame = () => {
    this.setState({
      isGameStart: true
    }, () => {
      setInterval(this.timer, 1000);
    });
  }

  timer = () => {
    let seconds = this.state.seconds;
    let minute = this.state.mins;
    if (seconds === "00") {
      seconds = "59";
      minute = parseInt(minute) - 1;
    } else {
      seconds = parseInt(seconds) - 1;
    }

    if (parseInt(seconds) < 10) {
      seconds = "0" + seconds
    }

    if (!this.state.isGameFinish && !this.state.isGameOver) {
      if (minute === "0" && seconds === "00") {
        this.setState({
          seconds: seconds.toString(),
          isGameOver: true
        })
      } else {
        this.setState({
          seconds: seconds.toString(),
          mins: minute.toString()
        })
      }
    }
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
    if (!this.state.isGameStart) {
      return;
    }

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
    let currentBlockNumber = this.state.currentBlock;
    let currentRotate = this.state.rotate;
    if (type.toLowerCase() === "up") {
      currentUpCounter = currentUpCounter + 1;
      currentDownCounter = currentDownCounter + 1;
      yUpdate = yUpdate - this.state.topDownMove;
      currentBlockNumber = currentBlockNumber - 22;
      currentRotate = 0;
    } else if (type.toLowerCase() === "right") {
      currentRightCounter = currentRightCounter + 1;
      currentLeftCounter = currentLeftCounter + 1;
      xUpdate = xUpdate + this.state.leftRightMove;
      currentBlockNumber = currentBlockNumber + 1;
      currentRotate = 90;
    } else if (type.toLowerCase() === "left") {
      currentLeftCounter = currentLeftCounter - 1;
      currentRightCounter = currentRightCounter - 1;
      xUpdate = xUpdate - this.state.leftRightMove;
      currentBlockNumber = currentBlockNumber - 1;
      currentRotate = -90;
    } else if (type.toLowerCase() === "down") {
      currentUpCounter = currentUpCounter - 1;
      currentDownCounter = currentDownCounter - 1;
      yUpdate = yUpdate + this.state.topDownMove;
      currentBlockNumber = currentBlockNumber + 22;
      currentRotate = 180;
    }

    if (this.state.blockPostitions.indexOf(currentBlockNumber) > -1) {
      return;
    }

    if (this.state.skullPositions.indexOf(currentBlockNumber) > -1) {
      this.setState({
        controlledPosition: { x: 0, y: 0 },
        leftCounter: 0,
        upCounter: 0,
        downCounter: 0,
        rightCounter: 0,
        currentBlock: 309,
        rotate: 0
      });
      return;
    }

    if (currentBlockNumber === this.state.finishBlock) {
      this.setState({
        isGameFinish: true
      });
      return;
    }

    this.setState({
      rotate: currentRotate
    }, () => {
      this.setState({
        controlledPosition: { x: xUpdate, y: yUpdate },
        leftCounter: currentLeftCounter,
        rightCounter: currentRightCounter,
        upCounter: currentUpCounter,
        downCounter: currentDownCounter,
        currentBlock: currentBlockNumber
      });
    });
  }

  render() {
    let counter = 0;
    return (
      <div className="App">
        <div className="container">
          <div className="row" ref="gamerow">
            {this.state.isGameFinish && <div className="col-md-8 text-center d-flex justify-content-center align-items-center pink"><img className="Congratulations" alt="Congratulations" src={Congratulations} /></div>}
            {this.state.isGameOver && <div className="col-md-8 text-center d-flex justify-content-center align-items-center pink" ><img style={{ border: "2px solid #FFF", borderRadius: "5px" }} className="GameOver" alt="Game Over" src={GameOver} /></div>}
            {!this.state.isGameOver && !this.state.isGameFinish &&
              <div className="col-md-8 text-center d-flex justify-content-center align-items-center pink">
                <div ref="board" className="text-center" style={{ width: "730px", backgroundColor: "#808080", borderRadius: 5, position: "relative" }}>
                  {[...Array(15)].map((data, index) => {
                    return <div className="d-flex" key={index}>
                      {[...Array(22)].map((sdata, sindex) => {
                        counter = counter + 1;
                        let currentImage = "";
                        if (this.state.blockPostitions.indexOf(counter) > -1) {
                          currentImage = lockImage;
                        }
                        else if (this.state.finishBlock === counter) {
                          currentImage = finishIcon;
                          return <div id={"box" + counter} key={counter} style={{ borderRadius: 5, border: "1px solid #000", height: 35, width: 20, backgroundSize: "35px 35px", backgroundImage: "url(" + currentImage + ")", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }} className="spacingbox flex-fill">&nbsp;</div>
                        }
                        else if (this.state.skullPositions.indexOf(counter) > -1) {
                          currentImage = skullImage;
                        }
                        return <div ref={"moveboxes" + counter} id={"box" + counter} key={counter} style={{ borderRadius: 5, border: "1px solid #000", height: 35, width: 20, backgroundSize: "30px 25px", backgroundImage: "url(" + currentImage + ")", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }} className="spacingbox flex-fill">&nbsp;</div>
                      })}
                    </div>
                  })}
                  {this.state.isGameStart && <Draggable disabled={true} position={this.state.controlledPosition} >
                    <div className="dragBox" style={{ width: this.state.leftRightMove }}>
                      <div className="itemBoxImage" style={{ transform: "rotate(" + this.state.rotate + "deg)", width: this.state.leftRightMove }}></div>
                    </div>
                  </Draggable>}
                </div>
              </div>
            }
            <div className="col-md-4 purple d-flex" style={{ paddingTop: this.state.paddingSize, paddingBottom: this.state.paddingSize }}>
              <div class="row">
                <div className="d-flex col-12 justify-content-center align-items-start h-75">
                  <div className="h-100">
                    <div className="arrowbox">
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <img onClick={() => this.positionChange("up")} width="50" src={UPArrow} alt="UPArrow" style={{ marginTop: "10" }} /><br />
                        <img onClick={() => this.positionChange("left")} width="50" src={LEFTArrow} alt="LEFTArrow" />&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                         <img onClick={() => this.positionChange("right")} width="50" src={RIGHTArrow} alt="RIGHTArrow" /><br />
                        <img onClick={() => this.positionChange("down")} width="50" src={DOWNArrow} alt="DOWNArrow" style={{ marginTop: "10" }} />
                      </div>
                    </div>
                    <br />
                    <div className="text-center">
                      {!this.state.isGameStart && <button onClick={this.startGame} className="startbtn">START GAME</button>}
                      {this.state.isGameStart && !this.state.isGameFinish && !this.state.isGameOver && <button className="timerButton">{"0" + this.state.mins + " : " + this.state.seconds}</button>}
                      {(this.state.isGameOver || this.state.isGameFinish) && <button onClick={this.resetAll} className="restartButton">RESTART GAME</button>}
                    </div>
                  </div>
                </div>
                <div className="d-flex col-12 align-items-end justify-content-center h-25">
                  <img width="100%" src={Notes} alt="notes" />
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
