import styles from '../Styles/styles.js';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ListView,
  Alert,
  Button,
  AsyncStorage,
  FlatList,
  Image,
  ListItem,
  Picker
} from 'react-native';
import Modal from 'react-native-modal';
import Rating from 'react-native-ratings';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ModalPicker from 'react-native-modal-picker';
import CheckBox from 'react-native-check-box';

const seasons = [{label: 'All', value: 0 },
    {label: 'Winter', value: 1 },{label: 'Spring', value: 2 },{label: 'Summer', value: 3 },{label: 'Fall', value: 4 }]
const gender =[{label: 'Unisex', value: 0 },
    {label: 'Mens', value: 1 },{label: 'Womens', value: 2 }]
    const clothingStyles = [{name: 'Formal', checked: false,},
    {name: 'Edgy', checked: false,},
    {name: 'Casual', checked: false,},
{name: 'Athletic', checked: false,},
{name: 'Going Out', checked: false,},
{name: 'Conservative', checked: false,},
{name: 'Lounge', checked: false,},
{name: 'Trendy', checked: false,},
{name: 'Fun', checked: false,},
{name: 'Daytime', checked: false,},
{name: 'Business', checked: false,}
]

export default class DesignsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: this.props.currentFilters,
            username: '',
            seasonValue: '',
            genderValue: '',
            allStyles: clothingStyles,
        }
    }

    setFilter(value){
        this.setState({username: value});
    }
    onClick(data, index) {
       data.checked = !data.checked;
       const newStyles = this.state.allStyles;
       newStyles[index] = data;
       this.setState({
           allStyles: newStyles
       })
   }
   onSubmit(){
       const styleFilters = this.state.allStyles.filter((item)=>{
           if (item.checked){
               return item.name;
           }
       })
       const newFilters = Object.assign({}, this.state.filters, this.state.username.length > 0 && {username:this.state.username},
       this.state.seasonValue.length > 0 && {season:this.state.seasonValue}, this.state.genderValue.length > 0 && {gender:this.state.genderValue},  styleFilters.length>0 && {styles:styleFilters});
       this.props.onFilterSubmit(newFilters)
       this.setState({filters: newFilters})

   }
  render() {
      let index = 0;
      let index2 = 0;
        const genderData = [
            { key: index++, section: true, label: 'Gender' },
            { key: index++, label: 'Male' },
            { key: index++, label: 'Female' },
            { key: index++, label: 'Unisex' },
        ];
        const seasonData = [
            { key: index2++, section: true, label: 'Season' },
            { key: index2++, label: 'Winter' },
            { key: index2++, label: 'Spring' },
            { key: index2++, label: 'Summer' },
            { key: index2++, label: 'Fall' },
        ];
    return (
    //   <View style={{marginLeft: 0, top: 0, bottom: 0, height: '100%', width: '30%'}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal
            style={{margin: 0, height: '100%', width: '100%', backgroundColor: 'white', padding: 10 }}
            animationIn={'slideInLeft'}
            animationOut={'slideOutLeft'}
            onRequestClose={() => this.props.toggleFilter()}
            isVisible={this.props.isModalOpen}>
            <View style={{alignSelf: 'center', marginBottom: 15}}>
                <Text style={{fontSize: 22, paddingTop: 5, }}>Filter Designs</Text>
                <TouchableOpacity onPress={() => this.setState({filters: {}})}><Text style={{color: 'blue', alignSelf:'center'}}>Clear</Text></TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center', }}>

                <View style={{paddingBottom:5}}>
                    <Text style={{fontWeight: 'bold',paddingBottom: 7}}>Designs by:</Text>
                    <TextInput
                        placeholder={"username"}
                        value={this.state.filters['username']}
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                        autoCorrect={false}
                        onChangeText={(text)=> this.setFilter(text)}/>
                </View>
                {/* <View>
                      <Text>Rating: (slide to select)</Text>
                      <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={35}
                    onFinishRating={(rating) => this.setFilter(rating, 'rating')}
                      />
                </View> */}
                <View style={{paddingBottom:5}}>
                    <Text style={{fontWeight: 'bold', paddingBottom: 7}}>Season: </Text>
                    {/* <RadioForm
                        radio_props={[{label: 'All', value: 0 },
                            {label: 'Winter', value: 1 },{label: 'Spring', value: 2 },{label: 'Summer', value: 3 },{label: 'Fall', value: 4 }]}
                        initial={0}
                        buttonSize={10}
                        onPress={(value) => this.setFilter(seasons[value].label,'season')}
                    /> */}
                    <ModalPicker
                        data={seasonData}
                        initValue="Select a Season..."
                        onChange={(option)=>{ this.setState({seasonValue:option.label})}}>

                        <TextInput
                            style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                            editable={false}
                            placeholder="Select a Season..."
                            value={this.state.seasonValue} />

                    </ModalPicker>
                </View>
                <View style={{paddingBottom:5}}>
                    <Text style={{fontWeight: 'bold', paddingBottom: 7}}>Gender: </Text>
                    {/* <RadioForm
                        radio_props={[{label: 'Unisex', value: 0 },
                            {label: 'Mens', value: 1 },{label: 'Womens', value: 2 }]}
                        initial={0}
                        buttonSize={10}
                        onPress={(value) => this.setFilter(seasons[value].label,'season')}
                    /> */}
                    <ModalPicker
                        data={genderData}
                        initValue="Select your preferred gender.."
                        onChange={(option)=>{ this.setState({genderValue:option.label})}}>

                        <TextInput
                            style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                            editable={false}
                            placeholder="Select your preferred gender.."
                            value={this.state.genderValue} />

                    </ModalPicker>

                </View>
                <View style={{paddingBottom:5}}>
                    <Text style={{fontWeight: 'bold', paddingBottom: 5}}>Style:</Text>
                    {clothingStyles.map((item, i)=> <CheckBox
                        key={i}
                        style={{flex: 1, padding: 10}}
                        onClick={this.onClick.bind(this,item,i)}
                        isChecked={item.checked}
                        leftText={item.name} />
                    )}

                </View>

            </View>
            <View style={{paddingTop: 5, alignSelf: 'flex-end', flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.button, styles.buttonRed, {flex: 1}]} onPress={() => this.props.toggleFilter()}>
                    <Text style={styles.buttonLabel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonGreen, {flex: 1}]} onPress={() => this.onSubmit()}>
                    <Text style={styles.buttonLabel}>Filter</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </TouchableWithoutFeedback>
    //   </View>
    )
  }
}
