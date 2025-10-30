'use client';


import { setSession } from './utils';
import { ACCESS_KEY, REFRESH_KEY } from './constant';
import axiosInstance, { endpoints } from '../../../utils/axios';

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post(endpoints.auth.signIn, { email, password });

    // Adjust according to backend response (access & refresh)
    const { access, refresh } = res.data;

    if (!access) {
      throw new Error('Access token not found in response');
    }

    // Save tokens
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);

    // Set axios session header
    setSession(access);

    alert('🎉 User logged in successfully!');
  } catch (error) {
    console.error('Error during sign in:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/** **************************************
 * Sign up + Auto-login
 *************************************** */
export const signUp = async ({ email, password, firstName, lastName, username }) => {
  const params = {
    email,
    username,
    password,
    // first_name: firstName,
    // last_name: lastName,
  };

  try {
    // 1️⃣ Sign up the user
    const res = await axiosInstance.post(endpoints.auth.signUp, params);
    console.log('✅ Signup response:', res.data);

    alert('🎉 User signed up & logged in successfully!');
    return { success: true, message: 'User created and logged in successfully.' };
  } catch (error) {
    console.error('Error during sign up:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    // Clear session & remove tokens
    setSession(null);
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    alert('🔒 User signed out successfully!');
    window.location.href = '/auth/jwt/sign-in';
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
