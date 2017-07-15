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
//   setData(){
//     const styles = ['casual', 'lounge'];
//     const items = [
//             {type: 'Sweatpants',
//             brand: 'H&M',
//             image: 'http://lp.hm.com/hmprod?set=key[source],value[/model/2017/E00%200478831%20001%2043%202395.jpg]&set=key[rotate],value[]&set=key[width],value[]&set=key[height],value[]&set=key[x],value[]&set=key[y],value[]&set=key[type],value[STILL_LIFE_FRONT]&set=key[hmver],value[3]&call=url[file:/product/full]',
//             description: '',
//             gender: 'Mens'
//         },
//         {type: 'TShirt',
//         brand: 'Adidas',
//         image: 'http://images.champssports.com/is/image/EBFL2/S23125_fr_sc7_copy?hei=1500&wid=1500',
//         description: '',
//         gender: 'Unisex'
//         },
//         {type: 'Sweatshirt',
//         brand: 'Polo Ralph Lauren',
//         image: 'http://s7d2.scene7.com/is/image/PoloGSI/s7-1242056_lifestyle?$flyout_main$&cropN=0.12,0,0.7993,1&iv=Bm2et1&wid=1410&hei=1770&fit=fit,1',
//         description: '',
//         gender: 'Unisex'
//     }];
//     fetch(baseURL + '/new/designs/pam@aol.com', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user: 'pam@aol.com',
//         title: 'designtitle',
//         styles: styles,
//         rating: 20,
//         items: items,
//   })
// })
// .then((response) => response.json())
// .then((resp) => {
//   console.log(resp);
//   Alert.alert('Design Added!', 'Your Design has been added. Navigate to your closet to check it out!')
// });
//
// }

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

}
