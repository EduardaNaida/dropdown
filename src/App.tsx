import React, { useState } from 'react'
import './App.css'
import { MultiSelect, type MultiSelectType } from './components/multiselect/MultiSelect'
import { state } from './data/state'

const App = (): JSX.Element => {
  const [value, setValue] = useState<MultiSelectType[]>([])

  return (
    <div className="App">
      <MultiSelect options={state} value={value} onChangeValue={e => {
        setValue(e)
      }}/>
    </div>
  )
}

export default App
