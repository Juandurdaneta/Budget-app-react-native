// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AiOutlineHome, AiFillHome, AiOutlineWallet, AiFillWallet } from 'react-icons/ai'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import Home from './pages/Home'
import Movements from "./pages/Movements";
import AddMovement from "./pages/AddMovement";
const Tab = createBottomTabNavigator();


export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) =>{
                        let iconName;
                        if(route.name === 'Home'){
                            iconName = focused ? <AiFillHome size={size} color={color} /> : <AiOutlineHome size={size} color={color} />
                            return iconName
                        } else if(route.name ==='AddMovement'){
                            iconName = <BsFillPlusCircleFill size={size} color={color} />
                            return iconName
                        } else if(route.name === 'Movements'){
                            iconName = focused ? <AiFillWallet size={size} color={color} /> : <AiOutlineWallet size={size} color={color} />
                            return iconName
                        }

                        
                    }, tabBarShowLabel: false
                })}
            >
                <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
                <Tab.Screen name="AddMovement" component={AddMovement} options={{headerShown: false}} />
                <Tab.Screen name="Movements" component={Movements} options={{headerShown: false}} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}