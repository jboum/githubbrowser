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
  View
} = ReactNative;

var Login = require('./Login');

var GithubBrowser = React.createClass({
  render: function(){

    if(this.state.isLoggedIn){
      return ( <View style={styles.container} > 
                  <Text style={styles.welcome}> Logged In !!! </Text> 
              </View>);
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
      isLoggedIn : false
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