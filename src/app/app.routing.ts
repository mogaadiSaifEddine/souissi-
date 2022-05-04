import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";
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
import { ClaimsCustomerComponent } from "./pages/claims-customer/claims-customer.component";
import { ClaimsEmployeeComponent } from "./pages/claims-employee/claims-employee.component";
import { UpdateclaimComponent } from "./pages/updateclaim/updateclaim.component";
import { AddComponent } from "./pages/customers/add/add.component";

export const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        data: { breadcrumb: "Dashboard" },
      },
      { path: "customers", component: CustomersComponent },
      { path: "customers/add", component: AddComponent },
      { path: "offers", component: OffersComponent },
      { path: "claims", component: ClaimsComponent },
      { path: "chats", component: ChatsComponent },
      { path: "contracts", component: ContractsComponent },
      { path: "provisions", component: ProvisionsComponent },
      { path: "sinisters", component: SinistersComponent },
      { path: "claimscustomer", component: ClaimsCustomerComponent },
      { path: "claimsemployee", component: ClaimsEmployeeComponent },
      { path: "updateclaim", component: UpdateclaimComponent },

      {
        path: "membership",
        loadChildren: () =>
          import("./pages/membership/membership.module").then(
            (m) => m.MembershipModule
          ),
        data: { breadcrumb: "Membership" },
      },
      {
        path: "ui",
        loadChildren: () =>
          import("./pages/ui/ui.module").then((m) => m.UiModule),
        data: { breadcrumb: "UI" },
      },
      {
        path: "form-elements",
        loadChildren: () =>
          import("./pages/form-elements/form-elements.module").then(
            (m) => m.FormElementsModule
          ),
        data: { breadcrumb: "Form Elements" },
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./pages/tables/tables.module").then((m) => m.TablesModule),
        data: { breadcrumb: "Tables" },
      },
      {
        path: "tools",
        loadChildren: () =>
          import("./pages/tools/tools.module").then((m) => m.ToolsModule),
        data: { breadcrumb: "Tools" },
      },
      {
        path: "calendar",
        loadChildren: () =>
          import("./pages/calendar/app-calendar.module").then(
            (m) => m.AppCalendarModule
          ),
        data: { breadcrumb: "Calendar" },
      },
      {
        path: "mailbox",
        loadChildren: () =>
          import("./pages/mailbox/mailbox.module").then((m) => m.MailboxModule),
        data: { breadcrumb: "Mailbox" },
      },
      // { path: 'credits', loadChildren: () => import('./pages/credits/credits.module').then(m => m.CreditsModule)},
      {
        path: "charts",
        loadChildren: () =>
          import("./pages/charts/charts.module").then((m) => m.ChartsModule),
        data: { breadcrumb: "Charts" },
      },
      {
        path: "dynamic-menu",
        loadChildren: () =>
          import("./pages/dynamic-menu/dynamic-menu.module").then(
            (m) => m.DynamicMenuModule
          ),
        data: { breadcrumb: "Dynamic Menu" },
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./pages/profile/profile.module").then((m) => m.ProfileModule),
        data: { breadcrumb: "Profile" },
      },
      {
        path: "blank",
        component: BlankComponent,
        data: { breadcrumb: "Blank page" },
      },

      {
        path: "search",
        component: SearchComponent,
        data: { breadcrumb: "Search" },
      },
    ],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then((m) => m.RegisterModule),
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      relativeLinkResolution: "legacy",
      // useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
