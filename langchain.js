// ls__283ae37e351d47eea207b09257e5c09a


process.env.LANGCHAIN_API_KEY = "";
process.env.OPENAI_API_KEY = "";
import {
    ChatPromptTemplate,
    FewShotChatMessagePromptTemplate,
    FewShotPromptTemplate,

} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({});
const examples = [
    {
        input: "Is this a scam: To celebrate our recent Merch drop,\n" +
            "we decided to drop more APE to the\n" +
            "NFT community!\n" +
            "• All active NFT traders / Holders can\n" +
            "participate\n" +
            "• Claimable APE amount is based on\n" +
            "ETH wallet activity\n" +
            "• 0.33 ETH fee for non Holders/\n" +
            "Traders\n" +
            "More info at:\n" +
            "boredape",
        output: "0.99",
    },
    {
        input: "is this a scam: Launch of Ape Coin has been a big success!\n" +
            "We have collectively decided to airdrop\n" +
            "some more $APE to active NFT Traders/\n" +
            "Holders! If you don't currently own NFTS,\n" +
            "you can claim with a 0.33 ETH fee!\n" +
            "For more details visit:\n" +
            "apecoin\n" +
            "#ApeCoin\n" +
            "$APE\n" +
            "#BAYC #MAYC",
        output: "0.99",
    },
    {
        input: "  🎉 OG Jailbreak is BACK. Out now!\n" +
            "\n" +
            "  Missed the event? Catch replays today and tomorrow\n" +
            "  #Roblox #Jailbreak\n" +
            "\n" +
            "  Play: https://roblox.com/games/606849621/Jailbreak-TODAY",
        output: "0.76",
    },
    {
        input: "This week at NASA:\n" +
            "\n" +
            "   Switzerland, Sweden & Slovenia join the #Artemis Accords for the peaceful exploration of space; PACE studies Earth's oceans and clouds;\n" +
            "   @NASAKennedy\n" +
            "    upgrades in prep for the\n" +
            "   @NASAArtemis\n" +
            "    II Moon mission.\n" +
            "\n" +
            "   For more space in your life: http://nasa.gov/subscribe",
        output: "0.2",
    }];


export async function predict(input) {
    const examplePrompt = ChatPromptTemplate.fromTemplate(`Human: {input}
AI: {output}`);
    const fewShotPrompt = new FewShotChatMessagePromptTemplate({
        prefix:
            "You are a scam detector, your job is to discriminate between scams and not scams, we will show you 10 posts and tell you whether they are a scam or not so you can begin learning:\n",
        suffix: "Human: {input}",
        examplePrompt,
        examples,
        inputVariables: ["input"],
    });
    const formattedPrompt = await fewShotPrompt.format({
        input: input,
    });

    const response = await model.invoke(formattedPrompt);
    const text = response["content"]
    const regex = /\b\d+\.\d{2}\b/;
    const match = text?.match(regex);

    if (match) {
        const number = match[0];
        return number
        console.log(number);
    } else {
        return 0;
    }
}
