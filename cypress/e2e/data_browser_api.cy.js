describe('test api in data browser page', () =>{
  it('test dataset metadata', () => {
    cy.fixture('gen3Info.json').as('gen3');
    // gen3 information
    cy.get('@gen3').then((gen3) => {
      cy.intercept('GET', `${Cypress.env('query_url')}/program`, {
        statusCode: 200, body: gen3.program
      });
      cy.intercept('GET', `${Cypress.env('query_url')}/project/demo1`, {
        statusCode: 200, body: gen3.project
      });
    });
    // filter data
    cy.intercept('GET', `${Cypress.env('query_url')}/filter/?sidebar=false`, {
      fixture: 'filterData.json'
    }).as('getFilter');
    // dataset metadata
    cy.intercept('POST', `${Cypress.env('query_url')}/graphql/pagination/?search=`, {
      fixture: 'multipleDatasetsMetadata.json'
    }).as('getDataset');

    // returning false here prevents Cypress from failing the test
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes("Data cannot be found in the node"))
        return false
      return true
    });

    cy.visit('/data/browser?type=dataset&page=1&limit=10');
    cy.wait('@getDataset');
    cy.wait('@getFilter');

    // all datasets
    cy.contains('15 Results | Showing');
    cy.get('a').should('contain', 'Dynamic contrast-enhanced magnetic resonance images of breast cancer patients with tumor locations (Duke-Breast-Cancer-MRI)');
    cy.contains('Anatomical Structure breast');
    cy.contains('Keywords breast, human');
    cy.contains('Samples 1 samples out of 1 objects');

    // filter
    cy.intercept('POST', `${Cypress.env('query_url')}/graphql/pagination/?search=`, {
      fixture: 'filteredDatasets.json'
    });
    cy.get('.el-collapse-item__header').filter(':contains("MIME TYPE")').click();
    cy.get('span.el-checkbox__label').filter(':contains("Scaffold")').click();
    cy.contains('11 Results | Showing');
    cy.get('a').should('contain', 'Generic sheep brainstem scaffold');
    // switch to 'or' relation
    cy.intercept('POST', `${Cypress.env('query_url')}/graphql/pagination/?search=`, {
      statusCode: 404,
      times: 1
    });
    cy.get('.el-collapse-item__header').filter(':contains("SEX")').click();
    cy.get('span.el-checkbox__label').filter(':contains("Female")').click();
    cy.intercept('POST', `${Cypress.env('query_url')}/graphql/pagination/?search=`, {
      fixture: 'filterANDsearchDataset.json'
    });
    cy.get('.el-switch.is-checked').click();
    cy.contains('12 Results | Showing');

    // page number
    cy.intercept('POST', `${Cypress.env('query_url')}/graphql/pagination/?search=`, {
      fixture: 'turnPageDatasets.json'
    });
    cy.get('.pagination-container.top').find('ul.el-pager').children('li.number').filter(':contains("2")').click();
    cy.get('a').should('contain', 'Generic sheep brainstem scaffold');

    // page size
    cy.intercept('POST', `${Cypress.env('query_url')}/graphql/pagination/?search=`, {
      fixture: 'allDatasets.json'
    });
    cy.get('.pagination-container.top').find('.filter-dropdown.el-dropdown-link.el-dropdown-selfdefine').click();
    cy.get('ul.el-dropdown-menu.el-popper[x-placement="bottom-start"]').children('li.el-dropdown-menu__item.icon-item').filter(':contains("20")').click();
    cy.contains('12 Results | Showing');
    cy.get('a.title-link').should('have.length', 12);
    
    // search
    cy.intercept('POST', `${Cypress.env('query_url')}/graphql/pagination/?search=`, {
      statusCode: 404,
      times: 1
    });
    cy.get('.el-switch__core').click();
    cy.get('input[placeholder="Enter search criteria"]').type('human');
    cy.intercept('POST', `${Cypress.env('query_url')}/graphql/pagination/?search=human`, {
      fixture: 'searchedDatasets.json'
    });
    cy.get('.el-button.search-btn.el-button--default').click();
    cy.contains('2 Results | Showing');
    cy.get('a').should('contain', 'Human whole-body scaffold');
  })
})