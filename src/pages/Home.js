import React, {useState, useEffect, useCallback} from "react"
import { Text, ScrollView, View, StyleSheet, SafeAreaView, RefreshControl } from "react-native";
import MovementGrid from "../components/MovementGrid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTotalExpense, getTotalIncome, getTotalBalance } from "../utils/calculations";
import NoMovementFoundMessage from "../components/NoMovementFoundMessage";
import { sortByDate } from "../utils/sortByDate";



const Home = ({navigation}) =>{

    const [movements, setMovements] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [ balance, setBalance ] = useState(0)
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('MOVEMENTS')
        const parsedValue = JSON.parse(jsonValue)
        setMovements(parsedValue)
        setBalance(getTotalBalance(parsedValue))
        setIncome(getTotalIncome(parsedValue))
        setExpense(getTotalExpense(parsedValue))
        } catch(e) {
        console.error(e.message)
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

      



    return(
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

                

                <View style={styles.heroContainer}>
                    <Text style={styles.heroContainerTextHeader}>Balance Total</Text>
                    <Text style={styles.heroContainerCurrentAmount}><Text style={styles.grayText}>$</Text>{balance}</Text>
                </View>

            <View>


                <View style={styles.rowContainer}>
                    <View style={styles.statsContainer}>
                        <Text style={styles.heroContainerTextHeader}>Ingreso Total</Text>
                        <Text style={styles.amountText}>${income}</Text>

                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.heroContainerTextHeader}>Egreso Total</Text>
                        <Text style={styles.amountText}>-${expense}</Text>
                    </View>
                </View>


            </View>

                <View style={styles.movementsContainer}>
                    <View style={styles.movementsContainerHeader}>
                        <Text style={styles.heroContainerTextHeader}>Ultimos movimientos</Text>
                        <Text style={[styles.heroContainerTextHeader, styles.blueText]} onPress={() => navigation.navigate('Movements')} >Ver todos</Text>

                    </View>
                {
                    movements && movements.length > 0 ? 
                    <View>
                        <MovementGrid movements={ sortByDate(movements) } dataCallback={getData} />
                    </View>
                    :
                    <NoMovementFoundMessage navigation={navigation} />
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
    heroContainer: {
        padding: '5%',
        margin: 20,
        borderRadius: 15,
        borderWidth: 1
    },
    heroContainerTextHeader : {
        fontSize: 15,
        fontWeight: "600",
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
        marginHorizontal: 4,
        justifyContent: 'center'
    },
    movementsContainer : {
        backgroundColor: '#f6f6f6',
        padding: '5%',
        margin: 20,
        borderRadius: 15,
    },

    movementsContainerHeader : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },

    amountText: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 10
    },
    expenseText: {
        color: 'red'
    },
    incomeText : {
        color: '#93c47d'
    }
  });
  

export default Home;