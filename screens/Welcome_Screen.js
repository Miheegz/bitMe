import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';

import {RkStyleSheet, RkButton} from 'react-native-ui-kitten';
import {GradientButton} from './../components/';
import {Walkthrough} from './../components/walkthrough';
import {Walkthrough1} from './walkthroughs/walkthrough1';
import {Walkthrough2} from './walkthroughs/walkthrough2';
import {Walkthrough3} from './walkthroughs/walkthrough3';
import {PaginationIndicator} from './../components';
import { loginStatusChanged, authStateChanged, fontLoadedChanged } from '../actions';
import AppSpinner from './../components/Loading/AppSpinner';
import NavigatorService from './../utils/navigator';
import ErrorMessage from './../components/ErrorMessage';
import loadAssetsAsync from './../utils/loadFonts';

class Welcome_Screen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {index: 0};
  }

  componentDidMount() {
      console.log('---------------------------');
      console.log('component did mount');
      console.log('loadAssetAsync');
      if ( !this.props.fontLoaded ) {
        // this._loadAssetsAsync();
        loadAssetsAsync();
        console.log('All fonts loaded !');
        this.props.fontLoadedChanged(true);
        // note that the authStateChanged is only called
        // initally when the fonts are loaded
        console.log('authstatechanged');
        this.props.authStateChanged();
    }
  }

  /*
  cacheFonts(fonts) {
    return (fonts.map(font => Font.loadAsync(font)));
  }

  async _loadAssetsAsync() {

    const fontAssets = this.cacheFonts([
      {'fontawesome': require('./../assets/fonts/fontawesome.ttf')},
      {'icomoon': require('./../assets/fonts/icomoon.ttf')},
      {'Righteous-Regular': require('./../assets/fonts/Righteous-Regular.ttf')},
      {'Roboto-Bold': require('./../assets/fonts/Roboto-Bold.ttf')},
      {'Roboto-Light': require('./../assets/fonts/Roboto-Light.ttf')},
      {'Roboto-Medium': require('./../assets/fonts/Roboto-Medium.ttf')},
      {'Roboto-Regular': require('./../assets/fonts/Roboto-Regular.ttf')},
    ]);

    await Promise.all(fontAssets);
    console.log('All fonts loaded !');
    this.props.fontLoadedChanged(true);
  }

  */

  changeIndex(index) {
    this.setState({index})
  }

  render() {
    console.log('WalkthroughScreen:Line 30: Rendering WalkthroughScreen');
    if ( this.props.loginStatus == 'initial' || !this.props.fontLoaded ) {
        return ( <AppSpinner /> );
    }
    return (
      <View style={styles.screen}>
        <ErrorMessage />
          <Walkthrough1/>
        <RkButton
          rkType='rounded large'
          style={styles.button}
          constentStyle={styles.content}
          onPress={() => {
            NavigatorService.reset('profile_screen');
            // this.props.navigation.navigate('profile_screen');
          }}>GET STARTED</RkButton>
      </View>
    )
  }
}


const mapStateToProps = ({ auth }) => {
  const { loginStatus, fontLoaded } = auth;
  return { loginStatus, fontLoaded };
};

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: 'black',
    paddingVertical: 0,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    marginBottom: 25,
    backgroundColor: 'gold'
  },
  content: {
    color: 'gold'
  },
}));

export default connect( mapStateToProps , {
  loginStatusChanged, authStateChanged, fontLoadedChanged
})(Welcome_Screen);
