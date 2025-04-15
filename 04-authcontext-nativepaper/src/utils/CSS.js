const { StyleSheet } = require("react-native");


const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  card: {
    backgroundColor: 'lightgray',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: 120,
    justifyContent: 'center',
  },

  center: {
    // borderWidth: 1,
    // borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  icon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  }
  
  
});

module.exports = { mainStyle };