/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import Post from "../CommunityPost";
import TopBar from "../TopBar";
const Community = () => {
  const communities = [
    {
      name: "Green Earth",
      members: [
        "EcoWarrior123",
        "GreenThumb456",
        "EarthAdvocate789",
        "NatureLover234",
        "SustainableGuru567",
      ],
    },
    {
      name: "Clean Ocean",
      members: [
        "OceanSaver456",
        "SeaExplorer789",
        "BlueWaveAdvocate",
        "MarineBiologist123",
        "BeachCleaner789",
      ],
    },
    {
      name: "Recycle Now",
      members: [
        "RecycleHero789",
        "WasteWarrior101",
        "ReuseChampion234",
        "EcoEducator567",
        "ZeroWasteProponent789",
      ],
    },
    {
      name: "Wildlife Conservation",
      members: [
        "WildlifeGuardian101",
        "NatureExplorer456",
        "ConservationAdvocate789",
        "AnimalLover234",
        "WildlifePhotographer567",
      ],
    },
    {
      name: "Clean Forests",
      members: [
        "ForestKeeper234",
        "GreenExplorer789",
        "TreeHugger101",
        "HikingEnthusiast567",
        "ForestConservationist789",
      ],
    },
  ];

  const [selectedCommunity, setSelectedCommunity] = useState(
    communities[0].name
  );
  const posts = [
    {
      user: "EcoWarrior123",
      community: "Green Earth",
      text: "Just planted a tree in my backyard! 🌳 #EcoFriendly #PlantATree",
      createdAt: "2021-04-22",
      likes: 15,
      comments: [
        {
          user: "Commenter1",
          text: "That's amazing! Keep up the good work!",
          createdAt: "2021-04-22T12:30:00",
        },
        {
          user: "Commenter2",
          text: "Your commitment to the environment is inspiring!",
          createdAt: "2021-04-22T13:15:00",
        },
      ],
    },
    {
      user: "GreenThumb456",
      community: "Green Earth",
      text: "Harvested fresh vegetables from my garden! 🥦🍅 #SustainableLiving #HomeGarden",
      image:
        "https://images.pexels.com/photos/1243015/pexels-photo-1243015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      createdAt: "2021-04-23",
      likes: 20,
      comments: [
        {
          user: "Commenter3",
          text: "Those veggies look delicious! Can you share some gardening tips?",
          createdAt: "2021-04-23T15:00:00",
        },
        {
          user: "Commenter4",
          text: "I wish I had a garden like yours! Great job!",
          createdAt: "2021-04-23T16:45:00",
        },
      ],
    },
    {
      user: "EarthAdvocate789",
      community: "Green Earth",
      text: "Attended an environmental awareness webinar today. Let's make a difference! 🌎💚 #EnvironmentalAwareness #ActForChange",
      createdAt: "2021-04-24",
      image:
        "https://images.pexels.com/photos/1243015/pexels-photo-1243015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 12,
      comments: [
        {
          user: "Commenter5",
          text: "What topics were discussed in the webinar? I'm interested in joining one!",
          createdAt: "2021-04-24T14:20:00",
        },
        {
          user: "Commenter6",
          text: "Educating ourselves is crucial for positive change. Well done!",
          createdAt: "2021-04-24T16:00:00",
        },
      ],
    },
    {
      user: "OceanSaver456",
      community: "Clean Ocean",
      text: "Participated in a beach cleanup today! 🌊 #CleanOcean #SaveOurSeas",
      createdAt: "2021-04-25",
      likes: 18,
      comments: [
        {
          user: "Commenter7",
          text: "Thank you for helping keep our oceans clean! Every bit counts.",
          createdAt: "2021-04-25T12:45:00",
        },
        {
          user: "Commenter8",
          text: "I love beach cleanups! It's so rewarding to see the impact we can make.",
          createdAt: "2021-04-25T14:30:00",
        },
      ],
    },
    {
      user: "SeaExplorer789",
      community: "Clean Ocean",
      text: "Explored the beauty of the ocean and picked up litter along the shore. 🚣‍♂️🏖️ #OceanCleanup #ProtectMarineLife",
      createdAt: "2021-04-26",
      likes: 25,
      comments: [
        {
          user: "Commenter9",
          text: "Your dedication to marine life preservation is admirable!",
          createdAt: "2021-04-26T13:00:00",
        },
        {
          user: "Commenter10",
          text: "How often do you go on ocean cleanups? I'd love to join!",
          createdAt: "2021-04-26T14:45:00",
        },
      ],
    },
    {
      user: "BlueWaveAdvocate",
      community: "Clean Ocean",
      text: "Joined a campaign to reduce plastic use. Small actions can have a big impact! 🌊🐢 #PlasticFree #CleanSeas",
      image:
        "https://images.pexels.com/photos/1243015/pexels-photo-1243015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      createdAt: "2021-04-27",
      likes: 22,
      comments: [
        {
          user: "Commenter11",
          text: "Plastic pollution is a serious issue. Your efforts are appreciated!",
          createdAt: "2021-04-27T11:30:00",
        },
        {
          user: "Commenter12",
          text: "Let's all work towards a plastic-free future! 💙",
          createdAt: "2021-04-27T13:15:00",
        },
      ],
    },
    {
      user: "RecycleHero789",
      community: "Recycle Now",
      text: "Sorted my waste for recycling! 🔄 #RecycleNow #ZeroWaste",
      createdAt: "2021-04-28",
      likes: 30,
      comments: [
        {
          user: "Commenter13",
          text: "Recycling is a simple yet powerful way to reduce our environmental impact.",
          createdAt: "2021-04-28T14:20:00",
        },
        {
          user: "Commenter14",
          text: "Great job! Keep encouraging others to recycle as well.",
          createdAt: "2021-04-28T16:00:00",
        },
      ],
    },
    {
      user: "WasteWarrior101",
      community: "Recycle Now",
      text: "Educated my neighbors on the importance of recycling. Let's recycle together! 🌐♻️ #CommunityRecycling #WasteReduction",
      createdAt: "2021-04-29",
      likes: 28,
      comments: [
        {
          user: "Commenter15",
          text: "Community involvement is key to creating a sustainable future.",
          createdAt: "2021-04-29T13:45:00",
        },
        {
          user: "Commenter16",
          text: "Do you have any tips for getting neighbors involved? I'd love to do the same!",
          createdAt: "2021-04-29T15:30:00",
        },
      ],
    },
    {
      user: "ReuseChampion234",
      community: "Recycle Now",
      text: "Found creative ways to repurpose old items. Reduce, reuse, recycle! ♻️✨ #ReuseIdeas #Upcycling",
      createdAt: "2021-04-30",
      likes: 35,
      comments: [
        {
          user: "Commenter17",
          text: "Upcycling is a fantastic way to give old items new life. Love your creativity!",
          createdAt: "2021-04-30T14:00:00",
        },
        {
          user: "Commenter18",
          text: "I've been meaning to start upcycling. Any beginner-friendly ideas?",
          createdAt: "2021-04-30T15:45:00",
        },
      ],
    },
    {
      user: "WildlifeGuardian101",
      community: "Wildlife Conservation",
      text: "Spent the day volunteering at the local wildlife sanctuary! 🦁🌿 #WildlifeConservation #ProtectOurWildlife",
      createdAt: "2021-05-01",
      likes: 40,
      comments: [
        {
          user: "Commenter19",
          text: "Volunteering for wildlife conservation is an honorable cause. Thank you!",
          createdAt: "2021-05-01T12:30:00",
        },
        {
          user: "Commenter20",
          text: "What animals are at the sanctuary? I'd love to visit!",
          createdAt: "2021-05-01T14:15:00",
        },
      ],
    },
    {
      user: "NatureExplorer456",
      community: "Wildlife Conservation",
      text: "Observed rare bird species in their natural habitat. Let's preserve biodiversity! 🦉🌳 #Biodiversity #NatureObservation",
      createdAt: "2021-05-02",
      likes: 38,
      comments: [
        {
          user: "Commenter21",
          text: "Biodiversity is crucial for a healthy ecosystem. Keep up the observations!",
          createdAt: "2021-05-02T13:00:00",
        },
        {
          user: "Commenter22",
          text: "I'm passionate about birdwatching too! Any tips for spotting rare species?",
          createdAt: "2021-05-02T14:45:00",
        },
      ],
    },
    {
      user: "ConservationAdvocate789",
      community: "Wildlife Conservation",
      text: "Advocated for stronger wildlife protection laws. Every species matters! 🐘🌍 #WildlifeProtection #Advocacy",
      createdAt: "2021-05-03",
      likes: 42,
      comments: [
        {
          user: "Commenter23",
          text: "Advocacy is a powerful tool for change. Keep raising your voice!",
          createdAt: "2021-05-03T11:30:00",
        },
        {
          user: "Commenter24",
          text: "How can we support wildlife protection initiatives? Any recommendations?",
          createdAt: "2021-05-03T13:15:00",
        },
      ],
    },
    {
      user: "ForestKeeper234",
      community: "Clean Forests",
      text: "Hiked through a clean forest trail today! 🌲 #CleanForests #NatureLover",
      createdAt: "2021-05-04",
      likes: 32,
      comments: [
        {
          user: "Commenter25",
          text: "Clean forest trails make for the best hikes! Where was this trail located?",
          createdAt: "2021-05-04T14:00:00",
        },
        {
          user: "Commenter26",
          text: "I love exploring nature. Do you have any favorite hiking spots?",
          createdAt: "2021-05-04T15:45:00",
        },
      ],
    },
    {
      user: "GreenExplorer789",
      community: "Clean Forests",
      text: "Explored a new forest area and admired the untouched beauty of nature. 🌿🍃 #ForestExploration #NatureAdventures",
      image:
        "https://images.pexels.com/photos/1243015/pexels-photo-1243015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      createdAt: "2021-05-05",
      likes: 28,
      comments: [
        {
          user: "Commenter27",
          text: "Nature adventures are the best! What surprised you the most in the new forest area?",
          createdAt: "2021-05-05T13:30:00",
        },
        {
          user: "Commenter28",
          text: "I'm always looking for new places to explore. Any recommendations?",
          createdAt: "2021-05-05T15:15:00",
        },
      ],
    },
    {
      user: "TreeHugger101",
      community: "Clean Forests",
      text: "Joined a reforestation project to plant trees and restore the ecosystem. 🌳💚 #Reforestation #EcoRestoration",
      createdAt: "2021-05-06",
      likes: 35,
      comments: [
        {
          user: "Commenter29",
          text: "Thank you for contributing to reforestation! It's vital for the environment.",
          createdAt: "2021-05-06T12:45:00",
        },
        {
          user: "Commenter30",
          text: "I've always wanted to participate in a reforestation project. How did it go?",
          createdAt: "2021-05-06T14:30:00",
        },
      ],
    },
  ];

  const handleJoinCommunity = (communityName) => {
    // Replace this with the actual logic for joining the community
    alert(`Joined the ${communityName} community!`);
    window.location.reload();
  };

  const [postContent, setPostContent] = useState("");
  const [isFormMinimized, setIsFormMinimized] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle the submission of the postContent
    console.log("Post submitted:", postContent);
    // Clear the input field after submission
    setPostContent("");
    window.location.reload();
  };
  const toggleFormVisibility = () => {
    setIsFormMinimized(!isFormMinimized);
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

  const members = communities.find(
    (community) => community.name === selectedCommunity
  )?.members;
  return (
    <>
      <TopBar />
      <main className="pt-20 min-h-screen min-w-screen bg-gray-200">
        <div className="fixed flex flex-row w-full">
          <div className="w-2/6 p-2 ml-4 mt-10 mb-2">
            <div className="flex flex-col  h-full">
              <div className="overflow-auto max-h-80 rounded-lg bg-white px-6 py-4 cursor-pointer mb-4">
                <div className="font-semibold text-xl text-teal-900 mb-2">
                  My Communities:
                </div>
                <div className="flex flex-wrap flex-col">
                  {communities.map((community, index) => (
                    <div
                      key={index}
                      className={`font-bold py-1 my-1 px-2 flex items-center rounded-full border border-teal-900 border-solid hover:border-dashed 
              ${
                selectedCommunity === community.name
                  ? "bg-teal-900 text-white"
                  : "bg-white text-gray-900"
              }
            `}
                      onClick={() => setSelectedCommunity(community.name)}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
                      ></div>
                      <div className="text-base">{community.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-auto max-h-80 rounded-lg bg-white px-6 py-4 cursor-pointer mb-4">
                <div className="font-semibold text-xl text-teal-900 mb-2 ">
                  Members of {selectedCommunity}:
                </div>
                <div className="flex flex-wrap flex-col">
                  {members &&
                    members.map((member, index) => (
                      <div
                        key={index}
                        className="font-semibold text-base bg-gray-300 text-black rounded-full px-3 py-1 m-1"
                      >
                        {member}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-5/6 mt-8 ml-4 mr-5 pr-2 pb-36 overflow-auto max-h-screen">
            <div className="flex flex-col mx-auto p-4">
              <div className="flex flex-col mx-4 p-2 w-full bg-white text-teal-900 rounded-lg shadow-xl transition ease-in-out duration-300">
                <h3
                  className="text-lg font-bold text-center mb-2 mt-2 cursor-pointer"
                  onClick={toggleFormVisibility}
                >
                  Post Something to {selectedCommunity}
                </h3>
                {!isFormMinimized && (
                  <form
                    className="flex flex-col items-center w-full"
                    onSubmit={handlePostSubmit}
                  >
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Type your Post Here..."
                      className="border-2 rounded-lg p-3 mb-3 w-5/6"
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
                    >
                      Post
                    </button>
                  </form>
                )}
              </div>
              <div className="flex flex-col mx-4 w-full p-4">
                {posts
                  .filter((post) => post.community === selectedCommunity)
                  .map((post, index) => (
                    <div key={index} className="">
                      <Post
                        community={post.community}
                        user={post.user}
                        text={post.text}
                        createdAt={post.createdAt}
                        likes={post.likes}
                        comments={post.comments}
                        image={post.image}
                      />
                    </div>
                  ))}
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
                  {communities.map((community, index) => (
                    <div
                      key={index}
                      className="py-2 my-1 px-2 flex items-center rounded-full border border-teal-900 border-solid bg-gray-700 text-white hover:bg-white hover:text-black transition ease-in-out duration-400"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
                      ></div>
                      <div className="text-base font-bold">
                        {community.name}
                      </div>
                      <button
                        className="ml-auto px-4 py-1 rounded-full bg-teal-400 text-black font-bold text-sm"
                        onClick={() => handleJoinCommunity(community.name)}
                      >
                        Join
                      </button>
                    </div>
                  ))}
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
