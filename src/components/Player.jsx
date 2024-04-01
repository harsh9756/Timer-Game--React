import { useRef,useState } from "react";

export default function Player() {
  const [Name, setName] = useState(null)
  const input = useRef()
  function onSubmit() {
    setName(input.current.value)
  }
  return (
    <section id="player">
      <h2>Welcome {Name??'unknown entity'}</h2>
      <p>
        <input ref={input} type="text" />
        <button onClick={onSubmit}>Set Name</button>
      </p>
    </section>
  );
}
