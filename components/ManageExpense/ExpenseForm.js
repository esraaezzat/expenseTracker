import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";


const ExpenseForm = ({ onCancel, onSubmit, submitButtonLable }) => {

    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: ''
    });

    /* when calling inputChanedHandler as an event handler , we only
       pass the first param inputIdentifier and 
       the second param enteredValue will be passed automaticaly */
    const inputChanedHandler = (inputIdentifier, enteredValue) => {
        console.log(enteredValue)
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            }
        });
    }
    const submitHandler = () => {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        }
        onSubmit(expenseData);
    }
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input label="Amount"
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onchangeText: inputChanedHandler.bind(this, 'amount'),
                        value: inputValues.amount
                    }} />
                <Input label="Date"
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onchangeText: inputChanedHandler.bind(this, 'date'),
                        value: inputValues.date
                    }} />
            </View>

            <Input label="Description" textInputConfig={{
                multiline: true,
                // autoCorrect: false, // default is true
                // autoCapitalize: 'none'
                onchangeText: inputChanedHandler.bind(this, 'description'),
                value: inputValues.description
            }} />
            <View style={styles.buttons}>
                <Button mode='flat' onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLable}</Button>
            </View>
        </View>
    )
}
export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 80
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
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
})