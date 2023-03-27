import React, { useState } from 'react'
import style from './MultiSelect.module.css'
import { Search } from '../search/Search'

export interface MultiSelectType {
  id: number
  label: string
  icon: string
}

interface SuperSelectPropsType {
  value: MultiSelectType[]
  options: MultiSelectType[]
  onChangeValue: (option: MultiSelectType[]) => void
}

export const MultiSelect: React.FC<SuperSelectPropsType> = ({ options, onChangeValue, value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [updateState, setUpdateState] = useState<MultiSelectType[]>(options)

  const onChangeOptions = (option: MultiSelectType[]): void => {
    if (option.length === 0) {
      setUpdateState([])
    } else {
      setUpdateState(option)
    }
  }

  const removeItem = (id: number): void => {
    const option = value.filter(option => option.id !== id)
    onChangeValue([...option])
  }

  const selectItem = (option: MultiSelectType): void => {
    if (value.includes(option)) {
      onChangeValue([...value.filter(item => item.id !== option.id)])
    } else {
      onChangeValue([...value, option])
    }
  }

  const isOptionSelected = (option: MultiSelectType): boolean => value.includes(option)

  const mappedOption: any[] = value.map((value, index) => (
    <div key={index} className={style.labelButton} onClick={e => {
      e.stopPropagation()
    }}>
      <div className={style.selectedOption}>{value.label}</div>
      <div className={style.removeItem} onClick={e => {
        removeItem(value.id)
      }}></div>
    </div>))

  return (
    <div className={style.container}>
      <div className={style.selectedBlock}
           onClick={e => {
             setIsOpen(prevState => !prevState)
           }}
      >
        <div className={style.selectedItemBlock}>
          {mappedOption}
        </div>
        <button
          className={`${style.btn} ${isOpen ? style.btnUp : style.btnDown}`}
          onClick={e => {
            e.stopPropagation()
            setIsOpen(prevState => !prevState)
          }}>
        </button>
      </div>

      <div className={`${style.selectList} ${isOpen ? style.showOptions : ''}`}>

        <Search state={options} onChange={(event) => {
          onChangeOptions(event)
        }}/>

        <ul className={`${style.options}`} id="multiSelect">
          {updateState.map((state, index) => (
            <li
              key={index}
              value={state.id}
              className={style.option}
            >
              <img className={style.flags} src={state.icon} alt="img"/>
              {state.label}
              <div className={style.checkBoxBlock}>
                <label className={style.label}>
                  <input className={style.checkBox}
                         type="checkbox"
                         onChange={event => {
                           selectItem(state)
                         }}
                         name="checkbox"
                         id='checkbox1'
                         value={state.id}
                         checked={isOptionSelected(state)}
                  />
                  <span className={style.checkmark}></span>
                </label>
              </div>
            </li>))}
        </ul>
      </div>
    </div>
  )
}
