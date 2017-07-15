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
import NewDesignScreen from './NewDesignScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class MySketchbookScreen extends React.Component {
  constructor(props){
        super(props);
  }
  static navigationOptions = {
    title: 'My Sketchbook',
   tabBarLabel: 'Sketchbook',
   tabBarIcon: ({ tintColor }) => (
     <Image
         source={require('../img/sketchbook_icon.png')}
       style={[styles.icon, {tintColor: tintColor}]}
     />
   ),
  };
  render(){
    return(
      <View>
        <View style={styles.containerFull}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NewDesign')}
            style={[styles.button, styles.buttonBlue]}>
            <Text>Create a new design</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
