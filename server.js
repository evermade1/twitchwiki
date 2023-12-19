
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000
const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

let streamers = []
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.post('/api/streamers', (req, res) => {
  const newStreamer = req.body;
  streamers.push(newStreamer);
  streamers.sort((a, b) => b.viewerCount - a.viewerCount);
  console.log('New streamer added:', newStreamer);
  res.json({ success: true, streamers });
});

app.put('/api/streamers', async (req, res) => {
  const updatedStreamers = await Promise.all(streamers.map(async (streamer) => {
    const json2 = await (
      await fetch(`https://api.twitch.tv/helix/streams?user_id=${streamer.digitId}`, { headers: Headers })
    ).json();

    if (json2.data[0]) {
      return {
        ...streamer,
        viewerCount: json2.data[0].viewer_count,
        streamInfo: json2.data[0]
      };
    }
    return {
      ...streamer,
      viewerCount: 0
    };
  }));
  const filteredUpdatedStreamers = updatedStreamers.filter(item => item.startTime + 86400000 > Date.now());
  const sortedUpdatedStreamers = [...filteredUpdatedStreamers].sort((a, b) => b.viewerCount - a.viewerCount)
  streamers = sortedUpdatedStreamers

  res.json({ streamers });
});

// API 엔드포인트: 데이터 불러오기
app.get('/api/streamers', (req, res) => {
  res.json({ streamers });
});
app.listen(port, () => console.log(`Listening on port ${port}`))
