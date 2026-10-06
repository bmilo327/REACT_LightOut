import Lampa from "./Lampa";

interface JatekTerProps {
    lista: ('on' | 'off')[],
    meret: number,
    lampaKivalaszt:(index:number)=>void,
}

export default function JatekTer({ lista, lampaKivalaszt, meret }: JatekTerProps) {
    return(
        <div className="jatekter" style={{gridTemplateColumns: `repeat(${meret}, auto)`}}>
            {lista.map((e, i) => (
                <Lampa lampam={e} index={i} key={i} LampaKivalaszt={lampaKivalaszt}/>
            ))}
        </div>
    )
}