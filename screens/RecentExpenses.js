import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDayMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";


const RecentExpenses = () => {
   const expensesCtx = useContext(ExpenseContext);
   const [isFetching, setIsFetching] = useState(true);
   const [error, setError] = useState();

    useEffect(() => { 
        async function getExpenses(){

            setIsFetching(true);

            try{
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            }
            catch(error){
                setError('Could not fetch expenses!')
            }

            setIsFetching(false)
            
        } 
        getExpenses()
    }, [])

    if(error && !isFetching){
        return <ErrorOverlay message={error} />
    }

    if(isFetching){
        return <LoadingOverlay />
    }
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
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