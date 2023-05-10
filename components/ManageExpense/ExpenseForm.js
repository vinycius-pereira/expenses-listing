import {View, Text, StyleSheet} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/date";
import {GlobalStyles} from "../../constants/styles";
function ExpenseForm({onCancel, onSubmit, submitButtonHandler, currentValues}) {
    const [inputs, setInputs] = useState({
        amount: {
            value: currentValues ? currentValues.amount.toString() : "",
            isValid: true
        },
        date: {
            value: currentValues ? getFormattedDate(currentValues.date) : "",
            isValid: true
        },
        description: {
            value: currentValues ? currentValues.description : "",
            isValid: true
        }
    })

    const inputChangedHandler = (inputIdentifier, value) => {
        setInputs((prevState) => {
            return {
                ...prevState,
                [inputIdentifier]: {value: value, isValid: true}
            }
        })
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== "Invalid Date"
        const descriptionIsValid = expenseData.description.trim().length > 0

        if(!amountIsValid || !dateIsValid || !descriptionIsValid ){
            setInputs((currInput) => {
                return {
                    amount: {value: currInput.amount.value, isValid: amountIsValid},
                    date: {value: currInput.date.value, isValid: dateIsValid},
                    description: {value: currInput.description.value, isValid: descriptionIsValid},
                }
            })
            return;
        }

        onSubmit(expenseData)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(this, "amount"),
                        value: inputs.amount.value
                    }}
                    style={styles.rowInput}
                    invalid={!inputs.amount.isValid}
                />
                <Input
                    label="Date"
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, "date"),
                        value: inputs.date.value
                    }}
                    style={styles.rowInput}
                    invalid={!inputs.date.isValid}
                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    autoCorrect: false,
                    autoCapitalize: "none",
                    onChangeText: inputChangedHandler.bind(this, "description"),
                    value: inputs.description.value
                }}
                invalid={!inputs.description.isValid}
            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid Input values - please check your entered data!</Text>}
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
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8
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