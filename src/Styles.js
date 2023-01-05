import {
    StyleSheet, TouchableWithoutFeedback
} from "react-native";


const styles = StyleSheet.create({
    appContainer: {
        backgroundColor: '#232323',
        flex: 1, 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center"
    }, 
    primaryAccent: {
        color: 'white'
    },
    imageContainer: {
        flex: 2,
        flexDirection: "column", 
        justifyContent: "flex-start",
        marginTop: 15, 
        marginTop: "5%"
    },
    albumImageStyle: {
        width: 300, 
        height: 300,
        borderRadius: 15,
    },
    albumTextContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center"
    }, 
    albumTitle: {
        fontWeight: "bold",
        fontSize: 30
    },
    artistText: {
        marginTop: '2%',
    },
    buttonRow: {
        flex: 1,
        flexDirection: "row", 
        alignItems: "center",
    },
    progressBarCont: {
        flex: 0.4,
        flexDirection: "column", 
        justifyContent: "space-between"
    }, 
    timeRow: {
        flexDirection: "row", 
        justifyContent: "space-between"
    }, 
    greenAccent: {
      color: '#579f6e'  
    }
});

export {styles}