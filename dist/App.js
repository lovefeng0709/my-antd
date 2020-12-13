import React from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
var App = function () {
    var handlerChange = function (e) {
        e.persist();
        console.log(e);
        var files = e.target.files;
        if (files) {
            var uploadedFile = files[0];
            var formData = new FormData();
            formData.append(uploadedFile.name, uploadedFile);
            axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            }).then(function (res) {
                console.log(res);
            });
        }
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("input", { type: "file", name: "myfile", onChange: handlerChange })));
};
export default App;
