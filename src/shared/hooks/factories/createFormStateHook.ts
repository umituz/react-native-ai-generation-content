/**
 * Generic Form State Hook Factory
 * Creates type-safe form state management hooks
 */

import { useState, useCallback, useMemo } from "react";

/**
 * Form state configuration
 */
export interface FormStateConfig<TState, TDefaults> {
  /** Initial state factory */
  createInitialState: (defaults: TDefaults) => TState;
  /** Optional state validator */
  validate?: (state: TState) => void;
}

/**
 * Form actions type - maps state keys to setters
 */
export type FormActions<TState> = {
  [K in keyof TState as `set${Capitalize<string & K>}`]: (value: TState[K]) => void;
} & {
  reset: () => void;
};

/**
 * Form state hook return type
 */
export interface FormStateHookReturn<TState, TActions> {
  state: TState;
  actions: TActions;
}

/**
 * Options for form state hook
 */
export interface FormStateHookOptions<TDefaults> {
  defaults: TDefaults;
}

/**
 * Creates a type-safe form state hook
 * @param config - Form state configuration
 * @returns Form state hook
 *
 * @example
 * ```ts
 * const useMyForm = createFormStateHook({
 *   createInitialState: (defaults) => ({
 *     name: "",
 *     age: defaults.age,
 *   }),
 * });
 *
 * // Usage
 * const { state, actions } = useMyForm({ defaults: { age: 18 } });
 * actions.setName("John");
 * actions.setAge(25);
 * actions.reset();
 * ```
 */
export function createFormStateHook<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TState extends Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TDefaults extends Record<string, any>,
  TActions extends FormActions<TState> = FormActions<TState>
>(
  config: FormStateConfig<TState, TDefaults>
) {
  return function useFormState(
    options: FormStateHookOptions<TDefaults>
  ): FormStateHookReturn<TState, TActions> {
    const { defaults } = options;

    // Validate defaults if validator provided
    const validatedDefaults = useMemo(() => {
      if (config.validate) {
        const initialState = config.createInitialState(defaults);
        config.validate(initialState);
      }
      return defaults;
    }, [defaults]);

    // Create initial state
    const [state, setState] = useState<TState>(() =>
      config.createInitialState(validatedDefaults)
    );

    // Create reset function
    const reset = useCallback(() => {
      setState(config.createInitialState(validatedDefaults));
    }, [validatedDefaults]);

    // Create actions dynamically
    const actions = useMemo(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const actionObj: any = { reset };

      // Generate setter for each state key
      Object.keys(state).forEach((key) => {
        const setterName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        actionObj[setterName] = (value: any) => {
          setState((prev) => ({ ...prev, [key]: value }));
        };
      });

      return actionObj as TActions;
    }, [state, reset]);

    return { state, actions };
  };
}

// Note: createFormStateHookWithIndividualState removed due to type complexity
// and lack of usage. Use createFormStateHook instead which provides the same
// functionality with better type safety.
