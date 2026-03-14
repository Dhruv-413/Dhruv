/**
 * @deprecated Use individual hook files instead:
 * - useTooltip from "./useTooltip"
 * - useDisclosure from "./useDisclosure"
 * - useActiveIndex from "./useActiveIndex"
 * - useExpandedItems from "./useExpandedItems"
 * - useFilter from "./useFilter"
 * - useShowMore from "./useShowMore"
 * 
 * Or import all hooks from "./index"
 */

// Re-export from new individual hook files for backward compatibility
export { useTooltip, type TooltipPosition, type TooltipData } from "./useTooltip";
export { useDisclosure } from "./useDisclosure";
export { useActiveIndex } from "./useActiveIndex";
export { useExpandedItems } from "./useExpandedItems";
export { useFilter } from "./useFilter";
export { useShowMore } from "./useShowMore";
