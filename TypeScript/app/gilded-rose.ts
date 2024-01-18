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

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            item.sellIn--;

            if (!Object.values(ItemName).includes(item.name)) {
                const qualityAmount = item.sellIn <= 0 ? -2 : -1;

                const quality = (item.quality = Math.min(
                    Math.max(item.quality + qualityAmount, 0),
                    50,
                ));

                item.quality = quality;
            }
        }
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
}
