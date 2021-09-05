import * as React from 'react'

import FormStore from './FormStore'

export default function useFileChange<T>(
    store: FormStore<T> | undefined,
    name: string | undefined,
    onChange: (name: string) => void
) {
    React.useEffect(() => {
        if (!name || !store) return;
        return store.subscribe((n) => {
            if (name === '*' || n === name || n === '*') {
                onChange(name)
            }
        })
    }, [name, store])
}