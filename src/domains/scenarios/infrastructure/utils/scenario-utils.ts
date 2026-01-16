/**
 * Scenario Data Utils
 * Helper functions for scenario creation
 */

export const createStoryTemplate = (
  scenarioContext: string,
  futureDescription: string,
): string => {
  return `In {{year}}, {{partnerA}} and {{partnerB}} ${scenarioContext}. ${futureDescription}`;
};
