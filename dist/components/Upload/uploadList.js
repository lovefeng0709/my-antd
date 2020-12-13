import React from 'react';
import Icon from '../Icon/icon';
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "viking-upload-list" }, fileList.map(function (item) {
        return (React.createElement("li", { className: "viking-upload-list-item", key: item.uid },
            React.createElement("span", { className: "file-name file-name-" + item.status },
                React.createElement(Icon, { icon: "file-alt", theme: "secondary" }),
                item.name)));
    })));
};
