import { OpenAiModel } from "#/app/chat/lib/types";
import {
  BaseStrapiResource,
  SchemaUID,
  StrapiArrayResponse,
  StrapiMedia,
  StrapiMediaAttribute,
  StrapiResponse,
  StrapiSingleResponse,
  StrapiTimestamps,
} from "#/lib/types/strapi";
import { ButtonTheme } from "#/ui/_base/BaseButton/BaseButton";

// The CMS is currently Strapi but should be able to be switched out to anything using this interface
// No one outside of this file should know what Strapi is
export type BaseCmsResource<Type extends Record<string, unknown>> = BaseStrapiResource<Type>;
export type CmsResponse<TResource extends CmsResource> = Response & StrapiResponse<TResource>;

export type CmsSingleRelation<Type extends CmsResource> = StrapiSingleResponse<Type>;
export type CmsMultiRelation<Type extends CmsResource> = StrapiArrayResponse<Type>;
export type CmsRelation<T extends CmsResource> = CmsSingleRelation<T> | CmsMultiRelation<T>;

// ================================================================================================
//  RESOURCES - BOT
// ================================================================================================
export type CmsResource = Bot | BotTraining | ChatSettings | LandingPage;
export type CmsResourceSlug =
  | "bots"
  | "chat-setting"
  | "landing-pages"
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
  description: string;
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

// ================================================================================================
//  RESOURCES - LANDING PAGE
// ================================================================================================
export type StrapiButton = {
  text: string;
  url: string;
  theme: ButtonTheme;
};

export type StrapiLink = {
  text: string;
  url: string;
};

export type StrapiQuote = {
  title: string;
  body: string;
};

export type SectionAvatar = {
  heading: string;
  subheading: string;
  picture: StrapiMediaAttribute<StrapiMedia>;
};

export type SeoSection = {
  id: number;
  metaTitle: string;
  metaDescription: string;
};

export type HeroSection = {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  cta: StrapiButton;
  __component: "sections.hero-section";
};

export type Blurb = {
  id: number;
  heading: string | null;
  text: string | null;
};

export type CommonSectionTypes = {
  heading: string | null;
  subheading: string | null;
  description: string | null;
};

export type BlurbSection = CommonSectionTypes & {
  id: number;
  __component: "sections.blurb-section";
  blurbs: Blurb[];
};

export type FooterSection = CommonSectionTypes & {
  id: number;
  __component: "sections.footer-section";
  primary_links: StrapiLink[];
  secondary_links: StrapiLink[];
};

export type MediaSection = CommonSectionTypes & {
  id: number;
  __component: "sections.media-section";
  media: StrapiMediaAttribute<StrapiMedia>;
  cta: StrapiButton;
};

export type RichTextSection = CommonSectionTypes & {
  id: number;
  __component: "sections.rich-text-section";
  content: string;
};

export type TeamSection = CommonSectionTypes & {
  id: number;
  __component: "sections.team-section";
  avatars: SectionAvatar[];
};

export type TestimonialsSection = CommonSectionTypes & {
  id: number;
  __component: "sections.testimonials-section";
  quotes: StrapiQuote[];
};

export type PageSection =
  | HeroSection
  | BlurbSection
  | FooterSection
  | MediaSection
  | RichTextSection
  | TeamSection
  | TestimonialsSection;

export type LandingPage = StrapiTimestamps & {
  slug: string;
  title: string;
  hero_section: HeroSection;
  sections: PageSection[];
  seo: SeoSection;
};
