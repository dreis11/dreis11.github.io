const generateFilePath = (idx, num) => {
  const dirName = CATEGORIES[idx].filePath;
  num = String(num).padStart(3, "0");
  const thumbPath = `images/portfolio/${dirName}/thumb/${
    idx + 1
  }.${num}.A-thumb.jpg`;
  const hiresPath = `images/portfolio/${dirName}/hires/${idx + 1}.${num}.A.jpg`;
  // 0 is thumb, 1 is hires
  return [thumbPath, hiresPath];
};

const generateCategoryBtns = () => {
  const $categoryDiv = $("#category-btn-container");
  CATEGORIES.forEach((cat, idx) => {
    const $container = $("<div></div>");
    $container.addClass("col-md-4");
    const $el = $("<button></button>").text(cat.label);
    $el.addClass("btn");
    $el.on("click", () => {
      makeButtonActive($el);
      getCategoryImages(idx);
    });
    $container.append($el);
    $categoryDiv.append($container);
  });
};

const getFileNameFromPath = (filePath) => {
  return filePath.split("//").pop().split("/").pop();
};

const generateGalleryCell = (filePathArr) => {
  const [thumbPath, hiresPath] = filePathArr;
  const img = new Image();
  // Remove extension
  const fileName = getFileNameFromPath(thumbPath).split("-")[0];
  const h3 = $("<h3></h3>").text(fileName);
  img.src = thumbPath;
  const $container = $("<div></div>");
  const $link = $("<a></a>");
  $link.attr("href", hiresPath);
  $container.addClass("col-md-4");
  const $inner = $("<div></div>");
  $inner.addClass("gallery");
  $inner.append(img);
  $inner.append(h3);
  $link.append($inner);
  $container.append($link);
  return $container;
};

const makeButtonActive = (el) => {
  const $categoryDiv = $("#category-btn-container");
  $categoryDiv.find("button").removeClass("active");
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
    const $activeCatBtn = $categoryBtnContainer.find("button")[hash];
    $activeCatBtn.click();
  }
};

$(() => {
  generateCategoryBtns();
  checkForHash();
});
