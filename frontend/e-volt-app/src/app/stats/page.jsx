import React from 'react';

export default function Stats() {
  // Sample data for candidates and their votes
  const candidates = [
    { name: "Candidate A", votes: 120, image: "/assets/candidate1.avif" },
    { name: "Candidate B", votes: 80, image: "/assets/candidate2.avif" },
    { name: "Candidate C", votes: 150, image: "/assets/candidate3.avif" },
  ];

  // Calculate the total votes for progress calculation
  const totalVotes = candidates.reduce((acc, candidate) => acc + candidate.votes, 0);

  return (
    <div className="py-10 px-20">
        <div>
            <p className="text-[32px] font-medium form-item">See who is winning</p>
            <p className="form-item">Vote for your favorite today!!!</p>
        </div>
        <div>
            {/* <h2 className="text-xl font-bold non-italic justify-center items-center text-center pb-2 mt-14 text-wrap form-item">
            Unilag Student Union Election
            </h2>
            <p className="font-normal text-slate-400 text-center form-item">
                Check the stats below
            </p> */}
            <div className="mt-16">
                {candidates.map((candidate) => (
                    <div key={candidate.name} className="flex items-center mb-4">
                        <img src={candidate.image} alt={candidate.name} className="w-16 h-16 rounded mr-4" />
                        <div className="flex-1">
                            <div className="relative h-6 bg-gray-200 rounded border border-gray-400">
                                <div 
                                    className="bg-[#9855fc] h-full rounded" 
                                    style={{ width: `${(candidate.votes / totalVotes) * 100}%` }} 
                                ></div>
                            </div>
                        </div>
                        <span className="ml-2">{candidate.votes} votes</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
