/* This is the game page component */

// ---------------- Imports ---------------- //
import "./GamePage.css";

import Board from "../chess/components/board/Board";
import GameMoveLogSidebar from '../chess/components/controls/GameMoveLogSidebar';
import GameOptionsSidebar from '../chess/components/controls/GameOptionsSidebar';
import { useState } from 'react';
import Timer from "../chess/components/controls/Timer";

/**
 * GamePage component - main container for the chess game UI.
 * @returns {JSX.Element}
 */

export default function GamePage({ initialSeconds }: { initialSeconds: number }) {
  const options = [
    { value: 'endturn', label: 'End Turn' },
    { value: 'undo', label: 'Undo' },
    { value: 'redo', label: 'Redo' },
    { value: 'forfeit', label: 'Forfeit' }

  ];
  const [selectedOption, setSelectedOption] = useState('standard');

  return (
    <div className="game-page-div">
      <GameMoveLogSidebar />

        <div className="board-timer-wrapper">
          <Board />
          {initialSeconds > 0 ? <Timer initialSeconds={initialSeconds} /> : 
          <div className="Timerfiller"></div>}
        </div>

      <GameOptionsSidebar
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}
