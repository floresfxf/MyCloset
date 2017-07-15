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
import ClosetsScreen from './ClosetsScreen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class NewDesignScreen extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          items: []
        }
  }
  static navigationOptions = {
     title: 'New Design'
  };
  render(){
    return(
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}>
            <Text style={styles.buttonLabel}>Add Item from Your Closet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}>
            <Text style={styles.buttonLabel}>Add Item from Our Catalog</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AllClosets')}
            style={[styles.button, styles.buttonRed]}>
            <Text style={styles.buttonLabel}>Browse other users' closets! (IMPORTANT TO IMPLEMENT)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonGreen, {marginTop: 150}]}>
            <Text style={styles.buttonLabel}>Save</Text>
          </TouchableOpacity>
        </View>
    )
  }
}
