/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import styles from '../component/styles/screen1';
import {Icon, Card, Button, Header, ListItem} from 'react-native-elements';
import images from './images/imges';

export default class home extends Component {
  static navigationOptions = {
    title: 'Screen1',
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
      resources: [],
      responseImage: [],
      resresh: false,
      visibleLoader: true,
      errorProp: '',
    };
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this._navigateToScreen2(item)}>
      <ListItem
        title={item.title}
        leftAvatar={{
          source: images.document,
        }}
      />
    </TouchableOpacity>
  );

  async componentDidMount() {
    this.getApiData();
    this.getImageData();
  }

  async getApiData() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const responseJson = await response.json();
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({resources: responseJson});
    } catch (error) {
      console.log(error);
    }
  }

  async getImageData() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/photos?album=1',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const responseJson = await response.json();
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({responseImage: responseJson});
      this.setState({visibleLoader: false});
    } catch (error) {
      console.log(error);
    }
  }

  _navigateToScreen2(post) {
    this.props.navigation.navigate('screen2', {
      PostData: post,
      ImagesAlbumData: this.state.responseImage,
    });
  }

  refershPage = () => {
    this.setState(
      {
        refreshing: true,
        seed: this.state.seed + 1,
      },
      () => {
        console.log(this);
        this.getApiData();
      },
    );
  };
  render() {
    const {visibleLoader} = this.state;
    return (
      <View style={[styles.container, styles.horizontal]}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={false}
        />
        {/* <ActivityIndicator size="large" color="#0000ff" animating={load} /> */}
        {visibleLoader && (
          <ActivityIndicator style={{height: 80}} color="#C00" size="large" />
        )}
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.resources}
            renderItem={this.renderItem}
            refreshing={this.state.resresh}
            onRefresh={this.refershPage}
          />
        </View>
      </View>
    );
  }
}
