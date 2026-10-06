interface LampaProps {
    lampam: 'on' | 'off';
    index: number;
    LampaKivalaszt: (index: number) => void;
}

export default function Lampa({ lampam, index, LampaKivalaszt }: LampaProps) {
    return (
        <div className={`lampa ${lampam === 'on' ? 'on' : 'off'}`} onClick={() => LampaKivalaszt(index)}>
        </div>
    )
}