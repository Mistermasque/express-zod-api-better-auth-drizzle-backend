type SomeOf<T> = T[keyof T];

/** get /api/user/current */
type GetApiUserCurrentInput = {};

/** get /api/user/current */
type GetApiUserCurrentPositiveVariant1 = {
  status: "success";
  data: {};
};

/** get /api/user/current */
interface GetApiUserCurrentPositiveResponseVariants {
  200: GetApiUserCurrentPositiveVariant1;
}

/** get /api/user/current */
type GetApiUserCurrentNegativeVariant1 = {
  status: "error";
  error: {
    message: string;
  };
};

/** get /api/user/current */
interface GetApiUserCurrentNegativeResponseVariants {
  400: GetApiUserCurrentNegativeVariant1;
}

/** head /api/user/current */
type HeadApiUserCurrentInput = {};

/** head /api/user/current */
type HeadApiUserCurrentPositiveVariant1 = undefined;

/** head /api/user/current */
interface HeadApiUserCurrentPositiveResponseVariants {
  200: HeadApiUserCurrentPositiveVariant1;
}

/** head /api/user/current */
type HeadApiUserCurrentNegativeVariant1 = {
  status: "error";
  error: {
    message: string;
  };
};

/** head /api/user/current */
interface HeadApiUserCurrentNegativeResponseVariants {
  400: HeadApiUserCurrentNegativeVariant1;
}

export type Path = "/api/user/current";

export type Method = "get" | "post" | "put" | "delete" | "patch" | "head";

export interface Input {
  "get /api/user/current": GetApiUserCurrentInput;
  "head /api/user/current": HeadApiUserCurrentInput;
}

export interface PositiveResponse {
  "get /api/user/current": SomeOf<GetApiUserCurrentPositiveResponseVariants>;
  "head /api/user/current": SomeOf<HeadApiUserCurrentPositiveResponseVariants>;
}

export interface NegativeResponse {
  "get /api/user/current": SomeOf<GetApiUserCurrentNegativeResponseVariants>;
  "head /api/user/current": SomeOf<HeadApiUserCurrentNegativeResponseVariants>;
}

export interface EncodedResponse {
  "get /api/user/current": GetApiUserCurrentPositiveResponseVariants &
  GetApiUserCurrentNegativeResponseVariants;
  "head /api/user/current": HeadApiUserCurrentPositiveResponseVariants &
  HeadApiUserCurrentNegativeResponseVariants;
}

export interface Response {
  "get /api/user/current":
  | PositiveResponse["get /api/user/current"]
  | NegativeResponse["get /api/user/current"];
  "head /api/user/current":
  | PositiveResponse["head /api/user/current"]
  | NegativeResponse["head /api/user/current"];
}

export type Request = keyof Input;
