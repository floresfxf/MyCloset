import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighLight,
  TextInput,
  ListView,
  Alert,
  Button,
  AsyncStorage,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListItem,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Hr from 'react-native-hr';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UsersScreen from './app/Views/UsersScreen.js';
import RegisterScreen from './app/Views/RegisterScreen.js';
import MySketchbookScreen from './app/Views/SketchbookScreen.js';
import ProfileScreen from './app/Views/ProfileScreen.js';
import LoginScreen from './app/Views/LoginScreen.js';
import MyClosetScreen from './app/Views/MyClosetScreen.js';


const baseURL = 'https://hohoho-backend.herokuapp.com';
//Screens
class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  press() {
    this.props.navigation.navigate('Home');
  }
  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
              source={require('./app/img/closet_icon.png')}
              style={styles.big_icon}
          />
          <Text style={styles.welcome}>Welcome to My Closet</Text>
          <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}> Login Page
              <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
              <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>
      </View>
    )
  }
}


  state = {
      data: {
        "A": [
          {
            "name": "Anh Tuan Nguyen",
            "age": 28
          },
          {
            "name": "An Nhien",
            "age": 20
          },
        ],
        "Z": [
          {
            "name": "Zue Dang",
            "age": 22
          },
          {
            "name": "Zoom Jane",
            "age": 30
          },
        ]
      }
    }
//
      renderRow = (item, sectionId, index) => {
        return (
          <TouchableHightLight
            style={{
              height: rowHeight,
              justifyContent: 'center',
              alignItems: 'center'}}
          >
            <Text>{item.name}</Text>
          </TouchableHightLight>
        );
      }

const MyApp = TabNavigator({
  Home: {
    screen: MyClosetScreen,
  },
  Users: {
    screen: UsersScreen,
  },
  Sketchbook: {
    screen: MySketchbookScreen
  },
  Profile: {
    screen: ProfileScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63', //Tab icon color when active
  },
});
//Export Navigator (Will be run first)
export default StackNavigator({
  Home: {
    screen: MyApp,
  },
  Register: {
    screen: RegisterScreen,
  },
  Tab: {
    screen: MyApp,
    navigationOptions: {
           headerLeft:false,
    }
  }
}, {initialRouteName: 'Home'});//start on home
