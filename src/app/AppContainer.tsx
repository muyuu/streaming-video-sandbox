import React, { useState } from 'react';

import { DashPlayer } from './Player/DashPlayer';
import { HLSPlayer } from './Player/HLSPlayer';

export const AppContainer: React.FC = () => {
  const [ manifest, setManifest ] = useState('');
  const [ playlist, setPlaylist ] = useState('');
  return (
    <div className="c-AppContainer">
      <div className="c-AppContainer__player">
        <DashPlayer manifest={manifest} />
      </div>
      <div className="c-AppContainer__player">
        <HLSPlayer playlist={playlist} />
      </div>
      <div className="c-AppContainer__playlist">
        <p>manifest</p>
        <input type="text" value={manifest} onChange={(e)=> setManifest(e.currentTarget.value)} />
      </div>
      <div className="c-AppContainer__playlist">
        <p>playlist</p>
        <input type="text" value={playlist} onChange={(e)=> setPlaylist(e.currentTarget.value)} />
      </div>
    </div>
  );
};
 