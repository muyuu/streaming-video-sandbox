import React, { useRef, useEffect } from 'react';
import { videoTagEvents } from './video_tag_events';

interface HLSPlayerProps {
    playlist: string;
    autoplay?: boolean;
    muted?: boolean;
    putLog?: boolean;
}

export function HLSPlayer({ playlist, autoplay = false, muted = false, putLog = false }: HLSPlayerProps) {
    const m3u8 = playlist === '' ? null : playlist;
    const videoRef = useRef<null | HTMLVideoElement>(null);

    useEffect(()=>{
        const videoTag = videoRef.current;
        videoTagEvents.forEach((name)=>{
            videoTag?.addEventListener(name, (e: any)=>{
                if (putLog) {
                    console.debug('video tag Event: %s %O', e.type, e);
                }
            });
        });
    }, [m3u8]);

    if (m3u8 === null) {
        return null;
    }

    return (
        <div key={m3u8}>
            <video
                muted={muted}
                src={m3u8}
                controls
                ref={videoRef}
                autoPlay={autoplay}
                width="320px"
            />
        </div>
    );
};
