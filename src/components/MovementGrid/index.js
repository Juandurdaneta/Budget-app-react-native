import React from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { formatDate } from "../../utils/formatDate";


const MovementGrid = ({movements}) =>{


        return(
            <View>
            {
            
            movements.map((movement, index) =>(
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