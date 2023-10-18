import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import demo from '../../assets/demo.png';
import newbie from '../../assets/newbie.png'
import intermediate from '../../assets/Intermediate.png';
import advanced from '../../assets/expert.png';
import background from '../../assets/background.jpg';
import TopBar from "../TopBar";
import axios from "axios";

const Profile = () => {
    const [userProfile, setUserProfile] = useState({
        email: "",
        totalPoints: 0,
        badge: "",
        green_challenges_num: 0,
        upcycled: 0,
        recycled: 0,
        followed_communities: [],
    });

    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
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

    const getRandomColor = () => {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor;
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const tokenValue = JSON.parse(token);
                const config = {
                    headers: { Authorization: `Bearer ${tokenValue.data}` },
                };

                const response = await axios.get("http://localhost:8080/api/userInfo", config);
                const { userProfiles, userInfo } = response.data;
                setUserProfile(userProfiles);
                setUserInfo(userInfo);
            } catch (error) {
                console.log("Fetch Error:", error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <>
            <TopBar />
            <div className="bg-cover bg-center min-h-screen w-full flex-col px-10 pb-5" style={{ backgroundImage: `url(${background})` }}>
                <div className="max-w-3xl mx-auto h-min mt-20 pt-5 shadow-lg">
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
                    <div className="mt-4">
                        <h2 className="text-xl font-bold text-teal-600">Followed Communities</h2>
                        <div className="flex flex-wrap mt-2">
                            {user.followed_communities.map((community, index) => (
                                <div
                                    key={index}
                                    className="m-2 py-1 px-2 flex items-center rounded-2xl border border-teal-600"
                                >
                                    <div className={`w-4 h-4 rounded-full mr-2 ${getRandomColor()}`}></div>
                                    <div className="text-normal text-gray-600">{community}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center mt-5">
                <Link
                    to="/editprofile"
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 py-4 text-center text-white rounded-lg font-bold w-1/4 hover:bg-gradient-to-t hover:from-teal-800 hover:to-cyan-800"
                >
                    Update Profile
                </Link>
            </div>
        </>
    );
};

export default Profile;
