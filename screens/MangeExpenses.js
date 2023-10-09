import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/Styles'
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpenses = ({ route, navigation }) => {

    const expensesCtx = useContext(ExpenseContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {

        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });

    }, [navigation, isEditing])

    const deleteExpenseHandler = () => {
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    };
    const cancelHandler = () => {
        navigation.goBack();
    }
    const ConfirmHandler = (expenseData) => {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData);
        }
        else {
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLable={isEditing ? 'Update' : 'Add'}
                onCancel={cancelHandler}
                onSubmit={ConfirmHandler}
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