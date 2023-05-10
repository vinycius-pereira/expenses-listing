import {createContext, useReducer} from 'react';

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
        date: new Date('2023-06-01')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: ({id}) => {},
    updateExpense: (id, {description, amount, date}) => {}
})

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString()
            return [{...action.payload, id: id}, ...state]
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatableExpense, ...action.payload.data}
            let updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state
    }
}

export function ExpensesContextProvider({children}) {

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

    const addExpense = (expenseData) => {
        dispatch({type: "ADD", payload: expenseData});
    }

    const deleteExpense = (id) => {
        dispatch({type: "DELETE", payload: id});
    }

    const updateExpense = (id, expenseData) => {
        dispatch({type: "UPDATE", payload: {id: id, data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
