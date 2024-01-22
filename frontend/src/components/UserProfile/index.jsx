/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import avatar from "../../assets/avatar.png";
import Loader from "../Loader";
import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({userEmail, onClose}) => {
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
        email: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                
                setIsLoading(true);

                const response = await axios.post('http://localhost:8080/api/userInfo/find',{
                  email:userEmail
                });
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

  return (
    <div className="relative w-96 bg-white overflow-hidden"> 
  <div className="bg-teal-400 py-4 text-center text-black rounded-t-lg font-bold">
    <h1 className="text-xl px-6 text-black">User Profile</h1>
  </div>
  <div className="flex flex-col p-4"> 
    <div className="flex flex-col items-center">
      {userProfile.profileImage ? (
        <img
          src={`http://localhost:8080/api/uploads/${userProfile.profileImage}`}
          alt="Profile Picture"
          className="mb-2 rounded-xl w-2/3 h-1/3 mt-4" 
        />
      ) : (
        <img
          src={avatar}
          alt="Default Image"
          className="mb-2 rounded-xl w-2/3 h-1/3 mt-4" 
        />
      )}
      <div className="w-full rounded-lg border-2 border-teal-700 bg-white mt-4">
        <div className="p-3 mx-auto"> 
          <div>
            <div className="text-lg font-bold text-teal-700 mb-2">
              {userInfo.firstName} {userInfo.lastName}
            </div>
          </div>
          <div className="flex flex-row items-center mb-1">
            <div className="text-sm font-medium text-gray-700">
              Email:
            </div>
            <div className="text-sm font-semibold ml-1">
              {userInfo.email}
            </div>
          </div>
          <div className="flex flex-row items-center mb-1">
            <div className="text-sm font-medium text-gray-700">
              Address:
            </div>
            <div className="text-sm font-semibold ml-1">
              {userProfile.address}
            </div>
          </div>
          <div className="flex flex-row items-center mb-1">
            <div className="text-sm font-medium text-gray-700">
              Bio:
            </div>
            <div className="text-sm font-semibold ml-1">
              {userProfile.bio}
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-sm font-medium text-center text-white rounded-full bg-teal-700 hover-bg-primary-700 focus-ring-4 focus-outline-none focus-ring-primary-300 mt-3"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};
export default UserProfile;
