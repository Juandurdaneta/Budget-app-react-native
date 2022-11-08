import React from "react"
import { Text, ScrollView, View, StyleSheet, SafeAreaView } from "react-native";



const Home = ({navigation}) =>{
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={styles.heroContainer}>
                    <Text style={styles.heroContainerTextHeader}>Balance Total</Text>
                    <Text style={styles.heroContainerCurrentAmount}><Text style={styles.grayText}>$</Text>1000</Text>
                </View>

            <View>


                <View style={styles.rowContainer}>
                    <View style={styles.statsContainer}>
                        <Text style={styles.heroContainerTextHeader}>Ingreso Total</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.heroContainerTextHeader}>Egreso Total</Text>
                    </View>
                </View>


            </View>

                <View style={styles.movementsContainer}>
                    <View style={styles.movementsContainerHeader}>
                        <Text style={styles.heroContainerTextHeader}>Ultimos movimientos</Text>
                        <Text style={[styles.heroContainerTextHeader, styles.blueText]} onPress={() => navigation.navigate('Movements')} >Ver todos</Text>

                    </View>
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
    heroContainer: {
        padding: '5%',
        margin: 20,
        borderRadius: 15,
        borderWidth: 1
    },
    heroContainerTextHeader : {
        fontSize: 15,
        fontWeight: "600"
    },
    heroContainerCurrentAmount : {
        fontSize: 35,
        fontWeight: "600"
    },
    grayText: {
        color: '#808080'
    },

    blueText: {
        color: '#0000FF'
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    statsContainer: {
        padding: '10%',
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 4
    },
    movementsContainer : {
        backgroundColor: '#f6f6f6',
        padding: '5%',
        margin: 20,
        borderRadius: 15,
        height: '100%'
    },

    movementsContainerHeader : {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

  });
  

export default Home;