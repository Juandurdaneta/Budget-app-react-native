import React, {useState, useEffect} from "react";
import MovementGrid from "../MovementGrid";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";




const MovementManager = ({isExpense}) =>{

    const [movements, setMovements] = useState()
   
    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('MOVEMENTS')
        setMovements(JSON.parse(jsonValue))
        } catch(e) {
        console.log(e.message)
        }
    }

    useEffect(() => {
        getData()

    }, [])
    

    let expenses;
    let income;

    if(movements){
        expenses = movements.filter(movement => movement.isExpense);
        income = movements.filter(movement => !movement.isExpense)
    }

    // console.log(expenses, income)
  
    return(
        <View>
    {
        // isExpense ? 
        // // <MovementGrid movements={expenses} /> 
        // <Text>hello</Text>
        // : 
        // // <MovementGrid movements={income} />
        // <Text>hello</Text>


        isExpense ? expenses ? <MovementGrid movements={expenses}/> : <Text>No expenses found</Text> : income ? <MovementGrid movements={income}/> : <Text>No income found</Text>


    }
        </View>
    )

}

export default MovementManager;