import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Switch, Button, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import MarginedTextInput from './Text_Box';
import MarginedTextInput_Modal1 from './Text_Box_Modal1';
import MarginedTextInput_Modal2 from './Text_Box_Modal2';
const CustomModal = ({ isModalVisible, onClose }) => {

 //Funcion para hacer que cuando se toque afuera del cuadro de texto se cierre 
 const [textInputFocused, setTextInputFocused] = useState(false);

  const handleTextBlur = () => {
    setTextInputFocused(false);
  };

  const handleTextFocus = () => {
    setTextInputFocused(true);
  };

  // Funcion para poner salto de pagina en el texto 
  const [textValue, setTextValue] = useState('');


  const [envioModal1, setEnvioModal1] = useState(false);
  const [envioModal2, setEnvioModal2] = useState(false);

  const [envioCompleteModal1, setenvioCompleteModal1] = useState(false);
  const [envioCompleteModal2, setenvioCompleteModal2] = useState(false);
  
  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);

  // Estados para rastrear si cada modal individual debe estar abierto o cerrado
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  // Función para manejar el cambio del interruptor 1
  const handleSwitch1Change = (value) => {
    setSwitchValue1(value);
    setModal1Visible(value); // Abrir o cerrar el modal 1
  };

  // Función para manejar el cambio del interruptor 2
  const handleSwitch2Change = (value) => {
    setSwitchValue2(value);
    setModal2Visible(value); // Abrir o cerrar el modal 2
  };

  // Efecto secundario para controlar switchValue2 basado en envioModal2
  useEffect(() => {
    if (envioModal2) {
      // Si envioModal2 es true, establece switchValue2 en true
      setSwitchValue2(true);
    } else {
      // Si envioModal2 es false, establece switchValue2 en false
      setSwitchValue2(false);
    }
  }, [envioModal2]);

  useEffect(() => {
    if (envioModal1) {
      // Si envioModal2 es true, establece switchValue2 en true
      setSwitchValue1(true);
    } else {
      // Si envioModal2 es false, establece switchValue2 en false
      setSwitchValue1(false);
    }
  }, [envioModal1]);

  // Función para cerrar todos los modales adicionales y los interruptores
  const closeAllModals = () => {
    setModal1Visible(false);
    setModal2Visible(false);
    setSwitchValue1(false);
    setSwitchValue2(false);
  };

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={isModalVisible}
    onRequestClose={() => {
      closeAllModals();
      onClose();
    }}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Observaciones</Text>

          <View style={styles.rowContainer}>
            <View style={styles.leftColumn}>
              <Text style={styles.modalText}>Nombre:</Text>
            </View>
            <View style={styles.rightColumn}>
              <TextInput
                style={styles.textInput}
                placeholder="Ingrese su nombre..."
                placeholderTextColor="#95A5A6"
                onChangeText={(text) => {
                  // Manejar el texto ingresado
                }}
              />
            </View>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Actos subestandares</Text>
            <Switch
              value={switchValue1}
              onValueChange={(value) => handleSwitch1Change(value)}
            />
          </View>

          {modal1Visible ? (
            <ModalContent_1
              onClose={() => {
                setModal1Visible(false);
                setSwitchValue1(false);
              }}
              setenvioCompleteModal1={setenvioCompleteModal1}
              setEnvioModal1={setEnvioModal1}
              modalNumber={1}
            />
          ) : null}

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Condiciones subestandares</Text>
            <Switch
              value={switchValue2}
              onValueChange={(value) => handleSwitch2Change(value)}
            />
          </View>

          {modal2Visible ? (
            <ModalContent_2
              onClose={() => {
                setModal2Visible(false);
                setSwitchValue2(false);
              }}
              setenvioCompleteModal2={setenvioCompleteModal2}
              setEnvioModal2={setEnvioModal2}
              modalNumber={2}
            />
          ) : null}

          <MarginedTextInput margin={20} characterLimit={200} />
          <View style={styles.rowContainer}> 
          <Pressable
            style = {styles.buttonSend}
            onPress={() => {
              onClose();
            }}
            disabled={!envioCompleteModal1 || !envioCompleteModal2}
          >
            <Text style={styles.buttonText}>Enviar Reporte</Text>
          </Pressable>
          
          {/* Nuevo View para separar los botones */}
          <View style={styles.buttonSeparator} />

          <Pressable
            style = {styles.buttonDelete}
            onPress={() => {
              closeAllModals();
              onClose();
            }}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
          </Pressable>
          </View>
          
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
  );
};


