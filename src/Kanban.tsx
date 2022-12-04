import { useEffect } from "react";
import { BranchCard } from "./BranchCard";
import { BranchState,  getRepoKanbanStore } from "./store";

const isInProgress = (branch: BranchState) =>
  branch.column === "InProgress";

const isInReview = (branch: BranchState) =>
  branch.column === "Review";

const isReadyToMerge = (branch: BranchState) =>
  branch.column === "ReadyToMerge";

export interface BranchInfo {
  name: string;
}

export const Kanban: React.FC<{repoUrl: string, branches: BranchInfo[]}> = ({repoUrl, branches}) => {
  const useKanbanStore = getRepoKanbanStore(repoUrl);
  const state = useKanbanStore();

  useEffect(() =>
    state.addBranches(branches.map(branch => branch.name)),
    []
  );

  const inProgressBranches = state.branches.filter(isInProgress) ?? [];
  const inReviewBranches = state.branches.filter(isInReview) ?? [];
  const readyToMergeBranches = state.branches.filter(isReadyToMerge) ?? [];

  return (
    <div className="mt-36 mx-12 grid grid-cols-3 gap-1 justify-center min-w-fit overflow-x-scroll">
      <div className="px-2">
        <p className="text-xs tracking-tightest">In progress ({inProgressBranches.length})</p>
        <ol className="w-full mt-6 space-y-4">
          {inProgressBranches.map(branch => <BranchCard repoUrl={repoUrl} branch={branch} />)}
        </ol>
      </div>
      <div className="px-2">
        <p className="text-xs tracking-tightest">Review ({inReviewBranches.length})</p>
        <ol className="w-full mt-6 space-y-4">
          {inReviewBranches.map(branch => <BranchCard repoUrl={repoUrl} branch={branch} />)}
        </ol>
      </div>
      <div className="px-2">
        <p className="text-xs tracking-tightest">Ready to Merge ({readyToMergeBranches.length})</p>
        <ol className="w-full mt-6 space-y-4">
          {readyToMergeBranches.map(branch => <BranchCard repoUrl={repoUrl} branch={branch} />)}
        </ol>
      </div>
    </div>
  );
}
