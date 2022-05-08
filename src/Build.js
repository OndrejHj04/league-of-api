export default function Build({ champion, mainTree, items, ss, guardians }) {
  return (
    <div className="max-w-lg mx-auto">
      <>
        <div className="flex">
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${champion.id}.png`} alt="" width="128" />
          <div className="m-auto text-2xl">{champion.title}</div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2  my-2">
          <img src={`https://ddragon.canisback.com/img/${mainTree.treeOne}`} alt="" width="112" height="112" className="m-auto" />
          <img src={`https://ddragon.canisback.com/img/${mainTree.treeTwo}`} alt="" width="112" height="112" className="m-auto" />
          <img src={`https://ddragon.canisback.com/img/${mainTree.treeThree}`} alt="" width="112" height="112" className="m-auto" />
          <img src={`https://ddragon.canisback.com/img/${mainTree.treeFour}`} alt="" width="112" height="112" className="m-auto" />
          <img src={`https://ddragon.canisback.com/img/${mainTree.secondFirst}`} alt="" width="112" height="112" className="m-auto" />
          <img src={`https://ddragon.canisback.com/img/${mainTree.secondSecond}`} alt="" width="112" height="112" className="m-auto" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${ss}`} alt="" width="112" height="112" className="m-auto" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${guardians}`} alt="" width="112" height="112" className="m-auto" />
        </div>

        <div className="flex justify-between">
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[0]}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[1]}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[2]}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[3]}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[4]}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[5]}`} alt="" className="my-auto w-1/6 m-1" />
        </div>
      </>
    </div>
  );
}
