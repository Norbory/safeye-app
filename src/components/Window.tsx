import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TextInput, Switch } from 'react-native';

const CustomModal = ({ isModalVisible, onClose }) => {
  const [textInputValue, setTextInputValue] = useState('');
  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);

  // Función para manejar el cambio del interruptor 1
  const handleSwitch1Change = (value) => {
    setSwitchValue1(value);
    setShowContent1(value);
  };

  // Función para manejar el cambio del interruptor 2
  const handleSwitch2Change = (value) => {
    setSwitchValue2(value);
    setShowContent2(value);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
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

          {/* Interruptor 2 (Switch) */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Interruptor 2</Text>
            <Switch
              value={switchValue2}
              onValueChange={(value) => handleSwitch2Change(value)}
            />
          </View>

          {/* Mostrar contenido 1 si showContent1 es verdadero */}
          {showContent1 ? (
            <View>
              {/* Contenido personalizado cuando el Interruptor 1 está activado */}
              <Text>Contenido personalizado para Interruptor 1</Text>
              {/* Puedes agregar campos de texto, otros interruptores, etc. aquí */}
            </View>
          ) : null}

          {/* Mostrar contenido 2 si showContent2 es verdadero */}
          {showContent2 ? (
            <View>
              {/* Contenido personalizado cuando el Interruptor 2 está activado */}
              <Text>Contenido personalizado para Interruptor 2</Text>
              {/* Puedes agregar campos de texto, otros interruptores, etc. aquí */}
            </View>
          ) : null}

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => onClose()}>
            <Text style={styles.textStyle}>Hide Modal</Text>
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
    backgroundColor: "#49B4CB",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputText: {
    marginLeft: 10,
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
});

export default CustomModal;