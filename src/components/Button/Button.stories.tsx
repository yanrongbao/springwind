import React from 'react';
import { Story, Meta, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import Button from './button';
const defaultButton = () => (
  <Button onClick={action('click')}> default button</Button>
)

const defaultWidthSize = () => (
  <>
    <Button size={'lg'}>large button</Button>
    <Button size={'sm'}>small button</Button>
  </>
)
const defaultWidthType = () => (
  <>
    <Button btnType={'primary'}>primary button</Button>
    <Button btnType={'danger'}>danger button</Button>
    <Button btnType={'link'}>link button</Button>
    <Button btnType={'default'}>default button</Button>
  </>
)
storiesOf('Button Component', module)
  .add('Button', defaultButton)
  .add('不同尺寸的button', defaultWidthSize)
  .add('不同type的button', defaultWidthType)

// export default {
//   title: 'Example/Button',
//   component: Button,
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } as Meta;

// const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
//   btnType: 'primary',
//   children: 'primary Button',
//   onClick: action('clicked')
// };

// export const Default = Template.bind({});
// Default.args = {
//   btnType: 'default',
//   children: 'default Button',
// };

// export const Danger = Template.bind({});
// Danger.args = {
//   btnType: 'danger',
//   children: 'danger Button',
// };

// export const Link = Template.bind({});
// Link.args = {
//   btnType: 'link',
//   children: 'link Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'lg',
//   children: 'Large Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'sm',
//   children: 'Small Button',
// };

