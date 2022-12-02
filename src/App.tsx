import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { BranchCard } from './BranchCard';
import { Star } from "./Star";

// Theme provider is the HTML DOM Node's data-theme attribute
const $htmlElement = document.documentElement;

function setTheme(themeName: string) {
  $htmlElement.setAttribute('data-theme', themeName);
}

function useDOMThemeSwitcher(darkThemeOn: boolean) {
  useEffect(
    () => setTheme(darkThemeOn ? "dark" : "light"),
    [darkThemeOn]
  );
}

function App() {
  // State
  const [repoUrl, setRepoUrl] = useState("");
  const [darkThemeOn, setDarkThemeOn] = useState(true);

  // Effects & Refs
  useDOMThemeSwitcher(darkThemeOn);
  const inputRef = useRef<HTMLInputElement>(null);

  // Computeds
  const isEmptyRepo = repoUrl.trim().length === 0;

  // Actions
  function toggleDarkTheme() {
    setDarkThemeOn(!darkThemeOn);
  };

  function submitRepoURl() {
    if (!inputRef || inputRef.current == null) {
      return;
    }

    // TODO - validate or handle errors when using the GH API
    // TODO - handle loading state while using the GH API
    setRepoUrl(inputRef.current.value);
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
        isEmptyRepo && (
          <>
            <div className="block md:hidden z-10">
              <div className="pt-[15vh] pl-8 relative">
                <span className="absolute bottom-1 w-5 h-5 border-2 inline-block border-primary border-solid"></span>
                <p className="pl-6 text-xl inline-block">CodeSandbox</p>
              </div>
            </div>
            <div className="flex flex-row mx-8 md:ml-0">
              <div className="hidden sm:hidden md:block basis-1/3 text-left pl-8 min-w-fit">
                <div className="pt-[30vh] relative">
                  <span className="absolute bottom-1 w-5 h-5 border-2 inline-block border-primary border-solid"></span>
                  <p className="pl-6 text-xl inline-block">CodeSandbox</p>
                </div>
              </div>
              <div className="basis-full md:basis-2/3 min-w-min">
                <form className="pt-16 md:pt-[30vh] w-full" onSubmit={submitRepoURl}>
                  <h1 className="font-interBold tracking-tighter text-5xl max-w-xl min-w-min">Start by pasting the repository URL.</h1>
                  <div className="mt-24 flex">
                    <input tabIndex={1} ref={inputRef} type="text" placeholder="https://" className="pt-8 input input-ghost basis-4/5 flex-1 max-w-[90%] min-w-fit border-t-0 border-r-0 border-l-0 border-b-1 rounded-none border-primary h-8 pb-6 font-inter font-thin" />
                    <button tabIndex={2} type="submit" className="basis-1/5 flex-none my-auto grow-0 w-fit ml-2 btn bg-base-100 font-inter font-thin tracking-tightest normal-case focus:bg-neutral">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )
      }
      {
        !isEmptyRepo && (
        <>
          <div className="grid grid-cols-3 gap-4 pt-16 justify-start">
            <div>
              <button title="Go Back" onClick={resetRepoUrl} className="w-4 h-4 ml-12">
                <svg height="50" width="50" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="stroke-secondary hover:stroke-primary scale-50" >
                  <polyline points="4,25 25,46 4,25 25,4 4,25 48,25"/>
                </svg>
              </button>
            </div>

            <div>
              <h1 className="text-5xl font-interBold break-words sm:break-normal">sandpack</h1>
              <p className="font-inter tracking-tightest font-thin pt-6 text-sm">A description</p>
            </div>

            <div className="justify-self-end pr-12">
              <Star className="w-5" />
              <span className="pl-2">1.8k</span>
            </div>
          </div>
          <div className="mt-36 mx-12 grid grid-cols-3 gap-1 justify-center min-w-fit overflow-x-scroll">
            <div className="px-2">
              <p className="text-xs tracking-tightest">In progress (9)</p>
              <ol className="w-full mt-6 space-y-4">
                <BranchCard branchName="feat/load-csb-data" column="InProgress" />
                <BranchCard branchName="fix/data-load" column="InProgress" />
                <BranchCard branchName="feat/refactor" column="InProgress" />
              </ol>
            </div>
            <div className="px-2">
              <p className="text-xs tracking-tightest">Review (9)</p>
              <ol className="w-full mt-6 space-y-4">
                <BranchCard branchName="feat/reload" column="Review" />
                <BranchCard branchName="fix/plat-2424" column="Review" />
                <BranchCard branchName="fix/secondary-theme" column="Review" />
              </ol>
            </div>
            <div className="px-2">
              <p className="text-xs tracking-tightest">Ready to Merge (9)</p>
              <ol className="w-full mt-6 space-y-4">
                <BranchCard branchName="hotfix/fix-editor-highlight" column="ReadyToMerge" />
              </ol>
            </div>
          </div>
        </>
        )
      }
    </div>
  )
}

export default App
