import { OpenAiModel } from "#/app/chat/lib/openai";
import {
  BaseStrapiResource,
  SchemaUID,
  StrapiArrayResponse,
  StrapiMedia,
  StrapiMediaAttribute,
  StrapiResponse,
  StrapiSingleResponse,
} from "#/lib/types/strapi";

// The CMS is currently Strapi but should be able to be switched out to anything using this interface
// No one outside of this file should know what Strapi is
export type BaseCmsResource<Type extends Record<string, unknown>> = BaseStrapiResource<Type>;
export type CmsResponse<TResource extends CmsResource> = Response & StrapiResponse<TResource>;

export type CmsSingleRelation<Type extends CmsResource> = StrapiSingleResponse<Type>;
export type CmsMultiRelation<Type extends CmsResource> = StrapiArrayResponse<Type>;
export type CmsRelation<T extends CmsResource> = CmsSingleRelation<T> | CmsMultiRelation<T>;

// ================================================================================================
//  RESOURCES
// ================================================================================================
export type CmsResource = Bot | BotTraining;
export type CmsResourceSlug =
  | "bots"
  | "promotions" // BotTraining
  | "chat_contents" // BotTraining
  | "chat_styles" // BotTraining
  | "chat_intentions" // BotTraining
  | "chat_user_infos" // BotTraining
  | "chat-syntaxes"; // BotTraining

export type BotTraining = {
  name: string;
  content: string;
  description?: string;
  bot_ids?: CmsMultiRelation<Bot>;
};

export type Bot = {
  slug: string;
  name: string;
  avatar?: StrapiMediaAttribute<StrapiMedia>;
  welcome_message: string | null;
  training: string;
  json_training: JSON;
  model: OpenAiModel;
  max_tokens: number | null;
  temperature: number | null;
  top_p: number | null;
  frequency_penalty: number | null;
  presence_penalty: number | null;
  publishedAt: string;
  createdBy: SchemaUID;
  chat_style_id?: CmsSingleRelation<BotTraining>;
  chat_syntax_id?: CmsSingleRelation<BotTraining>;
  chat_intention_ids?: CmsMultiRelation<BotTraining>;
  chat_user_info_ids?: CmsMultiRelation<BotTraining>;
  chat_content_ids?: CmsMultiRelation<BotTraining>;
  promotion_ids?: CmsMultiRelation<BotTraining>;
};

export type BotTrainingMap = {
  intentions: (string | null)[];
  promotions: (string | null)[];
  contents: (string | null)[];
  userInfo: (string | null)[];
  syntax: string | null;
  style: string | null;
  training: string | null;
  json_training: string | null;
};
