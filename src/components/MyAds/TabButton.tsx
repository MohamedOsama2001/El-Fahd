import { Button } from "@/components/ui/button";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({ isActive, onClick, children }: TabButtonProps) => (
  <Button
    variant={isActive ? "secondary" : "ghost"}
    onClick={onClick}
    className={`w-full cursor-pointer ${isActive ? "bg-white text-red" : "bg-transparent text-foreground"}`}
  >
    {children}
  </Button>
);

export default TabButton;