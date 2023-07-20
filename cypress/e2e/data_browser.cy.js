describe('information in the data brower page', () =>{
  beforeEach(function () {
    cy.visit('/data/browser?type=dataset&page=1&limit=10');
    cy.wait(6000);
  })

  it('click the nav bar', () => {
    cy.contains('Browse categories');
    cy.get("#tab-tools").click();
    cy.url().should('include', '/data/browser?type=tools&page=1&limit=10');
  })

  it('search data & clear search', () => {
    cy.contains('Search within category');
    cy.get('input[placeholder="Enter search criteria"]').type('human');
    cy.get('.el-button.search-btn.el-button--default').click();
    cy.get('a').should('contain', 'Human');
    cy.get('.el-button.clear-search-btn.el-button--default').click();
    cy.get('a').should('contain', 'scaffold');
  })

  it('click filter items', () => {
    // click the checkbox to choose 1 item
    cy.get('.el-collapse-item__header').filter(':contains("Sex")').click();
    cy.get('.el-collapse-item__header.is-active');
    cy.get('span.el-checkbox__label').filter(':contains("Female")').click();
    cy.get('.el-tag').should('contain', 'Female');
    // choose 1 more item in another filter
    cy.get('.el-collapse-item__header').filter(':contains("Mime Type")').click();
    cy.get('span.el-checkbox__label').filter(':contains("Scaffold")').click();
    cy.get('p').should('contain', 'No result');
    // change to 'or' relation
    cy.get('.el-switch.is-checked').click();
    cy.get('div').should('not.have.class', '.is-checked');
    // cancel a facet
    cy.get('.tags.el-tag').filter(':contains("Female")').find('.el-tag__close.el-icon-close').click();
    cy.get('span.el-tag').should('not.have.value', 'Female');
    // click the checkbox to cancel a item
    cy.get('span.el-checkbox__label').filter(':contains("Scaffold")').click();
    cy.get('span').should('not.have.class', '.el-tag');
    // close the filter
    cy.get('.el-collapse-item__header.is-active').filter(':contains("Mime Type")').click();
    // if choose all items, checkboxes should all be not checked
    cy.get('.el-checkbox.filter-selector').filter(':contains("Female")').click();
    cy.get('.el-checkbox.filter-selector.is-checked').filter(':contains("Female")');   // the checkbox is checked
    cy.get('.el-checkbox__input.is-indeterminate');   // 'select all' checkbox is indeterminate
    cy.get('.el-checkbox.filter-selector').filter(':contains("Male")').click();
    cy.get('.el-checkbox.filter-selector.is-checked').should('have.length', 5);   // only all 'select all' checkboxes are checked
  })

  it('dataset card', () => {
    cy.get('.dataset-img').find(`img[src="${Cypress.env('query_url')}/data/preview/dataset-34-version-5/derivative/Scaffolds/sub-all_direct-stim_distal-colon/sub-all_direct-stim_distal-colon_thumbnail.jpg"]`);
    cy.contains('Anatomical Structure colon');
    cy.get('a[href="/data/browser/dataset/dataset-34-version-5?datasetTab=abstract"]').should('contain', 'Influence of direct colon tissue electrical stimulation on colonic motility in anesthetized male Yucatan minipig').click();
    cy.url().should('include', '/data/browser/dataset/dataset-34-version-5?datasetTab=abstract');
  })

  it('Pagination Heading', () => {
    // turn page
    cy.get('.pagination-container.top').find('ul.el-pager').children('li.number').filter(':contains("2")').click();
    cy.url().should('include', '/data/browser?type=dataset&page=2&limit=10');
    cy.get('.pagination-container.top').find('ul.el-pager').children('li.number.active').should('contain', '2');
    cy.get('.pagination-container.bottom').find('ul.el-pager').children('li.number.active').should('contain', '2');
    // change page size
    cy.get('.pagination-container.top').find('.filter-dropdown.el-dropdown-link.el-dropdown-selfdefine').click();
    cy.get('ul.el-dropdown-menu.el-popper[x-placement="bottom-start"]').children('li.el-dropdown-menu__item.icon-item').filter(':contains("10")').find('.item-icon-check.svg-icon.svg-fill');   // current is 10
    cy.get('ul.el-dropdown-menu.el-popper[x-placement="bottom-start"]').children('li.el-dropdown-menu__item.icon-item').filter(':contains("View All")').click();
    cy.url().should('include', '/data/browser?type=dataset&page=1&limit=100');
    cy.get('.filter-dropdown.el-dropdown-link.el-dropdown-selfdefine').should('contain', '100');   // view all is 100
    cy.get('.pagination-container.top').find('ul.el-pager').children('li').should('have.length', 1);
  })
})