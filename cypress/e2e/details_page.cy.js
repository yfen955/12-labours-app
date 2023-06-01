describe('gallery tab', () =>{
  beforeEach(function () {
    cy.visit('/data/browser/dataset/dataset-102-version-4?datasetTab=gallery');
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
    cy.visit('/data/browser/dataset/1.3.6.1.4.1.14519.5.2.1.186051521067863971269584893740842397538?datasetTab=cite');
    cy.wait(12000);
  })

  it('test left column button', () => {
    cy.contains('Dynamic contrast-enhanced magnetic resonance images of breast cancer patients with tumor locations (Duke-Breast-Cancer-MRI)');
    cy.get("#datasetBrowser").click();
    cy.url().should('include', '/data/browser?type=dataset&page=1&limit=10');
  })

  it('test citation & copy button', () => {
    cy.contains('A machine learning approach to radiogenomics of breast cancer: a study of 922 subjects and 529 DCE-MRI features.');
    cy.get("#copy-btn").click();
    cy.contains('copied');
  })

  it('test doi link', () => {
    cy.contains('https://doi.org/10.7937/TCIA.e3sv-re93');
    cy.get('a[href="https://doi.org/10.7937/TCIA.e3sv-re93"]').should('have.attr', 'target', '_blank').invoke('removeAttr', 'target').click();
    cy.on('url:changed', url => {
      cy.contains(url, 'https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70226903');
    })
  })
})