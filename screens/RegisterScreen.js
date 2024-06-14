import { SafeAreaView, Text, View, TextInput, StyleSheet, Button, Platform } from "react-native";
import { useState } from "react";
import { setToken, setUser } from "../store/slices/userSlice";
import { useDispatch } from 'react-redux';
import axios from 'axios'


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
    export default function() {
        const dispatch = useDispatch();
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [passwordConfirmation, setPasswordConfirmation] = useState("");
        const [errors, setErrors] = useState({});
    
        async function handleRegister({ navigation }){
            setErrors({});
    
            try {
                const response = await axios.post('https://chaintales.bieda.it/api/v1/register', {
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                    device_name: `${Platform.OS} ${Platform.Version}`
                });
    
                if (response.data.access_token) {
                    dispatch(setToken(response.data.access_token));
                    dispatch(setUser(user));
                    navigation.replace("Home");
                }
    
            } catch (e) {
                if (e.response?.status === 422) {
                    setErrors(e.response.data.errors);
                }
            }
        }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
             <FormTextField 
             label="Your name:" 
             value={name} 
             onChangeText={(text) => setName(text)}
             errors={errors.name}
             />
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
             <FormTextField 
             label="Password confirmation:" 
             secureTextEntry={true}
             value={passwordConfirmation} 
             onChangeText={(text) => setPasswordConfirmation(text)}
             errors={errors.password_confirmation}
             />
             <Button title="Register now" onPress={handleRegister}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
});