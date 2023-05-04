import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import {GlobalStyles} from "./constants/styles";

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

function ExpensesOverview() {

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: "white",
                tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
                tabBarActiveTintColor: GlobalStyles.colors.accent500
            }}
        >
            <BottomTab.Screen
                name="Recent Expenses"
                component={RecentExpenses}
                options={{
                    tabBarLabel: "Recent",
                    tabBarIcon: ({color}) => <Ionicons name="hourglass" color={color} size={28}/>
                }}
            />
            <BottomTab.Screen
                name="All Expenses"
                component={AllExpenses}
                options={{
                    tabBarLabel: "All Expenses",
                    tabBarIcon: ({color}) => <Ionicons name="calendar" color={color} size={28}/>
                }}
            />
        </BottomTab.Navigator>
    )
}

export default function App() {

    return (
        <>
            <StatusBar style="auto"/>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                        headerTintColor: 'white'
                    }}
                >
                    <Stack.Screen
                        name="Expenses Overview"
                        component={ExpensesOverview}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Manage Expenses"
                        component={ManageExpenses}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}