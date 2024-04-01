import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"


const ResultModal = forwardRef(({ remainingTime, targetTime, reset }, ref) => {
    
    const userLost = remainingTime <= 0
    const secondsLeft = ((targetTime*1000)-remainingTime)/1000
    const score=Math.round( (1- remainingTime /(targetTime*1000)) *100)
    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })
    return createPortal(
        <dialog ref={dialog} className="result-modal">
            {userLost ? <h2>Timer Expired.</h2> : <h2>Your Score is {score}</h2>}
            <p>The target time was <strong>{targetTime}</strong></p>
            <p>Timer stopped at <strong>{secondsLeft} second{ targetTime>1?'s':'' }</strong></p>
            <form method="dialog">
                <button onClick={reset}>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
}
)
export default ResultModal;