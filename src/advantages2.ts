type PTypes = string | number | number[] | boolean;

type TCandidate = 'Augustine' | 'Kosisochukwu';

const candidates: TCandidate[] = [
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
] as const;


type Mate = {
  name: string;
  age: number;
};


type TVoters = typeof voters[number];


let voteCount: number = 0;


type TPoll = Record<TCandidate, number>;


const poll: TPoll = {
  Augustine: 0,
  Kosisochukwu: 0
};


interface Result {
  total: number;
  winner: TCandidate;
  poll: TPoll;
}


const result: Partial<Result> = {};


const getResult = (): Partial<Result> => {

  return result;

};


const getWinner = (): TCandidate | undefined => {

  return result.winner;

};


const checkResult = (
  candidate: TCandidate
): number | undefined => {

  return result.poll?.[candidate];

};




const votedVoters: TVoters[] = [];




const vote = (
  voter: TVoters,
  selectedCandidate: TCandidate
) => {

  console.log(
    `${voter} voted for ${selectedCandidate}`
  );


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




const election = () => {

  const augustineVotes =
    result.poll?.Augustine ?? 0;


  const kosiVotes =
    result.poll?.Kosisochukwu ?? 0;


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




document.addEventListener(
  'DOMContentLoaded',
  () => {


   

    const voteButton =
      document.getElementById('cast-vote');


    const voterElement =
      document.getElementById(
        'voter'
      ) as HTMLSelectElement;


    const candidateElement =
      document.getElementById(
        'candidate'
      ) as HTMLSelectElement;


    const candidate1 =
      document.getElementById(
        'candidate1'
      );


    const candidate2 =
      document.getElementById(
        'candidate2'
      );


    const totalVotesElement =
      document.getElementById(
        'total-votes'
      );


    const barAugustine =
      document.getElementById(
        'bar-augustine'
      );


    const barKosi =
      document.getElementById(
        'bar-kosisochukwu'
      );


    const checkResultButton =
      document.getElementById(
        'check-result-button'
      );


    const resultDialog =
      document.getElementById(
        'result-dialog'
      );


    const resultTitle =
      document.getElementById(
        'result-dialog-title'
      );


    const checkResultElement =
      document.getElementById(
        'check-result'
      );


    const closeResultButton =
      document.getElementById(
        'close-result'
      );


    console.log(
      'Voting system loaded'
    );


    

    voteButton?.addEventListener(
      'click',
      () => {


        const selectedVoter =
          voterElement.value as TVoters;


        const selectedCandidate =
          candidateElement.value as TCandidate;


 

        if (!selectedVoter) {

          alert(
            'Please select a voter.'
          );

          return;

        }


        if (!selectedCandidate) {

          alert(
            'Please select a candidate.'
          );

          return;

        }


        if (
          !voters.includes(
            selectedVoter
          )
        ) {

          alert(
            'Invalid voter.'
          );

          return;

        }


        if (
          !candidates.includes(
            selectedCandidate
          )
        ) {

          alert(
            'Invalid candidate.'
          );

          return;

        }


       

        if (
          votedVoters.includes(
            selectedVoter
          )
        ) {

          alert(
            `${selectedVoter} has already voted.`
          );

          return;

        }


     

        vote(
          selectedVoter,
          selectedCandidate
        );


      

        election();


    

        const augustineVotes =
          result.poll?.Augustine ?? 0;


        const kosiVotes =
          result.poll?.Kosisochukwu ?? 0;


        const total =
          result.total ?? 0;


    

        if (candidate1) {

          candidate1.innerText =
            `Augustine: ${augustineVotes}`;

        }


        if (candidate2) {

          candidate2.innerText =
            `Kosisochukwu: ${kosiVotes}`;

        }


      

        if (totalVotesElement) {

          totalVotesElement.innerText =
            `${total} / ${voters.length} votes cast`;

        }


  

        const augustinePct =
          total > 0
            ? (augustineVotes / total) * 100
            : 0;


        const kosiPct =
          total > 0
            ? (kosiVotes / total) * 100
            : 0;


     

        if (barAugustine) {

          barAugustine.style.width =
            `${augustinePct}%`;

        }


        if (barKosi) {

          barKosi.style.width =
            `${kosiPct}%`;

        }




        const selectedOption =
          voterElement.querySelector(
            `option[value="${selectedVoter}"]`
          );


        if (selectedOption) {

          selectedOption.remove();

        }



        voterElement.value = '';

        candidateElement.value = '';


        console.log(
          'Current result:',
          result
        );

      }
    );




    checkResultButton?.addEventListener(
      'click',
      () => {

        console.log(
          'Check Result clicked'
        );


        const total =
          result.total ?? 0;


        const augustineVotes =
          result.poll?.Augustine ?? 0;


        const kosiVotes =
          result.poll?.Kosisochukwu ?? 0;




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




        else if (
          total < voters.length
        ) {

          const remaining =
            voters.length - total;


          if (resultTitle) {

            resultTitle.innerText =
              'Current Standing';

          }


          if (checkResultElement) {

            if (
              augustineVotes >
              kosiVotes
            ) {

              checkResultElement.innerText =
                `${total} of ${voters.length} votes have been cast.\n\n` +
                `${remaining} vote(s) remaining.\n\n` +
                `Augustine is currently leading with ` +
                `${augustineVotes} votes.`;

            }

            else if (
              kosiVotes >
              augustineVotes
            ) {

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




        else {

          election();




          if (
            augustineVotes ===
            kosiVotes
          ) {

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




          else {

            const winner =
              getWinner();


            if (winner) {

              const winnerVotes =
                checkResult(
                  winner
                );


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




        if (resultDialog) {

          resultDialog.classList.remove(
            'hidden'
          );

          resultDialog.classList.add(
            'flex'
          );

        }

      }
    );




    closeResultButton?.addEventListener(
      'click',
      () => {

        if (resultDialog) {

          resultDialog.classList.add(
            'hidden'
          );

          resultDialog.classList.remove(
            'flex'
          );

        }

      }
    );

  }
);