import React, {useRef, useMemo, useCallback, useState} from "react";
import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { formatDate } from "../../utils/formatDate";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FontAwesome } from '@expo/vector-icons';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";



const MovementGrid = ({movements, dataCallback}) =>{

    const [transaction, setTransaction] = useState({});

    // ref
    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '12%'], []);
    // callbacks
    const openModal = (tx) =>{
        bottomSheetModalRef.current.present();
        setTransaction(tx);
    }

    // remove transaction
    const removeTransaction = async (tx) => {
        bottomSheetModalRef.current.dismiss();

        try {
            const jsonValue = await AsyncStorage.getItem('MOVEMENTS')
            const transactions = JSON.parse(jsonValue);
            const txIndex = transactions.indexOf(tx);
            transactions.splice(txIndex, 1);

            await AsyncStorage.setItem('MOVEMENTS', JSON.stringify(transactions))

            dataCallback();

        } catch(e){
            showMessage({
                message: `Algo ha salido mal...\n${e}`,
                type: 'danger'
            })
        }
    }
    

    const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    }, []);

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
                                !movement.isExpense ? <Text style={[styles.amountText, styles.incomeText]}>${movement.amount}</Text> : <Text style={[styles.amountText, styles.expenseText]}>-${movement.amount}</Text>
                            }
                        </View>
                    </View>
                </TouchableOpacity>

            ))
        }

   

        </View>

            <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    >
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.modalContainerItem} onPress={() => removeTransaction(transaction) }>
                    <FontAwesome name="trash" size={20} color="black" />
                    <Text style={styles.modalContainerText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
            </BottomSheetModal>

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
    modalContainerItem : {
        flexDirection:'row',
        justifyContent: 'space-between',
        rowGap: 10
    },
    modalContainerText : {
        marginStart: 20,
        fontSize: 16
    }
})

export default MovementGrid;