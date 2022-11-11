import React from "react";
import { Text, View, StyleSheet } from "react-native";


const formatDate = (date) => {
    const options = {
        month: "long",
        day: "numeric",
        year: "numeric"
    }
    const formatedDate = new Date(date).toLocaleDateString('es-MX', options)

    return formatedDate
}


const MovementGrid = ({movements}) =>{


        return(
            <View>
            {
            
            movements.reverse().map((movement, index) =>(
                <View style={styles.container} key={index}>
                <View>
                    <Text style={styles.noteText}>{movement.note}</Text>
                    <Text style={styles.dateText}>{formatDate(movement.date)}</Text>
                </View>
                <View>
                    {
                    !movement.isExpense ? <Text style={[styles.amountText, styles.incomeText]}>${movement.amount}</Text> : <Text style={[styles.amountText, styles.expenseText]}>-${movement.amount}</Text>
                    }
                </View>
            </View>
            ))
        }
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
    },
    expenseText: {
        color: 'red'
    },
    incomeText : {
        color: '#93c47d'
    }
})

export default MovementGrid;