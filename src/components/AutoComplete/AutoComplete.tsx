import React, { ChangeEvent, FC, ReactElement, KeyboardEvent, useEffect, useState, useRef } from "react";
import Icon from "../Icon";
import Input, { InputProps } from "../Input/input";

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject

type SuggestionsType = DataSourceType[];

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOptions?: (item: DataSourceType) => ReactElement;
}
export type HandleClick = (item: DataSourceType) => void;
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        renderOptions,
        value,
        ...restProps
    } = props;
    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const debounceValue = useDebounce(inputValue, 500)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    useClickOutside(componentRef, () => {
        setSuggestions([])
    })
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const result = fetchSuggestions(debounceValue)
            setLoading(true)
            if (result instanceof Promise) {
                result.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setSuggestions(result)
            }
        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1)
    }, [debounceValue, fetchSuggestions])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const highlight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) index = suggestions.length - 1
        setHighlightIndex(index)
    }
    const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions.length) {
                    handleClick(suggestions[highlightIndex])
                }
                break;
            case 38:
                highlight(highlightIndex - 1)
                break;
            case 40:
                highlight(highlightIndex + 1)
                break;
            case 27:
                setSuggestions([])
                break;
            default:
                break;
        }
    }
    // console.log('suggestions', suggestions);
    const handleClick: HandleClick = (item) => {
        setInputValue(item.value)
        setSuggestions([])
        onSelect && onSelect(item)
        triggerSearch.current = false
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOptions ? renderOptions(item) : item.value
    }
    return <div ref={componentRef}>
        <Input
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeydown}
            {...restProps}
        />
        {loading && <ul>
            <Icon icon={faSpinner} spin></Icon>
        </ul>}
        {suggestions.length > 0 &&
            <SuggestionDropDown highlightIndex={highlightIndex} renderOptions={renderTemplate} onHandleClick={handleClick} suggestions={suggestions} />}

    </div>
}
export interface SuggestionDropDownProps {
    suggestions: SuggestionsType;
    onHandleClick: HandleClick;
    highlightIndex: number;
    renderOptions: (item: DataSourceType) => any;
}
const SuggestionDropDown = ({ suggestions, onHandleClick, renderOptions, highlightIndex }: SuggestionDropDownProps) => {
    return (
        <ul>
            {
                suggestions.map((suggestion, index) => {
                    const cnames = classNames('suggestion-item', {
                        'item-highlighted': index === highlightIndex
                    })
                    return (
                        <li className={cnames} onClick={() => { onHandleClick(suggestion) }} key={index}>
                            {
                                renderOptions(suggestion)
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default AutoComplete;