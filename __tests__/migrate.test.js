const transform = require('../migrate');

describe('#transform JavaScript', () => {
  it("Scenario('title', (I) => {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', (I) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', ({ I })');
  });

  it("Scenario('title', (I, pageObject) => {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', (I, classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', ({ I, classpage })');
  });

  it("Scenario('title', async (I, pageObject) => {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', async (I, classpage) => {
    await classpage.type('Class Page Type');
    await classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', async ({ I, classpage })');
  });
  it('Scenario("title", { retries: 2 } , async (I, classpage) => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', async (I, classpage) => {
    await classpage.type('Class Page Type');
    await classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', async ({ I, classpage })');
  });
  it('Scenario("title", async () => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', async () => {
    await classpage.type('Class Page Type');
    await classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', async ()');
  });
  it('Scenario("title", () => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', () => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', ()');
  });
});

describe.skip('#transform TypeScript', () => {
  it("Scenario('title', (I, pageObject) => {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', (I: CodeceptJS.I, classpage: CodeceptJS.classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', ({ I: CodeceptJS.I, classpage: CodeceptJS.classpage })');
  });
});
