import {useState, useEffect} from 'react';
import axios from 'axios';

export const useMyEvent = () => {
    const [myEvents, setMyEvents] = useState([{
        _id:"", 
        title:"",
        location:"", 
        Event_type:"",
        date:"",
        time:"", 
        description:"", 
        participants:"",
        interested:"",
        eventImage:null
    }]);


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMyEvent = async () => {
            try{
                setIsLoading(true);

                const token = localStorage.getItem('token');
                const tokenValue = JSON.parse(token);
                const config = {
                    headers: {
                        Authorization: `Bearer ${tokenValue.data}`
                    },
                };

                const response = await axios.get('http://localhost:8080/api/MyEvent/', config);
               // console.log(response.data);
                const events = response.data;
                setMyEvents(events);

            }catch(error){
                console.error('My event fetch error:', error);
            }finally{
                setIsLoading(false);
            }
        };
        fetchMyEvent();
    }, []);

    return {myEvents, isLoading};
}