import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Injectable({ providedIn: 'root' })
export class TranslateTitleStrategy extends TitleStrategy {
  private lastTitleKey: string | null = null;
  private langChangeSub: any;

  constructor(private translate: TranslateService, private title: Title) {
    super();
    // Subscribe to language changes
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      if (this.lastTitleKey) {
        this.setTranslatedTitle(this.lastTitleKey);
      }
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titleKey = this.buildTitle(snapshot);
    this.lastTitleKey = titleKey || null;
    if (titleKey) {
      this.setTranslatedTitle(titleKey);
    }
  }

  private setTranslatedTitle(titleKey: string) {
    this.translate.get(titleKey).subscribe((translated: string) => {
      this.title.setTitle(translated || titleKey);
    });
  }

  // Clean up subscription if needed (not strictly necessary for root service)
  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }
}
