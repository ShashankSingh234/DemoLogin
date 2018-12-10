import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Button, DefaultTheme } from 'react-native-paper'

export default class App extends Component {

  handleSignOut = () => {
    firebase.auth().signOut()
    this.props.navigation.navigate('LogIn')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hi {firebase.auth().currentUser.displayName} </Text>
        <Button
            style={styles.buttonStyle}
            mode='contained'
            onPress={() => this.handleSignOut()}
            color='#008080'>
            Sign out
          </Button>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonStyle: {
    marginTop: 50,
    borderRadius: 20,
    paddingLeft:20,
    paddingRight:20
  },
});