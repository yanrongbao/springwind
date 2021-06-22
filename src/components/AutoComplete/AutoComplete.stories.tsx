import React, { useState } from 'react';
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import AutoComplete, { DataSourceType, HandleClick } from './AutoComplete'
interface LakerPlayerProps {
    value: string;
    number?: number;
}
interface GithubUserProps {
    login?: string;
    url?: string;
    avatar_url?: string;
}
const SingleAutoComplete = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard']
    const lakersWithNumber = [
        { value: 'bradley', number: 1 },
        { value: 'pope', number: 2 },
        { value: 'caruso', number: 3 },
        { value: 'cook', number: 4 },
        { value: 'cousins', number: 5 },
        { value: 'james', number: 6 },
        { value: 'AD', number: 7 },
        { value: 'green', number: 8 },
        { value: 'howard', number: 9 },
    ]
    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
    // }
    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(laker => laker.value.includes(query))
    // }
    // const renderOptions = (item: DataSourceType<LakerPlayerProps>) => {
    //     return (
    //         <>
    //             <h2>Name: {item.value}</h2>
    //             <p>Number: {item.number}</p>
    //         </>
    //     )
    // }
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(resp => resp.json())
            .then(({ items }) => {
                return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
            })
    }
    const renderOptions = (item: DataSourceType<GithubUserProps>) => {
        return (
            <>
                <h2>Name: {item.login}</h2>
                <p>Url: {item.url}</p>
            </>
        )
    }
    return (
        <>
            <AutoComplete
                fetchSuggestions={handleFetch}
                style={{ width: 300 }}
                placeholder={'input'}
                onSelect={action('selected')}
                renderOptions={renderOptions}
            />
        </>
    )
}

storiesOf('AutoComplete Component', module)
    .add('AutoComplete', SingleAutoComplete)