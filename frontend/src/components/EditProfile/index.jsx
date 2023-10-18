import React, { useState, useEffect} from "react";
import {Link, useLocation} from 'react-router-dom';
import demo from "../../assets/demo.png";
import Modal from 'react-modal';
import background from '../../assets/background.jpg';
import TopBar from "../TopBar";
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
    }
    const handleInputChange = () => {
        
    }
    const [user, setUser] = useState({
        firstname: 'John',
        lastname: 'Doe',
        email:'johndoe@gmail.com',
        totalPoints: 100,
        badge: 'newbie', // You should calculate this based on points
        green_challenges_num: 20,
        upcycled: 20,
        recycled: 20,
        location: 'Dhaka, Bangladesh',
        bio: 'Eco Enthusiast'
      });
    return(
        <>
        <TopBar/>
            <div className="bg-cover bg-center bg-gray-100 min-h-screen w-full flex-col px-10 pb-5"
                style={{backgroundImage: `url(${background})`}}>
            
            <div className="">
                <div className="max-w-3xl mx-auto h-min mt-20 pt-5 shadow-lg">
                    <div className="bg-gradient-to-r from-teal-800 to-cyan-800 py-4 text-center text-black rounded-t-lg font-bold">
                        <h1 className="text-xl px-6 text-white">
                        User Profile <br />
                            {user.firstname}
                        </h1>
                    </div>

                    <div className="flex flex-col p-5 bg-white">

                        <div className="flex flex-row w-full ">


                            <div className="w-1/2 rounded-lg border border-teal-600 mr-2 bg-white h-60 ">
                                <div className="px-4 pt-4 pb-2">
                                    <div>
                                        <div className="text-2xl font-semibold text-teal-600 mb-2">
                                            {user.firstname} {user.lastname}
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center mb-4">
                                        <div className="text-lg font-medium text-gray-700">Email:</div>
                                        <div className="text-base font-normal ml-2">{user.email}</div>
                                    </div>
                                    <div className="flex flex-row items-center mb-4">
                                        <div className="text-lg font-medium text-gray-700">Location:</div>
                                        <div className="text-base font-normal ml-2">Dhaka, Bangladesh</div>
                                    </div>
                                    <div className="flex flex-row items-center mb-4">
                                        <div className="text-lg font-medium text-gray-700">Points earned:</div>
                                        <div className="text-base font-normal ml-2">{user.totalPoints}</div>
                                    </div>
                                    <div className="flex flex-row items-center mb-4">
                                        <div className="text-lg font-medium text-gray-700 mb-2">Bio:</div>
                                        <div className="text-base font-normal ml-2 mb-2">{user.bio}</div>
                                    </div>

                                </div>
                            </div>

                            <div className="flex flex-col w-1/2">

                                <div className="flex flex-col w-full h-60 flex items-center justify-center rounded-lg border border-teal-600 ml-2 bg-white">
                                    <div className="overflow-hidden flex items-center justify-center">
                                        <img src= {demo} alt="" className=""/>
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
                onRequestClose={() => handleModalClose()}
                style={customStyles}
                >
                <div className="text-2xl font-semibold mb-4 py-3">Edit Profile</div>
                <div>
                    <label className="block font-medium text-gray-600 mb-2">Name:</label>
                    <input
                    type="text"
                    name="name"
                    value={user.firstname}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600 mb-2">Email:</label>
                    <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600 mb-2">Location:</label>
                    <input
                    type="text"
                    name="location"
                    value={user.location}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600 mb-2">Bio:</label>
                    <textarea
                    name="bio"
                    value={user.bio}
                    onChange={handleInputChange}
                    className="w-full border rounded-md py-2 px-3"
                    rows="3"
                    />
                </div>
                <button
                    
                    className="bg-teal-600 text-white font-medium py-2 px-4 mt-4 rounded-md hover:bg-teal-700"
                >
                    Save
                </button>
                <button
                    onClick={() => handleModalClose()}
                    className="bg-teal-600 text-white font-medium py-2 px-4 mt-4 rounded-md hover:bg-teal-700 ml-4"
                >
                    Back
                </button>
            </Modal>
        </>
    );
};

export default EditProfile;