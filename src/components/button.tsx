import {useState} from 'react'

type ButtonProps = {
  text?: string;
  children?: string[];
  // integer?: number;
  // array?: Array<string>;
}

export function Button(){
  // let counter = 0;
  //estado sempre é const mesmo que mude
  //pega um array retornado pelo usestate e divide em duas variaveis isoladas
  const [counter, setCounter] = useState(0);
  function increment(){
    // counter++;
    setCounter(counter + 1);
    // console.log(counter);
  }

  return (
    <button onClick={increment}>{counter}</button>
  )
}

//export default Button //não recomenda, porque se um dia mudar o nome do componente, a importação não dá erro