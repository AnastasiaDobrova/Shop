"use strict";
exports.__esModule = true;
exports.ContextProvider = exports.Context = void 0;
var react_1 = require("react");
var react_2 = require("react");
exports.Context = react_1["default"].createContext(undefined);
var ContextProvider = function (props) {
    var _a = (0, react_2.useState)(false), isAddBtnPressed = _a[0], setIsAddBtnPressed = _a[1];
    var toggleScreens = function (btnState) {
        if (isAddBtnPressed) {
            setIsAddBtnPressed(false);
            btnState(false);
        }
        else {
            setIsAddBtnPressed(true);
            btnState(true);
        }
    };
    return (react_1["default"].createElement(exports.Context.Provider, { value: { isAddBtnPressed: isAddBtnPressed, toggleScreens: toggleScreens } }, props.children));
};
exports.ContextProvider = ContextProvider;
