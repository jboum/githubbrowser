/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

var React = require('react');
var ReactNative = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} = ReactNative;

var Login = require('./Login');
var AuthService = require('./AuthService');
var AppContainer = require('./AppContainer');

var GithubBrowser = React.createClass({

  componentDidMount: function(){
    AuthService.getAuthInfo((err, authInfo) => { //handle errors gracefully: e.g. update a state variable state.error and display message if error occured 
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    })
  },

  render: function(){

    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator 
            animating = {true}
            size="large"
            style={styles.loader} />
        </View>
      );
    }

    if(this.state.isLoggedIn){
      return (
        <AppContainer />
        );
    }
    else{
      return ( <Login onLogin={this.onLogin}/>);
    }
  },

  onLogin: function(){
    this.setState({isLoggedIn: true});
  },

  getInitialState: function(){ //initializing state bc not a es6 component and created using createClass we use this method to initialize
    return {
      isLoggedIn : false,
      checkingAuth: true
    }
  }
});

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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);

//note state is for every component