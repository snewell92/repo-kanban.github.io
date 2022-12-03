import { useRef, useState, useEffect, KeyboardEventHandler } from 'react';
import { Star } from "./Star";
import { useRepoInfo, useBranchInfo } from "./api/github"
import { Kanban } from './Kanban';

// Theme provider is the HTML DOM Node's data-theme attribute
const $htmlElement = document.documentElement;

/** Synchronize theme radio btn state to HTML DOM html attribute */
function useDOMThemeSwitcher(darkThemeOn: boolean) {
  useEffect(
    () => $htmlElement.setAttribute(
      'data-theme',
      darkThemeOn ? "dark" : "light"
    ),
    [darkThemeOn]
  );
}

const onEnter = (fn: Function): KeyboardEventHandler<HTMLInputElement> => (evt) => {
  if (evt.key === "Enter") {
    fn();
  }
}

const friendlyNumber = (num: number) => {
  if (num < 1_000) {
    return num;
  }

  if (num < 1_000_000) {
    return (num / 1000).toFixed(1) + " K";
  }

  if (num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(1) + " M";
  }

  return "OVER A BILLION";
}

function App() {
  // State
  const [repoUrl, setRepoUrl] = useState("");
  const [darkThemeOn, setDarkThemeOn] = useState(true);
  const repoInfo = useRepoInfo(repoUrl);
  const branchInfo = useBranchInfo(repoInfo.data?.url ?? "");

  // Effects & Refs
  useDOMThemeSwitcher(darkThemeOn);
  const inputRef = useRef<HTMLInputElement>(null);

  // Computeds
  const isEmptyRepo = repoUrl.trim().length === 0;
  const fetchingRepoInfo = !isEmptyRepo && repoInfo.isLoading;
  const dataDefined = typeof repoInfo.data === 'object';
  const hasBranches = branchInfo.isFetched && branchInfo.data && branchInfo.data.length > 0;

  // Actions
  function toggleDarkTheme() {
    setDarkThemeOn(!darkThemeOn);
  };

  function submitRepoURl() {
    if (!!inputRef && inputRef.current != null) {
      setRepoUrl(inputRef.current.value);
    }

    return false;
  }

  function resetRepoUrl() {
    setRepoUrl("");
  }

  // UI!
  return (
    <div className="relative bg-neutral min-h-screen">
      <div className="absolute top-4 right-4 w-fit z-20">
        <input title="Toggle Dark/Light Themes" type="checkbox" className="toggle" checked={darkThemeOn} onChange={toggleDarkTheme} />
      </div>
      {
        (isEmptyRepo || !repoInfo.isFetched || repoInfo.isError) && (
          <>
            <div className="block md:hidden z-10">
              <div className="pt-[15vh] pl-8 relative">
                <span className="absolute bottom-1 w-5 h-5 border-2 inline-block border-primary border-solid"></span>
                <p className="pl-6 text-xl inline-block">CodeSandbox</p>
              </div>
            </div>
            <div className="flex mx-8 md:ml-0">
              <div className="hidden sm:hidden md:block basis-1/3 text-left pl-8 min-w-fit">
                <div className="pt-[30vh] relative">
                  <span className="absolute bottom-1 w-5 h-5 border-2 inline-block border-primary border-solid"></span>
                  <p className="pl-6 text-xl inline-block">CodeSandbox</p>
                </div>
              </div>
              <div className="basis-full md:basis-2/3 min-w-min">
                <div className="pt-16 md:pt-[30vh] w-full" >
                  <h1 className="font-interBold tracking-tighter text-5xl max-w-xl min-w-min">Start by pasting the repository URL.</h1>
                  <div className="mt-24 flex">
                    <input disabled={fetchingRepoInfo} tabIndex={1} ref={inputRef} type="text" placeholder="https://" onKeyDown={onEnter(submitRepoURl)} className="pt-8 input input-ghost basis-4/5 flex-1 max-w-[90%] min-w-fit border-t-0 border-r-0 border-l-0 border-b-1 rounded-none border-primary h-8 pb-6 font-inter font-thin" />
                    <button disabled={fetchingRepoInfo} tabIndex={2} onClick={submitRepoURl} className={`basis-1/5 flex-none my-auto grow-0 w-fit ml-2 btn bg-base-100 font-inter font-thin tracking-tightest normal-case focus:bg-neutral ${fetchingRepoInfo && 'loading'}`}>Submit</button>
                  </div>
                  <div>
                    {(!isEmptyRepo && repoInfo.isError) && <p className="text-error mt-4 text-sm font-thin tracking-tightest">Oops! Someting went wrong. Try again!</p>}
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
      {
        (!isEmptyRepo && repoInfo.isFetched && dataDefined) && (
        <>
          <div className="grid grid-cols-6 gap-4 pt-16 justify-start">
            <div className="col-span-1">
              <button title="Go Back" onClick={resetRepoUrl} className="w-4 h-4 ml-12">
                <svg height="50" width="50" fill="none" stroke-linecap="round" stroke-linejoin="round" className="stroke-2 stroke-secondary hover:stroke-primary scale-50" >
                  <polyline points="4,25 25,46 4,25 25,4 4,25 48,25"/>
                </svg>
              </button>
            </div>

            <div className="col-span-3 justify-self-center max-w-[14rem]">
              <h1 className="text-5xl font-interBold break-words sm:break-normal">{repoInfo.data.full_name}</h1>
              <p className="font-inter tracking-tightest font-thin pt-6 text-sm">{repoInfo.data.description}</p>
            </div>

            <div className="col-span-2 justify-self-end pr-8">
              <Star className="w-5" />
              <span className="pl-1">{friendlyNumber(repoInfo.data.stargazers_count)}</span>
            </div>
          </div>
          {hasBranches && <Kanban branches={branchInfo.data} />}
        </>
        )
      }
    </div>
  )
}

export default App
