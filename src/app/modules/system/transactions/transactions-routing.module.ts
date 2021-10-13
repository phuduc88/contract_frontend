import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutComponent } from "@app/shared/layout";
import { TransactionListComponent, TransactionsSaveComponent } from "./pages";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: TransactionListComponent,
      },
      {
        path: "add",
        component: TransactionsSaveComponent,
      },
      {
        path: ":id/edit",
        component: TransactionsSaveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
