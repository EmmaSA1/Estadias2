<?php

function quotedStr($cadena){
  return "'".$cadena."'";  
}


function getBootstrapE(){ // se usa en la carpeta comun 
    echo '<link rel="stylesheet" href="../bootstrap 5/css/bootstrap.min.css">';
    echo '<link rel="icon" href="/sistema/imgs/logos/logoSTI.ico">';
}

function getBootstrapR(){
    echo '<link rel="stylesheet" href="../sistema/bootstrap 5/css/bootstrap.min.css">';
    echo '<link rel="icon" href="/sistema/imgs/logos/logoSTI.ico">';
}

function getBootstrap(){
    echo '<link rel="stylesheet" href="sistema/bootstrap 5/css/bootstrap.min.css">';
     echo '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">';
    echo '<link rel="icon" href="sistema/imgs/logos/logoSTI.ico">';
}

function getBootstrapF(){
    echo '<link rel="stylesheet" href="../../bootstrap 5/css/bootstrap.min.css">';
    echo '<link rel="icon" href="/sistema/imgs/logos/logoSTI.ico">';
}

function getBootstrapM()
{

   echo '<link rel="stylesheet" href="../../bootstrap 5/css/bootstrap.min.css">';
  
  echo '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">';
}

function getFooter()
{
  $name    = isset($_SESSION['_NOMBRE_']) ? $_SESSION['_NOMBRE_'] . ' ' . $_SESSION['_APELLIDO_P_'] . ' ' . $_SESSION['_APELLIDO_M_'] : '';
  $negocio = isset($_SESSION['nombreNegocioFooter']) ? $_SESSION['nombreNegocioFooter'] : '';
  echo '<div class="container-fluid py-1" style="background-color: #000096; color:#F2B705;">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-3">
           <p class="text-left "style="color:#F2B705;">SAN Version 1.0</p>
           <p class="text-left "style="color:#F2B705;">' . $name . '</p>
        </div>
        <div class="col-4"></div>
        <div class="col-3">
           <p class="text-right "style="color:#F2B705;">Sistema Desarrollado por Soluciones TI.</p>
           <p class="text-right "style="color:#F2B705;">' . $negocio . '</p>
         </div>
        <div class="col-1"></div>
      </div>
    </div>';
}

function getheader()
{

  $logoNegocio = isset($_SESSION['logoNegocio']) ? $_SESSION['logoNegocio'] : 'STI.png';

  $nombreNegocio = isset($_SESSION['nombreNegocioFooter']) ? $_SESSION['nombreNegocioFooter'] : 'S. A. N.';
  echo '<div class="container-fluid  "style="background-color: #000096;color:#F2B705;" >
        	<div class="row text-center">
        		<div class="col-4">
        				<img class="img-fluid " src="/sistema/imgs/logos/' . $logoNegocio . '" width="70" height="70"/>
        		</div>
        		<div class="col-4 text-center">
        				<h1 class=" text-center "style="color:#F2B705;">' . $nombreNegocio . '</h1>';
  if (isset($_SESSION['_COD_NEGOCIO_']) and $_SESSION['_COD_NEGOCIO_'] == 1) {

    echo '<a href="../../catalogos/menus/menuGeneral.php" class="btn btn-success bi bi-menu-button-wide  text-light" > MENU PRINCIPAL</a>';
  }
  echo '</div>
        		<div class="col-4">
        				<img class="img-fluid " src="/sistema/imgs/logos/' . $logoNegocio . '" width="70" height="70"/>
        		</div>
        	</div>
	     </div>';
}

function getDatosFooter(){
    // gilberto almanza, pendiente
    // el codigo se puso en la funciÃ³n getFooter de Fredy  
}

function getMenuLateral(){
    echo '<div id="sideNavigation" class="sidenav">
                <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                <br><br>
                <a href="#">About</a>
                <a href="#">Features</a>
                <a href="#">Contact Us</a>
              </div>
               
              <nav class="topnav">
                <a href="#" onclick="openNav()">
                  <svg width="30" height="30" id="icoOpen">
                      <path d="M0,5 30,5" stroke="#000" stroke-width="5"/>
                      <path d="M0,14 30,14" stroke="#000" stroke-width="5"/>
                      <path d="M0,23 30,23" stroke="#000" stroke-width="5"/>
                  </svg>
                </a>
              </nav>';
}
function menuOperatividad()
{
  // <script src="../../bootstrap 5/js/bootstrap.bundle.min.js"></script>
  echo '<div class="container">
 
  <div class="row justify-content-center">
      <div class="col-md-auto">
          <a href="../../catalogos/menus/menuGeneral.php" class="btn btn-success bi bi-menu-button-wide  text-light" > MENU PRINCIPAL</a>
      </div>
      
  
  </div>

</div>';


}
function scriptsTablas()
{
  echo '<script type="text/javascript">

  $(".DT1").DataTable({
   scrollCollapse: true,
    scrollY: "400px",
  "language": {
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sSearch": "Buscar:",
    "sEmpty": "No hay datos en la Tabla",
    "sZeroRecords": "No se encontraron resultados",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
    "SInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
    "sInfoFiltered": "(filtrando de un total de _MAX_ registros)",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "0‰3ltimo",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    
  },
  });


  </script>';
}
function getTablas()
{

  echo '<link rel="stylesheet" href="../../bootstrap 5/datatables.net-bs/css/dataTables.bootstrap.css">';
  echo '<link rel="stylesheet" href="../../bootstrap 5/datatables.net-bs/css/responsive.bootstrap.min.css">';
  echo '<link rel="stylesheet" href="../../bootstrap 5/datatables.net-bs/css/jquery.dataTables.min.css">';
  echo '<script src="../../bootstrap 5/jquery/dist/jquery.min.js"></script>';

  echo '<script src="../../bootstrap 5/jquery/dist/jquery.js"</script>';
  echo "<script>     $.widget.bridge('uibutton', $.ui.button);   </script>";
  echo '<script src="../../bootstrap 5/datatables.net/js/jquery.dataTables.min.js"></script>';
  echo '<script src="../../bootstrap 5/datatables.net-bs/js/dataTables.responsive.min.js"></script>';
  echo '<script src="../../bootstrap 5/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>';
}




?>