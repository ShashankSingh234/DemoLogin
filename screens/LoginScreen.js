import React, { Component } from 'react'
import { View, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase';
import { Text, Button, TextInput, DefaultTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class CreateTab extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      email: '',
      password: '',
      errorMessage: '',
    }
  }

  handleLogIn = () => {
    const { email, password } = this.state;
    this.setState({ loading: true })

    if (email.length == 0) {
      this.setState({ errorMessage: 'Email can not be blank.', loading: false })
      Alert.alert(
        'Error',
        'Email can not be blank.',
        [
          {text: 'OK', onPress: () => this.emailTextInput.focus()},
        ],
        { cancelable: false }
      )
      return;
    }

    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email) === false) {
      this.setState({ errorMessage: 'Enter a valid email.', loading: false })
      Alert.alert(
        'Error',
        'Enter a valid email.',
        [
          {text: 'OK', onPress: () => this.emailTextInput.focus()},
        ],
        { cancelable: false }
      )
      return;
    }

    if (password.length == 0) {
      this.setState({ errorMessage: 'Password can not be blank.', loading: false })
      Alert.alert(
        'Error',
        'Password can not be blank.',
        [
          {text: 'OK', onPress: () => this.passwordTextInput.focus()},
        ],
        { cancelable: false }
      )
      return;
    }

    if (password.length < 6) {
      this.setState({ errorMessage: 'Password should be more than 6 character.', loading: false })
      Alert.alert(
        'Error',
        'Password should be more than 6 character.',
        [
          {text: 'OK', onPress: () => this.passwordTextInput.focus()},
        ],
        { cancelable: false }
      )
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        if (firebase.auth().currentUser.emailVerified) {
          this.props.navigation.navigate('App')
        }
        else {
          firebase.auth().currentUser.sendEmailVerification();
          this.setState({ loading: false, errorMessage: 'User not verified. Verification mail sent successfully.' })
          Alert.alert(
            'Error',
            'User not verified. Verification mail sent successfully.',
            [
              {text: 'OK', onPress: () => {}},
            ],
            { cancelable: false }
          )
        }
      })
      .catch(error => {this.setState({ loading: false, errorMessage: error.message})
      Alert.alert(
        'Error',
        error.message,
        [
          {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
      )
    })
  }

  handleSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', marginLeft: 30, marginRight: 30 }}>

          <View style={styles.textInputContainer}>
            <Icon style={styles.textInputIcon} name="mail" size={20} color="#008080" />
            <TextInput
              style={styles.textInputStyle}
              label='Email address'
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
              keyboardType='email-address'
              disabled={this.state.loading}
              theme={textInputTheme}
              ref={(input) => { this.emailTextInput = input; }}
              returnKeyType = 'next'
              onSubmitEditing={() => { this.passwordTextInput.focus(); }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Icon style={styles.textInputIcon} name="lock" size={20} color="#008080" />
            <TextInput
              label='Password'
              style={styles.textInputStyle}
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
              secureTextEntry
              disabled={this.state.loading}
              theme={textInputTheme}
              ref={(input) => { this.passwordTextInput = input; }}
            />
          </View>

          <Button
            loading={this.state.loading}
            style={styles.buttonStyle}
            mode='contained'
            onPress={() => this.handleLogIn()}
            color='#008080'>
            {this.state.loading ? '' : 'Log In'}
          </Button>
        </View>
        </KeyboardAvoidingView>
        <Text
          style={{ fontSize: 12, alignSelf: 'center', marginBottom: 10, padding: 20 }}
          onPress={() => this.handleSignUp()} >
          Sign Up
        </Text>
      </View>
    );
  }
}

const textInputTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: '#008080' }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20
  },
  textInputStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textInputIcon: {
    padding: 10,
  },
});