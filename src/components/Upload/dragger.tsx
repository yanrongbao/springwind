import React, { useState, DragEvent, FC, } from 'react';
import classNames from 'classnames';

export interface DraggerProps {
    onFile?: (file: FileList) => void;
}
export const Dragger: FC<DraggerProps> = (props) => {
    const { onFile, children } = props;
    const [dragover, setDragover] = useState(false)
    const classes = classNames('springwind-uploader-dragger', {
        'is-dragover': dragover
    })
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragover(false);
        onFile?.(e.dataTransfer.files);
    }
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragover(over)
    }
    return (
        <div
            className={classes}
            style={{ width: 100, height: 100, background: '#000' }}
            onDragOver={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}
export default Dragger
