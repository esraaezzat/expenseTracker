import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screens from './constants/Screens';
import ManageExpenses from './screens/MangeExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpenseContextProvider from './store/expense-context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpensesOverview = () => {
  // screenOptions accept obj or function that return obj
  return <BottomTab.Navigator screenOptions={({ navigation }) => ({
    headerStyle: {
      backgroundColor: GlobalStyles.colors.primary500,
    },
    headerTintColor: 'white',
    tabBarStyle: {
      backgroundColor: GlobalStyles.colors.primary500,
    },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({ tintColor }) => <IconButton
      icon='add'
      color={tintColor}
      size={24}
      onPress={() => {
        navigation.navigate(Screens.MANAGE_EXPENSE);
      }}
    />
  })}>
    <BottomTab.Screen
      name={Screens.RECENT_EXPENSES}
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => (<Ionicons name='hourglass' size={size} color={color} />)
      }}
    />
    <BottomTab.Screen
      name={Screens.ALL_EXPENSES}
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => (<Ionicons name='calendar' size={size} color={color} />)
      }}
    />
  </BottomTab.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white"
          }}>
            <Stack.Screen name={Screens.EXPENSES_OVERVIEW} component={ExpensesOverview} options={{
              headerShown: false,
            }} />
            <Stack.Screen name={Screens.MANAGE_EXPENSE} component={ManageExpenses} options={{
              presentation: 'modal' // screen will open as a model with only ios
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>

    </>

  );
}
