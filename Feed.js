'use strict';

var React = require('react');

var {
    Component
} = React;

var ReactNative = require('react-native');

var {
  Text,
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} = ReactNative;

var AuthService = require('./AuthService');
var moment = require('moment');
var PushPayload = require('./PushPayload');

class Feed extends Component{ //ES6 syntax
    constructor(props){
        super(props);


        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2   //determines what marks difference between rows
        });
        //init your state when rendering a component
        this.state = {
            dataSource: ds ,//adds data
            showProgress: true
        };

    }

    componentDidMount(){
        this.fetchFeed();
    }

    fetchFeed() {
        AuthService.getAuthInfo((err,authInfo) => {
            if (err) throw err;

            var url = "https://api.github.com/users/" + authInfo.user.login + '/events';

            fetch(url, { //react native fetch api
                headers: authInfo.headers
            })
            .then((response) => response.json())
            .then((responseData)=> {
                var feedItems = responseData.filter((ev) => ev.type == 'PushEvent');
                var ds = this.state.dataSource.cloneWithRows(feedItems);

                this.setState({
                    dataSource: ds,
                    showProgress: false
                })
            })
        });


    }
    renderRow(rowData, sectionId, rowId){
        return (
            <TouchableHighlight
                onPress= {()=> this.pressRow(rowData)}
                underlayColor = '#ddd'>
                <View style={styles.row}>
                    <Image 
                        source={{uri: rowData.actor.avatar_url}}
                        style={styles.img}
                    />

                    <View style={{paddingLeft: 20}}>
                        <Text> {moment(rowData.created_at).fromNow()} </Text>
                        <Text> {rowData.actor.login} pushed to </Text>
                        <Text> {rowData.payload.ref.replace('refs/heads/', '')} </Text>
                        <Text> {rowData.repo.name} </Text>
                    </View> 

                </View>
            </TouchableHighlight>
        )
    }

    pressRow(rowData){
        //since we set Feed component on navigator, navigator ensures that we have a references to itself on the Feed component
        this.props.navigator.push({
            title: 'PushEvent',
            component: PushPayload,
            passProps: { //the object will passed to the component on the constructor when navigated to it
                pushEvent: rowData
            }
        });
    }

    render(){
        if(this.state.showProgress){
            return (
                <View style={styles.view}>
                    <ActivityIndicator size="large" animating={true} />
                </View>
            )
        }
        return (
            <View style={styles.view}> 
                <ListView dataSource={this.state.dataSource}
                renderRow = {this.renderRow.bind(this)} />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 50
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1
    },
    img: {
        height: 36,
        width:36,
        borderRadius: 18
    }
});


module.exports = Feed;