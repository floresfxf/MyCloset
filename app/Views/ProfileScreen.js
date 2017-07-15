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
export default class ProfileScreen extends React.Component {
  constructor(props){
        super(props);
        this.state={
          username:"Kevin",
          photo:'https://facebook.github.io/react/img/logo_og.png',
          firstname:"Kevin",
          lastname:"kevin",
          rating:3.2,
          designs:['https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png',
        'https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png',
      'https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png'],
          Closet:['https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png',
        'https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png']
        }
  }
  static navigationOptions = {
   tabBarLabel: 'Profile',
   tabBarIcon: ({ tintColor }) => (
     <Image
         source={require('../img/profile_icon.png')}
       style={[styles.icon, {tintColor: tintColor}]}
     />
   ),
  };
  render(){
    return(
    
        <View style={styles.containerFull}>
          <Text>djdsfjfhdfj</Text>
          <View style={styles.layer1}>
            <Text>djdsfjfhdfj</Text>
            <Image circle={{height: 40, width:40, borderRadius:40}}
              style={{ marginLeft: 20, marginRight:20}}
              source={{uri: this.state.photo}}/>
          </View>


        </View>

    )
  }
}
