import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { selectToken } from "../store/slices/userSlice";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8F6E3",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    paddingHorizontal: 40,
    resizeMode: "contain",
  },
  submitButton: {
    backgroundColor: "#334155",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10, 
    justifyContent: "center", 
    height: 50, 
  },
  submitButtonText: {
    color: "white",
    fontFamily: "MobilesFont",
    fontSize: 16, 
    textTransform: "uppercase",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

const AddChapterScreen = ({ route, navigation }) => {
  const token = useSelector(selectToken);
  const { storyId } = route.params;
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  const sendChapterData = async () => {
    if (subtitle && content) {
      const chapterData = {
        subtitle: subtitle,
        content: content,
        story_id: storyId,
        created_at: new Date(),
        updated_at: new Date(),
      };

      try {
        const response = await axios.post(
          "https://chaintales.bieda.it/api/v1/chapter",
          chapterData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Success", "Chapter is created succesfully!");
        navigation.goBack();
      } catch (error) {
        console.error(error);
        Alert.alert("Failed", "Chapter is just not created.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.postimg.cc/Y0xQqW9m/logo.png",
        }}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Chapter subititle"
        placeholderTextColor="#808080"
        value={subtitle}
        onChangeText={(text) => setSubtitle(text)}
      />
      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={4}
        placeholder="Chapter Content"
        placeholderTextColor="#808080"
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={sendChapterData}>
        <Text style={styles.submitButtonText}>Write Chapter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddChapterScreen;
