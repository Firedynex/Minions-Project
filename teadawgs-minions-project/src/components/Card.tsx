interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const Card = ({ children, className = "" }: CardProps) => {
    return (
      <div className={`shadow-lg rounded-lg ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;