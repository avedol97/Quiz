import React, {Component} from 'react';
import {View,
    Text,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';

class Top extends Component {
    render()
    {
        const {name,navigation} = this.props
        return (
          <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={()=> navigation.openDrawer()}>
                  <View style={styles.line}></View>
                  <View style={styles.line}></View>
                  <View style={styles.line}></View>
              </TouchableOpacity>
              <Text style={styles.name}>{name}</Text>
          </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        width: "100%",
        height: "20%",
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E90FF",

    },
    button:{
        width: 50,
        height: 50,
        borderWidth: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        position: "absolute",
        left: 10,
        top: "50%",
        transform: [{translateY: -25}]
    },
    line:{
        width:"70%",
        height: 3,
        backgroundColor: "black",
    },
    name:{
        fontFamily:"Langar-Regular",
        fontSize:40,
    }
})

export default Top;
