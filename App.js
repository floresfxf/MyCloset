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
  KeyboardAvoidingView
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Hr from 'react-native-hr';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


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
          source={require('./img/closet_icon.png')}
          style={styles.big_icon}
        />
        <Text style={styles.welcome}>Welcome to My Closet</Text>
        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class RegisterScreen extends React.Component {
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
        fetch(baseURL + '/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            city: this.state.city,
            state: this.state.state
          })
        })
        .then((response) => response.json())
        .then((resp) => {
          this.setState({username: '', password: '', confirmPassword: '', city: '', state: ''});
          this.props.navigation.goBack();
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
          source={require('./img/closet_icon.png')}
          style={styles.big_icon}
        />
        <TextInput style={styles.textBox} placeholder={"Enter Email Address"} returnKeyType={'next'} autoFocus={true} keyboardType={'email-address'} autoCorrect={false} onChangeText={(text)=>this.setState({username:text})} onSubmitEditing={(event) => {this.refs.SecondInput.focus();}}/>
        <Hr lineColor={'#DCDCDC'} />
        <TextInput ref='SecondInput' style={styles.textBox} placeholder={"Enter Password"} returnKeyType={'next'} autoCorrect={false} secureTextEntry={this.state.hidden} selectTextOnFocus={true} onChangeText={(text)=>this.setState({password:text})} onSubmitEditing={(event) => {this.refs.ThirdInput.focus();}}/>
        <Hr lineColor={'#DCDCDC'} />
        <TextInput ref='ThirdInput' style={match ? styles.textBox:styles.textBoxWrong} placeholder={"Verify Password"} autoCorrect={false} returnKeyType={'next'} secureTextEntry={this.state.hidden} selectTextOnFocus={true} onChangeText={(text)=>this.setState({confirmPassword:text})} onSubmitEditing={(event) => {this.refs.FourthInput.focus();}}/>
        <Hr lineColor={'#DCDCDC'} />
        <TouchableOpacity style={styles.pwdbutton} onPress={ () => this.setState({ hidden: !this.state.hidden })}>
          <Text style={styles.smallButtonLabel}>Show Password</Text>
        </TouchableOpacity>
        <TextInput ref='FourthInput' style={styles.textBox} placeholder={"City"} autoCorrect={false} returnKeyType={'next'} onChangeText={(text)=>this.setState({city:text})} onSubmitEditing={(event) => {this.refs.FifthInput.focus();}}/>
        <Hr lineColor={'#DCDCDC'} />
        <TextInput ref='FifthInput' style={styles.textBox} placeholder={"State"} autoCorrect={false} returnKeyType={'join'} maxLength={2} autoCapitalize={'characters'} onChangeText={(text)=>this.setState({state:text})} onSubmitEditing={this.handleSubmit.bind(this)} />
        <Hr lineColor={'#DCDCDC'} />
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={this.handleSubmit.bind(this)}>
          <Text style={styles.buttonLabel}>Register</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>

    )
  }
}

class LoginScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
        error: ''
      }
      this.login = this.login.bind(this);
  }
  static navigationOptions = {
    title: 'Sign In'
  }
  // componentDidMount(){
  //   const self = this;
  //   console.log('Mount');
  //   AsyncStorage.getItem('user')
  //   .then(result => {
  //     var parsedResult = JSON.parse(result);
  //     var username = parsedResult.username;
  //     var password = parsedResult.password;
  //     if (username && password) {
  //       return self.login(username, password)
  //         .then(resp => resp.json())
  //         .then((response)=>{
  //           if (response.success){
  //             self.props.navigation.navigate('Tab');
  //           }
  //         });
  //     }
  //   })
  //   .catch((err) => console.log(err))
  // }
  login(username,password){
    let self = this;
    return fetch(baseURL + '/login', {
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
    fetch(baseURL + '/login', {
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
        AsyncStorage.setItem('user', JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }))
        .then(()=>{
          self.setState({username: '', password: ''});
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
    this.props.navigation.navigate('Register');
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.loginContainer}>

          <Image
            source={require('./img/closet_icon.png')}
            style={styles.big_icon}
          />
          <TextInput style={styles.textBox} placeholder={"Username"} autoCorrect={false} onChangeText={(text)=>this.setState({username:text})} />
          <Hr lineColor={'#DCDCDC'}/>
          <TextInput style={styles.textBox} placeholder={"Password"} autoCorrect={false} secureTextEntry={true} onChangeText={(text)=>this.setState({password:text})} />
          <Hr lineColor={'#DCDCDC'} />
          <Text>{"\n"}</Text>
          <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={this.handleSubmit.bind(this)}>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonGreen]} onPress={ () => {this.register()} }>
            <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

    )
  }
}

