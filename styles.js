import { StyleSheet } from 'react-native'

const colours = {
    activeButton: 'hsl(270, 70%, 60%)',
    darkMain: 'hsl(270, 44%, 7%)',
    darkDetail: 'hsl(270, 35%, 12%)',
    lightDetail: 'hsl(270, 34%, 69%)',
    lightEmphasis: 'hsl(24, 65%, 99%)',
    lightMain: 'hsl(320, 15%, 90%)',
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    main: {
        backgroundColor: colours.darkMain,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 30,
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        color: colours.lightMain,
        fontSize: 18,
    },
    labelBold: {
        color: colours.lightMain,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: colours.darkDetail,
        borderRadius: 20,
        color: colours.lightMain,
        fontSize: 18,
        margin: 10,
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        width: 350,
    },
    title: {
        color: colours.lightEmphasis,
        fontSize: 25,
        fontWeight: 'bold',
    },
    touchable: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colours.darkDetail,
        borderRadius: 30,
        margin: 10,
        padding: 15,
        width: 280,
    },
    touchableActive: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colours.activeButton,
        borderRadius: 30,
        margin: 10,
        padding: 15,
        width: 280,
    },
    touchMenu: {
        alignItems: 'center',
        backgroundColor: colours.darkDetail,
        borderRadius: 30,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        width: 130,
    },
    touchMenuActive: {
        alignItems: 'center',
        backgroundColor: colours.activeButton,
        borderRadius: 30,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        width: 130,
    },
})
