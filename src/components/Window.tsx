import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Switch } from 'react-native';

const CustomModal = ({ isModalVisible, onClose }) => {
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
            <ModalContent
              onClose={() => {
                setModal1Visible(false);
                setSwitchValue1(false); // Cerrar el modal 1 y el interruptor 1
              }}
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
            <ModalContent
              onClose={() => {
                setModal2Visible(false);
                setSwitchValue2(false); // Cerrar el modal 2 y el interruptor 2
              }}
              modalNumber={2}
            />
          ) : null}

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
const ModalContent = ({ onClose, modalNumber }) => {
  // Estilos específicos para cada modal
  const modalStyles =
    modalNumber === 1 ? styles.modal1 : modalNumber === 2 ? styles.modal2 : {};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true} // Mostrar este modal individual
      onRequestClose={() => {
        onClose();
      }}>
      <View style={[styles.centeredView, modalStyles]}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Contenido del Modal {modalNumber}</Text>

          {/* Puedes agregar contenido personalizado aquí */}

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
});

export default CustomModal;