import { useRef, useState } from "react"
import ResultModal from "./ResultModal"

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef()
    const dialog = useRef()

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining((prev=>prev-10))
        }, 10)
    }
    function reset() {
        setTimeRemaining(targetTime*1000)
    }
    if (timeRemaining <= 0) {
        clearInterval(timer.current)
        dialog.current.open()
    }

    function handleStop() {
        clearInterval(timer.current)
        dialog.current.open()
    }

    return (
        <>
            <ResultModal reset={reset} remainingTime={timeRemaining} ref={dialog} targetTime={targetTime}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    Target time is {targetTime} second{targetTime > 1 ? 's' : ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? "Stop" : "Start"} Challenge</button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    Challenge {timerIsActive ? "Timer is running..." : "Inactive"}
                </p>
            </section >
        </>
    )
}
