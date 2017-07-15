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
  Picker,
  Keyboard,
  KeyboardAvoidingView,
  SegmentedControlIOS,
  ListItem
} from 'react-native';
import styles from '../Styles/styles.js';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Modal from 'react-native-modal';
import Rating from 'react-native-ratings';


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


export default class DesignsScreen extends React.Component {
    constructor(props){
          super(props);
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.state = {
              dataSource: ds.cloneWithRows(dummyDesigns),
              activeTab: 0,
              isModalOpen: false,
              filters: {}
          }
    }

    handleIndexChange = (index) => {
        this.setState({...this.state, activeTab: index})
    }

    onUpVote() {
        //fetch to update it
    }
    onDownVote() {
        //fet
    }

    toggleFilter(){
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    onFilterSubmit() {
        this.setState({ isModalOpen: false });
        console.log('filters submitted', this.state.filters);
    }

    setFilter(value, type){
        console.log('filter set', value, type);
        let currentFilters = this.state.filters;
        currentFilters[type] = value;
        this.setState({filters: currentFilters});
    }

    static navigationOptions = {
           title: 'Designs',//title on header
        //    headerRight: <Button title='Filter' onPress={() => toggleFilter()}><Image source={'../img/filtericon.png'}/></Button>, //TODO: NEED TO GET FILTER IMAGE AS BUTTON
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
            <Modal
                style={{ flex: 1, left: 0, top: 0, bottom: 0, height: '100%', width: '60%', backgroundColor: 'white' }}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
                onRequestClose={() => {this.toggleFilter()}}
                isVisible={this.state.isModalOpen}>
                <View>
                    <View>
                        <Text>Designs by:</Text>
                        <TextInput placeholder={"username"}
                            style={styles.textBox}  autoCorrect={false} onChangeText={(text)=>this.setFilter(text,'username')}/>
                    </View>
                    <View>
                        <Text>Rating: (slide to select)</Text>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={35}
                            onFinishRating={(rating) => this.setFilter(rating, 'rating')}
                        />
                    </View>
                    <View>
                        {/* ['All','Winter', 'Spring','Summer','Fall'] */}
                        <Text>Season: </Text>

                    </View>
                    <View>
                        <Text>Gender: </Text>

                    </View>
                    <View>
                        <Text>Style: </Text>

                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={[styles.button, styles.buttonRed, {flex: 1}]} onPress={() => this.toggleFilter()}>
                            <Text style={styles.buttonLabel}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonGreen, {flex: 1}]} onPress={() => this.onFilterSubmit()}>
                            <Text style={styles.buttonLabel}>Filter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <SegmentedControlTab
                values = {['All','Recommended']}
                selectedIndex={this.state.activeTab}
                onTabPress={this.handleIndexChange}
            />
            {/* {this.state.activeTab == 0 ? <Text>Hey tab1</Text> : <Text>Hey tab2</Text>} */}
            <Button title='Filter' onPress={() => this.toggleFilter()}><Image source={'../img/filtericon.png'}/></Button>
            <ListView
                //   style={{paddingBottom: 10}}
                //   removeClippedSubviews={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
                    console.log(rowData);
                    return (
                        <View style={{flexDirection: 'column', height: 140, borderBottomWidth: 1, borderColor: 'gray', padding: 2, backgroundColor: 'white'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flexDirection: 'column', height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', padding: 5}}>
                                    <Text style={{color: '#157EFB', fontSize: 20}}>{rowData.ratings}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity >
                                            <Image style={{width: 25, height: 30, padding: 1}} resizeMode={'contain'} source={require('../img/uparrow.png')} />
                                        </TouchableOpacity>
                                        <TouchableOpacity >
                                            <Image style={{width: 25, height: 30, padding: 1}} resizeMode={'contain'} source={require('../img/downarrow.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{width: 140}}>
                                    <Text style={{fontSize: 20, alignSelf: 'flex-start'}}>{rowData.title}</Text>
                                    <Text style={{fontSize: 11, alignSelf: 'flex-end', paddingRight: 15}}>by: {rowData.user}</Text>

                                    <View style={{overflow: 'hidden', padding: 8, paddingLeft: 15}}>
                                        {rowData.items.map( (item) => <Text style={{fontSize: 12, color:'gray'}}>- {item.type} {item.brand}</Text>)}
                                    </View>

                                </View>
                                <View style={{width: 120, borderWidth: 1, margin: 5}}>
                                    {rowData.items.map( (item) => <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1}}><Image resizeMode={'cover'} source={{uri: item.image}} style={{flex: 1}}/></View>)}
                                </View>

                            </View>
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Text>style:   </Text>
                                    {rowData.style.map( (stylename) => <Text style={{color: 'blue', fontSize: 12}}>{stylename}  </Text>)}
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
