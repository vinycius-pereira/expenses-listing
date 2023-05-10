import {View, Text, StyleSheet, Alert} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/date";
function ExpenseForm({onCancel, onSubmit, submitButtonHandler, currentValues}) {
    const [inputValues, setInputValues] = useState({
        amount: currentValues ? currentValues.amount.toString() : "",
        date: currentValues ? getFormattedDate(currentValues.date) : "",
        description: currentValues ? currentValues.description : ""
    })

    const inputChangedHandler = (inputIdentifier, value) => {
        setInputValues((prevState) => {
            return {
                ...prevState,
                [inputIdentifier]: value
            }
        })
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== "Invalid Date"
        const descriptionIsValid = expenseData.description.trim().length > 0

        if(!amountIsValid || !dateIsValid || !descriptionIsValid ){
            Alert.alert("Invalid input", "Please check our input values")
            return;
        }

        onSubmit(expenseData)
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(this, "amount"),
                        value: inputValues.amount
                    }}
                    style={styles.rowInput}
                />
                <Input
                    label="Date"
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, "date"),
                        value: inputValues.date
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
                    onChangeText: inputChangedHandler.bind(this, "description"),
                    value: inputValues.description
                }}
            />
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonHandler}</Button>
            </View>
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
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})