let yOffset = 0;
let seaweeds = []; // 儲存水草的屬性
let colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#fffffc']; // 指定顏色組合
let seaweedLine = []; // 儲存單條水草的屬性

function setup() { // 初始值設定
createCanvas(windowWidth, windowHeight); // 畫布大小
blendMode(BLEND); // 設定混合模式為 BLEND

  // 初始化 40 條水草的屬性
  for (let i = 0; i < 40; i++) {
    seaweeds.push({
      x: random(width), // 隨機的 x 位置
      height: random(200, 400), // 隨機高度，範圍為 200 到 400
      color: color(random(colors) + hex(floor(random(100, 200)), 2)), // 加入透明度
      thickness: random(10, 25), // 增加水草的粗細範圍
      swaySpeed: random(0.02, 0.05), // 搖晃的頻率
      swayRange: random(30, 70) // 增加搖晃的幅度
    });
  }

  // 初始化單條水草的屬性
  let segments = 10; // 將水草分成 10 段
  let height = random(40, 80); // 隨機高度，範圍為 40 到 80
  for (let i = 0; i <= segments; i++) {
    seaweedLine.push({
      x: width / 2, // 水草的水平位置 (畫布中央)
      y: height - (i * height / segments), // 每段的垂直位置
      swaySpeed: map(i, 0, segments, 0.01, 0.05), // 搖晃速度越靠近底部越慢
      swayRange: map(i, 0, segments, 5, 20) // 搖晃幅度越靠近底部越小
    });
  }
}

function draw() { // 畫圖
  background(0); // 背景顏色設為黑色

  // 繪製每條水草
  for (let seaweed of seaweeds) {
    let baseSway = sin(frameCount * seaweed.swaySpeed) * seaweed.swayRange; // 基本搖動
    let segments = 10; // 將水草分成 10 段
    let segmentHeight = seaweed.height / segments; // 每段的高度

    fill(seaweed.color); // 設定水草的填充顏色
    noStroke(); // 移除邊框

    beginShape(); // 開始繪製水草形狀

    // 繪製左側的頂點（使用 curveVertex 讓曲線更平滑）
    curveVertex(seaweed.x + baseSway, height); // 起始點
    for (let j = 1; j <= segments; j++) {
      let sway = sin(frameCount * seaweed.swaySpeed + j * 0.8) * (seaweed.swayRange / (j + 0.3));
      let currentX = seaweed.x + baseSway + sway; // 當前段的 x
      let currentY = height - j * segmentHeight; // 當前段的 y
      curveVertex(currentX, currentY); // 添加曲線頂點
    }

    // 繪製右側的頂點（對稱，使用 curveVertex）
    for (let j = segments; j >= 1; j--) {
      let sway = sin(frameCount * seaweed.swaySpeed + j * 0.8) * (seaweed.swayRange / (j + 0.3));
      let currentX = seaweed.x + baseSway + sway + seaweed.thickness; // 當前段的 x（右側偏移）
      let currentY = height - j * segmentHeight; // 當前段的 y
      curveVertex(currentX, currentY); // 添加曲線頂點
    }
    curveVertex(seaweed.x + baseSway + seaweed.thickness, height); // 結束點

    endShape(CLOSE); // 結束繪製水草形狀
  }

  // 繪製單條水草
  stroke(255); // 設定水草顏色為白色
  strokeWeight(10); // 設定水草的粗細為 10
  noFill(); // 不填充

  beginShape(); // 開始繪製水草形狀
  for (let i = 0; i < seaweedLine.length; i++) {
    let sway = sin(frameCount * seaweedLine[i].swaySpeed) * seaweedLine[i].swayRange; // 計算搖晃
    let x = seaweedLine[i].x + sway; // 當前段的 x
    let y = height - i * (height / seaweedLine.length); // 修正 y 值，確保水草從底部向上延伸
    curveVertex(x, y); // 添加曲線頂點
  }
  endShape(); // 結束繪製水草形狀
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算水草的水平位置
  for (let seaweed of seaweeds) {
    seaweed.x = random(width); // 根據新的畫布寬度重新設定 x 位置
  }
}