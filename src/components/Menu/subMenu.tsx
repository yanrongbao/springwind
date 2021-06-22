import React, { FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Transition from '../Transition'

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  className,
  children,
}) => {
  const context = useContext(MenuContext); //获取context
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>; //获取默认打开项
  //获取 存在index并且模式为竖向
  const isOpened =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };
  const clickEvents =
    context.mode === 'vertical'
      ? {
        onClick: handleClick,
      }
      : {};
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
        onMouseEnter: (e: React.MouseEvent) => {
          handleMouse(e, true);
        },
        onMouseLeave: (e: React.MouseEvent) => {
          handleMouse(e, false);
        },
      }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames('springwind-submenu', {
      'menu-open': menuOpen,
    });
    const childComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          'Warning: Menu has a child while is not a MenuItem component'
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation={'zoom-in-bottom'} >
        <ul className={subMenuClasses}>{childComponent}</ul>
      </Transition>
    )
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon icon={faAngleDown} className={'arrow-icon'} />
      </div>
      {renderChildren()}
    </li>
  );
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
