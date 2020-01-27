import React from 'react';

interface HLSPlayerProps {
    playlist: string;
}

export const HLSPlayer: React.FC<HLSPlayerProps> = ({ playlist }) => {
    const m3u8 = playlist === '' ? null : playlist;

    if (m3u8 === null) {
        return null;
    }

    return (
        <div key={m3u8}>
            <video src={m3u8} controls/>
        </div>
    );
};
