import clsx from "clsx";

interface props {
  text: string;
  className:string,
}
const Button = ({ text , className }: props) => {
  return (
    <div>
      <button type="submit" className={clsx("bg-black text-white text-base hover:bg-slate-950 hover:text-white w-96 p-2",{
        [className] : !!className
      })}>{text}</button>
    </div>
  );
};

export default Button;
