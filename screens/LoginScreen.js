import { SafeAreaView, Text, View, TextInput, StyleSheet, Button, Platform } from "react-native";
import { useState } from "react";
import { setToken, setUser } from "../store/slices/userSlice";
import { useDispatch } from 'react-redux';
import axios from 'axios';

const styles = StyleSheet.create({
    label: {
        color: "#334155",
        fontWeight: "bold",
    },
    textInput: {
        backgroundColor: "#f1f5f9",
        height: 40,
        marginTop: 4,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#cbd5e1",
        padding: 10,
    },
    error: {
        color: "red",
        marginTop: 2,
    },
    wrapper: {backgroundColor: "#fff", flex: 1},
    container: {padding: 20, rowGap: 16 },
});

function FormTextField({label, errors = [], ...rest }){
    
    return (
        <View>
            {label && 
                <Text style={styles.label}>
                    {label}
                </Text>
            }
            
            <TextInput style={styles.textInput}
            autoCapitalize="none"
            {...rest}/>
            {errors.map((err) => {
                return <Text key={err} style={styles.error}>{err}</Text>
            })}
        </View>
    );
}

export default function({ navigation }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    async function handleLogin(){
        setErrors({});
    
        try {
            console.log('Attempting to log in with email:', email, 'and password:', password);
            const response = await axios.post('https://chaintales.bieda.it/api/v1/login', {
                email,
                password,
                device_name: `${Platform.OS} ${Platform.Version}`
            });
    
            console.log('Response from server:', response);
    
            if (response.data.token) {
                console.log('Received access token:', response.data.token);
                dispatch(setToken(response.data.token));
                console.log('Loaded user:', response.data.user);
                dispatch(setUser(response.data.user));
            }
    
        } catch (e) {
            console.log('Error during login:', e);
            if (e.response?.status === 422) {
                console.log('Validation errors:', e.response.data.errors);
                setErrors(e.response.data.errors);
            }
        }
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
             <FormTextField 
             label="Email address:" 
             value={email} 
             onChangeText={(text) => setEmail(text)}
             keyboardType="email-address"
             errors={errors.email}
             />
             <FormTextField 
             label="Password:" 
             secureTextEntry={true}
             value={password} 
             onChangeText={(text) => setPassword(text)}
             errors={errors.password}
             />
             <Button title="Login" onPress={handleLogin}/>
             <Button title="Create an account" onPress={() => {
                navigation.navigate("Create account");
             }}/>
            </View>
        </SafeAreaView>
    );
}
