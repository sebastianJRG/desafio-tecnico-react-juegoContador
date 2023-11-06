import gameStore from "../store/gameStore";
import { useState, useEffect } from "react";

const Game = () => {
    const [countdown, setCountdown] = useState(5);
    const [startGame, setStartGame] = useState(false);

    const points = gameStore((state) => state.points);
    const maxPoints = gameStore((state) => state.maxPoints);
    const addPoint = gameStore((state)=> state.addPoint)
    const resetPoints = gameStore((state)=> state.resetPoints)

    const handlerStartGame = (_e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setStartGame(true);
    };

    const handlerStopGame = () => {
      setStartGame(false);
      setCountdown(5);
      resetPoints();
    };

    const handlerClick = (_e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        addPoint()
    }

    useEffect(()=>{
        let interval : number
        if (startGame && countdown > 0) {
            interval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }

        if (countdown === 0) handlerStopGame()
        console.log(countdown)
        return () => clearInterval(interval);
    }, [startGame, countdown])

    return (
      <div>
        <div>Puntaje: {points}</div>
        <div>Puntaje Maximo: {maxPoints}</div>
        <div>Tiempo restante: {countdown} seg</div>

        <button disabled={startGame} onClick={handlerStartGame} >Inicio</button>
        <button disabled={!startGame} onClick={handlerClick}>Clickeame</button>
      </div>
    );
};

export default Game;
