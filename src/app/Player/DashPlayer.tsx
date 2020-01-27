import React from 'react';

interface DashPlayerProps {
    manifest: string;
}

export const DashPlayer: React.FC<DashPlayerProps> = ({ manifest }) => {
    const mpd = manifest === '' ? null : manifest;

    if (mpd === null) {
        return null;
    }

    return (
        <div key={mpd}>
            <video src={mpd} />
        </div>
    );
};
