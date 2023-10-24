import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import SwitchRow from './SwitchRow';

const MarginedTextInput = ({ margin, characterLimit,text, setText, switch1, switch2, switch3  }) => {

  const [linesWithMargins, setLinesWithMargins] = useState([]);

  useEffect(() => {
    // Dividir el texto en líneas con el margen dado
    const lines = text ? text.match(new RegExp(`.{1,${margin}}`, 'g')) || [] : [];
    setLinesWithMargins(lines);
  }, [text, margin]);

  const handleTextChange = (newText) => {
    if (newText.length <= characterLimit) {
      setText(newText);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textMargin}>Correción</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        placeholder="Detalla la correción..."
        placeholderTextColor="#95A5A6"
        onChangeText={handleTextChange}
        value={text}
      />
      <SwitchRow switch1={switch1}  switch2={switch2}  switch3={switch3}  ></SwitchRow>
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
    color: 'white',
  },
  textInput: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'white',
  },
});

export default MarginedTextInput;