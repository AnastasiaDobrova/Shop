"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.list = void 0;
var react_1 = require("react");
var react_2 = require("react");
var react_native_1 = require("react-native");
var Context_1 = require("./../context/Context");
var react_3 = require("react");
var list = function (props) {
    var _a = (0, react_1.useState)(''), item = _a[0], setItem = _a[1];
    var _b = (0, react_1.useState)(['']), list = _b[0], setList = _b[1];
    var context = (0, react_2.useContext)(Context_1.Context);
    var _c = (0, react_1.useState)(false), btnState = _c[0], setBtnState = _c[1];
    var addList = function () {
        //creatig a copy of the todo list and then adding the new todo item
        setList(__spreadArray(__spreadArray([], list, true), [item], false));
        console.log(list);
    };
    (0, react_3.useEffect)(function () {
        if (btnState) {
            {
                props.navigation.navigate('AddItem');
            }
        }
    }, [btnState]);
    return (react_1["default"].createElement(react_native_1.View, null,
        react_1["default"].createElement(react_native_1.View, { style: styles.container },
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.TextInput, { placeholder: "Enter Item", style: styles.textInput, onChangeText: function (text) { return setItem(text); }, value: item }),
                react_1["default"].createElement(react_native_1.Button, { title: "Add shopping Item", onPress: function () {
                        return props.navigation.navigate('AddItem');
                    } })),
            react_1["default"].createElement(react_native_1.ScrollView, null, list.map(function (todo) {
                return react_1["default"].createElement(react_native_1.View, { key: todo, style: styles.todoItem },
                    react_1["default"].createElement(react_native_1.Text, null, todo));
            })))));
};
exports.list = list;
var styles = react_native_1.StyleSheet.create({
    container: {
        padding: 30
    },
    textInput: {
        padding: 10,
        borderColor: '#000000',
        marginBottom: 10,
        borderWidth: 1
    },
    todoItem: {
        marginTop: 10,
        padding: 20,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray'
    }
});
exports["default"] = exports.list;
