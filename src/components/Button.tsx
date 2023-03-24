type ButtonProps = {
  text: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
};
export const Button = ({ text, onClick, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className='border-2 p-3 border-blue-500 hover:bg-blue-500 hover:text-white rounded'
      onClick={onClick}
    >
      {text}
    </button>
  );
};
