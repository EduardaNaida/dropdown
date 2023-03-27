import React, { type ChangeEvent, type FC, useEffect, useState } from 'react'
import style from './Search.module.css'
import { type MultiSelectType } from '../multiselect/MultiSelect'

interface SearchType {
  state: MultiSelectType[]
  onChange: (event: any) => void
}

export const Search: FC<SearchType> = ({ state, onChange }) => {
  const [searchItem, setSearchItem] = useState<MultiSelectType[]>(state)

  const searchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value === '') {
      setSearchItem(state)
    } else {
      const resultArr = state.filter(item => item.label.toLowerCase().startsWith(e.currentTarget.value.toLowerCase()))
      setSearchItem(resultArr)
    }
  }

  useEffect(() => {
    onChange(searchItem)
  }, [searchItem])

  return (
    <div className={style.searchInputBlock}>
      <div className={style.searchInputBox}>
        <input
          placeholder='Search'
          className={style.searchInput}
          type="text"
          onChange={searchHandler}
        />
      </div>
    </div>
  )
}
