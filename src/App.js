import logo from "./logo.png";
import copy from "./copy.png";
export default function App({ players, getPlayers, links, showLinks, newUrls }) {
  const countPlayers = (event) => {
    links(false);
    getPlayers(event.target.value);
  };

  const getBuilds = (event) => {
    event.preventDefault();
    if (players > 0 && players < 11) {
      links(true);
    } else {
      links(false);
    }
  };

  const toClipboard = () => {
    let str = "";

    for (let i = 0; i < players; i++) {
      str += `Player${i + 1}: ${document.getElementsByClassName("link")[i].textContent} `;
    }
    navigator.clipboard.writeText(str);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="relative w-full mx-auto">
        <img src={logo} className="w-full" alt=""/>
        <div className="absolute bg-red-500 h-5 w- bottom-32"></div>
      </div>

      <div>
        <form className="flex flex-col bg-gray-100 p-3 text-xl" onSubmit={getBuilds}>
          <div className="flex justify-between">
            <label className="my-auto">Number of players</label>
            <input type="number" className="outline-none text-xl p-1 w-20" value={players} onChange={countPlayers} />
          </div>

          <button>Generate builds!</button>
          {!(players > 0 && players < 11) && <p className="text-center text-base bg-red-400">10 players max!</p>}
        </form>
      </div>

      {showLinks && (
        <div className="p-2 mt-2 bg-slate-300">
          <div className="flex justify-between">
            <h1 className="font-semibold text-3xl">Generated build links!</h1>
            <img src={copy} alt="" width="36" height="36" onClick={toClipboard} />
          </div>
          <div>
            {showLinks &&
              newUrls.map((item, i) => {
                return (
                  <div className="bg-gray-50 p-1 text-lg my-2 flex justify-between" key={i}>
                    <a href={document.location+item} target="_blank" rel="noreferrer" className="link text-blue-500 font-semibold">{document.location+item}</a>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
