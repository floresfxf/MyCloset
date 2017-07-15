import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Hr from 'react-native-hr';
import styles from '../Styles/styles.js';
import RegisterScreen from './RegisterScreen';
// import MyClosetScreen from '../../App';
const baseURL = 'https://fringuante-moliere-12742.herokuapp.com';

export default class LoginScreen extends React.Component { //TODO: Save user information to DB and implement async storage
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    }
    this.login = this.login.bind(this); //bind on click functions
  }
  static navigationOptions = {
    title: 'Sign In'
  }
  componentDidMount(){
    const self = this;
    console.log('Mount');
    AsyncStorage.getItem('user')
    .then(result => {
      if (result){
        var parsedResult = JSON.parse(result);
        var username = parsedResult.username;
        var password = parsedResult.password;
        console.log(username);
        console.log(password);
        if (username && password) {
          return self.login(username, password)
          .then(resp => resp.json())
          .then((response)=>{
            if (response.success){
              console.log('successful log in');
              self.props.navigation.navigate('Tab');
            }
          });
        }
      }
    })
    .catch((err) => console.log(err))
  }
  login(username,password){ //TODO: Use db or quicker api
    let self = this;
    return fetch(baseURL + '/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
  }
  handleSubmit(){
    let self = this;
    fetch(baseURL + '/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((resp) => {
      console.log(resp);
      if(resp.success){
        AsyncStorage.setItem('user', JSON.stringify({//Save user credentials in async storage
          username: this.state.username,
          password: this.state.password
        }))
        .then(()=>{
          self.setState({username: '', password: ''}); //reset state
          self.props.navigation.navigate('Tab');
        })
      }else{
        Alert.alert(resp.error);
      }
    })
    .catch((err) => {
      self.setState({
        error:err["error"]
      })
    })
  }
  register() {
    this.props.navigation.navigate('Register'); //Send to register page
    //
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.loginContainer}>

          <Image
            source={require('../img/closet_icon.png')}
            style={ styles.big_icon }
          />
          <TextInput placeholder={"Username"}
            onChangeText={(text)=>this.setState({username:text})}
            autoCorrect={false}  style={styles.textBox}/>

            <Hr lineColor={'#DCDCDC'}/>

            <TextInput placeholder={"Password"}
              style={styles.textBox}  autoCorrect={false} secureTextEntry={true} onChangeText={(text)=>this.setState({ password: text })} />
              <Hr lineColor={'#DCDCDC'} />

              <Text>{"\n"}</Text>

              <TouchableOpacity
                style={[styles.button, styles.buttonBlue]} onPress={this.handleSubmit.bind(this)}>

                <Text style={styles.buttonLabel}>
                  Login
                </Text>

              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonGreen]}
                onPress={ () => {this.register()} }>

                <Text style={styles.buttonLabel}>
                  Register
                </Text>
              </TouchableOpacity>

            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>

        )
      }
    }
