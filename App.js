/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { Pressable, Modal, Linking, Image, StatusBar, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Octokit } from '@octokit/core';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import SearchBoxComponent from "./components/SearchBoxComponent";
import AppContext from './context/appContext';
import DisplayList from './components/DisplayList';
import UserInfoModal from './components/Modal';

const GITHUBACCESSTOKEN = "Your_GITHUB_AccessTokken"

export default function App() {
  const[data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({})
  
  /**Effect : makes API call and populate the users list data */
  useEffect(()=>{
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
      setData([...result.data])
      //console.log("ALL The USERS ARE", result.data[0])
    })()

  }, [])
  
  if(!data){
    return(
      <View style = {{alignItems : "center", justifyContent : "center"}}><Text>Loading...</Text></View>
    )
  }
  
  return (
    <AppContext.Provider value = {{modalVisible, setModalVisible, setModalData}}>
      <View style={styles.container}>
        <SearchBoxComponent/>
        <DisplayList data = {data}/>
        {modalVisible && <UserInfoModal data = {modalData}/>}
      </View>    
    </AppContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
    alignItems: 'center',
    paddingTop : StatusBar.currentHeight,
  },
});
