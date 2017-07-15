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

export default class ClosetsScreen extends React.Component {
  constructor(props){
        super(props);
        this.state = {
        }

  }

  static navigationOptions = {
   tabBarLabel: 'ALLClosets',
   tabBarIcon: ({ tintColor }) => (
     <Image
         source={require('../img/hanger_icon.png')}
       style={[styles.icon,{tintColor: tintColor}]}
     />
   ),
  };

  // renderRow = (item, sectionId, index) => {
  //   const onCheck=()=>{
  //     let newdata=this.state.data;
  //     newdata=newdata.map((dt,index)=>{
  //       if(dt.name===item.name){
  //         dt.checked=!dt.cheked
  //       }
  //       return dt
  //     })
  //    this.setState({data:newdata})
  //
  //   }
  //   return(
  //     <View>
  //       <Text>USER CLOSET 1</Text>
  //       <Text>USER CLOSET 2</Text>
  //       <Text>USER CLOSET 3</Text>
  //     </View>
  //     <View style={{flexDirection:'row', height:100, marginLeft:20, alignContent:'space-around'}}>
  //       <CheckBox
  //         label=''
  //         style={{top:30}}
  //         // unchekedImage={<Image source=require('')/>}
  //         // checkedImage=r{<Image source=require('')/>}
  //         checked={item.checked}
  //         onClick={() => onCheck()}
  //       />
  //     <TouchableHighlight>
  //       <Image
  //         style={{width: 80, height: 80, marginLeft: 20, marginRight:30}}
  //         source={{uri: item.pic}}
  //       />
  //     </TouchableHighlight>
  //     <Text > Style: {item.name} {"\n"} Color: {item.age} {"\n"} Brand: {"\n"} UPC: </Text>
  //
  //   </View>
  // )
  //
  // }

  // onCancel = () => {
  //   var newData= this.state.data.slice();
  //    let nwData=newData.map(dat => {
  //     let newObj=Object.assign({},dat)
  //       newObj.visible=true
  //     return newObj
  //   })
  //   this.setState({data: nwData})
  //
  // }

  // afterDelete = () => {
  //     return new Promise((resolve, reject) => {
  //         //console.log('afterDelete => toggle keyboard');
  //         this.refs.search_bar.focus();
  //         resolve();
  //     });
  // }

  // onSearch = (text) => {
  //
  //         var newData= this.state.data.slice();
  //          let nwData=newData.map(dat => {
  //           let newObj=Object.assign({},dat)
  //           if(dat.name.toLowerCase().search(text.toLowerCase())===-1){
  //             newObj.visible=false
  //
  //           }else{
  //             newObj.visible=true
  //           }
  //           return newObj
  //         })
  //
  //
  //         this.setState({data: nwData})
  //
  // }
// logState () {
//   console.log(this.state)
// }
//   onChangeText = (text) => {
//       return new Promise((resolve, reject) => {
//           console.log('onChangeText', text);
//           })
//           resolve();
//
//   }
  render(){
    return(
      <View style={{ flex: 1}}>
        <Text>This page will let you browse through other users closets to make outfits out of their items!</Text>
        <Text>USER CLOSET 1</Text>
        <Text>USER CLOSET 2</Text>
        <Text>USER CLOSET 3</Text>
        {/* <Search
          ref="search_box"
          onSearch={(text) => this.onSearch(text)}
          onChangeText={this.onChangeText}
          afterDelete={this.afterDelete}
          beforeFocus={this.beforeFocus}
          onFocus={this.onFocus}
          afterFocus={this.afterFocus}
          onCancel={() => {this.logState();this.onCancel();}}
          backgroundColor="blue"
          placeholderTextColor="blue"
          tintColorSearch="blue"
          tintColorDelete="#9a119a"
        />
        <AtoZListView
          data={this.state.data.filter(function(dat){
            return dat.visible
          })
        }
          renderRow={this.renderRow}
          rowHeight={40}
          sectionHeaderHeight={40}
          style={{
                        top: this.atoZAnimated
                    }}
        /> */}
      </View>
    )
  }
}
