import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { verifyInstallation } from 'nativewind';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigation/RootNavigator';

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Button, Text, TouchableOpacity, View, FlatList, Image, Modal, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const Stack = createNativeStackNavigator();

export default function App() {
  verifyInstallation();

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const photosDir = `${FileSystem.documentDirectory}photos`;
      const dirInfo = await FileSystem.getInfoAsync(photosDir);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(photosDir);
        return;
      }

      const photoFiles = await FileSystem.readDirectoryAsync(photosDir);
      setPhotos(photoFiles.map(fileName => `${photosDir}/${fileName}`));
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const photosDir = `${FileSystem.documentDirectory}photos`;
        
        // Ensure the photos directory exists
        const dirInfo = await FileSystem.getInfoAsync(photosDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(photosDir);
        }

        // Generate unique filename with timestamp
        const filename = `${Date.now()}.jpg`;
        const destination = `${photosDir}/${filename}`;
        
        await FileSystem.moveAsync({
          from: photo.uri,
          to: destination
        });

        setShowCamera(false);
        loadPhotos(); // Reload the photos list
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const renderPhotoItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.photoThumbnail}
    />
  );

  if (!permission) {
    // Camera permissions are still loading.
    return <ActivityIndicator />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCamera}
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={styles.container}>
          <CameraView 
            style={styles.camera} 
            facing={facing}
            ref={cameraRef}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.text}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setShowCamera(false)}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </Modal>

      <View style={styles.mainContent}>
        <Text style={styles.albumTitle}>Photo Album</Text>
        <FlatList
          data={photos}
          renderItem={renderPhotoItem}
          keyExtractor={item => item}
          numColumns={3}
          contentContainerStyle={styles.photoList}
        />
      </View>

      <TouchableOpacity 
        style={styles.openCameraButton} 
        onPress={() => setShowCamera(true)}
      >
        <Text style={styles.openCameraText}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60,
  },
  mainContent: {
    flex: 1,
    padding: 10,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  openCameraButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  openCameraText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  albumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photoList: {
    paddingVertical: 10,
  },
  photoThumbnail: {
    width: Dimensions.get('window').width / 3 - 14,
    height: Dimensions.get('window').width / 3 - 14,
    margin: 5,
    borderRadius: 5,
  },
});
