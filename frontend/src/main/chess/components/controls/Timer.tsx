import "./Timer.css";
import React, { useState, useEffect } from "react";


export default function Timer({ initialSeconds }: { initialSeconds: number }) {

    const [whiteSeconds, setWhiteSeconds] = useState(initialSeconds);
    const [blackSeconds, setBlackSeconds] = useState(initialSeconds);


    const [isWhiteTurn, changeTurn] = useState(true); // This should be managed by the game state

    const [isRunning, setIsRunning] = useState(true);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
            timer = setInterval(() => {
                if (!isRunning) return;
                if (isWhiteTurn) {
                    setWhiteSeconds(prev => Math.max(prev - 1, 0));
                } else {
                    setBlackSeconds(prev => Math.max(prev - 1, 0));
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, isWhiteTurn]);

    return (
        <div className="timerWrapper">
            <div className="whiteTimerContainer" 
                onClick={() => isWhiteTurn ? changeTurn(!isWhiteTurn) : null}
                onKeyDown={(e) => (e.key === "Enter" && isWhiteTurn) ? changeTurn(!isWhiteTurn) : null}
                style={{ backgroundColor: isWhiteTurn ? "#fff700ff" : "transparent" }}
            >
                <h3 className="whiteTimer">{formatTime(whiteSeconds)}</h3>
            </div>
            <div className="blackTimerContainer" 
                onClick={() => !isWhiteTurn ? changeTurn(!isWhiteTurn) : null} 
                onKeyDown={(e) => (e.key === "Enter" && !isWhiteTurn) ? changeTurn(!isWhiteTurn) : null}
                style={{ backgroundColor: !isWhiteTurn ? "#fff700ff" : "transparent" }}
                >
                <h3 className="blackTimer">{formatTime(blackSeconds)}</h3>
            </div>

        </div>
    );
}