import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import Alert, { AlertProps, AlertType } from './alert';
const testProps: AlertProps = {
  title: 'this is a title',
  type: AlertType.Default,
  closeable: true,
  description: 'this is a description',
};
const generateAlert = (props: AlertProps) => {
  return <Alert {...props} />;
};
let wrapper: RenderResult, alertElement: HTMLElement;

describe('test Alert component', () => {
  beforeEach(() => {
    wrapper = render(generateAlert(testProps));
    alertElement = wrapper.getByTestId('test-alert');
  });
  it('should render correct Alert base on default props', () => {
    const alertTitleElement = wrapper.queryByText('this is a title');
    const alertCloseElement = alertElement.querySelectorAll(
      ':scope .springwind-alert-close'
    );
    const alertDescElement = alertElement.querySelectorAll(
      ':scope .springwind-alert-desc'
    );
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveClass(
      'springwind-alert springwind-alert-default'
    );
    expect(alertTitleElement).toBeInTheDocument();
    expect(alertTitleElement).toHaveClass('bold-title');
    expect(alertCloseElement.length).toEqual(1);
    expect(alertDescElement.length).toEqual(1);
    fireEvent.click(alertCloseElement[0]);
    expect(alertElement).not.toBeInTheDocument();
  });
});
