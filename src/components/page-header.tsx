import { cn } from "@/utils/cn";

type PageHeaderProps = {
  text: string;
  className?: string;
};

const PageHeader = ({ text, className }: PageHeaderProps) => {
  return (
    <h1 className={cn("text-2xl font-medium text-gray-600", className)}>
      {text}
    </h1>
  );
};

export default PageHeader;
