<%-- Las 4 líneas siguientes son directivas ASP.NET necesarias cuando se usan componentes de SharePoint. --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- El marcado y el script del elemento Content siguiente se pondrá en el <head> de la página. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Agregue sus estilos CSS al siguiente archivo -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Agregue el código JavaScript al siguiente archivo -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- El marcado del elemento Content siguiente se pondrá en el elemento TitleArea de la página. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Tareas de los alumnos
</asp:Content>

<%-- El marcado y el script del elemento Content siguiente se pondrá en el <body> de la página. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="cargando">
        <h1>Cargando...</h1>
    </div>

    <div id="contenido">
        <h1 id="titulo"></h1>
        <br />
        <br />
        <br />

        <fieldset id="nuevaTarea">
            <legend>Nueva tarea</legend>
            <input id="txtNuevaTarea" type="text" placeholder="Nombre de la tarea..." />
            <input id="btnNuevaTarea" type="button" value="Agregar" />
        </fieldset>
        <br />
        <br />
        <br />

        <div>
            <h2>Pendientes</h2>
            <table class="tablaTareasPendientes">
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tareasPendientes">
                    <tr>
                        <td>Holasfasf afs asfas f as</td>
                        <td>
                            <input type="button" value="Realizada" />
                            <input type="button" class="btnBorrar" value="Borrar" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br />
        <br />
        <br />

        <div>
            <h2>Realizadas</h2>
            <table class="tablaTareasRealizadas">
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tareasRealizadas">
                    <tr>
                        <td>Holasfasf afs asfas f as</td>
                        <td>
                            <input type="button" value="Pendiente" />
                            <input type="button" class="btnBorrar" value="Borrar" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

</asp:Content>
