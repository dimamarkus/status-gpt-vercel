import { OpenAiModel } from "#/features/chat/openai";
import { CmsResource } from "#/types/cms";

// ================================================================================================
//  SCHEMA
// ================================================================================================

//  Meta
// ============================================================================
export type StrapiOperator =
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

export type SchemaUID = string;

export type StrapiTimestamps = {
  createdAt: string;
  updatedAt: string;
};

//  Base
// ============================================================================
export type StrapiPagiation = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type StrapiResourceAttributes<T extends Record<string, unknown>> = StrapiTimestamps & T;

export type BaseStrapiResource<Type extends Record<string, unknown>> = {
  id: SchemaUID;
  attributes: StrapiResourceAttributes<Type> & StrapiTimestamps;
  meta: {
    pagination?: StrapiPagiation;
  };
};

//  API Response
// ============================================================================
export type StrapiSingleResponse<T extends CmsResource> = Response & {
  data: BaseStrapiResource<T>;
  meta: {}; // Pagination state, locaels, publication state, etc
  error?: {}; // Error message
};

export type StrapiArrayResponse<T extends CmsResource> = StrapiSingleResponse<T> &
  Response & {
    data: BaseStrapiResource<T>[];
  };

export type StrapiResponse<T extends CmsResource> =
  | StrapiSingleResponse<T>
  | StrapiArrayResponse<T>;

//  Media
// ============================================================================

export type StrapiMediaAttribute<TMedia> = {
  data: {
    id: SchemaUID;
    attributes: TMedia;
  };
};
export type StrapiMedia = StrapiTimestamps & {
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
};
