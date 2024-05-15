describe('CRUD App Tests', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500/');
    });
  
    test('Add new note', async () => {
        await page.click('.add-note');
        const notes = await page.$$('.note');
        expect(notes.length).toBe(1); // Assuming one note is added
        const noteToDelete = await page.$('.note');
        await noteToDelete.click({ clickCount: 2 });
    });
  
    test('Edit new note', async () => {
        await page.click('.add-note');
        const noteTextarea = await page.$('.note');
        await noteTextarea.click();
        await page.keyboard.type('New content');
        await page.keyboard.press('Tab'); 
        const updatedContent = await page.evaluate(() => document.querySelector('.note').value);
        expect(updatedContent).toBe('New content');
    });
  
    test('Edit existing note', async () => {
        // Assuming there's an existing note
        const existingNote = await page.$('.note');
        await existingNote.click();
        await page.keyboard.type('Updated content');
        await page.keyboard.press('Tab'); 
        const updatedContent = await page.evaluate(() => document.querySelector('.note').value);
        expect(updatedContent).toBe('New contentUpdated content');
        const noteToDelete = await page.$('.note');
        await noteToDelete.click({ clickCount: 2 });
    });
  
    test('Notes are saved locally', async () => {
        await page.click('.add-note');
        const notesBeforeRefresh = await page.$$('.note');
        await page.reload();
        const notesAfterRefresh = await page.$$('.note');
        expect(notesAfterRefresh.length).toBe(notesBeforeRefresh.length);
        const noteToDelete = await page.$('.note');
        await noteToDelete.click({ clickCount: 2 });
    });
  
    test('Delete note by double-clicking', async () => {
        await page.click('.add-note');
        const noteToDelete = await page.$('.note');
        await noteToDelete.click({ clickCount: 2 });
        const notes = await page.$$('.note');
        expect(notes.length).toBe(0); // Assuming the note is deleted
    });
  });
  