describe('map sidebar', () =>{
  it('test sidebar content', () => {
    cy.visit('/data/maps?type=flatmap&id=Rat');
    cy.wait(10000);
    cy.contains('MultiFlatmap');

    // sidebar with current species
    cy.get('.title').contains(/([r|R]at)+/g);

    // open 3D map button
    // cy.get('.el-button').find('span').filter(':contains("Open 3D Map")').click();
    // cy.wait(5000);
    // cy.get('.regions-display-text').should('contain', 'Regions');
    // cy.get('.region-tree-node').find('span').should('contain', 'Heart');
    // cy.get('.el-button').find('span').filter(':contains("Close 3D Map")').click();

    // change img
    cy.get('.next').find('.progress-button').first().click();
    cy.get('p').should('contain', 'Experiment1');
    // choose a facet
    cy.contains('results | Showing');
    cy.get('.el-cascader').find('.el-input--suffix').click();
    // choose a facet
    cy.get('.el-cascader-node__label').filter(':contains("Data type")').click();
    cy.get('.cascader').find('span').filter(':contains("Scaffold")').click();
    cy.get('.el-cascader').find('.el-input__suffix-inner').click();
    cy.wait(5000);
    cy.contains('results | Showing');
    cy.get('.cursor-pointer').find('img').should('have.attr', 'src', `${Cypress.env('query_url')}/data/preview/dataset-146-version-2/derivative/rat_lung_Layout1_thumbnail.jpeg`);
    // clear the facet
    cy.get('.el-icon-close').click();
    cy.wait(5000);
    cy.contains('results | Showing');

    // open a dataset button
    cy.window().then((win) => {
        cy.stub(win, 'open').as('newWindow')
      })
    cy.get('.title').filter(':contains("Effect of electrical stimulation of vagal afferent terminals located in the stomach muscle wall on feeding behavior")').click();
    cy.get('@newWindow').should("be.called");

    // after select a species, search content in the sidebar should be updated
    cy.get('#flatmap-select').click();
    cy.get('.el-col').contains('Mouse').click();

    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
  })
})