import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDayMinusDays } from "../util/date";


const RecentExpenses = () => {
    const expensesCtx = useContext(ExpenseContext);
    const recentExpenses = expensesCtx.expenses.filter( (expense) =>{
        const today = new Date();
        const date7DaysAgo = getDayMinusDays(today, 7);

        return (expense.date >= date7DaysAgo) && (expense.date <= today);
    });

    return <ExpensesOutput 
        expenses={recentExpenses} 
        expensesPeriod='Last 7 Days' 
        fallbackText="No expenses registered for the last 7 days"
        />
}

export default RecentExpenses;