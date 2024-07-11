import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

//firebase
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth"; //registro
import { auth, db } from '../config/Config';

export default function RegistroScreen({ navigation }:any) {
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function guardarUsuario() {
        set(ref(db, 'usuarios/' + usuario), {             
            correo: correo,
        });
    }

    function registro() {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        createUserWithEmailAndPassword(auth, correo, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                guardarUsuario(); // Guarda los datos del usuario en la base de datos
                navigation.navigate("Login"); // Redirigir al login
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorCode, errorMessage);
            });
    }

    return (
        <ImageBackground
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/020/194/761/non_2x/bank-icon-for-your-website-design-logo-app-ui-free-vector.jpg' }}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    placeholderTextColor="#aaa"
                    value={usuario}
                    onChangeText={setUsuario}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={correo}
                    onChangeText={setCorreo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Verificar Contraseña"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity style={styles.button} onPress={registro}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 17,
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
        marginTop: 20,
    },
    buttonText: {
        color: '#000',
        fontSize: 22,
        textAlign: 'center',
    },
});
