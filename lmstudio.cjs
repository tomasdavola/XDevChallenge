// index.js
const { LMStudioClient } = require("@lmstudio/sdk");

const fs = require('fs');
function readFileAsString(filePath) {
    try {
        // Read the file synchronously
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return fileContent;
    } catch (err) {
        // Handle errors such as file not found
        console.error("Error reading file:", err);
        return null;
    }
}



async function main() {
    // Create a client to connect to LM Studio, then load a model
    const client = new LMStudioClient();
    const model = await client.llm.load("NousResearch/Hermes-2-Pro-Mistral-7B-GGUF/Hermes-2-Pro-Mistral-7B.Q3_K_L.gguf");

    // Predict!
    const prediction = model.respond([
        { role: "system", content: readFileAsString("train.txt")},

        { role: "user", content: "Do you understand?" },
        // { role: "user", content: "Is the following a scam or not, please reply with just a confidence interval from 0 to 1: There are still 111 Bears left to mint due to\n" +
        //         // "some errors in the minting contract.\n" +
                // "This is your LAST chance to mint a Bear.\n" +
                // "Post-Sale Info:\n" +
                // "- Bears left to mint: 111\n" +
                // "- Price per Bear: 10 SOL\n" +
                // "Magic Eden Post-Sale:\n" +
                // "linktr.ee/okaybears\n" +
                // "WE ARE Okay\n" },
        { role: "user", content: "Is the following a scam or not, please reply with just a confidence interval from 0 to 1: BREAKING: NASA Engineer Reveals Propellantless Propulsion Breakthrough 🚀\n" +
                "\n" +
                "Dr. Charles Buhler, a NASA engineer and co-founder of Exodus Propulsion Technologies, announced that his company's propellantless propulsion drive has generated enough thrust to counteract Earth's gravity. \n" +
                "\n" +
                "The discovery of this new force, which seems to defy known laws of physics, is revolutionary. Electric fields alone can generate a sustainable force onto an object, enabling center-of-mass translation without expelling mass.\n" +
                "\n" +
                "#NASA #PropulsionBreakthrough #NewForce #SpaceTechnology"}

    ]);
    for await (const text of prediction) {
        process.stdout.write(text);
    }
}

main();