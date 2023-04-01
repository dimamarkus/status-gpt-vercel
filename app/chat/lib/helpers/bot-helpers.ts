import { OpenAiRequest } from "#/app/chat/lib/types";
import { BOT_TRAINING_ORDER, DEFAULT_GPT_SETTINGS } from "#/lib/constants/settings";
import {
  Bot,
  BotPromotion,
  BotTraining,
  BotTrainingMap,
  BotTrigger,
  CmsMultiRelation,
  CmsSingleRelation,
} from "#/lib/types/cms";

export const getBotParam = (bot: Bot | null, param: keyof Omit<OpenAiRequest, "stream" | "n">) =>
  (!!bot && bot[param]) || (DEFAULT_GPT_SETTINGS[param] as number);

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

export const getCustomTriggerContents = (triggers?: BotTrigger[]): (string | null)[] => {
  if (!triggers || triggers?.length < 1) return [];
  try {
    return triggers.map(
      (trigger) => `If the user mentions ${trigger.phrase}, respond with: ${trigger.response}`,
    );
  } catch (error) {
    console.error("Could not parse bot trigger data");
  }
  return [];
};

export const getPromotionTrainingContents = (
  promotions?: CmsMultiRelation<BotPromotion>,
): (string | null)[] => {
  if (!promotions?.data) return [];
  try {
    const { data } = promotions;

    return data.map((promotion) => {
      if (!promotion) return null;
      const {
        attributes: { content, name, category, url },
      } = promotion;
      return `When it makes sense, on the topick of ${category}, you can promote ${name} at ${url} with the following ${content}.`;
    });
  } catch (error) {
    console.error("Could not parse bot promotion data");
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

export const collateBotTraining = (bot: Bot | null): string => {
  if (!bot) return "";
  const {
    training,
    general_training,
    json_training,
    chat_intention_ids,
    promotion_ids,
    chat_content_ids,
    chat_syntax_ids,
    chat_style_ids,
    chat_user_info_ids,
    trigger_ids,
    custom_triggers,
  } = bot;

  const trainingObject: BotTrainingMap = {
    contents: getManyTrainingContents(chat_content_ids),
    intentions: getManyTrainingContents(chat_intention_ids),
    syntax: getManyTrainingContents(chat_syntax_ids),
    styles: getManyTrainingContents(chat_style_ids),
    userInfo: getManyTrainingContents(chat_user_info_ids),
    triggers: getManyTrainingContents(trigger_ids),
    promotions: getPromotionTrainingContents(promotion_ids),
    custom_triggers: getCustomTriggerContents(custom_triggers),
    general_training,
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
