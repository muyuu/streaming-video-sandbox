import React, { useState } from 'react';

import { DashPlayer } from './Player/DashPlayer';
import { HLSPlayer } from './Player/HLSPlayer';

export const AppContainer: React.FC = () => {
  const [ manifest, setManifest ] = useState('');
  const [ playlist, setPlaylist ] = useState('https://dev-vod-abematv.akamaized.net/preview/program/9999-1_s2_p1/playlist.m3u8?vvvv=true');
  const [ muted, setMuted ] = useState(true);
  return (
    <div className="c-AppContainer">
      <div className="c-AppContainer__player">
        <DashPlayer manifest={manifest} />
      </div>
      <div className="c-AppContainer__player">
        <HLSPlayer playlist={playlist} autoplay={true} muted={muted} />
      </div>
      <div className="c-AppContainer__playlist">
        <p>manifest</p>
        <input type="text" value={manifest} onChange={(e)=> setManifest(e.currentTarget.value)} />
      </div>
      <div className="c-AppContainer__playlist">
        <p>playlist</p>
        <input type="text" value={playlist} onChange={(e)=> setPlaylist(e.currentTarget.value)} />
        <p>muted: <input type="checkbox" checked={muted} onChange={(e)=> setMuted(e.currentTarget.checked)} /></p>
      </div>
    </div>
  );
};
 