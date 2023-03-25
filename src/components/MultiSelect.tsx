import React, {ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes, useState} from 'react';
import style from './MultiSelect.module.css'
import flag from '../image/germanFlag.svg'

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

  const [selectedItem, setSelectedItem] = useState<MultiSelectType[]>([options[0]])

  const removeItem = (id: number) => {
    const option = value.filter(option => option.id != id)
    onChangeOption([...option])
  }

  const selectItem = (option: MultiSelectType) => {
    if (value.includes(option)) {
      onChangeOption([...value.filter(item => item.id !== option.id)])
    } else {
      onChangeOption([...value, option])
    }
  }

  const mappedOption: any[] = value ? value.map((value, index) => (
      <div className={style.labelButton} onClick={e => e.stopPropagation()}>
        <div key={index} className={style.selectedOption}>{value.label}</div>
        <div className={style.removeItem} onClick={e => {
          removeItem(value.id)
        }}></div>
      </div>))
    : []

  // const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.currentTarget.value)
  //   // setSelectedItem([...selectedItem])
  //   onChangeOption && onChangeOption(Number(e.currentTarget.value))
  // }

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

        <div className={style.searchInputBlock}>
          <input className={style.searchInput} type="text" placeholder='&#61442; Search'/>
        </div>

        <ul className={`${style.options}`} id="multiSelect">
          {options ? options.map((state, index) => (
            <li
              key={index}
              value={state.value}
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
                         value={state.id}/>
                  <span className={style.checkmark}></span>
                </label>
              </div>
            </li>)) : ''}
        </ul>
      </div>
    </div>
  );
};