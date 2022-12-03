import { BranchCard } from "./BranchCard";

export interface BranchInfo {
  name: string;
}

export const Kanban: React.FC<{branches: BranchInfo[]}> = ({branches}) => {
  return (
    <div className="mt-36 mx-12 grid grid-cols-3 gap-1 justify-center min-w-fit overflow-x-scroll">
      <div className="px-2">
        <p className="text-xs tracking-tightest">In progress ({branches.length})</p>
        <ol className="w-full mt-6 space-y-4">
          {branches.map((branch: {name: string}) =>
            <BranchCard branchName={branch.name} column="InProgress" />
          )}
        </ol>
      </div>
      <div className="px-2">
        <p className="text-xs tracking-tightest">Review (0)</p>
        <ol className="w-full mt-6 space-y-4"></ol>
      </div>
      <div className="px-2">
        <p className="text-xs tracking-tightest">Ready to Merge (0)</p>
        <ol className="w-full mt-6 space-y-4"></ol>
      </div>
    </div>
  );
}
