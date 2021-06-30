import React, { FC } from 'react'
import { ThemeProps } from '../Icon/index'

interface ProgressProps {
    precent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
export const Progress: FC<ProgressProps> = (props) => {
    const { precent, strokeHeight, showText, styles, theme } = props
    return (
        <div className={'springwind-process-bar'} style={styles}>
            <div className="springwind-process-bar-outer" style={{ height: strokeHeight }}>
                <div className={`springwind-process-bar-inner color-${theme}`} style={{ width: `${precent}%` }}>
                    {
                        showText && <span className={'inner-text'}>
                            {`${precent}%`}
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
}

export default Progress
