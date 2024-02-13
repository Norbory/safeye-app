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

// Funciones para almacenar, obtener y eliminar datos de usuario
const storeUser = async (user) => {
  try {
    const jsonUser = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonUser);
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
  }
}

const getUser = async () => {
  try {
    const jsonUser = await AsyncStorage.getItem('user');
    return jsonUser != null ? JSON.parse(jsonUser) : null;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return null;
  }
}

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
  }
}

export { storeToken, getToken, removeToken, storecompanyId, getcompanyId, removecompanyId, storeUser, getUser, removeUser };
