// AuthUtils.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error al guardar el token:', error);
  }
}

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
}

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error al eliminar el token:', error);
  }
}

//userId
const storeUserId = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', userId);
  } catch (error) {
    console.error('Error al guardar el userId:', error);
  }
}

const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    console.error('Error al obtener el userId:', error);
  }
}

const removeUserId = async () => {
  try {
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.error('Error al eliminar el userId:', error);
  }
}


export { storeToken, getToken, removeToken, storeUserId, getUserId, removeUserId };
