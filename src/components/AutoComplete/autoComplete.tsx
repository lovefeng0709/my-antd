import React,{FC , useState, ChangeEvent,ReactElement,useEffect,KeyboardEvent} from 'react';
import Input,{InputProps} from '../Input/input';
import Icon from '../Icon/icon';
import classnames from 'classnames';
import useDebounce from '../../hooks/useDebounce';
interface DataSourceObject { 
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?:(item: DataSourceType)=> void;
    renderOption?: (item: DataSourceType)=>ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props)=>{
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props;
     
    const [inputValue,setInputValue] = useState(value as string)
    const [suggestions,setSuggestions] = useState<DataSourceType[]>([])
    const [loading,setLoading] = useState(false)
    // 选中高亮
    const [highlightIndex,setHighlightIndex] = useState(-1)
    const debounceValue = useDebounce(inputValue,500)
    useEffect(()=>{
        if(debounceValue){
            const results = fetchSuggestions(debounceValue)
            if(results instanceof Promise){
                setLoading(true)
                results.then(data =>{
                    setLoading(false)
                    setSuggestions(data)
                })
            }else{
                setSuggestions(results)
            }
        }else{
            setSuggestions([])
        }
    },[debounceValue])
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value.trim()
        setInputValue(value)
       
    }
    const handleSelect =(item:DataSourceType)=>{
        setInputValue(item.value)
        setSuggestions([])
        if(onSelect){
            onSelect(item)
        }
    }
    const tabHighlight = (index:number)=>{
        if(index<0) index = 0
        if(index>=suggestions.length-1){
            index = suggestions.length-1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>)=>{
       
        switch(e.keyCode){
            case 38: // 向上
            tabHighlight(highlightIndex-1)
            break;
            case 40: // 向下
            tabHighlight(highlightIndex+1)
            break;
            case 27: //esc
              setSuggestions([])
            break;
            case 13: // enter
            if (suggestions[highlightIndex]) {
                handleSelect(suggestions[highlightIndex])
              }
            break;
            default:
            break;    
        }
    }
    const renderTemplate = (item:DataSourceType)=>{
        return renderOption? renderOption(item):item.value
    }
    const suggestionsList = ()=>{
        return (
            <ul>
                {
                    suggestions.map((item,index )=> {
                        const cname = classnames('suggestion-item',{
                            'item-highlighted':index===highlightIndex
                        })
                        return(
                            <li key={index} onClick={()=>handleSelect(item)} className={cname}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    return (
        <div className="viking-auto-complete">
            <Input 
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            { loading && <ul><Icon icon="spinner" spin /></ul>}
            {
              setSuggestions.length>0&&suggestionsList()
            }
        </div>
    )
}