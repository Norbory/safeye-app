import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Switch } from 'react-native';

const MarginedTextInput_Modal1 = ({ margin, characterLimit }) => {

  const [text, setText] = useState('');
  const [linesWithMargins, setLinesWithMargins] = useState([]);
  const [switchValue1, setSwitchValue1] = useState(false);

  useEffect(() => {
    // Dividir el texto en líneas con el margen dado
    const lines = text.match(new RegExp(`.{1,${margin}}`, 'g')) || [];
    setLinesWithMargins(lines);
  }, [text, margin]);

  const handleTextChange = (newText) => {
    if (newText.length <= characterLimit) {
      setText(newText);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text style={styles.textMargin}>Otro:</Text>
          <Switch value={switchValue1} onValueChange={setSwitchValue1} />
        </View>
        
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Detalla aquí..."
          placeholderTextColor="#95A5A6"
          onChangeText={handleTextChange}
          value={text}
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MarginedTextInput_Modal1;