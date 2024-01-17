import avatar from "../../assets/avatar.png";
import { useUserProfile } from "../../hooks/useUserProfile";
import Post from "../CommunityPost";
import TopBar from "../TopBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
const Main = () => {
  const { userProfile, userInfo, isLoading } = useUserProfile();
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [communities, setCommunities] = useState([{
        _id:"",
        name:"",
        description:"",
        members:[],
        posts:[]
  }]);
  const [posts, setPosts] = useState([
    {
      _id: "",
      author: "",
      content: "",
      createdAt: null,
      postImage:null,
      likes: [],
      comments: [],
    },
  ]);

  const [events, setEvents] = useState([{
    title:"",
    date:"",
    Event_type:""
  }]);

  const [selectedCommunity, setSelectedCommunity] = useState("");
  
  useEffect(()=> {
    const fetchCommunities = async()=>{
      try{
        setIsLoading2(true);
        const token = localStorage.getItem("token");
        const tokenValue = JSON.parse(token);
        const config = {
          headers: {
            Authorization: `Bearer ${tokenValue.data}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/api/community`,
          config
        );
        setCommunities(response.data.communities);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading2(false);
      }
    };
    fetchCommunities();
  }, []);

  useEffect(()=>{
    const fetchPosts = async()=>{
      try{
        setIsLoading2(true);
        const token = localStorage.getItem("token");
        const tokenValue = JSON.parse(token);
        const config = {
          headers: {
            Authorization: `Bearer ${tokenValue.data}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/api/post`,
          config
        );
        setPosts(response.data.communityPosts);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading2(false);
      }
    };
    fetchPosts();
  }, [selectedCommunity]);

  useEffect(()=>{
    const fetchPosts = async(e)=>{
      try{
        setIsLoading2(true);
        const token = localStorage.getItem("token");
        const tokenValue = JSON.parse(token);
        const config = {
          headers: {
            Authorization: `Bearer ${tokenValue.data}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/api/post/${selectedCommunity._id}`,
          config
        );
        setPosts(response.data.communityPosts);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading2(false);
      }
    };
    fetchPosts();
  }, [selectedCommunity]);

  useEffect(()=>{
    const fetchInterestedEvents = async () => {
      try{
        setIsLoading2(true);
        const token = localStorage.getItem("token");
        const tokenValue = JSON.parse(token);
        const config = {
          headers: {
            Authorization: `Bearer ${tokenValue.data}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/api/Event/interested`,
          config
        );
        setEvents(response.data);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading2(false);
      }
    };
    fetchInterestedEvents();
  }, []);

  const handleLike = async (post) => {
    try{
      setIsLoading3(true);
      const token = localStorage.getItem("token");
      const tokenValue = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${tokenValue.data}`,
        },
      };

      await axios.put(
        `http://localhost:8080/api/post/like/${post._id}`,
        {},
        config
      );

    }catch(error){
      console.log(error);
    }finally{
      setIsLoading3(false);
    }
  };

  useEffect(() => {
    const setSelected = async() => {
      if(selectedCommunity === "" && communities[0]._id !== ""){
        setSelectedCommunity(communities[0]);
      }
    };
    setSelected();
  }, [communities, isLoading]);

  const [comment, setComment] = useState("");


  const handleAddComment = async (post) => {
    try{
      setIsLoading3(true);
      const token = localStorage.getItem("token");
      const tokenValue = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${tokenValue.data}`,
        },
      };

      await axios.put(
        `http://localhost:8080/api/post/comment/${post._id}`,
        {
          text:comment
        },
        config
      );

    }catch(error){
      console.log(error);
    }finally{
      setIsLoading3(false);
    }
  };

  const handleSelectedCommunity = (community) => {
    setSelectedCommunity(community)
  };

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };
  return (
    <>
      <TopBar />
      <main className=" pt-20 min-h-screen min-w-screen bg-gray-200">
      <div>
          {isLoading || isLoading2 ? <Loader /> : console.log("Loaded")}
        </div>
        <div className="fixed flex flex-row w-full">
          <div className="w-2/6 p-2 ml-4">
            <div className="">
              <div className="flex flex-col mt-6 rounded-lg bg-white shadow-lg h-1/3 items-center justify-center">
                <div className="overflow-hidden flex items-center justify-center h-24  w-24 p-3 mt-4">
                  {userProfile.profileImage ? (
                    <img
                      src={`http://localhost:8080/api/uploads/${userProfile.profileImage}`}
                      alt="Profile Picture"
                      className=""
                    />
                  ) : (
                    <img src={avatar} alt="Default Image" className="" />
                  )}
                </div>
                <div className="flex flex-col p-2 items-center justify-center">
                  <div className="">
                    <div className="font-semibold text-xl text-teal-900">
                      {userInfo.firstName} {userInfo.lastName}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-2">
                      {userProfile.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col mt-4  h-2/3">
                <div className="overflow-auto max-h-80 rounded-lg bg-white px-8 py-4 shadow-xl">
                  <div className="px-2 font-semibold text-xl text-teal-900 mb-2">
                    My Communitites:
                  </div>
                  <div>
                    
                      {communities[0]._id !== "" ? (
                      <div className="flex flex-wrap flex-col ">
                      {communities.map((community, index) => (
                        <div
                          key={index}
                          className="transition ease-in-out duration-300 py-1 my-1 px-2 flex items-center rounded-full border border-teal-900 border-solid bg-gray-700 text-white hover:bg-white hover:text-black"
                          onClick={()=>handleSelectedCommunity(community)}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
                          ></div>
                          <div className="text-md">{community.name}</div>
                        </div>
                      ))}
                      </div>
                      ) : (
                        <div className="px-2 font-semibold text-xl text-teal-900 mb-2">
                          No communities to show
                        </div>
                      )}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/6 mt-8 ml-5 pr-2 pb-36 overflow-auto max-h-screen">
            <div className="flex flex-col mx-auto">
            {posts && posts.length !== 0 ? (
                  posts.map((post, index) => (

                  (post.postImage ? (
                    <div key={index} className="">
                      <Post
                        _id={post._id}
                        community={selectedCommunity.name}
                        user={post.author.firstName + post.author.lastName}
                        text={post.content}
                        createdAt={post.createdAt}
                        likes={post.likes}
                        comments={post.comments}
                        image={
                          `http://localhost:8080/api/uploads/${post.postImage}`
                        }
                        loading={isLoading3}
                        handleChangeComment={(e) => {setComment(e.target.value)}}
                        handleAddComment={() => handleAddComment(post)}
                        handleLike={() => handleLike(post)}
                      />
                    </div>
                  ): (
                    <div key={index} className="">
                      <Post
                        _id={post._id}
                        community={selectedCommunity.name}
                        user={post.author.firstName + post.author.lastName}
                        text={post.content}
                        createdAt={post.createdAt}
                        likes={post.likes}
                        comments={post.comments}
                        loading={isLoading3}
                        handleChangeComment={(e) => {setComment(e.target.value)}}
                        handleAddComment={() => handleAddComment(post)}
                        handleLike={() => handleLike(post)}
                      />
                    </div>
                  ))
                    
                  ))
                ) : (
                  <h3 className="text-xl font-bold text-center mt-10">
                    No posts available
                  </h3>
                )}
            </div>
          </div>

          <div className="w-2/6 p-2 mr-2 ml-5 ">
            <div className="flex flex-col mt-2">
              <div className="rounded-lg bg-white p-6 overflow-auto max-h-96 mt-4 shadow-lg">
                <div className="font-semibold text-xl text-teal-900 mb-2">
                  My Interested Events:
                </div>
                <div>
                  {(events) ? (
                  <div className="flex flex-wrap flex-col">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className="flex-col py-2 my-1 px-2 flex items-center justify-center rounded-lg border border-teal-900 border-solid bg-gray-700 text-white hover:bg-white hover:text-black transition ease-in-out duration-300"
                      >
                        <div className="text-lg font-bold justify-center text-center">
                          {event.title}
                        </div>
                        <div className="text-sm ml-2 justify-center text-center mb-1">
                          Date: {event.date}
                        </div>
                        <div className="bg-teal-400 text-black font-bold text-sm ml-2 px-4 py-1 mb-2 rounded-full inline-block justify-center text-center">
                          {event.Event_Type}
                        </div>
                      </div>
                    ))}
                  </div>
                  ):(
                    <div className="font-semibold text-xl text-teal-900 mb-2">
                      No events to show
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
