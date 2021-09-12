import { IBeneficiary } from '../Classes/Beneficiary.interface';
import { IClassroom } from '../Classes/Classroom.interface';
import getLinkAddress from './getLinkAddress';
import timeLocale from './timeLocale';

const emailModel = (room?: IClassroom, benf?: IBeneficiary): string => {
  const happySalutes = [
    'Felicidades',
    'Enhorabuena',
    'Estupendo',
    'Maravilloso',
    'Genial',
    'Fantabuloso',
    'Macanudo',
    'Sensacional',
  ];

  const randomMessage = () => {
    const randomNumber = Math.floor(Math.random() * (happySalutes.length + 0)) + 0;
    return happySalutes[randomNumber];
  };

  const styles = {
    paper: `
        background-color:White;
        border-radius:20px;
        border:solid 2px Gray;
        padding:20px;
        margin:auto;
        max-width:600px;
        `,
    alert: `
        background:PapayaWhip;
        padding:10px;
        margin:auto;
        max-width:400px;

        border-radius:20px;
        border:solid 2px PeachPuff;
       
        color:Gray;
        font-size:0.9rem;
        text-align:justify;
        `,
    buttonRed: `
        text-decoration:none;
        color:White;
        background:Salmon;
        padding:5px;
        border-radius:5px;
        `,
    buttonBlue: `
        text-decoration:none;
        color:White;
        background-color:RoyalBlue;
        padding:2px;
        border:solid 1px Blue;
        border-radius:5px;
    `,
  };

  const email = `
      <body>
        <img 
        src="https://conbuenaenergia.web.app/static/media/cbelogo.0e6fc453.svg" 
        alt="con buena energía" 
        height=80px>
  
        <section style="${styles.paper}"> 
          <h3>
          Con Buena Energía <br>
          <span style="
          color:Gray;
          font-size: 0.9rem
          ">del Ministerio de Energía</span>
          </h3>

          <h4>${randomMessage()} ${benf?.name.firstName}</h4>

          <p>
          Se ha inscrito existosamente en el taller "Con Buena Energía", realizado en colaboración con  ${
            room?.colaborator ?? 'indefinido'
          } a realizarse el ${timeLocale(room?.placeActivity.date)}.
          </p>
  
          <p>
          Deberá conectarse ese día mediante el siguiente de acceso 👉 
          <a 
          style="${styles.buttonRed}"
          href=${getLinkAddress(room?.placeActivity.dir)}
          > Acceso Taller </a>
          </p>
     
          <p>
          Recuerde que al participar en el taller y cumplir con los requisitos,
          usted tiene derecho a un kit de ahorro energético, que será entregado el
          próximo  ${timeLocale(room?.placeDispatch?.date)} en la siguiente dirección:<br>

          <address>
          ${room?.placeDispatch?.name},<br>
          <strong><a href=${getLinkAddress(room?.placeDispatch?.dir)}>${
    room?.placeDispatch?.dir
  }</a></strong>
          </address>
          </p>
          
          <p style="${styles.alert}">
          <span style="color:Salmon;">¿Qué pasa si no puedo retirar mi kit?</span><br>
          <article>
          En el caso que por fuerza mayor no pueda ir  a retirar su kit 
          personalmente, usted puede enviar un representante con un 
          <strong>poder simple</strong> indicando su nombre completo,rut y firma. 
          </article>
          </p>

          <p>
          Si quiere saber más del cómo ahorrar energía y dinero en su hogar , puedes descargar nuestra guía de la 
          <a 
          style="${styles.buttonBlue}"
          target="_blank"
          href="https://www.mienergia.cl/sites/default/files/cuadernillo_guia_energia-baja.pdf"
          > Casa Eficiente </a>

          </p>
          <p>No olvide participar ${benf?.name.firstName}, nos vemos👋</p>
          <p>Atentamente Equipo Con Buena Energía</p>
        </section>
        <br>
        <section style="color:Gray;font-size:0.8rem">
        token:${benf?.uuid}
        <br>rut:${benf?.rut}
        <br>suscription:${benf?.dateUpdate.toISOString()}
        </section>
      </body>`; // html body

  return email;
};

export default emailModel;
