const accessKey = 'LAmVmO32b3bEcSCeU6scAepAdxMA9mjuuIbqQoB4SBI';
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const loadingSpinner = document.getElementById("loading-spinner");


let keyword = "";
let page = 1;

async function searchImages(){
    loadingSpinner.style.display = "block";

    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        const data = await response.json();
        if(page == 1){
            searchResult.innerHTML = "";
        }
        const results = data.results;
    
        results.map((results) =>{
            const image = document.createElement("img");
            image.src = results.urls.small;
            image.alt = results.alt_description;
            const imageLink = document.createElement("a");
            imageLink.href = results.links.html;
            imageLink.target = "_blank";//open link in new tab
             
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        })
        showMoreBtn.style.display = "block";
        loadingSpinner.style.display = "none";

    
    

    }catch(error){
        console.error('Error fetching data:',error);
        loadingSpinner.style.display = "none";

    }

}
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click',()=>{
    page++;
    searchImages();
})

