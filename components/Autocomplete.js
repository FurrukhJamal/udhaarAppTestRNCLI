import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AutocompleteInput from 'react-native-autocomplete-input';
import { connect } from 'react-redux';
import { addSearchedUsers } from '../redux/actions/actions';

/**Displays a search box in the app and displays a list of relevant user
 * names as an autocomplete for the search box */
function SearchBoxAutoComplete(props) {
    const [search, setSearch] = useState("")
    const [hideResult, setHideResult ] = useState(true)
  
    function handleTextChange(value){
      //console.log("Value is: " , value)
      setSearch(value)
    }
    
    /**Handles searching, the setTimeout function could be modified to search for query after 1sec
     * of keypress
     */
    function handleKeyPressOut(){
      //console.log("Pressed out triggered")
      setTimeout(async()=>{
        //console.log("Search hit after one secoond of keyPress")
        if(search)
        {
          let response = await fetch(`https://api.github.com/search/users?q=${search}`)
          let result = await response.json()
          //console.log("SEARCHED RESULT", result)
          props.addSearched(result.items)
        }
        else 
        {
          //Bug fix, for if user deletes all the search word
          props.addSearched([])
        }
        
      }, 1000)
    }
  
    return(
      <View style = {styles.searchBoxContainer}>
        <AutocompleteInput
          onFocus = {()=>setHideResult(false)}
          onBlur = {()=>setHideResult(true)}
          //data = {["hello", "world", "hello", "world", "hello", "world", "hello", "world" , "hello", "world"]}
          data = {props.searchedUsers}
          hideResults = {hideResult}
          onChangeText = {handleTextChange}
          onKeyPress = {handleKeyPressOut}
          placeholder = "Search"
          value = {search} 
          inputContainerStyle = {[styles.searchText, {width : "100%", }]}
          containerStyle = {{
              width : "75%",
              alignItems : "center",
              justifyContent : "center",
              
          }}
          flatListProps={{
            keyExtractor: (item, idx) => idx.toString(),
            renderItem: ({ item }) => (
                <View style = {{borderBottomColor : "gray", borderBottomWidth : 1}}>
                    <Text style = {{padding : 10, fontSize : 18}}>{item.login}</Text>
                </View>),
          }}
          listContainerStyle = {{
              width : "100%",
              height : 150,
          }}
          />
      </View>
    )

}

const styles = StyleSheet.create({
    searchBoxContainer : {
        width : "100%",
        alignItems : "center",
        //paddingTop : 20,
        position : "absolute",
        zIndex : 1,
        //top : 20,
        flex : 1,
        //backgroundColor : "red",
        top : 30,
        
    },

    searchText : {
        borderColor : "gray",
        borderWidth : 1,
        width : "80%",
        paddingHorizontal : 10,
        paddingVertical : 10,
        
    },
})

const mapStateToProps = (state)=>({
    searchedUsers : state.searchedUsers
})

export default connect(mapStateToProps, {addSearched : addSearchedUsers})(SearchBoxAutoComplete)