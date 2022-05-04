import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { AgmCoreModule } from "@agm/core";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

import { ToastrModule } from "ngx-toastr";
import { PipesModule } from "./theme/pipes/pipes.module";

import { AppRoutingModule } from "./app.routing";
import { AppSettings } from "./app.settings";

import { AppComponent } from "./app.component";
import { PagesComponent } from "./pages/pages.component";
import { HeaderComponent } from "./theme/components/header/header.component";
import { FooterComponent } from "./theme/components/footer/footer.component";
import { SidebarComponent } from "./theme/components/sidebar/sidebar.component";
import { VerticalMenuComponent } from "./theme/components/menu/vertical-menu/vertical-menu.component";
import { HorizontalMenuComponent } from "./theme/components/menu/horizontal-menu/horizontal-menu.component";
import { BreadcrumbComponent } from "./theme/components/breadcrumb/breadcrumb.component";
import { BackTopComponent } from "./theme/components/back-top/back-top.component";
import { FullScreenComponent } from "./theme/components/fullscreen/fullscreen.component";
import { ApplicationsComponent } from "./theme/components/applications/applications.component";
import { MessagesComponent } from "./theme/components/messages/messages.component";
import { UserMenuComponent } from "./theme/components/user-menu/user-menu.component";
import { FlagsMenuComponent } from "./theme/components/flags-menu/flags-menu.component";
import { SideChatComponent } from "./theme/components/side-chat/side-chat.component";
import { FavoritesComponent } from "./theme/components/favorites/favorites.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { SearchComponent } from "./pages/search/search.component";
import { NotFoundComponent } from "./pages/errors/not-found/not-found.component";
import { CustomersComponent } from "./pages/customers/customers.component";
import { OffersComponent } from "./pages/offers/offers.component";
import { ClaimsComponent } from "./pages/claims/claims.component";
import { ChatsComponent } from "./pages/chats/chats.component";
import { ContractsComponent } from "./pages/contracts/contracts.component";
import { ProvisionsComponent } from "./pages/provisions/provisions.component";
import { SinistersComponent } from "./pages/sinisters/sinisters.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { BanksComponent } from "./pages/credits/banks/banks.component";
import { AgentsComponent } from "./pages/credits/agents/agents.component";
import { LoanSimulationsComponent } from "./pages/credits/loan-simulations/loan-simulations.component";
import { CreditsComponent } from "./pages/credits/credits/credits.component";
import { TransactionsComponent } from "./pages/credits/transactions/transactions.component";
import { DevExtremeModule } from "devextreme-angular";
import { PieChartModule } from "@swimlane/ngx-charts";
import { ClaimsCustomerComponent } from "./pages/claims-customer/claims-customer.component";
import { ClaimsEmployeeComponent } from "./pages/claims-employee/claims-employee.component";
import { UpdateclaimComponent } from "./pages/updateclaim/updateclaim.component";
import { AddComponent } from "./pages/customers/add/add.component";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PerfectScrollbarModule,
    NgbModule,
    NgxDatatableModule,

    MultiselectDropdownModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I",
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ToastrModule.forRoot(),
    PipesModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    DevExtremeModule,
    PieChartModule,
    NgxPaginationModule,
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    BackTopComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FlagsMenuComponent,
    SideChatComponent,
    FavoritesComponent,
    BlankComponent,
    SearchComponent,
    NotFoundComponent,
    CustomersComponent,
    OffersComponent,
    ClaimsComponent,
    ChatsComponent,
    ContractsComponent,
    ProvisionsComponent,
    SinistersComponent,
    ClaimsCustomerComponent,
    ClaimsEmployeeComponent,
    UpdateclaimComponent,
    AddComponent,
  ],
  providers: [
    AppSettings,
    NgbActiveModal,
    DatePipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
