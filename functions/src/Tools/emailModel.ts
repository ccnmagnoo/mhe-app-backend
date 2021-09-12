import { IBeneficiary } from '../Classes/Beneficiary.interface';
import { IClassroom } from '../Classes/Classroom.interface';
import getLinkAddress from './getLinkAddress';
import timeLocale from './timeLocale';

const emailModel = (room?: IClassroom, benf?: IBeneficiary): string => {
  const styles = {
    paper: `
        box-shadow: 2px 2px 5px Gray;
        background-color:White;
        padding:20px;
        margin:auto;
        border-radius:20px;
        border:solid 1px Silver;
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
  };

  const email = `
      <body>
        <img 
        src="https://conbuenaenergia.web.app/static/media/cbelogo.0e6fc453.svg" 
        alt="con buena energía" 
        height=80px>
  
        <section style="${styles.paper}"
        > 
          <h3>
          Con Buena Energía <br>
          <span style="
          color:Gray;
          font-size: 1.2rem
          ">del Ministerio de Energía</span>
          </h3>

          <h4>Felicidades ${benf?.name.firstName}</h4>

          <p>
          Se ha inscrito existosamente en el taller "Con Buena Energía", realizado en colaboración con  ${
            room?.colaborator ?? 'indefinido'
          } a realizarse el ${timeLocale(room?.placeActivity.date)}.
          </p>
  
          <p>
          Deberá conectarse ese día mediante el siguiente de acceso 👉 
          <a 
          style="
          text-decoration:none;
          color:White;
          background:linear-gradient(to top left, Red 0%, Salmon 100%);
          padding:5px;
          border-radius:5px;
          "
          href=${getLinkAddress(room?.placeActivity.dir)}
          > Acceso Taller </a>
          </p>
     
          <p>
          Recuerde que al participar en el taller y cumplir con los quisitos,
          usted tiene derecho a un kit de ahorro energético, que será entregado el
          próximo  ${timeLocale(room?.placeDispatch?.date)} en la siguiente dirección:<br>

          <address>
          ${room?.placeDispatch?.name},<br>
          <strong><a href=${getLinkAddress(room?.placeDispatch?.dir)}>${
    room?.placeDispatch?.dir
  }</a></strong>
          </address>
          </p>
          
          <p style="
          background:PapayaWhip;
          padding:10px;
          margin:auto;
          max-width:400px;

          border-radius:20px;
          border:solid 2px PeachPuff;
         
          color:Gray;
          font-size:0.9rem;
          text-align:justify;
          ">
          <span style="color:Salmon;">¿Qué pasa si no puedo retirar mi kit?</span><br>
          <article>
          En el caso que por fuerza mayor no pueda ir 
          a retirar el kit personalmente, usted puede enviar un representante con un 
          <strong>poder simple</strong> con la autorización el retiro de su kit
          indicando su nombre completo ,rut y firma.
          </article>
          </p>

          <p>
          Si quiere saber más del cómo ahorrar energía y dinero en su hogar , puedes descargar nuestra guía de la 
          <a 
          style="
          text-decoration:none;
          color:White;
          background:linear-gradient(to top left, RoyalBlue 0%, DodgerBlue 100%);
          padding:2px;
          border-radius:5px;
          "
          target="_blank"
          href="https://www.mienergia.cl/sites/default/files/cuadernillo_guia_energia-baja.pdf"
          > Casa Eficiente </a>

          </p>
          <p>No olvide participar ${benf?.name.firstName}, nos vemos👋</p>
          <p>Atentamente Equipo Con Buena Energía</p>
        </section>
        <br>
        <section style="color:Gray;font-size:1rem">
        token:${benf?.uuid}
        <br>rut:${benf?.rut}
        <br>suscription:${benf?.dateUpdate.toISOString()}
        </section>
      </body>`; // html body

  return email;
};

export default emailModel;
