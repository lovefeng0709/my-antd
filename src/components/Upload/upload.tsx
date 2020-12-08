import React,{FC,useRef} from 'react'
import axios from 'axios'
import Button from '../Button/button'  

export interface UploadProps {
    action: string;
    onProgress?:(percentage: number,file: File) => void;
    onSuccess?:(data:any,file: File) => void;
    onError?:(err:any,file: File) => void;
}
export const Upload:FC<UploadProps> = (props) =>{
    const {
        action,
        onProgress,
        onSuccess,
        onError
    } = props;
    const fileInput = useRef<HTMLInputElement>(null)
    const handleClick = ()=>{
        fileInput.current && fileInput.current.click();
    }
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
             type="file"
            />
        </div>
    )
}