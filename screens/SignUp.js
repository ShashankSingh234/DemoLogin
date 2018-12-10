import React, { Component } from 'react'
import { Text, View, Dimensions, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase';
import { Button, TextInput, DefaultTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get('window');
export default class CreateTab extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
      errorFirstName: '',
      errorEmail: false,
      errorPassword: false
    }
  }

  handleSignUp = () => {
    const { firstName, email, password } = this.state;
    this.setState({ loading: true })

    if (firstName.length == 0) {
      this.setState({ errorMessage: 'First name can not be blank.', errorFirstName: true, loading: false })
      Alert.alert(
        'Error',
        'First name can not be blank.',
        [
          { text: 'OK', onPress: () => this.firstNameTextInput.focus() },
        ],
        { cancelable: false }
      )
      return;
    }
    this.setState({ errorFirstName: false })

    if (email.length == 0) {
      this.setState({ errorMessage: 'Email can not be blank.', errorEmail: true, loading: false })

      Alert.alert(
        'Error',
        'Email can not be blank.',
        [
          { text: 'OK', onPress: () => this.emailTextInput.focus() },
        ],
        { cancelable: false }
      )
      return;
    }

    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email) === false) {
      this.setState({ errorMessage: 'Enter a valid email.', errorEmail: true, loading: false })

      Alert.alert(
        'Error',
        'Enter a valid email.',
        [
          { text: 'OK', onPress: () => this.emailTextInput.focus() },
        ],
        { cancelable: false }
      )
      return;
    }
    this.setState({ errorEmail: false })

    if (password.length == 0) {
      this.setState({ errorMessage: 'Password can not be blank.', errorPassword: true, loading: false })

      Alert.alert(
        'Error',
        'Password can not be blank.',
        [
          { text: 'OK', onPress: () => this.passwordTextInput.focus() },
        ],
        { cancelable: false }
      )
      return;
    }

    if (password.length < 6) {
      this.setState({ errorMessage: 'Password should be more than 6 character.', errorPassword: true, loading: false })

      Alert.alert(
        'Error',
        'Password should be more than 6 character.',
        [
          { text: 'OK', onPress: () => this.passwordTextInput.focus() },
        ],
        { cancelable: false }
      )
      return;
    }
    this.setState({ errorPassword: false })


    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {

        firebase.auth().currentUser.updateProfile({displayName: this.state.firstName + " " + this.state.lastName})
        firebase.auth().currentUser.sendEmailVerification();
        const ref = firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid);
        ref.set({ 'firstName': this.state.firstName, 'lastName': this.state.lastName }).then(
          firebase.auth().signOut(),
          this.setState({ loading: false }),
          Alert.alert(
            'Registered successfully',
            'Verification mail sent.',
            [
              { text: 'OK', onPress: () => this.props.navigation.navigate('LogIn') },
            ],
            { cancelable: false }
          )
        );
      })
      .catch(error => {
        this.setState({ loading: false, errorMessage: error.message })
        Alert.alert(
          'Error',
          error.message,
          [
            { text: 'OK', onPress: () => { } },
          ],
          { cancelable: false }
        )
      })
  }

  handleLogIn = () => {
    this.props.navigation.navigate('LogIn');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', marginLeft: 30, marginRight: 30 }}>

          <View style={styles.textInputContainer}>
            <Icon style={styles.textInputIcon} name="person" size={20} color="#008080" />

            <TextInput
              label='First name'
              style={styles.textInputStyle}
              onChangeText={(text) => this.setState({ firstName: text })}
              value={this.state.firstName}
              disabled={this.state.loading}
              theme={textInputTheme}
              ref={(input) => { this.firstNameTextInput = input; }}
              returnKeyType='next'
              onSubmitEditing={() => { this.lastNameTextInput.focus(); }}
              blurOnSubmit={false}
            />

            <TextInput
              label='Last name'
              style={styles.textInputStyle}
              onChangeText={(text) => this.setState({ lastName: text })}
              value={this.state.lastName}
              disabled={this.state.loading}
              theme={textInputTheme}
              ref={(input) => { this.lastNameTextInput = input; }}
              returnKeyType='next'
              onSubmitEditing={() => { this.emailTextInput.focus(); }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Icon style={styles.textInputIcon} name="mail" size={20} color="#008080" />

            <TextInput
              label='Email address'
              style={styles.textInputStyle}
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
              keyboardType='email-address'
              disabled={this.state.loading}
              theme={textInputTheme}
              ref={(input) => { this.emailTextInput = input; }}
              returnKeyType='next'
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
            onPress={() => this.handleSignUp()}
            color='#008080'>
            {this.state.loading ? '' : 'Sign Up'}
          </Button>
        </View>
        <Text
          style={{ fontSize: 12, alignSelf: 'center', marginBottom: 10, padding: 20 }}
          onPress={() => this.handleLogIn()}>
          Log In
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
    marginRight: 10,
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
  }
});