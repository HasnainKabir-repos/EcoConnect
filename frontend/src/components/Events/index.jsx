import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import TopBar from "../TopBar";
const Events = () => {

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState(""); 

  useEffect(() => {
    // Fetch events data from your API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/api/event');
        const eventsData = response.data;

        // Format the date for each event
        const eventsWithFormattedDate = await Promise.all(
          eventsData.map(async (event) => {
            const date = new Date(event.date);
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${yyyy}-${mm}-${dd}`;

            // Get the username for the event's email
            console.log(event.organizer);
            const usernameResponse = await axios.post('http://localhost:8080/api/userInfo/getUsername', {
              email: event.organizer,
            });
            console.log(usernameResponse.data);
            const username = usernameResponse.data;

            return {
              ...event,
              formattedDate,
              username,
            };
          })
        );

        setEvents(eventsWithFormattedDate);
        setFilteredEvents(eventsWithFormattedDate);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFilterEvents = () => {
    if (selectedCategory || startDate || endDate) {
      const filtered = events.filter((event) => {
        return (
          (!selectedCategory || event.Event_type === selectedCategory) &&
          (!startDate || new Date(event.date) >= new Date(startDate)) &&
          (!endDate || new Date(event.date) <= new Date(endDate))
        );
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  const handleInterestedClick = async (id, currentUserName) => {
    try  {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const tokenValue = JSON.parse(token);
      const config = {
        headers: { Authorization: `Bearer ${tokenValue.data}` },
      };
      const url = `http://localhost:8080/api/event/addInterestedUser/${id}`;
      const response = await axios.put(url, {}, config);
      console.log("Interested");

      // Update the modal text
      setModalText("Submitted Interest to the Organizer Successfully");

      // Show the modal
      setIsModalVisible(true);
    }  catch (error) {
      console.log({  error: error  });
    }  finally  {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleParticipatingClick = async (id, currentUserName) => {
    // Handle participating button click, send data to the event poster
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const tokenValue = JSON.parse(token);
      const config = {
        headers: { Authorization: `Bearer ${tokenValue.data}` },
      };
      const url = `http://localhost:8080/api/event/addParticipants/${id}`;
      const response = await axios.put(url, {}, config);
      console.log('Interested');

      setModalText("Submitted Participation Confirmation to the Organizer Successfully");

      // Show the modal
      setIsModalVisible(true);
    } catch (error) {
      console.log({ "error": error });
    } finally {
      setIsLoading(false);
    }
  };

  // Replace getCurrentUserName with your actual function for fetching the current user's name
  const getCurrentUserName = () => {
    return "CurrentUserName"; //put the actual implementation here
  };

  return (
    <>
      <TopBar />

      <main className="pt-20 bg-gray-100 min-h-screen">
        <div>{
          isLoading ? (<Loader />) : (console.log("Loaded"))
        }

        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 px-4 py-4 rounded-md ml-5 mt-4">
            <div className="mb-4">
              <label
                htmlFor="categoryFilter"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                Filter by Category:
              </label>
              <select
                id="categoryFilter"
                name="categoryFilter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="block w-full py-2.5 px-4 text-sm font-semibold text-gray-900 bg-white border-2 border-cyan-700 rounded-md focus:outline-none focus:border-cyan-700"
              >
                <option value="">All Categories</option>
                <option value="Online">Online</option>
                <option value="Physical">Physical</option>
                <option value="Hybrid">Hybrid</option>
                {/* Add more category options */}
              </select>
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="startDateFilter"
                  className="block mb-2 text-md font-semibold text-gray-900"
                >
                  Start Date:
                </label>
                <input
                  type="date"
                  id="startDateFilter"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="block w-full py-2.5 px-4 text-sm font-semibold text-gray-900 bg-white border-2 border-cyan-700 rounded-md focus:outline-none focus:border-cyan-700"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="endDateFilter"
                  className="block mb-2 text-md font-semibold text-gray-900"
                >
                  End Date:
                </label>
                <input
                  type="date"
                  id="endDateFilter"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="block w-full py-2.5 px-4 text-sm font-semibold text-gray-900 bg-white border-2 border-cyan-700 rounded-md focus:outline-none focus:border-cyan-700"
                />
              </div>
            </div>
            <button
              onClick={handleFilterEvents}
              className="w-full py-2.5 px-4 text-md font-semibold text-white bg-cyan-950 hover:bg-green-500 text-black active:bg-green-700 rounded-md focus:outline-none"
            >
              Apply Filter
            </button>
          </div>

          <div className="w-full md:w-3/4 px-4 py-4 mr-6">
            <div className="flex-col items-center justify-center">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    className="bg-white rounded-lg border-2 border-cyan-700 shadow p-6 mb-4 event-container hover:shadow-md hover:border-teal-500 hover:border-3"
                    key={event._id}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center mb-2">
                        <p className="font-semibold text-blue-600 text-lg mr-2">
                          {event.username.firstName} {event.username.lastName}
                        </p>
                        <p className="text-gray-800 font-semibold text-md">
                          Posted an Event
                        </p>
                      </div>
                      <h2 className="font-bold text-2xl mb-2">
                        {event.title}
                      </h2>

                      <div className="inline-block mb-2 flex">
                        <div className="rounded bg-gradient-to-r from-green-500 to-cyan-500 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            Location | {event.location}
                          </span>
                        </div>

                        <div className="rounded bg-cyan-300 text-black text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            {event.Event_type} Event
                          </span>
                        </div>

                        <div className="rounded bg-fuchsia-300 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            Event Date | {event.formattedDate}
                          </span>
                        </div>

                        <div className="rounded bg-indigo-300 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            Time | {event.time}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 font-semibold text-md">
                        Description: {event.description}
                      </p>

                      <div className="flex items-center justify-center mt-6">
                        {/* "Interested" button */}
                        <button
                          onClick={() =>
                            handleInterestedClick(
                              event._id,
                              getCurrentUserName()
                            )
                          }
                          className="py-2.5 px-4 text-md bg-teal-400 hover:bg-green-500 text-black rounded-lg w-48 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-black mt-6 mr-10"
                        >
                          Interested
                        </button>

                        {/* "Participating" button */}
                        <button
                          onClick={() =>
                            handleParticipatingClick(
                              event._id,
                              getCurrentUserName()
                            )
                          }
                          className="py-2.5 px-4 text-md bg-cyan-950 hover:bg-green-500 text-white rounded-lg w-48 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out mt-6"
                        >
                          Participating
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg border-2 border-red-500 shadow p-6 mb-4 mt-10 flex items-center justify-center">
                  <p className="text-gray-700 font-bold">
                    No events available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {isModalVisible && (
          <div
            id="successModal"
            className="fixed inset-0 z-50 flex justify-center items-center bg-gray-100 bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
                <button
                  type="button"
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover-bg-gray-200 hover-text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark-hover-bg-gray-600 dark-hover-text-white"
                  onClick={closeModal}
                ><svg
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
                  {modalText}
                </p>
                <button
                  data-modal-toggle="successModal"
                  type="button"
                  onClick={closeModal}
                  className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-emerald-600 hover-bg-primary-700 focus-ring-4 focus-outline-none focus-ring-primary-300 0"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Events;
