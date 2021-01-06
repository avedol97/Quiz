import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    RefreshControl,
} from 'react-native';
import Top from './Top';



class Result extends Component {

    constructor(props) {
        super(props);
        this.state ={
            isLoading: false,

            res : [
                {
                    "nick": "Marek",
                    "score": 18,
                    "total": 20,
                    "type": "historia",
                    "date": "2018-11-22"
                },
                {
                    "nick": "Adam",
                    "score": 10,
                    "total": 20,
                    "type": "historia",
                    "date": "2019-01-13"
                },
                {
                    "nick": "Pawel",
                    "score": 15,
                    "total": 20,
                    "type": "historia",
                    "date": "2020-12-05"
                },
            ],
            data:'',
        }
    }
    ItemView = ({item}) => {
        return(
            <View style={styles.test}>
                <Text style={styles.text}>{item.nick}</Text>
                <Text style={styles.text}>{item.score}</Text>
                <Text style={styles.text}>{item.total}</Text>
                <Text style={styles.text}>{item.type}</Text>
                <Text style={styles.text}>{item.date}</Text>
            </View>
        )

    }

    componentDidMount= () =>  {
        fetch('http://tgryl.pl/quiz/results', {
            method: 'GET'
            })
        .then((response) => response.json())
        .then((responseJson) => { console.log(responseJson);
        this.setState({
            data: responseJson
            })
    })
            .catch((error) => {
                console.error(error);
            });

    }


    onRefresh = () =>{
        console.log("refresh");
    }

    render() {
        return (
        <View style={styles.container}>
              <Top name ="Result" navigation={this.props.navigation}/>

                <View >
                    <FlatList
                        data={this.state.data}
                        renderItem={this.ItemView}
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={
                            <RefreshControl
                                colors={["red", "yellow"]}
                                refreshing={this.state.isLoading}
                                onRefresh={this.onRefresh}
                            />
                        }
                        />
                </View>

            </View>

        );
    }
}



const styles = StyleSheet.create(
    {
        test:{
            marginTop:10,
            height:60,
            flexDirection: "row",
            color:"black",
            borderWidth:1,
            justifyContent:"center",
            backgroundColor: '#87CEEB',
            width:"90%",
            alignSelf: "center",
        },
        container:{
            height:"80%",
            width: "100%",
            display: "flex",
        },
        text: {
            marginTop:20,
            alignSelf: "center",
            height: 30,
            margin: 2,
            fontSize:25,
            borderWidth: 1,
            backgroundColor: "pink",

        }
    }
);

export default Result;
