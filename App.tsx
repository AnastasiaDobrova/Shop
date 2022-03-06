import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemsProvider from "./scr/context/Context";
import { StackViews } from "./scr/helpers/types";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ItemsList } from './scr/views/List';
import { AddItem } from './scr/views/AddItem';
import { setI18nConfig, translate } from "./scr/translations/translation";
import { StatusBar } from 'expo-status-bar';
import { tokens } from "./scr/translations/Structure";
import { style } from "./style";

export const Stack = createNativeStackNavigator<StackViews>();

export default function App() {
    setI18nConfig();
    return (
        <PaperProvider theme={style}>
            <SafeAreaProvider>
                <ItemsProvider>
                    <NavigationContainer>
                        <StatusBar />
                        <Stack.Navigator  >
                            <Stack.Screen
                                name={"List"}
                                component={ItemsList}
                                options={{ title: translate(tokens.screens.list.myList) }}
                            />
                            <Stack.Screen
                                name={"EditItem"}
                                component={AddItem}
                                options={{ title: translate(tokens.screens.editItem.createProduct) }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ItemsProvider>
            </SafeAreaProvider>
        </PaperProvider>
    );
}

