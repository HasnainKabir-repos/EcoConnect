import axios from "axios";
import { useState } from "react";
import background from "../../assets/background2.jpg";
import TopBar from "../TopBar";

const PostEvent = () => {
  const [data, setData] = useState({
    eventName: "",
    category: "",
    location: "",
    date: "",
    time: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const url = "http://localhost:8080/api/events";
      const { data: res } = await axios.post(url, data, config);
      console.log(data);
      setIsModalVisible(true);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <TopBar />
      <div
        className="flex flex-col min-h-screen"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <main className="flex pt-20 items-center justify-center rounded-lg ">
          <div class="w-full px-40">
            <div className="w-full flex flex-row justify-center rounded-lg shadow-lg bg-white">
              <div className="rounded-lg w-full">
                <div className="bg-cyan-950 px-3 py-3 rounded-t-lg w-full">
                  <h1 className="font-bold font-sans text-white text-center text-xl">
                    Create a New Event for Your Peers
                  </h1>
                </div>

                <div className=" p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="relative z-0 mb-6 group">
                        <label
                          htmlFor="eventName"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Event Name
                        </label>
                        <input
                          type="text"
                          name="eventName"
                          onChange={handleChange}
                          value={data.eventName}
                          className="block px-2.5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-green-600 peer"
                          placeholder="Enter Event Name"
                          required
                        />
                      </div>

                      <div className="relative z-0 mb-6 group">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Event Category
                        </label>
                        <select
                          required
                          onChange={handleChange}
                          name="category"
                          value={data.category}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2.5"
                        >
                          <option value="">Select</option>
                          <option value="Online">Online</option>
                          <option value="Physical">Physical</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="relative z-0 mb-6 group">
                        <label
                          htmlFor="location"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Event Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          onChange={handleChange}
                          value={data.location}
                          className="block px-2.5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-green-600 peer"
                          placeholder="Enter Event Location"
                          required
                        />
                      </div>

                      <div className="relative z-0 mb-6 group">
                        <label
                          htmlFor="date"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Event Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          onChange={handleChange}
                          value={data.date}
                          className="block px-2.5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-green-600 peer"
                          required
                        />
                      </div>

                      <div className="relative z-0 mb-6 group">
                        <label
                          htmlFor="time"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Event Time
                        </label>
                        <input
                          type="time"
                          name="time"
                          onChange={handleChange}
                          value={data.time}
                          className="block px-2.5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-green-600 peer"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Event Description
                      </label>
                      <textarea
                        name="description"
                        onChange={handleChange}
                        value={data.description}
                        className="block px-2.5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-green-600 peer"
                        placeholder="Enter Event description"
                        rows={4}
                        required
                      ></textarea>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      {error && (
                        <div className="bg-red-500 px-5 py-3 rounded-lg font-normal text-white">
                          {error}!
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-cyan-950 hover:bg-teal-400 text-white rounded-lg w-96 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-black mt-6"
                      >
                        Post Event
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {isModalVisible && (
            <div
              id="successModal"
              className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <button
                    type="button"
                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover-bg-gray-200 hover-text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark-hover-bg-gray-600 dark-hover-text-white"
                    data-modal-toggle="#successModal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="w-12 h-12 rounded-full bg-green-100 p-2 flex items-center justify-center mx-auto mb-3.5">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Success</span>
                  </div>
                  <p className="mb-4 text-lg font-semibold text-black">
                    Event Created Successfully.
                  </p>
                  <button
                    data-modal-toggle="successModal"
                    type="button"
                    onClick={() => {
                      setIsModalVisible(false);
                      window.location.reload();
                    }}
                    className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-emerald-600 hover-bg-primary-700 focus-ring-4 focus-outline-none focus-ring-primary-300 0"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default PostEvent;
