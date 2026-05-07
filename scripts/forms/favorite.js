import {DEFAULT_FAVORITE, moduleName} from "../const.js";

const {ApplicationV2, HandlebarsApplicationMixin} = foundry.applications.api;

export class FavoriteWeapons extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: `${moduleName}-favorite-weapons`,
        classes: [moduleName],
        position: {
            width: 500
        },
        window: {
            title: "Favorite weapons"
        },
        form: {
            closeOnSubmit: true,
            submitOnChange: false,
            handler: async function (event, form) {
                return this._updateObject(event, Object.fromEntries(new FormData(form).entries()));
            }
        }
    };

    static PARTS = {
        form: {
            root: true,
            template: `modules/${moduleName}/templates/weapons.hbs`
        }
    };

    getFavoriteWeapons() {
        return foundry.utils.mergeObject(foundry.utils.deepClone(DEFAULT_FAVORITE),
            game.settings.get(moduleName, "favoriteWeapons")
        );
    }

    async _prepareContext() {
        return {
            weapons: this.getFavoriteWeapons()
        };
    }

    async _updateObject(_event, data) {
        let checkData = this.getFavoriteWeapons();
        for (let w in data) {
            checkData.find(c => c.id === w).value = data[w]
        }
        await game.settings.set(moduleName, "favoriteWeapons", checkData)
    }
}
