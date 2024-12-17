figma.showUI(__html__);
figma.ui.resize(800, 500);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-globe') {
    const countryNodes = [];
    const userNodes = [];
    let countryData = msg.data[0].countryData;
    let userData = msg.data[0].userData.filter((x) => x.d !== null);
    for (let i = 0; i < countryData.length; i++) {
      let node: VectorNode = figma.createVector();
      try {
        if (countryData[i].countryName === 'graticule') {
          node.vectorPaths = [
            {
              windingRule: 'NONE',
              data: countryData[i].d
                .replaceAll('Z', ' Z ')
                .replaceAll(',', ' ')
                .replaceAll('M', ' M ')
                .replaceAll('L', ' L ')
                .trim(),
            },
          ];
        } else {
          node.vectorPaths = [
            {
              windingRule: 'NONE',
              data: countryData[i].d
                .replaceAll('Z', ' Z ')
                .replaceAll(',', ' ')
                .replaceAll('M', 'M ')
                .replaceAll('L', ' L ')
                .trim(),
            },
          ];
        }

        node.name = countryData[i].countryName;

        if (msg.selectedCountries.includes(countryData[i].countryName)) {
          node.fills = [{ type: 'SOLID', color: hexToFigmaPaint(msg.data[0].colors.selectedCountry) }];
          node.strokes = [{ type: 'SOLID', color: hexToFigmaPaint(msg.data[0].colors.countryOutline) }];
        } else if (countryData[i].countryName === 'graticule') {
          node.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, visible: false }];
          node.strokes = [{ type: 'SOLID', color: hexToFigmaPaint(msg.data[0].colors.graticule), opacity: 0.2 }];
        } else if (countryData[i].countryName === 'ocean') {
          node.fills = [{ type: 'SOLID', color: hexToFigmaPaint(msg.data[0].colors.oceanFill) }];
          node.strokes = [{ type: 'SOLID', color: hexToFigmaPaint(msg.data[0].colors.graticule) }];
        } else if (countryData[i].countryName === 'gradient') {
          node.fills = [
            {
              type: 'GRADIENT_RADIAL',
              gradientTransform: [
                [1, 0, 0],
                [0, 1, 0],
              ],
              gradientStops: [
                { color: { r: 0, g: 0, b: 0, a: 0.0 }, position: 0.6 },
                { color: { r: 0, g: 0, b: 0, a: 0.2 }, position: 1 },
              ],
            },
          ];
          node.strokes = [{ type: 'SOLID', color: hexToFigmaPaint(msg.data[0].colors.graticule) }];
        } else {
          node.fills = [{ type: 'SOLID', color: hexToFigmaPaint(msg.data[0].colors.countryFill) }];
          node.strokes = [{ type: 'SOLID', color: hexToFigmaPaint(msg.data[0].colors.countryOutline) }];
        }

        countryNodes.push(node);
      } catch (error) {
        console.log(error, countryData[i].d);
      }
    }

    for (let i = 0; i < userData.length; i++) {
      try {
        if (userData[i].type === 'geoCircle') {
          let node: VectorNode = figma.createVector();

          node.vectorPaths = [
            {
              windingRule: 'NONE',
              data: userData[i].d
                .replaceAll('Z', ' Z ')
                .replaceAll(',', ' ')
                .replaceAll('M', ' M ')
                .replaceAll('L', ' L ')
                .trim(),
            },
          ];
          node.name = 'datapoint';
          node.fills = [{ type: 'SOLID', color: hexToFigmaPaint(userData[i].fill) }];
          node.strokes = [{ type: 'SOLID', color: hexToFigmaPaint(userData[i].stroke) }];
          userNodes.push(node);
        } else {
          let ellipse: EllipseNode = figma.createEllipse();
          console.log(userData[i]);
          ellipse.x = userData[i].x;
          ellipse.y = userData[i].y;
          ellipse.resize(userData[i].r * 2, userData[i].r * 2);
          ellipse.fills = [{ type: 'SOLID', color: hexToFigmaPaint(userData[i].fill) }];
          ellipse.strokes = [{ type: 'SOLID', color: hexToFigmaPaint(userData[i].stroke) }];
          userNodes.push(ellipse);
        }
      } catch (error) {
        console.log(error, userData[i]);
      }
    }

    let groupCountry = figma.group(countryNodes, figma.currentPage);
    groupCountry.name = 'Map';
    // let groupData = figma.group(userNodes, figma.currentPage);

    if (userNodes.length > 1) {
      let bigGroup = figma.group(userNodes, groupCountry);
      bigGroup.name = 'Datapoints';
    }

    // figma.currentPage.selection = countryNodes;
    figma.viewport.scrollAndZoomIntoView(countryNodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    });
  }

  figma.closePlugin();
};

function hexToFigmaPaint(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}
