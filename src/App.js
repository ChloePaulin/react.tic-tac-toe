// Import useState pour suivre le changement dans la variable sur laquelle on l'appelle.
import { useState } from "react";

// Création bouton avec les paramètres nécessaires
function Square({ value, onSquareClick }) {
  // La value sera la valeur de notre case, au clic on exécute onSquareClick.
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Gestion du tableau de Tic-Tac-Toe
function Board({ xIsNext, squares, onPlay }) {
  // Gestion du click dans le tableau. Appeler par onSquareClick dans notre fonction Square.
  function handleClick(i) {
    // Vérifie si la case est déjà attribuée à une valeur
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Création d'une copie du tableau squares
    const nextSquares = squares.slice();

    // Condition pour déterminer qui joue - X ou O ?
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // Met à jour la variable setSquares de la fonction Board et change la valeur du booléen pour savoir si X est le suivant ou non == Voir handlePlay
    onPlay(nextSquares);
  }

  // Vérification du gagnant
  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = winner + " a gagné";
  } else {
    status = "Prochain tour : " + (xIsNext ? "X" : "O");
  }

  // Retourne le tableau de jeu
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  
  // Création d'un tableau avec 9 valeurs pour suivre l'historique des clicks === ce tableau suit l'avancement du jeu pour un retour en arrière.
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // Détermine le coup que l'utilisateur est en train de consulter
  const [currentMove, setCurrentMove]=useState(0);
  
    // Suivi du prochain joueur
    const xIsNext = currentMove % 2 === 0;

  // Permet de lire le dernier élément du tableau history pour le retour en arrière
  const currentSquares = history[currentMove];

  // Met à jour la partie
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove +1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Aller au coup #" + move;
    } else {
      description = "Revenir au début";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
