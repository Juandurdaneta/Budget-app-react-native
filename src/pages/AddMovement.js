import React, {useState} from "react";
import { Text, ScrollView, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const AddMovement = () =>{

    const [isExpense, setIsExpense] = useState(true)
    const [amount, setAmount] = useState()
    const [notes, setNotes] = useState('')
    const [date, setDate] = useState(new Date())

    const handleSubmit = async() =>{
        try {

            const movements = await AsyncStorage.getItem('MOVEMENTS')
            console.log(movements)


            const data = {
                'id': Date.now(),
                'amount': parseFloat(amount),
                'isExpense': isExpense,
                'note': notes,
                'date': date
            }

            console.log(data)

            if(isNaN(data.amount)){
                throw 'La cantidad ingresada no es un número válido.'
            }

            if(!movements){
                const myMovements = [data]
                await AsyncStorage.setItem('MOVEMENTS', JSON.stringify(myMovements))
            } else {
                const myMovements = JSON.parse(movements)
                myMovements.push(data)
                await AsyncStorage.setItem('MOVEMENTS', JSON.stringify(myMovements))
            }

            setAmount('')
            setNotes('')
            setDate(new Date())

            showMessage({
                message: 'Entrada agregada exitosamente!',
                type: 'success'
            })

        } catch(error){
        
            showMessage({
                message: `Algo ha salido mal...\n${error}`,
                type: 'danger'
            })
        }
    }

    return(

        <SafeAreaView style={styles.container} >
            <ScrollView keyboardShouldPersistTaps='handled'>
            {/* Header, switch entre gasto y ingreso */}

           
            {
            isExpense ?
            <View>
                <View>
                    <Text style={styles.headerText}>Nuevo Gasto</Text>
                </View>
                <View style={styles.toggleType}>
                    <View style={[styles.selectedType, styles.type]}>
                        <Text>Gasto</Text>
                    </View>
                    <View style={styles.type}>
                        <Text style={styles.blueText} onPress={()=> setIsExpense(false)}>Ingreso</Text>
                    </View>
                </View>
            </View>
            :
            <View>
                <View>
                    <Text style={styles.headerText}>Nuevo Ingreso</Text>
                </View>
                <View style={styles.toggleType}>
                    <View style={styles.type}>
                        <Text style={styles.blueText}  onPress={()=> setIsExpense(true)}>Gasto</Text>
                    </View>
                    <View style={[styles.type,styles.selectedType]}>
                        <Text >Ingreso</Text>
                    </View>
                </View>
            </View>
            }

            {/* Fin header, switch entre gasto y ingreso  */}

            <View style={styles.formContainer}>

                <TextInput  keyboardType='numeric' style={styles.formInput} placeholder="¿Cuanto?" value={amount} onChangeText={setAmount} />
                <TextInput style={styles.formInput} multiline={true} placeholder="Notas" value={notes} onChangeText={setNotes} numberOfLines={4} />
                
                <View style={styles.formDateArea}>
                    <FontAwesome name="calendar" size={24} color="black" />
                    <DateTimePicker style={styles.formDateInput} testID="dateTimePicker" value={date} onChange={setDate} mode='date' is24Hour={true}/>
                </View>
                
                <TouchableOpacity style={styles.formSubmitButton} onPress={handleSubmit}>
                    <Text style={styles.formSubmitButtonText}>Agregar</Text>
                </TouchableOpacity>

            </View>
            </ScrollView>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1
    },
    headerText: {
        fontSize: 25,
        marginTop: 25,
        fontWeight: '600',
        textAlign: 'center'
    },
    toggleType : {
        padding: 5,
        borderRadius: 15,
        backgroundColor: '#457B9D',
        flexDirection: 'row',
        margin: 15,
        justifyContent: 'space-around'
    },
    selectedType : {
        backgroundColor: "#FFFF",
        color: 'black'
    },
    type : {
        padding: 10,
        paddingHorizontal: 60,
        borderRadius: 15
    },
    blueText: {
        color: '#A8DADC'
    },

    formContainer: {
        marginHorizontal: 20,
        marginVertical: 20,
        flexDirection: 'column',
        justifyContent:'flex-start'
    },
    formInput: {
        height: 50,
        marginBottom: 25,
        backgroundColor: '#F6F6F6',
        padding: 10,
        borderRadius: 10
    },
    formDateArea : {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    formDateText: {
        fontSize: 20
        },  
    formDateInput : {
        width: 300
    },
    formSubmitButton : {
        borderRadius: 8,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 40,
        borderWidth: 1
    },
    formSubmitButtonText : {
        textAlign: 'center',

    }

  });
  

export default AddMovement;