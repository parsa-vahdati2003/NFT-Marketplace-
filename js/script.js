import axios from "axios";

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
const links = document.querySelectorAll("#navbar a");

const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

// hamberger header
menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("hidden");
});

// header scroll
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    header.classList.add("bg-white/10", "backdrop-blur-md", "shadow-lg");
  } else {
    header.classList.remove("bg-white/10", "backdrop-blur-md", "shadow-lg");
  }
});

// back to up button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    topBtn.classList.remove("hidden");
  } else {
    topBtn.classList.add("hidden");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for navbar links

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (!href || !href.startsWith("#")) {
      return;
    }

    e.preventDefault();

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const API_URL =
  "https://raw.githubusercontent.com/mmhosseinzadeh9190/mft-final/refs/heads/main/assets/data/data.json";

// collectiom fetch
const renderCollectionCard = (collection, creator, index) => {
  let visibilityClasses = "";

  if (index === 1) {
    visibilityClasses = "hidden md:grid";
  } else if (index === 2) {
    visibilityClasses = "hidden xl:grid";
  }

  return `
    <section id="collection-${collection.id}" class=" grid h-max gap-4 ${visibilityClasses}">
     
    <div class=" overflow-hidden rounded-20">
        <img
          src="${collection.images[0]}"
          alt="${collection.name} main image"
          class="w-full  object-cover"
        />
      </div>

      <div class="grid grid-cols-3 gap-4">
      
             <div class="overflow-hidden rounded-xl">
                <img src="${collection.images[1]}" alt="${collection.name} image 2" class="w-full object-cover" />
              </div>


        <div class="overflow-hidden rounded-xl">
          <img src="${collection.images[2]}" alt="${collection.name} image 3" class="w-full  object-cover" />
        </div>

        <div class="hover:bg-primary-opacity bg-primary grid  w-full cursor-pointer place-items-center rounded-20 md:px-3 xl:px-4 py-8 font-mono text-2xl font-bold text-white transition-all duration-300">
          ${collection.total_items}+
        </div>

      </div>

      <div class="flex h-max flex-col gap-3">

            <div>
                <h5 class="text-2xl font-semibold text-white">${collection.name}</h5>
            </div>

        <div class="flex gap-3 items-center">
          <div>
            <img src="${creator.image}" alt="${creator.name} avatar" class="h-6 w-6 rounded-full object-cover" />
          </div>

         <div>
            <span class="text-base text-white">${creator.name}</span>
          </div>
        </div>

      </div>
    </section>
  `;
};

const fetchAndRenderCollections = async () => {
  try {
    const res = await axios.get(API_URL);
    const { collections, creators } = res.data;

    const container = document.getElementById("trending-collections");

    container.innerHTML = "";

    collections.forEach((collection, index) => {
      const creator = creators.find((c) => c.id === collection.creator_id);
      container.insertAdjacentHTML(
        "beforeend",
        renderCollectionCard(collection, creator, index),
      );
    });
  } catch (error) {
    console.warn("Error fetching data:", error);
  }
};

fetchAndRenderCollections();

// creator fetch

const renderCreatorCard = (creator, index) => {
  let responsiveClass = "";

  if (index < 5) {
    responsiveClass = "";
  } else if (index < 6) {
    responsiveClass = "hidden md:flex";
  } else {
    responsiveClass = "hidden xl:flex";
  }

  return `
    <div class="bg-background-secondry relative w-78.75 gap-5  md:w-82.5 h-25 xl:h-60 xl:w-60 rounded-20 flex flex-row xl:flex-col ${responsiveClass}">
      <div class="py-5 xl:py-0 pl-5 xl:px-15 xl:pt-5">
        <img class="w-15 xl:w-30" src="${creator.image}" alt="${creator.name} avatar" />
      </div>

      <div class=" mb-0.5 xl:mb-0 gap-1  flex flex-col py-5 xl:pt-0 pr-5 xl:px-5">
        <div class="text-start xl:text-center">
          <span class="text-2xl font-semibold text-white">${creator.name}</span>
        </div>
        <div class="flex gap-5 ">
          <span class="text-color-border text-base">Total Sales:</span>
          <span class="font-mono text-base text-white">${creator.total_sales} ${creator.currency}</span>
        </div>
      </div>

      <div class="text-color-border bg-background absolute top-3.25 left-3  xl:top-5 xl:left-4.5 grid h-7.5 w-7.5 place-items-center rounded-full">
        ${index + 1}
      </div>
    </div>
  `;
};

const fetchAndRenderCreators = async () => {
  try {
    const res = await axios.get(API_URL);
    const { creators } = res.data;

    const container = document.getElementById("creators-gallery");

    creators.forEach((creator, index) => {
      container.insertAdjacentHTML(
        "beforeend",
        renderCreatorCard(creator, index),
      );
    });
  } catch (error) {
    console.warn("Error fetching creators:", error);
  }
};

fetchAndRenderCreators();

// fetch categories

const renderCategoryCard = (category) => {
  return `
    <div class="flex flex-col xl:max-w-60   xl:h-max h-58 ;">

      <div class="relative rounded-t-20 overflow-hidden  ">
        <img
          class="blur-xs"
          src="${category.image}"
          alt="${category.name}"
        />

        <img
          class="absolute xl:w-25  xl:h-25  md:w-20  md:h-20 md:left-9 left-7 top-8 xl:top-17 xl:left-17"
          src="${category.icon}"
          alt="${category.name} icon"
        />
      </div>

      <div class="bg-background-secondry h-22 pt-5 pb-11 px-5 rounded-b-20">
        <span class="font-semibold xl:text-2xl md:text-base capitalize text-white">
          ${category.name}
        </span>
      </div>

    </div>
  `;
};

const fetchAndRenderCategories = async () => {
  try {
    const res = await axios.get(API_URL);

    const { categories } = res.data;

    const container = document.getElementById("category-gallery");

    container.innerHTML = "";

    categories.forEach((category) => {
      container.insertAdjacentHTML("beforeend", renderCategoryCard(category));
    });
  } catch (error) {
    console.warn("Error fetching categories:", error);
  }
};

fetchAndRenderCategories();

// fetch nfts

const renderNFTCard = (nft, creator, index) => {
  let visibilityClasses = "";

  if (index === 2) {
    visibilityClasses = "md:hidden xl:block";
  }

  return `
    <section class="max-w-82.5 ${visibilityClasses}">
      
      <div class=" overflow-hidden rounded-t-20">
        <img 
          src="${nft.image}" 
          alt="${nft.name}" 
          class="h-full w-full object-cover"
        />
      </div>

      <div class="bg-background-secondry flex flex-col gap-5 rounded-b-20">

        <div class="flex flex-col gap-1 px-8 pt-5">
          <h5 class="text-2xl font-semibold text-white">
            ${nft.name}
          </h5>

          <div class="flex gap-3 items-center">
            <img 
              src="${creator.image}" 
              alt="${creator.name}" 
              class="h-6 w-6 rounded-full object-cover"
            />
            <span class="font-mono text-white">
              ${creator.name}
            </span>
          </div>
        </div>

        <div class="flex justify-between pb-6">

          <div class="flex flex-col pl-8">
            <span class="text-color-border font-mono text-xs">
              Price
            </span>
            <span class="font-mono text-base text-white">
              ${nft.price.amount} ${nft.price.currency}
            </span>
          </div>

          <div class="flex flex-col pr-8 gap-2">
            <span class="text-color-border font-mono text-xs">
              Highest Bid
            </span>
            <span class="font-mono text-base text-white">
              ${nft.highest_bid.amount} ${nft.highest_bid.currency}
            </span>
          </div>

        </div>

      </div>
    </section>
  `;
};

const fetchAndRenderNFTs = async () => {
  try {
    const res = await axios.get(API_URL);

    const { nfts, creators } = res.data;

    const container = document.getElementById("discover-gallery");

    container.innerHTML = "";

    nfts.forEach((nft, index) => {
      const creator = creators.find((c) => c.id === nft.creator_id) || {};

      container.insertAdjacentHTML(
        "beforeend",
        renderNFTCard(nft, creator, index),
      );
    });
  } catch (error) {
    console.warn("Error fetching NFTs:", error);
  }
};

fetchAndRenderNFTs();

let timeLeft = 59 * 60 * 60;

function updateCountdown() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  hourEl.textContent = String(hours).padStart(2, "0");
  minuteEl.textContent = String(minutes).padStart(2, "0");
  secondEl.textContent = String(seconds).padStart(2, "0");

  if (timeLeft <= 0) {
    clearInterval(timer);
    return;
  }

  timeLeft--;
}

const timer = setInterval(updateCountdown, 1000);
