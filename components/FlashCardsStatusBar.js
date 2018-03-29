import React from 'react';
import { StatusBar, View } from 'react-native';
import { Constants } from 'expo';
import { colors } from '../helpers/colors';

export default function FlashCardsStatusBar() {
    return(
        <View style={{ backgroundColor: colors.BLUE, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={colors.BLUE} barStyle="light-content" />
        </View>
    )
}