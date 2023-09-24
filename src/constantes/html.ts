const fechaHoraPeru = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
//date
const listDate = fechaHoraPeru.split(" ");
const date = listDate[0].replace(",","")
const hour = listDate[1]
//hour
// const hours = String(fechaHoraPeru.getHours()).padStart(2, '0');
// const minutes = String(fechaHoraPeru.getMinutes()).padStart(2, '0');
// const seconds = String(fechaHoraPeru.getSeconds()).padStart(2, '0');
// const formattedTime = `${hours}:${minutes}:${seconds}`;

  const html =`
  <html>
  <head>
      <style>
          body {
              width: 100%;
          }
          .container {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              height: auto;
          }
          .logo {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .logo img {
              width: 100px;
          }
          .title {
              flex: 5;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
  
          .title h1 {
              text-align: center;
              margin-bottom: 5px
          }
          .version {
              flex: 2;
              display: flex;
              flex-direction: column;
          }
          .version p{
              margin-bottom: 5px
          }
          .container2{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: auto;
          }
          .container2 p{
            margin-bottom: 0px;
          }
          .rcorners1 {
            border:1px solid black;
            width: 15px;
            height: 15px;
          }
          .container3 {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: auto;
            padding-left:4%;
            
          }
          .container3 p{
            margin-right: 1%;
            font-weight: bold;
          }
          .container4 {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: auto;
            padding-left:10%;
          }
          .container4 p{
            margin-right: 1%;
          }
          .explicacion{
            padding-top: -1%;
            font-size: 14px;
          }
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 10px 0;
            }
          .foot{
            width: 6%;
          }
          .negro{
            font-weight: bold;
          }
          .container5 {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: auto;
            margin-left:-10%;
          }
          .container5 p{
            font-size: 12px;
          }
          .pagina2{
            padding-top:9%;
          }
          .container45 {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: auto;
            justify-content: right;
            padding-right: 5%;
          }
          .container45 p{
            margin-right: 2%;
          }
          .rcorners2 {
            border:1px solid black;
            width: 100%;
            height: 30px;
          }
          .rcorners3 {
            border:1px solid black;
            width: 40%;
            height: 30px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="logo">
              <img src="https://www.haug.com.pe/uploads/logo-02--2022-09-14--09-46-42.png" alt="Logo">
          </div>
          <div class="title">
              <h1>Cartilla de observaciones</h1>
              <h2>PE.QHSE.0000.RG.053</h2>
          </div>
          <div class="version">
              <p>Fecha: ${hour}</p>
              <p>Version: 2019-1</p>
              <p>Página: 1 de 1</p>
          </div>
      </div>
      <div class="container1">
          <p>Esta cartilla sirve para detectar y mejorar actos y condiciones inseguras</p>
          <p>Nombre: </p>
      </div>
      <div class="container1">
        <div class="container2">
            <p>HAUG/Contrata: </p>
            <p>DNI: </p>
            <p>Cargo: </p>
        </div>
        <div class="container2">
            <p>Firma: </p>
            <p>Fecha: ${date}</p>
            <p>Hora: ${hour}</p>
        </div>
        <div class="container3">
          <p class="rcorners1"></p>
          <p>ACTOS SUBESTANDARES</p>
        </div>

        <div class="container4">
          <p class="rcorners1"></p>
          <p>Operar equipos sin autorizacion</p>
        </div>
        <div class="container4">
          <p class="rcorners1"></p>
          <p>Uso inadecuado del EPP</p>
        </div>
        <div class="container4">
          <p class="rcorners1"></p>
          <p>Uso de equipos y/o herramientas defectuosas</p>
        </div>
        <div class="container4">
          <p class="rcorners1"></p>
          <p>Adoptar posicion inadecuada para hacer una tarea</p>
        </div>
        <div class="container4">
          <p class="rcorners1"></p>
          <p>Uso incorrecto de equipo y/o herramientas</p>
        </div>
        <div class="container4">
          <p class="rcorners1"></p>
          <p>Incumplimiento del procedimiento de trabajo</p>
        </div>
        <div class="container4">
          <p class="rcorners1"></p>
          <p>Conducir a excesiva velocidad</p>
        </div>
        <div class="container4">
          <p class="rcorners1"></p>
          <p>Iniciar actividades sin antes realizar el permiso de trabajo</p>
        </div>
        <div class="container4">
          <p class="rcorners1"></p>
          <p>Iniciar actividades sin contar con la firma del supervisor</p>
        </div>
        <div class="container4">
          <p class="rcorners1"></p>
          <p>Otros: </p>
        </div>
        <div class="container3">
          <p>DETALLAR EL ACTO ESTANDAR/SUBESTANDAR</p>
        </div>
        <p class="explicacion">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel vestibulum mi. Duis ullamcorper neque ut lectus semper bibendum. Nulla venenatis commodo vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo tortor non sapien semper ullamcorper. Suspendisse venenatis, mauris eget ultricies lacinia, tellus diam mattis velit, vitae posuere augue urna at nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
        <div class="footer container2">
          <img src="https://cdn.pixabay.com/photo/2013/07/12/11/59/warning-145066_1280.png" alt="ilustracion de emergencia" class="foot">
          <div class="container1">
            <div class="container5">
                <p class="negro">Nota 1:</p>
                <p>Es responsabilidad de los usuarios asegurarse de utilizar la revision vigente.</p>
            </div>
            <div class="container5">
                <p class="negro">Nota 2:</p>
                <p>Prohibida su reproduccion y/o difusion parcial o total sin la autorizacion de la Gerencia General o de su representante.</p>
            </div>
           </div>
        </div>
      </div>

    <div class="pagina2">
        <div class="container3">
            <p class="rcorners1"></p>
            <p>CONDICIONES SUBESTANDARES</p>
        </div>
        <div class="container4">
            <p class="rcorners1"></p>
            <p>Falta de orden y limpieza en el area de trabajo</p>
        </div>
        <div class="container4">
            <p class="rcorners1"></p>
            <p>Falta de señalizacion</p>
        </div>
        <div class="container4">
            <p class="rcorners1"></p>
            <p>Gases comprimidos mal almacenados</p>
        </div>
        <div class="container4">
            <p class="rcorners1"></p>
            <p>EPP deteriorado</p>
        </div>
        <div class="container4">
            <p class="rcorners1"></p>
            <p>Ventilacion deficiente</p>
        </div>
        <div class="container4">
            <p class="rcorners1"></p>
            <p>Equipos o herramientas en mal estado</p>
        </div>
        <div class="container4">
            <p class="rcorners1"></p>
            <p>Otros</p>
        </div>
        <div class="container3">
            <p>DETALLAR LA CONDICION ESTANDAR/SUBESTANDAR</p>
        </div>
        <p class="explicacion">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel vestibulum mi. Duis ullamcorper neque ut lectus semper bibendum. Nulla venenatis commodo vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo tortor non sapien semper ullamcorper. Suspendisse venenatis, mauris eget ultricies lacinia, tellus diam mattis velit, vitae posuere augue urna at nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
        <div class="container3">
            <p>CORRECCION</p>
        </div>
        <p class="explicacion">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel vestibulum mi. Duis ullamcorper neque ut lectus semper bibendum. Nulla venenatis commodo vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo tortor non sapien semper ullamcorper. Suspendisse venenatis, mauris eget ultricies lacinia, tellus diam mattis velit, vitae posuere augue urna at nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
        <div class="container45">
          <p>SI</p>
          <p class="rcorners1"></p>
          <p>NO</p>
          <p class="rcorners1"></p>
          <p>NA</p>
          <p class="rcorners1"></p>
        </div>
        <p>Si su respuesta es SI, debe realizar su APR y adjuntarlo</p>
        <p class="rcorners2">OBSERVADOR:</p>
        <div class="container45">
         <p class="rcorners3">FIRMA</p>
        </div>
        
    </div>
    
  </body>
  </html>
        `;

export const HTML = html;