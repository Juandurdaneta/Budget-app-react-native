import React from "react";
import { Text, View, StyleSheet } from "react-native";


const MovementGrid = ({movement}) =>{
    return(
    <View style={styles.container}>
        <View>
            <Text style={styles.noteText}>{movement.note}</Text>
            <Text style={styles.dateText}>{movement.date}</Text>
        </View>
        <View>
            <Text style={styles.amountText}>${movement.amount}</Text>
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    container : {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 15,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    noteText : {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5
    },
    dateText: {
        color: '#cecece',
        fontSize: 16
    },
    amountText: {
        fontSize: 20,
        marginTop: 10,
        color: '#93c47d'
    }
})

export default MovementGrid;