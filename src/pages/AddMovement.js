import React, {useState} from "react";
import { Text, ScrollView, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddMovement = () =>{

    const [selected, setSelected] = useState('Gasto')
    const [amount, setAmount] = useState()
    const [notes, setNotes] = useState('')
    const [date, setDate] = useState(new Date())

    return(
        <ScrollView style={styles.container}>

            {/* Header, switch entre gasto y ingreso */}

            <View>
                <Text style={styles.headerText}>Nuevo {selected}</Text>
            </View>
            {
            selected == 'Gasto' ?
            <View style={styles.toggleType}>
                <View style={[styles.selectedType, styles.type]}>
                    <Text>Gasto</Text>
                </View>
                <View style={styles.type}>
                    <Text style={styles.blueText} onPress={()=> setSelected('Ingreso')}>Ingreso</Text>
                </View>
            </View>
            :
            <View style={styles.toggleType}>
                <View style={styles.type}>
                    <Text style={styles.blueText}  onPress={()=> setSelected('Gasto')}>Gasto</Text>
                </View>
                <View style={[styles.type,styles.selectedType]}>
                    <Text >Ingreso</Text>
                </View>
            </View>
            }

            {/* Fin header, switch entre gasto y ingreso  */}

            <View>
                <TextInput placeholder="¿Cuanto?" value={amount} onChangeText={setAmount} />
                <TextInput placeholder="Notas" value={notes} onChangeText={setNotes} numberOfLines={4} />

                <DateTimePicker testID="dateTimePicker" value={date} onChange={setDate} mode='date' is24Hour={true}/>

                <TouchableOpacity>
                    <Text>Agregar</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
    
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 30
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

  });
  

export default AddMovement;