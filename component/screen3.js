import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';

export default class screen3 extends Component {
  static navigationOptions = {
    title: 'Screen3',

    headerStyle: {
      backgroundColor: '#6b52ae',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
    };
  }
  componentDidMount() {
    const postdata = this.props.navigation.getParam('imageUrl');

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({imageUrl: postdata});
  }
  render() {
    return (
      <View>
        <Image
          source={{uri: this.state.imageUrl}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );
  }
}
