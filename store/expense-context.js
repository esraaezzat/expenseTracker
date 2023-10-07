import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e5',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e7',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e8',
        description: 'some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e9',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e10',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    }
]

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

const expensesReducer = (state, action) => {
    const payload = action.payload;

    switch (action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return[{id: id, ...payload}, ...state]
        case 'UPDATE':

            const updateableExpenseIndex = state.findIndex(expense => expense.id === payload.id);
            const updateableExpense = state[updateableExpenseIndex];

            updatedItem = {...updateableExpense, ...payload.data}
            const UpdatedExpenses = [...state];
            UpdatedExpenses[updateableExpenseIndex] = updatedItem;

            return UpdatedExpenses;

        case 'DELETE':
            return state.filter(expense => expense.id !== payload)
        default:
            return state;
    }
}

const ExpenseContextProvider = ({children}) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES); //DUMMY_EXPENSES is initial state(expenses)

    const addExpense = (expenseData) =>{
        dispatch({
            type: 'ADD',
            payload: expenseData
        })
    }
    const deleteExpense = (id) =>{
        dispatch({
            type: 'DELETE',
            payload: id
        })
    }
    const updateExpense = (id, expenseData) =>{
        dispatch({
            type: 'UPDATE',
            payload: {id: id, data: expenseData}
        })
    }
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense
    }
    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider;
