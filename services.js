import firebase from './firebase'

//Getters
export const valuesGetter=()=>{
    firebase.db.ref('values/').on('value',(snapshot)=>{
      console.log('Values -> ',snapshot.val())
      return snapshot.val()
    })
} 
export const statusGetter=()=>{
   firebase.db.ref('status/').on('value',(snapshot)=>{
     console.log('Status -> ',snapshot.val())  
     return snapshot.val()
   })
}
//Switechers
export const switchInCooler=(status)=>{
  console.log('InCooler -> ',status)
  firebase.db.ref('status/').child('inCoolerStatus').set(status)
}

export const switchOutCooler=(status)=>{
  console.log('OutCooler -> ',status)
  firebase.db.ref('status/').child('outCoolerStatus').set(status)
}

export const switchLights=(status)=>{
  console.log('Lights -> ',status)
  firebase.db.ref('status/').child('lightsStatus').set(status)
}
