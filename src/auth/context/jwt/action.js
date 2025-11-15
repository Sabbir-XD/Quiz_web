'use client';

import { toast } from 'sonner';

import { axiosInstance } from 'src/utils/axios-instance';

import { setSession } from './utils';
import { ACCESS_KEY, REFRESH_KEY } from './constant';

/** **************************************
 * Sign in
 *
 *************************************** */

export const signInWithPassword = async ({ email, password }, endpoints) => {
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

    toast.success('🎉 User logged in successfully!');
  } catch (error) {
    console.error('Error during sign in:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

/** **************************************
 * Sign up + Auto-login
 *************************************** */
export const signUp = async (
  { email, password, re_password, firstName, lastName, username },
  endpoints
) => {
  console.log('sinup dekha', endpoints);
  const params = {
    email,
    // username,
    password,
    re_password,
    // first_name: firstName,
    // last_name: lastName,
  };

  try {
    // Sign up the user
    const res = await axiosInstance.post(endpoints.auth.signUp, params);
    console.log(' Signup response:', res.data);

    toast.success('🎉 User signed up & logged in successfully!');
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
    toast.success('🔒 User signed out successfully!');
    window.location.href = '/';
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