const dummyData = [{imageURL: 'https://s-media-cache-ak0.pinimg.com/736x/33/17/b2/3317b22f936790a6f0eb052f09b5fcd7--cc-fashion-junior-fashion.jpg',
                    user:'pneedle',
                    designTitle: 'Casual Outfit',
                    articles: ['Louis Vouiton Red Tank','Gucci Floral Summer Shorts','Black Gucci Loafers', 'Red Nordstrom Jacket'],
                    dateCreated: 'July 4th',
                    rating: 3.5
                    }]

class UsersScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        designs: [{imageURL: 'https://s-media-cache-ak0.pinimg.com/736x/33/17/b2/3317b22f936790a6f0eb052f09b5fcd7--cc-fashion-junior-fashion.jpg',
                            user:'pneedle',
                            designTitle: 'Casual Outfit',
                            articles: ['Louis Vouiton Red Tank','Gucci Floral Summer Shorts','Black Gucci Loafers', 'Red Nordstrom Jacket'],
                            dateCreated: 'July 4th',
                            rating: 3.5
                            }]
      }
  }
  static navigationOptions = {
   tabBarLabel: 'Designs',
   tabBarIcon: ({ tintColor }) => (
     <Image
       source={require('./img/designs_icon.png')}
       style={[styles.icon, {tintColor: tintColor}]}
     />
   ),
  };
  render(){
    console.log(this.state);
    return(
      <View style={styles.container}>
        <FlatList
          dataSource={this.state.designs}
          renderItem={(rowData) => (
            <View style={styles.containerFull}>
              <TouchableOpacity>
                <Image
                  style={styles.icon}
                  source={{uri: rowData.imageURL}}
                />
                <Text>{rowData.username}</Text>
                <Text>{rowData.rating}</Text>
                <FlatList
                  dataSource={rowData.articles}
                  renderItem={(rowData) => (<Text>{rowData}</Text>
                  )}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    )
  }
}

class MySketchbookScreen extends React.Component {
  constructor(props){
        super(props);
  }
  static navigationOptions = {
   tabBarLabel: 'Sketchbook',
   tabBarIcon: ({ tintColor }) => (
     <Image
       source={require('./img/sketchbook_icon.png')}
       style={[styles.icon, {tintColor: tintColor}]}
     />
   ),
  };
  render(){
    return(
      <View>
        <View style={styles.containerFull}>
          <TouchableOpacity style={styles.item}>
            <Text>To: </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class MyClosetScreen extends React.Component {
  constructor(props){
        super(props);
  }
  static navigationOptions = {
   tabBarLabel: 'Closet',
   tabBarIcon: ({ tintColor }) => (
     <Image
       source={require('./img/hanger_icon.png')}
       style={[styles.icon, {tintColor: tintColor}]}
     />
   ),
  };
  render(){
    return(
      <View>
        <View style={styles.containerFull}>
          <TouchableOpacity style={styles.item}>
            <Text>To: </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class ProfileScreen extends React.Component {
  constructor(props){
        super(props);
  }
  static navigationOptions = {
   tabBarLabel: 'Profile',
   tabBarIcon: ({ tintColor }) => (
     <Image
       source={require('./img/profile_icon.png')}
       style={[styles.icon, {tintColor: tintColor}]}
     />
   ),
  };
  render(){
    return(
      <View>
        <View style={styles.containerFull}>
          <TouchableOpacity style={styles.item}>
            <Text>To: </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const MyApp = TabNavigator({
  Home: {
    screen: UsersScreen,
  },
  Closet: {
    screen: MyClosetScreen,
  },
  Sketchbook: {
    screen: MySketchbookScreen
  },
  Profile: {
    screen: ProfileScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

//Navigator
export default StackNavigator({
  Home: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  User: {
    screen: UsersScreen,
  },
  Tab: {
    screen: MyApp,
    navigationOptions: {
           headerLeft:false,
    }
  }
}, {initialRouteName: 'Home'});


//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginContainer: {
    flex: 1,
    paddingTop: 35,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  map: {
    height: 100,
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  item: {
    borderColor: 'gray',
    borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  textBox: {
    flex: 0,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  textBoxWrong: {
    flex: 0,
    borderColor: 'red',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  topButton: {
    alignSelf: 'stretch',
    paddingTop: 40,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  pwdbutton: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#5FA3F4',
  },
  buttonGreen: {
    backgroundColor: '#8DC93C'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  smallButtonLabel: {
    textAlign: 'center',
    fontSize: 10,
    color: 'black'
  },
  icon: {
   width: 26,
   height: 26,
  },
  big_icon: {
  width: 120,
  height: 120,
  }
});
