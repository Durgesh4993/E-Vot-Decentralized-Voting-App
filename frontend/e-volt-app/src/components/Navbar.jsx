"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ConnectButton } from "@/providers/ConnectButton";

// const projectId = "a6a91196516cd2b211e9d6bebf8a5c13";

export default function Onboard() {
	const router = useRouter();

	return (
		<header >
			<nav className="flex h-[10vh] z-50 justify-around items-center fixed top-0 right-0 min-w-[100vw] bg-[#ffffff] border-b-2">
				<div className="logo mr-[-10px]">
					<Link href="/">
						<img src="/assets/Logo.png" alt="logo" />
					</Link>
				</div>

				<div className="flex ml-20">
					<ul className="flex gap-16">
						<li
							id="dashboard"
						>
							<Link className={`px-2 text-[#8F96A1] font-medium hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] ${
								router.pathname === "/" ? "active" : ""
							}`} href="/">
								Home
							</Link>
						</li>
						<li
							id="elections"
						>
							<Link className={`px-2 text-[#8F96A1] font-medium hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] ${
								router.pathname === "/" ? "active" : ""
							}`} href="/elections">
								All Elections
							</Link>
						</li>
						{/* <li className="px-8 font-medium">
                    <Link hre className=""f="/kyc">KYC</Link>
                </li> */}
						<li
							id="addElection"
						>
							<Link className={`px-2 text-[#8F96A1] font-medium hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] ${
								router.pathname === "/" ? "active" : ""
							}`} href="/addElection">
								Create Election
							</Link>
						</li>
						<li
							id="addElection"
						>
							<Link className={`px-2 text-[#8F96A1] font-medium hover:border-b-2 hover:border-[#5773fb] hover:text-[#5773fb] ${
								router.pathname === "/" ? "active" : ""
							}`} href="/votinghistory">
								Voting History
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<ConnectButton />
					{/* <w3m-button /> */}
				</div>
			</nav>
		</header>
	);
}
