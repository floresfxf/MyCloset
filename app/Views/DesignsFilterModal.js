import styles from '../Styles/styles.js';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  AsyncStorage,
  FlatList,
  Image,
  ListItem
} from 'react-native';
import Modal from 'react-native-modal';
import Rating from 'react-native-ratings';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


const seasons = [{label: 'All', value: 0 },
    {label: 'Winter', value: 1 },{label: 'Spring', value: 2 },{label: 'Summer', value: 3 },{label: 'Fall', value: 4 }]
const gender =[{label: 'Unisex', value: 0 },
    {label: 'Mens', value: 1 },{label: 'Womens', value: 2 }]

export default class DesignsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: this.props.currentFilters
        }
    }

    setFilter(value, type){
        // console.log('FILTER IS SET TOOOOO', value, type);
        let currentFilters = this.state.filters;
        currentFilters[type] = value;
        this.setState({filters: currentFilters});
    }
  render() {
    return (
    //   <View style={{marginLeft: 0, top: 0, bottom: 0, height: '100%', width: '30%'}}>
          <Modal
              style={{margin: 0, height: '100%', width: '70%', backgroundColor: 'white', padding: 10 }}
              animationIn={'slideInLeft'}
              animationOut={'slideOutLeft'}
              onRequestClose={() => this.props.toggleFilter()}
              isVisible={this.props.isModalOpen}>
              <View style={{alignSelf: 'flex-start', marginBottom: 15}}>
                  <Text style={{fontSize: 22}}>Filter Designs</Text>
                  <TouchableOpacity onPress={() => this.setState({filters: {}})}><Text style={{color: 'blue'}}>Clear</Text></TouchableOpacity>
              </View>
              <View style={{flexDirection: 'column', justifyContent: 'center', borderWidth: 1, borderColor: 'red'}}>

                  <View>
                      <Text>Designs by:</Text>
                      <TextInput
                          placeholder={"username"}
                          value={this.state.filters['username']}
                          style={styles.textBox}
                          autoCorrect={false}
                          onChangeText={(text)=> this.setFilter(text,'username')}/>
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
                  <View>
                      <Text>Season: </Text>
                      <RadioForm
                          radio_props={[{label: 'All', value: 0 },
                              {label: 'Winter', value: 1 },{label: 'Spring', value: 2 },{label: 'Summer', value: 3 },{label: 'Fall', value: 4 }]}
                          initial={0}
                          buttonSize={10}
                          onPress={(value) => this.setFilter(seasons[value].label,'season')}
                      />
                  </View>
                  <View>
                      <Text>Gender: </Text>
                      <RadioForm
                          radio_props={[{label: 'Unisex', value: 0 },
                              {label: 'Mens', value: 1 },{label: 'Womens', value: 2 }]}
                          initial={0}
                          buttonSize={10}
                          onPress={(value) => this.setFilter(seasons[value].label,'season')}
                      />
                  </View>
                  <View>
                      <Text>Style: </Text>

                  </View>

              </View>
              <View style={{paddingTop: 30, alignSelf: 'flex-end', flexDirection: 'row'}}>
                  <TouchableOpacity style={[styles.button, styles.buttonRed, {flex: 1}]} onPress={() => this.props.toggleFilter()}>
                      <Text style={styles.buttonLabel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.buttonGreen, {flex: 1}]} onPress={() => this.props.onFilterSubmit(this.state.filters)}>
                      <Text style={styles.buttonLabel}>Filter</Text>
                  </TouchableOpacity>
              </View>
          </Modal>
    //   </View>
    )
  }
}
