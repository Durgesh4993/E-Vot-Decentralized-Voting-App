"use client";
import VotingModal from "@/components/VotingModal";
import SuccessModal from "@/components/SuccessModal";
import { useState, useContext, useEffect, useCallback } from "react";
import { CONTRACT_ABI } from "@/constants/abi";
import { Dialog } from "@headlessui/react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import useWalletConnection from "@/hooks/useWalletConnection";
import { GlobalStateContext } from "@/context/GlobalStateContext";

export default function ElectionDetails() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(null);
	const [setOpenVote] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);
	const { electionCount } = useContext(GlobalStateContext);

	const [currentElection, setcurrentElection] = useState(null);
	const { isConnected, isReady } = useWalletConnection();
	const [votedata, setVoteData] = useState(null);
	const flexedData = [
		{
			img: "./assets/candidate8.avif",
			post: "President",
			election_id: 1,
			title: "Afolabi Mayowa",
			desc: "The voice of democracy",
		},
		{
			img: "./assets/candidate2.avif",
			post: "President",
			election_id: 1,
			title: "Ahmad Sulaiman",
			desc: "A vibrant and ever efficient changemaker.",
		},
		{
			img: "./assets/candidate3.avif",
			post: "President",
			election_id: 1,
			title: "Amaka Ugwu",
			desc: "The people's choice",
		},
	];
	const flexedData2 = [
		{
			img: "./assets/candidate9.avif",
			post: "Vice President",
			election_id: 0,
			title: "Jeniffer Bright",
			desc: "Voice of the people",
		},
		{
			img: "./assets/candidate5.avif",
			post: "Vice President",
			election_id: 0,
			title: "Adam Nwakwo",
			desc: "A vote for me is a vote for prosperity",
		},
		{
			img: "./assets/candidate10.avif",
			post: "Vice President",
			election_id: 0,
			title: "Victoria Davis",
			desc: "A woman of her words",
		},
	];
	const handleSetOpen = (data) => {
		setOpen(true);
		setVoteData(data);
	};
	const handleVote = (data) => {
		setOpenVote(true);
		setVoteData(data);
	};

	console.log({
		electionCount,
	});

	const fetchCandidates = useCallback(async () => {
		if (!isReady || !isConnected) return;
		try {
			setLoading(true);
			const provider = new ethers.JsonRpcProvider(
				process.env.NEXT_PUBLIC_RPC_URL
			);
			const contract = new ethers.Contract(
				process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
				CONTRACT_ABI,
				provider
			);
			const [title, startDateBigInt, endDateBigInt, candidateCountBigInt] =
				await contract.getElectionDetails(electionCount+1);

			// Convert BigInt to string or number
			const startDate = Number(startDateBigInt);
			const endDate = Number(endDateBigInt);
			const candidateCount = Number(candidateCountBigInt);
			// const candidateResult = await contract.getCandidates(electionCount);
			const [candidateIds, names, voteCounts] = await contract.getCandidates(
				electionCount
			);
			if (!candidateIds) return;
			console.log("candidates", candidateIds, names, voteCounts);
			const electionCandidates = candidateIds.map((id, index) => ({
				id: id.toString(), // Convert BigInt to string
				name: names[index],
				voteCount: Number(voteCounts[index]),
			}));

			console.log("candidates", electionCandidates);
			const electionData = {
				title,
				startDate: new Date(startDate * 1000).toLocaleDateString(), // Convert UNIX timestamp to date string
				endDate: new Date(endDate * 1000).toLocaleDateString(), // Convert UNIX timestamp to date string
				candidateCount,
				candidates: electionCandidates,
			};
			console.log({ electionData });
			setcurrentElection(electionData);
			// const candidateData = [...candidateResult].map((data) => {
			// 	return { ...data };
			// });
			// console.log("candidatesData", candidateData);
			// setCandidates(candidateData);
			// localStorage.setItem("candidates", candidateData);
		} catch (error) {
			console.error("Error fetching candidates:", error);
			toast.error("Error fetching candidates");
		} finally {
			setLoading(false);
		}
	}, [isReady, isConnected]);

	useEffect(() => {
		if (isReady && isConnected) {
			fetchCandidates();
		}
	}, [isReady, isConnected, fetchCandidates]);
	return (
		<div className="py-10 px-20">
			<div className="text-right form-item">
				<p className="text-[32px] font-medium form-item">
					{currentElection?.title}
				</p>
				<p className=" form-item">
					Election runs from -{" "}
					{currentElection ? currentElection?.startDate : ""} to{" "}
					{currentElection ? currentElection?.endDate : ""}
				</p>
			</div>
			<div className="flex flex-col flex-wrap justify-between items-left border rounded-lg p-10 gap-14 mt-10 form-item">
				<div className="text-left form-item">
					<p className="text-[28px] font-medium form-item">
						{currentElection?.title}
					</p>
					{/* <p className=" form-item">Persons contesting for this post:</p> */}
				</div>
				<div className="flexed-ctn flex flex-col items-center sm:items-center sm:flex-row sm:gap-2 md:gap-10 gap-0 justify-center ml-auto lg:pl-4 w-full form-item">
					{currentElection?.candidates?.length ? (
						currentElection?.candidates?.map((data, index) => (
							<div
								key={index}
								className={`group sm:basis-[30%] basis-full min-h-auto bg-[rgb(35,38,39,0.2)] overflow-hidden rounded-l cursor-pointer transition ease-in-out lg:w-auto flex flex-col items-center justify-center `}
							>
								<div className="stars-ctn flex items-center gap-6 justify-center mb-4 md:my-4 px-6">
									<div
										className={`my-4 md:my-1 px-2 text-[32px] md:text-[22px] text-[#000] font-[NuelisAlt]`}
									>
										{data.name}
									</div>
								</div>
								{/* <div className="w-auto">
								<p className="gradient-text text-[20px] md:text-[46px]-small md:px-6 font-[NuelisAlt]">
									{data.title}
								</p>
								<p className="text-[15px] md:text-[15px] font-light pb-8 md:px-6 font-[NuelisAlt]">
									{data.desc}
								</p>
							</div> */}
								<button
									onClick={() => handleSetOpen(data)}
									className="space-x-4 mx-6 mb-6 bg-[#5773fb] text-white rounded-lg w-[9rem] h-[2.5rem] transition ease-in-out delay-150 group-hover:-translate-y-1 group-hover:scale-110 duration-300"
								>
									Vote
								</button>
							</div>
						))
					) : (
						<div>
							<p className="text-[28px] font-medium form-item">
								No candidates yet
							</p>
						</div>
					)}
				</div>
			</div>
			{/* <div className="flex flex-col flex-wrap justify-between items-left border rounded-lg p-10 gap-14 mt-10 form-item">
				<div className="text-left form-item">
					<p className="text-[28px] font-medium">VICE PRESIDENT</p>
					<p>Persons contesting for this post:</p>
				</div>
				<div className="flexed-ctn flex flex-col items-center sm:items-start sm:flex-row sm:gap-2 md:gap-10 gap-0 justify-center ml-auto lg:pl-4 w-full">
					{flexedData2.map((data, index) => (
						<div
							key={index}
							className={`group sm:basis-[30%] basis-full min-h-[40vh] bg-[rgb(35,38,39,0.2)] overflow-hidden rounded-l cursor-pointer transition ease-in-out lg:w-auto`}
						>
							<div
								className="img-div min-h-[40vh] md:h-[30vh] transition ease-in-out duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-105 bg-contain bg-center sm:bg-cover"
								style={{
									backgroundImage: `url(${data.img})`,
									backgroundRepeat: "no-repeat",
								}}
							></div>
							<div className="stars-ctn flex items-center gap-6 justify-start mb-4 md:my-4 px-6">
								<div
									className={`bg-[#01637E20] my-4 md:my-1 px-2 text-[12px] md:text-[12px] text-[#000] font-[NuelisAlt]`}
								>
									{data.post}
								</div>
							</div>
							<div className="w-auto">
								<p className="gradient-text text-[20px] md:text-[46px]-small md:px-6 font-[NuelisAlt]">
									{data.title}
								</p>
								<p className="text-[15px] md:text-[15px] font-light pb-8 md:px-6 font-[NuelisAlt]">
									{data.desc}
								</p>
							</div>
							<button
								onClick={() => handleSetOpen(data)}
								className="space-x-4 mx-6 mb-6 bg-[#5773fb] text-white rounded-lg w-[9rem] h-[2.5rem] transition ease-in-out delay-150 group-hover:-translate-y-1 group-hover:scale-110 duration-300"
							>
								Vote
							</button>
						</div>
					))}
				</div>
			</div> */}

			{/* modal */}
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				className="relative z-10"
			>
				<VotingModal
					onCloseModal={() => setOpen(false)}
					emitVoteSuccess={() => setOpenSuccess(true)}
					info={votedata}
					emitVote={handleVote}
				/>
			</Dialog>
			<Dialog
				open={openSuccess}
				onClose={() => setOpenSuccess(false)}
				className="relative z-10"
			>
				<SuccessModal
					btnText="See Live Elections"
					successMsg="Congratulations! You have successfully voted for your chosen candidate. Be rest assured that your vote counts."
					routePath="/elections"
				/>
			</Dialog>
		</div>
	);
}
