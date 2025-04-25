let input;
let slider;
let sliderLabel;
let button;
let dropdown;
let iframe;
let jump = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#ffe5ec');

  // 創建輸入文字框
  input = createInput('教育科技學系');
  input.position(10, 10);
  input.size(300, 80);
  input.style('font-size', '24px');

  // 創建滑桿
  slider = createSlider(12, 40, 24);
  slider.position(460, 25);
  slider.size(200);

  // 創建滑桿標籤
  sliderLabel = createDiv('文字大小');
  sliderLabel.position(370, 25);
  sliderLabel.style('font-size', '24px');

  // 創建按鈕
  button = createButton('跳動');
  button.position(680, 10);
  button.size(100, 50);
  button.style('font-size', '24px');
  button.style('background-color', '#fefae0');
  button.mousePressed(toggleJump);

  // 創建下拉式選單
  dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(200);
  dropdown.option('HOME'); // 新增 HOME 選項
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(openWebsite);

  // 創建 iframe
  iframe = createElement('iframe');
  iframe.position(60, 60);
  iframe.size(windowWidth - 120, windowHeight - 120);
  iframe.hide(); // 預設隱藏 iframe
}

function openWebsite() {
  let selected = dropdown.value();
  if (selected === 'HOME') {
    iframe.hide(); // 隱藏 iframe，顯示原本畫面
    input.show(); // 顯示輸入框
    slider.show(); // 顯示滑桿
    sliderLabel.show(); // 顯示滑桿標籤
    button.show(); // 顯示按鈕
  } else if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
    iframe.show(); // 顯示 iframe
    input.hide(); // 隱藏輸入框
    slider.hide(); // 隱藏滑桿
    sliderLabel.hide(); // 隱藏滑桿標籤
    button.hide(); // 隱藏按鈕
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
    iframe.show(); // 顯示 iframe
    input.hide(); // 隱藏輸入框
    slider.hide(); // 隱藏滑桿
    sliderLabel.hide(); // 隱藏滑桿標籤
    button.hide(); // 隱藏按鈕
  }
}

function toggleJump() {
  jump = !jump;
}

function draw() {
  if (dropdown.value() === 'HOME') {
    background('#ffe5ec'); // 設定背景色為粉紅色
    let textSizeValue = slider.value(); // 獲取滑桿的值
    textSize(textSizeValue); // 設定文字大小
    textAlign(LEFT, TOP); // 設定文字對齊方式
    fill(255);
    stroke(0);
    strokeWeight(1);
    fill("#0077b6");

    let textContent = input.value(); // 獲取輸入文字框的內容
    let textW = textWidth(textContent + " ") + 10; // 計算文字寬度，並加上字串間距
    let textH = textAscent() + textDescent() + 20; // 計算文字高度，並加上行間距

    // 限制文字繪製區域為視窗寬高的 75%
    let maxWidth = width * 0.75;
    let maxHeight = height * 0.75;

    let startX = (width - maxWidth) / 2; // 水平置中
    let startY = (height - maxHeight) / 2; // 垂直置中

    for (let y = startY; y < startY + maxHeight; y += textH) {
      let offsetY = jump ? random(-5, 5) : 0; // 如果跳動，則產生隨機偏移量
      for (let x = startX; x < startX + maxWidth; x += textW) {
        text(textContent, x, y + offsetY);
      }
    }
  }
}