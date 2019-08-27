/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  // Button,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles from '../component/styles/screen1';
import {
  Icon,
  Text,
  Card,
  Button,
  Avatar,
  ListItem,
} from 'react-native-elements';

export default class screen2 extends Component {
  static navigationOptions = {
    title: 'Screen2',
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
      postid: '',
      contentBody: '',
      title: '',
      userid: '',
      responseImage: [],
      ImagerecodeArray: [],
      thumbnailUrl: '',
      imageUrl: '',
    };
  }
  componentDidMount() {
    const postdata = this.props.navigation.getParam('PostData');
    const imagepostdata = this.props.navigation.getParam('ImagesAlbumData');

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({responseImage: imagepostdata});

    console.log('Post Id IS ' + JSON.stringify(postdata));
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({contentBody: postdata.body});
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({title: postdata.title});
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({postid: postdata.id});

    this.ShowImage(postdata.id, imagepostdata);
  }

  ShowImage(id, imagepostdata) {
    // eslint-disable-next-line no-undef
    const temp = [];
    // eslint-disable-next-line consistent-this
    let self = this;
    console.log('showImagesssssss' + imagepostdata);
    imagepostdata.forEach(function(item) {
      if (item.albumId === id) {
        temp.push(item);
        // self.setState({thumbnailUrl: item.thumbnailUrl});
        // self.setState({imageUrl: item.url});
      }
    });
    self.setState({ImagerecodeArray: temp});
  }

  _navigateToScreen3(item) {
    console.log('ssss');
    this.props.navigation.navigate('screen3', {
      imageUrl: item.url,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem1 = ({item}) => (
    <TouchableOpacity onPress={() => this._navigateToScreen3(item)}>
      <Image
        style={styles.image}
        source={{
          uri: item.thumbnailUrl,
        }}
      />
    </TouchableOpacity>
  );

  render() {
    console.log('selected item' + JSON.stringify(this.state.ImagerecodeArray));
    return (
      <View>
        <Card containerStyle={{padding: 0}}>
          <ListItem
            title={this.state.title}
            subtitle={this.state.contentBody}
            onPress={console.log('aaa')}
          />
        </Card>
        <View style={{marginTop: 20}}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.ImagerecodeArray}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
                <TouchableOpacity
                  key={item.id}
                  style={{flex: 1}}
                  onPress={() => {
                    this._navigateToScreen3(item);
                  }}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.thumbnailUrl,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
          />
        </View>
      </View>
    );
  }
}
