var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Button from '../Button/button';
import { UploadList } from './uploadList';
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        fileInput.current && fileInput.current.click();
    };
    var handleFileChange = function (e) {
        //   e.persist()
        var files = e.target.files;
        console.log(files);
        if (!files)
            return;
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now(),
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // setFileList([_file,...fileList])
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        var formData = new FormData();
        formData.append(file.name, file);
        axios.post(action, formData, {
            headers: {
                "Content-type": "multipart/form-data"
            },
            onUploadProgress: function (e) {
                console.log(e);
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (res) {
            updateFileList(_file, { status: 'success', response: res.data });
            if (onSuccess) {
                onSuccess(res.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(function (error) {
            updateFileList(_file, { status: 'error', error: error });
            if (onError) {
                onError(error, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    console.log(fileList);
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement(Button, { btnType: "primary", onClick: handleClick }, "Upload File"),
        React.createElement("input", { className: "viking-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file" }),
        React.createElement(UploadList, { fileList: fileList, onRemove: function () { } })));
};
