import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Top from "./Top";
import { ProgressBar } from '@react-native-community/progress-bar-android';


class Quest extends Component {



    render() {
        const {test,answerA,answerB,answerC,answerD,question,que,time,ruszaj,length} = this.props
        return (
            <View style={styles.container}>
                <Top name ={test} navigation={this.props.navigation}/>

                <View style={styles.one}><Text style={styles.oneT}>Question {que} of {length} </Text>
                    <Text style={styles.oneT}>Time: {time}</Text>
                </View>
                <View style={styles.bar}>
                    <ProgressBar styleAttr="Horizontal" progress={ruszaj} indeterminate={false} width='90%' color='#87CEEB'/>
                </View>
                <View style={styles.two}>
                    <Text style={styles.oneT}>{question}</Text>
                    <View style={styles.tre}>
                        <Text></Text>
                    </View >
                </View>
                <View style={styles.box}>
                    <View style={styles.box2}>
                        <TouchableOpacity style={styles.button} onPress={ () => this.props.fun0() }><Text style={styles.but}>{answerA}</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={ () => this.props.fun1() }><Text style={styles.but}>{answerB}</Text></TouchableOpacity>
                    </View>
                    <View style={styles.box2}>
                        <TouchableOpacity style={styles.button} onPress={ () => this.props.fun2() }><Text style={styles.but}>{answerC}</Text></TouchableOpacity>
                        {this.props.answerD && <TouchableOpacity style={styles.button} onPress={ () => this.props.fun3() }><Text style={styles.but}>{answerD}</Text></TouchableOpacity>}
                    </View>
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        height:"80%",
        width:"100%",
    },
    bar:{
        marginTop:30,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
    },
    box:{
        marginTop:50,
        justifyContent:"space-between",
        flexDirection:"row",
        alignSelf: "center",
        height: 250,
        width: "90%",
        borderWidth:2,
    },
    button:{
        borderRadius:10,
        height:50,
        width:140,
        borderWidth:2,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#87CEEB",
    },
    box2:{
        alignItems:"center",
        justifyContent:"space-around",
        width:"50%",
        flexDirection:"column",
    },
    one:{
        fontFamily:"Play-Regular",
        marginTop:20,
        flexDirection: "row",
        justifyContent:"space-between",
        width:"90%",
        alignSelf: "center",
    },
    oneT:{
        fontFamily:"Play-Regular",
        fontSize: 20,
    },
    two:{
        width:"90%",
        marginTop:50,
        alignSelf: "center",
    },
    tre:{
        marginTop:15,
    },
    but:{
        fontFamily:"Play-Regular",
    }
});

export default Quest;
