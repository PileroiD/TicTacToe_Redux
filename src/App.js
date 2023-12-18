import React, { useState, useEffect } from "react";
import Block from "./components/block/block";
import { checkWinner } from "./utils/utils";
import { store } from "./store/store";

import "./App.css";

function App() {
    const [state, setState] = useState(store.getState());
    const { currentSign, winner, blocks } = state;

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });

        return () => unsubscribe();
    }, []);

    let status = winner ? `Winner: ${winner}` : `Next player: ${currentSign}`;

    function startOver() {
        store.dispatch({ type: "START_OVER" });
    }

    function handleClick(index) {
        if (!blocks[index] && !winner) {
            const newBlocks = [...blocks];
            newBlocks[index] = currentSign;
            store.dispatch({ newBlocks: newBlocks, type: "SET_BLOCKS" });

            const winnerResult = checkWinner(newBlocks);
            if (winnerResult) {
                store.dispatch({
                    winner: winnerResult,
                    type: "SET_WINNER",
                });
            } else {
                store.dispatch({ type: "SET_CURRENT_SIGN" });
            }
        }
    }

    return (
        <AppLayout
            status={status}
            startOver={startOver}
            handleClick={handleClick}
        />
    );
}

function AppLayout({ status, startOver, handleClick }) {
    const { blocks } = store.getState();

    return (
        <>
            <div className="status">{status}</div>
            <div onClick={() => startOver()} className="start-over">
                Start Over
            </div>
            <div className="App">
                <div className="board">
                    {blocks.map((value, index) => (
                        <Block
                            key={index}
                            value={value}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
