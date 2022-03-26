import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import Core from './Core'
import store from './redux/store'

export default function App() {
  useEffect(()=>{
    console.log("App loading")
  }, [])
  
  return (
    <Provider store = {store}>
        <Core/>
    </Provider>
  )
  
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
    }
})