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
  RefreshControl,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SegmentedControlIOS,
  ListItem
} from 'react-native';
// import { Container, Content, Picker } from 'native-base';
import styles from '../Styles/styles.js';
import DesignsFilterModal from './DesignsFilterModal'
import { StackNavigator, TabNavigator } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SegmentedControlTab from 'react-native-segmented-control-tab';



// const dummyDesigns = [
//     {
//         user: 'kevin123',
//         title: 'designtitle',
//         ratings: 50,
//         style: ['casual', 'lounge'],
//         items: [
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
//     }]
// },
// {
//     user: 'frankie123',
//     title: 'designtitle',
//     ratings: 20,
//     style: ['going out', 'trendy'],
//         items: [
//             {type: 'Jeans',
//             brand: 'Levi',
//             image: '../img/levijeans.jpg',
//             description: '',
//             gender: 'Womens'
//         },
//         {type: 'TShirt',
//         brand: 'Gucci',
//         image: '../img/guccivintageshirt.jpg',
//         description: 'Gucci Vintage Shirt',
//         gender: 'Unisex'
//         },
//         {type: 'Shoes',
//         brand: 'Adidas',
//         image: '../img/adidassneakers.jpg',
//         description: '',
//         gender: 'Unisex'
//     }]
// },
// {
//     user: 'pam123',
//     title: 'designtitle',
//     ratings: 20,
//     style: ['going out', 'trendy'],
//         items: [
//             {type: 'Jeans',
//             brand: 'Levi',
//             image: '../img/levijeans.jpg',
//             description: '',
//             gender: 'Womens'
//         },
//         {type: 'TShirt',
//         brand: 'Gucci',
//         image: '../img/guccivintageshirt.jpg',
//         description: 'Gucci Vintage Shirt',
//         gender: 'Unisex'
//         },
//         {type: 'Shoes',
//         brand: 'Adidas',
//         image: '../img/adidassneakers.jpg',
//         description: '',
//         gender: 'Unisex'
//     }]
// },
// {
//     user: 'someonelse123',
//     ratings: 20,
//     title: 'designtitle',
//     style: ['going out', 'trendy'],
//         items: [
//             {type: 'Jeans',
//             brand: 'Levi',
//             image: '../img/levijeans.jpg',
//             description: '',
//             gender: 'Womens'
//         },
//         {type: 'TShirt',
//         brand: 'Gucci',
//         image: '../img/guccivintageshirt.jpg',
//         description: 'Gucci Vintage Shirt',
//         gender: 'Unisex'
//         },
//         {type: 'Shoes',
//         brand: 'Adidas',
//         image: '../img/adidassneakers.jpg',
//         description: '',
//         gender: 'Unisex'
//     }]
// }
//
// ]

export default class DesignsScreen extends React.Component {
    constructor(props){
          super(props);
        const rowHasChanged = (r1, r2) => {
            console.log("r1, r2", r1, r2);
            if (r1.rating !== r2.rating) return true;
        }
          const ds = new ListView.DataSource({rowHasChanged: rowHasChanged});
          this.state = {
              dataSource: ds.cloneWithRows([]),
              activeTab: 0,
              refreshing: false,
              isModalOpen: false,
              filters: {},
              designs: []
          }
        //   this.getDesigns();
    }
    // static navigationOptions = (props) => ({
    // headerRight: <Button title='Messages' onPress={() => navigation.state.params.onRightPress()}>
    static navigationOptions = ({navigation}) => {
        return {
           title: 'Designs',//title on header
           headerLeft: (<Button title='Filter' onPress={() => navigation.state.params.onRightPress()}><Image source={require('../img/filtericon.png')}/></Button>), //TODO: NEED TO GET FILTER IMAGE AS BUTTON
           tabBarLabel: 'Designs',
     tabBarIcon: ({ tintColor }) => (
       <Image
           source={require('../img/designs_icon.png')}
           style={[styles.icon, {tintColor: tintColor}]}
       />
     ),
 }
    };
    // static navigationOptions = ({navigation}) => {
    //     return {
    //     headerRight: (<Button title='Filter' onPress={()=>navigation.state.params.onRightPress()}/>),
    //     }
    // };
    componentDidMount() {
        this.props.navigation.setParams({
            onRightPress: () => this.toggleFilter()
        })
    }
    // componentDidMount() {
    //     const params = {
    //         right: (
    //             <Button title='Filter' onPress={()=> navigation.state.params.onRightPress()} />
    //         ),
    //     };
    //
    //     this.props.navigation.setParams(params);
    // }
    componentWillMount(){
        this.getDesigns();
    }

    handleIndexChange = (index) => {
        this.setState({...this.state, activeTab: index})
    }
    getDesigns() {
        // alert('get designs called')
        fetch('https://fringuante-moliere-12742.herokuapp.com/all/designs', {
          method: 'GET'
        })
        .then((response) => {
          console.log('response is', response);
            return response.json();
        })
        .then((responseJson) => {
            console.log('responsejson', responseJson);
            let filteredData = this.filterData(responseJson);
          //  if(responseJson.success){
           //
           //
          //     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          //     this.setState({refreshing: false, dataSource: ds.cloneWithRows(filteredData)});
          //  }else{
          //      alert(responseJson.error);
          //      console.log('error in get designs', responseJson.error);
          //      this.setState({refreshing: false});
          //  }

        })
        .catch((err) => {
            // alert(err);
            console.log('caught error in catch of getdesigns', err);
        });
    }

