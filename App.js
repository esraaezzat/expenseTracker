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

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpensesOverview = () => {

  return <BottomTab.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: GlobalStyles.colors.primary500,
    },
    headerTintColor: 'white',
    tabBarStyle: {
      backgroundColor: GlobalStyles.colors.primary500,
    },
    tabBarActiveTintColor: GlobalStyles.colors.accent500
  }}>
    <BottomTab.Screen
      name={Screens.RECENT_EXPENSES}
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon : ({color, size}) => (<Ionicons name='hourglass' size={size} color={color}/>)
      }}
    />
    <BottomTab.Screen
      name={Screens.ALL_EXPENSES}
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon : ({color, size}) => (<Ionicons name='calendar' size={size} color={color}/>)
      }}
    />
  </BottomTab.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={Screens.EXPENSES_OVERVIEW} component={ExpensesOverview} options={{
            headerShown: false,
          }} />
          <Stack.Screen name={Screens.MANAGE_EXPENSE} component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
}
