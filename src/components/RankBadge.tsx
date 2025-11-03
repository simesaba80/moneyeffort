import React from 'react'

interface RankBadgeProps {
    rank: number;
}

const RankBadge: React.FC<RankBadgeProps> = ({ rank }) => {
    let badgeText = '';

    if (rank >= 10) {
        badgeText = 'ゴールド';
    } else if (rank >= 5) {
        badgeText = 'シルバー';
    } else if (rank >= 1) {
        badgeText = 'ブロンズ';
    } else {
        badgeText = 'ノーランク';
    }

    return (
        <div style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
            <h2>{badgeText}</h2>
        </div>
    )
}

export default RankBadge;