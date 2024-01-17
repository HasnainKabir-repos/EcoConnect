/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import TopBar from "../TopBar";
import Loader from "../Loader";
import { useUserProfile } from "../../hooks/useUserProfile";

const UserProfile = () => {
  const { userProfile, userInfo, isLoading } = useUserProfile();

  return (
    <>
      <TopBar />

      <main className="bg-cover bg-center min-h-screen w-full flex-col px-10 pb-5 pt-20 rounded-lg bg-gray-300">
        <div>{isLoading ? <Loader /> : console.log("Loaded")}</div>
        <div className="max-w-3xl mx-auto h-min pt-5 mt-120 shadow-lg  rounded-lg">
          <div className="bg-teal-400 py-4 text-center text-black rounded-t-lg font-bold">
            <h1 className="text-xl px-6 text-black">User Profile</h1>
          </div>
          <div className="flex flex-col p-5 bg-gray-100 rounded-lg mx-auto">
            <div className="flex flex-col w-full ">
              {userProfile.profileImage ? (
                <img
                  src={`http://localhost:8080/api/uploads/${userProfile.profileImage}`}
                  alt="Profile Picture"
                  className="mb-2 rounded-xl w-3/5 h-3/5 object-cover mx-auto mt-6"
                />
              ) : (
                <img
                  src={avatar}
                  alt="Default Image"
                  className="mb-2 rounded-xl w-3/5 h-3/5 object-cover mx-auto mt-6"
                />
              )}
              <div className="w-full rounded-lg border-2 border-teal-700 bg-white mt-10">
                <div className="p-4">
                  <div>
                    <div className="text-2xl font-bold text-teal-700 mb-4">
                      {userInfo.firstName} {userInfo.lastName}
                    </div>
                  </div>
                  <div className="flex flex-row items-center mb-2">
                    <div className="text-lg font-medium text-gray-700">
                      Email :
                    </div>
                    <div className="text-lg font-semibold ml-2">
                      {userInfo.email}
                    </div>
                  </div>
                  <div className="flex flex-row items-center mb-2">
                    <div className="text-lg font-medium text-gray-700">
                      Adress :
                    </div>
                    <div className="text-lg font-semibold ml-2">
                      {userProfile.address}
                    </div>
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="text-lg font-medium text-gray-700 mb-2">
                      Bio :
                    </div>
                    <div className="text-lg font-semibold ml-2 mb-2">
                      {userProfile.bio}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default UserProfile;
