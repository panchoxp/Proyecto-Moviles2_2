import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { db } from '../config/Config';

export default function OperacionesScreen() {
  const [id, setId] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('');
  const [comentario, setComentario] = useState('');

  function guardarOperaciones() {
    set(ref(db, 'operaciones/' + id), {             
      monto: monto,
      tipo: tipo,
      comentario: comentario,
    }).then(() => {      
      setId('');
      setMonto('');
      setTipo('');
      setComentario('');
      
      Alert.alert('Operación finalizada', 'La operación ha finalizado con exito');
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operaciones</Text>

      <TextInput
        style={styles.input}
        placeholder="ID operación"
        value={id}
        onChangeText={(texto) => setId(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        value={monto}
        onChangeText={(texto) => setMonto(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo operación"
        value={tipo}
        onChangeText={(texto) => setTipo(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        value={comentario}
        onChangeText={(texto) => setComentario(texto)}
      />

      <TouchableOpacity style={styles.button} onPress={guardarOperaciones}>
        <Text style={styles.buttonText}>Ejecutar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    height: 50,
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
