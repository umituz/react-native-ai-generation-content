/**
 * Default Image Processing Modes
 * Pre-configured modes for common image processing tasks
 * Apps can use these defaults or provide their own configurations
 */

import type { ImageProcessingMode, ModeCatalog, ModeConfig } from "../entities/processing-modes.types";

export const DEFAULT_PROCESSING_MODES: ModeCatalog = {
    clean_white: {
        id: "clean_white",
        icon: "square",
        cost: 1,
        premium: false,
        requiresPrompt: false,
        aiPrompt: `Replace the background with a clean, pure white background.
Keep the subject perfectly intact with professional edges.
Add subtle shadows beneath the subject for a grounded look.
This should look like a professional product or portrait photo.`,
    },
    portrait_blur: {
        id: "portrait_blur",
        icon: "person",
        cost: 1,
        premium: false,
        requiresPrompt: false,
        aiPrompt: `Create a professional portrait with a beautifully blurred background (bokeh effect).
Keep the subject in sharp focus with clean edges.
The background should have a soft, creamy blur similar to f/1.4 depth of field.
Maintain natural skin tones and lighting on the subject.`,
    },
    creative_scene: {
        id: "creative_scene",
        icon: "image",
        cost: 2,
        premium: false,
        requiresPrompt: true,
        aiPrompt: `Transform this image by placing the subject in a new creative scene.
The subject must remain completely unchanged - same pose, expression, clothing.
Seamlessly blend the subject into the new background with matched lighting.
Create a professional, realistic composite that looks natural.`,
    },
    transparent: {
        id: "transparent",
        icon: "remove-circle",
        cost: 1,
        premium: false,
        requiresPrompt: false,
        aiPrompt: `Remove the background completely from this image. 
Keep the main subject perfectly intact with clean edges. 
Output should have a transparent or solid white background.
Maintain all original details, colors, and lighting on the subject.`,
    },
    enhance: {
        id: "enhance",
        icon: "sparkles",
        cost: 2,
        premium: false,
        requiresPrompt: false,
        aiPrompt: `Enhance this image with professional quality improvements.
Improve lighting, color balance, and overall image quality.
Remove any imperfections while maintaining natural appearance.
The result should look professionally retouched but realistic.`,
    },
    remove_object: {
        id: "remove_object",
        icon: "trash",
        cost: 2,
        premium: true,
        requiresPrompt: true,
        aiPrompt: `Remove unwanted objects from this image.
Fill the removed areas with appropriate background content.
The result should look natural with no visible artifacts.
Maintain the overall composition and quality of the image.`,
    },
    replace_object: {
        id: "replace_object",
        icon: "swap-horizontal",
        cost: 3,
        premium: true,
        requiresPrompt: true,
        aiPrompt: `Replace the specified object in this image with a new one.
The replacement should blend naturally with the scene.
Match the lighting, perspective, and style of the original.
Ensure the result looks realistic and professionally edited.`,
    },
    relight: {
        id: "relight",
        icon: "sunny",
        cost: 2,
        premium: true,
        requiresPrompt: true,
        aiPrompt: `Relight this image with professional studio lighting.
Apply dramatic, flattering light that enhances the subject.
Add subtle shadows and highlights for depth and dimension.
The result should look like a professional studio photograph.`,
    },
};

/**
 * Get mode configuration by ID
 * Returns default transparent mode if not found
 */
export const getModeConfig = (
    mode: string,
    customModes?: ModeCatalog
): ModeConfig => {
    const modes = customModes || DEFAULT_PROCESSING_MODES;
    const key = mode.replace("-", "_") as ImageProcessingMode;
    return modes[key] || DEFAULT_PROCESSING_MODES.transparent;
};

/**
 * Filter modes by premium status
 */
export const getFreeModes = (modes: ModeCatalog = DEFAULT_PROCESSING_MODES): ModeCatalog => {
    return Object.fromEntries(
        Object.entries(modes).filter(([, config]) => !config.premium)
    );
};

/**
 * Filter modes by premium status
 */
export const getPremiumModes = (modes: ModeCatalog = DEFAULT_PROCESSING_MODES): ModeCatalog => {
    return Object.fromEntries(
        Object.entries(modes).filter(([, config]) => config.premium)
    );
};

/**
 * Get modes that require custom prompts
 */
export const getPromptRequiredModes = (modes: ModeCatalog = DEFAULT_PROCESSING_MODES): ModeCatalog => {
    return Object.fromEntries(
        Object.entries(modes).filter(([, config]) => config.requiresPrompt)
    );
};
