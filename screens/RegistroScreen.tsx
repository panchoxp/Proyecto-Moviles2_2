import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

//firebase
import { getDatabase, ref, set } from "firebase/database";
import {createUserWithEmailAndPassword } from "firebase/auth";//registro
import { auth, db } from '../config/Config';


export default function RegistroScreen({navigation}:any) {
    const [usuario, setusuario] = useState('')
    const [correo, setcorreo] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfig] = useState('')

    createUserWithEmailAndPassword(auth, correo, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                navigation.navigate("Login");  //redirigir al login
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                Alert.alert(errorCode, errorMessage);
            });
    
    return (
        <ImageBackground source={{ uri: 'https://static.vecteezy.com/system/resources/previews/020/194/761/non_2x/bank-icon-for-your-website-design-logo-app-ui-free-vector.jpghttps://images.vexels.com/media/users/3/129288/isolated/preview/52e06e07244a3590366669665ea540e3-icono-de-circulo-de-banco-3.png' }} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nick"
                    placeholderTextColor="#aaa"
                    value={usuario}
                    onChangeText={setusuario}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={correo}
                    onChangeText={setcorreo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setpassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Verificar Contraseña"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setconfig}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,        
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#0009',
        height: 50,
        width: '80%',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 40,
        paddingHorizontal: 15,
        color: 'white',
        borderColor: 'rgb(86, 0, 136)',
        fontSize: 17
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'rgb(0, 216, 255)',
        borderRadius: 20,
        padding: 13,
        width: '50%',
        marginTop: 20
    },
    buttonText: {
        color: '#000',
        fontSize: 22,
        textAlign: 'center',
      }
})
