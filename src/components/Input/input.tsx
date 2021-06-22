import React, { FC, ReactElement, InputHTMLAttributes, useState, ChangeEvent } from 'react'
import classNames from 'classnames';
import { IconProps } from '../Icon'

type InputSize = 'lg' | 'sm'
type ExtraProp = string | ReactElement

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' | 'prefix' | 'onChange'> {
    /**是否禁用 Input */
    disabled?: boolean;
    /**设置 Input 大小 支持lg或者是sm */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProps;
    /**添加前缀，用于配置一些固定组合 */
    suffix?: ExtraProp;
    /**添加后缀，用于配置一些固定组合 */
    prefix?: ExtraProp;
    /**带标签的 input，设置前置标签 */
    addonBefore?: ExtraProp;
    /**带标签的 input，设置后置标签 */
    addonAfter?: ExtraProp;
    /**类名 */
    className?: string;
    /**值发生改变调用 */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框 通过鼠标或者键盘输入内容，是最基础的表单域的包装
 * ~~~js
 * // 这样引用
 * import { Input } from 'springwind'
 * ~~~
 * 支持 HTMLInput 的所有属性
 */
export const Input: FC<InputProps> = (props) => {
    const [focus, setFocus] = useState(false)
    //取出各种属性
    const {
        disabled,
        size,
        icon,
        suffix,
        prefix,
        className,
        style,
        addonBefore,
        addonAfter,
        onChange,
        ...restProps
    } = props
    const clases = classNames('springwind-input-wrapper', className, {
        [`input-${size}`]: size,
        'is-disabled': disabled,
        'springwind-input-group': addonBefore || addonAfter,
        'springwind-input-affix-wrapper': suffix || prefix,
        'input-group-prefix': !!prefix,
        'input-group-suffix': !!suffix,
        'springwind-select-focus': focus
    })
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }

    if ('value' in restProps) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(restProps.value)
    }
    return (
        <div style={style} className={clases}>
            <Addon addon={addonBefore} />
            <Prefix prefix={prefix} />
            <input
                disabled={disabled}
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                className={'springwind-input-inner'}
                onChange={onChange}
                type="text"
                {...restProps}
            />
            <Addon addon={addonAfter} />
            <Suffix suffix={suffix} />
        </div>
    )
}

const Prefix = ({ prefix }: { prefix?: ExtraProp }) => {
    if (!prefix) return null
    return <span className={'springwind-input-prefix'}>
        {
            prefix
        }
    </span>
}
const Suffix = ({ suffix }: { suffix?: ExtraProp }) => {
    if (!suffix) return null
    return <span className={'springwind-input-suffix'}>
        {
            suffix
        }
    </span>
}
const Addon = ({ addon }: { addon?: ExtraProp }) => {
    if (!addon) return null
    return <span className={'springwind-input-group-addon'}>
        {
            addon
        }
    </span>
}

export default Input;