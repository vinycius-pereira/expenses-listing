import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpenses";

const Stack = createNativeStackNavigator()
const BottomTab = createMaterialBottomTabNavigator()

function ExpensesOverview(){
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="Recent Expenses" component={RecentExpenses}/>
            <BottomTab.Screen name="All Expenses" component={AllExpenses}/>
        </BottomTab.Navigator>
    )
}

export default function App() {
    return (
        <>
            <StatusBar style="auto"/>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Expenses Overview" component={ExpensesOverview}/>
                    <Stack.Screen name="Manage Expenses" component={ManageExpenses}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}