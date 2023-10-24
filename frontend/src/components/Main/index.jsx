import avatar from "../../assets/avatar.png";
import { useUserProfile } from "../../hooks/useUserProfile";
import Post from "../CommunityPost";
import TopBar from "../TopBar";
const Main = () => {
  const { userProfile, userInfo, isLoading } = useUserProfile();

  const posts = [
  {
    community: "Green Earth",
    user: "Alice Smith",
    text: "Today, I took a meaningful step to protect our environment. I planted a beautiful maple tree in my backyard. 🌳 It's amazing to think about how this small action can have a significant impact on the planet. Trees not only provide oxygen but also serve as homes for countless creatures. #EcoFriendly #PlantATree #ProtectOurPlanet 🌍"
  },
  {
    community: "Clean Oceans",
    user: "John Anderson",
    text: "Spent an entire day at the beach, working hard to pick up trash and keep our oceans clean. 🌊🗑️ It's heartbreaking to see the amount of litter people leave behind, but we're making a difference, one piece of trash at a time. Let's continue our efforts to preserve the beauty of our oceans for generations to come. #BeachCleanup #CleanOceans 🐠🏝️"
  },
  {
    community: "Recycle Now",
    user: "Sarah Johnson",
    text: "I've taken a significant step towards sustainable living by starting a composting routine today! 🍂♻️ Composting not only reduces waste but also enriches the soil and helps plants grow. It's a small change with big benefits for the environment. Join me in this eco-friendly journey! #SustainableLiving #ReduceWaste 🌍"
  },
  {
    community: "Wildlife Conservation",
    user: "David Wilson",
    text: "What an incredible experience I had today! While exploring the forest, I stumbled upon a family of deer. 🦌🌲 It's moments like these that remind us of the breathtaking beauty of nature. Let's work together to protect these natural habitats and the diverse wildlife that call them home. #NatureLover #WildlifeConservation 🌿🌳"
  },
  {
    community: "Green Earth",
    user: "Emily Adams",
    text: "Today, I had the privilege of visiting a local eco-friendly farm, where I learned about sustainable agriculture practices. 🌱🚜 It's inspiring to see how these farmers are committed to preserving the land and promoting sustainable food production. Let's support such initiatives and make more informed choices about the food we consume. #Sustainability #SupportLocalFarms 🌾🥕"
  },
  {
    community: "Clean Oceans",
    user: "Michael Brown",
    text: "Another successful day at the beach cleanup event! 🏖️♻️ It's heartening to see so many people come together to protect our oceans. Every piece of trash we pick up is a step toward cleaner, healthier seas. Keep the momentum going, and let's ensure our beaches stay beautiful and free of pollution. #BeachCleanup #CleanSeas 🌞🐚"
  }
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
      <main className=" pt-20 min-h-screen min-w-screen bg-zinc-200">
        <div className="fixed flex flex-row w-full">
          <div className="w-1/4 p-3">
            <div className="">
              <div className="flex flex-col border-4 mt-3 rounded-lg border-teal-900 h-1/3 items-center justify-center">
                <div className="overflow-hidden flex items-center justify-center h-24  w-24 p-3 mt-3">
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
                    <div className="font-bold text-xl text-teal-900">
                      {userInfo.firstName} {userInfo.lastName}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{userProfile.address}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {userProfile.points_earned} Points
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col mt-3 h-2/3">
                <div className="font-bold text-xl text-teal-900 mb-3 mt-3">
                  Followed Communitites:
                </div>
                <div className="overflow-auto max-h-80 pr-2 rounded-lg border-4 border-teal-900 p-2">
                  <div>
                    <div className="flex flex-wrap mt-2 flex-col ">
                      {posts.map((post, index) => (
                        <div
                          key={index}
                          className=" py-1 my-2 px-2 flex items-center rounded-2xl border border-teal-600"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
                          ></div>
                          <div className="text-base font-medium text-gray-900">
                            {post.community}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/4 mt-2 ml-10 pr-5 pb-20 overflow-auto max-h-screen">
            <div className="flex flex-col  mx-auto">
              {posts.map((post, index) => (
                <div key={index} className="py-2">
                  <Post
                    community={post.community}
                    user={post.user}
                    text={post.text}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
