import {AppRegistry} from 'react-native';
import App from './components/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

var React = require('react-native');
var SQLite = require('react-native-sqlite-storage')
