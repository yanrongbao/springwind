import React, { FC } from 'react'
import { UploadFile } from '../Upload/upload'
import Icon from '../Icon/index'
import { faFileAlt, faSpinner, faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import Progress from '../Process/process'

interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void;
}
export const UploadList: FC<UploadListProps> = (props) => {
    const { fileList, onRemove } = props
    return (
        <ul className={'springwind-upload-list'}>
            {fileList.map(file => {
                return <li className={'springwind-upload-list-item'} key={file.uid}>
                    <span className={`file-name file-name-${file.status}`}>
                        <Icon icon={faFileAlt} theme={'secondary'} />
                        {file.name}
                    </span>
                    <span className={'file-status'}>
                        {file.status === 'uploading' && <Icon icon={faSpinner} spin theme={'primary'} />}
                        {file.status === 'success' && <Icon icon={faCheckCircle} theme={'success'} />}
                        {file.status === 'error' && <Icon icon={faTimesCircle} theme={'danger'} />}
                    </span>
                    <span className={'file-actions'}>
                        <Icon icon={faTimes} onClick={() => onRemove(file)} />
                    </span>
                    {
                        file.status === 'uploading' &&
                        <Progress precent={file.precent || 0} />
                    }
                </li>
            })}
        </ul >
    )
}
