"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var List_1 = require("./scr/views/List");
function App() {
    return (React.createElement(react_native_paper_1.Provider, null,
        React.createElement(react_native_1.View, null,
            React.createElement(List_1["default"], null))));
}
exports["default"] = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
