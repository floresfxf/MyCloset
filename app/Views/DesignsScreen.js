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
  SegmentedControlIOS,
  ListItem
} from 'react-native';
import styles from '../Styles/styles.js';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SegmentedControlTab from 'react-native-segmented-control-tab'


const dummyDesigns = [
    {
        user: 'kevin123',
        title: 'designtitle',
        ratings: 50,
        style: ['casual', 'lounge'],
        items: [
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
    }]
},
{
    user: 'frankie123',
    title: 'designtitle',
    ratings: 20,
    style: ['going out', 'trendy'],
        items: [
            {type: 'Jeans',
            brand: 'Levi',
            image: '../img/levijeans.jpg',
            description: '',
            gender: 'Womens'
        },
        {type: 'TShirt',
        brand: 'Gucci',
        image: '../img/guccivintageshirt.jpg',
        description: 'Gucci Vintage Shirt',
        gender: 'Unisex'
        },
        {type: 'Shoes',
        brand: 'Adidas',
        image: '../img/adidassneakers.jpg',
        description: '',
        gender: 'Unisex'
    }]
},
{
    user: 'pam123',
    title: 'designtitle',
    ratings: 20,
    style: ['going out', 'trendy'],
        items: [
            {type: 'Jeans',
            brand: 'Levi',
            image: '../img/levijeans.jpg',
            description: '',
            gender: 'Womens'
        },
        {type: 'TShirt',
        brand: 'Gucci',
        image: '../img/guccivintageshirt.jpg',
        description: 'Gucci Vintage Shirt',
        gender: 'Unisex'
        },
        {type: 'Shoes',
        brand: 'Adidas',
        image: '../img/adidassneakers.jpg',
        description: '',
        gender: 'Unisex'
    }]
},
{
    user: 'someonelse123',
    ratings: 20,
    title: 'designtitle',
    style: ['going out', 'trendy'],
        items: [
            {type: 'Jeans',
            brand: 'Levi',
            image: '../img/levijeans.jpg',
            description: '',
            gender: 'Womens'
        },
        {type: 'TShirt',
        brand: 'Gucci',
        image: '../img/guccivintageshirt.jpg',
        description: 'Gucci Vintage Shirt',
        gender: 'Unisex'
        },
        {type: 'Shoes',
        brand: 'Adidas',
        image: '../img/adidassneakers.jpg',
        description: '',
        gender: 'Unisex'
    }]
}

]

// class DesignTabs extends React.Component {
//   constructor(props){
//         super(props);
//         // console.log('designtabs props', this.props);
//         state = {
//           activeTab: 0
//         }
//   }
//
//   render({ children } = this.props) {
//     //   console.log(this.state);
//     return (
//       <View style={styles.container}>
//           {/* <View style={styles.tabsContainer}>
//           {/* Pull props out of children, and pull title out of props */}
//           {children.map(({ props: { title } }, index) =>
//               <TouchableOpacity
//                   style={[
//                           // Default style for every tab
//                           // Merge default style with styles.tabContainerActive for active tab
//                           styles.tabContainer,
//                       index === this.state.activeTab ? styles.tabContainerActive : []
//                   ]}
//                   // Change active tab
//                   onPress={() => this.setState({ activeTab: index }) }
//                   // Required key prop for components generated returned by map iterator
//                   key={index}
//               >
//                   <Text style={styles.tabText}>
//                       {title}
//                   </Text>
//               </TouchableOpacity>
//           )}
//       </View>
//           {/* Content */}
//           <View style={styles.contentContainer}>
//               {children[this.state.activeTab]}
//           </View> */}
//       </View>
//     );
//   }
// }
const DesignRow = (props) => (
    <View>
        <TouchableOpacity>
            <Text>{this.props.user}</Text>
            <Text>{this.props.rating}</Text>
            {/* <Image source={{ uri: props.picture.large}} style={styles.photo} /> */}
            <View>
                {this.props.items.map( (item) => <Text>{item.type} {item.brand}</Text>)}
            </View>
        </TouchableOpacity>
    </View>
)

export default class DesignsScreen extends React.Component {
    constructor(props){
          super(props);
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.state = {
              dataSource: ds.cloneWithRows(dummyDesigns),
              activeTab: 0
          }
    }

    handleIndexChange = (index) => {
        this.setState({...this.state, activeTab: index})
    }

    onUpVote() {

    }
    onDownVote() {

    }
    static navigationOptions = {
           title: 'Designs',//title on header
           tabBarLabel: 'Designs',
     tabBarIcon: ({ tintColor }) => (
       <Image
           source={require('../img/designs_icon.png')}
           style={[styles.icon, {tintColor: tintColor}]}
       />
     ),
    };
  render(){
    return(
        <View>
            <SegmentedControlTab
                // tabsContainerStyle={styles.designTabContainer}
                // tabStyle={styles.tabStyle}
                // tabTextStyle={styles.tabTextStyle}
                // activeTabStyle={styles.activeTabStyle}
                // activeTabTextStyle={styles.activeTabTextStyle}
                values = {['All','Recommended']}
                selectedIndex={this.state.activeTab}
                onTabPress={this.handleIndexChange}
            />
            {/* {this.state.activeTab == 0 ? <Text>Hey tab1</Text> : <Text>Hey tab2</Text>} */}
            <ListView
                //   style={{paddingBottom: 10}}
                //   removeClippedSubviews={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
                    console.log(rowData);
                    return (
                        <View style={{flexDirection: 'column', height: 140, borderBottomWidth: 1, borderColor: 'gray', padding: 2}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flexDirection: 'column', height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', padding: 5}}>
                                    <Text style={{color: '#157EFB', fontSize: 20}}>{rowData.ratings}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity ><Image style={{width: 25, height: 30, padding: 1}} resizeMode={'contain'} source={require('../img/uparrow.png')} /></TouchableOpacity>
                                        <TouchableOpacity ><Image style={{width: 25, height: 30, padding: 1}} resizeMode={'contain'} source={require('../img/downarrow.png')} /></TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{width: 140}}>
                                    <Text style={{fontSize: 20, alignSelf: 'flex-start'}}>{rowData.title}</Text>
                                    <Text style={{fontSize: 11, alignSelf: 'flex-end', paddingRight: 15}}>by: {rowData.user}</Text>
                                    <View style={{overflow: 'hidden', padding: 5}}>
                                        {rowData.items.map( (item) => <Text style={{fontSize: 11}}>{item.type} {item.brand}</Text>)}
                                    </View>

                                </View>
                                <View style={{width: 130, borderWidth: 1, borderColor: 'pink'}}>
                                    {rowData.items.map( (item) => <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: 'pink'}}><Image resizeMode={'stretch'} source={{uri: item.image}} style={{flex: 1}}/></View>)}
                                </View>

                            </View>
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Text>style tags:</Text>
                                    {rowData.style.map( (stylename) => <Text style={{color: 'blue'}}>{stylename}</Text>)}
                                </View>
                            </View>
                        </View>
                    )
                }}
                    // <DesignRow {...rowData}
                    //     // user={rowData.user}
                    //     // ratings={rowData.ratings}
                    //     // items={rowData.items}
                    // />

            />
        </View>
    )
  }
}
