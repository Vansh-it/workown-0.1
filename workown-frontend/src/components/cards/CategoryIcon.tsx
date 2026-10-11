import {
  Wrench, Zap, BookOpen, Sparkles, Hammer, Leaf, PaintRoller, Truck, Scissors, ChefHat, Car, Camera, HardHat, type LucideProps,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Wrench, Zap, BookOpen, Sparkles, Hammer, Leaf, PaintRoller, Truck, Scissors, ChefHat, Car, Camera, HardHat,
};

export function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = CATEGORY_ICONS[name] ?? Wrench;
  return <Icon {...props} />;
}
