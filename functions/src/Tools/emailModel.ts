import { IBeneficiary } from '../Classes/Beneficiary.interface';
import { IRoom } from '../Classes/Classroom.interface';
import getLinkAddress from './getLinkAddress';
import timeLocale from './timeLocale';

const emailModel = (room?: IRoom, benf?: IBeneficiary): string => {
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
    body: `
        font-family:Helvetica,Arial;
        font-size:16px;
        position:relative;
        background-color:White;
        border-radius:10px;
        border:solid 2px Gray;
        padding:20px;
        margin:5px;
        max-width:min(50%,600px);
        `,

    app_section: `
    position:relative;
    padding:10px;
    justify-content: center;
    `,

    app_card_container: `
      position:relative;
      display: flex;
      width:min(100%,400px);
      flex-grow:4;
      flex-shink:2;
      justify-content:space-evenly;

    `,
    app_card: `
      cursor:pointer;
      padding:3px;
      margin:5px;
      position:relative;
      max-width:100px;
      min-height:120px;
      box-shadow: 2xp 2px 2px 1px rgb(0,0,0,0.1);
      border-radius:5px;
      font-size:0.75rem;
      text-aling:justify;
      font-color:Gray;
      justify-content:center;
    `,
    app_store_button_container: `
      display:inline;
    `,
    app_store_button: `
      margin:5px;
      padding:5px;
      background-color:black;
      border-radius:5px;
      max-width:30px;
      max-height:10px;
      color:white;
      font-weight:600;
      display:inline;
    `,
    img_store: `
      width:15px;
      height:15px;
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
    button_red: `
        cursor:pointer;
        text-decoration:none;
        color:White;
        background:Salmon;
        padding:5px;
        border-radius:5px;
        box-shadow:2px 2px 2px 1px rbg(0,0,0,0.2); 
        `,
    button_blue: `
        cursor:pointer;
        text-decoration:none;
        color:White;
        background-color:RoyalBlue;
        padding:2px;
        border:solid 1px Blue;
        border-radius:5px;
        box-shadow:2px 2px 2px 1px rbg(0,0,0,0.2); 
    `,
  };

  const email = `
      <body>
      <span style="background-image:url(https://conbuenaenergia.web.app/static/media/cbelogo.abe70d5c.svg);height:100px;background-repeat:no-repeat;"/>
  
        <div style="${styles.body}"> 
          <h3>
            Con Buena Energía <br>
            <span style="
            color:Gray;
            font-size: 1rem;
            ">del Ministerio de Energía</span>
          </h3>

          <h4>${randomMessage()} ${benf?.name.firstName}</h4>

          <p>
          Se ha inscrito existosamente en el taller "Con Buena Energía", realizado en colaboración con  ${
            room?.colaborator ?? 'indefinido'
          } a realizarse el:
          </p>
          <h2>${timeLocale(room?.placeActivity.date)}</h2>
  
          <p>
          Esta fecha deberá dirigirse a la siguiente dirección 👉 
          <a 
          style="${styles.button_red}"
          href=${getLinkAddress(room?.placeActivity.dir)}
          target="_blank"
          > Dirección Taller </a>
          </p>
     
          <p styles="text-align:justify;">
          Recuerde que al participar en el taller y cumplir con los requisitos
          de pertenecer al Registro Social de Hogares del 70% y no contar con beneficio previo,
          usted tiene derecho a un kit de ahorro energético, que será entregado el
          próximo  ${timeLocale(room?.placeDispatch?.date)} en la siguiente dirección:<br>

          <div>
          ${room?.placeDispatch?.name},<br>
          <strong>
          <a href=${getLinkAddress(room?.placeDispatch?.dir)}>${
    room?.placeDispatch?.dir
  }</a>
            </strong>
          </div>
          </p>
          
          <p style="${styles.alert}">
          <span style="color:Salmon;">¿Qué pasa si no puedo retirar mi kit?</span>
          <br>
          
            En el caso que por fuerza mayor no pueda ir  a retirar su kit 
            personalmente, usted puede enviar un representante con un 
            <strong>poder simple</strong> indicando su nombre completo,rut y firma. 
          
          </p>

          <div style="${styles.app_section}">

          <h4>¿Quieres aprender más del como ahorrar?</h4>
          <h5>¡Aprende con nuestras apps interactivas 😍!</h5>

            <div style="${styles.app_card_container}">
              <div style="${styles.app_card}">
                <img
                  alt="Mi Casa Eficiente"
                  width="48"
                  height="48"
                  src="https://play-lh.googleusercontent.com/S4wK5irqUb5bncIR6teT1Xg4_b00Sfg5U1YbFb0L5IsN-5HdLS-EbyZxboG1Uq3btOw=w480-h960-rw" 
                >

                <p>
                  Juego entretenido donde 
                  pondrás tomar decisiones sustentables 
                  para el buen uso de la energía.
                </p>

                  <div style="${styles.app_store_button_container}">        
                    <a style="${styles.app_store_button}" 
                    href="https://play.google.com/store/apps/details?id=cl.MinEnergia.CasaEficiente&hl=gl&gl=US" 
                    target="_blank"
                    >
                    <div>
                    <span styles="background-image:url(https://api.iconify.design/logos/google-play-icon.svg?width=15&height=15);background-repeat:no-repeat;"/>
                    </div>
                    <div>Google Play</div> 
                    </a>

                    <a style="${styles.app_store_button}"
                    href="https://apps.apple.com/us/app/mi-casa-eficiente/id1521973518" 
                    target="_blank"
                    >
                    <div>
                    <span style="background-image:url(https://api.iconify.design/logos/apple-app-store.svg?width=15&height=15);background-repeat:no-repeat;"/>
                    </div>
                    <div>Iphone IOS</div> 
                    </a>                
                  </div>
            </div>

            <div style="${styles.app_card}">
            <img
              alt="Energy Quiz"
              width="48"
              height="48"
              src="https://play-lh.googleusercontent.com/AMGRGB5vD_D_x22vzpxE-t_tGIRHo5D5jbIYYVpekOVFTwMND1e_HMyhi2F1RP3DBs8=w480-h960-rw" 
            >

            <p>
            Desafiate a ti mismo o con tus amigos
            y contesta la nuestra trivia Energética y 
            obten el máximo puntaje.
            </p>

              <div style="${styles.app_store_button_container}">     

                <a style="${styles.app_store_button}" 
                href="https://play.google.com/store/apps/details?id=cl.minenergia.EnergyQuiz&hl=es_CL&gl=US" 
                target="_blank"
                >
                <div>
                <span style="background-image:url(https://api.iconify.design/logos/google-play-icon.svg?width=15&height=15);background-repeat:no-repeat;"/>
                </div>
                <div>Google Play</div> 
                </a>

                <a style="${styles.app_store_button}" 
                href="https://apps.apple.com/cl/app/energy-quiz/id1521973619" 
                target="_blank"
                >
                <div>
                <span style="background-image:url(https://api.iconify.design/logos/apple-app-store.svg?width=15&height=15);background-repeat:no-repeat;"/>
                </div>
                <div>Iphone IOS</div>
               
                </a>                
              </div>
        </div>

            <div style="${styles.app_card}">

              <img
                alt="Explora Tu Energía"
                width="48px"
                height="48px"
                src="https://play-lh.googleusercontent.com/q5py2ne3MfyW9DgXBx70E3c8Zev9ELfaBp3tBLF_X0f4iuZaD5nqmVw9T_5FpBRWog=w480-h960-rw" 
              >

              <p>
                Explora la realidad aumentada.
                Interactiva, didáctica y futurista.
                <a href="https://www.mienergia.cl/centro-de-recursos/conoce-la-app-de-explora-tu-energia">mapas imprimibles</a>.
              </p>

                <div style="${styles.app_store_button_container}">    

                  <a style="${styles.app_store_button}" 
                  href="https://play.google.com/store/apps/details?id=cl.minenergia.exploratuenergia&hl=es_419&gl=US" 
                  target="_blank"
                  >
                  <div>
                  <span style="background-image:url(https://api.iconify.design/logos/google-play-icon.svg?width=15&height=15);background-repeat:no-repeat;"/>
                  </div>
                    <div>Google Play</div> 
                    </a>

                  <a style="${styles.app_store_button}"
                  href="https://apps.apple.com/cl/app/explora-tu-energ%C3%ADa/id1494385419" 
                  target="_blank"
                  >
                  <div>
                  <span style="background-image:url(https://api.iconify.design/logos/apple-app-store.svg?width=15&height=15);background-repeat:no-repeat;"/>
                  </div>
                    <div>Iphone IOS</div>
                    </a>                
                </div>
            </div>   

            </div>
         </div>

          <p>No se olvide participar ${benf?.name.firstName}, nos vemos👋</p>
          <p>Atentamente Equipo Con Buena Energía</p>

        </div>

        <br>
        
        <div style="color:Gray;font-size:0.5rem">
        token:${benf?.uuid}
        <br>rut:${benf?.rut}
        <br>suscription:${benf?.dateUpdate.toISOString()}
        </div>

      </body>`; // html body

  return email;
};

export default emailModel;
