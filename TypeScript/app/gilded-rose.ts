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
};

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

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

        const qualityAmount = 1;

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

            // item.sellIn--;

            // if (!Object.values(ItemName).includes(item.name)) {
            //     const qualityAmount = item.sellIn <= 0 ? -2 : -1;

            //     const quality = (item.quality = Math.min(
            //         Math.max(item.quality + qualityAmount, 0),
            //         50,
            //     ));

            //     item.quality = quality;
            // }

            // if (item.name === ItemName.AgedBrie) {
            //     const qualityAmount = 1;

            //     const quality = (item.quality = Math.min(
            //         Math.max(item.quality + qualityAmount, 0),
            //         50,
            //     ));

            //     item.quality = quality;
            // }
        }

        return this.items;
    }
}

/*

OLD UPDATE QUALITY FN

updateQuality() {
    // for (let i = 0; i < this.items.length; i++) {
    //   if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
    //     if (this.items[i].quality > 0) {
    //       if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
    //         this.items[i].quality = this.items[i].quality - 1
    //       }
    //     }
    //   } else {
    //     if (this.items[i].quality < 50) {
    //       this.items[i].quality = this.items[i].quality + 1
    //       if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
    //         if (this.items[i].sellIn < 11) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1
    //           }
    //         }
    //         if (this.items[i].sellIn < 6) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
    //     this.items[i].sellIn = this.items[i].sellIn - 1;
    //   }
    //   if (this.items[i].sellIn < 0) {
    //     if (this.items[i].name != 'Aged Brie') {
    //       if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
    //         if (this.items[i].quality > 0) {
    //           if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
    //             this.items[i].quality = this.items[i].quality - 1
    //           }
    //         }
    //       } else {
    //         this.items[i].quality = this.items[i].quality - this.items[i].quality
    //       }
    //     } else {
    //       if (this.items[i].quality < 50) {
    //         this.items[i].quality = this.items[i].quality + 1
    //       }
    //     }
    //   }
    // }

    return this.items;
}

*/
