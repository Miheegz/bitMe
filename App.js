import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
// import { Font } from 'expo';


import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { firebaseConfig } from './config/auth';
import { bootstrap } from './config/bootstrap';
import { RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import NavigatorService from './utils/navigator';

// import KittenTheme from './config/theme';

import Welcome_Screen from './screens/Welcome_Screen';
import Register_Screen from './screens/Register_Screen';
import Login_Screen from './screens/Login_Screen';
// import Loading_Screen from './screens/Loading_Screen';
import Menu_Screen from './screens/Menu_Screen';
import Orders_Screen from './screens/Orders_Screen';
// import Location_Screen from './screens/Location_Screen';
import Profile_Screen from './screens/Profile_Screen';
import Reset_Screen from './screens/Reset_Screen';
import Settings_Screen from './screens/Settings_Screen';
import Coinbase_Screen from './screens/Coinbase_Screen';


export default class App extends React.Component {

  //state = { loggedIn: true };

  constructor(props) {
    super(props);
    this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    bootstrap();
  }

  componentWillMount() {
    console.log(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
  }

  render() {

    const MainNavigator = TabNavigator({
      menu_scr: { screen: Menu_Screen },
      orders_screen: { screen: Orders_Screen },
      settings_screen: { screen: Settings_Screen },
    },
    {
      navigationOptions: {
        headerLeft: null,
        headerStyle: {
           backgroundColor: 'white',
           elevation: 2,
           paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10
         },
         headerTitleStyle: {
           fontSize: RkTheme.current.fonts.sizes.h5,
           alignSelf:'center',
           marginBottom: Platform.OS === 'ios' ? 0 : 10,
           marginTop: Platform.OS === 'ios' ? 25: 0
         }
      },
      tabBarOptions: {
        showLabel: false,
        showIcon: true,
        indicatorStyle: { backgroundColor: '#ffffff' },
        activeTintColor: RkTheme.current.colors.accent,
        inactiveTintColor: RkTheme.current.colors.text.hint,
        style: { backgroundColor: '#ffffff' },
      },
      cardStyle: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
      },
      swipeEnabled: false,
      tabBarPosition: 'bottom',
    })

//       loading_scr: { screen: Loading_Screen },

    const LoginNavigator = StackNavigator({
      welcome_screen: { screen: Welcome_Screen },
      register_screen: { screen: Register_Screen },
      reset_screen: { screen: Reset_Screen },
      profile_screen: { screen: Profile_Screen },
      login_screen: { screen: Login_Screen},
      main_screen: { screen: MainNavigator},
      coinbase_screen: { screen: Coinbase_Screen}
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        swipeEnabled: false,
        lazy: true
      });

      return (
        <Provider store={this.store}>
          <View style={styles.container}>
            <LoginNavigator
            ref={navigatorRef => {
              NavigatorService.setContainer(navigatorRef);
            }}/>
          </View>
        </Provider>
      );
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
}));
