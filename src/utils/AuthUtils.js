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

//companyId
const storecompanyId = async (companyId) => {
  try {
    await AsyncStorage.setItem('companyId', companyId);
  } catch (error) {
    console.error('Error al guardar el companyId:', error);
  }
}

const getcompanyId = async () => {
  try {
    const companyId = await AsyncStorage.getItem('companyId');
    return companyId;
  } catch (error) {
    console.error('Error al obtener el companyId:', error);
  }
}

const removecompanyId = async () => {
  try {
    await AsyncStorage.removeItem('companyId');
  } catch (error) {
    console.error('Error al eliminar el companyId:', error);
  }
}


export { storeToken, getToken, removeToken, storecompanyId, getcompanyId, removecompanyId };
