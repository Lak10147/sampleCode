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

  componentWillMount() {
    this.getApiData();
    this.getImageData();
  }

  async getApiData() {
    console.log('before fetch');
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson);
        console.log(this);
        this.setState({resources: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
    // console.log('fetch sent');
  }

  async getImageData() {
    return fetch('https://jsonplaceholder.typicode.com/photos?album=1')
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson);
        this.setState({visibleLoader: false});
        this.setState({responseImage: responseJson});
        console.log('Visibility' + this.state.visibleLoader);
      })
      .catch(error => {
        console.error(error);
      });
    // console.log('fetch sent');
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
    return (
      <View style={[styles.container, styles.horizontal]}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={false}
        />
        {this.state.visibleLoader ?(
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.resources}
              renderItem={this.renderItem}
              refreshing={this.state.resresh}
              onRefresh={this.refershPage}
            />
          </View>
        )}
      </View>
    );
  }
}
