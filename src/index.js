import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/**
 * マス目をあらわすオブジェクトです .
 * @param {*} props
 * @returns -マス目にいれる値
 */

function Square(props) {
  return (
    // 親コンポーネントのonClickメソッドを呼び出す
    <button className="square" onClick={props.onClick}>
      {/* 親コンポーネントの値 */}
      {props.value}
    </button>
  );
}

/**
 * Squareのまとまりを管理するクラスです.
 */
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        //   マス目すべての情報をもつsquaresから、入るべき値を取得し代入する
        value={this.props.squares[i]}
        // GamesのhandleClickを呼び出す
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  //   配置情報
  render() {
    return (
      <div>
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

/**
 * ゲーム全体の管理をあらわすクラスです.
 */
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          // 9つの配列の中身がすべてnullのsquaresをセットする
          squares: Array(9).fill(null),
        },
      ],
      //   ゲームの手番
      stepNumber: 0,
      //   次の手番が〇か×かを管理するためのstate
      xIsNext: true,
    };
  }

  handleClick(i) {
    //   0番目から現在の手番のhistoryのコピーを作成する
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // 現在の履歴番号（手番）
    const current = history[this.state.stepNumber];
    // 盤面を更新する前に現在の状況をsquaresに代入する
    const squares = current.squares.slice();
    // 「ゲームの勝者が居る場合」 or 「マーク済のマスがクリックされた場合」処理を中断する.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 三項演算子 条件文?true:false
    squares[i] = this.state.xIsNext ? "X" : "O";
    // historyに今回つくったsquaresを追加する
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    //   現時点でのすべてのhistoryをセット
    const history = this.state.history;
    // 最新の盤面をセット
    const current = history[history.length - 1];
    // 現在の盤面での勝者をセット
    const winner = calculateWinner(current.squares);
    // map関数で、historyのindexを取得する stepがindex,moveが手番
    const moves = history.map((step, move) => {
      // desc=description 説明文.手番を戻すボタン説明の表示
      // moveがtrue:0やnull以外の場合：moveがfalseだった場合に表示する説明文
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  // 勝利条件（縦、横、斜め列でそろう）
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
