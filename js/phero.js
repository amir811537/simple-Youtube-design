let data = {};

const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  data = await res.json();
  const tabContainer = document.getElementById("tab-container");
  const trimmedData = data.data;
  trimmedData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <a onclick="handleLoadNews('${category.category_id}')"
            class="tab tab-bordered">${category.category}</a>`;
    tabContainer.appendChild(div);
  });
};

const handleLoadNews = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  data = await res.json();
  const cardContainer = document.getElementById("card-container");
  const cardContainer2 = document.getElementById("card-container2");
  cardContainer.innerHTML = "";
  cardContainer2.innerHTML = "";

  if (data?.data && data.data.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="flex justify-center items-center">
        <img src="images/Icon.png" alt="">
      </div>
      <p class="text-4xl text-center">Oops!! Sorry, There is no <br> content here</p>
    `;
    cardContainer2.appendChild(div);
  } else {
    renderData();
  }
};

const renderData = () => {
  const cardContainer = document.getElementById("card-container");

  data?.data.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl">
    <img class="max-h-40 w-full" src="${news.thumbnail}" alt="Shoes" />
    <div class="card-body">
      <div class="flex items-center">
        <div class="pr-4">
          <img class="w-16 h-16 rounded-full" src="${news.authors[0]?.profile_picture}" alt="">
        </div>
        <div>
          <h2 class="card-title truncate max-w-xs"><span class="font-bold">${news.title}</span></h2>
          <div class="card-actions justify-start">
            <div class="flex items-center justify-evenly py-2 gap-2">
              <p class="text-[#171717B2]">${news.authors[0]?.profile_name}</p>
              <img src="${news.authors[0].verified ? 'images/fi_10629607.png' : ''}" alt="">
            </div>
          </div>
          <p class="text-[#171717B2]">${news.others?.views} views</p>
        </div>
      </div>
    </div>
  </div>
  
    `;
    cardContainer.appendChild(div);
  });
};

const sortDataByViews = () => {
  data.data.sort((a, b) => {
    const viewsA = parseInt(
      a.others.views.replace(" views", "").replace(",", "")
    );

    const viewsB = parseInt(
      b.others.views.replace(" views", "").replace(",", "")
    );
    return viewsB - viewsA;
  });

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  renderData();
};

handleCategory();
handleLoadNews("1000");
