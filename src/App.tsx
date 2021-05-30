import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Alert, { AlertType } from './components/Alert/alert';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon'

function App() {
  return (
    <div className='App'>
      <Icon icon={faCoffee} theme={'danger'} size={'10x'} />
      <header className='App-header'>
        <div
          style={{
            padding: '20px 40px',
            width: '500px',
          }}
        >
          <Alert
            title='提示标题欧亲'
            type={AlertType.Default}
            closeable
            onClose={() => {
              alert(1);
            }}
            description='this is a long description'
          />
          <Alert closeable title='this is a alert' type={AlertType.Danger} />
          <Alert title='this is a alert' type={AlertType.Warning} />
          <Alert title='this is a alert' type={AlertType.Success} />
        </div>
        <Menu
          defaultIndex={'0'}
          onSelect={(index) => {
            alert(index);
          }}
          mode={'horizontal'}
          defaultOpenSubMenus={['2']}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title='dropMenu'>
            <MenuItem>dropDpwn1</MenuItem>
            <MenuItem>dropDpwn2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
        <Button> hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button btnType={'primary'} size={'lg'}>
          Large Primary
        </Button>
        <Button btnType={'danger'} size={'sm'}>
          Small Danger
        </Button>
        <Button btnType={'link'} href='http://www.baidu.com/'>
          baidu Link
        </Button>
        <Button btnType={'link'} disabled href='http://www.baidu.com/'>
          Disabled Link
        </Button>
      </header>
    </div>
  );
}

export default App;
