import React from "react";
import { Text, ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";

const AddMovement = () =>{

    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.headerText}>Nuevo Gasto</Text>
            </View>

            <View style={styles.toggleType}>
                <View style={[styles.selectedType, styles.type]}>
                    <Text>Gasto</Text>
                </View>
                <View style={styles.type}>
                    <Text style={styles.blueText}>Ingreso</Text>
                </View>
            </View>


        </ScrollView>
    )
    
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
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