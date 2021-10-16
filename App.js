import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { BookDetail } from "./screens/";
import { ShowChapter } from './screens/'
import { ShowContent } from './screens/'
import Tabs from "./navigation/tabs";
import { useFonts } from 'expo-font';
import {FilterBook} from './screens';
import { Home } from './screens';
import { Login } from './screens'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();

const App = () => {
    const [loaded] = useFonts({
            "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
            "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
            "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
        })

    if(!loaded){
        return null;
    }
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Login'}
            >
                {/* Tabs */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Tabs} />
                {/* Screens */}
                <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
                <Stack.Screen name="ShowChapter" component={ShowChapter} options={{ headerShown: false }} />
                <Stack.Screen name="ShowContent" component={ShowContent} options={{ headerShown: false }} />
                <Stack.Screen name="FilterBook" component={FilterBook} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;