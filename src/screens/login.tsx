import { useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert("Atenção", "Os campos e-mail e senha são obrigatórios.");
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password);
        } catch (error: any) {
            Alert.alert("Erro", "Falha ao realizar login. Verifique suas credenciais.");
            console.error("Login error:", error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    input: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonDisabled: {
        backgroundColor: "#9E9E9E",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default Login;
