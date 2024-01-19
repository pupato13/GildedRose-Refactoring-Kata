export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export const ItemName = {
    AgedBrie: "Aged Brie",
    BackstagePasses: "Backstage passes to a TAFKAL80ETC concert",
    Sulfuras: "Sulfuras, Hand of Ragnaros",
    Conjured: "Conjured Mana Cake",
};

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const SULFURAS_QUALITY = 80;

abstract class CustomItem extends Item {
    abstract perform(): void;

    protected updateSellIn() {
        this.sellIn--;
    }

    protected updateQuality(amount: number) {
        this.quality = Math.min(
            Math.max(this.quality + amount, MIN_QUALITY),
            MAX_QUALITY,
        );
    }
}

export class ItemFactory {
    static makeCustomItem(
        name: string,
        sellIn: number,
        quality: number,
    ): CustomItem {
        switch (name) {
            case ItemName.AgedBrie:
                return new AgedBrie(name, sellIn, quality);
            case ItemName.BackstagePasses:
                return new BackstagePasses(name, sellIn, quality);
            case ItemName.Sulfuras:
                return new Sulfuras(name, sellIn, quality);
            case ItemName.Conjured:
                return new Conjured(name, sellIn, quality);
            default:
                return new OrdinaryItem(name, sellIn, quality);
        }
    }
}

class OrdinaryItem extends CustomItem {
    perform(): void {
        this.updateSellIn();

        const qualityAmount = this.sellIn <= 0 ? -2 : -1;

        this.updateQuality(qualityAmount);
    }
}

class AgedBrie extends CustomItem {
    perform(): void {
        this.updateSellIn();

        const qualityAmount = 1;

        this.updateQuality(qualityAmount);
    }
}

class BackstagePasses extends CustomItem {
    perform(): void {
        this.updateSellIn();

        if (this.sellIn <= 0) {
            this.quality = 0;
            return;
        }

        let qualityAmount = 1;

        if (this.sellIn <= 5) {
            qualityAmount = 3;
        } else if (this.sellIn <= 10) {
            qualityAmount = 2;
        }

        this.updateQuality(qualityAmount);
    }
}

class Sulfuras extends CustomItem {
    perform(): void {
        this.quality = SULFURAS_QUALITY; // "Sulfuras" is a legendary item and as such its Quality is 80 and it never alters.
    }
}

class Conjured extends CustomItem {
    perform(): void {
        this.updateSellIn();

        const qualityAmount = this.sellIn <= 0 ? -4 : -2;

        this.updateQuality(qualityAmount);
    }
}

export class GildedRose {
    items: CustomItem[];

    constructor(items = [] as Array<Item>) {
        this.items = items.map(({ name, sellIn, quality }) =>
            ItemFactory.makeCustomItem(name, sellIn, quality),
        );
    }

    updateQuality() {
        for (const customItem of this.items) {
            customItem.perform();
        }

        return this.items;
    }
}
