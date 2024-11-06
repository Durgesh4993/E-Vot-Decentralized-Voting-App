"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import SuccessModal from "@/components/SuccessModal";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { CONTRACT_ABI } from "@/constants/abi";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { switchChain } from "@wagmi/core";
import { wagmiConfig } from "@/config/wagmi";
import { GlobalStateContext } from "@/context/GlobalStateContext";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const relay = new GelatoRelay();
const GELATO_API = process.env.NEXT_PUBLIC_GELATO_API_KEY;

export default function AccreditVoter() {
	const [voterAddress, setVoterAddress] = useState("");
	const [electionIdForVoter, setelectionIdForVoter] = useState("");
	const [open, setOpen] = useState(false);
	const [loading, setloading] = useState(false);
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);
	const { isConnected, chainId } = useAccount();
	const { electionCount } = useContext(GlobalStateContext);

	const handleClick = () => {
		const image = document.getElementsByClassName("uploadNIN");
		const input = document.querySelector("input[type='file']");
		input.click();
	};

	const handleGoback = () => {
		// if (isMounted) {
		router.back();
		// }
	};

	const accreditVoter = async (e) => {
		e.preventDefault();
		setloading(true);

		if (isConnected) {
			if (chainId !== baseSepolia.id) {
				try {
					await switchChain(wagmiConfig, { chainId: baseSepolia.id });
				} catch (error) {
					if (error.code === 4902) {
						try {
							await window.ethereum.request({
								method: "wallet_addEthereumChain",
								params: [
									{
										chainId: baseSepolia.id,
										chainName: "Base Sepolia",
										nativeCurrency: {
											name: "ETH",
											symbol: "ETH",
											decimals: 18,
										},
										rpcUrls: ["https://sepolia.base.org/"],
										blockExplorerUrls: ["https://sepolia-explorer.base.org/"],
									},
								],
							});
						} catch (switchError) {
							console.error("Error adding chain:", switchError);
							setloading(false);
							return toast.error(
								"Please add Base Sepolia network to your wallet"
							);
						}
					} else {
						console.error("Error switching chain:", error);
						setloading(false);
						return toast.error("Please switch to Base Sepolia network");
					}
				}
			}

			try {
				const provider = new ethers.BrowserProvider(window.ethereum);
				const signer = await provider.getSigner();
				const contract = new ethers.Contract(
					contractAddress,
					CONTRACT_ABI,
					signer
				);

				const data = await contract.accreditVoter.populateTransaction(
					electionCount ,
					voterAddress
				);

				console.log({ electionCount });

				const user = await signer.getAddress();
				const request = {
					chainId: (await provider.getNetwork()).chainId,
					target: contractAddress,
					data: data.data,
					user: user,
				};

				const relayResponse = await relay.sponsoredCallERC2771(
					request,
					provider,
					GELATO_API
				);

				function delay(ms) {
					return new Promise((resolve) => setTimeout(resolve, ms));
				}

				async function checkStatus() {
					let status = "CheckPending";

					while (
						status === "CheckPending" ||
						status === "WaitingForConfirmation"
					) {
						try {
							const response = await fetch(
								`https://api.gelato.digital/tasks/status/${relayResponse.taskId}`,
								{
									method: "GET",
									headers: {},
								}
							);
							const data = await response.json();
							status = data.task.taskState;

							await delay(5000); // Delay between status checks
						} catch (error) {
							console.error("Error fetching status:", error);
							throw new Error(
								"Failed to check status, please try again later."
							);
						}
					}

					if (status === "ExecSuccess") {
						toast.success("Voter accredited successfully");
						setOpen(true); // Open the relevant modal or section
					} else {
						throw new Error("Error accrediting voter");
					}
				}

				if (relayResponse) {
					await checkStatus();
				}
			} catch (error) {
				console.error("Error accrediting voter:", error);
				toast.error(error.message || "Error accrediting voter");
			} finally {
				setloading(false);
			}
		} else {
			setloading(false);
			return toast.error("Please connect your wallet");
		}
	};

	return (
		<main className=" flex justify-center items-start h-screen py-10">
			<div className="w-[34rem] h-[79vh] border rounded-lg p-6 py-10">
				<div className="flex flex-col justify-start items-center align-middle h-[69vh] overflow-scroll">
					<h2 className="text-xl font-bold non-italic justify-center items-center text-center pb-2 text-wrap form-item">
						Accredit Voter
					</h2>
					<p className="font-normal text-slate-400 text-center form-item">
						Fill the input fields below.
					</p>
					<form className="mt-10">
						<div className=" form-item">
							<label htmlFor="" className="block pb-1.5 font-medium">
								Voter Address
							</label>
							<input
								type="text"
								placeholder="Input voter address"
								id="address"
								value={voterAddress}
								onChange={(e) => setVoterAddress(e.target.value)}
								className="pt- w-[28rem] pl-5 h-[2.8rem] border-[#8F96A1] border rounded-md"
							/>
						</div>

						<div className="flex space-x-4 pt-5 ml-2 form-item">
							<button
								onClick={handleGoback}
								className="border-[#8F95B1] border text-black w-[12.9rem] h-[2.6rem] rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
							>
								Cancel
							</button>
							<button
								onClick={accreditVoter}
								className="bg-[#5773fb] text-white w-[12.9rem] h-[2.6rem] rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 flex items-center justify-center"
							>
								{loading ? (
									<div
										className="animate-spin h-[30px] rounded-full border-[#fff] border-4 border-b-[#000000] w-[30px] mr-3"
										viewBox="0 0 24 24"
									></div>
								) : (
									<span>Proceed</span>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* voting time */}
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				className="relative z-10"
			>
				<SuccessModal
					btnText="See All Elections"
					successMsg="Congratulations! You have successfully accredited a voter to vote in a transparent election"
					routePath="/elections"
				/>
			</Dialog>
		</main>
	);
}
