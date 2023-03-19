import { BOT_TRAINING_ORDER } from "#/lib/constants/settings";
import {
  Bot,
  BotTraining,
  BotTrainingMap,
  CmsMultiRelation,
  CmsSingleRelation,
} from "#/lib/types/cms";

export const getManyTrainingContents = (
  trainings?: CmsMultiRelation<BotTraining>,
): (string | null)[] => {
  if (!trainings?.data) return [];
  try {
    const { data } = trainings;

    return data.map((training) => (!!training ? training.attributes.content : null));
  } catch (error) {
    console.error("Could not parse bot relation data");
  }
  return [];
};

export const getTrainingContent = (training?: CmsSingleRelation<BotTraining>): string | null => {
  if (!training) return null;
  try {
    const content = training?.data?.attributes?.content || null;
    return content;
  } catch (error) {
    console.error("Could not parse bot relation data");
  }
  return null;
};

export const collateBotTraining = (bot: Bot): string => {
  if (!bot) return "";
  const {
    training,
    json_training,
    chat_intention_ids,
    promotion_ids,
    chat_content_ids,
    chat_syntax_ids,
    chat_style_ids,
    chat_user_info_ids,
  } = bot;

  const trainingObject: BotTrainingMap = {
    contents: getManyTrainingContents(chat_content_ids),
    intentions: getManyTrainingContents(chat_intention_ids),
    promotions: getManyTrainingContents(promotion_ids),
    syntax: getManyTrainingContents(chat_syntax_ids),
    styles: getManyTrainingContents(chat_style_ids),
    userInfo: getManyTrainingContents(chat_user_info_ids),
    training,
    json_training: !!json_training ? JSON.stringify(json_training) : "",
  };

  // Control the order of the prompt by arranging BOT_TRAINING_ORDER
  const trainingArray = BOT_TRAINING_ORDER.map((item) => trainingObject[item]).flat();
  const trainingInstructions = trainingArray.filter(Boolean);
  const nameInstruction = `Your name is ${bot.name}.`;
  const result = [nameInstruction, ...trainingInstructions].join(" ");

  return result;
};
