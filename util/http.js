import axios from 'axios';

const BACKEND_URL = 'https://expenses-project-f84aa-default-rtdb.firebaseio.com/'

export async function storeExpense(expenseData) {
    // after /<node>.json
    const response = await axios.post(
        `${BACKEND_URL}/expenses.json`,
        expenseData
    );

    const id = response.data.name

    return id
}

export async function fetchExpenses() {
    const response = await axios.get(`${BACKEND_URL}/expenses.json`);

    const expenses = []

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }

        expenses.push(expenseObj)
    }

    return expenses
}

export async function updateExpense(id, expenseData) {
   return await axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export async function deleteExpense(id) {
    return await axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}

