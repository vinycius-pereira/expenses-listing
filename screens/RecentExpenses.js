import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";
import {useContext, useEffect, useState} from "react";
import {getDateMinusDays} from "../util/date";
import {fetchExpenses} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
function RecentExpenses() {
    const [isLoading, setIsLoading] = useState(true)
    const expensesCtx = useContext(ExpensesContext)

    useEffect(() => {
        async function getExpenses() {
            setIsLoading(true)
            const expenses = await fetchExpenses();
            setIsLoading(false)
            expensesCtx.setExpenses(expenses)
        }


        getExpenses()
    }, [])

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7)

        return expense.date > date7DaysAgo && expense.date <= today
    })

    if (isLoading) {
        return <LoadingOverlay/>
    }

    return <ExpensesOutput fallbackText="No expenses registered for the last 7 days" expenses={recentExpenses} expensesPeriod="Last 7 Days"/>
}

export default RecentExpenses