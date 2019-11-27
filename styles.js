import { StyleSheet } from 'react-native'

const colours = {
    activeButton: 'hsl(270, 70%, 60%)',
    darkMain: 'hsl(270, 44%, 7%)',
    darkDetail: 'hsl(270, 35%, 12%)',
    lightDetail: 'hsl(30, 75%, 60%)',
    lightEmphasis: 'hsl(24, 65%, 99%)',
    lightMain: 'hsl(320, 15%, 90%)',
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
        fontSize: 18,
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
    },
    message: {
        color: colours.darkDetail,
        fontSize: 15,
    },
    msgBox: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colours.lightDetail,
        borderRadius: 20,
        marginLeft: 15,
        marginRight: 15,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 15,
    },
    textInput: {
        alignSelf: 'stretch',
        backgroundColor: colours.darkDetail,
        borderRadius: 20,
        margin: 4,
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
    },
    timeInput: {
        backgroundColor: colours.darkDetail,
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
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
        backgroundColor: colours.activeButton,
    },
    touchDanger: {
        backgroundColor: colours.lightDetail,
    },
    touchMenu: {
        padding: 5,
        width: 140,
    },
    touchMenuActive: {
        backgroundColor: colours.activeButton,
        padding: 5,
        width: 140,
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
