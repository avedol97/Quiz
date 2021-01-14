import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import Quest from "./Quest";
const _ = require("lodash");
import NetInfo from '@react-native-community/netinfo'
import SQLite from "react-native-sqlite-storage";

let db;

class Tests extends Component {

    constructor() {
        super();

        this.state= {
            score: 0,
            question:1,
            index : 0,
            timer : 5,
            bar: 1,
            sql:null,
            CurrentDate:'date',
            nick : "nilson",
            tests: {
                question: "hahahahh",
                "answers": [
                    {
                        "content": "Loading...",
                        "isCorrect": false
                    },
                    {
                        "content": "Loading...",
                        "isCorrect": false
                    },
                    {
                        "content": "Loading...",
                        "isCorrect": false
                    },
                    {
                        "content": "Loading...",
                        "isCorrect": false
                    },
                ],
                duration: 30,
            },
            loaded: false
        };
        db = SQLite.openDatabase({
            name: 'database',
            location: 'default',
            createFromLocation: '~database.db',
        })
    }


    getDB = (id) => {
        db.transaction( (tx) => {
            tx.executeSql('SELECT * FROM krystian WHERE id = ?', [id], (tx, results) => {
                console.log("Results", results.rows.length);
                console.log(JSON.parse(results.rows.item(0).tasks));
                this.setState({tests:JSON.parse(results.rows.item(0).tasks)},()=>{this.setState({loaded:true,timer:30})})

            });
        })
    }


    postDate = () => {
        fetch('http://tgryl.pl/quiz/result',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: 'nilson',
                score: this.state.score,
                total: this.state.tests.length,
                type: 'Matematyka'
            })
        })
    }

    goOn = async (isCorrect) => {
        if(this.state.question < this.state.tests.length) {

            if (this.state.timer === 0) {
                this.setState({
                    index: this.state.index + 1,
                    question: this.state.question + 1,
                    timer: this.state.tests[this.state.index+1].duration,
                    bar:1,
                },()=>this.componentDidMount() )
            }
            if(isCorrect) {
                await this.setState({
                    score:this.state.score+1,

                })
            }
            this.setState({
                index: this.state.index + 1,
                question: this.state.question + 1,
                timer: this.state.tests[this.state.index+1].duration,
                bar:1,
            })
        }else
        {

            if(isCorrect) {
                await this.setState({
                    score:this.state.score+1,

                })
            }
            this.postDate();
            clearInterval(this.state.timer)
            this.props.navigation.navigate('YourResult',{score:this.state.score,length:this.state.tests.length})
        }
    }



    getCurrentDate = () =>  {

        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        const fullDate = year + '-' + month + '-' + date;
        this.setState({
            CurrentDate:  fullDate
        })
    }


    async componentDidMount() {
        this.getDate();
        this.getCurrentDate();
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 ,
                bar:   (this.state.timer-1)/this.state.tests[this.state.index].duration
            })),
            1000
        );


    }

    componentDidUpdate(){
        if(this.state.timer === 0){
            clearInterval(this.interval);
            this.goOn(false);
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


    getDate  = async ()  =>{
        const {id} =this.props.route.params
        if (await NetInfo.fetch().then(state => {
            return state.isConnected
        }) === true) {
       fetch('http://tgryl.pl/quiz/test/'+ id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    ...this.state,
                    tests: _.shuffle(responseJson.tasks),
                    loaded:true,
                    timer:responseJson.tasks[0].duration,
                },()=>{} );
            })
            .catch((error) => {
                console.error(error);
            })
    }else{
            this.getDB(id);
    }

}


    render() {
        return (
            <View>
                {!this.state.loaded ? <Text>loading</Text> : ( <View style={styles.container}>
                    <Quest answerA={this.state.tests[this.state.index].answers[0].content}
                           answerB={this.state.tests[this.state.index].answers[1].content}
                           answerC={this.state.tests[this.state.index].answers[2].content}
                           answerD={(this.state.tests[this.state.index].answers.length > 3 ) && this.state.tests[this.state.index].answers[3].content}
                           question={this.state.tests[this.state.index].question}
                           que={this.state.index + 1}
                           time={this.state.timer}
                           fun0={() => {this.goOn(this.state.tests[this.state.index].answers[0].isCorrect)}}
                           fun1={() => {this.goOn(this.state.tests[this.state.index].answers[1].isCorrect)}}
                           fun2={() => {this.goOn(this.state.tests[this.state.index].answers[2].isCorrect)}}
                           fun3={() => {this.goOn(this.state.tests[this.state.index].answers[3].isCorrect)}}
                           ruszaj={this.state.bar}
                           length={this.state.tests.length}
                           test="Sports"
                           navigation={this.props.navigation}
                    />

                </View>)}</View>
        )
    }

}



const styles=StyleSheet.create({
    container:{
        height:"80%",
        width:"100%",
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
        width:120,
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
        marginTop:20,
        flexDirection: "row",
        justifyContent:"space-between",
        width:"90%",
        alignSelf: "center",
    },
    oneT:{
        fontSize: 20,
    },
    two:{
        width:"90%",
        marginTop:50,
        alignSelf: "center",
    },
    tre:{
        marginTop:15,
    }
});


export default Tests;
