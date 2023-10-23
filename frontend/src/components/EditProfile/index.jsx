import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import background from '../../assets/background.jpg';
import TopBar from "../TopBar";
import { useUserProfile } from "../../hooks/useUserProfile";
import avatar from '../../assets/avatar.png';
import axios from 'axios';
import Loader from "../Loader";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '8px',
        maxWidth: '400px',
        padding: '20px',
        width: '600px'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

Modal.setAppElement('#root');
const EditProfile = () => {
    const { userProfile, userInfo, isLoading } = useUserProfile();
    const [formLoading, setFormLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        bio: '',
        profileImage: null,
    });

    useEffect(() => {
        if (userInfo.firstName && userProfile) {
            setFormData({
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                address: userProfile.address,
                bio: userProfile.bio,
                profileImage: userProfile.profileImage,
            });
        }
    }, [userInfo, userProfile]);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value,
            };
            return updatedData;
        });
    };

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            profileImage: file, // Update profileImage with the selected file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setFormLoading(true);
            const token = localStorage.getItem('token');
            const tokenValue = JSON.parse(token);
            const config = {
                headers: { Authorization: `Bearer ${tokenValue.data}` },
            };

            const formDataToSubmit = new FormData();
            formDataToSubmit.append("firstName", formData.firstName);
            formDataToSubmit.append("lastName", formData.lastName);
            formDataToSubmit.append("address", formData.address);
            formDataToSubmit.append("bio", formData.bio);
            formDataToSubmit.append("profileImage", formData.profileImage);

            const apiUrl = 'http://localhost:8080/api/userInfo';

            const response = await axios.post(apiUrl, formDataToSubmit, config);

            setIsModalOpen(false);

            setTimeout(() => {
                window.location.href = 'http://localhost:3000/profile'; // Refresh the page
            }, 1500);
        } catch (error) {
            // Handle errors
            console.error(error);
        }finally{
            setFormLoading(false);
        }
    };

    return (
        <>
            <TopBar />
            <div>
                {
                    isLoading ? (<Loader />) : (console.log('Loaded'))
                }
            </div>

            <div className="bg-cover bg-center bg-gray-100 min-h-screen w-full flex-col px-10 pb-5"
                style={{ backgroundImage: `url(${background})` }}>

                <div className="">
                    <div className="max-w-3xl mx-auto h-min mt-20 pt-5 shadow-lg">
                        <div className="bg-gradient-to-r from-teal-800 to-cyan-800 py-4 text-center text-black rounded-t-lg font-bold">
                            <h1 className="text-xl px-6 text-white">
                                User Profile <br />
                                {userInfo.firstName}
                            </h1>
                        </div>

                        <div className="flex flex-col p-5 bg-white">

                            <div className="flex flex-row w-full ">


                                <div className="w-1/2 rounded-lg border border-teal-600 mr-2 bg-white h-60 ">
                                    <div className="px-4 pt-4 pb-2">
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
                                            <div className="text-lg font-medium text-gray-700">Points earned:</div>
                                            <div className="text-base font-normal ml-2">{userProfile.points_earned}</div>
                                        </div>
                                        <div className="flex flex-row items-center mb-4">
                                            <div className="text-lg font-medium text-gray-700 mb-2">Bio:</div>
                                            <div className="text-base font-normal ml-2 mb-2">{userProfile.bio}</div>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex flex-col w-1/2">

                                    <div className="flex flex-col h-60 flex items-center justify-center rounded-lg border border-teal-600 ml-2 bg-white">
                                        <div className="overflow-hidden flex items-center justify-center">
                                            {userProfile.profileImage ? (
                                                <img
                                                    src={`http://localhost:8080/api/uploads/${userProfile.profileImage}`}
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
                            </div>

                            <div className="w-full flex items-center justify-center mt-5">
                                <button
                                    onClick={() => handleModalOpen()}
                                    className="bg-gradient-to-r from-teal-600 to-cyan-600 py-4 text-center text-white rounded-lg font-bold w-2/3 h-12
                                            hover:bg-gradient-to-t hover:from-teal-800 hover:to-cyan-800 flex items-center justify-center">
                                    Edit information
                                </button>
                            </div>

                            <div className="w-full flex items-center justify-center mt-5">
                                <Link to='/profile'
                                    className="bg-gradient-to-r from-teal-600 to-cyan-600 py-3 text-center text-white rounded-lg font-bold w-1/6
                                        hover:bg-gradient-to-t hover:from-teal-800 hover:to-cyan-800 mx-5">Back </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                style={customStyles}
            >
                <div className="text-2xl font-semibold mb-4 py-3">Edit Profile</div>
                <div>
                    <label className="block font-medium text-gray-600 mb-2">First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border rounded-md py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600 mb-2">Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border rounded-md py-2 px-3"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-600 mb-2">Location:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border rounded-md py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600 mb-2">Bio:</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full border rounded-md py-2 px-3"
                        rows="3"
                    />
                </div>

                <div>
                    <label htmlFor="profileImage" className="font-medium text-sm text-gray-800">
                        Upload Profile Picture
                    </label>
                    <input
                        type="file"
                        name="profileImage"
                        id="profileImage"
                        onChange={handlePhoto}
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-green-600 focus:border-green-600"
                        accept=".png, .jpg, .jpeg"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-teal-600 text-white font-medium py-2 px-4 mt-4 rounded-md hover:bg-teal-700"
                >
                    Save
                </button>
                <button
                    onClick={handleModalClose}
                    className="bg-teal-600 text-white font-medium py-2 px-4 mt-4 rounded-md hover-bg-teal-700 ml-4"
                >
                    Back
                </button>
                <div>
                {
                    formLoading ? (<Loader />) : (console.log('Form Loaded'))
                }
            </div>
            </Modal>
        </>
    );
};

export default EditProfile;