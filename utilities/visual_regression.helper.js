const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch').default;
const { PNG } = require('pngjs');

async function compareScreenshot(driver, imageName, maxDiffPercent = 1) {
    const baselineDir = path.join('visual_regression', 'baseline');
    const currentDir = path.join('visual_regression', 'current');
    const diffDir = path.join('visual_regression', 'diff');

    [currentDir, baselineDir, diffDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    const baselinePath = path.join(baselineDir, imageName + '.png');
    const currentPath = path.join(currentDir, imageName + '.png');
    const diffPath = path.join(diffDir, imageName + '.png');

    const screenshot = await driver.takeScreenshot();
    const imgBuffer = Buffer.from(screenshot, 'base64');
    fs.writeFileSync(currentPath, imgBuffer);

    if (!fs.existsSync(baselinePath)) {
        fs.copyFileSync(currentPath, baselinePath);
        return;
    }
}