import { click } from "@testing-library/user-event/dist/click";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// 上に行けば行くほど子コンポーネント
// 子コンポーネント
class Square extends React.Component {
  constructor(props) {
    //   constructorを定義する際は常にsuperを呼ぶ
    super(props);
    // state=保持したい値
    this.state = { value: null };
  }

  render() {
    return (
      <button
        className="square"
        //   setStateで保持したい値をセットする
        onClick={() => this.setState({ value: "X" })}
      >
        {this.state.value}
      </button>
    );
  }
}
// 親コンポーネント
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
