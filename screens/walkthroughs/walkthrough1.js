import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkButton
} from 'react-native-ui-kitten';
import {scale, scaleModerate, scaleVertical} from './../../utils/scale';


export class Walkthrough1 extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {


    /*
    let image = RkTheme.current.name === 'light'
      ? <Image source={require('../../assets/images/kittenImage.png')}/>
      : <Image source={require('../../assets/images/kittenImageDark.png')}/>;
    */
    let contentHeight = scaleModerate(275, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;
    let height_sub = height/2;
    let width_sub = width - 40;

    image = <Image style={[styles.image, {height, width}]} source={require('../../assets/images/backgroundLoginV6.png')}/> ;
    image_quality = <Image style={{ resizeMode: 'contain', height: height_sub, width: width_sub }} source={require('../../assets/images/fastDelivery.png')}/> ;
    return (
      <View style={styles.screen}>
        {image}
        <RkText rkType='large' style={styles.text}>bitMe</RkText>
        <Text style={{ color: 'white', fontSize: 25 }}>Peer 2 Peer bitcoin Exchange</Text>
        <Text style={{ color: 'white', fontSize: 15 }}>Send and recieve bitcoins</Text>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  text: {
    marginTop: 20,
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 50
  }
}));
