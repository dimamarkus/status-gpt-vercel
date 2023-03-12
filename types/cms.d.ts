// ============================================================================
//  BASE
// ============================================================================
type StrapiOperator =
  | "$eq"
  | "$eqi"
  | "$ne"
  | "$lt"
  | "$lte"
  | "$gt"
  | "$gte"
  | "$in"
  | "$notIn"
  | "$contains"
  | "$notContains"
  | "$containsi"
  | "$notContainsi"
  | "$null"
  | "$notNull"
  | "$between"
  | "$startsWith"
  | "$startsWithi"
  | "$endsWith"
  | "$endsWithi"
  | "$or"
  | "$and"
  | "$no";

type SchemaUID = string;
export type CmsUID = SchemaUID;
export type CmsResources = "bots" | "articles";

interface StrapiSingleResponse<T extends StrapiResource> extends Response {
  data: T;
  meta: {}; // Pagination state, locaels, publication state, etc
  error?: {}; // Error message
}

interface StrapiArrayResponse<T extends StrapiResource> extends StrapiSingleResponse, Response {
  data: T[];
}

export type StrapiResponse<T> = StrapiSingleResponse<T> | StrapiArrayResponse<T>;

// CMS is currently Strapi but should be able to be switched out to anything using this interface
export interface CmsResponse<T> extends Response, StrapiResponse<T> {}

// ============================================================================
//  SCHEMA
// ============================================================================

export type BaseStrapiResource = {
  id: SchemaUID;
  meta: {};
};

//  BOTS
// ============================================================================

export type Bot = BaseStrapiResource & {
  attributes: {
    slug: string;
    name: string;
    avatar: MediaAttribute;
    welcome_message: string | null;
    training: JSONAttribute;
    ai_model: OpenAiModel;
    max_tokens: number | null;
    temperature: number | null;
    top_p: number | null;
    frequency_penalty: number | null;
    presence_penalty: number | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    createdBy: SchemaUID;
  };
};

// TODO
export type Article = BaseStrapiResource & {
  attributes: {
    title: string;
  };
};

export type StrapiResource = Bot | Article;
