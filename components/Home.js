import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Top from './Top';
import SplashScreen from 'react-native-splash-screen'
import Result from "./Result";
import Tests from "./Tests";

const _ = require("lodash");
import NetInfo from '@react-native-community/netinfo'
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

let db;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            isLoading: true,
            isConnected: false,
            CurrentDate: 'date',
            id: '',
        };
        db = SQLite.openDatabase({
            name: 'database',
            location: 'default',
            createFromLocation: '~database.db',
        })
    }

    getCurrentDate = () => {

        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        const fullDate = year + '-' + month + '-' + date;
        this.setState({
            CurrentDate: fullDate
        })
    }


    getData = async () => {
        if (await NetInfo.fetch().then(state => {
            return state.isConnected
        }) === true) {
            console.log(await this.getSql());
            fetch('http://tgryl.pl/quiz/tests', {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        date: _.shuffle(responseJson),
                        isLoading: false,
                        isConnected: true,
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this.setState({
                isLoading: false,
                date: await this.getSql(),
            });
        }
    }

    getSql = async () => {
        let users = [];
        await db.transaction(async (tx) => {
            await tx.executeSql('SELECT * FROM dane', [], async (tx, results) => {
                console.log(results.rows.length);
                for (let i = 0; i < results.rows.length; i++) {
                    users.push(await results.rows.item(i));
                    console.log(users[i]);
                    //this.setState({date:users})
                }
            });
        });
        return users;
    }

    success = () => {
        db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS dane', []);
            tx.executeSql('CREATE TABLE IF NOT EXISTS dane (id TEXT ,name TEXT ,description TEXT ,tags TEXT ,level TEXT ,numberOfTasks INTEGER );', []);
            this.state.date.map((test) => {
                tx.executeSql('INSERT INTO dane (id,name,description,tags,level,numberOfTasks) VALUES  (?,?,?,?,?,?);', [test.id, test.name, test.description, JSON.stringify(test.tags), test.level, test.numberOfTasks],
                    (tx, results) => {
                        console.log("Results", results.rowsAffected);
                    },
                    (err) => {
                        console.error(err);
                    });
            })
            tx.executeSql('SELECT * FROM dane', [], (tx, results) => {
                let users = [];
                console.log(results.rows.length);
                for (let i = 0; i < results.rows.length; i++) {
                    users.push(results.rows.item(i));
                    console.log(users[i]);
                    this.setState({sql: users})
                }
            });
        });
    }


    async componentDidMount() {

        await this.getCurrentDate();
        const dateStorage = await AsyncStorage.getItem("UpdateDate");
        if (dateStorage != this.state.CurrentDate) {
            await this.success();
            await AsyncStorage.setItem("UpdateDate", this.state.CurrentDate);
        } else {
            console.log("Już zapisano do bazy!")
        }

        await this.getData();

        if (!this.state.isConnected) {
            await this.getSql();
        }

            SplashScreen.hide();
    }


    render() {
        if (this.state.isLoading) {
            return (<View style={styles.container}><Text>fdsdsfdsfsdfd</Text></View>)
        } else {
            let zmienna;
            let dataK = this.state.date.map((val, key) => {
                if (this.state.isConnected) {
                    zmienna = val.tags;
                } else {
                    zmienna = JSON.parse(val.tags)
                }
                return (
                    <View key={key}>
                        <View style={styles.container2}>
                            <View style={styles.color}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Tests", {id: val.id})}>
                                    <Text style={styles.text3}>{val.name}</Text>
                                    <View style={styles.box2}>
                                        <Text style={styles.text3}>{zmienna[0]}</Text>
                                        <Text style={styles.text3}>{zmienna[1]}</Text>
                                        <Text style={styles.text3}>{zmienna[2]}</Text>
                                    </View>
                                    <Text style={styles.text3}>{val.description}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            })
            return (

                <View style={styles.container}>
                    <Top name="Home Page" navigation={this.props.navigation}/>
                    <ScrollView>
                        {dataK}
                    </ScrollView>
                    <View style={styles.box}>
                        <Text style={styles.text}>Get to know your ranking result</Text>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.props.navigation.navigate("Result")}><Text
                            style={styles.text2}>Check!</Text></TouchableOpacity>
                    </View>


                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    container2: {
        marginTop: 20,
        height: 150,
        width: "90%",
        color: "black",
        borderWidth: 1,
    },
    color: {
        backgroundColor: '#00BFFF',
        height: "100%",

    },
    box: {
        marginTop: 10,
        alignSelf: "center",
        width: "98%",
        height: 80,
        borderWidth: 2,

    },
    button: {
        marginTop: 10,
        marginLeft: 20,
        width: "30%",
        height: "40%",
        alignSelf: "center",
        borderRadius: 5,
        borderWidth: 2,
    },
    text: {
        marginTop: 5,
        alignSelf: "center",
        fontSize: 20,
    },
    text3: {
        fontFamily: "Play-Regular",
        marginLeft: 10,
        marginTop: 15,
        fontSize: 15,
    },
    text2: {
        alignSelf: "center",
        fontSize: 15,
    },
    box2: {
        flexDirection: "row",
    }
});

export default Home;
