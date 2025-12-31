import { useState, useCallback } from "react";
import {
  ScriptSection,
  ScriptGenerationRequest,
} from "../../domain/types/script.types";

export interface UseScriptGeneratorProps {
  readonly onGenerate: (request: ScriptGenerationRequest) => Promise<readonly ScriptSection[] | null>;
  readonly onUseScript?: (script: readonly ScriptSection[]) => void;
  readonly onAuthRequired?: () => void;
}

export interface UseScriptGeneratorReturn {
  readonly isGenerating: boolean;
  readonly generatedScript: readonly ScriptSection[] | null;
  readonly generateScript: (request: ScriptGenerationRequest) => Promise<void>;
  readonly handleUseScript: () => void;
  readonly resetState: () => void;
}

export function useScriptGenerator({
  onGenerate,
  onUseScript,
  onAuthRequired,
}: UseScriptGeneratorProps): UseScriptGeneratorReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<readonly ScriptSection[] | null>(null);

  const generateScript = useCallback(
    async (request: ScriptGenerationRequest) => {
      if (!request.topic.trim()) {
        return;
      }

      if (onAuthRequired) {
        onAuthRequired();
      }

      setIsGenerating(true);

      try {
        const script = await onGenerate(request);

        if (script) {
          setGeneratedScript(script);
        }
      } catch (error) {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.error("Script generation error:", error);
        }
      } finally {
        setIsGenerating(false);
      }
    },
    [onGenerate, onAuthRequired],
  );

  const handleUseScript = useCallback(() => {
    if (generatedScript && onUseScript) {
      onUseScript(generatedScript);
    }
  }, [generatedScript, onUseScript]);

  const resetState = useCallback(() => {
    setGeneratedScript(null);
    setIsGenerating(false);
  }, []);

  return {
    isGenerating,
    generatedScript,
    generateScript,
    handleUseScript,
    resetState,
  };
}
