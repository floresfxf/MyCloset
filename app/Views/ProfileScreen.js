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
