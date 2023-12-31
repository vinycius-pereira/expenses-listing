import { View, StyleSheet} from 'react-native'
import {useContext, useLayoutEffect, useState} from "react";
import {GlobalStyles} from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({route, navigation}) {
    const [isLoading, setIsLoading] = useState(false)
    const [errorHandler, setErrorHandler] = useState()
    const expenseCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditing])

    const deleteExpenseHandler = async () => {
        setIsLoading(true)
        try {
            await deleteExpense(editedExpenseId)
            expenseCtx.deleteExpense(editedExpenseId)
            navigation.goBack()
        } catch (e) {
            setErrorHandler("Could not delete expense - please try again later")
            setIsLoading(false)
        }
    }

    const cancelHandler = () => {
        navigation.goBack()
    }
    const confirmHandler = async (expenseData) => {
        setIsLoading(true)
        try {
            if(isEditing) {
                expenseCtx.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData)
                expenseCtx.addExpense({...expenseData, id: id})
            }
            navigation.goBack()
        } catch (e) {
            setErrorHandler("Could not save data - please try again later")
            setIsLoading(false)
        }
    }

    if(errorHandler && !isLoading) {
        return <ErrorOverlay message={errorHandler}/>
    }

    if (isLoading) {
        return <LoadingOverlay/>
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