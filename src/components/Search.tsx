import React, { type ChangeEvent, type FC, useEffect, useState } from 'react'
import style from './MultiSelect.module.css'
import { type MultiSelectType } from './MultiSelect'

interface SearchType {
  state: MultiSelectType[]
  onChange: (event: any) => void
}

export const Search: FC<SearchType> = ({ state, onChange }) => {
  const [searchItem, setSearchItem] = useState<MultiSelectType[]>(state)

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
      {/* <i className="fa fa-search icon-search" aria-hidden="true"></i> */}
      <input
        className={style.searchInput}
        type="text"
        placeholder='Search'
        onChange={searchHandler}
      />
    </div>
  )
}
