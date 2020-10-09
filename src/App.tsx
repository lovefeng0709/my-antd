import React from 'react';
import Button,{ButtonSize,ButtonType} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index)=>{alert(index)}} mode={'vertical'}>
          <MenuItem index={0}>hello world0</MenuItem>
          <MenuItem index={1} disabled>hello world1</MenuItem>
          <MenuItem index={2}>hello world2</MenuItem>
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
