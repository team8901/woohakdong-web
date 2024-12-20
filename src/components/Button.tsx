import LoadingSpinner from '@components/LoadingSpinner';

type ButtonProps = {
  text: string;
  textColor?: string;
  bgColor?: string;
  fontSize?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

const Button = ({
  text,
  textColor = 'white',
  bgColor = 'var(--color-primary)',
  fontSize = '1.8rem',
  icon,
  onClick,
  disabled = false,
  isLoading = false,
  className,
}: Readonly<ButtonProps>) => {
  return (
    <button
      className={`round-[20px] flex h-[52px] w-full items-center justify-center rounded-[14px] font-semiBold ${className}`}
      style={{
        fontSize,
        color: textColor,
        backgroundColor: disabled || isLoading ? 'var(--color-lightGray)' : bgColor,
      }}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex items-center gap-[11px]">
          {icon}
          <span>{text}</span>
        </div>
      )}
    </button>
  );
};

export default Button;
