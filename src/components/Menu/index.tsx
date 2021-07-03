import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'
import { FC } from 'react'

export type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>,
    SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu