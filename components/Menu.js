import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image, ActivityIndicator, TouchableOpacity,

} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Home from './Home';
import SplashScreen from "react-native-splash-screen";
import SQLite from "react-native-sqlite-storage";
const _ = require("lodash");
import NetInfo from '@react-native-community/netinfo'
let db;
class Menu extends Component {

    constructor() {
        super();
        this.state ={
            date: null,
            isLoading: true,
            listId: [],
            NumberHolder : 0,
        };
        db = SQLite.openDatabase({name: 'database',
            location: 'default',
            createFromLocation: '~database.db',})
    }

    GenerateRandomNumber=()=>
    {
        var RandomNumber = Math.floor(Math.random() * 5) + 0 ;
        this.setState({
            NumberHolder : RandomNumber
        })
    }

    componentDidMount = () => {
        this.getData()
        this.GenerateRandomNumber();
        SplashScreen.hide();
        ;
    }

    // getData = () =>{
    //     fetch('http://tgryl.pl/quiz/tests', {
    //         method: 'GET'
    //     })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 date: _.shuffle(responseJson),
    //                 isLoading: false,
    //             })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });}
    //
    // showAlert = () =>{
    //     alert("Zaaktualizowano Testy!");
    // }


    showAlert = () => {
        alert("Zaaktualizowano Testy!");
    }

    getData = async () => {
        if (await NetInfo.fetch().then(state => {
            return state.isConnected
        }) === true) {
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
                    this.setState({date:users})
                }
            });
        });
        return users;
    }

render() {
    if (this.state.isLoading) {
        return (<View style={styles.container}><Text>XDDDDDDD</Text></View>)
    } else {
        let dataK = this.state.date.map((val, key) => {
            if(this.state.listId.length <5) {
                this.state.listId.push(val.id);
            }
            return (
                <View key={key} >
                    <View style={styles.con}>
                    <View style={styles.big}>
                    <TouchableOpacity style={styles.con} onPress={() => this.props.navigation.navigate("Tests",{id:val.id})}>
                        <Text style={styles.text2}>{val.name}</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </View>

            )
        })
    return(

      <View style={styles.container} ><DrawerContentScrollView   {...this.props}>
          <View style={styles.big}>
              <Text style={styles.quiz}>Quiz App</Text>
              <Image
                  style={{width: 150,height:150}}
                  source={require('../android/app/src/img/emptyPhoto.png')}/>
              <Text style={styles.text} onPress={()=> this.props.navigation.navigate("Home")}>Home</Text>
              <Text style={styles.text} onPress={()=> this.props.navigation.navigate("Result")}>Result</Text>
              <Text style={styles.line}></Text>
              <View style={styles.bigButton}>
              <TouchableOpacity style={styles.textButton} onPress={()=>{this.GenerateRandomNumber(); this.props.navigation.navigate("Tests",{id:this.state.listId[this.state.NumberHolder]})}}><Text style={styles.texty}>Random Test</Text></TouchableOpacity>
              <TouchableOpacity style={styles.textButton} onPress={ () =>{this.getData();this.showAlert()}}><Text style={styles.texty}>Reload Test</Text></TouchableOpacity>
              </View>
              {dataK}



          </View>
      </DrawerContentScrollView>
      </View>
  )

}}

}


const styles=StyleSheet.create({
    quiz:{
        fontFamily:"Langar-Regular",
        width:"100%",
        fontSize:30,
        textAlign: "center",
        marginTop: 20,
        height:50,
        color: "black",
    },
    big:{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

    }, bigButton:{
        width: 150,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "stretch",

    },

    text:{
        fontFamily:"Play-Regular",
        color: "black",
        width: "90%",
        height: 50,
        fontSize:20,
        textAlign: "center",
        textAlignVertical:"center",
        borderRadius: 10,
        borderWidth: 2,
        marginTop: 20,
        backgroundColor:"#87CEEB",
    },textButton:{
        fontFamily:"Play-Regular",
        width: "90%",
        height: 50,
        borderRadius: 10,
        borderWidth: 3,
        marginTop: 10,
        backgroundColor:"#0A5CD6",

    },texty:{
        textAlign: "center",
        textAlignVertical:"center",
        color: "white",
        fontSize:20,
        marginTop: 10,

},
    text2:{
        fontFamily:"Play-Regular",
        color: "black",
        width: "90%",
        height: 50,
        fontSize:15,
        textAlign: "center",
        textAlignVertical:"center",
        borderRadius: 10,
        borderWidth: 2,
        marginTop: 20,
        marginLeft:10,
        backgroundColor:"#87CEEB",
    },
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "#4169E1",
    },
    con:{
      width:280,
    },
    line:{
        marginTop:25,
        width:"100%",
        height:4,
        backgroundColor: "black",
    }
})

export default Menu;
