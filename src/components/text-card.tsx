type TextCardProps = {
  title: string;
  description: string;
};

const TextCard = ({ title, description }: TextCardProps) => {
  return (
    <div className="rounded-2xl border-b-3 border-primary-500 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TextCard;
