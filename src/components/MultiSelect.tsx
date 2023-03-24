import React, {useState} from 'react';
import style from './MultiSelect.module.css'
import flag from '../image/germanFlag.svg'

export const MultiSelect = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const state = [
    {value: 'english', label: 'English'},
    {value: 'german', label: 'German'},
    {value: 'spanish', label: 'Spanish'},
    {value: 'polish', label: 'Polish'},
  ]

  return (
    <div className={style.container}>
      <div className={style.selectedBlock}>
          <span className={style.selectedItem}>
        {state.map((value, index) => (<button key={index} className={style.labelButton}>{value.label}</button>))}
      </span>
        <button
          className={`${style.btn} ${isOpen ? style.btnUp : style.btnDown}`}
          onClick={() => setIsOpen(prevState => !prevState)}></button>
      </div>

      <div className={`${style.selectList} ${isOpen ? style.showOptions : ''}`}>
        <input className={style.searchInput} type="text" placeholder='&#61442; Search'/>
        <ul className={`${style.options}`} id="multiSelect">
          {state.map(state => (<li value={state.value} className={style.option}>
            <img className={style.flags} src={flag} alt="img"/>
            {state.label}
            <input className={style.checkBox} type="checkbox" name="checkbox" value="value"/>
          </li>))}
        </ul>
      </div>
    </div>
  );
};