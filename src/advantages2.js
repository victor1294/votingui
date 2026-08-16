"use strict";
const candidates = [
    'Augustine',
    'Kosisochukwu'
];
const candidate = candidates[0];
const voters = [
    'Stephanie',
    'Rita',
    'James',
    'Peter',
    'Victor',
    'Anthony',
    'Charles',
    'Augustine',
    'Lillian',
    'Gabriel',
    'Christopher',
    'Kosisochukwu',
    'Bonaventure',
    'Abigail',
    'David',
    'Amarachi',
    'Loveth',
    'Chidimma',
    'Ifeanyi',
    'Majesty',
];
let voteCount = 0;
const poll = {
    Augustine: 0,
    Kosisochukwu: 0
};
const result = {};
const getResult = () => {
    return result;
};
const getWinner = () => {
    return result.winner;
};
const checkResult = (candidate) => {
    return result.poll?.[candidate];
};
// ==========================================
// VOTERS WHO HAVE ALREADY VOTED
// ==========================================
const votedVoters = [];
// ==========================================
// VOTE
// ==========================================
const vote = (voter, selectedCandidate) => {
    console.log(`${voter} voted for ${selectedCandidate}`);
    if (!result.poll) {
        result.poll = {
            Augustine: 0,
            Kosisochukwu: 0
        };
    }
    result.poll[selectedCandidate] =
        (result.poll[selectedCandidate] ?? 0) + 1;
    result.total =
        (result.total ?? 0) + 1;
    votedVoters.push(voter);
    console.log(result);
};
// ==========================================
// ELECTION
// ==========================================
const election = () => {
    const augustineVotes = result.poll?.Augustine ?? 0;
    const kosiVotes = result.poll?.Kosisochukwu ?? 0;
    if (augustineVotes > kosiVotes) {
        result.winner = 'Augustine';
    }
    else if (kosiVotes > augustineVotes) {
        result.winner = 'Kosisochukwu';
    }
    else {
        result.winner = undefined;
    }
};
// ==========================================
// DOM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // ELEMENTS
    // ========================================
    const voteButton = document.getElementById('cast-vote');
    const voterElement = document.getElementById('voter');
    const candidateElement = document.getElementById('candidate');
    const candidate1 = document.getElementById('candidate1');
    const candidate2 = document.getElementById('candidate2');
    const totalVotesElement = document.getElementById('total-votes');
    const barAugustine = document.getElementById('bar-augustine');
    const barKosi = document.getElementById('bar-kosisochukwu');
    const checkResultButton = document.getElementById('check-result-button');
    const resultDialog = document.getElementById('result-dialog');
    const resultTitle = document.getElementById('result-dialog-title');
    const checkResultElement = document.getElementById('check-result');
    const closeResultButton = document.getElementById('close-result');
    console.log('Voting system loaded');
    // ========================================
    // CAST VOTE
    // ========================================
    voteButton?.addEventListener('click', () => {
        const selectedVoter = voterElement.value;
        const selectedCandidate = candidateElement.value;
        // ====================================
        // VALIDATION
        // ====================================
        if (!selectedVoter) {
            alert('Please select a voter.');
            return;
        }
        if (!selectedCandidate) {
            alert('Please select a candidate.');
            return;
        }
        if (!voters.includes(selectedVoter)) {
            alert('Invalid voter.');
            return;
        }
        if (!candidates.includes(selectedCandidate)) {
            alert('Invalid candidate.');
            return;
        }
        // ====================================
        // PREVENT DOUBLE VOTING
        // ====================================
        if (votedVoters.includes(selectedVoter)) {
            alert(`${selectedVoter} has already voted.`);
            return;
        }
        // ====================================
        // CAST VOTE
        // ====================================
        vote(selectedVoter, selectedCandidate);
        // ====================================
        // UPDATE WINNER
        // ====================================
        election();
        // ====================================
        // GET VOTES
        // ====================================
        const augustineVotes = result.poll?.Augustine ?? 0;
        const kosiVotes = result.poll?.Kosisochukwu ?? 0;
        const total = result.total ?? 0;
        // ====================================
        // UPDATE CANDIDATE CARDS
        // ====================================
        if (candidate1) {
            candidate1.innerText =
                `Augustine: ${augustineVotes}`;
        }
        if (candidate2) {
            candidate2.innerText =
                `Kosisochukwu: ${kosiVotes}`;
        }
        // ====================================
        // UPDATE TOTAL
        // ====================================
        if (totalVotesElement) {
            totalVotesElement.innerText =
                `${total} / ${voters.length} votes cast`;
        }
        // ====================================
        // PERCENTAGES
        // ====================================
        const augustinePct = total > 0
            ? (augustineVotes / total) * 100
            : 0;
        const kosiPct = total > 0
            ? (kosiVotes / total) * 100
            : 0;
        // ====================================
        // UPDATE BARS
        // ====================================
        if (barAugustine) {
            barAugustine.style.width =
                `${augustinePct}%`;
        }
        if (barKosi) {
            barKosi.style.width =
                `${kosiPct}%`;
        }
        // ====================================
        // REMOVE VOTER FROM SELECT
        // ====================================
        const selectedOption = voterElement.querySelector(`option[value="${selectedVoter}"]`);
        if (selectedOption) {
            selectedOption.remove();
        }
        // ====================================
        // RESET SELECTS
        // ====================================
        voterElement.value = '';
        candidateElement.value = '';
        console.log('Current result:', result);
    });
    // ========================================
    // CHECK RESULT
    // ========================================
    checkResultButton?.addEventListener('click', () => {
        console.log('Check Result clicked');
        const total = result.total ?? 0;
        const augustineVotes = result.poll?.Augustine ?? 0;
        const kosiVotes = result.poll?.Kosisochukwu ?? 0;
        // ====================================
        // NO VOTES
        // ====================================
        if (total === 0) {
            if (resultTitle) {
                resultTitle.innerText =
                    'Election Result';
            }
            if (checkResultElement) {
                checkResultElement.innerText =
                    'No votes have been cast yet.';
            }
        }
        // ====================================
        // NOT ALL VOTES CAST
        // ====================================
        else if (total < voters.length) {
            const remaining = voters.length - total;
            if (resultTitle) {
                resultTitle.innerText =
                    'Current Standing';
            }
            if (checkResultElement) {
                if (augustineVotes >
                    kosiVotes) {
                    checkResultElement.innerText =
                        `${total} of ${voters.length} votes have been cast.\n\n` +
                            `${remaining} vote(s) remaining.\n\n` +
                            `Augustine is currently leading with ` +
                            `${augustineVotes} votes.`;
                }
                else if (kosiVotes >
                    augustineVotes) {
                    checkResultElement.innerText =
                        `${total} of ${voters.length} votes have been cast.\n\n` +
                            `${remaining} vote(s) remaining.\n\n` +
                            `Kosisochukwu is currently leading with ` +
                            `${kosiVotes} votes.`;
                }
                else {
                    checkResultElement.innerText =
                        `${total} of ${voters.length} votes have been cast.\n\n` +
                            `${remaining} vote(s) remaining.\n\n` +
                            `The candidates are currently tied.`;
                }
            }
        }
        // ====================================
        // ALL VOTES CAST
        // ====================================
        else {
            election();
            // ==================================
            // TIE
            // ==================================
            if (augustineVotes ===
                kosiVotes) {
                if (resultTitle) {
                    resultTitle.innerText =
                        'Election Result';
                }
                if (checkResultElement) {
                    checkResultElement.innerText =
                        `The election ended in a tie.\n\n` +
                            `Augustine: ${augustineVotes} votes\n` +
                            `Kosisochukwu: ${kosiVotes} votes`;
                }
            }
            // ==================================
            // WINNER
            // ==================================
            else {
                const winner = getWinner();
                if (winner) {
                    const winnerVotes = checkResult(winner);
                    if (resultTitle) {
                        resultTitle.innerText =
                            `🏆 Winner: ${winner}`;
                    }
                    if (checkResultElement) {
                        checkResultElement.innerText =
                            `${winner} wins the Head of House election ` +
                                `with ${winnerVotes} of ${total} votes.\n\n` +
                                `Augustine: ${augustineVotes} votes\n` +
                                `Kosisochukwu: ${kosiVotes} votes`;
                    }
                }
            }
        }
        // ====================================
        // OPEN MODAL
        // ====================================
        if (resultDialog) {
            resultDialog.classList.remove('hidden');
            resultDialog.classList.add('flex');
        }
    });
    // ========================================
    // CLOSE MODAL
    // ========================================
    closeResultButton?.addEventListener('click', () => {
        if (resultDialog) {
            resultDialog.classList.add('hidden');
            resultDialog.classList.remove('flex');
        }
    });
});
