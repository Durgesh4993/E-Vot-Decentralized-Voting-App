import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const trustedForwarder = "0xd8253782c45a12053594b9deB72d8e8aB2Fca54c"

const MultiElectionVotingModule = buildModule("MultiElectionVotingModule", (m) => {

  const election = m.contract("MultiElectionVoting", [trustedForwarder]);

  return { election };
});

export default MultiElectionVotingModule;
