import React, { useState } from 'react';

import { HLSPlayer } from './Player/HLSPlayer';

export const AppContainer: React.FC = () => {
  const [ playlist, setPlaylist ] = useState('');
  const defaultVODPlaylist = 'https://dev-vod-abematv.akamaized.net/preview/program/9999-1_s2_p1/playlist.m3u8?vvvv=true';

  return (
    <div className="c-AppContainer">
      <div className="c-AppContainer-wrapper">
        <div className="c-AppContainer-item">
          <h2>autoplay</h2>
          <div className="c-AppContainer__player">
            <HLSPlayer playlist={defaultVODPlaylist} autoplay={true} muted={false} />
          </div>
        </div>

        <div className="c-AppContainer-item">
          <h2>muted autoplay</h2>
            <div className="c-AppContainer__player">
              <HLSPlayer playlist={defaultVODPlaylist} autoplay={true} muted={true} />
            </div>
        </div>
      </div>

      <div className="c-AppContainer-wrapper">
        <div className="c-AppContainer-item">
          <h2>play</h2>
            <div className="c-AppContainer__playlist">
              <p>playlist: <input type="text" value={playlist} onChange={(e)=> setPlaylist(e.currentTarget.value)} /></p>
            </div>
            <div className="c-AppContainer__player">
              <HLSPlayer playlist={playlist} />
            </div>
        </div>
      </div>
    </div>
  );
};
 