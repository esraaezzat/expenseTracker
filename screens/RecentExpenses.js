import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDayMinusDays } from "../util/date";


const RecentExpenses = () => {
    const expensesCtx = useContext(ExpenseContext);
    console.log(expensesCtx)
    const recentExpenses = expensesCtx.expenses.filter( (expense) =>{
        const today = new Date();
        const date7DaysAgo = getDayMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    });

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 Days' />
}

export default RecentExpenses;