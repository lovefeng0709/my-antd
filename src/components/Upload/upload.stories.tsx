import React from 'react'
import {storiesOf} from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {Upload} from './upload'
import {UploadFile} from './upload'
// const checkFileSize = (file: File)=>{
//     if(Math.round(file.size/1024)>50){
//         alert('file too big')
//         return false;
//     }
//     return true;
// }
// const filePromise = (file: File)=>{
//     const newFile = new File([file],'new_name.md',{type:file.type})
//     return Promise.resolve(newFile)
// }
const defaultFileList: UploadFile[] = [
  { uid: 123, size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: 122, size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: 121, size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
const SimpleUpload = ()=>{
    return(
        <Upload
            action='https://jsonplaceholder.typicode.com/posts/'
            // onSuccess={action('success')}
            // onError={action('error')}
            // onProgress={action('progress')}
            defaultFileList={defaultFileList}
            onChange={action('change')}
            // beforeUpload={filePromise}
        />
    )
}
storiesOf('Upload component', module)
 .add('Upload',SimpleUpload)