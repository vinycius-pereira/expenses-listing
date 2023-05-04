import {View} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2023-05-03')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 30.99,
        date: new Date('2023-06-18')
    },
    {
        id: 'e3',
        description: 'A pair of glasses',
        amount: 199.99,
        date: new Date('2023-01-04')
    },
    {
        id: 'e4',
        description: 'Some Magic the gathering cards',
        amount: 85.39,
        date: new Date('2023-03-16')
    },
    {
        id: 'e5',
        description: 'A Playmat',
        amount: 19.99,
        date: new Date('2023-10-06')
    },
]

function ExpensesOutput({expenses, expensesPeriod}) {
    return (
        <View>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    )
}

export default ExpensesOutput