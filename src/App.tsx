import React, {useState} from 'react';
import './App.css';
import {MultiSelect, MultiSelectType} from "./components/MultiSelect";

const state = [
  {id: 0, label: 'English'},
  {id: 1, label: 'German'},
  {id: 2, label: 'Spanish'},
  {id: 3, label: 'Polish'},
  {id: 4, label: 'Polish'},
]

function App() {

  const [value, onChangeOption] = useState<MultiSelectType[]>([state[0]])

  return (
    <div className="App">
      <MultiSelect options={state} value={value} onChangeOption={e => onChangeOption(e)}/>
    </div>
  );
}

export default App;
