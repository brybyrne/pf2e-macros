import {moduleName} from "../const.js";

const {ApplicationV2, HandlebarsApplicationMixin} = foundry.applications.api;

export class RepairForm extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: `${moduleName}-repair`,
        classes: [moduleName],
        position: {
            width: 500
        },
        window: {
            title: "Repair items"
        }
    };

    static PARTS = {
        form: {
            root: true,
            template: `modules/${moduleName}/templates/repair.hbs`
        }
    };

    constructor(actor, items) {
        super();
        this.actor = actor;
        this.items = items;
    }

    async _prepareContext() {
        return {
            items: this.items.map(i=>{
                return {
                    item: i.name,
                    owner: i.actor.name,
                    hp: ` ${i.system.hp.value}/${i.system.hp.max}`,
                    uuid: i.uuid,
                }
            })
        };
    }

    async _onRender(context, options) {
        await super._onRender(context, options);
        this.element.querySelectorAll(".repair-item").forEach((button) => {
            button.addEventListener("click", () => {
                const uuid = button.dataset.uuid;
                game.pf2e.actions.repair({uuid});
            });
        });
    }
}
