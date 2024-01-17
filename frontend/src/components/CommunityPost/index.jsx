import React, { useState, useEffect } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import Loader from "../Loader";
import axios from "axios";
const Post = ({ _id, community, user, text, createdAt, likes, comments, image, 
              handleLike, handleAddComment, loading, handleChangeComment }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);

  const [likes2, setlikes2] = useState(likes);
  const [comments2, setcomments2] = useState(comments);

  const hasComments = Array.isArray(comments2) && comments2.length > 0;

  const handleComment = () => {
    setIsCommenting(true);
    setIsCommentDrawerOpen(!isCommentDrawerOpen);
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

  const formatEventDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
 
    const yyyy = dateTime.getFullYear();
    const mm = String(dateTime.getMonth() + 1).padStart(2, "0");
    const dd = String(dateTime.getDate()).padStart(2, "0");
    const formattedDate = `${dd}-${mm}-${yyyy}`;
  
    const hh = String(dateTime.getHours()).padStart(2, "0");
    const min = String(dateTime.getMinutes()).padStart(2, "0");
    const formattedTime = `${hh}:${min}`;
  
    const formattedDateTime = `${formattedTime}    ${formattedDate}`;
  
    return formattedDateTime;
  };

  useEffect(() => {
    const updatePost = async(_id) =>{
      try {
        const token = localStorage.getItem("token");
        const tokenValue = JSON.parse(token);
        const config = {
          headers: {
            Authorization: `Bearer ${tokenValue.data}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/api/post/update/${_id}`,
          config
        );
        console.log(response.data.likes);
        setlikes2(response.data.likes);
        setcomments2(response.data.comments);
      } catch (error) {
        console.log(error);
      }
    };

    updatePost(_id);
  }, [loading, handleLike, handleAddComment]);

  //console.log(comments2)
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg mb-4 px-8 py-4">
        <div className="flex flex-row items-center">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
          ></div>
          <div className="text-teal-600 font-semibold text-lg">{community}</div>
        </div>

        <div className="flex flex-row items-center text-gray-700 text-sm mb-2">
          <div className="mr-2 font-bold">{user}</div>
          <div className="text-gray-500 text-sm ml-auto font-bold">
            {formatEventDateTime(createdAt)}
          </div>
        </div>

        <div className="text-gray-900 mb-2">{text}</div>
        
          {image && (
            <img
              src={image}
              alt="Post"
              className="mb-2 rounded-xl w-5/6 h-5/6 object-cover mx-auto mt-6"
            />
          )}
        

        <div className="flex items-center justify-left mt-6">
          <button
            className="mr-4 hover:text-gray-700 bg-gray-700 text-white hover:bg-white flex items-center font-bold border-2 border-gray-700 px-4 py-1.5 rounded-full w-24 transition duration-400 ease-in-out"
            onClick={handleLike}
          >
            <FaHeart className="w-5 h-5 mr-3" />
            {likes2.length} 
          </button>

          <button
            className="hover:text-gray-700 bg-gray-700 text-white hover:bg-white flex items-center font-bold border-2 border-gray-700 px-4 py-1.5 rounded-full w-24 transition duration-300 ease-in-out"
            onClick={handleComment}
          >
            <FaComment className="w-5 h-5 mr-3" />
            {hasComments ? `${comments2.length} ` : "0"}
          </button>
        </div>

        {isCommentDrawerOpen && (
          <div>
            {hasComments && (
              <div className="mt-4">
                <strong>Comments:</strong>
                {comments2
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((comment, index) => (
                    <div
                      key={index}
                      className="text-black border-2 border-gray-200 bg-gray-200 rounded-lg p-4 my-2 hover:border-2 hover:border-gray-700 transition duration-300 ease-in-out"
                    >
                      <div className="flex flex-row justify-between">
                        <div className="font-bold">{comment.author.firstName} {comment.author.lastName}</div>
                        <div className="text-gray-700 text-sm font-semibold">
                          {formatEventDateTime(comment.createdAt)}
                        </div>
                      </div>
                      <div className="mt-2">{comment.text}</div>
                    </div>
                  ))}
              </div>
            )}

            {isCommenting && (
              <div>
                <textarea
                  rows="2"
                  placeholder="Add your comment..."
                  className="w-full mt-2 p-2 border-2 border-gray-400 rounded-lg"
                  onChange={(e)=>{
                    handleChangeComment(e);
                    setComment(e.target.value);
                  }}
                  value={comment}
                />
                {loading ? (
                  <Loader />
                ) : (
                  <button
                    className="mt-2 px-6 py-2 bg-gray-700 font-semibold text-white rounded-full"
                    onClick={(e)=>{
                      handleAddComment(e);
                      setComment('');
                    }}
                  >
                    Post Comment
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
