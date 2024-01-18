import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
    // REQUIREMENTS

    // ⛔ should decrease quality by 1 when updateQuality
    it("Should decrease quality by 1 when updateQuality", () => {
        const item = new Item("item", 10, 10);
        const sut = new GildedRose([item]);

        sut.updateQuality();

        const updatedItem = sut.items[0];
        expect(updatedItem.quality).toBe(9);
    });

    // ⛔ should decrease sellIn by 1 when updateQuality
    it("Should decrease sellIn by 1 when updateQuality", () => {
        const item = new Item("item", 10, 10);
        const sut = new GildedRose([item]);

        sut.updateQuality();

        const updatedItem = sut.items[0];
        expect(updatedItem.sellIn).toBe(9);
    });
    // ⛔ Once the sell by date has passed, Quality degrades twice as fast

    // ⛔ The Quality of an item is never negative

    // ⛔ "Aged Brie" actually increases in Quality the older it gets

    // ⛔ The Quality of an item is never more than 50 ⛔ Aged Brie AND Backstage passes ONLY

    // ⛔ "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
    // ⛔ Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
    // ⛔ <= 10

    // ⛔ <= 5

    // ⛔ Quality drops to 0 after the concert

    // ⛔ "Sulfuras" is a legendary item and as such its Quality is 80 and it never alters.

    // ⛔ "Sulfuras", being a legendary item, never has to be sold or decreases in Quality

    // ⛔ "Conjured" items degrade in Quality twice as fast as normal items
});
