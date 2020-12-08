import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const App: React.FC = ()=>{
  
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    e.persist()
    console.log(e)
    const files = e.target.files
    if(files){
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name,uploadedFile)
      axios.post('https://jsonplaceholder.typicode.com/posts',formData,{
        headers:{
          "Content-Type":'multipart/form-data'
        }
      }).then((res) =>{
        console.log(res)
      })
    }
  }
  return (
    <div className="App">
        <input type="file" name="myfile" onChange={handlerChange}/>
    </div>
  );
}

export default App;
