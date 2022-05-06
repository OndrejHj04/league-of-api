export default function Build({ champion, mainTree }) {
  return (
    <div className="max-w-lg mx-auto">
      <>
        <div className="flex">
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${champion.id}.png`} alt="" />
          <div className="m-auto text-2xl">{champion.title}</div>
        </div>
        <div className="flex">
          <div>
            <img src={`https://ddragon.canisback.com/img/${mainTree.treeOne}`} alt="" width="120" className="my-2" />
            <img src={`https://ddragon.canisback.com/img/${mainTree.treeTwo}`} alt="" width="120" className="my-2" />
            <img src={`https://ddragon.canisback.com/img/${mainTree.treeThree}`} alt="" width="120" className="my-2" />
            <img src={`https://ddragon.canisback.com/img/${mainTree.treeFour}`} alt="" width="120" className="my-2" />
          </div>
          <div></div>
        </div>
      </>
    </div>
  );
}
