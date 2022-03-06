import {DefaultTheme} from "react-native-paper";

export const style = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3d2128',
        accent: 'blue',
        background: '#c4abb2'
    },
    container: {
        margin: 10,
        flex: 1
       },
       title: {
        margin: 6,
        
      },
      btn: {
        margin: 45,
      },
      helper: {
        marginTop: 6,
      },
      statusBar: {
        background: '#c4abb2'
      }
};