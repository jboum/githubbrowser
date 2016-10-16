'use strict';

var React = require('react');

var {
    Component
} = React;

var ReactNative = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator  //progress spinner
} = ReactNative;

class Login extends Component{ //ES6 syntax
    constructor(props){
        super(props);
        //init your state when rendering a component
        this.state = {
            showProgress: false
        };

    }
    

    render(){

        var me = this,
            errorCtrl = <View />;

        if(!me.state.success && me.state.badCredentials){
            errorCtrl = <Text style={styles.error}> Username and Password combination did not work </Text>
        }

        else if(!me.state.success && me.state.unknownError){
            errorCtrl = <Text style={styles.error}> We experienced an unexpected issue. Contact support if error persists </Text>
        }

        return ( 
            <View style ={styles.container}> 
                <Image style={styles.logo} 
                source = {require ('image!Octocat')}/>
                <Text style={styles.heading}> GitHub Browser </Text>
                <TextInput 
                    autoCapitalize= "none"
                    autoCorrect = {false}
                    keyboardType={'email-address'}
                    style={styles.LoginInput} 
                    placeholder="Github username"
                    onChangeText = { (text) => this.setState({username: text})}
                /> 
                <TextInput 
                    autoCapitalize= "none"
                    autoCorrect= {false}
                    style={styles.LoginInput} 
                    placeholder="Github password"
                    secureTextEntry = {true}
                    onChangeText = { (text) => this.setState({password : text})}
                /> 

                <TouchableHighlight 
                    style={styles.button}
                    onPress={this.onLoginPressed.bind(this)}
                    underlayColor={'#111'}>
                    <Text style={styles.buttonText} >
                        Log In </Text>
                </TouchableHighlight> 

                {errorCtrl}

                <ActivityIndicator
                    animating={this.state.showProgress}
                    size="large" 
                    style = {styles.loader}/>

            </View>
        );
    }

    onLoginPressed(){
        var me = this,
            username = me.state.username;

        me.setState({showProgress: true});
        
        var authService = require('./AuthService');

        authService.login({
            username: me.state.username,
            password: me.state.password
        }, (results) => {
            me.setState(Object.assign({
                showProgress : false
            }, results));

            if(results.success && me.props.onLogin){ //if success and if onLogin property specified on the Login component
                me.props.onLogin();
            }
        });


    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        margin: 10
    },
    LoginInput:{
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor : '#48bbec'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    loader:{
        padding: 4
    },
    error: {
       color: 'red',
       paddingTop: 10  
    }
});

module.exports = Login;

/*
Some Notes:
react native does not buttons but rather TouchableHighlight
also to mask text entry use the secureTextEntry property of TextInput class
props are constant properties on component and state data represent changeable state/properties of component
checkout promise base es6
*/