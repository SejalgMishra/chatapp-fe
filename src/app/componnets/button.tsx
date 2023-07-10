import clsx from "clsx";

interface props {
  text: string;
  className:string,
  onclick : any,
  disabled : any

}
const Button = ({ text , className,onclick ,disabled}: props) => {
  return (
    <div>
      <button type="submit" onClick={onclick} disabled={disabled} className={clsx("bg-black text-white text-base hover:bg-slate-950 hover:text-white w-96 p-2",{
        [className] : !!className
      })}>{text}</button>
    </div>
  );
};

export default Button;
