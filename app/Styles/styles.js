import { StyleSheet } from 'react-native';

//Styles
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginContainer: {
    flex: 1,
    paddingTop: 35,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  layer1:{
    flexDirection: 'row',
    flex:1,
    width: 80,
    height: 80,
  },
  map: {
    height: 100,
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  item: {
    borderColor: 'gray',
    borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  textBox: {
    flex: 0,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  textBoxWrong: {
    flex: 0,
    borderColor: 'red',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  topButton: {
    alignSelf: 'stretch',
    paddingTop: 40,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  pwdbutton: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#5FA3F4',
  },
  buttonGreen: {
    backgroundColor: '#8DC93C'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  smallButtonLabel: {
    textAlign: 'center',
    fontSize: 10,
    color: 'black'
  },
  icon: {
   width: 26,
   height: 26,
  },
  big_icon: {
  width: 120,
  height: 120,
},
searchBar: {
  paddingLeft: 30,
  fontSize: 22,
  height: 10,
  flex: .1,
  borderWidth: 9,
  borderColor: '#E4E4E4',
},
});
