export function useTaskCardHandlers(
  id: string,
  onClick?: (id: string) => void,
  onDragStart?: (e: React.DragEvent, id: string) => void
) {
  const handleClick = () => {
    onClick?.(id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart?.(e, id);
  };

  return {
    handleClick,
    handleDragStart
  };
}