import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { selectToken } from "../store/slices/userSlice";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        marginBottom: 20,
    },
    chapterContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    chapterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    chapterContent: {
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        marginTop: 10,
    },

});

const StoryDetailScreen = ({ route, navigation }) => {
    const { id, title, description } = route.params;
    const [chapters, setChapters] = useState(null);
    const token = useSelector(selectToken);

    const fetchStory = useCallback(async () => {
        try {
            const response = await axios.get(`https://chaintales.bieda.it/api/v1/story/${id}/chapters`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setChapters(response.data.chapters);
        } catch (error) {
            console.error(error);
        }
    }, [id, token]);

    useEffect(() => {
        fetchStory();
    }, [fetchStory]);

    useFocusEffect(
        useCallback(() => {
            fetchStory();
        }, [fetchStory])
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {chapters ? chapters.map((chapter, index) => (
                <View key={chapter.id} style={[styles.chapterContainer, {backgroundColor: '#e0e0e0'}]}>
                    <Text style={styles.chapterTitle}>{`Chapter ${index + 1}: ${chapter.subtitle}`}</Text>
                    <Text style={styles.chapterContent}>{chapter.content}</Text>
                </View>
            )) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            )}
            <Button title="Add Chapter" onPress={() => navigation.navigate('AddChapter', { storyId: chapters[0].story_id })} />
        </ScrollView>
    );
}

export default StoryDetailScreen;