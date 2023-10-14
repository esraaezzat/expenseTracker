import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/Styles'
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = ({ route, navigation }) => {

    const expensesCtx = useContext(ExpenseContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const selectedExpense = expensesCtx.expenses.find(ex => ex.id === editedExpenseId);

    useLayoutEffect(() => {

        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });

    }, [navigation, isEditing])

    const deleteExpenseHandler = async () => {
        setIsLoading(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId)
            navigation.goBack();
        }
        catch(error){
            setError('Could not to delete - please try again later');
            setIsLoading(false); 
        }
    };
    const cancelHandler = () => {
        navigation.goBack();
    }
    const ConfirmHandler = async (expenseData) => {
        setIsLoading(true); 
        try{
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData) // wait for update then fire goBack
            }
            else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        }
        catch(error){
            setError('Could not save data - please try again later');
            setIsLoading(false);
        }
     
    }


    if(error && !isLoading){
       return <ErrorOverlay message={error} />
    }
    if (isLoading) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLable={isEditing ? 'Update' : 'Add'}
                onCancel={cancelHandler}
                onSubmit={ConfirmHandler}
                defaultValue={selectedExpense}
            />
            {isEditing && <View style={styles.deleteContainer}>
                <IconButton
                    icon='trash'
                    color={GlobalStyles.colors.error500}
                    size={36}
                    onPress={deleteExpenseHandler} />
            </View>
            }
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }

})