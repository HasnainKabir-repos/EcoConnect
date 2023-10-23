import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState({
        useremail: '',
        badge: '',
        points_earned: 0,
        challenges_completed: 0,
        upCycled: 0,
        reCycled: 0,
        followed_communities: [],
        address: '',
        bio: '',
        profileImage: '',
    });

    const [isLoading, setIsLoading] = useState(true);

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email:'',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');
                const tokenValue = JSON.parse(token);
                const config = {
                    headers: { Authorization: `Bearer ${tokenValue.data}` },
                };

                const response = await axios.get('http://localhost:8080/api/userInfo', config);
                const { userProfiles, userInfo } = response.data;
                setUserProfile(userProfiles);
                setUserInfo(userInfo);
                
            } catch (error) {
                console.error('Fetch Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    return { userProfile, userInfo, isLoading };
};