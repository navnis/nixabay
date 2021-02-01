import React, { FC, useCallback, useRef, useState } from 'react';
import './searchHighlighter.scss'
import searchHighlighterData from './searchHighligterData'

interface IProps {
    placeholder: string
    onSearch?: Function
    onSearchEnter?: Function
    onClickSuggestion?: Function
}

export const getHighlightedText = (
    text: string,
    highlight: string
): JSX.Element => {

    // highlights the searched match text

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <>
            {parts.map((part, i) => (
                <span
                    key={`hightlight_${part + i}`}
                    className={part.toLowerCase() === highlight ? "highlight_text" : ""}
                >
                    {part}
                </span>
            ))}
        </>
    );
};


const SearchHighlighter: FC<IProps> = (props): JSX.Element => {

    const [searchValue, setSearchValue] = useState<string>("")
    const [searchValueByKey, setSearchValueByKey] = useState<string>("")
    const [isInputFocused, setInputFocused] = useState<Boolean>(false)

    const suggestionContainerRef = useRef<HTMLDivElement>(null);
    const [currentHoverIndex, setCurrentHoverIndex] = useState<number>(-1)

    const filterData = (inputData: string) => {
        if (inputData.length === 0) return []
        const filteredCompany = searchHighlighterData.filter(data => {
            const allValues = JSON.parse(JSON.stringify(Object.values(data)))
            allValues.shift()
            return allValues.join("; ").toLowerCase().includes(inputData)
        })
        return filteredCompany.slice(0, 3)
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (props.onSearch) props.onSearch(value)
        setSearchValueByKey("")
        setSearchValue(value.toLowerCase().trim())
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const filteredData = filterData(searchValue)

        const allfilteredIds = filteredData.map(data => data._id)

        const setData = (index: number) => {
            setCurrentHoverIndex(index)
            setSearchValueByKey(filteredData[index].name)
        }

        if (e.key === "ArrowUp" && currentHoverIndex !== 0) {
            const index = currentHoverIndex - 1
            setData(index)

        } else if (e.key === "ArrowDown" && allfilteredIds.length !== currentHoverIndex + 1) {
            const index = currentHoverIndex + 1
            setData(index)
        } else if (e.key === "Enter") {
            if (props.onSearchEnter) props.onSearchEnter(searchValueByKey || searchValue)
            setSearchValue(searchValueByKey || searchValue)
            setInputFocused(false)
        }
    }


    const onMouseEnterHandler = useCallback((index: number, id: string) => {
        if (currentHoverIndex !== index) {
            setCurrentHoverIndex(index)
        }
    }, [currentHoverIndex])


    const onFocus = () => {
        setInputFocused(true)
    }

    const onBlur = () => {
        setTimeout(() => setInputFocused(false), 50)
    }

    const onClickName = (value: string) => {
        if (props.onClickSuggestion) props.onClickSuggestion(value)
        setSearchValue(value)
    }


    const { placeholder } = props
    return (
        <div className="searchHighlighter">
            <div className="searchHighlighter_main"
                onKeyDown={onKeyPressHandler}>

                <input
                    placeholder={placeholder}
                    className="searchHighlighter_input"
                    onChange={onSearch}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value={searchValueByKey || searchValue}
                />
                <div className="searchHighlighter_suggestion_main">
                    <div className="searchHighlighter_suggestion_container" ref={suggestionContainerRef}>
                        {isInputFocused && filterData(searchValue).map((singleData, index) => (
                            <div className={`single_suggestion ${currentHoverIndex === index ? "single_suggestion_hover" : ""}`}
                                key={singleData._id}
                                id={singleData._id}
                                onClick={() => onClickName(singleData.name)}
                                onMouseEnter={() => onMouseEnterHandler(index, singleData._id)}
                            >
                                <p className="name"
                                >{getHighlightedText(singleData.name, searchValue)}</p>
                            </div>
                        )
                        )}
                    </div>
                </div>

            </div>
        </div>



    );
}

export default SearchHighlighter;