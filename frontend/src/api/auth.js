import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/auth';

// Signup function
export const signup = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, {
            email,
            password,
        });

        if (response.data.token) {
            return {
                success: true,
                token: response.data.token,
            };
        } else {
            return {
                success: false,
                message: response.data.message || "Signup failed",
            };
        }
    } catch (error) {
        console.error('Error signing up:', error);
        return {
            success: false,
            message: error.response?.data?.message || "An error occurred during signup.",
        };
    }
};

// Signin function
export const signin = async (email, password) => {
    try {
        const res = await axios.post(`${BASE_URL}/signin`, { email, password });

        if (res.data.token) {
            return {
                success: true,
                token: res.data.token,
            };
        } else {
            return {
                success: false,
                message: res.data.message || "Signin failed",
            };
        }
    } catch (error) {
        console.error('Error signing in:', error);
        return {
            success: false,
            message: error.response?.data?.message || "An error occurred during signin.",
        };
    }
};

// Get user profile data function
export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return {
            success: false,
            message: error.response?.data?.message || "An error occurred while fetching user profile.",
        };
    }
};

// Update user profile data function
export const updateUserProfile = async (token, userData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: "User profile updated successfully!",
        };
    } catch (error) {
        console.error('Error updating user profile:', error);
        return {
            success: false,
            message: error.response?.data?.message || "An error occurred while updating user profile.",
        };
    }
};