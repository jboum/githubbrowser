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
  ListView
} = ReactNative;

var AuthService = require('./AuthService');

class Feed extends Component{ //ES6 syntax
    constructor(props){
        super(props);


        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2   //determines what marks difference between rows
        });
        //init your state when rendering a component
        this.state = {
            dataSource: ds.cloneWithRows(['A', 'B', 'C']) //adds data
        };

    }

    componentDidMount(){
        this.fetchFeed();
    }

    fetchFeed() {
        AuthService.getAuthInfo((err,authInfo) => {
            if (err) throw err;

            var url = "https://api.github.com/users/" + authInfo.user.login + '/received_events';

            fetch(url, { //react native fetch api
                headers: authInfo.header
            })
            .then((response) => response.json())
            .then((responseData)=> {
                var feedItems = responseData.filter((ev) => ev.type == 'PushEvent');
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(feedItems)
                })
            })
        });


    }
    renderRow(rowData, sectionId, rowId){
        return <Text> {rowData} </Text>;
    }

    render(){
        return (
            <View style={styles.view}> 
                <ListView dataSource={this.state.dataSource}
                renderRow = {this.renderRow.bind(this)} />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'flex-start'
    }
});


module.exports = Feed;