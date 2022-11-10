// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Home from './pages/Home'
import Movements from "./pages/Movements";
import AddMovement from "./pages/AddMovement";
import FlashMessage from "react-native-flash-message";
const Tab = createBottomTabNavigator();


export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) =>{
                        let iconName;
                        if(route.name === 'Home'){
                            iconName = focused ?<Ionicons name="md-home" size={size} color={color} />: <Ionicons name="home-outline" size={size} color={color} />
                            return iconName
                        } else if(route.name ==='AddMovement'){
                            iconName = <FontAwesome5 name="plus-circle" size={size} color={color} />
                            return iconName
                        } else if(route.name === 'Movements'){
                            iconName = focused ? <Ionicons name="wallet" size={size} color={color}/> : <Ionicons name="wallet-outline" size={size} color={color} />
                            return iconName
                        }

                        
                    }, tabBarShowLabel: false,
                   
                    
                })}
            >
                <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
                <Tab.Screen name="AddMovement" component={AddMovement} options={{headerShown: false}} />
                <Tab.Screen name="Movements" component={Movements} options={{headerShown: false}} />

            </Tab.Navigator>
            <FlashMessage position="bottom" />
        </NavigationContainer>
    )
}