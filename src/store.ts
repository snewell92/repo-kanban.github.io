import create from 'zustand';
import { persist } from 'zustand/middleware';

export type KanbanColumn =
  "InProgress"
  | "Review"
  | "ReadyToMerge";

export interface BranchState {
  name: string;
  column: KanbanColumn
}

interface BranchStore {
  branches: BranchState[];
  addBranches: (branchList: string[]) => void;
  reviewBranch: (name: string) => void;
  reworkBranch: (name: string) => void;
  approveBranch: (name: string) => void;
  reReviewBranch: (name: string) => void;
}

const branchNameToInProgressBranch = (name: string): BranchState => ({
  name, column: "InProgress"
});

const updateMatchingBranchToState = (name: string, state: KanbanColumn) => (branch: BranchState) => ({
  ...branch,
  column: branch.name === name ? state : branch.column
})

const createStoreForUrl = (repoUrl: string) =>
  create(
    persist<BranchStore>(
      (set, get) => ({
        branches: [] as BranchState[],

        addBranches: (branchList) => {
          const original = get().branches;

          return set({
            branches: original.length === 0
              ? branchList.map(branchNameToInProgressBranch)
              : original
          });
        },
        reviewBranch: (branchName) => set({
          branches: get().branches.map(updateMatchingBranchToState(branchName, "Review"))
        }),
        reworkBranch: (branchName) => set({
          branches: get().branches.map(updateMatchingBranchToState(branchName, "InProgress"))
        }),
        approveBranch: (branchName) => set({
          branches: get().branches.map(updateMatchingBranchToState(branchName, "ReadyToMerge"))
        }),
        reReviewBranch: (branchName) => set({
          branches: get().branches.map(updateMatchingBranchToState(branchName, "Review"))
        })
      }),
      { name: repoUrl }
    )
  );

// creating a fake store to get the types with ease
const repoKanbanStores = new Map([["fake", createStoreForUrl("fake")]]);

export const getRepoKanbanStore = (repoUrl: string) => {
  if (!repoKanbanStores.has(repoUrl)) {
    repoKanbanStores.set(repoUrl, createStoreForUrl(repoUrl));
  }

  return repoKanbanStores.get(repoUrl)!;
}

