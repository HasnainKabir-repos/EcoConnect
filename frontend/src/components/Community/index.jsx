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
    },
    {
      user: "GreenThumb456",
      community: "Green Earth",
      text: "Harvested fresh vegetables from my garden! 🥦🍅 #SustainableLiving #HomeGarden",
      createdAt: "2021-04-23",
    },
    {
      user: "EarthAdvocate789",
      community: "Green Earth",
      text: "Attended an environmental awareness webinar today. Let's make a difference! 🌎💚 #EnvironmentalAwareness #ActForChange",
      createdAt: "2021-04-24",
    },
    {
      user: "OceanSaver456",
      community: "Clean Ocean",
      text: "Participated in a beach cleanup today! 🌊 #CleanOcean #SaveOurSeas",
      createdAt: "2021-04-25",
    },
    {
      user: "SeaExplorer789",
      community: "Clean Ocean",
      text: "Explored the beauty of the ocean and picked up litter along the shore. 🚣‍♂️🏖️ #OceanCleanup #ProtectMarineLife",
      createdAt: "2021-04-26",
    },
    {
      user: "BlueWaveAdvocate",
      community: "Clean Ocean",
      text: "Joined a campaign to reduce plastic use. Small actions can have a big impact! 🌊🐢 #PlasticFree #CleanSeas",
      createdAt: "2021-04-27",
    },
    {
      user: "RecycleHero789",
      community: "Recycle Now",
      text: "Sorted my waste for recycling! 🔄 #RecycleNow #ZeroWaste",
      createdAt: "2021-04-28",
    },
    {
      user: "WasteWarrior101",
      community: "Recycle Now",
      text: "Educated my neighbors on the importance of recycling. Let's recycle together! 🌐♻️ #CommunityRecycling #WasteReduction",
      createdAt: "2021-04-29",
    },
    {
      user: "ReuseChampion234",
      community: "Recycle Now",
      text: "Found creative ways to repurpose old items. Reduce, reuse, recycle! ♻️✨ #ReuseIdeas #Upcycling",
      createdAt: "2021-04-30",
    },
    {
      user: "WildlifeGuardian101",
      community: "Wildlife Conservation",
      text: "Spent the day volunteering at the local wildlife sanctuary! 🦁🌿 #WildlifeConservation #ProtectOurWildlife",
      createdAt: "2021-05-01",
    },
    {
      user: "NatureExplorer456",
      community: "Wildlife Conservation",
      text: "Observed rare bird species in their natural habitat. Let's preserve biodiversity! 🦉🌳 #Biodiversity #NatureObservation",
      createdAt: "2021-05-02",
    },
    {
      user: "ConservationAdvocate789",
      community: "Wildlife Conservation",
      text: "Advocated for stronger wildlife protection laws. Every species matters! 🐘🌍 #WildlifeProtection #Advocacy",
      createdAt: "2021-05-03",
    },
    {
      user: "ForestKeeper234",
      community: "Clean Forests",
      text: "Hiked through a clean forest trail today! 🌲 #CleanForests #NatureLover",
      createdAt: "2021-05-04",
    },
    {
      user: "GreenExplorer789",
      community: "Clean Forests",
      text: "Explored a new forest area and admired the untouched beauty of nature. 🌿🍃 #ForestExploration #NatureAdventures",
      createdAt: "2021-05-05",
    },
    {
      user: "TreeHugger101",
      community: "Clean Forests",
      text: "Joined a reforestation project to plant trees and restore the ecosystem. 🌳💚 #Reforestation #EcoRestoration",
      createdAt: "2021-05-06",
    },
  ];

  const handleJoinCommunity = (communityName) => {
    // Replace this with the actual logic for joining the community
    alert(`Joined the ${communityName} community!`);
    window.location.reload();
  };

  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle the submission of the postContent
    console.log("Post submitted:", postContent);
    // Clear the input field after submission
    setPostContent("");
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
          <div className="w-2/6 p-2 ml-4">
            <div className="flex flex-col mt-2 h-full">
              <div className="font-semibold text-xl text-teal-900 mb-2 mt-3">
                My Communities:
              </div>
              <div className="overflow-auto max-h-80 pr-2 rounded-lg border-2 border-teal-900 p-2 cursor-pointer">
                <div className="flex flex-wrap flex-col">
                  {communities.map((community, index) => (
                    <div
                      key={index}
                      className={`py-1 my-1 px-2 flex items-center rounded-full border border-teal-900 border-solid hover:border-dashed 
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

              <div className="font-semibold text-xl text-teal-900 mb-2 mt-6">
                Members of {selectedCommunity}:
              </div>
              <div className="overflow-auto max-h-80 pr-2 rounded-lg border-2 border-teal-900 p-2 cursor-pointer">
                <div className="flex flex-wrap flex-col">
                  {members &&
                    members.map((member, index) => (
                      <div key={index} className="text-base bg-teal-400 text-black rounded-full px-3 py-1 m-1">
                        {member}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-5/6 mt-8 ml-4 mr-5 pr-2 pb-36 overflow-auto max-h-screen">
            <div className="flex flex-col mx-auto p-4">
              <div className="flex flex-col mx-4 w-full border-2 border-gray-500 rounded-lg p-2">
                <h3 className="text-lg font-bold text-center mb-4">
                  Post Something to {selectedCommunity}
                </h3>
                <form
                  className="flex flex-col items-center w-full"
                  onSubmit={handlePostSubmit}
                >
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Type your Post Here..."
                    className="border rounded-lg p-3 mb-3 w-5/6"
                  />
                  <button
                    className="px-4 py-2 rounded-full bg-black hover:bg-teal-700 text-white inline-block w-1/4"
                    type="submit"
                  >
                    Post
                  </button>
                </form>
              </div>

              <div className="flex flex-col mx-4 mt-10 w-full p-4">
                {posts
                  .filter((post) => post.community === selectedCommunity)
                  .map((post, index) => (
                    <div key={index} className="">
                      <Post
                        community={post.community}
                        user={post.user}
                        text={post.text}
                        createdAt={post.createdAt}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="w-2/6 p-2 ml-4 mr-4">
            <div className="flex flex-col mt-2">
              <div className="font-semibold text-xl text-teal-900 mb-2 mt-3">
                Join a Community:
              </div>
              <div className="overflow-auto max-h-80 pr-2 rounded-lg border-2 border-teal-900 p-2">
                <div className="flex flex-wrap flex-col">
                  {communities.map((community, index) => (
                    <div
                      key={index}
                      className="py-2 my-1 px-2 flex items-center rounded-full border border-teal-900 border-solid bg-black text-white hover:bg-white hover:text-black"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
                      ></div>
                      <div className="text-base">
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
