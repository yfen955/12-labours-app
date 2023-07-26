describe('gallery tab', () =>{
  beforeEach(function () {
    cy.visit('/data/browser/dataset/dataset-102-version-4?datasetTab=gallery&access=demo1-12L');
    cy.wait(3000);
  })

  it('test carousel number & thumbnail', () => {
    cy.get('.el-carousel__item').should('have.length', 2);
    cy.get('.model-image').find('img').should('have.attr', 'src', `${Cypress.env('query_url')}/data/preview/dataset-102-version-4/derivative/pig_heart_Layout1_thumbnail.jpeg`);
  })

  it('open a scaffold in gallery', () => {
    cy.get('.model-button').first().click();
    cy.window().then((win) => {
      cy.stub(win, 'open').as("popup");
    })
    cy.get('.model-button').first().click();
    cy.get('@popup').should("be.called");
  })
})

describe('information in the duke dataset detail page', () =>{
  beforeEach(function () {
    cy.visit('/data/browser/dataset/dataset-12L_1-version-1?datasetTab=cite&access=demo1-12L');
    cy.wait(3000);
  })

  it('test left column button', () => {
    cy.contains('Dynamic contrast-enhanced magnetic resonance images of breast cancer patients with tumor locations (Duke-Breast-Cancer-MRI)');
    cy.get("#datasetBrowser").click();
    cy.url().should('include', '/data/browser?type=dataset&page=1&limit=10');
  })

  // it('test citation & copy button', () => {
  //   cy.get("#copy-btn").click();
  //   cy.contains('copied');
  // })

  it('test doi link', () => {
    cy.contains("https://wiki.cancerimagingarchive.net/");
    cy.get('a[href="https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70226903"]').should('have.attr', 'target', '_blank').invoke('removeAttr', 'target').click();
    cy.on('url:changed', url => {
      cy.contains(url, "https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70226903");
    })
  })
})