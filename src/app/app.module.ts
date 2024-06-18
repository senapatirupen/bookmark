import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserLinksComponent } from './browser-links/browser-links.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagService } from './services/tag.service';
import { TagsComponent } from './tags/tags.component';
import { BrowserLinkSearchComponent } from './browser-link-search/browser-link-search.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowserLinksComponent,
    TagsComponent,
    BrowserLinkSearchComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [TagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
