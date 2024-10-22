import { TextProps } from '@components/Title1';

const Body1 = ({ text, className }: Readonly<TextProps>) => {
  return <span className={`font-semiBold leading-[2.2rem] ${className}`}>{text}</span>;
};

export default Body1;
