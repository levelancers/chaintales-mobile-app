import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from "../store/slices/userSlice";
import { TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F6E3',
    },
    stories: {
        color: "black",
        fontFamily: "MobilesFont",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        padding: 10,
        textTransform: "uppercase",
      },
    storyButton: {
        backgroundColor: '#334155',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    storyText: {
        color: '#fff',
        fontSize: 18,
    },
    chapterContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logo: {
        width: 300,
        height: 100,
        alignSelf: "center",
        marginBottom: 20,
        paddingHorizontal: 40,
        resizeMode: "contain",
      },
});

const StoriesScreen = ({ navigation }) => {
    const [stories, setStories] = useState([]);
    const token = useSelector(selectToken);

    handleStoryPress = (storyId, storyTitle, storyDescription) => {
        navigation.navigate('StoryDetails', { 
            id: storyId, 
            title: storyTitle, 
            description: storyDescription 
        });
    };

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('https://chaintales.bieda.it/api/v1/story', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data.story);
                setStories(response.data.story);
            } catch (error) {
                console.error(error.status, error.message, error.code);
            }
        };
    
        fetchStories();
    }, []);

    return (
        
        <ScrollView style={styles.container}>
              <Image
        source={{
          uri: "https://i.postimg.cc/Y0xQqW9m/logo.png",
        }}
        style={styles.logo}
            />
            <Text style={styles.stories}>Stories</Text>
        {stories.map(story => (
            <TouchableOpacity 
    key={story.id} 
    style={styles.storyButton} 
    onPress={() => handleStoryPress(story.id, story.title, story.description)}
>
    <Text style={styles.storyText}>{story.title}</Text>
</TouchableOpacity>
        ))}
    </ScrollView>
    );
};

export default StoriesScreen;