import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import { OnchainProviders } from "../providers/OnchainProviders";
import Script from "next/script";
import { FaceTecProvider } from "@/facetec/context/FacetecContext";
import { GlobalStateProvider } from "@/context/GlobalStateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "E-vot",
	description: "A decentralized voting platform",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<Script
					src="/core-sdk/FaceTecSDK.js/FaceTecSDK.js"
					strategy="beforeInteractive"
				/>
			</head>
			<body className={inter.className}>
				<div className="flex flex-col min-h-screen">
					<OnchainProviders>
						<div className="mb-[10vh]">
							<Navbar />
						</div>
						<ToastContainer />

						<GlobalStateProvider>
							<FaceTecProvider>
								<div className="overflow-scroll pt-[1vh] flex-grow pb-6">
									{children}
								</div>
							</FaceTecProvider>
						</GlobalStateProvider>
						<Footer />
					</OnchainProviders>
				</div>
			</body>
		</html>
	);
}
