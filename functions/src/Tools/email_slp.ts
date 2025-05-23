import { IBeneficiary } from '../Classes/Beneficiary.interface';
import { IRoom } from '../Classes/Classroom.interface';
import EmailModel from '../Classes/EmailModel';
import getLinkAddress from './getLinkAddress';
import timeLocale from './timeLocale';

const emailModel: EmailModel = (room?: IRoom, benf?: IBeneficiary): string => {
  const happySalutes = ['Siempre List@s', 'Estupendo', 'Genial'];

  const randomMessage = () => {
    const randomNumber = Math.floor(Math.random() * (happySalutes.length + 0)) + 0;
    return happySalutes[randomNumber];
  };

  const email = /*html*/ `
      <body>
      <span style="background-image:url(https://conbuenaenergia.web.app/static/media/cbelogo.abe70d5c.svg);height:100px;background-repeat:no-repeat;"/>
  
        <div> 
          <h3>
            Con Buena Energía <br>
            <span style="
            color:Gray;
            font-size: 1rem;
            ">del Ministerio de Energía</span>
          </h3>

          <h4 >${randomMessage()} ${benf?.name.firstName}</h4>

          <p>
          Se ha inscrito existosamente en el taller "Con Buena Energía", realizado en colaboración con  ${
            room?.colaborator ?? 'indefinido'
          } a realizarse el:
          </p>

          <h2 id="big-date">${timeLocale(room?.placeActivity.date)}</h2>
  
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
          próximo  ${timeLocale(room?.placeDispatch?.date)} en la siguiente dirección:
          
          <br>
          ${room?.placeDispatch?.name} en
          <br>

          <strong>
          <a href=${getLinkAddress(room?.placeDispatch?.dir)} 
          target="_blank">${room?.placeDispatch?.dir}</a>
          </strong>
          
          </p>
          
          <p class="alert" >
          <span style="color:Salmon;">¿Qué pasa si no puedo retirar mi kit?</span>
          <br>
          
            En el caso que por fuerza mayor no pueda ir  a retirar su kit 
            personalmente, usted puede enviar un representante con un 
            <strong>poder simple</strong> indicando su nombre completo,rut y firma. 
          
          </p>

          <div class="app-section">

          <h4>¿Quieres aprender más del como ahorrar?</h4>
          <h5>¡Aprende con nuestras apps interactivas 😍!</h5>

            <div class="card-container">

            <div class="app-card">
                <img
                  alt="Mi Casa Eficiente"
                  width="80"
                  src="https://play-lh.googleusercontent.com/S4wK5irqUb5bncIR6teT1Xg4_b00Sfg5U1YbFb0L5IsN-5HdLS-EbyZxboG1Uq3btOw=w480-h960-rw" 
                >
                <h6>Mi Casa Eficiente</h6>
                <p>
                  Juego entretenido donde 
                  pondrás tomar decisiones sustentables 
                  para el buen uso de la energía.
                </p>

                  <div class="store-button-container">        
                    <a class="store-button" 
                    href="https://play.google.com/store/apps/details?id=cl.MinEnergia.CasaEficiente&hl=gl&gl=US" 
                    target="_blank"
                    >
                    <img width="100" alt="Google play" src="https://ci5.googleusercontent.com/proxy/2JVoT023DBhNtS-h3EEs-8Eq6gyZ45-_SU57oZ9eaJUIHuGF_iZpoftrmjUi1wjQ3nYUyGMt8qrETBVCYVwkT-TOszSaGOhAugDFfUIoVLHRR4Rpp_y9O_oLR9mjMg=s0-d-e1-ft#https://s3.amazonaws.com/assets.new.datacamp.com/email/rebrand/google2x.png"> 
                    </a>

                    <a class="store-button"
                    href="https://apps.apple.com/us/app/mi-casa-eficiente/id1521973518" 
                    target="_blank"
                    >
                    <img width="100" alt="Apple Store" src="https://ci5.googleusercontent.com/proxy/jBP-NWHDH5F021O0oM7F4cg2NJHYEFfz8XXFPTYRlnWMYftIgyKIHzkclI5l8vzhJcA8rKcW4bMFTtufBZaKba7Q6vjtSIAR_lWBcUZqT8f2zhL24F-4qGNOD9ls=s0-d-e1-ft#https://s3.amazonaws.com/assets.new.datacamp.com/email/rebrand/apple2x.png"> 
                    </a>                
                  </div>
            </div>

            <div class="app-card">
            <img
              alt="Energy Quiz"
              width="80"
              src="https://play-lh.googleusercontent.com/AMGRGB5vD_D_x22vzpxE-t_tGIRHo5D5jbIYYVpekOVFTwMND1e_HMyhi2F1RP3DBs8=w480-h960-rw" 
            >
            <h6>
            Energy Quiz
            </h6>

            <p>
            Desafiate a ti mismo o con tus amigos
            y contesta la nuestra trivia Energética y 
            obten el máximo puntaje.
            </p>

              <div class="store-button-container">        
                <a class="store-button"
                  href="https://play.google.com/store/apps/details?id=cl.minenergia.EnergyQuiz&hl=es_CL&gl=US" 
                  target="_blank"
                >
                <img width="100" alt="Google play" src="https://ci5.googleusercontent.com/proxy/2JVoT023DBhNtS-h3EEs-8Eq6gyZ45-_SU57oZ9eaJUIHuGF_iZpoftrmjUi1wjQ3nYUyGMt8qrETBVCYVwkT-TOszSaGOhAugDFfUIoVLHRR4Rpp_y9O_oLR9mjMg=s0-d-e1-ft#https://s3.amazonaws.com/assets.new.datacamp.com/email/rebrand/google2x.png">
                </a>

                <a class="store-button"
                  href="https://apps.apple.com/cl/app/energy-quiz/id1521973619" 
                  target="_blank"
                >
                <img width="100" alt="Apple Store" src="https://ci5.googleusercontent.com/proxy/jBP-NWHDH5F021O0oM7F4cg2NJHYEFfz8XXFPTYRlnWMYftIgyKIHzkclI5l8vzhJcA8rKcW4bMFTtufBZaKba7Q6vjtSIAR_lWBcUZqT8f2zhL24F-4qGNOD9ls=s0-d-e1-ft#https://s3.amazonaws.com/assets.new.datacamp.com/email/rebrand/apple2x.png"> 
                </a>                
              </div>
        </div>

            <div class="app-card">

              <img
                alt="Explora Tu Energía"
                width="80"
                src="https://play-lh.googleusercontent.com/q5py2ne3MfyW9DgXBx70E3c8Zev9ELfaBp3tBLF_X0f4iuZaD5nqmVw9T_5FpBRWog=w480-h960-rw" 
              >
              <h6>
              Explora Tu Energía
              </h6>

              <p>
                Explora la energía con realidad aumentada*.
                Interactiva, didáctica y futurista.
                Para la R.A. puedes usar nuestros 
                <a href="https://www.mienergia.cl/centro-de-recursos/conoce-la-app-de-explora-tu-energia">mapas imprimibles</a>.
              </p>

                <div class="store-button-container">        
                <a class="store-button"
                  href="https://play.google.com/store/apps/details?id=cl.minenergia.exploratuenergia&hl=es_419&gl=US" 
                  target="_blank"
                  >
                  <img width="100" alt="Google Play" src="https://ci5.googleusercontent.com/proxy/2JVoT023DBhNtS-h3EEs-8Eq6gyZ45-_SU57oZ9eaJUIHuGF_iZpoftrmjUi1wjQ3nYUyGMt8qrETBVCYVwkT-TOszSaGOhAugDFfUIoVLHRR4Rpp_y9O_oLR9mjMg=s0-d-e1-ft#https://s3.amazonaws.com/assets.new.datacamp.com/email/rebrand/google2x.png"> 
                    </a>

                  <a class="store-button"
                    href="https://apps.apple.com/cl/app/explora-tu-energ%C3%ADa/id1494385419" 
                    target="_blank"
                  >
                  <img width="100" alt="Apple Store" src="https://ci5.googleusercontent.com/proxy/jBP-NWHDH5F021O0oM7F4cg2NJHYEFfz8XXFPTYRlnWMYftIgyKIHzkclI5l8vzhJcA8rKcW4bMFTtufBZaKba7Q6vjtSIAR_lWBcUZqT8f2zhL24F-4qGNOD9ls=s0-d-e1-ft#https://s3.amazonaws.com/assets.new.datacamp.com/email/rebrand/apple2x.png">
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
