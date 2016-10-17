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

class SearchResults extends Component{ //ES6 syntax
    constructor(props){
        super(props);


        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2   //determines what marks difference between rows
        });
        //init your state when rendering a component
        this.state = {
            dataSource: ds,
            showProgress: true,
            searchQuery: props.searchQuery
        };

    }
    componentDidMount(){
        this.doSearch();
    }

    doSearch() {
        var url = 'https://api.github.com/search/repositories?q=' + 
            encodeURIComponent(this.state.searchQuery);

        fetch(url)
        .then((response) => response.json()) //parses response to json NB: fetch is promise based
        .then((responseData) => { //advised to do error check on responseData
            this.setState({
                repositories: responseData.items,
                dataSource: this.state.dataSource.cloneWithRows(responseData.items)
            });
        })
        .finally(()=> {
            this.setState({
                showProgress: false
            });
        });


    }
    renderRow(rowData, sectionId, rowId){
        return (
                <View style={{
                    padding: 20,
                    borderColor: "#d7d7d7",
                    borderBottomWidth: 1
                }}>
                    <Text style={{fontSize: 20, fontWeight: '600'}}> 
                        {rowData.full_name}
                    </Text>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        marginBottom: 20
                    }}> 

                        <View style={styles.repoCell}> 
                            <Image source={require('image!star')}
                                style={styles.repoCellIcon}/>
                            <Text style={styles.repoCellLabel}>
                                {rowData.stargazers_count}
                            </Text>
                        </View>
                        <View style={styles.repoCell}> 
                            <Image source={require('image!fork')}
                                style={styles.repoCellIcon}/>
                            <Text style={styles.repoCellLabel}>
                                {rowData.forks}
                            </Text>
                        </View>
                        <View style={styles.repoCell}> 
                            <Image source={require('image!Info')}
                                style={styles.repoCellIcon}/>
                            <Text style={styles.repoCellLabel}>
                                {rowData.open_issues}
                            </Text>
                        </View>
                    </View>

                </View>
        )
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
        marginTop: 80
    },
    repoCell:{
        width: 50,
        alignItems: 'center'
    },
    repoCellIcon:{
        width: 20,
        height:20
    },
    repoCellLabel:{
        textAlign: 'center'
    }

});


module.exports = SearchResults;