/* eslint-disable jsx-a11y/img-redundant-alt */
import avatar from "../../assets/avatar.png";
import { useUserProfile } from "../../hooks/useUserProfile";
import Post from "../CommunityPost";
import TopBar from "../TopBar";
const Main = () => {
  const { userProfile, userInfo, isLoading } = useUserProfile();

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

  const events = [
    {
      title: "Green Earth Expo",
      date: "2021-04-22",
      Event_Type: "Online",
    },
    {
      title: "EcoTech Symposium",
      date: "2021-06-15",
      Event_Type: "Online",
    },
    {
      title: "Sustainable Living Fair",
      date: "2021-08-10",
      Event_Type: "Hybrid",
    },
    {
      title: "Global Climate Action Summit",
      date: "2021-09-30",
      Event_Type: "Hybrid",
    },
    {
      title: "Zero Waste Conference",
      date: "2021-11-05",
      Event_Type: "Physical",
    },
    {
      title: "Green Innovation Expo",
      date: "2022-02-18",
      Event_Type: "Physical",
    },
  ];

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
        <div className="fixed flex flex-row w-full">
          <div className="w-2/6 p-2 ml-4">
            <div className="">
              <div className="flex flex-col border-2 mt-6 rounded-lg border-zinc-900 h-1/3 items-center justify-center">
                <div className="overflow-hidden flex items-center justify-center h-24  w-24 p-3 mt-1">
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
                    <div className="font-medium">{userProfile.address}</div>
                  </div>
                  <div>
                    <div className="font-medium">
                      {userProfile.points_earned} Points
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col mt-2 h-2/3">
                <div className="font-semibold text-xl text-teal-900 mb-2 mt-3">
                  My Communitites:
                </div>
                <div className="overflow-auto max-h-80 pr-2 rounded-lg border-2 border-teal-900 p-2">
                  <div>
                    <div className="flex flex-wrap flex-col ">
                      {communities.map((community, index) => (
                        <div
                          key={index}
                          className=" py-1 my-1 px-2 flex items-center rounded-full border border-teal-900 border-solid bg-black text-white hover:bg-white hover:text-black"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
                          ></div>
                          <div className="text-md">
                            {community.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/6 mt-8 ml-5 pr-2 pb-36 overflow-auto max-h-screen">
            <div className="flex flex-col mx-auto">
              {posts.map((post, index) => (
                <div key={index} className="py-0">
                  <Post
                    community={post.community}
                    user={post.user}
                    text={post.text}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-2/6 p-2 mr-2 ml-5 ">
            <div className="flex flex-col mt-2">
              <div className="font-semibold text-xl text-teal-900 mb-2 mt-3">
                My Interested Events:
              </div>
              <div className="pr-2 rounded-lg border-2 border-teal-900 p-2 overflow-auto max-h-96">
                <div>
                  <div className="flex flex-wrap flex-col">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className="flex-col py-2 my-1 px-2 flex items-center justify-center rounded-lg border border-teal-900 border-solid bg-black text-white hover:bg-white hover:text-black"
                      >
                        <div className="text-lg font-bold justify-center text-center">
                          {event.title}
                        </div>
                        <div className="text-sm ml-2 justify-center text-center mb-1">
                          Date: {event.date}
                        </div>
                        <div className="bg-teal-200 text-black font-bold text-sm ml-2 px-4 py-1 mb-2 rounded-full inline-block justify-center text-center">
                          {event.Event_Type}
                        </div>
                      </div>
                    ))}
                  </div>
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
