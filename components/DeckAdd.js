import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import {action_add_deck, action_decks_load_all} from '../actions'
import {saveDeckTitle} from '../utils/api'
import { NavigationActions } from 'react-navigation'


/**
 * @description Component rendered when the user clicks on a specific deck from the deck list
 */
class DeckAdd extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            deckTitle: ""
        }
    }

    submit = () => {
        if(this.state.deckTitle === ""){
            alert("The fields cannot be empty")
            return
        }

        //TODO: add check whether deck already exists

        this.props.addDeck(this.state.deckTitle)
        saveDeckTitle(this.state.deckTitle)
        
        /*
        * Tried to navigate through a subRoute so that when clicked on the back arrow (being on the DetailDeck 
        * screen the user is sent not on the add deck tab but on the decklist tab 
        * --> Unfortunately does not work --> this is not in the requirements but would be interesting if possible
        * and how to do it
        */
        const navigateAction = NavigationActions.navigate({
            routeName: 'DeckDetail',
            params: {title:this.state.deckTitle},
            actions: [NavigationActions.navigate({ routeName: 'HomeScreen'}),
                    NavigationActions.navigate({ routeName: 'DeckList'})]
            
        })
        this.props.navigation.dispatch(navigateAction)        

    }

    render(){
        return(
            <View>
                <Text style={{fontSize: 44, marginTop: 120,marginBottom: 120, padding:10}}>What is the title of your new deck ?</Text>                
                <TextInput
                    style={styles.input}
                    placeholder="Deck Title"
                    onChangeText={(text) => this.setState({deckTitle: text})}
                />
                <TouchableOpacity
                    style={styles.SubmitBtn}
                    onPress={() => this.submit()}>
                    <Text style={styles.SubmitBtnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addDeck: (data) => dispatch(action_add_deck(data)),
    loadDecks: (data) => dispatch(action_decks_load_all(data))
});

const mapStateToProps = (state) => ({
    decks: state
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    input: {
        height: 45,
        padding: 10,
        backgroundColor: '#fff',
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 7,
        marginBottom:30
    },
    SubmitBtnText: {
        fontSize: 22,
        textAlign: 'center'
    },
    SubmitBtn:{
        borderWidth:1,
        height:45,
        padding: 10,
        borderRadius: 7,
        marginLeft: 40,
        marginRight: 40,
    }
})



export default connect(mapStateToProps,mapDispatchToProps)(DeckAdd)