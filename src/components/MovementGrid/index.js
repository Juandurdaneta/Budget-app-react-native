import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { formatDate } from "../../utils/formatDate";
import Modal from "react-native-modal";
import { FontAwesome } from '@expo/vector-icons';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";



const MovementGrid = ({movements, dataCallback}) =>{

    const [transaction, setTransaction] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false)
  
    // callbacks
    const openModal = (tx) =>{
        setIsModalVisible(!isModalVisible);
        setTransaction(tx);
    }

    // remove transaction
    const removeTransaction = async (tx) => {

        try {
            setIsModalVisible(false);


            const jsonValue = await AsyncStorage.getItem('MOVEMENTS')
            const transactions = JSON.parse(jsonValue);
            
            const newTransactions = transactions.filter((value)=>{
                return value['id'] != tx['id'];
            });


            await AsyncStorage.setItem('MOVEMENTS', JSON.stringify(newTransactions))

            dataCallback();



        } catch(e){
            showMessage({
                message: `Algo ha salido mal...\n${e}`,
                type: 'danger'
            })
        }
    }

        return(
            <>
            <View>
            {
                
                movements.map((movement, index) =>(
                <TouchableOpacity key={index} onPress={()=> openModal(movement)}>
                    <View style={styles.container} >
                        <View>
                            <Text style={styles.noteText}>{movement.note}</Text>
                            <Text style={styles.dateText}>{formatDate(movement.date)}</Text>
                        </View>
                        <View>
                            {
                                !movement.isExpense ? <Text style={[styles.amountText, styles.incomeText]}>${movement.amount.toFixed(2)}</Text> : <Text style={[styles.amountText, styles.expenseText]}>-${movement.amount.toFixed(2)}</Text>
                            }
                        </View>
                    </View>
                </TouchableOpacity>

            ))
        }

   

        </View>

        <View>
            <Modal  style={styles.modalWrapper} onBackdropPress={()=> setIsModalVisible(!isModalVisible)} isVisible={isModalVisible} onSwipeComplete={()=> setIsModalVisible(!isModalVisible)} swipeDirection='down'>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalItem} onPress={()=>removeTransaction(transaction)}>
                        <FontAwesome name="trash" size={20} color="black" />
                        <Text style={styles.modalItemText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>

        </>
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
    },
    contentContainer: {
        paddingLeft: 20,
        paddingTop: 5,
        flex: 1,
        alignItems: 'start',
      },
    modalWrapper: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        marginBottom: 0,
        marginStart: 0,
        marginTop: '160%',
    },
    modalContainer: {
        padding: '3%'
    },
    modalItem:{
        display: 'flex',
        flexDirection: 'row',
    },
    modalItemText : {
        marginStart: 10,
        fontSize: 16
    }

})

export default MovementGrid;