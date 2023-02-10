describe('duke dataset detail page', () =>{
  beforeEach(function () {
    cy.visit('/data/browser/dataset/1.3.6.1.4.1.14519.5.2.1.186051521067863971269584893740842397538?datasetTab=cite');
    cy.wait(20000);
  })

  it('test copy citation button', () => {
    cy.get("#copy-btn").click();
    cy.contains('copied');
  })

  it('test doi link', () => {
    cy.contains('https://doi.org/10.7937/TCIA.e3sv-re93');
    cy.get('a[href="https://doi.org/10.7937/TCIA.e3sv-re93"]').should('have.attr', 'target', '_blank').invoke('removeAttr', 'target').click();
    // cy.location('href').should('eq', 'https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70226903');
    cy.on('url:changed', url => {
      cy.contains(url, 'https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70226903');
    })
  })
})