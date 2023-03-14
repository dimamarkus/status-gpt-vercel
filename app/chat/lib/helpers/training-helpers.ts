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
    training_json,
    chat_intention_ids,
    promotion_ids,
    chat_content_ids,
    chat_syntax_id,
    chat_style_id,
    chat_user_info_ids,
  } = bot;

  // Control the order of the prompt by arranging this order
  const trainingObject: BotTrainingMap = {
    contents: getManyTrainingContents(chat_content_ids),
    intentions: getManyTrainingContents(chat_intention_ids),
    promotions: getManyTrainingContents(promotion_ids),
    userInfo: getManyTrainingContents(chat_user_info_ids),
    syntax: getTrainingContent(chat_syntax_id),
    style: getTrainingContent(chat_style_id),
    training,
    training_json: JSON.stringify(training_json),
  };

  const trainingArray = BOT_TRAINING_ORDER.map((item) => trainingObject[item]).flat();
  const filteredArray = trainingArray.filter(Boolean);
  const result = filteredArray.join(" ");

  return result;
};
