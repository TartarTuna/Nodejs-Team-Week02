
// 預設貼文
showPost("http://127.0.0.1:3005/post")

// 下拉選單
var searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener("click", queryType)


function showPost(url){
  axios(url).then(res => {
    let data = res.data.data;

    if(data.length == 0){
        document.querySelector(".postBoard").classList.add("hidden")
        document.querySelector(".nonPosts").classList.remove("hidden")
        return  
    }else{
      document.querySelector(".postBoard").classList.remove("hidden")
      document.querySelector(".nonPosts").classList.add("hidden")
    }

    let posts =''
    data.forEach(ele => {
      posts += createTemplate(ele.userName,ele.createdAt,ele.content,ele.imageUrl)     
    });
    document.querySelector(".postBoard").innerHTML = posts
  });
}

function createTemplate(userName,createdAt,content,imageUrl){
  let template = `<li class="postItems rounded-lg border-2 border-black-100 p-6 shadow-card">
  <div class="mb-4 flex items-center">
    <img src="../static/images/dynamic-wall/user.png"
      alt="avatar"
      class="userPhoto mr-4 h-[45px] w-[45px] flex-shrink-0 object-cover"
    />
    
    <div class="flex-grow">
      <div class="font-bold text-black-100 ">${userName}</div>
      <div class="font-baloo text-xs leading-5 text-gray-300">
      ${createdAt}
      </div>
    </div>
  </div>

  <p class="content text-black-100">${content}</p>

  <picture>
    <source
      media="(min-width: 1024px)"
      srcset="${imageUrl}"
    />
    <img
      class="imageUrl mt-4"
      src="${imageUrl}"
      alt="post photo"
    />
  </picture>
</li>`

return template
}


function queryType(e){
  let type = document.getElementById("postType").value
  let keyText = document.getElementById("keyText").value
  let url = 'http://127.0.0.1:3005/post/queryType=' + type + '?' + keyText;
  if( type ==='default') url ='http://127.0.0.1:3005/post'
  showPost(url) 
}

