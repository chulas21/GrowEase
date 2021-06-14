import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import firebase from './firebase'
import {colors} from './colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  switchInCooler,
  switchOutCooler,
  switchLights,
  valuesGetter,
  statusGetter
} from './services'

export default function App() {
  const [values,setValues]=useState({
    eHumidity:"",
    fotoperiodo:"",
    sHumidity:"",
    temp:"",
    timerEnd:""
  })

  const [status,setStatus]=useState({
    lightsStatus:'',
    inCoolerStatus:'',
    outCoolerStatus:''
  })

  useEffect(()=>{
    setValues(valuesGetter())
    setStatus(statusGetter())
  },[])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.valuesContainer}>
        <Text style={styles.label}>Temp:         {values.temp}°</Text>
        <Text style={styles.label}>eHumidity:    {values.sHumidity}°</Text>
        <Text style={styles.label}>sHumidity:    {values.sHumidity}°</Text>
      </View>
      <View style={styles.periodContainer}>
        <Text style={styles.label}>{values.fotoperiodo}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title='Off'/>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valuesContainer:{
    position:'absolute',
    top:hp('10%'),
    width:wp('80%'),
    height:hp('25%'),
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    borderRadius:15,
    elevation:4,
    alignItems:'center',
    justifyContent:'center'
  },
  periodContainer:{
    position:'absolute',
    top:hp('40%'),
    width:wp('80%'),
    height:hp('15%'),
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    borderRadius:15,
    elevation:4,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonsContainer:{
    position:'absolute',
    bottom:hp('10%'),
    width:wp('80%'),
    height:hp('30%'),
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    borderRadius:15,
    elevation:4
  },
  label:{
    color:'#FFF',
    fontSize:hp('4%'),
    fontWeight:'bold'
  }
});
