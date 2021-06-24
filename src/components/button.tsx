import '../styles/button.scss'
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps){
  return (
    <button className="button" {...props} />
  )
}

//export default Button //não recomenda, porque se um dia mudar o nome do componente, a importação não dá erro