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
  ScrollView,
} from 'react-native';
import Stars from 'react-native-stars';
import styles from '../Styles/styles.js';
const baseURL = 'https://fringuante-moliere-12742.herokuapp.com';
export default class ProfileScreen extends React.Component {
  constructor(props){
        super(props);
        this.state={
          username:"Kevin12345",
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

        <View style={styles.containerFull} >
          {/* <TouchableOpacity style={styles.item}
              onPress={() => this.props.navigation.navigate('Import') }>
            <Text>To: </Text>
          </TouchableOpacity> */}
          <View style={{flexDirection:'row',flex:1, marginTop:10}}>
            <Image
              style={{width: 160, height: 160, marginLeft: 10,borderRadius:80, marginRight:15}}
              source={{uri: this.state.photo}}
            />
            <View style={{flexDirection:'column'}}>
              <Text style={{fontSize:35, fontWeight:'bold'}}>{this.state.username}</Text>
                <Text style={{fontSize:15,fontWeight:"5000",left:100}}> {this.state.firstname} {this.state.lastname}</Text>
                  <Text style={{fontSize:20, fontWeight:'bold'}}> Designer Rating: {this.state.rating}</Text>
                  <View style={{alignItems:'center'}}>
                    <Stars
                      value={this.state.rating}
                      spacing={8}
                      count={5}
                      starSize={30}
                      backingColor='cornsilk'
                      fullStar= {require('../img/starFilled.png')}
                      emptyStar= {require('../img/starEmpty.png')}
                      halfStar={require('../img/starHalf.png')}
                     />
                  </View>
                  <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => {} }>
                    <Text style={styles.buttonLabel}>Follow</Text>
                  </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection:'column',flex:1}}>
            <Text style={{fontSize:25, fontWeight:'bold', color:'blue',left:10}}> Designs({this.state.designs.length})</Text>

            <ScrollView
               horizontal={true} >
              {
                this.state.Closet.map(design=>{
                  return(
                    <Image
                      style={{width: 140, height: 100, marginRight:10}}
                      source={{uri: design}}
                    />

                  )
                })
              }
            </ScrollView>
            <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => {} }>
              <Text style={[styles.buttonLabel]}> Match Designs with MyCloset</Text>
            </TouchableOpacity>
              </View>
            <View style={{flexDirection:'column',flex:1}}>
            <Text>  <Text style={{fontSize:25, fontWeight:'bold', color:'blue',left:10}}> Closet</Text>
            <Text style={{fontSize:17, fontWeight:'5000', color:'blue',left:10}}> (Click Items to start building a design)</Text></Text>
              <ScrollView  showsHorizontalScrollIndicator={true}
                 horizontal={true} >
                {
                  this.state.designs.map(design=>{
                    return(
                      <TouchableOpacity  onPress={() => {} }>
                      <Image
                        style={{width: 140, height: 100, marginRight:10}}
                        source={{uri: design}}
                      />
                      </TouchableOpacity>

                    )
                  })
                }
              </ScrollView>
              <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => {} }>
                <Text style={styles.buttonLabel}> Make a Recommendation</Text>
              </TouchableOpacity>

            </View>



        </View>

    )
  }
}
