import React, { useState, useEffect, useCallback } from "react";
import { Text, ScrollView, View, StyleSheet, SafeAreaView, RefreshControl } from "react-native";
import MovementGrid from "../components/MovementGrid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoMovementFoundMessage from "../components/NoMovementFoundMessage";

const Movements = ({navigation}) =>{

    const [selected, setSelected] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [movements, setMovements] = useState()
   

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('MOVEMENTS')
        setMovements(JSON.parse(jsonValue))
        } catch(e) {
        console.log(e.message)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           getData();
          });
          return unsubscribe
    }, [navigation])


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData();
        wait(2000).then(() => setRefreshing(false));
      }, []);


    let expenses;
    let income;

    if(movements){
        expenses = movements.filter(movement => movement.isExpense);
        income = movements.filter(movement => !movement.isExpense)
    }
    
    

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
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
        <View>
         {
      

            selected ? expenses && expenses.length > 0 ? <MovementGrid dataCallback={getData} movements={expenses}/> : <NoMovementFoundMessage navigation={navigation} /> : income && income.length > 0 ? <MovementGrid dataCallback={getData} movements={income}/> : <NoMovementFoundMessage navigation={navigation} /> 


        }
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