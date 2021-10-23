import { useState } from "react";
import TestHook from "./hook_test";

export default function App() {
  const [state, setState] = useState("Some Text");
  const [name, setName] = useState("Moe");
  const changeName = () => {
    setName("Steve");
  };

  return (
    <div className='App'>
      <TestHook name={name} changeName={changeName} />
    </div>
  );
}
