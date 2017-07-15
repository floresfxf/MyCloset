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
  Picker,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Hr from 'react-native-hr';
import styles from '../Styles/styles.js';
import RegisterScreen from './RegisterScreen';
const api_key = '8anc69we7ewsdv5rkxhv7xub';

// const api_key = 'SEM3A35A5E0D7C160C77FB9628D50587EDE3';
// const api_secret = 'YzdiNTBlZjllMTJmYjhiNzUyZmQ4ZDYwYWQ4NTZmZDQ';
// const sem3 = require('semantics3-node')(api_key,api_secret);
// import MyClosetScreen from '../../App';
const baseURL = 'https://fringuante-moliere-12742.herokuapp.com';

export default class ImportScreen extends React.Component { //TODO: Save user information to DB and implement async storage
  constructor(props){
    super(props);
    this.state = {
      username: '',
      upc: '',
      articleType: 'shoes',
      color: '',
      description: '',
      imageURL: '',
    }

  }
  static navigationOptions = {
    title: 'Import Clothing'
  }
  componentDidMount(){
    const self = this;
    console.log('Mount');
    AsyncStorage.getItem('user')
    .then(result => {
      var parsedResult = JSON.parse(result);
      var username = parsedResult.username;
      if (username) {
        this.setState({
          username: username,
        })
      }
    })
    .catch((err) => console.log(err))
  }

  getProduct(upc){
    const self = this;
    const requestURL = 'https://secure25.win.hostgator.com/searchupc_com/handlers/upcsearch.ashx?request_type=3&access_token=62AF85A5-F2F2-4EB3-B9B5-454E07802DBE&upc='
    fetch(requestURL + upc)
    .then((response) => response.json())
    .then((res) => {
      if (Object.keys(res).length === 0 && res.constructor === Object){
        Alert.alert('UPC Not Found!', 'Please check your UPC and try again.');
        self.setState({
          upc: '',
          articleType: 'shoes',
          color: '',
          description: '',
          imageURL: '',
        });
      }else{
        console.log(res['0']);
        const newImage = res['0'].imageurl;
        const newDesc = res['0'].productname;
        console.log(newImage);
        console.log(newDesc);
        console.log(typeof newImage);
        console.log(typeof newDesc);
        fetch(baseURL + '/new/items/' + this.state.username, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            articleType: this.state.type,
            color: this.state.color,
            imageurl: newImage,
            upc: this.state.upc,
            description: newDesc,
          })
        })
        .then((response) => response.json())
        .then((resp) => {
          console.log(resp);
          self.setState({
            upc: '',
            articleType: 'shoes',
            color: '',
            description: '',
            imageURL: '',
          });
          Alert.alert('Clothing Added!', 'Your article has been added. Navigate to your closet to check it out!')
          this.props.navigation.goBack();
        });
      }
    })
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.loginContainer}>

          <Image
            source={require('../img/closet_icon.png')}
            style={ styles.big_icon }
          />
          <TextInput placeholder={"UPC"}
            onChangeText={(text)=>this.setState({upc:text})}
            keyboardType={'numeric'} autoCorrect={false}  style={styles.textBox}/>
            <TextInput placeholder={"Color"}
              onChangeText={(text)=>this.setState({color:text})}
              autoCorrect={true}  style={styles.textBox}/>
              <Picker
                style={{width: 100}}
                mode="dialog"
                triggerType="onClick"
                selectedValue={this.state.type}
                onValueChange={(itemValue, itemIndex) => this.setState({articleType: itemValue})}>
                <Picker.Item label="Jacket" value="jacket" />
                <Picker.Item label="Pants" value="pants" />
                <Picker.Item label="Jeans" value="jeans" />
                <Picker.Item label="Shorts" value="shorts" />
                <Picker.Item label="Dress Shirt" value="dressShirt" />
                <Picker.Item label="T-Shirt" value="tshirt" />
                <Picker.Item label="Dress" value="dress" />
                <Picker.Item label="Sweater" value="sweater" />
                <Picker.Item label="Jacket" value="jacket" />
              </Picker>
              <TouchableOpacity style={[styles.button, styles.buttonGreen]}
                onPress={this.getProduct.bind(this, this.state.upc)}>

                <Text style={styles.buttonLabel}>
                  Add to Closet
                </Text>
              </TouchableOpacity>



            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>

        )
      }
    }
