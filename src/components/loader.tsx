export default function Loader() {
  return (
    <div className="flex h-dvh items-center justify-center space-x-2 border">
      <div className="h-3 w-3 animate-bounce rounded-full bg-primary-500"></div>
      <div className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.3s]"></div>
    </div>
  );
}
