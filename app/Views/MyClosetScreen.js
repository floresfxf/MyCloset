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
  TouchableHighlight
} from 'react-native';
import styles from '../Styles/styles.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
import CheckBox from 'react-native-check-box';

const dummyData = [
            {type: 'Jeans',
            brand: 'Levis',
            color: 'Denim',
            image: 'http://lsco.scene7.com/is/image/lsco/2016H2_501_LP_LVC_1890?$full-jpeg$&fmt=pjpeg',
            description: 'A dark and light denim pair of jeans',
            gender: 'Mens',
            upc: 850384958574
        },
        {type: 'TShirt',
        brand: 'Gucci',
        color: 'White',
        image: 'https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=195545272',
        description: 'Gucci Vintage Shirt',
        gender: 'Unisex',
        upc: 857395057395
        },
        {type: 'Shoes',
        brand: 'Adidas',
        image: 'https://newsneakernews-wpengine.netdna-ssl.com/wp-content/uploads/2017/02/adidas-yeezy-boost-350-v2-zebra-cp9654-323x215.jpg',
        description: 'Limited supply shoes Yeezys designed by Kanye West',
        gender: 'Unisex',
        upc: 520475869783
      },
      {type: 'Shorts',
      brand: 'Lacoste',
      color: 'Orange',
      image: 'https://cdnd.lystit.com/photos/2013/04/05/lacoste-light-blue-classic-bermuda-shorts-product-8-7652994-850194237.jpeg',
      description: 'Lacoste Mens Summer Shorts',
      gender: 'Mens',
      upc: 748596079685
      },
      {type: 'Shirt',
      brand: 'Hanes',
      color: 'Green',
      image: 'https://www.customink.com/mms/images/catalog/6645e01d81e03f30876e896dfa8d6dba/styles/171300/catalog_detail_image_large.jpg',
      description: 'Lacoste Mens Summer Shorts',
      gender: 'Mens',
      upc: 758473948576
      },
  ]

export default class MyClosetScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: dummyData,
      // [
      //   {
      //     name: "Anh Tuan Nguyen",
      //     pic: 'https://facebook.github.io/react/img/logo_og.png',
      //     age: 28,
      //     checked: false,
      //     visible:true,
      //   },
      //   {
      //     name: "An Nhien",
      //     pic: 'https://facebook.github.io/react/img/logo_og.png',
      //     age: 20,
      //     checked:false,
      //     visible:true,
      //   },
      //
      //   {
      //     name: "Zue Dang",
      //     pic: 'https://facebook.github.io/react/img/logo_og.png',
      //     age: 22,
      //     checked:false,
      //     visible:true,
      //   },
      //   {
      //     name: "Zoom Jane",
      //     pic : 'https://facebook.github.io/react/img/logo_og.png',
      //     age: 30,
      //     checked:false,
      //     visible:true,
      //   },
      // ]
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Closet',
    headerLeft: false,
    title: 'My Closet',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/hanger_icon.png')}
        style={[styles.icon,{tintColor: tintColor}]}
      />
    ),
  };
  componentDidMount(){
    const self = this;
    console.log('Mount');
    let user;
    AsyncStorage.getItem('user')
    .then(result => {
      if (result){
        console.log(result);
        var parsedResult = JSON.parse(result);
        user = parsedResult.username;
        console.log(user);
      }

      fetch('https://fringuante-moliere-12742.herokuapp.com' + '/all/items/' + user, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        // console.log([...responseJson]);
        this.setState({ data: responseJson})
      })
      .catch((err) => {
        // alert(err);
        console.log('caught error in catch of getdesigns', err);
      });
    })
  }

  onCancel = () => {
    var newData= this.state.data.slice();
    let nwData=newData.map(dat => {
      let newObj=Object.assign({},dat)
      newObj.visible=true
      return newObj
    })
    this.setState({data: nwData})

  }

  afterDelete = () => {
    return new Promise((resolve, reject) => {
      //console.log('afterDelete => toggle keyboard');
      this.refs.search_bar.focus();
      resolve();
    });
  }

  onSearch = (text) => {
    var newData= this.state.data.slice();
    let nwData=newData.map(dat => {
      let newObj=Object.assign({},dat)
      if(dat.name.toLowerCase().search(text.toLowerCase())===-1){
        newObj.visible=false

      }else{
        newObj.visible=true
      }
      return newObj
    })
    this.setState({data: nwData})

  }

  onChangeText = (text) => {
    return new Promise((resolve, reject) => {
      console.log('onChangeText', text);
    })
    resolve();

  }
  renderRow = (item, sectionId, index) => {
    console.log(item);
    const onCheck=()=>{
      let newdata=this.state.data;
      newdata=newdata.map((dt,index)=>{
        if(dt.name===item.name){
          dt.checked=!dt.cheked
        }
        return dt
      })
      this.setState({data:newdata})

    }
    return(
      <View style={{flexDirection:'row', height:100, marginLeft:20, alignContent:'space-around'}}>
        <CheckBox
          label=''
          style={{top:30}}
          // unchekedImage={<Image source=require('')/>}
          // checkedImage=r{<Image source=require('')/>}
          checked={item.checked}
          onClick={() => onCheck()}
        />
        <TouchableHighlight>
          <Image
            style={{width: 80, height: 80, marginLeft: 20, marginRight:30}}
            source={{uri: item.image}}
          />
        </TouchableHighlight>
        <Text > Type: {item.type} {"\n"} Color: {item.color} {"\n"} Brand: {item.brand} {"\n"} UPC:{item.upc} </Text>

      </View>
    )
  }
  // renderRow = (item, sectionId, index) => {
  //   console.log(item);
  //   return (
  //     <TouchableHighlight
  //       style={{
  //         height: 40,
  //         justifyContent: 'center',
  //         alignItems: 'center'}}
  //     >
  //       <Text>{item.name}</Text>
  //     </TouchableHighlight>
  //   );
  // }
  render(){
    console.log(this.state);
    return(
      <View style={{ flex: 1}}>
        <Search
          ref="search_box"
          onSearch={(text) => this.onSearch(text)}
          onChangeText={this.onChangeText}
          afterDelete={this.afterDelete}
          beforeFocus={this.beforeFocus}
          onFocus={this.onFocus}
          afterFocus={this.afterFocus}
          onCancel={() => {this.onCancel()}}
          backgroundColor="#EEEEF2"
          placeholderTextColor='#5FA3F4'
          tintColorSearch='#5FA3F4'
          tintColorDelete="#9a119a"
        />
        <AtoZListView
        //   data={this.state.data.filter(function(dat){
        //     if (dat.visible){
        //       return dat
        //     }
        //   })
        // }
        data={this.state.data}
        renderRow={this.renderRow}

        style={{
          top: this.atoZAnimated
        }}
      />
    </View>
  )
}
}
