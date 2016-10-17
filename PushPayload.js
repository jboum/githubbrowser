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
} = ReactNative;

var AuthService = require('./AuthService');
var moment = require('moment');

class PushPayload extends Component{ //ES6 syntax
    constructor(props){
        super(props);


        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2   //determines what marks difference between rows
        });
        //init your state when rendering a component
        this.state = {
            dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
            pushEvent: props.pushEvent
        };

    }

    renderRows(rowData, sectionId, rowId){
        return (
            <View style={{
                flex:1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                paddingTop: 20,
                paddingBottom: 20,
                padding: 10
            }}>
                <Text> <Text style={{ fontWeight: '800', fontSize: 16}}> {rowData.sha.substring(0,6)} </Text> - {rowData.message}</Text>
            </View>
        );
    }

    render(){
        return (
            <View style={styles.view}>
                <Image source={{uri: this.state.pushEvent.actor.avatar_url}}
                style = {styles.img}
                />

                <Text style={styles.info}> 
                    {moment(this.state.pushEvent.created_at).fromNow()}
                </Text>
                <Text style={styles.info}> {this.state.pushEvent.actor.login}</Text>
                <Text style={styles.info}> pushed to {this.state.pushEvent.payload.ref.replace('refs/heads/', '')} </Text>
                <Text style={styles.info}> at {this.state.pushEvent.repo.name} </Text>
                <Text style={styles.info}> {this.state.pushEvent.payload.commits.length} Commits</Text>

                <ListView dataSource={this.state.dataSource}
                renderRow = {this.renderRows.bind(this)} 
                contentInset={{
                    top: -100}}/>
            </View>);
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 80,
        alignItems: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1
    },
    img: {
        height: 120,
        width:120,
        borderRadius: 60
    },
    info:{
        fontSize: 20,
        paddingTop: 10
    }
});


module.exports = PushPayload;