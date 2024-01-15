import { useState, useEffect } from "react";
import Post from "../CommunityPost";
import TopBar from "../TopBar";
import { useCommunities } from "../../hooks/useCommunities";
import Loader from "../Loader";
import axios from "axios";
const Community = () => {
  const { joinedCommunities, notJoinedCommunities, isLoading } =
    useCommunities();

    const [selectedCommunity, setSelectedCommunity] = useState(
      (joinedCommunities.length > 0) ? joinedCommunities[0] : ""
    );
    console.log(selectedCommunity);

  const [isLoading2, setIsLoading2] = useState(false);
  const handleJoinCommunity = async (community) => {
    try {
      setIsLoading2(true);
      const token = localStorage.getItem('token');
      const tokenValue = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${tokenValue.data}`
        },
      };

      await axios.put(`http://localhost:8080/api/community/join/${community._id}`, {}, config);
      window.location.reload();
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading2(false)
    }
  };

  

  const [postContent, setPostContent] = useState("");
  const [isFormMinimized, setIsFormMinimized] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handlePostSubmit = async (selectedCommunity) => {
    try {
      setIsLoading2(true);
      const token = localStorage.getItem('token');
      const tokenValue = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${tokenValue.data}`
        },
      };
      console.log(postContent);
      const data = {
        content:postContent
      }
      const response =  await axios.post(`http://localhost:8080/api/post/create/${selectedCommunity._id}`, data, config);
      console.log(response);
      
      //window.location.reload();
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading2(false)
    }
    setPostContent("");
    window.location.reload();
  };
  const toggleFormVisibility = () => {
    setIsFormMinimized(!isFormMinimized);
  };

  const [posts, setPosts] = useState([{
    _id:"",
    author:"",
    content:"",
    createdAt:null,
    likes:[],
    comments:[]
  }]);

  useEffect(()=> {
    const fetchPosts = async (selectedCommunity) => {
      try {
        setIsLoading2(true);
        const token = localStorage.getItem('token');
        const tokenValue = JSON.parse(token);
        const config = {
          headers: {
            Authorization: `Bearer ${tokenValue.data}`
          },
        };
        const response =  await axios.get(`http://localhost:8080/api/post/${selectedCommunity._id}`, config);
        //console.log(response.data.communityPosts);
        setPosts(response.data.communityPosts);
        //console.log(posts);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading2(false)
      }
    };
    fetchPosts(selectedCommunity);
  }, [selectedCommunity]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

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
      <main className="pt-20 min-h-screen min-w-screen bg-gray-200">
        <div>
          {isLoading || isLoading2 ? <Loader /> : console.log("Loaded")}
        </div>
        <div className="fixed flex flex-row w-full">
          <div className="w-2/6 p-2 ml-4 mt-10 mb-2">
            <div className="flex flex-col  h-full">
              <div className="overflow-auto max-h-80 rounded-lg bg-white px-6 py-4 cursor-pointer mb-4">
                <div className="font-semibold text-xl text-teal-900 mb-2">
                  My Communities:
                </div>
                <div className="flex flex-wrap flex-col">
                  {joinedCommunities.length > 0 ? (
                    joinedCommunities.map((community, index) => (
                      <div
                        key={index}
                        className={`font-bold py-1 my-1 px-2 flex items-center rounded-full border border-teal-900 border-solid hover:border-dashed 
              ${
                selectedCommunity === community
                  ? "bg-teal-900 text-white"
                  : "bg-white text-gray-900"
              }
            `}
                        onClick={() => setSelectedCommunity(community)}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
                        ></div>
                        <div className="text-base">{community.name}</div>
                      </div>
                    ))
                  ) : (
                    <h3 className="text-xl font-bold text-center mt-10">
                      Join a community to start
                    </h3>
                  )}
                </div>
              </div>

              <div className="overflow-auto max-h-80 bg-white rounded-lg  px-6 py-4 cursor-pointer mt-6">
                <div className="font-semibold text-xl text-teal-900 mb-2">
                  Members of {selectedCommunity.name}:
                </div>
                <div className="flex flex-wrap flex-col">
                  {selectedCommunity !== "" &&
                  selectedCommunity.members &&
                  selectedCommunity.members.length > 0 ? (
                    selectedCommunity.members.map((member, index) => (
                      <div
                        key={index}
                        className="font-semibold text-base bg-gray-300 text-black rounded-full px-3 py-1 m-1"
                      >
                        {member}
                      </div>
                    ))
                  ) : (
                    <div className="font-bold text-base bg-gray-300 text-black rounded-full px-3 py-1 m-1">
                      No members
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-5/6 mt-8 ml-4 mr-5 pr-2 pb-36 overflow-auto max-h-screen">
            <div className="flex flex-col mx-auto p-4">
              <div className="flex flex-col mx-4 w-full p-2">
                <h3 className="text-lg font-bold text-center mb-4">
                  Post Something to {selectedCommunity.name}
                </h3>
                <form className="flex flex-col items-center w-full">
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Type your Post Here..."
                    className="border rounded-lg p-3 mb-3 w-5/6"
                  />

                    <div className="flex flex-col w-full">
                      <label className="ml-16 mb-1 mt-3 text-md font-semibold">
                        Attach Relevant Image (If Any):
                      </label>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-3 ml-16"
                      />
                    </div>
                    <button
                      className="mt-4 mb-4 font-bold px-4 py-2 rounded-full bg-black hover:bg-teal-400 hover:text-black text-white inline-block w-1/4"
                      type="submit"
                      onClick={() => {handlePostSubmit(selectedCommunity)}}

                    >
                      Post
                    </button>
                  </form>
                

              </div>
              {selectedCommunity !== "" ? (
                <h3 className="text-xl font-bold text-center mt-10">
                  See Other Posts from {selectedCommunity.name}
                </h3>
              ) : (
                <></>
              )}

              <div className="flex flex-col mx-4 w-full p-4">
                { posts &&
                  posts.length !== 0 ? (
                  posts
                    
                    .map((post, index) => (
                      <div key={index} className="">
                        <Post
                          community={selectedCommunity.name}
                          user={post.author}
                          text={post.content}
                          createdAt={post.createdAt}
                          likes={post.likes}
                          comments={post.comments}
                        />
                      </div>
                    ))
                ) : (
                  <h3 className="text-xl font-bold text-center mt-10">
                    No posts available
                  </h3>
                )}
              </div>
            </div>
          </div>

          <div className="w-2/6 p-2 ml-4 mr-4">
            <div className="flex flex-col mt-2">
              <div className="overflow-auto max-h-80 rounded-lg bg-white px-4 py-4 mt-8 shadow-lg">
                <div className="font-semibold text-xl text-teal-900 mb-2">
                  Join a Community:
                </div>
                <div className="flex flex-wrap flex-col">
                  {notJoinedCommunities.length > 0 ? (
                    notJoinedCommunities.map((community, index) => (
                      <div
                        key={index}
                        className="py-2 my-1 px-2 flex items-center rounded-full border border-teal-900 border-solid bg-black text-white hover:bg-white hover:text-black transition ease-in-out duration-400"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
                        ></div>
                        <div className="text-base font-bold">
                          {community.name}
                        </div>
                        <button
                          className="ml-auto px-4 py-1 rounded-full bg-teal-400 text-black font-bold text-sm"
                          onClick={() => handleJoinCommunity(community)}
                        >
                          Join
                        </button>
                      </div>
                    ))
                  ) : (
                    <h3 className="text-base font-bold text-center mt-10">
                      Congratulations! You have joined All Available Communities
                    </h3>
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

export default Community;
