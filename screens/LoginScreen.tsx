import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
//loggin firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function login() {
    //const auth = getAuth();//se corta para config
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("MyTabs");//navegacion 
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/invalid-credential':
            Alert.alert('Error', 'Correo invalido.');
            break;
          case 'auth/user-not-found':
            Alert.alert('Error', 'No se encontró un usuario con ese correo.');
            break;
          case 'auth/wrong-password':
            Alert.alert('Error', 'La contraseña es incorrecta.');
            break;
          default:
            Alert.alert('Error', "usuario o contraseña incorrecta");
            break;
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder='Ingresa tu correo electrónico'
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Ingresa contraseña'
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry
      />

      <Button title='Ingresar' onPress={() => login()} />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  registerLink: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
