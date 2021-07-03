import React from 'react';
import { Story, Meta, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import Upload, { UploadFile } from './upload';

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1334, name: 'hello.md', status: 'uploading', precent: 30 },
  { uid: '122', size: 1324, name: 'xyz.md', status: 'success', precent: 30 },
  { uid: '121', size: 1344, name: 'ead.md', status: 'error', precent: 30 },
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    console.log(false);

    return false
  }
  return true
}
const filePromise = (file: File) => {
  const newFiles = new File([file], 'new_file', { type: file.type })
  return Promise.resolve(newFiles)
}
const SimpleUpload = () => {
  return (
    <Upload
      action={'https://jsonplaceholder.typicode.com/posts'}
      defaultFileList={defaultFileList}
      drag
    // onSuccess={action('success')}
    // onBeforeUpload={filePromise}
    />
  )
}

storiesOf('Upload Component', module)
  .add('Upload', SimpleUpload)
