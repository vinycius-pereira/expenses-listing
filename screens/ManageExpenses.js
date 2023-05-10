import { View, StyleSheet} from 'react-native'
import {useContext, useLayoutEffect} from "react";
import {GlobalStyles} from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenses({route, navigation}) {
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId
    const expenseCtx = useContext(ExpensesContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditing])

    const deleteExpenseHandler = () => {
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
    }

    const cancelHandler = () => {
        navigation.goBack()
    }
    const confirmHandler = () => {
        if(isEditing) {
            expenseCtx.updateExpense(editedExpenseId, {description: "TESTE", amount: 29.99, date: new Date()})
        } else {
            expenseCtx.addExpense({description: "test", amount: 19.99, date: new Date()})
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ExpenseForm/>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
            </View>
            <View style={styles.deleteContainer}>
                {isEditing && <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>}
            </View>
        </View>
    )
}

export default ManageExpenses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
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