describe('test details page', () =>{
  it('test left column button', () => {
    cy.visit('/data/browser/dataset/dataset-34-version-5?datasetTab=abstract');
    cy.wait(3000);
    cy.contains('Influence of direct colon tissue electrical stimulation on colonic motility in anesthetized male Yucatan minipig');
    cy.get("#datasetBrowser").click();
    cy.url().should('include', '/data/browser?type=dataset&page=1&limit=10');
  })

  it('test the gallery', () => {
    cy.visit('/data/browser/dataset/dataset-34-version-5?datasetTab=gallery');
    cy.wait(3000);

    cy.get('.el-carousel__item').should('have.length', 5);
    cy.get('.card-image').find('img').should('have.attr', 'src', `${Cypress.env('query_url')}/data/preview/dataset-34-version-5/derivative/Scaffolds/sub-all_direct-stim_distal-colon/sub-all_direct-stim_distal-colon_thumbnail.jpg`);
    
    // test the checkbox
    cy.get('.el-checkbox').should('have.length', 4);
    cy.get('.el-checkbox-group').find('.el-checkbox').first().click();
    cy.get('.el-checkbox').find('.is-checked').should('have.length', 2);
    cy.get('.el-carousel__item').should('have.length', 2);
    cy.get('.el-checkbox').find('.is-indeterminate').should('have.length', 1);
    cy.get('.el-carousel__item').find('p').should('not.have.value', 'Scaffold');

    cy.get('.el-checkbox-group').find('.el-checkbox').first().click();
    cy.get('.el-checkbox').find('.is-checked').should('have.length', 4);
    cy.get('.el-carousel__item').should('have.length', 5);

    cy.get('.el-checkbox').first().click();
    cy.get('.el-checkbox').find('.is-checked').should('have.length', 0);
    cy.get('.el-carousel__item').should('have.length', 0);
    cy.get('.el-checkbox').first().click();

    // test open a scaffold in gallery
    cy.get('.card-button').first().click();
    cy.window().then((win) => {
      cy.stub(win, 'open').as("popup");
    })
    cy.get('.card-button').first().click();
    cy.get('@popup').should("be.called");
  })

  it('test dataset files', () => {
    cy.visit('/data/browser/dataset/dataset-34-version-5?datasetTab=files');
    cy.wait(3000);

    cy.get('a').filter(':contains("Code")').click();
    cy.get('.el-breadcrumb').last().find('span').filter(':contains("files")').first().click();
    cy.get('a').should('contain', 'Code');

    cy.window().document().then(function (doc) {
      doc.addEventListener('click', () => {
        setTimeout(function () { doc.location.reload() })
      })
      cy.intercept('GET', `${Cypress.env('query_url')}/data/download/dataset-34-version-5/dataset_description.json`);
      cy.get('.el-button').find('.el-icon-download').first().click();
    });

    cy.get('.el-button').find('.el-icon-first-aid-kit').first().click();
    cy.url().should('include', '/incomplete');
  })
})

// describe('information in the duke dataset detail page', () =>{
//   beforeEach(function () {
//     cy.visit('/data/browser/dataset/dataset-12L_1-version-1?datasetTab=cite');
//     cy.wait(3000);
//   })

//   it('test citation & copy button', () => {
//     cy.get("#copy-btn").click();
//     cy.contains('copied');
//   })

//   it('test doi link', () => {
//     cy.contains("https://wiki.cancerimagingarchive.net/");
//     cy.get('a[href="https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70226903"]').should('have.attr', 'target', '_blank').invoke('removeAttr', 'target').click();
//     cy.on('url:changed', url => {
//       cy.contains(url, "https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70226903");
//     })
//   })
// })