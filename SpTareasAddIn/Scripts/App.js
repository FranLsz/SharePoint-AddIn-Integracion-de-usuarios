'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {

    var grupo;
    var tareasPendientes;
    var tareasRealizadas;

    var contexto = new SP.ClientContext.get_current();
    var web = contexto.get_web();

    var usuario = contexto.get_web().get_currentUser();

    contexto.load(usuario);
    contexto.executeQueryAsync(onSuccess, onError);

    function onSuccess(sender, args) {
        tienePermisos();

    }
    function onError(sender, args) {
        console.log("Error al cargar usuario");
    }

    function tienePermisos() {
        perteneceAlGrupo("Profesores", function (esMiembro) {
            if (esMiembro) {
                grupo = "Profesores";
                // Cargar tareas
                realizarPeticionAjax("GET", null, function (datos) {
                    procesarTareas(datos);
                });
            }
            else {
                perteneceAlGrupo("Alumnos", function (esMiembro) {
                    if (esMiembro)
                        grupo = "Alumnos";
                    else
                        grupo = "Invitados";

                    // Cargar tareas
                    realizarPeticionAjax("GET", null, function (datos) {
                        procesarTareas(datos);
                    });
                });
            }

        });
    }

    function aplicarPermisos() {
       
        $("#titulo").text("Iniciada sesión como " + usuario.get_title() + " (" + grupo + ") ");

        if (grupo !== "Profesores") {
            $("#nuevaTarea").hide();
            $(".btnBorrar").hide();
        }

        if (grupo === "Invitados") {
            $("table tbody tr td:nth-child(2), table thead tr th:nth-child(2)").hide();
        }

        $(".cargando").hide();
        $("#contenido").show();

        
    }

    function procesarTareas(tareas) {
        $.each(tareas,
            function (i, tarea) {
                console.log(tarea);

                if (tarea.Pendiente)
                    $("#tareasPendientes").append("<tr><td>" + tarea.Nombre + "</td><td><input type='button' value='Realizada' /><input type='button' class='btnBorrar' value='Borrar' /></td></tr>");
                else
                    $("#tareasRealizadas").append("<tr><td>" + tarea.Nombre + "</td><td><input type='button' value='Pendiente' /><input type='button' class='btnBorrar' value='Borrar' /></td></tr>");
            });

        aplicarPermisos();
    }

    function nuevaTarea() {
        var obj = {
            '__metadata': { 'type': 'SP.Data.TareasListItem' },
            'Nombre': $("#txtNuevaTarea").val(),
            'Pendiente': true
        };
        console.log(obj);

        realizarPeticionAjax("POST",
            obj,
            function (res) {
                console.log(res);
            });
    }

    function realizarPeticionAjax(verbo, datos, callback) {
        var url = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getByTitle('Tareas')";
        var headers;
        var httpVerb;
        var httpData = JSON.stringify(datos);
        var digest = document.getElementById('__REQUESTDIGEST').value;
        switch (verbo) {
            case "GET":
                url += "/items";
                httpVerb = "GET";
                headers = {
                    "X-RequestDigest": digest,
                    "accept": "application/json;odata=verbose"
                };
                httpData = null;

                break;
            case "POST":
                url += "/items";
                httpVerb = "POST";
                headers = {
                    "X-RequestDigest": digest,
                    "Accept": "application/json;odata=verbose",
                    "Content-type": "application/json;odata=verbose"
                };
                break;
            case "PUT":
                url += "/items(" + datos.ID + ")";
                httpVerb = "POST";
                headers = {
                    "X-RequestDigest": digest,
                    "Content-type": "application/json;odata=verbose",
                    "IF-MATCH": "*",
                    "X-HTTP-Method": "MERGE"
                };
                break;
            case "DELETE":
                url += "/items(" + datos + ")";
                httpVerb = "POST";
                headers = {
                    "X-RequestDigest": digest,
                    "IF-MATCH": "*",
                    "X-HTTP-Method": "DELETE"
                };
                break;
        }

        $.ajax({
            url: url,
            type: httpVerb,
            headers: headers,
            data: httpData,
            success: function (data) {
                console.log(data);
                if (typeof (data.d.results) != "undefined")
                    callback(data.d.results);
                else if (typeof (data.d.Nombre) != "undefined")
                    callback(data.d);
                else
                    callback("OK");
            },
            error: function (err) {
                console.log("Error con Tareas");
            }
        });
    }

    function perteneceAlGrupo(nombreGrupo, onComplete) {

        var grupos = web.get_siteGroups();
        contexto.load(grupos);

        var grupo = grupos.getByName(nombreGrupo);
        contexto.load(grupo);

        var gruposUsuario = grupo.get_users();
        contexto.load(gruposUsuario);

        contexto.executeQueryAsync(onSuccess, onError);

        function onSuccess(sender, args) {
            var esMiembro = false;
            var grupoUsuarioEnumerator = gruposUsuario.getEnumerator();
            while (grupoUsuarioEnumerator.moveNext()) {
                var grupoUsuario = grupoUsuarioEnumerator.get_current();
                if (grupoUsuario.get_id() === usuario.get_id()) {
                    esMiembro = true;
                    break;
                }
            }
            onComplete(esMiembro);
        }

        function onError(sender, args) {
            onComplete(false);
        }
    }


    $(document)
        .ready(function () {
            $("#btnNuevaTarea").on("click", nuevaTarea);
        });
}