// Componente para el contenido del modal individual
const ModalContent_1 = ({ onClose, modalNumber, isVisible, setEnvioModal1, setenvioCompleteModal1 }) => {
  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);
  const [switchValue3, setSwitchValue3] = useState(false);
  const [switchValue4, setSwitchValue4] = useState(false);
  const [switchValue5, setSwitchValue5] = useState(false);
  const [switchValue6, setSwitchValue6] = useState(false);
  const [switchValue7, setSwitchValue7] = useState(false);
  const [switchValue8, setSwitchValue8] = useState(false);
  const [switchValue9, setSwitchValue9] = useState(false);

  const [textInputValue, setTextInputValue] = useState('');

  // Estilos específicos para cada modal
  const modalStyles =
    modalNumber === 1 ? styles.modal1 : modalNumber === 2 ? styles.modal2 : {};

  return (
    <Modal
      animationType="fade"
      visible={isVisible} // Utiliza la prop isVisible para controlar la visibilidad del modal
      onRequestClose={() => {
        onClose();
      }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.centeredView, modalStyles]}>
        <View style={styles.modalView}>
       
          <Text style={styles.modalText}>Observaciones</Text>
          <Text style={styles.modalText}>Actos subestandares</Text>

          {/* Agregar 3 interruptores */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Operar equipo sin autorización</Text>
            <Switch value={switchValue1} onValueChange={setSwitchValue1} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Uso inadecuado del EPP</Text>
            <Switch value={switchValue2} onValueChange={setSwitchValue2} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Uso de equipos y/o herramientas defectosas</Text>
            <Switch value={switchValue3} onValueChange={setSwitchValue3} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Adoptar posición inadecuada para hacer una tarea</Text>
            <Switch value={switchValue4} onValueChange={setSwitchValue4} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Uso incorrecto de equipos y/o herramientas</Text>
            <Switch value={switchValue5} onValueChange={setSwitchValue5} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Incumplimiento del procedimiento de trabajo</Text>
            <Switch value={switchValue6} onValueChange={setSwitchValue6} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Conducir a excesiva velocidad</Text>
            <Switch value={switchValue7} onValueChange={setSwitchValue7} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Iniciar actividades sin antes realizar el permiso de trabajo</Text>
            <Switch value={switchValue8} onValueChange={setSwitchValue8} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Iniciar actividad sin contar con la firma del supervisor</Text>
            <Switch value={switchValue9} onValueChange={setSwitchValue9} />
          </View>

          <MarginedTextInput_Modal1 margin={20} characterLimit={200} />

          {/* Agregar botón de enviar */}
          <View style={styles.rowContainer}>
          <Pressable
            style={styles.buttonSend}
            onPress={() => {
              // Aquí puedes realizar alguna acción con los valores de los interruptores y el cuadro de texto
              console.log('Interruptor 1:', switchValue1);
              console.log('Interruptor 2:', switchValue2);
              console.log('Interruptor 3:', switchValue3);
              console.log('Texto ingresado:', textInputValue);
              setEnvioModal1(true);
              setenvioCompleteModal1(true);
              
              // Cerrar este modal individual
              onClose();
            }}
          >
            <Text style={styles.buttonText}>Enviar Condición</Text>
          </Pressable>
          <View style={styles.buttonSeparator} />
          <Pressable
            style={styles.buttonDelete}
            onPress={() => {
              onClose(); // Cerrar este modal individual
            }}>
            <Text style={styles.buttonText}>Regresar</Text>
          </Pressable>
          </View>
          
        </View>
        
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
  );
};
// Componente para el contenido del modal individual
const ModalContent_2 = ({ onClose, modalNumber, isVisible,setEnvioModal2, setenvioCompleteModal2 }) => {
  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);
  const [switchValue3, setSwitchValue3] = useState(false);
  const [switchValue4, setSwitchValue4] = useState(false);
  const [switchValue5, setSwitchValue5] = useState(false);
  const [switchValue6, setSwitchValue6] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  // Estilos específicos para cada modal
  const modalStyles =
    modalNumber === 1 ? styles.modal1 : modalNumber === 2 ? styles.modal2 : {};

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible} // Utiliza la prop isVisible para controlar la visibilidad del modal
      onRequestClose={() => {
        onClose();
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.centeredView, modalStyles]}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Observaciones</Text>
          <Text style={styles.modalText}>Condiciones subestandares</Text>


          {/* Agregar 3 interruptores */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Falta de orden y limpieza en el área de trabajo</Text>
            <Switch value={switchValue1} onValueChange={setSwitchValue1} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Falta de señalización</Text>
            <Switch value={switchValue2} onValueChange={setSwitchValue2} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Gases comprimidos mal almacenados</Text>
            <Switch value={switchValue3} onValueChange={setSwitchValue3} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>EPP deteriorado</Text>
            <Switch value={switchValue4} onValueChange={setSwitchValue4} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Ventilación deficiente</Text>
            <Switch value={switchValue5} onValueChange={setSwitchValue5} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Equipos o herramientas en mal estado</Text>
            <Switch value={switchValue6} onValueChange={setSwitchValue6} />
          </View>

          <MarginedTextInput_Modal2 margin={20} characterLimit={200} />

          {/* Agregar botón de enviar */}
          <View style={styles.rowContainer}>
          <Pressable
             style={styles.buttonSend}
            onPress={() => {
              // Aquí puedes realizar alguna acción con los valores de los interruptores y el cuadro de texto
              console.log('Interruptor 1:', switchValue1);
              console.log('Interruptor 2:', switchValue2);
              console.log('Interruptor 3:', switchValue3);
              console.log('Texto ingresado:', textInputValue);
              setEnvioModal2(true);
              setenvioCompleteModal2(true);
              // Cerrar este modal individual
              onClose();
            }}
          > 
            <Text style={styles.buttonText}>Enviar Condición</Text>
          </Pressable>
          <View style={styles.buttonSeparator} />
          <Pressable
            style={styles.buttonDelete}
            onPress={() => {
              onClose(); // Cerrar este modal individual
            }}>
            <Text style={styles.buttonText}>Regresar</Text>
          </Pressable>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo semitransparente
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1A5276',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#17202A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal1: {
    backgroundColor: '#17202A', // Color de fondo personalizado para Modal 1
    shadowColor: '#17202A',
  },
  modal2: {
    backgroundColor: '#17202A', // Color de fondo personalizado para Modal 1
    shadowColor: '#17202A',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#49B4CB',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    flex: 1,
    marginRight: 10,
    color: 'white',
  },
  additionalScreenText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textInput: {
    color: 'white',
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10, // Espacio entre el cuadro de texto y los interruptores
  },rowContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea verticalmente en el centro
    marginBottom: 5, // Espacio entre la fila y otros elementos
  },
  leftColumn: {
    flex: 2, // Toma el 50% del ancho disponible
  },
  rightColumn: {
    flex: 2, // Toma el 50% del ancho disponible
    marginLeft: 5, // Espacio entre el texto y el cuadro de texto
  },
  centeredView_BoxText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo semi transparente
  },
  modalView_BoxText: {
    borderRadius: 1,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    height: 250,
  },
  titleContainer_BoxText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle_BoxText: {
    flex:1,
    fontWeight: 'bold',
    marginRight: 10,
  },
  textInput_BoxText: {
    flex:1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    height: 200, // Altura fija para la caja de texto
  },
  buttonSeparator: {
    margin: 1,
  },
  buttonSend: {
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDelete: {
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContent: {
    backgroundColor: '#17202A' 
  },
  
});

export default CustomModal;