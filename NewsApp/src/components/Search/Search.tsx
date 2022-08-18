import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import {
    Platform, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions,
    Animated, Easing
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const styledTheme = {
    background: 'white',
    textColor: '#000000',
    placeholderTextColor: '#8E8E93',
    textInputBackground: "rgba(142,142,147,0.12)",
    searchFill: '#8E8E93',
}

const textInputWidth = new Animated.Value(0);
const cancelTextOpacity = new Animated.Value(0);

const SearchIcon = () => {
    return (
        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <Path fillRule="evenodd" clipRule="evenodd" d="M13.7431 12.5741L9.91009 8.73956C10.5972 7.80246 10.9652 6.66953 10.9601 5.50756C10.947 2.47441 8.49372 0.0175744 5.46059 5.57178e-05C4.00907 -0.00651157 2.61522 0.567712 1.58953 1.59481C0.563845 2.6219 -0.00846493 4.01655 9.46502e-05 5.46806C0.0132044 8.50148 2.4667 10.9585 5.50009 10.9761C6.6668 10.9811 7.80387 10.6088 8.74159 9.91456L8.74559 9.91156L12.5751 13.7431C12.7821 13.9603 13.0907 14.0482 13.3811 13.9728C13.6716 13.8973 13.8983 13.6704 13.9735 13.3799C14.0487 13.0894 13.9605 12.7809 13.7431 12.5741ZM5.49609 9.87806C3.06951 9.8641 1.10675 7.89866 1.09609 5.47206C1.08955 4.311 1.54743 3.19551 2.36783 2.37389C3.18822 1.55228 4.30303 1.09273 5.46409 1.09756C7.89068 1.11151 9.85344 3.07695 9.86409 5.50356C9.87064 6.66461 9.41276 7.78011 8.59236 8.60172C7.77197 9.42334 6.65716 9.88288 5.49609 9.87806Z" fill={styledTheme.searchFill} />
        </Svg>
    )
}


interface SearchProps {
    onChange: (e: string) => void;
    onSearchClear: () => void;
    value: string;
}

const Search = ({ onChange, onSearchClear, value }: SearchProps) => {
    const [searchInputFocussed, setSearchInputFocussed] = useState(false);
    const width = useWindowDimensions().width;
    const memoizedTextInputOnFocusWidth = useMemo(() => width - (50 + 32 + 32), [width]);
    const memoizedTextInputOnBlurWidth = useMemo(() => width - 32, [width]);
    const focusTextInput = useCallback(() => setSearchInputFocussed(true), []);
    const blurTextInput = useCallback(() => setSearchInputFocussed(false), []);
    const searchTextInput = useRef<TextInput | null>(null);

    const handleChange = useCallback((e: string) => {
        onChange(e);
    }, [onChange]);

    const handlePressCancel = () => {
        onSearchClear();
        searchTextInput?.current?.blur();
    }

    useEffect(() => {
        if (searchInputFocussed) {
            Animated.spring(textInputWidth, {
                toValue: memoizedTextInputOnFocusWidth,
                mass: 1,
                stiffness: 120,
                damping: 20,
                useNativeDriver: false,
            }).start();

            Animated.timing(cancelTextOpacity, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.spring(textInputWidth, {
                toValue: memoizedTextInputOnBlurWidth,
                mass: 1,
                stiffness: 120,
                damping: 20,
                useNativeDriver: false,
            }).start();
            Animated.timing(cancelTextOpacity, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        }
    }, [searchInputFocussed]);
    return (
        <Animated.View style={[styles.searchInputWrapper]}>
            <Animated.View style={styles.searchIconWrapper}>
                <SearchIcon />
            </Animated.View>
            <Animated.View style={{ width: textInputWidth, paddingVertical: 4 }}>
                <TextInput ref={searchTextInput}
                    autoCorrect={false}
                    value={value}
                    onChangeText={handleChange}
                    onFocus={focusTextInput}
                    onBlur={blurTextInput}
                    style={[
                        styles.searchInputStyle,
                        {
                            backgroundColor: styledTheme.textInputBackground,
                            color: styledTheme.textColor,
                        }
                    ]}
                    placeholder={'Search Product'}
                    placeholderTextColor={styledTheme.placeholderTextColor}
                />

            </Animated.View>
            <TouchableOpacity style={styles.btnCancel} onPress={handlePressCancel}>
                <Animated.Text style={[styles.btnTxt, { opacity: cancelTextOpacity }]}>
                    Cancel
                </Animated.Text>
            </TouchableOpacity>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    searchInputWrapper: {
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        zIndex: 10,
    },
    btnCancel: { display: 'flex', justifyContent: 'center' },
    btnTxt: { paddingLeft: 16, fontSize: 17, color: '#007AFF' },
    searchInputStyle: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: 0.5,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        paddingLeft: 32
    },
    searchIconWrapper: {
        position: 'absolute',
        left: 25,
        top: Platform.OS === 'android' ? 21 : 18
    },
    closeIconWrapper: {
        position: 'absolute',
        right: 8,
        top: Platform.OS === 'android' ? 21 : 18
    }
})


Search.propTypes = {
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSearchClear: PropTypes.func,
    theme: PropTypes.oneOf(['LIGHT'])
}


Search.defaultProps = {
    placeholder: 'Search',
    placeholderTextColor: null,
    onChange: () => { },
    value: '',
    onSearchClear: () => { },
    theme: 'LIGHT'
}

export default memo(Search);