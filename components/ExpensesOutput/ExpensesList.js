import {FlatList, Text} from "react-native";

function renderExpenseItem(data) {
    return <Text>{data.item.description}</Text>
}

function ExpensesList({expenses}) {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />
    )
}

export default ExpensesList