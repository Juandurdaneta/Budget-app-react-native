import React from "react";
import MovementGrid from "../MovementGrid";
import { movements } from "../../utils/MovementsInfo"
import { Text, View, StyleSheet } from "react-native";


const MovementManager = ({isExpense}) =>{

    const income = movements.filter(movement => movement.amount > 0)
    const expenses = movements.filter(movement => movement.amount < 0)

    return(
        <View>
    {
        isExpense ? 
        <MovementGrid movements={expenses} /> 
        : 
        <MovementGrid movements={income} />
    }
        </View>
    )

}

export default MovementManager;