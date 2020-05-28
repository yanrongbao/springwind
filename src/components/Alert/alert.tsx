import React, { useState } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';

export enum AlertType {
  Default = 'default',
  Danger = 'danger',
  Success = 'success',
  Warning = 'warning',
}
export interface AlertProps {
  type: AlertType;
  title: string;
  className?: string;
  description?: string;
  closeable?: boolean;
  onClose?: () => void;
}

const Alart: React.FC<AlertProps> = (props) => {
  const { type, title, closeable, className, description, onClose } = props;
  const [show, setShow] = useState(true);
  const handleClick = () => {
    setShow(false);
  };
  return (
    <Transition in={show} timeout={500} unmountOnExit={true}>
      {(state: string) => {
        const classes = classNames('springwind-alert', className, {
          [`springwind-alert-${type}`]: type,
          [`springwind-alert-${state}`]: state,
        });
        return (
          <div className={classes} data-testid='test-alert'>
            <span
              className={classNames('springwind-alert-title', {
                'bold-title': description,
              })}
            >
              {title}
            </span>
            {description ? (
              <p className='springwind-alert-desc'>{description}</p>
            ) : null}
            {closeable ? (
              <span
                className='springwind-alert-close'
                onClick={() => {
                  handleClick();
                  if (onClose) {
                    onClose();
                  }
                }}
              >
                x
              </span>
            ) : null}
          </div>
        );
      }}
    </Transition>
  );
};
Alart.defaultProps = {
  title: 'this is alert!',
  type: AlertType.Default,
};
export default Alart;
