import {moduleName} from "../const.js"
import {FavoriteWeapons} from "../forms/favorite.js";

export const RenderSettingsConfig = {
    listen() {
        Hooks.on("renderSettingsConfig", (app, html) => {
            const root = app.element instanceof HTMLElement
                ? app.element
                : html instanceof HTMLElement
                    ? html
                    : html?.[0];
            const target = root?.querySelector(`[data-category="${moduleName}"]`);
            if (target && !target.querySelector(`.${moduleName}-btn-favorite`)) {
                let syncBtn = document.createElement("div");
                syncBtn.classList.add("form-group", "submenu", `${moduleName}-btn-favorite`);
                syncBtn.innerHTML = `<button type="button"> <i class="	fas fa-swords"></i> <label>Configure favorite weapons</label> </button>`;
                syncBtn.onclick = function () {
                    new FavoriteWeapons().render(true)
                };
                target.querySelector(".form-group")?.before(syncBtn);
            }
        });
    }
}
