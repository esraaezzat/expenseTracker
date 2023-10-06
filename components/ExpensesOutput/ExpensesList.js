import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renserExpenseItem = (itemData) => {
    return <ExpenseItem {...itemData.item} />
}

const ExpensesList = ({ expenses }) => {

    return <FlatList
        data={expenses}
        renderItem={renserExpenseItem}
        keyExtractor={(item) => item.id}
    />
}

export default ExpensesList;