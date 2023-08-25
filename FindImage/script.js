const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('srch-box');
const searchResult = document.getElementById('search-result');
const showMore = document.getElementById('show-more-btn');

const accessKey= 'ie9cKrUFo-q7kI4WO5ty4KaY8BKQZacJbLELjoVlykk';

let keyword = "";
let page = 1;

async function searchImg (){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=15`
    
    const resp = await fetch(url);
    const data = await resp.json();

    const results = data.results;
    if(page === 1){
        searchResult.innerHTML = "";
    }

    results.map((res)=>{
        const image = document.createElement("img");
        image.src = res.urls.small;

        const imageLink = document.createElement('a');
        imageLink.href = res.links.html;
        imageLink.target = '_blank';
        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);
    })
    showMore.style.display = 'block';
}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    page=1;
    searchImg();
})

showMore.addEventListener('click',()=>{
    page++;
    searchImg();
})