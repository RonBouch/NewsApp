import React, { useEffect } from 'react';
import RootNavigator from './RootNavigator';
import { StyleSheet } from 'react-native'
import { getNewsFromApi } from '../utils/Tools';
const MainRoot = () => {

    useEffect(() => {
        (async () => await getNewsFromApi())();
    }, []);

    return (
        <React.Fragment>
            <RootNavigator />
        </React.Fragment>
    )
}
export default MainRoot;

const styles = StyleSheet.create({
})



