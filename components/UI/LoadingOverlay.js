import {View, ActivityIndicator, StyleSheet} from 'react-native'
import {GlobalStyles} from "../../constants/styles";

function LoadingOverlay() {
    return <View>
        <ActivityIndicator style={styles.container} size='large' color='white'/>
    </View>
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})