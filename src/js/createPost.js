async function postSubmit() {
  //get post content
  const post = getPostData();
  //send post
  try {
    await createPost(post);
  } catch (err) {
    alert(err, 'err');
  }
  window.location = 'dynamic-wall.html';
}

async function getFiles() {
  //取得上傳圖片
  const selectedFiles = document.getElementById('imageInput').files;
  //file limit 1mb
  const fileLimit = 1024 * 1024;
  //change files
  for (let fileIndex = 0; fileIndex < selectedFiles.length; fileIndex++) {
    const file = selectedFiles[fileIndex];
    //check file size
    if (file.size > fileLimit) {
      const btn = document.querySelector('input[type="button"]');
      btn.classList.remove('mt-8');
      btn.classList.add('mt-4');
      const errorElem = document.querySelector('[data-id="error"]');
      errorElem.classList.remove('hidden');
      return;
    }
    //change file to base64 to preview
    const base64 = await fileToBase64(file);
    document.getElementById('postImage').src = base64;
  }
}

async function createPost(data) {
  //建立文章
  return new Promise(async (resolve, reject) => {
    await axios
      .post('https://stormy-eyrie-25230.herokuapp.com/post', data)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getPostData() {
  //取得輸入內容
  const post = {
    userName: document.getElementById('userName').textContent,
    //userPhoto目前尚無線上版，先用照片代替代替
    // userPhoto: document.getElementById('userPhoto').src,
    userPhoto: 'http://dummyimage.com/140x100.png/5fa2dd/ffffff',
    //imageUrl目前尚無線上版，先用照片代替代替
    imageUrl: 'http://dummyimage.com/140x100.png/5fa2dd/ffffff',
    // imageUrl: document.getElementById('imageInput').value,
    content: document.getElementById('postContent').value,
  };
  return post;
}

function clearPostData() {
  //清除內容
  document.getElementById('imageInput').value = '';
  document.getElementById('postContent').value = '';
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
