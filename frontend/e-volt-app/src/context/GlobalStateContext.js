'use client'
import React, { createContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [elections, setElections] = useState([])
    const [candidates, setCandidates] = useState([])
    const [electionCount, setElectionCount] = useState(0)

    // useEffect(() => {
        // Load state from localStorage on initial render
        // const elections = localStorage.getItem('elections');
        // const electionCount = localStorage.getItem('elections');
        // if (elections || elections.length) {
        //     setElections(elections);
        // }
        // if (electionCount) {
        //     setElectionCount(Number(electionCount));
        // }
    //   }, []);

    return (
        <GlobalStateContext.Provider value={{elections, setElections, electionCount, setElectionCount, candidates, setCandidates}}>
            {children}
        </GlobalStateContext.Provider>
    );
}