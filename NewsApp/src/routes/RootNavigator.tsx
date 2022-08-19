import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { News, Details } from '../screens'
import { NavigationContainer, } from '@react-navigation/native';
import { SCREENS } from '../utils/Enums';
import { BackgroundImgHOC } from '../components';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={SCREENS.News} >
                <Stack.Screen name={SCREENS.News} component={BackgroundImgHOC(News)} />
                <Stack.Screen name={SCREENS.Details} component={BackgroundImgHOC(Details)} />
            </Stack.Navigator >
        </NavigationContainer >
    );
}
export default RootNavigator;

