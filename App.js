/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import home from './component/home';
import screen2 from './component/screen2';
import screen3 from './component/screen3';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: home,
      headerMode: 'none',
      title: 'HOme',
    },
    screen2: screen2,
    screen3: screen3,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    // return <AppContainer />;
    return <AppContainer />;
  }
}
