
export type KanbanColumn =
  "InProgress"
  | "Review"
  | "ReadyToMerge";

export interface BranchCardProps {
  branchName: string;
  column: KanbanColumn
}

export const BranchCard: React.FC<BranchCardProps> = ({
  branchName, column
}) => {
  return (
    <li className="w-full h-[70px] rounded-[4px] bg-base-100 hover:bg-accent hover:cursor-pointer flex">
      <div className={`grow-0 text-xl h-full w-12 btn-ghost font-thin text-center pt-5 ${column === "InProgress" ? "hidden" : "inline-block"}`}>＜</div>
      <p title={branchName} className="inline-block text-center my-auto mx-auto min-w-[3rem] overflow-clip line-clamp-1">{branchName}</p>
      <div className={`grow-0 text-xl h-full w-12 btn-ghost font-thin text-center pt-5 ${column === "ReadyToMerge" ? "hidden" : "inline-block"}`}>＞</div>
    </li>
  );
}
