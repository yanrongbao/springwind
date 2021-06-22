import React, { useState } from 'react';
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Input from './input'
import Icon from '../Icon';
import { faAddressBook, faYenSign } from '@fortawesome/free-solid-svg-icons'
const ControlledInput = () => {
    const [value, setValue] = useState('')
    return <Input value={value} onChange={(e) => setValue(e.target.value)} />
}
const defaultInput = () => (
    <>
        <Input style={{ width: 300 }} placeholder={'input'} onClick={action('click')} />
        <ControlledInput />
    </>
)

const defaultSizeInput = () => (
    <>
        <Input style={{ width: 300 }} size={'sm'} placeholder={'sm input'} onClick={action('click')} />
        <Input style={{ width: 300 }} size={'lg'} placeholder={'lg input'} onClick={action('click')} />
    </>
)

const disabledInput = () => (
    <Input style={{ width: 300 }} placeholder={'input'} disabled onClick={action('click')} />
)

const groupInput = () => (
    <>
        <Input
            style={{ width: 300 }}
            placeholder={'prepand'}
            onClick={action('click')}
            prefix={
                <Icon icon={faAddressBook} />
            }
        />
        <Input
            style={{ width: 300 }}
            size={'lg'}
            placeholder={'append'}
            onClick={action('click')}
            suffix={'RMB'}
        />
        <Input
            style={{ width: 300 }}
            placeholder={'prepand and append'}
            onClick={action('click')}
            prefix={
                <Icon icon={faYenSign} />
            }
            suffix={'RMB'}
        />
        <Input
            style={{ width: 300 }}
            placeholder={'addon'}
            onClick={action('click')}
            addonBefore={'http://'}
        />
        <Input
            style={{ width: 300 }}
            placeholder={'addon lg'}
            size={'lg'}
            onClick={action('click')}
            addonBefore={'http://'}
        />
        <Input
            style={{ width: 300 }}
            placeholder={'addon before after'}
            onClick={action('click')}
            addonBefore={'http://'}
            addonAfter={'.com'}
        />
    </>
)
storiesOf('Input Component', module)
    .add('Input', defaultInput)
    .add('不同尺寸的 Input', defaultSizeInput)
    .add('禁用的 Input', disabledInput)
    .add('前后缀 Input', groupInput)