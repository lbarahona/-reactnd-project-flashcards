import { colors } from './colors';
import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    title: {
        backgroundColor: colors.BLUE,
        color: colors.WHITE,
        fontSize: 24,
        textAlign: 'center',
        padding: 12
    },
    container: {
        flex: 1
    },
    formLabel: {
        fontSize: 16,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12
    },
    formInput: {
        borderColor: colors.GRAY,
        borderWidth:  Platform.OS === 'ios' ? 1 : 0,
        paddingBottom: 12,
        paddingLeft: 6,
        paddingTop: 12,
        marginLeft: 12,
        marginRight: 12
    },
    button: {
        backgroundColor: colors.BLUE,
        borderRadius: 2,
        margin: 12,
        paddingBottom: 12,
        paddingTop: 12
    },
    buttonText: {
        color: colors.WHITE,
        fontSize: 20,
        textAlign: 'center'
    }
});