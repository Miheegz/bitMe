import  { Component } from 'react';
import { View, Text, DeviceEventEmitter, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
var React = require('react-native');
var CoinbaseApi = require('coinbase-api');

class Coinbase_Screen extends Component {

  // Donot show header
  static navigationOptions = {
    tabBarVisible: false, // to hide the bottom tab bar
    headerTitle: 'Login to Coinbase'
  };
    componentWillMount() {
      DeviceEventEmitter.addListener('CoinbaseOAuthComplete', function(result) {
        console.log(result);
      });
    }

    signIn() {
      var { clientId, clientSecret } = require('./../config/auth/coinbase_info_real.js');
      CoinbaseApi.startAuthentication(clientId, clientSecret);
    }

    render() {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight onPress={this.signIn}>
            <View style={{padding: 10, backgroundColor: '#cccccc'}}>
              <Text style={{fontSize: 15}}>Sign in to Coinbase</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }


const styles = {
  buttonContainer: {
    position: 'relative'
  }
}

export default Coinbase_Screen;
