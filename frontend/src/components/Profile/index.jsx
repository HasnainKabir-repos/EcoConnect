import React from "react";
import { Link } from "react-router-dom";
import avatar from '../../assets/avatar.png';
import TopBar from "../TopBar";
import Loader from "../Loader";
import { useUserProfile } from "../../hooks/useUserProfile";

const Profile = () => {
  const { userProfile, userInfo, isLoading } = useUserProfile();

  return (
    <>
      <TopBar />


      <main className="bg-cover bg-center min-h-screen w-full flex-col px-10 pb-5 pt-20 rounded-lg bg-gray-200">
        <div>{
          isLoading ? (<Loader />) : (console.log("Loaded"))
        }

        </div>
        <div className="max-w-3xl mx-auto h-min pt-5 mt-120 shadow-lg  rounded-lg">
          <div className="bg-teal-400 py-4 text-center text-black rounded-t-lg font-bold">
            <h1 className="text-xl px-6 text-black">
              User Profile
            </h1>
          </div>
          <div className="flex flex-col p-5 bg-white rounded-lg">
            <div className="flex flex-row w-full ">
              <div className="w-1/2 rounded-lg border border-teal-600 mr-2 bg-white ">
                <div className="p-4">
                  <div>
                    <div className="text-2xl font-semibold text-teal-600 mb-2">
                      {userInfo.firstName} {userInfo.lastName}
                    </div>
                  </div>
                  <div className="flex flex-row items-center mb-4">
                    <div className="text-lg font-medium text-gray-700">Email:</div>
                    <div className="text-base font-normal ml-2">{userInfo.email}</div>
                  </div>
                  <div className="flex flex-row items-center mb-4">
                    <div className="text-lg font-medium text-gray-700">Location:</div>
                    <div className="text-base font-normal ml-2">{userProfile.address}</div>
                  </div>
                  <div className="flex flex-row items-center mb-4">
                    <div className="text-lg font-medium text-gray-700 mb-2">Bio:</div>
                    <div className="text-base font-normal ml-2 mb-2">{userProfile.bio}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-1/2 h-60 flex items-center justify-center rounded-lg border border-teal-600 ml-2 bg-white">
                <div className="overflow-hidden flex items-center justify-center">
                  {userProfile.profileImage ? (
                    <img
                      src={`https://ecoconnect-3hx9.onrender.com/api/uploads/${userProfile.profileImage}`}
                      alt="Profile Picture"
                      className=""
                    />
                  ) : (
                    <img
                      src={avatar}
                      alt="Default Image"
                      className=""
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-5">
              <Link
                to='/editprofile'
                className="bg-gray-900 py-2 text-center text-white rounded-full font-bold w-1/4
                                    hover:bg-gradient-to-t hover:from-teal-800 hover:to-cyan-800">Update Profile</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Profile;
