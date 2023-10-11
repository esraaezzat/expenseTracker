import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/Styles";


const ExpenseForm = ({ onCancel, onSubmit, submitButtonLable, defaultValue }) => {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValue ? defaultValue.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValue ? getFormattedDate(defaultValue.date) : '',
            isValid: true
        },
        description: {
            value: defaultValue ? defaultValue.description : '',
            isValid: true
        }
    });

    /* when calling inputChanedHandler as an event handler , we only
       pass the first param inputIdentifier and 
       the second param enteredValue will be passed automaticaly */
    const inputChanedHandler = (inputIdentifier, enteredValue) => {
        setInputs((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        });
    }
    const checkValidation = (expenseData) => {
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        const isValid = amountIsValid && dateIsValid && descriptionIsValid;
        if (!isValid) {
            setInputs((currentInputs) => {
                return {
                    amount: { value: currentInputs.amount.value, isValid: amountIsValid },
                    date: { value: currentInputs.date.value, isValid: dateIsValid },
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid },
                }
            })
        }
        return isValid;
    }


    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        if (!checkValidation(expenseData)) {
            return;
        }
        onSubmit(expenseData);
    }

    const formIsInValid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChanedHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }} />
                <Input
                    label="Date"
                    invalid={!inputs.date.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChanedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }} />
            </View>

            <Input
                label="Description"
                invalid = {!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    // autoCorrect: false, // default is true
                    // autoCapitalize: 'none'
                    onChangeText: inputChanedHandler.bind(this, 'description'),
                    value: inputs.description.value
                }} />
            {formIsInValid && <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>}
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
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