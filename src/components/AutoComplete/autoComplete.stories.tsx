import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {AutoComplete,DataSourceType} from './autoComplete';
// interface LakerPlayerProps { 
//     value:string;
//     number:number;
// }
interface apiGithubUserProps { 
    login:string;
    url:string;
    avatar_url:string;
}

const SimpleComplete = () =>{
    const lakers = ['bradley','pope','caruso','cook','cousins','james','AD','green','howard','kuzma','McGee','rando']
    const lakersWithNumber = [
        {value:'bradley',number:11},
        {value:'pope',number:1},
        {value:'caruso',number:10},
        {value:'cook',number:12},
        {value:'cousins',number:14},
        {value:'james',number:23},
        {value:'AD',number:3},
        {value:'green',number:11},
        {value:'howard',number:9},
        {value:'kuzma',number:13},
        {value:'McGeeley',number:2},
        {value:'rando',number:44},
    ]
    // 异步请求
    const handleFetch = (query:string)=>{
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res=>res.json())
            .then(({items})=>{
                console.log(items)
                return items.slice(0,10).map((item:any)=>({value:item.login,...item}))
            })
    }
    // const handleFetch = (val:string) =>{
    //     return lakers.filter(item => item.includes(val)).map(item=>({value:item}))
    // }
    // const handleFetch =(val:string) =>{
    //     return lakersWithNumber.filter(item => item.value.includes(val))
    // }
    const renderOption = (item:DataSourceType)=>{
        const itemWithGitHub = item as DataSourceType<apiGithubUserProps>
        return (
            <> 
                <h3>Name:{itemWithGitHub.login}</h3>
                <p>Url:{itemWithGitHub.url}</p>    
            </>
        )
    }
    return(
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            renderOption={renderOption}
        />
    )
}
storiesOf('AutoComplete Component', module)
  .add('AutoComplete',SimpleComplete)