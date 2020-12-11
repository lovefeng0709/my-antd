import React,{FC,useRef,useState,ChangeEvent} from 'react'
import axios from 'axios'
import Button from '../Button/button' 
import {UploadList} from './uploadList' 
export type UploadFileStatus = 'ready' | 'uploading'|'success'|'error'
export interface UploadFile {
    uid: number;
    size: number;
    name:string;
    status?:UploadFileStatus;
    percent?:number;
    raw?:File;
    response?:any;
    error?:any;
}
export interface UploadProps {
    action: string;
    defaultFileList?:UploadFile[];
    beforeUpload?:(file:File)=> boolean|Promise<File>;
    onProgress?:(percentage: number,file: File) => void;
    onSuccess?:(data:any,file: File) => void;
    onError?:(err:any,file: File) => void;
    onChange?:(file:File)=>void;
    onRemove?:(file:UploadFile)=>void;
}
export const Upload:FC<UploadProps> = (props) =>{
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove
    } = props;
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList,setFileList] = useState<UploadFile[]>(defaultFileList||[])
    const updateFileList = (updateFile:UploadFile,updateObj:Partial<UploadFile>) =>{
        setFileList(prevList=>{
            return prevList.map(file=>{
                if(file.uid===updateFile.uid){
                    return {...file,...updateObj}
                }else {
                    return file
                }
            })
        })
    }
    const handleClick = ()=>{
        fileInput.current && fileInput.current.click();
    }
    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) =>{
        //   e.persist()
          const files = e.target.files    
          console.log(files)
          if(!files) return
          uploadFiles(files)
          if(fileInput.current){
              fileInput.current.value = ''
          }
    }
    const uploadFiles =(files:FileList)=>{
        let postFiles = Array.from(files)
        postFiles.forEach(file=>{
            if(!beforeUpload){
                post(file)
            }else{
              const result =  beforeUpload(file) 
              if(result&&result instanceof Promise){
                  result.then(processedFile=>{
                      post(processedFile)
                  })
              } else if(result!==false){
                  post(file)
              }
            }
            
        })
    }
    const post = (file:File)=>{

        let _file:UploadFile = {
            uid: Date.now(),
            status: 'ready',
            name:file.name,
            size:file.size,
            percent: 0,
            raw:file
        }
        // setFileList([_file,...fileList])
        setFileList(prevList => {
            return [_file, ...prevList]
          })
        const formData = new FormData()
        formData.append(file.name,file)
        axios.post(action,formData,{
            headers:{
                "Content-type":"multipart/form-data"
            },   
            onUploadProgress:function(e){
                console.log(e)
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if(percentage<100){
                   updateFileList(_file,{percent:percentage,status:'uploading'})
                    if(onProgress){
                        onProgress(percentage,file) 
                    }
                }
            }
        }).then(res=>{
            updateFileList(_file,{status:'success',response:res.data})
            if(onSuccess){
                onSuccess(res.data,file)
            }
            if(onChange){
                onChange(file)
            }
        }).catch(error=>{
            updateFileList(_file,{status:'error',error:error})
            if(onError){
                onError(error,file)
            }
            if(onChange){
                onChange(file)
            }
        })
    }
    console.log(fileList)
    return (
        <div className="viking-upload-component">
            <Button 
              btnType="primary"
              onClick={handleClick}
            >
                Upload File
            </Button>
            <input 
             className="viking-file-input"
             style={{display:'none'}}
             ref={fileInput}
             onChange={handleFileChange}
             type="file"
            />
            <UploadList 
                fileList={fileList}
                onRemove={()=>{}}
            />
        </div>
    )
}