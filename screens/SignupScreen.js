import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components/components.js';
import Firebase from '../utils/firebase';
import "firebase/compat/auth";

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [signupError, setSignupError] = useState('');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const onHandleSignup = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth.createUserWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setSignupError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark-content' />
            <Text style={styles.title}>Inscription</Text>
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='email'
                placeholder='Entrez votre email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='lock'
                placeholder='Entrez votre mot de passe'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='password'
                rightIcon={rightIcon}
                value={password}
                onChangeText={text => setPassword(text)}
                handlePasswordVisibility={handlePasswordVisibility}
            />
            {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
            <Button
                onPress={onHandleSignup}
                backgroundColor='#f57c00'
                title="S'inscrire"
                tileColor='#fff'
                titleSize={20}
                containerStyle={{
                    marginBottom: 24
                }}
            />
            <RNButton
                onPress={() => navigation.navigate('Login')}
                title='Vous avez déjà un compte ?'
                color='#f57c00'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e93b81',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'center',
        paddingBottom: 24
    }
});