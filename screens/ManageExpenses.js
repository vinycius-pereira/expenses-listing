import { View, StyleSheet} from 'react-native'
import {useContext, useLayoutEffect} from "react";
import {GlobalStyles} from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenses({route, navigation}) {
    const expenseCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId )

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
    const confirmHandler = (expenseData) => {
        console.log(expenseData)
        if(isEditing) {
            expenseCtx.updateExpense(editedExpenseId, expenseData)
        } else {
            expenseCtx.addExpense(expenseData)
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonHandler={isEditing ? "Update" : "Add"}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                currentValues={selectedExpense}
            />
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
    }
})