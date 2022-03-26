import { Pressable, Modal, Linking, Image, StatusBar, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Octokit } from '@octokit/core';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import SearchBoxComponent from "./components/SearchBoxComponent";
import AppContext from './context/appContext';
import DisplayList from './components/DisplayList';
import UserInfoModal from './components/Modal';
import store from './redux/store';
import { connect, Provider } from 'react-redux';
import { addUsers } from './redux/actions/actions';
import SearchBoxAutoComplete from './components/Autocomplete';

const GITHUBACCESSTOKEN = "Your_github API Tokken"

function Core(props) {
  //const[data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({})
  
  /**Effect : makes API call and populate the users list data */
  useEffect(()=>{
    console.log("Store at Start:", store.getState())
    async function getUsers(){
      const octokit = new Octokit({ auth: GITHUBACCESSTOKEN });
      
      let response = await octokit.request('GET /users', {
        org: "octokit",
        type: "private",
      })
      
      let result = response
      return result
    }
    
    (async ()=>{
      let result = await getUsers()
      //setData([...result.data])
      //adding to redux
      props.addUsers(result.data)
      console.log("ALL The USERS ARE", result.data[0])
    })()

  }, [])


  if(!props.users)
  {
    return (
      <View style = {{alignItems : "center", justifyContent : "center"}}><Text>Loading...</Text></View>
    )
  }
  
  
  return(
    
      <AppContext.Provider value = {{modalVisible, setModalVisible, setModalData}}>
        <View style = {styles.container}>
          {/* <SearchBoxComponent/> */}
          <SearchBoxAutoComplete/>
          {props.users && <DisplayList data = {props.users}/>}
          {modalVisible && <UserInfoModal data = {modalData}/>}
        </View>
      </AppContext.Provider>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
    alignItems: 'center',
    paddingTop : StatusBar.currentHeight,
  },
});


const mapStateToProps = (state)=>({
  users : state.users,
})

export default connect(mapStateToProps, {addUsers : addUsers})(Core)
