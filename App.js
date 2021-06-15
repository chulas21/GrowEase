import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Modal } from 'react-native';
import firebase from './firebase'
import {colors} from './colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { switchInCooler, switchOutCooler, switchLights,switchFP } from './services'

console.disableYellowBox = true

export default function App() {
  const [values,setValues]=useState({
    eHumidity:"##",
    fotoperiodo:"-",
    sHumidity:"##",
    temp:"##",
    timerEnd:"-"
  })
  const [modalVisible,setModalVisible]=useState(false)
  const [status,setStatus]=useState({
    lightsStatus:'',
    inCoolerStatus:'',
    outCoolerStatus:''
  })
  
  useEffect(()=>{
    firebase.db.ref('values/').on('value',(snapshot)=>{
      console.log('Values -> ',snapshot.val())
      setValues(snapshot.val())
    })
    firebase.db.ref('status/').on('value',(snapshot)=>{
      console.log('Status -> ',snapshot.val())
      setStatus(snapshot.val())
    })
  },[])


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
      <View style={styles.valuesContainer}>
        <Text style={styles.label}>Temp:         {values.temp}°</Text>
        <Text style={styles.label}>eHumidity:    {values.eHumidity}°</Text>
        <Text style={styles.label}>sHumidity:    {values.sHumidity}°</Text>
      </View>
      <TouchableOpacity 
        style={styles.periodContainer} 
        onPress={()=>{switchFP(values.fotoperiodo)}} 
        onLongPress={()=>{setModalVisible(true)}}
        activeOpacity={0.6}>
          <Text style={styles.label}>{values.fotoperiodo}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
          {status.lightsStatus
            ?<TouchableOpacity onPress={()=>{switchLights(false)}}>
              <Image source={require('./assets/light-on.png')} style={styles.btnStyle}/>
            </TouchableOpacity>
            :<TouchableOpacity onPress={()=>{switchLights(true)}}>
              <Image source={require('./assets/light-off.png')} style={styles.btnStyle}/>
            </TouchableOpacity>
          }
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
          {status.inCoolerStatus
            ?<TouchableOpacity onPress={()=>{switchInCooler(false)}}>
              <Image source={require('./assets/in-cooler-on.png')} style={styles.btnStyle}/>
            </TouchableOpacity>
            :<TouchableOpacity onPress={()=>{switchInCooler(true)}}>
              <Image source={require('./assets/cooler-off.png')} style={styles.btnStyle}/>
            </TouchableOpacity>
          }

          {status.outCoolerStatus
            ?<TouchableOpacity onPress={()=>{switchOutCooler(false)}}>
              <Image source={require('./assets/out-cooler-on.png')} style={styles.btnStyle}/>
            </TouchableOpacity>
            :<TouchableOpacity onPress={()=>{switchOutCooler(true)}}>
              <Image source={require('./assets/cooler-off.png')} style={styles.btnStyle}/>
            </TouchableOpacity>
          }
        </View>
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
    elevation:7,
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
  btnStyle:{
    width:75,
    height:75,
    margin:15
  },
  label:{
    color:'#FFF',
    fontSize:hp('4%'),
    fontWeight:'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});
