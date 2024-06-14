import { SafeAreaView, Image, Text, TouchableOpacity, StyleSheet, View, Button } from "react-native";
import { clearToken, clearUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { selectToken, selectUser } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import ProfileScreen from "./ProfileScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const styles = StyleSheet.create({
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
    logoutButton: {
        backgroundColor: "#334155",
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
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


export default function({ navigation }) {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);

    const logoutHandler = async () => {
        try {
          await axios.post(
            "https://chaintales.bieda.it/api/v1/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(clearToken());
          dispatch(clearUser());
        } catch (error) {
          console.log(error);
        }
      };
      
    return (
        <SafeAreaView style={styles.container}>
         <Image source={{
              uri: 'https://i.postimg.cc/Y0xQqW9m/logo.png'
            }} style={styles.logo}/>
            <View style={styles.welcomeContainer}>
                {user ? 
                <View>
                <Text style={styles.welcomeText}>Welcome home,</Text>
                <Text style={styles.username}>{user.name}</Text>
                </View> : <Text style={styles.welcomeText}>Chaintales</Text> }
                <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Stories");
                }} style={styles.button}>
                    <Text style={{color: '#fff', fontFamily: 'MobilesFont'}}>Stories</Text>
                </TouchableOpacity>
              <Button title="Profile" style={styles.logoutButton} onPress={() => navigation.navigate("Profile")}/>
            </View>
        </SafeAreaView>
    );
}