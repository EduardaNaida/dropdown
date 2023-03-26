import React, {useState} from 'react';
import style from './MultiSelect.module.css'
import flag from '../image/germanFlag.svg'
import {Search} from "./Search";

export type MultiSelectType = {
  id: number,
  label: string
}

type SuperSelectPropsType = {
  value: MultiSelectType[]
  options: any[]
  onChangeOption: (option: MultiSelectType[]) => void
}

export const MultiSelect: React.FC<SuperSelectPropsType> = ({options, onChangeOption, value}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [updateState, setUpdateState] = useState<MultiSelectType[]>(options)

  console.log(updateState)

  const onChangeOptions = (option: MultiSelectType[]) => {
    console.log(option)
    if (!option.length) {
      setUpdateState([])
    } else {
      setUpdateState(option)
    }
  }


  const removeItem = (id: number) => {
    const option = value.filter(option => option.id !== id)
    onChangeOption([...option])
  }

  const selectItem = (option: MultiSelectType) => {
    if (value.includes(option)) {
      onChangeOption([...value.filter(item => item.id !== option.id)])
    } else {
      onChangeOption([...value, option])
    }
  }

  const isOptionSelected = (option: MultiSelectType) => {
    return value.includes(option)
  }

  const mappedOption: any[] = value ? value.map((value, index) => (
      <div key={index} className={style.labelButton} onClick={e => {
        e.stopPropagation()
      }}>
        <div className={style.selectedOption}>{value.label}</div>
        <div className={style.removeItem} onClick={e => {
          removeItem(value.id)
        }}></div>
      </div>))
    : []


  return (
    <div className={style.container}>
      <div className={style.selectedBlock}
           onClick={e => setIsOpen(prevState => !prevState)}
      >
        <div className={style.selectedItemBlock}>
          {mappedOption}
        </div>
        <button
          className={`${style.btn} ${isOpen ? style.btnUp : style.btnDown}`}
          onClick={() => setIsOpen(prevState => !prevState)}>
        </button>
      </div>

      <div className={`${style.selectList} ${isOpen ? style.showOptions : ''}`}>

        <Search state={options} onChange={(event) => onChangeOptions(event)}/>

        <ul className={`${style.options}`} id="multiSelect">
          {updateState ? updateState.map((state, index) => (
            <li
              key={index}
              value={state.id}
              className={style.option}
            >
              <img className={style.flags} src={flag} alt="img"/>
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
            </li>)) : ''}
        </ul>
      </div>
    </div>
  );
};