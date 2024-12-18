import { useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native";


const Login = () => {
    const[ email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} 
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail} />
            <TextInput style={styles.input}
             placeholder="Password"
            secureTextEntry />
            <TouchableOpacity activeOpacity={0.6} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        height: 40,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    }
 });

export default Login;