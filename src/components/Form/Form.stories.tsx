import React, { FormEvent } from 'react';
import { Story, Meta, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import { Form } from './Form';
import FormStore from './FormStore';

const defaultForm = () => {
  const store = new FormStore({}, {
    // name: (val) => {
    //   return !!val || '用户名不能为空';
    // },
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const [err, values] = store.validate();
    if (err) {
      console.log('err', err);
      return;
    }
    // const data = store.get();
    console.log('values', values);

  }
  return (
    <Form
      store={store}
      onFinish={onSubmit}
    >
      <Form.FormField label={'姓名'} name={'name'}>
        <input type="text" />
      </Form.FormField>
      <button type={'submit'}>submit</button>
    </Form >
  )
}

storiesOf('Form Component', module)
  .add('Form', defaultForm)

