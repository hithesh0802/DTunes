const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const router = express.Router();
const dotenv = require('dotenv');
const cheerio = require('cheerio');
dotenv.config();
const CLIENT_ID = process.env.GENIUS_CLIENT_ID;
const CLIENT_SECRET = process.env.GENIUS_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

router.get('/auth/genius', (req, res) => {
  const authUrl = `https://api.genius.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=me&state=xyz&response_type=code`;
  console.log(authUrl);
  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post('https://api.genius.com/oauth/token', querystring.stringify({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      grant_type: 'authorization_code'
    }));

    const accessToken = response.data.access_token;
    console.log(accessToken);
    res.send('Authorization successful! You can close this window.');
  } catch (error) {
    res.status(500).send('Error during authorization');
  }
});

router.get('/getLyrics', async(req,res)=>{
        const { title, artist } = req.query;
        console.log(req.query.title, req.query.artist,"helo");
        try {
          const response = await axios.get('https://api.genius.com/search', {
            params: {
              q: `${req.query.title} ${req.query.artist}`
            },
            headers: {
              Authorization: `Bearer MYVDcdtW4lBMc4mdOSitFlzdtZIDXxoz7bu1PWwJv7VFqmV1Oi9V8r0ro_1ltr8a`
            }
          });
          const song = response.data.response.hits[0].result;
          const songUr= song.url;
        //   console.log('Song URL:', songUr);
        if (!song) {
        return res.status(404).json({ error: 'Song not found' });
        }

        const songUrl = `https://genius.com${song.path}`;
        const lyricsResponse = await axios.get(songUr);
        const $ = cheerio.load(lyricsResponse.data);
        // console.log('HTML Structure:', $.html());

        let lyrics = $('.lyrics').text().trim();
        if (!lyrics) {
            $('.Lyrics__Container-sc-1ynbvzw-6').each((i, elem) => {
                lyrics += $(elem).text().trim() + '\n';
            });
        }

        if (!lyrics) {
            lyrics = $('div[class^="Lyrics__Container"]').map((i, elem) => $(elem).text().trim()).get().join('\n');
        }

        if (!lyrics) {
            console.error('No lyrics found on the page.');
            return res.status(200).json({ error: 'Lyrics not found' });
        }
    // Extracting lyrics from the HTML

    return res.status(200).json( {
      lyrics: lyrics,
      song: song
    });
        } catch (error) {
          console.error('Error fetching lyrics:', error);
          res.status(500).json({ error: 'Error fetching lyrics' });
        }
});


module.exports= router;
