import { StyleSheet } from 'react-native'

export const colours = {
    darkMain: 'hsl(270, 44%, 10%)',
    darkDetail: 'hsl(270, 35%, 20%)',
    lightMain: 'hsl(320, 15%, 90%)',
    submit: 'hsl(30, 75%, 60%)',
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
    empty: {
        flex: 1,
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 21,
        textAlign: 'center',
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
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.darkDetail,
        borderRadius: 30,
        elevation: 10,
        height: 52,
        width: 52,
        position: 'absolute',
        left: 15,
        top: 15,
    },
    main: {
        backgroundColor: colours.darkMain,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: colours.darkDetail,
        elevation: 10,
        marginBottom: 8,
        paddingTop: 12,
    },
    menuText: {
        padding: 10,
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
        marginTop: 5,
        paddingVertical: 2,
        paddingLeft: 20,
        paddingRight: 15,
    },
    picker: {
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 4,
        paddingLeft: 30,
    },
    pickerOption: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colours.darkDetail,
        borderRadius: 15,
        height: 45,
        width: 200,
    },
    textInput: {
        alignSelf: 'stretch',
        backgroundColor: colours.darkDetail,
        borderRadius: 15,
        margin: 4,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    toolbar: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colours.darkDetail,
        elevation: 10,
        marginTop: 8,
    },
    toolItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        flex: 1,
    },
    toolLabel: {
        color: colours.lightMain,
        fontSize: 14,
    },
    touchOption: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
})
