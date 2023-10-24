import TopBar from "../TopBar";
import { useUserProfile } from "../../hooks/useUserProfile";
import avatar from '../../assets/avatar.png';
import Post from '../CommunityPost';
const Main = () => {
	const { userProfile, userInfo, isLoading } = useUserProfile();
	
	const posts = [
		{
		  community: "Green Earth",
		  user: "EcoWarrior123",
		  text: "Just planted a tree in my backyard! 🌳 #EcoFriendly #PlantATree"
		},
		{
			community: "Clean Oceans",
		user: "OceanLover22",
		  text: "Spent the day picking up trash at the beach. Let's keep our oceans clean! 🌊🗑️ #BeachCleanup"
		},
		{
			community: "Recycle Now",
			user: "EcoActivist99",
		  text: "Reducing waste one step at a time. Started composting today! 🍂♻️ #SustainableLiving"
		},
		{
			community: "Wildlife Conservation",
			user: "WildlifeExplorer",
		  text: "Saw a family of deer in the forest today. Nature is truly beautiful. 🦌🌲 #NatureLover"
		},
		{
			community: "Green Earth",
			user: "EcoActivist123",
			text: "Visited a local eco-friendly farm and learned about sustainable agriculture. 🌱🚜 #Sustainability"
		  },
		  {
			community: "Clean Oceans",
			user: "OceanLover42",
			text: "Participated in a beach cleanup today. Let's protect our oceans! 🏖️♻️ #BeachCleanup"
		  },
	  ];
	  

    const getRandomColor = () => {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500'];
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
							<div className="flex flex-col border-2 mt-3 rounded-lg border-zinc-900 h-1/3 items-center justify-center">					
								<div className="overflow-hidden flex items-center justify-center h-24  w-24 p-3 mt-3">
											{userProfile.profileImage ? (
												<img
													src={`http://localhost:8080/api/uploads/${userProfile.profileImage}`}
													alt="Profile Picture"
													className=""
												/>
											) : (
												<img
													src={avatar}
													alt="Default Image"
													className=""
												/>
											)}
								</div>
								<div className="flex flex-col p-2 items-center justify-center">
									<div className="">
										<div className="font-medium text-teal-600">John Doe</div>
									</div>
									<div>
										<div className="font-medium">Dhaka, Bangladesh</div>
									</div>
									<div>
										<div className="font-medium">30 Points</div>
									</div>
									
								</div>
							</div>

							<div className=" flex flex-col mt-2 h-2/3">
								<div className="font-semibold text-xl text-teal-600 mb-3">Followed Communitites:</div>
								<div className="overflow-auto max-h-80 pr-2 rounded-lg border-2 border-zinc-900 p-2" >
									<div>
										<div className="flex flex-wrap mt-2 flex-col ">
											{posts.map((post, index) => (
												<div key={index} className=" py-1 my-2 px-2 flex items-center rounded-2xl border border-teal-600">
													<div className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}></div>
													<div className="text-base text-gray-600">{post.community}</div>
												</div>
												))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-3/4 mt-5 ml-10 pr-5 overflow-auto max-h-screen">
						<div className="flex flex-col  mx-auto">
							{posts.map((post, index) =>(
								
								<div key={index} className="py-5">
									
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