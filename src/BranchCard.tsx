import { BranchState, getRepoKanbanStore } from "./store";

export interface BranchCardProps {
  repoUrl: string;
  branch: BranchState
}

export const BranchCard: React.FC<BranchCardProps> = ({ repoUrl, branch: {name, column} }) => {

  const useKanbanStore = getRepoKanbanStore(repoUrl);
  const { reviewBranch, reworkBranch, approveBranch, reReviewBranch } = useKanbanStore(state => ({
    reviewBranch: state.reviewBranch,
    reworkBranch: state.reworkBranch,
    approveBranch: state.approveBranch,
    reReviewBranch: state.reReviewBranch,
  }));

  const clickRightArrow = () => {
    if (column === "InProgress") {
      reviewBranch(name);
    } else if (column === "Review") {
      approveBranch(name);
    }
  }

  const clickLeftArrow = () => {
    if (column === "Review") {
      reworkBranch(name);
    } else if (column === "ReadyToMerge") {
      reReviewBranch(name);
    }
  }

  return (
    <li key={name} className="w-full h-[70px] rounded-[4px] bg-base-100 hover:bg-accent hover:cursor-pointer flex">
      <div onClick={clickLeftArrow} className={`grow-0 text-xl h-full w-12 btn-ghost font-thin text-center pt-5 ${column === "InProgress" ? "hidden" : "inline-block"}`}>＜</div>
      <p title={name} className="inline-block text-center my-auto mx-auto min-w-[3rem] overflow-clip line-clamp-1">{name}</p>
      <div onClick={clickRightArrow} className={`grow-0 text-xl h-full w-12 btn-ghost font-thin text-center pt-5 ${column === "ReadyToMerge" ? "hidden" : "inline-block"}`}>＞</div>
    </li>
  );
}
