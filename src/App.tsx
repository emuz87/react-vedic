import './App.css';
import { useState } from "react";
import { SigmaContainer } from "@react-sigma/core";
import Vedic from "./Vedic";

export const App = () => {
  let [size, setSize] = useState(9);
  let [selected, setSelected] = useState(1);
  
  const inputHelp = (prev: number, s: string, max: number) => { 
    const n = Number(s.replace(/\D/g,''));
    return n <= max ? n : prev
  }
  const handleSize = (e: any) => setSize(inputHelp(size, e.target.value, 50));
  const handleSelected = (e: any) => setSelected(inputHelp(selected, e.target.value, 9));
  

  return (
    <div className="App">
      <SigmaContainer style={{ height: "500px", width: "500px" }}>
        <Vedic size={size} selected={selected}/>
      </SigmaContainer>
      Grid size:
      <input value={size} onChange={handleSize}/>
      Digit:
      <input value={selected}onChange={handleSelected}/>
    </div>
  );
};