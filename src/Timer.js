
import './Timer.css';
import React, { useState, useEffect,useRef } from 'react';

const Timer = () => {

  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false); //falso porque en un principio el boton activo va a ser falso, es decir estará inactivo, cuando esté activo quiero que me aparezca la palabra pausa
  const [tipo, setTipo] = useState('Contador');

  function toggle() {
    setActivo(!activo);
  }

  function reset() {
    setSegundos(0);
    setActivo(false);
  }

  function cambioTipo() {
    if(tipo === 'Contador') setTipo('Cuenta Regresiva')
    if(tipo === 'Cuenta Regresiva') setTipo('Contador')
}

const myRef = useRef(null);
function agregaSegundos() {
  // `current` apunta al elemento de entrada de texto montado
  let ref = myRef.current.value
  setSegundos(ref)
}

useEffect(() => {
  let intervalo = null;
  if (activo && tipo === 'Contador') {
    intervalo = setInterval(() => {
      setSegundos(segundos => segundos + 1);
    }, 1000);
  }
  if (activo && tipo === 'Cuenta Regresiva') {
    intervalo = setInterval(() => {
      setSegundos(segundos => segundos - 1);
    }, 1000);
  }
  if (!activo && segundos !== 0 && tipo === 'Contador') {
    clearInterval(intervalo);
  }
  if (segundos === 0 && tipo === 'Cuenta Regresiva') {
    reset();
    clearInterval(intervalo);
  }

  return () => clearInterval(intervalo);
}, [activo, segundos, tipo]);



  return (
    <div className="app">
      <div className="time">
        {segundos}
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${activo ? 'active' : 'inactive'}`} onClick={toggle}> 
       {activo ? 'Pausa' : 'Inicio'} 
        </button> 
        <button className="button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button" onClick={cambioTipo}>
          {tipo}
      </button>
       {tipo === 'Cuenta Regresiva' && <input type="number" ref={myRef} onChange={agregaSegundos} placeholder="Ingresa Segundos" autoComplete="off"/>}
    </div>
  );
};

export default Timer;
//voy a tener en linea 62 un ternario, esto se pregunta si el boton está activo, si es true quiero que diga pausa, si es false quiero que diga inicio, en principio está en inicio porque el estado activo está en false
// pero queremos que el boton tenga la funcion para que cuando aprete el boton este cambie, por eso creamos una funcion toggle para que cuando aprete el boton el estado cambie a lo contrario que yo tengo en ese momento, si está activo que pase a inactivo.
// el tercer estado lo pongo ya que cuando yo aprete el boton contador quiero que pase a cuenta regresiva, ponemos como estado inicial contador
//en el tercer boton ponemos {tipo} para que tome o muestre en pantalla el estado inicial que está tomando en ese momento, pero al igual que antes quiero que al apretar el boton cambie de contador a cuenta regresiva
//armamos una funcion con un IF, si es igual a contador que cambie a cuenta regresiva
//si estoy en contador no quiero que el input de ingresar segundos me aparezca, entonces lo que hacemos en primero preguntar si estoy en cuenta regresiva, si lo estoy entonces muestra todo el input
//Con el reset tambien queremos que al apretar haga algo, por eso creamos una funcion reset que cambie el estado y lo ponga a cero y además pasará el boton de activo a falso para que así me aparezca el boton en INICIO

//USEFFECT

//primero dentro del useffect creamos una funcion set interval, que si activo es true y el tipo es contador entonces ejecutará esa funcion que cada un segundo aumentará los segundos en pantalla, setinterval es una funcion de JS
//Ahora queremos que se pause el contador, para eso, si activo NO está activo, es decir si está en pausa queremos que se pause el contador, para eso usamos clearInterval que tambien es funcion de JS
//el return dentro del useeffect se va a aplicar cuando se DESMONTE el componente, además de eso sirve para que cuando se actualizan los estados gracias a el array de dependencia, si no se hace esa limpieza el segundero empieza acumular segundos y no suma como  orresponde
//En CCUENTA REGRESIVA, tengo que hacer que lo que yo ponga en el input me aparezca en el segundero para eso usamos un nuevo hook llamado useRef
//con la funcion agrega segundos le digo que el estado segundos tiene que ser el que está en myref, ese hook hace que lo que yo ponga en input aparezca en el segundero, luego doy las condiciones necesarias en el useeffect y listo
//reset tambien es funcion de JS