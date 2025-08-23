import { DestroyRef, inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Injectable({ providedIn: "root" })
export class TranslateTitleStrategy extends TitleStrategy {
  private lastTitleKey: string | null = null;
  private readonly destroyRef = inject(DestroyRef);

  constructor(private translate: TranslateService, private title: Title) {
    super();

    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
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
}
