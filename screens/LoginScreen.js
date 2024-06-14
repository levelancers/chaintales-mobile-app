import { SafeAreaView, TouchableOpacity, Text, View, Image, TextInput, StyleSheet, Button, Platform } from "react-native";
import { useState, useEffect } from "react";
import { setToken, setUser } from "../store/slices/userSlice";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import SplashScreen from './SplashScreen';
import * as Font from 'expo-font';

const fetchFonts = () => {
    return Font.loadAsync({
      'MobilesFont': require('../assets/fonts/MobilesFont.ttf'),
    });
  };

const styles = StyleSheet.create({
    label: {
        color: "#334155",
        fontWeight: "bold",
    },
    textInput: {
        height: 40,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#334155",
        color: "#fff",
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'MobilesFont',
      },
    error: {
        color: "red",
        marginTop: 2,
    },
    wrapper: {
        flex: 1,
        backgroundColor: "#F8F6E3",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F6E3',
      },
    logo: {
        width: 300,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
        paddingHorizontal: 40,
        resizeMode: 'contain',
    },
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
    const [dataLoaded, setDataLoaded] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        fetchFonts().then(() => setDataLoaded(true));
      }, []);
    
      if (!dataLoaded) {
        return <SplashScreen />;
      }

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
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Image source={{
              uri: 'https://i.postimg.cc/Y0xQqW9m/logo.png'
            }} style={styles.logo}/>
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
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={{color: '#fff', fontFamily: 'MobilesFont'}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Create account");
            }} style={styles.button}>
              <Text style={{color: '#fff', fontFamily: 'MobilesFont'}}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
}