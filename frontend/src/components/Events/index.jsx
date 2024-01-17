import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import TopBar from "../TopBar";
import LocationDropdown from "../LocationDropdown";
const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [interestedEvents, setInterestedEvents] = useState([]);
  const [participatingEvents, setParticipatingEvents] = useState([]);

  useEffect(() => {
    // Fetch events data from your API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const tokenValue = JSON.parse(token);
        const config = {
          headers: { Authorization: `Bearer ${tokenValue.data}` },
        };

        let response;

        if (location.lat !== "" && location.lng !== "") {
          console.log("Fetching...");
          response = await axios.post(
            "https://ecoconnect-3hx9.onrender.com/api/location/search/nearby",
            {
              lat: location.lat,
              lng: location.lng,
            },
            config
          );

          console.log(response.data);
        } else {
          response = await axios.get("https://ecoconnect-3hx9.onrender.com/api/event", config);
        }

        const eventsData = response.data;

        // Format the date for each event
        const eventsWithFormattedDate = await Promise.all(
          eventsData.map(async (event) => {
            const date = new Date(event.date);
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            const formattedDate = `${yyyy}-${mm}-${dd}`;

            const usernameResponse = await axios.post(
              "https://ecoconnect-3hx9.onrender.com/api/userInfo/getUsername",
              {
                email: event.organizer,
              }
            );
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
  }, [location]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const tokenValue = JSON.parse(token);
        const config = {
          headers: { Authorization: `Bearer ${tokenValue.data}` },
        };

        const interestedResponse = await axios.get(
          "https://ecoconnect-3hx9.onrender.com/api/event/interested",
          config
        );

        const participatingResponse = await axios.get(
          "https://ecoconnect-3hx9.onrender.com/api/event/participating",
          config
        );

        // Use the functional form of state-setting function to ensure the state is updated correctly
        setInterestedEvents((prevInterestedEvents) => [
          ...prevInterestedEvents,
          ...interestedResponse.data,
        ]);

        setParticipatingEvents((prevParticipatingEvents) => [
          ...prevParticipatingEvents,
          ...participatingResponse.data,
        ]);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
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

  const handlePlaceChange = (data) => {
    setLocation({
      lat: data.lat,
      lng: data.lng,
    });
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
    try {
      setIsLoading(true);

      // Check if the event is already in the interestedEvents array
      if (!interestedEvents.includes(id)) {
        const token = localStorage.getItem("token");
        const tokenValue = JSON.parse(token);
        const config = {
          headers: { Authorization: `Bearer ${tokenValue.data}` },
        };
        const url = `https://ecoconnect-3hx9.onrender.com/api/event/addInterestedUser/${id}`;
        const response = await axios.put(url, {}, config);

        // Update the interestedEvents array
        setInterestedEvents([...interestedEvents, id]);
        console.log("Interested");
      } else {
        console.log("Already Interested");
      }
    } catch (error) {
      console.log({ error: error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleParticipatingClick = async (id, currentUserName) => {
    try {
      setIsLoading(true);

      // Check if the event is already in the participatingEvents array
      if (!participatingEvents.includes(id)) {
        const token = localStorage.getItem("token");
        const tokenValue = JSON.parse(token);
        const config = {
          headers: { Authorization: `Bearer ${tokenValue.data}` },
        };
        const url = `https://ecoconnect-3hx9.onrender.com/api/event/addParticipants/${id}`;
        await axios.put(url, {}, config);

        // Update the participatingEvents array
        setParticipatingEvents([...participatingEvents, id]);
        console.log("Participating");
      } else {
        console.log("Already Participating");
      }
    } catch (error) {
      console.log({ error: error });
    } finally {
      setIsLoading(false);
    }
  };
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  // Replace getCurrentUserName with your actual function for fetching the current user's name
  const getCurrentUserName = () => {
    return "CurrentUserName"; //put the actual implementation here
  };

  return (
    <>
      <TopBar />

      <main className="pt-20 bg-gray-200 min-h-screen">
        <div>{isLoading ? <Loader /> : console.log("Loaded")}</div>
        <div className="flex">
          <div className="w-1/4 px-4 py-4 rounded-lg ml-10 mt-8 bg-white min-h-0">
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
            <div className="mb-4 flex space-x-4 m-2 justify-center">
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
                  className="w-full py-2.5 px-4 text-sm font-semibold text-gray-900 bg-white border-2 border-cyan-700 rounded-md focus:outline-none focus:border-cyan-700"
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
              className="w-full py-2.5 px-4 text-md font-semibold text-white bg-cyan-950 hover:bg-teal-400 hover:text-black active:bg-green-700 rounded-md focus:outline-none"
            >
              Apply Filter
            </button>

            <div className="mb-4">
              <label className="block mb-2 mt-10 text-md font-semibold text-gray-900">
                Filter by Location<br />
                (Find Events in 10 KM Radius)
              </label>
              <LocationDropdown
                className=""
                onChangePlace={handlePlaceChange}
              />
            </div>
          </div>

          <div className="w-full md:w-3/4 px-4 py-4 mr-6">
            <div className="flex-col items-center justify-center mt-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    className="bg-white rounded-lg shadow-lg px-14 py-8 mb-4 event-container hover:shadow-xl transition duration-300 ease-in-out"
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
                      <h2 className="font-bold text-2xl mb-2">{event.title}</h2>

                      <div className="mb-2 flex">
                        <div className="rounded bg-gradient-to-r bg-teal-200 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            Location | {event.location}
                          </span>
                        </div>

                        <div className="rounded bg-cyan-300 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            {event.Event_type} Event
                          </span>
                        </div>

                        <div className="rounded bg-teal-200 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            Event Date | {event.formattedDate}
                          </span>
                        </div>

                        <div className="rounded bg-teal-200 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            Time | {event.time}
                          </span>
                        </div>
                      </div>

                      <p className="text-teal-900 font-bold text-lg mt-4">
                        Event Description:
                      </p>
                      <div
                        className="overflow-hidden transition-max-h duration-700 ease-in-out"
                      >
                        <p className="text-gray-700 font-semibold text-md">
                          {showFullDescription
                            ? event.description
                            : `${event.description.slice(0, 200)}${
                                event.description.length > 200 ? "..." : ""
                              }`}
                        </p>
                        {event.description.length > 200 && (
                          <button
                            onClick={toggleDescription}
                            className="text-blue-500 font-semibold cursor-pointer mt-2 hover:underline"
                          >
                            {showFullDescription ? "See less" : "See more"}
                          </button>
                        )}
                      </div>

                      {event.eventImage && (
                        <img
                          src={ `https://ecoconnect-3hx9.onrender.com/api/uploads/${event.eventImage}`}
                          alt="event"
                          className="mb-2 rounded-2xl w-3/5 h-3/5 mx-auto object-cover mt-6"
                        />
                      )}

                      <div className="flex items-center justify-center mt-6">
                        {/* "Interested" button */}
                        <button
                          onClick={() =>
                            handleInterestedClick(
                              event._id,
                              getCurrentUserName()
                            )
                          }
                          disabled={interestedEvents.includes(event._id)}
                          className={`py-2.5 px-4 text-md ${
                            interestedEvents.includes(event._id)
                              ? "bg-gray-400"
                              : "bg-teal-400 hover:bg-green-500"
                          } text-black rounded-full w-48 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-black mt-6 mr-10`}
                        >
                          {interestedEvents.includes(event._id)
                            ? "Already Interested"
                            : "Interested"}
                        </button>

                        <button
                          onClick={() =>
                            handleParticipatingClick(
                              event._id,
                              getCurrentUserName()
                            )
                          }
                          disabled={participatingEvents.includes(event._id)}
                          className={`py-2.5 px-4 text-md ${
                            participatingEvents.includes(event._id)
                              ? "bg-gray-400"
                              : "bg-cyan-950 hover:bg-green-500"
                          } text-white rounded-full w-48 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out mt-6`}
                        >
                          {participatingEvents.includes(event._id)
                            ? "Already Going"
                            : "Going"}
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
      </main>
    </>
  );
};

export default Events;
