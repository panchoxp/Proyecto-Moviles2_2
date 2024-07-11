import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
//loggin firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("MyTabs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode);

        switch (errorCode) {
          case 'auth/invalid-credential':
            Alert.alert('Error', 'Usuario no existente.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Error', 'Correo inválido.');
            break;
          case 'auth/missing-password':
            Alert.alert('Error', 'Ingrese una contraseña.');
            break;
          case 'auth/too-many-requests':
            Alert.alert('Error', 'La contraseña es incorrecta.');
            break;
          default:
            Alert.alert(errorMessage);
            break;
        }
      });
  }

  return (
    <ImageBackground
      source={{ uri: 'https://static.vecteezy.com/system/resources/previews/020/194/761/non_2x/bank-icon-for-your-website-design-logo-app-ui-free-vector.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder='Ingresa tu correo electrónico'
            placeholderTextColor="#aaa"
            onChangeText={(texto) => setCorreo(texto)}
            keyboardType='email-address'
            value={correo}
          />
          <TextInput
            style={styles.input}
            placeholder='Ingresa contraseña'
            placeholderTextColor="#aaa"
            onChangeText={(texto) => setContrasenia(texto)}
            secureTextEntry
            value={contrasenia}
          />

          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <Button title='Cancelar' onPress={() => navigation.navigate('Welcome')} color="#ff6347" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    height: 50,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'rgb(0, 216, 255)',
    borderRadius: 5,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
});
