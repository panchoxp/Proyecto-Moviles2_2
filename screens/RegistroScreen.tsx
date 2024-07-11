import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import React, { useState } from 'react';

//firebase
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth"; //registro
import { auth, db } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ci, setci] = useState('')

    function guardarUsuario() {
        set(ref(db, 'usuarios/' + usuario), {
            correo: correo,
            ci:ci
        });
    }

    function registro() {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        createUserWithEmailAndPassword(auth, correo, password)
            .then((userCredential) => {
                const user = userCredential.user;
                guardarUsuario();
                navigation.navigate("Login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //console.log(errorCode);
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        Alert.alert('Error', 'El correo ya existe');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('Error', 'Correo invalido');
                        break;
                    case 'auth/missing-password':
                        Alert.alert('Error', 'Ingrese una contraseña de 6 dígitos');
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
                    <Text style={styles.title}>Registro</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        placeholderTextColor="#aaa"
                        value={usuario}
                        onChangeText={(texto) => setUsuario(texto)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Cedula"
                        placeholderTextColor="#aaa"
                        value={ci}
                        onChangeText={setci}
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

