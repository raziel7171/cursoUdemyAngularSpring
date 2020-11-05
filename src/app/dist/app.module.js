"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var footer_component_1 = require("./footer/footer.component");
var directiva_component_1 = require("./directiva/directiva.component");
var clientes_component_1 = require("./clientes/clientes.component");
var cliente_service_1 = require("./clientes/cliente.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var form_component_1 = require("./clientes/form.component");
var paginator_component_1 = require("./paginator/paginator.component");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var es_Co_1 = require("@angular/common/locales/es-Co");
var animations_1 = require("@angular/platform-browser/animations");
var datepicker_1 = require("@angular/material/datepicker");
var core_2 = require("@angular/material/core");
common_1.registerLocaleData(es_Co_1["default"], 'es');
var routes = [
    { path: '', redirectTo: '/clientes', pathMatch: 'full' },
    { path: 'directivas', component: directiva_component_1.DirectivaComponent },
    { path: 'clientes', component: clientes_component_1.ClientesComponent },
    { path: 'clientes/form', component: form_component_1.FormComponent },
    { path: 'clientes/form/:id', component: form_component_1.FormComponent },
    { path: 'clientes/page/:page', component: clientes_component_1.ClientesComponent },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                directiva_component_1.DirectivaComponent,
                clientes_component_1.ClientesComponent,
                form_component_1.FormComponent,
                paginator_component_1.PaginatorComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(routes),
                animations_1.BrowserAnimationsModule,
                datepicker_1.MatDatepickerModule,
                core_2.MatNativeDateModule,
                datepicker_1.MatDatepickerModule, MatMomentDateModule
            ],
            providers: [cliente_service_1.ClienteService, { provide: core_1.LOCALE_ID, useValue: 'es' }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
