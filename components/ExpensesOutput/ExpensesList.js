import {FlatList} from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(data) {
    return <ExpenseItem {...data.item}/>
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