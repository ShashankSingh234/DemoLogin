import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './components/AuthLoadingScreen.js'
import LoginScreen from './components/LoginScreen.js'
import SignUpScreen from './components/SignUp.js'
import ProfileScreen from './components/Profile.js'

const AppStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions:
    {
      header: null
    }
  }
});

const AuthStack = createStackNavigator({
  LogIn: {
    screen: LoginScreen,
    navigationOptions:
    {
      header: null
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions:
    {
      header: null
    }
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));