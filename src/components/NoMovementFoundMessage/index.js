import React from "react";
import { Text, View, StyleSheet } from "react-native";

const NoMovementFoundMessage  = ({navigation}) => (

    <View style={styles.noMovementsFoundContainer}>
        <Text style={styles.noMovementsFoundContainerText}>Aun no se han agregado movimientos...</Text>
        <Text style={[styles.heroContainerTextHeader, styles.blueText, styles.noMovementsFoundContainerText]} onPress={() => navigation.navigate('AddMovement')} >Agregar</Text>
    </View>

)

const styles = StyleSheet.create({
    noMovementsFoundContainer : {
        padding: '8%',
    },
    noMovementsFoundContainerText : {
        textAlign: 'center'
    },
    blueText: {
        color: '#0000FF'
    },
})

export default NoMovementFoundMessage;