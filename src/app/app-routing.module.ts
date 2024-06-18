import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserLinksComponent } from './browser-links/browser-links.component';
import { TagsComponent } from './tags/tags.component';
import { BrowserLinkSearchComponent } from './browser-link-search/browser-link-search.component';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  { path: 'browser-links', component: BrowserLinksComponent },
  { path: 'tags', component: TagsComponent },
  { path: '', redirectTo: '/browser-links', pathMatch: 'full' },
  { path: 'search', component: BrowserLinkSearchComponent },
  { path: 'data-table', component: DataTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
