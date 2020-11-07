import React from 'react';
import Button,{ButtonSize,ButtonType} from './components/Button/button'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
library.add(fas)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon={'arrow-down'} theme='danger' size="10x"/>
        <Menu defaultIndex={'0'} onSelect={(index)=>{alert(index)}} mode={'vertical'} defaultOpenSubmenus={['3']} >
          <MenuItem >hello world0</MenuItem>
          <MenuItem  disabled>hello world1</MenuItem>
          <MenuItem >hello world2</MenuItem>
          <SubMenu title="drapdown" >
            <MenuItem >hello world3</MenuItem>
            <MenuItem >hello world4</MenuItem>
            <MenuItem >hello world5</MenuItem>
          </SubMenu>
        </Menu>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled>按钮</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} >按钮</Button>
        <Button onClick={() => {alert('123')}} size={ButtonSize.Small} >按钮a</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small} >按钮</Button>
        <Button btnType={ButtonType.Link}  href="https://github.com" size={ButtonSize.Large}></Button>
        <Button btnType={ButtonType.Link}  href="https://github.com" size={ButtonSize.Large} disabled></Button>
        <h1>hello world</h1>
        <h2>hello world</h2>
        <h3>hello world</h3>
        <code>
          const a = 1;
        </code>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
