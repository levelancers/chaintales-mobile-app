import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/slices/userSlice';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F8F6E3',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    textArea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
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

const AddChapterScreen = ({ route, navigation }) => {

    const token = useSelector(selectToken);
    const { storyId } = route.params;
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');

   
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
                    const response = await axios.post('https://chaintales.bieda.it/api/v1/chapter', chapterData, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
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
         <Image source={{
              uri: 'https://i.postimg.cc/Y0xQqW9m/logo.png'
            }} style={styles.logo}/>
            <TextInput
                style={styles.input}
                placeholder="Chapter Title"
                value={subtitle}
                onChangeText={text => setSubtitle(text)}
            />
            <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={4}
                placeholder="Chapter Content"
                value={content}
                onChangeText={text => setContent(text)}
            />
            <Button title="Submit" onPress={sendChapterData} />
        </View>
    );
}

export default AddChapterScreen;