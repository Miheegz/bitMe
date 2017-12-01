import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';


import { Header } from 'react-navigation';
import { Button } from 'react-native-elements';
import { logoutUser, userDetailsFetch } from '../actions';


import users from './../data/raw/users';
import { Avatar } from './../components';
import { GradientButton } from './../components/';
import { FontAwesome } from './../assets/icons';
import LoadingSpinner from './../components/Loading/LoadingSpinner';



// FontAwesome.cog

class Settings_Screen extends Component {

  // Donot show header
  static navigationOptions = {
    headerTitle: 'Profile Settings',
    tabBarIcon: ({ tintColor }) => (
      <RkText
        rkType='awesome'
        style={{
          color: 'gold',
          fontSize: 24,
          marginBottom: 0,
        }}>
        {FontAwesome.cog}
      </RkText>
    ),
  };

  constructor(props) {
    super(props);
    this.user = users[8];
    console.log(this.user);

    this.state = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
    }
  }

  componentWillMount() {
    this.props.userDetailsFetch();
    console.log('userdetails');
    console.log(this.props.userdetails);
    if (this.props.userdetails) {
      const { myfirstname } = this.props.userdetails;
      this.setState({ firstName: myfirstname });
    }
  }

  render() {
    console.log('userdetails');
    console.log(this.props.userdetails);
    console.log('RkTheme.current.colors.accent = ' + RkTheme.current.colors.acc);
    console.log('RkTheme.current.colors.alterBackground = ' + RkTheme.current.colors.alterBackground);
    if (this.props.userdetails) {
      var { firstname, lastname, email, phone } = this.props.userdetails;
    }
    return (
      <ScrollView style={styles.root}>
        <RkAvoidKeyboard>
          <LoadingSpinner />
          <View style={styles.header}>
            <Avatar img={require('./../data/img/smiley.jpg')} rkType='big' />
          </View>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText style={{ color: 'gold' }} rkType='header6 primary'>INFO</RkText>
            </View>
            <View style={styles.row}>
              <RkTextInput label='First Name'
                backgroundColor='white'
                inputBackgroundColor='white'
              placeholderTextColor='white'
              labelColor= 'white'
    color='white'
                           value={firstname}
              rkType='right clear'
                           onChangeText={(text) => this.setState({ firstName: text })}/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Last Name'
                backgroundColor='white'
                inputBackgroundColor='white'
              placeholderTextColor='white'
              labelColor= 'white'
    color='white'
                           value={lastname}
              onChangeText={(text) => this.setState({ lastName: text })}
              rkType='right clear'/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Email'
                backgroundColor='white'
                inputBackgroundColor='white'
              placeholderTextColor='white'
              labelColor= 'white'
    color='white'
                           value={email}
              onChangeText={(text) => this.setState({ email: text })}
              rkType='right clear'/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Phone'
                backgroundColor='white'
                inputBackgroundColor='white'
              placeholderTextColor='white'
              labelColor= 'white'
    color='white'
                           value={phone}
              onChangeText={(text) => this.setState({ phone: text })}
              rkType='right clear'/>
            </View>

          </View>

          <RkButton
            rkType='large rounded'
            style={styles.button}
            text='Sign Out'
            onPress={() => this.props.logoutUser()}>
            Sign Out
            </RkButton>
        </RkAvoidKeyboard>
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: 'black'
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingTop: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5,
    backgroundColor:'black'
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'gold',
    alignItems: 'center',
    backgroundColor:'white'
  },
  button: {
    marginHorizontal: 100,
    marginBottom: 32,
    backgroundColor: 'gold',
  }
}));

const mapStateToProps = ({ userdata }) => {
  const { userdetails } = userdata;
  return { userdetails };
};

export default connect(mapStateToProps, {
  logoutUser, userDetailsFetch
})(Settings_Screen);
