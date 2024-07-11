import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function WelcomeScreen({navigation}:any) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Image 
        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/020/194/761/non_2x/bank-icon-for-your-website-design-logo-app-ui-free-vector.jpg' }}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={()=> navigation.navigate('Login')} />
        <Button title="Registro" onPress={()=> navigation.navigate('Registro')} />
      </View>
      <Text style={styles.nameText}>Francisco Sucuy</Text>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 18,
    color: 'gray',
  },
});
