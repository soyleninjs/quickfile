const ac = require('ansi-colors');
const path = require('node:path');
const fs = require('fs-extra');
const {prompt} = require('enquirer');
const questions = require("./questions/questions.js");
const { updateWebkpack, generateFile } = require("./utils/methods.js");
const { toCamelCase, toPascalCase, handleText, formatCamelCase } = require("./utils/utils.js");

async function main() {
  const {typeGeneration} = questions.main
  const {type} = await prompt(typeGeneration);

  switch (type) {
    case 'section':
      await handleSection();
      break;
    case 'snippet':
      // Lógica para manejar 'snippet'
      break;
    case 'template':
      // Lógica para manejar 'template'
      break;
    case 'app':
      // Lógica para manejar 'app'
      break;
    case 'component':
      // Lógica para manejar 'component'
      break;
    default:
      console.log('Opción no válida');
  }
}

async function handleSection() {
  let pathCss = path.join(__dirname, "zrc/styles/sections");
  let pathJs = path.join(__dirname, "zrc/scripts/sections");
  const {setNameSection, setPlaceSection, generationFiles} = questions.section
  const {nameSection} = await prompt(setNameSection);
  const {placeSection} = await prompt(setPlaceSection);
  const {generateLiquid, generateCss, generateJavascript} = await prompt(generationFiles);
  const handleNameSection = handleText(nameSection);
  let handleNamePage = "";

  if (placeSection === "homepage") {
    pathCss = path.join(pathCss, `/homepage/${handleNameSection}`);
    pathJs = path.join(pathJs, `/homepage`);
  }

  if (placeSection === "page") {
    const setNamePage = {
      type: 'input',
      name: 'namePage',
      message: `Nombre/handle de la page:`,
    };
    const {namePage} = await prompt(setNamePage);
    handleNamePage = handleText(namePage);
    pathCss = path.join(pathCss, `/page/${handleNamePage}/${handleNameSection}`);
    pathJs = path.join(pathJs, `/page/${handleNamePage}`);
  }

  console.log(ac.green.bold(`===============================================================`));

  if (generateLiquid) {
    const liquidFile = path.join(__dirname, "templates/section/liquid/template.liquid");
    let liquidTemplate = fs.readFileSync(liquidFile, 'utf8');
    let liquidPath = `sections/${handleNameSection}.liquid`;
    let replaceHandleNameSection = handleNameSection;
    let replaceNameSection = formatCamelCase(handleNameSection);

    if (placeSection === "page") {
      liquidPath = `sections/page-${handleNamePage}-${handleNameSection}.liquid`;
      replaceHandleNameSection = `page-${handleNamePage}-${handleNameSection}`;
      replaceNameSection = formatCamelCase(`${handleNamePage}-${handleNameSection}`);
    }

    liquidTemplate = liquidTemplate.replace(/\[nameSection\]/g, replaceNameSection);
    liquidTemplate = liquidTemplate.replace(/\[handleNameSection\]/g, replaceHandleNameSection);
    generateFile(liquidPath, liquidTemplate);
    console.log(ac.magenta.bold(`*   Archivo Liquid generado en: ${ac.white("sections/")}`));
  }

  if (generateCss) {
    const cssTemplateFile = path.join(__dirname, "templates/section/css/template.css");
    const cssIndexFile = path.join(__dirname, "templates/section/css/index.css");
    const cssResponsiveFile = path.join(__dirname, "templates/section/css/responsive.css");
    let cssTemplate = fs.readFileSync(cssTemplateFile, 'utf8');
    let cssIndex = fs.readFileSync(cssIndexFile, 'utf8');
    let cssResponsive = fs.readFileSync(cssResponsiveFile, 'utf8');
    const cssTemplatePath = `${pathCss}/${handleNameSection}.css`;
    const cssIndexPath = `${pathCss}/index.css`;
    const cssResponsivePath = `${pathCss}/responsive.css`;
    let replaceHandleNameSection = handleNameSection;
    let webpackProperty = `'${replaceHandleNameSection}': getCssSection('homepage/${handleNameSection}')`;

    if (placeSection === "page") {
      replaceHandleNameSection = `page-${handleNamePage}-${handleNameSection}`;
      webpackProperty = `'${replaceHandleNameSection}': getCssSection('page/${handleNamePage}/${handleNameSection}')`;
    }

    cssTemplate = cssTemplate.replace(/\[handleNameSection\]/g, replaceHandleNameSection);
    cssIndex = cssIndex.replace(/\[handleNameSection\]/g, handleNameSection);
    cssResponsive = cssResponsive.replace(/\[handleNameSection\]/g, replaceHandleNameSection);
    generateFile(cssTemplatePath, cssTemplate);
    generateFile(cssIndexPath, cssIndex);
    generateFile(cssResponsivePath, cssResponsive);
    updateWebkpack("css", webpackProperty);
    console.log(ac.cyan.bold(`*   Archivos Css generados en: ${ac.white(`${pathCss.substring(pathCss.indexOf("/zrc"))}`)}`));
  }

  if (generateJavascript) {
    const jsFile = path.join(__dirname, "templates/section/js/template.js");
    let jsTemplate = fs.readFileSync(jsFile, 'utf8');
    const jsPath = `${pathJs}/${handleNameSection}.js`;
    let replaceHandleNameSection = handleNameSection;
    let webpackProperty = `'${replaceHandleNameSection}': getJsSection('homepage/${handleNameSection}')`;

    if (placeSection === "page") {
      replaceHandleNameSection = `page-${handleNamePage}-${handleNameSection}`;
      webpackProperty = `'${replaceHandleNameSection}': getJsSection('page/${handleNamePage}/${handleNameSection}')`;
    }

    jsTemplate = jsTemplate.replace(/\[handleNameSection\]/g, replaceHandleNameSection);
    jsTemplate = jsTemplate.replace(/\[classNameSection\]/g, toPascalCase(replaceHandleNameSection));
    jsTemplate = jsTemplate.replace(/\[camelcaseNameSection\]/g, toCamelCase(replaceHandleNameSection));
    generateFile(jsPath, jsTemplate);
    updateWebkpack("js", webpackProperty);
    console.log(ac.yellow.bold(`*   Archivos Js generados en: ${ac.white(`${pathJs.substring(pathJs.indexOf("/zrc"))}`)}`));
  }

  console.log(ac.green.bold(`===============================================================`));
}

main();
