import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { videoTagEvents } from './video_tag_events';
import { PlayerProps } from './player_interface';

export function HLSPlayer({
    manifest,
    putLog,
    inline,
}: PlayerProps) {
    const videoRef = useRef<null | HTMLVideoElement>(null);
    const [lib, setLib] = useState<null | Hls>(null);

    const cleanup = () => {
        if (lib === null) return;
        destroyHLSJS(lib);
        setLib(null);
    };

    useEffect(()=>{
        const videoTag = videoRef.current;
        if (videoTag === null) return;

        bindHLSJS(videoTag, manifest, (hls) => {
            setLib(hls);
            console.log('ready to play for hls.js');
            setEvents(videoTag, !!putLog);
        });

        return cleanup;
    }, []);

    return (
        <div>
            <video
                ref={videoRef}
                width="500px"
                playsInline={inline}
                controls
            />
        </div>
    );
}

function bindHLSJS(
  videoTag: HTMLVideoElement,
  manifest: string,
  onReady: (hls: Hls) => void,
) {
    if (!Hls.isSupported()) return;

    const hls = new Hls();
    hls.loadSource(manifest);
    hls.attachMedia(videoTag);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
        onReady(hls);
    });
}

function destroyHLSJS(lib: Hls) {
    lib.detachMedia();
    lib.destroy();
}

function setEvents(video: HTMLVideoElement, putLog: boolean) {
    if (!putLog) return;

    videoTagEvents.forEach((name) => {
        video.addEventListener(name, (e: any)=>{
            if (putLog) {
                console.debug('video tag Event: %s %O', e.type, e);
            }
        });
    });
}
