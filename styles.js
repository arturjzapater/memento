import { StyleSheet } from 'react-native'

const colours = {
    activeButton: 'hsl(270, 70%, 60%)',
    darkMain: 'hsl(270, 44%, 10%)',
    darkDetail: 'hsl(270, 35%, 20%)',
    lightEmphasis: 'hsl(24, 65%, 99%)',
    lightMain: 'hsl(320, 15%, 90%)',
    submit: 'hsl(30, 75%, 60%)',
    danger: 'hsl(338, 85%, 60%)',
}

export const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 310,
    },
    group: {
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    item: {
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colours.darkDetail,
        padding: 20,
        margin: 4,
    },
    itemDesc: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    itemLabel: {
        flexDirection: 'row',
        maxWidth: 240,
    },
    label: {
        color: colours.lightMain,
        fontSize: 16,
    },
    main: {
        backgroundColor: colours.darkMain,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'stretch',
        backgroundColor: colours.darkDetail,
        elevation: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
    },
    message: {
        color: colours.darkDetail,
        fontSize: 14,
    },
    msgBox: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colours.submit,
        borderRadius: 20,
        marginHorizontal: 15,
        paddingVertical: 2,
        paddingLeft: 20,
        paddingRight: 15,
    },
    roundButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 10,
        height: 60,
        width: 60,
        position: 'absolute',
        right: -20,
        bottom: 40,
    },
    roundBtnText: {
        fontSize: 50,
    },
    textInput: {
        alignSelf: 'stretch',
        backgroundColor: colours.darkDetail,
        borderRadius: 20,
        margin: 4,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    timeInput: {
        backgroundColor: colours.darkDetail,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    touch: {
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colours.darkDetail,
        borderRadius: 30,
        margin: 4,
        padding: 10,
    },
    touchAction: {
        backgroundColor: colours.submit,
    },
    touchDanger: {
        backgroundColor: colours.danger,
    },
    touchLeft: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    touchRight: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    touchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 4,
    },
})
