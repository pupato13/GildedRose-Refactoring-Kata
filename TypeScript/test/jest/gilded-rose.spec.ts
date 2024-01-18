import { Item, GildedRose, ItemName } from "@/gilded-rose";

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
    it("Should decrease quality by 2 when updateQuality runs and sellIn is equal to or less than 0 [1]", () => {
        const item = new Item("item", 0, 10);
        const sut = new GildedRose([item]);

        sut.updateQuality();

        const updatedItem = sut.items[0];
        expect(updatedItem.quality).toBe(8);
    });

    it("Should decrease quality by 2 when updateQuality runs and sellIn is equal to or less than 0 [2]", () => {
        const item = new Item("item", -1, 10);
        const sut = new GildedRose([item]);

        sut.updateQuality();

        const updatedItem = sut.items[0];
        expect(updatedItem.quality).toBe(8);
    });

    // ⛔ The Quality of an item is never negative
    it("Should keep quality to 0 when quality is equal to 0 already [1]", () => {
        const item = new Item("item", 1, 0);
        const sut = new GildedRose([item]);

        sut.updateQuality();

        const updatedItem = sut.items[0];
        expect(updatedItem.quality).toBe(0);
    });

    it("Should keep quality to 0 when quality is equal to 0 already [2]", () => {
        const item = new Item("item", -1, 0);
        const sut = new GildedRose([item]);

        sut.updateQuality();

        const updatedItem = sut.items[0];
        expect(updatedItem.quality).toBe(0);
    });

    // ⛔ "Aged Brie" actually increases in Quality the older it gets
    it("Should increase Aged Brie quality by 1", () => {
        const agedBrie = new Item(ItemName.AgedBrie, 10, 20);
        const sut = new GildedRose([agedBrie]);

        sut.updateQuality();

        const updatedAgedBrie = sut.items[0];
        expect(updatedAgedBrie.quality).toBe(21);
    });

    // ⛔ The Quality of an item is never more than 50 ⛔ Aged Brie AND Backstage passes ONLY
    it("Should keep Aged Brie quality by 50 if quality is 50", () => {
        const agedBrie = new Item(ItemName.AgedBrie, 10, 50);
        const sut = new GildedRose([agedBrie]);

        sut.updateQuality();

        const updatedAgedBrie = sut.items[0];
        expect(updatedAgedBrie.quality).toBe(50);
    });

    it("Should keep Backstage Passes quality by 50 if quality is 50", () => {
        const backstagePAsses = new Item(ItemName.BackstagePasses, 10, 50);
        const sut = new GildedRose([backstagePAsses]);

        sut.updateQuality();

        const updatedBackstagePasses = sut.items[0];
        expect(updatedBackstagePasses.quality).toBe(50);
    });

    // ⛔ "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
    // ⛔ Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
    // ⛔ <= 10
    it("Should Backstaged Passes increase quality by 2 when SellIn is equal to or less than 10", () => {
        const backstagedPass = new Item(ItemName.BackstagePasses, 10, 20);
        const sut = new GildedRose([backstagedPass]);

        sut.updateQuality();

        const updatedBackstagedPass = sut.items[0];
        expect(updatedBackstagedPass.quality).toBe(22);
    });

    // ⛔ <= 5
    it("Should Backstaged Passes increase quality by 3 when SellIn is equal to or less than 5", () => {
        const backstagedPass = new Item(ItemName.BackstagePasses, 5, 20);
        const sut = new GildedRose([backstagedPass]);

        sut.updateQuality();

        const updatedBackstagedPass = sut.items[0];
        expect(updatedBackstagedPass.quality).toBe(23);
    });

    // ⛔ Quality drops to 0 after the concert
    it("Should Backstaged Passes quality be 0 when SellIn is equal to or less than 0", () => {
        const backstagedPass = new Item(ItemName.BackstagePasses, 0, 29);
        const sut = new GildedRose([backstagedPass]);

        sut.updateQuality();

        const updatedBackstagedPass = sut.items[0];
        expect(updatedBackstagedPass.quality).toBe(0);
    });

    // ⛔ "Sulfuras" is a legendary item and as such its Quality is 80 and it never alters.
    it("Should Sulfuras quality be 80 and never change", () => {
        const sulfuras = new Item(ItemName.Sulfuras, 0, 79); // test a scenario where Sulfuras has changed by mistake
        const sut = new GildedRose([sulfuras]);

        sut.updateQuality();

        const updatedSulfuras = sut.items[0];
        expect(updatedSulfuras.quality).toBe(80);
    });

    // ⛔ "Sulfuras", being a legendary item, never has to be sold or decreases in Quality

    // ⛔ "Conjured" items degrade in Quality twice as fast as normal items
    it("Should decrease quality by 2 when updateQuality", () => {
        const conjured = new Item(ItemName.Conjured, 10, 10);
        const sut = new GildedRose([conjured]);

        sut.updateQuality();

        const updatedConjured = sut.items[0];
        expect(updatedConjured.quality).toBe(8);
    });
});
