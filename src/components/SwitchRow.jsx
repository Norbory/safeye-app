import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SwitchRow = ({switch1, setSwitch1,switch2, setSwitch2,switch3, setSwitch3}) => {


  const handleSwitch1Change = (value) => {
    setSwitch1(value);
    setSwitch2(false); // Desactiva switch2
    setSwitch3(false); // Desactiva switch3
  };

  const handleSwitch2Change = (value) => {
    setSwitch2(value);
    setSwitch1(false); // Desactiva switch1
    setSwitch3(false); // Desactiva switch3
  };

  const handleSwitch3Change = (value) => {
    setSwitch3(value);
    setSwitch1(false); // Desactiva switch1
    setSwitch2(false); // Desactiva switch2
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.switchContainer}>
        <Text style={styles.labelText}>SI</Text>
        <Switch
          value={switch1}
          onValueChange={(value) => handleSwitch1Change(value)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.labelText}>NO</Text>
        <Switch
          value={switch2}
          onValueChange={(value) => handleSwitch2Change(value)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.labelText}>NA</Text>
        <Switch
          value={switch3}
          onValueChange={(value) => handleSwitch3Change(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Alinea el texto y el interruptor a la derecha
  },
  labelText: {
    fontSize: 12,
    marginRight: 1, // Espacio entre el texto y el interruptor (ajustado a 5) aumento se separa, si disminuyo 
    marginLeft: 1, // Espacio entre el interruptor y la letra
    color: 'black',
  },
});

export default SwitchRow;