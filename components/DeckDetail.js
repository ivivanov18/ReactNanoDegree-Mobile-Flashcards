import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {StackNavigator} from 'react-navigation'
import CardAdd from './CardAdd'
import Quizz from './Quizz'
import {gray, white, black} from '../utils/colors'
import {getDeck} from '../utils/api'

/**
 * @description Functional component used to represent the Add Card button on the Deck Detail screen
 * @param {*} param0 
 */
const AddCardBtn = ({ onPress }) => {
    return (
      <TouchableOpacity
        style={styles.AddCardBtn}
        onPress={onPress}>
          <Text style={styles.AddCardBtnText}>Add Card</Text>
      </TouchableOpacity>
    )
}

/**
 * @description Functional component used to represent the Start Quiz button on the Deck Detail screen
 * @param {*} param0 
 */
const StartQuizBtn = ({ onPress }) => {
    return (
      <TouchableOpacity
        style={styles.StartQuizzBtn}
        onPress={onPress}>
          <Text style={styles.StartQuizzBtnText}>Start Quizz</Text>
      </TouchableOpacity>
    )
}

/**
 * 
 * @param {string} title - the name of the deck
 * @param {number} nbCards - the number of cards in the deck
 */
class DeckDetail extends Component {

    constructor(props){
        super(props)

        this.state = {
            questions: []
        }        
    }


    componentDidMount(){
        getDeck(this.props.navigation.state.params.title).then(data => {
            this.setState(() => ({questions: data.questions}))
        })
    }


    _refresh(title, card){
        this.setState((prevState) => {
            return {questions:[...prevState.questions, card]}
        })
    }

    render(){
        return(
            <View>
                <View style={styles.textStyling}>
                    <Text style={{fontSize:48, fontWeight: 'bold', marginTop:50}}>
                        {this.props.navigation.state.params.title}
                    </Text>
                    <Text style={{fontSize:30, paddingTop: 30, color:gray, marginBottom:100}}>
                        {this.state.questions.length} 
                        {this.state.questions.length <= 1 ? " card" : " cards"}
                    </Text>
                </View>
                <AddCardBtn 
                    onPress={() => this.props.navigation.navigate('CardAdd',
                                                    {title:this.props.navigation.state.params.title,
                                                        refresh:this._refresh.bind(this)})}
                />
                <StartQuizBtn 
                    onPress={() => this.props.navigation.navigate('Quizz',
                                                    {title:this.props.navigation.state.params.title})}
                />
            </View> 
        )
    }

}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex: 1,
        flexDirection:'column',
    },
    textStyling: {
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 30
    },
    StartQuizzBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    StartQuizzBtn:{
        backgroundColor: black,
        height:45,
        padding: 10,
        borderRadius: 7,
        marginLeft: 40,
        marginRight: 40,
    },
    AddCardBtnText: {
        fontSize: 22,
        textAlign: 'center'
    },
    AddCardBtn:{
        borderWidth:1,
        height:45,
        padding: 10,
        borderRadius: 7,
        marginLeft: 40,
        marginRight: 40,
        marginBottom:30
    }

})

export default DeckDetail