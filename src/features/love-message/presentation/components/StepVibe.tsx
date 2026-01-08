/**
 * StepVibe Component
 */

import React from "react";
import { View } from "react-native";
import { MessageType, MessageTone } from "../../domain/types";
import { TypeSelector } from "./TypeSelector";
import { ToneSelector } from "./ToneSelector";

interface StepVibeProps {
  selectedType: MessageType;
  setSelectedType: (type: MessageType) => void;
  selectedTone: MessageTone;
  setSelectedTone: (tone: MessageTone) => void;
}

export const StepVibe: React.FC<StepVibeProps> = ({
  selectedType,
  setSelectedType,
  selectedTone,
  setSelectedTone,
}) => {
  return (
    <View>
      <TypeSelector selectedType={selectedType} onSelectType={setSelectedType} />
      <ToneSelector selectedTone={selectedTone} onSelectTone={setSelectedTone} />
    </View>
  );
};
