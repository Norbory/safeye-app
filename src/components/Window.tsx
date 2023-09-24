import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Switch, Button, TextInput } from 'react-native';



const CustomModal = ({ isModalVisible, onClose }) => {
  const [envioModal1, setEnvioModal1] = useState(false);
  const [envioModal2, setEnvioModal2] = useState(false);




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
        closeAllModals(); // Cerrar todos los modales adicionales y los interruptores
        onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Alo chupetin</Text>

          {/* Interruptor 1 (Switch) */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Interruptor 1</Text>
            <Switch
              value={switchValue1}
              onValueChange={(value) => handleSwitch1Change(value)}
            />
          </View>

          {/* Mostrar contenido 1 si modal1Visible es verdadero */}
          {modal1Visible ? (
            <ModalContent_1
              onClose={() => {
                setModal1Visible(false);
                setSwitchValue1(false); // Cerrar el modal 1 y el interruptor 1
              }}
              setEnvioModal1={setEnvioModal1}
              modalNumber={1}
            />
          ) : null}

          {/* Interruptor 2 (Switch) */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Interruptor 2</Text>
            <Switch
              value={switchValue2}
              onValueChange={(value) => handleSwitch2Change(value)}
            />
          </View>

          {/* Mostrar contenido 2 si modal2Visible es verdadero */}
          {modal2Visible ? (
            <ModalContent_2
              onClose={() => {
                setModal2Visible(false);
                setSwitchValue2(false); // Cerrar el modal 2 y el interruptor 2
              }}
              setEnvioModal2={setEnvioModal2}
              modalNumber={2}
            />
          ) : null}
          
          <Button
            title="Enviar"
            onPress={() => {
              // Aquí puedes realizar alguna acción con los valores de los interruptores y el cuadro de texto
              // Cerrar este modal individual
              onClose();
            }}
            disabled = {!envioModal1 || !envioModal2}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              closeAllModals(); // Cerrar todos los modales adicionales y los interruptores
              onClose();
            }}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// Componente para el contenido del modal individual
const ModalContent_1 = ({ onClose, modalNumber, isVisible, setEnvioModal1 }) => {
  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);
  const [switchValue3, setSwitchValue3] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  // Estilos específicos para cada modal
  const modalStyles =
    modalNumber === 1 ? styles.modal1 : modalNumber === 2 ? styles.modal2 : {};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible} // Utiliza la prop isVisible para controlar la visibilidad del modal
      onRequestClose={() => {
        onClose();
      }}>
      <View style={[styles.centeredView, modalStyles]}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Contenido del Modal {modalNumber}</Text>

          {/* Agregar 3 interruptores */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Interruptor 1</Text>
            <Switch value={switchValue1} onValueChange={setSwitchValue1} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>GAAAA 2</Text>
            <Switch value={switchValue2} onValueChange={setSwitchValue2} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Interruptor 3</Text>
            <Switch value={switchValue3} onValueChange={setSwitchValue3} />
          </View>

          {/* Agregar cuadro de texto */}
          <TextInput
            style={styles.textInput}
            placeholder="Escribe algo..."
            onChangeText={(text) => setTextInputValue(text)}
            value={textInputValue}
          />

          {/* Agregar botón de enviar */}
          <Button
            title="Enviar"
            onPress={() => {
              // Aquí puedes realizar alguna acción con los valores de los interruptores y el cuadro de texto
              console.log('Interruptor 1:', switchValue1);
              console.log('Interruptor 2:', switchValue2);
              console.log('Interruptor 3:', switchValue3);
              console.log('Texto ingresado:', textInputValue);
              setEnvioModal1(true);
              // Cerrar este modal individual
              onClose();
            }}
          />

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              onClose(); // Cerrar este modal individual
            }}>
            <Text style={styles.textStyle}>Cerrar Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
// Componente para el contenido del modal individual
const ModalContent_2 = ({ onClose, modalNumber, isVisible,setEnvioModal2 }) => {
  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);
  const [switchValue3, setSwitchValue3] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  // Estilos específicos para cada modal
  const modalStyles =
    modalNumber === 1 ? styles.modal1 : modalNumber === 2 ? styles.modal2 : {};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible} // Utiliza la prop isVisible para controlar la visibilidad del modal
      onRequestClose={() => {
        onClose();
      }}>
      <View style={[styles.centeredView, modalStyles]}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Contenido del Modal {modalNumber}</Text>

          {/* Agregar 3 interruptores */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Interruptor 1</Text>
            <Switch value={switchValue1} onValueChange={setSwitchValue1} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Interruptor 2</Text>
            <Switch value={switchValue2} onValueChange={setSwitchValue2} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Interruptor 3</Text>
            <Switch value={switchValue3} onValueChange={setSwitchValue3} />
          </View>

          {/* Agregar cuadro de texto */}
          <TextInput
            style={styles.textInput}
            placeholder="Escribe algo..."
            onChangeText={(text) => setTextInputValue(text)}
            value={textInputValue}
          />

          {/* Agregar botón de enviar */}
          <Button
            title="Enviar"
            onPress={() => {
              // Aquí puedes realizar alguna acción con los valores de los interruptores y el cuadro de texto
              console.log('Interruptor 1:', switchValue1);
              console.log('Interruptor 2:', switchValue2);
              console.log('Interruptor 3:', switchValue3);
              console.log('Texto ingresado:', textInputValue);
              setEnvioModal2(true);
              // Cerrar este modal individual
              onClose();
            }}
          />

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              onClose(); // Cerrar este modal individual
            }}>
            <Text style={styles.textStyle}>Cerrar Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal1: {
    backgroundColor: '#FDC6D1', // Color de fondo personalizado para Modal 1
  },
  modal2: {
    backgroundColor: '#D1FDC6', // Color de fondo personalizado para Modal 2
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    flex: 1,
    marginRight: 10,
  },
  additionalScreenText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10, // Espacio entre el cuadro de texto y los interruptores
  },
});

export default CustomModal;