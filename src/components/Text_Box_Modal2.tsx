import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Switch } from 'react-native';

const MarginedTextInput_Modal2 = ({ margin, characterLimit, text2, setText2, switchValue2, setSwitchValue2 }) => {

  const [linesWithMargins, setLinesWithMargins] = useState([]);

  useEffect(() => {
    // Dividir el texto en líneas con el margen dado
    const lines = text2.match(new RegExp(`.{1,${margin}}`, 'g')) || [];
    setLinesWithMargins(lines);
  }, [text2, margin]);

  const handleTextChange = (newText) => {
    if (newText.length <= characterLimit) {
      setText2(newText);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text style={styles.textMargin}>Otro:</Text>
          <Switch value={switchValue2} onValueChange={setSwitchValue2} />
        </View>

        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Detalle aquí..."
          placeholderTextColor="#95A5A6"
          onChangeText={handleTextChange}
          value={text2}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  textMargin: {
    marginRight: 8, // Espacio entre el texto y el margen derecho
    marginBottom: 8, // Espacio entre las líneas de texto
    color: 'black',
  },
  textInput: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'black',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MarginedTextInput_Modal2;