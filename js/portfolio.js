const generateFilePath = (idx, num, isThumb = true) => {
  const dirName = CATEGORIES[idx].filePath;
  num = String(num).padStart(3, "0");
  const type = isThumb ? "thumbs" : "hires";
  return `images/portfolio/${dirName}/${type}/${idx}.${num}.jpg`;
};

const generatecategoryBtns = () => {
  const $categoryDiv = $("#category-btn-container");
  CATEGORIES.forEach((cat, idx) => {
    const $el = $("<button></button>").text(cat.label);
    $el.addClass("btn");
    $el.on("click", () => {
      makeButtonActive($el);
      getCategoryImages(idx);
    });
    $categoryDiv.append($el);
  });
};

const getFileNameFromPath = (filePath) => {
  return filePath.split("//").pop().split("/").pop();
};

const generateGalleryCell = (filePath) => {
  const img = new Image();
  const fileName = getFileNameFromPath(filePath);
  const h3 = $("<h3></h3>").text(fileName);
  img.src = filePath;
  const $container = $("<div></div>");
  $container.addClass("col-md-4");
  const $inner = $("<div></div>");
  $inner.addClass("gallery");
  $inner.append(img);
  $inner.append(h3);
  $container.append($inner);
  return $container;
};

const makeButtonActive = (el) => {
  const $categoryDiv = $("#category-btn-container");
  $categoryDiv.children().removeClass("active");
  el.addClass("active");
};

const getCategoryImages = (cat_idx) => {
  const filePaths = [];
  const numFiles = CATEGORIES[cat_idx].numFiles;
  const $galleryContainer = $("#gallery-container");
  $galleryContainer.empty();

  for (let i = 1; i <= numFiles; i++) {
    filePaths.push(generateFilePath(cat_idx, i));
  }
  filePaths.forEach((filePath) => {
    $cell = generateGalleryCell(filePath);
    $galleryContainer.append($cell);
  });
};

const isNumber = (char) => {
  if (typeof char !== "string") return false;

  if (char.trim() === "") return false;

  return !isNaN(char);
};

const checkForHash = () => {
  let hash = window.location.hash;
  hash = hash.replace("#", "");
  if (isNumber(hash)) {
    const $categoryBtnContainer = $("#category-btn-container");
    const $activeCatBtn = $categoryBtnContainer.children()[hash];
    $activeCatBtn.click();
  }
};

$(() => {
  generatecategoryBtns();
  checkForHash();
});
