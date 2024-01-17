import { useState, useEffect } from "react";
import axios from "axios";

export const useCommunities = () => {
    const [notJoinedCommunities, setNotJoinedCommunities] = useState([{
        _id:"",
        name:"",
        description:"",
        members:[],
        posts:[]
    }]);
    const [joinedCommunities, setJoinedCommunities] = useState([{
        _id:"",
        name:"",
        description:"",
        members:[],
        posts:[]
    }]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchNotJoinedCommunities = async ()=>{
            try{
                setIsLoading(true);

                const token = localStorage.getItem('token');
                const tokenValue = JSON.parse(token);
                const config = {
                    headers: {
                        Authorization: `Bearer ${tokenValue.data}`
                    },
                };

                const response = await axios.get('https://ecoconnect-3hx9.onrender.com/api/community/notjoined', config);
                console.log(response.data);
                const communities = response.data.notJoinedCommunities;
                setNotJoinedCommunities(communities);
            }catch(error){
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        };

        const fetchJoinedCommunities = async () => {
            try{
                setIsLoading(true);

                const token = localStorage.getItem('token');
                const tokenValue = JSON.parse(token);
                const config = {
                    headers: {
                        Authorization: `Bearer ${tokenValue.data}`
                    },
                };

                const response = await axios.get('https://ecoconnect-3hx9.onrender.com/api/community/joined', config);
                //console.log(response.data);
                const communities = response.data.joinedCommunities;
                setJoinedCommunities(communities);
            }catch(error){
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        };

        fetchJoinedCommunities();
        fetchNotJoinedCommunities();

    }, []);

    return {joinedCommunities, notJoinedCommunities, isLoading}
};