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
  TouchableHighlight,
  ActivityIndicator  //progress spinner
} = ReactNative;

var SearchResults = require('./SearchResults');

class Search extends Component{ //ES6 syntax
    constructor(props){
        super(props);
        //init your state when rendering a component
        this.state = {
            
        };

    }
    
    onSearchPressed(){ //for search you want to naviguate to results view before processing - better UX
        this.props.navigator.push({
            component: SearchResults,
            title: 'Results',
            passProps: {
                searchQuery: this.state.searchQuery
            }
        })
    }

    render(){

        
        return ( 
            <View style ={styles.container}> 
                
                <TextInput 
                    autoCapitalize= "none"
                    autoCorrect = {false}
                    style={styles.input} 
                    placeholder="Search Query"
                    onChangeText ={(text) => this.setState({searchQuery: text})}
                /> 

                <TouchableHighlight 
                    style={styles.button}
                    onPress={this.onSearchPressed.bind(this)}
                    underlayColor={'#111'}>
                    <Text style={styles.buttonText} >
                        Search </Text>
                </TouchableHighlight> 


            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop: 30,
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },

    input:{
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
});

module.exports = Search;
