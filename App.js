import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import {Map, Modal,Panel, Input, List} from './components/Index';

export default function App() {
const [puntos, setPuntos] = useState([])
const [nombre, setNombre] = useState ('')
const [puntotemp, setPuntotemp] = useState ({})
const [visibility, setVisibility] = useState (false)
const [visibilityFilter, sertVisibilityFilter] = useState('new_punto')
const [pointsFilter, setPointsFilter] = useState (true)

const togglePointsFilter = () => {
  setPointsFilter(!pointsFilter)
}

const handLongPress = ({nativeEvent}) => {
   sertVisibilityFilter('new_punto')
   setPuntotemp(nativeEvent.coordinate)
   setVisibility(true)
             }

  const handleChangeText = text => (
    setNombre(text)
  )

  const handleSumbit = () => {
    const newPunto = {coordinate: puntotemp, name: nombre};
    setPuntos(puntos.concat(newPunto))
    setVisibility(false)
    setNombre('')
  }

  const handleLista = () => {
    sertVisibilityFilter('all_puntos')
    setVisibility(true)
  }



  return (
    <View style={styles.container}>
      <Map  onLongPress={handLongPress} puntos={puntos} pointsFilter={pointsFilter}/>
      <Panel onPressLeft={handleLista} textLeft='Lista' togglePointsFilter={togglePointsFilter}/>
      <Modal visibility={visibility}>  
              {visibilityFilter === 'new_punto' ?
              <View style={styles.form}>
              <Input 
              title="Nombre" 
              placeholder="Nombre del punto"
              onChangeText= {handleChangeText}
              />
              <Button 
              title="Aceptar"
              onPress={handleSumbit}
              /></View> : 
              <List 
              puntos={puntos} 
              closeModal = {() => setVisibility(false)}/>}
              
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  form:{
    padding: 15,  
  }
});
