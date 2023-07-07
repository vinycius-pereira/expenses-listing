import {View, Text, StyleSheet} from 'react-native'
import {GlobalStyles} from "../../constants/styles";
import React from "react";

function ErrorOverlay({message, onConfirm}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>An error occurred</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: "center",
        marginBottom: 24
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: "bold"
    }
})