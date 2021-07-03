import React, { useState, createContext, FC, useRef, ChangeEvent, Children } from 'react';
import classNames from 'classnames';
import axios from 'axios'
import Button from '../Button/button'
import { UploadList } from '../UploadList/uploadList'
import Dragger from './dragger';
type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    precent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
    onBeforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
}

export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        drag,
        children,
        onError,
        onProgress,
        onSuccess,
        onBeforeUpload,
        onChange,
        onRemove,
    } = props;
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const updateFileList = (updateList: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList((prevList) => {
            return prevList.map(file => {
                if (file.uid === updateList.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file;
                }
            })
        })
    }
    const handelClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (!files) return
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            if (!onBeforeUpload) {
                post(file)
            } else {
                const result = onBeforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }
    const post = (file: any) => {
        const _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            precent: 0,
            raw: file
        }
        setFileList(prevList => {
            return [file, ...prevList]
        })
        const formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.detail) || 0;
                if (percentage < 100) {
                    onProgress?.(percentage, file)
                    updateFileList(_file, { precent: percentage, status: 'uploading' })
                }

            }
        }).then(resp => {
            updateFileList(_file, { status: 'success', response: resp.data })
            onSuccess?.(resp.data, file)
            onChange?.(file)
        }).catch(err => {
            updateFileList(_file, { status: 'error', error: err })
            onError?.(err, file)
            onChange?.(file)
        })
    }
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        onRemove?.(file)
    }
    return (
        <div className={'springwind-upload-component'}>
            <div className={'springwind-upload-input'} style={{ display: 'block' }} onClick={handelClick}>
                {/* <Button
                    btnType={'primary'}
                >
                    Upload file
                 </Button> */}
                {
                    drag ?
                        <Dragger onFile={(files) => uploadFiles(files)}>
                            {children}
                        </Dragger>
                        :
                        children
                }
            </div>

            <input
                ref={fileInput}
                type="file"
                accept={accept}
                multiple={multiple}
                className={'springwind-file-input'}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <UploadList fileList={fileList} onRemove={handleRemove} />
        </div >
    )
}
Upload.defaultProps = {
    name: 'file',
}
export default Upload;
