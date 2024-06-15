import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  textArea: {
    width: "100%",
    height: 100,
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: "top", // for Android
  },
  button: {
    backgroundColor: "#334155",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  stories: {
    color: "white",
    fontFamily: "MobilesFont",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
const AddStoryScreen = ({ route, navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    useEffect(() => {
      const sendStoryData = async () => {
        try {
          const response = await axios.post('api/v1/story', {
            title,
            description,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      if (title && description) {
        sendStoryData();
      }
    }, [title, description]);
  
    return (
      <>
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://i.postimg.cc/Y0xQqW9m/logo.png",
            }}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Story Title"
            placeholderTextColor="#808080"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
            placeholder="Story Description"
            placeholderTextColor="#808080"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Add Story</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

export default AddStoryScreen;
