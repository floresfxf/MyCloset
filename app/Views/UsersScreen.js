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

import styles from '../Styles/styles.js';
const j = new Date() //Used to test printing the date (for date created)

export default class UsersScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = { //Using dummy data for now, this is where we link to API and DB
        designs: [{imageURL: 'https://s-media-cache-ak0.pinimg.com/736x/33/17/b2/3317b22f936790a6f0eb052f09b5fcd7--cc-fashion-junior-fashion.jpg',
                            user:'pneedle',
                            designTitle: 'Casual Outfit',
                            articles: ['Louis Vouiton Red Tank','Gucci Floral Summer Shorts','Black Gucci Loafers', 'Red Nordstrom Jacket'],
                            dateCreated: j.toString(), //Cant have objects as children of react parents
                            rating: 3.5
                            }]
      }
  }
  static navigationOptions = {
   title: 'My Closet',//title on header
   tabBarLabel: 'Designs',//title on tab bar
   tabBarIcon: ({ tintColor }) => ( //Assign the tint color AKA color when active
     <Image
         source={require('../img/closet_icon.png')}
       style={[styles.icon, {tintColor: tintColor}]}
     />
   ),
  };
  render(){
    console.log(this.state.designs);
    return(
      <View style={styles.container}>
          <FlatList
              data={this.state.designs}
              keyExtractor={(item) => item.id} //Used to assign unique keys to list items to speed up rendering
              renderItem={({item}) => (
                  <View style={styles.containerFull}>
                      <TouchableOpacity style={styles.textBox}>
                          <Image
                              source={{uri: item.imageURL}}
                              style={styles.icon}
                          />
                          <Text>{item.designTitle}</Text>
                          <Text>{item.dateCreated}</Text>
                          <Text>{item.user}</Text>
                          {item.articles.map((item)=><Text>{item}</Text>)}
                          {/* <FlatList
                              data={item.articles}
                              keyExtractor={(items) => items.id}
                              renderItem={({items}) => (<Text style={styles.textBox}>{items}</Text>
                              )}
                /> */}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    )
  }
}
