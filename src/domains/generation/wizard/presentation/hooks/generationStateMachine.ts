export type GenerationStatus = "IDLE" | "PREPARING" | "GENERATING" | "ERROR" | "COMPLETED";

export interface GenerationState {
  status: GenerationStatus;
  error?: string;
}

export type GenerationAction =
  | { type: "START_PREPARATION" }
  | { type: "START_GENERATION" }
  | { type: "COMPLETE" }
  | { type: "ERROR"; error: string }
  | { type: "RESET" };

export const generationReducer = (
  state: GenerationState,
  action: GenerationAction,
): GenerationState => {
  switch (action.type) {
    case "START_PREPARATION":
      return { status: "PREPARING" };
    case "START_GENERATION":
      return { status: "GENERATING" };
    case "COMPLETE":
      return { status: "COMPLETED" };
    case "ERROR":
      return { status: "ERROR", error: action.error };
    case "RESET":
      return { status: "IDLE" };
    default:
      return state;
  }
};

export const INITIAL_STATE: GenerationState = { status: "IDLE" };
