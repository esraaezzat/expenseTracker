import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/Styles'
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expense-context";

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
    const ConfirmHandler = () => {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId ,{
                description: 'edit test!!!!!', 
                amount: 29.99, 
                date: new Date('2022-5-20')
            });
        }
        else {
            expensesCtx.addExpense({
                description: 'test',
                amount: 19.99,
                date: new Date('2022-5-19')
            });
        }
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button mode='flat' onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={ConfirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }

})