import React, { FC } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'light' | 'dark' | 'danger'

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}

const Icon: FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props;
    const classes = classNames('springwind-icon', className, {
        [`icon-${theme}`]: theme
    })

    return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon;