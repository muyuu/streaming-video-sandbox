export enum StreamType {
  HLS = 'hls',
  DASH = 'dash',
}

export const isHlsManifest = (s: string): boolean => {
  const pattern = /^http(s?):\/\/.*\.m3u8.*/;
  return pattern.test(s);
}

export const isDashManifest = (s: string): boolean => {
  const pattern = /^http(s?):\/\/.*\.mpd.*/;
  return pattern.test(s);
}

export const detectStreamType = (s: string): StreamType | null => {
  if (isHlsManifest(s)) return StreamType.HLS;
  if (isDashManifest(s)) return StreamType.DASH;
  return null;
}
