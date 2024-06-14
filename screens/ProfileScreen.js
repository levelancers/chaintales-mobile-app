import { SafeAreaView, Text, View, Image, TextInput, StyleSheet, Button, Platform, TouchableOpacity } from "react-native";
import React from "react";
import SplashScreen from './SplashScreen';
import { useState, useEffect } from "react";
import { selectToken, selectUser, setUser } from "../store/slices/userSlice";
import * as Font from 'expo-font';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Alert } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        width: '80%',
        padding: 20,
        backgroundColor: '#F8F6E3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F6E3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
      width: 300,
      height: 100,
      alignSelf: 'center',
      marginBottom: 20,
      paddingHorizontal: 40,
      resizeMode: 'contain',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    welcomeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'MobilesFont',
    },
    button: {
        backgroundColor: "#334155",
        color: "#fff",
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
    },
    logoutText: {
        color: '#fff',
        fontFamily: 'MobilesFont',
    },
    username: {
        color: '#7BC9FF',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'MobilesFont',
    },  
});



export default function( {navigation} ) {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [OnChangeName, onChangeName] = React.useState(user.name);
    const [mail, onChangeMail] = React.useState(user.email);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    
    async function handleUpdate(){
        setErrors({});

        try {
            const response = await axios.put(`https://chaintales.bieda.it/api/v1/user/${user.id}`, {
                "name": name,
                "email": email
            },
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              },
            );
            if(response.data.user){
                Alert.alert("Success", "Updated succesfully");
                dispatch(setUser(response.data.user));
                navigation.navigate("Home")
            }
        } catch (e) {
            if (e.response?.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Name:</Text>
            <TextInput
            style={styles.wrapper}
            value={name}
            placeholder={OnChangeName}
            onChangeText={(text) => setName(text)}
            errors={errors.name}
            />
            <Text>e-mail:</Text>
            <TextInput 
            style={styles.wrapper}
            value={email}
            placeholder={mail}
            onChangeText={text => setEmail(text)}
            errors={errors.email}
            />
            <Text>Role:</Text>
            <Text>{user.role}</Text>
            <Button
            styles={styles.button}
            title="save"
            onPress={handleUpdate}/>
            <Button 
            title="Back"
            onPress={() => navigation.navigate("Home")}/>
        </SafeAreaView>
    )
}


