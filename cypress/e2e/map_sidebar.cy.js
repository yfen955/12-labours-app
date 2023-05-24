describe('map sidebar', () =>{
  it('test sidebar content', () => {
    cy.visit('/data/maps');
    cy.wait(10000);
    cy.contains('MultiFlatmap');

    // open 3D map button
    cy.get('.el-button').find('span').filter(':contains("Open 3D Map")').click();
    cy.get('.regions-display-text').should('contain', 'Regions');
    cy.get('.region-tree-node').find('span').should('contain', 'Bladder');
    cy.get('.el-button').find('span').filter(':contains("Close 3D Map")').click();

    // sidebar
    cy.get('.open-tab').click();
    cy.contains('17 results | Showing');
    cy.get('div').should('contain', 'Dynamic contrast-enhanced magnetic resonance images of breast cancer patients with tumor locations (Duke-Breast-Cancer-MRI)');
    cy.get('.el-cascader').find('.el-input--suffix').click();
    // choose a facet
    cy.get('.el-cascader-node__label').filter(':contains("Mime type")').click();
    cy.get('.cascader').find('span').filter(':contains("Scaffold")').click();
    cy.get('.el-cascader').find('.el-input__suffix-inner').click();
    cy.wait(5000);
    cy.contains('11 results | Showing');
    cy.get('div').should('contain', 'Influence of direct colon tissue electrical stimulation on colonic motility in anesthetized male Yucatan minipig');
    cy.get('.cursor-pointer').find('img').should('have.attr', 'src', `${Cypress.env('query_url')}/data/preview/dataset-34-version-5/derivative/Scaffolds/sub-all_direct-stim_distal-colon/sub-all_direct-stim_distal-colon_thumbnail.jpg`);
    // change img
    cy.get('.next').find('.progress-button').first().click();
    cy.get('.next').find('.progress-button').first().click();
    cy.get('.cursor-pointer').find('img').should('have.attr', 'src', `${Cypress.env('query_url')}/data/preview/dataset-34-version-5/derivative/Scaffolds/sub-all_direct-stim_proximal-colon/sub-all_direct-stim_proximal-colon_thumbnail.jpg`);
    // clear the facet
    cy.get('.el-icon-close').click();
    cy.wait(5000);
    cy.contains('17 results | Showing');
    // open a dataset button
    cy.window().then((win) => {
        cy.stub(win, 'open').as('newWindow')
      })
    cy.get('.title').filter(':contains("Dynamic contrast-enhanced magnetic resonance images of breast cancer patients with tumor locations (Duke-Breast-Cancer-MRI)")').click();
    cy.get('@newWindow').should("be.called");

    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
  })
})