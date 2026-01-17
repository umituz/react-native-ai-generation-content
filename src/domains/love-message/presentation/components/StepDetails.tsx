/**
 * StepDetails Component
 */

import React from "react";
import { View } from "react-native";
import { DetailsInput } from "./DetailsInput";

interface StepDetailsProps {
  details: string;
  setDetails: (text: string) => void;
}

export const StepDetails: React.FC<StepDetailsProps> = ({
  details,
  setDetails,
}) => {
  return (
    <View>
      <DetailsInput value={details} onChangeText={setDetails} />
    </View>
  );
};
