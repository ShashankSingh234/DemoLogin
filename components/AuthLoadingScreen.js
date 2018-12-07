import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
    this._bootstrap();
  }

  _bootstrap = () => {
    user = firebase.auth().currentUser;
    // this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
    //   this.setState({ user });
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    // });
  };

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});