export default class DesignsFilter extends React.Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <View style={styles.container}>
          <Image
              source={require('./app/img/closet_icon.png')}
              style={styles.big_icon}
          />
          <Text style={styles.welcome}>Welcome to My Closet</Text>
          <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}> Login Page
              <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
              <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>
      </View>
    )
  }
}
