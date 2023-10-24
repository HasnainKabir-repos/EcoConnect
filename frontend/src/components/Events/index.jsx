import React, { useEffect, useState } from "react";
import TopBar from "../TopBar";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Fetch events data from your API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Sample events data (replace with actual API endpoint)
        const sampleEvents = [
          {
            id: 1,
            postedBy: "John Doe",
            date: "2023-12-01",
            time: "09:00",
            eventName: "Sustainable Living Workshop",
            location: "Dhaka, Bangladesh",
            category: "Online",
            description:
              "Join our Online Sustainable Living Workshop and learn how to lead an eco-friendly lifestyle from the comfort of your home. This interactive virtual event will cover topics such as reducing energy consumption, sustainable food choices, and waste reduction. Our expert speakers will provide valuable insights and tips for making a positive impact on the environment.",
          },
          {
            id: 2,
            postedBy: "Alice Smith",
            date: "2023-12-10",
            time: "08:30",
            eventName: "Hybrid Clean-up Drive",
            location: "Dhaka, Bangladesh",
            category: "Hybrid",
            description:
              "Our Hybrid Clean-up Drive along the Dhaka Riverfront combines both online and physical participation. We'll start with a virtual awareness session discussing the importance of clean rivers and the impact of pollution. Then, we'll gather at the Dhaka Riverfront for a hands-on cleanup activity. This event aims to raise awareness and take practical steps towards a cleaner and healthier river.",
          },
          {
            id: 3,
            postedBy: "Muazul Islam",
            date: "2023-12-15",
            time: "11:00",
            eventName: "Eco-Friendly Fair",
            location: "Chittagong, Bangladesh",
            category: "Physical",
            description:
              "Join us at the Physical Eco-Friendly Fair in Chittagong, Bangladesh. This event is all about promoting sustainable living practices. Explore a wide range of eco-friendly products, from reusable items to locally sourced, organic goods. Learn about green energy solutions and enjoy eco-conscious entertainment. Bring your friends and family to celebrate and support eco-friendliness in Chittagong.",
          },
          {
            id: 4,
            postedBy: "Md. Abu Soyeb",
            date: "2023-12-20",
            time: "10:00",
            eventName: "Reforestation Webinar",
            location: "Online",
            category: "Online",
            description:
              "Tune in to our Online Reforestation Webinar and discover the importance of reforestation in combating climate change. Learn about tree planting techniques, indigenous tree species, and how you can get involved in reforestation efforts. This virtual event welcomes participants from Bangladesh and beyond, offering valuable insights into preserving our natural environment.",
          },
          {
            id: 5,
            postedBy: "Mamunur Rahman",
            date: "2023-12-25",
            time: "12:00",
            eventName: "Plastic-Free Holiday Celebration",
            location: "Dhaka, Bangladesh",
            category: "Hybrid",
            description:
              "Celebrate the holiday season in an eco-friendly way with our Hybrid Plastic-Free Holiday Celebration in Dhaka, Bangladesh. We'll start with an online discussion on reducing plastic waste during the holidays, followed by a local gathering where we'll exchange plastic-free gifts and share sustainable holiday traditions. Let's make this holiday season environmentally responsible and joyous.",
          },
          {
            id: 6,
            postedBy: "Zayed Hasan",
            date: "2023-12-30",
            time: "15:30",
            eventName: "Bike Ride in Sylhet",
            location: "Sylhet, Bangladesh",
            category: "Physical",
            description:
              "Join our Physical Bike Ride in Sylhet, Bangladesh, as we explore the scenic beauty of the region while promoting eco-friendly transportation. We'll embark on a leisurely bike ride through the picturesque landscapes of Sylhet. Riding a bicycle reduces carbon emissions and keeps you healthy. Bring your bikes and helmets for a memorable ride.",
          },
          {
            id: 7,
            postedBy: "Dayan Ahmed Khan",
            date: "2024-01-05",
            time: "14:00",
            eventName: "Wildlife Conservation Seminar",
            location: "Online",
            category: "Online",
            description:
              "Participate in our Online Wildlife Conservation Seminar to learn about the importance of protecting wildlife and preserving ecosystems in Bangladesh. Our virtual event features expert speakers and discussions on wildlife conservation efforts within the country. Discover how you can contribute to safeguarding the rich biodiversity of Bangladesh.",
          },
          {
            id: 8,
            postedBy: "Samin Sadaf",
            date: "2024-01-10",
            time: "09:30",
            eventName: "Sustainable Energy Symposium",
            location: "Dhaka, Bangladesh",
            category: "Hybrid",
            description:
              "Explore the future of sustainable energy in Bangladesh at our Hybrid Sustainable Energy Symposium. We'll begin with an online session on clean energy innovations and their impact on the environment. This will be followed by a physical gathering in Dhaka for networking and hands-on demonstrations of green technologies. Discover how Bangladesh is transitioning to a cleaner and greener energy future.",
          },
          {
            id: 9,
            postedBy: "Tahlil Mahfuz",
            date: "2024-01-15",
            time: "10:00",
            eventName: "Coastal Cleanup",
            location: "Cox's Bazar, Bangladesh",
            category: "Physical",
            description:
              "Join us for a Physical Coastal Cleanup in Cox's Bazar, known for its stunning coastline. Together, we'll remove marine debris and plastic waste from the shores of Cox's Bazar, contributing to the conservation of this natural beauty. This event offers an opportunity to protect the marine environment and raise awareness about the importance of clean beaches.",
          },
          {
            id: 10,
            postedBy: "A Z Hasnain Kabir",
            date: "2024-01-20",
            time: "11:00",
            eventName: "Recycling and Upcycling Expo",
            location: "Online",
            category: "Online",
            description:
              "Experience the world of recycling and upcycling from the comfort of your home with our Online Recycling and Upcycling Expo. This virtual event showcases innovative ways to reduce waste and repurpose materials. Discover eco-friendly products, creative upcycled art, and learn how to make a positive environmental impact from anywhere in Bangladesh.",
          },
        ];

        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
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
          (!selectedCategory || event.category === selectedCategory) &&
          (!startDate || new Date(event.date) >= new Date(startDate)) &&
          (!endDate || new Date(event.date) <= new Date(endDate))
        );
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  const handleInterestedClick = (eventPoster, currentUserName) => {
    // Handle interested button click, send data to the event poster
    console.log(
      `User ${currentUserName} is interested in the event posted by ${eventPoster}`
    );
  };

  const handleParticipatingClick = (eventPoster, currentUserName) => {
    // Handle participating button click, send data to the event poster
    console.log(
      `User ${currentUserName} is participating in the event posted by ${eventPoster}`
    );
  };

  // Replace getCurrentUserName with your actual function for fetching the current user's name
  const getCurrentUserName = () => {
    return "CurrentUserName"; //put the actual implementation here
  };

  return (
    <>
      <TopBar />
      <main className="pt-20 bg-gray-100 min-h-screen">
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
                    key={event.id}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center mb-2">
                        <p className="font-semibold text-blue-600 text-lg mr-2">
                          {event.postedBy}
                        </p>
                        <p className="text-gray-800 font-semibold text-md">
                          Posted an Event
                        </p>
                      </div>
                      <h2 className="font-bold text-2xl mb-2">
                        {event.eventName}
                      </h2>

                      <div className="inline-block mb-2 flex">
                        <div className="rounded bg-gradient-to-r from-green-500 to-cyan-500 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            Location | {event.location}
                          </span>
                        </div>

                        <div className="rounded bg-cyan-300 text-black text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            {event.category} Event
                          </span>
                        </div>

                        <div className="rounded bg-fuchsia-300 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            Event Date | {event.date}
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
                              event.postedBy,
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
                              event.postedBy,
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
      </main>
    </>
  );
};

export default Events;
