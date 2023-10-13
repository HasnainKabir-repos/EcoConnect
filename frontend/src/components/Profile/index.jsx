import React, { useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import demo from '../../assets/demo.png';
import newbie from '../../assets/newbie.png'
import intermediate from '../../assets/Intermediate.png';
import advanced from '../../assets/expert.png';

const Profile = () => {
    const [user, setUser] = useState({
        firstname: 'John',
        lastname: 'Doe',
        email:'johndoe@gmail.com',
        totalPoints: 100,
        badge: 'newbie', // You should calculate this based on points
        green_challenges_num: 20,
        upcycled: 20,
        recycled: 20
      });

      const getIcon = (badge) => {
        if (badge === 'newbie') {
          return <img src={newbie} alt="Beginner" className="h-28 w-28" />;
        } else if (badge === 'intermediate') {
          return <img src={intermediate} alt="Intermediate" className="h-28 w-28" />;
        } else if (badge === 'advanced') {
          return <img src={advanced} alt="Advanced" className="h-28 w-28" />;
        }
      };

    return(
        <div className="bg-gray-100 min-h-screen w-full flex-col px-10">

            <div className="max-w-3xl mx-auto h-min mt-20 py-5 shadow-lg">
                <div className="bg-gradient-to-r from-teal-800 to-cyan-800 py-4 text-center text-black rounded-lg font-bold">
                    <h1 className="text-xl px-6 text-white">
                       User Profile <br />
                        {user.firstname}
                    </h1>
                </div>

                <div className="flex flex-col  p-5">

                    <div className="flex flex-row w-full ">


                        <div className="w-1/2 rounded-lg border border-teal-600 mr-2 bg-white ">
                            <div className="p-4">
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
                                <div>
                                    <div className="text-lg font-medium text-gray-700 mb-2">Bio:</div>
                                    <div className="text-base font-normal">{user.bio}</div>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col w-1/2 h-60 flex items-center justify-center rounded-lg border border-teal-600 ml-2 bg-white">
                            <div className="overflow-hidden flex items-center justify-center">
                                <img src= {demo} alt="" className=""/>
                            </div>
                        </div>
                    </div>

                    <div className="w-full rounded-lg border border-teal-600 mt-4 p-4 bg-white">
                        <div className="w-full h-full p-5">
                            <div className="flex flex-col items-center justify-center">
                            {getIcon(user.badge)}
                            </div>

                            <div className="text-center mt-4">
                            <div className="text-xl font-bold text-teal-600">Badge: {user.badge}</div>
                            <div className="text-lg text-gray-600 mt-2">
                                Green Challenges Completed: {user.green_challenges_num}
                            </div>
                            <div className="text-lg text-gray-600 mt-2">
                                Products Upcycled: {user.upcycled}
                            </div>
                            <div className="text-lg text-gray-600 mt-2">
                                Products Recycled: {user.recycled}
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center mt-5">
                        <Link 
                        to='/editprofile'
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 py-4 text-center text-white rounded-lg font-bold w-1/4
                                    hover:bg-gradient-to-t hover:from-teal-800 hover:to-cyan-800">Update Profile</Link>
                    </div>



                </div>
            </div>

        </div>
    );
};

export default Profile;