const questions = {
  main: {
    typeGeneration: {
      type: 'select',
      name: 'type',
      message: 'Selecciona el tipo de archivo/directorio que deseas crear:',
      choices: ['section'],
    },
  },
  section: {
    setNameSection: {
      type: 'input',
      name: 'nameSection',
      message: `Nombre/handle de section:`,
    },
    setPlaceSection: {
      type: 'select',
      name: 'placeSection',
      message: 'Selecciona un directorio:',
      choices: ['homepage', 'page'],
    },
    generationFiles: [
      {
        type: 'toggle',
        name: 'generateLiquid',
        message: 'Generar Liquid:',
        initial: 'true',
        enabled: 'Si',
        disabled: 'No',
      },
      {
        type: 'toggle',
        name: 'generateCss',
        message: 'Generar Css:',
        initial: 'true',
        enabled: 'Si',
        disabled: 'No',
      },
      {
        type: 'toggle',
        name: 'generateJavascript',
        message: 'Generar Javascript:',
        initial: 'true',
        enabled: 'Si',
        disabled: 'No',
      },
    ],
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = questions
}
