import React,{useState} from 'react';
import Button from './components/Button/button'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'
library.add(fas)
const App: React.FC=()=>{
  const [show,setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={'0'} onSelect={(index)=>{alert(index)}}  defaultOpenSubmenus={['3']} >
          <MenuItem >hello world0</MenuItem>
          <MenuItem  disabled>hello world1</MenuItem>
          <MenuItem >hello world2</MenuItem>
          <SubMenu title="drapdown" >
            <MenuItem >hello world3</MenuItem>
            <MenuItem >hello world4</MenuItem>
            <MenuItem >hello world5</MenuItem>
          </SubMenu>
        </Menu>
        <Button btnType={'primary'} size={'lg'} onClick={()=>setShow(!show)}>按钮</Button>
        <Button btnType={'link'}  href="https://github.com" size={'lg'}></Button>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
        >
            <div>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
            </div>  
            
        </Transition>
       <Transition
         in={show}
         timeout={300}
         animation='zoom-in-left'
         wrapper
       >
         <Button btnType={'primary'}>btn</Button>
       </Transition>
      </header>
    </div>
  );
}

export default App;
