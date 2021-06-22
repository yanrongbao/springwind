import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Input, InputProps } from './input'

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}

describe('test Input component', () => {
    it('should render the correct default Input', () => {
        const wrapper = render(<Input {...defaultProps} />)
        const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(testNode).toBeInTheDocument()
        expect(testNode).toHaveClass('springwind-input-inner')
        fireEvent.change(testNode, { target: { value: '1243' } })
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(testNode.value).toEqual('1243')
    })
    it('should render the disabled Input on disabled property', () => {
        const wrapper = render(<Input disabled placeholder={'disabled'} />)
        const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
        expect(testNode.disabled).toBeTruthy()
    })
    it('should render different input size on size property', () => {
        const wrapper = render(<Input size={'lg'} placeholder={'lager'} />)
        const testContainer = wrapper.container.querySelector('springwind-input-wrapper')
        expect(testContainer).toHaveClass('input-lg')
    })
})