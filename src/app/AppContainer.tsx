import React, { useEffect, useState } from 'react';

import { HLSPlayer } from './Player/HLSPlayer';
import { detectStreamType, StreamType } from './stream_types';
import { DashPlayer } from './Player/DashPlayer';

export const AppContainer: React.FC = () => {
  const [ manifest, setManifest ] = useState('');
  const [ streamType, setStreamType ] = useState<null | StreamType>(null);

  const onChangePlaylist =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setManifest(input);
  };

  const onSetPlaylist = () => {
    const current = detectStreamType(manifest);
    setStreamType(current);
  };

  useEffect(() => {

  }, [streamType]);

  return (
    <div className="c-AppContainer">
      <div className="c-AppContainer-wrapper">
        <div className="c-AppContainer-input">
          <input type={"text"} value={manifest} onChange={onChangePlaylist} />
          <button type="button" onClick={onSetPlaylist}>set playlist</button>
        </div>

        <div className="c-AppContainer-item">
          <div className="c-AppContainer__player">
            {streamType === StreamType.DASH ? (
              <DashPlayer manifest={manifest} putLog={true} />
            ) : null}
            {streamType === StreamType.HLS ? (
              <HLSPlayer manifest={manifest} putLog={true} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
 