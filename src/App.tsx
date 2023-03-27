import React, { useState } from 'react'
import './App.css'
import { MultiSelect, type MultiSelectType } from './components/multiselect/MultiSelect'

const state = [
  { id: 0, label: 'Русский', icon: '/icons/flags/ru.svg' },
  { id: 1, label: 'Английский', icon: '/icons/flags/gb.svg' },
  { id: 2, label: 'Испанский', icon: '/icons/flags/es.svg' },
  { id: 3, label: 'Немецкий', icon: '/icons/flags/germanFlag.svg' },
  { id: 4, label: 'Итальянский', icon: '/icons/flags/it.svg' },
  { id: 5, label: 'Польский', icon: '/icons/flags/pl.svg' }
]

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
