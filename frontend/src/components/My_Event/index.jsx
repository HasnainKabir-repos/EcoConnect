import React, { useState } from "react";
import TopBar from "../TopBar";
import {useMyEvent} from "../../hooks/useMyEvent";
import Loader from "../Loader";
import axios from "axios";

const My_Event = () => {

  const { myEvents, isLoading } = useMyEvent();

  const [showInterestedParticipants, setShowInterestedParticipants] =
    useState(false);
  const [showGoingParticipants, setShowGoingParticipants] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDeleteEvent = async (eventId) => {

    try{
      const token = localStorage.getItem('token');
      const tokenValue = JSON.parse(token);
      const config = {
        headers: {
            Authorization: `Bearer ${tokenValue.data}`
        },
      };
      await axios.delete(`http://localhost:8080/api/MyEvent/${eventId}`, config);
      window.location.reload();
    }catch(error){
      console.log(error);
    }
   
  };

  const toggleInterestedParticipants = (eventId) => {
    if (selectedEventId === eventId && showInterestedParticipants) {
      setShowInterestedParticipants(false);
    } else {
      setSelectedEventId(eventId);
      setShowInterestedParticipants(true);
      setShowGoingParticipants(false);
    }
  };

  const toggleGoingParticipants = (eventId) => {
    if (selectedEventId === eventId && showGoingParticipants) {
      setShowGoingParticipants(false);
    } else {
      setSelectedEventId(eventId);
      setShowGoingParticipants(true);
      setShowInterestedParticipants(false);
    }
  };

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState(null);

  const openUpdateModal = (event) => {
    setSelectedEvent(event);
    setUpdatedEvent({ ...event });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdateEvent = async (updatedData, eventId) => {
    
    try{
      const token = localStorage.getItem('token');
      const tokenValue = JSON.parse(token);
      const config = {
        headers: {
            Authorization: `Bearer ${tokenValue.data}`
        },
      };
      await axios.post(`http://localhost:8080/api/MyEvent/${eventId}`, updatedData, config);
      window.location.reload();
    }catch(error){
      console.log(error);
    }finally{
      closeUpdateModal();
    }

    
  };

  return (
    <main className="pt-20 min-h-screen bg-gray-100">
      <TopBar />
      <div>{isLoading ? <Loader /> : console.log("Loaded")}</div>
      <div className="w-full flex items-center justify-center mt-10">
        <div className="flex-col items-center justify-center">
          {myEvents.length === 0 ? (
            <div className="bg-white rounded-lg border-2 border-cyan-700 shadow p-6 mb-4 event-container hover:shadow-md hover:border-teal-500 hover:border-3">
              <h2 className="font-bold text-2xl mb-2">
                You have not created any event
              </h2>
            </div>
          ) : (
            <div>
              {myEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg border-2 border-cyan-700 shadow p-6 mb-4 event-container hover:shadow-md hover:border-teal-500 hover:border-3"
                >
                  <h2 className="font-bold text-2xl mb-2">{event.title}</h2>
                  <div className="inline-block mb-2 flex">
                    <div className="rounded bg-lime-200 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                      <span className="whitespace-no-wrap font-semibold">
                        Location | {event.location}
                      </span>
                    </div>
                    <div className="rounded bg-cyan-300 text-black text-black px-2 py-1 text-md inline-flex items-center mr-2">
                      <span className="whitespace-no-wrap font-semibold">
                        {event.Event_type} Event
                      </span>
                    </div>
                    <div className="rounded bg-lime-200 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                      <span className="whitespace-no-wrap font-semibold">
                        Event Date | {event.formattedDate}
                      </span>
                    </div>
                    <div className="rounded bg-lime-200 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                      <span className="whitespace-no-wrap font-semibold">
                        Time | {event.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 font-semibold text-md">
                    Description: {event.description}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex space-x-4 mr-40">
                      <button
                        onClick={() => toggleInterestedParticipants(event._id)}
                        className="py-2.5 px-4 text-md bg-blue-500 hover:bg-blue-600 text-white rounded-full w-48 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-white"
                      >
                        View Interested [{event.interested.length}]
                      </button>
                      <button
                        onClick={() => toggleGoingParticipants(event._id)}
                        className="py-2.5 px-4 text-md bg-yellow-500 hover:bg-yellow-600 text-black rounded-full w-48 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-black"
                      >
                        View Going [{event.participants.length}]
                      </button>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => openUpdateModal(event)}
                        className="py-2.5 px-4 text-md bg-teal-400 hover:bg-green-500 text-black rounded-full w-32 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-black"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="py-2.5 px-4 text-md bg-red-500 hover:bg-red-600 text-white rounded-full w-32 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {showInterestedParticipants &&
                    selectedEventId === event._id && (
                      <div>
                        <h3 className="mt-4 text-lg font-semibold mb-4">
                          Interested Participants:
                        </h3>
                        <ul className="list-decimal ml-6">
                          {event.interested.map((participant, index) => (
                            <li key={index} className="text-md">
                              <div className="rounded bg-gray-300 px-2 py-1 text-sm items-center justify-center mb-2">
                                {participant}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {showGoingParticipants && selectedEventId === event._id && (
                    <div>
                      <h3 className="mt-4 text-lg font-semibold mb-4">
                        Going Participants:
                      </h3>
                      <ul className="list-decimal ml-6">
                        {event.participants.map((participant, index) => (
                          <li key={index} className="text-md">
                            <div className="rounded bg-gray-300 px-2 py-1 text-sm items-center mb-2">
                              {participant}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {isUpdateModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20">
                      <div className="bg-white p-4 rounded-lg w-1/2">
                        <h2 className="text-xl font-semibold mb-6 text-center">
                          Update Your Event Details
                        </h2>
                        <div className="flex flex-wrap -mx-3 mb-2">
                          <div className="w-1/2 px-3 mb-6">
                            <label className="block text-gray-600 mb-1">
                              Title:
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={updatedEvent.title}
                              onChange={(e) =>
                                setUpdatedEvent({
                                  ...updatedEvent,
                                  title: e.target.value,
                                })
                              }
                              className="w-full border border-black rounded-md p-2"
                            />
                          </div>
                          <div className="w-1/2 px-3 mb-2">
                            <label className="block text-gray-600 mb-1">
                              Location:
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={updatedEvent.location}
                              onChange={(e) =>
                                setUpdatedEvent({
                                  ...updatedEvent,
                                  location: e.target.value,
                                })
                              }
                              className="w-full border border-black rounded-md p-2"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                          <div className="w-1/3 px-3 mb-2">
                            <label className="block text-gray-600 mb-1">
                              Event Type:
                            </label>
                            <select
                              name="event_type"
                              value={updatedEvent.Event_type}
                              onChange={(e) =>
                                setUpdatedEvent({
                                  ...updatedEvent,
                                  Event_type: e.target.value,
                                })
                              }
                              className="w-full border border-black rounded-md p-2"
                            >
                              <option value="Online">Online</option>
                              <option value="Physical">Physical</option>
                              <option value="Hybrid">Hybrid</option>
                            </select>
                          </div>
                          <div className="w-1/3 px-3 mb-6">
                            <label className="block text-gray-600 mb-1">
                              Date:
                            </label>
                            <input
                              type="date"
                              name="formattedDate"
                              value={updatedEvent.formattedDate}
                              onChange={(e) =>
                                setUpdatedEvent({
                                  ...updatedEvent,
                                  formattedDate: e.target.value,
                                })
                              }
                              className="w-full border border-black rounded-md p-2"
                            />
                          </div>
                          <div className="w-1/3 px-3 mb-6">
                            <label className="block text-gray-600 mb-1">
                              Time:
                            </label>
                            <input
                              type="time"
                              name="time"
                              value={updatedEvent.time}
                              onChange={(e) =>
                                setUpdatedEvent({
                                  ...updatedEvent,
                                  time: e.target.value,
                                })
                              }
                              className="w-full border border-black rounded-md p-2"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="block text-gray-600 mb-1">
                            Description:
                          </label>
                          <textarea
                            name="description"
                            value={updatedEvent.description}
                            onChange={(e) =>
                              setUpdatedEvent({
                                ...updatedEvent,
                                description: e.target.value,
                              })
                            }
                            className="w-full border border-black rounded-md p-2"
                          />
                        </div>
                        <div className="flex space-x-8 justify-center mt-4">
                          <button
                            className="bg-teal-950 w-48 text-white px-4 py-2 rounded-full mr-2 hover:bg-teal-600"
                            onClick={() => {handleUpdateEvent(updatedEvent,event._id)}}
                          >
                            Update
                          </button>
                          <button
                            className="bg-red-500 w-48 text-white px-4 py-2 rounded-full hover-bg-red-600"
                            onClick={closeUpdateModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default My_Event;
