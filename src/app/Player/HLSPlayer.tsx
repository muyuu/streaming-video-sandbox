import React, { useRef, useEffect } from 'react';
import { videoTagEvents } from './video_tag_events';

interface HLSPlayerProps {
    playlist: string;
}

export function HLSPlayer({ playlist }: HLSPlayerProps) {
    const m3u8 = playlist === '' ? null : playlist;
    const videoRef = useRef<null | HTMLVideoElement>(null);

    useEffect(()=>{
        const videoTag = videoRef.current;
        videoTagEvents.forEach((name)=>{
            videoTag?.addEventListener(name, (e: any)=>{
                console.debug('video tag Event: %s %O', e.type, e);
            });
        });
    }, [m3u8]);

    if (m3u8 === null) {
        return null;
    }

    return (
        <div key={m3u8}>
            <video src={m3u8} controls ref={videoRef} />
        </div>
    );
};
