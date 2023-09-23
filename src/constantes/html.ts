import useCurrentDate from '../hooks/useCurrentDate';

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
              <p>Fecha: ${useCurrentDate} </p>
              <p>Version: 2019-1</p>
              <p>Página: 1 de 1</p>
          </div>
      </div>
      <div class="container1">
          <p>Esta cartilla sirve para detectar y mejorar actos y condiciones inseguras</p>
          <p>Nombre: </p>
      </div>
  </body>
  </html>
        `;

export const HTML = html;