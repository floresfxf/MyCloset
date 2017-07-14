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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class MyClosetScreen extends React.Component {
  constructor(props){
        super(props);
  }
  static navigationOptions = {
   tabBarLabel: 'Closet',
   tabBarIcon: ({ tintColor }) => (
     <Image
         source={require('../img/hanger_icon.png')}
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
