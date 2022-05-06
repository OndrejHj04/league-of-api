export default function Build({ champion, mainTree, items }) {
  return (
    <div className="max-w-lg mx-auto">
      <>
        <div className="flex">
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${champion.id}.png`} alt="" width="128" />
          <div className="m-auto text-2xl">{champion.title}</div>
        </div>
        <div className="flex justify-between my-2">
          <img src={`https://ddragon.canisback.com/img/${mainTree.treeOne}`} alt="" width="112" height="112" className="my-auto" />
          <img src={`https://ddragon.canisback.com/img/${mainTree.treeTwo}`} alt="" width="112" height="112" className="my-auto"  />
          <img src={`https://ddragon.canisback.com/img/${mainTree.treeThree}`} alt="" width="112" height="112" className="my-auto" />
          <img src={`https://ddragon.canisback.com/img/${mainTree.treeFour}`} alt="" width="112" height="112" className="my-auto"/>

          <div></div>
        </div>
        <div className="flex justify-between">
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[0].full}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[1].full}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[2].full}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[3].full}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[4].full}`} alt="" className="my-auto w-1/6 m-1" />
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${items[5].full}`} alt="" className="my-auto w-1/6 m-1" />
        </div>
      </>
    </div>
  );
}
