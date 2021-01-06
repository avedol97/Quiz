import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import Menu from './Menu';
import Result from './Result';
import Tests from './Tests';
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Regulations from "./Regulations";
import YourResult from "./YourResult";

const drawer = createDrawerNavigator();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: 'false',
        }
    }

    async componentDidMount(){
        SplashScreen.hide();
        await this.setState({
            isChecked: await AsyncStorage.getItem('isChecked')
        })

    }
  render() {
        if(this.state.isChecked === 'true'){
            return (
                <NavigationContainer>
                    <drawer.Navigator
                        drawerContent={props => <Menu {...props} />}
                        initialRouteName="Menu"  >
                        <drawer.Screen name="Home" component={Home} />
                        <drawer.Screen name="Result" component={Result} />
                        <drawer.Screen name="Tests" component={Tests} options={{unmountOnBlur:true}}/>
                        <drawer.Screen name="YourResult" component={YourResult } options={{unmountOnBlur:true}}/>
                    </drawer.Navigator>
                </NavigationContainer>
            );
        }else{

            return (
                <NavigationContainer>
                    <drawer.Navigator
                        drawerContent={props => <Menu {...props} />}
                        initialRouteName="Regulations"  >
                        <drawer.Screen name="Home" component={Home} />
                        <drawer.Screen name="Result" component={Result} />
                        <drawer.Screen name="Tests" component={Tests} />
                        <drawer.Screen name="Regulations" component={Regulations}/>
                        <drawer.Screen name="YourResult" component={YourResult} />
                    </drawer.Navigator>
                </NavigationContainer>
            );

        }

  }
}


export default App;
