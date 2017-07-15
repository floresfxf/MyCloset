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
const baseURL = 'https://fringuante-moliere-12742.herokuapp.com';
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

  setData(){
    const styles = ['casual', 'lounge'];
    const items = [
            {type: 'Sweatpants',
            brand: 'H&M',
            image: 'http://lp.hm.com/hmprod?set=key[source],value[/model/2017/E00%200478831%20001%2043%202395.jpg]&set=key[rotate],value[]&set=key[width],value[]&set=key[height],value[]&set=key[x],value[]&set=key[y],value[]&set=key[type],value[STILL_LIFE_FRONT]&set=key[hmver],value[3]&call=url[file:/product/full]',
            description: '',
            gender: 'Mens'
        },
        {type: 'TShirt',
        brand: 'Adidas',
        image: 'http://images.champssports.com/is/image/EBFL2/S23125_fr_sc7_copy?hei=1500&wid=1500',
        description: '',
        gender: 'Unisex'
        },
        {type: 'Sweatshirt',
        brand: 'Polo Ralph Lauren',
        image: 'http://s7d2.scene7.com/is/image/PoloGSI/s7-1242056_lifestyle?$flyout_main$&cropN=0.12,0,0.7993,1&iv=Bm2et1&wid=1410&hei=1770&fit=fit,1',
        description: '',
        gender: 'Unisex'
    }];
    fetch(baseURL + '/new/designs/pam@aol.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'pam@aol.com',
        title: 'designtitle',
        styles: styles,
        rating: 20,
        items: items,
  })
})
.then((response) => response.json())
.then((resp) => {
  console.log(resp);
  Alert.alert('Design Added!', 'Your Design has been added. Navigate to your closet to check it out!')
});

}
render(){
  return(
    <View>
      <View style={styles.containerFull}>
        <TouchableOpacity style={styles.item}
          onPress={() => this.props.navigation.navigate('Import') }>
          <Text>To: </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}
          onPress={this.setData.bind(this) }>
          <Text>FROM: </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

}
