const http = require('http');
const mongoose = require('mongoose');
const header = require('./header');
const Post = require('./models/post');
require('dotenv').config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('資料庫連線成功');
  })
  .catch((e) => {
    console.log(e.reason);
  });

const reqListener = async (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  const { url, method } = req;
  // 新增貼文
  if (url === '/post' && method === 'POST') {
    req.on('end', async () => {
      try {
        const { userName, userPhoto } = JSON.parse(body);
        const post = await Post.create({ userName, userPhoto });
        res.writeHead(200, header);
        res.write(
          JSON.stringify({
            status: 'success',
            data: post,
          })
        );
        res.end();
      } catch (error) {
        res.writeHead(400, header);
        res.write(
          JSON.stringify({
            status: 'error',
            message: error,
          })
        );
        res.end();
      }
    });
  }
  // 預檢請求
  else if (method === 'OPTIONS') {
    res.writeHead(200, header);
    res.end();
  } else {
    res.writeHead(404, header);
    res.write(
      JSON.stringify({
        status: 'error',
        message: '找不到路徑',
      })
    );
    res.end();
  }
};

const server = http.createServer(reqListener);
server.listen(process.env.PORT || 3005);
