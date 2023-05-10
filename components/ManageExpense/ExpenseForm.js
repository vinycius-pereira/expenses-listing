import {View, Text, StyleSheet} from "react-native";
import Input from "./Input";

function ExpenseForm() {
    const amountChangedHandler = () => {
    }
    const dateChangedHandler = () => {
    }
    const descriptionChangedHandler = () => {
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: amountChangedHandler
                    }}
                    style={styles.rowInput}
                />
                <Input
                    label="Date"
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: dateChangedHandler
                    }}
                    style={styles.rowInput}
                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    autoCorrect: false,
                    autoCapitalize: "none",
                    onChangeText: descriptionChangedHandler
                }}
            />
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginBottom: 24
    },
    title: {
        fontSize: 24,
        marginVertical: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
    }
})