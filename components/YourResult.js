import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

class YourResult extends Component {

       state= {
            score: this.props.route.params.score,
            length: this.props.route.params.length
    }

    render() {
        return (
            <View style={styles.container}><Text style={styles.text}> Your Result </Text>
                <Text style={styles.text}>{this.state.score}/{this.state.length}</Text></View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#87CEEB",
    },
    text:{
        fontFamily:"Play-Regular",
        marginTop:20,
        fontSize:50,
        borderWidth:1,
    }
})


export default YourResult;
