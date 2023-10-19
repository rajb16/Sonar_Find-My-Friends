import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Find My Friend</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType='email-address'
        autoCompleteType='off'
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.buttons}>
        <Button title="signin" />
        <Button title="Create"  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    marginBottom: 30,
  },
  input: {
    width: 300,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6d69c3',
    marginVertical: 10,
    padding: 15,
  },
  buttons: {
    width: 150,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});