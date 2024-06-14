import { SafeAreaView, Text, View, TextInput, StyleSheet, Button, Platform } from "react-native";
import { useState, useContext } from "react";
import axios from "../utils/axios";
import { login, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

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
    const {setUser} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    async function handleLogin(){
        setErrors({});

        try {
            await login({
                email,
                password,
                device_name: `${Platform.OS} ${Platform.Version}`
            });

            const user = await loadUser();

            setUser(user);

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
    )
}

const styles = StyleSheet.create({
    label: {
        color: "#334155",
        //fontWeight: 500,
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
})