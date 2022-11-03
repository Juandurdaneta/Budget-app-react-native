import React from "react";
import { Text, ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";

const AddMovement = () =>{

    return(
        <View style={styles.container}>
            <Text>Hello from addMovement</Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default AddMovement;