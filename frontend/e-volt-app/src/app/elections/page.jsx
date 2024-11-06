"use client";
import { useRouter } from "next/navigation";
import { CONTRACT_ABI } from "@/constants/abi";
import { useCallback, useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import useWalletConnection from "@/hooks/useWalletConnection";
import { GlobalStateContext } from "@/context/GlobalStateContext";
import { useGetAllElections } from "@/hooks/useGetAllElections";

const multicallAbi = [
	"function tryAggregate(bool requireSuccess, (address target, bytes callData)[] calls) returns ((bool success, bytes returnData)[] returnData)",
];

export default function Elections() {
	const router = useRouter();
	const [loading, setLoading] = useState(null);
	const { elections, setElections, setElectionCount } =
		useContext(GlobalStateContext);
	const { isConnected, isReady } = useWalletConnection();
	const { getAllElections } = useGetAllElections();

	const handleRoute = (e, index) => {
		e.preventDefault();
		// const electionId = index + 1
		setElectionCount(index);
		localStorage.setItem("electionCount", Number(index));
		router.push("/election-details");
	};

	const handleAddCandidate = (e, index) => {
		e.preventDefault();
		// const electionId = index + 1
		setElectionCount(index);
		localStorage.setItem("electionCount", Number(index));
		router.push("/addCandidate");
	};

	const handleAccredit = (e, index) => {
		e.preventDefault();
		// const electionId = index + 1
		setElectionCount(index);
		localStorage.setItem("electionCount", Number(index));
		router.push("/accreditVoter");
	};
	// const fetchElections = useCallback(async () => {
	// 	if (!isReady || !isConnected) return;
	// 	try {
	// 		setLoading(true);
	// 		const provider = new ethers.JsonRpcProvider(
	// 			process.env.NEXT_PUBLIC_RPC_URL
	// 		);
	// 		const contract = new ethers.Contract(
	// 			process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
	// 			CONTRACT_ABI,
	// 			provider
	// 		);
	// const electionCountResult = await contract.electionCount();
	// if (!electionCountResult) return;
	// const electionCounts = Array.from({ length: Number(electionCountResult) - 1 }, (_, i) => i + 1);
	// const electionsData = await Promise.all(electionCounts.map(async (count) => {
	//     const election = await contract.elections(count);
	//     return {...election};
	// }));
	// console.log("datatta", electionsData)

	// 		setElections(electionsData);
	// 		localStorage.setItem("elections", electionsData);
	// 	} catch (error) {
	// 		console.error("Error fetching elections:", error);
	// 		toast.error("Error fetching elections");
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }, [isReady, isConnected]);

	useEffect(() => {
		if (isReady && isConnected) {
			setLoading(true);
			const getElectionsData = async () => {
				const electionsData = await getAllElections();
				setElections(electionsData);
				setLoading(false);
			};
			getElectionsData();
		}
	}, [isReady, isConnected]);

	return (
		<div className="py-10 px-20">
			<div>
				<p className="text-[32px] font-medium form-item">Live Elections</p>
				<p className=" form-item">Vote to make your voice heard</p>
			</div>
			{loading || !isReady ? (
				<div className="shadow-made rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[45%] form-item">
					<p className="text-[24px] font-medium form-item">Loading...</p>
				</div>
			) : (
				<div className="flex flex-col sm:flex-row flex-wrap justify-between items-center border rounded-lg p-10 gap-14 mt-10 form-item">
					{elections?.map((election, index) => (
						<div
							key={index}
							className="shadow-md rounded-lg flex flex-col justify-center items-center py-12 px-16 text-center basis-[45%] form-item"
						>
							<p className="text-[34px] font-medium form-item">
								{election?.title}
							</p>
							<p className="text-md font-normal text-[#8F96A1] form-item">
								Election running from -{" "}
								{new Date(Number(election.startDate) * 1000).toLocaleDateString(
									"en-US",
									{ weekday: "long", month: "long", day: "numeric" }
								)}{" "}
								to{" "}
								{new Date(Number(election.endDate) * 1000).toLocaleDateString(
									"en-US",
									{ weekday: "long", month: "long", day: "numeric" }
								)}
							</p>

							<div className="flex items-center justify-center gap-6 flex-wrap mt-10">
								<button
									className="space-x-4 bg-[#5773fb] text-white rounded-lg w-[9rem] h-[3rem] mt-6 form-item transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
									onClick={(e) => handleRoute(e, index)}
								>
									Click To View
								</button>
								<button
									className="space-x-4 bg-[#5773fb] text-white rounded-lg w-[9rem] h-[3rem] mt-6 form-item transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
									onClick={(e) => handleAddCandidate(e, index)}
								>
									Add Candidate
								</button>
								<button
									className="space-x-4 bg-[#5773fb] text-white rounded-lg w-[9rem] h-[3rem] mt-6 form-item transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
									onClick={(e) => handleAccredit(e, index)}
								>
									Accredit Voter
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
