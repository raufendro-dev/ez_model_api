const {
    quicktype,
    InputData,
    jsonInputForTargetLanguage
  } = require("quicktype-core")

  module.exports = getModel;

  async function getModel(targetLanguage, typeName, jsonString) {
    let modelresp;
    const jsonInput = jsonInputForTargetLanguage(targetLanguage);
    await jsonInput.addSource({
        name: typeName,
        samples: [jsonString]
    });

    const inputData = new InputData();
    inputData.addInput(jsonInput);

    let a= await quicktype({
        inputData,
        lang: targetLanguage
    });

    modelresp=a['lines']
    return modelresp;

}