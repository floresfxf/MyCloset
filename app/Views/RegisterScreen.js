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
import styles from '../Styles/styles.js';
import Hr from 'react-native-hr';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const baseURL = 'https://fringuante-moliere-12742.herokuapp.com';

export default class RegisterScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
        confirmPassword: '',
        city: '',
        state: '',
        hidden: true,
      }
  }
  static navigationOptions = {
    title: 'Register'
  };

  handleSubmit(){
    if (this.state.password === this.state.confirmPassword){
      if (this.validateEmail(this.state.username)){
        fetch(baseURL + '/users/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
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
              this.setState({ username: '', password: '', confirmPassword: '', city: '', state: ''});
              this.props.navigation.goBack();
            })
          }else{
            Alert.alert(resp.error);
          }
        })
      }else{
        Alert.alert("Invalid Email", "Invalid Email Address! Please try again.")
      }
    }else{
      Alert.alert("Password Don't Match", "You're passwords don't match! Please try again.")
    }
  }
  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  render() {
    const match = (this.state.password === this.state.confirmPassword);
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <KeyboardAwareScrollView contentContainerStyle={styles.loginContainer}>
            <Image
                source={require('../img/closet_icon.png')}
                style={styles.big_icon}
            />
            <TextInput placeholder={"Enter Email Address"}
                returnKeyType={'next'}
                keyboardType={'email-address'}
                onChangeText={(text)=>this.setState({ username: text })} onSubmitEditing={(event) => { this.refs.SecondInput.focus(); }}
                autoFocus={true} autoCorrect={false} style={styles.textBox}/>

            <Hr lineColor={'#DCDCDC'} />

            <TextInput placeholder={ "Enter Password" } ref='SecondInput'
                onChangeText={(text)=>this.setState({ password: text })}
                onSubmitEditing={(event) => { this.refs.ThirdInput.focus(); }}
                returnKeyType={'next'} autoCorrect={false} style={styles.textBox} secureTextEntry={ this.state.hidden } selectTextOnFocus={true}  />

            <Hr lineColor={'#DCDCDC'} />

            <TextInput placeholder={"Verify Password"} ref='ThirdInput'
                autoCorrect={false} returnKeyType={'next'}                      secureTextEntry={ this.state.hidden } selectTextOnFocus={true} onChangeText={(text)=>this.setState({ confirmPassword: text })} onSubmitEditing={(event) => { this.refs.FourthInput.focus(); }}
                style={ match ? styles.textBox : styles.textBoxWrong }/>

            <Hr lineColor={'#DCDCDC'} />

            <TouchableOpacity style={ styles.pwdbutton }
                onPress={ () => this.setState({ hidden: !this.state.hidden })}>
                <Text style={ styles.smallButtonLabel }>
                    Show Password
                </Text>
            </TouchableOpacity>

            <TextInput placeholder={"City"}
                returnKeyType={'next'} ref='FourthInput'
                onChangeText={ (text)=>this.setState({city:text}) }
                onSubmitEditing={(event) => { this.refs.FifthInput.focus(); }}          style={ styles.textBox } autoCorrect={false}/>

            <Hr lineColor={'#DCDCDC'} />

            <TextInput placeholder={"State"} ref='FifthInput'
                autoCorrect={false} returnKeyType={'join'}
                autoCapitalize={'characters'} maxLength={2} onChangeText={(text)=>this.setState({ state: text })}           onSubmitEditing={ this.handleSubmit.bind(this) }
                style={ styles.textBox }  />

            <Hr lineColor={'#DCDCDC'} />

            <TouchableOpacity onPress={ this.handleSubmit.bind(this) }
                style={ [styles.button, styles.buttonBlue] }>
                <Text style={styles.buttonLabel}>
                    Register
                </Text>
            </TouchableOpacity>

        </KeyboardAwareScrollView>

    </TouchableWithoutFeedback>

    )
  }
}
