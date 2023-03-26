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
export type CmsResource = Bot | BotTraining | ChatSettings;
export type CmsResourceSlug =
  | "bots"
  | "chat-setting"
  | "promotions" // BotTraining
  | "chat-contents" // BotTraining
  | "chat-styles" // BotTraining
  | "chat-intentions" // BotTraining
  | "chat-user_infos" // BotTraining
  | "chat-syntaxes"; // BotTraining

export type ChatApiHealth = "excellent" | "good" | "fair" | "poor" | "unknown";
export type ChatSettings = {
  default_bot?: string;
  default_suggestions?: JSON;
  default_assumptions?: JSON;
  enable_assumptions?: boolean;
  enable_submissions?: boolean;
  enable_suggestions?: boolean;
  suggestions_request?: string;
  submissions_request?: string;
  global_max_tokens?: number;
  api_health?: ChatApiHealth;
};

export type BotTraining = {
  name: string;
  content: string;
  description?: string;
  bot_ids?: CmsMultiRelation<Bot>;
};

export type BotTrigger = {
  id: number;
  phrase: string;
  response?: string;
};

export type BotPromotion = {
  name: string;
  content: string;
  category?: string;
  url?: string;
  bot_ids?: CmsMultiRelation<Bot>;
};

export type Bot = {
  slug: string;
  name: string;
  avatar?: StrapiMediaAttribute<StrapiMedia>;
  is_featured: boolean;
  welcome_message: string | null;
  training: string;
  general_training: string;
  json_training: JSON;
  model: OpenAiModel;
  max_tokens: number | null;
  temperature: number | null;
  top_p: number | null;
  frequency_penalty: number | null;
  presence_penalty: number | null;
  voice?: string;
  memory: number;
  publishedAt: string;
  createdBy: SchemaUID;
  chat_style_ids?: CmsMultiRelation<BotTraining>;
  chat_syntax_ids?: CmsMultiRelation<BotTraining>;
  chat_intention_ids?: CmsMultiRelation<BotTraining>;
  chat_user_info_ids?: CmsMultiRelation<BotTraining>;
  chat_content_ids?: CmsMultiRelation<BotTraining>;
  promotion_ids?: CmsMultiRelation<BotPromotion>;
  trigger_ids?: CmsMultiRelation<BotTraining>;
  custom_triggers?: BotTrigger[];
};

export type BotTrainingMap = {
  intentions: (string | null)[];
  promotions: (string | null)[];
  contents: (string | null)[];
  userInfo: (string | null)[];
  syntax: (string | null)[];
  styles: (string | null)[];
  triggers: (string | null)[];
  custom_triggers: (string | null)[];
  training: string | null;
  general_training: string | null;
  json_training: string | null;
};