    _onRefresh() {
      console.log('ON REFRESH CALLED');
      this.setState({refreshing: true});
      this.getDesigns();
    }

    onVote(design, direction) {
        console.log(this.state.dataSource);
        fetch('https://fringuante-moliere-12742.herokuapp.com/designs/'+direction+'/'+design._id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then( (response) => {
            console.log(response);
            return response.json()})
        .then( (responseJson) => {
            console.log(responseJson);
            alert('sucessful vote');
            const newDesigns = this.state.designs;
            const indexDesign = newDesigns.indexOf(design);
            design.rating = direction === 'voteup' ? design.rating + 1: design.rating - 1;
            newDesigns[indexDesign] = design;
            const rowHasChanged = (r1, r2) => {
                console.log("r1, r2", r1, r2);
                if (r1.rating !== r2.rating) return true;
            }
              const ds = new ListView.DataSource({rowHasChanged: rowHasChanged});
            // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({dataSource: ds.cloneWithRows(newDesigns), refreshing: false, designs: newDesigns});




            if(responseJson.error){
              alert('upvote falied idk why')
          }
        })
        .catch((err) => {
          console.log('error in vote', err);
          alert('error in vote', err);

        });


    }

    filterData(data) {
        const filters = this.state.filters;
        const newdata = data.filter( (design) => {
            //if the users inputed a username that was larger than 3 characters(any smaler is invalid)

            if(filters['username']){
                return filters['username'] == design.user
            }
            return true
        })
        const rowHasChanged = (r1, r2) => {
            console.log("r1, r2", r1, r2);
            if (r1.rating !== r2.rating) return true;
        }
          const ds = new ListView.DataSource({rowHasChanged: rowHasChanged});
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(newdata), refreshing: false, designs: newdata})

        return this.state.dataSource;
    }

    toggleFilter(){
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    onFilterSubmit(filters) {
        this.setState({ isModalOpen: false, filters: filters});
        console.log('filters submitted YEAAAAAAAAAAAAA', filters);
        this.getDesigns();
        // const newdata = dummyDesigns.filter( (design) => {
        //     //if the users inputed a username that was larger than 3 characters(any smaler is invalid)
        //     let userFilter = true;
        //     if(filters['username'] && filters['username'].length > 4){
        //         userFilter = (filters['username'].toUpperCase() == design.user.toUpperCase());
        //     }
        //     return userFilter
        // })
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.setState({ isModalOpen: false, filters: filters, dataSource: ds.cloneWithRows(newdata) });

    }




  render(){

    return(
        <View>
            {this.state.isModalOpen ? <DesignsFilterModal
                toggleFilter={() => this.toggleFilter()}
                // setFilter= {() => this.setFilter()}
                currentFilters={this.state.filters}
                isModalOpen={this.state.isModalOpen}
                onFilterSubmit={(filters) => this.onFilterSubmit(filters)}
                                      /> : null}

            <SegmentedControlTab
                values = {['All','Recommended']}
                selectedIndex={this.state.activeTab}
                onTabPress={this.handleIndexChange}
            />
            {/* {this.state.activeTab == 0 ? <Text>Hey tab1</Text> : <Text>Hey tab2</Text>} */}
            {/* <Button title='Filter' onPress={() => this.toggleFilter()}><Image source={require('../img/filtericon.png')}/></Button> */}
            <ListView
                //   style={{paddingBottom: 10}}
                //   removeClippedSubviews={true}
                dataSource={this.state.dataSource}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#DCDCDC"
                        titleColor="#DCDCDC"
                        colors={['#DCDCDC', '#DCDCDC', '#DCDCDC']}
                        progressBackgroundColor="#DCDCDC"
                    />}
                renderRow={(rowData, sectionID, rowID) => {
                    return (
                        <View key={rowID} style={{flexDirection: 'column', height: 140, borderBottomWidth: 1, borderColor: 'gray', padding: 2, backgroundColor: 'white'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flexDirection: 'column', height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', padding: 5}}>
                                    <Text style={{color: '#157EFB', fontSize: 20}}>{rowData.rating}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity onPress={this.onVote.bind(this,rowData, 'voteup')}>
                                            <Image style={{width: 25, height: 30, padding: 1}} resizeMode={'contain'} source={require('../img/uparrow.png')} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.onVote.bind(this,rowData, 'votedown')}>
                                            <Image style={{width: 25, height: 30, padding: 1}} resizeMode={'contain'} source={require('../img/downarrow.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{width: 140}}>
                                    <Text style={{fontSize: 20, alignSelf: 'flex-start'}}>{rowData.title}</Text>
                                    <Text style={{fontSize: 11, alignSelf: 'flex-end', paddingRight: 15}}>by: {rowData.user}</Text>

                                    <View style={{overflow: 'hidden', padding: 8, paddingLeft: 15}}>
                                        {rowData.items.map( (item, i) => <Text key={i} style={{fontSize: 12, color:'gray'}}>- {item.type} {item.brand}</Text>)}
                                    </View>

                                </View>
                                <View style={{width: 120, borderWidth: 1, margin: 5}}>
                                    {rowData.items.map( (item, i) => <View key={i} style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1}}><Image resizeMode={'cover'} source={{uri: item.image}} style={{flex: 1}} /></View>)}
                                    </View>

                                </View>
                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                        <Text>style:   </Text>
                                        {rowData.style.map( (stylename, i) => <Text style={{color: 'blue', fontSize: 12}} key={i}>{stylename}  </Text>)}
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
