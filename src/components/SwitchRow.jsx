import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SwitchRow = () => {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(false);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.switchContainer}>
        <Text style={styles.labelText}>SI</Text>
        <Switch
          value={switch1}
          onValueChange={(value) => setSwitch1(value)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.labelText}>NO</Text>
        <Switch
          value={switch2}
          onValueChange={(value) => setSwitch2(value)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.labelText}>NA</Text>
        <Switch
          value={switch3}
          onValueChange={(value) => setSwitch3(value)}
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
    marginLeft: 1, // espacio entre interruptor y letra
  },
});

export default SwitchRow;