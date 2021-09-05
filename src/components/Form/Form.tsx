import './style.scss'

import * as React from "react"
import { FormOptions } from "./FormOptionsContext";
import FormStore from './FormStore'
import FormStoreContext from "./FormStoreContext";
import FormOptionsContext from "./FormOptionsContext";

import FormField from './FormField';

export interface Props extends FormOptions {
    store: FormStore;
    className?: string;
    children?: React.ReactNode;
    onFinish?: (e: React.FormEvent) => void;
}
export const Form = (props: Props) => {
    const { className = '', children, store, onFinish, ...options } = props;
    const cls = 'rh-form' + className;
    return (
        <FormStoreContext.Provider
            value={store}
        >
            <FormOptionsContext.Provider value={options}>
                <form
                    className={cls}
                    onSubmit={onFinish}
                    action=""
                >
                    {children}
                </form>
            </FormOptionsContext.Provider>
        </FormStoreContext.Provider>
    )
}

Form.FormField = FormField;