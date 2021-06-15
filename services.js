import firebase from './firebase'

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

export const switchFP=(current)=>{
  var newFP
  switch (current) {
  case 'ENRAIZAMIENTO':
    newFP='CRECIMIENTO'
    break;
  case 'CRECIMIENTO':
    newFP='FLORACION'
    break;
  case 'FLORACION':
    newFP='ENRAIZAMIENTO'
    break;
  }

  firebase.db.ref('values/').child('fotoperiodo').set(newFP)
}
