import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Top from "./Top";


class Regulations extends Component {

    storeData = async  () => {
        await AsyncStorage.setItem('isChecked','true');
        this.props.navigation.navigate('Home')

    }

    render() {
        return (
            <View style={styles.container}>
            <Top name ="Regulations" navigation={this.props.navigation}/>
            <View style={styles.box}>
           <Text style={styles.text}>Regulations : </Text>
                <Text style={styles.text}>1. XYZ</Text>
                <Text style={styles.text}>2. XYZ</Text>
                <Text style={styles.text}>3. XYZ</Text>
                <Text style={styles.text}>4. XYZ</Text>
                <Text style={styles.text}>5. XYZ</Text>

                <TouchableOpacity style={styles.button} onPress={() => this.storeData()}><Text style={styles.text}>Accept</Text></TouchableOpacity>
                </View></View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        height:"80%",

    },
    box:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    button:{
        alignItems:"center",
        marginTop:20,
        borderWidth:1,
        height:80,
        width:"80%",
        backgroundColor:"#1E90FF"
    },
    text:{
        fontSize:50,
    },
        text2:{
        fontSize:100,
        }
    }
    )
export default Regulations;
