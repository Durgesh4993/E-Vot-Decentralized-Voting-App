import { readContract } from "@wagmi/core";
import { wagmiConfig } from "@/config/wagmi";
import { multicall } from "@wagmi/core";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { CONTRACT_ABI } from "@/constants/abi";

const CORRECT_CHAIN_ID = 84532;

export function useGetAllElections() {
	const { address } = useAccount();

	const getElctionCount = async () => {
		try {
			const result = await readContract(wagmiConfig, {
				abi: CONTRACT_ABI,
				address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
				functionName: "electionCount",
				args: [],
				chainId: CORRECT_CHAIN_ID,
			});
			console.log({ result });
			return result;
		} catch (error) {
			toast.error(`Error fetching election count: ${error}`);
		}
	};

	const getAllElections = async () => {
		const electionCount = await getElctionCount();
		const electionIds = Array.from(
			{ length: Number(electionCount) },
			(_, i) => Number(i)
		);
		if (electionIds.length > 0) {
			const contractsData = electionIds.map((id) => ({
				address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
				abi: CONTRACT_ABI,
				functionName: "getElectionDetails",
				args: [id],
			}));

			const elections = await multicall(wagmiConfig, {
				contracts: contractsData,
			});

			const electionData = elections.map((election, index) => ({
				electionId: electionIds[index],
				title: election?.result?.[0],
				startDate: election?.result?.[1],
				endDate: election?.result?.[2],
				candidateCount: election?.[3] ?? 0,
				// result: election?.result,
			}));

			console.log({ electionData });

			return electionData;
		}
		return [];
	};



	// const getCarDetail = async (tokenId) => {
	// 	if (tokenId >= 0) {
	// 		const uri = await readContract(wagmiConfig, {
	// 			address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
	// 			abi: CONTRACT_ABI,
	// 			functionName: "tokenURI",
	// 			args: [tokenId],
	// 		});

	// 		let carData;
	// 		try {
	// 			const response = await axios.get(uri);
	// 			const data = response.data;
	// 			carData = formatCarData(tokenId, data);
	// 			return carData;
	// 		} catch (error) {
	// 			console.error("Error fetching metadata:", error);
	// 			return null;
	// 		}
	// 	}
	// 	return [];
	// };

	return { getElctionCount, getAllElections };
}
