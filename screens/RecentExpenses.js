import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";
import {useContext, useEffect, useState} from "react";
import {getDateMinusDays} from "../util/date";
import {fetchExpenses} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
function RecentExpenses() {
    const [isLoading, setIsLoading] = useState(true)
    const [errorHandler, setErrorHandler] = useState()
    const expensesCtx = useContext(ExpensesContext)

    useEffect(() => {
        async function getExpenses() {
            setIsLoading(true)
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses)
            } catch (e) {
                setErrorHandler("Could not fetch expenses")
            }
            setIsLoading(false)
        }

        getExpenses()
    }, [])

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7)

        return expense.date > date7DaysAgo && expense.date <= today
    })

    if(errorHandler && !isLoading) {
       return <ErrorOverlay message={errorHandler} />
    }

    if (isLoading) {
        return <LoadingOverlay/>
    }

    return <ExpensesOutput fallbackText="No expenses registered for the last 7 days" expenses={recentExpenses} expensesPeriod="Last 7 Days"/>
}

export default RecentExpenses