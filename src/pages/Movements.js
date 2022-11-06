import React, { useState } from "react";
import { Text, ScrollView, View, StyleSheet, SafeAreaView } from "react-native";
import { movements } from "../utils/MovementsInfo";
import MovementGrid from "../components/MovementGrid";

const Movements = () =>{

    const [selected, setSelected] = useState(true)


    
    

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <Text style={styles.headerText}>Movimientos</Text>
            {
                selected 

                ?
                <View style={styles.toggleType}>
                    <View style={[ styles.type, styles.selectedType]}>
                        <Text>Gasto</Text>
                    </View>
                    <View style={[styles.type]}>
                        <Text onPress={()=> setSelected(false)} style={styles.blueText}>Ingreso</Text>
                    </View>
                </View>

                :
                <View style={styles.toggleType}>
                    <View style={styles.type}>
                        <Text onPress={()=> setSelected(true)} style={styles.blueText}>Gasto</Text>
                    </View>
                    <View style={[styles.type, styles.selectedType]}>
                        <Text>Ingreso</Text>
                    </View>
                </View>
        }


        <View style={styles.movementsContainer}>
             {
                movements.map((movement, index)=>(
                    <MovementGrid movement={movement} key={index} />
                ))
             }
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

    headerText : {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 25,
        marginStart: 15
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
    movementsContainer : {
        backgroundColor: '#f6f6f6',
        padding: '5%',
        margin: 20,
        borderRadius: 15,
    },


  });
  

export default Movements;