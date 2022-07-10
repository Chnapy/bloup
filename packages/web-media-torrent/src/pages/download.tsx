import React from 'react';
import WebTorrent from 'webtorrent';

const useTempTorrent = () => {
  const [torrent, setTorrent] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('/temp.torrent')
      .then((response) => response.text())
      .then((buffer) => setTorrent(buffer));
  }, []);

  return torrent;
};

export const Download: React.FC = () => {
  const torrent = useTempTorrent();

  if (!torrent) {
    return null;
  }
  const wt = new WebTorrent();
  console.log(torrent);
  wt.add(torrent);

  return <div>download</div>;
};
