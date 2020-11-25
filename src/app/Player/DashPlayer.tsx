import React, { useRef, useEffect, useState } from 'react';
// @ts-ignore
import Shaka from 'shaka-player';
import { PlayerProps } from './player_interface';
import { videoTagEvents } from './video_tag_events';

export function DashPlayer({
  manifest,
  putLog,
  inline,
}: PlayerProps) {
    const videoRef = useRef<null | HTMLVideoElement>(null);
    const [lib, setLib] = useState<null | Shaka>(null);

    const cleanup = () => {
        if (lib === null) return;
        destroyShaka(lib);
        setLib(null);
    };

    useEffect(()=>{
        const videoTag = videoRef.current;
        if (videoTag === null) return;

        bindShaka(videoTag, manifest, (shaka) => {
            setLib(shaka);
            setEvents(videoTag, !!putLog);
            console.log('ready to play for shaka-player');
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

function bindShaka(
  video: HTMLVideoElement,
  manifest: string,
  onReady: (lib: Shaka) => void,
) {
    const shaka = new Shaka.Player(video);
    shaka.attach(video);
    shaka.load(manifest)
      .then(()=> {
        onReady(shaka);
      })
      .catch((e: any) => {
          console.log(e);
      })
}

function destroyShaka(lib: Hls) {
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
